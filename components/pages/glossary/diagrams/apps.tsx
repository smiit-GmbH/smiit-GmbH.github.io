import { ArrowLeftRight, ArrowRight, Boxes, Building2, Cloud, Database, Layers, Lock, RefreshCw } from "lucide-react"
import { DBox, IconCard, INK, Shell, StepFlow, type DiagramProps } from "./primitives"

// ── Apps diagrams ─────────────────────────────────────────────────────────
export function SaasStackDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Verantwortung",
          badge: "geteilte Verantwortung",
          label: "IaaS, PaaS, SaaS",
          caption: "Je höher das Modell, desto mehr übernimmt der Anbieter.",
          cols: ["IaaS", "PaaS", "SaaS"],
          layers: ["Anwendung", "Plattform", "Infrastruktur"],
          provider: "Anbieter",
          you: "Sie",
        }
      : {
          eyebrow: "Responsibility",
          badge: "shared responsibility",
          label: "IaaS, PaaS, SaaS",
          caption: "The higher the model, the more the provider takes over.",
          cols: ["IaaS", "PaaS", "SaaS"],
          layers: ["Application", "Platform", "Infrastructure"],
          provider: "Provider",
          you: "You",
        }
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
            <span className="text-center text-[0.72rem] font-bold" style={{ color }}>
              {col}
            </span>
            {t.layers.map((layer, li) => {
              const prov = managed[ci][li]
              return (
                <span
                  key={layer}
                  className="rounded-lg border px-2 py-2 text-center text-[0.66rem] font-semibold leading-tight"
                  style={
                    prov
                      ? { backgroundColor: color, borderColor: color, color: "#fff" }
                      : { backgroundColor: "#fff", borderColor: `${INK}24`, color: `${INK}cc` }
                  }
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

export function CloudComputingDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Cloud-Modelle",
          badge: "Public · Private · Hybrid",
          label: "Cloud-Arten",
          caption: "Hybrid kombiniert Public und Private; Multi-Cloud nutzt mehrere Anbieter parallel.",
          cards: [
            ["Public Cloud", "geteilt, skalierbar"],
            ["Private Cloud", "dediziert, isoliert"],
            ["Hybrid Cloud", "kombiniert"],
          ],
        }
      : {
          eyebrow: "Cloud models",
          badge: "public · private · hybrid",
          label: "Cloud types",
          caption: "Hybrid combines public and private; multi-cloud uses several providers in parallel.",
          cards: [
            ["Public cloud", "shared, scalable"],
            ["Private cloud", "dedicated, isolated"],
            ["Hybrid cloud", "combined"],
          ],
        }
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

export function MultiTenantDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Architektur",
          badge: "isolierte Daten",
          label: "Multi-Tenant-Architektur",
          caption: "Mehrere Mandanten teilen sich eine Anwendung – ihre Daten bleiben logisch getrennt.",
          shared: "Geteilte Anwendung & Infrastruktur",
          tenants: ["Mandant A", "Mandant B", "Mandant C"],
          sub: "eigene Daten",
        }
      : {
          eyebrow: "Architecture",
          badge: "isolated data",
          label: "Multi-tenant architecture",
          caption: "Several tenants share one application – their data stays logically separated.",
          shared: "Shared application & infrastructure",
          tenants: ["Tenant A", "Tenant B", "Tenant C"],
          sub: "own data",
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Building2} label={t.label} caption={t.caption}>
      <div className="flex flex-col items-center gap-3">
        <div
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-[0.85rem] font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          <Boxes className="h-4 w-4" /> {t.shared}
        </div>
        <div className="grid w-full grid-cols-3 gap-2">
          {t.tenants.map((tn) => (
            <div
              key={tn}
              className="flex flex-col items-center rounded-xl border px-2 py-2.5 text-center"
              style={{
                borderColor: `${color}33`,
                backgroundImage: `linear-gradient(160deg, ${color}10, transparent 72%)`,
              }}
            >
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

export function RestApiDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Schnittstelle",
          badge: "Request / Response",
          label: "REST-API",
          caption: "Der Client sendet einen Request mit HTTP-Methode; der Server antwortet (meist JSON).",
          client: ["Client", "App / Frontend"],
          server: ["Server", "REST-API"],
          req: "Request · GET / POST / PUT / DELETE",
          res: "Response · JSON",
        }
      : {
          eyebrow: "Interface",
          badge: "request / response",
          label: "REST API",
          caption: "The client sends a request with an HTTP method; the server answers (usually JSON).",
          client: ["Client", "app / frontend"],
          server: ["Server", "REST API"],
          req: "Request · GET / POST / PUT / DELETE",
          res: "Response · JSON",
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

export function SdlcDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Lebenszyklus",
          badge: "iterativ",
          label: "SDLC",
          caption: "Der SDLC durchläuft die Phasen iterativ; Betrieb und Wartung führen in neue Analyse zurück.",
          steps: ["Analyse", "Konzeption", "Umsetzung", "Test", "Betrieb"],
        }
      : {
          eyebrow: "Life cycle",
          badge: "iterative",
          label: "SDLC",
          caption: "The SDLC runs through its phases iteratively; operation feeds back into new analysis.",
          steps: ["Analysis", "Design", "Build", "Test", "Operate"],
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={RefreshCw} label={t.label} caption={t.caption}>
      <StepFlow
        accent={color}
        steps={t.steps.map((s, i) => ({ title: s, tone: i === t.steps.length - 1 ? "solid" : "soft" }))}
      />
    </Shell>
  )
}
