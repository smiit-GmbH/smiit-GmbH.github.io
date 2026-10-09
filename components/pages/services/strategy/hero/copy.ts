import type { Dictionary } from "@/lib/dictionary"

export function buildHeroCopy(hero: Dictionary["servicesStrategy"]["hero"]) {
  return {
    dashboardTitle: (hero?.dashboardTitle as string) ?? "Digital Strategy Cockpit",
    sourcesConnected: hero?.sourcesConnected as string,
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
    milestoneLabels: hero?.milestoneLabels ?? {},
    bottomLabels: hero?.bottomLabels ?? { q: [], h: [], y: [] },
    ariaLabels: hero?.ariaLabels ?? { timeRange: "Zeitraum" },
  }
}

export type HeroCopy = ReturnType<typeof buildHeroCopy>
