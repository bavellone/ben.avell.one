# ben.avell.one

Personal portfolio for Ben Avellone. Live at **https://ben.avell.one**.

Static, zero-JS site: Astro-built case studies and projects, MDX content, build-time OG cards, Cloudflare Pages hosting via Terraform.

## Stack

| | |
| --- | --- |
| Framework | Astro 5 (React + MDX) |
| Styling | Tailwind CSS v4, `@theme` tokens |
| Language | TypeScript (`strictest`) |
| Content | Content collections, Zod-validated MDX |
| Hosting | Cloudflare Pages |
| Infra | Terraform (Cloudflare zone + Pages) |
| Tooling | pnpm (enforced), Node 22+ |
| Client JS | None |

## Highlights

- **Zero hydrated JS** — HTML/CSS only; lightbox uses `:target`, not a script.
- **Content as data** — MDX with Zod-validated frontmatter; bad field fails the build. Projects list is one typed module shared by home + `/projects`.
- **Build-time OG cards** — per-route share images via Satori → Sharp; immutable static assets.
- **SEO built in** — canonical URLs, OG/Twitter meta, sitemap, `Person` JSON-LD.
- **Accessible** — skip link, focus rings, semantic landmarks, required alt text, `prefers-reduced-motion`.
- **IaC** — one Terraform module: zone, Pages project, domain binding, routing.

## Layout

```
src/
  pages/                 routes + endpoints (index, projects, case-studies/[slug], og/[...route].ts, 404)
  content/case-studies/  case-study MDX (schema: src/content.config.ts)
  layouts/               BaseLayout + CaseStudyLayout
  components/            shared Astro/React components
  data/projects.ts       projects source of truth
  assets/                optimized images + vendored OG fonts
  styles/global.css      Tailwind + design tokens
public/                  static passthrough (resume.pdf, video, favicon)
terraform/               Cloudflare zone + Pages project
```

## Commands

| | |
| --- | --- |
| `pnpm dev` | dev server (http://localhost:4321) |
| `pnpm build` | static output to `dist/` |
| `pnpm preview` | serve built `dist/` |
| `pnpm check` | type + content-schema check |

## Deploy

- Push to production branch → Cloudflare Pages builds and deploys; other branches get preview deploys.
- Infra via `terraform plan` / `apply` from `terraform/`, never on push.

## Usage

Source is public as a work sample. All rights reserved — content, copy, imagery, and brand are not licensed for reuse. See [LICENSE.txt](LICENSE.txt).
