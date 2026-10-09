export function getLink(title: string) {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie")) return "/services/strategy"
  if (t.includes("analytics") || t.includes("analyse")) return "/services/analytics"
  if (t.includes("app") || t.includes("workflow")) return "/services/apps"
  return undefined
}

export function getImage(title: string) {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie")) return "/assets/home/services_consulting.webp"
  if (t.includes("analytics") || t.includes("analyse")) return "/assets/home/services_analytics.webp"
  if (t.includes("app") || t.includes("workflow")) return "/assets/home/services_apps.webp"
  return undefined
}

export function getAccent(title: string): { hex: string; lightHex: string; rgb: string; fg: string } {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie"))
    return { hex: "#64748B", lightHex: "#94A3B8", rgb: "100, 116, 139", fg: "#ffffff" }
  if (t.includes("analytics") || t.includes("analyse"))
    return { hex: "#21569c", lightHex: "#7DBBFF", rgb: "33, 86, 156", fg: "#ffffff" }
  if (t.includes("app") || t.includes("workflow"))
    return { hex: "#F703EB", lightHex: "#FB81F5", rgb: "247, 3, 235", fg: "#ffffff" }
  return { hex: "#21569c", lightHex: "#7DBBFF", rgb: "33, 86, 156", fg: "#ffffff" }
}
