import type { Locale } from "@/lib/dictionary"

/**
 * Case studies are stored as a typed, dictionary-style structure (one entry per
 * slug, with a `de` and `en` variant) to match the existing content setup.
 * Add a new case study by appending an entry to `caseStudies` and the route +
 * sitemap pick it up automatically via `caseStudySlugs`.
 *
 * NOTE: Claimity content references concrete technologies (Azure, PostgreSQL,
 * Keycloak, …) and a customer quote. Get these cleared with the client before
 * relying on the page externally.
 */

export type CaseStudyServiceArea = "apps" | "analytics" | "strategy"

export type CaseStudyMetric = {
  value: string
  label: string
}

/** One narrative block (Ausgangssituation, Lösung, …). Bullets are optional. */
export type CaseStudySection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

/** One entry in the "Technik & Architektur" box. */
export type CaseStudyTechItem = {
  name: string
  description: string
}

export type CaseStudyContent = {
  /** Stable, language-agnostic URL slug. */
  slug: string
  serviceArea: CaseStudyServiceArea
  /** Path of the related service page, e.g. "services/apps". */
  relatedServicePath: string
  /** ISO date used for Article JSON-LD. */
  datePublished: string
  ogImage?: { url: string; width: number; height: number; alt: string }
  /** In-body diagram / screenshot. */
  image?: { url: string; width: number; height: number; alt: string }

  // --- Hero / identity (Struktur-Punkt 1: Kunde + Branche + Größe) ---
  client: string
  industry: string
  companySize: string
  title: string
  /** Short lead paragraph under the title. */
  summary: string
  heroMetric: CaseStudyMetric

  // --- Fact box (quick scan) ---
  facts: { label: string; value: string }[]

  // --- Narrative (Ausgangssituation, Lösung, Sicherheit, …) ---
  sections: CaseStudySection[]

  // --- "Kennzahlen auf einen Blick" ---
  metrics: CaseStudyMetric[]

  // --- "Technik & Architektur" box ---
  techStack: CaseStudyTechItem[]

  // --- Struktur-Punkt 5: O-Ton des Kunden ---
  quote: { text: string; author: string; role: string }

  // --- SEO metadata ---
  metaTitle: string
  metaDescription: string
}

type LocalizedCaseStudy = Record<Locale, CaseStudyContent>

