import assert from "node:assert/strict"
import { describe, test } from "node:test"

import { blogPosts } from "@/content/blog"
import { caseStudySlugs } from "@/lib/case-studies"
import { blogCategoryMeta, blogPostSlugs, type BlogBlock, type BlogPostContent } from "@/lib/blog"
import {
  LOCALES,
  URL_SAFE_SLUG,
  contentFileSlugs,
  duplicates,
  isIsoDate,
  isNonEmpty,
  localizedRouteExists,
  publicFileExists,
} from "./helpers"

/** Every (slug, locale, post) triple that is actually published. */
const variants: { slug: string; lang: string; post: BlogPostContent }[] = blogPostSlugs.flatMap((slug) =>
  LOCALES.flatMap((lang) => {
    const post = blogPosts[slug][lang]
    return post ? [{ slug, lang, post }] : []
  }),
)

/** Local image paths referenced by a post (hero/og/cover + image blocks). */
function localImages(post: BlogPostContent): string[] {
  const urls = [post.heroImage?.url, post.ogImage?.url, post.coverImage?.url]
  for (const block of post.blocks) if (block.type === "image") urls.push(block.src)
  return urls.filter((u): u is string => typeof u === "string" && u.startsWith("/"))
}

describe("blog content", () => {
  test("registry and content/blog/*.ts files match one-to-one", () => {
    assert.deepEqual([...blogPostSlugs].sort(), contentFileSlugs("blog"))
  })

  test("slugs are unique and URL-safe", () => {
    assert.deepEqual(duplicates(blogPostSlugs), [])
    for (const slug of blogPostSlugs) assert.match(slug, URL_SAFE_SLUG)
  })

  test("every post has at least one locale variant", () => {
    for (const slug of blogPostSlugs) {
      assert.ok(
        LOCALES.some((lang) => blogPosts[slug][lang]),
        `${slug} has no locale variant`,
      )
    }
  })

  test("each variant's slug matches its registry key / file name", () => {
    for (const { slug, lang, post } of variants) assert.equal(post.slug, slug, `${slug} (${lang})`)
  })

  test("locale variants agree on language-agnostic fields", () => {
    for (const slug of blogPostSlugs) {
      const present = LOCALES.map((lang) => blogPosts[slug][lang]).filter((p): p is BlogPostContent => Boolean(p))
      const [first, ...rest] = present
      for (const other of rest) {
        for (const key of [
          "category",
          "datePublished",
          "dateModified",
          "relatedServicePath",
          "relatedCaseStudySlug",
        ] as const) {
          assert.equal(other[key], first[key], `${slug}: ${key} differs between locales`)
        }
        assert.equal(other.blocks.length, first.blocks.length, `${slug}: block count differs between locales`)
        assert.equal(other.sources?.length, first.sources?.length, `${slug}: source count differs between locales`)
      }
    }
  })

  test("required text fields are non-empty", () => {
    for (const { slug, lang, post } of variants) {
      for (const key of ["title", "excerpt", "author", "metaTitle", "metaDescription"] as const) {
        assert.ok(isNonEmpty(post[key]), `${slug} (${lang}): empty ${key}`)
      }
      assert.ok(post.blocks.length > 0, `${slug} (${lang}): no blocks`)
      assert.ok(post.keywords.length > 0 && post.keywords.every(isNonEmpty), `${slug} (${lang}): empty keywords`)
      for (const item of post.faq ?? []) {
        assert.ok(isNonEmpty(item.question) && isNonEmpty(item.answer), `${slug} (${lang}): empty FAQ item`)
      }
    }
  })

  test("dates are valid ISO dates and dateModified >= datePublished", () => {
    for (const { slug, lang, post } of variants) {
      assert.ok(isIsoDate(post.datePublished), `${slug} (${lang}): datePublished ${post.datePublished}`)
      assert.ok(isIsoDate(post.dateModified), `${slug} (${lang}): dateModified ${post.dateModified}`)
      assert.ok(post.dateModified >= post.datePublished, `${slug} (${lang}): modified before published`)
    }
  })

  test("category is known", () => {
    for (const { slug, lang, post } of variants) {
      assert.ok(post.category in blogCategoryMeta, `${slug} (${lang}): unknown category ${post.category}`)
    }
  })

  test("citation refs / itemRefs are 1-based indices within sources", () => {
    for (const { slug, lang, post } of variants) {
      const n = post.sources?.length ?? 0
      const check = (refs: number[] | undefined, where: string) => {
        for (const ref of refs ?? []) {
          assert.ok(
            Number.isInteger(ref) && ref >= 1 && ref <= n,
            `${slug} (${lang}) ${where}: ref ${ref} outside 1..${n}`,
          )
        }
      }
      post.blocks.forEach((block: BlogBlock, i) => {
        if (block.type === "paragraph") check(block.refs, `block ${i}`)
        if (block.type === "bullets" && block.itemRefs) {
          for (const [itemIndex, refs] of Object.entries(block.itemRefs)) {
            const idx = Number(itemIndex)
            assert.ok(
              Number.isInteger(idx) && idx >= 0 && idx < block.items.length,
              `${slug} (${lang}) block ${i}: itemRefs key ${itemIndex} outside 0..${block.items.length - 1}`,
            )
            check(refs, `block ${i} item ${itemIndex}`)
          }
        }
      })
    }
  })

  test("sources have a title and an absolute https URL when linked", () => {
    for (const { slug, lang, post } of variants) {
      for (const source of post.sources ?? []) {
        assert.ok(isNonEmpty(source.title), `${slug} (${lang}): source without title`)
        if (source.url !== undefined) assert.match(source.url, /^https:\/\/\S+$/, `${slug} (${lang}): ${source.url}`)
      }
    }
  })

  test("referenced local images exist under public/", () => {
    for (const { slug, lang, post } of variants) {
      for (const src of localImages(post)) assert.ok(publicFileExists(src), `${slug} (${lang}): missing ${src}`)
    }
  })

  test("image blocks have alt text and positive dimensions", () => {
    for (const { slug, lang, post } of variants) {
      for (const block of post.blocks) {
        if (block.type !== "image") continue
        assert.ok(isNonEmpty(block.alt), `${slug} (${lang}): image ${block.src} without alt`)
        assert.ok(block.width > 0 && block.height > 0, `${slug} (${lang}): image ${block.src} has no size`)
      }
    }
  })

  test("table rows match the header column count", () => {
    for (const { slug, lang, post } of variants) {
      for (const block of post.blocks) {
        if (block.type !== "table") continue
        for (const row of block.rows) {
          assert.equal(row.length, block.headers.length, `${slug} (${lang}): table row ${JSON.stringify(row[0])}`)
        }
      }
    }
  })

  test("relatedServicePath points to an existing service route", () => {
    for (const { slug, lang, post } of variants) {
      assert.ok(localizedRouteExists(post.relatedServicePath), `${slug} (${lang}): ${post.relatedServicePath}`)
    }
  })

  test("relatedCaseStudySlug resolves to an existing case study", () => {
    for (const { slug, lang, post } of variants) {
      if (post.relatedCaseStudySlug === undefined) continue
      assert.ok(caseStudySlugs.includes(post.relatedCaseStudySlug), `${slug} (${lang}): ${post.relatedCaseStudySlug}`)
    }
  })
})
