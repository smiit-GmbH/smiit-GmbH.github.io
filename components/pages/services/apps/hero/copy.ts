import type { Dictionary } from "@/lib/dictionary"

type AppsHero = Omit<Dictionary["servicesAnalytics"]["hero"], keyof Dictionary["servicesApps"]["hero"]> &
  Dictionary["servicesApps"]["hero"]

export function buildHeroCopy(hero: AppsHero) {
  return {
    appName: (hero?.appName as string) ?? "OperationsHub",
    pageTitle: (hero?.pageTitle as string) ?? "Dashboard",
    updated: (hero?.updated as string) ?? "Aktualisiert",
    searchPlaceholder: (hero?.searchPlaceholder as string) ?? "Suche…",
    createNewLabel: (hero?.createNewLabel as string) ?? "+ Neuer Auftrag",
    avatarInitials: (hero?.avatarInitials as string) ?? "JM",
    teamActiveLabel: (hero?.teamActiveLabel as string) ?? "Team aktiv",
    sections: hero?.sections ?? {},
    statLabels: hero?.statLabels ?? {},
    statDeltas: hero?.statDeltas ?? {},
    pipelineColumns: hero?.pipelineColumns ?? {},
    taskPriorityLabels: hero?.taskPriorityLabels ?? {},
    views: hero?.views ?? { today: "Heute", week: "Woche", month: "Monat" },
    navItems: hero?.navItems ?? {
      dashboard: "Dashboard",
      orders: "Aufträge",
      customers: "Kunden",
      inventory: "Lager",
      reports: "Berichte",
      settings: "Einstellungen",
    },
    ariaLabels: hero?.ariaLabels ?? { timeRange: "Zeitraum", mainNav: "Hauptnavigation" },
    activeBadge: (hero?.activeBadge as string) ?? "aktiv",
    activitiesByView: hero?.activitiesByView ?? { today: [], week: [], month: [] },
    tasksByView: hero?.tasksByView ?? { today: [], week: [], month: [] },
  }
}

export type HeroCopy = ReturnType<typeof buildHeroCopy>
