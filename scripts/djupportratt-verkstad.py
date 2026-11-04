# Djupporträttsverkstad — gör Pawblo-liknande porträtt av ett djurfoto, lokalt.
#
# Kör (från C:\Users\frall):
#   python shop/scripts/djupportratt-verkstad.py "C:\väg\till\foto.webp"
#
# Kräver: SwarmUI igång (H:\Swarmui\SwarmUI\launch-windows.bat), port 7801.
# Resultat: shop/public/images/djupportratt/<namn>-<stil>.png
#
# Stilar (recepten är testade på långhårig tax, sep 2026):
#   studio     – fotorealistiskt studioporrätt, seamless bakgrund (denoise 0.6)
#   skiss      – trogen studioskiss, bra som gravyrförlaga (denoise 0.5)
#   sticker    – platt klistermärke med vit kant + gnistor (denoise 0.90)
#   teckning   – barnboks-teckning, mjukt (denoise 0.88)
#   popkonst   – pop-art i två färger (denoise 0.93)
#
# Modell: juggernautXL_ragnarok (kopierad till SwarmUI från ComfyUI-portable).
# Behövs ny modell i SwarmUI: kopiera filen till
#   H:\Swarmui\SwarmUI\Models\Stable-Diffusion\OfficialStableDiffusion\
# och kör TriggerRefresh + RestartBackends (se skill 'swarmui-api').
import base64
import json
import mimetypes
import os
import sys
import urllib.parse
import urllib.request

BASE = "http://localhost:7801"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "djupportratt")
MODEL = "OfficialStableDiffusion/juggernautXL_ragnarok.safetensors"

# Studioclicker: valbar bakgrund för stil 'studio' (frallans önskan 2026-09-22).
BAKGRUNDER = {
    "gralila": "seamless solid grey-lavender studio backdrop",
    "beige": "seamless warm cream beige studio backdrop",
    "blaa": "seamless dusty slate blue studio backdrop",
    "gron": "seamless deep sage green studio backdrop",
    "terrakotta": "entire background is one solid vivid terracotta burnt-orange color covering the whole backdrop edge to edge, flat seamless studio paper, absolutely no other background colors",
    "mork": "seamless dark charcoal studio backdrop",
}

STILAR = {
    "studio": {
        "denoise": 0.6,
        "prompt": (
            "award-winning professional studio portrait of the same animal, joyful happy expression "
            "with mouth open and tongue slightly out, soft directional key light, {bakgrund}, ultra "
            "sharp fur detail, every hair visible, catchlight "
            "in the eyes, 85mm lens, shallow depth of field, high-end pet photography"
        ),
        "denoise_bakgrund": 0.7,
        "neg": (
            "illustration, cartoon, painting, drawing, blurry, low quality, distorted anatomy, "
            "watermark, text, oversaturated, garden, grass, green, outdoor, trees, bokeh foliage, "
            "olive background, khaki background, grey background, two background colors, gradient backdrop"
        ),
    },
    "skiss": {
        "denoise": 0.5,
        "prompt": (
            "professional studio portrait of the same animal, soft golden studio lighting, "
            "plain warm beige backdrop, sharp detailed fur, head and chest framing"
        ),
        "neg": "blurry, low quality, distorted anatomy, watermark, text",
    },
    "foto": {
        "denoise": 0.35,
        "prompt": (
            "award-winning professional pet photography portrait of the same animal, alert noble "
            "expression, dramatic soft studio lighting, seamless warm brown backdrop, ultra sharp "
            "fur detail, shallow depth of field, 85mm lens, high-end pet photography"
        ),
        "neg": (
            "illustration, cartoon, painting, drawing, blurry, low quality, distorted anatomy, "
            "watermark, text, oversaturated"
        ),
    },
    "sticker": {
        "denoise": 0.90,
        "prompt": (
            "cute flat vector illustration portrait of the same animal, joyful open expression with "
            "tongue out, bold thick clean outlines, simple flat colors, minimal shading, kawaii "
            "proportions, big glossy round eyes, die-cut sticker style with white border outline, "
            "solid vivid teal background, sparkles, centered, minimalist"
        ),
        "neg": (
            "photo, photorealistic, 3d render, bokeh, blurred background, gradient background, "
            "realistic fur texture, complex background, watermark, text, signature"
        ),
    },
    "teckning": {
        "denoise": 0.88,
        "prompt": (
            "playful flat cartoon illustration of the same animal wearing a tiny bow tie, cheeky "
            "happy expression, thick bold outlines, flat pastel colors, simple shapes, "
            "minimalist children's book style, centered"
        ),
        "neg": (
            "photo, photorealistic, 3d render, bokeh, blurred background, gradient background, "
            "realistic fur texture, complex background, watermark, text"
        ),
    },
    "popkonst": {
        "denoise": 0.93,
        "prompt": (
            "bold pop-art portrait of the same animal, two-tone flat colors, graphic screen-print "
            "style, thick outlines, solid dark plum background, confident expression, centered"
        ),
        "neg": (
            "photo, photorealistic, bokeh, blurred background, gradient background, "
            "realistic fur texture, watermark, text"
        ),
    },
}


