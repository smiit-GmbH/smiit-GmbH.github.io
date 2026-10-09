import {
  ArrowLeftRight,
  BarChart3,
  Boxes,
  Brain,
  Database,
  Hexagon,
  Layers,
  RefreshCw,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react"
import { ArrowSep, DBox, GroupLabel, Shell, StepFlow, type DiagramProps, type Step } from "./primitives"

// ── Analytics diagrams ──────────────────────────────────────────────────
export function MedallionDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Schichtenmodell",
          badge: "Bronze → Gold",
          label: "Medallion-Architektur",
          caption: "Daten werden schichtweise veredelt: roh → bereinigt → analysebereit.",
          steps: [
            ["Bronze", "Rohdaten"],
            ["Silver", "bereinigt"],
            ["Gold", "analysebereit"],
          ],
        }
      : {
          eyebrow: "Layered model",
          badge: "Bronze → gold",
          label: "Medallion architecture",
          caption: "Data is refined layer by layer: raw → cleaned → analysis-ready.",
          steps: [
            ["Bronze", "raw data"],
            ["Silver", "cleaned"],
            ["Gold", "analysis-ready"],
          ],
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Layers} label={t.label} caption={t.caption}>
      <StepFlow
        accent={color}
        steps={[
          { title: t.steps[0][0], sub: t.steps[0][1], tone: "soft", icon: Database },
          { title: t.steps[1][0], sub: t.steps[1][1], tone: "soft", icon: RefreshCw },
          { title: t.steps[2][0], sub: t.steps[2][1], tone: "solid", icon: Sparkles },
        ]}
      />
    </Shell>
  )
}

export function DataWarehouseDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Integration",
          badge: "konsolidiert",
          label: "Data Warehouse",
          caption: "Verteilte Quellen werden zentral integriert und konsistent fürs Reporting bereitgestellt.",
          sources: ["Excel", "SQL", "APIs"],
          hub: ["Data Warehouse", "zentral & konsistent"],
          out: ["Power BI", "Reporting"],
        }
      : {
          eyebrow: "Integration",
          badge: "consolidated",
          label: "Data warehouse",
          caption: "Distributed sources are integrated centrally and served consistently for reporting.",
          sources: ["Excel", "SQL", "APIs"],
          hub: ["Data warehouse", "central & consistent"],
          out: ["Power BI", "reporting"],
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Database} label={t.label} caption={t.caption}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="flex flex-col gap-1.5">
          {t.sources.map((s) => (
            <span
              key={s}
              className="rounded-lg border bg-white px-2.5 py-1.5 text-center text-[0.72rem] font-semibold text-[#0B162D]"
              style={{ borderColor: `${color}33` }}
            >
              {s}
            </span>
          ))}
        </div>
        <ArrowSep />
        <DBox title={t.hub[0]} sub={t.hub[1]} tone="solid" accent={color} icon={Database} />
        <ArrowSep />
        <DBox title={t.out[0]} sub={t.out[1]} tone="soft" accent={color} icon={BarChart3} />
      </div>
    </Shell>
  )
}

export function StarSchemaDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Datenmodell",
          badge: "Sternschema",
          label: "Sternschema",
          caption: "Eine zentrale Faktentabelle verbindet sich direkt mit mehreren Dimensionen.",
          fact: ["Faktentabelle", "Kennzahlen"],
          dims: ["Zeit", "Kunde", "Produkt", "Region"],
        }
      : {
          eyebrow: "Data model",
          badge: "Star schema",
          label: "Star schema",
          caption: "A central fact table connects directly to several dimensions.",
          fact: ["Fact table", "metrics"],
          dims: ["Time", "Customer", "Product", "Region"],
        }
  const dimChip = (d: string) => (
    <span
      key={d}
      className="rounded-lg border bg-white px-2.5 py-1.5 text-[0.72rem] font-semibold text-[#0B162D]"
      style={{ borderColor: `${color}33` }}
    >
      {d}
    </span>
  )
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Star} label={t.label} caption={t.caption}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="flex flex-col gap-2">{t.dims.slice(0, 2).map(dimChip)}</div>
        <DBox title={t.fact[0]} sub={t.fact[1]} tone="solid" accent={color} icon={Star} />
        <div className="flex flex-col gap-2">{t.dims.slice(2).map(dimChip)}</div>
      </div>
    </Shell>
  )
}

