# Självtest för verkstads-scripten (kräver INTE SwarmUI/GPU).
# Kör: python shop/scripts/test_verkstad.py   ->  "ALLA TEST OK"
import importlib.util
import inspect
import os

HAR = os.path.dirname(os.path.abspath(__file__))


def ladda(namn):
    spec = importlib.util.spec_from_file_location(
        namn.replace("-", "_"), os.path.join(HAR, namn + ".py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def test_bakgrunder_finns():
    dj = ladda("djupportratt-verkstad")
    assert "gralila" in dj.BAKGRUNDER, "default-bakgrunden saknas"
    for nyckel, frag in dj.BAKGRUNDER.items():
        assert "backdrop" in frag or "color" in frag, nyckel


def test_parsa_bakgrund():
    dj = ladda("djupportratt-verkstad")
    foto, stil, antal, bakgrund = dj.parsa(["foto.jpg"])
    assert (foto, stil, antal, bakgrund) == ("foto.jpg", "studio", 1, "gralila")
    _, _, _, bakgrund = dj.parsa(["f.jpg", "skiss", "3", "--bakgrund", "beige"])
    assert bakgrund == "beige"


def test_produktregister_helt():
    pb = ladda("produktbild-verkstad")
    obligatoriska = {"smycken", "glasunderlag", "glas", "skarbrada", "nyckelring", "mugg"}
    assert obligatoriska <= set(pb.PRODUKTER), f"saknar: {obligatoriska - set(pb.PRODUKTER)}"
    for namn, r in pb.PRODUKTER.items():
        assert set(r) >= {"prompt", "neg", "denoise"}, f"{namn}: ofullständigt recept"
        assert 0.3 <= r["denoise"] <= 0.6, f"{namn}: denoise {r['denoise']} riskerar product-drift"


def test_produkt_parsa():
    pb = ladda("produktbild-verkstad")
    assert pb.parsa(["f.jpg", "glas"]) == ("f.jpg", "glas", 1, None)
    assert pb.parsa(["f.jpg", "glas", "--antal", "2"]) == ("f.jpg", "glas", 2, None)
    assert pb.parsa(["f.jpg", "glas", "--denoise", "0.5"]) == ("f.jpg", "glas", 1, 0.5)


if __name__ == "__main__":
    for namn, fn in sorted(globals().items()):
        if namn.startswith("test_") and inspect.isfunction(fn):
            fn()
            print(f"PASS: {namn}")
    print("ALLA TEST OK")