import React, { Fragment } from "react"
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  Boxes,
  Brain,
  Building2,
  Cloud,
  Database,
  Fingerprint,
  GitBranch,
  Hexagon,
  Infinity as InfinityIcon,
  KeyRound,
  Layers,
  Lock,
  Network,
  RefreshCw,
  Rocket,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import type { Locale } from "@/lib/dictionary"

/**
 * Glossary diagrams as themed HTML/Tailwind compositions (portfolio look):
 * card shell with accent gradient + soft shadow, eyebrow + status pill, tinted
 * chips, icons and depth. Each diagram uses a layout that fits its concept and
 * is tinted with the term's cluster accent (`color`). Server-rendered (SSG) so
 * the labels ship as real, crawlable text.
 */

type DiagramProps = { lang: Locale; color: string }
const INK = "#0B162D"

// ── Atoms ─────────────────────────────────────────────────────────────────
function Shell({
  accent,
  eyebrow,
  badge,
  badgeIcon: BadgeIcon,
  label,
  caption,
  children,
}: {
  accent: string
  eyebrow: string
  badge?: string
  badgeIcon?: LucideIcon
  label: string
  caption: string
  children: React.ReactNode
}) {
  return (
    <figure aria-label={label} className="mx-auto w-full max-w-[460px]">
      <div
        className="relative overflow-hidden rounded-[1.6rem] border bg-white p-5 sm:p-6"
        style={{ borderColor: `${accent}26`, boxShadow: `0 18px 44px ${accent}1f` }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
          style={{ background: `radial-gradient(circle, ${accent}14, transparent 70%)` }}
        />
        <div className="relative mb-4 flex items-center justify-between gap-3">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#0B162D]/40">{eyebrow}</span>
          {badge ? (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: `${accent}1f`, color: accent }}
            >
              {BadgeIcon ? <BadgeIcon className="h-3 w-3" /> : null}
              {badge}
            </span>
          ) : null}
        </div>
        <div className="relative">{children}</div>
      </div>
      <figcaption className="mt-3 text-center text-[0.8rem] leading-relaxed text-[#0B162D]/55">{caption}</figcaption>
    </figure>
  )
}

type BoxTone = "soft" | "solid" | "plain" | "dashed"

function DBox({
  title,
  sub,
  accent,
  tone = "soft",
  icon: Icon,
}: {
  title: string
  sub?: string
  accent: string
  tone?: BoxTone
  icon?: LucideIcon
}) {
  const solid = tone === "solid"
  const style =
    tone === "solid"
      ? { backgroundColor: accent, borderColor: accent }
      : tone === "plain"
        ? { backgroundColor: "#fff", borderColor: `${INK}24` }
        : tone === "dashed"
          ? { backgroundColor: "#fff", borderColor: `${INK}40`, borderStyle: "dashed" as const }
          : { backgroundColor: `${accent}0f`, borderColor: `${accent}40` }
  return (
    <div className="flex min-w-[92px] flex-col items-center justify-center rounded-xl border px-3 py-2.5 text-center" style={style}>
      {Icon ? <Icon className="mb-1 h-4 w-4" style={{ color: solid ? "#fff" : accent }} /> : null}
      <span className="text-[0.82rem] font-semibold leading-tight" style={{ color: solid ? "#fff" : INK }}>
        {title}
      </span>
      {sub ? (
        <span className="mt-0.5 text-[0.66rem] leading-tight" style={{ color: solid ? "#ffffffcc" : `${INK}99` }}>
          {sub}
        </span>
      ) : null}
    </div>
  )
}

function ArrowSep({ vertical = false }: { vertical?: boolean }) {
  const Icon = vertical ? ArrowDown : ArrowRight
  return <Icon className="h-4 w-4 shrink-0 self-center text-[#0B162D]/30" aria-hidden />
}

type Step = { title: string; sub?: string; tone?: BoxTone; icon?: LucideIcon }

function StepFlow({ steps, accent, vertical = false }: { steps: Step[]; accent: string; vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row flex-wrap justify-center"} items-center gap-1.5`}>
      {steps.map((s, i) => (
        <Fragment key={i}>
          <DBox title={s.title} sub={s.sub} tone={s.tone} icon={s.icon} accent={accent} />
          {i < steps.length - 1 ? <ArrowSep vertical={vertical} /> : null}
        </Fragment>
      ))}
    </div>
  )
}

