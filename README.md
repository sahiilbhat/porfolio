# Sahil Bhat — Portfolio (San Andreas menu edition)

Next.js 14 (App Router, TypeScript) portfolio styled like a 2004 open-world classic's main menu.

## Run it

    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start   # production

## Where to edit things

- **data/profile.ts** — ONE fil for most content: name, email/phone,
  body fat %, Messi fallback totals, map locations, social links (a few
  are placeholders — put your real URLs in).
- **app/*/page.tsx** — page copy (about, experience bullets, missions, stats numbers).
- **public/audio/theme.mp3** — drop your theme song here and the RADIO
  button (bottom-left) plays it. The real SA theme is copyrighted, so it
  isn't bundled; without a file the radio plays an original synth groove.

## Live data

- **Bitcoin / Solana** — CoinGecko public API, client-side, refreshes every 30s. No key.
- **Messi** — career totals are config (no free keyless API publishes live
  career tallies). The page does hit TheSportsDB's free API for his current
  team. For truly live tallies, get an API-Football key (api-football.com)
  and wire it in app/random-stats/page.tsx.
- **Map** — Leaflet + OpenStreetMap/CARTO dark tiles. Waypoints: Gurugram
  (current), Jammu (home), Mumbai (college), connected by a dashed route.

## Controls

- Arrow keys + Enter on the main menu, ESC to go back anywhere.
- OPTIONS screen: SFX / film grain / trails / subtitles toggles.
- Wanted stars fill as sections are visited; explore enough and you'll
  get a Mission Passed.

## Deploy

Works out of the box on Vercel/Netlify: `next build`. No env vars needed.

### GitHub Pages

Pushing to `main` deploys the site through the included GitHub Actions workflow.
In the repository settings, open **Pages** and set **Build and deployment** to
**GitHub Actions**. The published URL will be
`https://sahiilbhat.github.io/porfolio/`.