const claimity: LocalizedCaseStudy = {
  de: {
    slug: "claimity-ag",
    serviceArea: "apps",
    relatedServicePath: "services/apps",
    datePublished: "2026-05-20",
    ogImage: {
      url: "/og/case-study-claimity-ag.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case Study Claimity AG",
    },
    image: {
      url: "/assets/case-studies/claimity_de.webp",
      width: 1672,
      height: 941,
      alt: "Cloud-Architektur einer Multi-Tenant-SaaS-Plattform für digitale Schadenabwicklung in der Versicherungsbranche mit Azure, REST-APIs, rollenbasierter Authentifizierung, Dokumentenmanagement und verschlüsseltem Chat.",
    },

    client: "Claimity AG",
    industry: "InsurTech / Versicherung",
    companySize: "Schweiz · Startup",
    title: "In 6 Wochen zur produktiven SaaS-Plattform für digitale Schadenprozesse",
    summary:
      "Die Claimity AG digitalisiert als Schweizer InsurTech die Schadenabwicklung zwischen Versicherungen, Schadenregulierern und spezialisierten Experten. In nur sechs Wochen baute smiit daraus ein produktives SaaS-MVP — sicher, mandantenfähig und von Tag eins skalierbar. Heute laufen über 1.000 Fälle über die Plattform.",
    heroMetric: { value: "6 Wochen", label: "vom Start bis zum produktiven Go-live" },

    facts: [
      { label: "Branche", value: "InsurTech / Versicherung" },
      { label: "Region", value: "Schweiz" },
      { label: "Leistung", value: "Cloud-Architektur & SaaS-Entwicklung" },
      { label: "Modell", value: "Multi-Tenant-SaaS auf Azure" },
      { label: "Zeitraum", value: "6 Wochen bis Go-live" },
    ],

    sections: [
      {
        heading: "Ausgangssituation",
        paragraphs: [
          "Claimity stand vor einer typischen Herausforderung junger Plattformgeschäftsmodelle: Der Marktbedarf war klar, die fachlichen Prozesse waren definiert — aber es fehlte eine produktive technische Plattform, die schnell live gehen und gleichzeitig langfristig skalieren konnte.",
          "Die Schadenabwicklung lief bislang über verteilte Kommunikationswege — E-Mails, Dokumente, manuelle Abstimmungen, unterschiedliche Systeme. Für einen wachsenden Marktplatz mit Versicherungen, Experten und Schadenregulierern entstehen daraus schnell Medienbrüche, unklare Zuständigkeiten und hoher Koordinationsaufwand. Technisch bedeutete das: Die Plattform musste die Rollen klar voneinander trennen. Versicherer reichen Fälle ein und verfolgen den Bearbeitungsstand, Experten bearbeiten die ihnen zugewiesenen Fälle, Administratoren steuern Prozesse und Nutzer. Gleichzeitig mussten Dokumente und Kommunikation sauber dem jeweiligen Fall zugeordnet werden.",
          "Hinzu kam: Für Versicherungsprozesse reicht eine einfache Web-App ohne Sicherheitskonzept nicht aus. Sichere Registrierung, Authentifizierung, Zwei-Faktor-Authentifizierung und Backup-Codes mussten bereits zum Go-live stehen — Voraussetzung dafür, dass Claimity gegenüber Versicherungen und professionellen Partnern vertrauenswürdig auftreten kann.",
        ],
      },
      {
        heading: "Lösung: Multi-Tenant-SaaS-Architektur",
        paragraphs: [
          "smiit entwickelte eine mandantenfähige SaaS-Plattform auf Microsoft Azure — bewusst als zentrale Multi-Tenant-Architektur statt als Sammlung einzelner Kundeninstanzen. So kann Claimity neue Versicherungspartner, Experten und Schadenregulierer schnell anbinden, ohne pro Kunde eigene Infrastruktur aufzubauen. Das bedeutet weniger Betriebsaufwand, schnelleres Onboarding und eine Basis, die mit dem Geschäftsmodell wächst.",
          "Das Hosting läuft über einen Azure App Service — bewusst pragmatisch statt einer komplexen Kubernetes-Orchestrierung: stabiler, wartungsarmer Betrieb mit effizientem Deployment, Skalierung und Monitoring. Als Datenbank dient Azure Database for PostgreSQL, eine robuste relationale Basis für Schadenprozesse, Mandanten, Rollen, Dokumentreferenzen und Abrechnungsdaten — während Azure Backups, Verfügbarkeit und Patching übernimmt.",
          "Anwendung, Datenbank und Cloud-Komponenten liegen in einer abgesicherten Azure-Umgebung mit virtuellem Netzwerk. Externe Zugriffe werden kontrolliert über Azure Front Door geführt, sensible Konfigurationen und Secrets nicht im Code abgelegt, sondern über Azure Key Vault verwaltet.",
        ],
      },
      {
        heading: "User-Management & Sicherheit",
        paragraphs: [
          "Für das User-Management setzte smiit auf Keycloak als zentrale Identity- und Access-Management-Komponente — bewusst keine selbst gebaute Login-Logik, denn Authentifizierung, Passwortsicherheit, Multifaktor-Authentifizierung und rollenbasierte Zugriffe sind sicherheitskritisch. Über Keycloak laufen Registrierung, Login, Rollen, Nutzergruppen und MFA, sodass Versicherer, Experten und Administratoren sauber getrennt sind.",
          "Zentrale Sicherheitsfunktionen — 2FA, sichere Authentifizierung, Backup-Codes — waren bereits zum Go-live integriert. In der Versicherungsbranche ist das kein technisches Detail, sondern ein geschäftlicher Faktor: Eine Plattform, die sensible Schadeninformationen verarbeitet, muss Vertrauen schaffen, bevor sie skaliert. Auch innerhalb der Plattform ist Sicherheit entlang der Prozesse gedacht — Dokumente, Kommentare und ein integrierter, verschlüsselter Chat halten sensible Kommunikation aus externen Kanälen wie E-Mail heraus.",
        ],
      },
      {
        heading: "Prozessarchitektur",
        paragraphs: [
          "Zum Go-live unterstützte die Plattform zwei zentrale Prozesse — Fahrzeugschäden und Sachverständigung —, umgesetzt nicht als starre Einzelfunktionen, sondern als erweiterbare Prozesslogik.",
          "Das war entscheidend, weil Claimity nicht nur einen einzelnen Use Case digitalisieren wollte: Nach dem Go-live kamen unter anderem Betrugsermittlung sowie Spezialexpertisen für Bahn und Bus hinzu. Neue Leistungsbereiche lassen sich ergänzen, ohne die Plattform jedes Mal neu zu denken — das senkt den Entwicklungsaufwand und macht das Geschäftsmodell robuster.",
        ],
      },
      {
        heading: "Integrationen & APIs: vom Portal zum vernetzten Prozesssystem",
        paragraphs: [
          "Nach dem Go-live wurde die Plattform um REST-API-Schnittstellen erweitert — sowohl von der App zu externen Systemen als auch umgekehrt. Darüber lassen sich externe Daten importieren oder Plattformdaten für nachgelagerte Prozesse bereitstellen; wo Standardprozesse fehlten, wurde die Schnittstellenlogik individuell ergänzt. So lässt sich die Plattform in bestehende ERP-, CRM- oder Fachsysteme der Partner einbinden statt auf manuelle Eingaben beschränkt zu bleiben.",
          "Auch die Abrechnung wurde prozessnah integriert: Rechnungen werden weiterhin manuell gestellt, können aber direkt aus der App vorbereitet, importiert, bearbeitet und als PDF generiert werden.",
        ],
      },
      {
        heading: "Trade-off",
        paragraphs: [
          "Der zentrale Zielkonflikt lag zwischen schnellem Go-live in sechs Wochen und einer Architektur, die nach dem Markteintritt nicht neu gebaut werden muss. smiit löste das mit einem bewusst schlanken, aber robusten Cloud-Setup — schlank genug für einen schnellen Start, tragfähig genug für spätere Erweiterungen wie zusätzliche Prozesse, API-Anbindungen, In-Tenant-Rollenmodelle und abrechnungsnahe Funktionen. Das Ergebnis war kein Wegwerf-Prototyp, sondern ein produktives SaaS-MVP mit skalierbarer Grundlage.",
        ],
      },
      {
        heading: "Lehre: MFA muss zur Geräte- und Organisationsrealität passen",
        paragraphs: [
          "Unsere erste Annahme war, dass mehr Sicherheit automatisch besser ist — also die stärksten verfügbaren MFA-Verfahren inklusive Passkeys (WebAuthn) verpflichtend zu machen. In der Praxis zeigte sich: Genau das hätte legitime Nutzer ausgesperrt. In der Versicherungsbranche arbeiten viele Partner mit verwalteten oder eingeschränkten Geräten, geteilten Arbeitsplätzen und restriktiven Browser- und Organisationsrichtlinien, die Passkeys nicht oder nur unzuverlässig zulassen.",
          "Ein erzwungener Passkey-Login hätte damit das eigentliche Ziel des Sicherheitskonzepts untergraben — Vertrauen und Zugänglichkeit zum Go-live. Wir haben die MFA-Strategie deshalb bewusst neu zugeschnitten: Erzwungen wird MFA per OTP (zeitbasierte Einmalcodes aus einer Authenticator-App), ergänzt um Recovery-Codes für Aussperr-Fälle. Passkeys wurden zunächst deaktiviert — nicht verworfen, sondern für eine spätere optionale Einführung als komfortablere Alternative vorgesehen, sobald die Geräte- und Nutzerlandschaft klarer ist.",
        ],
        bullets: [
          "Das stärkste Authentifizierungsverfahren ist das falsche, wenn ein Teil der Nutzer es technisch nicht verwenden kann — MFA-Design ist eine Frage der Abdeckung, nicht nur der Sicherheit.",
          "Erzwingen sollte man das stärkste Verfahren, das alle relevanten Nutzer und Geräte zuverlässig unterstützen (hier: OTP) — und immer einen Wiederherstellungsweg (Recovery-Codes) anbieten.",
          "Komfortablere, aber voraussetzungsreiche Verfahren wie Passkeys führt man als optionale Alternative ein, nicht als Pflicht — sonst wird Sicherheit zum Zugangshindernis.",
        ],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "Innerhalb von sechs Wochen ging Claimity mit einem produktiven SaaS-MVP live — zum Start mit zwei Schadenprozessen und allen sicherheitskritischen Grundlagen: mandantenfähige Architektur, rollenbasierte Zugriffe, MFA und eine abgesicherte Azure-Infrastruktur.",
          "Seither wird die Plattform kontinuierlich erweitert — um weitere Prozessarten, API-Schnittstellen, In-Tenant-Strukturen und Abrechnungsfunktionen. Über 1.000 Fälle wurden bereits abgewickelt, gemeinsam mit Versicherungen, Schadenregulierern und spezialisierten Sachverständigen. Aus einer Plattformidee wurde so ein produktives, skalierbares SaaS-Geschäftsmodell.",
        ],
      },
    ],

    metrics: [
      { value: "6 Wochen", label: "vom Start bis zum produktiven Go-live" },
      { value: "1.000+", label: "abgewickelte Fälle über die Plattform" },
      { value: "3", label: "Portale: Admin, Experten, Versicherer" },
      { value: "2 → 4+", label: "Schadenprozesse vom MVP bis heute" },
    ],

    techStack: [
      { name: "Microsoft Azure", description: "Cloud-Plattform für skalierbares Hosting" },
      { name: "Azure App Service", description: "Stabiler, wartungsarmer Betrieb der Web-App" },
      { name: "Azure Database for PostgreSQL", description: "Strukturierte Prozess- und Mandantendaten" },
      { name: "Azure Virtual Network", description: "Abgesicherte Infrastrukturtrennung" },
      { name: "Azure Front Door", description: "Kontrollierter externer Zugriff & Routing" },
      { name: "Azure Key Vault", description: "Sichere Verwaltung von Secrets & Konfigurationen" },
      { name: "Keycloak", description: "User-Management, Rollen, Login & Multifaktor-Authentifizierung" },
      { name: "REST-APIs", description: "Integration externer Systeme & Partnerprozesse" },
    ],

    quote: {
      text:
        "smiit hat uns geholfen, unsere Plattformidee in sehr kurzer Zeit in ein produktives SaaS-Produkt zu überführen. Besonders wertvoll war, dass von Anfang an eine stabile Grundlage für Sicherheit, Wachstum und weitere Prozesse entstanden ist — nicht nur einzelne Funktionen.",
      author: "Claimity AG",
      role: "InsurTech · SaaS-Plattform für digitale Schadenabwicklung",
    },

    metaTitle: "Cloud-Architektur SaaS Versicherung – Case Study Claimity AG | smiit",
    metaDescription:
      "Wie smiit für Claimity in 6 Wochen eine sichere Multi-Tenant-SaaS-Plattform für digitale Schadenprozesse auf Azure baute – von der Architektur bis zum Go-live.",
  },
  en: {
    slug: "claimity-ag",
    serviceArea: "apps",
    relatedServicePath: "services/apps",
    datePublished: "2026-05-20",
    ogImage: {
      url: "/og/case-study-claimity-ag.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case study Claimity AG",
    },
    image: {
      url: "/assets/case-studies/claimity_en.webp",
      width: 1672,
      height: 941,
      alt: "Cloud architecture of a multi-tenant SaaS platform for digital insurance claims handling — built on Azure with REST APIs, role-based authentication, document management and encrypted chat.",
    },

    client: "Claimity AG",
    industry: "InsurTech / Insurance",
    companySize: "Switzerland · Startup",
    title: "A production SaaS platform for digital claims in 6 weeks",
    summary:
      "Claimity AG is a Swiss InsurTech digitizing claims handling between insurers, claims adjusters and specialized experts. In just six weeks, smiit turned that into a production SaaS MVP — secure, multi-tenant and scalable from day one. Today, more than 1,000 cases run through the platform.",
    heroMetric: { value: "6 weeks", label: "from kickoff to a live platform" },

    facts: [
      { label: "Industry", value: "InsurTech / Insurance" },
      { label: "Region", value: "Switzerland" },
      { label: "Service", value: "Cloud architecture & SaaS development" },
      { label: "Model", value: "Multi-tenant SaaS on Azure" },
      { label: "Timeline", value: "6 weeks to go-live" },
    ],

    sections: [
      {
        heading: "Starting point",
        paragraphs: [
          "Claimity faced a challenge typical of young platform businesses: market demand was clear and the business processes were defined — but there was no production-ready platform that could go live quickly while still scaling for the long term.",
          "Claims handling had run on scattered channels — emails, documents, manual coordination, different systems. For a growing marketplace of insurers, experts and claims adjusters, that quickly creates broken handoffs, unclear responsibilities and high coordination effort. Technically, the platform had to keep multiple parties cleanly separated — insurers file and track cases, experts work the cases assigned to them, administrators steer processes and users — and bundle documents and communication per case.",
          "On top of that, a simple web app without a security concept isn't enough for insurance processes. Secure registration, authentication, two-factor authentication and backup codes had to be in place by go-live — the precondition for Claimity to appear trustworthy to insurers and professional partners.",
        ],
      },
      {
        heading: "Solution: a multi-tenant SaaS architecture",
        paragraphs: [
          "smiit built a multi-tenant SaaS platform on Microsoft Azure — deliberately as a single multi-tenant architecture rather than a set of separate customer instances. That lets Claimity onboard new insurance partners, experts and adjusters quickly, without standing up dedicated infrastructure per customer. The result: less operational overhead, faster onboarding and a foundation that grows with the business.",
          "Hosting runs on an Azure App Service — deliberately pragmatic rather than a complex Kubernetes setup: stable, low-maintenance operation with efficient deployment, scaling and monitoring. The database is Azure Database for PostgreSQL, a robust relational base for claims processes, tenants, roles, document references and billing data — while Azure handles backups, availability and patching.",
          "Application, database and cloud components sit in a secured Azure environment with a virtual network. External access is routed in a controlled way through Azure Front Door, and sensitive configuration and secrets are kept out of the code in Azure Key Vault.",
        ],
      },
      {
        heading: "User management & security",
        paragraphs: [
          "For user management, smiit relied on Keycloak as the central identity and access management component — deliberately not a self-built login, because authentication, password security, multi-factor authentication and role-based access are security-critical. Keycloak handles registration, login, roles, user groups and MFA, keeping insurers, experts and administrators cleanly separated.",
          "Core security functions — 2FA, secure authentication, backup codes — were integrated from go-live. In insurance, that's not a technical detail but a business factor: a platform handling sensitive claims data has to build trust before it scales. Security is also designed along the processes — documents, comments and an integrated, encrypted chat keep sensitive communication out of external channels like email.",
        ],
      },
      {
        heading: "Process architecture",
        paragraphs: [
          "At go-live the platform supported two core processes — vehicle damage and expert assessment — built not as rigid features but as extensible process logic.",
          "That mattered because Claimity wasn't only digitizing a single use case: after go-live, fraud investigation and specialist assessments for rail and bus were added, among others. New service areas can be added without rethinking the platform each time — lowering development effort and making the business model more resilient.",
        ],
      },
      {
        heading: "Integrations & APIs: from portal to a connected process system",
        paragraphs: [
          "After go-live, the platform was extended with REST API interfaces — both from the app to external systems and the other way around. They allow external data to be imported or platform data to be served to downstream processes; where standard processes were missing, the interface logic was built individually. That lets the platform plug into partners' existing ERP, CRM or domain systems rather than relying on manual input.",
          "Billing was integrated close to the process as well: invoices are still issued manually, but can be prepared, imported, edited and generated as a PDF directly from the app.",
        ],
      },
      {
        heading: "Trade-off",
        paragraphs: [
          "The central tension was between a fast go-live in six weeks and an architecture that wouldn't need rebuilding after market entry. smiit resolved it with a deliberately lean but robust cloud setup — lean enough for a quick start, solid enough for later extensions such as additional processes, API integrations, in-tenant role models and billing-related functions. The result was not a throwaway prototype but a production SaaS MVP on a scalable foundation.",
        ],
      },
      {
        heading: "What we learned: MFA has to fit the reality of devices and organizations",
        paragraphs: [
          "Our first assumption was that more security is automatically better — so we planned to enforce the strongest available MFA methods, including passkeys (WebAuthn). In practice, that would have locked out legitimate users. In insurance, many partners work on managed or restricted devices, shared workstations and under strict browser and organizational policies that don't allow passkeys, or only unreliably.",
          "Enforcing a passkey login would therefore have undermined the very goal of the security concept — trust and accessibility at go-live. So we deliberately re-scoped the MFA strategy: MFA is enforced via OTP (time-based one-time codes from an authenticator app), complemented by recovery codes for lockout situations. Passkeys were disabled for now — not discarded, but kept ready for a later optional rollout as a more convenient alternative, once the device and user landscape is clearer.",
        ],
        bullets: [
          "The strongest authentication method is the wrong one if part of your users can't technically use it — MFA design is a question of coverage, not just security.",
          "Enforce the strongest method that all relevant users and devices reliably support (here: OTP) — and always provide a recovery path (recovery codes).",
          "Introduce more convenient but prerequisite-heavy methods like passkeys as an optional alternative, not as a mandate — otherwise security becomes a barrier to access.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "Within six weeks, Claimity went live with a production SaaS MVP — launching with two claims processes and all the security-critical fundamentals: multi-tenant architecture, role-based access, MFA and a secured Azure infrastructure.",
          "Since then the platform has been expanded continuously — with more process types, API interfaces, in-tenant structures and billing functions. More than 1,000 cases have already been handled, together with insurers, claims adjusters and specialized experts. A platform idea became a production-ready, scalable SaaS business model.",
        ],
      },
    ],

    metrics: [
      { value: "6 weeks", label: "from kickoff to a live platform" },
      { value: "1,000+", label: "cases handled through the platform" },
      { value: "3", label: "portals: admin, experts, insurers" },
      { value: "2 → 4+", label: "claims processes from MVP to today" },
    ],

    techStack: [
      { name: "Microsoft Azure", description: "Cloud platform for scalable hosting" },
      { name: "Azure App Service", description: "Stable, low-maintenance operation of the web app" },
      { name: "Azure Database for PostgreSQL", description: "Structured process and tenant data" },
      { name: "Azure Virtual Network", description: "Secured infrastructure separation" },
      { name: "Azure Front Door", description: "Controlled external access & routing" },
      { name: "Azure Key Vault", description: "Secure management of secrets & configuration" },
      { name: "Keycloak", description: "User management, roles, login & multi-factor authentication" },
      { name: "REST APIs", description: "Integration of external systems & partner processes" },
    ],

    quote: {
      text:
        "smiit helped us turn our platform idea into a production SaaS product in a very short time. What mattered most was that, from the start, we got a stable foundation for security, growth and further processes — not just individual features.",
      author: "Claimity AG",
      role: "InsurTech · SaaS platform for digital claims handling",
    },

    metaTitle: "Cloud architecture SaaS insurance – Claimity AG case study | smiit",
    metaDescription:
      "How smiit built a secure multi-tenant SaaS platform for digital insurance claims on Azure for Claimity in 6 weeks — from architecture to go-live.",
  },
}

