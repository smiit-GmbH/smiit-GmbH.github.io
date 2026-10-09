import type { Locale } from "@/lib/dictionary"
import { formatNumber } from "@/components/pages/services/shared/hero-kit"

// ---------- Datasets ----------
export type PeriodKey = "q" | "h" | "y"

export type ThemeKey = "cloud" | "security" | "data" | "process"

export type RiskKey = "compliance" | "cyber" | "vendor" | "operational"

export type PhaseKey = "sondieren" | "konzipieren" | "umsetzen" | "verankern"

type MilestoneStatus = "done" | "progress" | "planned"

type RiskTrendDir = "down" | "flat" | "up"

type MilestoneKey =
  | "tenantAudit"
  | "landingZone"
  | "iacMigration"
  | "multiRegion"
  | "mfaRollout"
  | "zeroTrust"
  | "identityGov"
  | "socSetup"
  | "dataLineage"
  | "masterData"
  | "selfService"
  | "processMap"
  | "bpmnModels"
  | "powerAutomate"
  | "kpiSteering"
  | "patchAudit"
  | "data"
  | "sourceInventory"
  | "processMapping"
  | "top3Modeling"
  | "pilotWorkflow"
  | "iacSetup"

interface MaturityScore {
  current: number
  target: number
  delta: number
  deltaUnit: "pp"
}

interface Milestone {
  x: number
  status: MilestoneStatus
  labelKey: MilestoneKey
}

interface Lane {
  key: ThemeKey
  milestones: Milestone[]
}

export interface RiskState {
  level: number
  trend: RiskTrendDir
}

export interface InitiativeBucket {
  count: number
  bar: number
}

export interface Dataset {
  maturity: Record<ThemeKey, MaturityScore>
  trendHeader: number
  trendHeaderUnit: "pp"
  todayPercent: number
  lanes: Lane[]
  risks: Record<RiskKey, RiskState>
  riskTrend: number[]
  initiatives: Record<PhaseKey, InitiativeBucket>
}

