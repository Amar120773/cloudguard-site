# CloudGuard — marketing site

The public landing page for [CloudGuard](../CloudGuard), an AI-powered cloud cost
and security platform. This is a standalone static site: it shares no code with
the product and makes no API calls, so it keeps serving even when the backend is
down.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5174
```

```bash
npm run build      # -> dist/
npm run preview    # serve the production build on :4174
```

## Stack

React 18 · Vite 8 · Tailwind CSS 4 · Motion · lucide-react

Components follow the shadcn/ui conventions that [21st.dev](https://21st.dev)
components are written for — `cn()` class merging, `cva` variants, and
copy-into-your-repo ownership rather than a component dependency.

## Structure

```text
src/
├── App.jsx                 page composition
├── index.css               design tokens, grid background, grain, utilities
├── components/
│   ├── Nav.jsx             sticky header
│   ├── Footer.jsx
│   ├── ui.jsx              Button · Badge · Card · Section · Reveal
│   └── ForecastGlyph.jsx   the hero's chart visual
├── sections/
│   ├── Hero.jsx            headline, CTAs, measured metric strip
│   ├── Problem.jsx         cloud waste · cost spikes · hidden risk
│   ├── Pipeline.jsx        architecture and the async contract
│   ├── Features.jsx        bento grid + anatomy of an alert
│   └── Quickstart.jsx      install commands and stack
└── lib/
    ├── content.js          every figure on the page, with its source noted
    └── utils.js            cn() helper
```

## About the numbers

Everything quoted on the page is a real measurement from the running product —
forecast MAE, precision/recall, refresh time, payload sizes. `src/lib/content.js`
records where each one came from so they can be re-checked.

There are deliberately **no testimonials, customer logos or pricing tiers**.
Inventing them for a prototype would misrepresent it.

If the product's measured figures change, update `src/lib/content.js`; nothing
else hardcodes them.

## Design notes

- **Colours** mirror the product: brand cyan for chrome, and the dashboard's
  validated data palette (`--series-1` blue vs `--series-2` orange) for the
  forecast glyph, so the visual matches the real chart.
- **Reveal animations are an enhancement, not a prerequisite.** The scroll
  reveal carries a watchdog that forces the visible state shortly after mount,
  so content is never left invisible to a crawler or a failed observer.
- **Reduced motion** is respected throughout; the page renders in its final
  state when a visitor asks for less motion.

## Deploying it

### Vercel

This folder is **not currently a git repository**, so Vercel's Git integration
cannot see it. Two options:

```bash
# A. Deploy straight from this folder
npx vercel            # preview
npx vercel --prod     # production

# B. Give it its own repo first, then connect it in the Vercel dashboard
git init && git add -A && git commit -m "Initial commit"
git remote add origin git@github.com:<you>/cloudguard-site.git
git push -u origin main
```

Option B is better long term: previews per branch, and deploys that do not fire
on unrelated product commits.

`vercel.json` already sets the build command, output directory, immutable asset
caching and security headers. No environment variables are needed.

### Anywhere else

`npm run build` and upload `dist/`. A `Dockerfile` and `nginx.conf` are included
if you would rather run it as a container:

```bash
docker build -t cloudguard-site .
docker run -p 5174:80 cloudguard-site
```
