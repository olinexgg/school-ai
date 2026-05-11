# Fix harmless browser 404s (manifest, apple-touch-icon, robots)

As repo owner, from repo root:

```bash
cp deploy/patches/public-site.webmanifest apps/web/public/site.webmanifest
cp deploy/patches/public-robots.txt apps/web/public/robots.txt
# Replace apps/web/next.config.ts with deploy/patches/next.config.404-fix.ts.snippet (merge manually if you already changed next.config)
sudo systemctl restart schoolai-next
```

Common **benign** 404s before this: `/manifest.json`, `/site.webmanifest`, `/apple-touch-icon.png`, `/sw.js` (no service worker in this app).

If **chat** breaks, check Network tab for which URL is 404 — often **`/api/...`** or a **stale `/_next/static/...`** chunk after redeploy: hard refresh (Ctrl+Shift+R) or `next build` + restart.
