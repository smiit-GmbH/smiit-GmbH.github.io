import { Fragment } from "react"
import {
  ArrowLeftRight,
  Boxes,
  Building2,
  Fingerprint,
  GitBranch,
  Infinity as InfinityIcon,
  KeyRound,
  Lock,
  Network,
  Rocket,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react"
import { ArrowSep, DBox, GroupLabel, IconCard, INK, Shell, StepFlow, type DiagramProps } from "./primitives"

// ── Strategy diagrams ──────────────────────────────────────────────────────
export function ProcessAutomationDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Vorher / Nachher",
          badge: "automatisiert",
          label: "Prozessautomatisierung",
          caption: "Statt PDFs manuell abzutippen, erkennt und überträgt die Automatisierung sie selbstständig.",
          manual: "Manuell",
          auto: "Automatisiert",
          m: ["PDF-Eingang", "manuell erfassen", "System"],
          a: ["PDF-Eingang", "Power Automate + AI Builder", "System"],
        }
      : {
          eyebrow: "Before / after",
          badge: "automated",
          label: "Process automation",
          caption: "Instead of keying in PDFs by hand, automation detects and transfers them on its own.",
          manual: "Manual",
          auto: "Automated",
          m: ["PDF inbox", "key in by hand", "system"],
          a: ["PDF inbox", "Power Automate + AI Builder", "system"],
        }
  const [autoTitle, autoSub] = t.a[1].split(" + ")
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Workflow} label={t.label} caption={t.caption}>
      <div className="space-y-4">
        <div>
          <span className="mb-2 block text-center text-[0.62rem] font-bold uppercase tracking-wider text-[#0B162D]/45">
            {t.manual}
          </span>
          <StepFlow accent={color} steps={[{ title: t.m[0] }, { title: t.m[1], tone: "dashed" }, { title: t.m[2] }]} />
        </div>
        <div className="h-px w-full bg-[#0B162D]/[0.06]" />
        <div>
          <span className="mb-2 block text-center text-[0.62rem] font-bold uppercase tracking-wider" style={{ color }}>
            {t.auto}
          </span>
          <StepFlow
            accent={color}
            steps={[
              { title: t.a[0] },
              { title: autoTitle, sub: autoSub, tone: "solid", icon: Sparkles },
              { title: t.a[2] },
            ]}
          />
        </div>
      </div>
    </Shell>
  )
}

