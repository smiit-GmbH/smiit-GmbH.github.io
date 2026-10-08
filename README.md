<div align="center">

# smiit GmbH Website

### Official website of smiit GmbH — software, data, automation and digital strategy for SMEs.

This repository contains the public website of **smiit GmbH**, a German software and data consulting company focused on **custom web applications**, **Power BI**, **Microsoft Fabric**, **workflow automation** and **digital transformation**.

<br />

[![Website](https://img.shields.io/badge/Live%20Website-www.smiit.de-21569c?style=for-the-badge)](https://www.smiit.de)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Framework-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)

</div>

---

## About this project

This repository powers the official website of **smiit GmbH**.

The website presents our services, expertise and project approach in the areas of:

- custom software development
- Power BI and business intelligence
- Microsoft Fabric and Azure data platforms
- workflow automation with Microsoft 365 and Power Automate
- digital strategy and process optimization
- SaaS, web applications and platform architectures

The goal of the website is not only to explain what we do, but to demonstrate how we think about digital transformation: practical, structured, technically sound and focused on measurable business value.

---

## Website positioning

smiit GmbH supports small and medium-sized companies in turning manual processes, fragmented data and complex software requirements into reliable digital systems.

The website communicates three core service areas:

| Service area             | Description                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| **Digital Strategy**     | Process analysis, automation roadmaps, architecture decisions and technical project support  |
| **Data Analytics**       | Power BI dashboards, semantic models, KPI systems, data integration and management reporting |
| **Web Apps & Workflows** | Custom applications, SaaS platforms, API integrations and workflow automation                |

The content is designed for companies that want more than a standard website or isolated dashboard. The focus is on scalable systems that combine business understanding with modern technology.

---

## Technology stack

The project is built with a modern TypeScript-based frontend stack.

| Layer                 | Technology                                |
| --------------------- | ----------------------------------------- |
| **Framework**         | Next.js 16 (static export)                |
| **Language**          | TypeScript                                |
| **UI**                | React 19 components                       |
| **Styling**           | Tailwind CSS 4                            |
| **Structure**         | App-based routing and reusable components |
| **Deployment target** | Public web deployment for smiit.de        |

The repository structure includes application routes, reusable components, hooks, shared libraries and public assets.

---

## Project structure

```txt
.
├── app/                  # Routes (static export; [lang] = de | en)
├── components/
│   ├── pages/            # Page-level sections, grouped by page
│   │   └── services/shared/  # Sections shared by the service pages + per-service theme
│   └── ui/               # shadcn/ui primitives
├── content/              # Blog posts, glossary terms, case studies — one file per entry
├── hooks/                # Custom React hooks
├── lib/                  # Content accessors, i18n dictionary, SEO helpers
├── public/               # Static assets
├── scripts/              # Build-output checks (internal link checker)
├── tests/
│   ├── content/          # Content integrity tests (node:test)
│   └── e2e/              # Playwright smoke + accessibility tests
└── .github/              # CI, deploy and Dependabot configuration
```

---

## Development

Requires Node.js 22 (see `.nvmrc`).

```bash
npm ci            # install
npm run dev       # dev server on http://localhost:3000
npm run build     # static export into out/
```

Copy `.env.example` to `.env` for the contact form and Calendly integration.

### Quality checks

| Command                | What it checks                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `npm run check`        | Everything that runs without a build: typecheck, lint, knip, content tests                                               |
| `npm run typecheck`    | TypeScript (strict)                                                                                                      |
| `npm run lint`         | ESLint incl. React Compiler rules                                                                                        |
| `npm run knip`         | Unused files and dependencies                                                                                            |
| `npm run test:content` | Blog / glossary / case-study data integrity (slugs, locales, references, images)                                         |
| `npm run test:links`   | Every internal link and asset in `out/` resolves (after `build`)                                                         |
| `npm run test:e2e`     | Playwright: every sitemap page renders + axe accessibility scan (after `build`; once: `npx playwright install chromium`) |
| `npm run format`       | Prettier                                                                                                                 |

CI (`.github/workflows/ci.yml`) runs all of these on every pull request, plus Lighthouse. Deploys to GitHub Pages only happen from `main`, after the same checks pass.

### Adding content

- **Blog post / glossary term / case study:** add `content/<type>/<slug>.ts` and register it in that folder's `index.ts`. Routes, sitemap and JSON-LD pick it up automatically; `npm run test:content` validates it.
- **UI text:** `lib/dictionary.ts`. German is the source of truth; the English dictionary must have exactly the same shape (enforced by TypeScript).
