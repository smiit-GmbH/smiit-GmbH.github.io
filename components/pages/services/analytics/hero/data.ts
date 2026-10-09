// ---------- Datasets ----------
export type PeriodKey = "q" | "h" | "y"

type RiskLevelKey = "riskLow" | "riskMedium" | "riskHigh"

export interface SuffixSpec {
  type: "million" | "percent" | "none"
}

interface KpiSpec {
  to: number
  decimals?: number
  suffix: SuffixSpec
  bar: number
  deltaValue: number
  deltaDecimals?: number
  deltaUnit: "%" | "pp" | ""
}

interface LinePoint {
  x: number
  y: number
  valueNumber: number
  valueDecimals: number
  valueSuffix: SuffixSpec
  deltaValue: number
  deltaDecimals: number
  deltaUnit: "%" | "pp" | ""
}

export interface Dataset {
  kpis: {
    revenue: KpiSpec
    margin: KpiSpec
    forecastConfidence: KpiSpec
    activeProjects: KpiSpec
  }
  trendHeaderValue: number
  trendHeaderDecimals: number
  trendHeaderUnit: "%" | "pp"
  linePoints: LinePoint[]
  forecastPoint: { x: number; y: number; valueNumber: number; valueDecimals: number; valueSuffix: SuffixSpec }
  signals: {
    forecastRiskKey: RiskLevelKey
    deviationValue: number
    deviationDecimals: number
    opportunityScore: string
    trendStrengthValue: number
    trendStrengthDecimals: number
  }
  segments: { key: "dach" | "swiss" | "serviceUpsell" | "industrialLeads"; value: number }[]
  radarBars: number[]
}

