# matchlesslumi.dev

Source code for [matchlesslumi.dev](https://matchlesslumi.dev).

Built with Nuxt 4, Vue 3, and Tailwind CSS v4. JetBrains Mono throughout.

## Running locally

```bash
pnpm install
pnpm dev
```

Opens at `http://localhost:3000`.

## Other scripts

```bash
pnpm build        # production build
pnpm generate     # static site generation
pnpm preview      # preview production build
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier (writes in place)
```

## How it works

The background is a rotating 3D ASCII donut — the classic Andy Sloane algorithm running on a 120×40 character grid, scaled via CSS transform to always fill the viewport.

The projects section lazy-loads repos from the GitHub API only once the user scrolls to it, so there's no unnecessary request on page load. While waiting, it shows skeleton cards that pulse, then fades the real cards in once the data arrives. Forks are filtered out, showing the 6 most recently pushed original repos.
