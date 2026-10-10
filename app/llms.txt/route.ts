import { listBlogPosts } from "@/lib/blog"
import { listCaseStudies } from "@/lib/case-studies"
import { getGlossaryTerm, glossaryTermSlugs } from "@/lib/glossary"

// /llms.txt (https://llmstxt.org) — a curated map of the site for AI assistants and
// answer engines. Generated at build time from the same content as the sitemap, so
// new blog posts, glossary terms and case studies appear automatically.
export const dynamic = "force-static"

const SITE = "https://www.smiit.de"
const page = (lang: "de" | "en", path: string) => `${SITE}/${lang}${path ? `/${path}` : ""}/`
const pair = (title: string, path: string, description: string) =>
  `- [${title}](${page("en", path)}) (German: ${page("de", path)}): ${description}`

function build(): string {
  const caseStudies = listCaseStudies("en")
  const posts = listBlogPosts("en")
  const terms = glossaryTermSlugs
    .map((slug) => getGlossaryTerm(slug, "en"))
    .filter((t) => t !== undefined)
    .sort((a, b) => a.term.localeCompare(b.term))

  return [
    "# smiit GmbH",
    "",
    '> smiit GmbH is a German digital consultancy based in Ehingen (Donau), Baden-Württemberg, that helps small and mid-sized enterprises (SMEs / "Mittelstand") in Germany, Austria and Switzerland run a data-driven transformation. We deliver tailored digital solutions across five areas: custom apps and workflow automation, data analytics and business intelligence (Power BI, Microsoft Fabric), digital strategy and cloud (Azure), company websites, and our own product smiit Analytics.',
    "",
    `Website: ${SITE}`,
    "Languages: German (default, /de/) and English (/en/); every page exists in both.",
    "Contact: kontakt@smiit.de · +49 160 4073198",
    "Address: Reiherweg 96, 89584 Ehingen (Donau), Germany",
    "Founders / managing directors: Sebastian Grab, Noah Neßlauer",
    "",
    "## Core pages",
    "",
    pair("Home", "", "Overview of smiit GmbH and our value proposition for SMEs."),
    pair("About", "about", "Who we are, our mission and values, and the founders."),
    pair("Contact", "contact", "Email, phone, contact form and online appointment booking."),
    "",
    "## Services",
    "",
    pair(
      "Apps & Workflows",
      "services/apps",
      "Custom web applications, system integrations via APIs and workflow automation.",
    ),
    pair(
      "Data Analytics",
      "services/analytics",
      "Power BI dashboards, data platforms, KPIs and business intelligence.",
    ),
    pair(
      "Digital Strategy",
      "services/strategy",
      "Digital strategy, process optimisation, Azure cloud and IT security.",
    ),
    pair("Company websites", "website", "Design and development of fast, mobile-first company websites for SMEs."),
    "",
    "## Products",
    "",
    pair(
      "smiit Analytics",
      "products/smiit-analytics",
      "Ready-made analytics and Power BI reporting for bexio users, with pre-built dashboards and KPIs.",
    ),
    "",
    "## Case studies",
    "",
    pair("Case studies overview", "case-studies", "Selected client projects with real numbers."),
    ...caseStudies.map((c) => pair(`${c.client}: ${c.title}`, `case-studies/${c.slug}`, c.summary)),
    "",
    "## Blog",
    "",
    pair("Blog overview", "blog", "In-depth articles on data analytics, cloud, AI and digital strategy."),
    ...posts.map((p) => pair(p.title, `blog/${p.slug}`, p.excerpt)),
    "",
    "## Glossary",
    "",
    pair(
      "Glossary overview",
      "glossary",
      "Definitions of key terms in data analytics, digital platforms, automation and cloud.",
    ),
    ...terms.map((t) => pair(t.term, `glossary/${t.slug}`, t.shortDefinition)),
    "",
    "## Legal",
    "",
    pair("Legal notice (Impressum)", "legal-notice", "Company details as required by German law."),
    pair("Privacy policy", "privacy", "How personal data is processed on this website."),
    "",
  ].join("\n")
}

export function GET() {
  return new Response(build(), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