export const DATASETS: Record<PeriodKey, Dataset> = {
  y: {
    kpis: {
      revenue: {
        to: 4.86,
        decimals: 2,
        suffix: { type: "million" },
        bar: 78,
        deltaValue: 18.4,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      margin: {
        to: 18.4,
        decimals: 1,
        suffix: { type: "percent" },
        bar: 64,
        deltaValue: 1.2,
        deltaDecimals: 1,
        deltaUnit: "pp",
      },
      forecastConfidence: {
        to: 89,
        suffix: { type: "percent" },
        bar: 89,
        deltaValue: 3,
        deltaDecimals: 0,
        deltaUnit: "pp",
      },
      activeProjects: { to: 27, suffix: { type: "none" }, bar: 54, deltaValue: 5, deltaDecimals: 0, deltaUnit: "" },
    },
    trendHeaderValue: 18.4,
    trendHeaderDecimals: 1,
    trendHeaderUnit: "%",
    linePoints: [
      {
        x: 18,
        y: 118,
        valueNumber: 0.28,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 4.1,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 112,
        y: 102,
        valueNumber: 1.12,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 9.6,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 208,
        y: 86,
        valueNumber: 2.04,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 12.2,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 304,
        y: 68,
        valueNumber: 3.18,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 14.8,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 398,
        y: 48,
        valueNumber: 4.12,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 18.4,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
    ],
    forecastPoint: { x: 492, y: 24, valueNumber: 4.86, valueDecimals: 2, valueSuffix: { type: "million" } },
    signals: {
      forecastRiskKey: "riskMedium",
      deviationValue: -7.2,
      deviationDecimals: 1,
      opportunityScore: "82/100",
      trendStrengthValue: 0.84,
      trendStrengthDecimals: 2,
    },
    segments: [
      { key: "dach", value: 82 },
      { key: "swiss", value: 63 },
      { key: "serviceUpsell", value: 47 },
      { key: "industrialLeads", value: 36 },
    ],
    radarBars: [14, 18, 16, 22, 28, 26, 32, 30],
  },
  h: {
    kpis: {
      revenue: {
        to: 2.41,
        decimals: 2,
        suffix: { type: "million" },
        bar: 52,
        deltaValue: 12.8,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      margin: {
        to: 17.1,
        decimals: 1,
        suffix: { type: "percent" },
        bar: 58,
        deltaValue: 0.8,
        deltaDecimals: 1,
        deltaUnit: "pp",
      },
      forecastConfidence: {
        to: 86,
        suffix: { type: "percent" },
        bar: 86,
        deltaValue: 2,
        deltaDecimals: 0,
        deltaUnit: "pp",
      },
      activeProjects: { to: 19, suffix: { type: "none" }, bar: 38, deltaValue: 3, deltaDecimals: 0, deltaUnit: "" },
    },
    trendHeaderValue: 12.8,
    trendHeaderDecimals: 1,
    trendHeaderUnit: "%",
    linePoints: [
      {
        x: 18,
        y: 122,
        valueNumber: 0.22,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 3.4,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 112,
        y: 108,
        valueNumber: 0.68,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 6.1,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 208,
        y: 92,
        valueNumber: 1.18,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 8.9,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 304,
        y: 78,
        valueNumber: 1.72,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 10.5,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 398,
        y: 60,
        valueNumber: 2.12,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 12.8,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
    ],
    forecastPoint: { x: 492, y: 38, valueNumber: 2.41, valueDecimals: 2, valueSuffix: { type: "million" } },
    signals: {
      forecastRiskKey: "riskLow",
      deviationValue: -4.1,
      deviationDecimals: 1,
      opportunityScore: "74/100",
      trendStrengthValue: 0.71,
      trendStrengthDecimals: 2,
    },
    segments: [
      { key: "dach", value: 68 },
      { key: "swiss", value: 54 },
      { key: "serviceUpsell", value: 38 },
      { key: "industrialLeads", value: 28 },
    ],
    radarBars: [12, 14, 12, 18, 22, 24, 28, 26],
  },
  q: {
    kpis: {
      revenue: {
        to: 1.18,
        decimals: 2,
        suffix: { type: "million" },
        bar: 38,
        deltaValue: 9.6,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      margin: {
        to: 19.2,
        decimals: 1,
        suffix: { type: "percent" },
        bar: 70,
        deltaValue: 0.4,
        deltaDecimals: 1,
        deltaUnit: "pp",
      },
      forecastConfidence: {
        to: 92,
        suffix: { type: "percent" },
        bar: 92,
        deltaValue: 1,
        deltaDecimals: 0,
        deltaUnit: "pp",
      },
      activeProjects: { to: 14, suffix: { type: "none" }, bar: 30, deltaValue: 2, deltaDecimals: 0, deltaUnit: "" },
    },
    trendHeaderValue: 9.6,
    trendHeaderDecimals: 1,
    trendHeaderUnit: "%",
    linePoints: [
      {
        x: 18,
        y: 116,
        valueNumber: 0.18,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 2.1,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 112,
        y: 110,
        valueNumber: 0.42,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 4.4,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 208,
        y: 96,
        valueNumber: 0.68,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 6.8,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 304,
        y: 82,
        valueNumber: 0.92,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 8.2,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
      {
        x: 398,
        y: 70,
        valueNumber: 1.08,
        valueDecimals: 2,
        valueSuffix: { type: "million" },
        deltaValue: 9.6,
        deltaDecimals: 1,
        deltaUnit: "%",
      },
    ],
    forecastPoint: { x: 492, y: 52, valueNumber: 1.18, valueDecimals: 2, valueSuffix: { type: "million" } },
    signals: {
      forecastRiskKey: "riskLow",
      deviationValue: -2.4,
      deviationDecimals: 1,
      opportunityScore: "68/100",
      trendStrengthValue: 0.62,
      trendStrengthDecimals: 2,
    },
    segments: [
      { key: "dach", value: 54 },
      { key: "swiss", value: 41 },
      { key: "serviceUpsell", value: 28 },
      { key: "industrialLeads", value: 22 },
    ],
    radarBars: [10, 14, 12, 16, 18, 22, 24, 28],
  },
}