const dyProject: LocalizedCaseStudy = {
  de: {
    slug: "dy-project-ag",
    serviceArea: "analytics",
    relatedServicePath: "services/analytics",
    datePublished: "2026-05-22",
    ogImage: {
      url: "/og/case-study-dy-project-ag.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case Study dy Project AG",
    },
    image: {
      url: "/assets/case-studies/dy-project_de.webp",
      width: 1672,
      height: 941,
      alt: "Power-BI-Reporting-Architektur für ein Großbauprojekt mit Azure Databricks, SQL Server, Excel-Dateien, REST-APIs, Bronze-/Silver-/Gold-Layer, Data Warehouse, Governance und Management-Dashboards.",
    },

    client: "dy Project AG",
    industry: "Bau- & Infrastrukturprojekte",
    companySize: "Schweiz · Projektmanagement",
    title: "Power BI Reporting für ein Großbauprojekt mit über 1 Mrd. CHF Volumen",
    summary:
      "Die dy Project AG steuert anspruchsvolle Bau- und Infrastrukturvorhaben. Für ein Großbauprojekt mit über 1 Milliarde CHF Volumen baute smiit eine zentrale Power-BI-Reporting-Landschaft auf — Daten aus SQL Servern, Excel und Cloud-Systemen, konsolidiert über Azure Databricks. Über mehr als zwei Jahre entstand so ein konsistentes Lagebild für Management und Projektsteuerung.",
    heroMetric: { value: "1 Mrd. CHF+", label: "Projektvolumen, gesteuert über die Reporting-Landschaft" },

    facts: [
      { label: "Branche", value: "Bau- & Infrastrukturprojekte" },
      { label: "Region", value: "Schweiz" },
      { label: "Leistung", value: "Data Platform & Power BI Reporting" },
      { label: "Plattform", value: "Azure Databricks + Power BI" },
      { label: "Zeitraum", value: "2+ Jahre (laufend)" },
    ],

    sections: [
      {
        heading: "Ausgangssituation: kein einheitliches Lagebild",
        paragraphs: [
          "Großbauprojekte erzeugen enorme Datenmengen: Projektfortschritt, Budget, Timelines, Verzögerungen, Risiken, Sitzungen, Maßnahmen und Statusinformationen liegen selten in einem einzigen System, sondern verteilt über Plattformen, Dateien und Fachanwendungen.",
          "Auch hier kamen die relevanten Daten aus sehr unterschiedlichen Systemtypen — SQL-Server-Datenbanken, manuell gepflegten Excel-Dateien, Cloud-Systemen und Fachanwendungen, die über REST-Schnittstellen angebunden werden mussten. Manche lieferten strukturierte Daten, andere nur teilweise standardisierte Exporte. Für einzelne Teams war das handhabbar; auf Management-Ebene entstand daraus ein Problem: Informationen mussten aus vielen Quellen zusammengetragen, verglichen und interpretiert werden — ein konsistentes, aktuelles Gesamtbild war kaum möglich.",
          "Technisch hieß das: Einzelne Power-BI-Berichte direkt an die Quellen zu hängen, reicht bei dieser Datenmenge, Systemvielfalt und Nutzerzahl nicht. Zuerst braucht es eine belastbare Datenplattform mit klaren Datenflüssen, definierten Datenmodellen, Rollenmanagement und Governance — erst darauf ein Reporting, das performant, nachvollziehbar und langfristig wartbar ist.",
        ],
      },
      {
        heading: "Lösung: Azure Databricks als zentrale Datenplattform vor Power BI",
        paragraphs: [
          "smiit baute eine zentrale Datenarchitektur, in der die Daten aus den Quellsystemen zunächst in Azure Databricks zusammengeführt werden — bewusst ein vorgelagerter Data-Warehouse-Ansatz statt komplexer Transformationslogik direkt in Power BI. So bleibt Power BI die analytische Oberfläche für Management und Projektsteuerung, während Integration, Harmonisierung und Qualitätslogik in einer skalierbaren Plattform stattfinden: stabilere, schnellere und langfristig besser wartbare Berichte.",
          "Die Daten durchlaufen eine mehrstufige Bronze-/Silver-/Gold-Architektur. Im Bronze Layer werden Rohdaten möglichst unverändert aufgenommen — das schafft Nachvollziehbarkeit bis zur Quelle. Im Silver Layer werden sie bereinigt und fachlich harmonisiert: einheitliche Projekt- und Programmstrukturen, konsistente Datumslogiken, bereinigte Statuswerte sowie zusammengeführte Risiko- und Terminstrukturen.",
          "Im Gold Layer entstehen kuratierte, auf die Analyse optimierte Datenmodelle: Management-Kennzahlen, Projektstatus, Budgetentwicklung, Terminabweichungen und Risikokategorien sind so vorbereitet, dass Power BI sie performant und verständlich auswerten kann. Daten werden damit nicht mehr punktuell visualisiert, sondern systematisch in eine belastbare Reporting-Grundlage überführt, die mit neuen Anforderungen wächst.",
        ],
      },
      {
        heading: "Datenintegration: SQL Server, Excel, Cloud-Systeme und REST-APIs",
        paragraphs: [
          "Ein Kernstück der Umsetzung war die Integration sehr unterschiedlicher Quellen. Strukturierte Daten aus SQL Servern wurden direkt angebunden; ergänzend verarbeitete smiit Excel-Dateien, die in Projektorganizationen weiterhin eine wichtige Rolle spielen — etwa für Statuslisten und manuelle Ergänzungen. Cloud-Systeme und Fachanwendungen kamen über REST-APIs hinzu; wo Daten nicht in der benötigten Form vorlagen, erschloss und strukturierte smiit die Schnittstellen.",
          "Diese Arbeit ist entscheidend, weil Power BI nur so gut ist wie die Datenbasis darunter: Ein Dashboard auf uneinheitlichen, manuell kopierten Daten erzeugt im Management schnell Misstrauen. Die vorgelagerte Plattform macht Datenflüsse transparenter und fachliche Definitionen konsistenter — weniger manuelle Zusammenführung, weniger Interpretationsspielraum, eine verlässlichere Grundlage für Projektentscheidungen.",
        ],
      },
      {
        heading: "Power BI: Management-Dashboards statt isolierter Einzelberichte",
        paragraphs: [
          "Auf den kuratierten Gold-Datenmodellen entstanden mehrere Power-BI-Berichte — vor allem für die Management-Ebene, aber auch für Programm- und Projektverantwortliche. Sie decken Projektfortschritt, Budget, Terminpläne, Verzögerungen, Sitzungen, Maßnahmen und Risiken ab und setzen diese in Beziehung: So wird etwa sichtbar, welche Terminverzögerungen mit kritischen Risiken zusammenhängen oder welche Budgetentwicklung auf welche Projektbereiche zurückgeht.",
          "Die Reporting-Struktur ist hierarchisch — von der Management-Perspektive über Programm- und Projektebenen bis zu Detailanalysen einzelner Themenbereiche —, sodass dieselbe Landschaft strategische Steuerungsrunden und operative Detailfragen bedient. Ein Fokus lag auf Performance: Datenmodellierung, Measures, Filterlogik und Berichtsnavigation wurden so gestaltet, dass die Berichte bei großen Datenmengen, mehreren Hierarchieebenen und vielen Nutzern schnell reagieren und verständlich bleiben.",
        ],
      },
      {
        heading: "Rollenmanagement, Governance und Betrieb im Power BI Service",
        paragraphs: [
          "Da unterschiedliche Nutzergruppen die Berichte verwenden, war Governance zentral — nicht jeder benötigt dieselbe Sicht auf Daten und Detailinformationen. Eine rollenbasierte Struktur organisiert Zugriffe entlang der Verantwortlichkeiten: klare Workspace-Strukturen, abgestimmte Berechtigungen, kontrollierte Veröffentlichung und je nach Kontext Row-Level Security, App-Verteilung oder getrennte Entwicklungs-, Test- und Produktivbereiche.",
          "So wird Reporting nicht zu einer unkontrollierten Sammlung einzelner Dateien, sondern zu einer verwalteten BI-Landschaft, in der klar ist, welche Berichte produktiv sind, welche Datenmodelle genutzt werden und welche Nutzergruppen Zugriff haben. Bei dieser Größenordnung ist das entscheidend: Management-Reporting muss nicht nur korrekt aussehen, sondern organisatorisch belastbar sein.",
        ],
      },
      {
        heading: "Trade-off: schnell sichtbare Reports und langfristig tragfähige Architektur",
        paragraphs: [
          "Der zentrale Zielkonflikt lag zwischen schnell sichtbaren Ergebnissen und sauberer Datenarchitektur: Ein rein reportgetriebener Ansatz führt schnell zu schwer wartbaren Power-BI-Dateien, doppelter Logik und inkonsistenten Kennzahlen. smiit löste das iterativ — zuerst MVP-Berichte, um Anforderungen sichtbar und mit Stakeholdern diskutierbar zu machen, parallel dazu die Databricks-Architektur professionalisiert. So arbeiteten Management und Fachbereiche früh mit konkreten Visualisierungen, während die technische Grundlage Schritt für Schritt stabiler wurde — schnelle fachliche Fortschritte ohne langfristige technische Sackgasse.",
        ],
      },
      {
        heading: "Lehre: Kennzahlen-Definitionen schlagen schöne Dashboards",
        paragraphs: [
          "Der iterative MVP-Ansatz hat die Zusammenarbeit beschleunigt — aber er hatte einen Preis, den wir unterschätzt haben. Sobald die ersten ansprechenden Dashboards standen, stritten Stakeholder nicht über die Visualisierung, sondern über die Zahlen selbst: Was genau zählt als „Verzögerung“, ab wann ist ein Arbeitspaket „in Verzug“, wie ist ein „Status“ über verschiedene Quellsysteme hinweg definiert? Dieselbe Kennzahl bedeutete für verschiedene Teams und Systeme Unterschiedliches.",
          "Damit war die vermeintliche Diskussion über die Korrektheit des Reports in Wahrheit eine Diskussion über fehlende gemeinsame Definitionen — ein Daten- und Semantikproblem, kein Tool-Problem. Wir haben daraus gelernt, die fachlichen Definitionen früher festzuzurren: ein abgestimmtes Kennzahlen-Glossar als verbindliche Logik im Gold Layer, bevor und während die Dashboards entstehen. Erst diese eine Quelle der Wahrheit beendete die wiederkehrenden Definitionsdebatten in den Status-Runden.",
        ],
        bullets: [
          "Bei verteilten Datenquellen ist die fachliche Definition einer Kennzahl der eigentliche Engpass — nicht die Visualisierung.",
          "Die Glaubwürdigkeit eines Dashboards entscheidet sich an der Konsistenz der Definitionen, nicht an der Qualität der Diagramme.",
          "Kennzahlen-Semantik gehört verbindlich in den Gold Layer (ein Glossar als Single Source of Truth) — sonst misstraut das Management auch technisch korrekten Berichten.",
        ],
      },
      {
        heading: "Ergebnis: ein konsolidiertes Lagebild für Management und Projektsteuerung",
        paragraphs: [
          "Über mehr als zwei Jahre entstand eine Power-BI-Reporting-Landschaft, die Daten aus SQL-Datenbanken, Excel-Dateien, Cloud-Systemen und manuellen Statusformaten zentral verarbeitet und für Management-, Programm- und Projektebene bereitstellt — statt sie einzeln zusammenzuführen. Das Ergebnis ist ein aktuelleres, einheitlicheres und besser nachvollziehbares Lagebild über das Gesamtprojekt.",
          "Für ein Bauprojekt mit über 1 Milliarde CHF Volumen ist dieser Überblick ein erheblicher Mehrwert: Fortschritt, Budget, Termine, Verzögerungen, Sitzungen und Risiken lassen sich auf mehreren Hierarchieebenen analysieren, kritische Entwicklungen werden früher sichtbar und Statusbesprechungen datenbasierter. Technisch verbindet die Architektur Datenintegration, Data-Warehouse-Logik, Power BI Reporting, Governance und Betrieb — geschäftlich entsteht Transparenz für die Steuerung komplexer Infrastrukturprojekte.",
        ],
      },
    ],

    metrics: [
      { value: "1 Mrd. CHF+", label: "Projektvolumen im betrachteten Großbauprojekt" },
      { value: "2+ Jahre", label: "Aufbau, Betrieb und Erweiterung der Reporting-Landschaft" },
      { value: "4+", label: "Datenquellentypen: SQL Server, Excel, Cloud, REST-APIs" },
      { value: "Dutzende", label: "Workshops mit Stakeholdern und Fachbereichen" },
    ],

    techStack: [
      { name: "Power BI", description: "Zentrale Reporting- & Management-Oberfläche" },
      { name: "Power BI Service", description: "Veröffentlichung, Berechtigungen & Berichtsbetrieb" },
      { name: "Azure Databricks", description: "Zentrale Datenverarbeitung & Transformation" },
      { name: "Bronze-/Silver-/Gold-Layer", description: "Nachvollziehbare, skalierbare Datenverarbeitung" },
      { name: "SQL Server", description: "Quelle für strukturierte Projektdaten" },
      { name: "Excel-Dateien", description: "Integration manueller & fachlicher Projektdaten" },
      { name: "REST-APIs", description: "Anbindung von Cloud-Systemen & Fachanwendungen" },
      { name: "Data-Warehouse-/Lakehouse-Architektur", description: "Skalierbarkeit, Nachvollziehbarkeit & Performance" },
      { name: "Rollenmanagement & Governance", description: "Kontrollierte Nutzung durch verschiedene Stakeholder" },
    ],

    quote: {
      text:
        "smiit hat uns dabei unterstützt, aus einer komplexen und verteilten Datenlandschaft ein strukturiertes Management-Reporting aufzubauen. Besonders wertvoll war die Kombination aus technischer Datenintegration, Verständnis für Projektsteuerung und der Fähigkeit, die Anforderungen vieler Stakeholder in verständliche Power-BI-Berichte zu übersetzen.",
      author: "dy Project AG",
      role: "Projektmanagement für Bau- & Infrastrukturvorhaben",
    },

    metaTitle: "Power BI Reporting Großbauprojekt – Case Study dy Project AG | smiit",
    metaDescription:
      "Wie smiit für die dy Project AG ein Power-BI-Reporting für ein Großbauprojekt (über 1 Mrd. CHF) auf Azure Databricks baute – mit Data Warehouse und Governance.",
  },
  en: {
    slug: "dy-project-ag",
    serviceArea: "analytics",
    relatedServicePath: "services/analytics",
    datePublished: "2026-05-22",
    ogImage: {
      url: "/og/case-study-dy-project-ag.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case study dy Project AG",
    },
    image: {
      url: "/assets/case-studies/dy-project_en.webp",
      width: 1672,
      height: 941,
      alt: "Power BI reporting architecture for a large construction project — Azure Databricks, SQL Server, Excel files, REST APIs, bronze/silver/gold layers, data warehouse, governance and management dashboards.",
    },

    client: "dy Project AG",
    industry: "Construction & infrastructure",
    companySize: "Switzerland · Project management",
    title: "Power BI reporting for a CHF 1bn+ construction project",
    summary:
      "dy Project AG steers demanding construction and infrastructure projects. For a major project worth over CHF 1 billion, smiit built a central Power BI reporting landscape — data from SQL Servers, Excel and cloud systems, consolidated through Azure Databricks. Over more than two years, this created a consistent picture for management and project control.",
    heroMetric: { value: "CHF 1bn+", label: "project volume steered through the reporting landscape" },

    facts: [
      { label: "Industry", value: "Construction & infrastructure" },
      { label: "Region", value: "Switzerland" },
      { label: "Service", value: "Data platform & Power BI reporting" },
      { label: "Platform", value: "Azure Databricks + Power BI" },
      { label: "Timeline", value: "2+ years (ongoing)" },
    ],

    sections: [
      {
        heading: "Starting point: many data sources, many stakeholders, no single picture",
        paragraphs: [
          "Large construction projects generate enormous amounts of data: progress, budget, timelines, delays, risks, meetings, actions and status rarely sit in a single system — they are spread across platforms, files and domain applications.",
          "Here too, the relevant data came from very different system types — SQL Server databases, manually maintained Excel files, cloud systems and domain applications that had to be connected via REST interfaces. Some delivered structured data, others only partly standardized exports. Manageable for individual teams; at management level it became a problem: information had to be gathered, compared and interpreted from many sources, making a consistent, up-to-date overall picture hard to achieve.",
          "Technically that meant: wiring individual Power BI reports straight to the sources isn't enough given this data volume, system diversity and number of users. First you need a solid data platform with clear data flows, defined models, role management and governance — and only then reporting that is performant, traceable and maintainable in the long run.",
        ],
      },
      {
        heading: "Solution: Azure Databricks as a central data platform ahead of Power BI",
        paragraphs: [
          "smiit built a central data architecture in which data from the source systems is first consolidated in Azure Databricks — deliberately an upstream data-warehouse approach rather than complex transformation logic directly in Power BI. This keeps Power BI as the analytical surface for management and project control, while integration, harmonization and quality logic happen in a scalable platform: more stable, faster and more maintainable reports.",
          "The data passes through a multi-layer bronze/silver/gold architecture. In the bronze layer, raw data is ingested as unchanged as possible — providing traceability back to the source. In the silver layer it is cleaned and harmonized: consistent project and program structures, consistent date logic, cleaned status values, and merged risk and schedule structures.",
          "In the gold layer, curated data models optimized for analysis are created: management metrics, project status, budget development, schedule variances and risk categories are prepared so Power BI can evaluate them performantly and understandably. Data is no longer visualized ad hoc but systematically turned into a solid reporting foundation that grows with new requirements.",
        ],
      },
      {
        heading: "Data integration: SQL Server, Excel, cloud systems and REST APIs",
        paragraphs: [
          "A core part of the work was integrating very different sources. Structured data from SQL Servers was connected directly; in addition, smiit processed Excel files, which still play an important role in project organizations — for status lists and manual additions, for example. Cloud systems and domain applications were connected via REST APIs; where data wasn't available in the required form, smiit built and structured the interfaces.",
          "This work is decisive, because Power BI is only as good as the data beneath it: a dashboard built on inconsistent, manually copied data quickly breeds mistrust at management level. The upstream platform makes data flows more transparent and definitions more consistent — less manual consolidation, less room for interpretation, and a more reliable basis for project decisions.",
        ],
      },
      {
        heading: "Power BI: management dashboards instead of isolated reports",
        paragraphs: [
          "Several Power BI reports were built on the curated gold data models — primarily for management, but also supporting program and project leads. They cover progress, budget, schedules, delays, meetings, actions and risks, and relate them to one another: it becomes visible, for instance, which delays connect to critical risks or which budget developments trace back to which project areas.",
          "The reporting structure is hierarchical — from the management view through program and project levels down to detailed analyses — so the same landscape serves strategic steering sessions and operational detail questions. A key focus was performance: data modeling, measures, filter logic and report navigation were designed so the reports respond quickly and stay understandable with large data volumes, multiple hierarchy levels and many users.",
        ],
      },
      {
        heading: "Role management, governance and operations in the Power BI Service",
        paragraphs: [
          "Because different user groups use the reports, governance was central — not everyone needs the same view of data and detail. A role-based structure organizes access along responsibilities: clear workspace structures, agreed permissions, controlled publishing and, depending on context, row-level security, app distribution or separate development, test and production areas.",
          "This keeps reporting from becoming an uncontrolled collection of individual files and turns it into a managed BI landscape where it's clear which reports are in production, which data models are used and which groups have access. At this scale that's decisive: management reporting has to be not only correct but organizationally robust.",
        ],
      },
      {
        heading: "Trade-off: quickly visible reports and a durable data architecture",
        paragraphs: [
          "The central tension was between quickly visible results and a clean data architecture: a purely report-driven approach quickly leads to hard-to-maintain Power BI files, duplicated logic and inconsistent metrics. smiit resolved it iteratively — first MVP reports to make requirements visible and discussable with stakeholders, while professionalizing the Databricks architecture in parallel. Management and business units worked with concrete visualizations early, while the technical foundation grew steadily more stable — fast progress without a long-term dead end.",
        ],
      },
      {
        heading: "What we learned: metric definitions beat beautiful dashboards",
        paragraphs: [
          "The iterative MVP approach sped up collaboration — but it had a cost we underestimated. As soon as the first attractive dashboards were in place, stakeholders argued not about the visualization but about the numbers themselves: what exactly counts as a 'delay', when is a work package 'behind schedule', how is a 'status' defined across different source systems? The same metric meant different things to different teams and systems.",
          "So the apparent debate about whether the report was correct was really a debate about missing shared definitions — a data and semantics problem, not a tool problem. We learned to lock the business definitions down earlier: an agreed metric glossary as binding logic in the gold layer, before and while the dashboards are built. Only that single source of truth ended the recurring definition debates in the status meetings.",
        ],
        bullets: [
          "With distributed data sources, the bottleneck is the business definition of a metric — not the visualization.",
          "A dashboard's credibility is decided by the consistency of its definitions, not the quality of its charts.",
          "Metric semantics belong in the gold layer as binding logic (a glossary as single source of truth) — otherwise management mistrusts even technically correct reports.",
        ],
      },
      {
        heading: "Result: a consolidated picture for management and project control",
        paragraphs: [
          "Over more than two years, a Power BI reporting landscape emerged that processes data from SQL databases, Excel files, cloud systems and manual status formats centrally and makes it available at management, program and project level — instead of merging it case by case. The result is a more current, more consistent and more traceable picture of the overall project.",
          "For a construction project worth over CHF 1 billion, this overview is a substantial benefit: progress, budget, schedules, delays, meetings and risks can be analyzed across hierarchy levels, critical developments surface earlier and status meetings become more data-driven. Technically, the architecture ties together data integration, data-warehouse logic, Power BI reporting, governance and operations — and on the business side it creates the transparency needed to steer complex infrastructure projects.",
        ],
      },
    ],

    metrics: [
      { value: "CHF 1bn+", label: "project volume in the construction project" },
      { value: "2+ years", label: "building, operating and extending the reporting landscape" },
      { value: "4+", label: "source types: SQL Server, Excel, cloud, REST APIs" },
      { value: "Dozens", label: "workshops with stakeholders and business units" },
    ],

    techStack: [
      { name: "Power BI", description: "Central reporting & management surface" },
      { name: "Power BI Service", description: "Publishing, permissions & report operations" },
      { name: "Azure Databricks", description: "Central data processing & transformation" },
      { name: "Bronze/Silver/Gold layers", description: "Traceable, scalable data processing" },
      { name: "SQL Server", description: "Source for structured project data" },
      { name: "Excel files", description: "Integration of manual & domain project data" },
      { name: "REST APIs", description: "Connecting cloud systems & domain applications" },
      { name: "Data warehouse / lakehouse architecture", description: "Scalability, traceability & performance" },
      { name: "Role management & governance", description: "Controlled use across different stakeholders" },
    ],

    quote: {
      text:
        "smiit helped us turn a complex, distributed data landscape into structured management reporting. What stood out was the combination of technical data integration, an understanding of project control, and the ability to translate many stakeholders' requirements into clear Power BI reports.",
      author: "dy Project AG",
      role: "Project management for construction & infrastructure",
    },

    metaTitle: "Power BI reporting for large construction projects – dy Project AG | smiit",
    metaDescription:
      "How smiit built a Power BI reporting landscape for a CHF 1bn+ construction project on Azure Databricks for dy Project AG — with a data warehouse and governance.",
  },
}