export const DATASETS: Record<PeriodKey, Dataset> = {
  y: {
    maturity: {
      cloud: { current: 3.4, target: 4.2, delta: 0.8, deltaUnit: "pp" },
      security: { current: 2.1, target: 4.0, delta: 1.9, deltaUnit: "pp" },
      data: { current: 2.8, target: 4.1, delta: 1.3, deltaUnit: "pp" },
      process: { current: 3.0, target: 4.5, delta: 1.5, deltaUnit: "pp" },
    },
    trendHeader: 1.4,
    trendHeaderUnit: "pp",
    todayPercent: 38,
    lanes: [
      {
        key: "cloud",
        milestones: [
          { x: 8, status: "done", labelKey: "tenantAudit" },
          { x: 28, status: "done", labelKey: "landingZone" },
          { x: 50, status: "progress", labelKey: "iacMigration" },
          { x: 78, status: "planned", labelKey: "multiRegion" },
        ],
      },
      {
        key: "security",
        milestones: [
          { x: 12, status: "done", labelKey: "mfaRollout" },
          { x: 35, status: "progress", labelKey: "zeroTrust" },
          { x: 60, status: "planned", labelKey: "identityGov" },
          { x: 88, status: "planned", labelKey: "socSetup" },
        ],
      },
      {
        key: "data",
        milestones: [
          { x: 15, status: "done", labelKey: "dataLineage" },
          { x: 42, status: "progress", labelKey: "masterData" },
          { x: 70, status: "planned", labelKey: "selfService" },
        ],
      },
      {
        key: "process",
        milestones: [
          { x: 5, status: "done", labelKey: "processMap" },
          { x: 25, status: "progress", labelKey: "bpmnModels" },
          { x: 55, status: "planned", labelKey: "powerAutomate" },
          { x: 82, status: "planned", labelKey: "kpiSteering" },
        ],
      },
    ],
    risks: {
      compliance: { level: 3, trend: "down" },
      cyber: { level: 4, trend: "down" },
      vendor: { level: 2, trend: "flat" },
      operational: { level: 3, trend: "down" },
    },
    riskTrend: [22, 24, 22, 18, 16, 14, 12, 10],
    initiatives: {
      sondieren: { count: 2, bar: 24 },
      konzipieren: { count: 3, bar: 38 },
      umsetzen: { count: 4, bar: 56 },
      verankern: { count: 1, bar: 14 },
    },
  },
  h: {
    maturity: {
      cloud: { current: 3.0, target: 3.7, delta: 0.7, deltaUnit: "pp" },
      security: { current: 1.8, target: 3.2, delta: 1.4, deltaUnit: "pp" },
      data: { current: 2.5, target: 3.5, delta: 1.0, deltaUnit: "pp" },
      process: { current: 2.7, target: 3.8, delta: 1.1, deltaUnit: "pp" },
    },
    trendHeader: 1.1,
    trendHeaderUnit: "pp",
    todayPercent: 32,
    lanes: [
      {
        key: "cloud",
        milestones: [
          { x: 14, status: "done", labelKey: "tenantAudit" },
          { x: 38, status: "done", labelKey: "landingZone" },
          { x: 65, status: "progress", labelKey: "iacMigration" },
          { x: 90, status: "planned", labelKey: "multiRegion" },
        ],
      },
      {
        key: "security",
        milestones: [
          { x: 18, status: "done", labelKey: "mfaRollout" },
          { x: 50, status: "progress", labelKey: "zeroTrust" },
          { x: 82, status: "planned", labelKey: "identityGov" },
        ],
      },
      {
        key: "data",
        milestones: [
          { x: 22, status: "done", labelKey: "dataLineage" },
          { x: 58, status: "progress", labelKey: "masterData" },
          { x: 86, status: "planned", labelKey: "selfService" },
        ],
      },
      {
        key: "process",
        milestones: [
          { x: 8, status: "done", labelKey: "processMap" },
          { x: 36, status: "progress", labelKey: "bpmnModels" },
          { x: 72, status: "planned", labelKey: "powerAutomate" },
        ],
      },
    ],
    risks: {
      compliance: { level: 4, trend: "down" },
      cyber: { level: 4, trend: "down" },
      vendor: { level: 2, trend: "flat" },
      operational: { level: 3, trend: "flat" },
    },
    riskTrend: [22, 22, 20, 18, 16, 14],
    initiatives: {
      sondieren: { count: 2, bar: 28 },
      konzipieren: { count: 2, bar: 26 },
      umsetzen: { count: 3, bar: 42 },
      verankern: { count: 1, bar: 14 },
    },
  },
  q: {
    maturity: {
      cloud: { current: 2.7, target: 3.2, delta: 0.5, deltaUnit: "pp" },
      security: { current: 1.6, target: 2.4, delta: 0.8, deltaUnit: "pp" },
      data: { current: 2.3, target: 3.0, delta: 0.7, deltaUnit: "pp" },
      process: { current: 2.5, target: 3.2, delta: 0.7, deltaUnit: "pp" },
    },
    trendHeader: 0.7,
    trendHeaderUnit: "pp",
    todayPercent: 45,
    lanes: [
      {
        key: "cloud",
        milestones: [
          { x: 10, status: "done", labelKey: "tenantAudit" },
          { x: 50, status: "progress", labelKey: "landingZone" },
          { x: 88, status: "planned", labelKey: "iacSetup" },
        ],
      },
      {
        key: "security",
        milestones: [
          { x: 18, status: "done", labelKey: "patchAudit" },
          { x: 55, status: "progress", labelKey: "mfaRollout" },
        ],
      },
      {
        key: "data",
        milestones: [
          { x: 30, status: "progress", labelKey: "data" },
          { x: 82, status: "planned", labelKey: "sourceInventory" },
        ],
      },
      {
        key: "process",
        milestones: [
          { x: 12, status: "done", labelKey: "processMapping" },
          { x: 45, status: "progress", labelKey: "top3Modeling" },
          { x: 90, status: "planned", labelKey: "pilotWorkflow" },
        ],
      },
    ],
    risks: {
      compliance: { level: 4, trend: "flat" },
      cyber: { level: 4, trend: "flat" },
      vendor: { level: 3, trend: "flat" },
      operational: { level: 3, trend: "flat" },
    },
    riskTrend: [20, 20, 19, 18],
    initiatives: {
      sondieren: { count: 3, bar: 38 },
      konzipieren: { count: 2, bar: 28 },
      umsetzen: { count: 1, bar: 14 },
      verankern: { count: 0, bar: 0 },
    },
  },
}

export function formatDelta(value: number, decimals: number, unit: string, lang: Locale): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${formatNumber(value, decimals, lang)} ${unit}`
}
