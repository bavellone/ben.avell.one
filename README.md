# ben.avell.one

Personal site for Ben Avellone. Static build, deployed to Cloudflare Pages.

## Stack

- [Astro](https://astro.build/) 5 with React and MDX integrations
- [Tailwind CSS](https://tailwindcss.com/) v4 (CSS-first design tokens)
- [Cloudflare Pages](https://pages.cloudflare.com/) hosting + DNS, managed via Terraform

## Development

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static output to dist/
pnpm check        # type-check
```

Node 22+ (`.nvmrc` pinned).

## Layout

```
src/
  pages/                     route templates
  content/case-studies/      case-study MDX
  layouts/                   base + case-study layouts
  components/                shared components
  styles/global.css          Tailwind + design tokens
public/                      static assets (incl. resume.pdf)
terraform/                   Cloudflare zone + Pages project
```

