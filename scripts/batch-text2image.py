# Batch-bildverkstad — text2image för ALLA produkter i demo-katalogen, lokalt i SwarmUI.
# Ingen fysisk produkt behövs: prompten beskriver produkten + scenen.
#
# Kör (från repo-roten):
#   python scripts/batch-text2image.py --dry-run                 # visa prompts, generera inget
#   python scripts/batch-text2image.py --limit 2                 # testa på 2 produkter
#   python scripts/batch-text2image.py --produkt whiskyglas-med-gravyr --scen studio --antal 3
#   python scripts/batch-text2image.py --lora "add-detail-xl:0.5" --lora "product_photo_xl:0.6"
#
# Scener: studio, lifestyle, macro, ugc
# Resultat: public/images/products/generated/{handle}_{scen}_{seed}.webp
# Kräver: SwarmUI igång på port 7801. LoRA-namnet = filnamnet i SwarmUI/Models/Lora utan ändelse.
#
# OBS: UGC-bilderna är AI-visualiseringar — använd dem aldrig som "kundbilder" eller omdömen.
import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from swarmui_klient import SwarmUIFel, post, spara_webp, BASE

import urllib.parse
import urllib.request

ROT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
KATALOG = os.path.join(ROT, "src", "lib", "demoProducts.ts")
OUT = os.path.join(ROT, "public", "images", "products", "generated")
MODEL = "OfficialStableDiffusion/juggernautXL_ragnarok.safetensors"

NEG = (
    "cgi, 3d render, plastic look, oversaturated, blurry, bad engraving, distorted text, "
    "gibberish letters, typos, extra objects, messy background, harsh flash, oversmoothed, "
    "low quality, watermark, logo, deformed hands, extra fingers"
)

STIL = "warm sepia-toned Scandinavian aesthetic, natural materials, handcrafted, photorealistic, 8k"

# Material -> (beskrivning av ytan, scenrekvisita per scen)
MATERIAL = {
    "tra": {
        "yta": "solid oak wood with crisp dark laser engraving and visible wood grain",
        "studio": "on light linen, seamless warm off-white background, soft side lighting",
        "lifestyle": "on a Scandinavian kitchen counter, sourdough bread and rosemary nearby, morning window light",
        "macro": "extreme close-up on the burned laser engraving grooves and natural oak grain",
        "ugc": "held in a hand at home, casual phone photo, natural daylight, slight imperfect framing",
    },
    "glas": {
        "yta": "clear glass with fine frosted laser etching",
        "studio": "on dark walnut surface, soft rim lighting, dark gradient background, luxury drinkware look",
        "lifestyle": "filled with drink on a rustic wooden table, cozy evening ambient light, candles in bokeh",
        "macro": "extreme macro of frosted etched letters on glass, light catching the grooves",
        "ugc": "casual phone snapshot at a dinner table with friends blurred behind, warm evening light",
    },
    "lader": {
        "yta": "genuine cognac brown leather with debossed laser monogram and visible stitching",
        "studio": "on raw slate surface, warm premium leathercraft lighting, clean background",
        "lifestyle": "flatlay on dark oak desk next to vintage watch and brass keys, warm light",
        "macro": "macro of deep burnished engraving in thick saddle leather, stitching detail",
        "ugc": "held in palm outdoors, autumn park blurred behind, natural daylight phone photo",
    },
    "metall": {
        "yta": "polished metal with precise fine-line engraving",
        "studio": "on beige suede pad, soft specular highlights, elegant clean shadows, seamless background",
        "lifestyle": "styled in a calm Swedish home setting, soft overcast window light",
        "macro": "razor sharp macro of engraved letters on polished metal, crisp reflections",
        "ugc": "close-up phone photo held between fingers, natural daylight, authentic everyday moment",
    },
    "kork": {
        "yta": "natural cork with dark laser engraving",
        "studio": "stacked on linen, seamless warm off-white background, soft light",
        "lifestyle": "on a coffee table with a ceramic cup and a book, cozy living room light",
        "macro": "macro of engraved letters in porous cork texture",
        "ugc": "casual phone photo on a home coffee table, a hand placing a cup, daylight",
    },
    "papper": {
        "yta": "premium textured gift card with gold foil details",
        "studio": "on kraft paper with twine, seamless warm background, soft light",
        "lifestyle": "inside a gift box with tissue paper on a table, warm festive light",
        "macro": "macro of embossed paper texture and gold foil",
        "ugc": "hands opening an envelope, casual phone photo, warm home light",
    },
}

