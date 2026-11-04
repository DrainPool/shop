# Produktbildsverkstad — lägg en RIKTIG produkt i rätt scen, lokalt.
# Frallan talar om vad produkten är (ingen auto-igenkänning — medvetet val).
#
# Kör: python shop/scripts/produktbild-verkstad.py "foto.jpg" <typ> [--antal N] [--denoise 0.45]
# Typer: smycken, glasunderlag, glas, skarbrada, nyckelring, mugg
# Resultat: shop/public/images/produktbilder/<namn>-<typ>-<seed>.webp
#
# Kräver: SwarmUI igång (H:\Swarmui\SwarmUI\launch-windows.bat), port 7801.
# Låg denoise (0.3-0.55) = produkten (form, gravyr, text) bevaras, scenen
# runt om ändras. Prompten beskriver ALLTID "the same <produkt>" + omgivning.
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from swarmui_klient import SwarmUIFel, generera_bild, spara_webp

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "produktbilder")
MODEL = "OfficialStableDiffusion/juggernautXL_ragnarok.safetensors"

PRODUKTER = {
    "smycken": {
        "denoise": 0.45,
        "prompt": (
            "professional product photography of the same silver jewelry piece, placed on soft "
            "beige linen fabric, delicate natural shadows, macro detail, warm jewelry lighting, "
            "shallow depth of field, luxury e-commerce style"
        ),
        "neg": "cluttered background, harsh reflections, distorted metal, blurry, text, watermark",
    },
    "glasunderlag": {
        "denoise": 0.45,
        "prompt": (
            "cozy lifestyle photo of the same wooden coaster on a rustic coffee table, a ceramic "
            "cup resting on it, warm living room light, steam rising, shallow depth of field, "
            "high-end interior product photography"
        ),
        "neg": "distorted engraving, warped wood, extra boards, cluttered background, blurry, text, watermark",
    },
    "glas": {
        "denoise": 0.45,
        "prompt": (
            "elegant product photo of the same engraved glass on a wooden dining table, golden "
            "evening light through the window, soft backlight in the glass, blurred cozy dining "
            "room in background, premium drinkware photography"
        ),
        "neg": "distorted engraving, warped glass, broken, multiple glasses, clutter, blurry, text, watermark",
    },
    "skarbrada": {
        "denoise": 0.45,
        "prompt": (
            "bright kitchen scene with the same wooden cutting board on a light stone counter, "
            "fresh bread, herbs and a knife beside it, warm morning window light, professional "
            "food-adjacent product photography, shallow depth of field"
        ),
        "neg": "distorted engraving, warped board, messy kitchen, harsh shadows, blurry, text, watermark",
    },
    "nyckelring": {
        "denoise": 0.45,
        "prompt": (
            "lifestyle product photo of the same wooden keyring resting on an entryway table "
            "next to a bunch of keys, soft daylight from a window, warm tones, professional "
            "product photography, shallow depth of field"
        ),
        "neg": "distorted engraving, warped ring, extra rings, clutter, blurry, text, watermark",
    },
    "mugg": {
        "denoise": 0.45,
        "prompt": (
            "cozy morning scene with the same mug on a kitchen table, steam rising, soft window "
            "light, warm breakfast tones in soft focus behind, premium drinkware photography"
        ),
        "neg": "distorted print, warped mug, multiple mugs, clutter, blurry, text, watermark",
    },
}


def parsa(args):
    """(foto, typ, antal, denoise_override) — flaggor: --antal N, --denoise X."""
    if len(args) < 2 or args[1] not in PRODUKTER:
        raise SystemExit(
            "Användning: python produktbild-verkstad.py <foto> <typ> [--antal N] [--denoise X]\n"
            f"Typer: {', '.join(PRODUKTER)}"
        )
    foto, typ = args[0], args[1]
    antal = int(args[args.index("--antal") + 1]) if "--antal" in args else 1
    denoise = float(args[args.index("--denoise") + 1]) if "--denoise" in args else None
    return foto, typ, antal, denoise


def main():
    foto, typ, antal, denoise = parsa(sys.argv[1:])
    if not os.path.isfile(foto):
        raise SystemExit(f"Fotot finns inte: {foto}")
    recept = PRODUKTER[typ]
    d = denoise if denoise is not None else recept["denoise"]
    basnamn = os.path.splitext(os.path.basename(foto))[0].lower().replace(" ", "-")

    print(f"genererar {antal} x '{typ}' (denoise {d}) ...")
    for i in range(antal):
        try:
            data = generera_bild(
                prompt=recept["prompt"], neg=recept["neg"], init_path=foto,
                denoise=d, model=MODEL, seed=200 + i)
        except SwarmUIFel as e:
            print(f"FEL (variation {i + 1}): {e}")
            continue
        path = os.path.join(OUT, f"{basnamn}-{typ}-{200 + i}.webp")
        spara_webp(data, path)
        print(f"  sparad: {path}")


if __name__ == "__main__":
    main()