const gbLogistics: LocalizedCaseStudy = {
  de: {
    slug: "gb-logistics-gmbh",
    serviceArea: "strategy",
    relatedServicePath: "services/strategy",
    datePublished: "2026-05-23",
    ogImage: {
      url: "/og/case-study-gb-logistics-gmbh.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case Study G&B Logistics GmbH",
    },
    image: {
      url: "/assets/case-studies/gb_de.webp",
      width: 1672,
      height: 941,
      alt: "Digitale Strategie und Prozessautomatisierung für ein Logistikunternehmen mit Power Automate, AI Builder, Microsoft Business Central, HubSpot, Cloud-Datenplattform, Power BI Reporting, Stammdatenmanagement und hybrider IT-Infrastruktur.",
    },

    client: "G&B Logistics GmbH",
    industry: "Logistik",
    companySize: "Deutschland · Mittelstand",
    title: "Digitale Strategie & Prozessautomatisierung für ein Logistikunternehmen",
    summary:
      "Die G&B Logistics GmbH arbeitet mit gewachsenen Systemen und vielen manuellen Prozessen. smiit entwickelte daraus eine umsetzbare digitale Zielarchitektur — bestehende Systeme verbinden statt ersetzen, zeitintensive Abläufe automatisieren und eine zentrale Datenbasis schaffen. Allein die automatisierte Auftragserfassung spart rund 140 Arbeitsstunden pro Monat.",
    heroMetric: { value: "140 Std./Monat", label: "eingespart allein durch automatisierte Auftragserfassung" },

    facts: [
      { label: "Branche", value: "Logistik" },
      { label: "Region", value: "Deutschland" },
      { label: "Leistung", value: "Digitale Strategie & Prozessautomatisierung" },
      { label: "Plattform", value: "Power Platform · Business Central · Power BI" },
      { label: "Zeitraum", value: "laufende Zusammenarbeit" },
    ],

    sections: [
      {
        heading: "Ausgangssituation: manuelle Abläufe zwischen E-Mail, ERP, CRM und Disposition",
        paragraphs: [
          "Wie in vielen mittelständischen Unternehmen war die IT-Landschaft bei G&B Logistics historisch gewachsen: ein lokales Dispositionssystem, Microsoft Business Central, HubSpot, E-Mail-basierte Auftragseingänge und manuell gepflegte Daten existierten parallel. Jedes System erfüllte seinen Zweck — aber die Prozesse dazwischen waren oft manuell, zeitintensiv und schwer skalierbar.",
          "Besonders kritisch war die Auftragsverarbeitung: Aufträge kamen per E-Mail als PDF und mussten manuell ausgelesen und ins Dispositionssystem übertragen werden. Jede manuelle Übertragung kostet Zeit, erzeugt Fehlerpotenzial und bindet Mitarbeitende an repetitive Tätigkeiten — und es war kaum nachvollziehbar, ob jeder eingegangene Auftrag vollständig verarbeitet wurde.",
          "Auch auf Datenebene fehlte eine einheitliche Basis: Business Central enthielt ERP- und Buchhaltungsdaten, HubSpot die CRM-nahen Prozesse, das Dispositionssystem lief lokal, weitere Informationen lagen in Dateien. Für Auswertungen, Automatisierung und Stammdatenharmonisierung gab es keine zentrale Quelle. Die Aufgabe war daher nicht, einzelne Schritte zu automatisieren, sondern eine digitale Strategie zu entwickeln, die vorhandene Systeme sinnvoll verbindet, ohne den laufenden Betrieb zu gefährden.",
        ],
      },
      {
        heading: "Lösung: digitale Zielarchitektur statt isolierter Einzelautomatisierungen",
        paragraphs: [
          "smiit unterstützte G&B Logistics beim Aufbau einer digitalen Zielarchitektur für Prozesse, Daten und Systeme — bewusst ohne alles neu zu bauen. Stattdessen wurden bestehende Systeme integriert, Prozesse analysiert und gezielt automatisiert. Bei gewachsenen Mittelstands-IT-Landschaften wäre ein vollständiger Systemwechsel teuer, risikoreich und operativ kaum sinnvoll.",
          "Der Fokus lag deshalb darauf, vorhandene Systeme besser zu verbinden — Business Central, HubSpot, das lokale Dispositionssystem, E-Mail-Prozesse und eine neue cloudbasierte Datenplattform. So entstand keine theoretische Digitalstrategie, sondern eine umsetzbare Roadmap mit konkreten Verbesserungen im Tagesgeschäft, während besonders fehleranfällige Prozesse Schritt für Schritt automatisiert wurden.",
        ],
      },
      {
        heading: "Automatisierte Auftragserfassung mit Power Automate und AI Builder",
        paragraphs: [
          "Ein zentraler Baustein war die automatische Verarbeitung eingehender Aufträge. Sie kommen weiterhin per E-Mail als PDF — ein für Kunden und Partner etabliertes Format, das nicht kurzfristig ersetzt werden sollte. Statt den Eingangskanal zu ändern, automatisierte smiit den Prozess dahinter: Mit Microsoft Power Automate und dem AI Builder werden eingehende PDF-Aufträge automatisch erkannt, ausgelesen und ins Dispositionssystem übertragen.",
          "Die Entscheidung war bewusst pragmatisch — externe Auftraggeber mussten nicht auf ein neues Portal oder Format umstellen, der interne manuelle Aufwand sank deutlich. Ergänzend prüft eine Kontrolllogik, ob eingegangene Aufträge tatsächlich verarbeitet wurden: Automatisierung ist im operativen Umfeld nur dann sinnvoll, wenn Ausnahmen und Fehlerfälle sichtbar bleiben.",
          "Allein diese Automatisierung spart rund 140 Arbeitsstunden pro Monat. Noch wichtiger ist der qualitative Effekt: Mitarbeitende werden von repetitiver Erfassung entlastet und können sich stärker auf Disposition, operative Abstimmung und Kundenkommunikation konzentrieren.",
        ],
      },
      {
        heading: "Stammdatenmanagement: Kreditoren, Debitoren und Systemharmonisierung",
        paragraphs: [
          "G&B Logistics pflegt Informationen zu Kunden, Lieferanten, Debitoren und Kreditoren in mehreren Systemen. Ohne zentrale Logik entstehen dabei schnell Dubletten, abweichende Schreibweisen oder widersprüchliche Datensätze. smiit plante und implementierte deshalb eine Struktur, mit der sich Stammdaten stärker zentralisieren und harmonisieren lassen — mit Fokus auf Kreditoren- und Debitorendaten, die für Buchhaltung, Auftragsverarbeitung und Reporting besonders relevant sind.",
          "Technisch erfolgt das über eine cloudbasierte Datenstruktur, in der Informationen aus verschiedenen Systemen zusammengeführt und für weitere Prozesse nutzbar gemacht werden — sei es zur Harmonisierung oder für nachgelagerte Prüf- und Reportingprozesse. So werden Stammdaten nicht mehr isoliert betrachtet, sondern systemübergreifend geprüft, angereichert und genutzt: bessere Datenqualität, weniger manuelle Abstimmung und eine Grundlage für weitere Automatisierung.",
        ],
      },
      {
        heading: "Cloud-Datenplattform und Power BI Reporting",
        paragraphs: [
          "Neben Automatisierung und Stammdaten entstand eine cloudbasierte Analyseplattform, die Daten aus Business Central, HubSpot, dem Dispositionssystem und weiteren Quellen zentral verfügbar macht. Auf dieser Basis entwickelte smiit Power BI Berichte, die operative und kaufmännische Daten transparenter machen.",
          "Ein konkreter Anwendungsfall ist die automatisierte Erstellung der BWA: Statt die betriebswirtschaftliche Auswertung manuell aus Buchhaltungsdaten aufzubereiten, werden die relevanten Daten angebunden und in Power BI automatisiert ausgewertet. So entsteht eine wiederholbare, nachvollziehbare und schneller verfügbare Auswertung — Finanz- und Unternehmenskennzahlen lassen sich analysieren, ohne sie jedes Mal manuell aufzubereiten.",
        ],
      },
      {
        heading: "Infrastruktur, lokaler Server und IT-Sicherheit",
        paragraphs: [
          "smiit unterstützt G&B Logistics auch bei Infrastrukturfragen — besonders beim lokalen Dispositionssystem, das auf einem Server läuft. Solche Systeme sind oft geschäftskritisch, lassen sich aber nicht immer kurzfristig in die Cloud verlagern. Deshalb wurde ein hybrider Ansatz verfolgt: Lokale Systeme bleiben dort, wo sie operativ nötig sind, werden aber besser in die Gesamtarchitektur eingebunden, während Cloud-Komponenten Datenverfügbarkeit, Auswertungen und Automatisierung verbessern.",
          "Wenn lokale Systeme, Cloud-Dienste, Automatisierungen und Schnittstellen zusammenspielen, müssen Zugriffe, Datenflüsse und Verantwortlichkeiten sauber strukturiert sein. Entsprechend spielt IT-Sicherheit eine zentrale Rolle: Die IT-Landschaft wird nicht nur funktionaler, sondern auch kontrollierbarer und zukunftsfähiger.",
        ],
      },
      {
        heading: "Trade-off: bestehende Systeme weiter nutzen statt alles neu aufbauen",
        paragraphs: [
          "Der zentrale Zielkonflikt lag zwischen technischer Modernisierung und operativer Stabilität. Eine komplett neue Systemlandschaft wäre theoretisch möglich, praktisch aber mit hohen Kosten, langen Laufzeiten und erheblichen Betriebsrisiken verbunden. smiit entschied sich daher für einen pragmatischen Weg: bestehende Systeme weiter nutzen, aber die Übergänge zwischen ihnen verbessern — Power Automate und AI Builder für wiederkehrende Schritte, die Cloud-Datenplattform zur Zentralisierung, Power BI zur Auswertung, Schnittstellen zur Verbindung. So entstand kein abstraktes IT-Zielbild, sondern eine Schritt-für-Schritt-Modernisierung mit messbarem Nutzen.",
        ],
      },
      {
        heading: "Lehre: nicht die Zeitersparnis ist der Hebel, sondern die Kontrolllogik",
        paragraphs: [
          "Die auffälligste Zahl dieses Projekts — rund 140 eingesparte Arbeitsstunden pro Monat — wäre als alleiniger Maßstab der falsche Fokus gewesen. Hätten wir nur auf Zeitersparnis optimiert, wäre eine Automatisierung, die Aufträge schnell, aber gelegentlich falsch oder gar nicht ausliest, gefährlicher als der manuelle Prozess: Sie skaliert Fehler unsichtbar. In der Disposition ist ein übersehener Auftrag keine Fußnote in der Datenqualität, sondern eine nicht ausgeführte Lieferung.",
          "Der eigentliche Werthebel war deshalb nicht die Erkennung selbst, sondern die Kontroll- und Vollständigkeitslogik dahinter: die Prüfung, ob jeder eingegangene Auftrag tatsächlich verarbeitet wurde, und das sichtbare Ausspielen von Ausnahmen und unsicheren Extraktionen zur manuellen Nachbearbeitung. Erst das macht Automatisierung im operativen Betrieb vertrauenswürdig — die Zeitersparnis ist dann das Ergebnis, nicht das Ziel.",
        ],
        bullets: [
          "Der Wert einer Automatisierung liegt in der freigesetzten Zeit UND in den Fehlern, die sie sichtbar macht.",
          "Die richtige Erfolgskennzahl ist nicht „gesparte Stunden“, sondern „erkannte Ausnahmen / garantierte Vollständigkeit“.",
          "Dokument-KI ist nie 100 % zuverlässig — die Ausnahmebehandlung (sichtbarer Fehlerkanal, menschliche Review-Schleife) baut man zuerst, nicht zuletzt.",
        ],
      },
      {
        heading: "Ergebnis: weniger manuelle Arbeit, bessere Datenbasis, skalierbare Prozesse",
        paragraphs: [
          "G&B Logistics konnte zentrale Prozesse automatisieren, Daten systemübergreifend verfügbar machen und die Grundlage für weitere Digitalisierung schaffen. Die automatische Auftragserfassung spart rund 140 Arbeitsstunden pro Monat und reduziert manuelle Übertragungen; das Stammdatenmanagement wurde strategisch neu aufgestellt und cloudbasiert umgesetzt; Daten aus Business Central, HubSpot, dem Dispositionssystem und weiteren Quellen lassen sich zentral analysieren und für Automatisierungen nutzen.",
          "Mit Power BI entstand eine bessere Grundlage für operative und kaufmännische Auswertungen, inklusive automatisierter BWA — während die bestehende, teils geschäftskritische lokale Infrastruktur weiter unterstützt wird. Der größte Nutzen liegt in der Kombination: nicht einzelne Automatisierungen, sondern eine digitale Strategie, die Prozesse, Daten, Cloud-Infrastruktur und IT-Sicherheit miteinander verbindet.",
        ],
      },
    ],

    metrics: [
      { value: "140 Std.", label: "Einsparung pro Monat durch automatisierte Auftragserfassung" },
      { value: "4+", label: "integrierte Kernsysteme: Business Central, HubSpot, Disposition, E-Mail" },
      { value: "PDF → System", label: "Aufträge automatisch ausgelesen mit Power Automate & AI Builder" },
      { value: "BWA", label: "automatisiert statt manueller Aufbereitung" },
    ],

    techStack: [
      { name: "Microsoft Power Automate", description: "Automatisierung wiederkehrender Geschäftsprozesse" },
      { name: "AI Builder", description: "Automatische Auslesung eingehender PDF-Aufträge" },
      { name: "Microsoft Business Central", description: "Quelle für ERP- & Buchhaltungsdaten" },
      { name: "HubSpot", description: "CRM-nahe Datenquelle" },
      { name: "Power BI", description: "Operative, kaufmännische & Management-Auswertungen" },
      { name: "Cloud-Datenplattform", description: "Zentrale Zusammenführung relevanter Unternehmensdaten" },
      { name: "Lokales Dispositionssystem", description: "Weiterhin geschäftskritisches Fachsystem" },
      { name: "Stammdatenharmonisierung", description: "Kreditoren- & Debitoreninformationen" },
      { name: "Hybride IT-Infrastruktur", description: "Cloud-Services & lokaler Serverbetrieb" },
      { name: "IT-Sicherheits- & Zugriffskonzepte", description: "Kontrollierte Datenflüsse & stabile Prozesse" },
    ],

    quote: {
      text:
        "smiit hat uns geholfen, gewachsene Prozesse Schritt für Schritt zu digitalisieren, ohne unseren laufenden Betrieb zu stören. Besonders wertvoll war, dass nicht nur einzelne Aufgaben automatisiert wurden, sondern ein klares Verständnis für unsere Systeme, Daten und Abläufe entstanden ist.",
      author: "G&B Logistics GmbH",
      role: "Logistikunternehmen",
    },

    metaTitle: "Digitale Strategie & Automatisierung Logistik – Case Study G&B | smiit",
    metaDescription:
      "Wie smiit G&B Logistics bei digitaler Strategie und Prozessautomatisierung unterstützte – mit Power Automate, AI Builder, Cloud-Datenplattform und Power BI.",
  },
  en: {
    slug: "gb-logistics-gmbh",
    serviceArea: "strategy",
    relatedServicePath: "services/strategy",
    datePublished: "2026-05-23",
    ogImage: {
      url: "/og/case-study-gb-logistics-gmbh.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case study G&B Logistics GmbH",
    },
    image: {
      url: "/assets/case-studies/gb_en.webp",
      width: 1672,
      height: 941,
      alt: "Digital strategy and process automation for a logistics company with Power Automate, AI Builder, Microsoft Business Central, HubSpot, a cloud data platform, Power BI reporting, master data management and a hybrid IT infrastructure.",
    },

    client: "G&B Logistics GmbH",
    industry: "Logistics",
    companySize: "Germany · SME",
    title: "Digital strategy & process automation for a logistics company",
    summary:
      "G&B Logistics GmbH runs on grown systems and many manual processes. smiit turned that into an actionable digital target architecture — connecting existing systems instead of replacing them, automating time-consuming steps and creating a central data foundation. The automated order capture alone saves around 140 working hours per month.",
    heroMetric: { value: "140 hrs/month", label: "saved by automated order capture alone" },

    facts: [
      { label: "Industry", value: "Logistics" },
      { label: "Region", value: "Germany" },
      { label: "Service", value: "Digital strategy & process automation" },
      { label: "Platform", value: "Power Platform · Business Central · Power BI" },
      { label: "Timeline", value: "ongoing partnership" },
    ],

    sections: [
      {
        heading: "Starting point: manual work between email, ERP, CRM and dispatch",
        paragraphs: [
          "As in many SMEs, G&B Logistics' IT landscape had grown over time: a local dispatch system, Microsoft Business Central, HubSpot, email-based order intake and manually maintained data all ran in parallel. Each system served its purpose — but the processes in between were often manual, time-consuming and hard to scale.",
          "Order processing was especially critical: orders arrived by email as PDFs and had to be read out manually and entered into the dispatch system. Every manual transfer costs time, introduces errors and ties staff to repetitive work — and it was hard to verify whether every incoming order had been fully processed.",
          "On the data side there was no single foundation either: Business Central held ERP and accounting data, HubSpot the CRM-related processes, the dispatch system ran locally, and more information sat in files. There was no central source for analysis, automation or master-data harmonization. The task wasn't to automate individual steps but to develop a digital strategy that connects existing systems sensibly without jeopardizing day-to-day operations.",
        ],
      },
      {
        heading: "Solution: a digital target architecture instead of isolated point automations",
        paragraphs: [
          "smiit helped G&B Logistics build a digital target architecture for processes, data and systems — deliberately without rebuilding everything. Instead, existing systems were integrated, processes analyzed and automated where it mattered. With grown SME IT landscapes, a full system replacement would be expensive, risky and operationally questionable.",
          "The focus was therefore on connecting existing systems better — Business Central, HubSpot, the local dispatch system, email processes and a new cloud data platform. The result wasn't a theoretical digital strategy but an actionable roadmap with concrete day-to-day improvements, while especially error-prone processes were automated step by step.",
        ],
      },
      {
        heading: "Automated order capture with Power Automate and AI Builder",
        paragraphs: [
          "A central building block was automatically processing incoming orders. They still arrive by email as PDFs — a format established with customers and partners that shouldn't be replaced overnight. Instead of changing the intake channel, smiit automated the process behind it: with Microsoft Power Automate and AI Builder, incoming PDF orders are automatically detected, read out and transferred into the dispatch system.",
          "The decision was deliberately pragmatic — external clients didn't have to switch to a new portal or format, while internal manual effort dropped significantly. In addition, a control logic checks whether incoming orders were actually processed: automation in an operational context only makes sense if exceptions and errors stay visible.",
          "This automation alone saves around 140 working hours per month. Even more important is the qualitative effect: staff are relieved of repetitive data entry and can focus more on dispatch, operational coordination and customer communication.",
        ],
      },
      {
        heading: "Master data management: creditors, debtors and system harmonization",
        paragraphs: [
          "G&B Logistics maintains information on customers, suppliers, debtors and creditors across several systems. Without central logic, this quickly produces duplicates, inconsistent spellings or contradictory records. smiit therefore planned and implemented a structure to centralize and harmonize master data more strongly — focusing on creditor and debtor data, which is especially relevant for accounting, order processing and reporting.",
          "Technically, this runs on a cloud-based data structure where information from different systems is consolidated and made usable for further processes — whether for harmonization or for downstream checking and reporting. Master data is no longer viewed in isolation but checked, enriched and used across systems: better data quality, less manual coordination and a foundation for further automation.",
        ],
      },
      {
        heading: "Cloud data platform and Power BI reporting",
        paragraphs: [
          "Beyond automation and master data, a cloud-based analytics platform was built that makes data from Business Central, HubSpot, the dispatch system and other sources centrally available. On this basis smiit developed Power BI reports that make operational and commercial data more transparent.",
          "A concrete use case is the automated creation of the BWA (business management report): instead of preparing it manually from accounting data, the relevant data is connected and evaluated automatically in Power BI. This creates a repeatable, traceable and faster-available report — financial and company metrics can be analyzed without preparing them manually every time.",
        ],
      },
      {
        heading: "Infrastructure, local server and IT security",
        paragraphs: [
          "smiit also supports G&B Logistics on infrastructure — especially the local dispatch system running on a server. Such systems are often business-critical but can't always be moved to the cloud quickly. A hybrid approach was therefore taken: local systems stay where they're operationally needed but are integrated better into the overall architecture, while cloud components improve data availability, analysis and automation.",
          "When local systems, cloud services, automations and interfaces interact, access, data flows and responsibilities have to be cleanly structured. IT security therefore plays a central role: the IT landscape becomes not only more functional but also more controllable and future-proof.",
        ],
      },
      {
        heading: "Trade-off: keep using existing systems instead of rebuilding everything",
        paragraphs: [
          "The central tension was between technical modernization and operational stability. A completely new system landscape would be possible in theory, but in practice would mean high costs, long timelines and significant operational risk. smiit therefore chose a pragmatic path: keep using existing systems but improve the transitions between them — Power Automate and AI Builder for recurring steps, the cloud data platform for centralization, Power BI for analysis, interfaces for connection. The result wasn't an abstract IT target picture but a step-by-step modernization with measurable benefit.",
        ],
      },
      {
        heading: "Result: less manual work, a better data foundation, scalable processes",
        paragraphs: [
          "G&B Logistics was able to automate core processes, make data available across systems and create the basis for further digitalization. Automated order capture saves around 140 working hours per month and reduces manual transfers; master data management was strategically rebuilt and implemented in the cloud; data from Business Central, HubSpot, the dispatch system and other sources can be analyzed centrally and used for automation.",
          "Power BI created a better basis for operational and commercial analysis, including an automated BWA — while the existing, partly business-critical local infrastructure continues to be supported. The greatest benefit lies in the combination: not individual automations, but a digital strategy connecting processes, data, cloud infrastructure and IT security.",
        ],
      },
    ],

    metrics: [
      { value: "140 hrs", label: "saved per month through automated order capture" },
      { value: "4+", label: "core systems integrated: Business Central, HubSpot, dispatch, email" },
      { value: "PDF → system", label: "orders read out automatically with Power Automate & AI Builder" },
      { value: "BWA", label: "automated instead of manual preparation" },
    ],

    techStack: [
      { name: "Microsoft Power Automate", description: "Automation of recurring business processes" },
      { name: "AI Builder", description: "Automatic reading of incoming PDF orders" },
      { name: "Microsoft Business Central", description: "Source for ERP & accounting data" },
      { name: "HubSpot", description: "CRM-related data source" },
      { name: "Power BI", description: "Operational, commercial & management analysis" },
      { name: "Cloud data platform", description: "Central consolidation of relevant company data" },
      { name: "Local dispatch system", description: "Still business-critical domain system" },
      { name: "Master data harmonization", description: "Creditor & debtor information" },
      { name: "Hybrid IT infrastructure", description: "Cloud services & local server operation" },
      { name: "IT security & access concepts", description: "Controlled data flows & stable processes" },
    ],

    quote: {
      text:
        "smiit helped us digitize grown processes step by step without disrupting our day-to-day operations. What mattered most was that they didn't just automate individual tasks but developed a clear understanding of our systems, data and workflows.",
      author: "G&B Logistics GmbH",
      role: "Logistics company",
    },

    metaTitle: "Digital strategy & automation in logistics – G&B Logistics | smiit",
    metaDescription:
      "How smiit supported G&B Logistics with digital strategy and process automation — Power Automate, AI Builder, a cloud data platform and Power BI reporting.",
  },
}

