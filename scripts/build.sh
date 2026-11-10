#!/usr/bin/env bash
# Packages every extension into dist/<name>-v<version>.zip
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p dist
rm -f dist/*.zip
for d in tab-session-saver reading-ruler snippet-vault; do
  v=$(grep -o '"version"[^,]*' "$d/manifest.json" | head -1 | grep -o '[0-9.]\+')
  (cd "$d" && zip -qr "../dist/$d-v$v.zip" . -x '*.DS_Store')
  echo "built dist/$d-v$v.zip"
done