export function EtlEltDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Datenfluss",
          badge: "Reihenfolge",
          label: "ETL vs. ELT",
          caption: "Der Unterschied liegt in der Reihenfolge: ETL transformiert vor dem Laden, ELT danach.",
          e: "Extrahieren",
          tr: "Transformieren",
          l: "Laden",
        }
      : {
          eyebrow: "Data flow",
          badge: "Order",
          label: "ETL vs. ELT",
          caption: "The difference is the order: ETL transforms before loading, ELT afterwards.",
          e: "Extract",
          tr: "Transform",
          l: "Load",
        }
  return (
    <Shell
      accent={color}
      eyebrow={t.eyebrow}
      badge={t.badge}
      badgeIcon={ArrowLeftRight}
      label={t.label}
      caption={t.caption}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <GroupLabel accent={color}>ETL</GroupLabel>
          <StepFlow accent={color} steps={[{ title: t.e }, { title: t.tr }, { title: t.l, tone: "solid" }]} />
        </div>
        <div className="flex items-center gap-3">
          <GroupLabel accent={color}>ELT</GroupLabel>
          <StepFlow accent={color} steps={[{ title: t.e }, { title: t.l, tone: "solid" }, { title: t.tr }]} />
        </div>
      </div>
    </Shell>
  )
}

export function PowerBiDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Ablauf",
          badge: "Quelle → Bericht",
          label: "Power BI",
          caption: "Daten werden angebunden, aufbereitet, modelliert und als Bericht ausgeliefert.",
          steps: [["Datenquellen"], ["Power Query"], ["Modell + DAX"], ["Bericht"]],
        }
      : {
          eyebrow: "Flow",
          badge: "Source → report",
          label: "Power BI",
          caption: "Data is connected, prepared, modelled and delivered as a report.",
          steps: [["Data sources"], ["Power Query"], ["Model + DAX"], ["Report"]],
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={BarChart3} label={t.label} caption={t.caption}>
      <StepFlow
        accent={color}
        steps={[
          { title: t.steps[0][0], icon: Database },
          { title: t.steps[1][0], icon: RefreshCw },
          { title: t.steps[2][0], icon: Boxes },
          { title: t.steps[3][0], tone: "solid", icon: BarChart3 },
        ]}
      />
    </Shell>
  )
}

export function SemanticModelDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Schicht",
          badge: "semantische Schicht",
          label: "Semantic Model",
          caption: "Das Semantic Model liegt zwischen Rohdaten und Berichten: Tabellen, Beziehungen, Measures.",
          top: ["Berichte & Dashboards"],
          mid: ["Semantic Model", "Tabellen · Beziehungen · Measures"],
          bottom: ["Datenquellen"],
        }
      : {
          eyebrow: "Layer",
          badge: "semantic layer",
          label: "Semantic model",
          caption: "The semantic model sits between raw data and reports: tables, relationships, measures.",
          top: ["Reports & dashboards"],
          mid: ["Semantic model", "tables · relationships · measures"],
          bottom: ["Data sources"],
        }
  const segs: Step[] = [
    { title: t.top[0], tone: "soft", icon: BarChart3 },
    { title: t.mid[0], sub: t.mid[1], tone: "solid", icon: Layers },
    { title: t.bottom[0], tone: "plain", icon: Database },
  ]
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Layers} label={t.label} caption={t.caption}>
      <StepFlow accent={color} vertical steps={segs} />
    </Shell>
  )
}

export function FabricDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Plattform",
          badge: "ein OneLake",
          label: "Microsoft Fabric",
          caption: "Fabric vereint mehrere Workloads auf einem zentralen Datalake (OneLake).",
          nodes: ["Data Engineering", "Data Warehouse", "Data Science", "Power BI"],
          center: ["OneLake", "ein Datalake"],
        }
      : {
          eyebrow: "Platform",
          badge: "one OneLake",
          label: "Microsoft Fabric",
          caption: "Fabric unifies several workloads on one central data lake (OneLake).",
          nodes: ["Data Engineering", "Data Warehouse", "Data Science", "Power BI"],
          center: ["OneLake", "one data lake"],
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Hexagon} label={t.label} caption={t.caption}>
      <div className="flex flex-col items-center gap-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {t.nodes.map((n) => (
            <span
              key={n}
              className="rounded-lg border bg-white px-2.5 py-2 text-center text-[0.7rem] font-semibold text-[#0B162D]"
              style={{ borderColor: `${color}33` }}
            >
              {n}
            </span>
          ))}
        </div>
        <ArrowSep vertical />
        <DBox title={t.center[0]} sub={t.center[1]} tone="solid" accent={color} icon={Hexagon} />
      </div>
    </Shell>
  )
}

export function MlopsDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Kreislauf",
          badge: "Retraining",
          label: "MLOps",
          caption: "Modelle altern: Monitoring erkennt Drift, ein Retraining schließt den Kreislauf.",
          steps: ["Daten", "Training", "Deployment", "Monitoring"],
        }
      : {
          eyebrow: "Loop",
          badge: "retraining",
          label: "MLOps",
          caption: "Models age: monitoring detects drift, retraining closes the loop.",
          steps: ["Data", "Training", "Deployment", "Monitoring"],
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={RefreshCw} label={t.label} caption={t.caption}>
      <StepFlow
        accent={color}
        steps={[
          { title: t.steps[0], icon: Database },
          { title: t.steps[1], icon: Brain },
          { title: t.steps[2], icon: Rocket },
          { title: t.steps[3], tone: "solid", icon: RefreshCw },
        ]}
      />
    </Shell>
  )
}