const caseStudies: Record<string, LocalizedCaseStudy> = {
  "claimity-ag": claimity,
  "dy-project-ag": dyProject,
  "gb-logistics-gmbh": gbLogistics,
}

export const caseStudySlugs = Object.keys(caseStudies)

export function getCaseStudy(slug: string, lang: Locale): CaseStudyContent | undefined {
  return caseStudies[slug]?.[lang]
}

export function listCaseStudies(lang: Locale): CaseStudyContent[] {
  return caseStudySlugs.map((slug) => caseStudies[slug][lang])
}

export function listOtherCaseStudies(slug: string, lang: Locale): CaseStudyContent[] {
  return caseStudySlugs.filter((s) => s !== slug).map((s) => caseStudies[s][lang])
}

export function getCaseStudyHrefByClient(client: string, lang: Locale): string | undefined {
  const slug = caseStudySlugs.find((s) => caseStudies[s].de.client === client)
  return slug ? `/${lang}/case-studies/${slug}` : undefined
}

type CaseStudiesUi = {
  eyebrow: string
  indexTitleLead: string
  indexTitleHighlight: string
  indexSubtitle: string
  readCaseStudy: string
  backToOverview: string
  factsHeading: string
  metricsHeading: string
  techHeading: string
  relatedServiceLabel: string
  ctaHeading: string
  ctaSubtitle: string
  ctaButton: string
  breadcrumbLabel: string
  moreCaseStudies: string
  publishedLabel: string
  chapterNavLabel: string
}

