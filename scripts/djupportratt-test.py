# SwarmUI bildgenerering — test för Djupporträtt (TaggaDet)
# Kör:  python scripts/djupportratt-test.py "prompttext" [antal]
# Kräver att SwarmUI kör på http://localhost:7801
# (starta: H:\Swarmui\SwarmUI\launch-windows.bat — exe är förbyggd)
import json
import os
import sys
import urllib.parse
import urllib.request

BASE = "http://localhost:7801"
OUT = "public/images/djupportratt"
MODEL = "OfficialStableDiffusion/sd_xl_base_1.0"


def post(route: str, data: dict) -> dict:
    req = urllib.request.Request(
        f"{BASE}/API/{route}",
        data=json.dumps(data).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=600) as r:
        return json.loads(r.read())


def main() -> None:
    prompt = sys.argv[1] if len(sys.argv) > 1 else (
        "portrait of a dog, joyful expression, warm studio light, plain backdrop"
    )
    antal = int(sys.argv[2]) if len(sys.argv) > 2 else 1

    sid = post("GetNewSession", {})["session_id"]
    print(f"genererar {antal} bild(er), kan ta en stund på 3060:an ...")
    r = post(
        "GenerateText2Image",
        {
            "session_id": sid,
            "images": antal,
            "model": MODEL,
            "prompt": prompt,
            "negativeprompt": "blurry, low quality, distorted anatomy, watermark",
            "steps": 24,
            "cfgscale": 5,
            "width": 1024,
            "height": 1024,
            "seed": 42,
        },
    )
    if "error" in r:
        sys.exit(f"FEL: {r['error']}")

    os.makedirs(OUT, exist_ok=True)
    for i, rel in enumerate(r.get("images", []), 1):
        url = f"{BASE}/{urllib.parse.quote(rel)}"
        with urllib.request.urlopen(url, timeout=60) as resp:
            data = resp.read()
        path = os.path.join(OUT, f"test-{i}.png")
        with open(path, "wb") as f:
            f.write(data)
        print(f"sparad: {path}")


if __name__ == "__main__":
    main()