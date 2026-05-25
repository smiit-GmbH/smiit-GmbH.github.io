import type { Locale } from "@/lib/dictionary"

/**
 * Glossary content layer — mirrors the structure of `lib/case-studies.ts`.
 *
 * Two layers:
 *  1. `glossaryCatalog`  — the full roadmap of planned terms (name + short
 *     definition per language, cluster, role). Drives the overview page and the
 *     `DefinedTermSet` JSON-LD. Entries with `hasPage: true` link to a detail
 *     page; the rest render as plain catalog entries until they are written.
 *  2. `glossaryTerms`    — fully written, bilingual detail entries keyed by
 *     slug. Routes + sitemap pick these up automatically via `glossaryTermSlugs`.
 *
 * Add a term by appending to `glossaryCatalog`; promote it to a full page by
 * adding a `glossaryTerms` entry and flipping `hasPage` to true.
 */

export type GlossaryCluster = "analytics" | "apps" | "strategy"

export type GlossaryRole = "pillar" | "sub"

/** One narrative block on a detail page. Bullets are optional. */
export type GlossarySection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type GlossaryFaqItem = { question: string; answer: string }

/** External, authoritative reference shown under "Quellen & weiterführende Links". */
export type GlossarySource = { title: string; url: string }

export type GlossaryTermContent = {
  /** Stable, language-agnostic URL slug. */
  slug: string
  cluster: GlossaryCluster
  /** ISO date used for Article JSON-LD + sitemap lastmod. */
  dateModified: string
  /** Term name, e.g. "Power BI". */
  term: string
  /** H1, e.g. "Was ist Power BI?". */
  title: string
  /** Definition-first: 2–3 sentences answering the term directly. */
  shortDefinition: string
  /** German/English synonyms and related spellings for entity matching. */
  synonyms: string[]
  sections: GlossarySection[]
  /** Common mistakes / misconceptions (template point 5). Merged from glossaryExtras. */
  misconceptions?: string[]
  faq: GlossaryFaqItem[]
  /** External references / further reading (template point 9). Merged from glossaryExtras. */
  sources?: GlossarySource[]
  /** Path of the related service page, e.g. "services/analytics". */
  relatedServicePath: string
  /** Slug of a related case study (see lib/case-studies.ts), if any. */
  relatedCaseStudySlug?: string
  metaTitle: string
  metaDescription: string
}

/** Per-language extras kept separate from the large term objects, merged on read. */
export type GlossaryExtra = { misconceptions: string[]; sources: GlossarySource[] }

type LocalizedGlossaryTerm = Record<Locale, GlossaryTermContent>

export type GlossaryCatalogEntry = {
  slug: string
  cluster: GlossaryCluster
  role: GlossaryRole
  term: { de: string; en: string }
  shortDefinition: { de: string; en: string }
  /** True once a full detail page exists in `glossaryTerms`. */
  hasPage: boolean
}

// ---------------------------------------------------------------------------
// Cluster metadata
// ---------------------------------------------------------------------------

export const glossaryClusterMeta: Record<
  GlossaryCluster,
  { label: { de: string; en: string }; color: string; servicePath: string }
> = {
  analytics: {
    label: { de: "Analytics, Daten & KI", en: "Analytics, data & AI" },
    color: "#21569c",
    servicePath: "services/analytics",
  },
  apps: {
    label: { de: "Plattformen, Apps & Cloud", en: "Platforms, apps & cloud" },
    color: "#F703EB",
    servicePath: "services/apps",
  },
  strategy: {
    label: { de: "Strategie, Automatisierung & Security", en: "Strategy, automation & security" },
    color: "#64748B",
    servicePath: "services/strategy",
  },
}

export const glossaryClusterOrder: GlossaryCluster[] = ["analytics", "apps", "strategy"]

// ---------------------------------------------------------------------------
// Catalog — the full roadmap (overview + DefinedTermSet schema)
// ---------------------------------------------------------------------------

export const glossaryCatalog: GlossaryCatalogEntry[] = [
  // ── Cluster 1: Analytics, Daten & KI ──
  {
    slug: "data-strategy",
    cluster: "analytics",
    role: "pillar",
    term: { de: "Datenstrategie", en: "Data strategy" },
    shortDefinition: {
      de: "Eine Datenstrategie legt fest, wie ein Unternehmen Daten gezielt nutzt, um Entscheidungen zu verbessern – von Zielen und Verantwortlichkeiten über Datenqualität bis zur technischen Plattform.",
      en: "A data strategy defines how a company uses data to improve decisions — from goals and responsibilities to data quality and the technical platform.",
    },
    hasPage: true,
  },
  {
    slug: "data-warehouse",
    cluster: "analytics",
    role: "pillar",
    term: { de: "Data Warehouse & Lakehouse", en: "Data warehouse & lakehouse" },
    shortDefinition: {
      de: "Ein Data Warehouse ist eine zentrale, für Analysen optimierte Datenbank; ein Lakehouse verbindet die Flexibilität eines Data Lake mit der Struktur eines Warehouse.",
      en: "A data warehouse is a central database optimized for analytics; a lakehouse combines the flexibility of a data lake with the structure of a warehouse.",
    },
    hasPage: true,
  },
  {
    slug: "data-modeling",
    cluster: "analytics",
    role: "sub",
    term: { de: "Datenmodellierung (Inmon, Kimball, Data Vault)", en: "Data modeling (Inmon, Kimball, Data Vault)" },
    shortDefinition: {
      de: "Methoden, um ein Data Warehouse zu strukturieren: Inmon (normalisiert, Top-down), Kimball (dimensional, Bottom-up) und Data Vault (flexibel, historisierend).",
      en: "Methods for structuring a data warehouse: Inmon (normalized, top-down), Kimball (dimensional, bottom-up) and Data Vault (flexible, history-tracking).",
    },
    hasPage: true,
  },
  {
    slug: "medallion-architecture",
    cluster: "analytics",
    role: "sub",
    term: { de: "Medallion-Architektur (Bronze/Silver/Gold)", en: "Medallion architecture (bronze/silver/gold)" },
    shortDefinition: {
      de: "Ein mehrstufiges Schichtenmodell, das Rohdaten (Bronze) über bereinigte Daten (Silver) zu analysefertigen Datenmodellen (Gold) veredelt.",
      en: "A layered model that refines raw data (bronze) through cleaned data (silver) into analysis-ready models (gold).",
    },
    hasPage: true,
  },
  {
    slug: "data-governance",
    cluster: "analytics",
    role: "pillar",
    term: { de: "Data Governance", en: "Data governance" },
    shortDefinition: {
      de: "Data Governance umfasst Regeln, Rollen und Prozesse, die sicherstellen, dass Daten konsistent, verständlich, sicher und vertrauenswürdig genutzt werden.",
      en: "Data governance covers the rules, roles and processes that keep data consistent, understandable, secure and trustworthy.",
    },
    hasPage: true,
  },
  {
    slug: "mlops",
    cluster: "analytics",
    role: "pillar",
    term: { de: "MLOps", en: "MLOps" },
    shortDefinition: {
      de: "MLOps überträgt DevOps-Prinzipien auf Machine Learning: reproduzierbares Training, automatisiertes Deployment und Monitoring von Modellen im produktiven Betrieb.",
      en: "MLOps applies DevOps principles to machine learning: reproducible training, automated deployment and monitoring of models in production.",
    },
    hasPage: true,
  },
  {
    slug: "machine-learning-azure",
    cluster: "analytics",
    role: "pillar",
    term: { de: "Machine Learning in Azure", en: "Machine learning in Azure" },
    shortDefinition: {
      de: "Machine Learning in Azure bündelt Dienste wie Azure Machine Learning und Azure Databricks, um ML-Modelle zu trainieren, bereitzustellen und zu betreiben.",
      en: "Machine learning in Azure bundles services such as Azure Machine Learning and Azure Databricks to train, deploy and operate ML models.",
    },
    hasPage: true,
  },
  {
    slug: "power-bi",
    cluster: "analytics",
    role: "pillar",
    term: { de: "Power BI", en: "Power BI" },
    shortDefinition: {
      de: "Power BI ist die Business-Intelligence-Plattform von Microsoft, mit der Unternehmen Daten aus verschiedenen Quellen verbinden, modellieren, analysieren und in interaktiven Dashboards visualisieren.",
      en: "Power BI is Microsoft's business intelligence platform for connecting, modeling, analyzing and visualizing data from many sources in interactive dashboards.",
    },
    hasPage: true,
  },
  {
    slug: "power-query",
    cluster: "analytics",
    role: "sub",
    term: { de: "Power Query", en: "Power Query" },
    shortDefinition: {
      de: "Power Query ist die Datenvorbereitungs- und Transformationskomponente in Power BI und Excel – häufig für ETL-Prozesse genutzt.",
      en: "Power Query is the data preparation and transformation component in Power BI and Excel — often used for ETL processes.",
    },
    hasPage: true,
  },
  {
    slug: "dax",
    cluster: "analytics",
    role: "sub",
    term: { de: "DAX (Data Analysis Expressions)", en: "DAX (Data Analysis Expressions)" },
    shortDefinition: {
      de: "DAX ist die Formelsprache von Power BI, mit der Kennzahlen (Measures) und berechnete Spalten für Analysen definiert werden.",
      en: "DAX is the formula language of Power BI used to define measures and calculated columns for analysis.",
    },
    hasPage: true,
  },
  {
    slug: "semantic-model",
    cluster: "analytics",
    role: "sub",
    term: { de: "Semantic Model (Power BI Dataset)", en: "Semantic model (Power BI dataset)" },
    shortDefinition: {
      de: "Das Semantic Model, früher Power BI Dataset, ist die semantische Datenschicht in Power BI: Tabellen, Beziehungen, Kennzahlen und Berechtigungen.",
      en: "The semantic model, formerly the Power BI dataset, is the semantic data layer in Power BI: tables, relationships, measures and permissions.",
    },
    hasPage: true,
  },
  {
    slug: "row-level-security",
    cluster: "analytics",
    role: "sub",
    term: { de: "Row-Level Security (RLS)", en: "Row-level security (RLS)" },
    shortDefinition: {
      de: "Row-Level Security beschränkt in Power BI den Datenzugriff auf Zeilenebene, sodass Nutzer nur die für ihre Rolle freigegebenen Daten sehen.",
      en: "Row-level security restricts data access at the row level in Power BI, so users only see the data cleared for their role.",
    },
    hasPage: true,
  },
  {
    slug: "etl-elt",
    cluster: "analytics",
    role: "sub",
    term: { de: "ETL / ELT", en: "ETL / ELT" },
    shortDefinition: {
      de: "ETL und ELT beschreiben Prozesse zum Extrahieren, Transformieren und Laden von Daten – der Unterschied liegt in der Reihenfolge von Transformation und Laden.",
      en: "ETL and ELT describe processes for extracting, transforming and loading data — the difference lies in the order of transformation and loading.",
    },
    hasPage: true,
  },
  {
    slug: "microsoft-fabric",
    cluster: "analytics",
    role: "sub",
    term: { de: "Microsoft Fabric", en: "Microsoft Fabric" },
    shortDefinition: {
      de: "Microsoft Fabric ist eine integrierte Daten- und Analyseplattform, die Data Engineering, Data Warehousing, Data Science und Power BI in einem SaaS-Dienst vereint.",
      en: "Microsoft Fabric is an integrated data and analytics platform that unifies data engineering, warehousing, data science and Power BI in one SaaS service.",
    },
    hasPage: true,
  },
  {
    slug: "azure-databricks",
    cluster: "analytics",
    role: "sub",
    term: { de: "Azure Databricks", en: "Azure Databricks" },
    shortDefinition: {
      de: "Azure Databricks ist eine cloudbasierte Lakehouse-Plattform für Datenverarbeitung, Transformation und Machine Learning im großen Maßstab.",
      en: "Azure Databricks is a cloud-based lakehouse platform for large-scale data processing, transformation and machine learning.",
    },
    hasPage: true,
  },

  // ── Cluster 2: Plattformen, Apps & Cloud ──
  {
    slug: "digital-platforms",
    cluster: "apps",
    role: "pillar",
    term: { de: "Digitale Plattformen", en: "Digital platforms" },
    shortDefinition: {
      de: "Eine digitale Plattform ist ein zentrales, erweiterbares System, das Nutzer, Daten und Prozesse verbindet – Grundlage für SaaS-Produkte und vernetzte Workflows.",
      en: "A digital platform is a central, extensible system that connects users, data and processes — the foundation for SaaS products and connected workflows.",
    },
    hasPage: true,
  },
  {
    slug: "saas",
    cluster: "apps",
    role: "pillar",
    term: { de: "SaaS (Software as a Service)", en: "SaaS (Software as a Service)" },
    shortDefinition: {
      de: "SaaS ist ein Bereitstellungsmodell, bei dem Software zentral in der Cloud betrieben und über das Internet als Abonnement genutzt wird – ohne lokale Installation.",
      en: "SaaS is a delivery model where software runs centrally in the cloud and is used over the internet on a subscription basis — without local installation.",
    },
    hasPage: true,
  },
  {
    slug: "multi-tenant-architecture",
    cluster: "apps",
    role: "sub",
    term: { de: "Multi-Tenant-Architektur", en: "Multi-tenant architecture" },
    shortDefinition: {
      de: "Bei einer Multi-Tenant-Architektur nutzen mehrere Kunden (Tenants) dieselbe Anwendung und Infrastruktur, während ihre Daten logisch sauber getrennt bleiben.",
      en: "In a multi-tenant architecture, several customers (tenants) share the same application and infrastructure while their data stays logically separated.",
    },
    hasPage: true,
  },
  {
    slug: "cloud-computing",
    cluster: "apps",
    role: "pillar",
    term: { de: "Cloud Computing", en: "Cloud computing" },
    shortDefinition: {
      de: "Cloud Computing ist die Bereitstellung von IT-Ressourcen wie Rechenleistung, Speicher und Software über das Internet – flexibel, skalierbar und nutzungsbasiert abgerechnet, statt eigener Hardware im Haus.",
      en: "Cloud computing is the delivery of IT resources such as compute, storage and software over the internet — flexible, scalable and billed by usage, instead of running your own hardware on-site.",
    },
    hasPage: true,
  },
  {
    slug: "cloud-infrastructure",
    cluster: "apps",
    role: "pillar",
    term: { de: "Cloud-Infrastruktur", en: "Cloud infrastructure" },
    shortDefinition: {
      de: "Cloud-Infrastruktur umfasst Rechenleistung, Speicher und Netzwerk als skalierbare Dienste – bei smiit überwiegend auf Microsoft Azure.",
      en: "Cloud infrastructure covers compute, storage and networking as scalable services — at smiit predominantly on Microsoft Azure.",
    },
    hasPage: true,
  },
  {
    slug: "cloud-governance",
    cluster: "apps",
    role: "pillar",
    term: { de: "Cloud Governance", en: "Cloud governance" },
    shortDefinition: {
      de: "Cloud Governance umfasst Richtlinien für Kosten, Sicherheit, Berechtigungen und Struktur einer Cloud-Umgebung, damit sie transparent und kontrollierbar bleibt.",
      en: "Cloud governance covers policies for cost, security, permissions and structure of a cloud environment, keeping it transparent and controllable.",
    },
    hasPage: true,
  },
  {
    slug: "sdlc",
    cluster: "apps",
    role: "pillar",
    term: { de: "SDLC (Software Development Life Cycle)", en: "SDLC (software development life cycle)" },
    shortDefinition: {
      de: "Der SDLC beschreibt die Phasen der Softwareentwicklung – von Analyse und Konzeption über Umsetzung und Test bis zu Betrieb und Wartung.",
      en: "The SDLC describes the phases of software development — from analysis and design through build and test to operation and maintenance.",
    },
    hasPage: true,
  },
  {
    slug: "rest-api",
    cluster: "apps",
    role: "sub",
    term: { de: "REST-API / API-Integration", en: "REST API / API integration" },
    shortDefinition: {
      de: "Eine REST-API ist eine standardisierte Schnittstelle, über die Anwendungen Daten und Funktionen austauschen – Grundlage für die Integration verschiedener Systeme.",
      en: "A REST API is a standardized interface through which applications exchange data and functions — the basis for integrating different systems.",
    },
    hasPage: true,
  },
  {
    slug: "mvp",
    cluster: "apps",
    role: "sub",
    term: { de: "MVP (Minimum Viable Product)", en: "MVP (minimum viable product)" },
    shortDefinition: {
      de: "Ein MVP ist die erste funktionsfähige Version eines Produkts mit dem Kern an Funktionen, der nötig ist, um echten Nutzen zu liefern und Feedback zu gewinnen.",
      en: "An MVP is the first working version of a product with the core set of features needed to deliver real value and gather feedback.",
    },
    hasPage: true,
  },

  // ── Cluster 3: Strategie, Automatisierung & Security ──
  {
    slug: "process-automation",
    cluster: "strategy",
    role: "pillar",
    term: { de: "Prozessoptimierung & -automatisierung", en: "Process optimization & automation" },
    shortDefinition: {
      de: "Prozessoptimierung macht Abläufe schlanker und klarer; Prozessautomatisierung übernimmt wiederkehrende Schritte technisch – für weniger manuelle Arbeit und Fehler.",
      en: "Process optimization makes workflows leaner and clearer; process automation handles repetitive steps technically — for less manual work and fewer errors.",
    },
    hasPage: true,
  },
  {
    slug: "power-automate",
    cluster: "strategy",
    role: "sub",
    term: { de: "Power Automate", en: "Power Automate" },
    shortDefinition: {
      de: "Power Automate ist der Automatisierungsdienst der Microsoft Power Platform, mit dem sich Workflows zwischen Apps, Diensten und Dateien automatisieren lassen.",
      en: "Power Automate is the automation service of the Microsoft Power Platform for automating workflows across apps, services and files.",
    },
    hasPage: true,
  },
  {
    slug: "ai-builder",
    cluster: "strategy",
    role: "sub",
    term: { de: "AI Builder (Dokumentenextraktion / OCR)", en: "AI Builder (document extraction / OCR)" },
    shortDefinition: {
      de: "AI Builder ist die KI-Komponente der Power Platform und liest mit OCR und Modellen strukturierte Informationen aus Dokumenten wie PDFs automatisch aus.",
      en: "AI Builder is the AI component of the Power Platform and uses OCR and models to extract structured information from documents such as PDFs automatically.",
    },
    hasPage: true,
  },
  {
    slug: "master-data-management",
    cluster: "strategy",
    role: "sub",
    term: { de: "Stammdatenmanagement (MDM)", en: "Master data management (MDM)" },
    shortDefinition: {
      de: "Stammdatenmanagement sorgt dafür, dass zentrale Daten wie Kunden, Lieferanten und Artikel systemübergreifend einheitlich, korrekt und dublettenfrei sind.",
      en: "Master data management keeps core data such as customers, suppliers and products consistent, correct and free of duplicates across systems.",
    },
    hasPage: true,
  },
  {
    slug: "devops",
    cluster: "strategy",
    role: "pillar",
    term: { de: "DevOps", en: "DevOps" },
    shortDefinition: {
      de: "DevOps verbindet Entwicklung und Betrieb durch Automatisierung, kurze Feedbackzyklen und gemeinsame Verantwortung – für schnellere, stabilere Releases.",
      en: "DevOps connects development and operations through automation, short feedback loops and shared responsibility — for faster, more stable releases.",
    },
    hasPage: true,
  },
  {
    slug: "ci-cd",
    cluster: "strategy",
    role: "sub",
    term: { de: "CI/CD", en: "CI/CD" },
    shortDefinition: {
      de: "CI/CD steht für Continuous Integration und Continuous Delivery/Deployment: automatisiertes Bauen, Testen und Ausliefern von Software.",
      en: "CI/CD stands for continuous integration and continuous delivery/deployment: automated building, testing and shipping of software.",
    },
    hasPage: true,
  },
  {
    slug: "iac",
    cluster: "strategy",
    role: "sub",
    term: { de: "IaC (Infrastructure as Code)", en: "IaC (infrastructure as code)" },
    shortDefinition: {
      de: "Infrastructure as Code beschreibt Cloud-Infrastruktur in versionierbarem Code (z. B. Bicep oder Terraform) statt manueller Klicks – reproduzierbar und nachvollziehbar.",
      en: "Infrastructure as code describes cloud infrastructure in versionable code (e.g. Bicep or Terraform) instead of manual clicks — reproducible and traceable.",
    },
    hasPage: true,
  },
  {
    slug: "it-security",
    cluster: "strategy",
    role: "pillar",
    term: { de: "IT-Sicherheit", en: "IT security" },
    shortDefinition: {
      de: "IT-Sicherheit schützt Systeme, Daten und Identitäten vor unbefugtem Zugriff, Manipulation und Ausfall – als durchgängige Disziplin, nicht als einzelnes Produkt.",
      en: "IT security protects systems, data and identities against unauthorised access, manipulation and outage — as a continuous discipline, not a single product.",
    },
    hasPage: true,
  },
  {
    slug: "iam-keycloak",
    cluster: "strategy",
    role: "sub",
    term: { de: "IAM / Keycloak", en: "IAM / Keycloak" },
    shortDefinition: {
      de: "Identity & Access Management (IAM) steuert Identitäten, Rollen und Zugriffe; Keycloak ist eine etablierte Open-Source-Lösung für Authentifizierung und Berechtigungen.",
      en: "Identity & access management (IAM) governs identities, roles and access; Keycloak is an established open-source solution for authentication and authorization.",
    },
    hasPage: true,
  },
  {
    slug: "mfa-2fa",
    cluster: "strategy",
    role: "sub",
    term: { de: "Multifaktor-Authentifizierung (MFA / 2FA)", en: "Multi-factor authentication (MFA / 2FA)" },
    shortDefinition: {
      de: "MFA verlangt für die Anmeldung mehrere unabhängige Nachweise (z. B. Passwort plus Einmalcode) und erschwert so unbefugten Zugriff erheblich.",
      en: "MFA requires several independent proofs for login (e.g. password plus one-time code), making unauthorised access considerably harder.",
    },
    hasPage: true,
  },
  {
    slug: "networking-security",
    cluster: "strategy",
    role: "sub",
    term: { de: "Networking & Security (VNet, Zero Trust)", en: "Networking & security (VNet, zero trust)" },
    shortDefinition: {
      de: "Netzwerksicherheit segmentiert und kontrolliert den Datenverkehr (z. B. über virtuelle Netzwerke und Zero-Trust-Prinzipien), um Angriffsflächen zu minimieren.",
      en: "Network security segments and controls traffic (e.g. via virtual networks and zero-trust principles) to minimize the attack surface.",
    },
    hasPage: true,
  },
  {
    slug: "gdpr",
    cluster: "strategy",
    role: "pillar",
    term: { de: "DSGVO / Datenschutz in der Cloud", en: "GDPR / data protection in the cloud" },
    shortDefinition: {
      de: "Die DSGVO regelt den Schutz personenbezogener Daten in der EU; in der Cloud betrifft das u. a. Standortwahl, Auftragsverarbeitung und dokumentierte Datenflüsse.",
      en: "The GDPR governs the protection of personal data in the EU; in the cloud this concerns location choice, data processing agreements and documented data flows.",
    },
    hasPage: true,
  },
]

// ---------------------------------------------------------------------------
// Full detail entries (flagship pillars — one per cluster)
// ---------------------------------------------------------------------------

const powerBi: LocalizedGlossaryTerm = {
  de: {
    slug: "power-bi",
    cluster: "analytics",
    dateModified: "2026-05-24",
    term: "Power BI",
    title: "Was ist Power BI?",
    shortDefinition:
      "Power BI ist eine Business-Intelligence-Plattform von Microsoft, mit der Unternehmen Daten aus verschiedenen Quellen verbinden, modellieren, analysieren und in interaktiven Dashboards visualisieren können. Es macht aus verstreuten Rohdaten eine gemeinsame Entscheidungsgrundlage für Management, Controlling und operative Teams.",
    synonyms: ["Microsoft Power BI", "Power BI Desktop", "Power BI Service", "BI-Tool"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Power BI genutzt?",
        paragraphs: [
          "Power BI verbindet sich mit Datenquellen wie Excel, SQL-Datenbanken, Cloud-Systemen oder APIs, bereitet die Daten auf und stellt sie als interaktive Berichte und Dashboards bereit. Anwender können filtern, in Details hineinzoomen und Kennzahlen über verschiedene Zeiträume und Segmente vergleichen – ohne dass für jede Frage ein neuer Bericht gebaut werden muss.",
          "Die Plattform besteht im Kern aus Power BI Desktop (Modellierung und Berichtsdesign), dem Power BI Service (Veröffentlichung, Berechtigungen und Betrieb in der Cloud) sowie den mobilen Apps. Im Hintergrund kommen Power Query für die Datenaufbereitung und DAX für Kennzahlen zum Einsatz.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein typisches Szenario: Vertriebszahlen liegen im CRM, Finanzdaten im ERP, operative Daten in Excel-Listen. Statt diese manuell zusammenzukopieren, verbindet Power BI die Quellen, harmonisiert die Begriffe und zeigt Umsatz, Marge und Forecast in einem einzigen Management-Dashboard – aktuell und für alle Beteiligten konsistent.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Power BI eignet sich überall dort, wo Entscheidungen heute auf verstreuten Tabellen und manueller Zusammenführung beruhen.",
        ],
        bullets: [
          "Management-Reporting und KPI-Dashboards mit einer einzigen Datenwahrheit",
          "Controlling: Budget, Marge und Abweichungsanalysen",
          "Operative Steuerung in Vertrieb, Projekten und Produktion",
          "Self-Service-Analysen, ohne für jede Frage die IT zu beanspruchen",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Power BI ist die analytische Oberfläche – nicht die Datenplattform darunter. Für große Datenmengen empfiehlt sich ein vorgelagertes Data Warehouse oder Lakehouse (z. B. mit Azure Databricks oder Microsoft Fabric), das Integration und Aufbereitung übernimmt. Power Query ist die Transformationskomponente, DAX die Formelsprache für Kennzahlen, und das Semantic Model die darunterliegende Datenschicht.",
        ],
      },
      {
        heading: "Grundbegriffe: Workspace, Dataset, Gateway & Refresh",
        paragraphs: [
          "Im Power BI Service tauchen einige wiederkehrende Grundbegriffe auf:",
        ],
        bullets: [
          "Workspace (Arbeitsbereich): ein abgegrenzter Bereich, in dem ein Team Berichte, Dashboards und Datenmodelle gemeinsam entwickelt, verwaltet und veröffentlicht – Grundlage für Rollen und Berechtigungen.",
          "Dataset / Semantic Model: die wiederverwendbare Datenschicht (Tabellen, Beziehungen, Measures), auf der Berichte aufsetzen. „Dataset“ ist die frühere Bezeichnung für das heutige Semantic Model.",
          "Gateway: eine Brücke, über die Power BI in der Cloud sicher auf Datenquellen im lokalen Netzwerk (On-Premise) zugreift – nötig, wenn Daten nicht in der Cloud liegen.",
          "Refresh (Aktualisierung): der Vorgang, der die Daten im Semantic Model auf den aktuellen Stand bringt – manuell oder zeitgesteuert (geplante Aktualisierung).",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit baut Power-BI-Lösungen für den Mittelstand – von der Datenintegration über performante Datenmodelle bis zu Dashboards, die im Alltag wirklich genutzt werden. Dabei arbeiten wir konsequent im Microsoft-Umfeld und achten auf eine Struktur, die mit dem Unternehmen mitwächst, statt zu einer unkontrollierten Sammlung von Einzeldateien zu werden.",
        ],
      },
    ],
    faq: [
      {
        question: "Was kostet Power BI?",
        answer:
          "Power BI Desktop ist kostenlos. Für das Teilen und den Betrieb von Berichten in der Cloud werden Lizenzen benötigt (Power BI Pro pro Nutzer oder kapazitätsbasierte Modelle wie Premium/Fabric). Der passende Lizenzmix hängt von Nutzerzahl und Anforderungen ab.",
      },
      {
        question: "Worin unterscheidet sich Power BI von Excel?",
        answer:
          "Excel ist stark für punktuelle Analysen und manuelle Berechnungen. Power BI ist auf wiederkehrendes Reporting, große Datenmengen, automatisierte Aktualisierung und mehrere Nutzer ausgelegt – mit klaren Datenmodellen statt verstreuter Tabellen.",
      },
      {
        question: "Brauchen wir ein Data Warehouse, um Power BI zu nutzen?",
        answer:
          "Nicht zwingend. Für überschaubare Datenmengen reicht oft die direkte Anbindung. Bei vielen Quellen, großen Datenmengen oder vielen Nutzern lohnt sich eine vorgelagerte Datenplattform für stabilere und performantere Berichte.",
      },
      {
        question: "Wie aktuell sind die Daten in einem Power-BI-Bericht?",
        answer:
          "Das hängt vom Aktualisierungsmodus ab. Beim Import werden die Daten zu festen Zeitpunkten oder manuell aktualisiert (geplante Aktualisierung), beim DirectQuery werden sie bei jeder Abfrage live aus der Quelle gelesen. Import ist meist schneller in der Darstellung, DirectQuery liefert dafür stets den aktuellen Stand.",
      },
      {
        question: "Können auch lokale Datenquellen (On-Premise) angebunden werden?",
        answer:
          "Ja. Über ein Gateway kann Power BI in der Cloud sicher auf Datenquellen im eigenen Netzwerk zugreifen, etwa auf eine lokale SQL-Datenbank oder Dateien auf einem Fileserver. Das Gateway dient dabei als verschlüsselte Brücke, ohne die Daten dauerhaft in die Cloud zu kopieren.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist Power BI? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription:
      "Power BI einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Excel und Data Warehouse – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "power-bi",
    cluster: "analytics",
    dateModified: "2026-05-24",
    term: "Power BI",
    title: "What is Power BI?",
    shortDefinition:
      "Power BI is Microsoft's business intelligence platform that lets companies connect, model, analyze and visualize data from many sources in interactive dashboards. It turns scattered raw data into a shared basis for decisions across management, controlling and operational teams.",
    synonyms: ["Microsoft Power BI", "Power BI Desktop", "Power BI Service", "BI tool"],
    sections: [
      {
        heading: "Where Power BI is used",
        paragraphs: [
          "Power BI connects to data sources such as Excel, SQL databases, cloud systems or APIs, prepares the data and presents it as interactive reports and dashboards. Users can filter, drill into detail and compare metrics across time periods and segments — without a new report having to be built for every question.",
          "At its core the platform consists of Power BI Desktop (modeling and report design), the Power BI Service (publishing, permissions and operation in the cloud) and the mobile apps. Power Query handles data preparation and DAX powers the metrics behind the scenes.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A typical scenario: sales figures sit in the CRM, finance data in the ERP, operational data in Excel lists. Instead of copying these together by hand, Power BI connects the sources, harmonizes the terms and shows revenue, margin and forecast in a single management dashboard — current and consistent for everyone involved.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Power BI is a fit wherever decisions today rely on scattered spreadsheets and manual consolidation.",
        ],
        bullets: [
          "Management reporting and KPI dashboards with a single source of truth",
          "Controlling: budget, margin and variance analysis",
          "Operational steering in sales, projects and production",
          "Self-service analysis without involving IT for every question",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Power BI is the analytical surface — not the data platform beneath it. For large data volumes, an upstream data warehouse or lakehouse (e.g. with Azure Databricks or Microsoft Fabric) is recommended to handle integration and preparation. Power Query is the transformation component, DAX the formula language for metrics, and the semantic model the underlying data layer.",
        ],
      },
      {
        heading: "Key terms: workspace, dataset, gateway & refresh",
        paragraphs: [
          "A few recurring building blocks appear in the Power BI Service:",
        ],
        bullets: [
          "Workspace: a dedicated area where a team builds, manages and publishes reports, dashboards and data models together — the basis for roles and permissions.",
          "Dataset / semantic model: the reusable data layer (tables, relationships, measures) reports are built on. Dataset is the former name for today's semantic model.",
          "Gateway: a bridge that lets Power BI in the cloud securely access data sources in the local network (on-premise) — needed when data does not live in the cloud.",
          "Refresh: the process that brings the data in the semantic model up to date — manually or on a schedule (scheduled refresh).",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit builds Power BI solutions for SMEs — from data integration through performant data models to dashboards that actually get used day to day. We work consistently in the Microsoft ecosystem and focus on a structure that grows with the company instead of becoming an uncontrolled collection of individual files.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does Power BI cost?",
        answer:
          "Power BI Desktop is free. Sharing and operating reports in the cloud requires licences (Power BI Pro per user or capacity-based models such as Premium/Fabric). The right mix depends on the number of users and requirements.",
      },
      {
        question: "How is Power BI different from Excel?",
        answer:
          "Excel is strong for ad-hoc analysis and manual calculations. Power BI is built for recurring reporting, large data volumes, automated refresh and multiple users — with clear data models instead of scattered spreadsheets.",
      },
      {
        question: "Do we need a data warehouse to use Power BI?",
        answer:
          "Not necessarily. For modest data volumes a direct connection is often enough. With many sources, large volumes or many users, an upstream data platform pays off for more stable and performant reports.",
      },
      {
        question: "How current is the data in a Power BI report?",
        answer:
          "It depends on the storage mode. In import mode the data is refreshed at fixed times or manually (scheduled refresh); in DirectQuery it is read live from the source on every query. Import is usually faster to display, while DirectQuery always reflects the latest state.",
      },
      {
        question: "Can on-premise data sources be connected too?",
        answer:
          "Yes. Through a gateway, Power BI in the cloud can securely access data sources in your own network, such as a local SQL database or files on a file server. The gateway acts as an encrypted bridge without permanently copying the data into the cloud.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "What is Power BI? Definition, benefits & practice | smiit glossary",
    metaDescription:
      "Power BI explained simply: definition, how it works, use cases and how it differs from Excel and a data warehouse — with practical context from smiit.",
  },
}

const saas: LocalizedGlossaryTerm = {
  de: {
    slug: "saas",
    cluster: "apps",
    dateModified: "2026-05-24",
    term: "SaaS (Software as a Service)",
    title: "Was ist SaaS (Software as a Service)?",
    shortDefinition:
      "SaaS (Software as a Service) ist ein Bereitstellungsmodell, bei dem Software zentral in der Cloud betrieben und über das Internet als Abonnement genutzt wird. Anwender greifen über den Browser zu, während Betrieb, Wartung, Updates und Skalierung beim Anbieter liegen – ganz ohne lokale Installation.",
    synonyms: ["Software as a Service", "Cloud-Software", "SaaS-Plattform", "SaaS-Anwendung"],
    sections: [
      {
        heading: "Einordnung: Wofür wird SaaS genutzt?",
        paragraphs: [
          "Statt Software einmalig zu kaufen und auf eigenen Servern zu installieren, abonnieren Unternehmen bei SaaS den Zugriff auf eine zentral betriebene Anwendung. Der Anbieter kümmert sich um Infrastruktur, Sicherheit, Verfügbarkeit und neue Funktionen; Kunden nutzen stets die aktuelle Version.",
          "SaaS ist eines von drei klassischen Cloud-Modellen neben IaaS (Infrastructure as a Service) und PaaS (Platform as a Service). Bei SaaS ist der Abstraktionsgrad am höchsten: Kunden müssen sich weder um Server noch um die Anwendungsplattform kümmern.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine SaaS-Plattform für die Versicherungsbranche bündelt zum Beispiel Schadenprozesse, Dokumente und Kommunikation zentral. Verschiedene Parteien – Versicherer, Experten, Administratoren – arbeiten über den Browser in derselben Anwendung, mit rollenbasierten Zugriffen und sauber getrennten Daten. Neue Kunden lassen sich anbinden, ohne pro Kunde eine eigene Installation aufzubauen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "SaaS eignet sich besonders für Produkte, die schnell live gehen, mit vielen Nutzern skalieren und kontinuierlich weiterentwickelt werden sollen.",
        ],
        bullets: [
          "Schneller Marktstart ohne eigene Server-Infrastruktur beim Kunden",
          "Planbare Kosten über Abonnements statt großer Einmalinvestitionen",
          "Zentrale Updates – alle Nutzer arbeiten mit der aktuellen Version",
          "Skalierbarkeit: neue Kunden und Nutzer ohne Neuaufbau anbinden",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "SaaS beschreibt das Geschäfts- und Bereitstellungsmodell. Die zugrundeliegende technische Bauweise ist häufig eine Multi-Tenant-Architektur, bei der sich mehrere Kunden eine Anwendung teilen. SaaS läuft auf Cloud-Infrastruktur (z. B. Azure) und erfordert besondere Aufmerksamkeit bei IT-Sicherheit, Identity & Access Management und Datenschutz.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit entwickelt SaaS-Plattformen von der Architektur bis zum produktiven Go-live – mandantenfähig, sicher und skalierbar von Tag eins. Für die Claimity AG entstand so in sechs Wochen ein produktives SaaS-MVP auf Microsoft Azure, inklusive Multi-Tenant-Architektur, rollenbasierter Zugriffe und Multifaktor-Authentifizierung.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen SaaS, PaaS und IaaS?",
        answer:
          "IaaS stellt reine Infrastruktur (Server, Speicher, Netzwerk) bereit, PaaS zusätzlich eine Plattform zum Entwickeln und Betreiben von Anwendungen, und SaaS eine fertige Anwendung. Je höher das Modell, desto weniger muss der Kunde selbst betreiben.",
      },
      {
        question: "Wem gehören die Daten in einer SaaS-Lösung?",
        answer:
          "Die Daten gehören dem Kunden. Entscheidend sind klare vertragliche Regelungen (u. a. Auftragsverarbeitung), Speicherort und Exportmöglichkeiten. smiit setzt auf DSGVO-konforme Architektur und Hosting in der EU oder Schweiz.",
      },
      {
        question: "Ist SaaS sicher genug für sensible Branchen?",
        answer:
          "Ja, wenn Sicherheit von Anfang an mitgedacht wird: sichere Authentifizierung, MFA, rollenbasierte Zugriffe, Verschlüsselung und eine abgesicherte Cloud-Infrastruktur. Gerade in regulierten Branchen ist das die Voraussetzung dafür, dass eine Plattform überhaupt skaliert.",
      },
      {
        question: "Was bedeutet Multi-Tenancy bei SaaS?",
        answer:
          "Multi-Tenancy heißt, dass mehrere Kunden (Mandanten) dieselbe Anwendung und Infrastruktur nutzen, ihre Daten dabei aber strikt voneinander getrennt sind. Das senkt Betriebskosten und vereinfacht Updates, erfordert im Gegenzug eine sorgfältige Trennung von Daten und Zugriffen auf Architekturebene.",
      },
      {
        question: "Was passiert mit unseren Daten, wenn wir den Anbieter wechseln wollen?",
        answer:
          "Entscheidend sind vertraglich zugesicherte Exportmöglichkeiten und offene Datenformate. Ein vorausschauend gebautes SaaS-Angebot stellt Daten in gängigen Formaten zum Export bereit, sodass ein Wechsel oder eine eigene Weiterverarbeitung ohne Lock-in möglich bleibt.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was ist SaaS? Software as a Service erklärt | smiit Glossar",
    metaDescription:
      "SaaS einfach erklärt: Definition, Abgrenzung zu PaaS und IaaS, Vorteile und Anwendungsfälle – mit Praxisbezug aus der SaaS-Entwicklung von smiit.",
  },
  en: {
    slug: "saas",
    cluster: "apps",
    dateModified: "2026-05-24",
    term: "SaaS (Software as a Service)",
    title: "What is SaaS (Software as a Service)?",
    shortDefinition:
      "SaaS (Software as a Service) is a delivery model where software runs centrally in the cloud and is used over the internet on a subscription basis. Users access it through the browser, while operation, maintenance, updates and scaling sit with the provider — without any local installation.",
    synonyms: ["Software as a Service", "cloud software", "SaaS platform", "SaaS application"],
    sections: [
      {
        heading: "Where SaaS is used",
        paragraphs: [
          "Instead of buying software once and installing it on their own servers, companies subscribe to access a centrally operated application. The provider handles infrastructure, security, availability and new features; customers always use the latest version.",
          "SaaS is one of the three classic cloud models alongside IaaS (Infrastructure as a Service) and PaaS (Platform as a Service). SaaS has the highest level of abstraction: customers need not worry about servers or the application platform.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A SaaS platform for the insurance industry, for instance, bundles claims processes, documents and communication centrally. Different parties — insurers, experts, administrators — work in the same application through the browser, with role-based access and cleanly separated data. New customers can be onboarded without building a dedicated installation per customer.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "SaaS is especially suited to products that need to go live quickly, scale with many users and evolve continuously.",
        ],
        bullets: [
          "Fast market entry without server infrastructure at the customer",
          "Predictable costs via subscriptions instead of large one-off investments",
          "Central updates — all users work with the current version",
          "Scalability: onboard new customers and users without rebuilding",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "SaaS describes the business and delivery model. The underlying technical design is often a multi-tenant architecture, where several customers share one application. SaaS runs on cloud infrastructure (e.g. Azure) and demands particular attention to IT security, identity & access management and data protection.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit develops SaaS platforms from architecture to a live launch — multi-tenant, secure and scalable from day one. For Claimity AG, this produced a production SaaS MVP on Microsoft Azure in six weeks, including multi-tenant architecture, role-based access and multi-factor authentication.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between SaaS, PaaS and IaaS?",
        answer:
          "IaaS provides pure infrastructure (servers, storage, networking), PaaS adds a platform to develop and run applications, and SaaS provides a finished application. The higher the model, the less the customer has to operate themselves.",
      },
      {
        question: "Who owns the data in a SaaS solution?",
        answer:
          "The data belongs to the customer. What matters is clear contractual terms (including data processing agreements), storage location and export options. smiit relies on GDPR-compliant architecture and hosting in the EU or Switzerland.",
      },
      {
        question: "Is SaaS secure enough for sensitive industries?",
        answer:
          "Yes, when security is designed in from the start: secure authentication, MFA, role-based access, encryption and a hardened cloud infrastructure. In regulated industries especially, this is the precondition for a platform to scale at all.",
      },
      {
        question: "What does multi-tenancy mean in SaaS?",
        answer:
          "Multi-tenancy means several customers (tenants) use the same application and infrastructure while their data stays strictly separated. This lowers operating costs and simplifies updates, but in return requires careful separation of data and access at the architecture level.",
      },
      {
        question: "What happens to our data if we want to switch providers?",
        answer:
          "What matters are contractually guaranteed export options and open data formats. A forward-looking SaaS offering makes data available for export in common formats, so a switch or your own further processing remains possible without lock-in.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What is SaaS? Software as a Service explained | smiit glossary",
    metaDescription:
      "SaaS explained simply: definition, how it differs from PaaS and IaaS, benefits and use cases — with practical context from smiit's SaaS development.",
  },
}

const prozessautomatisierung: LocalizedGlossaryTerm = {
  de: {
    slug: "process-automation",
    cluster: "strategy",
    dateModified: "2026-05-24",
    term: "Prozessoptimierung & -automatisierung",
    title: "Was ist Prozessoptimierung & -automatisierung?",
    shortDefinition:
      "Prozessoptimierung macht Geschäftsabläufe schlanker, klarer und weniger fehleranfällig; Prozessautomatisierung übernimmt wiederkehrende Schritte technisch, sodass sie ohne manuelle Arbeit ablaufen. Zusammen reduzieren sie Aufwand, Medienbrüche und Fehler – und schaffen Zeit für wertschöpfende Tätigkeiten.",
    synonyms: ["Prozessautomatisierung", "Workflow-Automatisierung", "Geschäftsprozessoptimierung", "RPA"],
    sections: [
      {
        heading: "Einordnung: Wofür wird das genutzt?",
        paragraphs: [
          "Am Anfang steht die Optimierung: Prozesse werden sichtbar gemacht, Brüche und Reibungspunkte analysiert und ein verbessertes Soll-Bild entworfen – häufig mit etablierten Notationen wie BPMN. Erst danach folgt die Automatisierung der Schritte, die sich messbar lohnen.",
          "Wichtig ist die Reihenfolge: Wer einen schlechten Prozess automatisiert, macht ihn nur schneller falsch. Optimierung vor Automatisierung sorgt dafür, dass technische Lösungen auf einem sinnvollen Ablauf aufsetzen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Aufträge erreichen ein Unternehmen per E-Mail als PDF und müssen manuell ausgelesen und in ein System übertragen werden. Mit Microsoft Power Automate und dem AI Builder werden diese PDFs automatisch erkannt, ausgelesen und übertragen – inklusive einer Kontrolllogik, die prüft, ob jeder Auftrag vollständig verarbeitet wurde. Der Eingangskanal bleibt für Kunden gleich, der interne Aufwand sinkt deutlich.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Automatisierung lohnt sich vor allem bei wiederkehrenden, regelbasierten und fehleranfälligen Tätigkeiten.",
        ],
        bullets: [
          "Automatisierte Datenerfassung aus Dokumenten, E-Mails oder Formularen",
          "Freigabe- und Genehmigungsabläufe ohne manuelles Nachhalten",
          "Synchronisation von Daten zwischen ERP, CRM und Fachsystemen",
          "Wiederkehrende Reports und Benachrichtigungen ohne manuellen Anstoß",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Prozessautomatisierung ist breiter als reine RPA (Robotic Process Automation), die vor allem Bildschirminteraktionen nachahmt. In der Microsoft-Welt ist Power Automate das zentrale Werkzeug, oft ergänzt um AI Builder für Dokumentenextraktion. Die Automatisierung baut auf optimierten Prozessen auf und greift häufig auf konsolidierte Stammdaten zurück.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit verbindet Prozessanalyse mit konkreter technischer Umsetzung – statt nur Konzepte zu liefern. Für die G&B Logistics GmbH wurde die Auftragserfassung mit Power Automate und AI Builder automatisiert und spart allein dadurch rund 140 Arbeitsstunden pro Monat. Mitarbeitende werden von repetitiver Erfassung entlastet und können sich auf Disposition und Kundenkommunikation konzentrieren.",
        ],
      },
    ],
    faq: [
      {
        question: "Lohnt sich Automatisierung auch für kleine und mittlere Unternehmen?",
        answer:
          "Ja. Gerade im Mittelstand binden manuelle Routineaufgaben viel Zeit. Mit Werkzeugen wie Power Automate lassen sich Abläufe oft schrittweise und ohne großes Systemprojekt automatisieren – mit schnell messbarem Nutzen.",
      },
      {
        question: "Müssen wir bestehende Systeme ablösen, um zu automatisieren?",
        answer:
          "In der Regel nicht. Häufig ist es sinnvoller, bestehende Systeme über Schnittstellen zu verbinden und die Prozesse dazwischen zu automatisieren, statt alles neu zu bauen.",
      },
      {
        question: "Was passiert bei Ausnahmen und Fehlern?",
        answer:
          "Gute Automatisierung macht Ausnahmen sichtbar, statt sie zu verstecken. Eine Kontrolllogik prüft, ob Vorgänge vollständig verarbeitet wurden, und meldet Fälle, die manuell geprüft werden müssen.",
      },
      {
        question: "Worin unterscheiden sich Prozessoptimierung und Prozessautomatisierung?",
        answer:
          "Prozessoptimierung verbessert den Ablauf selbst: Schritte werden vereinfacht, Brüche entfernt und Verantwortlichkeiten geklärt. Automatisierung übernimmt anschließend einzelne Schritte technisch. Sinnvoll ist die Reihenfolge Optimierung vor Automatisierung, weil ein automatisierter schlechter Prozess nur schneller falsch läuft.",
      },
      {
        question: "Wie identifiziert man, welche Prozesse sich zuerst lohnen?",
        answer:
          "Gute Kandidaten sind Abläufe, die häufig wiederkehren, klaren Regeln folgen, viel manuelle Zeit binden und fehleranfällig sind. Eine kurze Aufnahme von Häufigkeit, Aufwand und Fehlerquote je Prozess macht sichtbar, wo die größten Hebel liegen. smiit beginnt Automatisierungsprojekte bewusst mit dieser Priorisierung, statt breit gestreut zu automatisieren.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Prozessautomatisierung: Definition & Beispiele | smiit Glossar",
    metaDescription:
      "Prozessoptimierung und -automatisierung erklärt: Definition, Vorgehen, Anwendungsfälle und Abgrenzung zu RPA – mit smiit-Praxisbeispiel (140 Std./Monat gespart).",
  },
  en: {
    slug: "process-automation",
    cluster: "strategy",
    dateModified: "2026-05-24",
    term: "Process optimization & automation",
    title: "What is process optimization & automation?",
    shortDefinition:
      "Process optimization makes business workflows leaner, clearer and less error-prone; process automation handles repetitive steps technically, so they run without manual work. Together they reduce effort, broken handoffs and errors — and free up time for value-adding work.",
    synonyms: ["process automation", "workflow automation", "business process optimization", "RPA"],
    sections: [
      {
        heading: "Where it is used",
        paragraphs: [
          "It starts with optimization: processes are made visible, friction points are analyzed and an improved target picture is designed — often with established notations such as BPMN. Only then comes the automation of the steps that demonstrably pay off.",
          "The order matters: automating a poor process only makes it faster at being wrong. Optimisation before automation ensures technical solutions build on a sensible workflow.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "Orders reach a company by email as PDFs and have to be read and entered into a system manually. With Microsoft Power Automate and AI Builder, these PDFs are detected, read and transferred automatically — including control logic that checks whether every order was processed completely. The intake channel stays the same for customers, while internal effort drops significantly.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Automation pays off above all for repetitive, rule-based and error-prone tasks.",
        ],
        bullets: [
          "Automated data capture from documents, emails or forms",
          "Approval and sign-off workflows without manual chasing",
          "Synchronising data between ERP, CRM and domain systems",
          "Recurring reports and notifications without manual triggering",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Process automation is broader than pure RPA (robotic process automation), which mainly mimics screen interactions. In the Microsoft world, Power Automate is the central tool, often complemented by AI Builder for document extraction. Automation builds on optimized processes and frequently relies on consolidated master data.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit combines process analysis with concrete technical delivery — instead of only providing concepts. For G&B Logistics GmbH, order capture was automated with Power Automate and AI Builder, saving around 140 working hours per month by that alone. Staff are relieved of repetitive data entry and can focus on dispatch and customer communication.",
        ],
      },
    ],
    faq: [
      {
        question: "Is automation worthwhile for small and medium-sized companies too?",
        answer:
          "Yes. In SMEs especially, manual routine tasks tie up a lot of time. With tools like Power Automate, workflows can often be automated step by step without a large system project — with quickly measurable value.",
      },
      {
        question: "Do we have to replace existing systems to automate?",
        answer:
          "Usually not. It is often more sensible to connect existing systems via interfaces and automate the processes in between, rather than rebuilding everything.",
      },
      {
        question: "What happens with exceptions and errors?",
        answer:
          "Good automation makes exceptions visible instead of hiding them. Control logic checks whether transactions were fully processed and flags cases that need manual review.",
      },
      {
        question: "How do process optimization and process automation differ?",
        answer:
          "Process optimization improves the workflow itself: steps are simplified, broken handoffs removed and responsibilities clarified. Automation then handles individual steps technically. The sensible order is optimization before automation, because an automated poor process only runs wrong faster.",
      },
      {
        question: "How do you identify which processes are worth automating first?",
        answer:
          "Good candidates are workflows that recur frequently, follow clear rules, tie up a lot of manual time and are error-prone. A short assessment of frequency, effort and error rate per process makes it visible where the biggest levers are. smiit deliberately starts automation projects with this prioritization rather than automating broadly.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Process automation: definition & examples | smiit glossary",
    metaDescription:
      "Process optimization and automation explained: definition, approach, use cases and how it differs from RPA — with a smiit example (140 hours/month saved).",
  },
}

// ---------------------------------------------------------------------------
// Additional detail entries (generated, then reviewed)
// ---------------------------------------------------------------------------

const dataWarehouse: LocalizedGlossaryTerm = {
  de: {
    slug: "data-warehouse",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data Warehouse & Lakehouse",
    title: "Was ist ein Data Warehouse (und ein Lakehouse)?",
    shortDefinition:
      "Ein Data Warehouse ist eine zentrale, für Analysen optimierte Datenbank, in der Daten aus verschiedenen operativen Systemen zusammengeführt, bereinigt und historisiert werden. Ein Lakehouse kombiniert die Flexibilität und niedrigen Speicherkosten eines Data Lakes mit den Struktur- und Performance-Eigenschaften eines Warehouse und bildet so eine gemeinsame Grundlage für Reporting, Analytik und Machine Learning.",
    synonyms: ["DWH", "Datenlager", "Enterprise Data Warehouse", "EDW", "Data Lakehouse", "Lakehouse"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ein Data Warehouse genutzt?",
        paragraphs: [
          "Ein Data Warehouse trennt die Analysewelt von den operativen Systemen. Statt Berichte direkt auf ERP-, CRM- oder Produktionsdatenbanken laufen zu lassen, werden die relevanten Daten regelmäßig extrahiert, vereinheitlicht und in einem für Abfragen optimierten Modell abgelegt. So entsteht eine konsistente, historisierte Datenbasis, auf der Reporting und Analysen verlässlich und performant arbeiten.",
          "Das Lakehouse ist die modernere Ausprägung dieser Idee. Daten liegen zunächst kostengünstig in einem Data Lake (Objektspeicher) und werden über offene Tabellenformate wie Delta Lake mit Transaktionssicherheit, Schema-Verwaltung und Performance versehen. Dadurch lassen sich strukturierte Tabellen für klassisches Reporting und unstrukturierte oder halbstrukturierte Daten für Data Science auf derselben Plattform verwalten.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein typisches Szenario: Auftragsdaten liegen im ERP, Kundendaten im CRM, Zeiterfassung in Excel und Sensordaten in einer separaten Datenbank. Ein Data Warehouse oder Lakehouse führt diese Quellen zusammen, vereinheitlicht Schlüssel und Begriffe und stellt eine saubere Schicht bereit, auf der Power BI direkt aufsetzen kann.",
          "Bei smiit ist die Datenplattform der dy Project AG ein konkretes Beispiel: Für ein Großbauprojekt mit einem Volumen von über 1 Mrd. CHF wurden Daten aus SQL Server, Excel-Dateien und REST-APIs auf Azure Databricks in einem Lakehouse zusammengeführt und entlang einer Medallion-Architektur (Bronze/Silver/Gold) veredelt.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Ein Data Warehouse oder Lakehouse lohnt sich, sobald Reporting über mehrere Quellen, große Datenmengen oder eine verlässliche Historie gefragt sind.",
        ],
        bullets: [
          "Eine gemeinsame Datenwahrheit für Management-Reporting und Controlling über System- und Abteilungsgrenzen hinweg",
          "Historisierung: Kennzahlen lassen sich über Zeit vergleichen, auch wenn operative Systeme nur den aktuellen Stand kennen",
          "Performante Abfragen, ohne die operativen Systeme zu belasten",
          "Eine Plattform, die Reporting und Machine Learning auf derselben veredelten Datenbasis ermöglicht (Lakehouse)",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Ein Data Lake speichert Rohdaten ohne festes Schema und ist günstig, aber ohne Veredelung schwer analytisch nutzbar. Ein klassisches Data Warehouse ist stark strukturiert und auf SQL-Reporting optimiert, aber weniger flexibel für unstrukturierte Daten. Das Lakehouse verbindet beide Welten. Die Befüllung erfolgt über ETL- oder ELT-Prozesse, die Strukturierung über Datenmodellierung und Ansätze wie die Medallion-Architektur. Power BI ist die analytische Oberfläche, die auf der veredelten Schicht aufsetzt, nicht das Warehouse selbst.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit konzipiert und baut Data Warehouses und Lakehouses für den Mittelstand, vorzugsweise im Microsoft- und Azure-Umfeld. Von der Anbindung der Quellsysteme über die Modellierung und Veredelung bis zur Governance entsteht eine Datenplattform, die Reporting und Analytik tragfähig macht, statt nur Daten zu sammeln.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Data Warehouse und Data Lake?", answer: "Ein Data Lake speichert Rohdaten kostengünstig und ohne festes Schema, während ein Data Warehouse strukturierte, für Analysen aufbereitete Daten enthält. Ein Lakehouse kombiniert beide Ansätze auf einer Plattform." },
      { question: "Brauchen wir als Mittelständler überhaupt ein Data Warehouse?", answer: "Sobald Reporting mehrere Quellsysteme zusammenführt, große Datenmengen anfallen oder eine verlässliche Historie benötigt wird, lohnt sich eine zentrale Datenplattform. Für sehr überschaubare Datenmengen kann eine direkte Anbindung zunächst ausreichen." },
      { question: "Läuft ein Lakehouse nur in der Cloud?", answer: "In der Praxis wird ein Lakehouse fast immer in der Cloud betrieben, etwa auf Azure mit Azure Databricks oder Microsoft Fabric, weil dort günstiger Objektspeicher und skalierbare Rechenleistung zusammenkommen." },
      { question: "Was ist der Unterschied zwischen ETL und ELT bei der Befüllung?", answer: "Bei ETL werden Daten erst transformiert und dann geladen, bei ELT zuerst geladen und anschließend in der Zielplattform transformiert. Moderne Lakehouses nutzen häufig ELT, weil günstiger Speicher und skalierbare Rechenleistung es erlauben, Rohdaten zunächst abzulegen und dort zu veredeln." },
      { question: "Wie aktuell sind die Daten in einem Data Warehouse?", answer: "Das hängt vom Beladungsintervall ab. Viele Warehouses werden nächtlich oder mehrmals täglich aktualisiert (Batch), für nahezu aktuelle Daten sind häufigere oder streamende Ladevorgänge möglich. Der passende Takt richtet sich nach dem fachlichen Bedarf und den Kosten." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data Warehouse & Lakehouse: Definition & Praxis | smiit Glossar",
    metaDescription: "Data Warehouse und Lakehouse einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Data Lake und ETL – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-warehouse",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data warehouse & lakehouse",
    title: "What is a data warehouse (and a lakehouse)?",
    shortDefinition:
      "A data warehouse is a central database optimized for analysis, where data from different operational systems is consolidated, cleansed and historized. A lakehouse combines the flexibility and low storage cost of a data lake with the structure and performance of a warehouse, providing a shared foundation for reporting, analytics and machine learning.",
    synonyms: ["DWH", "enterprise data warehouse", "EDW", "data lakehouse", "lakehouse"],
    sections: [
      {
        heading: "Where a data warehouse is used",
        paragraphs: [
          "A data warehouse separates the analytical world from operational systems. Instead of running reports directly against ERP, CRM or production databases, the relevant data is extracted regularly, unified and stored in a model optimized for queries. This creates a consistent, historized data basis on which reporting and analysis can run reliably and quickly.",
          "The lakehouse is the more modern expression of this idea. Data first lands cheaply in a data lake (object storage) and is then given transactional safety, schema management and performance through open table formats such as Delta Lake. This allows structured tables for classic reporting and unstructured or semi-structured data for data science to live on the same platform.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A typical scenario: order data sits in the ERP, customer data in the CRM, time tracking in Excel and sensor data in a separate database. A data warehouse or lakehouse brings these sources together, unifies keys and terms, and provides a clean layer that Power BI can build on directly.",
          "At smiit, the dy Project AG data platform is a concrete example: for a large construction project worth over 1 billion CHF, data from SQL Server, Excel files and REST APIs was consolidated on Azure Databricks in a lakehouse and refined along a medallion architecture (bronze/silver/gold).",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "A data warehouse or lakehouse pays off as soon as reporting spans several sources, large data volumes are involved, or a reliable history is required.",
        ],
        bullets: [
          "A single source of truth for management reporting and controlling across system and department boundaries",
          "Historisation: metrics can be compared over time even when operational systems only hold the current state",
          "Fast queries without burdening the operational systems",
          "One platform that enables both reporting and machine learning on the same refined data (lakehouse)",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "A data lake stores raw data without a fixed schema; it is cheap but hard to use analytically without refinement. A classic data warehouse is highly structured and optimized for SQL reporting but less flexible for unstructured data. The lakehouse bridges both worlds. It is loaded via ETL or ELT processes, structured through data modeling and approaches such as the medallion architecture. Power BI is the analytical surface that sits on top of the refined layer, not the warehouse itself.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit designs and builds data warehouses and lakehouses for mid-sized companies, preferably in the Microsoft and Azure ecosystem. From connecting source systems through modeling and refinement to governance, the result is a data platform that makes reporting and analytics robust instead of merely collecting data.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between a data warehouse and a data lake?", answer: "A data lake stores raw data cheaply and without a fixed schema, whereas a data warehouse contains structured data prepared for analysis. A lakehouse combines both approaches on one platform." },
      { question: "Do we as a mid-sized company even need a data warehouse?", answer: "As soon as reporting consolidates several source systems, large data volumes occur, or a reliable history is needed, a central data platform pays off. For very small data volumes, a direct connection may be sufficient at first." },
      { question: "Does a lakehouse only run in the cloud?", answer: "In practice a lakehouse is almost always run in the cloud, for example on Azure with Azure Databricks or Microsoft Fabric, because cheap object storage and scalable compute come together there." },
      { question: "What is the difference between ETL and ELT when loading?", answer: "With ETL, data is transformed first and then loaded; with ELT, it is loaded first and then transformed within the target platform. Modern lakehouses often use ELT because cheap storage and scalable compute make it feasible to land raw data first and refine it there." },
      { question: "How current is the data in a data warehouse?", answer: "It depends on the load interval. Many warehouses are refreshed nightly or several times a day (batch); for near-real-time data, more frequent or streaming loads are possible. The right cadence depends on business needs and cost." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data warehouse & lakehouse explained | smiit glossary",
    metaDescription: "Data warehouse and lakehouse explained simply: definition, how they work, use cases and how they differ from a data lake and ETL – with practical insight from smiit.",
  },
}

const datenstrategie: LocalizedGlossaryTerm = {
  de: {
    slug: "data-strategy",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Datenstrategie",
    title: "Was ist eine Datenstrategie?",
    shortDefinition:
      "Eine Datenstrategie ist der übergreifende Plan, mit dem ein Unternehmen festlegt, wie es Daten erhebt, speichert, verwaltet, schützt und für Entscheidungen nutzt. Sie verbindet Geschäftsziele mit den nötigen Daten, Rollen, Prozessen und Technologien und sorgt dafür, dass Datenarbeit zielgerichtet statt zufällig geschieht.",
    synonyms: ["Data Strategy", "Datenmanagement-Strategie", "Daten-Roadmap"],
    sections: [
      {
        heading: "Einordnung: Wofür wird eine Datenstrategie genutzt?",
        paragraphs: [
          "Eine Datenstrategie beantwortet die Frage, welche geschäftlichen Ziele mit Daten erreicht werden sollen und was dafür nötig ist. Sie definiert, welche Daten relevant sind, wo sie herkommen, wer für sie verantwortlich ist und in welcher Reihenfolge Datenprojekte angegangen werden. Damit verhindert sie, dass Unternehmen viele isolierte Tools und Berichte aufbauen, ohne dass ein Gesamtbild entsteht.",
          "Typische Bausteine sind Ziele und Anwendungsfälle, eine Bestandsaufnahme der Datenquellen, eine Zielarchitektur (etwa ein Data Warehouse oder Lakehouse), Rollen und Verantwortlichkeiten, Governance- und Datenschutzregeln sowie eine priorisierte Roadmap.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Logistikunternehmen möchte schnellere und verlässlichere Auswertungen. Statt sofort ein neues BI-Tool zu kaufen, klärt die Datenstrategie zuerst: Welche Entscheidungen sollen verbessert werden, welche Daten sind dafür nötig, wo liegen sie heute, und welche manuellen Prozesse blockieren das. Daraus entsteht eine Reihenfolge, die mit den größten Hebeln beginnt.",
          "Bei der G&B Logistics GmbH stand am Anfang nicht ein Tool, sondern die Frage, wo manuelle Datenarbeit und Medienbrüche den Betrieb bremsen. Die strategische Einordnung machte sichtbar, welche Prozesse sich zuerst automatisieren und welche Stammdaten sich vereinheitlichen lassen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Eine Datenstrategie zahlt sich überall dort aus, wo Datenprojekte bisher punktuell und ohne roten Faden entstanden sind.",
        ],
        bullets: [
          "Priorisierung: Datenprojekte werden nach Geschäftsnutzen statt nach Tool-Trends geordnet",
          "Klare Rollen und Verantwortlichkeiten für Datenqualität und -pflege",
          "Eine konsistente Zielarchitektur, statt immer neuer Insellösungen",
          "Eingebaute Governance und Datenschutz von Anfang an, nicht als Nachgedanke",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Die Datenstrategie ist die übergeordnete Ebene. Data Governance regelt konkret die Verantwortlichkeiten, Standards und Qualitätsregeln und ist damit ein Umsetzungsbaustein der Strategie. Ein Data Warehouse oder Lakehouse ist die technische Plattform, die aus der Strategie folgt. Power BI und andere Werkzeuge sind die Mittel, mit denen die strategischen Ziele sichtbar werden. Die Strategie verbindet diese Ebenen zu einem Plan.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit entwickelt Datenstrategien für den Mittelstand, die nah an den Geschäftszielen bleiben und in einer umsetzbaren Roadmap münden. Statt eines theoretischen Papiers entsteht ein priorisierter Plan, der direkt in konkrete Schritte wie Datenintegration, Automatisierung und Reporting übersetzt wird.",
        ],
      },
    ],
    faq: [
      { question: "Was gehört in eine Datenstrategie?", answer: "Geschäftsziele und Anwendungsfälle, eine Bestandsaufnahme der Datenquellen, eine Zielarchitektur, Rollen und Verantwortlichkeiten, Governance- und Datenschutzregeln sowie eine priorisierte Roadmap." },
      { question: "Lohnt sich eine Datenstrategie auch für kleinere Unternehmen?", answer: "Ja. Gerade bei begrenzten Ressourcen hilft eine Strategie, die wenigen Initiativen auf den größten Nutzen auszurichten und teure Fehlinvestitionen in unpassende Tools zu vermeiden." },
      { question: "Wie lange dauert es, eine Datenstrategie zu erstellen?", answer: "Eine erste belastbare Strategie mit Roadmap entsteht je nach Größe und Komplexität oft in einigen Wochen. Sie wird danach regelmäßig überprüft und an neue Ziele angepasst." },
      { question: "Müssen wir erst eine Datenstrategie haben, bevor wir mit Reporting oder Automatisierung starten?", answer: "Nicht zwingend. Erste konkrete Verbesserungen können parallel beginnen und liefern oft schnelle Erfolge. Eine Strategie sorgt jedoch dafür, dass diese Einzelschritte aufeinander einzahlen, statt zu isolierten Insellösungen zu werden." },
      { question: "Wer sollte an einer Datenstrategie mitarbeiten?", answer: "Sinnvoll ist eine Mischung aus Geschäftsführung beziehungsweise Fachbereichen, die die Ziele kennen, und technischen Rollen, die Quellen und Machbarkeit einschätzen. Datenstrategie ist keine reine IT-Aufgabe, weil die wichtigsten Fragen aus dem Geschäft kommen." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Datenstrategie: Definition, Bausteine & Praxis | smiit Glossar",
    metaDescription: "Datenstrategie einfach erklärt: Definition, Bausteine, Anwendungsfälle und Abgrenzung zu Data Governance und Data Warehouse – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-strategy",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data strategy",
    title: "What is a data strategy?",
    shortDefinition:
      "A data strategy is the overarching plan that defines how a company collects, stores, manages, protects and uses data for decisions. It connects business goals with the required data, roles, processes and technologies, ensuring that data work happens purposefully rather than by accident.",
    synonyms: ["data management strategy", "data roadmap"],
    sections: [
      {
        heading: "Where a data strategy is used",
        paragraphs: [
          "A data strategy answers the question of which business goals should be achieved with data and what is needed to get there. It defines which data is relevant, where it comes from, who is responsible for it, and in what order data projects are tackled. This prevents companies from building many isolated tools and reports without ever forming a complete picture.",
          "Typical building blocks are goals and use cases, an inventory of data sources, a target architecture (such as a data warehouse or lakehouse), roles and responsibilities, governance and data protection rules, and a prioritized roadmap.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A logistics company wants faster and more reliable analysis. Instead of buying a new BI tool right away, the data strategy first clarifies which decisions should be improved, which data is needed for them, where it sits today, and which manual processes block it. From this comes a sequence that starts with the biggest levers.",
          "At G&B Logistics GmbH the starting point was not a tool but the question of where manual data work and broken handoffs between systems were slowing operations. The strategic framing made it visible which processes to automate first and which master data to unify.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "A data strategy pays off wherever data projects have so far been created in isolation and without a common thread.",
        ],
        bullets: [
          "Prioritisation: data projects are ordered by business value instead of tool trends",
          "Clear roles and responsibilities for data quality and maintenance",
          "A consistent target architecture instead of ever new isolated solutions",
          "Built-in governance and data protection from the start, not as an afterthought",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "The data strategy is the overarching layer. Data governance concretely regulates responsibilities, standards and quality rules and is therefore an implementation building block of the strategy. A data warehouse or lakehouse is the technical platform that follows from the strategy. Power BI and other tools are the means by which the strategic goals become visible. The strategy ties these layers together into one plan.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit develops data strategies for mid-sized companies that stay close to business goals and result in an actionable roadmap. Instead of a theoretical paper, the outcome is a prioritized plan that translates directly into concrete steps such as data integration, automation and reporting.",
        ],
      },
    ],
    faq: [
      { question: "What belongs in a data strategy?", answer: "Business goals and use cases, an inventory of data sources, a target architecture, roles and responsibilities, governance and data protection rules, and a prioritized roadmap." },
      { question: "Is a data strategy worthwhile for smaller companies too?", answer: "Yes. Especially with limited resources, a strategy helps focus the few initiatives on the greatest value and avoid expensive investments in unsuitable tools." },
      { question: "How long does it take to create a data strategy?", answer: "A first robust strategy with a roadmap often emerges within a few weeks, depending on size and complexity. It is then reviewed regularly and adapted to new goals." },
      { question: "Do we need a data strategy before starting with reporting or automation?", answer: "Not necessarily. First concrete improvements can begin in parallel and often deliver quick wins. A strategy, however, ensures that these individual steps build on one another instead of becoming isolated point solutions." },
      { question: "Who should be involved in a data strategy?", answer: "A mix works best: management or business units who know the goals, and technical roles who can assess sources and feasibility. A data strategy is not a pure IT task, because the most important questions come from the business." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Data strategy: definition & building blocks | smiit glossary",
    metaDescription: "Data strategy explained simply: definition, building blocks, use cases and how it differs from data governance and a data warehouse – with practical insight from smiit.",
  },
}

const dataGovernance: LocalizedGlossaryTerm = {
  de: {
    slug: "data-governance",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data Governance",
    title: "Was ist Data Governance?",
    shortDefinition:
      "Data Governance ist die Gesamtheit aus Rollen, Regeln, Prozessen und Standards, mit denen ein Unternehmen die Qualität, Sicherheit, Verfügbarkeit und konforme Nutzung seiner Daten sicherstellt. Sie legt fest, wer für welche Daten verantwortlich ist, wie diese definiert werden und wer worauf zugreifen darf.",
    synonyms: ["Datenverwaltung", "Daten-Governance", "Datenmanagement-Regeln"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Data Governance genutzt?",
        paragraphs: [
          "Data Governance sorgt dafür, dass Daten als verlässliches Unternehmensgut behandelt werden. Sie regelt, wie Begriffe und Kennzahlen einheitlich definiert sind, wer Daten pflegt und freigibt, wie Datenqualität gemessen wird und wie Zugriffe und Datenschutz geregelt werden. Damit schafft sie Vertrauen in die Daten, auf denen Entscheidungen beruhen.",
          "Konkret umfasst Governance Rollen wie Data Owner und Data Steward, ein gemeinsames Begriffsverständnis (Glossar und Definitionen), Qualitätsregeln, Zugriffs- und Berechtigungskonzepte sowie Vorgaben zu Datenschutz und Compliance, etwa im Rahmen der DSGVO.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ohne Governance bedeutet derselbe Begriff in zwei Abteilungen oft Unterschiedliches, etwa wenn Umsatz einmal mit und einmal ohne Retouren gemeint ist. Governance legt verbindlich fest, wie solche Kennzahlen definiert sind, und macht Berichte über Abteilungen hinweg vergleichbar.",
          "In der Datenplattform der dy Project AG war Governance zentral: Bei einem Großbauprojekt mit über 1 Mrd. CHF Volumen und Daten aus SQL Server, Excel und REST-APIs musste klar geregelt sein, welche Daten verlässlich sind, wie sie definiert werden und wer welche Sichten sehen darf. Die Medallion-Architektur half dabei, geprüfte von ungeprüften Daten zu trennen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Data Governance wird wichtig, sobald mehrere Teams auf dieselben Daten zugreifen oder regulatorische Anforderungen bestehen.",
        ],
        bullets: [
          "Einheitliche Definitionen, sodass Kennzahlen in allen Berichten dasselbe bedeuten",
          "Nachvollziehbare Datenqualität und klare Verantwortlichkeiten für Pflege und Freigabe",
          "Geregelte Zugriffe und Berechtigungen, etwa über Row-Level Security",
          "Datenschutz- und Compliance-Konformität, zum Beispiel im Rahmen der DSGVO",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Die Datenstrategie ist die übergeordnete Ebene, Data Governance ist deren operatives Regelwerk. Datenqualität ist ein Ziel, das Governance absichert. Die technische Plattform wie ein Data Warehouse oder Lakehouse setzt Governance um, etwa durch Zugriffskonzepte und nachvollziehbare Veredelungsschichten. Sicherheitstechniken wie Row-Level Security sind konkrete Werkzeuge innerhalb der Governance.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit verankert Data Governance pragmatisch in Datenplattformen, ohne sie zum Selbstzweck werden zu lassen. Definitionen, Verantwortlichkeiten, Qualitätsregeln und Berechtigungen werden so gestaltet, dass sie im Alltag eingehalten werden und Vertrauen in die Daten schaffen.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Data Governance und Datenstrategie?", answer: "Die Datenstrategie legt fest, welche Ziele mit Daten erreicht werden sollen. Data Governance ist das operative Regelwerk aus Rollen, Standards und Prozessen, mit dem diese Ziele verlässlich umgesetzt werden." },
      { question: "Wer ist im Unternehmen für Data Governance verantwortlich?", answer: "Typisch sind Rollen wie Data Owner (fachlich verantwortlich für einen Datenbereich) und Data Steward (kümmert sich um Qualität und Pflege). Die Gesamtverantwortung liegt meist bei der Geschäftsführung oder einem Dateneigner." },
      { question: "Ist Data Governance dasselbe wie Datenschutz?", answer: "Nein. Datenschutz, etwa nach DSGVO, ist ein wichtiger Teil von Governance, aber Governance umfasst darüber hinaus auch Datenqualität, Definitionen, Verantwortlichkeiten und Zugriffsregeln." },
      { question: "Wird Data Governance erst ab einer bestimmten Unternehmensgröße relevant?", answer: "Nein. Schon wenige Berichte mit uneinheitlichen Kennzahlendefinitionen führen zu Missverständnissen. Im Mittelstand reicht oft eine schlanke Governance mit klaren Definitionen, benannten Verantwortlichen und einfachen Zugriffsregeln, statt eines schweren Regelwerks." },
      { question: "Wie fängt man mit Data Governance pragmatisch an?", answer: "Sinnvoll ist ein kleiner Anfang: die wichtigsten Kennzahlen einheitlich definieren, für die zentralen Datenbereiche Verantwortliche benennen und Zugriffsrechte klären. Governance wächst dann mit den Datenanforderungen, statt von Beginn an alle Regeln auf einmal einzuführen." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data Governance: Definition, Rollen & Praxis | smiit Glossar",
    metaDescription: "Data Governance einfach erklärt: Definition, Rollen, Anwendungsfälle und Abgrenzung zu Datenstrategie und Datenschutz – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-governance",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data governance",
    title: "What is data governance?",
    shortDefinition:
      "Data governance is the combination of roles, rules, processes and standards with which a company ensures the quality, security, availability and compliant use of its data. It defines who is responsible for which data, how it is defined, and who may access what.",
    synonyms: ["data management rules", "data stewardship"],
    sections: [
      {
        heading: "Where data governance is used",
        paragraphs: [
          "Data governance ensures that data is treated as a reliable corporate asset. It regulates how terms and metrics are defined consistently, who maintains and approves data, how data quality is measured, and how access and data protection are handled. In doing so, it builds trust in the data on which decisions are based.",
          "In concrete terms, governance covers roles such as data owner and data steward, a shared understanding of terms (glossary and definitions), quality rules, access and permission concepts, and requirements for data protection and compliance, for example under the GDPR.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "Without governance, the same term often means different things in two departments, for example when revenue is meant once with and once without returns. Governance binds how such metrics are defined and makes reports comparable across departments.",
          "In the dy Project AG data platform, governance was central: for a large construction project worth over 1 billion CHF with data from SQL Server, Excel and REST APIs, it had to be clear which data is reliable, how it is defined and who may see which views. The medallion architecture helped separate validated from unvalidated data.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Data governance becomes important as soon as several teams access the same data or regulatory requirements exist.",
        ],
        bullets: [
          "Consistent definitions so that metrics mean the same thing in every report",
          "Traceable data quality and clear responsibilities for maintenance and approval",
          "Regulated access and permissions, for example via row-level security",
          "Data protection and compliance, for instance under the GDPR",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "The data strategy is the overarching layer; data governance is its operational rulebook. Data quality is a goal that governance secures. The technical platform such as a data warehouse or lakehouse implements governance, for example through access concepts and traceable refinement layers. Security techniques such as row-level security are concrete tools within governance.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit anchors data governance pragmatically in data platforms without making it an end in itself. Definitions, responsibilities, quality rules and permissions are designed so that they are followed in everyday work and build trust in the data.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between data governance and data strategy?", answer: "The data strategy defines which goals should be achieved with data. Data governance is the operational rulebook of roles, standards and processes that reliably implements those goals." },
      { question: "Who is responsible for data governance in a company?", answer: "Typical roles are data owner (responsible for a data domain) and data steward (looks after quality and maintenance). Overall responsibility usually lies with management or a designated data owner." },
      { question: "Is data governance the same as data protection?", answer: "No. Data protection, for example under the GDPR, is an important part of governance, but governance also covers data quality, definitions, responsibilities and access rules." },
      { question: "Does data governance only become relevant above a certain company size?", answer: "No. Even a handful of reports with inconsistent metric definitions lead to misunderstandings. In SMEs a lean governance with clear definitions, named owners and simple access rules is often enough, rather than a heavy rulebook." },
      { question: "How do you start with data governance pragmatically?", answer: "It makes sense to start small: define the most important metrics consistently, name owners for the central data domains and clarify access rights. Governance then grows with the data requirements instead of introducing every rule at once from the start." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data governance: definition, roles & practice | smiit glossary",
    metaDescription: "Data governance explained simply: definition, roles, use cases and how it differs from data strategy and data protection – with practical insight from smiit.",
  },
}

const mlops: LocalizedGlossaryTerm = {
  de: {
    slug: "mlops",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "MLOps",
    title: "Was ist MLOps?",
    shortDefinition:
      "MLOps (Machine Learning Operations) bezeichnet die Prinzipien und Werkzeuge, mit denen Machine-Learning-Modelle zuverlässig entwickelt, ausgeliefert, überwacht und aktualisiert werden. Es überträgt die Ideen von DevOps auf den Lebenszyklus von ML-Modellen, sodass aus einem Prototyp ein dauerhaft betriebsfähiges System wird.",
    synonyms: ["Machine Learning Operations", "ML Operations", "ML-Betrieb"],
    sections: [
      {
        heading: "Einordnung: Wofür wird MLOps genutzt?",
        paragraphs: [
          "MLOps schließt die Lücke zwischen einem im Notebook funktionierenden Modell und einem System, das im Tagesbetrieb verlässlich Vorhersagen liefert. Es regelt, wie Daten und Modelle versioniert werden, wie Training und Auslieferung automatisiert ablaufen, wie Modelle überwacht und bei nachlassender Güte neu trainiert werden.",
          "Zentrale Bausteine sind Versionierung von Daten, Code und Modellen, automatisierte Trainings- und Deployment-Pipelines, ein Modellregister, Monitoring auf Modell- und Datenqualität sowie Mechanismen für reproduzierbares Re-Training. In Azure werden diese Bausteine etwa mit Azure Machine Learning und Azure DevOps oder GitHub umgesetzt.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Modell sagt die zu erwartende Nachfrage voraus. Ohne MLOps wird es einmalig trainiert und veraltet schleichend, weil sich Marktbedingungen ändern (Data Drift). Mit MLOps werden Eingangsdaten und Vorhersagegüte überwacht, und bei Abweichungen stößt eine Pipeline automatisch ein erneutes Training und eine kontrollierte Auslieferung an.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "MLOps lohnt sich, sobald ein ML-Modell dauerhaft im Betrieb wirken soll, statt nur als einmalige Analyse zu dienen.",
        ],
        bullets: [
          "Reproduzierbarkeit: Trainings lassen sich mit denselben Daten und Parametern nachvollziehen",
          "Automatisierte Auslieferung neuer Modellversionen ohne manuelle Handarbeit",
          "Monitoring von Modellgüte und Eingangsdaten, um Data Drift früh zu erkennen",
          "Klare Governance und Nachvollziehbarkeit, welche Modellversion wann im Einsatz war",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "DevOps bezieht sich auf Software allgemein, MLOps erweitert dies um die Besonderheiten von Daten und Modellen, etwa Datenversionierung und Modell-Monitoring. Machine Learning in Azure stellt die Plattform und Modelle bereit, MLOps sorgt für deren verlässlichen Betrieb. CI/CD ist eine Technik, die in MLOps für automatisierte Pipelines genutzt wird.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit hilft mittelständischen Unternehmen, Machine-Learning-Lösungen nicht nur zu entwickeln, sondern dauerhaft betriebsfähig zu machen. Im Azure-Umfeld werden reproduzierbare Pipelines, Monitoring und kontrollierte Auslieferung so aufgesetzt, dass Modelle verlässlich Wert stiften, statt im Prototyp-Stadium zu verharren.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen DevOps und MLOps?", answer: "DevOps automatisiert die Entwicklung und Auslieferung von Software allgemein. MLOps überträgt diese Prinzipien auf Machine-Learning-Modelle und ergänzt sie um Datenversionierung, Modellregister und Monitoring der Modellgüte." },
      { question: "Brauchen wir MLOps schon für ein einzelnes Modell?", answer: "Für eine einmalige Analyse meist nicht. Sobald ein Modell aber dauerhaft Vorhersagen liefern und mit neuen Daten aktuell bleiben soll, sorgt MLOps für verlässlichen und nachvollziehbaren Betrieb." },
      { question: "Was ist Data Drift im MLOps-Kontext?", answer: "Data Drift bezeichnet die Veränderung der Eingangsdaten gegenüber den Trainingsdaten, wodurch ein Modell schleichend ungenauer wird. MLOps erkennt dies durch Monitoring und stößt bei Bedarf ein erneutes Training an." },
      { question: "Welche Werkzeuge werden für MLOps in Azure genutzt?", answer: "Typisch sind Azure Machine Learning für Training, Modellregister und Bereitstellung, kombiniert mit Azure DevOps oder GitHub für Versionierung und Pipelines. Für die Datenaufbereitung kommt häufig Azure Databricks hinzu. Welche Bausteine nötig sind, hängt von der Komplexität der Modelle ab." },
      { question: "Wie hängen MLOps und Modell-Governance zusammen?", answer: "MLOps liefert die technische Grundlage für Governance: Versionierung, Modellregister und Monitoring machen nachvollziehbar, welche Modellversion mit welchen Daten trainiert wurde und wann sie im Einsatz war. Das ist die Voraussetzung für Audits und für klare Verantwortlichkeiten im Modellbetrieb." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "Was ist MLOps? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription: "MLOps einfach erklärt: Definition, Bausteine, Anwendungsfälle und Abgrenzung zu DevOps und Machine Learning in Azure – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "mlops",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "MLOps",
    title: "What is MLOps?",
    shortDefinition:
      "MLOps (machine learning operations) describes the principles and tools used to reliably develop, deploy, monitor and update machine learning models. It applies the ideas of DevOps to the lifecycle of ML models, turning a prototype into a system that can be operated permanently.",
    synonyms: ["machine learning operations", "ML operations", "ML ops"],
    sections: [
      {
        heading: "Where MLOps is used",
        paragraphs: [
          "MLOps closes the gap between a model that works in a notebook and a system that reliably delivers predictions in daily operation. It governs how data and models are versioned, how training and deployment are automated, and how models are monitored and retrained when their quality declines.",
          "Core building blocks are versioning of data, code and models, automated training and deployment pipelines, a model registry, monitoring of model and data quality, and mechanisms for reproducible retraining. In Azure these building blocks are implemented with Azure Machine Learning and Azure DevOps or GitHub, for example.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A model predicts expected demand. Without MLOps it is trained once and gradually becomes outdated as market conditions change (data drift). With MLOps the input data and prediction quality are monitored, and when deviations occur a pipeline automatically triggers retraining and a controlled deployment.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "MLOps pays off as soon as an ML model is meant to operate permanently rather than serve as a one-off analysis.",
        ],
        bullets: [
          "Reproducibility: training can be traced with the same data and parameters",
          "Automated deployment of new model versions without manual effort",
          "Monitoring of model quality and input data to detect data drift early",
          "Clear governance and traceability of which model version was in use and when",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "DevOps applies to software in general; MLOps extends it with the specifics of data and models, such as data versioning and model monitoring. Machine learning in Azure provides the platform and models, while MLOps ensures their reliable operation. CI/CD is a technique used within MLOps for automated pipelines.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit helps mid-sized companies not only develop machine learning solutions but make them permanently operable. In the Azure ecosystem, reproducible pipelines, monitoring and controlled deployment are set up so that models reliably create value instead of remaining stuck in the prototype stage.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between DevOps and MLOps?", answer: "DevOps automates the development and deployment of software in general. MLOps applies these principles to machine learning models and adds data versioning, a model registry and monitoring of model quality." },
      { question: "Do we need MLOps for just a single model?", answer: "Usually not for a one-off analysis. But as soon as a model is meant to deliver predictions permanently and stay current with new data, MLOps ensures reliable and traceable operation." },
      { question: "What is data drift in the MLOps context?", answer: "Data drift describes the change of input data compared to the training data, which gradually makes a model less accurate. MLOps detects this through monitoring and triggers retraining when needed." },
      { question: "Which tools are used for MLOps in Azure?", answer: "Typically Azure Machine Learning for training, model registry and deployment, combined with Azure DevOps or GitHub for versioning and pipelines. Azure Databricks is often added for data preparation. Which building blocks are needed depends on the complexity of the models." },
      { question: "How are MLOps and model governance related?", answer: "MLOps provides the technical basis for governance: versioning, a model registry and monitoring make it traceable which model version was trained on which data and when it was in use. This is the precondition for audits and for clear responsibilities in model operation." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "What is MLOps? Definition, benefits & practice | smiit glossary",
    metaDescription: "MLOps explained simply: definition, building blocks, use cases and how it differs from DevOps and machine learning in Azure – with practical insight from smiit.",
  },
}

const machineLearningAzure: LocalizedGlossaryTerm = {
  de: {
    slug: "machine-learning-azure",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Machine Learning in Azure",
    title: "Was ist Machine Learning in Azure?",
    shortDefinition:
      "Machine Learning in Azure bezeichnet die Entwicklung, das Training und den Betrieb von Machine-Learning-Modellen auf der Microsoft-Azure-Cloud, vor allem mit dem Dienst Azure Machine Learning. Unternehmen nutzen es, um aus ihren Daten Vorhersagen, Klassifizierungen oder Erkennungen abzuleiten, ohne eine eigene ML-Infrastruktur betreiben zu müssen.",
    synonyms: ["Azure ML", "Azure Machine Learning", "ML in Azure", "Azure AI"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Machine Learning in Azure genutzt?",
        paragraphs: [
          "Azure Machine Learning stellt eine verwaltete Umgebung bereit, in der Daten aufbereitet, Modelle trainiert, bewertet und als Endpunkte bereitgestellt werden. Statt eigene Server und Bibliotheken zu pflegen, nutzen Teams skalierbare Rechenleistung, fertige Werkzeuge und eine durchgängige Plattform von der Datenanbindung bis zur Auslieferung.",
          "Die Plattform deckt verschiedene Vorgehensweisen ab, vom assistierten Automated Machine Learning über klassisches Modelltraining mit Python und vertrauten Bibliotheken bis zur Integration mit Azure Databricks für große Datenmengen. Über den Betrieb hinweg lassen sich MLOps-Praktiken anwenden.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Unternehmen möchte aus historischen Auftragsdaten die zu erwartende Nachfrage je Region vorhersagen. In Azure werden die Daten aus dem Lakehouse angebunden, ein Modell trainiert und als Endpunkt bereitgestellt, den ein Reporting oder eine Anwendung abfragt. Die Rechenleistung wird nur bei Bedarf genutzt und skaliert mit der Last.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Machine Learning in Azure eignet sich, wenn datengetriebene Vorhersagen oder Erkennungen gebraucht werden, ohne dass eine eigene ML-Infrastruktur entstehen soll.",
        ],
        bullets: [
          "Nachfrage-, Absatz- oder Bedarfsprognosen auf Basis historischer Daten",
          "Klassifizierung, etwa von Dokumenten, Anfragen oder Qualitätsmerkmalen",
          "Anomalie- und Mustererkennung in operativen oder Sensordaten",
          "Skalierbare, verwaltete Infrastruktur statt eigener Server und Bibliotheken",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Machine Learning in Azure ist die Plattform zum Entwickeln und Betreiben von Modellen. MLOps ist die Disziplin, die deren verlässlichen Betrieb sicherstellt, und nutzt diese Plattform. Azure Databricks dient als leistungsfähige Umgebung für große Datenmengen und Feature-Aufbereitung und lässt sich mit Azure Machine Learning kombinieren. Power BI visualisiert die Ergebnisse, ist aber selbst kein ML-Werkzeug.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit setzt Machine-Learning-Lösungen im Azure-Umfeld pragmatisch und am Geschäftsnutzen orientiert um. Im Vordergrund steht nicht das größtmögliche Modell, sondern eine verlässliche, betreibbare Lösung, die sich sauber in vorhandene Datenplattformen und Reporting einfügt.",
        ],
      },
    ],
    faq: [
      { question: "Braucht man für Machine Learning in Azure tiefe Data-Science-Kenntnisse?", answer: "Nicht zwingend. Mit Automated Machine Learning lassen sich erste Modelle ohne tiefen Code erstellen. Für anspruchsvollere Anwendungen sind Data-Science-Kenntnisse hilfreich, die smiit einbringen kann." },
      { question: "Was kostet Machine Learning in Azure?", answer: "Die Kosten richten sich vor allem nach der genutzten Rechenleistung und Speicherung. Da Ressourcen bedarfsgesteuert skalieren, lassen sich Kosten an die tatsächliche Nutzung anpassen." },
      { question: "Wie verhält sich Azure Machine Learning zu Azure Databricks?", answer: "Azure Databricks ist besonders stark bei der Verarbeitung großer Datenmengen und der Feature-Aufbereitung, Azure Machine Learning beim Trainieren, Verwalten und Bereitstellen von Modellen. Beide lassen sich kombinieren." },
      { question: "Welche Daten brauchen wir, um sinnvoll mit Machine Learning zu starten?", answer: "Nötig sind ausreichend viele, verlässliche historische Daten zum jeweiligen Anwendungsfall sowie eine klare Fragestellung. Eine saubere, integrierte Datenbasis, etwa aus einem Data Warehouse oder Lakehouse, ist oft wichtiger für den Erfolg als die Wahl des Modells." },
      { question: "Bleiben unsere Daten beim Training in Azure unter unserer Kontrolle?", answer: "Ja. Daten und Modelle liegen in der eigenen Azure-Umgebung, deren Region, Zugriffe und Verschlüsselung das Unternehmen steuert. Über Identitäts- und Berechtigungskonzepte lässt sich festlegen, wer auf Daten und Modelle zugreifen darf." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "Machine Learning in Azure: Definition & Praxis | smiit Glossar",
    metaDescription: "Machine Learning in Azure einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu MLOps und Azure Databricks – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "machine-learning-azure",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Machine learning in Azure",
    title: "What is machine learning in Azure?",
    shortDefinition:
      "Machine learning in Azure refers to the development, training and operation of machine learning models on the Microsoft Azure cloud, primarily with the Azure Machine Learning service. Companies use it to derive predictions, classifications or detections from their data without having to run their own ML infrastructure.",
    synonyms: ["Azure ML", "Azure Machine Learning", "ML in Azure", "Azure AI"],
    sections: [
      {
        heading: "Where machine learning in Azure is used",
        paragraphs: [
          "Azure Machine Learning provides a managed environment in which data is prepared, models are trained, evaluated and deployed as endpoints. Instead of maintaining their own servers and libraries, teams use scalable compute, ready-made tools and an end-to-end platform from data connection to deployment.",
          "The platform covers different approaches, from assisted automated machine learning to classic model training with Python and familiar libraries, to integration with Azure Databricks for large data volumes. Across operation, MLOps practices can be applied.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A company wants to predict expected demand per region from historical order data. In Azure the data is connected from the lakehouse, a model is trained and deployed as an endpoint that a report or application queries. Compute is used only on demand and scales with the load.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Machine learning in Azure is suitable when data-driven predictions or detections are needed without building one's own ML infrastructure.",
        ],
        bullets: [
          "Demand, sales or capacity forecasts based on historical data",
          "Classification, for example of documents, requests or quality features",
          "Anomaly and pattern detection in operational or sensor data",
          "Scalable, managed infrastructure instead of self-run servers and libraries",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Machine learning in Azure is the platform for developing and operating models. MLOps is the discipline that ensures their reliable operation and uses this platform. Azure Databricks serves as a powerful environment for large data volumes and feature preparation and can be combined with Azure Machine Learning. Power BI visualizes the results but is not itself an ML tool.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit implements machine learning solutions in the Azure ecosystem pragmatically and oriented towards business value. The focus is not on the largest possible model but on a reliable, operable solution that fits cleanly into existing data platforms and reporting.",
        ],
      },
    ],
    faq: [
      { question: "Do you need deep data science skills for machine learning in Azure?", answer: "Not necessarily. With automated machine learning, first models can be created without deep code. For more demanding applications, data science skills are helpful, which smiit can contribute." },
      { question: "What does machine learning in Azure cost?", answer: "Costs depend mainly on the compute and storage used. Since resources scale on demand, costs can be aligned with actual usage." },
      { question: "How does Azure Machine Learning relate to Azure Databricks?", answer: "Azure Databricks is particularly strong at processing large data volumes and feature preparation, while Azure Machine Learning excels at training, managing and deploying models. The two can be combined." },
      { question: "What data do we need to start meaningfully with machine learning?", answer: "You need enough reliable historical data for the use case in question, plus a clear question to answer. A clean, integrated data basis, for example from a data warehouse or lakehouse, is often more important to success than the choice of model." },
      { question: "Does our data stay under our control during training in Azure?", answer: "Yes. Data and models reside in your own Azure environment, whose region, access and encryption the company controls. Identity and permission concepts let you define who may access data and models." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "Machine learning in Azure explained | smiit glossary",
    metaDescription: "Machine learning in Azure explained simply: definition, how it works, use cases and how it differs from MLOps and Azure Databricks – with practical insight from smiit.",
  },
}

const datenmodellierung: LocalizedGlossaryTerm = {
  de: {
    slug: "data-modeling",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Datenmodellierung (Inmon, Kimball, Data Vault)",
    title: "Was ist Datenmodellierung (Inmon, Kimball, Data Vault)?",
    shortDefinition:
      "Datenmodellierung ist der strukturierte Entwurf, wie Daten in einem Data Warehouse oder Lakehouse organisiert, in Beziehung gesetzt und gespeichert werden. Die drei verbreitetsten Ansätze sind Inmon (normalisierter Unternehmenskern), Kimball (dimensionale Sternschemata für Reporting) und Data Vault (flexibler, historisierter Integrationsansatz).",
    synonyms: ["Data Modeling", "Datenmodell", "dimensionale Modellierung", "Sternschema", "Faktentabelle", "Dimensionstabelle", "Fact Table"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Datenmodellierung genutzt?",
        paragraphs: [
          "Datenmodellierung legt fest, in welchen Tabellen und Beziehungen Daten abgelegt werden, damit sie verständlich, konsistent und performant abfragbar sind. Ein gutes Modell entscheidet maßgeblich darüber, wie schnell und verlässlich später Berichte und Analysen entstehen.",
          "Die drei Ansätze setzen unterschiedliche Schwerpunkte. Inmon (Top-down) baut zuerst einen stark normalisierten, unternehmensweiten Kern und leitet daraus fachliche Data Marts ab; das fördert Konsistenz, ist aber aufwändiger im Aufbau. Kimball (Bottom-up) modelliert dimensional in Stern- oder Schneeflockenschemata mit Faktentabellen und Dimensionen; das ist direkt reporting- und Power-BI-freundlich. Data Vault trennt Hubs (Geschäftsschlüssel), Links (Beziehungen) und Satellites (beschreibende, historisierte Attribute); das ist besonders flexibel, gut historisierbar und robust gegenüber Quelländerungen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "In der Datenplattform der dy Project AG, einem Großbauprojekt mit über 1 Mrd. CHF Volumen, wurden Daten aus SQL Server, Excel und REST-APIs auf Azure Databricks integriert. Ein Data-Vault-naher Ansatz hilft, viele wechselnde Quellen flexibel und historisiert zu integrieren, während die für Power BI bereitgestellte Gold-Schicht dimensional im Kimball-Stil modelliert wird, damit Berichte performant und verständlich bleiben.",
        ],
      },
      {
        heading: "Faktentabellen & Dimensionen",
        paragraphs: [
          "Im dimensionalen Modell (Kimball) sind zwei Tabellentypen zentral:",
        ],
        bullets: [
          "Faktentabelle (Fact Table): enthält die messbaren Kennzahlen eines Geschäftsvorgangs – etwa Umsatz, Menge oder Kosten – samt Verweisen auf die zugehörigen Dimensionen.",
          "Dimensionstabelle (Dimension): liefert den beschreibenden Kontext, nach dem ausgewertet wird – z. B. Zeit, Kunde, Produkt oder Region. Dimensionen beantworten das „nach was?“ einer Auswertung.",
          "Sternschema: die Anordnung, bei der eine zentrale Faktentabelle direkt mit mehreren Dimensionstabellen verbunden ist – einfach, performant und für Power BI ideal.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Die drei Ansätze schließen sich nicht aus, sondern werden oft kombiniert: Data Vault für die flexible, historisierte Integration vieler Quellen, ein dimensionales Kimball-Modell für die reporting-nahe Auslieferungsschicht, Inmon als Leitidee eines konsistenten Unternehmenskerns. Sie sind eine Ebene unterhalb der Architekturidee, etwa der Medallion-Architektur, die festlegt, in welchen Stufen Daten veredelt werden. smiit wählt den Ansatz nach Quellenlage, Änderungsdynamik und Reporting-Anforderungen und kombiniert sie pragmatisch, statt dogmatisch einem Lager zu folgen.",
        ],
      },
    ],
    faq: [
      { question: "Welcher Modellierungsansatz ist der beste?", answer: "Es gibt kein generelles Bestes. Kimball ist reporting-freundlich, Data Vault stark bei vielen, sich ändernden Quellen und Historisierung, Inmon liefert einen konsistenten Unternehmenskern. In der Praxis werden sie oft kombiniert." },
      { question: "Was ist der Unterschied zwischen Kimball und Data Vault?", answer: "Kimball modelliert dimensional in Sternschemata für direktes Reporting. Data Vault trennt Hubs, Links und Satellites für flexible, historisierte Integration und wird häufig als Schicht vor einem dimensionalen Modell genutzt." },
      { question: "Was sind Faktentabelle und Dimension einfach erklärt?", answer: "Eine Faktentabelle enthält die messbaren Werte eines Geschäftsvorgangs, etwa Umsatz oder Menge. Eine Dimension liefert den beschreibenden Kontext, nach dem ausgewertet wird, etwa Zeit, Kunde oder Produkt. Im Sternschema verbindet eine zentrale Faktentabelle direkt mehrere Dimensionen." },
      { question: "Wie hängen Datenmodellierung und Medallion-Architektur zusammen?", answer: "Die Medallion-Architektur legt fest, in welchen Stufen (Bronze, Silver, Gold) Daten veredelt werden, die Datenmodellierung legt fest, wie die Tabellen innerhalb dieser Stufen strukturiert sind. In der Praxis wird die für Reporting bestimmte Gold-Schicht oft dimensional modelliert." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Datenmodellierung: Inmon, Kimball & Data Vault | smiit Glossar",
    metaDescription: "Datenmodellierung einfach erklärt: Inmon, Kimball und Data Vault im Vergleich, Anwendungsfälle und Bezug zur Medallion-Architektur – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-modeling",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data modeling (Inmon, Kimball, Data Vault)",
    title: "What is data modeling (Inmon, Kimball, Data Vault)?",
    shortDefinition:
      "Data modeling is the structured design of how data is organized, related and stored in a data warehouse or lakehouse. The three most common approaches are Inmon (a normalized enterprise core), Kimball (dimensional star schemas for reporting) and Data Vault (a flexible, historized integration approach).",
    synonyms: ["data modeling", "dimensional modeling", "star schema", "fact table", "dimension table"],
    sections: [
      {
        heading: "Where data modeling is used",
        paragraphs: [
          "Data modeling defines which tables and relationships data is stored in so that it is understandable, consistent and fast to query. A good model largely determines how quickly and reliably reports and analyses can later be built.",
          "The three approaches set different priorities. Inmon (top-down) first builds a highly normalized, enterprise-wide core and derives subject-specific data marts from it; this promotes consistency but is more effort to build. Kimball (bottom-up) models dimensionally in star or snowflake schemas with fact tables and dimensions; this is directly reporting- and Power BI-friendly. Data Vault separates hubs (business keys), links (relationships) and satellites (descriptive, historized attributes); this is especially flexible, well suited to historization and robust against source changes.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "In the dy Project AG data platform, a large construction project worth over 1 billion CHF, data from SQL Server, Excel and REST APIs was integrated on Azure Databricks. A Data Vault-like approach helps integrate many changing sources flexibly and with history, while the gold layer provided for Power BI is modeled dimensionally in the Kimball style so that reports stay fast and understandable.",
        ],
      },
      {
        heading: "Fact tables & dimensions",
        paragraphs: [
          "Two table types are central to the dimensional (Kimball) model:",
        ],
        bullets: [
          "Fact table: holds the measurable metrics of a business event — such as revenue, quantity or cost — together with references to the related dimensions.",
          "Dimension (dimension table): provides the descriptive context you analyze by — e.g. time, customer, product or region. Dimensions answer the by what of an analysis.",
          "Star schema: the layout where one central fact table connects directly to several dimension tables — simple, performant and ideal for Power BI.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "The three approaches are not mutually exclusive but are often combined: Data Vault for flexible, historized integration of many sources, a dimensional Kimball model for the reporting-facing delivery layer, and Inmon as the guiding idea of a consistent enterprise core. They sit one level below the architectural idea, such as the medallion architecture, which defines in which stages data is refined. smiit chooses the approach based on source landscape, rate of change and reporting requirements and combines them pragmatically rather than following one camp dogmatically.",
        ],
      },
    ],
    faq: [
      { question: "Which modeling approach is the best?", answer: "There is no universal best. Kimball is reporting-friendly, Data Vault is strong with many changing sources and historization, and Inmon delivers a consistent enterprise core. In practice they are often combined." },
      { question: "What is the difference between Kimball and Data Vault?", answer: "Kimball models dimensionally in star schemas for direct reporting. Data Vault separates hubs, links and satellites for flexible, historized integration and is often used as a layer before a dimensional model." },
      { question: "What are a fact table and a dimension in simple terms?", answer: "A fact table holds the measurable values of a business event, such as revenue or quantity. A dimension provides the descriptive context you analyze by, such as time, customer or product. In a star schema, one central fact table connects directly to several dimensions." },
      { question: "How do data modeling and the medallion architecture relate?", answer: "The medallion architecture defines in which stages (bronze, silver, gold) data is refined, while data modeling defines how the tables within those stages are structured. In practice the gold layer intended for reporting is often modeled dimensionally." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data modeling: Inmon, Kimball & Data Vault | smiit glossary",
    metaDescription: "Data modeling explained simply: Inmon, Kimball and Data Vault compared, use cases and the link to the medallion architecture – with practical insight from smiit.",
  },
}

const medallionArchitektur: LocalizedGlossaryTerm = {
  de: {
    slug: "medallion-architecture",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Medallion-Architektur (Bronze/Silver/Gold)",
    title: "Was ist die Medallion-Architektur (Bronze/Silver/Gold)?",
    shortDefinition:
      "Die Medallion-Architektur ist ein Schichtenmodell für die Datenveredelung in einem Lakehouse, das Daten stufenweise von roh zu analysefertig aufbereitet. Die drei Stufen Bronze (Rohdaten), Silver (bereinigt und integriert) und Gold (für Reporting und Analyse aufbereitet) machen den Datenfluss nachvollziehbar und wiederverwendbar.",
    synonyms: ["Medaillon-Architektur", "Bronze Silver Gold", "Multi-Hop-Architektur", "Lakehouse-Schichten"],
    sections: [
      {
        heading: "Einordnung: Wofür wird die Medallion-Architektur genutzt?",
        paragraphs: [
          "Die Medallion-Architektur strukturiert, in welchen Schritten Daten von der Quelle bis zum fertigen Bericht veredelt werden. Bronze enthält die Rohdaten möglichst unverändert (gut für Nachvollziehbarkeit und erneute Verarbeitung). Silver bereinigt, harmonisiert und verknüpft die Daten zu einer verlässlichen, integrierten Schicht. Gold stellt die für konkrete Anwendungsfälle aufbereiteten, oft dimensional modellierten Tabellen bereit, auf denen Power BI direkt aufsetzt.",
          "Dieses Vorgehen wird vor allem in Lakehouse-Umgebungen wie Azure Databricks oder Microsoft Fabric genutzt und verbindet sich gut mit Datenmodellierungsansätzen und Governance.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "In der Datenplattform der dy Project AG, einem Großbauprojekt mit über 1 Mrd. CHF Volumen, landeten Daten aus SQL Server, Excel und REST-APIs zunächst unverändert in der Bronze-Schicht. In Silver wurden sie bereinigt, vereinheitlicht und verknüpft, in Gold dann zu performanten, geprüften Tabellen für das Power-BI-Reporting aufbereitet. So blieb jederzeit nachvollziehbar, welche Zahl auf welchen Rohdaten beruht.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Die Medallion-Architektur ist ein Schichtungsprinzip, kein Datenmodell. Sie legt fest, in welchen Stufen veredelt wird, während Ansätze wie Kimball oder Data Vault festlegen, wie die Tabellen innerhalb der Schichten strukturiert sind. Sie ist eine moderne Ausprägung von ETL/ELT im Lakehouse und unterstützt Data Governance, weil geprüfte und ungeprüfte Daten klar getrennt sind. smiit setzt die Medallion-Architektur als Standardvorgehen für Lakehouse-Projekte ein, weil sie Nachvollziehbarkeit, Wiederverwendbarkeit und saubere Verantwortlichkeiten fördert.",
        ],
      },
    ],
    faq: [
      { question: "Was bedeuten Bronze, Silver und Gold?", answer: "Bronze ist die Rohdatenschicht möglichst unverändert, Silver die bereinigte und integrierte Schicht, Gold die für Reporting und Analyse aufbereitete Schicht, auf der Werkzeuge wie Power BI direkt aufsetzen." },
      { question: "Ist die Medallion-Architektur dasselbe wie ETL?", answer: "Nicht ganz. Die Medallion-Architektur ist ein Schichtungsmuster für die stufenweise Veredelung im Lakehouse. ETL beziehungsweise ELT beschreibt den eigentlichen Extraktions-, Transformations- und Ladeprozess, der die Schichten befüllt." },
      { question: "Müssen es immer genau drei Schichten sein?", answer: "Drei Schichten (Bronze, Silver, Gold) sind das verbreitete Grundmuster, aber kein Dogma. Je nach Bedarf können Zwischenstufen ergänzt oder bei einfachen Fällen Schichten zusammengefasst werden. Entscheidend ist das Prinzip der nachvollziehbaren, stufenweisen Veredelung." },
      { question: "Welche Plattform braucht man für eine Medallion-Architektur?", answer: "Sie wird typischerweise in einem Lakehouse umgesetzt, etwa auf Azure Databricks oder Microsoft Fabric, oft auf Basis offener Tabellenformate wie Delta Lake. Das Prinzip der gestuften Veredelung lässt sich aber auch in klassischen Data-Warehouse-Umgebungen anwenden." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Medallion-Architektur (Bronze/Silver/Gold) erklärt | smiit Glossar",
    metaDescription: "Medallion-Architektur einfach erklärt: Bronze, Silver und Gold, Anwendungsfälle und Abgrenzung zu ETL und Datenmodellierung – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "medallion-architecture",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Medallion architecture (bronze/silver/gold)",
    title: "What is the medallion architecture (bronze/silver/gold)?",
    shortDefinition:
      "The medallion architecture is a layered model for refining data in a lakehouse that prepares data step by step from raw to analysis-ready. The three layers bronze (raw data), silver (cleansed and integrated) and gold (prepared for reporting and analysis) make the data flow traceable and reusable.",
    synonyms: ["bronze silver gold", "multi-hop architecture", "lakehouse layers"],
    sections: [
      {
        heading: "Where the medallion architecture is used",
        paragraphs: [
          "The medallion architecture structures the steps in which data is refined from source to finished report. Bronze holds the raw data as unchanged as possible (good for traceability and reprocessing). Silver cleanses, harmonizes and joins the data into a reliable, integrated layer. Gold provides the tables prepared for specific use cases, often dimensionally modeled, on which Power BI builds directly.",
          "This approach is used above all in lakehouse environments such as Azure Databricks or Microsoft Fabric and combines well with data modeling approaches and governance.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "In the dy Project AG data platform, a large construction project worth over 1 billion CHF, data from SQL Server, Excel and REST APIs first landed unchanged in the bronze layer. In silver it was cleansed, unified and joined, and in gold it was then prepared into fast, validated tables for Power BI reporting. This kept it traceable at all times which figure was based on which raw data.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "The medallion architecture is a layering principle, not a data model. It defines in which stages data is refined, while approaches such as Kimball or Data Vault define how the tables within the layers are structured. It is a modern expression of ETL/ELT in the lakehouse and supports data governance because validated and unvalidated data are clearly separated. smiit uses the medallion architecture as a standard approach for lakehouse projects because it promotes traceability, reusability and clean responsibilities.",
        ],
      },
    ],
    faq: [
      { question: "What do bronze, silver and gold mean?", answer: "Bronze is the raw data layer kept as unchanged as possible, silver is the cleansed and integrated layer, and gold is the layer prepared for reporting and analysis on which tools such as Power BI build directly." },
      { question: "Is the medallion architecture the same as ETL?", answer: "Not quite. The medallion architecture is a layering pattern for step-by-step refinement in the lakehouse. ETL or ELT describes the actual extraction, transformation and loading process that fills the layers." },
      { question: "Does it always have to be exactly three layers?", answer: "Three layers (bronze, silver, gold) are the common base pattern, but not a dogma. Depending on needs, intermediate stages can be added or, in simple cases, layers merged. What matters is the principle of traceable, step-by-step refinement." },
      { question: "What platform do you need for a medallion architecture?", answer: "It is typically implemented in a lakehouse, for example on Azure Databricks or Microsoft Fabric, often based on open table formats such as Delta Lake. The principle of staged refinement can, however, also be applied in classic data warehouse environments." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Medallion architecture (bronze/silver/gold) | smiit glossary",
    metaDescription: "Medallion architecture explained simply: bronze, silver and gold, use cases and how it differs from ETL and data modeling – with practical insight from smiit.",
  },
}

const powerQuery: LocalizedGlossaryTerm = {
  de: {
    slug: "power-query",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Power Query",
    title: "Was ist Power Query?",
    shortDefinition:
      "Power Query ist die Datenvorbereitungs- und Transformationskomponente in Power BI und Excel, mit der Daten aus verschiedenen Quellen verbunden, bereinigt und umgeformt werden. Die Schritte werden aufgezeichnet und sind wiederholbar, sodass sich Datenaufbereitung automatisieren lässt, statt sie manuell zu wiederholen.",
    synonyms: ["Power Query Editor", "M (Power Query M)", "Get & Transform", "Datentransformation"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Power Query genutzt?",
        paragraphs: [
          "Power Query übernimmt das Extrahieren und Transformieren von Daten, also einen Teil eines klassischen ETL-Prozesses. Anwender verbinden sich mit Quellen wie Excel, SQL-Datenbanken, REST-APIs oder CRM-Systemen, bereinigen die Daten (Spalten entfernen, Typen festlegen, Werte ersetzen), führen Tabellen zusammen und formen sie in eine für die Analyse passende Struktur.",
          "Alle Schritte werden in der Sprache M festgehalten und bei jeder Aktualisierung erneut ausgeführt. Dadurch entsteht eine wiederholbare, dokumentierte Aufbereitung, die manuelle Excel-Handgriffe ersetzt.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Power Query wird überall dort genutzt, wo Daten vor der Analyse regelmäßig aufbereitet werden müssen.",
        ],
        bullets: [
          "Mehrere Excel-Dateien oder Tabellenblätter automatisch zusammenführen",
          "Daten aus Datenbanken oder APIs anbinden und bereinigen",
          "Spalten umbenennen, Typen setzen und fehlerhafte Werte bereinigen",
          "Wiederkehrende Aufbereitung automatisieren statt manuell zu wiederholen",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Power Query ist die Transformationskomponente vor dem Datenmodell, nicht die Berechnungssprache; für Kennzahlen im Modell kommt DAX zum Einsatz. Bei größeren Datenmengen oder vielen Quellen wird die Aufbereitung sinnvollerweise in eine zentrale Datenplattform wie ein Data Warehouse oder Lakehouse verlagert, etwa mit ETL/ELT-Strecken. In der Datenplattform der dy Project AG wurde die schwere Aufbereitung auf Azure Databricks erledigt, während Power Query in Power BI für leichtere, berichtsnahe Anpassungen genutzt wird. smiit setzt Power Query gezielt dort ein, wo es schlank und wartbar bleibt.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Power Query und DAX?", answer: "Power Query bereitet die Daten vor dem Laden ins Modell auf (verbinden, bereinigen, umformen). DAX berechnet Kennzahlen und Aggregationen innerhalb des fertigen Datenmodells." },
      { question: "Gibt es Power Query auch in Excel?", answer: "Ja. Power Query ist sowohl in Power BI als auch in Excel verfügbar (dort als Abrufen und Transformieren) und nutzt dieselbe Sprache M, sodass sich Wissen übertragen lässt." },
      { question: "Muss man die Sprache M beherrschen, um Power Query zu nutzen?", answer: "Für die meisten Aufgaben nicht. Der grafische Editor erzeugt die M-Schritte automatisch, während man Spalten bereinigt, Tabellen zusammenführt oder Typen setzt. M-Kenntnisse helfen erst bei fortgeschrittenen oder wiederverwendbaren Transformationen." },
      { question: "Wann stößt Power Query an seine Grenzen?", answer: "Bei sehr großen Datenmengen, vielen Quellen oder komplexen Verarbeitungen kann die Aufbereitung in Power Query langsam und schwer wartbar werden. Dann ist es sinnvoll, die schwere Transformation in eine zentrale Datenplattform wie ein Data Warehouse oder Lakehouse zu verlagern und Power Query nur für leichte, berichtsnahe Anpassungen zu nutzen." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist Power Query? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription: "Power Query einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu DAX und ETL – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "power-query",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Power Query",
    title: "What is Power Query?",
    shortDefinition:
      "Power Query is the data preparation and transformation component in Power BI and Excel, used to connect, cleanse and reshape data from various sources. The steps are recorded and repeatable, so data preparation can be automated rather than repeated manually.",
    synonyms: ["Power Query Editor", "M (Power Query M)", "Get & Transform", "data transformation"],
    sections: [
      {
        heading: "Where Power Query is used",
        paragraphs: [
          "Power Query handles the extraction and transformation of data, that is part of a classic ETL process. Users connect to sources such as Excel, SQL databases, REST APIs or CRM systems, cleanse the data (remove columns, set types, replace values), join tables and reshape them into a structure suited to analysis.",
          "All steps are captured in the M language and re-run on every refresh. This creates a repeatable, documented preparation that replaces manual Excel handwork.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "Power Query is used wherever data needs to be prepared regularly before analysis.",
        ],
        bullets: [
          "Automatically combine multiple Excel files or worksheets",
          "Connect to and cleanse data from databases or APIs",
          "Rename columns, set types and clean up erroneous values",
          "Automate recurring preparation instead of repeating it manually",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Power Query is the transformation component before the data model, not the calculation language; for metrics in the model, DAX is used. With larger data volumes or many sources, preparation is sensibly moved into a central data platform such as a data warehouse or lakehouse, for example with ETL/ELT pipelines. In the dy Project AG data platform, the heavy preparation was done on Azure Databricks, while Power Query in Power BI is used for lighter, report-facing adjustments. smiit uses Power Query specifically where it stays lean and maintainable.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between Power Query and DAX?", answer: "Power Query prepares the data before it is loaded into the model (connect, cleanse, reshape). DAX calculates metrics and aggregations within the finished data model." },
      { question: "Is Power Query also available in Excel?", answer: "Yes. Power Query is available in both Power BI and Excel (there as Get & Transform) and uses the same M language, so knowledge transfers between them." },
      { question: "Do you have to know the M language to use Power Query?", answer: "For most tasks, no. The graphical editor generates the M steps automatically as you clean columns, merge tables or set types. Knowledge of M only becomes helpful for advanced or reusable transformations." },
      { question: "When does Power Query reach its limits?", answer: "With very large data volumes, many sources or complex processing, preparation in Power Query can become slow and hard to maintain. It then makes sense to move the heavy transformation into a central data platform such as a data warehouse or lakehouse and use Power Query only for light, report-facing adjustments." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Power Query: definition & practice | smiit glossary",
    metaDescription: "Power Query explained simply: definition, how it works, use cases and how it differs from DAX and ETL – with practical insight from smiit.",
  },
}

const dax: LocalizedGlossaryTerm = {
  de: {
    slug: "dax",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "DAX (Data Analysis Expressions)",
    title: "Was ist DAX (Data Analysis Expressions)?",
    shortDefinition:
      "DAX (Data Analysis Expressions) ist die Formelsprache von Power BI, Analysis Services und Power Pivot, mit der Kennzahlen und berechnete Spalten im Datenmodell definiert werden. Mit DAX werden Aggregationen, Zeitvergleiche und kontextabhängige Berechnungen erstellt, die in Berichten dynamisch auf Filter reagieren.",
    synonyms: ["Data Analysis Expressions", "DAX-Formeln", "Measures"],
    sections: [
      {
        heading: "Einordnung: Wofür wird DAX genutzt?",
        paragraphs: [
          "DAX berechnet Kennzahlen innerhalb eines fertigen Datenmodells, etwa Umsatz, Marge, Vorjahresvergleiche oder gleitende Durchschnitte. Anders als eine einfache Excel-Formel berücksichtigt DAX den Auswertungskontext: Eine Kennzahl liefert je nach gewähltem Filter, Zeitraum oder Segment automatisch das passende Ergebnis.",
          "Zentrales Konzept ist der Unterschied zwischen Measures (zur Abfragezeit berechnet, sehr flexibel) und berechneten Spalten (beim Laden berechnet, im Modell gespeichert). Funktionen wie CALCULATE steuern dabei den Filterkontext und sind das Herzstück fortgeschrittener DAX-Berechnungen.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "DAX kommt überall dort zum Einsatz, wo Berichte mehr als reine Summen brauchen.",
        ],
        bullets: [
          "Kennzahlen wie Umsatz, Marge oder Auslastung als wiederverwendbare Measures",
          "Zeitintelligenz: Vorjahresvergleich, Year-to-Date, gleitende Durchschnitte",
          "Kontextabhängige Berechnungen, die auf Filter und Slicer reagieren",
          "Verhältnis- und Anteilskennzahlen über mehrere Dimensionen hinweg",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "DAX ist die Berechnungssprache im Modell, nicht die Datenaufbereitung; das Verbinden und Umformen der Daten übernimmt Power Query, die zugrunde liegende Datenschicht ist das Semantic Model. Gut modellierte Daten (etwa ein sauberes Sternschema) machen DAX deutlich einfacher und schneller. In der Datenplattform der dy Project AG sorgen klar definierte DAX-Kennzahlen dafür, dass alle Berichte dieselben Definitionen verwenden. smiit legt Wert auf nachvollziehbare, performante DAX-Measures statt auf verschachtelte Einzelformeln, die niemand mehr wartet.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen einem Measure und einer berechneten Spalte?", answer: "Ein Measure wird zur Abfragezeit im jeweiligen Filterkontext berechnet und ist sehr flexibel. Eine berechnete Spalte wird beim Laden berechnet und im Modell gespeichert, was mehr Speicher braucht und weniger dynamisch ist." },
      { question: "Ist DAX schwer zu lernen?", answer: "Die Grundlagen sind schnell erlernbar, ähnlich wie Excel-Formeln. Anspruchsvoll wird DAX beim Filterkontext und Funktionen wie CALCULATE; hier hilft ein sauberes Datenmodell und Erfahrung, wie sie smiit einbringt." },
      { question: "Was ist der Unterschied zwischen Power Query und DAX?", answer: "Power Query bereitet die Daten vor dem Laden ins Modell auf, also verbinden, bereinigen und umformen. DAX berechnet anschließend Kennzahlen und Aggregationen innerhalb des fertigen Datenmodells. Beide ergänzen sich, lösen aber unterschiedliche Aufgaben." },
      { question: "Warum ist ein gutes Datenmodell für DAX wichtig?", answer: "DAX berechnet im Kontext der Tabellen und Beziehungen des Modells. Ein sauberes Sternschema mit klaren Beziehungen macht Measures einfacher, schneller und besser nachvollziehbar, während ein unübersichtliches Modell zu komplizierten Formeln und Performanceproblemen führt." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist DAX? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription: "DAX einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Power Query und Semantic Model – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "dax",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "DAX (Data Analysis Expressions)",
    title: "What is DAX (Data Analysis Expressions)?",
    shortDefinition:
      "DAX (Data Analysis Expressions) is the formula language of Power BI, Analysis Services and Power Pivot, used to define metrics and calculated columns in the data model. With DAX, aggregations, time comparisons and context-dependent calculations are created that respond dynamically to filters in reports.",
    synonyms: ["Data Analysis Expressions", "DAX formulas", "measures"],
    sections: [
      {
        heading: "Where DAX is used",
        paragraphs: [
          "DAX calculates metrics within a finished data model, such as revenue, margin, year-over-year comparisons or moving averages. Unlike a simple Excel formula, DAX takes the evaluation context into account: a metric automatically returns the appropriate result depending on the selected filter, period or segment.",
          "A central concept is the difference between measures (calculated at query time, very flexible) and calculated columns (computed on load, stored in the model). Functions such as CALCULATE control the filter context and are the heart of advanced DAX calculations.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "DAX is used wherever reports need more than plain sums.",
        ],
        bullets: [
          "Metrics such as revenue, margin or utilization as reusable measures",
          "Time intelligence: year-over-year, year-to-date, moving averages",
          "Context-dependent calculations that respond to filters and slicers",
          "Ratio and share metrics across multiple dimensions",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "DAX is the calculation language in the model, not the data preparation; connecting and reshaping the data is done by Power Query, and the underlying data layer is the semantic model. Well-modeled data (such as a clean star schema) makes DAX considerably simpler and faster. In the dy Project AG data platform, clearly defined DAX metrics ensure that all reports use the same definitions. smiit values traceable, performant DAX measures over nested one-off formulas that no one maintains anymore.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between a measure and a calculated column?", answer: "A measure is calculated at query time in the respective filter context and is very flexible. A calculated column is computed on load and stored in the model, which uses more memory and is less dynamic." },
      { question: "Is DAX hard to learn?", answer: "The basics are quick to learn, similar to Excel formulas. DAX becomes demanding with the filter context and functions such as CALCULATE; here a clean data model and experience, such as smiit contributes, help." },
      { question: "What is the difference between Power Query and DAX?", answer: "Power Query prepares the data before it is loaded into the model, that is connecting, cleansing and reshaping. DAX then calculates metrics and aggregations within the finished data model. The two complement each other but solve different tasks." },
      { question: "Why is a good data model important for DAX?", answer: "DAX calculates in the context of the model's tables and relationships. A clean star schema with clear relationships makes measures simpler, faster and easier to follow, whereas a tangled model leads to complicated formulas and performance problems." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "What is DAX? Definition, benefits & practice | smiit glossary",
    metaDescription: "DAX explained simply: definition, how it works, use cases and how it differs from Power Query and the semantic model – with practical insight from smiit.",
  },
}

const semanticModel: LocalizedGlossaryTerm = {
  de: {
    slug: "semantic-model",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Semantic Model (Power BI Dataset)",
    title: "Was ist ein Semantic Model (Power BI Dataset)?",
    shortDefinition:
      "Ein Semantic Model, früher als Power BI Dataset bezeichnet, ist die semantische Datenschicht in Power BI, die Tabellen, Beziehungen, Kennzahlen und Berechtigungen bündelt. Es bildet die wiederverwendbare Grundlage, auf der mehrere Berichte mit einheitlichen Definitionen aufsetzen.",
    synonyms: ["Power BI Dataset", "Datenmodell", "Power BI Semantic Model", "Tabular Model"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ein Semantic Model genutzt?",
        paragraphs: [
          "Das Semantic Model ist die Schicht zwischen den Rohdaten und den Berichten. Es enthält die geladenen Tabellen, deren Beziehungen, die mit DAX definierten Kennzahlen sowie Sicherheitsregeln wie Row-Level Security. Berichte greifen nicht direkt auf Quelldaten zu, sondern auf dieses Modell, wodurch Kennzahlen und Definitionen über alle Berichte hinweg einheitlich bleiben.",
          "Ein zentral gepflegtes Semantic Model kann von vielen Berichten und Nutzern wiederverwendet werden. Das vermeidet, dass dieselbe Kennzahl in zehn Berichten unterschiedlich berechnet wird, und macht das Modell zu einer gemeinsamen Datenwahrheit innerhalb von Power BI.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Ein Semantic Model lohnt sich überall dort, wo mehrere Berichte oder Teams auf konsistente Kennzahlen angewiesen sind.",
        ],
        bullets: [
          "Ein zentrales Modell als Grundlage für viele Berichte und Dashboards",
          "Einheitliche Kennzahlen-Definitionen über Abteilungen hinweg",
          "Zentral gepflegte Berechtigungen, etwa über Row-Level Security",
          "Wiederverwendung statt redundanter Modelle in jedem einzelnen Bericht",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Das Semantic Model ist die Modellschicht in Power BI, nicht das Data Warehouse darunter und nicht der Bericht darüber. Power Query befüllt es, DAX definiert seine Kennzahlen, Row-Level Security regelt die Sichtbarkeit. Bei großen Datenmengen empfiehlt sich ein vorgelagertes Data Warehouse oder Lakehouse als Datenquelle des Modells. In der Datenplattform der dy Project AG setzt das Semantic Model auf der Gold-Schicht auf und stellt geprüfte Kennzahlen bereit. smiit baut Semantic Models so, dass sie performant, wiederverwendbar und im Alltag wartbar bleiben.",
        ],
      },
    ],
    faq: [
      { question: "Warum heißt das Power BI Dataset jetzt Semantic Model?", answer: "Microsoft hat den Begriff Dataset in Semantic Model umbenannt, um klarzustellen, dass es sich um eine semantische Datenschicht mit Beziehungen, Kennzahlen und Berechtigungen handelt und nicht nur um eine reine Datentabelle." },
      { question: "Können mehrere Berichte dasselbe Semantic Model nutzen?", answer: "Ja. Genau das ist der Vorteil: Ein zentral gepflegtes Semantic Model versorgt viele Berichte mit denselben Kennzahlen und Definitionen, was Konsistenz schafft und Doppelarbeit vermeidet." },
      { question: "Was ist der Unterschied zwischen einem Semantic Model und einem Data Warehouse?", answer: "Das Data Warehouse speichert die aufbereiteten Daten, das Semantic Model ist die darüberliegende Schicht in Power BI mit Beziehungen, Kennzahlen und Berechtigungen. Bei großen Datenmengen dient das Warehouse als Datenquelle des Modells." },
      { question: "Wie hält man ein Semantic Model langfristig wartbar?", answer: "Hilfreich sind klar benannte Kennzahlen, ein durchdachtes Datenmodell mit sauberen Beziehungen und das Vermeiden redundanter Berechnungen. Werden Logik und Definitionen zentral gepflegt, bleiben Änderungen nachvollziehbar und wirken automatisch auf alle aufsetzenden Berichte." },
      { question: "Worauf achtet smiit beim Aufbau eines Semantic Models?", answer: "smiit baut Semantic Models so, dass sie performant, wiederverwendbar und im Alltag wartbar bleiben, und setzt sie bei großen Datenmengen auf eine geprüfte Datengrundlage wie die Gold-Schicht einer Datenplattform auf." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist ein Semantic Model (Power BI Dataset)? | smiit Glossar",
    metaDescription: "Semantic Model einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Data Warehouse und DAX – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "semantic-model",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Semantic model (Power BI dataset)",
    title: "What is a semantic model (Power BI dataset)?",
    shortDefinition:
      "A semantic model, formerly called a Power BI dataset, is the semantic data layer in Power BI that bundles tables, relationships, metrics and permissions. It forms the reusable foundation on which multiple reports build with consistent definitions.",
    synonyms: ["Power BI dataset", "data model", "Power BI semantic model", "tabular model"],
    sections: [
      {
        heading: "Where a semantic model is used",
        paragraphs: [
          "The semantic model is the layer between the raw data and the reports. It contains the loaded tables, their relationships, the metrics defined with DAX and security rules such as row-level security. Reports do not access source data directly but this model, which keeps metrics and definitions consistent across all reports.",
          "A centrally maintained semantic model can be reused by many reports and users. This avoids the same metric being calculated differently in ten reports and makes the model a shared source of truth within Power BI.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "A semantic model pays off wherever several reports or teams rely on consistent metrics.",
        ],
        bullets: [
          "A central model as the basis for many reports and dashboards",
          "Consistent metric definitions across departments",
          "Centrally maintained permissions, for example via row-level security",
          "Reuse instead of redundant models in every single report",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "The semantic model is the model layer in Power BI, not the data warehouse below it and not the report above it. Power Query fills it, DAX defines its metrics, and row-level security governs visibility. With large data volumes, an upstream data warehouse or lakehouse is recommended as the model's data source. In the dy Project AG data platform, the semantic model builds on the gold layer and provides validated metrics. smiit builds semantic models so that they stay performant, reusable and maintainable in everyday work.",
        ],
      },
    ],
    faq: [
      { question: "Why is the Power BI dataset now called a semantic model?", answer: "Microsoft renamed the term dataset to semantic model to clarify that it is a semantic data layer with relationships, metrics and permissions, not just a plain data table." },
      { question: "Can several reports use the same semantic model?", answer: "Yes. That is precisely the benefit: one centrally maintained semantic model supplies many reports with the same metrics and definitions, creating consistency and avoiding duplicate work." },
      { question: "What is the difference between a semantic model and a data warehouse?", answer: "The data warehouse stores the prepared data, while the semantic model is the layer above it in Power BI with relationships, metrics and permissions. With large data volumes, the warehouse serves as the model's data source." },
      { question: "How do you keep a semantic model maintainable in the long run?", answer: "Clearly named metrics, a well-thought-out data model with clean relationships and avoiding redundant calculations all help. When logic and definitions are maintained centrally, changes stay traceable and automatically affect every report built on the model." },
      { question: "What does smiit pay attention to when building a semantic model?", answer: "smiit builds semantic models so that they stay performant, reusable and maintainable in everyday work, and with large data volumes builds them on a validated data foundation such as the gold layer of a data platform." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "What is a semantic model (Power BI dataset)? | smiit glossary",
    metaDescription: "Semantic model explained simply: definition, how it works, use cases and how it differs from a data warehouse and DAX – with practical insight from smiit.",
  },
}

const rowLevelSecurity: LocalizedGlossaryTerm = {
  de: {
    slug: "row-level-security",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Row-Level Security (RLS)",
    title: "Was ist Row-Level Security (RLS)?",
    shortDefinition:
      "Row-Level Security (RLS) ist ein Sicherheitsmechanismus, der steuert, welche Datenzeilen ein Nutzer in einem Bericht oder Datenmodell sehen darf. In Power BI sorgt RLS dafür, dass jeder Anwender denselben Bericht öffnet, aber nur die für ihn freigegebenen Daten angezeigt bekommt, etwa nur die eigene Region oder Abteilung.",
    synonyms: ["RLS", "zeilenbasierte Sicherheit", "Datenzeilensicherheit"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Row-Level Security genutzt?",
        paragraphs: [
          "Row-Level Security filtert die Daten je nach Nutzer, ohne dass für jede Gruppe ein eigener Bericht gebaut werden muss. Über definierte Rollen und Filterregeln wird festgelegt, welche Zeilen eine Person sehen darf. Häufig wird die Identität des angemeldeten Nutzers herangezogen, um dynamisch die passenden Zeilen einzublenden (dynamische RLS).",
          "In Power BI wird RLS auf dem Semantic Model definiert und greift für alle darauf aufbauenden Berichte. Damit ist die Zugriffssteuerung zentral und konsistent, statt sie pro Bericht zu wiederholen.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Row-Level Security wird gebraucht, sobald derselbe Bericht von Personen mit unterschiedlichen Sichtrechten genutzt wird.",
        ],
        bullets: [
          "Regional- oder Niederlassungsleiter sehen nur ihre eigene Region",
          "Vertriebsmitarbeiter sehen nur ihre eigenen Kunden oder Gebiete",
          "Mandanten- oder Kundentrennung in einem gemeinsam genutzten Bericht",
          "Abteilungsbezogene Sichten ohne separate Berichtskopien",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "RLS steuert, welche Zeilen sichtbar sind, nicht welche Berichte oder Arbeitsbereiche jemand öffnen darf; das regeln die Berechtigungen in Power BI darüber. RLS ist ein konkretes Werkzeug der Data Governance und wird auf dem Semantic Model umgesetzt, oft in Kombination mit DAX-Filterausdrücken. In der Datenplattform der dy Project AG stellte RLS sicher, dass verschiedene Projektbeteiligte nur die für sie relevanten Daten sahen. smiit gestaltet RLS so, dass sie sicher, nachvollziehbar und performant bleibt.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen statischer und dynamischer RLS?", answer: "Bei statischer RLS wird je Rolle ein fester Filter hinterlegt. Bei dynamischer RLS wird die Identität des angemeldeten Nutzers genutzt, um die sichtbaren Zeilen automatisch zu bestimmen, was bei vielen Nutzern deutlich wartungsärmer ist." },
      { question: "Schützt Row-Level Security die Daten vollständig?", answer: "RLS steuert die Sichtbarkeit von Zeilen im Bericht. Für umfassenden Schutz gehört sie in ein Gesamtkonzept aus Berechtigungen, Verschlüsselung und Governance, das smiit ganzheitlich betrachtet." },
      { question: "Wie testet man, ob Row-Level Security korrekt greift?", answer: "Power BI bietet eine Funktion, mit der sich ein Bericht aus der Sicht einer bestimmten Rolle oder eines bestimmten Nutzers anzeigen lässt. So kann vor der Veröffentlichung geprüft werden, ob jede Rolle wirklich nur die vorgesehenen Zeilen sieht." },
      { question: "Beeinträchtigt Row-Level Security die Performance eines Berichts?", answer: "RLS-Filter werden bei jeder Abfrage ausgewertet und können bei sehr komplexen Regeln oder großen Modellen die Antwortzeiten beeinflussen. Mit einem sauberen Datenmodell und möglichst einfachen Filterausdrücken bleibt der Effekt in der Regel gering." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Row-Level Security (RLS): Definition & Praxis | smiit Glossar",
    metaDescription: "Row-Level Security einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Berechtigungen und Data Governance – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "row-level-security",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Row-level security (RLS)",
    title: "What is row-level security (RLS)?",
    shortDefinition:
      "Row-level security (RLS) is a security mechanism that controls which rows of data a user may see in a report or data model. In Power BI, RLS ensures that every user opens the same report but only sees the data released for them, such as only their own region or department.",
    synonyms: ["RLS", "row-based security"],
    sections: [
      {
        heading: "Where row-level security is used",
        paragraphs: [
          "Row-level security filters the data per user without having to build a separate report for each group. Through defined roles and filter rules, it is determined which rows a person may see. Often the identity of the signed-in user is used to dynamically show the appropriate rows (dynamic RLS).",
          "In Power BI, RLS is defined on the semantic model and applies to all reports built on it. This makes access control central and consistent instead of repeating it per report.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "Row-level security is needed as soon as the same report is used by people with different viewing rights.",
        ],
        bullets: [
          "Regional or branch managers see only their own region",
          "Sales staff see only their own customers or territories",
          "Tenant or customer separation in a shared report",
          "Department-specific views without separate report copies",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "RLS controls which rows are visible, not which reports or workspaces someone may open; that is governed by the permissions in Power BI above it. RLS is a concrete tool of data governance and is implemented on the semantic model, often in combination with DAX filter expressions. In the dy Project AG data platform, RLS ensured that different project participants saw only the data relevant to them. smiit designs RLS so that it stays secure, traceable and performant.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between static and dynamic RLS?", answer: "With static RLS, a fixed filter is stored per role. With dynamic RLS, the identity of the signed-in user is used to determine the visible rows automatically, which is considerably less maintenance with many users." },
      { question: "Does row-level security protect the data completely?", answer: "RLS controls the visibility of rows in the report. For comprehensive protection it belongs in an overall concept of permissions, encryption and governance, which smiit considers holistically." },
      { question: "How do you test whether row-level security works correctly?", answer: "Power BI provides a feature that lets you view a report from the perspective of a specific role or user. This makes it possible to verify before publishing that each role really only sees the intended rows." },
      { question: "Does row-level security affect a report's performance?", answer: "RLS filters are evaluated with every query and, with very complex rules or large models, can influence response times. With a clean data model and filter expressions kept as simple as possible, the effect usually stays small." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Row-level security (RLS): definition & practice | smiit glossary",
    metaDescription: "Row-level security explained simply: definition, how it works, use cases and how it differs from permissions and data governance – with practical insight from smiit.",
  },
}

const etlElt: LocalizedGlossaryTerm = {
  de: {
    slug: "etl-elt",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "ETL / ELT",
    title: "Was ist ETL / ELT?",
    shortDefinition:
      "ETL (Extract, Transform, Load) und ELT (Extract, Load, Transform) sind Prozesse, mit denen Daten aus Quellsystemen extrahiert, aufbereitet und in eine Zielplattform geladen werden. Beide bestehen aus denselben drei Schritten – Extrahieren, Transformieren und Laden; der Unterschied liegt allein in der Reihenfolge: Bei ETL werden die Daten vor dem Laden transformiert, bei ELT erst nach dem Laden in der Zielplattform.",
    synonyms: ["Extract Transform Load", "Extract Load Transform", "Datenintegration", "Datenpipeline"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ETL / ELT genutzt?",
        paragraphs: [
          "ETL- und ELT-Prozesse bringen Daten aus operativen Systemen wie ERP, CRM, Datenbanken, Excel oder APIs in eine zentrale Analyseplattform wie ein Data Warehouse oder Lakehouse. Dabei werden Daten extrahiert, bereinigt, harmonisiert und in eine analysefreundliche Struktur gebracht. Solche Prozesse laufen meist automatisiert und regelmäßig (etwa nächtlich oder kontinuierlich).",
          "Beim klassischen ETL geschieht die Transformation auf einem separaten Verarbeitungsschritt, bevor die Daten geladen werden. Beim moderneren ELT werden Rohdaten zuerst geladen und dann mit der Rechenleistung der Zielplattform transformiert, was in Cloud-Lakehouses wie Azure Databricks oder Microsoft Fabric oft effizienter und flexibler ist.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "ETL- und ELT-Strecken werden überall dort gebraucht, wo Daten aus mehreren Systemen zusammengeführt und für Analysen aufbereitet werden.",
        ],
        bullets: [
          "Tägliche oder kontinuierliche Beladung eines Data Warehouse oder Lakehouse",
          "Zusammenführen von ERP-, CRM-, Excel- und API-Daten in einer Plattform",
          "Bereinigung und Harmonisierung als Grundlage für verlässliches Reporting",
          "Aufbau der Schichten einer Medallion-Architektur (Bronze, Silver, Gold)",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "ETL/ELT ist der Prozess, der eine Datenplattform befüllt, nicht die Plattform selbst (Data Warehouse oder Lakehouse) und nicht die Modellierung (Inmon, Kimball, Data Vault). Power Query ist eine leichtgewichtige Form von ETL innerhalb von Power BI; für größere Mengen werden dedizierte ELT-Strecken bevorzugt. Die Medallion-Architektur ist eine verbreitete Art, ELT im Lakehouse zu strukturieren. In der Datenplattform der dy Project AG wurden Daten aus SQL Server, Excel und REST-APIs über ELT-Strecken auf Azure Databricks integriert. smiit baut ETL/ELT-Prozesse, die zuverlässig, nachvollziehbar und wartbar sind.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen ETL und ELT?", answer: "Bei ETL werden Daten vor dem Laden transformiert, bei ELT erst danach in der Zielplattform. ELT nutzt die Rechenleistung moderner Cloud-Plattformen und ist bei großen Datenmengen oft flexibler und effizienter." },
      { question: "Brauchen wir spezielle Tools für ETL / ELT?", answer: "Für kleine Fälle reicht oft Power Query in Power BI. Bei größeren Datenmengen kommen Plattformen wie Azure Databricks, Microsoft Fabric oder Azure Data Factory zum Einsatz, die smiit passend zur Datenlage auswählt." },
      { question: "Wie oft sollten ETL- / ELT-Strecken laufen?", answer: "Das hängt davon ab, wie aktuell die Auswertungen sein müssen. Übliche Muster sind eine nächtliche Beladung, mehrmals täglich oder eine nahezu kontinuierliche Verarbeitung; je höher die Frequenz, desto wichtiger werden zuverlässige Fehlerbehandlung und Überwachung." },
      { question: "Was passiert, wenn eine ETL- / ELT-Strecke fehlschlägt?", answer: "Gut gebaute Strecken protokollieren Fehler, können einzelne Schritte gezielt wiederholen und sollten so gestaltet sein, dass ein erneuter Lauf keine doppelten oder inkonsistenten Daten erzeugt (Idempotenz). Monitoring und Benachrichtigungen stellen sicher, dass Probleme früh auffallen." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "ETL / ELT: Definition, Unterschied & Praxis | smiit Glossar",
    metaDescription: "ETL und ELT einfach erklärt: Definition, Unterschied, Anwendungsfälle und Abgrenzung zu Data Warehouse und Power Query – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "etl-elt",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "ETL / ELT",
    title: "What is ETL / ELT?",
    shortDefinition:
      "ETL (extract, transform, load) and ELT (extract, load, transform) are processes used to extract data from source systems, prepare it and load it into a target platform. Both consist of the same three steps — extract, transform and load; the difference lies solely in their order: with ETL the data is transformed before loading, with ELT only after loading in the target platform.",
    synonyms: ["extract transform load", "extract load transform", "data integration", "data pipeline"],
    sections: [
      {
        heading: "Where ETL / ELT is used",
        paragraphs: [
          "ETL and ELT processes bring data from operational systems such as ERP, CRM, databases, Excel or APIs into a central analytics platform such as a data warehouse or lakehouse. In doing so, data is extracted, cleansed, harmonized and brought into an analysis-friendly structure. Such processes usually run automatically and regularly (for example nightly or continuously).",
          "In classic ETL, the transformation happens in a separate processing step before the data is loaded. In the more modern ELT, raw data is loaded first and then transformed using the compute power of the target platform, which is often more efficient and flexible in cloud lakehouses such as Azure Databricks or Microsoft Fabric.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "ETL and ELT pipelines are needed wherever data from several systems is consolidated and prepared for analysis.",
        ],
        bullets: [
          "Daily or continuous loading of a data warehouse or lakehouse",
          "Consolidating ERP, CRM, Excel and API data into one platform",
          "Cleansing and harmonization as the basis for reliable reporting",
          "Building the layers of a medallion architecture (bronze, silver, gold)",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "ETL/ELT is the process that fills a data platform, not the platform itself (data warehouse or lakehouse) and not the modeling (Inmon, Kimball, Data Vault). Power Query is a lightweight form of ETL within Power BI; for larger volumes, dedicated ELT pipelines are preferred. The medallion architecture is a common way to structure ELT in the lakehouse. In the dy Project AG data platform, data from SQL Server, Excel and REST APIs was integrated via ELT pipelines on Azure Databricks. smiit builds ETL/ELT processes that are reliable, traceable and maintainable.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between ETL and ELT?", answer: "With ETL data is transformed before loading, with ELT only afterwards in the target platform. ELT uses the compute power of modern cloud platforms and is often more flexible and efficient with large data volumes." },
      { question: "Do we need special tools for ETL / ELT?", answer: "For small cases, Power Query in Power BI is often enough. For larger data volumes, platforms such as Azure Databricks, Microsoft Fabric or Azure Data Factory are used, which smiit selects to suit the data situation." },
      { question: "How often should ETL / ELT pipelines run?", answer: "That depends on how up to date the analyses need to be. Common patterns are a nightly load, several times a day or near-continuous processing; the higher the frequency, the more important reliable error handling and monitoring become." },
      { question: "What happens if an ETL / ELT pipeline fails?", answer: "Well-built pipelines log errors, can retry individual steps in a targeted way and should be designed so that a rerun produces no duplicate or inconsistent data (idempotency). Monitoring and alerts ensure that problems are noticed early." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "ETL / ELT: definition, difference & practice | smiit glossary",
    metaDescription: "ETL and ELT explained simply: definition, difference, use cases and how they differ from a data warehouse and Power Query – with practical insight from smiit.",
  },
}

const microsoftFabric: LocalizedGlossaryTerm = {
  de: {
    slug: "microsoft-fabric",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Microsoft Fabric",
    title: "Was ist Microsoft Fabric?",
    shortDefinition:
      "Microsoft Fabric ist eine integrierte Analyseplattform von Microsoft, die Datenintegration, Data Engineering, Data Warehousing, Data Science und Power BI in einem zusammenhängenden Software-as-a-Service-Angebot vereint. Im Zentrum steht OneLake, ein einheitlicher Datenspeicher, auf dem alle Fabric-Dienste gemeinsam arbeiten.",
    synonyms: ["Fabric", "MS Fabric", "OneLake", "Fabric-Plattform"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Microsoft Fabric genutzt?",
        paragraphs: [
          "Microsoft Fabric bündelt Werkzeuge, die früher einzeln zusammengestellt werden mussten, in einer einheitlichen SaaS-Plattform. Datenintegration, Lakehouse, Data Warehouse, Echtzeitanalyse, Data Science und Power BI greifen über den gemeinsamen Speicher OneLake auf dieselben Daten zu, ohne sie mehrfach kopieren zu müssen.",
          "Für Unternehmen reduziert das die Komplexität, weil weniger einzelne Dienste verbunden und verwaltet werden müssen. Power BI ist als Berichts- und Visualisierungsschicht fest integriert, und die Veredelung der Daten lässt sich entlang einer Medallion-Architektur organisieren.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Microsoft Fabric eignet sich besonders für Organisationen, die im Microsoft- und Power-BI-Umfeld eine durchgängige Datenplattform suchen.",
        ],
        bullets: [
          "Einheitliche Plattform für Datenintegration, Warehouse, Lakehouse und Reporting",
          "Gemeinsamer Datenspeicher OneLake ohne wiederholtes Kopieren der Daten",
          "Enge Integration mit Power BI für durchgängiges Reporting",
          "Reduzierte Komplexität gegenüber vielen einzeln verbundenen Diensten",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Microsoft Fabric ist eine integrierte Plattform, während Azure Databricks ein spezialisierter, besonders leistungsfähiger Dienst vor allem für Data Engineering und Data Science ist; beide nutzen Lakehouse-Konzepte und lassen sich kombinieren. Fabric ist kein Ersatz für eine durchdachte Datenmodellierung oder Governance, sondern die Plattform, auf der diese umgesetzt werden. ETL/ELT, Medallion-Architektur und Semantic Models finden sich auch in Fabric wieder. smiit bewertet im Einzelfall, ob Fabric, Azure Databricks oder eine Kombination am besten zur Datenlage und zum Budget passt, wie es etwa im Umfeld der dy Project AG abgewogen wurde.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Microsoft Fabric und Azure Databricks?", answer: "Fabric ist eine breite, integrierte Analyseplattform mit enger Power-BI-Anbindung. Azure Databricks ist spezialisiert auf leistungsstarkes Data Engineering und Data Science. Beide nutzen Lakehouse-Konzepte und können kombiniert werden." },
      { question: "Brauche ich für Microsoft Fabric Power BI?", answer: "Power BI ist Teil von Fabric und dient als Berichts- und Visualisierungsschicht. Wer bereits Power BI nutzt, findet in Fabric eine natürliche Erweiterung in Richtung durchgängiger Datenplattform." },
      { question: "Was ist OneLake in Microsoft Fabric?", answer: "OneLake ist der zentrale, einheitliche Datenspeicher von Fabric, auf den alle Dienste gemeinsam zugreifen. Dadurch müssen Daten nicht mehrfach kopiert werden, sondern stehen den verschiedenen Fabric-Werkzeugen direkt zur Verfügung." },
      { question: "Eignet sich Microsoft Fabric für den Mittelstand?", answer: "Fabric kann gerade für kleinere Teams attraktiv sein, weil es viele Bausteine in einer Plattform bündelt und weniger Einzeldienste verbunden werden müssen. Entscheidend sind der tatsächliche Datenbedarf und das Lizenzmodell, das sich an der gebuchten Kapazität orientiert." },
      { question: "Wie passt smiit Microsoft Fabric in eine Datenstrategie ein?", answer: "smiit bewertet im Einzelfall, ob Fabric, Azure Databricks oder eine Kombination am besten zur Datenlage und zum Budget passt, und setzt darauf eine durchdachte Modellierung und Governance auf." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Microsoft Fabric: Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription: "Microsoft Fabric einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Azure Databricks und Power BI – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "microsoft-fabric",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Microsoft Fabric",
    title: "What is Microsoft Fabric?",
    shortDefinition:
      "Microsoft Fabric is an integrated analytics platform from Microsoft that unites data integration, data engineering, data warehousing, data science and Power BI in one coherent software-as-a-service offering. At its center is OneLake, a unified data store on which all Fabric services work together.",
    synonyms: ["Fabric", "MS Fabric", "OneLake", "Fabric platform"],
    sections: [
      {
        heading: "Where Microsoft Fabric is used",
        paragraphs: [
          "Microsoft Fabric bundles tools that previously had to be assembled individually into a unified SaaS platform. Data integration, lakehouse, data warehouse, real-time analytics, data science and Power BI access the same data via the shared store OneLake without having to copy it multiple times.",
          "For companies, this reduces complexity because fewer individual services have to be connected and managed. Power BI is firmly integrated as the reporting and visualization layer, and the refinement of data can be organized along a medallion architecture.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "Microsoft Fabric is particularly suited to organizations that want an end-to-end data platform in the Microsoft and Power BI ecosystem.",
        ],
        bullets: [
          "Unified platform for data integration, warehouse, lakehouse and reporting",
          "Shared data store OneLake without repeated copying of data",
          "Tight integration with Power BI for end-to-end reporting",
          "Reduced complexity compared to many individually connected services",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Microsoft Fabric is an integrated platform, whereas Azure Databricks is a specialized, particularly powerful service mainly for data engineering and data science; both use lakehouse concepts and can be combined. Fabric is not a substitute for thoughtful data modeling or governance but the platform on which these are implemented. ETL/ELT, the medallion architecture and semantic models also appear in Fabric. smiit assesses case by case whether Fabric, Azure Databricks or a combination best fits the data situation and budget, as was weighed up in the context of the dy Project AG, for example.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between Microsoft Fabric and Azure Databricks?", answer: "Fabric is a broad, integrated analytics platform with tight Power BI integration. Azure Databricks is specialized in powerful data engineering and data science. Both use lakehouse concepts and can be combined." },
      { question: "Do I need Power BI for Microsoft Fabric?", answer: "Power BI is part of Fabric and serves as the reporting and visualization layer. Anyone already using Power BI finds in Fabric a natural extension towards an end-to-end data platform." },
      { question: "What is OneLake in Microsoft Fabric?", answer: "OneLake is Fabric's central, unified data store that all services access together. This means data no longer has to be copied multiple times but is directly available to the various Fabric tools." },
      { question: "Is Microsoft Fabric suitable for mid-sized companies?", answer: "Fabric can be appealing precisely for smaller teams because it bundles many building blocks into one platform and fewer individual services have to be connected. What matters is the actual data requirement and the licensing model, which is based on the capacity booked." },
      { question: "How does smiit fit Microsoft Fabric into a data strategy?", answer: "smiit assesses case by case whether Fabric, Azure Databricks or a combination best fits the data situation and budget, and builds thoughtful modeling and governance on top of it." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Microsoft Fabric: definition & practice | smiit glossary",
    metaDescription: "Microsoft Fabric explained simply: definition, how it works, use cases and how it differs from Azure Databricks and Power BI – with practical insight from smiit.",
  },
}

const azureDatabricks: LocalizedGlossaryTerm = {
  de: {
    slug: "azure-databricks",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Azure Databricks",
    title: "Was ist Azure Databricks?",
    shortDefinition:
      "Azure Databricks ist eine auf Apache Spark basierende Analyse- und Data-Engineering-Plattform, die als verwalteter Dienst in Microsoft Azure läuft. Sie wird genutzt, um große Datenmengen zu verarbeiten, Lakehouses aufzubauen und Machine-Learning-Modelle zu entwickeln, und ist eng mit Azure-Speicher und -Diensten integriert.",
    synonyms: ["Databricks", "Databricks on Azure", "Spark-Plattform", "Lakehouse-Plattform"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Azure Databricks genutzt?",
        paragraphs: [
          "Azure Databricks stellt skalierbare Rechencluster bereit, mit denen sich auch sehr große Datenmengen verarbeiten lassen. Über das offene Tabellenformat Delta Lake werden Lakehouses mit Transaktionssicherheit und guter Performance aufgebaut. Teams entwickeln darin Datenpipelines (ETL/ELT), bereiten Daten entlang einer Medallion-Architektur auf und trainieren Machine-Learning-Modelle.",
          "Als verwalteter Dienst in Azure ist Databricks eng mit Azure-Speicher, Sicherheit und Identitätsdiensten verbunden und skaliert die Rechenleistung bedarfsgesteuert. Die veredelten Daten werden häufig in Power BI ausgewertet.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "In der Datenplattform der dy Project AG, einem Großbauprojekt mit über 1 Mrd. CHF Volumen, diente Azure Databricks als zentrale Verarbeitungsplattform. Daten aus SQL Server, Excel und REST-APIs wurden dort integriert und entlang einer Medallion-Architektur (Bronze, Silver, Gold) veredelt, bevor sie als geprüfte Grundlage für das Power-BI-Reporting bereitstanden.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Azure Databricks ist eine leistungsfähige Verarbeitungs- und Lakehouse-Plattform, während Microsoft Fabric ein breiteres, integriertes Analyseangebot ist; beide lassen sich kombinieren. Databricks ist nicht das Reporting-Werkzeug selbst, sondern liefert die veredelten Daten, die etwa Power BI über ein Semantic Model visualisiert. ETL/ELT, Medallion-Architektur und Datenmodellierung werden in Databricks praktisch umgesetzt. smiit nutzt Azure Databricks, wenn große Datenmengen, anspruchsvolle Transformationen oder Machine Learning eine leistungsfähige, skalierbare Plattform erfordern.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Azure Databricks und Microsoft Fabric?", answer: "Azure Databricks ist auf leistungsstarkes Data Engineering, große Datenmengen und Data Science spezialisiert. Microsoft Fabric ist eine breitere, integrierte Plattform mit enger Power-BI-Anbindung. Beide nutzen Lakehouse-Konzepte und können kombiniert werden." },
      { question: "Braucht man für Azure Databricks Programmierkenntnisse?", answer: "Für anspruchsvolle Pipelines sind Kenntnisse in Sprachen wie Python, SQL oder Scala hilfreich. smiit bringt diese Expertise ein, sodass Unternehmen die Plattform nutzen können, ohne selbst tiefes Spark-Know-how aufbauen zu müssen." },
      { question: "Was ist Delta Lake im Zusammenhang mit Azure Databricks?", answer: "Delta Lake ist ein offenes Tabellenformat, das einem Lakehouse Transaktionssicherheit, Versionierung und gute Abfrageleistung verleiht. Es bildet die Speichergrundlage, auf der in Databricks zuverlässige Datenpipelines und eine Medallion-Architektur aufgebaut werden." },
      { question: "Wie wirkt sich die Skalierung in Azure Databricks auf die Kosten aus?", answer: "Die Rechencluster werden bedarfsgesteuert hoch- und heruntergefahren, sodass nur die tatsächlich genutzte Rechenzeit anfällt. Cluster, die sich bei Inaktivität automatisch beenden, und passend dimensionierte Cluster sind die wichtigsten Hebel, um die Kosten kontrollierbar zu halten." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Azure Databricks: Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription: "Azure Databricks einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Microsoft Fabric und Power BI – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "azure-databricks",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Azure Databricks",
    title: "What is Azure Databricks?",
    shortDefinition:
      "Azure Databricks is an analytics and data engineering platform based on Apache Spark that runs as a managed service in Microsoft Azure. It is used to process large data volumes, build lakehouses and develop machine learning models, and is tightly integrated with Azure storage and services.",
    synonyms: ["Databricks", "Databricks on Azure", "Spark platform", "lakehouse platform"],
    sections: [
      {
        heading: "Where Azure Databricks is used",
        paragraphs: [
          "Azure Databricks provides scalable compute clusters that can process even very large data volumes. Through the open table format Delta Lake, lakehouses are built with transactional safety and good performance. Within it, teams develop data pipelines (ETL/ELT), prepare data along a medallion architecture and train machine learning models.",
          "As a managed service in Azure, Databricks is tightly connected with Azure storage, security and identity services and scales compute on demand. The refined data is frequently analyzed in Power BI.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "In the dy Project AG data platform, a large construction project worth over 1 billion CHF, Azure Databricks served as the central processing platform. Data from SQL Server, Excel and REST APIs was integrated there and refined along a medallion architecture (bronze, silver, gold) before being available as a validated basis for Power BI reporting.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Azure Databricks is a powerful processing and lakehouse platform, whereas Microsoft Fabric is a broader, integrated analytics offering; both can be combined. Databricks is not the reporting tool itself but provides the refined data that Power BI, for example, visualizes via a semantic model. ETL/ELT, the medallion architecture and data modeling are put into practice in Databricks. smiit uses Azure Databricks when large data volumes, demanding transformations or machine learning require a powerful, scalable platform.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between Azure Databricks and Microsoft Fabric?", answer: "Azure Databricks is specialized in powerful data engineering, large data volumes and data science. Microsoft Fabric is a broader, integrated platform with tight Power BI integration. Both use lakehouse concepts and can be combined." },
      { question: "Do you need programming skills for Azure Databricks?", answer: "For demanding pipelines, knowledge of languages such as Python, SQL or Scala is helpful. smiit contributes this expertise so companies can use the platform without having to build deep Spark know-how themselves." },
      { question: "What is Delta Lake in the context of Azure Databricks?", answer: "Delta Lake is an open table format that gives a lakehouse transactional safety, versioning and good query performance. It forms the storage foundation on which reliable data pipelines and a medallion architecture are built in Databricks." },
      { question: "How does scaling in Azure Databricks affect costs?", answer: "The compute clusters scale up and down on demand, so only the compute time actually used is billed. Clusters that shut down automatically when idle, together with appropriately sized clusters, are the main levers for keeping costs controllable." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Azure Databricks: definition & practice | smiit glossary",
    metaDescription: "Azure Databricks explained simply: definition, how it works, use cases and how it differs from Microsoft Fabric and Power BI – with practical insight from smiit.",
  },
}

const digitalePlattformen: LocalizedGlossaryTerm = {
  de: {
    slug: "digital-platforms",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Digitale Plattformen",
    title: "Was sind digitale Plattformen?",
    shortDefinition:
      "Digitale Plattformen sind softwarebasierte Systeme, die Nutzer, Daten und Dienste über standardisierte Schnittstellen zusammenführen und Interaktionen oder Transaktionen ermöglichen. Sie bündeln Funktionen zentral, lassen sich erweitern und bilden die technische Basis für digitale Geschäftsmodelle.",
    synonyms: ["Plattform-Ökosystem", "digitale Geschäftsplattform", "Platform-as-a-Service-Lösung"],
    sections: [
      {
        heading: "Einordnung: Wofür werden digitale Plattformen genutzt?",
        paragraphs: [
          "Digitale Plattformen verbinden mehrere Akteure – etwa Kunden, Partner und interne Abteilungen – über eine gemeinsame technische Schicht. Anders als eine einzelne Anwendung stellen sie wiederverwendbare Bausteine wie Identitätsverwaltung, Datenhaltung, APIs und Abrechnung bereit, auf denen sich verschiedene Funktionen und Dienste aufbauen lassen.",
          "Im Mittelstand dienen sie oft als zentrales System, das gewachsene Insellösungen ablöst. Statt isolierter Tools entsteht ein zusammenhängendes Ökosystem, in dem Daten fließen und sich neue Services schrittweise ergänzen lassen. Microsoft Azure liefert dafür die Infrastruktur, von App-Hosting über Datenbanken bis zu Sicherheitsdiensten.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Versicherungsdienstleister möchte Schadenmeldungen, Kundenkommunikation und Partneranbindung in einem System bündeln. Eine digitale Plattform stellt dafür einen Mandantenbereich pro Kunde, eine zentrale Nutzerverwaltung und offene Schnittstellen für angebundene Systeme bereit. Neue Funktionen wie Reporting oder automatisierte Prüfprozesse werden später als Module ergänzt, ohne die Basis neu zu bauen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Der Wert digitaler Plattformen liegt in Wiederverwendbarkeit und Skalierung: Gemeinsame Dienste werden einmal gebaut und mehrfach genutzt, neue Anwendungsfälle entstehen schneller und kostengünstiger.",
        ],
        bullets: [
          "Zentrale Identitäts- und Rechteverwaltung statt vieler getrennter Logins",
          "Anbindung externer Systeme über APIs und standardisierte Schnittstellen",
          "Mandantenfähigkeit für mehrere Kunden oder Geschäftseinheiten auf einer Basis",
          "Schrittweiser Funktionsausbau ohne Neuentwicklung des Gesamtsystems",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Eine digitale Plattform ist mehr als eine einzelne SaaS-Anwendung: Während SaaS ein konkretes Produkt im Abonnement beschreibt, bildet die Plattform die tragende Schicht, auf der mehrere Anwendungen und Dienste laufen. Sie nutzt Cloud-Infrastruktur als Fundament und setzt häufig auf eine Multi-Tenant-Architektur sowie REST-APIs für die Anbindung weiterer Systeme.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit hat für die Claimity AG eine digitale SaaS-Plattform für den InsurTech-Bereich entwickelt und in nur sechs Wochen produktiv auf Microsoft Azure gebracht. Die Multi-Tenant-Architektur trennt Kundendaten sauber, Azure App Service und Azure Database for PostgreSQL bilden die Laufzeit- und Datenschicht, Azure Front Door sichert die Zustellung und Keycloak übernimmt Identitätsverwaltung samt MFA. Über REST-APIs lässt sich die Plattform an bestehende Systeme anbinden – durchgängig DSGVO-konform.",
        ],
      },
    ],
    faq: [
      {
        question: "Was unterscheidet eine digitale Plattform von einer App?",
        answer:
          "Eine App erfüllt einen abgegrenzten Zweck, eine Plattform stellt geteilte Bausteine wie Nutzerverwaltung, Datenhaltung und APIs bereit, auf denen mehrere Apps und Dienste aufsetzen. Die Plattform ist das Fundament, die App eine darauf laufende Anwendung.",
      },
      {
        question: "Lohnt sich eine digitale Plattform auch für den Mittelstand?",
        answer:
          "Ja, sobald mehrere Anwendungen, Mandanten oder Partneranbindungen geplant sind. Die einmalig gebaute Basis spart bei jedem weiteren Anwendungsfall Aufwand und sorgt für einheitliche Sicherheit und Datenhaltung.",
      },
      {
        question: "Welche Microsoft-Azure-Dienste bilden die Basis?",
        answer:
          "Typisch sind Azure App Service für das Hosting, Azure Database for PostgreSQL für Daten, Azure Front Door für Zustellung und Schutz sowie Azure Key Vault für Geheimnisse. Identität und MFA lassen sich etwa über Keycloak abdecken.",
      },
      {
        question: "Wie lange dauert der Aufbau einer digitalen Plattform?",
        answer:
          "Das hängt vom Funktionsumfang ab. Eine erste tragfähige Version mit Kernfunktionen lässt sich oft in wenigen Wochen produktiv bringen, während das Ökosystem danach schrittweise um weitere Module wächst – statt alles auf einmal zu bauen.",
      },
      {
        question: "Wie vermeidet man eine Abhängigkeit von einem einzelnen Anbieter?",
        answer:
          "Hilfreich sind offene Standards, dokumentierte REST-APIs und der Einsatz verbreiteter, portabler Technologien statt proprietärer Speziallösungen. So bleibt die Plattform erweiterbar und ein späterer Wechsel einzelner Bausteine möglich.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was sind digitale Plattformen? Definition & Praxis | smiit Glossar",
    metaDescription:
      "Digitale Plattformen einfach erklärt: Definition, Abgrenzung zu SaaS und Apps, Vorteile und Anwendungsfälle – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "digital-platforms",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Digital platforms",
    title: "What are digital platforms?",
    shortDefinition:
      "Digital platforms are software-based systems that bring together users, data and services through standardized interfaces and enable interactions or transactions. They bundle functionality centrally, can be extended, and form the technical foundation for digital business models.",
    synonyms: ["platform ecosystem", "digital business platform", "platform-as-a-service solution"],
    sections: [
      {
        heading: "Where digital platforms are used",
        paragraphs: [
          "Digital platforms connect several actors – such as customers, partners and internal departments – through a shared technical layer. Unlike a single application, they provide reusable building blocks such as identity management, data storage, APIs and billing, on top of which various functions and services can be built.",
          "In mid-sized companies they often serve as a central system that replaces isolated, grown-over-time solutions. Instead of separate tools, a coherent ecosystem emerges in which data flows and new services can be added step by step. Microsoft Azure supplies the infrastructure for this, from app hosting and databases to security services.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "An insurance service provider wants to bundle claims reporting, customer communication and partner connectivity in one system. A digital platform provides a tenant area per client, central user management and open interfaces for connected systems. New functions such as reporting or automated review processes are later added as modules without rebuilding the foundation.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "The value of digital platforms lies in reuse and scaling: shared services are built once and used many times, so new use cases emerge faster and at lower cost.",
        ],
        bullets: [
          "Central identity and access management instead of many separate logins",
          "Connection of external systems via APIs and standardized interfaces",
          "Multi-tenancy for several clients or business units on one foundation",
          "Incremental feature growth without rebuilding the entire system",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "A digital platform is more than a single SaaS application: while SaaS describes a concrete subscription product, the platform is the supporting layer on which several applications and services run. It uses cloud infrastructure as its foundation and often relies on a multi-tenant architecture as well as REST APIs to connect further systems.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit built a digital SaaS platform for the InsurTech sector for Claimity AG and brought it into production on Microsoft Azure in just six weeks. The multi-tenant architecture cleanly separates customer data, Azure App Service and Azure Database for PostgreSQL provide the runtime and data layers, Azure Front Door secures delivery, and Keycloak handles identity management including MFA. REST APIs let the platform connect to existing systems – fully GDPR-compliant throughout.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between a digital platform and an app?",
        answer:
          "An app serves a defined purpose, whereas a platform provides shared building blocks such as user management, data storage and APIs on which several apps and services run. The platform is the foundation, the app an application running on top of it.",
      },
      {
        question: "Is a digital platform worthwhile for mid-sized companies too?",
        answer:
          "Yes, as soon as several applications, tenants or partner connections are planned. The foundation built once saves effort with every additional use case and ensures consistent security and data storage.",
      },
      {
        question: "Which Microsoft Azure services form the basis?",
        answer:
          "Typical choices are Azure App Service for hosting, Azure Database for PostgreSQL for data, Azure Front Door for delivery and protection, and Azure Key Vault for secrets. Identity and MFA can be covered via Keycloak, for example.",
      },
      {
        question: "How long does it take to build a digital platform?",
        answer:
          "That depends on the scope of functionality. A first viable version with core features can often be brought into production within a few weeks, while the ecosystem then grows step by step with further modules – instead of building everything at once.",
      },
      {
        question: "How do you avoid dependency on a single provider?",
        answer:
          "Open standards, documented REST APIs and the use of widespread, portable technologies instead of proprietary special solutions all help. This keeps the platform extensible and makes it possible to swap out individual building blocks later.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What are digital platforms? Definition & practice | smiit glossary",
    metaDescription:
      "Digital platforms explained simply: definition, difference from SaaS and apps, benefits and use cases – with hands-on Azure context from smiit.",
  },
}

const cloudComputing: LocalizedGlossaryTerm = {
  de: {
    slug: "cloud-computing",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Cloud Computing",
    title: "Was ist Cloud Computing?",
    shortDefinition:
      "Cloud Computing ist die Bereitstellung von IT-Ressourcen – Rechenleistung, Speicher, Datenbanken und Software – über das Internet. Statt eigene Hardware zu kaufen und zu betreiben, nutzen Unternehmen diese Dienste flexibel auf Abruf und zahlen nur, was sie verbrauchen.",
    synonyms: [
      "Cloud Computing",
      "Cloud-Dienste",
      "Public Cloud",
      "Private Cloud",
      "Hybrid Cloud",
      "Hybrid-Cloud",
      "Multi-Cloud",
      "Cloud",
    ],
    sections: [
      {
        heading: "Einordnung: Wofür wird Cloud Computing genutzt?",
        paragraphs: [
          "Cloud Computing bündelt Rechenleistung, Speicher, Netzwerk, Datenbanken und fertige Software in großen Rechenzentren und stellt sie über das Internet bereit. Unternehmen buchen genau die Ressourcen, die sie brauchen, skalieren bei Bedarf hoch oder runter und rechnen nutzungsbasiert ab – ohne selbst Server zu beschaffen, zu warten und abzusichern.",
          "Üblich ist die Einteilung in drei Service-Modelle: IaaS (Infrastructure as a Service – virtuelle Server und Speicher), PaaS (Platform as a Service – eine fertige Entwicklungs- und Betriebsplattform) und SaaS (Software as a Service – fertige Anwendungen). Je höher das Modell, desto weniger muss der Kunde selbst betreiben.",
        ],
      },
      {
        heading: "Cloud vs. On-Premise: der Unterschied",
        paragraphs: [
          "On-Premise bedeutet, dass Hardware und Software im eigenen Rechenzentrum oder Serverraum betrieben werden – das Unternehmen kauft, betreibt und wartet alles selbst. Das bietet maximale Kontrolle, bindet aber Kapital, erfordert eigenes Know-how und skaliert nur über zusätzliche Hardware.",
          "Beim Cloud Computing liegt der Betrieb beim Anbieter. Vorteile sind schnelle Bereitstellung, elastische Skalierung und planbare, nutzungsbasierte Kosten; im Gegenzug gibt man ein Stück Kontrolle ab und muss Themen wie Datenstandort, Anbieterbindung und das Modell der geteilten Verantwortung bewusst gestalten. In der Praxis ist die Entscheidung selten „entweder/oder“, sondern eine Frage der passenden Mischung je Anwendungsfall.",
        ],
      },
      {
        heading: "Cloud-Arten: Public, Private, Hybrid & Multi-Cloud",
        paragraphs: [
          "Neben den Service-Modellen unterscheidet man die Betriebsmodelle (Deployment-Modelle):",
        ],
        bullets: [
          "Public Cloud: geteilte Infrastruktur eines Anbieters (z. B. Microsoft Azure) – maximal skalierbar und kosteneffizient.",
          "Private Cloud: dediziert für ein Unternehmen betrieben – mehr Kontrolle und Isolation, oft für sensible Daten oder regulatorische Anforderungen.",
          "Hybrid Cloud: Kombination aus Public und Private Cloud bzw. On-Premise, mit gezielter Verteilung der Workloads – ein gängiger, pragmatischer Weg für den Mittelstand.",
          "Multi-Cloud: Nutzung mehrerer Cloud-Anbieter parallel, um Abhängigkeiten zu reduzieren oder Spezialdienste zu kombinieren.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Cloud Computing lohnt sich überall dort, wo Flexibilität, schnelle Bereitstellung und Skalierbarkeit zählen.",
        ],
        bullets: [
          "Schneller Start neuer Anwendungen ohne eigene Hardwarebeschaffung",
          "Elastische Skalierung bei schwankender Last (z. B. Saisongeschäft)",
          "Betrieb von SaaS-Produkten und mandantenfähigen Plattformen",
          "Datenplattformen, Backups und Disaster Recovery ohne eigenes Rechenzentrum",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Cloud Computing ist der Oberbegriff; die konkrete technische Umsetzung erfolgt über die Cloud-Infrastruktur (Rechenleistung, Speicher, Netzwerk). SaaS ist eine Ausprägung von Cloud Computing auf Anwendungsebene, und Cloud Governance sorgt dafür, dass eine Cloud-Umgebung über Kosten, Sicherheit und Berechtigungen hinweg kontrollierbar bleibt.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit setzt schwerpunktmäßig auf Microsoft Azure und begleitet den Mittelstand technologieneutral bei der Frage, welche Workloads in die Cloud gehören und welche besser On-Premise oder hybrid bleiben. Für die Claimity AG entstand so eine sichere, skalierbare Cloud-Umgebung auf Azure – inklusive abgesicherter Infrastruktur, Governance und DSGVO-konformem Betrieb.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist die Cloud sicherer oder unsicherer als On-Premise?",
        answer:
          "Weder noch pauschal. Große Cloud-Anbieter bieten ein sehr hohes Sicherheitsniveau, aber im Modell der geteilten Verantwortung bleiben Konfiguration, Identitäten und Datenschutz Aufgabe des Kunden. Sicherheit hängt an der sauberen Umsetzung, nicht am Betriebsmodell allein.",
      },
      {
        question: "Ist Cloud Computing automatisch günstiger?",
        answer:
          "Nicht zwangsläufig. Ohne Kostensteuerung und passende Dimensionierung können ungenutzte oder überdimensionierte Ressourcen teuer werden. Der Vorteil liegt in Flexibilität und planbaren, nutzungsbasierten Kosten – nicht automatisch im niedrigsten Preis.",
      },
      {
        question: "Müssen wir komplett in die Cloud wechseln?",
        answer:
          "Nein. Viele Unternehmen fahren hybrid: Sensible oder spezielle Workloads bleiben On-Premise, skalierende oder neue Anwendungen laufen in der Cloud. Entscheidend ist die passende Mischung je Anwendungsfall.",
      },
      {
        question: "Bleiben Daten in der Cloud DSGVO-konform?",
        answer:
          "Das ist möglich, hängt aber von Anbieter, Region und Konfiguration ab. Wichtig sind die Wahl eines Rechenzentrums in der EU, klare Regelungen zur Auftragsverarbeitung sowie geeignete Maßnahmen für Zugriffskontrolle und Verschlüsselung.",
      },
      {
        question: "Was bedeutet das Modell der geteilten Verantwortung?",
        answer:
          "Es beschreibt, dass der Cloud-Anbieter für die Sicherheit der Infrastruktur sorgt, während der Kunde für die sichere Konfiguration, Identitäten, Berechtigungen und seine Daten verantwortlich bleibt. Wer diese Grenze kennt, vermeidet typische Lücken in der Cloud-Sicherheit.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Cloud Computing: Definition & Cloud-Arten | smiit Glossar",
    metaDescription:
      "Cloud Computing erklärt: Definition, Unterschied zu On-Premise, Service-Modelle (IaaS/PaaS/SaaS) und Cloud-Arten (Public, Private, Hybrid, Multi-Cloud) – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "cloud-computing",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Cloud computing",
    title: "What is cloud computing?",
    shortDefinition:
      "Cloud computing is the delivery of IT resources – compute, storage, databases and software – over the internet. Instead of buying and operating their own hardware, companies use these services flexibly on demand and pay only for what they consume.",
    synonyms: [
      "cloud computing",
      "cloud services",
      "public cloud",
      "private cloud",
      "hybrid cloud",
      "multi-cloud",
      "cloud",
    ],
    sections: [
      {
        heading: "Where cloud computing is used",
        paragraphs: [
          "Cloud computing pools compute, storage, networking, databases and ready-made software in large data centers and delivers them over the internet. Companies book exactly the resources they need, scale up or down on demand and pay by usage – without procuring, maintaining and securing servers themselves.",
          "It is commonly split into three service models: IaaS (Infrastructure as a Service – virtual servers and storage), PaaS (Platform as a Service – a ready development and runtime platform) and SaaS (Software as a Service – finished applications). The higher the model, the less the customer has to operate themselves.",
        ],
      },
      {
        heading: "Cloud vs. on-premise: the difference",
        paragraphs: [
          "On-premise means hardware and software run in the company's own data center or server room – the company buys, operates and maintains everything itself. That offers maximum control but ties up capital, requires in-house expertise and only scales by adding more hardware.",
          "With cloud computing, operations sit with the provider. The benefits are fast provisioning, elastic scaling and predictable, usage-based costs; in return you give up some control and must deliberately address data location, vendor lock-in and the shared responsibility model. In practice the decision is rarely either/or but a question of the right mix per use case.",
        ],
      },
      {
        heading: "Cloud types: public, private, hybrid & multi-cloud",
        paragraphs: [
          "Beyond the service models, clouds are distinguished by their deployment models:",
        ],
        bullets: [
          "Public cloud: a provider's shared infrastructure (e.g. Microsoft Azure) – highly scalable and cost-efficient.",
          "Private cloud: operated dedicated to one company – more control and isolation, often for sensitive data or regulatory needs.",
          "Hybrid cloud: a combination of public and private cloud or on-premise, with workloads placed deliberately – a common, pragmatic route for SMEs.",
          "Multi-cloud: using several cloud providers in parallel to reduce dependency or combine specialized services.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Cloud computing pays off wherever flexibility, fast provisioning and scalability matter.",
        ],
        bullets: [
          "Launching new applications quickly without procuring hardware",
          "Elastic scaling for fluctuating load (e.g. seasonal business)",
          "Running SaaS products and multi-tenant platforms",
          "Data platforms, backups and disaster recovery without your own data center",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Cloud computing is the umbrella term; the concrete technical implementation happens via cloud infrastructure (compute, storage, networking). SaaS is a form of cloud computing at the application level, and cloud governance keeps a cloud environment controllable across cost, security and permissions.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit focuses on Microsoft Azure and advises SMEs in a technology-neutral way on which workloads belong in the cloud and which are better kept on-premise or hybrid. For Claimity AG, this produced a secure, scalable cloud environment on Azure – including hardened infrastructure, governance and GDPR-compliant operation.",
        ],
      },
    ],
    faq: [
      {
        question: "Is the cloud more or less secure than on-premise?",
        answer:
          "Neither, in blanket terms. Major cloud providers offer a very high security level, but under the shared responsibility model configuration, identities and data protection remain the customer's job. Security depends on clean implementation, not the operating model alone.",
      },
      {
        question: "Is cloud computing automatically cheaper?",
        answer:
          "Not necessarily. Without cost management and right-sizing, idle or oversized resources can get expensive. The advantage is flexibility and predictable, usage-based costs – not automatically the lowest price.",
      },
      {
        question: "Do we have to move entirely to the cloud?",
        answer:
          "No. Many companies run hybrid: sensitive or special workloads stay on-premise, while scaling or new applications run in the cloud. What matters is the right mix per use case.",
      },
      {
        question: "Does data stay GDPR-compliant in the cloud?",
        answer:
          "It can, but this depends on the provider, region and configuration. What matters is choosing a data center in the EU, clear arrangements for data processing as well as suitable measures for access control and encryption.",
      },
      {
        question: "What does the shared responsibility model mean?",
        answer:
          "It describes that the cloud provider ensures the security of the infrastructure, while the customer remains responsible for secure configuration, identities, permissions and their own data. Knowing this boundary helps avoid typical gaps in cloud security.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Cloud computing: definition & cloud types | smiit glossary",
    metaDescription:
      "Cloud computing explained: definition, difference from on-premise, service models (IaaS/PaaS/SaaS) and cloud types (public, private, hybrid, multi-cloud) – with practical context from smiit.",
  },
}

const cloudInfrastruktur: LocalizedGlossaryTerm = {
  de: {
    slug: "cloud-infrastructure",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Cloud-Infrastruktur",
    title: "Was ist Cloud-Infrastruktur?",
    shortDefinition:
      "Cloud-Infrastruktur umfasst die Rechen-, Speicher- und Netzwerkressourcen, die ein Anbieter über das Internet bereitstellt und die bei Bedarf abgerufen werden. Statt eigener Hardware nutzen Unternehmen flexibel skalierbare Dienste und zahlen nach Verbrauch.",
    synonyms: ["Cloud-Ressourcen", "IaaS", "Cloud-Plattform-Infrastruktur"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Cloud-Infrastruktur genutzt?",
        paragraphs: [
          "Cloud-Infrastruktur bildet das technische Fundament für Anwendungen, Datenbanken und Dienste, ohne dass ein Unternehmen eigene Server betreiben muss. Anbieter wie Microsoft Azure stellen virtuelle Maschinen, verwaltete Datenbanken, Speicher und Netzwerkkomponenten bereit, die sich per Konfiguration oder Code anlegen und verändern lassen.",
          "Im Mittelstand ersetzt sie zunehmend lokale Serverräume. Ressourcen lassen sich in Minuten bereitstellen, bei steigender Last automatisch erweitern und bei Bedarf wieder reduzieren. Das senkt Investitionskosten und verlagert den Betrieb von Hardware hin zur Konfiguration und Steuerung von Diensten.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein wachsendes Unternehmen startet eine neue Webanwendung. Statt Server zu kaufen, wird die Anwendung in Azure App Service betrieben, die Daten in einer verwalteten Azure Database for PostgreSQL gehalten und der Zugriff über Azure Front Door abgesichert. Bei Lastspitzen skaliert die Plattform automatisch, in ruhigen Phasen sinken die Kosten – ohne dass jemand Hardware anfassen muss.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Cloud-Infrastruktur verbindet Flexibilität mit Planbarkeit: Ressourcen folgen dem tatsächlichen Bedarf, und Sicherheits- sowie Verfügbarkeitsfunktionen sind eingebaut.",
        ],
        bullets: [
          "Bedarfsgerechte Skalierung statt Überprovisionierung von Hardware",
          "Verbrauchsabhängige Abrechnung statt hoher Vorabinvestitionen",
          "Verwaltete Dienste für Datenbanken, Netzwerk und Sicherheit",
          "Geografische Verteilung und Ausfallsicherheit über Regionen hinweg",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Cloud-Infrastruktur entspricht im Wesentlichen dem IaaS- und teils PaaS-Modell und liefert die Bausteine, auf denen SaaS-Anwendungen und digitale Plattformen laufen. Sie beschreibt das Was an Ressourcen; die Frage, wie diese Ressourcen sicher und regelkonform betrieben werden, fällt in den Bereich der Cloud Governance.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "Für die Claimity AG hat smiit die komplette Cloud-Infrastruktur auf Microsoft Azure aufgebaut und die SaaS-Plattform in sechs Wochen produktiv gebracht. Eingesetzt wurden Azure App Service als Laufzeitumgebung, Azure Database for PostgreSQL für die Datenhaltung, Azure Front Door für Zustellung und Schutz sowie Azure Key Vault für die sichere Verwaltung von Geheimnissen. Die Multi-Tenant-Architektur trennt Mandanten zuverlässig, der Betrieb erfolgt durchgängig DSGVO-konform.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Cloud-Infrastruktur und einer Cloud-Anwendung?",
        answer:
          "Die Infrastruktur stellt Rechenleistung, Speicher und Netzwerk bereit, die Anwendung ist die darauf laufende Software. Eine SaaS-Anwendung nutzt Cloud-Infrastruktur als Fundament, ist aber selbst kein Infrastrukturdienst.",
      },
      {
        question: "Ist Cloud-Infrastruktur für den Mittelstand sicher?",
        answer:
          "Ja, sofern sie korrekt konfiguriert und mit klarer Cloud Governance betrieben wird. Anbieter wie Microsoft Azure bieten umfangreiche Sicherheits- und Compliance-Funktionen, die für einen DSGVO-konformen Betrieb genutzt werden können.",
      },
      {
        question: "Spart Cloud-Infrastruktur wirklich Kosten?",
        answer:
          "Sie ersetzt hohe Vorabinvestitionen durch verbrauchsabhängige Kosten und vermeidet Überprovisionierung. Der größte Hebel ist, Ressourcen passend zur tatsächlichen Last zu dimensionieren und nicht genutzte Dienste konsequent abzuschalten.",
      },
      {
        question: "Was ist Infrastructure as Code?",
        answer:
          "Infrastructure as Code bedeutet, Cloud-Ressourcen über versionierte Konfigurationsdateien zu beschreiben statt sie manuell anzuklicken. Das macht Umgebungen reproduzierbar, nachvollziehbar und leicht in Test- und Produktivstufen wiederholbar.",
      },
      {
        question: "Wie sorgt man für Ausfallsicherheit in der Cloud-Infrastruktur?",
        answer:
          "Anbieter bieten Mechanismen wie redundante Verfügbarkeitszonen, geografische Verteilung über Regionen und automatische Sicherungen. Wie viel davon nötig ist, richtet sich nach den Anforderungen an Verfügbarkeit und Wiederanlaufzeit der jeweiligen Anwendung.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Cloud-Infrastruktur: Definition & Azure-Praxis | smiit Glossar",
    metaDescription:
      "Cloud-Infrastruktur einfach erklärt: Definition, Abgrenzung zu SaaS und Cloud Governance, Vorteile und Anwendungsfälle – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "cloud-infrastructure",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Cloud infrastructure",
    title: "What is cloud infrastructure?",
    shortDefinition:
      "Cloud infrastructure comprises the compute, storage and networking resources that a provider delivers over the internet and that are consumed on demand. Instead of owning hardware, companies use flexibly scalable services and pay according to usage.",
    synonyms: ["cloud resources", "IaaS", "cloud platform infrastructure"],
    sections: [
      {
        heading: "Where cloud infrastructure is used",
        paragraphs: [
          "Cloud infrastructure forms the technical foundation for applications, databases and services without a company having to run its own servers. Providers like Microsoft Azure deliver virtual machines, managed databases, storage and networking components that can be created and changed via configuration or code.",
          "In mid-sized companies it increasingly replaces local server rooms. Resources can be provisioned in minutes, expanded automatically under rising load and reduced again when needed. This lowers capital expenditure and shifts operations away from hardware toward configuring and steering services.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A growing company launches a new web application. Instead of buying servers, the application runs on Azure App Service, the data is held in a managed Azure Database for PostgreSQL and access is secured through Azure Front Door. During load peaks the platform scales automatically, in quiet phases costs drop – without anyone touching hardware.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Cloud infrastructure combines flexibility with predictability: resources follow actual demand, and security and availability features are built in.",
        ],
        bullets: [
          "On-demand scaling instead of over-provisioning hardware",
          "Usage-based billing instead of large upfront investments",
          "Managed services for databases, networking and security",
          "Geographic distribution and resilience across regions",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Cloud infrastructure essentially corresponds to the IaaS and partly PaaS model and supplies the building blocks on which SaaS applications and digital platforms run. It describes the what of resources; the question of how those resources are operated securely and in compliance falls under cloud governance.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "For Claimity AG, smiit built the complete cloud infrastructure on Microsoft Azure and brought the SaaS platform into production in six weeks. Azure App Service served as the runtime environment, Azure Database for PostgreSQL for data storage, Azure Front Door for delivery and protection, and Azure Key Vault for the secure management of secrets. The multi-tenant architecture reliably separates tenants, and operations are GDPR-compliant throughout.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between cloud infrastructure and a cloud application?",
        answer:
          "The infrastructure provides compute, storage and networking, while the application is the software running on top of it. A SaaS application uses cloud infrastructure as its foundation but is not itself an infrastructure service.",
      },
      {
        question: "Is cloud infrastructure secure for mid-sized companies?",
        answer:
          "Yes, provided it is configured correctly and operated with clear cloud governance. Providers like Microsoft Azure offer extensive security and compliance features that can be used for GDPR-compliant operations.",
      },
      {
        question: "Does cloud infrastructure really save costs?",
        answer:
          "It replaces large upfront investments with usage-based costs and avoids over-provisioning. The biggest lever is sizing resources to match actual load and consistently shutting down unused services.",
      },
      {
        question: "What is infrastructure as code?",
        answer:
          "Infrastructure as code means describing cloud resources through versioned configuration files instead of clicking them together manually. This makes environments reproducible, traceable and easy to repeat across test and production stages.",
      },
      {
        question: "How do you ensure resilience in cloud infrastructure?",
        answer:
          "Providers offer mechanisms such as redundant availability zones, geographic distribution across regions and automatic backups. How much of this is needed depends on the availability and recovery-time requirements of the respective application.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Cloud infrastructure: definition & Azure practice | smiit glossary",
    metaDescription:
      "Cloud infrastructure explained simply: definition, difference from SaaS and cloud governance, benefits and use cases – with hands-on Azure context from smiit.",
  },
}

const cloudGovernance: LocalizedGlossaryTerm = {
  de: {
    slug: "cloud-governance",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Cloud Governance",
    title: "Was ist Cloud Governance?",
    shortDefinition:
      "Cloud Governance umfasst die Regeln, Richtlinien und Kontrollen, mit denen Unternehmen die Nutzung ihrer Cloud-Umgebung steuern. Sie sorgt dafür, dass Sicherheit, Kosten, Compliance und Verantwortlichkeiten klar geregelt sind und Cloud-Ressourcen kontrolliert betrieben werden.",
    synonyms: ["Cloud-Steuerung", "Cloud-Compliance", "Governance-Framework für die Cloud"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Cloud Governance genutzt?",
        paragraphs: [
          "Cloud Governance beantwortet die Frage, wie eine Cloud-Umgebung sicher, wirtschaftlich und regelkonform betrieben wird. Sie legt fest, wer welche Ressourcen anlegen darf, wie Zugriffe geregelt sind, welche Sicherheitsstandards gelten und wie Kosten überwacht werden. Damit verhindert sie Wildwuchs und unkontrollierte Ausgaben.",
          "In Microsoft Azure wird Governance über Mechanismen wie rollenbasierte Zugriffssteuerung, Richtlinien (Policies), Ressourcengruppen und zentrale Geheimnisverwaltung umgesetzt. Im Mittelstand schafft das die nötige Ordnung, sobald mehrere Personen oder Teams mit der Cloud arbeiten.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Unternehmen betreibt mehrere Anwendungen in der Cloud. Über Governance-Regeln wird festgelegt, dass produktive Ressourcen nur in genehmigten Regionen laufen, Zugriffe nach dem Prinzip der minimalen Rechte vergeben werden und Geheimnisse ausschließlich in einem zentralen Tresor wie Azure Key Vault liegen. Kostenwarnungen melden frühzeitig, wenn ein Budget überschritten zu werden droht.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Gute Cloud Governance schützt vor Sicherheitslücken, unklaren Verantwortlichkeiten und ausufernden Kosten – ohne die Geschwindigkeit der Teams unnötig zu bremsen.",
        ],
        bullets: [
          "Einheitliche Sicherheits- und Zugriffsregeln über alle Umgebungen hinweg",
          "Kostentransparenz und Budgetkontrolle durch Monitoring und Warnungen",
          "Nachweisbare Compliance, etwa für DSGVO-Anforderungen",
          "Klare Verantwortlichkeiten und Vermeidung ungenutzter oder unsicherer Ressourcen",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Während Cloud-Infrastruktur die technischen Ressourcen bereitstellt, regelt Cloud Governance deren kontrollierten Einsatz. Sie ist kein einzelner Dienst, sondern ein Rahmenwerk aus Richtlinien und Kontrollen, das quer über Infrastruktur, digitale Plattformen und SaaS-Anwendungen wirkt und eng mit Sicherheits- und Compliance-Themen verzahnt ist.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "Beim Aufbau der SaaS-Plattform für die Claimity AG hat smiit Cloud Governance von Beginn an mitgedacht. Geheimnisse liegen sicher in Azure Key Vault, Identität und mehrstufige Authentifizierung laufen über Keycloak, und die Multi-Tenant-Architektur trennt Kundendaten sauber. Azure Front Door sichert den Zugriff, und der gesamte Betrieb auf Microsoft Azure ist DSGVO-konform ausgelegt – so blieb die Plattform trotz Umsetzung in sechs Wochen kontrolliert und nachvollziehbar.",
        ],
      },
    ],
    faq: [
      {
        question: "Wofür brauche ich Cloud Governance überhaupt?",
        answer:
          "Sobald mehrere Personen oder Teams Cloud-Ressourcen nutzen, drohen ohne klare Regeln Sicherheitslücken, doppelte Kosten und unklare Verantwortlichkeiten. Governance schafft Ordnung, Transparenz und Compliance.",
      },
      {
        question: "Bremst Cloud Governance die Entwicklung aus?",
        answer:
          "Richtig umgesetzt nicht. Sie automatisiert Leitplanken über Richtlinien und Rollen, sodass Teams innerhalb sicherer Grenzen schnell arbeiten können, statt jede Entscheidung manuell freizugeben.",
      },
      {
        question: "Hilft Cloud Governance bei der DSGVO?",
        answer:
          "Ja. Klare Regeln zu Datenstandorten, Zugriffen und Geheimnisverwaltung sowie nachvollziehbare Kontrollen sind eine wichtige Grundlage, um DSGVO-Anforderungen in der Cloud nachweisbar zu erfüllen.",
      },
      {
        question: "Wann sollte man mit Cloud Governance beginnen?",
        answer:
          "Am besten von Anfang an. Werden Leitplanken erst nachträglich eingezogen, müssen bereits gewachsene Strukturen mühsam aufgeräumt werden. Schon ein schlanker Satz an Regeln zu Zugriffen, Namensgebung und Kostenkontrolle reicht für den Start und lässt sich später erweitern.",
      },
      {
        question: "Wie behält man die Cloud-Kosten unter Kontrolle?",
        answer:
          "Hilfreich sind Budgets mit automatischen Warnungen, eine konsequente Kennzeichnung von Ressourcen (Tags) zur verursachergerechten Zuordnung sowie regelmäßige Überprüfungen auf ungenutzte oder überdimensionierte Dienste. Governance verankert diese Praktiken als feste Regeln statt als gelegentliche Aufräumaktion.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was ist Cloud Governance? Definition & Praxis | smiit Glossar",
    metaDescription:
      "Cloud Governance einfach erklärt: Definition, Abgrenzung zur Cloud-Infrastruktur, Vorteile für Sicherheit, Kosten und DSGVO – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "cloud-governance",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Cloud governance",
    title: "What is cloud governance?",
    shortDefinition:
      "Cloud governance comprises the rules, policies and controls with which companies steer the use of their cloud environment. It ensures that security, cost, compliance and responsibilities are clearly defined and that cloud resources are operated in a controlled way.",
    synonyms: ["cloud control", "cloud compliance", "cloud governance framework"],
    sections: [
      {
        heading: "Where cloud governance is used",
        paragraphs: [
          "Cloud governance answers the question of how a cloud environment is operated securely, economically and in compliance. It defines who may create which resources, how access is regulated, which security standards apply and how costs are monitored. This prevents sprawl and uncontrolled spending.",
          "In Microsoft Azure, governance is implemented through mechanisms such as role-based access control, policies, resource groups and central secret management. In mid-sized companies this creates the necessary order as soon as several people or teams work with the cloud.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A company runs several applications in the cloud. Governance rules specify that production resources only run in approved regions, access is granted on a least-privilege basis and secrets are stored exclusively in a central vault such as Azure Key Vault. Cost alerts warn early when a budget is about to be exceeded.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Good cloud governance protects against security gaps, unclear responsibilities and runaway costs – without unnecessarily slowing down teams.",
        ],
        bullets: [
          "Uniform security and access rules across all environments",
          "Cost transparency and budget control through monitoring and alerts",
          "Demonstrable compliance, for example for GDPR requirements",
          "Clear responsibilities and avoidance of unused or insecure resources",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "While cloud infrastructure provides the technical resources, cloud governance regulates their controlled use. It is not a single service but a framework of policies and controls that acts across infrastructure, digital platforms and SaaS applications and is closely interlinked with security and compliance topics.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "When building the SaaS platform for Claimity AG, smiit considered cloud governance from the outset. Secrets are stored securely in Azure Key Vault, identity and multi-factor authentication run via Keycloak, and the multi-tenant architecture cleanly separates customer data. Azure Front Door secures access, and the entire operation on Microsoft Azure is designed to be GDPR-compliant – so the platform remained controlled and traceable despite being delivered in six weeks.",
        ],
      },
    ],
    faq: [
      {
        question: "Why do I even need cloud governance?",
        answer:
          "As soon as several people or teams use cloud resources, the lack of clear rules risks security gaps, duplicate costs and unclear responsibilities. Governance creates order, transparency and compliance.",
      },
      {
        question: "Does cloud governance slow down development?",
        answer:
          "Implemented correctly, no. It automates guardrails through policies and roles so that teams can work quickly within safe boundaries instead of manually approving every decision.",
      },
      {
        question: "Does cloud governance help with GDPR?",
        answer:
          "Yes. Clear rules on data locations, access and secret management as well as traceable controls are an important basis for demonstrably meeting GDPR requirements in the cloud.",
      },
      {
        question: "When should you start with cloud governance?",
        answer:
          "Ideally from the very beginning. If guardrails are only introduced afterwards, already-grown structures have to be cleaned up laboriously. Even a lean set of rules on access, naming and cost control is enough to start and can be extended later.",
      },
      {
        question: "How do you keep cloud costs under control?",
        answer:
          "Budgets with automatic alerts, consistent tagging of resources for accurate cost allocation, and regular reviews for unused or oversized services all help. Governance anchors these practices as fixed rules instead of an occasional clean-up exercise.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What is cloud governance? Definition & practice | smiit glossary",
    metaDescription:
      "Cloud governance explained simply: definition, difference from cloud infrastructure, benefits for security, cost and GDPR – with hands-on Azure context from smiit.",
  },
}

const sdlc: LocalizedGlossaryTerm = {
  de: {
    slug: "sdlc",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "SDLC (Software Development Life Cycle)",
    title: "Was ist der SDLC (Software Development Life Cycle)?",
    shortDefinition:
      "Der Software Development Life Cycle (SDLC) beschreibt den strukturierten Ablauf der Softwareentwicklung von der Idee bis zum Betrieb. Er gliedert das Vorgehen in Phasen wie Analyse, Design, Entwicklung, Test, Auslieferung und Wartung und schafft so Planbarkeit und Qualität.",
    synonyms: ["Softwareentwicklungszyklus", "Entwicklungslebenszyklus", "SDLC-Prozess"],
    sections: [
      {
        heading: "Einordnung: Wofür wird der SDLC genutzt?",
        paragraphs: [
          "Der SDLC gibt Softwareprojekten einen verlässlichen Rahmen, indem er die Arbeit in nachvollziehbare Phasen unterteilt. Jede Phase hat klare Ziele und Ergebnisse, von der Anforderungsanalyse über Design und Implementierung bis zu Test, Auslieferung und laufendem Betrieb. So werden Risiken früh erkannt und Qualität systematisch gesichert.",
          "Ob klassisch sequenziell oder iterativ-agil – der SDLC strukturiert die Zusammenarbeit zwischen Fachbereich und Entwicklung. Im Mittelstand sorgt er dafür, dass auch knappe Budgets und kurze Zeitfenster effizient genutzt werden und Software wartbar bleibt.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Für eine neue Anwendung werden zunächst Anforderungen mit den Fachbereichen geklärt und priorisiert. Es folgt ein Architektur- und Datenmodell-Design, anschließend wird in kurzen Zyklen entwickelt und getestet. Nach automatisierten Tests geht eine erste Version live, danach wird die Software auf Basis von Rückmeldungen iterativ erweitert und gepflegt – ein vollständiger Durchlauf des Lebenszyklus.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Ein klar definierter SDLC reduziert Risiken, macht Aufwände planbar und sorgt für gleichbleibende Qualität – besonders wenn mehrere Beteiligte zusammenarbeiten.",
        ],
        bullets: [
          "Planbare Phasen mit klaren Ergebnissen und Verantwortlichkeiten",
          "Frühe Fehlererkennung durch systematische Tests und Reviews",
          "Bessere Wartbarkeit durch dokumentierte Entscheidungen und sauberes Design",
          "Schnellere Auslieferung über automatisierte Build- und Test-Pipelines",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Der SDLC beschreibt den gesamten Lebenszyklus, während konkrete Vorgehensmodelle wie agile Methoden oder DevOps festlegen, wie einzelne Phasen umgesetzt werden. Ein MVP ist dabei ein typisches Ergebnis früher SDLC-Durchläufe, und die fertige Software läuft anschließend auf Cloud-Infrastruktur, oft als Teil einer digitalen Plattform.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "Bei der SaaS-Plattform für die Claimity AG hat smiit einen straffen SDLC genutzt, um in nur sechs Wochen produktiv zu gehen. Anforderungen wurden früh geklärt, die Multi-Tenant-Architektur sauber entworfen und in kurzen Zyklen auf Microsoft Azure umgesetzt – mit Azure App Service, Azure Database for PostgreSQL und REST-APIs. Tests, sichere Geheimnisverwaltung über Azure Key Vault und ein DSGVO-konformer Betrieb waren von Anfang an Teil des Lebenszyklus.",
        ],
      },
    ],
    faq: [
      {
        question: "Welche Phasen gehören zum SDLC?",
        answer:
          "Typisch sind Anforderungsanalyse, Design, Entwicklung, Test, Auslieferung und Wartung. Je nach Vorgehensmodell werden diese Phasen einmal sequenziell oder wiederholt in kurzen Iterationen durchlaufen.",
      },
      {
        question: "Ist der SDLC dasselbe wie agile Entwicklung?",
        answer:
          "Nein. Der SDLC beschreibt den Lebenszyklus an sich, agile Methoden sind ein Weg, diesen Zyklus iterativ und flexibel umzusetzen. Auch klassische, sequenzielle Vorgehen folgen einem SDLC.",
      },
      {
        question: "Lohnt sich ein strukturierter SDLC auch bei kleinen Projekten?",
        answer:
          "Ja. Schon ein leichtgewichtiger SDLC mit klaren Phasen und automatisierten Tests senkt Fehlerquoten und Wartungsaufwand spürbar, ohne kleine Teams mit unnötiger Bürokratie zu belasten.",
      },
      {
        question: "Wie hängen SDLC und DevOps zusammen?",
        answer:
          "Der SDLC beschreibt die Phasen von der Idee bis zur Wartung, DevOps verbindet Entwicklung und Betrieb und automatisiert Übergänge etwa über Build-, Test- und Deployment-Pipelines. DevOps ist damit kein Ersatz für den SDLC, sondern eine Art, ihn schneller und durchgängiger umzusetzen.",
      },
      {
        question: "Welche Rolle spielt Sicherheit im SDLC?",
        answer:
          "Sicherheit sollte nicht erst am Ende geprüft, sondern über alle Phasen hinweg mitgedacht werden – von der Anforderungsanalyse über sicheres Design bis zu automatisierten Sicherheitstests. Dieser Ansatz wird oft als Security by Design oder DevSecOps bezeichnet.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "SDLC: Software Development Life Cycle erklärt | smiit Glossar",
    metaDescription:
      "SDLC einfach erklärt: Definition, Phasen, Abgrenzung zu Agile und DevOps sowie Vorteile – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "sdlc",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "SDLC (software development life cycle)",
    title: "What is the SDLC (software development life cycle)?",
    shortDefinition:
      "The software development life cycle (SDLC) describes the structured course of software development from idea to operation. It divides the work into phases such as analysis, design, development, testing, delivery and maintenance, creating predictability and quality.",
    synonyms: ["software development cycle", "development life cycle", "SDLC process"],
    sections: [
      {
        heading: "Where the SDLC is used",
        paragraphs: [
          "The SDLC gives software projects a reliable framework by dividing the work into traceable phases. Each phase has clear goals and deliverables, from requirements analysis through design and implementation to testing, delivery and ongoing operation. This way, risks are identified early and quality is systematically assured.",
          "Whether classically sequential or iterative and agile, the SDLC structures the collaboration between business departments and development. In mid-sized companies it ensures that even tight budgets and short time windows are used efficiently and that software remains maintainable.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a new application, requirements are first clarified and prioritized with the business departments. This is followed by architecture and data-model design, after which development and testing proceed in short cycles. After automated tests, a first version goes live, and the software is then iteratively extended and maintained based on feedback – a full run through the life cycle.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "A clearly defined SDLC reduces risks, makes effort predictable and ensures consistent quality – especially when several parties collaborate.",
        ],
        bullets: [
          "Predictable phases with clear deliverables and responsibilities",
          "Early defect detection through systematic tests and reviews",
          "Better maintainability through documented decisions and clean design",
          "Faster delivery via automated build and test pipelines",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "The SDLC describes the entire life cycle, while concrete approaches such as agile methods or DevOps define how individual phases are implemented. An MVP is a typical outcome of early SDLC runs, and the finished software then runs on cloud infrastructure, often as part of a digital platform.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "For the SaaS platform for Claimity AG, smiit used a streamlined SDLC to go into production in just six weeks. Requirements were clarified early, the multi-tenant architecture was cleanly designed and implemented in short cycles on Microsoft Azure – with Azure App Service, Azure Database for PostgreSQL and REST APIs. Testing, secure secret management via Azure Key Vault and GDPR-compliant operations were part of the life cycle from the start.",
        ],
      },
    ],
    faq: [
      {
        question: "Which phases belong to the SDLC?",
        answer:
          "Typical ones are requirements analysis, design, development, testing, delivery and maintenance. Depending on the approach, these phases are run through once sequentially or repeatedly in short iterations.",
      },
      {
        question: "Is the SDLC the same as agile development?",
        answer:
          "No. The SDLC describes the life cycle itself, while agile methods are one way to implement that cycle iteratively and flexibly. Classic, sequential approaches also follow an SDLC.",
      },
      {
        question: "Is a structured SDLC worthwhile for small projects too?",
        answer:
          "Yes. Even a lightweight SDLC with clear phases and automated tests noticeably reduces defect rates and maintenance effort without burdening small teams with unnecessary bureaucracy.",
      },
      {
        question: "How are the SDLC and DevOps related?",
        answer:
          "The SDLC describes the phases from idea to maintenance, while DevOps connects development and operations and automates transitions through build, test and deployment pipelines, for example. DevOps is therefore not a replacement for the SDLC but a way to implement it faster and more seamlessly.",
      },
      {
        question: "What role does security play in the SDLC?",
        answer:
          "Security should not only be checked at the end but considered across all phases – from requirements analysis through secure design to automated security tests. This approach is often called security by design or DevSecOps.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "SDLC: software development life cycle | smiit glossary",
    metaDescription:
      "SDLC explained simply: definition, phases, difference from Agile and DevOps, and benefits – with hands-on Azure context from smiit.",
  },
}

const multiTenantArchitektur: LocalizedGlossaryTerm = {
  de: {
    slug: "multi-tenant-architecture",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Multi-Tenant-Architektur",
    title: "Was ist eine Multi-Tenant-Architektur?",
    shortDefinition:
      "Eine Multi-Tenant-Architektur ist ein Aufbau, bei dem eine einzige Anwendung mehrere Kunden (Mandanten) bedient und deren Daten logisch sauber voneinander trennt. Alle nutzen dieselbe Software und Infrastruktur, sehen aber jeweils nur ihre eigenen Daten.",
    synonyms: ["Mandantenfähigkeit", "Multi-Tenancy", "mehrmandantenfähige Architektur"],
    sections: [
      {
        heading: "Einordnung: Wofür wird eine Multi-Tenant-Architektur genutzt?",
        paragraphs: [
          "Multi-Tenancy ist das Grundprinzip vieler SaaS-Lösungen und digitaler Plattformen. Statt für jeden Kunden eine eigene Installation zu betreiben, läuft eine gemeinsame Anwendung, die Daten und Konfigurationen pro Mandant trennt. Das senkt Betriebs- und Wartungsaufwand erheblich, weil Updates und Sicherheitskorrekturen nur einmal eingespielt werden müssen.",
          "Technisch lässt sich die Trennung über getrennte Datenbanken, getrennte Schemata oder gemeinsame Tabellen mit Mandantenkennung umsetzen. In Microsoft Azure wird dies häufig mit Azure App Service und einer verwalteten Datenbank wie Azure Database for PostgreSQL kombiniert.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine SaaS-Plattform bedient zehn Versicherungskunden über dieselbe Anwendung. Jeder Mandant meldet sich über einen eigenen Bereich an und sieht ausschließlich seine eigenen Vorgänge und Daten. Im Hintergrund sorgt eine Mandantenkennung dafür, dass jede Abfrage strikt auf den jeweiligen Kunden begrenzt bleibt – eine neue Anbindung erfordert keine separate Installation, sondern nur einen weiteren Mandanten.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Im Gegensatz zur Single-Tenant-Architektur, bei der jeder Kunde eine eigene Instanz erhält, teilt sich bei Multi-Tenancy alles eine Basis – das spart Kosten, erfordert aber besonders sorgfältige Datentrennung und Zugriffskontrolle. smiit hat die SaaS-Plattform der Claimity AG von Grund auf mandantenfähig auf Microsoft Azure gebaut: Die Multi-Tenant-Architektur trennt Kundendaten zuverlässig, Keycloak steuert Identität und MFA, und der Betrieb ist durchgängig DSGVO-konform. So konnte die Plattform in sechs Wochen produktiv gehen und wächst seitdem mandantenweise mit.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie werden Kundendaten in einer Multi-Tenant-Architektur getrennt?",
        answer:
          "Die Trennung erfolgt über getrennte Datenbanken, getrennte Schemata oder eine Mandantenkennung in gemeinsamen Tabellen. Entscheidend ist, dass jede Abfrage und jeder Zugriff strikt auf den jeweiligen Mandanten beschränkt bleibt.",
      },
      {
        question: "Ist Multi-Tenancy sicher genug für sensible Daten?",
        answer:
          "Ja, sofern Datentrennung, Zugriffskontrolle und Identitätsverwaltung sauber umgesetzt sind. Mit klaren Mandantengrenzen, MFA über Keycloak und DSGVO-konformem Betrieb lassen sich auch sensible Branchen wie Versicherungen sicher abbilden.",
      },
      {
        question: "Was ist der Unterschied zwischen Multi-Tenant und Single-Tenant?",
        answer:
          "Bei Single-Tenant erhält jeder Kunde eine eigene Instanz, bei Multi-Tenant teilen sich alle Kunden eine gemeinsame Anwendung und Infrastruktur. Multi-Tenancy senkt Betriebs- und Wartungsaufwand, erfordert dafür aber eine besonders sorgfältige Datentrennung.",
      },
      {
        question: "Wie wirkt sich Multi-Tenancy auf Updates und Wartung aus?",
        answer:
          "Da alle Mandanten dieselbe Software nutzen, müssen Updates und Sicherheitskorrekturen nur einmal eingespielt werden und stehen sofort allen Kunden zur Verfügung. Das reduziert den Wartungsaufwand erheblich, verlangt aber sorgfältige Tests, da eine Änderung alle Mandanten gleichzeitig betrifft.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Multi-Tenant-Architektur: Definition & Praxis | smiit Glossar",
    metaDescription:
      "Multi-Tenant-Architektur einfach erklärt: Definition, Datentrennung, Abgrenzung zu Single-Tenant – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "multi-tenant-architecture",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Multi-tenant architecture",
    title: "What is a multi-tenant architecture?",
    shortDefinition:
      "A multi-tenant architecture is a setup in which a single application serves multiple customers (tenants) and cleanly separates their data on a logical level. They all use the same software and infrastructure but each see only their own data.",
    synonyms: ["multi-tenancy", "tenant capability", "multi-tenant-capable architecture"],
    sections: [
      {
        heading: "Where a multi-tenant architecture is used",
        paragraphs: [
          "Multi-tenancy is the basic principle of many SaaS solutions and digital platforms. Instead of running a separate installation for each customer, a shared application runs that separates data and configurations per tenant. This significantly reduces operating and maintenance effort because updates and security fixes only have to be applied once.",
          "Technically, the separation can be implemented through separate databases, separate schemas or shared tables with a tenant identifier. In Microsoft Azure this is often combined with Azure App Service and a managed database such as Azure Database for PostgreSQL.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A SaaS platform serves ten insurance customers through the same application. Each tenant logs in through its own area and sees only its own cases and data. In the background, a tenant identifier ensures that every query stays strictly limited to the respective customer – a new connection requires no separate installation, just one more tenant.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "In contrast to a single-tenant architecture, where each customer gets its own instance, with multi-tenancy everything shares one foundation – this saves cost but requires especially careful data separation and access control. smiit built Claimity AG's SaaS platform multi-tenant-capable from the ground up on Microsoft Azure: the multi-tenant architecture reliably separates customer data, Keycloak controls identity and MFA, and operations are GDPR-compliant throughout. This allowed the platform to go into production in six weeks and to grow tenant by tenant ever since.",
        ],
      },
    ],
    faq: [
      {
        question: "How is customer data separated in a multi-tenant architecture?",
        answer:
          "Separation is achieved through separate databases, separate schemas or a tenant identifier in shared tables. The crucial point is that every query and every access stays strictly limited to the respective tenant.",
      },
      {
        question: "Is multi-tenancy secure enough for sensitive data?",
        answer:
          "Yes, provided data separation, access control and identity management are implemented cleanly. With clear tenant boundaries, MFA via Keycloak and GDPR-compliant operations, even sensitive sectors such as insurance can be served securely.",
      },
      {
        question: "What is the difference between multi-tenant and single-tenant?",
        answer:
          "With single-tenant, each customer gets its own instance, while with multi-tenant all customers share a common application and infrastructure. Multi-tenancy lowers operating and maintenance effort but in return requires especially careful data separation.",
      },
      {
        question: "How does multi-tenancy affect updates and maintenance?",
        answer:
          "Because all tenants use the same software, updates and security fixes only have to be applied once and are immediately available to all customers. This significantly reduces maintenance effort but calls for careful testing, since one change affects all tenants at the same time.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Multi-tenant architecture explained | smiit glossary",
    metaDescription:
      "Multi-tenant architecture explained simply: definition, data separation, difference from single-tenant – with hands-on Azure context from smiit.",
  },
}

const restApi: LocalizedGlossaryTerm = {
  de: {
    slug: "rest-api",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "REST-API / API-Integration",
    title: "Was ist eine REST-API und API-Integration?",
    shortDefinition:
      "Eine REST-API ist eine standardisierte Schnittstelle, über die Software per HTTP Daten austauscht und Funktionen aufruft. API-Integration bezeichnet die Anbindung solcher Schnittstellen, damit verschiedene Systeme automatisiert miteinander kommunizieren.",
    synonyms: ["RESTful API", "Web-API", "Schnittstellen-Integration"],
    sections: [
      {
        heading: "Einordnung: Wofür wird eine REST-API genutzt?",
        paragraphs: [
          "REST-APIs sind das Bindeglied moderner Software. Sie stellen Funktionen und Daten über klar definierte HTTP-Endpunkte bereit, sodass andere Anwendungen sie maschinell abrufen oder verändern können – unabhängig von Programmiersprache oder Plattform. Datenformate wie JSON machen den Austausch einheitlich und gut verarbeitbar.",
          "API-Integration bedeutet, solche Schnittstellen sinnvoll zu verbinden: Eine SaaS-Plattform bindet etwa ein Buchhaltungssystem, einen Zahlungsdienst oder ein CRM an, damit Daten automatisch fließen statt manuell übertragen zu werden. Im Mittelstand löst das viele Medienbrüche und spart wiederkehrende Handarbeit.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine Versicherungsplattform soll Schadendaten an das Kernsystem eines Partners übergeben. Über eine REST-API sendet die Plattform die Vorgänge im JSON-Format an einen definierten Endpunkt, erhält eine Bestätigung zurück und aktualisiert den Status automatisch. Ein manueller Export entfällt, und beide Systeme bleiben in Echtzeit synchron.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "REST ist ein verbreiteter Architekturstil für Web-APIs, daneben existieren Varianten wie GraphQL oder SOAP; REST überzeugt durch Einfachheit, breite Unterstützung und gute Eignung für Cloud-Dienste. smiit hat die SaaS-Plattform der Claimity AG mit REST-APIs ausgestattet, um sie sauber an bestehende Systeme anzubinden. Betrieben auf Microsoft Azure mit Azure App Service, abgesichert über Azure Front Door und Keycloak für Identität und MFA, ermöglichen die APIs einen automatisierten, DSGVO-konformen Datenaustausch innerhalb der Multi-Tenant-Architektur.",
        ],
      },
    ],
    faq: [
      {
        question: "Was bedeutet REST bei einer API?",
        answer:
          "REST steht für einen Architekturstil, der Ressourcen über HTTP-Methoden wie GET, POST, PUT und DELETE anspricht. Daten werden typischerweise als JSON ausgetauscht, was die Schnittstelle einfach und plattformunabhängig nutzbar macht.",
      },
      {
        question: "Warum ist API-Integration für Unternehmen wichtig?",
        answer:
          "Sie verbindet getrennte Systeme, sodass Daten automatisch fließen statt manuell übertragen zu werden. Das reduziert Fehler, spart Zeit und ist die Grundlage für durchgängig digitale Prozesse und vernetzte Plattformen.",
      },
      {
        question: "Was ist der Unterschied zwischen REST und GraphQL?",
        answer:
          "Bei REST fragt man feste Endpunkte ab, die jeweils eine bestimmte Datenstruktur zurückgeben. Bei GraphQL beschreibt der Aufrufer in einer Abfrage genau, welche Felder er benötigt. REST ist einfacher und breit unterstützt, GraphQL flexibler bei komplexen, verschachtelten Datenabfragen.",
      },
      {
        question: "Wie sichert man eine REST-API ab?",
        answer:
          "Üblich sind Verschlüsselung über HTTPS, Authentifizierung etwa über Tokens oder OAuth, eine Begrenzung der Anfragerate (Rate Limiting) sowie eine sorgfältige Prüfung aller eingehenden Daten. So wird sichergestellt, dass nur berechtigte Systeme auf die richtigen Funktionen zugreifen.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was ist eine REST-API? API-Integration erklärt | smiit Glossar",
    metaDescription:
      "REST-API und API-Integration einfach erklärt: Definition, Funktionsweise, Abgrenzung zu GraphQL und SOAP – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "rest-api",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "REST API / API integration",
    title: "What is a REST API and API integration?",
    shortDefinition:
      "A REST API is a standardized interface through which software exchanges data and calls functions via HTTP. API integration refers to connecting such interfaces so that different systems communicate with each other automatically.",
    synonyms: ["RESTful API", "web API", "interface integration"],
    sections: [
      {
        heading: "Where a REST API is used",
        paragraphs: [
          "REST APIs are the connective tissue of modern software. They expose functions and data through clearly defined HTTP endpoints so that other applications can retrieve or change them programmatically – regardless of programming language or platform. Data formats such as JSON make the exchange uniform and easy to process.",
          "API integration means connecting such interfaces meaningfully: a SaaS platform might connect an accounting system, a payment service or a CRM so that data flows automatically instead of being transferred manually. In mid-sized companies this removes many manual handoffs between systems and saves recurring work.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "An insurance platform needs to hand claims data over to a partner's core system. Via a REST API, the platform sends the cases in JSON format to a defined endpoint, receives a confirmation back and updates the status automatically. A manual export is no longer needed, and both systems stay synchronized in real time.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "REST is a widespread architectural style for web APIs, alongside variants such as GraphQL or SOAP; REST stands out through simplicity, broad support and good suitability for cloud services. smiit equipped Claimity AG's SaaS platform with REST APIs to connect it cleanly to existing systems. Running on Microsoft Azure with Azure App Service, secured via Azure Front Door and Keycloak for identity and MFA, the APIs enable automated, GDPR-compliant data exchange within the multi-tenant architecture.",
        ],
      },
    ],
    faq: [
      {
        question: "What does REST mean in an API?",
        answer:
          "REST stands for an architectural style that addresses resources via HTTP methods such as GET, POST, PUT and DELETE. Data is typically exchanged as JSON, which makes the interface simple and usable independently of any platform.",
      },
      {
        question: "Why is API integration important for companies?",
        answer:
          "It connects separate systems so that data flows automatically instead of being transferred manually. This reduces errors, saves time and is the basis for end-to-end digital processes and connected platforms.",
      },
      {
        question: "What is the difference between REST and GraphQL?",
        answer:
          "With REST you query fixed endpoints that each return a specific data structure. With GraphQL the caller describes in a query exactly which fields they need. REST is simpler and broadly supported, while GraphQL is more flexible for complex, nested data queries.",
      },
      {
        question: "How do you secure a REST API?",
        answer:
          "Common measures are encryption via HTTPS, authentication through tokens or OAuth, limiting the request rate (rate limiting) and careful validation of all incoming data. This ensures that only authorized systems access the right functions.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What is a REST API? API integration explained | smiit glossary",
    metaDescription:
      "REST API and API integration explained simply: definition, how it works, difference from GraphQL and SOAP – with hands-on Azure context from smiit.",
  },
}

const mvp: LocalizedGlossaryTerm = {
  de: {
    slug: "mvp",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "MVP (Minimum Viable Product)",
    title: "Was ist ein MVP (Minimum Viable Product)?",
    shortDefinition:
      "Ein Minimum Viable Product (MVP) ist die erste, bewusst schlanke Version eines Produkts, die nur die wichtigsten Funktionen enthält. Es dient dazu, eine Idee mit minimalem Aufwand am Markt zu testen und auf Basis echter Rückmeldungen weiterzuentwickeln.",
    synonyms: ["minimal funktionsfähiges Produkt", "erste Produktversion", "MVP-Ansatz"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ein MVP genutzt?",
        paragraphs: [
          "Ein MVP reduziert ein Produkt auf den Kern, der nötig ist, um den zentralen Nutzen zu beweisen. Statt Monate in einen vollständigen Funktionsumfang zu investieren, gehen Teams früh mit einer lauffähigen Version live und lernen aus dem echten Einsatz, welche Funktionen wirklich gebraucht werden.",
          "Dieser Ansatz senkt das Risiko von Fehlinvestitionen, weil Annahmen früh überprüft werden. Im Mittelstand eignet er sich besonders, um neue digitale Angebote schnell zu testen, ohne von Beginn an ein großes Budget zu binden – oft als erster Durchlauf im SDLC.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Unternehmen will eine Plattform zur digitalen Schadenmeldung anbieten. Statt sofort alle denkbaren Funktionen zu bauen, startet das MVP mit dem Kernablauf: Schaden melden, Status verfolgen, Bestätigung erhalten. Nach dem Livegang zeigen Nutzungsdaten und Rückmeldungen, welche Erweiterungen – etwa Reporting oder Partneranbindung – als Nächstes sinnvoll sind.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Ein MVP ist nicht mit einem unfertigen oder fehlerhaften Produkt zu verwechseln: Es ist bewusst klein, aber stabil und nutzbar. Es bildet den Ausgangspunkt für die weitere Entwicklung entlang des SDLC und wächst später oft zu einer vollwertigen digitalen Plattform. smiit hat für die Claimity AG genau diesen Weg gewählt und eine funktionsfähige SaaS-Plattform in nur sechs Wochen produktiv auf Microsoft Azure gebracht – mit Multi-Tenant-Architektur, Azure App Service, Azure Database for PostgreSQL und REST-APIs, DSGVO-konform und von Anfang an erweiterbar angelegt.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist ein MVP einfach eine unfertige Version?",
        answer:
          "Nein. Ein MVP ist bewusst auf die wichtigsten Funktionen reduziert, dabei aber stabil und für echte Nutzer einsatzfähig. Ziel ist nicht ein halbfertiges Produkt, sondern ein verwertbarer Kern zum Lernen.",
      },
      {
        question: "Wie schnell lässt sich ein MVP umsetzen?",
        answer:
          "Das hängt vom Umfang ab, doch gerade die Konzentration auf den Kern macht kurze Zeiträume möglich. smiit hat etwa für die Claimity AG eine produktive SaaS-Plattform in sechs Wochen auf Azure realisiert.",
      },
      {
        question: "Was ist der Unterschied zwischen einem MVP und einem Prototyp?",
        answer:
          "Ein Prototyp dient meist nur dazu, eine Idee zu veranschaulichen, und wird oft wieder verworfen. Ein MVP ist dagegen ein echtes, nutzbares Produkt, das von Anfang an im Markt eingesetzt und schrittweise erweitert wird.",
      },
      {
        question: "Woran erkennt man, welche Funktionen ins MVP gehören?",
        answer:
          "Maßgeblich ist die zentrale Annahme, die überprüft werden soll: Welche Funktionen sind nötig, damit Nutzer den Kernnutzen erleben können? Alles, was diesen Kernablauf nicht stützt, wird bewusst auf spätere Iterationen verschoben.",
      },
      {
        question: "Was passiert mit einem MVP nach dem Markttest?",
        answer:
          "Auf Basis der gewonnenen Erkenntnisse wird das Produkt gezielt weiterentwickelt – Funktionen, die sich bewähren, werden ausgebaut, weniger relevante verworfen. So wächst das MVP entlang des SDLC iterativ zu einer vollwertigen Lösung.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was ist ein MVP? Minimum Viable Product erklärt | smiit Glossar",
    metaDescription:
      "MVP einfach erklärt: Definition, Zweck, Abgrenzung zum unfertigen Produkt und Bezug zum SDLC – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "mvp",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "MVP (minimum viable product)",
    title: "What is an MVP (minimum viable product)?",
    shortDefinition:
      "A minimum viable product (MVP) is the first, deliberately lean version of a product that contains only the most important functions. It serves to test an idea on the market with minimal effort and to develop it further based on real feedback.",
    synonyms: ["minimum viable product", "first product version", "MVP approach"],
    sections: [
      {
        heading: "Where an MVP is used",
        paragraphs: [
          "An MVP reduces a product to the core needed to prove its central value. Instead of investing months in a full feature set, teams go live early with a working version and learn from real usage which functions are actually needed.",
          "This approach lowers the risk of misguided investment because assumptions are validated early. In mid-sized companies it is especially suitable for quickly testing new digital offerings without committing a large budget from the start – often as the first run in the SDLC.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A company wants to offer a platform for digital claims reporting. Instead of building every conceivable function right away, the MVP starts with the core flow: report a claim, track its status, receive a confirmation. After going live, usage data and feedback show which extensions – such as reporting or partner connectivity – make sense next.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "An MVP should not be confused with an unfinished or faulty product: it is deliberately small, yet stable and usable. It forms the starting point for further development along the SDLC and often grows later into a full-fledged digital platform. smiit chose exactly this path for Claimity AG and brought a working SaaS platform into production on Microsoft Azure in just six weeks – with a multi-tenant architecture, Azure App Service, Azure Database for PostgreSQL and REST APIs, GDPR-compliant and designed to be extensible from the start.",
        ],
      },
    ],
    faq: [
      {
        question: "Is an MVP simply an unfinished version?",
        answer:
          "No. An MVP is deliberately reduced to the most important functions, yet stable and ready for real users. The goal is not a half-finished product but a usable core for learning.",
      },
      {
        question: "How quickly can an MVP be delivered?",
        answer:
          "That depends on scope, but precisely the focus on the core makes short timeframes possible. For Claimity AG, for example, smiit delivered a production SaaS platform on Azure in six weeks.",
      },
      {
        question: "What is the difference between an MVP and a prototype?",
        answer:
          "A prototype usually only serves to illustrate an idea and is often discarded afterwards. An MVP, by contrast, is a real, usable product that is put on the market from the start and extended step by step.",
      },
      {
        question: "How do you decide which functions belong in the MVP?",
        answer:
          "The decisive factor is the central assumption to be validated: which functions are needed for users to experience the core value? Anything that does not support this core flow is deliberately deferred to later iterations.",
      },
      {
        question: "What happens to an MVP after the market test?",
        answer:
          "Based on the insights gained, the product is developed further in a targeted way — functions that prove their worth are expanded, less relevant ones are dropped. This way the MVP grows iteratively into a full-fledged solution along the SDLC.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What is an MVP? Minimum viable product explained | smiit glossary",
    metaDescription:
      "MVP explained simply: definition, purpose, difference from an unfinished product and relation to the SDLC – with hands-on Azure context from smiit.",
  },
}

const devops: LocalizedGlossaryTerm = {
  de: {
    slug: "devops",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "DevOps",
    title: "Was ist DevOps?",
    shortDefinition:
      "DevOps ist eine Arbeitsweise, die Softwareentwicklung (Dev) und IT-Betrieb (Ops) eng verzahnt, um Software häufiger, schneller und zuverlässiger auszuliefern. Im Kern stehen Automatisierung, kurze Feedback-Schleifen und eine gemeinsame Verantwortung für das laufende System – von der ersten Codezeile bis zum Betrieb in der Cloud.",
    synonyms: ["DevSecOps", "Continuous Delivery", "Dev und Ops", "Azure DevOps"],
    sections: [
      {
        heading: "Einordnung: Wofür wird DevOps genutzt?",
        paragraphs: [
          "DevOps adressiert ein klassisches Problem: Entwicklung will schnell neue Funktionen liefern, der Betrieb will Stabilität – und zwischen beiden entstehen Reibung und manuelle Übergaben. DevOps löst das auf, indem Build, Test, Auslieferung und Betrieb so weit wie möglich automatisiert und in eine durchgängige Pipeline gegossen werden.",
          "Technisch ist DevOps kein einzelnes Werkzeug, sondern ein Zusammenspiel aus Praktiken: CI/CD für automatisiertes Bauen und Ausliefern, Infrastructure as Code für reproduzierbare Umgebungen, Monitoring für schnelles Feedback und eine Kultur gemeinsamer Verantwortung. In der Microsoft-Welt bildet Azure DevOps (oder GitHub Actions) das Rückgrat dieser Abläufe.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine neue SaaS-Plattform soll innerhalb weniger Wochen produktiv gehen. Statt Server manuell aufzusetzen und Releases von Hand einzuspielen, wird die gesamte Azure-Umgebung als Infrastructure as Code definiert und über DevOps-Pipelines automatisiert ausgerollt. Jede Code-Änderung durchläuft automatisierte Tests und wird kontrolliert in Test- und Produktivumgebungen ausgeliefert – nachvollziehbar, wiederholbar und ohne manuelle Fehlerquellen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "DevOps lohnt sich überall dort, wo Software regelmäßig weiterentwickelt und zuverlässig betrieben werden muss – besonders bei Cloud- und SaaS-Lösungen.",
        ],
        bullets: [
          "Schnellere und planbarere Releases durch automatisierte Pipelines",
          "Weniger Fehler durch reproduzierbare Umgebungen statt manueller Konfiguration",
          "Schnelle Rückmeldung über Monitoring und automatisierte Tests",
          "Klare Nachvollziehbarkeit, wer wann was ausgeliefert hat",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "DevOps ist der übergeordnete Ansatz; CI/CD und Infrastructure as Code (IaC) sind konkrete Bausteine darin. „Azure DevOps“ wiederum ist ein Produktname für eine Werkzeugplattform und nicht mit dem Konzept DevOps gleichzusetzen. Wird Sicherheit von Anfang an in die Pipeline integriert, spricht man von DevSecOps.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit setzt DevOps-Praktiken konsequent in Cloud-Projekten ein. Für die Claimity AG wurde eine SaaS-Plattform in nur sechs Wochen produktiv auf Azure gebracht – möglich durch eine vollständig als Infrastructure as Code beschriebene Infrastruktur und automatisierte DevOps-Pipelines. So bleiben Umgebungen reproduzierbar, Releases nachvollziehbar und der Betrieb von Beginn an stabil.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist DevOps nur etwas für große Tech-Unternehmen?",
        answer:
          "Nein. Gerade im Mittelstand sorgen DevOps-Praktiken dafür, dass kleine Teams Software zuverlässig ausliefern, ohne in manuelle Routinen und Fehler zu verfallen. Der Einstieg kann schrittweise erfolgen, etwa mit einer ersten CI/CD-Pipeline.",
      },
      {
        question: "Brauchen wir dafür ein eigenes DevOps-Team?",
        answer:
          "Nicht zwingend. DevOps ist primär eine Arbeitsweise, kein Stellenplan. Oft genügt es, bestehende Entwicklungs- und Betriebsaufgaben besser zu verzahnen und die richtigen Automatisierungen aufzusetzen.",
      },
      {
        question: "Wie hängt DevOps mit Sicherheit zusammen?",
        answer:
          "Eng. Wird Sicherheit früh in die Pipeline integriert – etwa durch automatisierte Prüfungen und sauber verwaltete Geheimnisse – spricht man von DevSecOps. Das verhindert, dass Sicherheit erst am Ende aufgesetzt wird.",
      },
      {
        question: "Worin unterscheiden sich DevOps und Agile?",
        answer:
          "Agile beschreibt vor allem, wie Anforderungen und Entwicklung organisiert werden – in kurzen, iterativen Zyklen. DevOps setzt eine Ebene tiefer an und sorgt dafür, dass die so entstandene Software auch automatisiert ausgeliefert und stabil betrieben wird. Beide ergänzen sich, lösen aber unterschiedliche Probleme.",
      },
      {
        question: "Wie fängt man mit der Einführung von DevOps an?",
        answer:
          "Meist mit dem größten manuellen Schmerzpunkt: häufig dem Bauen und Ausliefern von Software über eine erste CI/CD-Pipeline. Von dort lassen sich weitere Praktiken wie Infrastructure as Code und Monitoring schrittweise ergänzen, statt alles auf einmal umzustellen.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "DevOps: Definition, Praktiken & Nutzen | smiit Glossar",
    metaDescription:
      "DevOps erklärt: Wie Entwicklung und Betrieb durch CI/CD, IaC und Automatisierung zusammenwachsen – mit Praxisbeispiel von smiit (SaaS in 6 Wochen auf Azure).",
  },
  en: {
    slug: "devops",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "DevOps",
    title: "What is DevOps?",
    shortDefinition:
      "DevOps is a way of working that tightly integrates software development (Dev) and IT operations (Ops) to ship software more often, faster and more reliably. At its core are automation, short feedback loops and shared ownership of the running system — from the first line of code to operation in the cloud.",
    synonyms: ["DevSecOps", "continuous delivery", "dev and ops", "Azure DevOps"],
    sections: [
      {
        heading: "Where DevOps is used",
        paragraphs: [
          "DevOps addresses a classic problem: development wants to ship new features quickly, operations wants stability — and friction and manual handovers arise between the two. DevOps resolves this by automating build, test, delivery and operation as far as possible and casting them into a continuous pipeline.",
          "Technically, DevOps is not a single tool but an interplay of practices: CI/CD for automated building and shipping, infrastructure as code for reproducible environments, monitoring for fast feedback and a culture of shared ownership. In the Microsoft world, Azure DevOps (or GitHub Actions) forms the backbone of these workflows.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A new SaaS platform is meant to go live within a few weeks. Instead of setting up servers manually and deploying releases by hand, the entire Azure environment is defined as infrastructure as code and rolled out automatically through DevOps pipelines. Every code change runs through automated tests and is delivered in a controlled way to test and production environments — traceable, repeatable and free of manual error sources.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "DevOps pays off wherever software has to be developed continuously and operated reliably — especially for cloud and SaaS solutions.",
        ],
        bullets: [
          "Faster, more predictable releases through automated pipelines",
          "Fewer errors thanks to reproducible environments instead of manual configuration",
          "Fast feedback via monitoring and automated tests",
          "Clear traceability of who shipped what and when",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "DevOps is the overarching approach; CI/CD and infrastructure as code (IaC) are concrete building blocks within it. „Azure DevOps“, in turn, is a product name for a tooling platform and should not be equated with the DevOps concept. When security is integrated into the pipeline from the start, the term is DevSecOps.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit applies DevOps practices consistently in cloud projects. For Claimity AG, a SaaS platform was taken live on Azure in just six weeks — made possible by infrastructure fully described as infrastructure as code and automated DevOps pipelines. This keeps environments reproducible, releases traceable and operation stable from day one.",
        ],
      },
    ],
    faq: [
      {
        question: "Is DevOps only for large tech companies?",
        answer:
          "No. In SMEs in particular, DevOps practices help small teams ship software reliably without falling back into manual routines and errors. Adoption can be gradual, for example starting with a first CI/CD pipeline.",
      },
      {
        question: "Do we need a dedicated DevOps team for it?",
        answer:
          "Not necessarily. DevOps is primarily a way of working, not a staffing plan. Often it is enough to integrate existing development and operations tasks more closely and set up the right automation.",
      },
      {
        question: "How does DevOps relate to security?",
        answer:
          "Closely. When security is integrated into the pipeline early — for instance through automated checks and properly managed secrets — the term is DevSecOps. This prevents security from being bolted on only at the end.",
      },
      {
        question: "How do DevOps and Agile differ?",
        answer:
          "Agile mainly describes how requirements and development are organized — in short, iterative cycles. DevOps operates one level deeper and ensures that the resulting software is also delivered automatically and operated reliably. The two complement each other but solve different problems.",
      },
      {
        question: "How do you start adopting DevOps?",
        answer:
          "Usually with the biggest manual pain point, often building and shipping software via a first CI/CD pipeline. From there, further practices such as infrastructure as code and monitoring can be added step by step instead of changing everything at once.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "DevOps: definition, practices & benefits | smiit glossary",
    metaDescription:
      "DevOps explained: how development and operations merge through CI/CD, IaC and automation — with a smiit example (SaaS live on Azure in 6 weeks).",
  },
}

const itSicherheit: LocalizedGlossaryTerm = {
  de: {
    slug: "it-security",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IT-Sicherheit",
    title: "Was ist IT-Sicherheit?",
    shortDefinition:
      "IT-Sicherheit umfasst alle technischen und organisatorischen Maßnahmen, die Daten, Systeme und Anwendungen vor unbefugtem Zugriff, Manipulation und Ausfall schützen. Im Zentrum stehen die drei klassischen Schutzziele Vertraulichkeit, Integrität und Verfügbarkeit – also dass nur Befugte zugreifen, Daten korrekt bleiben und Systeme verlässlich laufen.",
    synonyms: ["Informationssicherheit", "Cybersecurity", "IT-Security", "Schutzbedarf"],
    sections: [
      {
        heading: "Einordnung: Wofür wird IT-Sicherheit genutzt?",
        paragraphs: [
          "IT-Sicherheit ist kein einzelnes Produkt, sondern ein Zusammenspiel vieler Schutzebenen: Identitäten und Zugriffe (IAM), Netzwerksegmentierung, Verschlüsselung, sicheres Geheimnis-Management, Protokollierung und ein geübter Umgang mit Vorfällen. Sie begleitet ein System über seinen gesamten Lebenszyklus – nicht erst nach Inbetriebnahme.",
          "Im Mittelstand geht es selten um maximale, sondern um angemessene Sicherheit: Maßnahmen orientieren sich am Schutzbedarf der Daten und an realistischen Bedrohungen. Gerade in der Cloud verschiebt sich Verantwortung in ein geteiltes Modell – der Anbieter sichert die Plattform, der Kunde die Konfiguration und die eigenen Anwendungen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine SaaS-Plattform verarbeitet sensible Daten und muss von Anfang an abgesichert sein. Der Zugang wird über eine zentrale Identitätslösung mit Multifaktor-Authentifizierung geschützt, Geheimnisse wie Schlüssel und Passwörter liegen nicht im Code, sondern in einem verwalteten Tresor. Der eingehende Datenverkehr wird über einen vorgelagerten Dienst gefiltert, interne Komponenten liegen in einem abgeschotteten Netzwerk. So entsteht ein gestaffelter Schutz statt einer einzelnen Mauer.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "IT-Sicherheit zahlt sich aus, indem sie Ausfälle, Datenverluste und Compliance-Risiken vermeidet – nicht erst nach einem Vorfall.",
        ],
        bullets: [
          "Schutz sensibler Daten durch Verschlüsselung und kontrollierte Zugriffe",
          "Abwehr von unbefugten Zugriffen über starke Authentifizierung (MFA)",
          "Reduzierte Angriffsfläche durch Netzwerksegmentierung und Zero-Trust-Prinzipien",
          "Nachvollziehbarkeit durch Protokollierung und Monitoring",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "IT-Sicherheit ist breiter als Datenschutz: Datenschutz (DSGVO) regelt den rechtmäßigen Umgang mit personenbezogenen Daten, IT-Sicherheit schützt Systeme und Daten technisch und organisatorisch. Beide bedingen sich, sind aber nicht dasselbe. Konkrete Bausteine der IT-Sicherheit sind unter anderem IAM, MFA und Networking & Security mit Zero-Trust-Ansatz.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit denkt Sicherheit von Beginn an mit, statt sie nachträglich aufzusetzen. Für die Claimity AG wurde eine DSGVO-konforme Azure-Infrastruktur aufgebaut, in der Identität und MFA über Keycloak laufen, Geheimnisse in Azure Key Vault liegen und der Datenverkehr über Azure Front Door und ein abgeschottetes Virtual Network abgesichert ist. So entsteht ein belastbares Sicherheitsfundament für eine produktive SaaS-Plattform.",
        ],
      },
    ],
    faq: [
      {
        question: "Reicht es nicht, einfach in die Cloud zu gehen, um sicher zu sein?",
        answer:
          "Nein. Cloud-Anbieter sichern ihre Plattform, aber die Konfiguration, die Zugriffe und die eigenen Anwendungen liegen in der Verantwortung des Kunden. Sicherheit entsteht erst durch die richtige Gestaltung dieses geteilten Modells.",
      },
      {
        question: "Wo sollten mittelständische Unternehmen anfangen?",
        answer:
          "Meist beim größten Hebel: starke Authentifizierung (MFA), sauberes Zugriffsmanagement und der Schutz sensibler Daten. Von dort aus lässt sich Sicherheit risikoorientiert ausbauen.",
      },
      {
        question: "Ist IT-Sicherheit dasselbe wie Datenschutz?",
        answer:
          "Nein. Datenschutz regelt rechtlich den Umgang mit personenbezogenen Daten, IT-Sicherheit schützt Systeme und Daten technisch und organisatorisch. Sie ergänzen sich, decken aber unterschiedliche Bereiche ab.",
      },
      {
        question: "Was bedeutet das Prinzip der gestaffelten Sicherheit (Defense in Depth)?",
        answer:
          "Statt sich auf eine einzige Schutzmaßnahme zu verlassen, werden mehrere Ebenen kombiniert – etwa Authentifizierung, Netzwerksegmentierung, Verschlüsselung und Monitoring. Fällt eine Ebene aus oder wird überwunden, greifen die übrigen weiter. So entsteht ein widerstandsfähigerer Schutz als durch eine einzelne „Mauer“.",
      },
      {
        question: "Brauchen wir für IT-Sicherheit teure Spezialsoftware?",
        answer:
          "Nicht zwingend. Viele der wirksamsten Maßnahmen sind organisatorischer oder konfigurativer Natur – etwa starke Authentifizierung, ein sauberes Rechtekonzept, regelmäßige Updates und durchdachte Cloud-Einstellungen. Spezialsoftware ergänzt diese Grundlagen, ersetzt sie aber nicht.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IT-Sicherheit: Definition, Maßnahmen & Cloud-Bezug | smiit Glossar",
    metaDescription:
      "IT-Sicherheit erklärt: Schutzziele, Maßnahmen wie IAM, MFA und Netzwerksicherheit sowie der Cloud-Bezug – mit Praxisbeispiel von smiit auf Azure.",
  },
  en: {
    slug: "it-security",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IT security",
    title: "What is IT security?",
    shortDefinition:
      "IT security covers all technical and organizational measures that protect data, systems and applications from unauthorised access, manipulation and outages. At its heart are the three classic protection goals — confidentiality, integrity and availability — meaning only authorised people gain access, data stays correct and systems run reliably.",
    synonyms: ["information security", "cybersecurity", "IT-Security", "protection requirements"],
    sections: [
      {
        heading: "Where IT security is used",
        paragraphs: [
          "IT security is not a single product but an interplay of many protective layers: identities and access (IAM), network segmentation, encryption, secure secret management, logging and a rehearsed approach to incidents. It accompanies a system throughout its entire lifecycle — not only after go-live.",
          "In SMEs it is rarely about maximum but about appropriate security: measures are guided by the protection requirements of the data and by realistic threats. In the cloud especially, responsibility shifts into a shared model — the provider secures the platform, the customer secures the configuration and their own applications.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A SaaS platform processes sensitive data and must be secured from the start. Access is protected through a central identity solution with multi-factor authentication; secrets such as keys and passwords do not live in the code but in a managed vault. Inbound traffic is filtered through an upstream service, and internal components sit in an isolated network. This creates layered protection instead of a single wall.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "IT security pays off by preventing outages, data loss and compliance risks — not only after an incident has occurred.",
        ],
        bullets: [
          "Protection of sensitive data through encryption and controlled access",
          "Defence against unauthorised access via strong authentication (MFA)",
          "Reduced attack surface through network segmentation and zero-trust principles",
          "Traceability through logging and monitoring",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "IT security is broader than data protection: data protection (GDPR) governs the lawful handling of personal data, while IT security protects systems and data technically and organizationally. The two depend on each other but are not the same. Concrete building blocks of IT security include IAM, MFA and networking & security with a zero-trust approach.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit considers security from the start instead of bolting it on afterwards. For Claimity AG, a GDPR-compliant Azure infrastructure was built in which identity and MFA run through Keycloak, secrets live in Azure Key Vault and traffic is secured via Azure Front Door and an isolated virtual network. This creates a robust security foundation for a production SaaS platform.",
        ],
      },
    ],
    faq: [
      {
        question: "Isn't it enough to simply move to the cloud to be secure?",
        answer:
          "No. Cloud providers secure their platform, but the configuration, the access and the customer's own applications remain the customer's responsibility. Security only arises from designing this shared model correctly.",
      },
      {
        question: "Where should mid-sized companies start?",
        answer:
          "Usually with the biggest lever: strong authentication (MFA), clean access management and protection of sensitive data. From there, security can be expanded in a risk-oriented way.",
      },
      {
        question: "Is IT security the same as data protection?",
        answer:
          "No. Data protection legally governs the handling of personal data, while IT security protects systems and data technically and organizationally. They complement each other but cover different areas.",
      },
      {
        question: "What does the principle of layered security (defense in depth) mean?",
        answer:
          "Instead of relying on a single safeguard, several layers are combined — such as authentication, network segmentation, encryption and monitoring. If one layer fails or is breached, the others still hold. This creates more resilient protection than a single \"wall\".",
      },
      {
        question: "Do we need expensive specialist software for IT security?",
        answer:
          "Not necessarily. Many of the most effective measures are organizational or configurational in nature — such as strong authentication, a clean permissions concept, regular updates and well-considered cloud settings. Specialist software complements these basics but does not replace them.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IT security: definition, measures & cloud context | smiit glossary",
    metaDescription:
      "IT security explained: protection goals, measures such as IAM, MFA and network security, and the cloud context — with a smiit example on Azure.",
  },
}

const dsgvoDatenschutz: LocalizedGlossaryTerm = {
  de: {
    slug: "gdpr",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "DSGVO / Datenschutz in der Cloud",
    title: "Was ist DSGVO / Datenschutz in der Cloud?",
    shortDefinition:
      "Die DSGVO (Datenschutz-Grundverordnung) regelt EU-weit, wie personenbezogene Daten rechtmäßig verarbeitet werden dürfen. Datenschutz in der Cloud bedeutet, diese Vorgaben auch dann einzuhalten, wenn Daten bei einem Cloud-Anbieter wie Microsoft Azure verarbeitet werden – etwa durch Auftragsverarbeitung, Verschlüsselung, Zugriffskontrolle und die Wahl geeigneter Speicherorte.",
    synonyms: ["DSGVO", "GDPR", "Datenschutz", "Auftragsverarbeitung", "DSGVO-Konformität"],
    sections: [
      {
        heading: "Einordnung: Wofür wird das genutzt?",
        paragraphs: [
          "Die DSGVO gibt Grundsätze vor: Daten dürfen nur zweckgebunden, datenminimierend und auf einer Rechtsgrundlage verarbeitet werden, und Betroffene haben Rechte wie Auskunft oder Löschung. In der Cloud kommt hinzu, dass die Verantwortung geteilt ist – das Unternehmen bleibt Verantwortlicher, der Cloud-Anbieter wird zum Auftragsverarbeiter, geregelt über einen Auftragsverarbeitungsvertrag (AVV).",
          "Praktisch heißt Datenschutz in der Cloud, technische und organisatorische Maßnahmen so zu gestalten, dass die DSGVO-Prinzipien eingehalten werden: Wahl einer EU-Region für die Datenhaltung, Verschlüsselung in Ruhe und bei der Übertragung, strenge Zugriffskontrolle und nachvollziehbare Protokollierung. Sicherheit und Datenschutz greifen hier eng ineinander.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine SaaS-Plattform für die Versicherungsbranche verarbeitet personenbezogene Daten und muss von Beginn an DSGVO-konform sein. Die Infrastruktur wird in einer EU-Region von Azure betrieben, Geheimnisse liegen in einem verwalteten Tresor, Zugriffe erfordern Multifaktor-Authentifizierung und der Datenverkehr ist verschlüsselt. So ist die Verarbeitung nicht nur sicher, sondern auch datenschutzrechtlich belastbar dokumentiert.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Datenschutzkonforme Cloud-Architektur schafft Rechtssicherheit und Vertrauen – gerade in regulierten Branchen.",
        ],
        bullets: [
          "Rechtssichere Verarbeitung personenbezogener Daten mit dokumentierter Grundlage",
          "Datenhaltung in EU-Regionen zur Reduktion von Drittlandrisiken",
          "Verschlüsselung und strenge Zugriffskontrolle als technische Schutzmaßnahmen",
          "Nachvollziehbarkeit für Audits und Betroffenenrechte durch Protokollierung",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Datenschutz ist nicht dasselbe wie IT-Sicherheit: Die DSGVO ist ein rechtlicher Rahmen für personenbezogene Daten, IT-Sicherheit liefert die technischen Mittel, um ihn umzusetzen. Datenschutz in der Cloud baut daher auf Maßnahmen wie IAM, MFA, Networking & Security und sicherem Geheimnis-Management auf, ergänzt sie aber um rechtliche und organisatorische Pflichten wie den AVV.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit setzt Datenschutz technisch um, statt ihn nur zu versprechen. Für die Claimity AG wurde eine DSGVO-konforme Azure-Infrastruktur als Infrastructure as Code aufgebaut – mit EU-Datenhaltung, Azure Key Vault für Geheimnisse, Keycloak für Identität und MFA sowie Absicherung über Azure Front Door und ein Virtual Network. So ist Datenschutz reproduzierbar in der Architektur verankert und nicht von manueller Sorgfalt abhängig.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist die Nutzung von Microsoft Azure überhaupt DSGVO-konform möglich?",
        answer:
          "Ja, bei richtiger Gestaltung. Entscheidend sind die Wahl einer EU-Region, ein Auftragsverarbeitungsvertrag, Verschlüsselung und kontrollierte Zugriffe. Die Verantwortung für die korrekte Konfiguration bleibt beim Unternehmen.",
      },
      {
        question: "Was ist ein Auftragsverarbeitungsvertrag (AVV)?",
        answer:
          "Ein AVV regelt die Pflichten zwischen Verantwortlichem und Auftragsverarbeiter, etwa dem Cloud-Anbieter. Er ist eine zentrale Voraussetzung, um personenbezogene Daten rechtmäßig in der Cloud verarbeiten zu lassen.",
      },
      {
        question: "Wie hängen Datenschutz und IT-Sicherheit zusammen?",
        answer:
          "Datenschutz definiert die rechtlichen Anforderungen, IT-Sicherheit liefert die technischen Mittel zur Umsetzung. Ohne angemessene Sicherheitsmaßnahmen wie Verschlüsselung und Zugriffskontrolle ist DSGVO-Konformität praktisch nicht erreichbar.",
      },
      {
        question: "Reicht es, einfach eine EU-Region für die Datenhaltung zu wählen?",
        answer:
          "Die Wahl einer EU-Region ist ein wichtiger Baustein, aber für sich genommen nicht ausreichend. Hinzu kommen ein Auftragsverarbeitungsvertrag, technische Maßnahmen wie Verschlüsselung und Zugriffskontrolle sowie organisatorische Pflichten. Auch Support- oder Administrationszugriffe aus Drittländern müssen dabei berücksichtigt werden.",
      },
      {
        question: "Welche Pflichten bleiben beim Unternehmen, wenn es einen Cloud-Anbieter nutzt?",
        answer:
          "Das Unternehmen bleibt als Verantwortlicher für die Rechtmäßigkeit der Verarbeitung zuständig – etwa für Rechtsgrundlage, Zweckbindung, Betroffenenrechte und die korrekte Konfiguration. Der Anbieter handelt als Auftragsverarbeiter im Rahmen des AVV, nimmt dem Unternehmen die Verantwortung aber nicht ab.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "DSGVO & Datenschutz in der Cloud: Umsetzung | smiit Glossar",
    metaDescription:
      "DSGVO und Datenschutz in der Cloud erklärt: Grundsätze, Auftragsverarbeitung, EU-Datenhaltung und technische Maßnahmen – mit Azure-Praxisbeispiel von smiit.",
  },
  en: {
    slug: "gdpr",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "GDPR / data protection in the cloud",
    title: "What is GDPR / data protection in the cloud?",
    shortDefinition:
      "The GDPR (General Data Protection Regulation) governs across the EU how personal data may be processed lawfully. Data protection in the cloud means meeting these requirements even when data is processed by a cloud provider such as Microsoft Azure — through data processing agreements, encryption, access control and the choice of suitable storage locations.",
    synonyms: ["GDPR", "DSGVO", "data protection", "data processing agreement", "GDPR compliance"],
    sections: [
      {
        heading: "Where it is used",
        paragraphs: [
          "The GDPR sets out principles: data may only be processed for a defined purpose, in a data-minimizing way and on a legal basis, and data subjects have rights such as access or erasure. In the cloud, responsibility is shared on top of this — the company remains the controller, the cloud provider becomes a processor, governed by a data processing agreement (DPA).",
          "In practice, data protection in the cloud means shaping technical and organizational measures so that GDPR principles are upheld: choosing an EU region for data storage, encryption at rest and in transit, strict access control and traceable logging. Security and data protection are tightly intertwined here.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A SaaS platform for the insurance industry processes personal data and must be GDPR-compliant from the start. The infrastructure runs in an EU region of Azure, secrets live in a managed vault, access requires multi-factor authentication and traffic is encrypted. This makes processing not only secure but also documented in a way that holds up under data protection law.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "A data-protection-compliant cloud architecture creates legal certainty and trust — especially in regulated industries.",
        ],
        bullets: [
          "Legally sound processing of personal data with a documented basis",
          "Data storage in EU regions to reduce third-country risks",
          "Encryption and strict access control as technical safeguards",
          "Traceability for audits and data subject rights through logging",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Data protection is not the same as IT security: the GDPR is a legal framework for personal data, while IT security provides the technical means to implement it. Data protection in the cloud therefore builds on measures such as IAM, MFA, networking & security and secure secret management, but adds legal and organizational obligations such as the DPA.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit implements data protection technically instead of only promising it. For Claimity AG, a GDPR-compliant Azure infrastructure was built as infrastructure as code — with EU data storage, Azure Key Vault for secrets, Keycloak for identity and MFA, and protection through Azure Front Door and a virtual network. This anchors data protection reproducibly in the architecture rather than relying on manual diligence.",
        ],
      },
    ],
    faq: [
      {
        question: "Is using Microsoft Azure even possible in a GDPR-compliant way?",
        answer:
          "Yes, with the right design. The key factors are choosing an EU region, a data processing agreement, encryption and controlled access. Responsibility for the correct configuration remains with the company.",
      },
      {
        question: "What is a data processing agreement (DPA)?",
        answer:
          "A DPA governs the obligations between controller and processor, such as the cloud provider. It is a central prerequisite for having personal data processed lawfully in the cloud.",
      },
      {
        question: "How do data protection and IT security relate?",
        answer:
          "Data protection defines the legal requirements, IT security provides the technical means to implement them. Without appropriate security measures such as encryption and access control, GDPR compliance is practically unachievable.",
      },
      {
        question: "Is it enough to simply choose an EU region for data storage?",
        answer:
          "Choosing an EU region is an important building block, but on its own it is not sufficient. It also requires a data processing agreement, technical measures such as encryption and access control, and organizational obligations. Support or administrative access from third countries must be considered as well.",
      },
      {
        question: "Which obligations remain with the company when it uses a cloud provider?",
        answer:
          "As the controller, the company remains responsible for the lawfulness of the processing — for instance the legal basis, purpose limitation, data subject rights and correct configuration. The provider acts as a processor within the scope of the DPA but does not take that responsibility off the company's hands.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "GDPR & data protection in the cloud | smiit glossary",
    metaDescription:
      "GDPR and data protection in the cloud explained: principles, data processing, EU data storage and technical measures — with an Azure example from smiit.",
  },
}

const powerAutomate: LocalizedGlossaryTerm = {
  de: {
    slug: "power-automate",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Power Automate",
    title: "Was ist Power Automate?",
    shortDefinition:
      "Power Automate ist der Cloud-Dienst von Microsoft zur Automatisierung von Arbeitsabläufen. Mit ihm lassen sich wiederkehrende Aufgaben über sogenannte Flows automatisieren, die Systeme verbinden, auf Ereignisse reagieren und Daten verarbeiten – meist ohne klassische Programmierung.",
    synonyms: ["MS Flow", "Microsoft Flow", "Workflow-Automatisierung", "Power Platform"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Power Automate genutzt?",
        paragraphs: [
          "Power Automate ist Teil der Microsoft Power Platform und verbindet über hunderte vorgefertigte Konnektoren Dienste wie Outlook, SharePoint, Teams, Dynamics, Business Central oder Drittsysteme. Flows werden durch Auslöser gestartet – etwa eine eingehende E-Mail, eine neue Datei oder einen Zeitplan – und führen dann eine Abfolge von Aktionen aus.",
          "Typisch sind drei Arten von Flows: automatisierte Flows (durch Ereignisse ausgelöst), Instant Flows (manuell gestartet) und geplante Flows (zeitgesteuert). Ergänzt um den AI Builder kann Power Automate auch Inhalte aus Dokumenten auslesen und so Medienbrüche schließen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Bei einem Logistikunternehmen treffen Aufträge als PDF per E-Mail ein. Ein Power-Automate-Flow erkennt den Eingang, übergibt das PDF an den AI Builder zur Extraktion der relevanten Felder und überträgt die Daten in das Zielsystem. Eine zusätzliche Kontrolllogik prüft, ob jeder Auftrag vollständig verarbeitet wurde, und meldet Ausnahmen zur manuellen Prüfung.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Power Automate ist das konkrete Werkzeug, mit dem die übergeordnete Prozessautomatisierung umgesetzt wird; es ist enger gefasst als klassische RPA und stark in das Microsoft-Ökosystem integriert. Häufig wird es mit dem AI Builder kombiniert und greift auf konsolidierte Stammdaten zurück. Für die G&B Logistics GmbH hat smiit die Auftragserfassung mit Power Automate und AI Builder automatisiert und spart dadurch rund 140 Arbeitsstunden pro Monat.",
        ],
      },
    ],
    faq: [
      {
        question: "Brauche ich Programmierkenntnisse für Power Automate?",
        answer:
          "Für viele Flows nicht. Power Automate ist ein Low-Code-Dienst, der mit vorgefertigten Konnektoren und einer visuellen Oberfläche arbeitet. Für komplexere Szenarien sind tiefere Kenntnisse jedoch hilfreich.",
      },
      {
        question: "Kann Power Automate auch mit Nicht-Microsoft-Systemen arbeiten?",
        answer:
          "Ja. Über zahlreiche Konnektoren und generische Schnittstellen wie HTTP lassen sich auch Drittsysteme anbinden, sodass Daten zwischen unterschiedlichen Anwendungen ausgetauscht werden können.",
      },
      {
        question: "Was ist der Unterschied zwischen Power Automate und klassischer RPA?",
        answer:
          "Klassische RPA steuert oft die Benutzeroberfläche bestehender Programme nach, während Power Automate primär über Konnektoren und Schnittstellen (APIs) arbeitet und tief in das Microsoft-Ökosystem integriert ist. Power Automate bietet zwar auch UI-basierte Automatisierung (Desktop-Flows), ist aber breiter als reines Oberflächen-Nachklicken angelegt.",
      },
      {
        question: "Was passiert, wenn ein Flow fehlschlägt?",
        answer:
          "Power Automate protokolliert jeden Lauf, sodass sich Fehler nachvollziehen lassen. Flows können mit Wiederholungen, Fehlerbehandlung und Benachrichtigungen ausgestattet werden, sodass Ausnahmen kontrolliert behandelt und bei Bedarf zur manuellen Prüfung weitergeleitet werden.",
      },
      {
        question: "Eignet sich Power Automate für den Mittelstand?",
        answer:
          "Ja. Gerade wenn bereits Microsoft 365 im Einsatz ist, lassen sich wiederkehrende Aufgaben ohne große Zusatzinvestition automatisieren. Der Low-Code-Ansatz erlaubt einen schrittweisen Einstieg, bei dem zunächst einzelne, klar abgegrenzte Abläufe automatisiert werden.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Power Automate: Definition, Funktionen & Beispiel | smiit Glossar",
    metaDescription:
      "Power Automate erklärt: Flows, Konnektoren und Auslöser zur Workflow-Automatisierung – mit Praxisbeispiel von smiit (140 Std./Monat gespart).",
  },
  en: {
    slug: "power-automate",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Power Automate",
    title: "What is Power Automate?",
    shortDefinition:
      "Power Automate is Microsoft's cloud service for automating workflows. It lets you automate recurring tasks via so-called flows that connect systems, react to events and process data — usually without traditional programming.",
    synonyms: ["MS Flow", "Microsoft Flow", "workflow automation", "Power Platform"],
    sections: [
      {
        heading: "Where Power Automate is used",
        paragraphs: [
          "Power Automate is part of the Microsoft Power Platform and connects services such as Outlook, SharePoint, Teams, Dynamics, Business Central or third-party systems through hundreds of prebuilt connectors. Flows are started by triggers — such as an incoming email, a new file or a schedule — and then run a sequence of actions.",
          "There are typically three kinds of flows: automated flows (triggered by events), instant flows (started manually) and scheduled flows (time-driven). Combined with AI Builder, Power Automate can also read content from documents and thereby close broken handoffs.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "At a logistics company, orders arrive as PDFs by email. A Power Automate flow detects the incoming message, passes the PDF to AI Builder to extract the relevant fields and transfers the data into the target system. Additional control logic checks whether every order was processed completely and flags exceptions for manual review.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Power Automate is the concrete tool used to implement the broader concept of process automation; it is more narrowly scoped than classic RPA and tightly integrated into the Microsoft ecosystem. It is often combined with AI Builder and relies on consolidated master data. For G&B Logistics GmbH, smiit automated order capture with Power Automate and AI Builder, saving around 140 working hours per month.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need programming skills for Power Automate?",
        answer:
          "For many flows, no. Power Automate is a low-code service that works with prebuilt connectors and a visual interface. For more complex scenarios, however, deeper knowledge is helpful.",
      },
      {
        question: "Can Power Automate also work with non-Microsoft systems?",
        answer:
          "Yes. Through numerous connectors and generic interfaces such as HTTP, third-party systems can be connected too, so data can be exchanged between different applications.",
      },
      {
        question: "What is the difference between Power Automate and classic RPA?",
        answer:
          "Classic RPA often replays the user interface of existing programs, whereas Power Automate works primarily through connectors and interfaces (APIs) and is deeply integrated into the Microsoft ecosystem. Power Automate does offer UI-based automation (desktop flows) too, but it is designed more broadly than pure interface clicking.",
      },
      {
        question: "What happens when a flow fails?",
        answer:
          "Power Automate logs every run, so errors can be traced. Flows can be equipped with retries, error handling and notifications, so exceptions are handled in a controlled way and forwarded for manual review where needed.",
      },
      {
        question: "Is Power Automate suitable for mid-sized companies?",
        answer:
          "Yes. Especially where Microsoft 365 is already in use, recurring tasks can be automated without a large additional investment. The low-code approach allows a gradual start, automating individual, clearly scoped workflows first.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Power Automate: definition, features & example | smiit glossary",
    metaDescription:
      "Power Automate explained: flows, connectors and triggers for workflow automation — with a smiit example (140 hours/month saved).",
  },
}

const aiBuilder: LocalizedGlossaryTerm = {
  de: {
    slug: "ai-builder",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "AI Builder (Dokumentenextraktion / OCR)",
    title: "Was ist AI Builder (Dokumentenextraktion / OCR)?",
    shortDefinition:
      "AI Builder ist die KI-Komponente der Microsoft Power Platform, mit der sich vortrainierte und eigene KI-Modelle ohne tiefe Data-Science-Kenntnisse nutzen lassen. Ein zentraler Anwendungsfall ist die Dokumentenextraktion per OCR: AI Builder liest Felder aus PDFs, Rechnungen oder Formularen aus und macht sie maschinell weiterverarbeitbar.",
    synonyms: ["Document Processing", "OCR", "Texterkennung", "Dokumentenextraktion", "AI Builder"],
    sections: [
      {
        heading: "Einordnung: Wofür wird AI Builder genutzt?",
        paragraphs: [
          "OCR (Optical Character Recognition) wandelt Bild- oder PDF-Inhalte in maschinenlesbaren Text um. AI Builder geht darüber hinaus: Mit Modellen zur Dokumentenverarbeitung erkennt er nicht nur Text, sondern auch Struktur – also welches Feld der Rechnungsbetrag, die Auftragsnummer oder das Datum ist. Diese strukturierte Ausgabe lässt sich direkt in Folgeprozesse übergeben.",
          "AI Builder ist eng mit Power Automate verzahnt: Ein Flow übergibt ein Dokument an das Modell, erhält die extrahierten Felder zurück und verarbeitet sie weiter. So lassen sich manuelle Erfassungsschritte ersetzen, die bisher Medienbrüche und Fehler verursacht haben.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Logistikunternehmen erhält Aufträge als PDF in unterschiedlichen Layouts. Ein trainiertes AI-Builder-Modell zur Dokumentenextraktion liest die relevanten Felder – etwa Absender, Positionen und Mengen – zuverlässig aus, auch wenn sich die Formate unterscheiden. Power Automate übernimmt die extrahierten Daten und überträgt sie ohne manuelle Eingabe in das Zielsystem.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Reine OCR liefert nur Text, AI Builder liefert strukturierte, feldbasierte Daten – das ist der entscheidende Unterschied für die Automatisierung. AI Builder ist dabei kein eigenständiger Workflow-Motor, sondern wird über Power Automate orchestriert und speist häufig in Systeme ein, deren Stammdaten zuvor konsolidiert wurden. Für die G&B Logistics GmbH hat smiit die PDF-Auftragserfassung mit AI Builder und Power Automate automatisiert und spart so rund 140 Arbeitsstunden pro Monat.",
        ],
      },
    ],
    faq: [
      {
        question: "Funktioniert AI Builder auch bei unterschiedlichen Dokumentlayouts?",
        answer:
          "Ja. Modelle zur Dokumentenverarbeitung lassen sich auf verschiedene Layouts trainieren und erkennen Felder auch dann, wenn die Formate variieren. Die Genauigkeit steigt mit passenden Trainingsbeispielen.",
      },
      {
        question: "Brauche ich für AI Builder ein Data-Science-Team?",
        answer:
          "Nein. AI Builder ist darauf ausgelegt, ohne tiefe Data-Science-Kenntnisse nutzbar zu sein. Für die Einbindung in Prozesse und das Training auf eigene Dokumente ist Erfahrung mit der Power Platform jedoch hilfreich.",
      },
      {
        question: "Was ist der Unterschied zwischen AI Builder und reiner OCR?",
        answer:
          "Reine OCR wandelt ein Dokument lediglich in Text um, ohne dessen Bedeutung zu verstehen. AI Builder erkennt zusätzlich die Struktur und liefert benannte Felder wie Rechnungsbetrag oder Auftragsnummer zurück, die sich direkt weiterverarbeiten lassen.",
      },
      {
        question: "Wie viele Beispieldokumente werden für das Training benötigt?",
        answer:
          "Das hängt von der Komplexität und der Vielfalt der Layouts ab. Für klar strukturierte Dokumente genügen oft wenige Beispiele, während stark variierende Formate mehr Trainingsbeispiele erfordern, damit die Felderkennung zuverlässig wird.",
      },
      {
        question: "Was passiert, wenn AI Builder ein Feld falsch oder unsicher erkennt?",
        answer:
          "AI Builder liefert zu erkannten Feldern in der Regel Konfidenzwerte. Diese lassen sich nutzen, um unsichere Fälle automatisch zur manuellen Prüfung auszusteuern, statt fehlerhafte Daten ungeprüft in Folgeprozesse zu übernehmen.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "AI Builder & OCR: Dokumentenextraktion | smiit Glossar",
    metaDescription:
      "AI Builder erklärt: Dokumentenextraktion und OCR in der Power Platform, Zusammenspiel mit Power Automate – mit Praxisbeispiel von smiit (140 Std./Monat gespart).",
  },
  en: {
    slug: "ai-builder",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "AI Builder (document extraction / OCR)",
    title: "What is AI Builder (document extraction / OCR)?",
    shortDefinition:
      "AI Builder is the AI component of the Microsoft Power Platform that lets you use pretrained and custom AI models without deep data science skills. A central use case is document extraction via OCR: AI Builder reads fields out of PDFs, invoices or forms and makes them available for automated processing.",
    synonyms: ["document processing", "OCR", "text recognition", "document extraction", "AI Builder"],
    sections: [
      {
        heading: "Where AI Builder is used",
        paragraphs: [
          "OCR (optical character recognition) converts image or PDF content into machine-readable text. AI Builder goes further: with document processing models it recognizes not only text but also structure — that is, which field is the invoice amount, the order number or the date. This structured output can be passed directly into downstream processes.",
          "AI Builder is tightly integrated with Power Automate: a flow passes a document to the model, receives the extracted fields back and processes them further. This replaces manual data entry steps that previously caused broken handoffs and errors.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A logistics company receives orders as PDFs in different layouts. A trained AI Builder document extraction model reliably reads the relevant fields — such as sender, line items and quantities — even when the formats differ. Power Automate takes the extracted data and transfers it into the target system without manual input.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Pure OCR only delivers text, AI Builder delivers structured, field-based data — that is the decisive difference for automation. AI Builder is not a standalone workflow engine but is orchestrated through Power Automate and often feeds into systems whose master data was consolidated beforehand. For G&B Logistics GmbH, smiit automated PDF order capture with AI Builder and Power Automate, saving around 140 working hours per month.",
        ],
      },
    ],
    faq: [
      {
        question: "Does AI Builder also work with different document layouts?",
        answer:
          "Yes. Document processing models can be trained on different layouts and recognize fields even when the formats vary. Accuracy improves with suitable training examples.",
      },
      {
        question: "Do I need a data science team for AI Builder?",
        answer:
          "No. AI Builder is designed to be usable without deep data science skills. For integrating it into processes and training it on your own documents, experience with the Power Platform is nonetheless helpful.",
      },
      {
        question: "What is the difference between AI Builder and pure OCR?",
        answer:
          "Pure OCR merely converts a document into text without understanding its meaning. AI Builder additionally recognizes the structure and returns named fields such as invoice amount or order number that can be processed directly.",
      },
      {
        question: "How many sample documents are needed for training?",
        answer:
          "That depends on the complexity and the variety of layouts. For clearly structured documents a few examples are often enough, whereas widely varying formats require more training examples for field recognition to become reliable.",
      },
      {
        question: "What happens if AI Builder reads a field incorrectly or with low certainty?",
        answer:
          "AI Builder typically provides confidence scores for the fields it recognizes. These can be used to automatically route uncertain cases for manual review instead of passing faulty data unchecked into downstream processes.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "AI Builder & OCR: document extraction | smiit glossary",
    metaDescription:
      "AI Builder explained: document extraction and OCR in the Power Platform and its interplay with Power Automate — with a smiit example (140 hours/month saved).",
  },
}

const stammdatenmanagement: LocalizedGlossaryTerm = {
  de: {
    slug: "master-data-management",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Stammdatenmanagement (MDM)",
    title: "Was ist Stammdatenmanagement (MDM)?",
    shortDefinition:
      "Stammdatenmanagement (Master Data Management, MDM) sorgt dafür, dass zentrale Geschäftsdaten wie Kunden, Lieferanten oder Artikel über alle Systeme hinweg einheitlich, korrekt und widerspruchsfrei sind. Es schafft eine verlässliche „einzige Wahrheit“, auf die ERP, CRM und Automatisierungen gleichermaßen zugreifen können.",
    synonyms: ["MDM", "Master Data Management", "Stammdaten", "Datenkonsolidierung", "Datenqualität"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Stammdatenmanagement genutzt?",
        paragraphs: [
          "Stammdaten sind die langlebigen Kerndaten eines Unternehmens – im Gegensatz zu Bewegungsdaten wie einzelnen Aufträgen oder Buchungen. Wenn dieselben Kunden oder Lieferanten in mehreren Systemen unterschiedlich erfasst sind, entstehen Dubletten, Fehler und Mehraufwand. MDM konsolidiert diese Daten, definiert Regeln für Pflege und Hoheit und hält sie konsistent.",
          "Praktisch umfasst MDM das Bereinigen und Zusammenführen vorhandener Datensätze, das Festlegen führender Systeme und das Sicherstellen, dass Änderungen sauber in alle angebundenen Systeme fließen. Gerade bei Automatisierung ist saubere Stammdatenbasis eine Voraussetzung, damit Prozesse zuverlässig laufen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Logistikunternehmen führt Kreditoren- und Debitorendaten in mehreren Systemen, die im Lauf der Zeit auseinandergelaufen sind. Im Rahmen einer Konsolidierung werden Dubletten erkannt, Datensätze zusammengeführt und ein führendes System für die Stammdaten definiert. Anschließend greifen ERP wie Business Central und das CRM auf eine einheitliche Datenbasis zu, was Auswertungen und Automatisierungen erst verlässlich macht.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "MDM bezieht sich auf Stammdaten, nicht auf Bewegungsdaten, und ist breiter als reine Datenbereinigung, da es auch Hoheit, Regeln und laufende Pflege umfasst. Es ist eng mit Prozessautomatisierung verbunden, weil automatisierte Abläufe nur auf konsistenten Daten zuverlässig funktionieren. Für die G&B Logistics GmbH hat smiit die Stammdaten konsolidiert – inklusive Kreditoren und Debitoren – und die Datenbasis für Business Central und HubSpot vereinheitlicht.",
        ],
      },
    ],
    faq: [
      {
        question: "Worin unterscheiden sich Stammdaten und Bewegungsdaten?",
        answer:
          "Stammdaten sind langlebige Kerndaten wie Kunden, Lieferanten oder Artikel. Bewegungsdaten beschreiben einzelne Vorgänge wie Aufträge oder Buchungen. MDM kümmert sich gezielt um die Qualität und Konsistenz der Stammdaten.",
      },
      {
        question: "Warum ist Stammdatenmanagement für Automatisierung wichtig?",
        answer:
          "Automatisierte Prozesse arbeiten nur so gut wie ihre Datenbasis. Sind Stammdaten widersprüchlich oder doppelt vorhanden, übertragen sich diese Fehler in jeden automatisierten Schritt. Saubere Stammdaten sind daher eine Voraussetzung.",
      },
      {
        question: "Was ist ein führendes System für Stammdaten?",
        answer:
          "Das führende System ist die Quelle, die für einen bestimmten Datentyp als verbindlich gilt – etwa das ERP für Lieferantendaten. Änderungen werden dort gepflegt und von dort an andere Systeme verteilt, sodass keine widersprüchlichen Versionen entstehen.",
      },
      {
        question: "Wie geht man mit Dubletten in den Stammdaten um?",
        answer:
          "Dubletten werden zunächst über Abgleichregeln erkannt und anschließend zusammengeführt, wobei festgelegt wird, welche Werte erhalten bleiben. Damit das Problem nicht erneut entsteht, gehören klare Pflegeregeln und Validierungen für künftige Einträge dazu.",
      },
      {
        question: "Ist Stammdatenmanagement ein einmaliges Projekt?",
        answer:
          "Die erste Konsolidierung ist ein Projekt, doch danach beginnt die laufende Pflege. Ohne fortlaufende Regeln, Hoheiten und Kontrollen laufen Stammdaten über die Zeit erneut auseinander – MDM ist daher eher ein dauerhafter Prozess als ein abgeschlossenes Vorhaben.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Stammdatenmanagement (MDM): Nutzen & Beispiel | smiit Glossar",
    metaDescription:
      "Stammdatenmanagement (MDM) erklärt: einheitliche Kunden-, Lieferanten- und Artikeldaten, Konsolidierung und Datenqualität – mit Praxisbeispiel von smiit.",
  },
  en: {
    slug: "master-data-management",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Master data management (MDM)",
    title: "What is master data management (MDM)?",
    shortDefinition:
      "Master data management (MDM) ensures that core business data such as customers, suppliers or products is consistent, correct and free of contradictions across all systems. It creates a reliable “single source of truth” that ERP, CRM and automations can all rely on.",
    synonyms: ["MDM", "master data management", "master data", "data consolidation", "data quality"],
    sections: [
      {
        heading: "Where master data management is used",
        paragraphs: [
          "Master data is the long-lived core data of a company — as opposed to transactional data such as individual orders or postings. When the same customers or suppliers are recorded differently across multiple systems, duplicates, errors and extra effort arise. MDM consolidates this data, defines rules for maintenance and ownership and keeps it consistent.",
          "In practice, MDM covers cleaning and merging existing records, defining leading systems and ensuring that changes flow cleanly into all connected systems. For automation in particular, a clean master data foundation is a prerequisite for processes to run reliably.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A logistics company maintains creditor and debtor data across several systems that have drifted apart over time. As part of a consolidation, duplicates are identified, records are merged and a leading system for master data is defined. ERP systems such as Business Central and the CRM then rely on a unified data foundation, which is what makes analyses and automation reliable in the first place.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "MDM concerns master data, not transactional data, and is broader than mere data cleansing because it also covers ownership, rules and ongoing maintenance. It is closely linked to process automation, because automated workflows only work reliably on consistent data. For G&B Logistics GmbH, smiit consolidated the master data — including creditors and debtors — and unified the data foundation for Business Central and HubSpot.",
        ],
      },
    ],
    faq: [
      {
        question: "How do master data and transactional data differ?",
        answer:
          "Master data is long-lived core data such as customers, suppliers or products. Transactional data describes individual events such as orders or postings. MDM specifically looks after the quality and consistency of master data.",
      },
      {
        question: "Why is master data management important for automation?",
        answer:
          "Automated processes are only as good as their data foundation. If master data is contradictory or duplicated, these errors carry into every automated step. Clean master data is therefore a prerequisite.",
      },
      {
        question: "What is a leading system for master data?",
        answer:
          "The leading system is the source considered authoritative for a particular data type — for example the ERP for supplier data. Changes are maintained there and distributed from there to other systems, so no contradictory versions arise.",
      },
      {
        question: "How do you deal with duplicates in master data?",
        answer:
          "Duplicates are first identified through matching rules and then merged, with a decision on which values are retained. To prevent the problem from recurring, clear maintenance rules and validations for future entries are part of the approach.",
      },
      {
        question: "Is master data management a one-off project?",
        answer:
          "The initial consolidation is a project, but ongoing maintenance begins afterwards. Without continuous rules, ownership and controls, master data drifts apart again over time — so MDM is more of a permanent process than a finished undertaking.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Master data management (MDM) explained | smiit glossary",
    metaDescription:
      "Master data management (MDM) explained: consistent customer, supplier and product data, consolidation and data quality — with a practical example from smiit.",
  },
}

const ciCd: LocalizedGlossaryTerm = {
  de: {
    slug: "ci-cd",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "CI/CD",
    title: "Was ist CI/CD?",
    shortDefinition:
      "CI/CD steht für Continuous Integration und Continuous Delivery/Deployment – das automatisierte Bauen, Testen und Ausliefern von Software. Code-Änderungen werden fortlaufend zusammengeführt, automatisch geprüft und über eine Pipeline kontrolliert in Test- und Produktivumgebungen gebracht.",
    synonyms: ["Continuous Integration", "Continuous Delivery", "Continuous Deployment", "Build-Pipeline"],
    sections: [
      {
        heading: "Einordnung: Wofür wird CI/CD genutzt?",
        paragraphs: [
          "Continuous Integration (CI) bedeutet, dass Entwickler ihre Änderungen häufig in einen gemeinsamen Stand zusammenführen, wobei automatisierte Builds und Tests sofort prüfen, ob alles zusammenpasst. Continuous Delivery (CD) sorgt dafür, dass jede geprüfte Version jederzeit ausgeliefert werden könnte; bei Continuous Deployment geschieht die Auslieferung sogar vollautomatisch.",
          "Technisch wird das über eine Pipeline abgebildet – eine definierte Abfolge aus Schritten wie Build, Test, Sicherheitsprüfung und Deployment. In der Microsoft-Welt kommen dafür Azure DevOps Pipelines oder GitHub Actions zum Einsatz.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Für eine SaaS-Plattform wird jede Code-Änderung automatisch gebaut und getestet. Besteht sie alle Prüfungen, wird sie über die Pipeline zunächst in eine Testumgebung und nach Freigabe kontrolliert in die Produktivumgebung ausgeliefert. So sind Releases nachvollziehbar, wiederholbar und ohne manuelle Fehlerquellen – auch bei kurzer Time-to-Market.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "CI/CD ist ein konkreter Baustein der übergeordneten DevOps-Arbeitsweise und wird häufig mit Infrastructure as Code kombiniert, damit nicht nur der Code, sondern auch die Umgebung reproduzierbar ausgerollt wird. Für die Claimity AG hat smiit DevOps-Pipelines aufgebaut, die das automatisierte Ausliefern ermöglichten und maßgeblich dazu beitrugen, die Plattform in nur sechs Wochen produktiv auf Azure zu bringen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Continuous Delivery und Continuous Deployment?",
        answer:
          "Bei Continuous Delivery ist jede geprüfte Version jederzeit auslieferbar, der finale Schritt in die Produktion erfolgt aber auf Freigabe. Bei Continuous Deployment wird auch dieser Schritt vollständig automatisiert.",
      },
      {
        question: "Lohnt sich CI/CD auch für kleine Teams?",
        answer:
          "Ja. Schon eine einfache Pipeline für automatisiertes Bauen und Testen reduziert Fehler und manuellen Aufwand erheblich. CI/CD lässt sich schrittweise einführen und mitwachsen.",
      },
      {
        question: "Was gehört typischerweise in eine CI/CD-Pipeline?",
        answer:
          "Eine Pipeline besteht aus aufeinanderfolgenden Schritten, üblicherweise Build, automatisierte Tests, Sicherheitsprüfungen und Deployment in die jeweilige Umgebung. Der genaue Zuschnitt hängt vom Projekt ab, doch das Prinzip bleibt gleich: jeder Schritt ist automatisiert und nachvollziehbar.",
      },
      {
        question: "Was passiert, wenn ein Build oder Test in der Pipeline fehlschlägt?",
        answer:
          "Schlägt ein Schritt fehl, stoppt die Pipeline und die Änderung wird nicht weiter ausgeliefert. So gelangen fehlerhafte Stände gar nicht erst in Test- oder Produktivumgebungen, und das Team erhält frühzeitig eine klare Rückmeldung zur Ursache.",
      },
      {
        question: "Wie hängen CI/CD und Infrastructure as Code zusammen?",
        answer:
          "CI/CD automatisiert das Bauen und Ausliefern der Software, Infrastructure as Code beschreibt die zugehörige Umgebung. Werden beide kombiniert, lassen sich Anwendung und Infrastruktur gemeinsam reproduzierbar ausrollen, statt die Umgebung manuell vorzuhalten.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "CI/CD: Definition, Pipeline & Nutzen | smiit Glossar",
    metaDescription:
      "CI/CD erklärt: Continuous Integration und Delivery/Deployment, Pipelines und Nutzen – mit Praxisbeispiel von smiit (SaaS in 6 Wochen auf Azure).",
  },
  en: {
    slug: "ci-cd",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "CI/CD",
    title: "What is CI/CD?",
    shortDefinition:
      "CI/CD stands for continuous integration and continuous delivery/deployment — the automated building, testing and shipping of software. Code changes are continuously merged, checked automatically and brought into test and production environments in a controlled way through a pipeline.",
    synonyms: ["continuous integration", "continuous delivery", "continuous deployment", "build pipeline"],
    sections: [
      {
        heading: "Where CI/CD is used",
        paragraphs: [
          "Continuous integration (CI) means that developers merge their changes into a shared state frequently, with automated builds and tests immediately checking that everything fits together. Continuous delivery (CD) ensures that every checked version could be shipped at any time; with continuous deployment, the release even happens fully automatically.",
          "Technically this is represented through a pipeline — a defined sequence of steps such as build, test, security check and deployment. In the Microsoft world, Azure DevOps Pipelines or GitHub Actions are used for this.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a SaaS platform, every code change is built and tested automatically. If it passes all checks, it is shipped through the pipeline first to a test environment and, after approval, in a controlled way to production. This makes releases traceable, repeatable and free of manual error sources — even with a short time to market.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "CI/CD is a concrete building block of the overarching DevOps way of working and is often combined with infrastructure as code so that not only the code but also the environment is rolled out reproducibly. For Claimity AG, smiit built DevOps pipelines that enabled automated delivery and contributed significantly to taking the platform live on Azure in just six weeks.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between continuous delivery and continuous deployment?",
        answer:
          "With continuous delivery, every checked version can be shipped at any time, but the final step into production happens on approval. With continuous deployment, this step is fully automated too.",
      },
      {
        question: "Is CI/CD worthwhile for small teams too?",
        answer:
          "Yes. Even a simple pipeline for automated building and testing significantly reduces errors and manual effort. CI/CD can be introduced step by step and grow over time.",
      },
      {
        question: "What typically belongs in a CI/CD pipeline?",
        answer:
          "A pipeline consists of consecutive steps, usually build, automated tests, security checks and deployment to the respective environment. The exact shape depends on the project, but the principle stays the same: every step is automated and traceable.",
      },
      {
        question: "What happens when a build or test fails in the pipeline?",
        answer:
          "If a step fails, the pipeline stops and the change is not shipped any further. This prevents faulty states from reaching test or production environments in the first place, and the team gets clear, early feedback on the cause.",
      },
      {
        question: "How do CI/CD and infrastructure as code relate?",
        answer:
          "CI/CD automates building and shipping the software, infrastructure as code describes the associated environment. When both are combined, application and infrastructure can be rolled out reproducibly together instead of maintaining the environment manually.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "CI/CD: definition, pipeline & benefits | smiit glossary",
    metaDescription:
      "CI/CD explained: continuous integration and delivery/deployment, pipelines and benefits — with a smiit example (SaaS live on Azure in 6 weeks).",
  },
}

const iac: LocalizedGlossaryTerm = {
  de: {
    slug: "iac",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IaC (Infrastructure as Code)",
    title: "Was ist IaC (Infrastructure as Code)?",
    shortDefinition:
      "Infrastructure as Code (IaC) bedeutet, IT-Infrastruktur wie Server, Netzwerke und Dienste nicht manuell zu klicken, sondern in Code zu beschreiben und automatisiert bereitzustellen. Die Infrastruktur wird damit versionierbar, reproduzierbar und prüfbar – wie Anwendungscode.",
    synonyms: ["Infrastructure as Code", "deklarative Infrastruktur", "Bicep", "Terraform", "ARM-Templates"],
    sections: [
      {
        heading: "Einordnung: Wofür wird IaC genutzt?",
        paragraphs: [
          "Statt Ressourcen in der Cloud per Konsole von Hand anzulegen, beschreibt IaC den gewünschten Zielzustand in Dateien – häufig deklarativ. Werkzeuge wie Bicep, ARM-Templates oder Terraform lesen diese Beschreibung und erstellen oder aktualisieren die Infrastruktur entsprechend. Das Ergebnis ist immer gleich, unabhängig davon, wer es ausführt.",
          "Dadurch lassen sich Umgebungen wie Test und Produktion identisch aufbauen, Änderungen über Versionskontrolle nachvollziehen und im Fehlerfall reproduzierbar wiederherstellen. IaC ist damit eine zentrale Grundlage für zuverlässige, automatisierte Cloud-Betriebsmodelle.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine komplette Azure-Umgebung – inklusive Netzwerk, Diensten und Sicherheitskomponenten – wird vollständig in Code beschrieben. Über eine Pipeline wird diese Beschreibung automatisiert ausgerollt, sodass eine neue Umgebung in kurzer Zeit identisch zur bestehenden aufgebaut werden kann. Manuelle Konfigurationsfehler entfallen, und jede Änderung ist nachvollziehbar dokumentiert.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "IaC beschreibt die Bereitstellung von Infrastruktur, während CI/CD das Bauen und Ausliefern von Software automatisiert; beide sind Bausteine der DevOps-Arbeitsweise und greifen oft ineinander. Für die Claimity AG hat smiit die gesamte DSGVO-konforme Azure-Infrastruktur als Infrastructure as Code mit DevOps-Pipelines umgesetzt – Grundlage dafür, die SaaS-Plattform in nur sechs Wochen reproduzierbar und sicher produktiv zu bringen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen deklarativem und imperativem IaC?",
        answer:
          "Deklaratives IaC beschreibt den gewünschten Zielzustand, und das Werkzeug ermittelt die nötigen Schritte selbst. Imperatives IaC legt die Abfolge der Schritte explizit fest. In der Cloud sind deklarative Ansätze wie Bicep oder Terraform verbreitet.",
      },
      {
        question: "Warum ist IaC für die Cloud so wichtig?",
        answer:
          "Cloud-Umgebungen sind komplex und ändern sich häufig. IaC sorgt dafür, dass Umgebungen reproduzierbar, nachvollziehbar und konsistent bleiben, statt durch manuelle Eingriffe auseinanderzulaufen.",
      },
      {
        question: "Was bedeutet „Configuration Drift“ und wie hilft IaC dagegen?",
        answer:
          "Von Configuration Drift spricht man, wenn der tatsächliche Zustand einer Umgebung durch manuelle Änderungen vom dokumentierten Soll abweicht. Da IaC den Zielzustand in Code festhält und reproduzierbar anwendet, lässt sich Drift erkennen und die Umgebung wieder in den definierten Zustand bringen.",
      },
      {
        question: "Erhöht IaC nicht den anfänglichen Aufwand?",
        answer:
          "Zu Beginn ist der Aufwand höher, weil die Infrastruktur zunächst in Code beschrieben werden muss. Dieser Mehraufwand zahlt sich aus, sobald Umgebungen wiederholt aufgebaut, geändert oder im Fehlerfall wiederhergestellt werden – dann sind manuelle Schritte fehleranfälliger und langsamer.",
      },
      {
        question: "Sollte man Geheimnisse wie Passwörter in IaC-Dateien speichern?",
        answer:
          "Nein. Geheimnisse gehören nicht im Klartext in versionierte IaC-Dateien, da diese sonst sensible Daten preisgeben. Stattdessen werden sie über sichere Tresore oder Geheimnis-Verwaltungen referenziert und erst zur Laufzeit aufgelöst.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IaC (Infrastructure as Code): Definition & Nutzen | smiit Glossar",
    metaDescription:
      "Infrastructure as Code (IaC) erklärt: reproduzierbare, versionierbare Cloud-Infrastruktur per Code – mit Azure-Praxisbeispiel von smiit (SaaS in 6 Wochen).",
  },
  en: {
    slug: "iac",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IaC (infrastructure as code)",
    title: "What is IaC (infrastructure as code)?",
    shortDefinition:
      "Infrastructure as code (IaC) means describing IT infrastructure such as servers, networks and services in code and provisioning it automatically, rather than clicking it together manually. Infrastructure thereby becomes versionable, reproducible and reviewable — just like application code.",
    synonyms: ["infrastructure as code", "declarative infrastructure", "Bicep", "Terraform", "ARM templates"],
    sections: [
      {
        heading: "Where IaC is used",
        paragraphs: [
          "Instead of creating cloud resources by hand through a console, IaC describes the desired target state in files — often declaratively. Tools such as Bicep, ARM templates or Terraform read this description and create or update the infrastructure accordingly. The result is always the same, regardless of who runs it.",
          "This makes it possible to build environments such as test and production identically, trace changes through version control and restore reproducibly in case of failure. IaC is therefore a central foundation for reliable, automated cloud operating models.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A complete Azure environment — including network, services and security components — is described entirely in code. Through a pipeline, this description is rolled out automatically, so a new environment can be built identically to the existing one in a short time. Manual configuration errors are eliminated and every change is documented traceably.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "IaC describes the provisioning of infrastructure, while CI/CD automates the building and shipping of software; both are building blocks of the DevOps way of working and often interlock. For Claimity AG, smiit implemented the entire GDPR-compliant Azure infrastructure as infrastructure as code with DevOps pipelines — the basis for taking the SaaS platform live reproducibly and securely in just six weeks.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between declarative and imperative IaC?",
        answer:
          "Declarative IaC describes the desired target state, and the tool works out the necessary steps itself. Imperative IaC explicitly defines the sequence of steps. In the cloud, declarative approaches such as Bicep or Terraform are common.",
      },
      {
        question: "Why is IaC so important for the cloud?",
        answer:
          "Cloud environments are complex and change frequently. IaC ensures that environments stay reproducible, traceable and consistent instead of drifting apart through manual intervention.",
      },
      {
        question: "What is \"configuration drift\" and how does IaC help against it?",
        answer:
          "Configuration drift occurs when the actual state of an environment deviates from the documented target due to manual changes. Since IaC captures the target state in code and applies it reproducibly, drift can be detected and the environment brought back to the defined state.",
      },
      {
        question: "Doesn't IaC increase the initial effort?",
        answer:
          "At the start the effort is higher, because the infrastructure first has to be described in code. This extra effort pays off as soon as environments are built, changed or restored repeatedly — manual steps are then more error-prone and slower.",
      },
      {
        question: "Should secrets such as passwords be stored in IaC files?",
        answer:
          "No. Secrets do not belong in plain text in versioned IaC files, as these would otherwise expose sensitive data. Instead they are referenced through secure vaults or secret management and only resolved at runtime.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IaC (infrastructure as code): definition | smiit glossary",
    metaDescription:
      "Infrastructure as code (IaC) explained: reproducible, versionable cloud infrastructure via code — with an Azure example from smiit (SaaS in 6 weeks).",
  },
}

const iamKeycloak: LocalizedGlossaryTerm = {
  de: {
    slug: "iam-keycloak",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IAM / Keycloak",
    title: "Was ist IAM / Keycloak?",
    shortDefinition:
      "IAM (Identity and Access Management) umfasst die Verwaltung digitaler Identitäten und ihrer Zugriffsrechte – also wer sich wie anmeldet und worauf zugreifen darf. Keycloak ist eine verbreitete Open-Source-Lösung für IAM, die Single Sign-On, Multifaktor-Authentifizierung und Standardprotokolle wie OpenID Connect und OAuth 2.0 bereitstellt.",
    synonyms: ["Identity and Access Management", "Identitätsmanagement", "Single Sign-On", "SSO", "OpenID Connect"],
    sections: [
      {
        heading: "Einordnung: Wofür wird IAM / Keycloak genutzt?",
        paragraphs: [
          "IAM beantwortet zwei Kernfragen: Authentifizierung (wer ist der Nutzer?) und Autorisierung (was darf er?). Eine zentrale IAM-Lösung bündelt Anmeldung, Rollen und Rechte, statt sie über viele Anwendungen zu verstreuen. Das senkt Risiken und vereinfacht die Verwaltung erheblich.",
          "Keycloak ist eine etablierte Open-Source-Plattform dafür. Sie bietet Single Sign-On über mehrere Anwendungen, unterstützt Multifaktor-Authentifizierung und setzt auf offene Standards wie OpenID Connect, OAuth 2.0 und SAML. Damit lassen sich eigene Anwendungen und Drittsysteme unter einer einheitlichen Identitätsverwaltung zusammenführen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine SaaS-Plattform benötigt eine sichere, zentrale Anmeldung für ihre Nutzer. Keycloak übernimmt Authentifizierung und Identitätsverwaltung, erzwingt Multifaktor-Authentifizierung und stellt Tokens über OpenID Connect aus. Die einzelnen Anwendungskomponenten müssen sich so nicht selbst um Login und Passwortverwaltung kümmern, sondern vertrauen der zentralen Identitätslösung.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "IAM ist das übergeordnete Konzept, Keycloak ein konkretes Werkzeug zu seiner Umsetzung. IAM bildet die Grundlage für Multifaktor-Authentifizierung und ist ein zentraler Baustein der IT-Sicherheit, grenzt sich aber von der reinen Netzwerksicherheit ab, die Datenverkehr und Segmentierung adressiert. Für die Claimity AG hat smiit Keycloak für Identität und MFA eingesetzt und so eine sichere, DSGVO-konforme Anmeldung in der Azure-Infrastruktur verankert.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Authentifizierung und Autorisierung?",
        answer:
          "Authentifizierung prüft, wer ein Nutzer ist, etwa über Passwort und zweiten Faktor. Autorisierung legt fest, worauf dieser Nutzer zugreifen darf. IAM-Lösungen wie Keycloak verwalten beides zentral.",
      },
      {
        question: "Warum eine zentrale IAM-Lösung statt Login je Anwendung?",
        answer:
          "Eine zentrale Lösung reduziert Sicherheitsrisiken, ermöglicht Single Sign-On und vereinfacht die Verwaltung von Nutzern und Rechten erheblich. Änderungen müssen nur an einer Stelle gepflegt werden.",
      },
      {
        question: "Was ist der Unterschied zwischen Keycloak und einem Cloud-Dienst wie Microsoft Entra ID?",
        answer:
          "Keycloak ist eine selbst betreibbare Open-Source-Lösung, die volle Kontrolle über Konfiguration und Datenhaltung bietet. Cloud-Dienste wie Microsoft Entra ID werden als verwalteter Service betrieben und nehmen Betriebsaufwand ab. Die Wahl hängt von Anforderungen an Kontrolle, Betrieb und Integration ab.",
      },
      {
        question: "Wofür stehen OpenID Connect und OAuth 2.0?",
        answer:
          "OAuth 2.0 ist ein Standard für die Autorisierung, also das kontrollierte Gewähren von Zugriff, ohne Passwörter weiterzugeben. OpenID Connect baut darauf auf und ergänzt die Authentifizierung, also die Feststellung der Identität. Beide sind offene Standards, die ein zentrales Login über mehrere Anwendungen ermöglichen.",
      },
      {
        question: "Bedeutet Single Sign-On, dass ein Passwort für alles ausreicht?",
        answer:
          "Single Sign-On bedeutet, dass sich Nutzer einmal zentral anmelden und danach mehrere Anwendungen nutzen können, ohne sich erneut einzuloggen. Es ersetzt nicht die Sicherheit der einzelnen Anmeldung – im Gegenteil wird diese eine Anmeldung üblicherweise durch Multifaktor-Authentifizierung zusätzlich abgesichert.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IAM & Keycloak: Definition, Funktionen & Beispiel | smiit Glossar",
    metaDescription:
      "IAM und Keycloak erklärt: Identitäts- und Zugriffsverwaltung, Single Sign-On und MFA mit offenen Standards – mit Azure-Praxisbeispiel von smiit.",
  },
  en: {
    slug: "iam-keycloak",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IAM / Keycloak",
    title: "What is IAM / Keycloak?",
    shortDefinition:
      "IAM (identity and access management) covers the administration of digital identities and their access rights — that is, who signs in how and what they are allowed to access. Keycloak is a widely used open-source IAM solution that provides single sign-on, multi-factor authentication and standard protocols such as OpenID Connect and OAuth 2.0.",
    synonyms: ["identity and access management", "identity management", "single sign-on", "SSO", "OpenID Connect"],
    sections: [
      {
        heading: "Where IAM / Keycloak is used",
        paragraphs: [
          "IAM answers two core questions: authentication (who is the user?) and authorization (what may they do?). A central IAM solution bundles sign-in, roles and rights instead of scattering them across many applications. This lowers risks and considerably simplifies administration.",
          "Keycloak is an established open-source platform for this. It offers single sign-on across multiple applications, supports multi-factor authentication and relies on open standards such as OpenID Connect, OAuth 2.0 and SAML. This makes it possible to bring your own applications and third-party systems together under unified identity management.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A SaaS platform needs a secure, central sign-in for its users. Keycloak handles authentication and identity management, enforces multi-factor authentication and issues tokens via OpenID Connect. The individual application components therefore do not have to manage login and passwords themselves but trust the central identity solution.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "IAM is the overarching concept, Keycloak a concrete tool for implementing it. IAM forms the basis for multi-factor authentication and is a central building block of IT security, but it is distinct from pure network security, which addresses traffic and segmentation. For Claimity AG, smiit used Keycloak for identity and MFA, anchoring a secure, GDPR-compliant sign-in within the Azure infrastructure.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between authentication and authorization?",
        answer:
          "Authentication verifies who a user is, for example via password and second factor. Authorisation defines what that user is allowed to access. IAM solutions such as Keycloak manage both centrally.",
      },
      {
        question: "Why a central IAM solution instead of login per application?",
        answer:
          "A central solution reduces security risks, enables single sign-on and considerably simplifies the management of users and rights. Changes only have to be maintained in one place.",
      },
      {
        question: "What is the difference between Keycloak and a cloud service like Microsoft Entra ID?",
        answer:
          "Keycloak is a self-hostable open-source solution that offers full control over configuration and data storage. Cloud services such as Microsoft Entra ID run as a managed service and reduce operational effort. The choice depends on requirements around control, operations and integration.",
      },
      {
        question: "What do OpenID Connect and OAuth 2.0 stand for?",
        answer:
          "OAuth 2.0 is a standard for authorization, that is the controlled granting of access without passing on passwords. OpenID Connect builds on it and adds authentication, that is establishing identity. Both are open standards that enable a central login across multiple applications.",
      },
      {
        question: "Does single sign-on mean one password is enough for everything?",
        answer:
          "Single sign-on means users sign in centrally once and can then use multiple applications without logging in again. It does not replace the security of that single sign-in — on the contrary, this one login is usually additionally protected with multi-factor authentication.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IAM & Keycloak: definition, features & example | smiit glossary",
    metaDescription:
      "IAM and Keycloak explained: identity and access management, single sign-on and MFA with open standards — with an Azure example from smiit.",
  },
}

const mfa2fa: LocalizedGlossaryTerm = {
  de: {
    slug: "mfa-2fa",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Multifaktor-Authentifizierung (MFA / 2FA)",
    title: "Was ist Multifaktor-Authentifizierung (MFA / 2FA)?",
    shortDefinition:
      "Multifaktor-Authentifizierung (MFA) verlangt für die Anmeldung mehr als nur ein Passwort, indem mindestens zwei unabhängige Faktoren kombiniert werden – etwa Wissen (Passwort) und Besitz (Einmalcode auf dem Smartphone). Zwei-Faktor-Authentifizierung (2FA) ist der Spezialfall mit genau zwei Faktoren und erschwert unbefugten Zugriff erheblich.",
    synonyms: ["MFA", "2FA", "Zwei-Faktor-Authentifizierung", "OTP", "Einmalpasswort"],
    sections: [
      {
        heading: "Einordnung: Wofür wird MFA / 2FA genutzt?",
        paragraphs: [
          "MFA schützt Anmeldungen für den Fall, dass ein Passwort gestohlen oder erraten wird. Üblicherweise werden Faktoren aus drei Kategorien kombiniert: Wissen (Passwort), Besitz (Smartphone, Token) und Inhärenz (Fingerabdruck, Gesicht). Erst die Kombination mehrerer Faktoren macht einen Zugang deutlich schwerer angreifbar.",
          "Ein verbreiteter zweiter Faktor ist ein zeitbasiertes Einmalpasswort (OTP) aus einer Authenticator-App. Ergänzend kommen Recovery-Codes zum Einsatz, falls der zweite Faktor verloren geht. Moderne Verfahren wie Passkeys gehen noch weiter, werden aber je nach Reifegrad eines Projekts bewusst gestaffelt eingeführt.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Für eine SaaS-Plattform wird die Anmeldung mit MFA abgesichert: Nach Passwort und Benutzername bestätigen Nutzer ihre Identität über ein zeitbasiertes Einmalpasswort (OTP). Für den Fall eines verlorenen zweiten Faktors stehen Recovery-Codes bereit. Komfortablere, aber komplexere Verfahren wie Passkeys werden zunächst bewusst deaktiviert, um den Start einfach und kontrolliert zu halten.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "2FA ist der Sonderfall von MFA mit genau zwei Faktoren; MFA ist der Oberbegriff. MFA ist eng mit IAM und Keycloak verbunden, da die Identitätslösung die zusätzlichen Faktoren erzwingt, und ist ein zentraler Baustein der IT-Sicherheit. Für die Claimity AG hat smiit MFA per OTP mit Recovery-Codes umgesetzt und Passkeys bewusst zunächst deaktiviert – eine pragmatische, sichere Konfiguration über Keycloak.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen MFA und 2FA?",
        answer:
          "2FA verwendet genau zwei Faktoren, MFA mindestens zwei und ist damit der Oberbegriff. Jede 2FA ist eine MFA, aber MFA kann auch mehr als zwei Faktoren umfassen.",
      },
      {
        question: "Was passiert, wenn ich meinen zweiten Faktor verliere?",
        answer:
          "Dafür gibt es Recovery-Codes, die bei der Einrichtung erzeugt und sicher aufbewahrt werden. Mit ihnen lässt sich der Zugang wiederherstellen, ohne die Sicherheit grundsätzlich zu schwächen.",
      },
      {
        question: "Ist eine SMS als zweiter Faktor sicher genug?",
        answer:
          "SMS-Codes sind besser als gar kein zweiter Faktor, gelten aber als weniger sicher, weil sie etwa durch Umleitung der Rufnummer abgefangen werden können. Authenticator-Apps mit zeitbasierten Einmalpasswörtern oder Verfahren wie Passkeys bieten ein höheres Schutzniveau.",
      },
      {
        question: "Was sind Passkeys und worin unterscheiden sie sich von einem OTP?",
        answer:
          "Passkeys sind ein passwortloses Verfahren auf Basis kryptografischer Schlüsselpaare, bei dem kein Code abgetippt wird und nichts Abfangbares übertragen wird. Im Gegensatz zu einem zeitbasierten Einmalpasswort (OTP) sind sie resistenter gegen Phishing, erfordern aber unterstützende Geräte und etwas mehr Einrichtungsaufwand.",
      },
      {
        question: "Lohnt sich MFA auch für kleine Teams?",
        answer:
          "Ja. Der Schutz vor gestohlenen oder erratenen Passwörtern ist unabhängig von der Teamgröße wertvoll, und der Einrichtungsaufwand ist gering. Gerade für Konten mit Zugriff auf sensible Daten gilt MFA als eine der wirksamsten und günstigsten Maßnahmen.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "MFA / 2FA: Definition, Faktoren & Beispiel | smiit Glossar",
    metaDescription:
      "Multifaktor-Authentifizierung (MFA / 2FA) erklärt: Faktoren, OTP und Recovery-Codes für sichere Anmeldungen – mit Praxisbeispiel von smiit.",
  },
  en: {
    slug: "mfa-2fa",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Multi-factor authentication (MFA / 2FA)",
    title: "What is multi-factor authentication (MFA / 2FA)?",
    shortDefinition:
      "Multi-factor authentication (MFA) requires more than just a password for sign-in by combining at least two independent factors — such as knowledge (password) and possession (one-time code on a smartphone). Two-factor authentication (2FA) is the special case with exactly two factors and makes unauthorised access considerably harder.",
    synonyms: ["MFA", "2FA", "two-factor authentication", "OTP", "one-time password"],
    sections: [
      {
        heading: "Where MFA / 2FA is used",
        paragraphs: [
          "MFA protects sign-ins in case a password is stolen or guessed. Typically, factors from three categories are combined: knowledge (password), possession (smartphone, token) and inherence (fingerprint, face). Only the combination of multiple factors makes access significantly harder to attack.",
          "A common second factor is a time-based one-time password (OTP) from an authenticator app. Recovery codes are used in addition, in case the second factor is lost. Modern methods such as passkeys go even further but are deliberately introduced in a staged way depending on a project's maturity.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a SaaS platform, sign-in is secured with MFA: after username and password, users confirm their identity via a time-based one-time password (OTP). In case the second factor is lost, recovery codes are available. More convenient but more complex methods such as passkeys are deliberately disabled at first to keep the launch simple and controlled.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "2FA is the special case of MFA with exactly two factors; MFA is the umbrella term. MFA is closely linked to IAM and Keycloak, since the identity solution enforces the additional factors, and it is a central building block of IT security. For Claimity AG, smiit implemented MFA via OTP with recovery codes and deliberately disabled passkeys at first — a pragmatic, secure configuration through Keycloak.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between MFA and 2FA?",
        answer:
          "2FA uses exactly two factors, MFA at least two and is therefore the umbrella term. Every 2FA is an MFA, but MFA can also involve more than two factors.",
      },
      {
        question: "What happens if I lose my second factor?",
        answer:
          "For that there are recovery codes, generated during setup and kept securely. They allow access to be restored without fundamentally weakening security.",
      },
      {
        question: "Is an SMS secure enough as a second factor?",
        answer:
          "SMS codes are better than no second factor at all, but they are considered less secure because they can be intercepted, for instance by redirecting the phone number. Authenticator apps with time-based one-time passwords or methods such as passkeys offer a higher level of protection.",
      },
      {
        question: "What are passkeys and how do they differ from an OTP?",
        answer:
          "Passkeys are a passwordless method based on cryptographic key pairs, where no code is typed and nothing interceptable is transmitted. Unlike a time-based one-time password (OTP), they are more resistant to phishing, but they require supporting devices and a little more setup effort.",
      },
      {
        question: "Is MFA worthwhile for small teams too?",
        answer:
          "Yes. Protection against stolen or guessed passwords is valuable regardless of team size, and the setup effort is low. Especially for accounts with access to sensitive data, MFA is considered one of the most effective and inexpensive measures.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "MFA / 2FA: definition, factors & example | smiit glossary",
    metaDescription:
      "Multi-factor authentication (MFA / 2FA) explained: factors, OTP and recovery codes for secure sign-ins — with a practical example from smiit.",
  },
}

const networkingSecurity: LocalizedGlossaryTerm = {
  de: {
    slug: "networking-security",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Networking & Security (VNet, Zero Trust)",
    title: "Was ist Networking & Security (VNet, Zero Trust)?",
    shortDefinition:
      "Networking & Security umfasst die Gestaltung und Absicherung der Netzwerkebene einer Cloud-Umgebung. Ein Virtual Network (VNet) schottet Ressourcen logisch ab und kontrolliert ihren Datenverkehr; Zero Trust ist das Prinzip, keinem Zugriff blind zu vertrauen, sondern jeden Zugriff zu prüfen – unabhängig davon, ob er aus dem internen Netz kommt.",
    synonyms: ["VNet", "Virtual Network", "Zero Trust", "Netzwerksicherheit", "Netzwerksegmentierung"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Networking & Security genutzt?",
        paragraphs: [
          "In der Cloud ist das Netzwerk eine eigene Sicherheitsebene. Ein Virtual Network (VNet) gruppiert Ressourcen in einem abgeschotteten Bereich, in dem sich über Subnetze und Regeln steuern lässt, welche Komponenten miteinander und mit dem Internet kommunizieren dürfen. So entsteht eine kontrollierte Angriffsfläche statt eines offenen Systems.",
          "Zero Trust ergänzt dies als Grundhaltung: Es gibt kein implizit vertrauenswürdiges internes Netz mehr. Jeder Zugriff wird authentifiziert, autorisiert und möglichst minimal gewährt. Vorgelagerte Dienste wie Azure Front Door filtern eingehenden Datenverkehr, bevor er interne Komponenten überhaupt erreicht.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Bei einer SaaS-Plattform liegen die internen Komponenten in einem Azure Virtual Network und sind nicht direkt aus dem Internet erreichbar. Eingehender Datenverkehr läuft über Azure Front Door, das als geschützter Eingangspunkt dient und unerwünschte Anfragen abfängt. Zugriffe werden konsequent geprüft, sodass selbst innerhalb der Umgebung kein blindes Vertrauen besteht.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Networking & Security adressiert die Netzwerk- und Transportebene und grenzt sich damit von IAM ab, das Identitäten und Zugriffsrechte regelt – beide sind komplementäre Bausteine der IT-Sicherheit und tragen gemeinsam zu DSGVO-konformem Datenschutz bei. Für die Claimity AG hat smiit eine Azure-Umgebung mit Virtual Network, Azure Front Door und Azure Key Vault aufgebaut und so eine abgeschottete, nach Zero-Trust-Prinzipien gestaltete Infrastruktur geschaffen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist ein Virtual Network (VNet)?",
        answer:
          "Ein VNet ist ein logisch abgeschotteter Netzwerkbereich in der Cloud, in dem sich über Subnetze und Regeln steuern lässt, welche Ressourcen miteinander und mit dem Internet kommunizieren dürfen. Es reduziert die Angriffsfläche erheblich.",
      },
      {
        question: "Bedeutet Zero Trust, dass man niemandem vertraut?",
        answer:
          "Zero Trust bedeutet, keinem Zugriff allein aufgrund seiner Herkunft zu vertrauen. Stattdessen wird jeder Zugriff geprüft und nur so weit gewährt, wie er wirklich nötig ist – auch innerhalb des internen Netzes.",
      },
      {
        question: "Worin unterscheidet sich Networking & Security von IAM?",
        answer:
          "Networking & Security sichert die Netzwerk- und Transportebene – also welche Komponenten überhaupt miteinander kommunizieren dürfen. IAM regelt dagegen Identitäten und Zugriffsrechte – also wer sich anmeldet und worauf er zugreifen darf. Beide ergänzen sich als komplementäre Ebenen der IT-Sicherheit.",
      },
      {
        question: "Reicht eine Firewall aus, um die Cloud abzusichern?",
        answer:
          "Eine Firewall ist ein wichtiger Baustein, aber allein nicht ausreichend. In der Cloud wirken mehrere Ebenen zusammen: Netzwerksegmentierung über ein VNet, vorgelagerte Filterung des eingehenden Datenverkehrs, Verschlüsselung sowie Identitäts- und Zugriffskontrolle nach Zero-Trust-Prinzipien.",
      },
      {
        question: "Wie unterscheidet sich Zero Trust vom klassischen Perimeter-Ansatz?",
        answer:
          "Der klassische Perimeter-Ansatz vertraut allem innerhalb des „inneren“ Netzes und sichert vor allem die Außengrenze ab. Zero Trust gibt dieses implizite Vertrauen auf und prüft jeden Zugriff einzeln – das ist besonders in Cloud- und verteilten Umgebungen sinnvoll, in denen es keine klare Außengrenze mehr gibt.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Networking & Security (VNet, Zero Trust) | smiit Glossar",
    metaDescription:
      "Networking & Security erklärt: Virtual Network (VNet), Zero Trust und Netzwerksegmentierung in der Cloud – mit Azure-Praxisbeispiel von smiit.",
  },
  en: {
    slug: "networking-security",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Networking & security (VNet, zero trust)",
    title: "What is networking & security (VNet, zero trust)?",
    shortDefinition:
      "Networking & security covers the design and protection of the network layer of a cloud environment. A virtual network (VNet) logically isolates resources and controls their traffic; zero trust is the principle of never trusting any access blindly but verifying every access — regardless of whether it comes from the internal network.",
    synonyms: ["VNet", "virtual network", "zero trust", "network security", "network segmentation"],
    sections: [
      {
        heading: "Where networking & security is used",
        paragraphs: [
          "In the cloud, the network is its own security layer. A virtual network (VNet) groups resources in an isolated area, in which subnets and rules control which components may communicate with each other and with the internet. This creates a controlled attack surface instead of an open system.",
          "Zero trust complements this as a basic stance: there is no longer an implicitly trustworthy internal network. Every access is authenticated, authorised and granted as minimally as possible. Upstream services such as Azure Front Door filter inbound traffic before it even reaches internal components.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a SaaS platform, the internal components sit in an Azure virtual network and are not directly reachable from the internet. Inbound traffic runs through Azure Front Door, which serves as a protected entry point and intercepts unwanted requests. Access is consistently verified, so that even within the environment there is no blind trust.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Networking & security addresses the network and transport layer and is therefore distinct from IAM, which governs identities and access rights — both are complementary building blocks of IT security and jointly contribute to GDPR-compliant data protection. For Claimity AG, smiit built an Azure environment with a virtual network, Azure Front Door and Azure Key Vault, creating an isolated infrastructure designed along zero-trust principles.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a virtual network (VNet)?",
        answer:
          "A VNet is a logically isolated network area in the cloud in which subnets and rules control which resources may communicate with each other and with the internet. It considerably reduces the attack surface.",
      },
      {
        question: "Does zero trust mean you trust no one?",
        answer:
          "Zero trust means not trusting any access purely because of its origin. Instead, every access is verified and granted only as far as it is really needed — even within the internal network.",
      },
      {
        question: "How does networking & security differ from IAM?",
        answer:
          "Networking & security secures the network and transport layer — that is, which components are even allowed to communicate with each other. IAM, by contrast, governs identities and access rights — that is, who signs in and what they may access. The two complement each other as layers of IT security.",
      },
      {
        question: "Is a firewall enough to secure the cloud?",
        answer:
          "A firewall is an important building block, but on its own it is not sufficient. In the cloud, several layers work together: network segmentation via a VNet, upstream filtering of inbound traffic, encryption, and identity and access control along zero-trust principles.",
      },
      {
        question: "How does zero trust differ from the classic perimeter approach?",
        answer:
          "The classic perimeter approach trusts everything inside the \"internal\" network and mainly secures the outer boundary. Zero trust gives up this implicit trust and verifies every access individually — which is especially useful in cloud and distributed environments where there is no longer a clear outer boundary.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Networking & security (VNet, zero trust) | smiit glossary",
    metaDescription:
      "Networking & security explained: virtual network (VNet), zero trust and network segmentation in the cloud — with an Azure example from smiit.",
  },
}

const glossaryTerms: Record<string, LocalizedGlossaryTerm> = {
  "power-bi": powerBi,
  "saas": saas,
  "process-automation": prozessautomatisierung,
  "data-warehouse": dataWarehouse,
  "data-strategy": datenstrategie,
  "data-governance": dataGovernance,
  "mlops": mlops,
  "machine-learning-azure": machineLearningAzure,
  "data-modeling": datenmodellierung,
  "medallion-architecture": medallionArchitektur,
  "power-query": powerQuery,
  "dax": dax,
  "semantic-model": semanticModel,
  "row-level-security": rowLevelSecurity,
  "etl-elt": etlElt,
  "microsoft-fabric": microsoftFabric,
  "azure-databricks": azureDatabricks,
  "digital-platforms": digitalePlattformen,
  "cloud-computing": cloudComputing,
  "cloud-infrastructure": cloudInfrastruktur,
  "cloud-governance": cloudGovernance,
  "sdlc": sdlc,
  "multi-tenant-architecture": multiTenantArchitektur,
  "rest-api": restApi,
  "mvp": mvp,
  "devops": devops,
  "it-security": itSicherheit,
  "gdpr": dsgvoDatenschutz,
  "power-automate": powerAutomate,
  "ai-builder": aiBuilder,
  "master-data-management": stammdatenmanagement,
  "ci-cd": ciCd,
  "iac": iac,
  "iam-keycloak": iamKeycloak,
  "mfa-2fa": mfa2fa,
  "networking-security": networkingSecurity,
}

// ---------------------------------------------------------------------------
// Extras: misconceptions + external sources (merged into terms on read)
// ---------------------------------------------------------------------------

const glossaryExtras: Record<string, Record<Locale, GlossaryExtra>> = {
  "power-bi": {
    de: {
      misconceptions: [
        "Power BI wird oft mit Excel gleichgesetzt; tatsächlich ist es eine eigenständige BI-Plattform mit Datenmodell, Beziehungen und DAX, die weit über Tabellenkalkulation hinausgeht.",
        "Viele glauben, Power BI ersetze ein Data Warehouse. Es ist aber primär eine Analyse- und Visualisierungsschicht und kein dauerhafter, skalierbarer Speicher für große, integrierte Datenbestände.",
        "Ein verbreiteter Irrtum ist, dass schöne Dashboards genügen. Ohne saubere Datenmodellierung und korrekte Beziehungen liefern Berichte schnell falsche Kennzahlen.",
      ],
      sources: [
        { title: "Microsoft Learn – Power BI Dokumentation", url: "https://learn.microsoft.com/power-bi/" },
        { title: "Microsoft Learn – Power BI Leitfaden (Guidance)", url: "https://learn.microsoft.com/power-bi/guidance/" },
      ],
    },
    en: {
      misconceptions: [
        "Power BI is often treated as just Excel; in reality it is a dedicated BI platform with a data model, relationships and DAX that goes far beyond spreadsheets.",
        "Many assume Power BI replaces a data warehouse, but it is primarily an analytics and visualization layer, not a durable, scalable store for large integrated data.",
        "A common error is believing that attractive dashboards are enough. Without clean data modeling and correct relationships, reports quickly produce wrong metrics.",
      ],
      sources: [
        { title: "Microsoft Learn – Power BI documentation", url: "https://learn.microsoft.com/power-bi/" },
        { title: "Microsoft Learn – Power BI guidance", url: "https://learn.microsoft.com/power-bi/guidance/" },
      ],
    },
  },
  "data-warehouse": {
    de: {
      misconceptions: [
        "Ein Data Warehouse ist nicht einfach eine große Datenbank; es ist für analytische Abfragen optimiert und integriert Daten aus vielen Quellen in ein konsistentes, historisiertes Modell.",
        "Viele denken, ein Data Warehouse sei für Echtzeit-Transaktionen gedacht. Es ist jedoch auf Lese- und Auswertungslast ausgelegt, nicht auf das operative Tagesgeschäft (OLTP).",
        "Ein verbreiteter Fehler ist, das Data Warehouse mit einem Data Lake zu verwechseln. Der Lake speichert Rohdaten in beliebigem Format, das Warehouse strukturierte, modellierte Daten.",
      ],
      sources: [
        { title: "Microsoft Learn – Data Warehousing (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/data-warehousing" },
        { title: "Kimball Group – Dimensional Modeling Techniques", url: "https://www.kimballgroup.com/" },
      ],
    },
    en: {
      misconceptions: [
        "A data warehouse is not just a big database; it is optimized for analytical queries and integrates data from many sources into a consistent, historized model.",
        "Many think a data warehouse is meant for real-time transactions, but it is built for read and analytical workloads, not day-to-day operational processing (OLTP).",
        "A common mistake is to confuse a data warehouse with a data lake. The lake stores raw data in any format, while the warehouse holds structured, modeled data.",
      ],
      sources: [
        { title: "Microsoft Learn – Data warehousing (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/data-warehousing" },
        { title: "Kimball Group – Dimensional Modeling Techniques", url: "https://www.kimballgroup.com/" },
      ],
    },
  },
  "data-strategy": {
    de: {
      misconceptions: [
        "Eine Datenstrategie ist kein reines IT-Projekt; sie ist eine Geschäftsentscheidung, die Ziele, Verantwortlichkeiten und Datennutzung über alle Fachbereiche hinweg festlegt.",
        "Viele glauben, mehr Daten bedeuten automatisch mehr Wert. Ohne klare Ziele, Qualität und Governance entstehen jedoch nur Kosten und kaum verwertbare Erkenntnisse.",
        "Ein verbreiteter Irrtum ist, dass man zuerst alle technischen Werkzeuge auswählt. Sinnvoller ist es, von den Geschäftsfragen auszugehen und die Technik daran auszurichten.",
      ],
      sources: [
        { title: "DAMA International – Data Management Body of Knowledge (DMBOK)", url: "https://www.dama.org/" },
        { title: "Microsoft Learn – Cloud Adoption Framework für Azure", url: "https://learn.microsoft.com/azure/cloud-adoption-framework/" },
      ],
    },
    en: {
      misconceptions: [
        "A data strategy is not purely an IT project; it is a business decision that defines goals, responsibilities and data usage across all departments.",
        "Many believe more data automatically means more value, but without clear goals, quality and governance it only creates cost and few usable insights.",
        "A common error is to pick all the technical tools first. It is better to start from the business questions and align technology to them.",
      ],
      sources: [
        { title: "DAMA International – Data Management Body of Knowledge (DMBOK)", url: "https://www.dama.org/" },
        { title: "Microsoft Learn – Cloud Adoption Framework for Azure", url: "https://learn.microsoft.com/azure/cloud-adoption-framework/" },
      ],
    },
  },
  "data-governance": {
    de: {
      misconceptions: [
        "Data Governance ist nicht nur Datenschutz oder Compliance; sie umfasst Rollen, Standards, Datenqualität und Verantwortlichkeiten für den gesamten Lebenszyklus der Daten.",
        "Viele halten Governance für ein einmaliges Projekt. Tatsächlich ist sie ein laufender Prozess, der mit Organisation und Datenlandschaft mitwachsen muss.",
        "Ein verbreiteter Irrtum ist, Governance sei allein Aufgabe der IT. Erfolgreiche Governance braucht klare fachliche Data Owner und Data Stewards im Business.",
      ],
      sources: [
        { title: "DAMA International – Data Governance (DMBOK)", url: "https://www.dama.org/" },
        { title: "Microsoft Learn – Microsoft Purview", url: "https://learn.microsoft.com/purview/" },
      ],
    },
    en: {
      misconceptions: [
        "Data governance is not just privacy or compliance; it covers roles, standards, data quality and responsibilities across the entire data lifecycle.",
        "Many treat governance as a one-off project, but it is an ongoing process that must evolve with the organization and the data landscape.",
        "A common error is to see governance as IT's job alone. Successful governance needs clear business data owners and data stewards.",
      ],
      sources: [
        { title: "DAMA International – Data Governance (DMBOK)", url: "https://www.dama.org/" },
        { title: "Microsoft Learn – Microsoft Purview", url: "https://learn.microsoft.com/purview/" },
      ],
    },
  },
  "mlops": {
    de: {
      misconceptions: [
        "MLOps ist nicht nur DevOps für Modelle; es muss zusätzlich Daten- und Modellversionierung, Drift-Überwachung und Reproduzierbarkeit von Trainingsläufen abdecken.",
        "Viele glauben, ein einmal trainiertes Modell bleibe dauerhaft gut. Modelle verlieren jedoch durch sich ändernde Daten an Qualität und müssen überwacht und neu trainiert werden.",
        "Ein verbreiteter Irrtum ist, MLOps beginne erst nach dem Deployment. Tatsächlich umfasst es den gesamten Zyklus von Datenaufbereitung über Training bis Betrieb.",
      ],
      sources: [
        { title: "Microsoft Learn – MLOps mit Azure Machine Learning", url: "https://learn.microsoft.com/azure/machine-learning/" },
        { title: "Martin Fowler – Continuous Delivery for Machine Learning (CD4ML)", url: "https://martinfowler.com/articles/cd4ml.html" },
      ],
    },
    en: {
      misconceptions: [
        "MLOps is not just DevOps for models; it must also cover data and model versioning, drift monitoring and reproducibility of training runs.",
        "Many assume a trained model stays good forever, but models degrade as data changes and must be monitored and retrained.",
        "A common error is to think MLOps starts only after deployment. In fact it spans the whole cycle from data preparation through training to operations.",
      ],
      sources: [
        { title: "Microsoft Learn – MLOps with Azure Machine Learning", url: "https://learn.microsoft.com/azure/machine-learning/" },
        { title: "Martin Fowler – Continuous Delivery for Machine Learning (CD4ML)", url: "https://martinfowler.com/articles/cd4ml.html" },
      ],
    },
  },
  "machine-learning-azure": {
    de: {
      misconceptions: [
        "Azure Machine Learning ist nicht nur ein Trainingsdienst; es bietet einen kompletten Workflow mit Pipelines, Modellregistrierung, Deployment und Monitoring.",
        "Viele glauben, man brauche keine eigene Datenaufbereitung mehr. Die Modellqualität hängt aber weiterhin stark von sauberen, gut strukturierten Trainingsdaten ab.",
        "Ein verbreiteter Irrtum ist, dass AutoML jedes Problem ohne Fachwissen löst. AutoML beschleunigt die Modellsuche, ersetzt aber kein Verständnis der Daten und Zielgrößen.",
      ],
      sources: [
        { title: "Microsoft Learn – Was ist Azure Machine Learning?", url: "https://learn.microsoft.com/azure/machine-learning/overview-what-is-azure-machine-learning" },
        { title: "Microsoft Learn – Azure Machine Learning Dokumentation", url: "https://learn.microsoft.com/azure/machine-learning/" },
      ],
    },
    en: {
      misconceptions: [
        "Azure Machine Learning is not just a training service; it provides a full workflow with pipelines, model registration, deployment and monitoring.",
        "Many believe data preparation is no longer needed, but model quality still depends heavily on clean, well-structured training data.",
        "A common error is to assume AutoML solves any problem without expertise. AutoML speeds up model search but does not replace understanding of data and targets.",
      ],
      sources: [
        { title: "Microsoft Learn – What is Azure Machine Learning?", url: "https://learn.microsoft.com/azure/machine-learning/overview-what-is-azure-machine-learning" },
        { title: "Microsoft Learn – Azure Machine Learning documentation", url: "https://learn.microsoft.com/azure/machine-learning/" },
      ],
    },
  },
  "data-modeling": {
    de: {
      misconceptions: [
        "Datenmodellierung ist nicht nur das Anlegen von Tabellen; sie definiert Entitäten, Beziehungen und Granularität und entscheidet maßgeblich über Performance und Auswertbarkeit.",
        "Viele glauben, ein einziges flaches Tabellenmodell sei am einfachsten. In der Analytik ist meist ein Sternschema mit Fakten und Dimensionen klarer und performanter.",
        "Ein verbreiteter Irrtum ist, dass Normalisierung immer das Ziel ist. Für Berichte und BI ist eine bewusste Denormalisierung oft sinnvoller als ein strikt normalisiertes Modell.",
      ],
      sources: [
        { title: "Kimball Group – Dimensionale Modellierung", url: "https://www.kimballgroup.com/" },
        { title: "Data Vault Alliance (Dan Linstedt)", url: "https://datavaultalliance.com/" },
        { title: "Microsoft Learn – Sternschema in Power BI", url: "https://learn.microsoft.com/power-bi/guidance/star-schema" },
      ],
    },
    en: {
      misconceptions: [
        "Data modeling is not just creating tables; it defines entities, relationships and granularity and largely determines performance and analytical usefulness.",
        "Many think a single flat table model is simplest, but in analytics a star schema with facts and dimensions is usually clearer and faster.",
        "A common error is to assume normalization is always the goal. For reporting and BI, deliberate denormalization is often more useful than a strictly normalized model.",
      ],
      sources: [
        { title: "Kimball Group – Dimensional modeling", url: "https://www.kimballgroup.com/" },
        { title: "Data Vault Alliance (Dan Linstedt)", url: "https://datavaultalliance.com/" },
        { title: "Microsoft Learn – Star schema in Power BI", url: "https://learn.microsoft.com/power-bi/guidance/star-schema" },
      ],
    },
  },
  "medallion-architecture": {
    de: {
      misconceptions: [
        "Die Medaillon-Architektur ist kein Produkt, sondern ein Organisationsmuster, das Daten in Bronze-, Silber- und Gold-Schichten von roh bis veredelt strukturiert.",
        "Viele glauben, die drei Schichten seien feste Vorschrift. Es ist ein Leitmuster, das je nach Anwendungsfall angepasst und nicht starr umgesetzt werden sollte.",
        "Ein verbreiteter Irrtum ist, Bronze speichere bereits bereinigte Daten. Bronze enthält bewusst die Rohdaten, erst Silber und Gold bereiten sie auf und aggregieren.",
      ],
      sources: [
        { title: "Microsoft Learn – Medallion-Lakehouse-Architektur (Azure Databricks)", url: "https://learn.microsoft.com/azure/databricks/lakehouse/medallion" },
        { title: "Databricks – Medallion Architecture", url: "https://www.databricks.com/glossary/medallion-architecture" },
      ],
    },
    en: {
      misconceptions: [
        "The medallion architecture is not a product but an organizational pattern that structures data into bronze, silver and gold layers from raw to refined.",
        "Many believe the three layers are a fixed rule. It is a guiding pattern that should be adapted to the use case rather than applied rigidly.",
        "A common error is to assume bronze already holds cleaned data. Bronze deliberately keeps raw data, while silver and gold clean and aggregate it.",
      ],
      sources: [
        { title: "Microsoft Learn – Medallion lakehouse architecture (Azure Databricks)", url: "https://learn.microsoft.com/azure/databricks/lakehouse/medallion" },
        { title: "Databricks – Medallion Architecture", url: "https://www.databricks.com/glossary/medallion-architecture" },
      ],
    },
  },
  "power-query": {
    de: {
      misconceptions: [
        "Power Query ist nicht nur ein Excel-Feature; dieselbe Engine wird in Power BI, Dataflows und Fabric für Datenaufbereitung und Transformation genutzt.",
        "Viele glauben, Transformationen müssten in M-Code geschrieben werden. Die meisten Schritte entstehen über die Oberfläche, der Code wird automatisch im Hintergrund erzeugt.",
        "Ein verbreiteter Irrtum ist, dass die Reihenfolge der Schritte egal sei. Ohne Query Folding und passende Schrittfolge leidet die Performance bei großen Datenmengen erheblich.",
      ],
      sources: [
        { title: "Microsoft Learn – Power Query Dokumentation", url: "https://learn.microsoft.com/power-query/" },
        { title: "Microsoft Learn – Power Query M Sprachreferenz", url: "https://learn.microsoft.com/powerquery-m/" },
      ],
    },
    en: {
      misconceptions: [
        "Power Query is not just an Excel feature; the same engine powers data preparation and transformation in Power BI, dataflows and Fabric.",
        "Many think transformations must be written in M code, but most steps are built through the interface and the code is generated automatically.",
        "A common error is to assume step order does not matter. Without query folding and a sensible step sequence, performance suffers heavily on large data.",
      ],
      sources: [
        { title: "Microsoft Learn – Power Query documentation", url: "https://learn.microsoft.com/power-query/" },
        { title: "Microsoft Learn – Power Query M language reference", url: "https://learn.microsoft.com/powerquery-m/" },
      ],
    },
  },
  "dax": {
    de: {
      misconceptions: [
        "DAX ist keine Variante von Excel-Formeln; es arbeitet mit Filterkontext und Beziehungen über ganze Tabellen, nicht mit einzelnen Zellen.",
        "Viele verwechseln berechnete Spalten und Measures. Spalten werden zeilenweise gespeichert, Measures hingegen erst zur Abfragezeit im jeweiligen Filterkontext berechnet.",
        "Ein verbreiteter Irrtum ist, dass das Verständnis von Zeilen- und Filterkontext optional sei. Genau dieser Kontext ist die häufigste Ursache für falsche DAX-Ergebnisse.",
      ],
      sources: [
        { title: "Microsoft Learn – DAX-Referenz", url: "https://learn.microsoft.com/dax/" },
        { title: "SQLBI – DAX-Ressourcen (Marco Russo & Alberto Ferrari)", url: "https://www.sqlbi.com/" },
      ],
    },
    en: {
      misconceptions: [
        "DAX is not a variant of Excel formulas; it works with filter context and relationships across entire tables, not individual cells.",
        "Many confuse calculated columns and measures. Columns are stored row by row, while measures are computed at query time within the current filter context.",
        "A common error is to treat understanding row and filter context as optional. That context is the most frequent cause of wrong DAX results.",
      ],
      sources: [
        { title: "Microsoft Learn – DAX reference", url: "https://learn.microsoft.com/dax/" },
        { title: "SQLBI – DAX resources (Marco Russo & Alberto Ferrari)", url: "https://www.sqlbi.com/" },
      ],
    },
  },
  "semantic-model": {
    de: {
      misconceptions: [
        "Ein Semantic Model ist nicht nur eine Datenkopie; es enthält Beziehungen, Hierarchien und Measures, die Rohdaten in eine geschäftlich verständliche Schicht überführen.",
        "Viele kennen es noch als „Dataset“ und halten beide für Verschiedenes. In Power BI wurde das frühere Dataset in Semantic Model umbenannt, es bezeichnet dasselbe Konzept.",
        "Ein verbreiteter Irrtum ist, jeder Bericht brauche ein eigenes Modell. Ein gut gepflegtes, geteiltes Semantic Model vermeidet Redundanz und widersprüchliche Kennzahlen.",
      ],
      sources: [
        { title: "Microsoft Learn – Power BI Dokumentation", url: "https://learn.microsoft.com/power-bi/" },
        { title: "Microsoft Learn – Power BI Datenmodellierung (Guidance)", url: "https://learn.microsoft.com/power-bi/guidance/" },
      ],
    },
    en: {
      misconceptions: [
        "A semantic model is not just a copy of data; it holds relationships, hierarchies and measures that turn raw data into a business-friendly layer.",
        "Many still know it as a dataset and treat the two as different. In Power BI the former dataset was renamed semantic model and refers to the same concept.",
        "A common error is to think every report needs its own model. A well-maintained, shared semantic model avoids redundancy and conflicting metrics.",
      ],
      sources: [
        { title: "Microsoft Learn – Power BI documentation", url: "https://learn.microsoft.com/power-bi/" },
        { title: "Microsoft Learn – Power BI data modeling (guidance)", url: "https://learn.microsoft.com/power-bi/guidance/" },
      ],
    },
  },
  "row-level-security": {
    de: {
      misconceptions: [
        "Row-Level Security verbirgt nur Zeilen, nicht Spalten. Sensible Felder bleiben für berechtigte Zeilen sichtbar; das Ausblenden von Spalten erfordert andere Mechanismen.",
        "Viele glauben, RLS schütze automatisch alle Zugriffswege. Die Regeln greifen im Modell, doch Export, Direktzugriff auf die Quelle oder fehlende Tests können sie umgehen.",
        "Ein verbreiteter Irrtum ist, dass RLS-Rollen nach dem Anlegen nicht getestet werden müssen. Ohne „Als Rolle anzeigen“-Tests bleiben Fehlkonfigurationen oft unbemerkt.",
      ],
      sources: [
        { title: "Microsoft Learn – Row-Level Security (RLS) in Power BI", url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls" },
        { title: "Microsoft Learn – Power BI Sicherheit (Guidance)", url: "https://learn.microsoft.com/power-bi/guidance/" },
      ],
    },
    en: {
      misconceptions: [
        "Row-level security hides only rows, not columns. Sensitive fields stay visible for permitted rows; hiding columns needs different mechanisms.",
        "Many believe RLS automatically protects every access path, but rules apply in the model while export, direct source access or missing tests can bypass them.",
        "A common error is to skip testing RLS roles after creating them. Without view-as-role testing, misconfigurations often go unnoticed.",
      ],
      sources: [
        { title: "Microsoft Learn – Row-level security (RLS) in Power BI", url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls" },
        { title: "Microsoft Learn – Power BI security (guidance)", url: "https://learn.microsoft.com/power-bi/guidance/" },
      ],
    },
  },
  "etl-elt": {
    de: {
      misconceptions: [
        "ETL und ELT unterscheiden sich nicht nur in der Reihenfolge der Buchstaben; bei ELT werden Rohdaten zuerst geladen und erst im Zielsystem transformiert, was Skalierung verändert.",
        "Viele glauben, ELT mache ETL überflüssig. Beide Ansätze haben je nach Datenmenge, Zielsystem und Governance-Anforderungen weiterhin ihre Berechtigung.",
        "Ein verbreiteter Irrtum ist, der eigentliche Aufwand liege im Laden. Tatsächlich steckt die meiste Komplexität in Transformation, Datenqualität und Fehlerbehandlung.",
      ],
      sources: [
        { title: "Microsoft Learn – Extract, Transform, Load (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/etl" },
        { title: "Microsoft Learn – Azure Data Factory", url: "https://learn.microsoft.com/azure/data-factory/" },
      ],
    },
    en: {
      misconceptions: [
        "ETL and ELT differ in more than letter order; with ELT raw data is loaded first and transformed inside the target system, which changes how it scales.",
        "Many believe ELT makes ETL obsolete, but both approaches remain valid depending on data volume, target system and governance needs.",
        "A common error is to think the real effort is in loading. Most complexity actually lies in transformation, data quality and error handling.",
      ],
      sources: [
        { title: "Microsoft Learn – Extract, transform, load (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/etl" },
        { title: "Microsoft Learn – Azure Data Factory", url: "https://learn.microsoft.com/azure/data-factory/" },
      ],
    },
  },
  "microsoft-fabric": {
    de: {
      misconceptions: [
        "Microsoft Fabric ist kein einzelnes Tool, sondern eine integrierte SaaS-Plattform, die Data Engineering, Warehousing, Data Science und Power BI zusammenführt.",
        "Viele glauben, Fabric ersetze sofort alle bestehenden Azure-Datendienste. Es bündelt und vereinfacht vieles, bestehende Architekturen lassen sich aber schrittweise integrieren.",
        "Ein verbreiteter Irrtum ist, dass OneLake mehrere Datenkopien anlegt. OneLake dient als einheitlicher, logischer Datalake, der Duplikate zwischen Workloads vermeiden soll.",
      ],
      sources: [
        { title: "Microsoft Learn – Microsoft Fabric Dokumentation", url: "https://learn.microsoft.com/fabric/" },
        { title: "Microsoft – Microsoft Fabric (Produktseite)", url: "https://www.microsoft.com/microsoft-fabric" },
      ],
    },
    en: {
      misconceptions: [
        "Microsoft Fabric is not a single tool but an integrated SaaS platform that brings together data engineering, warehousing, data science and Power BI.",
        "Many think Fabric instantly replaces all existing Azure data services. It unifies and simplifies much, but existing architectures can be integrated step by step.",
        "A common error is to assume OneLake creates multiple data copies. OneLake acts as a single, logical data lake meant to avoid duplication across workloads.",
      ],
      sources: [
        { title: "Microsoft Learn – Microsoft Fabric documentation", url: "https://learn.microsoft.com/fabric/" },
        { title: "Microsoft – Microsoft Fabric (product page)", url: "https://www.microsoft.com/microsoft-fabric" },
      ],
    },
  },
  "azure-databricks": {
    de: {
      misconceptions: [
        "Azure Databricks ist nicht nur ein gehostetes Spark; es ist eine Lakehouse-Plattform mit Delta Lake, kollaborativen Notebooks und integrierter Governance.",
        "Viele glauben, Databricks sei ausschließlich für Data Scientists. Es dient ebenso Data Engineering, ETL/ELT und Analysen über strukturierte und unstrukturierte Daten.",
        "Ein verbreiteter Irrtum ist, dass Cluster dauerhaft laufen müssen. Ohne Auto-Termination und passende Dimensionierung entstehen schnell unnötig hohe Kosten.",
      ],
      sources: [
        { title: "Microsoft Learn – Azure Databricks Dokumentation", url: "https://learn.microsoft.com/azure/databricks/" },
        { title: "Delta Lake – Offene Speicherschicht", url: "https://delta.io/" },
      ],
    },
    en: {
      misconceptions: [
        "Azure Databricks is not just hosted Spark; it is a lakehouse platform with Delta Lake, collaborative notebooks and integrated governance.",
        "Many believe Databricks is only for data scientists. It equally serves data engineering, ETL/ELT and analytics over structured and unstructured data.",
        "A common error is to assume clusters must run permanently. Without auto-termination and right-sizing, costs quickly become unnecessarily high.",
      ],
      sources: [
        { title: "Microsoft Learn – Azure Databricks documentation", url: "https://learn.microsoft.com/azure/databricks/" },
        { title: "Delta Lake – Open storage layer", url: "https://delta.io/" },
      ],
    },
  },
  "saas": {
    de: {
      misconceptions: [
        "SaaS wird oft mit jeder beliebigen Cloud-Software gleichgesetzt, obwohl es konkret ein Bereitstellungsmodell meint, bei dem der Anbieter Betrieb, Wartung und Updates der Anwendung vollständig übernimmt.",
        "Viele nehmen an, dass mit der Auslagerung an einen SaaS-Anbieter auch die gesamte Verantwortung für Datenschutz und Datensicherheit übergeht, doch im Modell der geteilten Verantwortung bleiben Zugriffssteuerung, Datenklassifizierung und Compliance Aufgabe des Kunden.",
        "SaaS gilt fälschlich als grundsätzlich günstiger, dabei können viele Einzel-Abonnements, ungenutzte Lizenzen und Integrationsaufwand die Gesamtkosten über die Zeit deutlich erhöhen.",
      ],
      sources: [
        { title: "Microsoft Azure – Was ist SaaS? (Cloud Computing Dictionary)", url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-saas/" },
        { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
      ],
    },
    en: {
      misconceptions: [
        "SaaS is often equated with any cloud software, although it specifically refers to a delivery model in which the provider fully handles operation, maintenance and updates of the application.",
        "Many assume that outsourcing to a SaaS provider also transfers all responsibility for data protection and security, but under the shared responsibility model access control, data classification and compliance remain the customer's task.",
        "SaaS is wrongly seen as inherently cheaper, yet many individual subscriptions, unused licenses and integration effort can significantly raise the total cost over time.",
      ],
      sources: [
        { title: "Microsoft Azure – What is SaaS? (Cloud Computing Dictionary)", url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-saas/" },
        { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
      ],
    },
  },
  "digital-platforms": {
    de: {
      misconceptions: [
        "Eine digitale Plattform wird häufig mit einer einfachen Website oder App verwechselt, obwohl ihr Kern darin besteht, mehrere Nutzergruppen zu verbinden und Wertschöpfung über Netzwerkeffekte zu erzeugen.",
        "Es wird oft angenommen, dass mehr Funktionen automatisch eine bessere Plattform ergeben, dabei entscheidet meist die kritische Masse an Teilnehmern und die Qualität der Vermittlung über den Erfolg.",
        "Viele unterschätzen das Henne-Ei-Problem, also dass eine Plattform für die eine Seite erst attraktiv wird, wenn genügend Teilnehmer der anderen Seite vorhanden sind.",
      ],
      sources: [
        { title: "Harvard Business Review – Pipelines, Platforms, and the New Rules of Strategy", url: "https://hbr.org/2016/04/pipelines-platforms-and-the-new-rules-of-strategy" },
        { title: "Microsoft Learn – Architektur für mandantenfähige (Multi-Tenant-)Lösungen", url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/overview" },
      ],
    },
    en: {
      misconceptions: [
        "A digital platform is often confused with a simple website or app, although its core is to connect multiple user groups and create value through network effects.",
        "It is often assumed that more features automatically make a better platform, when in fact reaching critical mass of participants and the quality of matchmaking usually determine success.",
        "Many underestimate the chicken-and-egg problem, namely that a platform only becomes attractive to one side once enough participants on the other side are present.",
      ],
      sources: [
        { title: "Harvard Business Review – Pipelines, Platforms, and the New Rules of Strategy", url: "https://hbr.org/2016/04/pipelines-platforms-and-the-new-rules-of-strategy" },
        { title: "Microsoft Learn – Architecting multitenant solutions on Azure", url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/overview" },
      ],
    },
  },
  "cloud-computing": {
    de: {
      misconceptions: [
        "Cloud Computing heißt nicht einfach „die Server stehen woanders“ — der Kern sind on-demand bereitgestellte, elastisch skalierende Ressourcen mit nutzungsbasierter Abrechnung.",
        "Public Cloud gilt fälschlich als unsicher und Private Cloud als automatisch sicherer; tatsächlich entscheidet die saubere Umsetzung (Konfiguration, Identitäten, Datenschutz) über die Sicherheit, nicht das Betriebsmodell.",
        "Hybrid Cloud ist nicht „ein bisschen Cloud und ein bisschen On-Premise“, sondern eine bewusste Verteilung von Workloads anhand von Anforderungen wie Datenschutz, Latenz und Kosten.",
      ],
      sources: [
        { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
        { title: "Microsoft Azure – Was ist Cloud Computing? (Cloud Computing Dictionary)", url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-cloud-computing/" },
      ],
    },
    en: {
      misconceptions: [
        "Cloud computing is not simply about the servers being somewhere else — at its core it is on-demand, elastically scaling resources billed by usage.",
        "Public cloud is wrongly seen as insecure and private cloud as automatically safer; in reality clean implementation (configuration, identities, data protection) decides security, not the deployment model.",
        "Hybrid cloud is not a bit of cloud and a bit of on-premise, but a deliberate placement of workloads based on requirements such as data protection, latency and cost.",
      ],
      sources: [
        { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
        { title: "Microsoft Azure – What is cloud computing? (Cloud Computing Dictionary)", url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-cloud-computing/" },
      ],
    },
  },
  "cloud-infrastructure": {
    de: {
      misconceptions: [
        "Cloud-Infrastruktur wird oft als das bloße Verschieben von Servern in ein fremdes Rechenzentrum verstanden, dabei geht es um abstrahierte, on-demand bereitgestellte Ressourcen, die elastisch skalieren und nutzungsbasiert abgerechnet werden.",
        "Es herrscht der Irrglaube, die Cloud sei automatisch günstiger, doch ohne Kostensteuerung und passende Dimensionierung führen ungenutzte oder überdimensionierte Ressourcen schnell zu höheren Ausgaben als On-Premises.",
        "Viele gehen davon aus, dass der Cloud-Anbieter für alles haftet, obwohl im Modell der geteilten Verantwortung die Absicherung von Konfiguration, Identitäten und Daten beim Kunden liegt.",
      ],
      sources: [
        { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
        { title: "Microsoft Learn – Cloud Adoption Framework für Azure", url: "https://learn.microsoft.com/azure/cloud-adoption-framework/" },
      ],
    },
    en: {
      misconceptions: [
        "Cloud infrastructure is often understood as merely moving servers into someone else's data center, when it is really about abstracted, on-demand resources that scale elastically and are billed by usage.",
        "There is a misconception that the cloud is automatically cheaper, yet without cost management and proper sizing, idle or oversized resources can quickly cost more than on-premises.",
        "Many assume the cloud provider is liable for everything, although under the shared responsibility model securing configuration, identities and data remains the customer's job.",
      ],
      sources: [
        { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
        { title: "Microsoft Learn – Cloud Adoption Framework for Azure", url: "https://learn.microsoft.com/azure/cloud-adoption-framework/" },
      ],
    },
  },
  "cloud-governance": {
    de: {
      misconceptions: [
        "Cloud Governance wird häufig auf reine Kostenkontrolle reduziert, umfasst aber ebenso Sicherheit, Compliance, Identitäts- und Ressourcenverwaltung über die gesamte Cloud-Umgebung hinweg.",
        "Es wird oft als einmaliges Projekt missverstanden, dabei ist Governance ein fortlaufender Prozess, der mit dem Wachstum der Cloud-Nutzung kontinuierlich angepasst werden muss.",
        "Viele setzen Governance mit starren Verboten gleich, doch gut umgesetzt schafft sie über Leitplanken und Automatisierung gerade mehr Handlungsspielraum für die Teams.",
      ],
      sources: [
        { title: "Microsoft Learn – Cloud Adoption Framework: Governance", url: "https://learn.microsoft.com/azure/cloud-adoption-framework/govern/" },
        { title: "Microsoft Learn – Azure Well-Architected Framework", url: "https://learn.microsoft.com/azure/well-architected/" },
      ],
    },
    en: {
      misconceptions: [
        "Cloud governance is often reduced to pure cost control, but it equally covers security, compliance, identity and resource management across the entire cloud environment.",
        "It is frequently misunderstood as a one-time project, whereas governance is an ongoing process that must be continuously adapted as cloud usage grows.",
        "Many equate governance with rigid prohibitions, yet when done well it actually creates more freedom for teams through guardrails and automation.",
      ],
      sources: [
        { title: "Microsoft Learn – Cloud Adoption Framework: Govern", url: "https://learn.microsoft.com/azure/cloud-adoption-framework/govern/" },
        { title: "Microsoft Learn – Azure Well-Architected Framework", url: "https://learn.microsoft.com/azure/well-architected/" },
      ],
    },
  },
  "sdlc": {
    de: {
      misconceptions: [
        "Der SDLC wird oft mit dem starren Wasserfallmodell gleichgesetzt, obwohl er ein allgemeines Rahmenkonzept ist, das sich auch agil oder iterativ umsetzen lässt.",
        "Viele glauben, der Lebenszyklus ende mit der Auslieferung der Software, dabei gehören Betrieb, Wartung und schließlich die Außerbetriebnahme ausdrücklich dazu.",
        "Es wird häufig angenommen, dass Tests eine eigene Phase ganz am Ende sind, während Qualitätssicherung in modernen Ansätzen über den gesamten Zyklus hinweg stattfindet.",
      ],
      sources: [
        { title: "NIST – Secure Software Development Framework (SSDF, SP 800-218)", url: "https://csrc.nist.gov/projects/ssdf" },
        { title: "OWASP SAMM – Software Assurance Maturity Model", url: "https://owaspsamm.org/" },
      ],
    },
    en: {
      misconceptions: [
        "The SDLC is often equated with the rigid waterfall model, although it is a general framework that can also be implemented in an agile or iterative way.",
        "Many believe the life cycle ends when the software is delivered, when operation, maintenance and eventual decommissioning are explicitly part of it.",
        "It is frequently assumed that testing is a single phase at the very end, whereas in modern approaches quality assurance happens throughout the whole cycle.",
      ],
      sources: [
        { title: "NIST – Secure Software Development Framework (SSDF, SP 800-218)", url: "https://csrc.nist.gov/projects/ssdf" },
        { title: "OWASP SAMM – Software Assurance Maturity Model", url: "https://owaspsamm.org/" },
      ],
    },
  },
  "multi-tenant-architecture": {
    de: {
      misconceptions: [
        "Multi-Tenancy wird oft als unsicher angesehen, weil sich mehrere Kunden eine Instanz teilen, dabei sorgen logische Isolation und Zugriffskontrollen bei korrekter Umsetzung für eine strikte Datentrennung.",
        "Es wird häufig angenommen, jeder Mandant brauche eine eigene Datenbank, doch je nach Anforderung sind auch geteilte Datenbanken mit Mandantenkennung oder hybride Modelle gängige und valide Ansätze.",
        "Viele verwechseln Multi-Tenancy mit reiner Mehrfachinstallation, obwohl der Kern darin liegt, eine gemeinsame Anwendung effizient für viele Mandanten zu betreiben.",
      ],
      sources: [
        { title: "Microsoft Learn – Architektur für mandantenfähige Lösungen auf Azure", url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/overview" },
        { title: "Microsoft Learn – Leitfaden für mandantenfähige Architekturen", url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/" },
      ],
    },
    en: {
      misconceptions: [
        "Multi-tenancy is often seen as insecure because several customers share one instance, when in fact logical isolation and access controls enforce strict data separation if implemented correctly.",
        "It is frequently assumed that every tenant needs its own database, yet depending on requirements shared databases with a tenant identifier or hybrid models are common and valid approaches.",
        "Many confuse multi-tenancy with simply running many separate installations, although its core is to operate one shared application efficiently for many tenants.",
      ],
      sources: [
        { title: "Microsoft Learn – Architecting multitenant solutions on Azure", url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/overview" },
        { title: "Microsoft Learn – Multitenant architecture guidance", url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/" },
      ],
    },
  },
  "rest-api": {
    de: {
      misconceptions: [
        "REST wird oft mit jeder beliebigen HTTP- oder JSON-Schnittstelle gleichgesetzt, dabei ist es ein Architekturstil mit konkreten Prinzipien wie Zustandslosigkeit, einheitlicher Schnittstelle und ressourcenorientiertem Design.",
        "Viele glauben, REST schreibe zwingend JSON vor, obwohl der Stil formatunabhängig ist und Repräsentationen ebenso als XML oder andere Medientypen ausgeliefert werden können.",
        "Es wird häufig angenommen, die HTTP-Methoden seien beliebig austauschbar, dabei haben GET, POST, PUT und DELETE klar definierte Bedeutungen, und GET sollte stets sicher und ohne Seiteneffekte sein.",
      ],
      sources: [
        { title: "Roy T. Fielding – Architectural Styles (REST, Kapitel 5)", url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" },
        { title: "Microsoft Learn – Best Practices für den Entwurf von Web-APIs", url: "https://learn.microsoft.com/azure/architecture/best-practices/api-design" },
        { title: "IETF RFC 9110 – HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
      ],
    },
    en: {
      misconceptions: [
        "REST is often equated with any HTTP or JSON interface, when it is actually an architectural style with concrete principles such as statelessness, a uniform interface and resource-oriented design.",
        "Many believe REST mandates JSON, although the style is format-agnostic and representations can equally be delivered as XML or other media types.",
        "It is frequently assumed that HTTP methods are interchangeable, whereas GET, POST, PUT and DELETE have clearly defined meanings, and GET should always be safe and free of side effects.",
      ],
      sources: [
        { title: "Roy T. Fielding – Architectural Styles (REST, chapter 5)", url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" },
        { title: "Microsoft Learn – Web API design best practices", url: "https://learn.microsoft.com/azure/architecture/best-practices/api-design" },
        { title: "IETF RFC 9110 – HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
      ],
    },
  },
  "mvp": {
    de: {
      misconceptions: [
        "Ein MVP wird oft als unfertiges oder minderwertiges Produkt missverstanden, dabei soll es eine funktionsfähige Version mit echtem Nutzerwert sein, die gezielt eine Annahme überprüft.",
        "Viele setzen das MVP mit der ersten Release-Version gleich, obwohl sein eigentlicher Zweck darin besteht, mit minimalem Aufwand maximales Lernen über den Markt zu erzielen.",
        "Es wird häufig angenommen, ein MVP enthalte möglichst viele Funktionen in reduzierter Qualität, dabei geht es vielmehr um wenige Funktionen, die den Kernnutzen sauber abbilden.",
      ],
      sources: [
        { title: "The Lean Startup (Eric Ries)", url: "https://theleanstartup.com/" },
        { title: "Agile Alliance – Minimum Viable Product (MVP)", url: "https://www.agilealliance.org/glossary/mvp/" },
      ],
    },
    en: {
      misconceptions: [
        "An MVP is often misunderstood as an unfinished or low-quality product, when it should be a working version with real user value that deliberately tests an assumption.",
        "Many equate the MVP with the first release version, although its actual purpose is to achieve maximum learning about the market with minimal effort.",
        "It is frequently assumed that an MVP packs in as many features as possible at reduced quality, whereas it is really about a few features that cleanly deliver the core value.",
      ],
      sources: [
        { title: "The Lean Startup (Eric Ries)", url: "https://theleanstartup.com/" },
        { title: "Agile Alliance – Minimum Viable Product (MVP)", url: "https://www.agilealliance.org/glossary/mvp/" },
      ],
    },
  },
  "process-automation": {
    de: {
      misconceptions: [
        "Prozessautomatisierung wird oft mit reiner Werkzeugeinführung verwechselt — ein ineffizienter Prozess wird durch Automatisierung nur schneller fehlerhaft, statt dass er vorher analysiert und optimiert wird.",
        "Viele glauben, RPA und echte Prozessautomatisierung seien dasselbe; RPA imitiert jedoch nur Benutzeraktionen an der Oberfläche und ersetzt keine saubere Integration über APIs oder Schnittstellen.",
        "Es wird unterschätzt, dass automatisierte Prozesse laufende Pflege brauchen — ändert sich eine Quellanwendung oder Maske, brechen viele Automatisierungen ohne Wartung schnell.",
      ],
      sources: [
        { title: "Object Management Group – Business Process Model and Notation (BPMN)", url: "https://www.bpmn.org/" },
        { title: "Microsoft Learn – Power Automate", url: "https://learn.microsoft.com/power-automate/" },
      ],
    },
    en: {
      misconceptions: [
        "Process automation is often mistaken for simply rolling out a tool — an inefficient process only fails faster once automated unless it is analyzed and improved first.",
        "Many assume RPA and true process automation are the same; RPA merely mimics user actions on the surface and does not replace proper integration via APIs or interfaces.",
        "People underestimate that automated processes need ongoing maintenance — if a source application or screen changes, many automations break quickly without upkeep.",
      ],
      sources: [
        { title: "Object Management Group – Business Process Model and Notation (BPMN)", url: "https://www.bpmn.org/" },
        { title: "Microsoft Learn – Power Automate", url: "https://learn.microsoft.com/power-automate/" },
      ],
    },
  },
  "devops": {
    de: {
      misconceptions: [
        "DevOps wird häufig als reine Toolkette (Pipelines, Container) missverstanden — tatsächlich ist es vor allem eine Kultur- und Organisationsfrage, die Entwicklung und Betrieb enger zusammenbringt.",
        "Viele denken, DevOps bedeute, ein eigenes DevOps-Team zu gründen; das schafft jedoch oft ein neues Silo statt die Zusammenarbeit zwischen den bestehenden Teams zu verbessern.",
        "Es wird angenommen, DevOps gehe nur um Geschwindigkeit; ohne Automatisierung von Tests und Qualitätssicherung führt schnelleres Deployment aber lediglich zu schnelleren Fehlern.",
      ],
      sources: [
        { title: "DORA – DevOps Research and Assessment", url: "https://dora.dev/" },
        { title: "Microsoft Learn – DevOps-Ressourcen", url: "https://learn.microsoft.com/devops/" },
      ],
    },
    en: {
      misconceptions: [
        "DevOps is often misunderstood as just a tool chain (pipelines, containers) — in reality it is primarily a cultural and organizational practice that brings development and operations closer together.",
        "Many believe DevOps means creating a dedicated DevOps team; this often creates a new silo instead of improving collaboration between existing teams.",
        "People assume DevOps is only about speed; without automated testing and quality assurance, faster deployments simply produce faster failures.",
      ],
      sources: [
        { title: "DORA – DevOps Research and Assessment", url: "https://dora.dev/" },
        { title: "Microsoft Learn – DevOps resource center", url: "https://learn.microsoft.com/devops/" },
      ],
    },
  },
  "it-security": {
    de: {
      misconceptions: [
        "IT-Sicherheit wird oft auf Technik wie Firewalls und Virenscanner reduziert — der Mensch bleibt jedoch durch Phishing und Social Engineering eines der größten Einfallstore.",
        "Viele glauben, ein einmal abgesichertes System sei dauerhaft sicher; Sicherheit ist aber ein fortlaufender Prozess aus Updates, Monitoring und Anpassung an neue Bedrohungen.",
        "Es herrscht der Irrglaube, kleine und mittlere Unternehmen seien für Angreifer uninteressant; gerade automatisierte Angriffe treffen Mittelständler ohne starke Schutzmaßnahmen besonders häufig.",
      ],
      sources: [
        { title: "BSI – Bundesamt für Sicherheit in der Informationstechnik", url: "https://www.bsi.bund.de/" },
        { title: "NIST – Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
        { title: "OWASP Foundation", url: "https://owasp.org/" },
      ],
    },
    en: {
      misconceptions: [
        "IT security is often reduced to technology such as firewalls and antivirus — yet people remain one of the biggest entry points through phishing and social engineering.",
        "Many believe a system secured once stays secure forever; in reality security is a continuous process of updates, monitoring and adapting to new threats.",
        "There is a misconception that small and mid-sized companies are not worth attacking; automated attacks in particular frequently hit mid-sized businesses that lack strong protection.",
      ],
      sources: [
        { title: "NIST – Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
        { title: "BSI – German Federal Office for Information Security", url: "https://www.bsi.bund.de/" },
        { title: "OWASP Foundation", url: "https://owasp.org/" },
      ],
    },
  },
  "gdpr": {
    de: {
      misconceptions: [
        "Die DSGVO wird oft als reine Cookie-Banner-Pflicht wahrgenommen — sie regelt jedoch die gesamte Verarbeitung personenbezogener Daten, von der Erhebung bis zur Löschung.",
        "Viele meinen, die Nutzung einer Cloud außerhalb der EU sei automatisch unzulässig; entscheidend sind aber geeignete Garantien wie Standardvertragsklauseln und ein angemessenes Schutzniveau.",
        "Es wird angenommen, Datenschutz sei allein Sache der IT-Abteilung; tatsächlich betrifft er Prozesse, Verträge und Verantwortlichkeiten im gesamten Unternehmen.",
      ],
      sources: [
        { title: "Europäischer Datenschutzausschuss (EDPB)", url: "https://www.edpb.europa.eu/" },
        { title: "DSGVO – Gesetzestext (dsgvo-gesetz.de)", url: "https://dsgvo-gesetz.de/" },
        { title: "BfDI – Bundesbeauftragte für den Datenschutz", url: "https://www.bfdi.bund.de/" },
      ],
    },
    en: {
      misconceptions: [
        "The GDPR is often perceived as merely a cookie-banner obligation — yet it governs the entire processing of personal data, from collection to deletion.",
        "Many think using a cloud outside the EU is automatically unlawful; what matters are appropriate safeguards such as standard contractual clauses and an adequate level of protection.",
        "People assume data protection is solely the IT department's job; in reality it affects processes, contracts and responsibilities across the whole organization.",
      ],
      sources: [
        { title: "European Data Protection Board (EDPB)", url: "https://www.edpb.europa.eu/" },
        { title: "GDPR – full legal text (gdpr-info.eu)", url: "https://gdpr-info.eu/" },
        { title: "BfDI – German Federal Commissioner for Data Protection", url: "https://www.bfdi.bund.de/" },
      ],
    },
  },
  "power-automate": {
    de: {
      misconceptions: [
        "Power Automate wird oft mit klassischer RPA gleichgesetzt; sein Kern sind jedoch Cloud-Flows über Connectoren und APIs, während die Desktop-Automatisierung nur ein Teilbereich ist.",
        "Viele glauben, es brauche keinerlei Programmierkenntnisse — für robuste Flows sind aber Verständnis von Logik, Fehlerbehandlung und Datenstrukturen entscheidend.",
        "Es wird unterschätzt, dass Lizenzierung und Premium-Connectoren Kosten verursachen; nicht jeder Connector ist in der Basislizenz enthalten.",
      ],
      sources: [
        { title: "Microsoft Learn – Power Automate Dokumentation", url: "https://learn.microsoft.com/power-automate/" },
        { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
      ],
    },
    en: {
      misconceptions: [
        "Power Automate is often equated with classic RPA; its core, however, is cloud flows via connectors and APIs, while desktop automation is only one part of it.",
        "Many believe no programming knowledge is needed — yet building robust flows requires understanding of logic, error handling and data structures.",
        "People underestimate that licensing and premium connectors incur costs; not every connector is included in the base license.",
      ],
      sources: [
        { title: "Microsoft Learn – Power Automate documentation", url: "https://learn.microsoft.com/power-automate/" },
        { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
      ],
    },
  },
  "ai-builder": {
    de: {
      misconceptions: [
        "AI Builder wird oft als Ersatz für eigene Data-Science-Projekte gesehen; es bietet jedoch vorgefertigte und einfach trainierbare Modelle für klar umrissene Aufgaben, keine beliebige Custom-KI.",
        "Viele erwarten von der Dokumentenextraktion fehlerfreie Ergebnisse; gerade bei schlechter Scan-Qualität oder ungewohnten Layouts bleibt eine Validierung der erkannten Daten nötig.",
        "Es wird übersehen, dass AI Builder kostenpflichtige Credits verbraucht und an die Power-Platform-Lizenzierung gebunden ist.",
      ],
      sources: [
        { title: "Microsoft Learn – AI Builder Dokumentation", url: "https://learn.microsoft.com/ai-builder/" },
        { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
      ],
    },
    en: {
      misconceptions: [
        "AI Builder is often seen as a replacement for custom data-science projects; in fact it offers prebuilt and easily trainable models for well-defined tasks, not arbitrary custom AI.",
        "Many expect document extraction to be error-free; especially with poor scan quality or unusual layouts, the recognized data still needs validation.",
        "People overlook that AI Builder consumes paid credits and is tied to Power Platform licensing.",
      ],
      sources: [
        { title: "Microsoft Learn – AI Builder documentation", url: "https://learn.microsoft.com/ai-builder/" },
        { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
      ],
    },
  },
  "master-data-management": {
    de: {
      misconceptions: [
        "Stammdatenmanagement wird oft mit einem einmaligen Datenbereinigungsprojekt verwechselt; tatsächlich ist es eine dauerhafte Disziplin mit klaren Verantwortlichkeiten und Governance.",
        "Viele glauben, ein zentrales System löse das Problem von allein; ohne definierte Pflegeprozesse und Datenqualitätsregeln entstehen schnell wieder Dubletten und Widersprüche.",
        "Es wird unterschätzt, dass Stammdaten ein fachliches Thema sind und nicht allein von der IT verantwortet werden können — die Fachbereiche müssen Datenhoheit übernehmen.",
      ],
      sources: [
        { title: "DAMA International – Master Data Management (DMBOK)", url: "https://www.dama.org/" },
        { title: "Microsoft Learn – SQL Server Master Data Services (MDS)", url: "https://learn.microsoft.com/sql/master-data-services/" },
      ],
    },
    en: {
      misconceptions: [
        "Master data management is often mistaken for a one-off data-cleansing project; in reality it is an ongoing discipline with clear ownership and governance.",
        "Many believe a central system solves the problem by itself; without defined maintenance processes and data-quality rules, duplicates and inconsistencies quickly return.",
        "People underestimate that master data is a business topic and cannot be owned by IT alone — business units must take responsibility for their data.",
      ],
      sources: [
        { title: "DAMA International – Master Data Management (DMBOK)", url: "https://www.dama.org/" },
        { title: "Microsoft Learn – SQL Server Master Data Services (MDS)", url: "https://learn.microsoft.com/sql/master-data-services/" },
      ],
    },
  },
  "ci-cd": {
    de: {
      misconceptions: [
        "CI und CD werden oft in einen Topf geworfen; Continuous Integration meint das häufige Zusammenführen und automatisierte Testen von Code, während Continuous Delivery bzw. Deployment die Auslieferung betrifft.",
        "Viele glauben, eine Pipeline allein bedeute schon Continuous Integration; ohne aussagekräftige automatisierte Tests ist es nur ein automatisierter Build ohne echte Qualitätssicherung.",
        "Es wird angenommen, Continuous Deployment passe für jedes Team; ohne ausgereifte Tests, Monitoring und Rollback-Strategien ist automatisches Ausspielen in Produktion riskant.",
      ],
      sources: [
        { title: "Martin Fowler – Continuous Integration", url: "https://martinfowler.com/articles/continuousIntegration.html" },
        { title: "Microsoft Learn – Azure Pipelines", url: "https://learn.microsoft.com/azure/devops/pipelines/" },
      ],
    },
    en: {
      misconceptions: [
        "CI and CD are often lumped together; continuous integration means frequently merging and automatically testing code, while continuous delivery or deployment concerns releasing it.",
        "Many believe having a pipeline already means continuous integration; without meaningful automated tests it is just an automated build with no real quality assurance.",
        "People assume continuous deployment fits every team; without mature tests, monitoring and rollback strategies, automatically shipping to production is risky.",
      ],
      sources: [
        { title: "Martin Fowler – Continuous Integration", url: "https://martinfowler.com/articles/continuousIntegration.html" },
        { title: "Microsoft Learn – Azure Pipelines", url: "https://learn.microsoft.com/azure/devops/pipelines/" },
      ],
    },
  },
  "iac": {
    de: {
      misconceptions: [
        "Infrastructure as Code wird oft auf Skripte reduziert; entscheidend ist aber der deklarative, versionierte und reproduzierbare Ansatz statt manueller, einmaliger Befehle.",
        "Viele glauben, einmal geschriebener IaC-Code bleibe dauerhaft korrekt; durch manuelle Änderungen an der Infrastruktur entsteht jedoch schnell ein Configuration Drift zwischen Code und Realität.",
        "Es wird unterschätzt, dass IaC-Definitionen wie Anwendungscode behandelt werden müssen — mit Reviews, Tests und einer sicheren Verwaltung von Secrets.",
      ],
      sources: [
        { title: "Martin Fowler – Infrastructure as Code", url: "https://martinfowler.com/bliki/InfrastructureAsCode.html" },
        { title: "Microsoft Learn – Was ist Infrastructure as Code?", url: "https://learn.microsoft.com/devops/deliver/what-is-infrastructure-as-code" },
      ],
    },
    en: {
      misconceptions: [
        "Infrastructure as Code is often reduced to scripts; what matters is the declarative, versioned and reproducible approach rather than manual one-off commands.",
        "Many believe IaC code written once stays correct forever; manual changes to the infrastructure quickly cause configuration drift between code and reality.",
        "People underestimate that IaC definitions must be treated like application code — with reviews, tests and secure handling of secrets.",
      ],
      sources: [
        { title: "Martin Fowler – Infrastructure as Code", url: "https://martinfowler.com/bliki/InfrastructureAsCode.html" },
        { title: "Microsoft Learn – What is Infrastructure as Code?", url: "https://learn.microsoft.com/devops/deliver/what-is-infrastructure-as-code" },
      ],
    },
  },
  "iam-keycloak": {
    de: {
      misconceptions: [
        "Identity and Access Management wird oft mit reiner Benutzerverwaltung gleichgesetzt; es umfasst aber auch Authentifizierung, Autorisierung, Rollen und den gesamten Lebenszyklus von Identitäten.",
        "Viele glauben, Keycloak sei nach der Installation ohne Pflege betriebsbereit; in der Produktion brauchen Updates, Hochverfügbarkeit und sichere Konfiguration laufende Aufmerksamkeit.",
        "Es herrscht der Irrglaube, eine eigene Login-Lösung selbst zu bauen sei einfacher als ein etablierter Identity-Provider — dabei sind Standards wie OpenID Connect und OAuth2 sicherheitskritisch und fehleranfällig.",
      ],
      sources: [
        { title: "Keycloak – Offizielle Dokumentation", url: "https://www.keycloak.org/documentation" },
        { title: "OpenID Connect Core 1.0 (OpenID Foundation)", url: "https://openid.net/specs/openid-connect-core-1_0.html" },
        { title: "IETF RFC 6749 – The OAuth 2.0 Authorization Framework", url: "https://www.rfc-editor.org/rfc/rfc6749" },
      ],
    },
    en: {
      misconceptions: [
        "Identity and access management is often equated with mere user administration; it also covers authentication, authorization, roles and the entire identity lifecycle.",
        "Many believe Keycloak is ready to run without maintenance after installation; in production, updates, high availability and secure configuration require ongoing attention.",
        "There is a misconception that building your own login solution is easier than using an established identity provider — yet standards like OpenID Connect and OAuth2 are security-critical and error-prone.",
      ],
      sources: [
        { title: "Keycloak – Official documentation", url: "https://www.keycloak.org/documentation" },
        { title: "OpenID Connect Core 1.0 (OpenID Foundation)", url: "https://openid.net/specs/openid-connect-core-1_0.html" },
        { title: "IETF RFC 6749 – The OAuth 2.0 Authorization Framework", url: "https://www.rfc-editor.org/rfc/rfc6749" },
      ],
    },
  },
  "mfa-2fa": {
    de: {
      misconceptions: [
        "MFA und 2FA werden oft als dasselbe gesehen; 2FA ist genau genommen ein Spezialfall der MFA mit genau zwei Faktoren, während MFA zwei oder mehr Faktoren umfasst.",
        "Viele halten SMS-Codes für sicher; sie sind jedoch anfällig für SIM-Swapping und Abfangen und gelten als schwächster MFA-Faktor gegenüber App- oder Hardware-Token.",
        "Es herrscht der Irrglaube, MFA mache Phishing unmöglich; moderne Angriffe umgehen sie über MFA-Fatigue oder Echtzeit-Phishing-Proxys, weshalb phishingresistente Verfahren wichtig sind.",
      ],
      sources: [
        { title: "NIST SP 800-63B – Digital Identity Guidelines (Authentication)", url: "https://pages.nist.gov/800-63-3/sp800-63b.html" },
        { title: "BSI – Zwei-Faktor-Authentisierung", url: "https://www.bsi.bund.de/" },
      ],
    },
    en: {
      misconceptions: [
        "MFA and 2FA are often treated as the same; strictly speaking 2FA is a special case of MFA using exactly two factors, while MFA covers two or more.",
        "Many consider SMS codes secure; however, they are vulnerable to SIM swapping and interception and are regarded as the weakest MFA factor compared to app or hardware tokens.",
        "There is a misconception that MFA makes phishing impossible; modern attacks bypass it via MFA fatigue or real-time phishing proxies, which is why phishing-resistant methods matter.",
      ],
      sources: [
        { title: "NIST SP 800-63B – Digital Identity Guidelines (Authentication)", url: "https://pages.nist.gov/800-63-3/sp800-63b.html" },
        { title: "BSI – German Federal Office for Information Security", url: "https://www.bsi.bund.de/" },
      ],
    },
  },
  "networking-security": {
    de: {
      misconceptions: [
        "Netzwerksicherheit wird oft auf eine Perimeter-Firewall reduziert; moderne Bedrohungen erfordern jedoch Segmentierung und Schutz auch innerhalb des Netzwerks.",
        "Viele glauben, interner Netzwerkverkehr sei automatisch vertrauenswürdig — das Zero-Trust-Modell geht hingegen davon aus, dass keinem Standort oder Gerät pauschal vertraut werden darf.",
        "Es wird angenommen, ein VPN oder eine Verschlüsselung allein genüge; ohne konsequente Authentifizierung, Monitoring und Rechtevergabe bleiben gravierende Lücken bestehen.",
      ],
      sources: [
        { title: "Microsoft Learn – Zero-Trust-Sicherheitsmodell", url: "https://learn.microsoft.com/security/zero-trust/" },
        { title: "NIST SP 800-207 – Zero Trust Architecture", url: "https://csrc.nist.gov/pubs/sp/800/207/final" },
      ],
    },
    en: {
      misconceptions: [
        "Network security is often reduced to a perimeter firewall; modern threats, however, require segmentation and protection inside the network as well.",
        "Many believe internal network traffic is automatically trustworthy — the zero trust model instead assumes that no location or device should be trusted by default.",
        "People assume a VPN or encryption alone is enough; without consistent authentication, monitoring and access control, serious gaps remain.",
      ],
      sources: [
        { title: "Microsoft Learn – Zero Trust security model", url: "https://learn.microsoft.com/security/zero-trust/" },
        { title: "NIST SP 800-207 – Zero Trust Architecture", url: "https://csrc.nist.gov/pubs/sp/800/207/final" },
      ],
    },
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Slugs of terms that have a full detail page. Used by routes + sitemap. */
export const glossaryTermSlugs = Object.keys(glossaryTerms)

export function getGlossaryTerm(slug: string, lang: Locale): GlossaryTermContent | undefined {
  const base = glossaryTerms[slug]?.[lang]
  if (!base) return undefined
  const extra = glossaryExtras[slug]?.[lang]
  if (!extra) return base
  return { ...base, misconceptions: extra.misconceptions, sources: extra.sources }
}

export function hasGlossaryPage(slug: string): boolean {
  return slug in glossaryTerms
}

/** Short definition of a term, used e.g. for in-text link tooltips. */
export function getGlossaryShortDefinition(slug: string, lang: Locale): string | undefined {
  return glossaryTerms[slug]?.[lang]?.shortDefinition
}

/** Synonyms of a term, used e.g. to widen glossary search. */
export function getGlossaryTermSynonyms(slug: string, lang: Locale): string[] {
  return glossaryTerms[slug]?.[lang]?.synonyms ?? []
}

/** Catalog entries for one cluster, in catalog order. */
export function listGlossaryCatalogByCluster(cluster: GlossaryCluster): GlossaryCatalogEntry[] {
  return glossaryCatalog.filter((entry) => entry.cluster === cluster)
}

/** Related catalog entries from the same cluster, excluding the given slug. */
export function listRelatedGlossaryTerms(slug: string, cluster: GlossaryCluster): GlossaryCatalogEntry[] {
  return glossaryCatalog.filter((entry) => entry.cluster === cluster && entry.slug !== slug)
}

export type GlossaryMatcher = { slug: string; text: string }

/**
 * Phrases (term name + synonyms) that should auto-link to a glossary term in
 * body copy. Sorted longest-first so the most specific phrase wins; ambiguous
 * duplicates and overly generic words are dropped.
 */
export function getGlossaryMatchers(lang: Locale): GlossaryMatcher[] {
  const deny = new Set(["daten", "data", "software", "code", "api", "modell", "model"])
  const seen = new Set<string>()
  const out: GlossaryMatcher[] = []
  for (const slug of Object.keys(glossaryTerms)) {
    const t = glossaryTerms[slug][lang]
    const base = t.term.replace(/\s*\([^)]*\)/g, "").trim() // strip parenthetical
    // Split conjunctive names ("A & B", "A / B") into standalone phrases so the
    // common short form is matchable too (e.g. "Data Warehouse", "ETL", "ELT").
    const fragments = base
      .split(/\s+[&/]\s+/)
      .map((f) => f.replace(/^[^\p{L}\p{N}]+/u, "").trim())
    for (const candidate of [base, ...fragments, ...t.synonyms]) {
      const text = candidate.trim()
      const key = text.toLowerCase()
      if (text.length < 2) continue
      if (deny.has(key)) continue
      if (seen.has(key)) continue // first term wins an ambiguous phrase
      seen.add(key)
      out.push({ slug, text })
    }
  }
  return out.sort((a, b) => b.text.length - a.text.length)
}

/** Catalog entries whose full term links to the given case study (pillars first). */
export function listGlossaryCatalogForCaseStudy(caseStudySlug: string): GlossaryCatalogEntry[] {
  const slugs = new Set(
    Object.keys(glossaryTerms).filter(
      (s) => glossaryTerms[s].de.relatedCaseStudySlug === caseStudySlug,
    ),
  )
  return glossaryCatalog
    .filter((entry) => slugs.has(entry.slug))
    .sort((a, b) => (a.role === b.role ? 0 : a.role === "pillar" ? -1 : 1))
}

// ---------------------------------------------------------------------------
// UI strings
// ---------------------------------------------------------------------------

type GlossaryUi = {
  eyebrow: string
  indexTitleLead: string
  indexTitleHighlight: string
  indexSubtitle: string
  breadcrumbLabel: string
  backToOverview: string
  definitionHeading: string
  onThisRoadmap: string
  pillarLabel: string
  subLabel: string
  comingSoon: string
  readTerm: string
  relatedServiceLabel: string
  relatedCaseStudyLabel: string
  relatedTermsHeading: string
  misconceptionsHeading: string
  sourcesHeading: string
  faqHeading: string
  synonymsLabel: string
  updatedLabel: string
  ctaHeading: string
  ctaSubtitle: string
  ctaButton: string
}

const glossaryUi: Record<Locale, GlossaryUi> = {
  de: {
    eyebrow: "Glossar",
    indexTitleLead: "Glossar: Fachbegriffe, die wir nicht nur erklären,",
    indexTitleHighlight: "sondern umsetzen",
    indexSubtitle:
      "Unser Glossar erklärt die zentralen Begriffe rund um Datenanalyse, digitale Plattformen, Automatisierung und Cloud – fachlich fundiert und mit Bezug zu echten Projekten.",
    breadcrumbLabel: "Glossar",
    backToOverview: "Zurück zum Glossar",
    definitionHeading: "Definition",
    onThisRoadmap: "Begriffe in diesem Bereich",
    pillarLabel: "Schwerpunktthema",
    subLabel: "Detailbegriff",
    comingSoon: "in Vorbereitung",
    readTerm: "Begriff lesen",
    relatedServiceLabel: "Passende Leistung",
    relatedCaseStudyLabel: "Passende Case Study",
    relatedTermsHeading: "Verwandte Begriffe",
    misconceptionsHeading: "Häufige Fehler & Missverständnisse",
    sourcesHeading: "Quellen & weiterführende Links",
    faqHeading: "Häufige Fragen",
    synonymsLabel: "Auch bekannt als",
    updatedLabel: "Aktualisiert am",
    ctaHeading: "Sie möchten dieses Thema in Ihrem Unternehmen umsetzen?",
    ctaSubtitle: "Erzählen Sie uns von Ihrer Herausforderung — wir zeigen Ihnen, was technisch möglich ist.",
    ctaButton: "Kontaktieren Sie uns",
  },
  en: {
    eyebrow: "Glossary",
    indexTitleLead: "Glossary: terms we don't just explain,",
    indexTitleHighlight: "we deliver them",
    indexSubtitle:
      "Our glossary explains the key terms around data analytics, digital platforms, automation and cloud — grounded in expertise and tied to real projects.",
    breadcrumbLabel: "Glossary",
    backToOverview: "Back to the glossary",
    definitionHeading: "Definition",
    onThisRoadmap: "Terms in this area",
    pillarLabel: "Pillar topic",
    subLabel: "Detail term",
    comingSoon: "coming soon",
    readTerm: "Read term",
    relatedServiceLabel: "Related service",
    relatedCaseStudyLabel: "Related case study",
    relatedTermsHeading: "Related terms",
    misconceptionsHeading: "Common mistakes & misconceptions",
    sourcesHeading: "Sources & further reading",
    faqHeading: "Frequently asked questions",
    synonymsLabel: "Also known as",
    updatedLabel: "Updated",
    ctaHeading: "Want to put this topic to work in your company?",
    ctaSubtitle: "Tell us about your challenge — we'll show you what's technically possible.",
    ctaButton: "Get in touch",
  },
}

export function getGlossaryUi(lang: Locale): GlossaryUi {
  return glossaryUi[lang]
}
