# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # dev server at http://localhost:3000
pnpm build      # production build
pnpm generate   # static site generation
pnpm preview    # preview production build
pnpm lint       # ESLint check
pnpm lint:fix   # ESLint auto-fix
pnpm format     # Prettier format (writes in place)
```

## Stack

- **Nuxt 4** + Vue 3, package manager: pnpm
- **Tailwind CSS v4** via `@tailwindcss/vite` Vite plugin (NOT `@nuxtjs/tailwindcss` — v7 not released)
- **`@nuxt/fonts`** — serves JetBrains Mono from Google Fonts with auto-optimization
- **`@nuxt/eslint`** — ESLint flat config generated at `.nuxt/eslint.config.mjs`, extended in `eslint.config.mjs`
- **Prettier** — config at `.prettierrc`; integrated via `eslint-config-prettier` (disables conflicting ESLint rules)

## Architecture

**Nuxt 4 `app/` convention**: all source lives in `app/`. Auto-imports apply to `app/components/`, `app/composables/`, `app/utils/`.

**Tailwind v4 config** is CSS-first — no `tailwind.config.js`. Custom tokens live in `app/assets/css/main.css` under `@theme {}`. Import is `@import "tailwindcss"` (not `@tailwind base/components/utilities`).

**Vite plugin** wired in `nuxt.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
vite: {
  plugins: [tailwindcss()]
}
```

**GitHub username** is `Luminaire1337`, set as public runtime config in `nuxt.config.ts` → `runtimeConfig.public.githubUsername`.

**GitHub fetch** is client-only (`server: false, lazy: true`) in `ProjectsSection.vue` — avoids SSR rate-limit issues with the unauthenticated GitHub API.

**ASCII donut** (`AsciiBackground.vue`) renders a rotating 3D torus using the classic Andy Sloane algorithm on a 120×40 character grid. Scale is calculated on mount from natural `<pre>` dimensions to cover the viewport (overflow hidden). Runs via `requestAnimationFrame`.

**ESLint / Prettier** — `eslint.config.mjs` wraps the Nuxt-generated flat config with `eslint-config-prettier` (kills style rules) and three custom rules:

- `vue/multi-word-component-names: off` — single-word names allowed (e.g. `index.vue`)
- `vue/html-self-closing: error` — void elements must self-close
- `@typescript-eslint/no-unused-vars: warn` — warns, ignores `_`-prefixed params

Prettier settings (`.prettierrc`): no semis, single quotes, 100-char line width, trailing commas in ES5 positions.
