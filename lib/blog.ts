import type { Locale } from "@/lib/dictionary"
import { blogPosts } from "@/content/blog"

/**
 * Blog content layer — mirrors the structure of `lib/case-studies.ts` and
 * `lib/glossary.ts`. Posts are stored as a typed, dictionary-style structure
 * (one entry per slug with a `de` and `en` variant). Each post lives in its own
 * file under `content/blog/<slug>.ts`; add a post by creating that file and
 * registering it in `content/blog/index.ts` (registry order = display order).
 * The route + sitemap pick it up automatically via `blogPostSlugs`. A post is only rendered for a locale if a variant exists for
 * it, so a German-only post does not 404 the English route — it simply does not
 * appear under `/en/blog`.
 *
 * Body copy is block-based so long-form articles can mix headings, prose,
 * bullet lists and code/flow blocks. Inline citations live in `sources` (not in
 * the prose) to keep paragraphs clean and the references in one place.
 * Paragraphs and bullets support `**bold**` spans (emphasis / lead-ins) and
 * backtick `code` spans, which are excluded from glossary auto-linking.
 */

export * from "./blog-meta"
import { getReadingMinutes, type BlogPostContent, type BlogPostSummary } from "./blog-meta"

// ---------------------------------------------------------------------------
// Registry + helpers
// ---------------------------------------------------------------------------

/** All slugs (language-agnostic). */
export const blogPostSlugs = Object.keys(blogPosts)

/** Slugs that have a variant for the given locale — used for static params + sitemap. */
export function blogPostSlugsFor(lang: Locale): string[] {
  return blogPostSlugs.filter((slug) => Boolean(blogPosts[slug]?.[lang]))
}

export function getBlogPost(slug: string, lang: Locale): BlogPostContent | undefined {
  return blogPosts[slug]?.[lang]
}

/** Posts available in the given locale, newest first. */
export function listBlogPosts(lang: Locale): BlogPostContent[] {
  return blogPostSlugsFor(lang)
    .map((slug) => blogPosts[slug][lang] as BlogPostContent)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
}

/** Index-card data for the posts available in the given locale, newest first. */
export function listBlogPostSummaries(lang: Locale): BlogPostSummary[] {
  return listBlogPosts(lang).map((post) => ({
    slug: post.slug,
    category: post.category,
    datePublished: post.datePublished,
    author: post.author,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    minutes: getReadingMinutes(post),
  }))
}
