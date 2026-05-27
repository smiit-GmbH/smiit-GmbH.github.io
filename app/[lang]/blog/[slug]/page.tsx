import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Locale } from "@/lib/dictionary"
import {
  buildBlogArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildPageMetadata,
} from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { blogCategoryMeta, blogPostSlugsFor, getBlogPost, getBlogUi } from "@/lib/blog"
import BlogPostPage from "@/components/pages/blog/BlogPostPage"

export const dynamicParams = false

export async function generateStaticParams() {
  const langs: Locale[] = ["de", "en"]
  return langs.flatMap((lang) => blogPostSlugsFor(lang).map((slug) => ({ lang, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getBlogPost(slug, lang)
  if (!post) return {}

  return buildPageMetadata({
    lang,
    path: `blog/${slug}`,
    title: { de: post.metaTitle, en: post.metaTitle },
    description: { de: post.metaDescription, en: post.metaDescription },
    ogImage: post.ogImage,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const post = getBlogPost(slug, lang)
  if (!post) notFound()

  const ui = getBlogUi(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    lang,
    [
      { name: ui.breadcrumbLabel, path: "blog" },
      { name: post.shortTitle ?? post.title, path: `blog/${slug}` },
    ],
    false,
  )

  const articleJsonLd = buildBlogArticleJsonLd({
    lang,
    slug,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.author,
    image: post.ogImage?.url,
    articleSection: blogCategoryMeta[post.category].label[lang],
    keywords: post.keywords,
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      {post.faq && post.faq.length > 0 && <JsonLd data={buildFaqJsonLd(post.faq)} />}
      <BlogPostPage lang={lang} post={post} />
    </>
  )
}