export function DevopsDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Kreislauf",
          badge: "kontinuierlich",
          label: "DevOps",
          caption: "DevOps verzahnt Entwicklung (Dev) und Betrieb (Ops) zu einem kontinuierlichen Kreislauf.",
          dev: ["Plan", "Build", "Test"],
          ops: ["Release", "Betrieb", "Monitor"],
        }
      : {
          eyebrow: "Loop",
          badge: "continuous",
          label: "DevOps",
          caption: "DevOps interlocks development (Dev) and operations (Ops) into a continuous loop.",
          dev: ["Plan", "Build", "Test"],
          ops: ["Release", "Operate", "Monitor"],
        }
  const chip = (s: string) => (
    <span
      key={s}
      className="rounded-lg border px-2.5 py-1.5 text-[0.72rem] font-semibold text-[#0B162D]"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}0f` }}
    >
      {s}
    </span>
  )
  return (
    <Shell
      accent={color}
      eyebrow={t.eyebrow}
      badge={t.badge}
      badgeIcon={InfinityIcon}
      label={t.label}
      caption={t.caption}
    >
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

export function MfaDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Authentifizierung",
          badge: "2 von 3",
          label: "MFA / 2FA",
          caption: "MFA verlangt mindestens zwei unabhängige Faktoren aus verschiedenen Kategorien.",
          cards: [
            ["Wissen", "Passwort, PIN"],
            ["Besitz", "Code, Token, Handy"],
            ["Inhärenz", "Fingerabdruck, Gesicht"],
          ],
        }
      : {
          eyebrow: "Authentication",
          badge: "2 of 3",
          label: "MFA / 2FA",
          caption: "MFA requires at least two independent factors from different categories.",
          cards: [
            ["Knowledge", "password, PIN"],
            ["Possession", "code, token, phone"],
            ["Inherence", "fingerprint, face"],
          ],
        }
  const icons = [KeyRound, Lock, Fingerprint]
  return (
    <Shell
      accent={color}
      eyebrow={t.eyebrow}
      badge={t.badge}
      badgeIcon={ShieldCheck}
      label={t.label}
      caption={t.caption}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {t.cards.map((c, i) => (
          <IconCard key={c[0]} icon={icons[i]} title={c[0]} sub={c[1]} accent={color} />
        ))}
      </div>
    </Shell>
  )
}

export function IamDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Anmeldefluss",
          badge: "Token",
          label: "IAM / Keycloak",
          caption: "Keycloak übernimmt die Authentifizierung und stellt der Anwendung ein Token aus.",
          steps: [
            ["Nutzer", "Zugriff"],
            ["Anwendung", "leitet weiter"],
            ["Keycloak", "IdP · Token"],
          ],
        }
      : {
          eyebrow: "Login flow",
          badge: "token",
          label: "IAM / Keycloak",
          caption: "Keycloak handles authentication and issues a token to the application.",
          steps: [
            ["User", "access"],
            ["Application", "redirects"],
            ["Keycloak", "IdP · token"],
          ],
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={KeyRound} label={t.label} caption={t.caption}>
      <StepFlow
        accent={color}
        steps={[
          { title: t.steps[0][0], sub: t.steps[0][1], icon: Users },
          { title: t.steps[1][0], sub: t.steps[1][1], icon: Boxes },
          { title: t.steps[2][0], sub: t.steps[2][1], tone: "solid", icon: KeyRound },
        ]}
      />
    </Shell>
  )
}

export function NetworkingDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Netzwerksicherheit",
          badge: "Zero Trust",
          label: "Networking & Security",
          caption: "Statt nur einer Außengrenze prüft Zero Trust jede Anfrage und segmentiert das Netzwerk.",
          left: "Perimeter",
          leftIn: "innen = vertraut",
          right: "Zero Trust",
          rightIn: "prüfen",
        }
      : {
          eyebrow: "Network security",
          badge: "zero trust",
          label: "Networking & security",
          caption: "Instead of a single boundary, zero trust verifies every request and segments the network.",
          left: "Perimeter",
          leftIn: "inside = trusted",
          right: "Zero Trust",
          rightIn: "verify",
        }
  return (
    <Shell accent={color} eyebrow={t.eyebrow} badge={t.badge} badgeIcon={Network} label={t.label} caption={t.caption}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border p-3" style={{ borderColor: `${INK}1f` }}>
          <span className="mb-2 block text-center text-[0.7rem] font-bold uppercase tracking-wider text-[#0B162D]/55">
            {t.left}
          </span>
          <div
            className="flex h-[88px] items-center justify-center rounded-xl text-center text-[0.72rem] font-semibold text-[#0B162D]/70"
            style={{ backgroundColor: `${INK}08` }}
          >
            {t.leftIn}
          </div>
        </div>
        <div className="rounded-2xl border p-3" style={{ borderColor: `${color}55` }}>
          <span className="mb-2 block text-center text-[0.7rem] font-bold uppercase tracking-wider" style={{ color }}>
            {t.right}
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="flex items-center justify-center gap-1 rounded-lg border py-2 text-[0.62rem] font-semibold"
                style={{ borderColor: `${color}40`, backgroundColor: `${color}0f`, color }}
              >
                <Lock className="h-3 w-3" /> {t.rightIn}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

export function DigitalPlatformDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Plattformökonomie",
          badge: "Netzwerkeffekte",
          label: "Digitale Plattformen",
          caption: "Eine Plattform verbindet zwei Seiten; mehr Teilnehmer steigern den Wert (Netzwerkeffekte).",
          left: ["Anbieter", "Angebot"],
          center: ["Plattform", "Vermittlung"],
          right: ["Nutzer", "Nachfrage"],
        }
      : {
          eyebrow: "Platform economy",
          badge: "network effects",
          label: "Digital platforms",
          caption: "A platform connects two sides; more participants increase its value (network effects).",
          left: ["Providers", "supply"],
          center: ["Platform", "matchmaking"],
          right: ["Users", "demand"],
        }
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

export function CicdDiagram({ lang, color }: DiagramProps) {
  const t =
    lang === "de"
      ? {
          eyebrow: "Pipeline",
          badge: "automatisiert",
          label: "CI/CD",
          caption: "CI bündelt Build und Test, CD die automatisierte Auslieferung.",
          ci: ["Commit", "Build", "Test"],
          cd: ["Release", "Deploy"],
        }
      : {
          eyebrow: "Pipeline",
          badge: "automated",
          label: "CI/CD",
          caption: "CI bundles build and test; CD the automated shipping.",
          ci: ["Commit", "Build", "Test"],
          cd: ["Release", "Deploy"],
        }
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
                <DBox
                  title={s}
                  accent={color}
                  tone={i === t.cd.length - 1 ? "solid" : "soft"}
                  icon={i === t.cd.length - 1 ? Rocket : undefined}
                />
                {i < t.cd.length - 1 ? <ArrowSep /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}
