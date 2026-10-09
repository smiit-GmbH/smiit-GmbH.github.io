// ---------- Datasets ----------
export type ViewKey = "today" | "week" | "month"

export type Priority = "high" | "med" | "low"

interface StatValue {
  to: number
  suffix?: string
  decimals?: number
  bar: number
  delta: string
}

interface PipelineCol {
  key: "incoming" | "active" | "done"
  count: number
  items: { name: string; amount: string }[]
}

interface ActivityVisual {
  initials: string
  color: string
}

interface TaskVisual {
  priority: Priority
}

export interface Dataset {
  stats: {
    orders: StatValue
    customers: StatValue
    tasks: StatValue
    revenue: StatValue
  }
  pipelineTotal: number
  pipeline: PipelineCol[]
  activityVisuals: ActivityVisual[]
  taskVisuals: TaskVisual[]
}

export const DATASETS: Record<ViewKey, Dataset> = {
  today: {
    stats: {
      orders: { to: 12, bar: 48, delta: "+3" },
      customers: { to: 47, bar: 62, delta: "+5" },
      tasks: { to: 8, bar: 32, delta: "-2" },
      revenue: { to: 8.4, decimals: 1, suffix: " k €", bar: 56, delta: "+12 %" },
    },
    pipelineTotal: 12,
    pipeline: [
      {
        key: "incoming",
        count: 4,
        items: [
          { name: "Müller GmbH", amount: "1.240 €" },
          { name: "Schmidt AG", amount: "890 €" },
          { name: "Klein KG", amount: "2.450 €" },
        ],
      },
      {
        key: "active",
        count: 3,
        items: [
          { name: "Weber KG", amount: "2.100 €" },
          { name: "Becker e.K.", amount: "560 €" },
        ],
      },
      {
        key: "done",
        count: 5,
        items: [
          { name: "Fischer GmbH", amount: "3.480 €" },
          { name: "Lehmann AG", amount: "720 €" },
        ],
      },
    ],
    activityVisuals: [
      { initials: "JM", color: "#F703EB" },
      { initials: "AS", color: "#475569" },
      { initials: "TW", color: "#94A3B8" },
      { initials: "MB", color: "#0B162D" },
    ],
    taskVisuals: [{ priority: "high" }, { priority: "high" }, { priority: "med" }, { priority: "low" }],
  },
  week: {
    stats: {
      orders: { to: 87, bar: 68, delta: "+12" },
      customers: { to: 124, bar: 78, delta: "+18" },
      tasks: { to: 23, bar: 52, delta: "+4" },
      revenue: { to: 62, suffix: " k €", bar: 64, delta: "+8 %" },
    },
    pipelineTotal: 64,
    pipeline: [
      {
        key: "incoming",
        count: 18,
        items: [
          { name: "Klein KG", amount: "2.450 €" },
          { name: "Walter GmbH", amount: "5.120 €" },
          { name: "Hofmann AG", amount: "880 €" },
        ],
      },
      {
        key: "active",
        count: 14,
        items: [
          { name: "Bauer e.K.", amount: "3.700 €" },
          { name: "Voss GmbH", amount: "1.180 €" },
        ],
      },
      {
        key: "done",
        count: 32,
        items: [
          { name: "Roth KG", amount: "4.640 €" },
          { name: "Krüger AG", amount: "1.290 €" },
        ],
      },
    ],
    activityVisuals: [
      { initials: "JM", color: "#F703EB" },
      { initials: "SV", color: "#475569" },
      { initials: "AS", color: "#94A3B8" },
      { initials: "MB", color: "#0B162D" },
    ],
    taskVisuals: [{ priority: "high" }, { priority: "high" }, { priority: "med" }, { priority: "low" }],
  },
  month: {
    stats: {
      orders: { to: 342, bar: 84, delta: "+47" },
      customers: { to: 287, bar: 88, delta: "+34" },
      tasks: { to: 47, bar: 60, delta: "+8" },
      revenue: { to: 245, suffix: " k €", bar: 76, delta: "+14 %" },
    },
    pipelineTotal: 248,
    pipeline: [
      {
        key: "incoming",
        count: 64,
        items: [
          { name: "Walter GmbH", amount: "5.120 €" },
          { name: "Schäfer AG", amount: "8.300 €" },
          { name: "Hofmann e.K.", amount: "1.640 €" },
        ],
      },
      {
        key: "active",
        count: 52,
        items: [
          { name: "Bauer KG", amount: "3.700 €" },
          { name: "Roth GmbH", amount: "12.400 €" },
        ],
      },
      {
        key: "done",
        count: 132,
        items: [
          { name: "Krüger AG", amount: "4.640 €" },
          { name: "Lange GmbH", amount: "2.890 €" },
        ],
      },
    ],
    activityVisuals: [
      { initials: "JM", color: "#F703EB" },
      { initials: "SV", color: "#475569" },
      { initials: "AS", color: "#94A3B8" },
      { initials: "MB", color: "#0B162D" },
    ],
    taskVisuals: [{ priority: "high" }, { priority: "high" }, { priority: "med" }, { priority: "low" }],
  },
}
