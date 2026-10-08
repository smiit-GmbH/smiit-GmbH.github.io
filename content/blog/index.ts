import type { LocalizedBlogPost } from "@/lib/blog"

import mlopsAzure from "./mlops-with-microsoft-azure"
import platformEconomy from "./platform-economy-for-it-service-providers"
import azureFrontDoor from "./azure-front-door-in-enterprise-architectures"
import smiitAnalyticsSaas from "./smiit-analytics-from-power-bi-to-saas"

/** Registry in display order — drives routes, sitemap and listings (see lib/blog.ts). */
export const blogPosts: Record<string, LocalizedBlogPost> = {
  "mlops-with-microsoft-azure": mlopsAzure,
  "platform-economy-for-it-service-providers": platformEconomy,
  "azure-front-door-in-enterprise-architectures": azureFrontDoor,
  "smiit-analytics-from-power-bi-to-saas": smiitAnalyticsSaas,
}
