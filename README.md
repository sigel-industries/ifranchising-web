# Franchise Club / ČIFRA – nový web

Redesign www.ifranchising.cz postavený na [Astro 5](https://astro.build). Statický výstup, nasazení na GitHub Pages, později bez přepisování rozšiřitelný o členskou zónu.

## Lokálně

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # výstup do dist/
```

## Nasazení na GitHub Pages

1. Vytvoř repo na GitHubu a pushni obsah této složky do větve `main`.
2. V repu: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push spustí `.github/workflows/deploy.yml`. Web poběží na `https://<účet>.github.io/<repo>/`.
4. Workflow se navíc spouští každý den v noci, aby se proběhlé večery samy přesunuly do archivu.

Vlastní doména: Settings → Pages → Custom domain + soubor `public/CNAME` s doménou. Base path se nastaví sám.

## Jak přidat nový klubový večer

Vytvoř soubor v `src/content/events/`, název = adresa stránky:

```
src/content/events/2026-12-09-188-nazev-tematu.md
```

```markdown
---
kind: vecer            # vecer | exkurze
number: 188
title: "Téma večera"
date: 2026-12-09
start: "18:00"
end: "20:00"
venue: "Magenta Experience Center, OC Arkády Pankrác"
image: "debatni-vecer-2026-188.jpg"   # název souboru v public/img/ nebo celá URL
invite: "https://ifranchising.ecomailapp.cz/campaigns/render/..."   # volitelné
speakers: "Jméno Příjmení, funkce"                                  # volitelné
---

Volitelný delší popis večera v Markdownu.
```

Commit → za ~1 minutu je večer na webu, včetně souboru do kalendáře (.ics). Dalším krokem může být Decap CMS, aby večery přidávala tajemnice přes formulář bez Gitu.

## Obrázky

Zatím se načítají z původního webu. Lokální kopie stáhneš jednou:

```bash
bash scripts/fetch-assets.sh
```

Pak je web na původním serveru nezávislý (kód lokální soubory použije automaticky).

## Kontaktní formulář

Bez nastavení otevře e-mailového klienta s předvyplněnou zprávou. Pro skutečné odesílání nastav v repu proměnnou `PUBLIC_FORM_ENDPOINT` (Settings → Secrets and variables → Actions → Variables), např. endpoint z Formspree nebo Web3Forms.

## Struktura

| Cesta | Obsah |
|---|---|
| `src/content/events/` | klubové večery a exkurze (1 soubor = 1 akce) |
| `src/content/articles/` | články v sekci Franchising |
| `src/data/site.ts` | kontakty, ceny vstupného, partneři, menu |
| `src/data/franchising.ts` | desatero, slovníček, FAQ |
| `src/data/archiv.md` | archiv hostů po sezónách |
| `src/styles/global.css` | design tokeny a styly |

## Členská zóna – plán

GitHub Pages umí jen statické soubory, přihlašování tam neběží. Varianty:

1. **Supabase Auth + Row Level Security** (doporučeno) – magic link e-mailem, členové a registrace na večery v Postgres, frontend zůstává statický. Hosting může zůstat na Pages.
2. **Astro v hybridním režimu na Vercel/Netlify/Cloudflare** – serverové stránky pro členy, zbytek statický. Vhodné, pokud bude víc logiky (platby, fakturace).

Dnešní kód je na obě varianty připravený: obsah je oddělený od šablon a stránka `/clenska-zona/` už existuje.

## Před spuštěním na ostré doméně

- Staré adresy (`aktivity.php`, `kontakt.php`…) přesměrovat 301 na nové – na Pages to nejde, na hostingu ano.
- Ověřit téma 187. večera (viz `todo` ve frontmatteru).
- Přenést stránku „Zásady ochrany osobních údajů“ (zatím odkaz na starý web).
- Anglická verze (ifranchise.cz) – zatím odkaz na starý web.
