# Cloudflare Tunnel (public hostname → local app)

Use this to expose a **local HTTP service** on HTTPS (e.g. **`schoolai.olinex.me`**).

**Which app?**

| Goal | Point `service:` at |
|------|---------------------|
| **SchoolAI product** (Next.js portal + `/chat`) | **`http://127.0.0.1:3001`** recommended when Open WebUI already uses **3000**. Start with `npm run dev:tunnel` from `apps/web`, or your Coolify port for `apps/web`. |
| **Open WebUI** (generic Ollama UI from `docker-compose.yml`) | `http://127.0.0.1:8080` (or the host port you mapped). |

Keep Ollama (`11434`) and Postgres (`5433`) **off** the tunnel; only expose the web UI you intend.

## Which machine must run `cloudflared`?

The connector must run on the **same physical server** where Open WebUI listens — the SchoolAI **Ubuntu** host (Captiva / GPU box), not a separate dev laptop. See [docs/architecture/infrastructure-topology.md](../../docs/architecture/infrastructure-topology.md): production workloads and LAN identity live on that box.

If `schoolai.olinex.me` shows the wrong app or wrong data, typical causes are:

1. **`cloudflared` is running on a different host** than Open WebUI (tunnel points to that host’s `127.0.0.1`).
2. **Wrong local port** in `config.yml` (e.g. Next.js on `3000` vs Open WebUI on `8080` — verify with `curl -sI http://127.0.0.1:<PORT>/` and the page you expect).
3. **Two hosts** using the **same tunnel credentials** (stop the stray connector).

## Quick path (production: `schoolai.olinex.me` → localhost Web UI, often port `3000` or `8080`)

1. Install: `sudo bash deploy/cloudflared/install-debian.sh`
2. Authenticate: `cloudflared tunnel login`
3. Create tunnel: `cloudflared tunnel create school-ai-webui`
4. Install credentials:
   ```bash
   sudo cp ~/.cloudflared/*.json /etc/cloudflared/school-ai-webui.json
   sudo chmod 600 /etc/cloudflared/school-ai-webui.json
   ```
   Use the JSON file that matches the tunnel you created (check `~/.cloudflared/`).
5. Edit `/etc/cloudflared/config.yml`: set `tunnel:` (UUID or name), `credentials-file`, hostname `schoolai.olinex.me`, and **`service: http://127.0.0.1:3001`** for SchoolAI Next.js (see `apps/web` script `dev:tunnel`), unless your app listens elsewhere.
6. DNS: `cloudflared tunnel route dns school-ai-webui schoolai.olinex.me`
7. Service: `sudo cloudflared service install && sudo systemctl enable --now cloudflared`

## Coolify on the same host

- **Preferred:** point `service` at the app’s **published Docker port** on localhost (e.g. `http://127.0.0.1:8080`). Coolify keeps managing other projects; this hostname only hits that port.
- **If the app is only behind Coolify’s HTTP proxy:** use `http://127.0.0.1:80` and set `originRequest.httpHostHeader` to the hostname Coolify routes for that app (see comments in `config.example.yml`).

## Verify

```bash
sudo systemctl status cloudflared
curl -sI "https://schoolai.olinex.me" | head -5
```

Do not commit `*.json` credentials or a filled `config.yml` with secrets into git.
