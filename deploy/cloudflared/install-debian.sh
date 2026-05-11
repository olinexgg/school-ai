#!/usr/bin/env bash
set -euo pipefail
# Install cloudflared on Debian/Ubuntu (amd64 or arm64). Run with sudo if installing system-wide.

ARCH="$(uname -m)"
case "$ARCH" in
  x86_64) CF_ARCH=amd64 ;;
  aarch64|arm64) CF_ARCH=arm64 ;;
  *) echo "Unsupported arch: $ARCH"; exit 1 ;;
esac

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

echo "Downloading cloudflared (${CF_ARCH})…"
curl -fsSL "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-${CF_ARCH}.deb" -o "$TMP"
sudo dpkg -i "$TMP"

sudo mkdir -p /etc/cloudflared
if [[ ! -f /etc/cloudflared/config.yml ]]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  if [[ -f "$SCRIPT_DIR/config.example.yml" ]]; then
    sudo cp "$SCRIPT_DIR/config.example.yml" /etc/cloudflared/config.yml
    echo "Created /etc/cloudflared/config.yml from example — edit tunnel UUID, credentials-file, hostname, port."
  fi
else
  echo "/etc/cloudflared/config.yml already exists — not overwriting."
fi

echo "Next:"
echo "  1. cloudflared tunnel login"
echo "  2. cloudflared tunnel create school-ai-webui"
echo "  3. Copy ~/.cloudflared/<uuid>.json → /etc/cloudflared/school-ai-webui.json && chmod 600"
echo "  4. Edit /etc/cloudflared/config.yml (tunnel id, hostname, 127.0.0.1:PORT)"
echo "  5. cloudflared tunnel route dns school-ai-webui webui.example.com"
echo "  6. sudo cloudflared service install && sudo systemctl enable --now cloudflared"
