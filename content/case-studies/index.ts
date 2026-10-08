import type { LocalizedCaseStudy } from "@/lib/case-studies"

import claimity from "./claimity-ag"
import dyProject from "./dy-project-ag"
import gbLogistics from "./gb-logistics-gmbh"

/** Registry in display order — drives routes, sitemap and listings (see lib/case-studies.ts). */
export const caseStudies: Record<string, LocalizedCaseStudy> = {
  "claimity-ag": claimity,
  "dy-project-ag": dyProject,
  "gb-logistics-gmbh": gbLogistics,
}
