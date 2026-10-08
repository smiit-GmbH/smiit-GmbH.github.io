import type { GlossaryCatalogEntry } from "@/lib/glossary"

/**
 * The full glossary roadmap (overview page + DefinedTermSet JSON-LD), in display
 * order. Entries with `hasPage: true` have a detail entry in this folder.
 */
const glossaryCatalog: GlossaryCatalogEntry[] = [
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

export default glossaryCatalog
