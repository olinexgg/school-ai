#!/bin/bash
set -euo pipefail
# Fixes .next ownership and starts SchoolAI Next on :3001 (tunnel target). Must run as root once.
WEB=/data/apps/school-ai/dev/apps/web
ROOT=/data/apps/school-ai/dev
OWNER=olinexgg
NEXT="$ROOT/node_modules/.bin/next"

if [[ ${EUID:-0} -ne 0 ]]; then
  echo "Run: sudo bash $0"
  exit 1
fi

install -d -o "$OWNER" -g "$OWNER" -m 755 "$WEB/.next"
chown -R "$OWNER:$OWNER" "$WEB/.next"

pkill -f "next dev -p 3001" 2>/dev/null || true
runuser -u "$OWNER" -- bash -lc "cd '$WEB' && nohup '$NEXT' dev -p 3001 --hostname 127.0.0.1 >>/tmp/schoolai-next-3001.log 2>&1 &"
sleep 3
curl -sI --max-time 5 http://127.0.0.1:3001/ | head -n 3 || true
