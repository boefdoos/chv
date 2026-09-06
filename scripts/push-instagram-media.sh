#!/bin/bash
# Automatisch commit + push van nieuwe bestanden in instagram-media/
# Wordt getriggerd door een LaunchAgent die instagram-media/ observeert.
set -euo pipefail

REPO_DIR="/Users/troostberg/Documents/chv-platform"
WATCH_SUBDIR="instagram-media"
LOCKDIR="/tmp/chv-instagram-media-push.lock"

# Voorkom overlappende runs
if ! mkdir "$LOCKDIR" 2>/dev/null; then
  exit 0
fi
trap 'rmdir "$LOCKDIR"' EXIT

cd "$REPO_DIR"

# Alleen media-bestanden oppikken, geen .DS_Store en dergelijke
shopt -s nullglob nocaseglob
files=("$WATCH_SUBDIR"/*.jpg "$WATCH_SUBDIR"/*.jpeg "$WATCH_SUBDIR"/*.png "$WATCH_SUBDIR"/*.gif "$WATCH_SUBDIR"/*.webp "$WATCH_SUBDIR"/*.mp4 "$WATCH_SUBDIR"/*.mov)
shopt -u nocaseglob nullglob

if [ ${#files[@]} -eq 0 ]; then
  exit 0
fi

git add -- "${files[@]}"

if git diff --cached --quiet; then
  exit 0
fi

git commit -m "media: nieuwe Instagram-bestanden $(date '+%Y-%m-%d %H:%M')" >/tmp/chv-instagram-media-push.log 2>&1
git push origin main >>/tmp/chv-instagram-media-push.log 2>&1
