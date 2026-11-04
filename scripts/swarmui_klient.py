# Delad klient mot lokal SwarmUI (http://localhost:7801).
# Krav: SwarmUI igång — starta H:\Swarmui\SwarmUI\launch-windows.bat
# Flödet är verifierat i skill 'swarmui-api'.
import base64
import json
import mimetypes
import os
import urllib.error
import urllib.parse
import urllib.request

BASE = "http://localhost:7801"
DEFAULT_TIMEOUT = 600


class SwarmUIFel(RuntimeError):
    pass


def post(route, data, timeout=DEFAULT_TIMEOUT):
    req = urllib.request.Request(
        f"{BASE}/API/{route}",
        data=json.dumps(data).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except urllib.error.URLError as e:
        raise SwarmUIFel(
            f"Kan inte nå SwarmUI på {BASE}. Starta H:\\Swarmui\\SwarmUI\\launch-windows.bat "
            f"och vänta till 'Now listening', prova sedan igen. ({e})"
        ) from None


def till_data_url(path):
    mime = mimetypes.guess_type(path)[0] or "image/jpeg"
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


def generera_bild(prompt, neg, init_path, denoise, model, seed=1,
                  steps=30, cfgscale=5.5, bredd=1024, hojd=1024):
    """Genererar EN img2img-bild och returnerar bildens rådata (bytes)."""
    sid = post("GetNewSession", {})["session_id"]
    r = post("GenerateText2Image", {
        "session_id": sid,
        "images": 1,
        "model": model,
        "prompt": prompt,
        "negativeprompt": neg,
        "initimage": till_data_url(init_path),
        "initimagecreativity": denoise,
        "steps": steps,
        "cfgscale": cfgscale,
        "width": bredd,
        "height": hojd,
        "seed": seed,
    })
    if "error" in r:
        raise SwarmUIFel(r["error"])
    rel = r["images"][0]
    with urllib.request.urlopen(f"{BASE}/{urllib.parse.quote(rel)}", timeout=120) as resp:
        return resp.read()


def spara(data, path):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)


def spara_webp(data, path_png, kvalitet=85):
    """Sparar PNG-rådata som webp (mindre filer) via PIL. Returnerar webb-sökvägen."""
    from PIL import Image
    import io
    img = Image.open(io.BytesIO(data)).convert("RGB")
    path = os.path.splitext(path_png)[0] + ".webp"
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    img.save(path, "WEBP", quality=kvalitet, method=6)
    return path