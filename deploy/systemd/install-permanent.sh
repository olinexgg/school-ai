#!/bin/bash
set -euo pipefail
# Run once: sudo bash deploy/systemd/install-permanent.sh
# SchoolAI Next on :3001 + Cloudflare Tunnel at boot (all users get stable HTTPS).

if [[ ${EUID:-0} -ne 0 ]]; then
  echo "Run: sudo bash $0"
  exit 1
fi

REPO="/data/apps/school-ai/dev"
CRED_SRC=""
for try in \
  /home/sysadmin/.cloudflared/9ced76b7-fc4c-4e23-aa32-0a477589f08a.json \
  /home/olinexgg/.cloudflared/9ced76b7-fc4c-4e23-aa32-0a477589f08a.json; do
  if [[ -f "$try" ]]; then CRED_SRC="$try"; break; fi
done
if [[ -z "${CRED_SRC:-}" ]]; then
  shopt -s nullglob
  for f in /home/olinexgg/.cloudflared/*.json /home/sysadmin/.cloudflared/*.json /root/.cloudflared/*.json; do
    [[ -f "$f" ]] || continue
    CRED_SRC="$f"
    break
  done
  shopt -u nullglob
fi
if [[ -z "${CRED_SRC:-}" ]]; then
  echo "No tunnel credentials JSON in ~/.cloudflared. Run: cloudflared tunnel login && cloudflared tunnel create school-ai-webui"
  exit 1
fi

install -d -m 755 /usr/local/bin
install -m 755 "$REPO/deploy/systemd/schoolai-next-exec.sh" /usr/local/bin/schoolai-next-exec.sh

install -d -m 700 /etc/cloudflared
install -m 600 "$CRED_SRC" /etc/cloudflared/school-ai-webui.json

cat >/etc/cloudflared/config.yml <<'EOF'
tunnel: school-ai-webui
credentials-file: /etc/cloudflared/school-ai-webui.json

ingress:
  - hostname: school-ai.olinex.me
    service: http://127.0.0.1:3001
  - hostname: schoolai.olinex.me
    service: http://127.0.0.1:3001
  - service: http_status:404
EOF
chmod 600 /etc/cloudflared/config.yml

install -d -o olinexgg -g olinexgg -m 755 "$REPO/apps/web/.next" 2>/dev/null || true
chown -R olinexgg:olinexgg "$REPO/apps/web/.next" 2>/dev/null || true

install -m 644 "$REPO/deploy/systemd/schoolai-next.service" /etc/systemd/system/schoolai-next.service

pkill -f 'cloudflared tunnel run' 2>/dev/null || true
pkill -f 'next dev -p 3001' 2>/dev/null || true

systemctl daemon-reload
systemctl enable --now schoolai-next.service

if [[ ! -f /etc/systemd/system/cloudflared.service ]]; then
  cloudflared service install
fi
install -d /etc/systemd/system/cloudflared.service.d
cat >/etc/systemd/system/cloudflared.service.d/after-next.conf <<'OVR'
[Unit]
After=schoolai-next.service
Wants=schoolai-next.service
OVR
systemctl daemon-reload
systemctl enable --now cloudflared.service

echo "OK: schoolai-next + cloudflared enabled. Check: systemctl status schoolai-next cloudflared"
