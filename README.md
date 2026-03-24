# CHV Informatieplatform

Wetenschappelijk onderbouwde informatie over chronische hyperventilatie.

## Stack

- **Astro** - statische site generator
- **React** - interactieve componenten (CO2-balk, ademsimulator)
- **Tailwind CSS v3** - styling
- **Vercel** - hosting

## Lokaal draaien

```bash
npm install
npm run dev
```

## Bouwen

```bash
npm run build
```

## Deployen

Koppel de GitHub repo aan Vercel. Build command: `npm run build`, output directory: `dist`.

## Structuur

```
src/
  layouts/
    Base.astro          # Gedeelde layout (nav, footer, scroll reveal)
  pages/
    index.astro         # Homepage
  components/           # React componenten voor interactieve elementen
  styles/
    global.css          # Tailwind imports + custom utilities
tailwind.config.mjs     # Custom thema (sand, sage, terra, plum)
astro.config.mjs        # Astro + React + Tailwind integraties
```

## Kleuren

| Naam | Gebruik |
|------|---------|
| `sand` | Achtergronden, tekst, borders |
| `sage` | Accent, knoppen, links, "herkennen"-laag |
| `terra` | Warmte-accent, "begrijpen"-laag |
| `plum` | Derde accent, "verdiepen"-laag |

## Domein

Beoogd: `chronischehyperventilatie.be`
