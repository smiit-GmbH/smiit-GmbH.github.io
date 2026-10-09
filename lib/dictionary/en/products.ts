import type { Dictionary } from "@/lib/dictionary"

export const products: Dictionary["products"] = {
  title: "Decisions backed\nby data, not guesswork",
  subtitle: "smiit products turn raw data into clear insights, enabling\nsmarter, fact-based business decisions.",
  cta: "Schedule a free demo",
  items: [
    {
      title: "Product\nScout",
      text: "AI-powered price comparison search engine for retailers and craftsmen. Search all your suppliers simultaneously.",
      image: "/assets/home/product_scout.webp",
      href: "#book",
    },
    {
      title: "smiit Analytics\nfor bexio",
      text: "Our bexio analysis dashboard for Swiss users automates your evaluations and consolidates all KPIs from bexio in clear reporting.",
      image: "/assets/home/smiit_analytics.webp",
      href: "/products/smiit-analytics",
    },
    {
      title: "Azai\nElevate",
      text: "Intelligent project management platform with AI-powered risk analysis and automated workflows for successful projects.",
      image: "/assets/home/azai.webp",
      href: "https://www.azai.ch",
      external: true,
    },
  ],
  ctaBottom: "Let's talk about your\nchallenges",
  ctaSubtext: "We'll advise you on your options — no strings attached.",
  ctaBottomButton: "Schedule a free demo",
}