# Nyckelord i titel/taggar -> (material, engelsk produktbeskrivning)
TYPER = [
    (r"djupportr", "glas", "glass crystal block with 3D laser-engraved portrait inside"),
    (r"whisky", "glas", "engraved crystal whiskey tumbler"),
    (r"vinglas", "glas", "pair of engraved wine glasses"),
    (r"ölglas|olglas", "glas", "engraved beer glass"),
    (r"kork", "kork", "set of four round cork coasters"),
    (r"glasunderl|bar-set", "tra", "set of four oak coasters"),
    (r"skärbräda|skarbrada", "tra", "oak cutting board"),
    (r"reg\.?nummer", "metall", "metal keyring shaped like a license plate"),
    (r"nyckelring", "tra", "small oak keyring with metal ring"),
    (r"julgranskula", "tra", "wooden Christmas tree bauble with ribbon"),
    (r"minnesask|presentask|golfpresentask", "tra", "wooden gift box with lid"),
    (r"korg", "tra", "oak basket"),
    (r"namnskylt", "tra", "oak name sign for a child's room"),
    (r"pokal", "tra", "trophy with wooden base and metal plate"),
    (r"plånbok|planbok", "lader", "leather wallet"),
    (r"armband", "lader", "leather bracelet with metal clasp"),
    (r"hundpaket", "lader", "leather dog collar with steel pet tag"),
    (r"pet tag", "metall", "stainless steel pet tag on a dog collar"),
    (r"dörrskylt|dorrskylt", "metall", "brass door name plate"),
    (r"ball marker", "metall", "metal golf ball markers"),
    (r"dash-plakett", "metall", "aluminium car show dash plaque"),
    (r"halsband|kedja|hänge|hjärta|charm|parsmycke", "metall", "sterling silver necklace pendant"),
    (r"presentkort", "papper", "gift card"),
]


def las_katalog():
    txt = open(KATALOG, encoding="utf-8").read()
    produkter = []
    for m in re.finditer(r'title:\s*"([^"]+)",\s*handle:\s*"([^"]+)"', txt):
        titel, handle = m.group(1), m.group(2)
        if titel.lower() == "standard":
            continue
        produkter.append((titel, handle))
    return produkter


def klassa(titel):
    t = titel.lower()
    for monster, material, beskr in TYPER:
        if re.search(monster, t):
            return material, beskr
    return "tra", "handcrafted engraved wooden gift"


def bygg_prompt(titel, scen, loras):
    material, beskr = klassa(titel)
    mat = MATERIAL[material]
    bas = {
        "studio": "commercial product photography, clean studio shot",
        "lifestyle": "lifestyle product photography, shallow depth of field",
        "macro": "macro product photography, sharp focus",
        "ugc": "authentic customer-style photo, shot on smartphone",
    }[scen]
    lora_txt = " ".join(f"<lora:{l}>" for l in loras)
    return f"{bas}, {beskr}, {mat['yta']}, {mat[scen]}, {STIL} {lora_txt}".strip()


def generera(prompt, seed, bredd, hojd, steps, cfg):
    sid = post("GetNewSession", {})["session_id"]
    r = post("GenerateText2Image", {
        "session_id": sid, "images": 1, "model": MODEL,
        "prompt": prompt, "negativeprompt": NEG,
        "steps": steps, "cfgscale": cfg, "width": bredd, "height": hojd, "seed": seed,
    })
    if "error" in r:
        raise SwarmUIFel(r["error"])
    with urllib.request.urlopen(f"{BASE}/{urllib.parse.quote(r['images'][0])}", timeout=120) as resp:
        return resp.read()


def main():
    p = argparse.ArgumentParser(description="Batch-generera produktbilder i SwarmUI")
    p.add_argument("--produkt", help="bara denna handle")
    p.add_argument("--scen", choices=["studio", "lifestyle", "macro", "ugc"], action="append")
    p.add_argument("--antal", type=int, default=1, help="varianter per scen")
    p.add_argument("--limit", type=int, help="max antal produkter")
    p.add_argument("--lora", action="append", default=[], help='"namn:vikt", t.ex. add-detail-xl:0.5')
    p.add_argument("--bredd", type=int, default=1024)
    p.add_argument("--hojd", type=int, default=1024)
    p.add_argument("--steps", type=int, default=32)
    p.add_argument("--cfg", type=float, default=5.5)
    p.add_argument("--seed", type=int, default=300)
    p.add_argument("--dry-run", action="store_true")
    a = p.parse_args()

    scener = a.scen or ["studio", "lifestyle", "macro", "ugc"]
    produkter = las_katalog()
    if a.produkt:
        produkter = [x for x in produkter if x[1] == a.produkt]
    if a.limit:
        produkter = produkter[: a.limit]
    if not produkter:
        raise SystemExit("Inga produkter matchade.")

    total = len(produkter) * len(scener) * a.antal
    print(f"{len(produkter)} produkter x {len(scener)} scener x {a.antal} = {total} bilder")

    klara = 0
    for titel, handle in produkter:
        for scen in scener:
            prompt = bygg_prompt(titel, scen, a.lora)
            for i in range(a.antal):
                seed = a.seed + i
                path = os.path.join(OUT, f"{handle}_{scen}_{seed}.webp")
                if a.dry_run:
                    print(f"\n[{handle} / {scen}]\n{prompt}")
                    continue
                if os.path.exists(path):
                    print(f"  finns redan, hoppar: {path}")
                    continue
                try:
                    data = generera(prompt, seed, a.bredd, a.hojd, a.steps, a.cfg)
                except SwarmUIFel as e:
                    print(f"FEL {handle}/{scen}: {e}")
                    continue
                spara_webp(data, path)
                klara += 1
                print(f"  [{klara}/{total}] {path}")
    if not a.dry_run:
        print(f"\nKlart: {klara} nya bilder i {OUT}")


if __name__ == "__main__":
    main()