def post(route, data, timeout=600):
    req = urllib.request.Request(
        f"{BASE}/API/{route}",
        data=json.dumps(data).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def till_data_url(path):
    mime = mimetypes.guess_type(path)[0] or "image/jpeg"
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


def parsa(args):
    """(foto, stil, antal, bakgrund) — bakgrund gäller stil 'studio', default gralila."""
    if not args:
        raise SystemExit(
            "Användning: python djupportratt-verkstad.py <foto> [stil] [antal] [--bakgrund NAMN]\n"
            f"Stilar: studio, skiss, sticker, teckning, popkonst — bakgrunder: {', '.join(BAKGRUNDER)}"
        )
    foto = args[0]
    stil = args[1] if len(args) > 1 and not args[1].startswith("--") else "studio"
    antal = int(args[2]) if len(args) > 2 and args[2].isdigit() else 1
    bakgrund = "gralila"
    if "--bakgrund" in args:
        i = args.index("--bakgrund")
        bakgrund = args[i + 1]
        if bakgrund not in BAKGRUNDER:
            raise SystemExit(f"Okänd bakgrund '{bakgrund}'. Välj: {', '.join(BAKGRUNDER)}")
    return foto, stil, antal, bakgrund


def main():
    foto, stil, antal, bakgrund = parsa(sys.argv[1:])
    if stil not in STILAR:
        sys.exit(f"Okänd stil '{stil}'. Välj: {', '.join(STILAR)}")
    if not os.path.isfile(foto):
        sys.exit(f"Fotot finns inte: {foto}")

    recept = STILAR[stil]
    data_url = till_data_url(foto)
    sid = post("GetNewSession", {})["session_id"]
    basnamn = os.path.splitext(os.path.basename(foto))[0].lower().replace(" ", "-")

    os.makedirs(OUT, exist_ok=True)
    print(f"genererar {antal} x '{stil}' från {os.path.basename(foto)} (tar ca 1 min/bild)...")
    for i in range(antal):
        prompt = recept["prompt"]
        d = recept["denoise"]
        if stil == "studio" and bakgrund != "gralila":
            # Icke-default bakgrund = större stiländring → högre denoise krävs
            # för att slå igenom (originalets färger läcker annars igenom).
            d = recept.get("denoise_bakgrund", recept["denoise"])
            prompt = prompt.format(bakgrund=BAKGRUNDER[bakgrund])
        r = post("GenerateText2Image", {
            "session_id": sid,
            "images": 1,
            "model": MODEL,
            "prompt": prompt,
            "negativeprompt": recept["neg"],
            "initimage": data_url,
            "initimagecreativity": d,
            "steps": 28,
            "cfgscale": 6,
            "width": 1024,
            "height": 1024,
            "seed": 100 + i,
        })
        if "error" in r:
            print(f"FEL (variation {i + 1}):", r["error"])
            continue
        rel = r["images"][0]
        with urllib.request.urlopen(f"{BASE}/{urllib.parse.quote(rel)}", timeout=60) as resp:
            data = resp.read()
        suffix = "" if antal == 1 else f"-{i + 1}"
        path = os.path.join(OUT, f"{basnamn}-{stil}{suffix}.png")
        with open(path, "wb") as f:
            f.write(data)
        print(f"  sparad: {path}")


if __name__ == "__main__":
    main()