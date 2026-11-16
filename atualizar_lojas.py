"""Lê todas as lojas do site megamoda.com.br (API pública do WooCommerce) e salva lojas.json.

Uso:
    pip install requests
    python atualizar_lojas.py      # gera lojas.json
    python build.py                # gera lojas-data.js (app) e seed.sql (Supabase)

Depois: publique o lojas-data.js novo e rode o seed.sql no SQL Editor do Supabase.
"""
import html, json, re, datetime
import requests

API = "https://www.megamoda.com.br/wp-json/wc/store/v1/products"
LOC_RE = re.compile(r"Localiza[çc][ãa]o\s*:?\s*(.+)", re.I)
FLOOR_RE = re.compile(r"(T[ée]rreo|Piso\s*\d|Subsolo|G3)", re.I)


def texto(h: str) -> list[str]:
    h = re.sub(r"<br\s*/?>|</p>|</li>|</div>", "\n", h or "", flags=re.I)
    h = html.unescape(re.sub(r"<[^>]+>", " ", h))
    return [re.sub(r"\s+", " ", l).strip() for l in h.splitlines() if l.strip()]


def localizacao(p: dict) -> str:
    linhas = texto(p.get("description", "")) + texto(p.get("short_description", ""))
    for l in linhas:
        m = LOC_RE.search(l)
        if m:
            return m.group(1).strip()
    for l in linhas:  # fallback: primeira linha que cite piso/térreo
        if FLOOR_RE.search(l) and len(l) < 90:
            return l
    return ""


def main():
    lojas, page = [], 1
    while True:
        r = requests.get(API, params={"per_page": 100, "page": page}, timeout=60,
                         headers={"User-Agent": "Mozilla/5.0 mapa-mega-moda"})
        r.raise_for_status()
        itens = r.json()
        if not itens:
            break
        for p in itens:
            loc = localizacao(p)
            if not loc:
                continue
            lojas.append({
                "n": html.unescape(p["name"]).strip(),
                "s": p.get("slug") or str(p["id"]),
                "c": [html.unescape(c["name"]) for c in p.get("categories", [])],
                "l": loc,
            })
        print(f"página {page}: {len(itens)} itens")
        page += 1
    data = datetime.date.today().strftime("%d/%m/%Y")
    with open("lojas.json", "w", encoding="utf-8") as f:
        json.dump({"data": data, "lojas": lojas}, f, ensure_ascii=False, indent=0)
    print(len(lojas), "lojas salvas em lojas.json")


if __name__ == "__main__":
    main()
