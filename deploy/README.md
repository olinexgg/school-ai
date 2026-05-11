# Deploy notes

If **`https://school-ai.olinex.me`** (with hyphen) returns **404** but **`https://schoolai.olinex.me`** works, the **systemd** tunnel config under **`/etc/cloudflared/config.yml`** is missing the hyphen hostname. Copy and restart:

```bash
sudo cp /data/apps/school-ai/dev/deploy/cloudflared/config.etc.yml /etc/cloudflared/config.yml
sudo systemctl restart cloudflared
```

## Public hostname (`schoolai.olinex.me` / `school-ai.olinex.me`)

See **[cloudflared/README.md](cloudflared/README.md)** for tunnel install, DNS, and **which physical server must run `cloudflared`**.

**Summary:** Run the Cloudflare connector on the **same Ubuntu host** as the app you expose (the SchoolAI / GPU server in [docs/architecture/infrastructure-topology.md](../docs/architecture/infrastructure-topology.md)). Otherwise the domain points at the wrong machine’s `127.0.0.1`.

**SchoolAI chat vs Open WebUI:** The branded **SchoolAI** product is the **Next.js** app in `apps/web` (chat at `/chat`). **Open WebUI** is a separate stack in `docker-compose.yml`. Point the tunnel at the **port of the app you want** (Next vs WebUI).

## Permanent (boot + all users)

One command (as root) installs **systemd** units: Next on **:3001** as `olinexgg`, **cloudflared** using `/etc/cloudflared/config.yml`, tunnel starts **after** Next:

```bash
sudo bash /data/apps/school-ai/dev/deploy/systemd/install-permanent.sh
```

That script also stops stray manual **`cloudflared tunnel run`** / **`next dev -p 3001`** so systemd owns the ports.

After install: `systemctl status schoolai-next cloudflared` — both should be **active (running)**.

For production traffic, run once as `olinexgg`: `cd apps/web && npm run build` so the service uses **`next start`** instead of **`next dev`** (see `schoolai-next-exec.sh`).

The root [README.md](../README.md) should briefly describe the Next.js webapp and link here; if that file is not writable from your environment, add that paragraph from the IDE as the repo owner.
