#!/usr/bin/env bash
# Stáhne všechny obrázky, na které web odkazuje, z www.ifranchising.cz/img/
# do public/img/. Web pak automaticky používá lokální kopie (viz src/lib/util.ts).
# Spusť jednou z kořene repa:  bash scripts/fetch-assets.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/img

names=$(grep -rhoE "[A-Za-z0-9_.-]+\.(jpg|jpeg|png|gif)" src/content/events src/data src/pages \
  | grep -vE '^(favicon)' | sort -u)

ok=0; fail=0
for n in $names; do
  if [ -s "public/img/$n" ]; then continue; fi
  if curl -fsSL --max-time 30 "https://www.ifranchising.cz/img/$n" -o "public/img/$n"; then
    ok=$((ok+1)); echo "  ✓ $n"
  else
    rm -f "public/img/$n"; fail=$((fail+1)); echo "  ✗ $n (nenalezeno)"
  fi
done
echo "Staženo: $ok, chyby: $fail"
