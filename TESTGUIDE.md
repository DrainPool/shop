# TESTGUIDE — Djupporträtt & produktbilder (lokalt, frallans maskin)

Allt kör lokalt på din dator. Inga molntjänster, ingen koppling till webshopens
kod — butikssidan visar bara de färdiga bilderna.

---

## 1. Starta allt (2 fönster)

```bash
# A) SwarmUI (bildmotorn) — vänta till "Now listening":
H:\Swarmui\SwarmUI\launch-windows.bat

# B) Butiken (visar sidan med hundarna):
cd C:\Users\frall\shop && npx vite dev --port 8090
```

**Kontrollera:** SwarmUI → http://localhost:7801 · Butik → http://localhost:8090

---

## 2. Se butiksmockupen (hundarna)

Öppna **http://localhost:8090/kategori/djupportratt**

Där finns: kategorin i huvudmenyn (paw-ikon), före/efter-sektionen med din tax
(original → studiorosett → konstverk) och tre demo-produkter (studioskiss 249 kr,
kollektionen 449 kr, nyckelring i ek 299 kr). Studio-bilden i butiken är den
bästa juggernaut-genereringen (9/10).

---

## 3. Gör egna hundporträtt (Pawblo-stil)

```bash
cd C:\Users\frall

# Flaggskeppet — fotorealistiskt studioporrätt (2 varianter):
python shop\scripts\djupportratt-verkstad.py "C:\väg\till\hundfoto.jpg" studio 2

# Byt bakgrund (kräver --bakgrund; auto-höjer denoise till 0.7):
python shop\scripts\djupportratt-verkstad.py "hundfoto.jpg" studio 1 --bakgrund blaa
# Bakgrunder: gralila (default) · beige · blaa · gron · terrakotta · mork

# Posters-stilar (träffar Pawblo-nivå på bra seeds — kör 3-4 och välj):
python shop\scripts\djupportratt-verkstad.py "hundfoto.jpg" sticker 3
# Stilar: studio · skiss · sticker · teckning · popkonst
```

Resultat: `shop\public\images\djupportratt\<namn>-<stil>.png`

**Ärliga gränser du kommer märka:**

- Färgnamn ger _ungefärliga_ färger ("terracotta" → varm brun). Mörka/kalla
  bakgrunder (`blaa`, `mork`) träffas bäst mot ljusa originalfoton.
- Seed-spridning är verklig: samma kommando kan ge 9/10 och 6/10. Kör flera,
  välj det bästa — det är exakt därför verktyget tar `[antal]`.

---

## 4. Gör produktbilder (butikens produkter i scen)

```bash
# Du talar om vad produkten är (ingen auto-igenkänning — medvetet val):
python shop\scripts\produktbild-verkstad.py "C:\väg\till\skarbrada.jpg" skarbrada
# Typer: smycken · glasunderlag · glas · skarbrada · nyckelring · mugg

# Tunt ljus på graverad text? Sänk denoisen:
python shop\scripts\produktbild-verkstad.py "glas.jpg" glas --denoise 0.35
```

Resultat: `shop\public\images\produktbilder\<namn>-<typ>-<seed>.webp`
(webp, färdiga för webben).

**Viktigt för graverade produkter:** text/gravyr kan förvanskas vid denoise
över ~0.5. Testa steget 0.35 → 0.45 → 0.55 på EN riktig produkt och se var
gravyren slutar vara läsbar — det är butikens kvalitetsgräns.

---

## 5. ComfyUI-workflows (grafiskt, om du vill se allt självt)

```bash
H:\ComfyUI_windows_portable\run_nvidia_gpu.bat   # http://127.0.0.1:8188
```

Vänsterpanel → Workflows → **02_Butik_img2img** (samma juggernaut-recept som
scripten, fast grafiskt). Ladda produktfoto i LoadImage-noden, skriv vad det är
i prompten, Queue. Självtest: `python shop\scripts\test_verkstad.py` →
"ALLA TEST OK".

---

## Felsökning

| Symptom                            | Åtgärd                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------ |
| "Kan inte nå SwarmUI"              | Starta `H:\Swarmui\SwarmUI\launch-windows.bat`, vänta på "Now listening" |
| "backend does not have that model" | SwarmUI → Server → Backends → Restart (eller kör API RestartBackends)    |
| Butiken svarar inte                | Kör `npx vite dev --port 8090` i `shop\`                                 |
| Konstiga hundar / fel ras          | Kör om med annat antal seeds — eller säg till, vi installerar IP-Adapter |
| Port 8090 upptagen                 | Vite hoppar automatiskt till 8091 — kolla terminalutskriften             |

---

## Filer (översikt)

```
shop\scripts\swarmui_klient.py            # delad SwarmUI-klient + webp
shop\scripts\djupportratt-verkstad.py     # hundporträtt, 5 stilar + 6 bakgrunder
shop\scripts\produktbild-verkstad.py      # produktbilder, 6 produkttyper
shop\scripts\test_verkstad.py             # självtest (GPU-fritt)
shop\public\images\djupportratt\          # butikens hundbilder + dina nya
shop\public\images\produktbilder\         # dina produktbilder (webp)
```

Allt lokalt — inget committat, inget kopplat till Shopify eller produktkoden.
Säg till när du vill att butikens demo-produkter pekar på dina riktiga bilder.

## Från demoläge till skarp butik

1. Skapa produkter i Shopify Admin med bilder, pris och beskrivning (exakta mått i beskrivningen).
2. Tagga varje produkt: kategoritagg (t.ex. `glas`, `smycken`), tillfälle (`jul`, `brollop` …), ev. `bastsaljare`/`nyhet`, och `presentpaket` för paket.
3. Kontrollera fri-frakt-gränsen i Shopify mot `FREE_SHIPPING_LIMIT`.
4. Stäng av demoläget: ta bort `VITE_DEMO_MODE=1` (eller sätt `0`).
5. Provhandla en vara med gravyr och kontrollera att gravyrtext och presenthälsning syns på ordern.