const caseStudiesUi: Record<Locale, CaseStudiesUi> = {
  de: {
    eyebrow: "Case Studies",
    indexTitleLead: "Kundenprojekte, die messbar",
    indexTitleHighlight: "etwas bewegen",
    indexSubtitle:
      "Echte Projekte, echte Zahlen. Ein Blick darauf, wie wir den Mittelstand mit Apps, Daten und Cloud-Architektur nach vorne bringen.",
    readCaseStudy: "Case Study lesen",
    backToOverview: "Alle Case Studies",
    factsHeading: "Eckdaten",
    metricsHeading: "Kennzahlen auf einen Blick",
    techHeading: "Technik & Architektur",
    relatedServiceLabel: "Passende Leistung",
    ctaHeading: "Wird Ihr Projekt unsere nächste Case Study?",
    ctaSubtitle: "Erzählen Sie uns von Ihrer Herausforderung — wir zeigen Ihnen, was technisch möglich ist.",
    ctaButton: "Kontaktieren Sie uns",
    breadcrumbLabel: "Case Studies",
    moreCaseStudies: "Weitere Case Studies",
    publishedLabel: "Veröffentlicht am",
    chapterNavLabel: "Kapitel",
  },
  en: {
    eyebrow: "Case studies",
    indexTitleLead: "Client projects that deliver",
    indexTitleHighlight: "measurable impact",
    indexSubtitle:
      "Real projects, real numbers. A look at how we move SMEs forward with apps, data and cloud architecture.",
    readCaseStudy: "Read case study",
    backToOverview: "All case studies",
    factsHeading: "Key facts",
    metricsHeading: "Key figures at a glance",
    techHeading: "Technology & architecture",
    relatedServiceLabel: "Related service",
    ctaHeading: "Will your project be our next case study?",
    ctaSubtitle: "Tell us about your challenge — we'll show you what's technically possible.",
    ctaButton: "Get in touch",
    breadcrumbLabel: "Case studies",
    moreCaseStudies: "More case studies",
    publishedLabel: "Published",
    chapterNavLabel: "Chapters",
  },
}

export function getCaseStudiesUi(lang: Locale): CaseStudiesUi {
  return caseStudiesUi[lang]
}
