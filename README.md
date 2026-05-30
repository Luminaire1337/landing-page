# matchlesslumi.dev

Personal landing page for [matchlesslumi.dev](https://matchlesslumi.dev).

## Stack

| Tool                                       | Purpose                             |
| ------------------------------------------ | ----------------------------------- |
| [Nuxt 4](https://nuxt.com)                 | Framework (SSG / SSR)               |
| [Vue 3](https://vuejs.org)                 | UI                                  |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling — CSS-first, no config file |
| [@nuxt/fonts](https://fonts.nuxt.com)      | JetBrains Mono via Google Fonts     |
| [pnpm](https://pnpm.io)                    | Package manager                     |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

```bash
pnpm build        # production build
pnpm generate     # static site generation
pnpm preview      # preview production build
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier format (writes in place)
```

## Project structure

```
app/
  assets/css/main.css        # Tailwind import + @theme tokens + base reset
  components/
    AsciiBackground.vue      # Rotating 3D donut (Andy Sloane algorithm, rAF)
    ProjectsSection.vue      # GitHub repos — lazy fetch on scroll into view
  pages/
    index.vue                # Hero + projects layout
eslint.config.mjs            # ESLint flat config (wraps @nuxt/eslint + prettier)
.prettierrc                  # Prettier config
```

## Features

- **ASCII donut background** — rotating 3D torus rendered in a `<pre>`, scaled to fill the viewport
- **Lazy GitHub fetch** — projects section only calls the API when scrolled into view (IntersectionObserver)
- **Skeleton loading** — pulse placeholders while repos load, then fade-in animation on arrival
- **Language color dots** — official GitHub language colors per repo card
- **Forks excluded** — only original work shown (up to 6 most recently pushed repos)
