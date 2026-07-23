# Chanchal Man — Dukaan Shutter (Static Build)

This folder is a fully self-contained static version of the shutter animation, published to **GitHub Pages** via `.github/workflows/pages.yml`.

## Live site

🌐 **https://gingeshutter.lovable.app**

Canonical domain: **https://shutter.com** — GitHub Pages traffic is redirected there automatically.

## Enable GitHub Pages

1. Push this repo to GitHub.
2. Repo → **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. On the next push to `main`, the workflow deploys.

## Custom domain setup

- The `CNAME` file in this folder declares `shutter.com`.
- In **GitHub Pages settings**, set the custom domain to `shutter.com`.
- The `index.html` script will redirect any `github.io` fallback visitors to `https://shutter.com`.

> Note: To make `shutter.com` actually serve the Lovable site, connect the domain in **Lovable Project Settings → Domains** and add the DNS records provided there.

## What's inside

- `index.html` — the whole app in one file (HTML + CSS + vanilla JS).
- `assets/shutter-design.jpg` — background poster.
- `assets/shutter-sound.mp3` — mechanical rolling sound.
- `assets/after-open.mp3` — sound that plays after the shutter finishes opening.
- `CNAME` — GitHub Pages custom domain declaration.

## Local preview

Open `docs/index.html` directly in a browser, or run any static server from this folder (`npx serve .`).

The main app in `src/` (TanStack Start, used in Lovable) is unchanged.
