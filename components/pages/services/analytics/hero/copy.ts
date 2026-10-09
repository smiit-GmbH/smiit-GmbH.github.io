import type { Dictionary } from "@/lib/dictionary"

export function buildHeroCopy(hero: Dictionary["servicesAnalytics"]["hero"]) {
  return {
    sourcesConnected: hero?.sourcesConnected as string,
    platform: (hero?.platform as string) ?? "Power BI",
    updated: hero?.updated as string,
    sections: hero?.sections ?? {},
    months: (hero?.months ?? []) as string[],
    kpiLabels: hero?.kpiLabels ?? {},
    chartLegend: hero?.chartLegend ?? {},
    signalLabels: hero?.signalLabels ?? {},
    signalRadar: hero?.signalRadar ?? {},
    segments: hero?.segments ?? {},
    periods: hero?.periods ?? { q: "Quartal", h: "6 Monate", y: "12 Monate" },
    trendTooltip: hero?.trendTooltip ?? {},
    kpiDeltaLabels: hero?.kpiDeltaLabels ?? {},
    ariaLabels: hero?.ariaLabels ?? { timeRange: "Zeitraum" },
    dashboardTitle: (hero?.dashboardTitle as string) ?? "Management Dashboard",
    millionSuffix: (hero?.millionSuffix as string) ?? " Mio.",
    bottomLabels: hero?.bottomLabels ?? { q: [], h: [], y: [] },
    linePointLabels: hero?.linePointLabels ?? { q: [], h: [], y: [] },
    forecastPointLabels: hero?.forecastPointLabels ?? { q: "", h: "", y: "" },
    signalValues: hero?.signalValues ?? {},
  }
}

export type HeroCopy = ReturnType<typeof buildHeroCopy>