function IconCard({ icon: Icon, title, sub, accent }: { icon?: LucideIcon; title: string; sub: string; accent: string }) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl border px-3 py-4 text-center"
      style={{ borderColor: `${accent}33`, backgroundImage: `linear-gradient(160deg, ${accent}12, transparent 72%)` }}
    >
      {Icon ? (
        <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}1f` }}>
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </span>
      ) : null}
      <span className="text-[0.9rem] font-semibold text-[#0B162D]">{title}</span>
      <span className="mt-1 text-[0.72rem] leading-snug text-[#0B162D]/60">{sub}</span>
    </div>
  )
}

function GroupLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span className="rounded-md px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}1f`, color: accent }}>
      {children}
    </span>
  )
}

// ── Analytics diagrams ──────────────────────────────────────────────────
function MedallionDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Schichtenmodell", badge: "Bronze → Gold", label: "Medallion-Architektur", caption: "Daten werden schichtweise veredelt: roh → bereinigt → analysebereit.", steps: [["Bronze", "Rohdaten"], ["Silver", "bereinigt"], ["Gold", "analysebereit"]] }
      : { eyebrow: "Layered model", badge: "Bronze → gold", label: "Medallion architecture", caption: "Data is refined layer by layer: raw → cleaned → analysis-ready.", steps: [["Bronze", "raw data"], ["Silver", "cleaned"], ["Gold", "analysis-ready"]] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Layers} label={t.label} caption={t.caption}>
      <StepFlow accent={color} steps={[
        { title: t.steps[0][0], sub: t.steps[0][1], tone: "soft", icon: Database },
        { title: t.steps[1][0], sub: t.steps[1][1], tone: "soft", icon: RefreshCw },
        { title: t.steps[2][0], sub: t.steps[2][1], tone: "solid", icon: Sparkles },
      ]} />
    </Shell>
  )
}

function DataWarehouseDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Integration", badge: "konsolidiert", label: "Data Warehouse", caption: "Verteilte Quellen werden zentral integriert und konsistent fürs Reporting bereitgestellt.", sources: ["Excel", "SQL", "APIs"], hub: ["Data Warehouse", "zentral & konsistent"], out: ["Power BI", "Reporting"] }
      : { eyebrow: "Integration", badge: "consolidated", label: "Data warehouse", caption: "Distributed sources are integrated centrally and served consistently for reporting.", sources: ["Excel", "SQL", "APIs"], hub: ["Data warehouse", "central & consistent"], out: ["Power BI", "reporting"] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Database} label={t.label} caption={t.caption}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="flex flex-col gap-1.5">
          {t.sources.map((s) => (
            <span key={s} className="rounded-lg border bg-white px-2.5 py-1.5 text-center text-[0.72rem] font-semibold text-[#0B162D]" style={{ borderColor: `${color}33` }}>
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

function StarSchemaDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Datenmodell", badge: "Sternschema", label: "Sternschema", caption: "Eine zentrale Faktentabelle verbindet sich direkt mit mehreren Dimensionen.", fact: ["Faktentabelle", "Kennzahlen"], dims: ["Zeit", "Kunde", "Produkt", "Region"] }
      : { eyebrow: "Data model", badge: "Star schema", label: "Star schema", caption: "A central fact table connects directly to several dimensions.", fact: ["Fact table", "metrics"], dims: ["Time", "Customer", "Product", "Region"] }
  const dimChip = (d: string) => (
    <span key={d} className="rounded-lg border bg-white px-2.5 py-1.5 text-[0.72rem] font-semibold text-[#0B162D]" style={{ borderColor: `${color}33` }}>
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

function EtlEltDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Datenfluss", badge: "Reihenfolge", label: "ETL vs. ELT", caption: "Der Unterschied liegt in der Reihenfolge: ETL transformiert vor dem Laden, ELT danach.", e: "Extrahieren", tr: "Transformieren", l: "Laden" }
      : { eyebrow: "Data flow", badge: "Order", label: "ETL vs. ELT", caption: "The difference is the order: ETL transforms before loading, ELT afterwards.", e: "Extract", tr: "Transform", l: "Load" }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={ArrowLeftRight} label={t.label} caption={t.caption}>
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

function PowerBiDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Ablauf", badge: "Quelle → Bericht", label: "Power BI", caption: "Daten werden angebunden, aufbereitet, modelliert und als Bericht ausgeliefert.", steps: [["Datenquellen"], ["Power Query"], ["Modell + DAX"], ["Bericht"]] }
      : { eyebrow: "Flow", badge: "Source → report", label: "Power BI", caption: "Data is connected, prepared, modelled and delivered as a report.", steps: [["Data sources"], ["Power Query"], ["Model + DAX"], ["Report"]] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={BarChart3} label={t.label} caption={t.caption}>
      <StepFlow accent={color} steps={[
        { title: t.steps[0][0], icon: Database },
        { title: t.steps[1][0], icon: RefreshCw },
        { title: t.steps[2][0], icon: Boxes },
        { title: t.steps[3][0], tone: "solid", icon: BarChart3 },
      ]} />
    </Shell>
  )
}

function SemanticModelDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Schicht", badge: "semantische Schicht", label: "Semantic Model", caption: "Das Semantic Model liegt zwischen Rohdaten und Berichten: Tabellen, Beziehungen, Measures.", top: ["Berichte & Dashboards"], mid: ["Semantic Model", "Tabellen · Beziehungen · Measures"], bottom: ["Datenquellen"] }
      : { eyebrow: "Layer", badge: "semantic layer", label: "Semantic model", caption: "The semantic model sits between raw data and reports: tables, relationships, measures.", top: ["Reports & dashboards"], mid: ["Semantic model", "tables · relationships · measures"], bottom: ["Data sources"] }
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

function FabricDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Plattform", badge: "ein OneLake", label: "Microsoft Fabric", caption: "Fabric vereint mehrere Workloads auf einem zentralen Datalake (OneLake).", nodes: ["Data Engineering", "Data Warehouse", "Data Science", "Power BI"], center: ["OneLake", "ein Datalake"] }
      : { eyebrow: "Platform", badge: "one OneLake", label: "Microsoft Fabric", caption: "Fabric unifies several workloads on one central data lake (OneLake).", nodes: ["Data Engineering", "Data Warehouse", "Data Science", "Power BI"], center: ["OneLake", "one data lake"] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Hexagon} label={t.label} caption={t.caption}>
      <div className="flex flex-col items-center gap-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {t.nodes.map((n) => (
            <span key={n} className="rounded-lg border bg-white px-2.5 py-2 text-center text-[0.7rem] font-semibold text-[#0B162D]" style={{ borderColor: `${color}33` }}>
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

function MlopsDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Kreislauf", badge: "Retraining", label: "MLOps", caption: "Modelle altern: Monitoring erkennt Drift, ein Retraining schließt den Kreislauf.", steps: ["Daten", "Training", "Deployment", "Monitoring"] }
      : { eyebrow: "Loop", badge: "retraining", label: "MLOps", caption: "Models age: monitoring detects drift, retraining closes the loop.", steps: ["Data", "Training", "Deployment", "Monitoring"] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={RefreshCw} label={t.label} caption={t.caption}>
      <StepFlow accent={color} steps={[
        { title: t.steps[0], icon: Database },
        { title: t.steps[1], icon: Brain },
        { title: t.steps[2], icon: Rocket },
        { title: t.steps[3], tone: "solid", icon: RefreshCw },
      ]} />
    </Shell>
  )
}

// ── Apps diagrams ─────────────────────────────────────────────────────────
function SaasStackDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Verantwortung", badge: "geteilte Verantwortung", label: "IaaS, PaaS, SaaS", caption: "Je höher das Modell, desto mehr übernimmt der Anbieter.", cols: ["IaaS", "PaaS", "SaaS"], layers: ["Anwendung", "Plattform", "Infrastruktur"], provider: "Anbieter", you: "Sie" }
      : { eyebrow: "Responsibility", badge: "shared responsibility", label: "IaaS, PaaS, SaaS", caption: "The higher the model, the more the provider takes over.", cols: ["IaaS", "PaaS", "SaaS"], layers: ["Application", "Platform", "Infrastructure"], provider: "Provider", you: "You" }
  const managed = [
    [false, false, true],
    [false, true, true],
    [true, true, true],
  ]
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Layers} label={t.label} caption={t.caption}>
      <div className="grid grid-cols-3 gap-2.5">
        {t.cols.map((col, ci) => (
          <div key={col} className="flex flex-col gap-1.5">
            <span className="text-center text-[0.72rem] font-bold" style={{ color }}>{col}</span>
            {t.layers.map((layer, li) => {
              const prov = managed[ci][li]
              return (
                <span
                  key={layer}
                  className="rounded-lg border px-2 py-2 text-center text-[0.66rem] font-semibold leading-tight"
                  style={prov ? { backgroundColor: color, borderColor: color, color: "#fff" } : { backgroundColor: "#fff", borderColor: `${INK}24`, color: `${INK}cc` }}
                >
                  {layer}
                </span>
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-4 text-[0.62rem] text-[#0B162D]/55">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded" style={{ backgroundColor: color }} /> {t.provider}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border" style={{ borderColor: `${INK}30` }} /> {t.you}
        </span>
      </div>
    </Shell>
  )
}

function CloudComputingDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Cloud-Modelle", badge: "Public · Private · Hybrid", label: "Cloud-Arten", caption: "Hybrid kombiniert Public und Private; Multi-Cloud nutzt mehrere Anbieter parallel.", cards: [["Public Cloud", "geteilt, skalierbar"], ["Private Cloud", "dediziert, isoliert"], ["Hybrid Cloud", "kombiniert"]] }
      : { eyebrow: "Cloud models", badge: "public · private · hybrid", label: "Cloud types", caption: "Hybrid combines public and private; multi-cloud uses several providers in parallel.", cards: [["Public cloud", "shared, scalable"], ["Private cloud", "dedicated, isolated"], ["Hybrid cloud", "combined"]] }
  const icons = [Cloud, Lock, Boxes]
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Cloud} label={t.label} caption={t.caption}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {t.cards.map((c, i) => (
          <IconCard key={c[0]} icon={icons[i]} title={c[0]} sub={c[1]} accent={color} />
        ))}
      </div>
    </Shell>
  )
}

function MultiTenantDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Architektur", badge: "isolierte Daten", label: "Multi-Tenant-Architektur", caption: "Mehrere Mandanten teilen sich eine Anwendung – ihre Daten bleiben logisch getrennt.", shared: "Geteilte Anwendung & Infrastruktur", tenants: ["Mandant A", "Mandant B", "Mandant C"], sub: "eigene Daten" }
      : { eyebrow: "Architecture", badge: "isolated data", label: "Multi-tenant architecture", caption: "Several tenants share one application – their data stays logically separated.", shared: "Shared application & infrastructure", tenants: ["Tenant A", "Tenant B", "Tenant C"], sub: "own data" }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Building2} label={t.label} caption={t.caption}>
      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-[0.85rem] font-semibold text-white" style={{ backgroundColor: color }}>
          <Boxes className="h-4 w-4" /> {t.shared}
        </div>
        <div className="grid w-full grid-cols-3 gap-2">
          {t.tenants.map((tn) => (
            <div key={tn} className="flex flex-col items-center rounded-xl border px-2 py-2.5 text-center" style={{ borderColor: `${color}33`, backgroundImage: `linear-gradient(160deg, ${color}10, transparent 72%)` }}>
              <Lock className="mb-1 h-3.5 w-3.5" style={{ color }} />
              <span className="text-[0.74rem] font-semibold text-[#0B162D]">{tn}</span>
              <span className="text-[0.62rem] text-[#0B162D]/55">{t.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function RestApiDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Schnittstelle", badge: "Request / Response", label: "REST-API", caption: "Der Client sendet einen Request mit HTTP-Methode; der Server antwortet (meist JSON).", client: ["Client", "App / Frontend"], server: ["Server", "REST-API"], req: "Request · GET / POST / PUT / DELETE", res: "Response · JSON" }
      : { eyebrow: "Interface", badge: "request / response", label: "REST API", caption: "The client sends a request with an HTTP method; the server answers (usually JSON).", client: ["Client", "app / frontend"], server: ["Server", "REST API"], req: "Request · GET / POST / PUT / DELETE", res: "Response · JSON" }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={ArrowLeftRight} label={t.label} caption={t.caption}>
      <div className="flex items-center gap-3">
        <DBox title={t.client[0]} sub={t.client[1]} tone="plain" accent={color} icon={Boxes} />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="flex-1 text-center text-[0.6rem] font-medium text-[#0B162D]/55">{t.req}</span>
            <ArrowRight className="h-4 w-4 shrink-0" style={{ color }} />
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowRight className="h-4 w-4 shrink-0 rotate-180 text-[#0B162D]/30" />
            <span className="flex-1 text-center text-[0.6rem] font-medium text-[#0B162D]/55">{t.res}</span>
          </div>
        </div>
        <DBox title={t.server[0]} sub={t.server[1]} tone="solid" accent={color} icon={Database} />
      </div>
    </Shell>
  )
}

function SdlcDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Lebenszyklus", badge: "iterativ", label: "SDLC", caption: "Der SDLC durchläuft die Phasen iterativ; Betrieb und Wartung führen in neue Analyse zurück.", steps: ["Analyse", "Konzeption", "Umsetzung", "Test", "Betrieb"] }
      : { eyebrow: "Life cycle", badge: "iterative", label: "SDLC", caption: "The SDLC runs through its phases iteratively; operation feeds back into new analysis.", steps: ["Analysis", "Design", "Build", "Test", "Operate"] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={RefreshCw} label={t.label} caption={t.caption}>
      <StepFlow accent={color} steps={t.steps.map((s, i) => ({ title: s, tone: i === t.steps.length - 1 ? "solid" : "soft" }))} />
    </Shell>
  )
}

// ── Strategy diagrams ──────────────────────────────────────────────────────
function ProcessAutomationDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Vorher / Nachher", badge: "automatisiert", label: "Prozessautomatisierung", caption: "Statt PDFs manuell abzutippen, erkennt und überträgt die Automatisierung sie selbstständig.", manual: "Manuell", auto: "Automatisiert", m: ["PDF-Eingang", "manuell erfassen", "System"], a: ["PDF-Eingang", "Power Automate + AI Builder", "System"] }
      : { eyebrow: "Before / after", badge: "automated", label: "Process automation", caption: "Instead of keying in PDFs by hand, automation detects and transfers them on its own.", manual: "Manual", auto: "Automated", m: ["PDF inbox", "key in by hand", "system"], a: ["PDF inbox", "Power Automate + AI Builder", "system"] }
  const [autoTitle, autoSub] = t.a[1].split(" + ")
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Workflow} label={t.label} caption={t.caption}>
      <div className="space-y-4">
        <div>
          <span className="mb-2 block text-center text-[0.62rem] font-bold uppercase tracking-wider text-[#0B162D]/45">{t.manual}</span>
          <StepFlow accent={color} steps={[{ title: t.m[0] }, { title: t.m[1], tone: "dashed" }, { title: t.m[2] }]} />
        </div>
        <div className="h-px w-full bg-[#0B162D]/[0.06]" />
        <div>
          <span className="mb-2 block text-center text-[0.62rem] font-bold uppercase tracking-wider" style={{ color }}>{t.auto}</span>
          <StepFlow accent={color} steps={[{ title: t.a[0] }, { title: autoTitle, sub: autoSub, tone: "solid", icon: Sparkles }, { title: t.a[2] }]} />
        </div>
      </div>
    </Shell>
  )
}

function DevopsDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Kreislauf", badge: "kontinuierlich", label: "DevOps", caption: "DevOps verzahnt Entwicklung (Dev) und Betrieb (Ops) zu einem kontinuierlichen Kreislauf.", dev: ["Plan", "Build", "Test"], ops: ["Release", "Betrieb", "Monitor"] }
      : { eyebrow: "Loop", badge: "continuous", label: "DevOps", caption: "DevOps interlocks development (Dev) and operations (Ops) into a continuous loop.", dev: ["Plan", "Build", "Test"], ops: ["Release", "Operate", "Monitor"] }
  const chip = (s: string) => (
    <span key={s} className="rounded-lg border px-2.5 py-1.5 text-[0.72rem] font-semibold text-[#0B162D]" style={{ borderColor: `${color}40`, backgroundColor: `${color}0f` }}>
      {s}
    </span>
  )
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={InfinityIcon} label={t.label} caption={t.caption}>
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex flex-col items-center gap-1.5">
          <GroupLabel accent={color}>Dev</GroupLabel>
          <div className="flex gap-1.5">{t.dev.map(chip)}</div>
        </div>
        <InfinityIcon className="h-7 w-7" style={{ color }} />
        <div className="flex flex-col items-center gap-1.5">
          <GroupLabel accent={color}>Ops</GroupLabel>
          <div className="flex gap-1.5">{t.ops.map(chip)}</div>
        </div>
      </div>
    </Shell>
  )
}

function MfaDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Authentifizierung", badge: "2 von 3", label: "MFA / 2FA", caption: "MFA verlangt mindestens zwei unabhängige Faktoren aus verschiedenen Kategorien.", cards: [["Wissen", "Passwort, PIN"], ["Besitz", "Code, Token, Handy"], ["Inhärenz", "Fingerabdruck, Gesicht"]] }
      : { eyebrow: "Authentication", badge: "2 of 3", label: "MFA / 2FA", caption: "MFA requires at least two independent factors from different categories.", cards: [["Knowledge", "password, PIN"], ["Possession", "code, token, phone"], ["Inherence", "fingerprint, face"]] }
  const icons = [KeyRound, Lock, Fingerprint]
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={ShieldCheck} label={t.label} caption={t.caption}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {t.cards.map((c, i) => (
          <IconCard key={c[0]} icon={icons[i]} title={c[0]} sub={c[1]} accent={color} />
        ))}
      </div>
    </Shell>
  )
}

function IamDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Anmeldefluss", badge: "Token", label: "IAM / Keycloak", caption: "Keycloak übernimmt die Authentifizierung und stellt der Anwendung ein Token aus.", steps: [["Nutzer", "Zugriff"], ["Anwendung", "leitet weiter"], ["Keycloak", "IdP · Token"]] }
      : { eyebrow: "Login flow", badge: "token", label: "IAM / Keycloak", caption: "Keycloak handles authentication and issues a token to the application.", steps: [["User", "access"], ["Application", "redirects"], ["Keycloak", "IdP · token"]] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={KeyRound} label={t.label} caption={t.caption}>
      <StepFlow accent={color} steps={[
        { title: t.steps[0][0], sub: t.steps[0][1], icon: Users },
        { title: t.steps[1][0], sub: t.steps[1][1], icon: Boxes },
        { title: t.steps[2][0], sub: t.steps[2][1], tone: "solid", icon: KeyRound },
      ]} />
    </Shell>
  )
}

function NetworkingDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Netzwerksicherheit", badge: "Zero Trust", label: "Networking & Security", caption: "Statt nur einer Außengrenze prüft Zero Trust jede Anfrage und segmentiert das Netzwerk.", left: "Perimeter", leftIn: "innen = vertraut", right: "Zero Trust", rightIn: "prüfen" }
      : { eyebrow: "Network security", badge: "zero trust", label: "Networking & security", caption: "Instead of a single boundary, zero trust verifies every request and segments the network.", left: "Perimeter", leftIn: "inside = trusted", right: "Zero Trust", rightIn: "verify" }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Network} label={t.label} caption={t.caption}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border p-3" style={{ borderColor: `${INK}1f` }}>
          <span className="mb-2 block text-center text-[0.7rem] font-bold uppercase tracking-wider text-[#0B162D]/55">{t.left}</span>
          <div className="flex h-[88px] items-center justify-center rounded-xl text-center text-[0.72rem] font-semibold text-[#0B162D]/70" style={{ backgroundColor: `${INK}08` }}>
            {t.leftIn}
          </div>
        </div>
        <div className="rounded-2xl border p-3" style={{ borderColor: `${color}55` }}>
          <span className="mb-2 block text-center text-[0.7rem] font-bold uppercase tracking-wider" style={{ color }}>{t.right}</span>
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex items-center justify-center gap-1 rounded-lg border py-2 text-[0.62rem] font-semibold" style={{ borderColor: `${color}40`, backgroundColor: `${color}0f`, color }}>
                <Lock className="h-3 w-3" /> {t.rightIn}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

function DigitalPlatformDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Plattformökonomie", badge: "Netzwerkeffekte", label: "Digitale Plattformen", caption: "Eine Plattform verbindet zwei Seiten; mehr Teilnehmer steigern den Wert (Netzwerkeffekte).", left: ["Anbieter", "Angebot"], center: ["Plattform", "Vermittlung"], right: ["Nutzer", "Nachfrage"] }
      : { eyebrow: "Platform economy", badge: "network effects", label: "Digital platforms", caption: "A platform connects two sides; more participants increase its value (network effects).", left: ["Providers", "supply"], center: ["Platform", "matchmaking"], right: ["Users", "demand"] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Network} label={t.label} caption={t.caption}>
      <div className="flex items-center justify-center gap-2">
        <DBox title={t.left[0]} sub={t.left[1]} tone="plain" accent={color} icon={Building2} />
        <ArrowLeftRight className="h-5 w-5 shrink-0" style={{ color }} />
        <DBox title={t.center[0]} sub={t.center[1]} tone="solid" accent={color} icon={Share2} />
        <ArrowLeftRight className="h-5 w-5 shrink-0" style={{ color }} />
        <DBox title={t.right[0]} sub={t.right[1]} tone="plain" accent={color} icon={Users} />
      </div>
    </Shell>
  )
}

function CicdDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? { eyebrow: "Pipeline", badge: "automatisiert", label: "CI/CD", caption: "CI bündelt Build und Test, CD die automatisierte Auslieferung.", ci: ["Commit", "Build", "Test"], cd: ["Release", "Deploy"] }
      : { eyebrow: "Pipeline", badge: "automated", label: "CI/CD", caption: "CI bundles build and test; CD the automated shipping.", ci: ["Commit", "Build", "Test"], cd: ["Release", "Deploy"] }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={GitBranch} label={t.label} caption={t.caption}>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
        <div className="flex flex-col items-center gap-1.5">
          <GroupLabel accent={color}>CI</GroupLabel>
          <div className="flex items-center gap-1.5">
            {t.ci.map((s, i) => (
              <Fragment key={s}>
                <DBox title={s} accent={color} />
                {i < t.ci.length - 1 ? <ArrowSep /> : null}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <GroupLabel accent={color}>CD</GroupLabel>
          <div className="flex items-center gap-1.5">
            {t.cd.map((s, i) => (
              <Fragment key={s}>
                <DBox title={s} accent={color} tone={i === t.cd.length - 1 ? "solid" : "soft"} icon={i === t.cd.length - 1 ? Rocket : undefined} />
                {i < t.cd.length - 1 ? <ArrowSep /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

export const glossaryDiagrams: Record<string, (props: DiagramProps) => React.ReactNode> = {
  "medallion-architecture": MedallionDiagram,
  "data-modeling": StarSchemaDiagram,
  "etl-elt": EtlEltDiagram,
  "cloud-computing": CloudComputingDiagram,
  "data-warehouse": DataWarehouseDiagram,
  saas: SaasStackDiagram,
  "multi-tenant-architecture": MultiTenantDiagram,
  "ci-cd": CicdDiagram,
  sdlc: SdlcDiagram,
  mlops: MlopsDiagram,
  "process-automation": ProcessAutomationDiagram,
  "power-bi": PowerBiDiagram,
  "semantic-model": SemanticModelDiagram,
  "microsoft-fabric": FabricDiagram,
  "rest-api": RestApiDiagram,
  "iam-keycloak": IamDiagram,
  "mfa-2fa": MfaDiagram,
  "networking-security": NetworkingDiagram,
  devops: DevopsDiagram,
  "digital-platforms": DigitalPlatformDiagram,
}
