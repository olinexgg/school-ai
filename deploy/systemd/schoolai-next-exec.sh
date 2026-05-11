#!/bin/bash
set -euo pipefail
ROOT="/data/apps/school-ai/dev"
WEB="$ROOT/apps/web"
NEXT="$ROOT/node_modules/.bin/next"
cd "$WEB"

if [[ -f .next/BUILD_ID ]]; then
  export NODE_ENV=production
  exec "$NEXT" start -p 3001 --hostname 127.0.0.1
fi

exec "$NEXT" dev -p 3001 --hostname 127.0.0.1
