import type { Locale } from "@/lib/dictionary"

/**
 * Blog content layer — mirrors the structure of `lib/case-studies.ts` and
 * `lib/glossary.ts`. Posts are stored as a typed, dictionary-style structure
 * (one entry per slug with a `de` and `en` variant). Add a post by appending an
 * entry to `blogPosts`; the route + sitemap pick it up automatically via
 * `blogPostSlugs`. A post is only rendered for a locale if a variant exists for
 * it, so a German-only post does not 404 the English route — it simply does not
 * appear under `/en/blog`.
 *
 * Body copy is block-based so long-form articles can mix headings, prose,
 * bullet lists and code/flow blocks. Inline citations live in `sources` (not in
 * the prose) to keep paragraphs clean and the references in one place.
 * Paragraphs and bullets support `**bold**` spans (emphasis / lead-ins) and
 * backtick `code` spans, which are excluded from glossary auto-linking.
 */

export type BlogCategory = "analytics" | "apps" | "strategy"

export type BlogBlock =
  | { type: "heading"; text: string } // renders as <h2>
  | { type: "subheading"; text: string } // renders as <h3>
  /** `refs` are 1-based indices into `sources`, rendered as superscript citations. */
  | { type: "paragraph"; text: string; refs?: number[] }
  /** `itemRefs` maps an item index to its citations (1-based indices into `sources`). */
  | { type: "bullets"; items: string[]; itemRefs?: Record<number, number[]> }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; content: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string; maxWidth?: number }
  | { type: "maturity"; items: { level: number; label: string }[] }
  | { type: "grid"; items: { title: string; description: string }[] }
  | { type: "numbered"; items: { title: string; description: string }[] }
  | { type: "filetree"; nodes: FileTreeNode[] }
  | { type: "flow"; steps: string[] }
  /** Connected flow diagram: nodes joined by arrows, each with an optional list of branch items. */
  | { type: "diagram"; steps: { label: string; items?: string[] }[] }
  | { type: "repo"; name: string; description: string; url: string }

export type FileTreeNode =
  | { type: "folder"; name: string; note?: string; defaultOpen?: boolean; children: FileTreeNode[] }
  | { type: "file"; name: string }

export type BlogSource = { title: string; url?: string }
export type BlogFaqItem = { question: string; answer: string }

export type BlogImage = { url: string; width: number; height: number; alt: string }

export type BlogPostContent = {
  /** Stable, language-agnostic URL slug. */
  slug: string
  category: BlogCategory
  /** ISO date used for BlogPosting JSON-LD + sitemap lastmod. */
  datePublished: string
  dateModified: string
  author: string
  /** H1. */
  title: string
  /** Optional shorter title used in breadcrumbs; falls back to `title`. */
  shortTitle?: string
  /** Lead / summary shown on the index card and used as the meta description fallback. */
  excerpt: string
  heroImage?: BlogImage
  ogImage?: BlogImage
  /** Teaser image shown on the blog index/timeline. Falls back to an accent panel. */
  coverImage?: BlogImage
  blocks: BlogBlock[]
  faq?: BlogFaqItem[]
  sources?: BlogSource[]
  /** Path of the related service page, e.g. "services/analytics". */
  relatedServicePath: string
  /** Slug of a related case study (see lib/case-studies.ts), if any. */
  relatedCaseStudySlug?: string
  keywords: string[]
  metaTitle: string
  metaDescription: string
}

type LocalizedBlogPost = Partial<Record<Locale, BlogPostContent>>

// ---------------------------------------------------------------------------
// Category metadata (label + accent color + related service)
// ---------------------------------------------------------------------------

export const blogCategoryMeta: Record<
  BlogCategory,
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

// ---------------------------------------------------------------------------
// Post: MLOps mit Microsoft Azure
// ---------------------------------------------------------------------------

const mlopsAzure: LocalizedBlogPost = {
  de: {
    slug: "mlops-with-microsoft-azure",
    category: "analytics",
    datePublished: "2026-05-28",
    dateModified: "2026-05-28",
    author: "Sebastian Grab",
    title:
      "MLOps mit Microsoft Azure: Machine-Learning-Modelle sicher, standardisiert und skalierbar betreiben",
    shortTitle: "MLOps mit Microsoft Azure",
    excerpt:
      "Ein gutes Modell zu trainieren ist nur der Anfang. Wie Unternehmen ML-Modelle mit Microsoft Azure wirklich produktionsreif betreiben – von der Zielarchitektur über CI/CD, Infrastructure as Code und Model Registry bis zu Monitoring und Governance.",
    ogImage: {
      url: "/og/blog-mlops.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – MLOps mit Microsoft Azure",
    },
    coverImage: {
      url: "/assets/blog/mlops/mlops.webp",
      width: 2509,
      height: 944,
      alt: "MLOps als Zusammenspiel von ML, Dev und Ops",
    },

    blocks: [
      { type: "heading", text: "Warum Machine Learning ohne MLOps oft nicht produktionsreif wird" },
      {
        type: "paragraph",
        text: "Viele Machine-Learning-Projekte starten mit einem vielversprechenden Prototyp: Ein Modell wird trainiert, erste Metriken sehen gut aus und der fachliche Nutzen scheint greifbar. Die eigentliche Herausforderung beginnt jedoch häufig erst danach. Ein produktives ML-System muss nicht nur einmal trainiert werden, sondern dauerhaft zuverlässig funktionieren. Es muss nachvollziehbar versioniert, sicher bereitgestellt, kontinuierlich überwacht und bei Bedarf aktualisiert werden.",
      },
      {
        type: "paragraph",
        text: "Genau hier setzt MLOps, also Machine Learning Operations, an. MLOps verbindet Prinzipien aus DevOps, Data Engineering und Cloud Operations mit den besonderen Anforderungen von Machine-Learning-Systemen. Während klassische Software primär aus Code und Infrastruktur besteht, kommen bei ML-Systemen zusätzliche Dimensionen hinzu: Trainingsdaten, Features, Modellartefakte, Experimente, Metriken, Modellversionen und potenzielle Veränderungen der Datenverteilung im laufenden Betrieb.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/mlops.webp",
        width: 2509,
        height: 944,
        alt: "MLOps als Verbindung dreier Kreisläufe: ML (Daten, Modell), Dev (Plan, Build, Test, Release) und Ops (Deploy, Operate, Monitor).",
        caption: "MLOps verbindet Machine Learning (ML) mit den Praktiken aus Dev und Ops zu einem durchgängigen Kreislauf.",
      },
      {
        type: "paragraph",
        text: "Sculley et al. (2015) zeigen, dass ML-Systeme besondere technische Schulden erzeugen können, wenn Datenabhängigkeiten, Modellverhalten, Pipeline-Logik und Monitoring nicht sauber beherrscht werden. ML-Prototypen wirken dadurch oft schneller produktionsreif, als sie tatsächlich sind. Ohne strukturierte Betriebsprozesse entstehen langfristig hohe Wartungskosten, schwer nachvollziehbare Modellentscheidungen und riskante manuelle Eingriffe.",
        refs: [1],
      },
      {
        type: "paragraph",
        text: "Produktionsreife ML-Systeme benötigen eigene Tests, Monitoring-Mechanismen und Qualitätskriterien. Es reicht also nicht aus, nur die Modellgüte im Notebook zu betrachten. Entscheidend ist, ob das gesamte System aus Daten, Training, Deployment und Betrieb robust funktioniert.",
        refs: [2, 11],
      },

      { type: "heading", text: "Was MLOps in der Praxis bedeutet" },
      {
        type: "paragraph",
        text: "MLOps beschreibt einen strukturierten Ansatz, um Machine-Learning-Modelle über ihren gesamten Lebenszyklus hinweg zu entwickeln, bereitzustellen, zu überwachen und weiterzuentwickeln. Ziel ist es, ML-Modelle nicht als isolierte Data-Science-Artefakte zu behandeln, sondern als produktive Softwarekomponenten, die in Unternehmensprozesse integriert werden.",
        refs: [12, 13],
      },
      { type: "paragraph", text: "In der Praxis umfasst MLOps insbesondere folgende Aufgaben:" },
      {
        type: "grid",
        items: [
          { title: "Daten versionieren", description: "Trainingsdaten automatisiert bereitstellen und nachvollziehbar versionieren" },
          { title: "Reproduzierbares Training", description: "Trainingsläufe automatisiert und wiederholbar ausführen" },
          { title: "Experimente dokumentieren", description: "Parameter, Metriken und Ergebnisse lückenlos festhalten" },
          { title: "Model Registry", description: "Modelle versioniert verwalten und kontrolliert freigeben" },
          { title: "CI/CD-Deployments", description: "Bereitstellungen automatisiert und kontrolliert ausrollen" },
          { title: "Monitoring", description: "Modell-, Daten- und Infrastrukturqualität überwachen" },
          { title: "Retraining", description: "Modelle bei Drift oder Qualitätsverlust neu trainieren" },
          { title: "Security & Governance", description: "Zugriffe, Compliance und Nachvollziehbarkeit sicherstellen" },
        ],
      },
      {
        type: "paragraph",
        text: "Der zentrale Unterschied zu klassischen DevOps-Prozessen liegt darin, dass nicht nur Code bereitgestellt wird. In MLOps müssen auch Daten, Modelle, Trainingsumgebungen und Evaluationsmetriken kontrolliert werden. MLOps lässt sich daher auch als Verbindung aus ML-spezifischen Workflows und operativen DevOps-Praktiken beschreiben.",
        refs: [3, 4, 24],
      },

      { type: "heading", text: "Warum Microsoft Azure ein guter Ansatz für MLOps ist" },
      {
        type: "paragraph",
        text: "Microsoft Azure bietet für MLOps einen starken Vorteil: Die Plattform verbindet Machine Learning, Datenintegration, Cloud-Infrastruktur, Security, DevOps und Monitoring in einem einheitlichen Ökosystem. Für Unternehmen, die bereits Microsoft-Technologien nutzen, lässt sich Azure Machine Learning daher gut in bestehende Cloud-, Daten- und Governance-Strukturen integrieren.",
        refs: [23],
      },
      {
        type: "paragraph",
        text: "Microsoft beschreibt die MLOps-v2-Architektur als modulares Muster mit mehreren Phasen: Data Estate, Administration & Setup, Model Development und Model Deployment. Die genaue Ausprägung hängt vom Szenario ab, aber die Grundlogik bleibt gleich: Daten, Modelle, Infrastruktur und Deployment-Prozesse werden über standardisierte Architekturbausteine verbunden.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Ein weiterer Vorteil ist die Kombination mit bestehenden Azure-Diensten. Dazu gehören unter anderem Azure Machine Learning, Azure Data Lake Storage, Azure Data Factory, Azure DevOps, GitHub Actions, Azure Container Registry, Azure Key Vault, Azure Monitor, Log Analytics, Application Insights, Microsoft Entra ID und Azure Virtual Networks.",
      },
      {
        type: "paragraph",
        text: "Damit eignet sich Azure besonders für Unternehmen, die ML nicht als isolierte Experimentierumgebung aufbauen möchten, sondern als Teil einer produktionsfähigen, sicheren und skalierbaren Enterprise-Architektur.",
      },

      { type: "heading", text: "Zielarchitektur: MLOps in Microsoft Azure" },
      {
        type: "paragraph",
        text: "Eine produktionsreife MLOps-Architektur in Microsoft Azure besteht aus mehreren Schichten. Sie beginnt bei der Infrastruktur, führt über Data-, ML- und Release-Pipelines bis hin zu Operations, Security und Governance. Der wichtigste Architekturgedanke ist dabei Modularität: Nicht jedes ML-Projekt benötigt dieselbe technische Ausprägung. Manche Use Cases benötigen nur ein kontrolliertes Modell-Deployment, andere erfordern regelmäßiges Retraining, komplexe Datenpipelines oder ein vollständiges End-to-End-MLOps-Setup.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/pipelines.webp",
        width: 3767,
        height: 1272,
        maxWidth: 1040,
        alt: "End-to-End-MLOps-Architektur: Data Source, Data Pipeline (Data Ingestion, Preprocessing, Feature Engineering), Feature Store, ML Pipeline (Optimization, Evaluation), Model Registry und Release Pipeline (Packaging, Validation, Deployment, Monitoring; CI/CD, CT) bis zum Deployed Model, mit Trigger-Schleife sowie Data- und Code-Repository.",
        caption: "Produktive ML-Systeme als geschlossener Kreislauf – von der Data Pipeline über Feature Store, ML Pipeline und Model Registry bis zur Release Pipeline, mit Trigger für erneutes Training.",
      },
      {
        type: "paragraph",
        text: "Diese Darstellung zeigt, dass MLOps kein linearer Prozess ist. Produktive ML-Systeme bilden vielmehr einen geschlossenen Kreislauf aus Datenbereitstellung, Training, Deployment, Monitoring und kontinuierlicher Verbesserung.",
      },

      { type: "subheading", text: "1. Infrastruktur" },
      {
        type: "paragraph",
        text: "Die Infrastruktur bildet das technische Fundament der gesamten MLOps-Architektur. Sie stellt sicher, dass Daten, Trainingsprozesse, Modellartefakte, Deployments und Monitoring-Komponenten in einer kontrollierten Azure-Umgebung betrieben werden.",
      },
      { type: "paragraph", text: "Eine typische Infrastruktur für MLOps auf Azure sieht so aus:" },
      {
        type: "image",
        src: "/assets/blog/mlops/infrastructure.webp",
        width: 2744,
        height: 1325,
        maxWidth: 860,
        alt: "Azure-MLOps-Infrastruktur: Azure Machine Learning Workspace mit Azure Data Factory, Compute Cluster und Compute Instance, Storage Account, Key Vault, Container Registry und Application Insights, verbunden über Private Endpoints in einem Virtual Network innerhalb einer Resource Group.",
        caption: "Typische Azure-Infrastruktur für MLOps – Workspace, Compute, Storage, Key Vault, Container Registry und Monitoring, abgesichert über Virtual Network und Private Endpoints.",
      },
      {
        type: "paragraph",
        text: "In produktiven ML-Umgebungen sollte Infrastruktur nicht manuell über das Azure Portal erstellt werden. Manuelle Konfigurationen sind schwer reproduzierbar, fehleranfällig und führen schnell zu Abweichungen zwischen Entwicklungs-, Test- und Produktionsumgebungen. Stattdessen sollte Infrastruktur als Code definiert und versioniert werden.",
      },
      {
        type: "paragraph",
        text: "Microsoft beschreibt Bicep als deklarative Infrastructure-as-Code-Sprache für Azure-Ressourcen. Bicep-Dateien können wie Anwendungscode behandelt werden, wodurch Infrastrukturänderungen nachvollziehbar, wiederholbar und konsistenter deploybar werden. Für sichere Enterprise-Setups ist außerdem Netzwerkisolation relevant: Microsoft empfiehlt für Azure Machine Learning unter anderem die Absicherung des Workspaces und verbundener Ressourcen über Virtual Networks und Private Endpoints, sodass der Zugriff auf Storage, Container Registry, Key Vault und andere Dienste kontrollierbar bleibt.",
        refs: [10, 21],
      },

      { type: "subheading", text: "2. Machine Learning Pipelines" },
      {
        type: "paragraph",
        text: "Auf der Infrastruktur setzen die eigentlichen ML-Prozesse auf. Diese lassen sich in drei Pipeline-Typen gliedern: Data Pipeline, ML Pipeline und Release Pipeline. Zusammen bilden sie den operativen Kern einer MLOps-Architektur.",
      },
      {
        type: "paragraph",
        text: "Der Vorteil dieser Trennung liegt darin, dass jeder Teilprozess eigenständig entwickelt, getestet, versioniert und automatisiert werden kann. Gleichzeitig können die Pipelines miteinander verbunden werden, sodass ein durchgängiger Prozess vom Rohdatum bis zum produktiven Modell entsteht.",
      },

      { type: "subheading", text: "2.1 Data Pipeline: Daten zuverlässig bereitstellen" },
      {
        type: "paragraph",
        text: "Die Data Pipeline sorgt dafür, dass Rohdaten aus unterschiedlichen Quellen automatisiert in eine für Machine Learning nutzbare Form überführt werden. Dazu gehören Datenaufnahme, Validierung, Transformation, Bereinigung, Preprocessing und Feature Engineering.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/data-pipeline.webp",
        width: 2475,
        height: 904,
        alt: "Data Pipeline: Daten aus der Data Source werden über Data Ingestion, Preprocessing und Feature Engineering aufbereitet und im Feature Store abgelegt; Rohdaten werden zusätzlich in einem Data Repository gespeichert.",
        caption: "Die Data Pipeline überführt Rohdaten aus der Data Source in Features für den Feature Store.",
      },
      {
        type: "paragraph",
        text: "In Microsoft Azure kann eine Data Pipeline je nach Ausgangslage mit unterschiedlichen Diensten umgesetzt werden. Häufige Optionen sind Azure Data Factory, Microsoft Fabric Data Factory, Azure Synapse Pipelines oder Azure Databricks. Welche Lösung sinnvoll ist, hängt von Datenvolumen, Datenquellen, Transformationslogik, vorhandener Datenplattform und Betriebsanforderungen ab. Technisch sollte eine Data Pipeline drei Anforderungen erfüllen: Sie muss wiederholbar, versionierbar und umgebungsfähig sein.",
      },
      {
        type: "bullets",
        items: [
          "Wiederholbar: Trainingsdaten sollten nicht manuell exportiert, lokal angepasst und wieder hochgeladen werden. Stattdessen ist klar definiert, welche Daten aus welchen Quellen geladen und wie sie transformiert werden.",
          "Versionierbar: Änderungen an Datenlogik, Transformationen und Pipeline-Konfigurationen sollten über Git nachvollziehbar sein.",
          "Umgebungsfähig: Entwicklungs-, Test- und Produktionsumgebungen benötigen häufig unterschiedliche Parameter, etwa für Storage Accounts, Datenbankverbindungen oder Secrets.",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning unterstützt diesen Ansatz durch sogenannte Data Assets. Diese verweisen auf Datenquellen und speichern Metadaten, ohne die Daten zwingend zu kopieren. Dadurch können Datenquellen über versionierte Referenzen genutzt werden, was Reproduzierbarkeit und Nachvollziehbarkeit verbessert. Wenn Azure Data Factory eingesetzt wird, sollte auch die Data-Pipeline-Logik in einen CI/CD-Prozess eingebunden werden, um Pipelines, Datasets, Data Flows und weitere Artefakte kontrolliert von Entwicklungs- in Test- und Produktionsumgebungen zu übertragen.",
        refs: [9, 19],
      },

      { type: "subheading", text: "2.2 ML Pipeline: Training, Experimente und Evaluation automatisieren" },
      {
        type: "paragraph",
        text: "Die ML Pipeline übernimmt den eigentlichen Machine-Learning-Prozess. Sie nutzt die bereitgestellten Daten oder Features, trainiert Modelle, bewertet deren Qualität und speichert geeignete Modellversionen für spätere Deployments.",
        refs: [17, 20],
      },
      {
        type: "image",
        src: "/assets/blog/mlops/ml-pipeline.webp",
        width: 2475,
        height: 904,
        alt: "Machine Learning Pipeline: Features aus dem Feature Store durchlaufen Experimentation, Optimization und Evaluation; der Trainingscode liegt im Code Repository, das beste Modell wird in der Model Registry registriert.",
        caption: "Die ML Pipeline trainiert, optimiert und bewertet Modelle und registriert das beste in der Model Registry.",
      },
      { type: "paragraph", text: "Typische Schritte einer ML Pipeline sind:" },
      {
        type: "bullets",
        items: [
          "Laden einer definierten Datenversion",
          "Ausführen von Preprocessing- oder Feature-Schritten",
          "Training eines oder mehrerer Modelle",
          "Hyperparameter-Tuning",
          "Evaluation anhand technischer und fachlicher Metriken",
          "Vergleich mit bestehenden Modellversionen",
          "Registrierung des besten Modells in der Model Registry",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning unterstützt solche Abläufe über Pipelines, Jobs, Komponenten, Environments und Compute-Ressourcen. Pipelines können mit der Azure ML CLI, dem Python SDK oder über das Azure Machine Learning Studio erstellt werden. Komponenten verbessern dabei die Wiederverwendbarkeit und Flexibilität von ML-Pipelines.",
      },
      {
        type: "paragraph",
        text: "Eine gute ML Pipeline sollte nicht nur ein Modell trainieren, sondern auch entscheiden können, ob dieses Modell überhaupt deploymentfähig ist. Dafür werden technische Metriken wie Accuracy, Precision, Recall, F1-Score oder RMSE mit fachlichen Mindestanforderungen kombiniert. Je nach Use Case können zusätzlich Fairness-, Robustheits- oder Stabilitätsmetriken relevant sein.",
      },
      {
        type: "paragraph",
        text: "Ein zentraler Bestandteil ist die Model Registry. Sie bildet die Schnittstelle zwischen ML Pipeline und Release Pipeline. Nach Training und Evaluation wird ein Modell nicht als lose Datei gespeichert, sondern als versioniertes Artefakt registriert. Die Registry hält fest, welche Modellversion existiert, welche Metriken erreicht wurden und welche Metadaten mit dem Modell verbunden sind. Azure Machine Learning Registries ermöglichen außerdem die Wiederverwendung und gemeinsame Nutzung von Modellen, Komponenten und Environments über mehrere Workspaces hinweg.",
      },

      { type: "subheading", text: "2.3 Release Pipeline: Modelle kontrolliert bereitstellen" },
      {
        type: "paragraph",
        text: "Die Release Pipeline überführt ein freigegebenes Modell aus der Model Registry in eine produktive Umgebung. Sie ist damit die Brücke zwischen Modellentwicklung und operativem Betrieb.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/release-pipeline.webp",
        width: 2524,
        height: 509,
        alt: "Release Pipeline: Ein Modell aus der Model Registry durchläuft Packaging, Validation, Deployment und Monitoring über CI/CD und Continuous Training (CT) und wird als Deployed Model bereitgestellt.",
        caption: "Die Release Pipeline bringt ein freigegebenes Modell über CI/CD kontrolliert in den produktiven Betrieb.",
      },
      { type: "paragraph", text: "Typische Aufgaben der Release Pipeline sind:" },
      {
        type: "bullets",
        items: [
          "Auswahl einer freigegebenen Modellversion",
          "Paketierung des Modells inklusive Abhängigkeiten",
          "Definition oder Wiederverwendung eines Azure-ML-Environments",
          "Erstellung oder Aktualisierung eines Endpoints",
          "Ausführung von Smoke Tests oder Test-Inferenz",
          "Deployment in Test- oder Produktionsumgebung",
          "Freigabeprozess mit Approval Gates",
          "Rollback im Fehlerfall",
        ],
      },
      {
        type: "paragraph",
        text: "In Azure Machine Learning können Modelle unter anderem über Managed Online Endpoints oder Batch Endpoints bereitgestellt werden. Managed Online Endpoints eignen sich für Echtzeit-Inferenz über HTTPS-Endpunkte und werden von Azure vollständig verwaltet – inklusive Infrastruktur, Skalierung, Sicherheit und Überwachung. Batch Endpoints eignen sich dagegen für größere, zeitversetzte Vorhersageläufe, beispielsweise wenn regelmäßig Prognosen für viele Datensätze erzeugt und anschließend in einem Data Warehouse, Data Lake oder BI-System weiterverarbeitet werden.",
        refs: [8],
      },
      {
        type: "paragraph",
        text: "Eine professionelle Release Pipeline sollte fachliche Modelllogik und operative Deployment-Logik klar trennen. Die Modelllogik liegt beispielsweise in Trainingscode, Feature Engineering und der scoring_file.py. Die operative Logik liegt in YAML-Dateien, Environment-Definitionen, Endpoint-Konfigurationen, Pipeline-Dateien und Deployment-Parametern. Diese Trennung macht den Prozess wartbarer: Data Scientists können an Modellen und Features arbeiten, während MLOps Engineers Deployment, Infrastruktur, Security und Automatisierung standardisieren.",
      },

      { type: "subheading", text: "3. Operations, Security und Governance" },
      {
        type: "paragraph",
        text: "Nach dem Deployment beginnt der eigentliche Betrieb. Ein produktives ML-System muss nicht nur verfügbar sein, sondern kontinuierlich überwacht, abgesichert und kontrolliert weiterentwickelt werden.",
      },
      { type: "paragraph", text: "Operations umfasst insbesondere:" },
      {
        type: "bullets",
        items: [
          "Monitoring von Endpoints, Latenzen, Fehlerquoten und Ressourcennutzung",
          "Überwachung von Modellmetriken",
          "Erkennung von Data Drift und Prediction Drift",
          "Überwachung der Datenqualität",
          "Kostenkontrolle und Alerting",
          "Retraining-Trigger",
          "Dokumentation und regelmäßige Reviews",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning bietet Model Monitoring mit integrierten Signalen für tabellarische Daten, darunter Data Drift, Prediction Drift, Datenqualität, Feature Attribution Drift und Modellperformance. Für Online Endpoints kann Azure Machine Learning Produktions-Inferenzdaten automatisch erfassen und für kontinuierliches Monitoring verwenden.",
        refs: [7],
      },
      {
        type: "paragraph",
        text: "Security und Governance sollten nicht nachträglich ergänzt werden, sondern Teil der Architektur sein. Dazu gehören rollenbasierte Zugriffskontrolle, Managed Identities, sichere Secret-Verwaltung, Verschlüsselung, Netzwerkisolation, Logging, Auditierbarkeit und klare Freigabeprozesse. Managed Identities sind besonders wichtig, weil Compute-Ressourcen dadurch ohne hart codierte Zugangsdaten auf andere Azure-Dienste zugreifen können – etwa um Verbindungsinformationen aus Key Vault abzurufen oder Docker Images aus Azure Container Registry zu ziehen. Damit wird MLOps nicht nur zu einem technischen Automatisierungsansatz, sondern zu einem Governance-Modell für produktive KI-Systeme.",
        refs: [22],
      },

      { type: "heading", text: "Technische Umsetzung: Wie eine Azure-MLOps-Pipeline konkret aufgebaut wird" },
      {
        type: "paragraph",
        text: "Nachdem die Zielarchitektur definiert ist, stellt sich die praktische Frage: Wie lässt sich eine solche MLOps-Struktur konkret umsetzen? Eine robuste technische Umsetzung verfolgt drei Ziele. Erstens sollen wiederkehrende Aufgaben automatisiert werden. Zweitens sollen Infrastruktur, Datenlogik, Trainingscode und Deployments versioniert sein. Drittens soll der Prozess so modular bleiben, dass unterschiedliche ML-Use-Cases nicht in eine starre Architektur gezwungen werden.",
      },

      { type: "subheading", text: "1. Repository-Struktur" },
      {
        type: "paragraph",
        text: "Ein sinnvoller Startpunkt ist eine klare Repository-Struktur. Je nach Teamgröße kann diese als Monorepo oder als getrennte Repository-Landschaft aufgebaut werden. Eine beispielhafte Struktur kann so aussehen:",
      },
      {
        type: "filetree",
        nodes: [
          {
            type: "folder",
            name: "mlops-project",
            defaultOpen: true,
            children: [
              {
                type: "folder",
                name: "infrastructure",
                note: "Infrastructure as Code (Bicep) + Parameter je Umgebung",
                children: [
                  { type: "file", name: "main.bicep" },
                  { type: "file", name: "parameters.dev.json" },
                  { type: "file", name: "parameters.test.json" },
                  { type: "file", name: "parameters.prod.json" },
                ],
              },
              {
                type: "folder",
                name: "data-pipeline",
                note: "Data-Factory-Artefakte: Pipelines, Datasets, Linked Services",
                children: [
                  { type: "folder", name: "pipelines", children: [] },
                  { type: "folder", name: "datasets", children: [] },
                  { type: "folder", name: "linked-services", children: [] },
                  { type: "folder", name: "arm-parameters", children: [] },
                ],
              },
              {
                type: "folder",
                name: "training",
                note: "ML-Pipeline: Komponenten, Trainings- und Evaluationscode",
                children: [
                  { type: "folder", name: "components", note: "Wiederverwendbare Pipeline-Komponenten", children: [] },
                  { type: "file", name: "pipeline.yml" },
                  { type: "file", name: "train.py" },
                  { type: "file", name: "evaluate.py" },
                  { type: "file", name: "environment.yml" },
                ],
              },
              {
                type: "folder",
                name: "deployment",
                note: "Modell-Deployment: Endpoint, Scoring, Environment",
                children: [
                  { type: "file", name: "endpoint.yml" },
                  { type: "file", name: "deployment.yml" },
                  { type: "file", name: "scoring_file.py" },
                  { type: "file", name: "test_input.json" },
                  {
                    type: "folder",
                    name: "environment",
                    note: "Container-Definition für das Deployment",
                    children: [
                      { type: "file", name: "Dockerfile" },
                      { type: "file", name: "conda_dependencies.yml" },
                    ],
                  },
                ],
              },
              {
                type: "folder",
                name: "pipelines",
                note: "CI/CD-Definitionen für alle Bereiche",
                children: [
                  { type: "file", name: "deploy-infrastructure.yml" },
                  { type: "file", name: "deploy-data-pipeline.yml" },
                  { type: "file", name: "run-training-pipeline.yml" },
                  { type: "file", name: "deploy-model.yml" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "Diese Struktur trennt vier Verantwortungsbereiche: Infrastruktur, Datenintegration, Training und Deployment. Dadurch können einzelne Komponenten unabhängig voneinander weiterentwickelt werden, während der Gesamtprozess weiterhin standardisiert bleibt.",
      },
      {
        type: "paragraph",
        text: "Den vollständigen, lauffähigen Beispielcode stellen wir in zwei offenen Repositories bereit – einmal für die Infrastruktur und einmal für die Pipelines:",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-iac-with-bicep",
        description: "Infrastructure as Code für Azure mit Bicep – Workspace, Storage, Container Registry, Key Vault, Compute und Netzwerk reproduzierbar bereitstellen.",
        url: "https://github.com/smiit-GmbH/azure-iac-with-bicep",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-mlops",
        description: "Data-, ML- und Release-Pipeline für Azure Machine Learning inklusive CI/CD-Deployment.",
        url: "https://github.com/smiit-GmbH/azure-mlops",
      },

      { type: "subheading", text: "2. Infrastructure as Code mit Bicep oder Terraform" },
      {
        type: "paragraph",
        text: "Die Infrastruktur sollte automatisiert bereitgestellt werden. Dazu zählen typischerweise Resource Group, Azure Machine Learning Workspace, Storage Account oder Data Lake, Azure Container Registry, Azure Key Vault, Application Insights, Log Analytics Workspace, Compute Cluster, Managed Identities, Private Endpoints und Netzwerkregeln.",
      },
      {
        type: "paragraph",
        text: "Bicep eignet sich besonders gut, wenn Unternehmen stark im Azure-Ökosystem arbeiten. Die Syntax ist kompakter als klassische ARM Templates und bleibt trotzdem vollständig kompatibel mit Azure Resource Manager, da Bicep während des Deployments in ARM JSON umgewandelt wird. Ein typischer IaC-Prozess sieht so aus:",
      },
      {
        type: "flow",
        steps: [
          "Commit an Infrastrukturdateien",
          "Pull Request",
          "Automatische Validierung",
          "Deployment in Entwicklungsumgebung",
          "Optionales Approval",
          "Deployment in Testumgebung",
          "Optionales Approval",
          "Deployment in Produktionsumgebung",
        ],
      },
      {
        type: "paragraph",
        text: "Der Vorteil liegt nicht nur in der Automatisierung, sondern auch in der Nachvollziehbarkeit. Jede Infrastrukturänderung ist versioniert, überprüfbar und im Fehlerfall leichter rückgängig zu machen.",
      },

      { type: "subheading", text: "3. CI/CD-Flow für Data Pipelines" },
      {
        type: "paragraph",
        text: "Wenn Azure Data Factory oder Fabric Data Factory eingesetzt wird, sollte die Data Pipeline ebenfalls über CI/CD bereitgestellt werden. Dabei werden Pipeline-Definitionen, Datasets, Linked Services und Trigger nicht manuell in jeder Umgebung angepasst, sondern kontrolliert promoted.",
      },
      {
        type: "flow",
        steps: [
          "Feature Branch",
          "Änderung an Data-Pipeline-Logik",
          "Pull Request",
          "Validierung der Pipeline-Artefakte",
          "Export als ARM Template",
          "Deployment in Dev",
          "Deployment in Test",
          "Deployment in Prod",
        ],
      },
      {
        type: "paragraph",
        text: "In produktiven Umgebungen ist zusätzlich wichtig, Trigger kontrolliert zu behandeln. Vor einem Deployment sollten aktive Trigger gestoppt und nach erfolgreichem Deployment wieder gestartet werden. Microsoft stellt dafür Beispielskripte für Pre- und Post-Deployment-Schritte bereit.",
      },

      { type: "subheading", text: "4. CI/CD-Flow für ML Pipelines" },
      {
        type: "paragraph",
        text: "Die ML Pipeline sollte ebenfalls automatisiert ausführbar sein. Der Prozess beginnt meist mit einer Änderung am Trainingscode, an einer Komponente oder an der Pipeline-Konfiguration.",
      },
      {
        type: "flow",
        steps: [
          "Commit an Trainingscode oder Pipeline-YAML",
          "Pull Request",
          "Linting und Tests",
          "Validierung der Azure-ML-Konfigurationen",
          "Ausführung der Trainingspipeline",
          "Evaluation der Modellmetriken",
          "Registrierung des Modells",
          "Tagging der Modellversion",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning unterstützt YAML-basierte Konfigurationen für Jobs und Pipelines: Azure-ML-Entitäten können über schematisierte YAML-Dateien definiert und über die Azure ML CLI erstellt werden. Der Vorteil liegt darin, dass Pipeline-Definitionen wie Code behandelt werden können – Änderungen laufen über Pull Requests, können automatisch validiert und später reproduzierbar ausgeführt werden. Eine ML Pipeline sollte außerdem nicht jedes Modell automatisch produktiv setzen, sondern eine Modellversion nur dann registrieren oder zur Freigabe markieren, wenn definierte Qualitätskriterien erfüllt sind.",
        refs: [18],
      },

      { type: "subheading", text: "5. Release Pipeline für Online- oder Batch-Deployment" },
      {
        type: "paragraph",
        text: "Die Release Pipeline übernimmt das kontrollierte Deployment eines registrierten Modells. Dabei werden Modellversion, Environment, Endpoint-Konfiguration und Deployment-Parameter zusammengeführt. Für einen Online Endpoint werden typischerweise registriertes Modell, scoring_file.py, Environment oder Docker Image, Endpoint- und Deployment-Konfiguration, Testdaten für Smoke Tests, Monitoring-Konfiguration und Approval-Regeln benötigt.",
      },
      {
        type: "flow",
        steps: [
          "Auswahl einer Modellversion aus der Registry",
          "Validierung der Deployment-Konfiguration",
          "Aufbau oder Auswahl des Environments",
          "Deployment in Testumgebung",
          "Smoke Test",
          "Approval",
          "Deployment in Produktion",
          "Monitoring aktivieren",
        ],
      },
      {
        type: "paragraph",
        text: "Managed Online Endpoints eignen sich besonders dann, wenn ein Modell über eine API in Anwendungen, Workflows oder Plattformen integriert werden soll. Batch Endpoints sind sinnvoll, wenn Vorhersagen regelmäßig für große Datenmengen erzeugt werden, etwa für Forecasting, Scoring oder Klassifikationen im Hintergrund. Die Endpoint-Entscheidung sollte daher nicht technisch isoliert getroffen werden, sondern vom fachlichen Prozess abhängen: Muss das Ergebnis sofort verfügbar sein, spricht vieles für einen Online Endpoint. Wird das Ergebnis periodisch verarbeitet, ist ein Batch Endpoint oft einfacher und kosteneffizienter.",
      },

      { type: "subheading", text: "6. Monitoring und Retraining-Trigger" },
      {
        type: "paragraph",
        text: "Der MLOps-Prozess endet nicht mit dem Deployment. Ein Modell kann im Laufe der Zeit schlechter werden, auch wenn sich am Code nichts geändert hat. Ursachen dafür können veränderte Datenverteilungen, neues Nutzerverhalten, geänderte Geschäftsprozesse oder externe Marktbedingungen sein. Deshalb sollte Monitoring mehrere Ebenen abdecken: technische Verfügbarkeit, Latenz und Fehlerquoten, Ressourcennutzung und Kosten, Datenqualität, Data Drift, Prediction Drift, Modellperformance und fachliche Ergebnisqualität.",
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning Model Monitoring unterstützt integrierte Signale wie Data Drift, Prediction Drift, Datenqualität und Modellperformance. Damit lassen sich Veränderungen erkennen, bevor sie zu größeren fachlichen Problemen führen. Ein vollständiger MLOps-Kreislauf kann so aussehen:",
      },
      {
        type: "flow",
        steps: [
          "Modell läuft produktiv",
          "Monitoring erkennt Drift oder Qualitätsverlust",
          "Alert wird ausgelöst",
          "Retraining wird manuell oder automatisch gestartet",
          "Neues Modell wird trainiert",
          "Modell wird evaluiert",
          "Modell wird registriert",
          "Release Pipeline deployed neue Version",
        ],
      },
      {
        type: "paragraph",
        text: "Nicht jedes Unternehmen sollte von Beginn an vollautomatisches Retraining einsetzen. In vielen Fällen ist ein kontrollierter Human-in-the-loop-Prozess sinnvoller: Das Monitoring schlägt Alarm, ein Data-Science- oder MLOps-Team bewertet die Ursache und entscheidet anschließend über Retraining oder Deployment.",
      },

      { type: "heading", text: "MLOps-Reifegrad: Nicht alles muss sofort vollständig automatisiert sein" },
      {
        type: "paragraph",
        text: "Ein häufiger Fehler besteht darin, MLOps direkt als vollständige Enterprise-Plattform zu denken. Für viele Unternehmen ist ein schrittweiser Aufbau sinnvoller. Microsofts MLOps Maturity Model beschreibt MLOps als Reifeprozess und hilft dabei, Fähigkeiten schrittweise aufzubauen, den aktuellen Stand zu bewerten, Lücken zu identifizieren und den nächsten sinnvollen Entwicklungsschritt zu planen. Ein pragmatischer Reifegradpfad kann so aussehen:",
        refs: [6, 14],
      },
      {
        type: "maturity",
        items: [
          { level: 0, label: "Manuelle ML-Prozesse" },
          { level: 1, label: "Versionierter Code und definierte Datenquellen" },
          { level: 2, label: "Automatisiertes Training" },
          { level: 3, label: "Standardisiertes Deployment" },
          { level: 4, label: "Monitoring und kontrolliertes Retraining" },
          { level: 5, label: "Vollständig integrierte MLOps-Plattform" },
        ],
      },
      {
        type: "paragraph",
        text: "Für viele Organisationen ist bereits ein großer Fortschritt erreicht, wenn Code, Daten, Modelle und Deployments sauber versioniert und manuelle Deployment-Schritte reduziert werden. Vollautomatisches Retraining, Canary Deployments oder organisationsweite Model Registries können später ergänzt werden.",
      },

      { type: "heading", text: "Best Practices für Azure MLOps" },
      {
        type: "numbered",
        items: [
          { title: "Modelle wie produktive Software behandeln", description: "Ein Modell ist kein Notebook-Ergebnis, sondern ein produktives Artefakt mit Versionierung, Tests, Freigabeprozessen, Deployment-Strategien und Monitoring." },
          { title: "Daten, Code und Modellversionen gemeinsam betrachten", description: "Reproduzierbarkeit entsteht nur, wenn klar ist, welche Datenversion, welcher Code-Stand, welche Parameter und welche Modellversion zusammengehören." },
          { title: "Pipelines modular aufbauen", description: "Data Pipeline, ML Pipeline und Release Pipeline sollten getrennt, aber integrierbar sein, damit Teams Komponenten wiederverwenden und Use Cases unterschiedlich stark automatisieren können." },
          { title: "Infrastructure as Code konsequent nutzen", description: "Cloud-Infrastruktur sollte nicht manuell gepflegt werden. IaC sorgt für konsistente Umgebungen, versionierte Änderungen und reproduzierbare Deployments." },
          { title: "Security früh integrieren", description: "Zugriffsrechte, Managed Identities, Key Vault, Private Endpoints, Logging und Netzwerkisolation gehören nicht erst kurz vor den Go-live." },
          { title: "Monitoring auf Modell- und Datenebene erweitern", description: "CPU, RAM und Verfügbarkeit reichen bei ML-Systemen nicht aus – zusätzlich müssen Datenqualität, Drift, Modellmetriken und fachliche Ergebnisqualität überwacht werden." },
          { title: "Standardisierung und Flexibilität ausbalancieren", description: "Standardisiert werden Infrastruktur, Deployment, Security, Monitoring und Governance; flexibel bleiben Modellwahl, Feature Engineering, fachliche Metriken und Use-Case-spezifische Logik." },
        ],
      },

      { type: "heading", text: "Fazit: MLOps macht Machine Learning produktionsfähig" },
      {
        type: "paragraph",
        text: "Machine Learning entfaltet seinen Wert nicht im Prototyp, sondern im produktiven Betrieb. Dafür reicht es nicht aus, ein gutes Modell zu trainieren. Unternehmen benötigen reproduzierbare Datenpipelines, automatisierte Trainingsprozesse, kontrollierte Deployments, versionierte Modelle, Monitoring, Security und Governance.",
      },
      {
        type: "paragraph",
        text: "Microsoft Azure bietet dafür eine leistungsfähige Plattform. Azure Machine Learning, Azure DevOps, GitHub Actions, Bicep, Key Vault, Managed Identities, Azure Monitor und Azure Data Services lassen sich zu einer robusten MLOps-Architektur verbinden. Der entscheidende Erfolgsfaktor ist jedoch nicht nur die Technologie, sondern die richtige Architektur: Ein gutes MLOps-Framework standardisiert wiederkehrende operative Prozesse, ohne die fachliche Flexibilität einzelner ML-Projekte einzuschränken. So wird aus einzelnen ML-Prototypen eine skalierbare, sichere und wartbare Grundlage für produktive KI-Anwendungen.",
      },
    ],

    faq: [
      {
        question: "Was ist der Unterschied zwischen MLOps und DevOps?",
        answer:
          "DevOps automatisiert die Bereitstellung von Code und Infrastruktur. MLOps überträgt diese Prinzipien auf Machine Learning, muss aber zusätzliche bewegliche Teile beherrschen: Trainingsdaten, Features, Modellartefakte, Experimente, Hyperparameter und Evaluationsmetriken. Der entscheidende Unterschied: Ein ML-System kann sich verschlechtern, ohne dass jemand den Code anfasst, weil sich die Datenverteilung in der Realität verändert (Data Drift). Deshalb gehören zu MLOps nicht nur Build- und Deploy-Pipelines, sondern auch Datenversionierung, reproduzierbares Training, eine Model Registry und ein Monitoring, das Daten- und Modellqualität überwacht und bei Bedarf Retraining auslöst.",
      },
      {
        question: "Wo fängt man mit MLOps am besten an?",
        answer:
          "Nicht mit der vollständigen Plattform, sondern entlang eines Reifegrads. Der größte Hebel zu Beginn ist meist unspektakulär, aber wirkungsvoll: Code, Datenquellen, Modelle und Deployments sauber versionieren und manuelle Deployment-Schritte reduzieren. Schon damit werden Ergebnisse reproduzierbar und die Übergaben zwischen Data Science und Betrieb verlässlich. Automatisiertes Training, standardisiertes Deployment, Monitoring mit Retraining und am Ende eine vollintegrierte Plattform kommen schrittweise dazu – orientiert an konkreten Use Cases statt an einem Maximalausbau, den niemand braucht.",
      },
      {
        question: "Welche Azure-Dienste braucht man für MLOps?",
        answer:
          "Kern ist der Azure Machine Learning Workspace – er bündelt Experimente, Pipelines, Modelle, Environments, Compute und Deployments. Dazu kommen typischerweise Azure Data Lake Storage für Daten und Artefakte, Azure Container Registry für Images, Azure Key Vault für Secrets, Azure Monitor mit Log Analytics und Application Insights fürs Monitoring sowie Azure DevOps oder GitHub Actions für CI/CD. Die Infrastruktur selbst wird über Bicep oder Terraform als Code beschrieben, die Datenaufbereitung je nach Plattform über Azure Data Factory, Microsoft Fabric oder Azure Databricks. Welche Bausteine wirklich nötig sind, hängt vom Use Case ab – nicht jedes Projekt braucht alles.",
      },
      {
        question: "Was ist eine Model Registry und warum ist sie so zentral?",
        answer:
          "Die Model Registry ist das versionierte Verzeichnis aller Modelle und die Schnittstelle zwischen Training und produktivem Deployment. Statt ein Modell als lose Datei zu speichern, wird es als Artefakt registriert – inklusive Version, erreichter Metriken und Metadaten. Das macht nachvollziehbar, welche Modellversion mit welchen Daten und welchem Code-Stand entstanden ist, und erlaubt kontrollierte Freigaben und Rollbacks. In Azure Machine Learning lassen sich Modelle über Registries zudem über mehrere Workspaces hinweg teilen – wichtig, wenn Entwicklungs-, Test- und Produktionsumgebungen getrennt sind oder mehrere Teams dieselben Komponenten nutzen.",
      },
      {
        question: "Online Endpoint oder Batch Endpoint – wann nimmt man was?",
        answer:
          "Die Entscheidung folgt dem fachlichen Prozess, nicht der Technik. Ein Managed Online Endpoint liefert Echtzeit-Vorhersagen über eine HTTPS-API – richtig, wenn das Ergebnis sofort gebraucht wird, etwa in einer App oder einem Workflow. Ein Batch Endpoint verarbeitet große Datenmengen zeitversetzt – richtig, wenn regelmäßig viele Datensätze bewertet und danach in ein Data Warehouse oder BI-System geschrieben werden, etwa beim Forecasting oder Scoring. Online Endpoints verursachen laufende Bereitstellungskosten, Batch Endpoints laufen nur bei Bedarf und sind oft kosteneffizienter.",
      },
      {
        question: "Was ist Data Drift und wie funktioniert Monitoring?",
        answer:
          "Data Drift bezeichnet die Veränderung der Eingabedaten im Betrieb gegenüber den Trainingsdaten, Prediction Drift die Veränderung der Modellausgaben. Beides kann ein Modell schleichend verschlechtern, obwohl der Code unverändert bleibt – etwa durch neues Nutzerverhalten oder geänderte Geschäftsprozesse. Klassisches Infrastruktur-Monitoring (CPU, RAM, Verfügbarkeit) reicht dafür nicht aus. Azure Machine Learning bietet Model Monitoring mit Signalen für Data Drift, Prediction Drift, Datenqualität und Modellperformance und kann Produktions-Inferenzdaten automatisch erfassen. So werden Verschlechterungen sichtbar, bevor sie fachlich teuer werden – und können einen Alert oder ein Retraining auslösen.",
      },
      {
        question: "Sollten wir Retraining automatisieren?",
        answer:
          "Nicht zwingend von Beginn an. Vollautomatisches Retraining ist mächtig, aber riskant, wenn niemand prüft, warum ein Modell schlechter geworden ist. In vielen Fällen ist ein Human-in-the-loop-Prozess sinnvoller: Das Monitoring schlägt Alarm, ein Data-Science- oder MLOps-Team bewertet die Ursache und entscheidet dann über Retraining und Deployment. Automatisierung lohnt sich dort, wo Drift häufig auftritt, gut verstanden ist und klare Qualitätskriterien das neue Modell absichern. Wichtig ist in beiden Fällen: Ein neues Modell wird erst nach definierten Metrik-Schwellen freigegeben – nicht automatisch, nur weil es neuer ist.",
      },
      {
        question: "Wie sorgt man bei ML-Systemen für Security und Governance?",
        answer:
          "Security gehört in die Architektur, nicht nachträglich obendrauf. Dazu zählen rollenbasierte Zugriffe, Managed Identities (damit Compute ohne hartkodierte Zugangsdaten auf andere Dienste zugreift), sichere Secret-Verwaltung über Key Vault, Verschlüsselung, Netzwerkisolation über Virtual Networks und Private Endpoints sowie durchgängiges Logging und Auditierbarkeit. Governance ergänzt das um nachvollziehbare Modellversionen, klare Freigabeprozesse mit Approval Gates und dokumentierte Verantwortlichkeiten. So wird MLOps nicht nur zum Automatisierungs-, sondern zum Governance-Modell für produktive KI – gerade in regulierten Branchen ein entscheidender Faktor.",
      },
      {
        question: "Welche Rollen oder welches Team braucht MLOps?",
        answer:
          "MLOps lebt von der sauberen Trennung zweier Rollen, die zusammenarbeiten: Data Scientists verantworten Modelllogik, Features und fachliche Metriken; MLOps Engineers standardisieren Deployment, Infrastruktur, Security und Automatisierung. Das setzt kein großes Team voraus – im Mittelstand übernehmen oft wenige Personen beide Rollen. Entscheidend ist nicht die Teamgröße, sondern dass fachliche Modellarbeit und operativer Betrieb über klare Schnittstellen entkoppelt sind – etwa über die Model Registry und versionierte Pipelines –, damit beide Seiten unabhängig voneinander arbeiten können.",
      },
    ],

    sources: [
      {
        title: "Sculley et al. (2015): Hidden Technical Debt in Machine Learning Systems",
        url: "https://papers.neurips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf",
      },
      {
        title: "Breck et al. (2017): The ML Test Score – A Rubric for ML Production Readiness",
        url: "https://research.google.com/pubs/archive/aad9f93b86b7addfea4c419b9100c6cdd26cacea.pdf",
      },
      {
        title: "Kreuzberger, Kühl & Hirschl (2023): Machine Learning Operations (MLOps) – Overview, Definition, and Architecture",
        url: "https://arxiv.org/abs/2205.02302",
      },
      {
        title: "Symeonidis et al. (2022): MLOps – Definitions, Tools and Challenges",
        url: "https://arxiv.org/abs/2201.00162",
      },
      {
        title: "Microsoft Azure Architecture Center: Machine Learning Operations v2",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/machine-learning-operations-v2",
      },
      {
        title: "Microsoft Azure Architecture Center: MLOps Maturity Model",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/mlops-maturity-model",
      },
      {
        title: "Microsoft Learn: Azure Machine Learning model monitoring",
        url: "https://learn.microsoft.com/en-us/azure/machine-learning/concept-model-monitoring",
      },
      {
        title: "Microsoft Learn: Deploy models with managed online endpoints",
        url: "https://learn.microsoft.com/en-us/azure/machine-learning/how-to-deploy-online-endpoints",
      },
      {
        title: "Microsoft Learn: Continuous integration and delivery in Azure Data Factory",
        url: "https://learn.microsoft.com/en-us/azure/data-factory/continuous-integration-delivery",
      },
      {
        title: "Microsoft Learn: What is Bicep?",
        url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview",
      },
      {
        title:
          "Amershi et al. (2019): Software Engineering for Machine Learning – A Case Study (IEEE/ACM ICSE-SEIP)",
      },
      {
        title: "Testi et al. (2022): MLOps – A Taxonomy and a Methodology (IEEE Access, vol. 10)",
      },
      {
        title:
          "Díaz-de-Arcaya et al. (2024): A Joint Study of the Challenges, Opportunities, and Roadmap of MLOps and AIOps – A Systematic Survey (ACM Computing Surveys)",
      },
      {
        title: "John, Olsson & Bosch (2021): Towards MLOps – A Framework and Maturity Model (Euromicro SEAA)",
      },
      {
        title:
          "Recupito et al. (2022): A Multivocal Literature Review of MLOps Tools and Features (Euromicro SEAA)",
      },
      {
        title:
          "Ruf, Madan, Reich & Ould-Abdeslam (2021): Demystifying MLOps and Presenting a Recipe for the Selection of Open-Source Tools (Applied Sciences)",
      },
      {
        title:
          "Steidl, Felderer & Ramler (2023): The pipeline for the continuous development of artificial intelligence models (Journal of Systems and Software)",
      },
      {
        title:
          "Garg et al. (2021): On Continuous Integration / Continuous Delivery for Automated Deployment of Machine Learning Models using MLOps (IEEE AIKE)",
      },
      {
        title:
          "Polyzotis, Roy, Whang & Zinkevich (2017): Data Management Challenges in Production Machine Learning (ACM SIGMOD)",
      },
      {
        title:
          "Xin, Miao, Parameswaran & Polyzotis (2021): Production Machine Learning Pipelines – Empirical Analysis and Optimization Opportunities (ACM SIGMOD)",
      },
      {
        title:
          "Rahman, Farhana & Williams (2020): The “as code” activities – development anti-patterns for infrastructure as code (Empirical Software Engineering)",
      },
      {
        title:
          "Zhang & Jaskolka (2022): Conceptualizing the Secure Machine Learning Operations (SecMLOps) Paradigm (IEEE QRS)",
      },
      {
        title:
          "El Moutaouakal & Baïna (2023): Comparative experimentation of MLOps power on Microsoft Azure, AWS and Google Cloud Platform (IEEE CloudTech)",
      },
      {
        title: "Ebert, Gallardo, Hernantes & Serrano (2016): DevOps (IEEE Software, vol. 33, no. 3)",
      },
    ],

    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    keywords: [
      "MLOps",
      "Machine Learning Operations",
      "Microsoft Azure",
      "Azure Machine Learning",
      "MLOps Architektur",
      "CI/CD",
      "Infrastructure as Code",
      "Model Registry",
      "Model Monitoring",
      "Data Drift",
    ],
    metaTitle: "MLOps mit Microsoft Azure: Architektur, Umsetzung & Best Practices | smiit",
    metaDescription:
      "Wie Unternehmen ML-Modelle mit Microsoft Azure produktionsreif betreiben – MLOps-Architektur, CI/CD, Infrastructure as Code, Model Registry, Monitoring & Governance.",
  },

  en: {
    slug: "mlops-with-microsoft-azure",
    category: "analytics",
    datePublished: "2026-05-28",
    dateModified: "2026-05-28",
    author: "Sebastian Grab",
    title: "MLOps on Microsoft Azure: Running machine learning models securely, consistently and at scale",
    shortTitle: "MLOps on Microsoft Azure",
    excerpt:
      "Training a good model is just the beginning. How companies actually get ML models production-ready on Microsoft Azure — from the target architecture through CI/CD, infrastructure as code and a model registry to monitoring and governance.",
    ogImage: {
      url: "/og/blog-mlops.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – MLOps on Microsoft Azure",
    },
    coverImage: {
      url: "/assets/blog/mlops/mlops.webp",
      width: 2509,
      height: 944,
      alt: "MLOps as the combination of ML, Dev and Ops",
    },

    blocks: [
      { type: "heading", text: "Why machine learning often isn't production-ready without MLOps" },
      {
        type: "paragraph",
        text: "Many machine learning projects start with a promising prototype: a model is trained, the first metrics look good and the business value feels within reach. But the real challenge often only begins afterwards. A production ML system doesn't just have to be trained once — it has to work reliably over time. It needs to be versioned traceably, deployed securely, monitored continuously and updated when necessary.",
      },
      {
        type: "paragraph",
        text: "This is exactly where MLOps — Machine Learning Operations — comes in. MLOps combines principles from DevOps, data engineering and cloud operations with the specific requirements of machine learning systems. While classic software consists primarily of code and infrastructure, ML systems add further dimensions: training data, features, model artefacts, experiments, metrics, model versions and potential shifts in the data distribution during operation.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/mlops.webp",
        width: 2509,
        height: 944,
        alt: "MLOps as the combination of three cycles: ML (data, model), Dev (plan, build, test, release) and Ops (deploy, operate, monitor).",
        caption: "MLOps combines machine learning (ML) with the practices of Dev and Ops into one continuous loop.",
      },
      {
        type: "paragraph",
        text: "Sculley et al. (2015) show that ML systems can create particular technical debt when data dependencies, model behaviour, pipeline logic and monitoring are not managed cleanly. ML prototypes therefore often look more production-ready than they actually are. Without structured operational processes, the long-term result is high maintenance costs, model decisions that are hard to trace and risky manual interventions.",
        refs: [1],
      },
      {
        type: "paragraph",
        text: "Production-grade ML systems need their own tests, monitoring mechanisms and quality criteria. It is not enough to look only at model quality in a notebook. What matters is whether the entire system — data, training, deployment and operations — works robustly.",
        refs: [2, 11],
      },

      { type: "heading", text: "What MLOps means in practice" },
      {
        type: "paragraph",
        text: "MLOps describes a structured approach to developing, deploying, monitoring and evolving machine learning models across their entire lifecycle. The goal is to treat ML models not as isolated data science artefacts but as production software components that are integrated into business processes.",
        refs: [12, 13],
      },
      { type: "paragraph", text: "In practice, MLOps covers the following tasks in particular:" },
      {
        type: "grid",
        items: [
          { title: "Version data", description: "Provide training data automatically and version it traceably" },
          { title: "Reproducible training", description: "Run training automatically and repeatably" },
          { title: "Track experiments", description: "Document parameters, metrics and results end to end" },
          { title: "Model registry", description: "Manage models as versioned artefacts and release them in a controlled way" },
          { title: "CI/CD deployments", description: "Roll out deployments automatically and in a controlled way" },
          { title: "Monitoring", description: "Watch model, data and infrastructure quality" },
          { title: "Retraining", description: "Retrain models on drift or quality loss" },
          { title: "Security & governance", description: "Ensure access control, compliance and traceability" },
        ],
      },
      {
        type: "paragraph",
        text: "The key difference from classic DevOps is that it isn't only code that gets deployed. In MLOps, data, models, training environments and evaluation metrics also have to be controlled. MLOps can therefore be described as the combination of ML-specific workflows and operational DevOps practices.",
        refs: [3, 4, 24],
      },

      { type: "heading", text: "Why Microsoft Azure is a strong foundation for MLOps" },
      {
        type: "paragraph",
        text: "For MLOps, Microsoft Azure offers a strong advantage: the platform combines machine learning, data integration, cloud infrastructure, security, DevOps and monitoring in a single ecosystem. For companies that already use Microsoft technologies, Azure Machine Learning integrates well into existing cloud, data and governance structures.",
        refs: [23],
      },
      {
        type: "paragraph",
        text: "Microsoft describes the MLOps v2 architecture as a modular pattern with several phases: data estate, administration & setup, model development and model deployment. The exact shape depends on the scenario, but the underlying logic stays the same: data, models, infrastructure and deployment processes are connected through standardised architectural building blocks.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Another advantage is the combination with existing Azure services. These include Azure Machine Learning, Azure Data Lake Storage, Azure Data Factory, Azure DevOps, GitHub Actions, Azure Container Registry, Azure Key Vault, Azure Monitor, Log Analytics, Application Insights, Microsoft Entra ID and Azure Virtual Networks.",
      },
      {
        type: "paragraph",
        text: "This makes Azure especially suitable for companies that don't want to build ML as an isolated experimentation environment but as part of a production-ready, secure and scalable enterprise architecture.",
      },

      { type: "heading", text: "Target architecture: MLOps on Microsoft Azure" },
      {
        type: "paragraph",
        text: "A production-grade MLOps architecture on Microsoft Azure consists of several layers. It starts with infrastructure, runs through data, ML and release pipelines, and extends to operations, security and governance. The most important architectural idea is modularity: not every ML project needs the same technical depth. Some use cases only need a controlled model deployment, others require regular retraining, complex data pipelines or a complete end-to-end MLOps setup.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/pipelines.webp",
        width: 3767,
        height: 1272,
        maxWidth: 1040,
        alt: "End-to-end MLOps architecture: data source, data pipeline (data ingestion, preprocessing, feature engineering), feature store, ML pipeline (optimization, evaluation), model registry and release pipeline (packaging, validation, deployment, monitoring; CI/CD, CT) to the deployed model, with a trigger loop and data and code repositories.",
        caption: "Production ML systems as a closed loop – from the data pipeline through feature store, ML pipeline and model registry to the release pipeline, with a trigger for re-training.",
      },
      {
        type: "paragraph",
        text: "This shows that MLOps is not a linear process. Production ML systems form a closed loop of data provisioning, training, deployment, monitoring and continuous improvement.",
      },

      { type: "subheading", text: "1. Infrastructure" },
      {
        type: "paragraph",
        text: "Infrastructure is the technical foundation of the entire MLOps architecture. It ensures that data, training processes, model artefacts, deployments and monitoring components run in a controlled Azure environment.",
      },
      { type: "paragraph", text: "A typical infrastructure for MLOps on Azure looks like this:" },
      {
        type: "image",
        src: "/assets/blog/mlops/infrastructure.webp",
        width: 2744,
        height: 1325,
        maxWidth: 860,
        alt: "Azure MLOps infrastructure: Azure Machine Learning workspace with Azure Data Factory, compute cluster and compute instance, storage account, Key Vault, Container Registry and Application Insights, connected through private endpoints in a virtual network within a resource group.",
        caption: "A typical Azure infrastructure for MLOps — workspace, compute, storage, Key Vault, Container Registry and monitoring, secured through a virtual network and private endpoints.",
      },
      {
        type: "paragraph",
        text: "In production ML environments, infrastructure should not be created manually through the Azure Portal. Manual configurations are hard to reproduce, error-prone and quickly lead to drift between development, test and production environments. Instead, infrastructure should be defined as code and versioned.",
      },
      {
        type: "paragraph",
        text: "Microsoft describes Bicep as a declarative infrastructure-as-code language for Azure resources. Bicep files can be treated like application code, making infrastructure changes traceable, repeatable and more consistently deployable. For secure enterprise setups, network isolation matters too: Microsoft recommends securing the Azure Machine Learning workspace and connected resources via virtual networks and private endpoints, so that access to storage, container registry, key vault and other services stays controllable.",
        refs: [10, 21],
      },

      { type: "subheading", text: "2. Machine learning pipelines" },
      {
        type: "paragraph",
        text: "The actual ML processes sit on top of the infrastructure. They can be divided into three pipeline types: data pipeline, ML pipeline and release pipeline. Together they form the operational core of an MLOps architecture.",
      },
      {
        type: "paragraph",
        text: "The advantage of this separation is that each sub-process can be developed, tested, versioned and automated independently. At the same time, the pipelines can be connected so that an end-to-end process runs from raw data to the production model.",
      },

      { type: "subheading", text: "2.1 Data pipeline: providing data reliably" },
      {
        type: "paragraph",
        text: "The data pipeline ensures that raw data from different sources is transformed automatically into a form usable for machine learning. This includes ingestion, validation, transformation, cleaning, preprocessing and feature engineering.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/data-pipeline.webp",
        width: 2475,
        height: 904,
        alt: "Data pipeline: data from the data source is prepared through data ingestion, preprocessing and feature engineering and stored in the feature store; raw data is also kept in a data repository.",
        caption: "The data pipeline turns raw data from the data source into features for the feature store.",
      },
      {
        type: "paragraph",
        text: "On Microsoft Azure, a data pipeline can be implemented with different services depending on the starting point. Common options are Azure Data Factory, Microsoft Fabric Data Factory, Azure Synapse Pipelines or Azure Databricks. Which one makes sense depends on data volume, data sources, transformation logic, the existing data platform and operational requirements. Technically, a data pipeline should meet three requirements: it must be repeatable, versionable and environment-aware.",
      },
      {
        type: "bullets",
        items: [
          "Repeatable: training data should not be exported manually, adjusted locally and uploaded again. Instead, it is clearly defined which data is loaded from which sources and how it is transformed.",
          "Versionable: changes to data logic, transformations and pipeline configurations should be traceable through Git.",
          "Environment-aware: development, test and production environments often need different parameters, e.g. for storage accounts, database connections or secrets.",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning supports this approach through data assets. They point to data sources and store metadata without necessarily copying the data, so data sources can be used via versioned references — improving reproducibility and traceability. When Azure Data Factory is used, the data pipeline logic should also be embedded in a CI/CD process to move pipelines, datasets, data flows and other artefacts from development to test and production in a controlled way.",
        refs: [9, 19],
      },

      { type: "subheading", text: "2.2 ML pipeline: automating training, experiments and evaluation" },
      {
        type: "paragraph",
        text: "The ML pipeline handles the actual machine learning process. It uses the provided data or features, trains models, evaluates their quality and stores suitable model versions for later deployment.",
        refs: [17, 20],
      },
      {
        type: "image",
        src: "/assets/blog/mlops/ml-pipeline.webp",
        width: 2475,
        height: 904,
        alt: "Machine learning pipeline: features from the feature store run through experimentation, optimization and evaluation; the training code lives in the code repository, and the best model is registered in the model registry.",
        caption: "The ML pipeline trains, optimizes and evaluates models and registers the best one in the model registry.",
      },
      { type: "paragraph", text: "Typical steps of an ML pipeline are:" },
      {
        type: "bullets",
        items: [
          "Loading a defined data version",
          "Running preprocessing or feature steps",
          "Training one or more models",
          "Hyperparameter tuning",
          "Evaluation against technical and business metrics",
          "Comparison with existing model versions",
          "Registering the best model in the model registry",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning supports such workflows through pipelines, jobs, components, environments and compute resources. Pipelines can be created with the Azure ML CLI, the Python SDK or via Azure Machine Learning Studio. Components improve the reusability and flexibility of ML pipelines.",
      },
      {
        type: "paragraph",
        text: "A good ML pipeline should not just train a model but also decide whether that model is fit for deployment at all. For this, technical metrics such as accuracy, precision, recall, F1 score or RMSE are combined with business minimum requirements. Depending on the use case, fairness, robustness or stability metrics may also be relevant.",
      },
      {
        type: "paragraph",
        text: "A central component is the model registry. It forms the interface between the ML pipeline and the release pipeline. After training and evaluation, a model is not stored as a loose file but registered as a versioned artefact. The registry records which model version exists, which metrics were achieved and which metadata is associated with the model. Azure Machine Learning registries also enable the reuse and sharing of models, components and environments across multiple workspaces.",
      },

      { type: "subheading", text: "2.3 Release pipeline: deploying models in a controlled way" },
      {
        type: "paragraph",
        text: "The release pipeline moves an approved model from the model registry into a production environment. It is therefore the bridge between model development and operations.",
      },
      {
        type: "image",
        src: "/assets/blog/mlops/release-pipeline.webp",
        width: 2524,
        height: 509,
        alt: "Release pipeline: a model from the model registry runs through packaging, validation, deployment and monitoring via CI/CD and continuous training (CT) and is provided as a deployed model.",
        caption: "The release pipeline takes an approved model into production in a controlled way via CI/CD.",
      },
      { type: "paragraph", text: "Typical tasks of the release pipeline are:" },
      {
        type: "bullets",
        items: [
          "Selecting an approved model version",
          "Packaging the model including dependencies",
          "Defining or reusing an Azure ML environment",
          "Creating or updating an endpoint",
          "Running smoke tests or test inference",
          "Deploying to a test or production environment",
          "Approval process with approval gates",
          "Rollback in case of failure",
        ],
      },
      {
        type: "paragraph",
        text: "In Azure Machine Learning, models can be deployed via managed online endpoints or batch endpoints, among others. Managed online endpoints are suited to real-time inference over HTTPS endpoints and are fully managed by Azure — including infrastructure, scaling, security and monitoring. Batch endpoints, by contrast, suit larger, time-shifted prediction runs, for example when forecasts for many records are produced regularly and then processed further in a data warehouse, data lake or BI system.",
        refs: [8],
      },
      {
        type: "paragraph",
        text: "A professional release pipeline should clearly separate business model logic from operational deployment logic. The model logic lives in training code, feature engineering and the scoring_file.py, for example. The operational logic lives in YAML files, environment definitions, endpoint configurations, pipeline files and deployment parameters. This separation makes the process more maintainable: data scientists can work on models and features, while MLOps engineers standardise deployment, infrastructure, security and automation.",
      },

      { type: "subheading", text: "3. Operations, security and governance" },
      {
        type: "paragraph",
        text: "Operations begin after deployment. A production ML system must not only be available but continuously monitored, secured and evolved in a controlled way.",
      },
      { type: "paragraph", text: "Operations in particular includes:" },
      {
        type: "bullets",
        items: [
          "Monitoring endpoints, latency, error rates and resource usage",
          "Monitoring model metrics",
          "Detecting data drift and prediction drift",
          "Monitoring data quality",
          "Cost control and alerting",
          "Retraining triggers",
          "Documentation and regular reviews",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning offers model monitoring with built-in signals for tabular data, including data drift, prediction drift, data quality, feature attribution drift and model performance. For online endpoints, Azure Machine Learning can automatically capture production inference data and use it for continuous monitoring.",
        refs: [7],
      },
      {
        type: "paragraph",
        text: "Security and governance should not be added afterwards but be part of the architecture. This includes role-based access control, managed identities, secure secret management, encryption, network isolation, logging, auditability and clear approval processes. Managed identities are especially important because they let compute resources access other Azure services without hard-coded credentials — for example to retrieve connection information from Key Vault or pull Docker images from Azure Container Registry. This turns MLOps not just into a technical automation approach but into a governance model for production AI systems.",
        refs: [22],
      },

      { type: "heading", text: "Technical implementation: how an Azure MLOps pipeline is built in practice" },
      {
        type: "paragraph",
        text: "Once the target architecture is defined, the practical question follows: how do you actually implement such an MLOps structure? A robust implementation pursues three goals. First, recurring tasks should be automated. Second, infrastructure, data logic, training code and deployments should be versioned. Third, the process should stay modular enough that different ML use cases aren't forced into a rigid architecture.",
      },

      { type: "subheading", text: "1. Repository structure" },
      {
        type: "paragraph",
        text: "A sensible starting point is a clear repository structure. Depending on team size, it can be a monorepo or a set of separate repositories. An example structure might look like this:",
      },
      {
        type: "filetree",
        nodes: [
          {
            type: "folder",
            name: "mlops-project",
            defaultOpen: true,
            children: [
              {
                type: "folder",
                name: "infrastructure",
                note: "Infrastructure as code (Bicep) + parameters per environment",
                children: [
                  { type: "file", name: "main.bicep" },
                  { type: "file", name: "parameters.dev.json" },
                  { type: "file", name: "parameters.test.json" },
                  { type: "file", name: "parameters.prod.json" },
                ],
              },
              {
                type: "folder",
                name: "data-pipeline",
                note: "Data Factory artefacts: pipelines, datasets, linked services",
                children: [
                  { type: "folder", name: "pipelines", children: [] },
                  { type: "folder", name: "datasets", children: [] },
                  { type: "folder", name: "linked-services", children: [] },
                  { type: "folder", name: "arm-parameters", children: [] },
                ],
              },
              {
                type: "folder",
                name: "training",
                note: "ML pipeline: components, training and evaluation code",
                children: [
                  { type: "folder", name: "components", note: "Reusable pipeline components", children: [] },
                  { type: "file", name: "pipeline.yml" },
                  { type: "file", name: "train.py" },
                  { type: "file", name: "evaluate.py" },
                  { type: "file", name: "environment.yml" },
                ],
              },
              {
                type: "folder",
                name: "deployment",
                note: "Model deployment: endpoint, scoring, environment",
                children: [
                  { type: "file", name: "endpoint.yml" },
                  { type: "file", name: "deployment.yml" },
                  { type: "file", name: "scoring_file.py" },
                  { type: "file", name: "test_input.json" },
                  {
                    type: "folder",
                    name: "environment",
                    note: "Container definition for the deployment",
                    children: [
                      { type: "file", name: "Dockerfile" },
                      { type: "file", name: "conda_dependencies.yml" },
                    ],
                  },
                ],
              },
              {
                type: "folder",
                name: "pipelines",
                note: "CI/CD definitions for all areas",
                children: [
                  { type: "file", name: "deploy-infrastructure.yml" },
                  { type: "file", name: "deploy-data-pipeline.yml" },
                  { type: "file", name: "run-training-pipeline.yml" },
                  { type: "file", name: "deploy-model.yml" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "This structure separates four areas of responsibility: infrastructure, data integration, training and deployment. Individual components can evolve independently while the overall process stays standardised.",
      },
      {
        type: "paragraph",
        text: "We provide the complete, runnable example code in two open repositories — one for the infrastructure and one for the pipelines:",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-iac-with-bicep",
        description: "Infrastructure as code for Azure with Bicep – provision the workspace, storage, container registry, Key Vault, compute and networking reproducibly.",
        url: "https://github.com/smiit-GmbH/azure-iac-with-bicep",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-mlops",
        description: "Data, ML and release pipelines for Azure Machine Learning, including CI/CD deployment.",
        url: "https://github.com/smiit-GmbH/azure-mlops",
      },

      { type: "subheading", text: "2. Infrastructure as code with Bicep or Terraform" },
      {
        type: "paragraph",
        text: "Infrastructure should be provisioned automatically. This typically includes a resource group, Azure Machine Learning workspace, storage account or data lake, Azure Container Registry, Azure Key Vault, Application Insights, Log Analytics workspace, compute cluster, managed identities, private endpoints and network rules.",
      },
      {
        type: "paragraph",
        text: "Bicep is particularly well suited when companies work heavily in the Azure ecosystem. Its syntax is more compact than classic ARM templates yet stays fully compatible with Azure Resource Manager, since Bicep is transpiled to ARM JSON during deployment. A typical IaC process looks like this:",
      },
      {
        type: "flow",
        steps: [
          "Commit to infrastructure files",
          "Pull request",
          "Automatic validation",
          "Deployment to development",
          "Optional approval",
          "Deployment to test",
          "Optional approval",
          "Deployment to production",
        ],
      },
      {
        type: "paragraph",
        text: "The benefit lies not only in automation but in traceability. Every infrastructure change is versioned, reviewable and easier to roll back in case of failure.",
      },

      { type: "subheading", text: "3. CI/CD flow for data pipelines" },
      {
        type: "paragraph",
        text: "When Azure Data Factory or Fabric Data Factory is used, the data pipeline should also be deployed via CI/CD. Pipeline definitions, datasets, linked services and triggers are not adjusted manually in every environment but promoted in a controlled way.",
      },
      {
        type: "flow",
        steps: [
          "Feature branch",
          "Change to data pipeline logic",
          "Pull request",
          "Validation of pipeline artefacts",
          "Export as ARM template",
          "Deployment to dev",
          "Deployment to test",
          "Deployment to prod",
        ],
      },
      {
        type: "paragraph",
        text: "In production environments it is also important to handle triggers carefully. Before a deployment, active triggers should be stopped and restarted after a successful deployment. Microsoft provides sample scripts for these pre- and post-deployment steps.",
      },

      { type: "subheading", text: "4. CI/CD flow for ML pipelines" },
      {
        type: "paragraph",
        text: "The ML pipeline should also be runnable automatically. The process usually starts with a change to the training code, a component or the pipeline configuration.",
      },
      {
        type: "flow",
        steps: [
          "Commit to training code or pipeline YAML",
          "Pull request",
          "Linting and tests",
          "Validation of Azure ML configurations",
          "Run the training pipeline",
          "Evaluate the model metrics",
          "Register the model",
          "Tag the model version",
        ],
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning supports YAML-based configurations for jobs and pipelines: Azure ML entities can be defined via schematised YAML files and created through the Azure ML CLI. The benefit is that pipeline definitions can be treated like code — changes go through pull requests, can be validated automatically and run reproducibly later. An ML pipeline should also not push every model to production automatically, but only register or mark a model version for release when defined quality criteria are met.",
        refs: [18],
      },

      { type: "subheading", text: "5. Release pipeline for online or batch deployment" },
      {
        type: "paragraph",
        text: "The release pipeline handles the controlled deployment of a registered model, bringing together the model version, environment, endpoint configuration and deployment parameters. For an online endpoint you typically need the registered model, scoring_file.py, an environment or Docker image, endpoint and deployment configuration, test data for smoke tests, monitoring configuration and approval rules.",
      },
      {
        type: "flow",
        steps: [
          "Select a model version from the registry",
          "Validate the deployment configuration",
          "Build or select the environment",
          "Deploy to test",
          "Smoke test",
          "Approval",
          "Deploy to production",
          "Activate monitoring",
        ],
      },
      {
        type: "paragraph",
        text: "Managed online endpoints are particularly useful when a model is integrated into applications, workflows or platforms via an API. Batch endpoints make sense when predictions are produced regularly for large data volumes, e.g. for forecasting, scoring or background classification. The endpoint decision should therefore not be made in technical isolation but depend on the business process: if the result has to be available immediately, an online endpoint is the better fit; if it is processed periodically, a batch endpoint is often simpler and more cost-efficient.",
      },

      { type: "subheading", text: "6. Monitoring and retraining triggers" },
      {
        type: "paragraph",
        text: "The MLOps process does not end with deployment. A model can degrade over time even if nothing changes in the code. Causes include shifting data distributions, new user behaviour, changed business processes or external market conditions. Monitoring should therefore cover several levels: technical availability, latency and error rates, resource usage and cost, data quality, data drift, prediction drift, model performance and business outcome quality.",
      },
      {
        type: "paragraph",
        text: "Azure Machine Learning model monitoring supports built-in signals such as data drift, prediction drift, data quality and model performance. This makes changes visible before they cause larger business problems. A complete MLOps loop can look like this:",
      },
      {
        type: "flow",
        steps: [
          "Model runs in production",
          "Monitoring detects drift or quality loss",
          "An alert is triggered",
          "Retraining starts manually or automatically",
          "A new model is trained",
          "The model is evaluated",
          "The model is registered",
          "The release pipeline deploys the new version",
        ],
      },
      {
        type: "paragraph",
        text: "Not every company should run fully automated retraining from the start. In many cases a controlled human-in-the-loop process is more sensible: monitoring raises an alert, a data science or MLOps team assesses the cause and then decides on retraining or deployment.",
      },

      { type: "heading", text: "MLOps maturity: not everything needs full automation right away" },
      {
        type: "paragraph",
        text: "A common mistake is to think of MLOps straight away as a complete enterprise platform. For many companies, a step-by-step build-up makes more sense. Microsoft's MLOps Maturity Model describes MLOps as a maturity process and helps to build capabilities gradually, assess the current state, identify gaps and plan the next sensible step. A pragmatic maturity path can look like this:",
        refs: [6, 14],
      },
      {
        type: "maturity",
        items: [
          { level: 0, label: "Manual ML processes" },
          { level: 1, label: "Versioned code and defined data sources" },
          { level: 2, label: "Automated training" },
          { level: 3, label: "Standardised deployment" },
          { level: 4, label: "Monitoring and controlled retraining" },
          { level: 5, label: "Fully integrated MLOps platform" },
        ],
      },
      {
        type: "paragraph",
        text: "For many organisations, real progress is already made when code, data, models and deployments are versioned cleanly and manual deployment steps are reduced. Fully automated retraining, canary deployments or organisation-wide model registries can be added later.",
      },

      { type: "heading", text: "Best practices for Azure MLOps" },
      {
        type: "numbered",
        items: [
          { title: "Treat models like production software", description: "A model is not a notebook result but a production artefact with versioning, tests, approval processes, deployment strategies and monitoring." },
          { title: "Consider data, code and model versions together", description: "Reproducibility only emerges when it is clear which data version, code state, parameters and model version belong together." },
          { title: "Build pipelines modularly", description: "The data pipeline, ML pipeline and release pipeline should be separate but integrable, so teams can reuse components and automate use cases to different degrees." },
          { title: "Use infrastructure as code consistently", description: "Cloud infrastructure should not be maintained manually. IaC ensures consistent environments, versioned changes and reproducible deployments." },
          { title: "Integrate security early", description: "Access rights, managed identities, Key Vault, private endpoints, logging and network isolation don't belong just before go-live." },
          { title: "Extend monitoring to the model and data level", description: "CPU, RAM and availability aren't enough for ML systems — data quality, drift, model metrics and business outcome quality must be monitored too." },
          { title: "Balance standardisation and flexibility", description: "Standardise infrastructure, deployment, security, monitoring and governance; keep model choice, feature engineering, business metrics and use-case-specific logic flexible." },
        ],
      },

      { type: "heading", text: "Conclusion: MLOps makes machine learning production-ready" },
      {
        type: "paragraph",
        text: "Machine learning delivers its value not in the prototype but in production. For that, training a good model is not enough. Companies need reproducible data pipelines, automated training processes, controlled deployments, versioned models, monitoring, security and governance.",
      },
      {
        type: "paragraph",
        text: "Microsoft Azure offers a powerful platform for this. Azure Machine Learning, Azure DevOps, GitHub Actions, Bicep, Key Vault, managed identities, Azure Monitor and Azure data services can be combined into a robust MLOps architecture. The decisive success factor, however, is not just the technology but the right architecture: a good MLOps framework standardises recurring operational processes without restricting the business flexibility of individual ML projects. That turns isolated ML prototypes into a scalable, secure and maintainable foundation for production AI applications.",
      },
    ],

    faq: [
      {
        question: "What is the difference between MLOps and DevOps?",
        answer:
          "DevOps automates the delivery of code and infrastructure. MLOps applies the same principles to machine learning, but has to manage extra moving parts: training data, features, model artefacts, experiments, hyperparameters and evaluation metrics. The key difference is that an ML system can degrade without anyone touching the code, because the data distribution in the real world shifts (data drift). So MLOps covers not just build and deploy pipelines, but also data versioning, reproducible training, a model registry and monitoring that watches data and model quality and can trigger retraining.",
      },
      {
        question: "Where should you start with MLOps?",
        answer:
          "Not with a full platform, but along a maturity path. The biggest early win is usually unglamorous but powerful: version code, data sources, models and deployments cleanly, and reduce manual deployment steps. That alone makes results reproducible and hand-offs between data science and operations reliable. Automated training, standardised deployment, monitoring with retraining and finally a fully integrated platform are added step by step — driven by concrete use cases rather than a maximal build-out nobody needs.",
      },
      {
        question: "Which Azure services do you need for MLOps?",
        answer:
          "The core is the Azure Machine Learning workspace, which bundles experiments, pipelines, models, environments, compute and deployments. It is typically complemented by Azure Data Lake Storage for data and artefacts, Azure Container Registry for images, Azure Key Vault for secrets, Azure Monitor with Log Analytics and Application Insights for monitoring, and Azure DevOps or GitHub Actions for CI/CD. The infrastructure itself is described as code with Bicep or Terraform, and data preparation runs on Azure Data Factory, Microsoft Fabric or Azure Databricks depending on the platform. Which building blocks you actually need depends on the use case — not every project needs everything.",
      },
      {
        question: "What is a model registry and why is it so central?",
        answer:
          "The model registry is the versioned catalogue of all models and the interface between training and production deployment. Instead of storing a model as a loose file, it is registered as an artefact — including its version, the metrics it achieved and its metadata. That makes it traceable which model version came from which data and which code state, and it enables controlled releases and rollbacks. In Azure Machine Learning, registries also let you share models across multiple workspaces — important when development, test and production are separated or several teams use the same components.",
      },
      {
        question: "Online endpoint or batch endpoint — when do you use which?",
        answer:
          "The decision follows the business process, not the technology. A managed online endpoint serves real-time predictions over an HTTPS API — right when the result is needed immediately, e.g. in an app or workflow. A batch endpoint processes large volumes on a schedule — right when many records are scored regularly and written to a data warehouse or BI system, e.g. for forecasting or scoring. Online endpoints incur continuous hosting cost; batch endpoints run only on demand and are often more cost-efficient.",
      },
      {
        question: "What is data drift and how does monitoring work?",
        answer:
          "Data drift is the change of input data in production compared with the training data; prediction drift is the change in the model's outputs. Both can slowly degrade a model even though the code is unchanged — for example through new user behaviour or changed business processes. Classic infrastructure monitoring (CPU, RAM, availability) isn't enough for that. Azure Machine Learning offers model monitoring with signals for data drift, prediction drift, data quality and model performance, and can capture production inference data automatically. Degradation becomes visible before it gets expensive — and can trigger an alert or retraining.",
      },
      {
        question: "Should you automate retraining?",
        answer:
          "Not necessarily from the start. Fully automated retraining is powerful but risky if nobody checks why a model degraded. In many cases a human-in-the-loop process is wiser: monitoring raises an alert, a data science or MLOps team assesses the cause and then decides on retraining and deployment. Automation pays off where drift is frequent, well understood and reliably gated by clear quality criteria. In both cases, a new model should only be released once it meets defined metric thresholds — not automatically, just because it is newer.",
      },
      {
        question: "How do you handle security and governance for ML systems?",
        answer:
          "Security belongs in the architecture, not bolted on afterwards. That includes role-based access, managed identities (so compute can reach other services without hard-coded credentials), secure secret management via Key Vault, encryption, network isolation through virtual networks and private endpoints, plus end-to-end logging and auditability. Governance adds traceable model versions, clear approval processes with approval gates and documented responsibilities. That turns MLOps from a pure automation approach into a governance model for production AI — a decisive factor especially in regulated industries.",
      },
      {
        question: "What team or roles does MLOps require?",
        answer:
          "MLOps relies on the clean separation of two roles that work together: data scientists own model logic, features and business metrics; MLOps engineers standardise deployment, infrastructure, security and automation. It doesn't require a large team — in SMEs a few people often cover both roles. What matters is not team size but that model work and operations are decoupled through clear interfaces — such as the model registry and versioned pipelines — so both sides can work independently.",
      },
    ],

    sources: [
      {
        title: "Sculley et al. (2015): Hidden Technical Debt in Machine Learning Systems",
        url: "https://papers.neurips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf",
      },
      {
        title: "Breck et al. (2017): The ML Test Score – A Rubric for ML Production Readiness",
        url: "https://research.google.com/pubs/archive/aad9f93b86b7addfea4c419b9100c6cdd26cacea.pdf",
      },
      {
        title: "Kreuzberger, Kühl & Hirschl (2023): Machine Learning Operations (MLOps) – Overview, Definition, and Architecture",
        url: "https://arxiv.org/abs/2205.02302",
      },
      {
        title: "Symeonidis et al. (2022): MLOps – Definitions, Tools and Challenges",
        url: "https://arxiv.org/abs/2201.00162",
      },
      {
        title: "Microsoft Azure Architecture Center: Machine Learning Operations v2",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/machine-learning-operations-v2",
      },
      {
        title: "Microsoft Azure Architecture Center: MLOps Maturity Model",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/mlops-maturity-model",
      },
      {
        title: "Microsoft Learn: Azure Machine Learning model monitoring",
        url: "https://learn.microsoft.com/en-us/azure/machine-learning/concept-model-monitoring",
      },
      {
        title: "Microsoft Learn: Deploy models with managed online endpoints",
        url: "https://learn.microsoft.com/en-us/azure/machine-learning/how-to-deploy-online-endpoints",
      },
      {
        title: "Microsoft Learn: Continuous integration and delivery in Azure Data Factory",
        url: "https://learn.microsoft.com/en-us/azure/data-factory/continuous-integration-delivery",
      },
      {
        title: "Microsoft Learn: What is Bicep?",
        url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview",
      },
      {
        title:
          "Amershi et al. (2019): Software Engineering for Machine Learning – A Case Study (IEEE/ACM ICSE-SEIP)",
      },
      {
        title: "Testi et al. (2022): MLOps – A Taxonomy and a Methodology (IEEE Access, vol. 10)",
      },
      {
        title:
          "Díaz-de-Arcaya et al. (2024): A Joint Study of the Challenges, Opportunities, and Roadmap of MLOps and AIOps – A Systematic Survey (ACM Computing Surveys)",
      },
      {
        title: "John, Olsson & Bosch (2021): Towards MLOps – A Framework and Maturity Model (Euromicro SEAA)",
      },
      {
        title:
          "Recupito et al. (2022): A Multivocal Literature Review of MLOps Tools and Features (Euromicro SEAA)",
      },
      {
        title:
          "Ruf, Madan, Reich & Ould-Abdeslam (2021): Demystifying MLOps and Presenting a Recipe for the Selection of Open-Source Tools (Applied Sciences)",
      },
      {
        title:
          "Steidl, Felderer & Ramler (2023): The pipeline for the continuous development of artificial intelligence models (Journal of Systems and Software)",
      },
      {
        title:
          "Garg et al. (2021): On Continuous Integration / Continuous Delivery for Automated Deployment of Machine Learning Models using MLOps (IEEE AIKE)",
      },
      {
        title:
          "Polyzotis, Roy, Whang & Zinkevich (2017): Data Management Challenges in Production Machine Learning (ACM SIGMOD)",
      },
      {
        title:
          "Xin, Miao, Parameswaran & Polyzotis (2021): Production Machine Learning Pipelines – Empirical Analysis and Optimization Opportunities (ACM SIGMOD)",
      },
      {
        title:
          "Rahman, Farhana & Williams (2020): The “as code” activities – development anti-patterns for infrastructure as code (Empirical Software Engineering)",
      },
      {
        title:
          "Zhang & Jaskolka (2022): Conceptualizing the Secure Machine Learning Operations (SecMLOps) Paradigm (IEEE QRS)",
      },
      {
        title:
          "El Moutaouakal & Baïna (2023): Comparative experimentation of MLOps power on Microsoft Azure, AWS and Google Cloud Platform (IEEE CloudTech)",
      },
      {
        title: "Ebert, Gallardo, Hernantes & Serrano (2016): DevOps (IEEE Software, vol. 33, no. 3)",
      },
    ],

    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    keywords: [
      "MLOps",
      "Machine Learning Operations",
      "Microsoft Azure",
      "Azure Machine Learning",
      "MLOps architecture",
      "CI/CD",
      "Infrastructure as Code",
      "Model Registry",
      "Model Monitoring",
      "Data Drift",
    ],
    metaTitle: "MLOps on Microsoft Azure: Architecture, Implementation & Best Practices | smiit",
    metaDescription:
      "How companies run ML models in production on Microsoft Azure — MLOps architecture, CI/CD, infrastructure as code, model registry, monitoring and governance.",
  },
}

// ---------------------------------------------------------------------------
// Post: Plattformökonomie für IT-Dienstleister
// ---------------------------------------------------------------------------

const platformEconomy: LocalizedBlogPost = {
  de: {
    slug: "platform-economy-for-it-service-providers",
    category: "apps",
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    author: "Noah Neßlauer",
    title:
      "Plattformökonomie für IT-Dienstleister: Wie aus Projektgeschäft skalierbare Softwareprodukte werden",
    shortTitle: "Plattformökonomie für IT-Dienstleister",
    excerpt:
      "Ein gutes Softwareprodukt zu entwickeln ist nur der Anfang. Wie IT-Dienstleister aus projektbasiertem Geschäft skalierbare SaaS- und Plattformprodukte machen – und warum über den Erfolg selten die Technologie allein entscheidet, sondern Strategie, Organisation, Vertrieb und Timing.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Plattformökonomie für IT-Dienstleister",
    },
    coverImage: {
      url: "/assets/blog/platform-economy/platform.webp",
      width: 2499,
      height: 942,
      alt: "Die Plattform als Zusammenspiel der vier Handlungsfelder Strategie, Organisation, Technologie und Vertrieb.",
    },

    blocks: [
      { type: "heading", text: "Warum aus guter Software noch kein skalierbares Geschäft wird" },
      {
        type: "paragraph",
        text: "Ein gutes Softwareprodukt zu entwickeln, ist nur der Anfang. Entscheidend ist, ob daraus ein skalierbares Geschäftsmodell entsteht: mit einer klaren Zielgruppe, wiederkehrenden Umsätzen, belastbarer Positionierung und einem Vertrieb, der nicht bei jedem neuen Kunden wieder bei null beginnt.",
      },
      {
        type: "paragraph",
        text: "Viele IT-Dienstleister kennen die Ausgangslage: Das Projektgeschäft läuft, Kunden schätzen die individuelle Umsetzung und die Nachfrage ist grundsätzlich vorhanden. Gleichzeitig bleibt Wachstum eng an verfügbare Mitarbeitende gebunden. Mehr Umsatz bedeutet meist mehr Projektstunden, mehr Abstimmung und mehr operative Komplexität.",
      },
      {
        type: "paragraph",
        text: "Eine SaaS- oder Plattformlösung kann diesen Zusammenhang verändern. Sie ersetzt individuelle Leistungen zwar nicht vollständig, baut die variablen Kosten jedoch ab und generiert wiederkehrende Umsätze. Der Weg dorthin ist jedoch deutlich anspruchsvoller als lediglich eine bestehende Dienstleistung zu „produktisieren“.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag zeigt, welche Faktoren für IT-Dienstleister bei der Einführung plattformbasierter Softwareprodukte besonders relevant sind – und warum Technologie allein selten über den Erfolg entscheidet.",
      },

      { type: "heading", text: "Warum das Projektgeschäft an Skalierungsgrenzen stößt" },
      {
        type: "paragraph",
        text: "Klassische IT-Dienstleistungen sind wertvoll, aber nur begrenzt skalierbar. Der Umsatz eines Beratungs-, Entwicklungs- oder Datenanalyseprojekts ist in der Regel unmittelbar an Arbeitszeit gebunden: Konzeption, Entwicklung, Abstimmung, Betrieb und Support.",
      },
      {
        type: "paragraph",
        text: "Das schafft Nähe zum Kunden und ermöglicht individuelle Lösungen. Gleichzeitig entstehen variable Kosten mit jedem weiteren Auftrag. Wachstum erfordert zusätzliche Kapazitäten, qualifizierte Mitarbeitende und eine Organisation, die mit zunehmender Projektzahl komplexer wird.",
      },
      {
        type: "paragraph",
        text: "Digitale Produkte funktionieren wirtschaftlich anders. Ihre Entwicklung, Wartung und der Aufbau einer sicheren Betriebsumgebung verursachen zunächst hohe Fixkosten. Ist das Produkt jedoch einmal verfügbar, können zusätzliche Nutzer häufig mit geringen Grenzkosten bedient werden. Genau darin liegt das Skalierungspotenzial von Software-as-a-Service- und Plattformmodellen.",
        refs: [1, 2],
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/cost-development.webp",
        width: 3200,
        height: 1413,
        maxWidth: 940,
        alt: "Diagramm: Skalierungspotenzial über Wachstum bzw. Kundenzahl. Das Projektgeschäft verläuft linear, da der Umsatz an Arbeitszeit gekoppelt ist und die variablen Kosten je Projekt steigen; die SaaS-/Plattformkurve steigt nach hohen Anfangs-Fixkosten und geringen Grenzkosten überproportional an.",
        caption: "Skalierung im Vergleich: Im Projektgeschäft ist der Umsatz an Arbeitszeit gekoppelt und die variablen Kosten steigen mit jedem Projekt. SaaS- und Plattformmodelle haben hohe Anfangs-Fixkosten, danach aber geringe Grenzkosten – und damit deutlich mehr Skalierungspotenzial.",
      },
      {
        type: "paragraph",
        text: "Das bedeutet nicht, dass ein SaaS-Produkt automatisch profitabel wird. Im Gegenteil: Die Vorleistung verschiebt sich. Während im Projektgeschäft einzelne Kundenaufträge früh Umsatz erzeugen, müssen Plattformanbieter häufig zunächst in Produktentwicklung, Markteintritt, Vertrieb, Sicherheit und Betriebsfähigkeit investieren.",
        refs: [3],
      },
      {
        type: "paragraph",
        text: "Die zentrale Frage lautet daher nicht: „Können wir diese Software entwickeln?“ Sondern: „Können wir ein standardisiertes Produkt so positionieren, finanzieren und vertreiben, dass es dauerhaft von vielen Kunden genutzt wird?“",
      },

      { type: "heading", text: "Was Plattformökonomie im B2B-Kontext bedeutet" },
      {
        type: "paragraph",
        text: "Der Begriff Plattform wird häufig mit großen Marktplätzen wie Amazon, Airbnb oder Uber verbunden. Diese Beispiele stehen für sogenannte Transaktionsplattformen: Sie bringen zwei oder mehr Marktseiten zusammen, etwa Anbieter und Nachfrager, und profitieren von Vermittlung, Provisionen oder Werbung.",
        refs: [4],
      },
      {
        type: "paragraph",
        text: "Für IT-Dienstleister ist jedoch eine breitere Perspektive relevant. Plattformökonomie beschreibt Geschäftsmodelle, bei denen digitale Infrastruktur, standardisierte Leistungen und wiederholbare Prozesse einen überproportionalen Skalierungseffekt ermöglichen.",
        refs: [5],
      },
      { type: "paragraph", text: "Dabei lassen sich unter anderem vier Typen unterscheiden:" },
      {
        type: "grid",
        items: [
          { title: "Transaktionsplattformen", description: "Vermitteln zwischen unterschiedlichen Marktseiten, etwa Kunden, Dienstleistern oder Lieferanten." },
          { title: "Innovationsplattformen", description: "Schaffen Ökosysteme, auf denen Dritte eigene Lösungen entwickeln oder vertreiben können, beispielsweise App Stores." },
          { title: "Integrationsplattformen", description: "Verbinden unterschiedliche Systeme, Datenquellen und Anwendungen." },
          { title: "SaaS-Plattformen", description: "Stellen standardisierte Software über eine zentrale, vom Anbieter betriebene Infrastruktur bereit." },
        ],
      },
      {
        type: "paragraph",
        text: "Für viele kleinere und mittelständische IT-Dienstleister ist vor allem der letzte Typ relevant. Ein spezialisiertes SaaS-Produkt kann beispielsweise Reporting, Projektsteuerung, Datenintegration, Dokumentenmanagement oder branchenspezifische Prozesse standardisieren.",
        refs: [6, 7, 8, 9],
      },
      {
        type: "paragraph",
        text: "Der Unterschied zur Individualentwicklung liegt nicht nur in der Bereitstellung über die Cloud. Entscheidend ist die Produktlogik: Statt einzelne Kundenanforderungen vollständig neu umzusetzen, wird ein wiederverwendbarer Kern geschaffen, der für eine klar definierte Zielgruppe ausreichend wertvoll ist.",
      },

      { type: "heading", text: "SaaS ist nicht automatisch eine Plattform" },
      {
        type: "paragraph",
        text: "Nicht jedes cloudbasierte Softwareprodukt ist automatisch eine Plattform. Gerade im B2B-Bereich werden die Begriffe häufig vermischt.",
      },
      {
        type: "paragraph",
        text: "Eine klassische Plattform profitiert typischerweise von Netzwerkeffekten: Der Nutzen für einzelne Nutzer steigt, wenn weitere Nutzer, Anbieter, Partner oder Integrationen hinzukommen. Bei Marktplätzen ist dieser Zusammenhang besonders sichtbar. Je mehr Anbieter aktiv sind, desto attraktiver wird die Plattform für Kunden – und umgekehrt.",
      },
      {
        type: "paragraph",
        text: "Bei SaaS-Produkten sind diese Effekte oft schwächer ausgeprägt. Eine Buchhaltungssoftware wird nicht zwangsläufig besser, nur weil viele andere Unternehmen sie nutzen. Dennoch können auch SaaS-Produkte Plattformcharakter entwickeln:",
        refs: [2],
      },
      {
        type: "grid",
        items: [
          { title: "Mehrere Nutzergruppen", description: "Das Produkt verbindet mehrere interne oder externe Nutzergruppen miteinander." },
          { title: "Standardisierte Prozesse", description: "Es standardisiert Abläufe zwischen Unternehmen und macht sie wiederholbar." },
          { title: "Software-Ökosystem", description: "Über Schnittstellen wird es Teil eines wachsenden Ökosystems aus Anwendungen." },
          { title: "Wertvolle Integrationen", description: "Zusätzliche Integrationen erhöhen den Nutzen für bestehende Kunden." },
          { title: "Daten & Partner", description: "Daten, Partner und ergänzende Anwendungen machen das Produkt langfristig attraktiver." },
        ],
      },
      {
        type: "paragraph",
        text: "Gerade in spezialisierten B2B-Nischen kann daher ein Produkt erfolgreich sein, ohne sofort starke Netzwerkeffekte wie ein Marktplatz zu benötigen. Entscheidend ist zunächst ein klarer, wiederholbarer Kundennutzen.",
      },

      { type: "heading", text: "Der Wechsel von Auftragsarbeit zu Produktverantwortung" },
      {
        type: "paragraph",
        text: "Die größte Veränderung beim Aufbau eines Softwareprodukts ist meist nicht technisch. Sie betrifft das Denken und Handeln des Unternehmens.",
      },
      {
        type: "paragraph",
        text: "Im Projektgeschäft beschreibt der Kunde häufig das gewünschte Ergebnis. Der IT-Dienstleister analysiert die Anforderungen, entwickelt eine individuelle Lösung und rechnet die Leistung ab. Der Bedarf ist bereits konkret, der Vertrieb basiert stark auf Vertrauen, Referenzen und persönlicher Beratung.",
        refs: [10],
      },
      { type: "paragraph", text: "Im Plattformgeschäft ist die Ausgangslage anders. Das Unternehmen muss selbst entscheiden:" },
      {
        type: "bullets",
        items: [
          "Welches Problem wird für welche Zielgruppe gelöst?",
          "Welche Anforderungen gehören in den Produktkern?",
          "Welche Kundenwünsche bleiben bewusst außerhalb des Standards?",
          "Wie wird der Mehrwert verständlich kommuniziert?",
          "Welche Preislogik ist für Kunden nachvollziehbar und für den Anbieter tragfähig?",
          "Welche Funktionen erhöhen den Nutzen vieler Kunden – und welche erzeugen nur Einzelfallaufwand?",
        ],
      },
      {
        type: "paragraph",
        text: "Damit verschiebt sich die Rolle des Dienstleisters. Er wird vom Umsetzer zum Produktunternehmen. Das erfordert eine klare Vision, die Fähigkeit zur Priorisierung und den Mut, nicht jede Kundenanforderung individuell zu bedienen.",
      },
      {
        type: "paragraph",
        text: "Gerade für etablierte Dienstleister kann dieser Wandel anspruchsvoll sein. Bestehende Kundenprojekte erzeugen kurzfristig Umsatz und verlangen Aufmerksamkeit. Ein neues Produkt benötigt dagegen Investitionen, Geduld und einen eigenständigen Fokus. Die empirischen Erkenntnisse deuten deshalb darauf hin, dass neu gegründete Plattformunternehmen häufig bessere Ausgangsbedingungen haben als Dienstleister, die ein Produkt nur neben dem Tagesgeschäft aufbauen. Das ist kein allgemeines Gesetz, aber ein wichtiger Hinweis auf den nötigen organisatorischen und finanziellen Freiraum.",
        refs: [11],
      },

      { type: "heading", text: "Die vier zentralen Handlungsfelder" },
      {
        type: "paragraph",
        text: "Der Aufbau eines erfolgreichen Plattform- oder SaaS-Geschäfts lässt sich nicht auf Produktentwicklung reduzieren. Besonders relevant sind vier miteinander verbundene Ebenen: Strategie, Organisation, Technologie und Vertrieb.",
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/platform.webp",
        width: 2499,
        height: 942,
        maxWidth: 820,
        alt: "Donut-Diagramm mit „Platform“ im Zentrum und den vier Handlungsfeldern Strategie, Organisation, Technologie und Vertrieb.",
        caption: "Die vier zentralen Handlungsfelder eines Plattform- oder SaaS-Geschäfts: Strategie, Organisation, Technologie und Vertrieb.",
      },

      { type: "subheading", text: "1. Strategische Ebene: Zielgruppe, Markt und Geschäftsmodell" },
      { type: "paragraph", text: "Am Anfang steht keine Feature-Liste, sondern eine klare Marktentscheidung." },
      {
        type: "paragraph",
        text: "Ein Produkt ist besonders dann anschlussfähig, wenn es ein relevantes Problem für eine eng definierte Zielgruppe löst. Gerade kleinere IT-Dienstleister profitieren häufig davon, zunächst eine Nische zu fokussieren: eine Branche, eine bestimmte Unternehmensgröße, eine wiederkehrende Prozesslandschaft oder ein konkretes Datenproblem.",
      },
      {
        type: "paragraph",
        text: "Eine breite Zielgruppe klingt zunächst attraktiv, erhöht aber häufig die Komplexität. Unterschiedliche Anforderungen, längere Entscheidungswege und eine unklare Positionierung erschweren Produktentwicklung und Vertrieb zugleich.",
      },
      { type: "paragraph", text: "Zur Strategie gehören außerdem:" },
      {
        type: "grid",
        items: [
          { title: "Differenzierung", description: "Eine klare Abgrenzung gegenüber bestehenden Lösungen am Markt." },
          { title: "Markteintritt", description: "Der richtige Zeitpunkt für den Eintritt in den Zielmarkt." },
          { title: "Preismodell", description: "Eine tragfähige Preis- und Monetarisierungslogik." },
          { title: "Wettbewerbsanalyse", description: "Ein realistisches Bild von Anbietern, Substituten und Marktdynamik." },
          { title: "Partner & Integrationen", description: "Eine Strategie für Partnerschaften und die Anbindung an Drittsysteme." },
          { title: "Finanzierung", description: "Eine zur nötigen Vorleistung passende Finanzierungslogik." },
          { title: "Produktvision", description: "Eine langfristige Vision für die Weiterentwicklung des Produkts." },
        ],
      },
      {
        type: "paragraph",
        text: "In der Plattformökonomie ist der Markteintritt besonders sensibel. Märkte mit geringen Grenzkosten und ausgeprägten Netzwerkeffekten können sich schnell konzentrieren. Sobald wenige Anbieter eine starke Marktposition aufgebaut haben, steigen die Eintrittsbarrieren erheblich.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "Für kleinere Anbieter bedeutet das nicht, dass sie große Märkte meiden müssen. Es bedeutet jedoch, dass sie eine glaubwürdige Differenzierung benötigen: durch Branchenwissen, Prozessnähe, Integrationen, Datenkompetenz, eine spezialisierte Nutzererfahrung oder ein besonders gut verstandenes Problem.",
      },

      { type: "subheading", text: "2. Organisatorische Ebene: Produktarbeit braucht eigene Verantwortung" },
      { type: "paragraph", text: "Ein Plattformprodukt darf nicht dauerhaft nur ein Nebenprojekt zwischen Kundenaufträgen bleiben." },
      {
        type: "paragraph",
        text: "Damit ein Produkt marktfähig wird, braucht es klare Verantwortlichkeiten. Dazu gehören Entscheidungen über Produktvision, Priorisierung, Kundenfeedback, Architektur, Qualität, Go-to-Market und Weiterentwicklung.",
      },
      {
        type: "paragraph",
        text: "Erfolgreiche Plattformunternehmen arbeiten häufig mit dedizierten, cross-funktionalen Produktteams. Diese verbinden technische Kompetenz mit Marktverständnis, Produktmanagement und Vertriebsperspektive. Je nach Unternehmensgröße muss das kein großes Team sein. Entscheidend ist, dass Produktentscheidungen nicht ausschließlich reaktiv aus einzelnen Kundenprojekten entstehen.",
      },
      {
        type: "paragraph",
        text: "Besonders kritisch ist die Balance zwischen Standardisierung und Kundennähe. Kundenfeedback ist unverzichtbar. Es sollte jedoch nicht dazu führen, dass das Produkt zu einer Sammlung individueller Sonderlösungen wird. Eine sinnvolle Leitfrage lautet: Macht diese Anforderung das Produkt für einen relevanten Teil der Zielgruppe besser – oder löst sie nur ein individuelles Problem eines einzelnen Kunden? Diese Unterscheidung schützt Produktteams davor, die Skalierbarkeit des eigenen Angebots schrittweise wieder aufzugeben.",
      },

      { type: "subheading", text: "3. Technologische Ebene: Vertrauen ist Teil des Produkts" },
      { type: "paragraph", text: "Technologie ist nicht der einzige Erfolgsfaktor, aber sie setzt die Grenzen des Geschäftsmodells." },
      {
        type: "paragraph",
        text: "B2B-Kunden kaufen nicht nur Funktionen. Sie bewerten auch, ob eine Software langfristig sicher, zuverlässig und integrierbar betrieben werden kann. Gerade bei datenintensiven Anwendungen spielen Themen wie Datenschutz, Berechtigungen, Datenexport, Schnittstellen, Verfügbarkeit, Skalierbarkeit und Governance eine zentrale Rolle.",
      },
      {
        type: "paragraph",
        text: "Ein Produkt muss nicht von Beginn an die technische Komplexität eines globalen Enterprise-Systems besitzen. Es sollte aber so aufgebaut sein, dass es weiterentwickelt werden kann, ohne bei jedem neuen Kunden grundlegend angepasst werden zu müssen. Wichtig sind insbesondere:",
      },
      {
        type: "grid",
        items: [
          { title: "Standardisierter Produktkern", description: "Ein wiederverwendbarer Kern statt individueller Einzellösungen." },
          { title: "Daten- & Berechtigungslogik", description: "Eine nachvollziehbare Verwaltung von Daten und Zugriffen." },
          { title: "Skalierbare Architektur", description: "Eine Betriebsarchitektur, die mit der Nutzerzahl mitwächst." },
          { title: "Klare Schnittstellen", description: "Definierte Schnittstellen zu relevanten Drittsystemen." },
          { title: "Sicherheit & Datenschutz", description: "Verlässliche Sicherheits- und Datenschutzmaßnahmen." },
          { title: "Iterative Weiterentwicklung", description: "Die Fähigkeit, Funktionen schrittweise auszubauen." },
        ],
      },
      {
        type: "paragraph",
        text: "Die technische Architektur ist damit nicht nur ein Kostenfaktor. Sie ist ein Vertrauenssignal und beeinflusst unmittelbar, wie gut sich ein Produkt verkaufen, betreiben und langfristig skalieren lässt.",
      },

      { type: "subheading", text: "4. Vertriebliche Ebene: Dienstleistungsvertrieb ist nicht Produktvertrieb" },
      {
        type: "paragraph",
        text: "Ein bestehendes Vertriebsnetz im Projektgeschäft ist wertvoll – aber kein automatischer Beweis dafür, dass ein Softwareprodukt erfolgreich vermarktet werden kann.",
      },
      {
        type: "paragraph",
        text: "Der Grund liegt in der unterschiedlichen Vertriebslogik. Individuelle Dienstleistungen haben häufig hohe Auftragswerte. Es kann sich daher lohnen, mehrere Gespräche, Workshops und Beratungstage in die Akquise eines einzelnen Kunden zu investieren. Bei einem standardisierten SaaS-Produkt ist der Umsatz pro Kunde oft niedriger. Vertriebskosten, Onboarding-Aufwand und Support müssen deshalb stärker mit dem langfristigen Kundenwert ins Verhältnis gesetzt werden.",
      },
      {
        type: "paragraph",
        text: "Die Untersuchung zeigt: Besonders wertvoll sind Kontakte innerhalb der konkreten Zielgruppe, weil sie Direktvertrieb, Vertrauen und glaubwürdige Empfehlungen erleichtern. Ein allgemeiner Vertriebserfolg im Dienstleistungsumfeld lässt sich dagegen nicht automatisch auf ein Plattformprodukt übertragen.",
        refs: [5],
      },
      { type: "paragraph", text: "Für den Vertrieb eines B2B-Produkts bedeutet das:" },
      {
        type: "numbered",
        items: [
          { title: "Schnell verständlicher Nutzen", description: "Der Mehrwert des Produkts muss sofort erfassbar sein." },
          { title: "Klares Problem", description: "Die Zielgruppe muss erkennen, welches Risiko oder welchen Aufwand das Produkt reduziert." },
          { title: "Vertrauen aufbauen", description: "Datenschutz, Support und langfristige Verfügbarkeit müssen glaubwürdig sein." },
          { title: "Passendes Modell", description: "Preis, Onboarding und Vertragsmodell müssen zum Reifegrad des Kunden passen." },
          { title: "Netzwerke als Türöffner", description: "Bestehende Kontakte erleichtern den Einstieg, ersetzen aber kein belastbares Go-to-Market-Modell." },
        ],
      },

      { type: "heading", text: "Welche Erfolgsfaktoren sich in der Praxis zeigen" },
      {
        type: "paragraph",
        text: "Die zugrunde liegende Untersuchung kombiniert zehn halbstrukturierte Experteninterviews mit einer qualitativen Analyse von zwei etablierten Plattformunternehmen. Die Ergebnisse liefern keine allgemeingültigen Kausalgesetze, zeigen aber wiederkehrende Muster, die für IT-Dienstleister bei der Produktentwicklung und Markteinführung relevant sind.",
        refs: [11],
      },

      { type: "subheading", text: "Früh mit einem MVP in den Markt" },
      {
        type: "paragraph",
        text: "Ein frühes, funktionsfähiges Minimum Viable Product hilft dabei, Marktannahmen schnell zu überprüfen. Entscheidend ist nicht, möglichst viele Funktionen umzusetzen, sondern früh zu lernen:",
      },
      {
        type: "bullets",
        items: [
          "Versteht die Zielgruppe das Angebot?",
          "Wird das Problem als dringend genug wahrgenommen?",
          "Welche Funktionen sind tatsächlich kaufentscheidend?",
          "Welche Anforderungen sind nur vermeintlich wichtig?",
          "Gibt es eine echte Zahlungsbereitschaft?",
        ],
      },
      {
        type: "paragraph",
        text: "Nutzerfeedback ist dabei kein einmaliger Validierungsschritt. Es muss Teil eines kontinuierlichen Produktprozesses werden. Plattformen entwickeln sich selten erfolgreich entlang eines vollständig im Voraus definierten Plans. Sie entstehen durch wiederholte Zyklen aus Annahme, Feedback, Priorisierung und Verbesserung.",
      },
      {
        type: "flow",
        steps: [
          "Annahme treffen",
          "MVP bereitstellen",
          "Nutzerfeedback einholen",
          "Erkenntnisse priorisieren",
          "Produkt verbessern",
          "Erneut testen",
        ],
      },

      { type: "subheading", text: "Marktlücke und Timing ernst nehmen" },
      {
        type: "paragraph",
        text: "Der Zeitpunkt des Markteintritts kann entscheidend sein. In der Untersuchung weisen Plattformen bessere Erfolgsaussichten auf, wenn sie in Märkte mit wenigen vergleichbaren Angeboten eintreten oder eine bestehende Lücke klar besetzen können.",
        refs: [11],
      },
      {
        type: "paragraph",
        text: "Das bedeutet nicht, dass nur First Mover erfolgreich sein können. Ein später Markteintritt kann funktionieren, wenn der Anbieter eine relevante Differenzierung schafft. Ohne klare Positionierung wird es jedoch schwierig, gegen etablierte Produkte mit höherem Budget, größerer Markenbekanntheit und umfangreicheren Vertriebsressourcen anzutreten.",
      },

      { type: "subheading", text: "Organisationsumbau mit wachsender Plattform" },
      {
        type: "paragraph",
        text: "Mit der Skalierung verändert sich nicht nur das Produkt, sondern auch die passende Organisationsstruktur. Bei einer zunächst schlanken und wenig modularen Plattform kann ein gemeinsames, cross-funktionales Team Entwicklung, fachliche Anforderungen und direktes Kundenfeedback eng verbinden. Support, Vertrieb oder weitere administrative Aufgaben lassen sich in dieser Phase häufig noch mit dem bestehenden Dienstleistungsgeschäft bündeln.",
      },
      {
        type: "paragraph",
        text: "Wächst die Plattform jedoch zu mehreren fachlich eigenständigen Modulen, sollte sich diese Struktur weiterentwickeln: Dedizierte, cross-funktionale Produktteams übernehmen dann Verantwortung für einzelne Produktbereiche und deren Weiterentwicklung. Unterstützende Funktionen wie Vertrieb, Support oder Customer Success werden zunehmend als eigenständige, skalierbare Bereiche relevant. Entscheidend ist dabei nicht eine möglichst komplexe Organisation, sondern eine Struktur, die klare Produktverantwortung schafft und verhindert, dass die Plattform durch einzelne Kundenanforderungen wieder in die Logik des klassischen Projektgeschäfts zurückfällt.",
      },

      { type: "subheading", text: "Vertrieb bei begrenzten Ressourcen" },
      { type: "paragraph", text: "Ein Produkt kann technisch hervorragend sein und dennoch scheitern." },
      {
        type: "paragraph",
        text: "Besonders bei kleineren IT-Dienstleistern besteht die Gefahr, Produktentwicklung isoliert zu betrachten. Einer der wichtigsten Faktoren bei der Produktentwicklung ist es, den Vertrieb von vornherein mitzudenken: Wie werden potenzielle Kunden auf uns aufmerksam? Wie vertreiben wir das Produkt kosteneffizient?",
      },
      {
        type: "paragraph",
        text: "Stehen ausreichende finanzielle Ressourcen zur Verfügung, können Plattformanbieter mehrere Vertriebswege parallel erproben und skalieren. Dazu zählen insbesondere Direktvertrieb, gezieltes Online-Marketing, Empfehlungsprogramme, Anreize für Mund-zu-Mund-Propaganda oder – bei einer geeigneten, aufmerksamkeitsstarken Produktidee – PR-Kampagnen. Entscheidend ist dabei, die einzelnen Kanäle zunächst kontrolliert zu testen und nur dort weiter zu investieren, wo die Kundenakquisekosten dauerhaft in einem wirtschaftlich sinnvollen Verhältnis zum erwarteten Customer Lifetime Value stehen.",
      },
      {
        type: "paragraph",
        text: "Die Realität vieler kleinerer IT-Dienstleister sieht jedoch anders aus: Für die Markteinführung eines neuen Produkts stehen meist keine großen Budgets für Vertrieb und Kundenakquise bereit. Deshalb sollte die Vertriebslogik bereits vor der eigentlichen Produktentwicklung mitgedacht werden. Unternehmen sollten früh prüfen, welche Zielgruppen sie bereits kennen, in welchen Branchen belastbare Kontakte bestehen, welche Vertriebs- oder Marketingkompetenzen intern vorhanden sind und wie sich diese Stärken auf das neue Produkt übertragen lassen.",
      },
      {
        type: "paragraph",
        text: "Bei begrenzten Ressourcen gewinnen kostengünstige und glaubwürdige Kanäle an Bedeutung. Bestehende Kontakte in der Zielgruppe, Empfehlungen zufriedener Pilotkunden, gezielt aufgebaute Mund-zu-Mund-Propaganda oder branchenspezifische Partnerschaften können wirksamer sein als breit gestreute Werbekampagnen. Auch PR kann ein effizienter Hebel sein, sofern das Produkt oder die zugrunde liegende Problemstellung eine relevante, erzählbare Geschichte bietet. Direkter Vertrieb und Online-Marketing bleiben wichtige Optionen, sollten bei kleinem Budget jedoch fokussiert, schrittweise und mit klaren Effizienzkriterien eingesetzt werden.",
      },
      {
        type: "paragraph",
        text: "Der Engpass begrenzter Budgets lässt sich damit nicht allein durch geringere Ausgaben lösen. Er erfordert vor allem Kreativität in der Marktbearbeitung: Nicht jeder Vertriebskanal passt zu jedem Produkt. Erfolgreich ist eher, wer die eigene Erfahrung, das vorhandene Netzwerk und einen klar abgegrenzten Kundennutzen so kombiniert, dass erste Kunden mit überschaubarem Ressourceneinsatz gewonnen werden können.",
      },

      { type: "heading", text: "Fazit: Plattformgeschäft ist eine unternehmerische Transformation" },
      {
        type: "paragraph",
        text: "Der Aufbau eines SaaS- oder Plattformprodukts ist keine reine Erweiterung des bestehenden Leistungsportfolios. Er verändert die wirtschaftliche Logik, die Organisation und den Vertrieb eines IT-Dienstleisters.",
      },
      {
        type: "paragraph",
        text: "Das Potenzial ist groß: Wiederkehrende Umsätze, standardisierte Leistungen, bessere Skalierbarkeit und eine stärkere Unabhängigkeit von einzelnen Projektaufträgen. Gleichzeitig steigen die Anforderungen an Marktverständnis, Positionierung, Finanzierung, Produktmanagement und Betriebsfähigkeit.",
      },
      {
        type: "paragraph",
        text: "Der wichtigste Erfolgsfaktor ist deshalb nicht, möglichst schnell möglichst viele Features zu entwickeln. Entscheidend ist, die richtigen strategischen Entscheidungen früh zu treffen:",
      },
      {
        type: "numbered",
        items: [
          { title: "Klar abgegrenzte Zielgruppe", description: "Lieber eine fokussierte Nische als ein breiter, unscharfer Markt." },
          { title: "Wiederholbarer Kundennutzen", description: "Ein relevantes Problem, das sich für viele Kunden gleichartig lösen lässt." },
          { title: "Glaubwürdige Differenzierung", description: "Ein klarer Grund, warum Kunden dieses Produkt wählen." },
          { title: "Kontinuierliches Nutzerfeedback", description: "Feedback als fester Bestandteil der Produktentwicklung, nicht als einmaliger Schritt." },
          { title: "Organisatorische Anpassungen", description: "Eigene Verantwortung und Strukturen für die Produktarbeit." },
          { title: "Realistische Ressourcenplanung", description: "Budget, Zeit und Personal ehrlich auf das Vorhaben abgestimmt." },
          { title: "Kosteneffizientes Vertriebskonzept", description: "Ein Go-to-Market, das zu begrenzten Ressourcen passt." },
        ],
      },
      {
        type: "paragraph",
        text: "So wird aus einer guten Idee nicht nur eine Softwarelösung, sondern ein tragfähiges digitales Geschäftsmodell.",
      },
    ],

    faq: [
      {
        question: "Was ist der Unterschied zwischen einem SaaS-Produkt und einer Plattform?",
        answer:
          "Die Begriffe überschneiden sich, sind aber nicht identisch. SaaS beschreibt zunächst ein Bereitstellungs- und Geschäftsmodell: standardisierte Software, die zentral betrieben und meist im Abonnement genutzt wird. Zur Plattform wird ein Produkt erst, wenn zusätzlicher Wert durch das Zusammenspiel mehrerer Seiten entsteht – etwa durch Netzwerkeffekte, ein Ökosystem aus Partnern und Integrationen oder die Standardisierung von Prozessen zwischen Unternehmen. Viele erfolgreiche B2B-Produkte starten als fokussiertes SaaS und entwickeln Plattformcharakter erst später, wenn Schnittstellen, Partner und ergänzende Anwendungen hinzukommen. Für den Anfang ist diese Unterscheidung weniger wichtig als ein klarer, wiederholbarer Kundennutzen.",
      },
      {
        question: "Sollten etablierte IT-Dienstleister überhaupt eigene SaaS-Produkte entwickeln?",
        answer:
          "Das kann sehr sinnvoll sein – aber nicht automatisch. Der richtige Auslöser ist meist ein wiederkehrendes Problem, das in vielen Kundenprojekten in ähnlicher Form auftritt und sich zu einem standardisierbaren Produktkern verdichten lässt. Entscheidend ist weniger die technische Machbarkeit als die Frage, ob Zeit, Budget und klare Verantwortlichkeiten für Produktentwicklung, Markteintritt und Betrieb bereitstehen. Wird das Produkt nur nebenbei zwischen Kundenaufträgen gebaut, fehlt häufig der nötige Fokus. Wer den Schritt geht, sollte ihn deshalb als eigenständiges unternehmerisches Vorhaben behandeln, nicht als bloße Erweiterung des Tagesgeschäfts.",
      },
      {
        question: "Wie finde ich die richtige Zielgruppe oder Nische für ein Produkt?",
        answer:
          "Am besten dort, wo Sie bereits Vertrauen, Referenzen und echtes Problemverständnis besitzen. Gerade kleinere Anbieter profitieren davon, zunächst eng zu fokussieren – etwa auf eine Branche, eine bestimmte Unternehmensgröße oder eine wiederkehrende Prozess- und Datenlandschaft. Eine breite Zielgruppe klingt attraktiver, erhöht aber die Komplexität, verlängert Entscheidungswege und verwässert die Positionierung. Ein guter Test ist, ob Sie das Problem Ihrer Zielgruppe so präzise beschreiben können, dass Betroffene sich sofort wiedererkennen. Erst wenn Nutzen und Zahlungsbereitschaft in dieser Nische belegt sind, lohnt sich die Ausweitung.",
      },
      {
        question: "Warum reicht ein erfolgreicher Dienstleistungsvertrieb nicht aus?",
        answer:
          "Weil die Vertriebslogik eine andere ist. Im Projektgeschäft rechtfertigen hohe Auftragswerte mehrere Gespräche, Workshops und Beratungstage pro Kunde. Bei einem standardisierten SaaS-Produkt ist der Umsatz pro Kunde meist deutlich niedriger, sodass Akquisekosten, Onboarding und Support viel stärker zum langfristigen Kundenwert (Customer Lifetime Value) passen müssen. Bestehende Netzwerke sind wertvoll – vor allem Kontakte direkt in der Zielgruppe –, ersetzen aber kein belastbares Go-to-Market-Modell. Produktvertrieb muss den Nutzen schnell verständlich machen und planbar wiederholbar sein.",
      },
      {
        question: "Was gehört in ein MVP – und wie viel Funktionsumfang ist am Anfang nötig?",
        answer:
          "So wenig wie möglich, aber genug, um die zentrale Annahme ehrlich zu testen: Löst das Produkt ein als dringend empfundenes Problem, für das Kunden zu zahlen bereit sind? Ein MVP ist kein unfertiges Produkt, sondern das kleinste Funktionsbündel, mit dem sich echtes Nutzerfeedback und Zahlungsbereitschaft messen lassen. Wichtiger als viele Features ist, früh zu lernen, welche Funktionen tatsächlich kaufentscheidend sind und welche nur vermeintlich wichtig. Nutzerfeedback ist dabei kein einmaliger Schritt, sondern Teil eines kontinuierlichen Zyklus aus Annahme, Feedback, Priorisierung und Verbesserung.",
      },
      {
        question: "Wie sollte ein SaaS-Produkt bepreist werden?",
        answer:
          "Der Preis sollte zugleich für Kunden nachvollziehbar und für den Anbieter tragfähig sein. Üblich sind wiederkehrende Modelle – etwa pro Nutzer, pro Nutzungseinheit oder nach Funktionsumfang –, die mit dem Wert für den Kunden skalieren. Wichtig ist, Preis, Onboarding und Vertragsmodell zum Reifegrad der Zielgruppe passen zu lassen und die Kosten für Akquise, Betrieb und Support einzukalkulieren. Pricing ist selten von Anfang an perfekt; es sollte regelmäßig anhand realer Nutzung und Zahlungsbereitschaft überprüft und angepasst werden. Entscheidend ist, dass der Customer Lifetime Value dauerhaft über den Akquisekosten liegt.",
      },
      {
        question: "Braucht ein Plattformprodukt zwingend Venture Capital?",
        answer:
          "Nein. Externes Kapital kann Wachstum beschleunigen und zusätzliche Expertise bringen, ist aber nicht für jedes Produkt notwendig. Viele B2B-Produkte lassen sich anfangs aus dem bestehenden Dienstleistungsgeschäft heraus finanzieren, solange Vorleistung, Marktpotenzial und Vertriebsmodell zusammenpassen. In Märkten mit geringen Grenzkosten und starken Netzwerkeffekten, in denen sich Anbieter schnell konzentrieren, kann Kapital allerdings über Geschwindigkeit und Marktposition entscheiden. Die Finanzierungsform sollte deshalb zur Marktdynamik und zur eigenen Wachstumsambition passen – nicht umgekehrt.",
      },
      {
        question: "Wie wichtig sind Netzwerkeffekte für ein B2B-SaaS-Produkt?",
        answer:
          "Netzwerkeffekte sind ein starker Hebel, aber keine zwingende Voraussetzung für Erfolg. Klassische Marktplätze leben davon, dass jeder zusätzliche Teilnehmer den Nutzen für alle erhöht. Viele B2B-SaaS-Produkte – etwa eine Fachsoftware – werden dagegen nicht automatisch besser, nur weil mehr Unternehmen sie nutzen. In spezialisierten Nischen kann ein Produkt deshalb allein durch einen klaren, wiederholbaren Kundennutzen erfolgreich sein. Netzwerkeffekte können später entstehen – etwa durch Integrationen, geteilte Daten oder ein wachsendes Partner-Ökosystem. Sie sollten angestrebt, aber nicht zur Bedingung für den Markteintritt gemacht werden.",
      },
      {
        question: "Wie organisiere ich Produktarbeit neben dem laufenden Projektgeschäft?",
        answer:
          "Die größte Gefahr ist, dass das Produkt dauerhaft Nebenprojekt bleibt und durch einzelne Kundenwünsche schrittweise wieder zur Individuallösung wird. Deshalb braucht Produktarbeit eine eigene, klare Verantwortung für Vision, Priorisierung, Architektur, Qualität und Go-to-Market. In einer frühen, schlanken Phase kann ein gemeinsames, cross-funktionales Team Entwicklung, fachliche Anforderungen und Kundenfeedback eng verbinden; Support und Vertrieb lassen sich teils noch mit dem Dienstleistungsgeschäft bündeln. Mit wachsendem, modularem Produkt sollten dedizierte Produktteams sowie eigenständige Funktionen für Vertrieb, Support und Customer Success entstehen. Eine hilfreiche Leitfrage bei jedem Wunsch: Macht das das Produkt für einen relevanten Teil der Zielgruppe besser – oder löst es nur ein Einzelfallproblem?",
      },
      {
        question: "Kann ich die zugrunde liegenden Erkenntnisse im Detail erhalten?",
        answer:
          "Ja. Die Erkenntnisse basieren neben der theoretischen Aufarbeitung auf der empirischen Forschung der Masterarbeit von Noah Neßlauer (Mitgründer und Geschäftsführer der smiit GmbH). Diese stellen wir Ihnen auf Anfrage gerne zur Verfügung. Schicken Sie dafür einfach eine E-Mail an noah.nesslauer@smiit.de. Gerne beraten wir Sie auch persönlich zum Thema Plattform- und SaaS-Gründung.",
      },
    ],

    sources: [
      {
        title: "Rochet, J.-C. & Tirole, J. (2003): Platform Competition in Two-Sided Markets. Journal of the European Economic Association, 1(4), 990–1029.",
      },
      {
        title: "Van Alstyne, M. W., Parker, G. G. & Choudary, S. P. (2016): Pipelines, Platforms, and the New Rules of Strategy. Harvard Business Review.",
      },
      {
        title: "Demary, V. (2015): The Platformization of Digital Markets. IW policy papers, S. 1–22.",
      },
      {
        title: "Lehmann, N. (2019): Verkauf über Vermittlungsplattformen. Eine empirische Untersuchung von Erfolgsfaktoren. Hagen: Springer Gabler.",
      },
      {
        title: "Parker, G. G., Van Alstyne, M. W. & Choudary, S. P. (2016): Platform Revolution – How Networked Markets Are Transforming the Economy and How to Make Them Work for You. W. W. Norton & Company.",
      },
      {
        title: "Evans, D. S. & Gawer, A. (2016): The Rise of the Platform Enterprise – A Global Survey. The Center for Global Enterprise.",
      },
      {
        title: "Schneider, M. & Abeck, S. (2023): Engineering Microservice-Based Applications Using an Integration Platform as a Service. IEEE SOSE 2023, S. 124–129.",
      },
      {
        title: "Hyrynsalmi, S. M. (2022): The State-of-the-Art of the Integration Platforms as a Service research. IEEE/ACM IWSiB 2022, S. 17–22.",
      },
      {
        title: "Younis, R. et al. (2024): A Comprehensive Analysis of Cloud Service Models – IaaS, PaaS, and SaaS in the Context of Emerging Technologies and Trends. ICECCE 2024, S. 1–6.",
      },
      {
        title: "Friederici, N. et al. (2020): Plattforminnovation im Mittelstand. Berlin: Alexander von Humboldt Institut für Internet und Gesellschaft.",
      },
      {
        title: "Neßlauer, N.: Plattformökonomie für IT-Dienstleister – empirische Untersuchung (Masterarbeit, smiit GmbH). Auf Anfrage erhältlich.",
      },
    ],

    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    keywords: [
      "Plattformökonomie",
      "SaaS",
      "IT-Dienstleister",
      "Plattformgeschäftsmodell",
      "Software-as-a-Service",
      "MVP",
      "Go-to-Market",
      "Netzwerkeffekte",
      "Produktstrategie",
      "Digitales Geschäftsmodell",
    ],
    metaTitle: "Plattformökonomie für IT-Dienstleister: Von Projektgeschäft zu SaaS | smiit",
    metaDescription:
      "Wie IT-Dienstleister aus Projektgeschäft skalierbare SaaS- und Plattformprodukte entwickeln – Strategie, Organisation, Technologie, Vertrieb, MVP, Timing und Erfolgsfaktoren.",
  },

  en: {
    slug: "platform-economy-for-it-service-providers",
    category: "apps",
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    author: "Noah Neßlauer",
    title:
      "Platform economy for IT service providers: turning project business into scalable software products",
    shortTitle: "Platform economy for IT service providers",
    excerpt:
      "Building a good software product is only the beginning. How IT service providers turn project-based business into scalable SaaS and platform products — and why success rarely comes down to technology alone, but to strategy, organisation, sales and timing.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Platform economy for IT service providers",
    },
    coverImage: {
      url: "/assets/blog/platform-economy/platform.webp",
      width: 2499,
      height: 942,
      alt: "The platform as the interplay of the four fields of action: strategy, organisation, technology and sales.",
    },

    blocks: [
      { type: "heading", text: "Why good software doesn't automatically make a scalable business" },
      {
        type: "paragraph",
        text: "Building a good software product is only the beginning. What matters is whether it becomes a scalable business model: with a clear target group, recurring revenue, a solid market position and a sales motion that doesn't start from scratch with every new customer.",
      },
      {
        type: "paragraph",
        text: "Many IT service providers know the starting point: the project business runs, customers value bespoke delivery and demand is fundamentally there. At the same time, growth stays tightly coupled to available staff. More revenue usually means more project hours, more coordination and more operational complexity.",
      },
      {
        type: "paragraph",
        text: "A SaaS or platform solution can change that relationship. It doesn't fully replace bespoke services, but it reduces variable costs and generates recurring revenue. Getting there, however, is far more demanding than simply “productising” an existing service.",
      },
      {
        type: "paragraph",
        text: "This article shows which factors are particularly relevant for IT service providers when introducing platform-based software products — and why technology alone rarely determines success.",
      },

      { type: "heading", text: "Why project business hits scaling limits" },
      {
        type: "paragraph",
        text: "Classic IT services are valuable, but only scale to a limited degree. The revenue of a consulting, development or data analytics project is usually tied directly to working time: conception, development, coordination, operations and support.",
      },
      {
        type: "paragraph",
        text: "This creates closeness to the customer and enables bespoke solutions. At the same time, variable costs arise with every additional engagement. Growth requires additional capacity, qualified staff and an organisation that becomes more complex as the number of projects increases.",
      },
      {
        type: "paragraph",
        text: "Digital products work differently in economic terms. Their development, maintenance and the build-up of a secure operating environment cause high fixed costs at first. But once the product is available, additional users can often be served at low marginal cost. This is exactly where the scaling potential of software-as-a-service and platform models lies.",
        refs: [1, 2],
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/cost-development.webp",
        width: 3200,
        height: 1413,
        maxWidth: 940,
        alt: "Chart: scaling potential over growth and number of customers. Project-based business grows linearly, because revenue is tied to working hours and variable costs rise per project; the SaaS/platform curve rises disproportionately after high initial fixed costs and low marginal costs.",
        caption: "Scaling compared: in project business, revenue is tied to working hours and variable costs rise with every project. SaaS and platform models have high initial fixed costs but then low marginal costs — and therefore far greater scaling potential.",
      },
      {
        type: "paragraph",
        text: "That doesn't mean a SaaS product becomes profitable automatically. On the contrary: the upfront investment shifts. While in project business individual customer engagements generate revenue early, platform providers often first have to invest in product development, market entry, sales, security and operational readiness.",
        refs: [3],
      },
      {
        type: "paragraph",
        text: "The central question is therefore not “Can we build this software?” but “Can we position, finance and sell a standardised product in such a way that it is used permanently by many customers?”",
      },

      { type: "heading", text: "What the platform economy means in a B2B context" },
      {
        type: "paragraph",
        text: "The term platform is often associated with large marketplaces such as Amazon, Airbnb or Uber. These examples represent so-called transaction platforms: they bring two or more market sides together — for example providers and customers — and profit from intermediation, commissions or advertising.",
        refs: [4],
      },
      {
        type: "paragraph",
        text: "For IT service providers, however, a broader perspective is relevant. The platform economy describes business models in which digital infrastructure, standardised services and repeatable processes enable a disproportionate scaling effect.",
        refs: [5],
      },
      { type: "paragraph", text: "Among others, four types can be distinguished:" },
      {
        type: "grid",
        items: [
          { title: "Transaction platforms", description: "Mediate between different market sides, such as customers, service providers or suppliers." },
          { title: "Innovation platforms", description: "Create ecosystems on which third parties build or distribute their own solutions, for example app stores." },
          { title: "Integration platforms", description: "Connect different systems, data sources and applications." },
          { title: "SaaS platforms", description: "Provide standardised software via a central infrastructure operated by the provider." },
        ],
      },
      {
        type: "paragraph",
        text: "For many smaller and mid-sized IT service providers, the last type in particular is relevant. A specialised SaaS product can, for example, standardise reporting, project management, data integration, document management or industry-specific processes.",
        refs: [6, 7, 8, 9],
      },
      {
        type: "paragraph",
        text: "The difference from bespoke development is not only delivery via the cloud. What matters is the product logic: instead of fully re-implementing individual customer requirements, a reusable core is created that is valuable enough for a clearly defined target group.",
      },

      { type: "heading", text: "SaaS is not automatically a platform" },
      {
        type: "paragraph",
        text: "Not every cloud-based software product is automatically a platform. In the B2B space in particular, the terms are frequently conflated.",
      },
      {
        type: "paragraph",
        text: "A classic platform typically benefits from network effects: the value for individual users increases as further users, providers, partners or integrations are added. With marketplaces this relationship is especially visible. The more providers are active, the more attractive the platform becomes for customers — and vice versa.",
      },
      {
        type: "paragraph",
        text: "With SaaS products these effects are often weaker. Accounting software doesn't necessarily get better just because many other companies use it. Nevertheless, SaaS products can also develop platform characteristics:",
        refs: [2],
      },
      {
        type: "grid",
        items: [
          { title: "Multiple user groups", description: "The product connects several internal or external user groups." },
          { title: "Standardised processes", description: "It standardises processes between companies and makes them repeatable." },
          { title: "Software ecosystem", description: "Via interfaces it becomes part of a growing ecosystem of applications." },
          { title: "Valuable integrations", description: "Additional integrations increase the value for existing customers." },
          { title: "Data & partners", description: "Data, partners and complementary applications make the product more attractive over time." },
        ],
      },
      {
        type: "paragraph",
        text: "Especially in specialised B2B niches, a product can therefore succeed without immediately needing strong network effects like a marketplace. What matters first is a clear, repeatable customer benefit.",
      },

      { type: "heading", text: "From contract work to product ownership" },
      {
        type: "paragraph",
        text: "The biggest change when building a software product is usually not technical. It concerns how the company thinks and acts.",
      },
      {
        type: "paragraph",
        text: "In project business, the customer often describes the desired outcome. The IT service provider analyses the requirements, develops a bespoke solution and bills for the work. The need is already concrete, and sales rely heavily on trust, references and personal consulting.",
        refs: [10],
      },
      { type: "paragraph", text: "In the platform business the starting point is different. The company itself has to decide:" },
      {
        type: "bullets",
        items: [
          "Which problem is being solved for which target group?",
          "Which requirements belong in the product core?",
          "Which customer wishes deliberately stay outside the standard?",
          "How is the value communicated clearly?",
          "Which pricing logic is comprehensible for customers and viable for the provider?",
          "Which features increase the value for many customers — and which only create one-off effort?",
        ],
      },
      {
        type: "paragraph",
        text: "This shifts the role of the service provider. It moves from an implementer to a product company. That requires a clear vision, the ability to prioritise and the courage not to serve every customer requirement individually.",
      },
      {
        type: "paragraph",
        text: "For established service providers in particular, this change can be challenging. Existing customer projects generate short-term revenue and demand attention. A new product, by contrast, needs investment, patience and its own focus. The empirical findings therefore suggest that newly founded platform companies often have better starting conditions than service providers who build a product merely alongside day-to-day business. This is no general law, but an important indication of the organisational and financial latitude required.",
        refs: [11],
      },

      { type: "heading", text: "The four central fields of action" },
      {
        type: "paragraph",
        text: "Building a successful platform or SaaS business cannot be reduced to product development. Four interconnected levels are particularly relevant: strategy, organisation, technology and sales.",
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/platform.webp",
        width: 2499,
        height: 942,
        maxWidth: 820,
        alt: "Donut chart with “Platform” at the centre and the four fields of action: strategy, organisation, technology and sales.",
        caption: "The four central fields of action of a platform or SaaS business: strategy, organisation, technology and sales.",
      },

      { type: "subheading", text: "1. Strategy: target group, market and business model" },
      { type: "paragraph", text: "At the start there is no feature list, but a clear market decision." },
      {
        type: "paragraph",
        text: "A product is especially viable when it solves a relevant problem for a narrowly defined target group. Smaller IT service providers in particular often benefit from focusing on a niche first: an industry, a specific company size, a recurring process landscape or a concrete data problem.",
      },
      {
        type: "paragraph",
        text: "A broad target group sounds attractive at first, but often increases complexity. Diverging requirements, longer decision paths and an unclear market position make product development and sales harder at the same time.",
      },
      { type: "paragraph", text: "Strategy also includes:" },
      {
        type: "grid",
        items: [
          { title: "Differentiation", description: "A clear distinction from existing solutions on the market." },
          { title: "Market entry", description: "The right timing for entering the target market." },
          { title: "Pricing model", description: "A viable pricing and monetisation logic." },
          { title: "Competitive analysis", description: "A realistic picture of providers, substitutes and market dynamics." },
          { title: "Partners & integrations", description: "A strategy for partnerships and connecting to third-party systems." },
          { title: "Financing", description: "A financing logic that fits the required upfront investment." },
          { title: "Product vision", description: "A long-term vision for evolving the product." },
        ],
      },
      {
        type: "paragraph",
        text: "In the platform economy, market entry is particularly sensitive. Markets with low marginal costs and pronounced network effects can concentrate quickly. Once a few providers have built a strong market position, the barriers to entry rise considerably.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "For smaller providers this doesn't mean they have to avoid large markets. But it does mean they need a credible differentiation: through industry knowledge, process proximity, integrations, data expertise, a specialised user experience or a particularly well-understood problem.",
      },

      { type: "subheading", text: "2. Organisation: product work needs its own ownership" },
      { type: "paragraph", text: "A platform product must not remain merely a side project between customer engagements." },
      {
        type: "paragraph",
        text: "For a product to become market-ready, it needs clear responsibilities. These include decisions about product vision, prioritisation, customer feedback, architecture, quality, go-to-market and further development.",
      },
      {
        type: "paragraph",
        text: "Successful platform companies often work with dedicated, cross-functional product teams. These combine technical expertise with market understanding, product management and a sales perspective. Depending on company size, this doesn't have to be a large team. What matters is that product decisions don't arise solely as a reaction to individual customer projects.",
      },
      {
        type: "paragraph",
        text: "Particularly critical is the balance between standardisation and customer proximity. Customer feedback is indispensable. But it should not turn the product into a collection of individual special cases. A useful guiding question is: does this requirement make the product better for a relevant part of the target group — or does it only solve an individual problem for a single customer? This distinction protects product teams from gradually giving up the scalability of their own offering.",
      },

      { type: "subheading", text: "3. Technology: trust is part of the product" },
      { type: "paragraph", text: "Technology is not the only success factor, but it sets the limits of the business model." },
      {
        type: "paragraph",
        text: "B2B customers don't just buy features. They also assess whether software can be operated securely, reliably and in an integrable way over the long term. Especially for data-intensive applications, topics such as data protection, permissions, data export, interfaces, availability, scalability and governance play a central role.",
      },
      {
        type: "paragraph",
        text: "A product doesn't have to have the technical complexity of a global enterprise system from day one. But it should be built so that it can evolve without needing fundamental adaptation for every new customer. The following are particularly important:",
      },
      {
        type: "grid",
        items: [
          { title: "Standardised product core", description: "A reusable core instead of individual one-off solutions." },
          { title: "Data & permission logic", description: "Comprehensible management of data and access rights." },
          { title: "Scalable architecture", description: "An operating architecture that grows with the number of users." },
          { title: "Clear interfaces", description: "Defined interfaces to relevant third-party systems." },
          { title: "Security & data protection", description: "Reliable security and data protection measures." },
          { title: "Iterative development", description: "The ability to expand features step by step." },
        ],
      },
      {
        type: "paragraph",
        text: "The technical architecture is therefore not just a cost factor. It is a signal of trust and directly influences how well a product can be sold, operated and scaled over the long term.",
      },

      { type: "subheading", text: "4. Sales: service selling is not product selling" },
      {
        type: "paragraph",
        text: "An existing sales network in project business is valuable — but no automatic proof that a software product can be marketed successfully.",
      },
      {
        type: "paragraph",
        text: "The reason lies in the different sales logic. Bespoke services often have high deal values. It can therefore be worthwhile to invest several conversations, workshops and consulting days into acquiring a single customer. With a standardised SaaS product, revenue per customer is often lower. Sales costs, onboarding effort and support must therefore be weighed more heavily against the long-term customer value.",
      },
      {
        type: "paragraph",
        text: "The research shows: contacts within the specific target group are particularly valuable, because they facilitate direct sales, trust and credible recommendations. General sales success in a services environment, by contrast, cannot be transferred automatically to a platform product.",
        refs: [5],
      },
      { type: "paragraph", text: "For selling a B2B product, this means:" },
      {
        type: "numbered",
        items: [
          { title: "Quickly understandable value", description: "The product's benefit must be graspable immediately." },
          { title: "A clear problem", description: "The target group must see which risk or effort the product reduces." },
          { title: "Building trust", description: "Data protection, support and long-term availability must be credible." },
          { title: "A fitting model", description: "Price, onboarding and contract model must match the customer's maturity." },
          { title: "Networks as door openers", description: "Existing contacts ease the entry, but don't replace a robust go-to-market model." },
        ],
      },

      { type: "heading", text: "Which success factors show up in practice" },
      {
        type: "paragraph",
        text: "The underlying research combines ten semi-structured expert interviews with a qualitative analysis of two established platform companies. The results do not provide universally valid causal laws, but they do show recurring patterns that are relevant for IT service providers in product development and market launch.",
        refs: [11],
      },

      { type: "subheading", text: "Enter the market early with an MVP" },
      {
        type: "paragraph",
        text: "An early, functional minimum viable product helps to test market assumptions quickly. What matters is not implementing as many features as possible, but learning early:",
      },
      {
        type: "bullets",
        items: [
          "Does the target group understand the offering?",
          "Is the problem perceived as urgent enough?",
          "Which features are actually decisive for purchase?",
          "Which requirements are only supposedly important?",
          "Is there a genuine willingness to pay?",
        ],
      },
      {
        type: "paragraph",
        text: "User feedback is not a one-off validation step here. It has to become part of a continuous product process. Platforms rarely develop successfully along a plan defined entirely in advance. They emerge through repeated cycles of assumption, feedback, prioritisation and improvement.",
      },
      {
        type: "flow",
        steps: [
          "Form an assumption",
          "Ship the MVP",
          "Gather user feedback",
          "Prioritise insights",
          "Improve the product",
          "Test again",
        ],
      },

      { type: "subheading", text: "Take the market gap and timing seriously" },
      {
        type: "paragraph",
        text: "The timing of market entry can be decisive. In the research, platforms show better prospects of success when they enter markets with few comparable offerings or can clearly occupy an existing gap.",
        refs: [11],
      },
      {
        type: "paragraph",
        text: "This doesn't mean that only first movers can succeed. A later market entry can work if the provider creates a relevant differentiation. Without a clear market position, however, it becomes difficult to compete against established products with larger budgets, greater brand awareness and more extensive sales resources.",
      },

      { type: "subheading", text: "Reorganising as the platform grows" },
      {
        type: "paragraph",
        text: "As the platform scales, not only the product changes, but also the appropriate organisational structure. With an initially lean and not very modular platform, a single cross-functional team can closely connect development, business requirements and direct customer feedback. Support, sales or other administrative tasks can often still be bundled with the existing services business at this stage.",
      },
      {
        type: "paragraph",
        text: "But as the platform grows into several functionally independent modules, this structure should evolve: dedicated, cross-functional product teams then take responsibility for individual product areas and their development. Supporting functions such as sales, support or customer success increasingly become relevant as independent, scalable areas. What matters is not an organisation that is as complex as possible, but a structure that creates clear product ownership and prevents the platform from falling back into the logic of classic project business through individual customer requirements.",
      },

      { type: "subheading", text: "Sales with limited resources" },
      { type: "paragraph", text: "A product can be technically excellent and still fail." },
      {
        type: "paragraph",
        text: "Especially with smaller IT service providers there is a risk of viewing product development in isolation. One of the most important factors in product development is to think about sales from the very beginning: how do potential customers become aware of us? How do we sell the product cost-efficiently?",
      },
      {
        type: "paragraph",
        text: "If sufficient financial resources are available, platform providers can trial and scale several sales channels in parallel. These include in particular direct sales, targeted online marketing, referral programmes, incentives for word-of-mouth or — for a suitable, attention-grabbing product idea — PR campaigns. What matters is to test the individual channels in a controlled way first and only invest further where customer acquisition costs remain in an economically sensible ratio to the expected customer lifetime value.",
      },
      {
        type: "paragraph",
        text: "The reality for many smaller IT service providers, however, looks different: for the market launch of a new product there are usually no large budgets for sales and customer acquisition. The sales logic should therefore be considered before the actual product development. Companies should check early which target groups they already know, in which industries they have solid contacts, which sales or marketing competencies exist internally and how these strengths can be transferred to the new product.",
      },
      {
        type: "paragraph",
        text: "With limited resources, cost-effective and credible channels gain importance. Existing contacts in the target group, recommendations from satisfied pilot customers, deliberately built word-of-mouth or industry-specific partnerships can be more effective than broadly scattered advertising campaigns. PR, too, can be an efficient lever, provided the product or the underlying problem offers a relevant, tellable story. Direct sales and online marketing remain important options, but with a small budget they should be deployed in a focused, step-by-step way with clear efficiency criteria.",
      },
      {
        type: "paragraph",
        text: "The bottleneck of limited budgets cannot be solved by lower spending alone. Above all, it requires creativity in approaching the market: not every sales channel fits every product. Success is more likely for those who combine their own experience, their existing network and a clearly defined customer benefit so that the first customers can be won with manageable use of resources.",
      },

      { type: "heading", text: "Conclusion: the platform business is an entrepreneurial transformation" },
      {
        type: "paragraph",
        text: "Building a SaaS or platform product is not merely an extension of the existing service portfolio. It changes the economic logic, the organisation and the sales of an IT service provider.",
      },
      {
        type: "paragraph",
        text: "The potential is large: recurring revenue, standardised services, better scalability and greater independence from individual project engagements. At the same time, the demands on market understanding, positioning, financing, product management and operational readiness increase.",
      },
      {
        type: "paragraph",
        text: "The most important success factor is therefore not to develop as many features as quickly as possible. What matters is making the right strategic decisions early:",
      },
      {
        type: "numbered",
        items: [
          { title: "A clearly defined target group", description: "A focused niche rather than a broad, blurry market." },
          { title: "A repeatable customer benefit", description: "A relevant problem that can be solved similarly for many customers." },
          { title: "A credible differentiation", description: "A clear reason why customers choose this product." },
          { title: "Continuous user feedback", description: "Feedback as an integral part of product development, not a one-off step." },
          { title: "Organisational adjustments", description: "Dedicated ownership and structures for product work." },
          { title: "Realistic resource planning", description: "Budget, time and staff honestly aligned with the venture." },
          { title: "A cost-efficient sales concept", description: "A go-to-market that fits limited resources." },
        ],
      },
      {
        type: "paragraph",
        text: "This is how a good idea becomes not just a software solution, but a viable digital business model.",
      },
    ],

    faq: [
      {
        question: "What is the difference between a SaaS product and a platform?",
        answer:
          "The terms overlap, but they aren't identical. SaaS first describes a delivery and business model: standardised software that is operated centrally and usually consumed via subscription. A product becomes a platform only when additional value arises from the interplay of several sides — for example through network effects, an ecosystem of partners and integrations, or the standardisation of processes between companies. Many successful B2B products start as focused SaaS and only develop platform characteristics later, once interfaces, partners and complementary applications are added. In the beginning, this distinction matters less than a clear, repeatable customer benefit.",
      },
      {
        question: "Should established IT service providers build their own SaaS products at all?",
        answer:
          "It can make a lot of sense — but not automatically. The right trigger is usually a recurring problem that appears in a similar form across many customer projects and can be condensed into a standardisable product core. What matters is less the technical feasibility than whether time, budget and clear responsibilities for product development, market entry and operations are in place. If the product is only built on the side between customer engagements, the necessary focus is often missing. Anyone taking the step should therefore treat it as an independent entrepreneurial venture, not as a mere extension of day-to-day business.",
      },
      {
        question: "How do I find the right target group or niche for a product?",
        answer:
          "Ideally where you already have trust, references and a genuine understanding of the problem. Smaller providers in particular benefit from focusing narrowly at first — for example on an industry, a specific company size or a recurring process and data landscape. A broad target group sounds more attractive, but it increases complexity, lengthens decision paths and dilutes positioning. A good test is whether you can describe your target group's problem so precisely that those affected immediately recognise themselves. Only once benefit and willingness to pay are proven in that niche does expansion become worthwhile.",
      },
      {
        question: "Why isn't a successful service-business sales motion enough?",
        answer:
          "Because the sales logic is different. In project business, high deal values justify several conversations, workshops and consulting days per customer. With a standardised SaaS product, revenue per customer is usually much lower, so acquisition costs, onboarding and support have to fit far more closely to the long-term customer value (customer lifetime value). Existing networks are valuable — especially contacts directly in the target group — but they don't replace a robust go-to-market model. Product sales must make the benefit quick to understand and be predictably repeatable.",
      },
      {
        question: "What belongs in an MVP — and how much functionality is needed at the start?",
        answer:
          "As little as possible, but enough to honestly test the central assumption: does the product solve a problem perceived as urgent that customers are willing to pay for? An MVP is not an unfinished product, but the smallest bundle of features with which real user feedback and willingness to pay can be measured. More important than many features is learning early which functions are actually decisive for purchase and which are only supposedly important. User feedback is not a one-off step here, but part of a continuous cycle of assumption, feedback, prioritisation and improvement.",
      },
      {
        question: "How should a SaaS product be priced?",
        answer:
          "The price should be comprehensible for customers and viable for the provider at the same time. Recurring models are common — e.g. per user, per usage unit or by feature scope — that scale with the value delivered to the customer. It's important to match price, onboarding and contract model to the maturity of the target group and to factor in the costs of acquisition, operations and support. Pricing is rarely perfect from the start; it should be reviewed and adjusted regularly based on real usage and willingness to pay. What matters is that the customer lifetime value stays sustainably above acquisition costs.",
      },
      {
        question: "Does a platform product necessarily need venture capital?",
        answer:
          "No. External capital can accelerate growth and bring additional expertise, but it isn't necessary for every product. Many B2B products can initially be financed out of the existing services business, as long as upfront investment, market potential and sales model fit together. In markets with low marginal costs and strong network effects, where providers concentrate quickly, capital can however be decisive for speed and market position. The form of financing should therefore fit the market dynamics and your own growth ambition — not the other way around.",
      },
      {
        question: "How important are network effects for a B2B SaaS product?",
        answer:
          "Network effects are a powerful lever, but not a mandatory prerequisite for success. Classic marketplaces thrive on the fact that every additional participant increases the value for everyone. Many B2B SaaS products — a piece of specialist software, for instance — by contrast don't automatically get better just because more companies use them. In specialised niches, a product can therefore succeed purely through a clear, repeatable customer benefit. Network effects can emerge later — for example through integrations, shared data or a growing partner ecosystem. They should be aimed for, but not made a condition for market entry.",
      },
      {
        question: "How do I organise product work alongside ongoing project business?",
        answer:
          "The biggest risk is that the product remains a permanent side project and gradually turns back into a bespoke solution through individual customer requests. Product work therefore needs its own clear ownership of vision, prioritisation, architecture, quality and go-to-market. In an early, lean phase, a single cross-functional team can closely connect development, business requirements and customer feedback; support and sales can sometimes still be bundled with the services business. As the product grows and becomes modular, dedicated product teams as well as independent functions for sales, support and customer success should emerge. A helpful guiding question for every request: does this make the product better for a relevant part of the target group — or does it only solve a one-off problem?",
      },
      {
        question: "Can I get the underlying findings in detail?",
        answer:
          "Yes. Alongside the theoretical groundwork, the findings are based on the empirical research in the master's thesis of Noah Neßlauer (co-founder and managing director of smiit GmbH). We're happy to make it available to you on request. Simply send an email to noah.nesslauer@smiit.de. We're also glad to advise you personally on founding a platform or SaaS business.",
      },
    ],

    sources: [
      {
        title: "Rochet, J.-C. & Tirole, J. (2003): Platform Competition in Two-Sided Markets. Journal of the European Economic Association, 1(4), 990–1029.",
      },
      {
        title: "Van Alstyne, M. W., Parker, G. G. & Choudary, S. P. (2016): Pipelines, Platforms, and the New Rules of Strategy. Harvard Business Review.",
      },
      {
        title: "Demary, V. (2015): The Platformization of Digital Markets. IW policy papers, pp. 1–22.",
      },
      {
        title: "Lehmann, N. (2019): Verkauf über Vermittlungsplattformen. Eine empirische Untersuchung von Erfolgsfaktoren. Hagen: Springer Gabler.",
      },
      {
        title: "Parker, G. G., Van Alstyne, M. W. & Choudary, S. P. (2016): Platform Revolution – How Networked Markets Are Transforming the Economy and How to Make Them Work for You. W. W. Norton & Company.",
      },
      {
        title: "Evans, D. S. & Gawer, A. (2016): The Rise of the Platform Enterprise – A Global Survey. The Center for Global Enterprise.",
      },
      {
        title: "Schneider, M. & Abeck, S. (2023): Engineering Microservice-Based Applications Using an Integration Platform as a Service. IEEE SOSE 2023, pp. 124–129.",
      },
      {
        title: "Hyrynsalmi, S. M. (2022): The State-of-the-Art of the Integration Platforms as a Service research. IEEE/ACM IWSiB 2022, pp. 17–22.",
      },
      {
        title: "Younis, R. et al. (2024): A Comprehensive Analysis of Cloud Service Models – IaaS, PaaS, and SaaS in the Context of Emerging Technologies and Trends. ICECCE 2024, pp. 1–6.",
      },
      {
        title: "Friederici, N. et al. (2020): Plattforminnovation im Mittelstand. Berlin: Alexander von Humboldt Institut für Internet und Gesellschaft.",
      },
      {
        title: "Neßlauer, N.: Platform economy for IT service providers – empirical study (master's thesis, smiit GmbH). Available on request.",
      },
    ],

    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    keywords: [
      "platform economy",
      "SaaS",
      "IT service providers",
      "platform business model",
      "software-as-a-service",
      "MVP",
      "go-to-market",
      "network effects",
      "product strategy",
      "digital business model",
    ],
    metaTitle: "Platform economy for IT service providers: from project business to SaaS | smiit",
    metaDescription:
      "How IT service providers turn project business into scalable SaaS and platform products — strategy, organisation, technology, sales, MVP, timing and success factors.",
  },
}

// ---------------------------------------------------------------------------
// Post: Azure Front Door in Enterprise-Architekturen
// ---------------------------------------------------------------------------

const azureFrontDoor: LocalizedBlogPost = {
  de: {
    slug: "azure-front-door-in-enterprise-architectures",
    category: "strategy",
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    author: "Sebastian Grab",
    title:
      "Azure Front Door in Enterprise-Architekturen: Best Practices für sichere und skalierbare Webanwendungen",
    shortTitle: "Azure Front Door in Enterprise-Architekturen",
    excerpt:
      "Webanwendungen direkt öffentlich bereitzustellen ist einfach – aber selten sicher genug. Wie Azure Front Door als globale Edge-Schicht mit WAF, Private Link und Infrastructure as Code zum kontrollierten, reproduzierbaren Einstiegspunkt moderner Enterprise-Webanwendungen wird.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Azure Front Door in Enterprise-Architekturen",
    },
    coverImage: {
      url: "/assets/blog/azure-front-door/afd-map.webp",
      width: 2979,
      height: 1827,
      alt: "Azure Front Door als globale Edge-Schicht mit TLS, WAF, Routing und Caching, die Anfragen an weltweit verteilte Edge-Standorte lenkt.",
    },

    blocks: [
      { type: "heading", text: "Sicherheit beginnt vor der Anwendung" },
      {
        type: "paragraph",
        text: "Webanwendungen und APIs gehören heute zu den wichtigsten Schnittstellen zwischen Unternehmen, Kunden, Partnern und internen Systemen. Häufig werden sie zunächst direkt über einen öffentlichen App Service, eine Containerplattform oder ein API-Gateway bereitgestellt. Für erste Anwendungen kann dieser Ansatz ausreichend sein. Mit steigenden Anforderungen an Sicherheit, Verfügbarkeit und Skalierbarkeit entstehen jedoch schnell zusätzliche Herausforderungen.",
      },
      {
        type: "paragraph",
        text: "Neben der eigentlichen Anwendung müssen TLS-Zertifikate verwaltet, Angriffe auf Anwendungsebene erkannt, mehrere Backends geroutet und Ausfälle einzelner Instanzen abgefangen werden. Gleichzeitig sollte verhindert werden, dass Angreifer vorgeschaltete Sicherheitskontrollen umgehen und den Ursprungsdienst direkt erreichen können.",
      },
      {
        type: "paragraph",
        text: "Azure Front Door setzt vor der eigentlichen Anwendung an. Der Dienst bildet eine global verteilte Edge-Schicht, die eingehenden HTTP- und HTTPS-Traffic entgegennimmt, über eine Web Application Firewall prüft und kontrolliert an geeignete Ursprungsdienste weiterleitet. In Kombination mit Private Link, Azure Monitor und Infrastructure as Code entsteht daraus ein zentraler und reproduzierbarer Einstiegspunkt für moderne Enterprise-Webanwendungen.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag zeigt, wie Azure Front Door in einer solchen Architektur eingesetzt werden kann, welche Aufgaben WAF und Private Link übernehmen und welche Best Practices bei Routing, Monitoring und Deployment berücksichtigt werden sollten.",
      },
      {
        type: "paragraph",
        text: "Hinweis: Dieser Beitrag bezieht sich auf Azure Front Door Standard und Premium. Azure Front Door Classic wird am 31. März 2027 eingestellt und sollte für neue Architekturen nicht mehr verwendet werden.",
        refs: [1],
      },

      { type: "heading", text: "Warum öffentlich erreichbare Webanwendungen zusätzliche Schutzmechanismen benötigen" },
      {
        type: "paragraph",
        text: "Viele Webanwendungen beginnen mit einer vergleichsweise einfachen Architektur: Ein Frontend oder eine API wird auf Azure App Service, Azure Container Apps, Azure Kubernetes Service oder einer virtuellen Maschine betrieben und über einen öffentlichen HTTPS-Endpunkt erreichbar gemacht.",
      },
      {
        type: "paragraph",
        text: "Das ist technisch unkompliziert, verbindet jedoch mehrere Verantwortlichkeiten in einer einzigen Komponente. Der Ursprungsdienst nimmt öffentlichen Traffic entgegen, terminiert TLS und verarbeitet gleichzeitig die eigentliche Anwendungslogik. Sicherheitsregeln, Zertifikate, Routing und Monitoring werden häufig pro Anwendung separat konfiguriert.",
      },
      { type: "paragraph", text: "Mit wachsender Nutzung entstehen dadurch typische Herausforderungen:" },
      {
        type: "bullets",
        items: [
          "Mehrere Anwendungen benötigen unterschiedliche Domains und Zertifikate.",
          "APIs und Frontends sollen über gemeinsame oder getrennte Pfade erreichbar sein.",
          "Angriffe wie SQL Injection, Cross-Site Scripting oder automatisierte Bot-Zugriffe sollen möglichst früh erkannt werden.",
          "Eine Anwendung soll auch bei Ausfall einer Instanz oder Region erreichbar bleiben.",
          "Statische Inhalte sollen performant an geografisch verteilte Nutzer ausgeliefert werden.",
          "Sicherheits- und Routingkonfigurationen sollen zwischen Entwicklungs-, Test- und Produktionsumgebungen konsistent bleiben.",
        ],
      },
      {
        type: "paragraph",
        text: "Die OWASP Top 10 dokumentieren zentrale Sicherheitsrisiken moderner Webanwendungen. Eine vorgeschaltete Web Application Firewall kann einen Teil entsprechender Angriffsmuster erkennen und blockieren. Sie ersetzt jedoch weder sichere Softwareentwicklung noch eine korrekte Authentifizierung und Autorisierung.",
        refs: [2],
      },
      {
        type: "paragraph",
        text: "Ein weiteres Problem entsteht, wenn eine WAF zwar vor die Anwendung gestellt wird, der ursprüngliche App-Service- oder API-Endpunkt aber weiterhin frei erreichbar bleibt. Der vorgesehene Weg führt über die Firewall:",
      },
      {
        type: "diagram",
        steps: [{ label: "Nutzer" }, { label: "Web Application Firewall" }, { label: "Anwendung" }],
      },
      {
        type: "paragraph",
        text: "In diesem Fall schützt die WAF ausschließlich den Traffic, der tatsächlich durch sie hindurchläuft. Kennt ein Angreifer den technischen Hostnamen des Ursprungs, kann er versuchen, diesen unter Umgehung der Firewall direkt aufzurufen.",
      },
      {
        type: "paragraph",
        text: "Aus Sicht einer Zero-Trust-Architektur sollte dem Traffic nicht allein deshalb vertraut werden, weil er einen bestimmten Netzwerkpfad verwendet. NIST beschreibt Zero Trust als ein Sicherheitsmodell, das Ressourcen und explizite Zugriffsentscheidungen in den Mittelpunkt stellt, anstatt implizites Vertrauen aus einem Netzwerkstandort abzuleiten. Übertragen auf eine Webarchitektur bedeutet dies: Der vorgesehene Zugriffspfad sollte nicht nur dokumentiert, sondern technisch erzwungen werden.",
        refs: [3],
      },
      {
        type: "grid",
        items: [
          { title: "Direkter öffentlicher Origin", description: "Internet → Public App Service. Risiken: direkter Origin-Zugriff, dezentrale TLS-Konfiguration, keine zentrale WAF, uneinheitliches Monitoring." },
          { title: "Kontrollierter Zugriff über Front Door", description: "Internet → Azure Front Door + WAF → Private Origin. Vorteile: kontrollierter Einstiegspunkt, zentrale Sicherheitsregeln, privater Ursprung, einheitliche Protokollierung." },
        ],
      },

      { type: "heading", text: "Was Azure Front Door in der Praxis bedeutet" },
      {
        type: "paragraph",
        text: "Azure Front Door ist Microsofts globaler Application-Delivery- und Content-Delivery-Dienst für HTTP- und HTTPS-Anwendungen. Der Dienst nutzt das globale Edge-Netzwerk von Microsoft, um Anfragen an geografisch verteilten Points of Presence entgegenzunehmen und anschließend an geeignete Ursprungsdienste weiterzuleiten.",
        refs: [4],
      },
      { type: "paragraph", text: "Vereinfacht lässt sich Azure Front Door als eine Art global verteilter Reverse Proxy verstehen:" },
      {
        type: "diagram",
        steps: [
          { label: "Nutzer" },
          { label: "Azure Front Door Edge", items: ["TLS", "WAF", "Routing", "Caching", "Health-basierte Origin-Auswahl"] },
          { label: "Anwendung oder API" },
        ],
      },
      {
        type: "paragraph",
        text: "Der Client verbindet sich nicht unmittelbar mit dem App Service oder API-Gateway. Stattdessen ruft er eine benutzerdefinierte Domain wie app.example.com auf, die mit Azure Front Door verbunden ist. Front Door nimmt die Anfrage entgegen, prüft sie anhand der konfigurierten Regeln und leitet sie an einen passenden Ursprung weiter.",
      },
      { type: "paragraph", text: "Zu den zentralen Funktionen gehören:" },
      {
        type: "grid",
        items: [
          { title: "Globales HTTP- und HTTPS-Routing", description: "Requests werden anhand von Domains und URL-Pfaden unterschiedlichen Anwendungen oder APIs zugeordnet, z. B. /api/* an API Management." },
          { title: "Web Application Firewall", description: "Die integrierte WAF schützt Anwendungen mit Microsoft-verwalteten und eigenen Regeln gegen typische Angriffe und ungewöhnliche Zugriffsmuster." },
          { title: "TLS und Zertifikatsverwaltung", description: "Front Door terminiert TLS am Edge und verwaltet Zertifikate für benutzerdefinierte Domains inklusive automatischer Erneuerung." },
          { title: "Caching und Komprimierung", description: "Geeignete Inhalte werden an Edge-Standorten zwischengespeichert und näher am Nutzer ausgeliefert – das senkt Latenz und Origin-Last." },
          { title: "Health-basierte Origin-Auswahl", description: "Bei mehreren Origins prüft Front Door deren Verfügbarkeit und leitet Requests bei einem Ausfall an einen anderen Ursprung weiter." },
          { title: "Private Origin-Anbindung", description: "Azure Front Door Premium bindet unterstützte Azure-Dienste über Private Link an – der Ursprung muss nicht mehr frei über das Internet erreichbar sein." },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Front Door ist damit mehr als ein klassischer Load Balancer. Der Dienst verbindet globale Traffic-Verteilung, Websicherheit, Content Delivery und Origin-Schutz in einer gemeinsamen Edge-Schicht.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Wissenschaftliche Arbeiten zu Content Delivery Networks zeigen ebenfalls, dass global verteilte Auslieferungsstrukturen sowohl Performancevorteile als auch eigene Sicherheitsanforderungen mit sich bringen. Yang et al. untersuchen beispielsweise DoS- und Cache-Pollution-Angriffe in realen CDN-Daten und verdeutlichen die Bedeutung mehrschichtiger Analyse- und Monitoringmechanismen.",
        refs: [6],
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-map.webp",
        width: 2979,
        height: 1827,
        maxWidth: 940,
        alt: "Weltkarte: Die Azure-Front-Door-Edge-Schicht (TLS, WAF, Routing, Cache) leitet Anfragen an geografisch verteilte Edge-Standorte auf mehreren Kontinenten weiter.",
        caption: "Azure Front Door nimmt Anfragen an Microsofts global verteilten Edge-Standorten entgegen und leitet sie kontrolliert an geeignete Ursprungsdienste weiter.",
      },

      { type: "heading", text: "Warum Microsoft Azure ein guter Ansatz für sichere Webarchitekturen ist" },
      {
        type: "paragraph",
        text: "Der wesentliche Vorteil von Azure Front Door liegt nicht nur im einzelnen Dienst, sondern in seiner Integration mit anderen Azure-Komponenten.",
      },
      { type: "paragraph", text: "Eine typische Enterprise-Webarchitektur kann unter anderem folgende Dienste kombinieren:" },
      {
        type: "bullets",
        items: [
          "Azure Front Door als globalen Einstiegspunkt,",
          "Web Application Firewall zum Schutz des HTTP-Traffics,",
          "Azure App Service oder Container Apps für die Anwendung,",
          "Azure API Management für API-Governance,",
          "Private Link für geschützte Origin-Verbindungen,",
          "Key Vault für Zertifikate und Geheimnisse,",
          "Azure Monitor und Log Analytics für Monitoring,",
          "Microsoft Entra ID für Identitäten und Zugriffssteuerung,",
          "Bicep oder Terraform für Infrastructure as Code,",
          "Azure DevOps oder GitHub Actions für CI/CD.",
        ],
      },
      {
        type: "paragraph",
        text: "Dadurch lassen sich Netzwerk, Identitäten, Anwendungen, Monitoring und Deployment in ein gemeinsames Betriebsmodell integrieren.",
      },

      { type: "subheading", text: "Front Door, Application Gateway und API Management" },
      {
        type: "paragraph",
        text: "Da mehrere Azure-Dienste HTTP-Traffic verarbeiten, werden ihre Aufgaben häufig verwechselt. Azure Front Door wird eingesetzt, bevor der Traffic die eigentliche Anwendungsregion erreicht. Application Gateway ist dagegen ein regionaler Dienst und eignet sich beispielsweise als VNet-naher Ingress für virtuelle Maschinen oder Kubernetes-Workloads.",
      },
      {
        type: "paragraph",
        text: "API Management übernimmt wiederum keine globale Content-Auslieferung, sondern API-spezifische Aufgaben wie Tokenvalidierung, Transformationen, Versionierung, Quotas und die Verwaltung von API-Produkten. Die Dienste können kombiniert werden, müssen es aber nicht. Eine typische SaaS-Anwendung auf App Service benötigt häufig Azure Front Door und API Management, aber kein zusätzliches Application Gateway. Mehrere Gateways sollten nur eingesetzt werden, wenn jedes davon eine klar definierte Verantwortung erfüllt.",
      },
      {
        type: "paragraph",
        text: "Architektur-Hinweis: Eine Architektur wird nicht automatisch sicherer, wenn möglichst viele Sicherheits- und Netzwerkdienste hintereinandergeschaltet werden. Entscheidend sind klare Zuständigkeiten und ein kontrollierter Request Flow.",
      },

      { type: "subheading", text: "Abgrenzung zu selbst betriebenen Proxies (NGINX, Traefik)" },
      {
        type: "paragraph",
        text: "NGINX und Traefik sind leistungsfähige Reverse Proxies und Load Balancer. Sie eignen sich besonders als regionaler Ingress für Container-, Docker- oder Kubernetes-Umgebungen, für internes Routing und für Architekturen, bei denen Unternehmen möglichst viel Kontrolle über Konfiguration und Betrieb behalten möchten. Traefik kann Dienste aus Orchestrierungsplattformen automatisch erkennen, während NGINX sehr flexible Proxy-, Routing- und Load-Balancing-Funktionen bereitstellt.",
        refs: [15, 16],
      },
      {
        type: "paragraph",
        text: "Sie sind jedoch nicht unmittelbar mit Azure Front Door gleichzusetzen. Azure Front Door ist ein vollständig verwalteter und global verteilter Edge-Dienst. Er kombiniert das weltweite Microsoft-Netzwerk mit WAF, DDoS-Schutz, Zertifikatsverwaltung, CDN-Caching, Health-basiertem globalem Routing und der privaten Anbindung unterstützter Azure-Origins. Bei einer selbst betriebenen Lösung müssten Hochverfügbarkeit, globale Verteilung, Skalierung, Updates, Zertifikate, WAF, DDoS-Schutz und Monitoring separat aufgebaut und betrieben werden. Beide Ansätze lassen sich auch kombinieren: Front Door übernimmt den globalen Edge-Layer, während NGINX oder Traefik innerhalb einer Region als Ingress dienen.",
        refs: [4, 5, 17],
      },

      { type: "heading", text: "Zielarchitektur: Azure Front Door in einer Enterprise-Anwendung" },
      {
        type: "paragraph",
        text: "Eine mögliche Zielarchitektur besteht aus einer browserbasierten Webanwendung, einer API und mehreren privaten Plattformdiensten. Nur Azure Front Door befindet sich im öffentlichen Bereich; alle nachgelagerten Dienste werden über Private Link angebunden.",
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-traffic.webp",
        width: 2960,
        height: 1970,
        maxWidth: 900,
        alt: "Vier-Ebenen-Referenzarchitektur: Users & Internet, Global Edge Layer mit Azure Front Door (Custom Domain, TLS, Firewall, Routing), Application Layer mit Web Application und API Management über Private Link, sowie Data & Platform Services mit Backend API, Datenbank und Storage.",
        caption: "Enterprise-Referenzarchitektur mit vier Ebenen: Nur Azure Front Door liegt öffentlich; Web-App und API Management werden über Private Link angebunden, dahinter folgen Backend-API und Datenplattform.",
      },

      { type: "subheading", text: "Azure Front Door als zentraler Einstiegspunkt" },
      {
        type: "paragraph",
        text: "Alle öffentlichen Domains der Anwendung verweisen auf Azure Front Door. Front Door übernimmt TLS, WAF-Prüfung und Routing. Der technische Hostname des App Service oder API-Gateways wird nicht als öffentlicher Einstiegspunkt verwendet.",
      },
      { type: "paragraph", text: "Dadurch entsteht eine zentrale Stelle für:" },
      {
        type: "bullets",
        items: [
          "Domains und Zertifikate,",
          "Sicherheitsregeln,",
          "HTTP-zu-HTTPS-Weiterleitungen,",
          "URL-Routing,",
          "Caching,",
          "Health Checks,",
          "Access Logs.",
        ],
      },

      { type: "subheading", text: "Getrennte Routen für Frontend und API" },
      { type: "paragraph", text: "Frontend und API können über unterschiedliche Domains veröffentlicht werden:" },
      {
        type: "code",
        content: "app.example.com   →  Web Application\napi.example.com   →  API Management",
      },
      { type: "paragraph", text: "Alternativ können beide über dieselbe Domain erreichbar sein:" },
      {
        type: "code",
        content: "app.example.com/*       →  Web Application\napp.example.com/api/*   →  API Management",
      },
      {
        type: "paragraph",
        text: "Eine gemeinsame Domain vereinfacht häufig browserbasierte Anwendungen, weil weniger Cross-Origin-Konfigurationen erforderlich sind. Eine getrennte API-Domain ist dagegen sinnvoll, wenn die API zusätzlich von mobilen Anwendungen, Partnern oder anderen Systemen verwendet wird.",
      },

      { type: "subheading", text: "Web Application Firewall am Edge" },
      {
        type: "paragraph",
        text: "Die WAF prüft Requests, bevor sie Ressourcen des App Service oder API Management beanspruchen. Microsoft empfiehlt für internetbasierte Anwendungen den Einsatz der WAF mit verwalteten Regeln. Die Regeln sollten zunächst an den tatsächlichen Traffic angepasst werden, weil legitime Requests andernfalls fälschlicherweise blockiert werden können. Während dieser Abstimmung kann die Policy im Detection Mode protokollieren, ohne Traffic zu blockieren.",
        refs: [7],
      },
      {
        type: "paragraph",
        text: "Die WAF ergänzt die Anwendungssicherheit, ersetzt sie aber nicht. Ob ein Nutzer auf einen bestimmten Datensatz zugreifen darf, muss weiterhin durch die Anwendung oder API geprüft werden.",
      },

      { type: "subheading", text: "Private Origins" },
      {
        type: "paragraph",
        text: "Der wichtigste Sicherheitsgewinn entsteht, wenn der Origin nicht unabhängig von Front Door erreichbar ist. Azure Front Door Premium kann unterstützte PaaS-Dienste über Private Link anbinden. Der Ursprung sollte zusätzlich so konfiguriert werden, dass er keinen Traffic akzeptiert, der nicht über diese private Verbindung eintrifft.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Ist Private Link nicht verfügbar, kann der Zugriff beispielsweise über den Service Tag AzureFrontDoor.Backend und die Prüfung des profilspezifischen Headers X-Azure-FDID eingeschränkt werden. Diese Variante ist weniger konsequent als ein privater Ursprung, verhindert aber ebenfalls, dass beliebige Clients den Origin direkt verwenden.",
        refs: [8],
      },

      { type: "subheading", text: "API Management als zweite Sicherheitsebene" },
      { type: "paragraph", text: "API Management ergänzt Front Door um API-spezifische Kontrollen. Während die WAF technische Angriffsmuster untersucht, kann API Management beispielsweise:" },
      {
        type: "bullets",
        items: [
          "OAuth- und JWT-Token validieren,",
          "erforderliche Claims und Scopes prüfen,",
          "Limits je Subscription oder Nutzer anwenden,",
          "Requests und Responses transformieren,",
          "API-Versionen verwalten,",
          "interne Backend-Endpunkte verbergen.",
        ],
      },
      {
        type: "paragraph",
        text: "Microsoft unterstützt sowohl öffentlich eingeschränkte als auch privat angebundene APIM-Origins hinter Azure Front Door.",
        refs: [8],
      },

      { type: "heading", text: "Technische Umsetzung: Wie Azure Front Door konkret aufgebaut wird" },
      {
        type: "paragraph",
        text: "Nachdem die Zielarchitektur definiert ist, stellt sich die praktische Frage, wie sie reproduzierbar umgesetzt und betrieben werden kann. Eine robuste Implementierung verfolgt fünf Ziele:",
      },
      {
        type: "bullets",
        items: [
          "Front Door ist der einzige vorgesehene öffentliche Zugriffspfad.",
          "Sicherheitsregeln werden kontrolliert eingeführt und überwacht.",
          "Routing und Health Checks bilden die tatsächliche Anwendungsstruktur ab.",
          "Infrastrukturänderungen werden versioniert bereitgestellt.",
          "Fehler lassen sich über zentrale Logs nachvollziehen.",
        ],
      },

      { type: "subheading", text: "1. Domains und Routing definieren" },
      {
        type: "paragraph",
        text: "Zunächst werden die öffentlichen Domains und die gewünschten Request-Pfade festgelegt. Dabei sollte die Routingstruktur möglichst einfach bleiben. Ein mögliches Modell lautet:",
      },
      {
        type: "code",
        content: "app.example.com/*       →  frontend-origin-group\napp.example.com/api/*   →  api-origin-group",
      },
      {
        type: "paragraph",
        text: "Azure Front Door unterstützt neben pfadbasiertem Routing auch unterschiedliche Verfahren zur Auswahl eines Origins. Prioritäten ermöglichen beispielsweise eine Active-Passive-Architektur, während Gewichtungen für schrittweise Migrationen oder Canary Deployments verwendet werden können.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "Die Architektur sollte jedoch nicht mit komplexem Routing beginnen, wenn nur ein Ursprung benötigt wird. Für viele Anwendungen reicht zunächst eine einzelne Region mit einem klar definierten Frontend- und API-Pfad.",
      },

      { type: "subheading", text: "2. WAF kontrolliert einführen" },
      {
        type: "paragraph",
        text: "Die WAF sollte mit Microsofts verwalteten Regeln aktiviert werden. Zusätzlich können eigene Regeln für anwendungsspezifische Anforderungen ergänzt werden, beispielsweise:",
      },
      {
        type: "bullets",
        items: [
          "Rate Limits für Login- oder Export-Endpunkte,",
          "Einschränkung von Administrationspfaden,",
          "Blockierung nicht benötigter HTTP-Methoden,",
          "Geo-Filter für regional begrenzte Anwendungen,",
          "Behandlung bekannter Bots.",
        ],
      },
      { type: "paragraph", text: "Für die Einführung empfiehlt sich ein kontrollierter Ablauf:" },
      {
        type: "diagram",
        steps: [
          { label: "WAF-Baseline definieren" },
          { label: "Detection Mode aktivieren" },
          { label: "Logs und False Positives analysieren" },
          { label: "Ausnahmen möglichst eng definieren" },
          { label: "Prevention Mode aktivieren" },
          { label: "Kontinuierlich überwachen" },
        ],
      },
      {
        type: "paragraph",
        text: "Pauschale Ausnahmen sollten vermieden werden. Löst beispielsweise ein einzelnes Suchfeld fälschlicherweise eine SQL-Injection-Regel aus, sollte nur dieses konkrete Feld für die betroffene Regel ausgenommen werden. Das vollständige Deaktivieren aller SQL-Injection-Regeln würde die Schutzwirkung unnötig reduzieren.",
      },
      {
        type: "paragraph",
        text: "Rate Limits sollten ebenfalls nicht zu niedrig angesetzt werden. Viele legitime Nutzer können sich zudem eine gemeinsame Unternehmens- oder Mobilfunk-IP teilen. Microsoft empfiehlt generell ausreichend hohe Schwellenwerte, die extreme Nutzung begrenzen, ohne legitimen Traffic vorschnell zu blockieren.",
        refs: [7],
      },

      { type: "subheading", text: "3. Origins absichern" },
      { type: "paragraph", text: "Bei Azure Front Door Premium ist Private Link für unterstützte Origins die bevorzugte Variante:" },
      {
        type: "diagram",
        steps: [{ label: "Azure Front Door" }, { label: "Private Link" }, { label: "App Service oder API Management" }],
      },
      {
        type: "paragraph",
        text: "Nach der Einrichtung muss die Private-Endpoint-Verbindung am jeweiligen Dienst genehmigt werden. Anschließend sollte der öffentliche Netzwerkzugriff des Ursprungs deaktiviert werden, soweit der Dienst und das Betriebsmodell dies zulassen.",
      },
      { type: "paragraph", text: "Ein praktischer Test sollte nicht nur prüfen, ob die Anwendung über Front Door erreichbar ist, sondern auch, ob ein direkter Request an den Origin scheitert:" },
      {
        type: "grid",
        items: [
          { title: "Test 1 – Zugriff über Front Door", description: "Request über Azure Front Door. Erwartung: 200 OK." },
          { title: "Test 2 – Direkter Origin-Zugriff", description: "Direkter Request an den Origin. Erwartung: Zugriff blockiert." },
        ],
      },
      {
        type: "paragraph",
        text: "Dieser Negativtest ist besonders wichtig. Eine funktionierende Front-Door-Route beweist nicht automatisch, dass kein alternativer Zugriffspfad mehr existiert.",
      },

      { type: "subheading", text: "4. Health Checks und Performance konfigurieren" },
      {
        type: "paragraph",
        text: "Sind mehrere Origins vorhanden, verwendet Front Door Health Probes, um ihre Verfügbarkeit zu bewerten. Der Health Endpoint (z. B. /healthz) sollte einen eindeutigen 200-OK-Status liefern und die Komponenten prüfen, die für die Verarbeitung von Produktionstraffic tatsächlich erforderlich sind. Microsoft empfiehlt für neue Profile standardmäßig ressourcenschonende HEAD-Anfragen. Der Endpoint sollte keine Weiterleitung auf eine Login-Seite auslösen und keine unnötig aufwendigen Datenbank- oder API-Abfragen durchführen.",
        refs: [10],
      },
      { type: "paragraph", text: "Caching sollte nur für eindeutig geeignete Inhalte aktiviert werden, beispielsweise:" },
      {
        type: "bullets",
        items: [
          "JavaScript- und CSS-Dateien,",
          "Bilder,",
          "Schriftarten,",
          "öffentliche Downloads,",
          "nicht personalisierte Inhalte.",
        ],
      },
      {
        type: "paragraph",
        text: "Bei dynamischen oder nutzerspezifischen Responses ist besondere Vorsicht erforderlich. Query Strings und Cache Keys bestimmen, ob unterschiedliche Requests als dieselbe Ressource behandelt werden. Eine unpassende Konfiguration kann im schlimmsten Fall dafür sorgen, dass personalisierte Inhalte an andere Nutzer ausgeliefert werden.",
        refs: [11],
      },

      { type: "subheading", text: "5. Monitoring aktivieren" },
      {
        type: "paragraph",
        text: "Front Door Access Logs, Health Probe Logs und WAF Logs sind nicht automatisch aktiviert. Sie sollten über Diagnostic Settings an Log Analytics oder eine andere zentrale Logplattform übertragen werden.",
        refs: [12],
      },
      { type: "paragraph", text: "Ein grundlegendes Monitoring sollte mindestens folgende Kennzahlen abdecken:" },
      {
        type: "bullets",
        items: [
          "Request-Anzahl,",
          "Antwortzeiten,",
          "4xx- und 5xx-Fehler,",
          "blockierte WAF-Requests,",
          "häufig ausgelöste WAF-Regeln,",
          "Origin-Verfügbarkeit,",
          "Cache-Hit-Rate,",
          "ausgehende Datenmenge.",
        ],
      },
      {
        type: "diagram",
        steps: [
          { label: "Azure Front Door", items: ["Access Logs", "WAF Logs", "Health Probe Logs", "Metrics"] },
          { label: "Diagnostic Settings" },
          { label: "Log Analytics", items: ["Dashboards", "KQL Queries", "Alerts"] },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Monitor und Log Analytics ermöglichen, Fehler über mehrere Ebenen zu untersuchen. So kann beispielsweise unterschieden werden, ob ein Request bereits durch die WAF blockiert wurde, Front Door keinen gesunden Origin gefunden hat oder die Anwendung selbst einen Fehler zurückgegeben hat.",
        refs: [13],
      },

      { type: "subheading", text: "6. Infrastructure as Code und CI/CD" },
      {
        type: "paragraph",
        text: "Front Door, WAF Policies, Routen, Origins und Diagnostic Settings sind produktionskritische Konfigurationen. Sie sollten nicht ausschließlich manuell im Azure Portal gepflegt werden.",
      },
      {
        type: "paragraph",
        text: "Mit Bicep oder Terraform lassen sie sich deklarativ beschreiben und über Pull Requests kontrolliert verändern. Microsoft empfiehlt Infrastructure as Code ausdrücklich, um Front-Door-Konfigurationen konsistent bereitzustellen und Änderungen wie neue WAF-Regelversionen nachvollziehbar zu verwalten. Die vollständige Implementierung sollte modular aufgebaut sein:",
        refs: [14],
      },
      {
        type: "filetree",
        nodes: [
          {
            type: "folder",
            name: "infrastructure",
            defaultOpen: true,
            children: [
              { type: "file", name: "main.bicep" },
              {
                type: "folder",
                name: "modules",
                note: "Wiederverwendbare Bicep-Module je Ressource",
                children: [
                  { type: "file", name: "front-door.bicep" },
                  { type: "file", name: "waf-policy.bicep" },
                  { type: "file", name: "origins.bicep" },
                  { type: "file", name: "routes.bicep" },
                  { type: "file", name: "app-service.bicep" },
                  { type: "file", name: "monitoring.bicep" },
                ],
              },
              {
                type: "folder",
                name: "environments",
                note: "Parameter je Umgebung",
                children: [
                  { type: "file", name: "dev.bicepparam" },
                  { type: "file", name: "test.bicepparam" },
                  { type: "file", name: "prod.bicepparam" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "Beispielcode, wie Infrastructure as Code mit Bicep umgesetzt werden kann, stellen wir in einem offenen Repository bereit:",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-iac-with-bicep",
        description: "Infrastructure as Code für Azure – reproduzierbar mit Bicep.",
        url: "https://github.com/smiit-GmbH/azure-iac-with-bicep",
      },
      { type: "paragraph", text: "Ein möglicher Deployment-Prozess lautet:" },
      {
        type: "diagram",
        steps: [
          { label: "Feature Branch" },
          { label: "Pull Request" },
          { label: "Bicep Validation" },
          { label: "Deployment nach Dev" },
          { label: "Smoke- und Security-Tests" },
          { label: "Approval" },
          { label: "Deployment nach Produktion" },
        ],
      },
      {
        type: "paragraph",
        text: "Dadurch werden nicht nur wiederkehrende Aufgaben automatisiert. Jede Änderung an Routing, WAF oder Origin-Konfiguration ist versioniert, überprüfbar und im Fehlerfall leichter zurückzuverfolgen.",
      },

      { type: "heading", text: "Architektur-Reifegrad: Nicht jede Anwendung benötigt sofort Multi-Region" },
      {
        type: "paragraph",
        text: "Ein häufiger Fehler besteht darin, Azure Front Door direkt als globale Active-Active-Plattform mit mehreren Regionen zu planen. Technisch ist das möglich, aber nicht für jede Anwendung wirtschaftlich oder betrieblich sinnvoll.",
      },
      {
        type: "paragraph",
        text: "Eine zweite Anwendungsregion allein erzeugt noch keine vollständige Multi-Region-Architektur. Zusätzlich müssen Datenreplikation, Identity Provider, Storage, Messaging, Hintergrundprozesse und Failback-Verfahren berücksichtigt werden. Für viele Unternehmen ist deshalb ein schrittweiser Aufbau sinnvoll:",
      },
      {
        type: "maturity",
        items: [
          { level: 0, label: "Direkter öffentlicher Origin" },
          { level: 1, label: "Zentraler Einstiegspunkt (Front Door)" },
          { level: 2, label: "WAF und Monitoring" },
          { level: 3, label: "Geschützter Origin" },
          { level: 4, label: "Private Link und Infrastructure as Code" },
          { level: 5, label: "Multi-Region und automatisiertes Failover" },
        ],
      },
      {
        type: "paragraph",
        text: "Level 0 bedeutet direkten Zugriff auf den technischen Endpunkt mit dezentraler Verwaltung. Mit Level 1 wird Front Door zur zentralen Domain- und Routingebene, mit Level 2 kommen Managed WAF Rules und Monitoring hinzu. Ab Level 3 wird der direkte Origin-Zugriff eingeschränkt und Front Door zum verbindlichen Zugriffspfad, mit Level 4 folgen Private Link und Infrastructure as Code. Level 5 verbindet schließlich mehrere Regionen über prioritäts- oder gewichtsbasiertes Routing.",
      },
      {
        type: "paragraph",
        text: "Für viele Anwendungen stellt bereits Level 3 oder 4 einen großen Fortschritt dar. Multi-Region sollte dann ergänzt werden, wenn fachliche Anforderungen an Verfügbarkeit, Recovery Time Objective und Recovery Point Objective den zusätzlichen Aufwand rechtfertigen.",
      },

      { type: "heading", text: "Best Practices für Azure Front Door" },
      {
        type: "numbered",
        items: [
          { title: "Front Door als verbindlichen Einstiegspunkt etablieren", description: "Eine WAF schützt nur den Traffic, der sie tatsächlich durchläuft. Der Origin sollte nicht über einen alternativen öffentlichen Pfad erreichbar bleiben." },
          { title: "Private Link bevorzugen", description: "Für unterstützte Azure-Dienste bietet Azure Front Door Premium mit Private Link die konsequenteste Origin-Absicherung. Ist Private Link nicht möglich, sollten Service Tags und profilspezifische Header-Prüfungen kombiniert werden." },
          { title: "WAF schrittweise einführen", description: "Eine neue Policy sollte zunächst im Detection Mode beobachtet werden. Erst nach der Analyse legitimer Requests und notwendiger Ausnahmen sollte sie Traffic aktiv blockieren." },
          { title: "Ausnahmen möglichst eng definieren", description: "Nicht eine vollständige Regelgruppe deaktivieren, wenn nur ein einzelnes Request-Feld einen False Positive verursacht. Je kleiner die Ausnahme, desto größer bleibt die Schutzwirkung." },
          { title: "Caching bewusst einsetzen", description: "Caching ist vor allem für statische und nicht personalisierte Inhalte geeignet. Query Strings, Cookies und Autorisierungsheader müssen bei der Cache-Konzeption ausdrücklich berücksichtigt werden." },
          { title: "Konfigurationen versionieren", description: "Front Door, WAF Policies, Routen, Domains und Diagnostic Settings sollten als Code beschrieben und über einen kontrollierten CI/CD-Prozess bereitgestellt werden." },
          { title: "Architektur aus Geschäftsanforderungen ableiten", description: "Nicht jede Anwendung benötigt mehrere Regionen, zusätzliche Gateways oder hochkomplexes Routing. Die technische Ausprägung sollte aus Sicherheits-, Verfügbarkeits- und Performanceanforderungen entstehen." },
        ],
      },

      { type: "heading", text: "Fazit: Ein sicherer Edge-Layer für moderne Webanwendungen" },
      {
        type: "paragraph",
        text: "Azure Front Door ist mehr als ein globaler Load Balancer. Der Dienst verbindet Traffic Routing, TLS, Content Delivery, Web Application Firewall und Origin-Anbindung in einer gemeinsamen Edge-Schicht.",
      },
      {
        type: "paragraph",
        text: "Der größte Sicherheitsgewinn entsteht nicht allein durch die Aktivierung einer WAF. Entscheidend ist, dass Front Door zum verbindlichen Einstiegspunkt der Anwendung wird und alternative Zugriffe auf den Origin technisch verhindert werden.",
      },
      {
        type: "paragraph",
        text: "In Kombination mit Azure Front Door Premium, Private Link, API Management, Azure Monitor und Infrastructure as Code entsteht eine Architektur, die sich sicher und reproduzierbar betreiben lässt. Domains, Routing und Sicherheitsregeln werden zentral verwaltet, während Frontend, API und Datenplattform klar getrennte Verantwortlichkeiten behalten.",
      },
      {
        type: "paragraph",
        text: "Dabei muss nicht jede Anwendung sofort als globale Multi-Region-Plattform aufgebaut werden. Ein schrittweiser Reifegrad ist häufig wirtschaftlicher und operativ robuster: zunächst ein zentraler Einstiegspunkt, anschließend WAF und Monitoring, danach Origin-Schutz und Private Link. Multi-Region und automatisiertes Failover folgen erst, wenn die fachlichen Anforderungen es rechtfertigen. So wird Azure Front Door nicht zu einer weiteren vorgeschalteten Azure-Ressource, sondern zu einem zentralen Bestandteil einer sicheren und skalierbaren Enterprise-Webarchitektur.",
      },
    ],

    faq: [
      {
        question: "Wann benötigt man Azure Front Door Premium?",
        answer:
          "Premium unterscheidet sich von Standard vor allem in zwei praxisrelevanten Punkten: der privaten Origin-Anbindung über Private Link und dem Zugriff auf Microsofts verwaltete WAF-Regelsätze inklusive Bot-Schutz. Wer seinen Ursprung nicht öffentlich erreichbar lassen möchte oder auf gepflegte Managed Rules statt ausschließlich eigener Regeln setzt, braucht Premium. Für reines globales Routing, TLS, CDN-Caching und einfache, selbst definierte WAF-Regeln reicht dagegen häufig Standard. In der Praxis lohnt sich Premium besonders für datenintensive Enterprise-Anwendungen mit hohen Sicherheits- und Compliance-Anforderungen; für kleinere, unkritische Workloads ist Standard oft der wirtschaftlichere Einstieg.",
      },
      {
        question: "Ersetzt Azure Front Door API Management?",
        answer:
          "Nein – die beiden Dienste arbeiten auf unterschiedlichen Ebenen und ergänzen sich. Front Door ist die globale Edge-Schicht für Routing, TLS, WAF und Content Delivery und entscheidet, welcher Request überhaupt an welche Region und welchen Ursprung gelangt. API Management setzt danach an und übernimmt API-spezifische Aufgaben: Tokenvalidierung (OAuth/JWT), Prüfung von Scopes und Claims, Rate Limits je Subscription, Request- und Response-Transformationen, Versionierung und die Verwaltung von API-Produkten. In der Praxis liegt API Management hinter Front Door – idealerweise privat angebunden –, sodass die WAF technische Angriffsmuster filtert und API Management die fachliche API-Governance übernimmt. Nur eines der beiden abzudecken, lässt in der Regel eine wichtige Schutzebene offen.",
      },
      {
        question: "Braucht man zusätzlich Application Gateway?",
        answer:
          "Nicht grundsätzlich. Application Gateway ist ein regionaler Layer-7-Load-Balancer und spielt seine Stärken dort aus, wo ein VNet-naher Ingress benötigt wird – etwa vor virtuellen Maschinen, einem AKS-Cluster oder Legacy-Workloads innerhalb eines virtuellen Netzwerks. Front Door hingegen ist global und sitzt vor der Region. Für eine typische PaaS-Architektur auf App Service oder Container Apps mit API Management kann Front Door direkt mit den – idealerweise privat angebundenen – Ursprüngen verbunden werden, ohne dass ein Application Gateway dazwischenliegt. Beide zu kombinieren ergibt nur Sinn, wenn jede Schicht eine klar getrennte Aufgabe erfüllt; mehr hintereinandergeschaltete Gateways bedeuten sonst vor allem mehr Latenz, Kosten und Betriebsaufwand.",
      },
      {
        question: "Reicht die Web Application Firewall als Schutz der Anwendung aus?",
        answer:
          "Nein. Die WAF filtert bekannte technische Angriffsmuster wie SQL Injection oder Cross-Site Scripting und begrenzt über Rate Limits automatisierte Zugriffe – sie ist eine wichtige, aber generische Schicht. Ob ein bestimmter Nutzer einen bestimmten Datensatz sehen darf, ob Tokens gültig sind oder ob die Geschäftslogik missbraucht wird, kann sie nicht beurteilen. Solche fachlichen Lücken – etwa Broken Access Control, die in den OWASP Top 10 ganz oben stehen – müssen weiterhin in der Anwendung, in der Authentifizierung und in der API-Governance abgesichert werden. Die WAF ergänzt sichere Softwareentwicklung also, ersetzt sie aber nicht; der eigentliche Schutz entsteht erst im Zusammenspiel aus WAF, API Management und sauberer Anwendungslogik.",
      },
      {
        question: "Wie stelle ich sicher, dass der Origin wirklich nur über Front Door erreichbar ist?",
        answer:
          "Das ist der wichtigste Sicherheitsschritt – und er passiert nicht automatisch, nur weil Front Door davorsteht. Die konsequenteste Variante ist Azure Front Door Premium mit Private Link: Der Ursprung wird privat angebunden und sein öffentlicher Netzwerkzugriff anschließend deaktiviert, soweit der Dienst das zulässt. Ist Private Link nicht möglich, lässt sich der Zugriff über den Service Tag AzureFrontDoor.Backend einschränken und zusätzlich der profilspezifische Header X-Azure-FDID prüfen, sodass nur das eigene Front-Door-Profil den Origin verwenden darf. Entscheidend ist der abschließende Negativtest: Ein Request über Front Door muss mit 200 OK durchgehen, ein direkter Request auf den technischen Origin-Hostnamen dagegen blockiert werden. Erst wenn dieser direkte Zugriff scheitert, ist Front Door tatsächlich der verbindliche Einstiegspunkt.",
      },
      {
        question: "Wie führe ich Azure Front Door vor einer bestehenden Anwendung ein, ohne Ausfallzeiten?",
        answer:
          "Am besten schrittweise und testbar, bevor der öffentliche Datenverkehr umgeleitet wird. Zunächst wird das Front-Door-Profil mit der bestehenden Anwendung als Origin, der benutzerdefinierten Domain, TLS und einer zunächst im Detection Mode laufenden WAF eingerichtet. Über den vorläufigen Front-Door-Endpunkt lässt sich die gesamte Kette testen – Routing, Zertifikate, Header und Health Checks –, während die produktive Domain noch direkt auf den Origin zeigt. Erst danach folgt die DNS-Umstellung, in der Regel per CNAME auf den Front-Door-Endpunkt, idealerweise mit vorab reduzierter TTL, um schnell zurückwechseln zu können. Sobald der Traffic stabil über Front Door läuft und die WAF abgestimmt ist, folgen die beiden letzten Schritte: die WAF in den Prevention Mode überführen und den direkten öffentlichen Zugriff auf den Origin sperren.",
      },
      {
        question: "Sollte jede Anwendung über mehrere Azure-Regionen betrieben werden?",
        answer:
          "Nein. Multi-Region erhöht die Verfügbarkeit deutlich, aber auch Kosten, Komplexität und Betriebsaufwand. Front Door kann zwar per Prioritäts- oder Gewichts-Routing schnell auf eine zweite Region umschalten – eine zweite Anwendungsregion allein ergibt jedoch noch keine belastbare Ausfallsicherheit. Entscheidend sind die nachgelagerten Ebenen: Datenreplikation, Identity Provider, Storage, Messaging und Hintergrundprozesse müssen ebenfalls auf einen regionalen Ausfall und ein sauberes Failback vorbereitet sein. In der Praxis sollte Multi-Region an konkreten Zielwerten festgemacht werden – Recovery Time Objective und Recovery Point Objective; für viele Anwendungen ist ein robuster Single-Region-Betrieb mit geschütztem Origin und Monitoring der wirtschaftlichere erste Schritt.",
      },
      {
        question: "Können Front Door und der Origin dasselbe Zertifikat verwenden?",
        answer:
          "Sie müssen nicht dasselbe Zertifikat verwenden – und in der Praxis tun sie es meist auch nicht. Der Client baut eine TLS-Verbindung zur benutzerdefinierten Domain auf Front Door auf; Front Door terminiert diese und stellt eine separate TLS-Verbindung zum Origin her. Für die öffentliche Domain verwaltet Front Door das Zertifikat in der Regel automatisch (Managed Certificate) oder greift auf ein Zertifikat aus Key Vault zu. Der Origin sollte trotzdem ein gültiges Zertifikat besitzen, damit auch die zweite Verbindung verschlüsselt und der Hostname prüfbar bleibt – „TLS bis zum Edge und danach unverschlüsselt“ ist keine sichere Konfiguration. Ein selbstsigniertes oder abgelaufenes Origin-Zertifikat führt sonst zu Verbindungsfehlern oder unnötigen Sicherheitslücken.",
      },
      {
        question: "Warum sind Front-Door-Logs in Log Analytics nicht sichtbar?",
        answer:
          "Weil sie nicht standardmäßig aktiviert sind. Access Logs, Health Probe Logs und WAF Logs entstehen erst, wenn in den Diagnostic Settings des Front-Door-Profils ein Ziel konfiguriert ist – etwa ein Log-Analytics-Workspace, ein Storage Account oder ein Event Hub. Praktisch heißt das: Diagnostic Settings anlegen, die gewünschten Log-Kategorien auswählen und einige Minuten bis zum Eintreffen der ersten Einträge einplanen. Danach lassen sich mit KQL gezielt Fragen beantworten, etwa welche WAF-Regeln am häufigsten auslösen oder ob ein Fehler bereits an der WAF, an einem ungesunden Origin oder erst in der Anwendung entstand. Ohne aktivierte Diagnostics fehlt im Ernstfall genau die Datengrundlage für die Fehlersuche.",
      },
    ],

    sources: [
      { title: "Microsoft Learn: Azure Front Door (classic) – Abkündigung und Migration (Retirement FAQ)", url: "https://learn.microsoft.com/en-us/azure/frontdoor/classic-retirement-faq" },
      { title: "OWASP Foundation: OWASP Top 10:2025", url: "https://owasp.org/Top10/2025/" },
      { title: "Rose, S., Borchert, O., Mitchell, S. & Connelly, S. (2020): Zero Trust Architecture. NIST Special Publication 800-207.", url: "https://doi.org/10.6028/NIST.SP.800-207" },
      { title: "Microsoft Learn: What is Azure Front Door? (Overview)", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview" },
      { title: "Microsoft Learn: Secure your origin with Private Link", url: "https://learn.microsoft.com/en-us/azure/frontdoor/private-link" },
      { title: "Yang, L. et al. (2022): Multi-Perspective Content Delivery Networks Security Framework Using Optimized Unsupervised Anomaly Detection. IEEE Transactions on Network and Service Management, 19(1), 686–705. DOI: 10.1109/TNSM.2021.3100308 (frei zugänglicher Preprint: arXiv:2107.11514).", url: "https://arxiv.org/abs/2107.11514" },
      { title: "Microsoft Learn: Best practices for Azure Web Application Firewall in Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-best-practices" },
      { title: "Microsoft Learn: Configure Azure Front Door in front of Azure API Management", url: "https://learn.microsoft.com/en-us/azure/api-management/front-door-api-management" },
      { title: "Microsoft Learn: Traffic routing methods to origin", url: "https://learn.microsoft.com/en-us/azure/frontdoor/routing-methods" },
      { title: "Microsoft Learn: Health probes – Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/health-probes" },
      { title: "Microsoft Learn: Caching with Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching" },
      { title: "Microsoft Learn: Configure Azure Front Door logs", url: "https://learn.microsoft.com/en-us/azure/frontdoor/standard-premium/how-to-logs" },
      { title: "Microsoft Learn: Monitor Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/monitor-front-door" },
      { title: "Microsoft Learn: Architecture best practices for Azure Front Door (Azure Well-Architected Framework)", url: "https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-front-door" },
      { title: "NGINX Documentation: Using NGINX as an HTTP load balancer", url: "https://nginx.org/en/docs/http/load_balancing.html" },
      { title: "Traefik Proxy Documentation", url: "https://doc.traefik.io/traefik/" },
      { title: "Microsoft Learn: Secure an Azure Front Door deployment", url: "https://learn.microsoft.com/en-us/azure/frontdoor/secure-front-door" },
    ],

    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    keywords: [
      "Azure Front Door",
      "Web Application Firewall",
      "WAF",
      "Private Link",
      "Zero Trust",
      "Edge",
      "CDN",
      "Reverse Proxy",
      "Enterprise-Architektur",
      "Infrastructure as Code",
      "API Management",
      "Azure Sicherheit",
    ],
    metaTitle: "Azure Front Door in Enterprise-Architekturen: WAF, Private Link & Best Practices | smiit",
    metaDescription:
      "Wie Azure Front Door als sicherer, globaler Einstiegspunkt für Webanwendungen dient – WAF, Private Link, Routing, Monitoring, Infrastructure as Code und ein Reifegradmodell.",
  },

  en: {
    slug: "azure-front-door-in-enterprise-architectures",
    category: "strategy",
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    author: "Sebastian Grab",
    title:
      "Azure Front Door in enterprise architectures: best practices for secure and scalable web applications",
    shortTitle: "Azure Front Door in enterprise architectures",
    excerpt:
      "Exposing web applications directly to the public internet is easy — but rarely secure enough. How Azure Front Door becomes a controlled, reproducible entry point for modern enterprise web applications as a global edge layer with WAF, Private Link and infrastructure as code.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Azure Front Door in enterprise architectures",
    },
    coverImage: {
      url: "/assets/blog/azure-front-door/afd-map.webp",
      width: 2979,
      height: 1827,
      alt: "Azure Front Door as a global edge layer with TLS, WAF, routing and caching, directing requests to edge locations worldwide.",
    },

    blocks: [
      { type: "heading", text: "Security starts in front of the application" },
      {
        type: "paragraph",
        text: "Web applications and APIs are among the most important interfaces between companies, customers, partners and internal systems. They are often exposed directly via a public App Service, a container platform or an API gateway. For a first application this can be sufficient. But as requirements for security, availability and scalability grow, additional challenges quickly arise.",
      },
      {
        type: "paragraph",
        text: "Alongside the application itself, TLS certificates have to be managed, application-layer attacks detected, multiple backends routed and the failure of individual instances absorbed. At the same time, attackers should be prevented from bypassing upstream security controls and reaching the origin service directly.",
      },
      {
        type: "paragraph",
        text: "Azure Front Door sits in front of the actual application. The service forms a globally distributed edge layer that accepts incoming HTTP and HTTPS traffic, inspects it via a web application firewall and forwards it in a controlled way to suitable origin services. Combined with Private Link, Azure Monitor and infrastructure as code, this creates a central, reproducible entry point for modern enterprise web applications.",
      },
      {
        type: "paragraph",
        text: "This article shows how Azure Front Door can be used in such an architecture, which tasks the WAF and Private Link take on, and which best practices should be considered for routing, monitoring and deployment.",
      },
      {
        type: "paragraph",
        text: "Note: this article refers to Azure Front Door Standard and Premium. Azure Front Door Classic will be retired on 31 March 2027 and should no longer be used for new architectures.",
        refs: [1],
      },

      { type: "heading", text: "Why publicly reachable web applications need additional protection" },
      {
        type: "paragraph",
        text: "Many web applications begin with a comparatively simple architecture: a frontend or an API runs on Azure App Service, Azure Container Apps, Azure Kubernetes Service or a virtual machine and is made reachable via a public HTTPS endpoint.",
      },
      {
        type: "paragraph",
        text: "That is technically straightforward, but it combines several responsibilities in a single component. The origin service accepts public traffic, terminates TLS and processes the actual application logic at the same time. Security rules, certificates, routing and monitoring are often configured separately per application.",
      },
      { type: "paragraph", text: "As usage grows, typical challenges arise:" },
      {
        type: "bullets",
        items: [
          "Multiple applications need different domains and certificates.",
          "APIs and frontends should be reachable via shared or separate paths.",
          "Attacks such as SQL injection, cross-site scripting or automated bot access should be detected as early as possible.",
          "An application should stay reachable even if an instance or region fails.",
          "Static content should be delivered performantly to geographically distributed users.",
          "Security and routing configurations should stay consistent across development, test and production environments.",
        ],
      },
      {
        type: "paragraph",
        text: "The OWASP Top 10 document central security risks of modern web applications. An upstream web application firewall can detect and block some of these attack patterns. But it replaces neither secure software development nor correct authentication and authorisation.",
        refs: [2],
      },
      {
        type: "paragraph",
        text: "A further problem arises when a WAF is placed in front of the application but the original App Service or API endpoint remains freely reachable. The intended path leads through the firewall:",
      },
      {
        type: "diagram",
        steps: [{ label: "User" }, { label: "Web application firewall" }, { label: "Application" }],
      },
      {
        type: "paragraph",
        text: "In that case, the WAF only protects the traffic that actually passes through it. If an attacker knows the technical hostname of the origin, they can try to call it directly, bypassing the firewall.",
      },
      {
        type: "paragraph",
        text: "From the perspective of a zero-trust architecture, traffic should not be trusted simply because it uses a certain network path. NIST describes zero trust as a security model that puts resources and explicit access decisions at the centre, instead of deriving implicit trust from a network location. Applied to a web architecture this means: the intended access path should not only be documented, but technically enforced.",
        refs: [3],
      },
      {
        type: "grid",
        items: [
          { title: "Direct public origin", description: "Internet → public App Service. Risks: direct origin access, decentralised TLS configuration, no central WAF, inconsistent monitoring." },
          { title: "Controlled access via Front Door", description: "Internet → Azure Front Door + WAF → private origin. Benefits: controlled entry point, central security rules, private origin, consistent logging." },
        ],
      },

      { type: "heading", text: "What Azure Front Door means in practice" },
      {
        type: "paragraph",
        text: "Azure Front Door is Microsoft's global application delivery and content delivery service for HTTP and HTTPS applications. It uses Microsoft's global edge network to accept requests at geographically distributed points of presence and then forward them to suitable origin services.",
        refs: [4],
      },
      { type: "paragraph", text: "Simplified, Azure Front Door can be understood as a kind of globally distributed reverse proxy:" },
      {
        type: "diagram",
        steps: [
          { label: "User" },
          { label: "Azure Front Door edge", items: ["TLS", "WAF", "Routing", "Caching", "Health-based origin selection"] },
          { label: "Application or API" },
        ],
      },
      {
        type: "paragraph",
        text: "The client does not connect directly to the App Service or API gateway. Instead, it calls a custom domain such as app.example.com that is connected to Azure Front Door. Front Door accepts the request, checks it against the configured rules and forwards it to a suitable origin.",
      },
      { type: "paragraph", text: "Its central capabilities include:" },
      {
        type: "grid",
        items: [
          { title: "Global HTTP and HTTPS routing", description: "Requests are mapped to different applications or APIs based on domains and URL paths, e.g. /api/* to API Management." },
          { title: "Web application firewall", description: "The integrated WAF protects applications with Microsoft-managed and custom rules against typical attacks and unusual access patterns." },
          { title: "TLS and certificate management", description: "Front Door terminates TLS at the edge and manages certificates for custom domains, including automatic renewal." },
          { title: "Caching and compression", description: "Suitable content is cached at edge locations and served closer to the user, reducing latency and origin load." },
          { title: "Health-based origin selection", description: "With multiple origins, Front Door checks their availability and reroutes requests to another origin on failure." },
          { title: "Private origin connectivity", description: "Azure Front Door Premium connects supported Azure services via Private Link, so the origin no longer has to be reachable over the public internet." },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Front Door is therefore more than a classic load balancer. It combines global traffic distribution, web security, content delivery and origin protection in a shared edge layer.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Research on content delivery networks likewise shows that globally distributed delivery structures bring both performance advantages and their own security requirements. Yang et al., for example, study DoS and cache-pollution attacks in real CDN data and highlight the importance of multi-layered analysis and monitoring mechanisms.",
        refs: [6],
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-map.webp",
        width: 2979,
        height: 1827,
        maxWidth: 940,
        alt: "World map with an Azure Front Door edge (TLS, WAF, routing, cache) forwarding requests to geographically distributed edge locations across several continents.",
        caption: "Azure Front Door accepts requests at Microsoft's globally distributed edge locations and forwards them in a controlled way to suitable origin services.",
      },

      { type: "heading", text: "Why Microsoft Azure is a good approach for secure web architectures" },
      {
        type: "paragraph",
        text: "The key advantage of Azure Front Door lies not only in the individual service, but in its integration with other Azure components.",
      },
      { type: "paragraph", text: "A typical enterprise web architecture can combine, among others, the following services:" },
      {
        type: "bullets",
        items: [
          "Azure Front Door as the global entry point,",
          "web application firewall to protect HTTP traffic,",
          "Azure App Service or Container Apps for the application,",
          "Azure API Management for API governance,",
          "Private Link for protected origin connections,",
          "Key Vault for certificates and secrets,",
          "Azure Monitor and Log Analytics for monitoring,",
          "Microsoft Entra ID for identities and access control,",
          "Bicep or Terraform for infrastructure as code,",
          "Azure DevOps or GitHub Actions for CI/CD.",
        ],
      },
      {
        type: "paragraph",
        text: "This lets network, identities, applications, monitoring and deployment be integrated into a shared operating model.",
      },

      { type: "subheading", text: "Front Door, Application Gateway and API Management" },
      {
        type: "paragraph",
        text: "Because several Azure services process HTTP traffic, their responsibilities are often confused. Azure Front Door is used before the traffic reaches the actual application region. Application Gateway, by contrast, is a regional service and suits, for example, a VNet-close ingress for virtual machines or Kubernetes workloads.",
      },
      {
        type: "paragraph",
        text: "API Management, in turn, does not handle global content delivery but API-specific tasks such as token validation, transformations, versioning, quotas and the management of API products. The services can be combined, but don't have to be. A typical SaaS application on App Service often needs Azure Front Door and API Management, but no additional Application Gateway. Multiple gateways should only be used when each fulfils a clearly defined responsibility.",
      },
      {
        type: "paragraph",
        text: "Architecture note: an architecture does not automatically become more secure by chaining together as many security and network services as possible. What matters is clear responsibilities and a controlled request flow.",
      },

      { type: "subheading", text: "Delineation from self-managed proxies (NGINX, Traefik)" },
      {
        type: "paragraph",
        text: "NGINX and Traefik are powerful reverse proxies and load balancers. They are particularly well suited as a regional ingress for container, Docker or Kubernetes environments, for internal routing and for architectures where companies want to keep as much control over configuration and operations as possible. Traefik can automatically discover services from orchestration platforms, while NGINX provides very flexible proxy, routing and load-balancing capabilities.",
        refs: [15, 16],
      },
      {
        type: "paragraph",
        text: "However, they are not directly equivalent to Azure Front Door. Azure Front Door is a fully managed, globally distributed edge service. It combines Microsoft's worldwide network with WAF, DDoS protection, certificate management, CDN caching, health-based global routing and the private connection of supported Azure origins. With a self-operated solution, high availability, global distribution, scaling, updates, certificates, WAF, DDoS protection and monitoring would all have to be built and run separately. Both approaches can also be combined: Front Door handles the global edge layer, while NGINX or Traefik serve as an ingress within a region.",
        refs: [4, 5, 17],
      },

      { type: "heading", text: "Target architecture: Azure Front Door in an enterprise application" },
      {
        type: "paragraph",
        text: "A possible target architecture consists of a browser-based web application, an API and several private platform services. Only Azure Front Door is in the public zone; all downstream services are connected via Private Link.",
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-traffic.webp",
        width: 2960,
        height: 1970,
        maxWidth: 900,
        alt: "Four-layer reference architecture: users & internet, global edge layer with Azure Front Door (custom domain, TLS, firewall, routing), application layer with web application and API Management via Private Link, and data & platform services with backend API, database and storage.",
        caption: "Enterprise reference architecture with four layers: only Azure Front Door is public; the web app and API Management are connected via Private Link, followed by the backend API and data platform.",
      },

      { type: "subheading", text: "Azure Front Door as the central entry point" },
      {
        type: "paragraph",
        text: "All public domains of the application point to Azure Front Door. Front Door handles TLS, WAF inspection and routing. The technical hostname of the App Service or API gateway is not used as a public entry point.",
      },
      { type: "paragraph", text: "This creates a central place for:" },
      {
        type: "bullets",
        items: [
          "domains and certificates,",
          "security rules,",
          "HTTP-to-HTTPS redirects,",
          "URL routing,",
          "caching,",
          "health checks,",
          "access logs.",
        ],
      },

      { type: "subheading", text: "Separate routes for frontend and API" },
      { type: "paragraph", text: "Frontend and API can be published via different domains:" },
      {
        type: "code",
        content: "app.example.com   →  web application\napi.example.com   →  API Management",
      },
      { type: "paragraph", text: "Alternatively, both can be reachable via the same domain:" },
      {
        type: "code",
        content: "app.example.com/*       →  web application\napp.example.com/api/*   →  API Management",
      },
      {
        type: "paragraph",
        text: "A shared domain often simplifies browser-based applications because fewer cross-origin configurations are required. A separate API domain, by contrast, makes sense when the API is also used by mobile applications, partners or other systems.",
      },

      { type: "subheading", text: "Web application firewall at the edge" },
      {
        type: "paragraph",
        text: "The WAF inspects requests before they consume resources of the App Service or API Management. Microsoft recommends using the WAF with managed rules for internet-facing applications. The rules should first be tuned to the actual traffic, otherwise legitimate requests can be blocked by mistake. During this tuning, the policy can log in detection mode without blocking traffic.",
        refs: [7],
      },
      {
        type: "paragraph",
        text: "The WAF complements application security but does not replace it. Whether a user may access a specific record must still be checked by the application or API.",
      },

      { type: "subheading", text: "Private origins" },
      {
        type: "paragraph",
        text: "The most important security gain arises when the origin is not reachable independently of Front Door. Azure Front Door Premium can connect supported PaaS services via Private Link. The origin should additionally be configured so that it accepts no traffic that does not arrive over this private connection.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "If Private Link is not available, access can be restricted, for example, via the AzureFrontDoor.Backend service tag and by checking the profile-specific X-Azure-FDID header. This variant is less rigorous than a private origin, but likewise prevents arbitrary clients from using the origin directly.",
        refs: [8],
      },

      { type: "subheading", text: "API Management as a second security layer" },
      { type: "paragraph", text: "API Management complements Front Door with API-specific controls. While the WAF examines technical attack patterns, API Management can, for example:" },
      {
        type: "bullets",
        items: [
          "validate OAuth and JWT tokens,",
          "check required claims and scopes,",
          "apply limits per subscription or user,",
          "transform requests and responses,",
          "manage API versions,",
          "hide internal backend endpoints.",
        ],
      },
      {
        type: "paragraph",
        text: "Microsoft supports both publicly restricted and privately connected APIM origins behind Azure Front Door.",
        refs: [8],
      },

      { type: "heading", text: "Implementation: how Azure Front Door is set up in concrete terms" },
      {
        type: "paragraph",
        text: "Once the target architecture is defined, the practical question is how it can be implemented and operated reproducibly. A robust implementation pursues five goals:",
      },
      {
        type: "bullets",
        items: [
          "Front Door is the only intended public access path.",
          "Security rules are introduced and monitored in a controlled way.",
          "Routing and health checks reflect the actual application structure.",
          "Infrastructure changes are deployed in a versioned way.",
          "Errors can be traced via central logs.",
        ],
      },

      { type: "subheading", text: "1. Define domains and routing" },
      {
        type: "paragraph",
        text: "First, the public domains and the desired request paths are defined. The routing structure should stay as simple as possible. One possible model is:",
      },
      {
        type: "code",
        content: "app.example.com/*       →  frontend-origin-group\napp.example.com/api/*   →  api-origin-group",
      },
      {
        type: "paragraph",
        text: "In addition to path-based routing, Azure Front Door supports different methods for selecting an origin. Priorities enable, for example, an active-passive architecture, while weights can be used for gradual migrations or canary deployments.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "The architecture should not start with complex routing when only one origin is needed. For many applications, a single region with a clearly defined frontend and API path is enough at first.",
      },

      { type: "subheading", text: "2. Introduce the WAF in a controlled way" },
      {
        type: "paragraph",
        text: "The WAF should be activated with Microsoft's managed rules. Custom rules can additionally be added for application-specific requirements, for example:",
      },
      {
        type: "bullets",
        items: [
          "rate limits for login or export endpoints,",
          "restriction of administration paths,",
          "blocking of unneeded HTTP methods,",
          "geo filters for regionally limited applications,",
          "handling of known bots.",
        ],
      },
      { type: "paragraph", text: "A controlled rollout is recommended for the introduction:" },
      {
        type: "diagram",
        steps: [
          { label: "Define WAF baseline" },
          { label: "Enable detection mode" },
          { label: "Analyse logs and false positives" },
          { label: "Define exceptions as narrowly as possible" },
          { label: "Enable prevention mode" },
          { label: "Monitor continuously" },
        ],
      },
      {
        type: "paragraph",
        text: "Blanket exceptions should be avoided. If a single search field falsely triggers a SQL injection rule, only that specific field should be excluded for the affected rule. Fully disabling all SQL injection rules would unnecessarily reduce the protective effect.",
      },
      {
        type: "paragraph",
        text: "Rate limits should also not be set too low. Many legitimate users may also share a common corporate or mobile IP. Microsoft generally recommends sufficiently high thresholds that limit extreme usage without prematurely blocking legitimate traffic.",
        refs: [7],
      },

      { type: "subheading", text: "3. Secure the origins" },
      { type: "paragraph", text: "With Azure Front Door Premium, Private Link is the preferred option for supported origins:" },
      {
        type: "diagram",
        steps: [{ label: "Azure Front Door" }, { label: "Private Link" }, { label: "App Service or API Management" }],
      },
      {
        type: "paragraph",
        text: "After setup, the private endpoint connection must be approved at the respective service. Public network access to the origin should then be disabled, as far as the service and operating model allow.",
      },
      { type: "paragraph", text: "A practical test should not only check whether the application is reachable via Front Door, but also whether a direct request to the origin fails:" },
      {
        type: "grid",
        items: [
          { title: "Test 1 – access via Front Door", description: "Request via Azure Front Door. Expectation: 200 OK." },
          { title: "Test 2 – direct origin access", description: "Direct request to the origin. Expectation: access blocked." },
        ],
      },
      {
        type: "paragraph",
        text: "This negative test is particularly important. A working Front Door route does not automatically prove that no alternative access path exists any more.",
      },

      { type: "subheading", text: "4. Configure health checks and performance" },
      {
        type: "paragraph",
        text: "With multiple origins, Front Door uses health probes to assess their availability. The health endpoint (e.g. /healthz) should return a clear 200 OK status and check the components actually required to process production traffic. Microsoft recommends resource-friendly HEAD requests by default for new profiles. The endpoint should not trigger a redirect to a login page and should not perform unnecessarily expensive database or API queries.",
        refs: [10],
      },
      { type: "paragraph", text: "Caching should only be enabled for clearly suitable content, for example:" },
      {
        type: "bullets",
        items: [
          "JavaScript and CSS files,",
          "images,",
          "fonts,",
          "public downloads,",
          "non-personalised content.",
        ],
      },
      {
        type: "paragraph",
        text: "Dynamic or user-specific responses require particular caution. Query strings and cache keys determine whether different requests are treated as the same resource. In the worst case, an unsuitable configuration can cause personalised content to be delivered to other users.",
        refs: [11],
      },

      { type: "subheading", text: "5. Enable monitoring" },
      {
        type: "paragraph",
        text: "Front Door access logs, health probe logs and WAF logs are not enabled automatically. They should be sent via diagnostic settings to Log Analytics or another central logging platform.",
        refs: [12],
      },
      { type: "paragraph", text: "Basic monitoring should cover at least the following metrics:" },
      {
        type: "bullets",
        items: [
          "request count,",
          "response times,",
          "4xx and 5xx errors,",
          "blocked WAF requests,",
          "frequently triggered WAF rules,",
          "origin availability,",
          "cache hit rate,",
          "outbound data volume.",
        ],
      },
      {
        type: "diagram",
        steps: [
          { label: "Azure Front Door", items: ["Access logs", "WAF logs", "Health probe logs", "Metrics"] },
          { label: "Diagnostic settings" },
          { label: "Log Analytics", items: ["Dashboards", "KQL queries", "Alerts"] },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Monitor and Log Analytics make it possible to investigate errors across multiple layers. For example, it can be distinguished whether a request was already blocked by the WAF, Front Door found no healthy origin, or the application itself returned an error.",
        refs: [13],
      },

      { type: "subheading", text: "6. Infrastructure as code and CI/CD" },
      {
        type: "paragraph",
        text: "Front Door, WAF policies, routes, origins and diagnostic settings are production-critical configurations. They should not be maintained exclusively by hand in the Azure portal.",
      },
      {
        type: "paragraph",
        text: "With Bicep or Terraform they can be described declaratively and changed in a controlled way via pull requests. Microsoft explicitly recommends infrastructure as code to deploy Front Door configurations consistently and to manage changes such as new WAF rule versions traceably. The full implementation should be built modularly:",
        refs: [14],
      },
      {
        type: "filetree",
        nodes: [
          {
            type: "folder",
            name: "infrastructure",
            defaultOpen: true,
            children: [
              { type: "file", name: "main.bicep" },
              {
                type: "folder",
                name: "modules",
                note: "Reusable Bicep modules per resource",
                children: [
                  { type: "file", name: "front-door.bicep" },
                  { type: "file", name: "waf-policy.bicep" },
                  { type: "file", name: "origins.bicep" },
                  { type: "file", name: "routes.bicep" },
                  { type: "file", name: "app-service.bicep" },
                  { type: "file", name: "monitoring.bicep" },
                ],
              },
              {
                type: "folder",
                name: "environments",
                note: "Parameters per environment",
                children: [
                  { type: "file", name: "dev.bicepparam" },
                  { type: "file", name: "test.bicepparam" },
                  { type: "file", name: "prod.bicepparam" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "We provide example code showing how infrastructure as code can be implemented with Bicep in an open repository:",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-iac-with-bicep",
        description: "Infrastructure as code for Azure — reproducible with Bicep.",
        url: "https://github.com/smiit-GmbH/azure-iac-with-bicep",
      },
      { type: "paragraph", text: "A possible deployment process is:" },
      {
        type: "diagram",
        steps: [
          { label: "Feature branch" },
          { label: "Pull request" },
          { label: "Bicep validation" },
          { label: "Deployment to dev" },
          { label: "Smoke and security tests" },
          { label: "Approval" },
          { label: "Deployment to production" },
        ],
      },
      {
        type: "paragraph",
        text: "This not only automates recurring tasks. Every change to routing, WAF or origin configuration is versioned, reviewable and easier to trace in case of an error.",
      },

      { type: "heading", text: "Architecture maturity: not every application needs multi-region right away" },
      {
        type: "paragraph",
        text: "A common mistake is to plan Azure Front Door directly as a global active-active platform with multiple regions. Technically that is possible, but not economically or operationally sensible for every application.",
      },
      {
        type: "paragraph",
        text: "A second application region alone does not yet create a complete multi-region architecture. In addition, data replication, identity providers, storage, messaging, background processes and failback procedures have to be considered. For many companies, a step-by-step build-up is therefore sensible:",
      },
      {
        type: "maturity",
        items: [
          { level: 0, label: "Direct public origin" },
          { level: 1, label: "Central entry point (Front Door)" },
          { level: 2, label: "WAF and monitoring" },
          { level: 3, label: "Protected origin" },
          { level: 4, label: "Private Link and infrastructure as code" },
          { level: 5, label: "Multi-region and automated failover" },
        ],
      },
      {
        type: "paragraph",
        text: "Level 0 means direct access to the technical endpoint with decentralised management. At level 1, Front Door becomes the central domain and routing layer; at level 2, managed WAF rules and monitoring are added. From level 3, direct origin access is restricted and Front Door becomes the binding access path; at level 4, Private Link and infrastructure as code follow. Level 5 finally connects multiple regions via priority- or weight-based routing.",
      },
      {
        type: "paragraph",
        text: "For many applications, level 3 or 4 already represents major progress. Multi-region should be added when business requirements for availability, recovery time objective and recovery point objective justify the additional effort.",
      },

      { type: "heading", text: "Best practices for Azure Front Door" },
      {
        type: "numbered",
        items: [
          { title: "Establish Front Door as the binding entry point", description: "A WAF only protects the traffic that actually passes through it. The origin should not remain reachable via an alternative public path." },
          { title: "Prefer Private Link", description: "For supported Azure services, Azure Front Door Premium with Private Link offers the most rigorous origin protection. If Private Link is not possible, service tags and profile-specific header checks should be combined." },
          { title: "Introduce the WAF gradually", description: "A new policy should first be observed in detection mode. Only after analysing legitimate requests and necessary exceptions should it actively block traffic." },
          { title: "Define exceptions as narrowly as possible", description: "Don't disable a whole rule group when only a single request field causes a false positive. The smaller the exception, the greater the protection that remains." },
          { title: "Use caching deliberately", description: "Caching is mainly suitable for static, non-personalised content. Query strings, cookies and authorisation headers must be explicitly considered when designing the cache." },
          { title: "Version configurations", description: "Front Door, WAF policies, routes, domains and diagnostic settings should be described as code and deployed via a controlled CI/CD process." },
          { title: "Derive the architecture from business requirements", description: "Not every application needs multiple regions, additional gateways or highly complex routing. The technical shape should emerge from security, availability and performance requirements." },
        ],
      },

      { type: "heading", text: "Conclusion: a secure edge layer for modern web applications" },
      {
        type: "paragraph",
        text: "Azure Front Door is more than a global load balancer. The service combines traffic routing, TLS, content delivery, a web application firewall and origin connectivity in a shared edge layer.",
      },
      {
        type: "paragraph",
        text: "The biggest security gain does not come from activating a WAF alone. What matters is that Front Door becomes the binding entry point of the application and that alternative access to the origin is technically prevented.",
      },
      {
        type: "paragraph",
        text: "Combined with Azure Front Door Premium, Private Link, API Management, Azure Monitor and infrastructure as code, this creates an architecture that can be operated securely and reproducibly. Domains, routing and security rules are managed centrally, while frontend, API and data platform retain clearly separated responsibilities.",
      },
      {
        type: "paragraph",
        text: "At the same time, not every application has to be built as a global multi-region platform straight away. A step-by-step maturity path is often more economical and operationally more robust: first a central entry point, then WAF and monitoring, then origin protection and Private Link. Multi-region and automated failover follow only when the business requirements justify them. This way, Azure Front Door does not become just another upstream Azure resource, but a central component of a secure and scalable enterprise web architecture.",
      },
    ],

    faq: [
      {
        question: "When do you need Azure Front Door Premium?",
        answer:
          "Premium differs from Standard mainly in two practically relevant points: the private origin connection via Private Link and access to Microsoft's managed WAF rule sets, including bot protection. Anyone who does not want to leave their origin publicly reachable, or who relies on maintained managed rules rather than only custom ones, needs Premium. For pure global routing, TLS, CDN caching and simple, self-defined WAF rules, Standard is often sufficient. In practice, Premium is especially worthwhile for data-intensive enterprise applications with high security and compliance requirements; for smaller, non-critical workloads, Standard is often the more economical entry point.",
      },
      {
        question: "Does Azure Front Door replace API Management?",
        answer:
          "No — the two services operate on different layers and complement each other. Front Door is the global edge layer for routing, TLS, WAF and content delivery, and decides which request reaches which region and origin in the first place. API Management then takes over and handles API-specific tasks: token validation (OAuth/JWT), checking scopes and claims, rate limits per subscription, request and response transformations, versioning and the management of API products. In practice, API Management sits behind Front Door — ideally privately connected — so that the WAF filters technical attack patterns and API Management handles the API governance. Covering only one of the two usually leaves an important layer of protection open.",
      },
      {
        question: "Do you also need Application Gateway?",
        answer:
          "Not in general. Application Gateway is a regional layer-7 load balancer and shows its strengths where a VNet-close ingress is needed — for example in front of virtual machines, an AKS cluster or legacy workloads inside a virtual network. Front Door, by contrast, is global and sits in front of the region. For a typical PaaS architecture on App Service or Container Apps with API Management, Front Door can be connected directly to the — ideally privately connected — origins, without an Application Gateway in between. Combining both only makes sense when each layer fulfils a clearly separate task; otherwise, more chained gateways mainly mean more latency, cost and operational effort.",
      },
      {
        question: "Is the web application firewall enough to protect the application?",
        answer:
          "No. The WAF filters known technical attack patterns such as SQL injection or cross-site scripting and limits automated access via rate limits — it is an important but generic layer. Whether a specific user may see a specific record, whether tokens are valid, or whether the business logic is being abused, it cannot judge. Such business-logic gaps — for example broken access control, which tops the OWASP Top 10 — must still be secured in the application, in authentication and in API governance. The WAF therefore complements secure software development but does not replace it; real protection only emerges from the interplay of WAF, API Management and clean application logic.",
      },
      {
        question: "How do I ensure the origin is really only reachable via Front Door?",
        answer:
          "This is the most important security step — and it doesn't happen automatically just because Front Door sits in front. The most rigorous option is Azure Front Door Premium with Private Link: the origin is connected privately and its public network access is then disabled, as far as the service allows. If Private Link is not possible, access can be restricted via the AzureFrontDoor.Backend service tag and additionally by checking the profile-specific X-Azure-FDID header, so that only your own Front Door profile may use the origin. What matters is the final negative test: a request via Front Door must return 200 OK, while a direct request to the technical origin hostname must be blocked. Only once that direct access fails is Front Door genuinely the binding entry point.",
      },
      {
        question: "How do I put Azure Front Door in front of an existing application without downtime?",
        answer:
          "Best done step by step and testably, before public traffic is redirected. First, the Front Door profile is set up with the existing application as origin, the custom domain, TLS and a WAF running initially in detection mode. Via the preliminary Front Door endpoint, the whole chain can be tested — routing, certificates, headers and health checks — while the production domain still points directly at the origin. Only then does the DNS change follow, usually via a CNAME to the Front Door endpoint, ideally with a TTL reduced in advance so you can switch back quickly. Once traffic runs stably through Front Door and the WAF is tuned, the final two steps follow: move the WAF into prevention mode and block direct public access to the origin.",
      },
      {
        question: "Should every application run across multiple Azure regions?",
        answer:
          "No. Multi-region significantly increases availability, but also cost, complexity and operational effort. Front Door can indeed switch quickly to a second region via priority- or weight-based routing — but a second application region alone does not create resilient failover. What matters are the downstream layers: data replication, identity providers, storage, messaging and background processes must also be prepared for a regional outage and a clean failback. In practice, multi-region should be tied to concrete targets — recovery time objective and recovery point objective; for many applications, a robust single-region setup with a protected origin and monitoring is the more economical first step.",
      },
      {
        question: "Can Front Door and the origin use the same certificate?",
        answer:
          "They don't have to use the same certificate — and in practice they usually don't. The client establishes a TLS connection to the custom domain on Front Door; Front Door terminates it and establishes a separate TLS connection to the origin. For the public domain, Front Door usually manages the certificate automatically (managed certificate) or uses one from Key Vault. The origin should nevertheless have a valid certificate so that the second connection is also encrypted and the hostname verifiable — “TLS to the edge and unencrypted after that” is not a secure configuration. A self-signed or expired origin certificate otherwise leads to connection errors or unnecessary security gaps.",
      },
      {
        question: "Why aren't Front Door logs visible in Log Analytics?",
        answer:
          "Because they are not enabled by default. Access logs, health probe logs and WAF logs are only produced once a destination is configured in the Front Door profile's diagnostic settings — for example a Log Analytics workspace, a storage account or an event hub. In practice that means: create diagnostic settings, select the desired log categories and allow a few minutes for the first entries to arrive. After that, KQL can answer targeted questions, such as which WAF rules trigger most often or whether an error originated at the WAF, at an unhealthy origin or only in the application. Without enabled diagnostics, the very data needed for troubleshooting is missing when it matters.",
      },
    ],

    sources: [
      { title: "Microsoft Learn: Azure Front Door (classic) retirement FAQ", url: "https://learn.microsoft.com/en-us/azure/frontdoor/classic-retirement-faq" },
      { title: "OWASP Foundation: OWASP Top 10:2025", url: "https://owasp.org/Top10/2025/" },
      { title: "Rose, S., Borchert, O., Mitchell, S. & Connelly, S. (2020): Zero Trust Architecture. NIST Special Publication 800-207.", url: "https://doi.org/10.6028/NIST.SP.800-207" },
      { title: "Microsoft Learn: What is Azure Front Door? (Overview)", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview" },
      { title: "Microsoft Learn: Secure your origin with Private Link", url: "https://learn.microsoft.com/en-us/azure/frontdoor/private-link" },
      { title: "Yang, L. et al. (2022): Multi-Perspective Content Delivery Networks Security Framework Using Optimized Unsupervised Anomaly Detection. IEEE Transactions on Network and Service Management, 19(1), 686–705. DOI: 10.1109/TNSM.2021.3100308 (open-access preprint: arXiv:2107.11514).", url: "https://arxiv.org/abs/2107.11514" },
      { title: "Microsoft Learn: Best practices for Azure Web Application Firewall in Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-best-practices" },
      { title: "Microsoft Learn: Configure Azure Front Door in front of Azure API Management", url: "https://learn.microsoft.com/en-us/azure/api-management/front-door-api-management" },
      { title: "Microsoft Learn: Traffic routing methods to origin", url: "https://learn.microsoft.com/en-us/azure/frontdoor/routing-methods" },
      { title: "Microsoft Learn: Health probes – Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/health-probes" },
      { title: "Microsoft Learn: Caching with Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching" },
      { title: "Microsoft Learn: Configure Azure Front Door logs", url: "https://learn.microsoft.com/en-us/azure/frontdoor/standard-premium/how-to-logs" },
      { title: "Microsoft Learn: Monitor Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/monitor-front-door" },
      { title: "Microsoft Learn: Architecture best practices for Azure Front Door (Azure Well-Architected Framework)", url: "https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-front-door" },
      { title: "NGINX Documentation: Using NGINX as an HTTP load balancer", url: "https://nginx.org/en/docs/http/load_balancing.html" },
      { title: "Traefik Proxy Documentation", url: "https://doc.traefik.io/traefik/" },
      { title: "Microsoft Learn: Secure an Azure Front Door deployment", url: "https://learn.microsoft.com/en-us/azure/frontdoor/secure-front-door" },
    ],

    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    keywords: [
      "Azure Front Door",
      "web application firewall",
      "WAF",
      "Private Link",
      "zero trust",
      "edge",
      "CDN",
      "reverse proxy",
      "enterprise architecture",
      "infrastructure as code",
      "API Management",
      "Azure security",
    ],
    metaTitle: "Azure Front Door in enterprise architectures: WAF, Private Link & best practices | smiit",
    metaDescription:
      "How Azure Front Door serves as a secure, global entry point for web applications — WAF, Private Link, routing, monitoring, infrastructure as code and a maturity model.",
  },
}

// ---------------------------------------------------------------------------
// Post: smiit Analytics – vom Power-BI-Projekt zur SaaS-Plattform
// ---------------------------------------------------------------------------

const SA = "/assets/blog/smiit-analytics"

const smiitAnalyticsSaas: LocalizedBlogPost = {
  de: {
    slug: "smiit-analytics-from-power-bi-to-saas",
    category: "apps",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: "Noah Neßlauer",
    title:
      "Von individuellen Power-BI-Projekten zur SaaS-Plattform: Wie smiit Analytics für bexio entstanden ist",
    shortTitle: "smiit Analytics: Von Power BI zur SaaS",
    excerpt:
      "Was als Reihe individueller Power-BI-Projekte für bexio-Kunden begann, ist heute eine eigene Analytics-Plattform. Ein Erfahrungsbericht über ein Geschäftsmodell, das nicht funktionierte, die Architekturentscheidungen danach und das, was wir bei der Entwicklung mit KI-Agents gelernt haben.",
    coverImage: {
      url: `${SA}/cover.webp`,
      width: 2524,
      height: 1008,
      alt: "Von bexio über smiit Analytics zu Berichten und KI",
    },

    blocks: [
      {
        type: "paragraph",
        text: "Die meisten Softwareprodukte entstehen nicht aus einer Idee am Reißbrett. Sie entstehen aus einem Muster, das man irgendwann nicht mehr übersehen kann. Bei uns war es eine Häufung von Anfragen aus einer Richtung, mit der wir nicht gerechnet hatten: Schweizer KMU, die ihre Daten aus bexio endlich vernünftig auswerten wollten.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag erzählt, wie aus diesen Anfragen zunächst ein Power-BI-basiertes Produkt wurde, warum dieses Produkt wirtschaftlich an seine Grenzen stieß und wie wir smiit Analytics anschließend als eigene SaaS-Plattform neu gebaut haben. Es geht um Architekturentscheidungen, um Fehler, die man erst mit echten Buchhaltungsdaten findet, und um die Frage, was KI-gestützte Softwareentwicklung in einem anspruchsvollen Projekt tatsächlich leistet und was nicht.",
      },

      { type: "heading", text: "Warum ausgerechnet bexio?" },
      {
        type: "paragraph",
        text: "smiit ist im Kern ein Dienstleister für Apps, Workflows und Analytics im Mittelstand. Unser Schwerpunkt lag lange auf Auftragsmanagement und individuellen Geschäftsanwendungen. Eine Software, die ausschließlich in der Schweiz verbreitet ist, stand nicht auf unserem Radar.",
      },
      {
        type: "paragraph",
        text: "Zwischen Ende 2021 und Ende 2025 erreichten uns dann fünf bis sechs Anfragen, die sich konkret auf bexio bezogen. Das klingt nach wenig. Für ein einzelnes Drittsystem, noch dazu eines außerhalb unseres Heimatmarkts, war es für uns aber bemerkenswert viel. Die Anfragen ähnelten sich stark: Die Daten liegen in bexio, das Tagesgeschäft läuft dort gut, aber für Auswertungen über Zeit, über Bereiche hinweg oder für die Steuerung des Unternehmens reicht das Bordmittel nicht.",
      },
      {
        type: "paragraph",
        text: "Im Nachhinein ist das Muster leicht zu erklären. bexio ist in der Schweiz weit verbreitet und meldete im Februar 2026 mehr als 100.000 KMU-Kunden. Diese Unternehmen haben Buchhaltung, Aufträge, Rechnungen, Projekte und Zeiterfassung in einem System. Damit liegen die Daten für ein gutes Controlling bereits vor, sie werden nur selten genutzt. Wer das einmal erkannt hat, sieht in jeder weiteren Anfrage nicht mehr ein Einzelprojekt, sondern einen Markt.",
        refs: [1],
      },

      { type: "heading", text: "Die erste Antwort: smiit Analytics auf Basis von Power BI" },
      {
        type: "paragraph",
        text: "Die naheliegende Reaktion war, das zu tun, was wir ohnehin gut konnten: Power BI. 2024 haben wir aus den bisherigen Projekten ein standardisiertes Produkt gebaut. Es bestand aus einem vollständigen Datenmodell für die bexio-Daten und einer großen Zahl vorgefertigter Auswertungen. Ende 2025 kam es auf den bexio Marketplace.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-powerbi.webp`,
        width: 1523,
        height: 856,
        maxWidth: 960,
        alt: "Power-BI-Bericht „Verkauf – Rechnungen“ der bisherigen Version von smiit Analytics: Rechnungsverlauf nach Monat, Rechnungen nach Status, ABC-Analyse der Rechnungen je Kunde und Rechnungen je Mitarbeiter",
        caption: "Die erste Version: ein standardisiertes Power-BI-Datenmodell mit vorgefertigten Berichten, eingerichtet in der Umgebung des Kunden.",
      },
      { type: "paragraph", text: "Das Produkt hatte echte Stärken:" },
      {
        type: "bullets",
        items: [
          "**Maximale Flexibilität.** Power BI ist ein ausgereiftes Werkzeug. Nahezu jede Auswertung ließ sich umsetzen.",
          "**Datenhoheit beim Kunden.** Die Lösung wurde in der Umgebung des Kunden eingerichtet und dort betrieben.",
          "**Schneller Nutzen.** Mit den vorgefertigten Berichten war ein Großteil des Standardbedarfs sofort abgedeckt.",
        ],
      },
      { type: "paragraph", text: "Die Schwächen zeigten sich nicht in der Technik, sondern im Geschäftsmodell." },

      { type: "subheading", text: "Warum der Einmalpreis zur Falle wurde" },
      {
        type: "paragraph",
        text: "Weil die Lösung einmalig beim Kunden eingerichtet und dort gehostet wurde, hatten wir keine Kontrolle über Zugänge und Nutzung. Ein nutzungs- oder nutzerbasiertes Abo war damit praktisch nicht umsetzbar. Übrig blieb ein Einmalpreis.",
      },
      {
        type: "paragraph",
        text: "Hinzu kam: Fast jeder Kunde wollte Anpassungen. Und jede Anpassung war Entwicklungsarbeit, die wir nach Aufwand abrechnen mussten. Die Wünsche fielen dabei in zwei klar erkennbare Gruppen:",
      },
      {
        type: "bullets",
        items: [
          "**Operativ geführte Unternehmen** wollten vor allem Personalauswertungen. Gefragt waren Stundenrapporte, Auslastung und Soll-/Ist-Zeiten, oft kombiniert mit Automatisierungen wie dem regelmäßigen Mailversand an Mitarbeitende.",
          "**Treuhänder und Buchhaltungsverantwortliche** interessierten sich für die Finanzdaten. Sie wollten Bilanz, Erfolgsrechnung und Kennzahlen genau so gegliedert sehen, wie sie es für ihre Mandate brauchen.",
        ],
      },
      {
        type: "paragraph",
        text: "Für viele Kunden, gerade kleinere, summierten sich Einmalpreis und Anpassungsaufwand auf einen Betrag, der zu ihrem Budget nicht passte. Wir hatten ein gutes Produkt mit einem Preismodell, das seine eigene Zielgruppe ausschloss.",
      },

      { type: "subheading", text: "Die Lehre dahinter" },
      {
        type: "paragraph",
        text: "Rückblickend standen wir mitten in einem Spannungsfeld, das in der Literatur gut beschrieben ist. Cusumano zeigt, wie sich das Softwaregeschäft vom Verkauf von Produktlizenzen hin zu Services und wiederkehrenden Erlösen verschiebt, und welche Folgen das für Margen und Geschäftsmodelle hat. Pine beschreibt unter dem Begriff Mass Customization die Herausforderung, individuelle Leistungen zu den Kosten eines Standardprodukts anzubieten.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "Unser Power-BI-Produkt war an beiden Stellen falsch positioniert. Es war ein Produkt mit Projektlogik: standardisiert im Kern, aber jede Individualisierung kostete genauso viel wie im Projektgeschäft. Die Konsequenz war klar. Wir brauchten ein Produkt, bei dem Individualisierung nicht mehr Entwicklungsaufwand auf unserer Seite bedeutet.",
      },
      {
        type: "image",
        src: `${SA}/business-model.webp`,
        width: 3600,
        height: 1560,
        maxWidth: 1040,
        alt: "Vergleich der Betriebsmodelle: Bisher wurde Power BI in jeder Kundenumgebung einzeln eingerichtet und angepasst, abgerechnet per Einmalpreis und Aufwand. Heute bedient eine zentral betriebene SaaS-Plattform viele bexio-Firmen per Abo, mit Standard und KI-Selfservice.",
        caption: "Vom Projekt mit Produktetikett zur echten SaaS: Erst der zentrale Betrieb macht ein faires Abo und Updates für alle möglich.",
      },

      { type: "heading", text: "Die Neuausrichtung: Was das neue Produkt leisten musste" },
      {
        type: "paragraph",
        text: "Bevor wir eine Zeile Code geschrieben haben, haben wir die Anforderungen neu formuliert. Die wichtigsten waren:",
      },
      {
        type: "numbered",
        items: [
          {
            title: "Echte SaaS statt Installation",
            description: "Eine zentral betriebene Anwendung, in der viele Kunden sicher voneinander getrennt arbeiten. Nur so werden Updates, Support und ein Abo-Modell überhaupt möglich.",
          },
          {
            title: "Ein faires, planbares Preismodell",
            description: "Ein Abonnement pro verbundener bexio-Firma und pro Nutzer, vertrieben über den bexio Marketplace, statt eines hohen Einmalpreises.",
          },
          {
            title: "Individualisierung ohne Entwicklungsaufwand",
            description: "Die Anpassungswünsche aus der Power-BI-Zeit sollten entweder im Standard enthalten sein oder vom Kunden selbst umgesetzt werden können.",
          },
          {
            title: "Keine Einrichtung beim Kunden",
            description: "Anmeldung, bexio verbinden, fertig. Die Daten sollen ohne manuelle Exporte automatisch aktuell bleiben.",
          },
          {
            title: "Datenschutz als Grundvoraussetzung",
            description: "Es geht um Buchhaltungs- und Personaldaten. Mandantentrennung, Verschlüsselung und nachvollziehbare Zugriffe sind hier nicht verhandelbar.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Aus Anforderung 3 folgte die wichtigste Produktentscheidung: Wir kombinieren einen starken Standard mit KI-Unterstützung. Die typischen Wünsche aus der Power-BI-Zeit, also Stunden, Auslastung, Bilanz, Erfolgsrechnung und Kennzahlen, haben wir direkt im Standardbericht abgebildet. Für alles, was darüber hinausgeht, können Kunden ihre Berichte selbst erstellen und anpassen, auf Wunsch mit Hilfe einer KI, die Fragen an die Daten beantwortet und Berichte bearbeitet. So lassen sich auch sehr individuelle Anforderungen in einem Standardprodukt abbilden.",
      },

      { type: "subheading", text: "Warum nicht einfach Power BI Embedded?" },
      {
        type: "paragraph",
        text: "Die Frage lag nahe, und wir haben sie ernsthaft geprüft. Power BI Embedded ist für klassische Berichte stark. Für unser Ziel hätte es uns aber an ein Lizenz- und Einbettungsmodell gebunden, das wir nicht kontrollieren, und damit genau die Kostenstruktur zurückgebracht, der wir entkommen wollten. Auch das Einbetten eines Open-Source-BI-Tools wie Metabase oder Superset haben wir verworfen: Es fühlt sich für Anwender schnell wie ein Fremdkörper an und lässt kaum Raum für eine KI, die tief in Datenmodell und Berichte integriert ist.",
      },
      {
        type: "paragraph",
        text: "Wir haben uns deshalb für eine eigene Anwendung entschieden, gebaut auf bewährten Open-Source-Bausteinen.",
      },

      { type: "heading", text: "Die Architektur im Überblick" },
      { type: "paragraph", text: "Der Datenfluss lässt sich in fünf Stufen beschreiben:" },
      {
        type: "image",
        src: `${SA}/architecture.webp`,
        width: 3840,
        height: 1320,
        maxWidth: 1040,
        alt: "Datenfluss von smiit Analytics: Die bexio API wird vom .NET-Sync-Worker gelesen, in PostgreSQL über die Schemas raw, staging und mart (Sternschema) aufbereitet, im Semantic Layer Cube modelliert und in der Web-App (Next.js, ASP.NET Core) angezeigt. KI-Funktionen bearbeiten Berichte über Cube und erkunden das mart-Schema nur lesend. Alles läuft auf Microsoft Azure.",
        caption: "Von der bexio API bis zum Bericht: eine Datenbank mit getrennten Schemas, ein zentraler Semantic Layer und Row-Level-Security auf jeder analytischen Tabelle.",
      },
      {
        type: "table",
        headers: ["Schicht", "Technologie", "Aufgabe"],
        rows: [
          ["Datenanbindung", ".NET Worker Service", "Lädt rund 35 Objekttypen aus bexio: Buchhaltung, Aufträge, Rechnungen, Bank, Projekte, Zeiten, Personal"],
          ["Rohdaten & Staging", "PostgreSQL (raw, staging)", "Speichert die Originalantworten unverändert und überführt sie in typisierte Tabellen"],
          ["Analytisches Modell", "PostgreSQL (mart)", "Sternschema mit Fakten und Dimensionen, aufbereitet für Auswertungen"],
          ["Semantic Layer", "Cube", "Definiert Kennzahlen, Beziehungen und Zeitlogik zentral, eine Abfragesprache für Berichte und KI"],
          ["Anwendung", "Next.js/React, ASP.NET Core API", "Berichte, Filter, Bearbeitung, Benutzerverwaltung, KI-Funktionen"],
          ["Betrieb", "Microsoft Azure", "Container-basiert, automatisierte Deployments über getrennte Umgebungen"],
        ],
      },
      {
        type: "paragraph",
        text: "Das analytische Modell folgt der dimensionalen Modellierung nach Kimball und Ross: Fakten wie Buchungen, Rechnungspositionen oder Zeiteinträge werden über gemeinsame Dimensionen wie Datum, Kunde, Konto oder Projekt verbunden. So können Umsatz, offene Posten und Stunden in einem Bericht gemeinsam gefiltert werden, ohne dass jede Kombination einzeln programmiert werden muss.",
        refs: [4],
      },
      {
        type: "image",
        src: `${SA}/star-schema.webp`,
        width: 3600,
        height: 1500,
        maxWidth: 940,
        alt: "Vereinfachtes Sternschema: Die Fakten Buchungen, Rechnungen und Zeiteinträge teilen sich die Dimensionen Datum, Währung, Kunde, Konto, Projekt und Mitarbeitende.",
        caption: "Gemeinsame Dimensionen verbinden die Fakten. Vereinfachter Ausschnitt: Das Modell umfasst rund 20 Fakten und 17 Dimensionen.",
      },
      {
        type: "paragraph",
        text: "Berichte sind in smiit Analytics keine fest programmierten Seiten, sondern deklarative Definitionen: Welche Visualisierung zeigt welche Kennzahl nach welcher Dimension. Das hat einen weitreichenden Vorteil. Was als Daten beschrieben ist, kann validiert, versioniert und verglichen werden, und es kann von einer KI bearbeitet werden, ohne dass Code entsteht.",
      },

      { type: "heading", text: "Die größten Herausforderungen und wie wir sie gelöst haben" },

      { type: "subheading", text: "1. Mandantentrennung, die auch bei Fehlern hält" },
      {
        type: "paragraph",
        text: "In einer SaaS-Anwendung teilen sich viele Kunden dieselbe Infrastruktur. Das ist wirtschaftlich der Kern des Modells, und gleichzeitig das größte Risiko. Bezemer und Zaidman weisen darauf hin, dass eine falsche Architekturentscheidung bei der Mandantenfähigkeit schnell zum Wartungsproblem wird. Die Architektur von Force.com zeigt, wie weit ein konsequent geteiltes Modell tragen kann, wenn die Trennung im Fundament verankert ist. Microsoft beschreibt in seinem Architekturleitfaden die Bandbreite von vollständig isolierten bis vollständig geteilten Modellen und die jeweiligen Kompromisse.",
        refs: [5, 6, 7],
      },
      { type: "paragraph", text: "Wir haben uns für ein geteiltes Modell mit mehreren Verteidigungslinien entschieden:" },
      {
        type: "bullets",
        items: [
          "**Die Datenbank ist die letzte Instanz.** Jede analytische Tabelle ist durch PostgreSQL Row-Level-Security geschützt. Diese Regeln gelten auch für den Eigentümer der Tabelle (`FORCE ROW LEVEL SECURITY`). Ein vergessener Filter im Anwendungscode führt damit nicht zu einem Datenleck, sondern zu einem leeren Ergebnis.",
          "**Der Kontext reist mit jeder Abfrage.** Welche bexio-Firma abgefragt wird, setzt die Anwendung pro Transaktion. Damit kann bei geteilten Datenbankverbindungen kein Kontext von einer Anfrage in die nächste „durchsickern“.",
          "**Die Grenze liegt bei der Datenquelle.** Isoliert wird nicht der einzelne Bericht, sondern die verbundene bexio-Firma. Diese Entscheidung haben wir früh korrigiert. Sie macht es möglich, dass mehrere Berichte und Nutzer auf dieselbe Datenquelle zugreifen, ohne die Trennung aufzuweichen.",
          "**Tests beweisen die Trennung.** Automatisierte Tests versuchen gezielt, auf Daten anderer Mandanten zuzugreifen, und müssen daran scheitern.",
        ],
        itemRefs: { 0: [8] },
      },
      {
        type: "image",
        src: `${SA}/tenant-isolation.webp`,
        width: 3600,
        height: 1230,
        maxWidth: 1040,
        alt: "Drei Verteidigungslinien der Mandantentrennung: Berechtigung auf die Datenquelle, Kontext je Transaktion und Row-Level-Security mit FORCE. In der Datenbank sind für eine Anfrage von Firma A nur die Zeilen von Firma A sichtbar; Isolationstests prüfen gezielt Fremdzugriffe.",
        caption: "Mehrere Verteidigungslinien: Selbst wenn der Anwendungscode einen Filter vergisst, sieht eine Anfrage von Firma A nur die Zeilen von Firma A.",
      },
      {
        type: "paragraph",
        text: "Dasselbe Prinzip gilt für den Plattformbetrieb. Auch Administratoren von smiit sehen keine Kundendaten, solange der Kunde keinen zeitlich befristeten und protokollierten Supportzugang freigibt.",
      },

      { type: "subheading", text: "2. Die bexio-Anbindung: robust statt schnell" },
      {
        type: "paragraph",
        text: "Eine Schnittstelle „anzubinden“ ist schnell erledigt. Sie so anzubinden, dass die Daten vieler Kunden mehrmals täglich zuverlässig synchronisiert werden, ist eine andere Aufgabe. Einige Punkte, die uns beschäftigt haben:",
      },
      {
        type: "bullets",
        items: [
          "**Inkrementell, wo möglich.** Wo die API es erlaubt, laden wir nur geänderte Datensätze, mit einem Überlappungsfenster als Sicherheitsnetz. Wo das nicht geht, laden wir vollständig und verwerfen unveränderte Datensätze über einen Hash-Vergleich.",
          "**Gelöschte Daten erkennen.** Inkrementelle Abfragen liefern keine Löschungen. In regelmäßigen Abständen gleichen wir deshalb vollständig ab, damit gelöschte Belege nicht dauerhaft in den Auswertungen verbleiben.",
          "**Faire Lastverteilung.** Die API-Limits gelten pro verbundener Firma. Wir begrenzen die Parallelität pro Verbindung und insgesamt, respektieren die Wartezeiten, die die API vorgibt, und verteilen automatische Aktualisierungen mit einem zufälligen Versatz, damit nicht alle Kunden zur vollen Stunde gleichzeitig synchronisieren.",
          "**Zeit ist nicht gleich Zeit.** Zeitstempel kommen ohne Zeitzonenangabe in Schweizer Ortszeit. Wer sie als UTC interpretiert, verschiebt Daten um ein bis zwei Stunden, und zweimal im Jahr zusätzlich durch die Sommerzeit.",
        ],
      },
      {
        type: "paragraph",
        text: "Aus Kundensicht stecken dahinter ganz einfache Einstellungen: Jede Datenquelle wird zu frei wählbaren Uhrzeiten automatisch aktualisiert, und eine manuelle Aktualisierung ist jederzeit möglich. Ein tägliches Budget an Aktualisierungen hält die Last und damit die Betriebskosten planbar. Auch das ist eine Voraussetzung für einen fairen Abopreis.",
      },
      {
        type: "image",
        src: `${SA}/refresh-schedule.webp`,
        width: 1950,
        height: 753,
        maxWidth: 1040,
        alt: "Einstellungen „Automatische Aktualisierung“ einer Datenquelle: Raster mit 24 Uhrzeiten, davon 05:00 und 12:00 gewählt (2 von 8). Darunter die nächste Aktualisierung ab 08.10.2026, 05:00 (Europe/Zurich), heute genutzt 0 von 12 automatischen, davon 0 durch die KI, sowie die Option „Alles neu laden“, einmal pro Tag möglich.",
        caption: "Aktualisierung aus Kundensicht: bis zu acht frei wählbare Uhrzeiten, ein tägliches Kontingent und bei Bedarf ein vollständiges Neuladen.",
      },

      { type: "subheading", text: "3. Eine bewusste Abweichung vom Standard-Stack" },
      {
        type: "paragraph",
        text: "Für die Transformation von Rohdaten in das analytische Modell ist dbt heute der De-facto-Standard. Wir haben damit begonnen und uns nach nur einer Woche wieder davon verabschiedet.",
      },
      {
        type: "paragraph",
        text: "Der Grund war eine zentrale Anforderung: Eine Synchronisation muss **durchgängig** wirken. Wenn ein Kunde auf „Aktualisieren“ klickt, sollen nicht nur die Rohdaten neu geladen werden. Genau die Daten dieses Kunden sollen bis in den Bericht durchgerechnet werden, und zwar sofort. dbt ist als Batch-Werkzeug konzipiert, das ganze Modelle neu baut. Es hätte außerdem eine zweite Laufzeitumgebung und ein zweites Berechtigungskonzept neben die Row-Level-Security gestellt.",
      },
      {
        type: "flow",
        steps: [
          "Kunde klickt auf „Aktualisieren“",
          "Sync-Worker lädt geänderte Daten aus bexio (raw)",
          "Typisierung in staging",
          "SQL-Schritte bauen das Sternschema (mart)",
          "Alles pro Datenquelle in einer Transaktion",
          "Bericht zeigt sofort die neuen Zahlen",
        ],
      },
      {
        type: "paragraph",
        text: "Wir haben die Transformation deshalb als geordnete Abfolge von SQL-Schritten in den .NET-Worker integriert. Sie läuft pro Datenquelle in einer Transaktion, schreibt nur tatsächlich geänderte Zeilen und überspringt sich selbst, wenn sich nichts geändert hat. Das war mehr Eigenentwicklung, als uns lieb war. Aber es ist die Stelle, an der sich die Architektur nach dem Produkt richtet und nicht umgekehrt.",
      },

      { type: "subheading", text: "4. Zahlen, die plausibel aussehen und trotzdem falsch sind" },
      {
        type: "paragraph",
        text: "Das war die lehrreichste Kategorie von Problemen. Ein Absturz fällt sofort auf. Eine Bilanzsumme, die um den Faktor drei zu hoch ist, fällt womöglich erst dem Treuhänder auf. Einige Beispiele, die wir erst mit echten Daten gefunden haben:",
      },
      {
        type: "bullets",
        items: [
          "**Eröffnungsbilanzen pro Geschäftsjahr.** bexio bucht die Eröffnungssalden in jedem Geschäftsjahr neu. Eine Bilanzabfrage, die nicht auf ein Geschäftsjahr eingeschränkt ist, summiert diese Salden über alle Jahre und bläht das Ergebnis entsprechend auf. Unsere Lösung ist bewusst streng: Solche Abfragen werden vom Semantic Layer abgelehnt, bevor sie die Datenbank erreichen.",
          "**Top-N-Listen mit leeren Einträgen.** PostgreSQL sortiert fehlende Werte bei absteigender Sortierung zuerst ein. Eine „Top 10 Kunden nach Umsatz“ zeigte dadurch in bestimmten Kombinationen Kunden ohne Umsatz ganz oben.",
          "**Vorjahresvergleiche mit 0 % Wachstum.** Wird ein Vorjahresvergleich nach der Jahres-Dimension statt nach einer echten Zeitachse gruppiert, vergleicht er jedes Jahr mit sich selbst. Das Ergebnis ist mathematisch korrekt und fachlich wertlos.",
          "**Fremdwährungen.** Jeder Betrag wird in Originalwährung und in Buchungswährung geführt, umgerechnet mit dem Kurs, der am Belegdatum gültig war, und nicht mit dem heutigen.",
        ],
      },
      {
        type: "paragraph",
        text: "Das gemeinsame Muster: Fachliche Regeln der Buchhaltung gehören an **eine** zentrale Stelle, und wo sie verletzt werden könnten, muss das System lieber ablehnen als raten. Diese Haltung prägt auch den Umgang mit KI.",
      },

      { type: "subheading", text: "5. Individuelle Anforderungen im Standardprodukt, mit KI" },
      {
        type: "paragraph",
        text: "Hier schließt sich der Kreis zur Power-BI-Zeit. Die häufigsten Anpassungswünsche sind heute Teil des Standards. Jeder neue Arbeitsbereich startet mit einem Bericht, der Übersicht, Verkauf, Einkauf, Erfolgsrechnung, Bilanz, Arbeitszeiten, Projekte und Cashflow abdeckt. Dazu kommt ein Katalog betriebswirtschaftlicher Kennzahlen, von Liquiditätsgraden über EBITDA-Marge bis zur Eigenkapitalrendite.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-standard-report.webp`,
        width: 1916,
        height: 941,
        maxWidth: 1040,
        alt: "Standardbericht in smiit Analytics, Seite „Übersicht“: Kennzahlen zu Umsatz, Ergebnis, Zahlungseingängen und offenen Forderungen, Umsatz je Monat mit Vorjahr, Top-Kunden nach Umsatz, Ertrag, Aufwand und Ergebnis je Monat sowie Umsatz bezahlt und offen; links die Navigation von Verkauf bis Cashflow",
        caption: "Der Standardbericht deckt ab, was früher individuell entwickelt wurde: von der Übersicht bis zu Bilanz, Arbeitszeiten und Cashflow.",
      },
      {
        type: "paragraph",
        text: "Für die Kennzahlen muss festgelegt werden, welche Konten in welche Größe einfließen. Das ist genau die Arbeit, die früher Anpassungsaufwand verursacht hat. Heute schlägt das System die Zuordnung anhand der Kontenbereiche des Schweizer KMU-Kontenrahmens vor und nutzt bei unklaren Konten eine KI. Der Kunde prüft und bestätigt nur noch.",
      },
      {
        type: "image",
        src: `${SA}/account-mapping.webp`,
        width: 1950,
        height: 1017,
        maxWidth: 1040,
        alt: "Einstellungen „Kennzahlen“: Bilanzkennzahlen wie Liquide Mittel (788,89), Liquiditätsgrad 1 (10,1 %), Working Capital (19.375,95) oder Debitorenfrist (303 d) und Erfolgsrechnungskennzahlen wie EBIT, EBITDA, Gesamtkapitalrentabilität (92,6 %) oder Materialaufwand (5.111,89), jeweils mit der Anzahl zugeordneter Konten und dem Hinweis „automatisch“; oben rechts die Schaltfläche „Neu vorschlagen“.",
        caption: "Kontenzuordnung: Jede Kennzahl erhält ihre Konten automatisch zugeordnet, die Beträge rechnen sich live. Der Kunde prüft und passt bei Bedarf an.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-report-editor.webp`,
        width: 889,
        height: 995,
        maxWidth: 600,
        alt: "Bericht-Editor in smiit Analytics: Für das Diagramm „Top-Kunden nach Umsatz“ sind Balkendiagramm, die Kennzahl Umsatz als Wert und Kontakt als Kategorie gewählt; darunter der Kennzahlenkatalog mit Rechnungskennzahlen wie Neukundenumsatz, Offener Rechnungsbetrag oder Mahnquote",
        caption: "Selbst anpassen statt beauftragen: Visualisierung wählen und Kennzahlen aus dem Katalog zuordnen, ohne Entwicklungsaufwand.",
      },
      {
        type: "paragraph",
        text: "Darüber hinaus gibt es zwei KI-Funktionen, die wir bewusst unterschiedlich abgesichert haben:",
      },
      {
        type: "bullets",
        items: [
          "**Berichte erstellen und bearbeiten.** Die KI arbeitet ausschließlich über das definierte semantische Modell und verändert Berichtsdefinitionen, keinen Code. Änderungen landen zunächst in einem Entwurf. Gespeichert wird erst, wenn der Anwender zustimmt.",
          "**Daten frei erkunden.** Für Fragen, die kein Bericht vorhersieht („Welche Kunden haben ein Zahlungsziel über 60 Tage und eine offene Mahnung, nach Kanton?“), darf die KI lesende Abfragen erzeugen. Diese laufen über eine eigene, rein lesende Datenbankrolle, eine Positivliste erlaubter Tabellen und in einer schreibgeschützten Transaktion, zusätzlich zur Row-Level-Security.",
        ],
      },
      {
        type: "image",
        src: `${SA}/ai-lanes.webp`,
        width: 3600,
        height: 1650,
        maxWidth: 1040,
        alt: "Zwei KI-Lanes: Beim Bearbeiten von Berichten ändert die KI nur die Berichtsdefinition über den Semantic Layer, das Ergebnis landet im Entwurf und wird erst nach Bestätigung zum Bericht. Beim freien Erkunden erzeugt die KI lesende Abfragen, die vier Schranken passieren: lesende Datenbankrolle, Positivliste, schreibgeschützte Transaktion und Row-Level-Security; das Ergebnis ist als ungeprüfte Rohdaten gekennzeichnet.",
        caption: "Zwei Wege, zwei Sicherheitsniveaus: Was in Berichten landet, läuft immer über das geprüfte Modell. Freies Erkunden ist erlaubt, aber abgeschottet.",
      },
      {
        type: "image",
        src: `${SA}/ai-report-editing.webp`,
        width: 1950,
        height: 1013,
        maxWidth: 1040,
        alt: "Berichte bearbeiten mit KI in drei Schritten: 1. Anweisung im Chat „Bitte zeige mir Cashflow und Deckungsbeitrag auf der Übersichtsseite und auch im Graphen als Entwicklung an.“ 2. Der Editor arbeitet am Bericht. 3. Die KI erklärt die Änderungen, weist darauf hin, dass der Deckungsbeitrag wegen fehlender interner Kostensätze leer ist, und listet vier Vorschläge für die Ansicht; übermittelt wurden 8 Zeilen und 0 Pseudonyme.",
        caption: "Berichte bearbeiten mit KI: Die KI arbeitet im Editor und liefert Vorschläge. Angewendet wird erst mit «Übernehmen».",
      },
      {
        type: "image",
        src: `${SA}/ai-report-result.webp`,
        width: 1950,
        height: 1050,
        maxWidth: 1040,
        alt: "Übersicht vorher und nachher: Die KPI-Karte „Zahlungseingänge“ (3.722,03 CHF) wird zu „Netto-Cashflow“ (588,89 CHF), der Graph „Ertrag, Aufwand und Ergebnis je Monat“ wird zu „Netto-Cashflow und Deckungsbeitrag je Monat“. Der Deckungsbeitrag bleibt leer, weil interne Kostensätze fehlen.",
        caption: "Das Ergebnis auf der Übersicht. Der Deckungsbeitrag bleibt leer, bis interne Kostensätze erfasst sind: lieber leer als falsch.",
      },
      {
        type: "image",
        src: `${SA}/ai-exploration.webp`,
        width: 1950,
        height: 1200,
        maxWidth: 1040,
        alt: "Daten frei erkunden in drei Schritten: 1. Frage, wie sich Netto-Cashflow und Deckungsbeitrag berechnen und welche bexio-Konten oder Buchungen herangezogen wurden. 2. Der Analyst prüft die Daten. 3. Antwort mit Herleitung: Netto-Cashflow CHF 588.89 aus CHF 3'722.03 Zuflüssen und CHF 3'133.14 Abflüssen auf dem Bankkonto «Example Bank»; der Deckungsbeitrag ist leer, nicht CHF 0, weil keine internen Kostensätze hinterlegt sind. Dazu eine Tabelle der Bankzuflüsse je Monat, gekennzeichnet als ungeprüfte Rohdaten.",
        caption: "Daten frei erkunden: Die KI legt offen, wie sie rechnet und welche bexio-Daten sie nutzt. Das Ergebnis ist als ungeprüfte Rohdaten gekennzeichnet.",
      },
      {
        type: "paragraph",
        text: "Warum diese Trennung? Die Forschung zu natürlichsprachlichen Datenbankabfragen zeigt, dass unternehmenstaugliche Text-zu-SQL-Übersetzung trotz großer Sprachmodelle noch nicht gelöst ist. Komplexe Schemata und mehrdeutige Begriffe führen zu Abfragen, die plausibel wirken, aber nicht das Gemeinte berechnen. „Umsatz“ ist in einer Buchhaltung eben keine Spalte, sondern eine Regel.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "Und jede Stelle, an der ein Sprachmodell Abfragen erzeugt, ist potenziell ein Angriffspunkt für Prompt Injection. Das Risiko führt die OWASP-Liste für LLM-Anwendungen an erster Stelle. Was im Bericht landet und geteilt wird, läuft deshalb immer über das geprüfte Modell. Freies Erkunden ist erlaubt, aber abgeschottet.",
        refs: [10],
      },
      { type: "paragraph", text: "Die KI-Nutzung ist pro Arbeitsbereich budgetiert und kann abgeschaltet werden." },

      { type: "heading", text: "Entwickeln mit KI-Agents: ein ehrlicher Erfahrungsbericht" },
      {
        type: "paragraph",
        text: "smiit Analytics ist in rund drei Monaten entstanden. Die erste Zeile Code wurde Mitte Juni 2026 geschrieben, Mitte September waren Datenanbindung, Datenmodell, Berichtsumgebung, KI-Funktionen, Benutzerverwaltung und Betriebsoberfläche umgesetzt.",
      },
      {
        type: "grid",
        items: [
          { title: "~3 Monate", description: "von der ersten Zeile Code bis zur fertigen Plattform" },
          { title: "4 Sprachen", description: "Deutsch, Englisch, Französisch, Italienisch" },
          { title: "22 Architekturentscheidungen", description: "dokumentiert als Architecture Decision Records" },
          { title: "~1.800 Tests", description: "automatisiert, inklusive gezielter Isolationstests" },
        ],
      },
      {
        type: "paragraph",
        text: "Ohne KI-Coding-Agents wäre das in diesem Zeitraum nicht möglich gewesen. Die Geschwindigkeit ist aber nur ein Teil der Geschichte.",
      },

      { type: "subheading", text: "Was die Studienlage sagt" },
      {
        type: "paragraph",
        text: "Die Forschung zeichnet kein eindeutiges Bild. In einem kontrollierten Experiment lösten Entwickler mit GitHub Copilot eine abgegrenzte Programmieraufgabe um 55,8 % schneller. Eine randomisierte Studie von METR mit erfahrenen Open-Source-Entwicklern in großen, gewachsenen Codebasen kam dagegen zu dem Ergebnis, dass KI-Werkzeuge die Bearbeitungszeit um 19 % verlängerten. Die Teilnehmenden selbst hatten eine Beschleunigung erwartet und auch im Nachhinein wahrgenommen. Der DORA-Report 2025 fasst die Lage so zusammen: KI wirkt als Verstärker. Starke Teams werden besser, bestehende Probleme werden größer.",
        refs: [11, 12, 13],
      },
      {
        type: "paragraph",
        text: "Unsere Erfahrung passt zu dieser Lesart, und sie erklärt, warum es bei uns funktioniert hat.",
      },

      { type: "subheading", text: "Was bei uns den Unterschied gemacht hat" },
      {
        type: "bullets",
        items: [
          "**Architekturentscheidungen bleiben beim Menschen.** Jede grundlegende Entscheidung, etwa zur Mandantentrennung, zum Ersatz von dbt oder zur Absicherung der KI-Funktionen, haben wir als Architecture Decision Record dokumentiert: Kontext, Optionen, Entscheidung, Konsequenzen. Die KI hat Optionen ausgearbeitet und Konsequenzen aufgezeigt. Entschieden haben wir. Diese Dokumente waren zugleich der wichtigste Kontext für die Agents, denn eine KI, die die Gründe einer Entscheidung kennt, hält sich deutlich zuverlässiger daran.",
          "**Tests sind die Leitplanken.** Gerade bei Mandantentrennung und Kennzahlenlogik haben wir Regeln nicht nur beschrieben, sondern als Tests festgeschrieben. Eine Änderung, die eine Regel bricht, fällt sofort auf, egal ob sie von einem Menschen oder einer KI stammt.",
          "**Systematische Review-Runden.** In regelmäßigen Abständen haben wir den gesamten Stand gezielt auf Sicherheit, Performance und fachliche Korrektheit geprüft. Jeder Befund bekam eine Kennung, wurde behoben und mit einem Test abgesichert. Ein Großteil der oben beschriebenen „plausibel falschen“ Zahlen wurde in solchen Runden gefunden.",
          "**Fachwissen ist nicht delegierbar.** Dass bexio Eröffnungssalden jährlich neu bucht oder wie Treuhänder eine Bilanz gegliedert sehen wollen, weiß keine KI von allein. Die Erfahrung aus vier Jahren bexio-Projekten war die eigentliche Grundlage, auf der die Geschwindigkeit überhaupt sinnvoll nutzbar wurde.",
        ],
        itemRefs: { 0: [14] },
      },

      { type: "subheading", text: "Wo wir aufpassen mussten" },
      {
        type: "paragraph",
        text: "Hohe Geschwindigkeit erzeugt auch schnell technische Schulden. Cunningham, der den Begriff geprägt hat, beschreibt schon 1992, dass etwas Schuld die Entwicklung beschleunigt, solange sie zeitnah zurückgezahlt wird. Mit KI-Agents gilt das verstärkt. Code entsteht schneller, als man ihn lesen kann. Lösungen sehen auf den ersten Blick vollständig aus, auch wenn ein Randfall fehlt. Und Dokumentation veraltet, wenn man sie nicht aktiv mitpflegt. Wir haben früh angefangen, Aufräumen als festen Teil jeder Phase einzuplanen, etwa beim Zusammenfassen von Datenbankmigrationen oder bei der Konsolidierung des semantischen Modells von 29 auf 9 zentrale Sichten.",
        refs: [15],
      },
      {
        type: "paragraph",
        text: "Unser Fazit zu diesem Punkt: KI-Agents haben uns nicht die Denkarbeit abgenommen, aber einen Großteil der Schreibarbeit. Wer klar weiß, was er bauen will, und die Qualität konsequent absichert, kann damit in Wochen umsetzen, wofür früher Monate nötig waren.",
      },

      { type: "heading", text: "Was wir gelernt haben" },
      {
        type: "numbered",
        items: [
          {
            title: "Das Geschäftsmodell ist Teil der Architektur",
            description: "Unser erstes Produkt ist nicht an der Technik gescheitert, sondern daran, dass sein Betriebsmodell kein faires Preismodell zuließ.",
          },
          {
            title: "Individualisierung muss skalieren",
            description: "Ein Standardprodukt, bei dem jede Anpassung Entwicklungsaufwand bedeutet, ist ein Projektgeschäft mit anderem Etikett.",
          },
          {
            title: "Mandantentrennung gehört in die Datenbank",
            description: "Anwendungscode ist die erste Verteidigungslinie, aber nicht die letzte.",
          },
          {
            title: "Lieber ablehnen als falsch rechnen",
            description: "In der Finanzanalyse ist eine Fehlermeldung besser als eine plausible, falsche Zahl.",
          },
          {
            title: "Standards sind Empfehlungen, keine Pflicht",
            description: "dbt ist ein hervorragendes Werkzeug, es passte nur nicht zu unserer zentralen Anforderung.",
          },
          {
            title: "KI braucht Leitplanken, im Produkt wie in der Entwicklung",
            description: "In beiden Fällen gilt: klare Grenzen, nachvollziehbare Entscheidungen, Tests.",
          },
          {
            title: "Domänenwissen ist der eigentliche Wettbewerbsvorteil",
            description: "Code lässt sich heute schnell schreiben. Zu wissen, welcher Code der richtige ist, lässt sich nicht beschleunigen.",
          },
        ],
      },

      { type: "heading", text: "Fazit und Ausblick" },
      {
        type: "paragraph",
        text: "smiit Analytics ist das Ergebnis eines Umwegs, der sich gelohnt hat. Die Power-BI-Version hat uns gezeigt, was bexio-Kunden wirklich brauchen, und gleichzeitig, wie man es ihnen nicht verkaufen sollte. Die neue Plattform nimmt beides auf: Sie bildet den typischen Bedarf im Standard ab und ermöglicht individuelle Auswertungen, ohne dass dafür Entwicklungsaufwand entsteht.",
      },
      {
        type: "paragraph",
        text: "smiit Analytics wird in Kürze über den bexio Marketplace verfügbar sein, als Abonnement pro verbundener bexio-Firma und Nutzer. Wir freuen uns darauf, die Plattform gemeinsam mit den ersten Kunden weiterzuentwickeln. Und wir sind ehrlich gesagt ein wenig stolz darauf, was in den letzten Monaten entstanden ist.",
      },
    ],

    faq: [
      {
        question: "Für wen ist smiit Analytics gedacht?",
        answer:
          "Für Schweizer KMU, die bexio nutzen und ihre Finanz-, Verkaufs-, Projekt- und Personaldaten auswerten wollen, sowie für Treuhänder, die ihre Mandanten mit aussagekräftigen Auswertungen unterstützen.",
      },
      {
        question: "Was unterscheidet die neue Version von der bisherigen Power-BI-Lösung?",
        answer:
          "Die bisherige Lösung wurde beim Kunden installiert und einmalig bezahlt, Anpassungen wurden nach Aufwand abgerechnet. Die neue Version ist eine zentral betriebene SaaS-Anwendung mit Abonnement. Individuelle Auswertungen erstellen Kunden selbst, auf Wunsch mit KI-Unterstützung.",
      },
      {
        question: "Welche Daten aus bexio werden ausgewertet?",
        answer:
          "Rund 35 Objekttypen, darunter Buchhaltung und Kontenplan, Rechnungen, Offerten und Aufträge, Einkauf und Ausgaben, Bank, Projekte, Zeiterfassung sowie Personaldaten, sofern die entsprechenden Berechtigungen erteilt werden.",
      },
      {
        question: "Wie aktuell sind die Daten?",
        answer:
          "Jede Datenquelle wird zu frei wählbaren Uhrzeiten automatisch aktualisiert. Zusätzlich ist eine manuelle Aktualisierung möglich.",
      },
      {
        question: "Wie werden die Daten geschützt?",
        answer:
          "Die Daten jedes Kunden sind auf Datenbankebene durch Row-Level-Security getrennt, Zugangsdaten zu bexio werden verschlüsselt gespeichert, und auch Administratoren erhalten nur mit ausdrücklicher, befristeter Freigabe des Kunden Zugriff.",
      },
      {
        question: "Ist die KI-Nutzung verpflichtend?",
        answer:
          "Nein. Die KI-Funktionen sind pro Arbeitsbereich budgetiert und lassen sich abschalten. Alle Standardberichte funktionieren ohne KI.",
      },
      {
        question: "Braucht man Power BI oder andere Lizenzen?",
        answer:
          "Nein. smiit Analytics läuft vollständig im Browser, eine zusätzliche Software oder Lizenz ist nicht erforderlich.",
      },
    ],

    sources: [
      {
        title: "bexio AG (2026): 100'000 Schweizer KMU setzen für ihre Administration auf bexio. Medienmitteilung vom 18.02.2026",
        url: "https://www.presseportal.ch/de/pm/100058603/100938493",
      },
      {
        title: "Cusumano (2008): The Changing Software Business – Moving from Products to Services (IEEE Computer, 41(1))",
        url: "https://doi.org/10.1109/MC.2008.29",
      },
      {
        title: "Pine (1993): Mass Customization – The New Frontier in Business Competition (Harvard Business School Press)",
      },
      {
        title: "Kimball & Ross (2013): The Data Warehouse Toolkit – The Definitive Guide to Dimensional Modeling, 3. Auflage (Wiley)",
      },
      {
        title: "Bezemer & Zaidman (2010): Multi-Tenant SaaS Applications – Maintenance Dream or Nightmare? (EVOL/IWPSE, ACM)",
        url: "https://doi.org/10.1145/1862372.1862393",
      },
      {
        title: "Weissman & Bobrowski (2009): The Design of the Force.com Multitenant Internet Application Development Platform (ACM SIGMOD)",
        url: "https://doi.org/10.1145/1559845.1559942",
      },
      {
        title: "Microsoft Azure Architecture Center: Tenancy Models for a Multitenant Solution",
        url: "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models",
      },
      {
        title: "PostgreSQL 16 Documentation, Kapitel 5.8: Row Security Policies",
        url: "https://www.postgresql.org/docs/16/ddl-rowsecurity.html",
      },
      {
        title: "Floratou et al. (2024): NL2SQL is a Solved Problem... Not! (CIDR 2024)",
        url: "https://www.cidrdb.org/cidr2024/papers/p74-floratou.pdf",
      },
      {
        title: "OWASP Gen AI Security Project (2025): OWASP Top 10 for LLM Applications 2025 – LLM01: Prompt Injection",
        url: "https://genai.owasp.org/llm-top-10/",
      },
      {
        title: "Peng, Kalliamvakou, Cihon & Demirer (2023): The Impact of AI on Developer Productivity – Evidence from GitHub Copilot",
        url: "https://arxiv.org/abs/2302.06590",
      },
      {
        title: "Becker, Rush, Barnes & Rein (2025): Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (METR)",
        url: "https://arxiv.org/abs/2507.09089",
      },
      {
        title: "DORA / Google Cloud (2025): State of AI-assisted Software Development 2025",
        url: "https://dora.dev/dora-report-2025/",
      },
      {
        title: "Nygard (2011): Documenting Architecture Decisions (Cognitect Blog)",
        url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
      },
      {
        title: "Cunningham (1992): The WyCash Portfolio Management System (OOPSLA '92 Addendum, ACM)",
        url: "https://doi.org/10.1145/157709.157715",
      },
    ],

    relatedServicePath: "services/analytics",
    keywords: [
      "smiit Analytics",
      "bexio",
      "bexio Auswertungen",
      "Power BI",
      "SaaS",
      "Multi-Tenancy",
      "Row-Level-Security",
      "Semantic Layer",
      "Cube",
      "KI-Agents",
      "Softwareentwicklung mit KI",
    ],
    metaTitle: "smiit Analytics: Von Power BI zur SaaS-Plattform für bexio | smiit",
    metaDescription:
      "Wie aus Power-BI-Projekten für bexio-Kunden eine SaaS-Plattform wurde: Geschäftsmodell, Architektur, Mandantentrennung, KI im Produkt und Entwicklung mit KI-Agents.",
  },

  en: {
    slug: "smiit-analytics-from-power-bi-to-saas",
    category: "apps",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: "Noah Neßlauer",
    title: "From individual Power BI projects to a SaaS platform: How smiit Analytics for bexio came about",
    shortTitle: "smiit Analytics: From Power BI to SaaS",
    excerpt:
      "What started as a series of individual Power BI projects for bexio customers is now an analytics platform of its own. A first-hand account of a business model that didn't work, the architecture decisions that followed and what we learned building it with AI agents.",
    coverImage: {
      url: `${SA}/cover-en.webp`,
      width: 2524,
      height: 1008,
      alt: "From bexio via smiit Analytics to reports and AI",
    },

    blocks: [
      {
        type: "paragraph",
        text: "Most software products aren't born from an idea on the drawing board. They emerge from a pattern you eventually can't ignore any more. For us, it was a cluster of requests from a direction we hadn't expected: Swiss SMEs that finally wanted to analyse their bexio data properly.",
      },
      {
        type: "paragraph",
        text: "This article tells how those requests first turned into a Power BI-based product, why that product hit its commercial limits, and how we then rebuilt smiit Analytics as a SaaS platform of its own. It is about architecture decisions, about bugs you only find with real accounting data, and about what AI-assisted software development actually delivers on a demanding project — and what it doesn't.",
      },

      { type: "heading", text: "Why bexio, of all things?" },
      {
        type: "paragraph",
        text: "At its core, smiit is a service provider for apps, workflows and analytics for mid-sized companies. For a long time our focus was order management and custom business applications. Software used exclusively in Switzerland was not on our radar.",
      },
      {
        type: "paragraph",
        text: "Between late 2021 and late 2025 we then received five or six requests that related specifically to bexio. That doesn't sound like much. For a single third-party system — one outside our home market, no less — it was remarkably many. The requests were strikingly similar: the data lives in bexio, day-to-day business runs well there, but for analysis over time, across departments or for steering the company, the built-in tools fall short.",
      },
      {
        type: "paragraph",
        text: "In hindsight the pattern is easy to explain. bexio is widespread in Switzerland and reported more than 100,000 SME customers in February 2026. These companies keep accounting, orders, invoices, projects and time tracking in one system. The data for good financial controlling is already there — it just rarely gets used. Once you've recognised that, every further request stops looking like a one-off project and starts looking like a market.",
        refs: [1],
      },

      { type: "heading", text: "The first answer: smiit Analytics on Power BI" },
      {
        type: "paragraph",
        text: "The obvious reaction was to do what we were already good at: Power BI. In 2024 we turned our previous projects into a standardised product. It consisted of a complete data model for bexio data and a large number of ready-made reports. At the end of 2025 it went live on the bexio Marketplace.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-powerbi.webp`,
        width: 1523,
        height: 856,
        maxWidth: 960,
        alt: "Power BI report “Sales – Invoices” from the previous version of smiit Analytics: invoice trend by month, invoices by status, ABC analysis of invoices per customer and invoices per employee",
        caption: "The first version: a standardised Power BI data model with ready-made reports, set up in the customer's own environment.",
      },
      { type: "paragraph", text: "The product had real strengths:" },
      {
        type: "bullets",
        items: [
          "**Maximum flexibility.** Power BI is a mature tool. Almost any analysis could be built.",
          "**Data stays with the customer.** The solution was set up and operated in the customer's own environment.",
          "**Fast time to value.** The ready-made reports covered most standard needs out of the box.",
        ],
      },
      { type: "paragraph", text: "The weaknesses didn't show up in the technology, but in the business model." },

      { type: "subheading", text: "Why the one-off price became a trap" },
      {
        type: "paragraph",
        text: "Because the solution was set up once at the customer's site and hosted there, we had no control over access or usage. A usage- or user-based subscription was practically impossible. What remained was a one-off price.",
      },
      {
        type: "paragraph",
        text: "On top of that, almost every customer wanted customisations. And every customisation was development work we had to bill by effort. The requests fell into two clearly distinct groups:",
      },
      {
        type: "bullets",
        items: [
          "**Operationally run companies** mainly wanted HR analytics: timesheets, utilisation and planned-versus-actual hours, often combined with automation such as regular emails to employees.",
          "**Fiduciaries and finance leads** were interested in the financial data. They wanted the balance sheet, income statement and KPIs structured exactly the way they need them for their clients.",
        ],
      },
      {
        type: "paragraph",
        text: "For many customers, especially smaller ones, the one-off price plus customisation effort added up to an amount that didn't fit their budget. We had a good product with a pricing model that excluded its own target group.",
      },

      { type: "subheading", text: "The lesson behind it" },
      {
        type: "paragraph",
        text: "In retrospect, we were caught in a tension that is well described in the literature. Cusumano shows how the software business is shifting from selling product licences towards services and recurring revenue, and what that means for margins and business models. Pine describes, under the term mass customisation, the challenge of delivering individual offerings at the cost of a standard product.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "Our Power BI product was positioned wrongly on both counts. It was a product with project logic: standardised at the core, but every customisation cost just as much as in the project business. The conclusion was clear. We needed a product in which customisation no longer meant development effort on our side.",
      },
      {
        type: "image",
        src: `${SA}/business-model-en.webp`,
        width: 3600,
        height: 1560,
        maxWidth: 1040,
        alt: "Comparison of operating models: previously, Power BI was set up and customised in each customer environment, billed via a one-off price and effort. Today, a centrally operated SaaS platform serves many bexio companies on subscription, with standard reports and AI self-service.",
        caption: "From a project with a product label to real SaaS: only central operation makes a fair subscription and updates for everyone possible.",
      },

      { type: "heading", text: "The reset: what the new product had to deliver" },
      {
        type: "paragraph",
        text: "Before writing a single line of code, we redefined the requirements. The most important ones were:",
      },
      {
        type: "numbered",
        items: [
          {
            title: "Real SaaS instead of an installation",
            description: "A centrally operated application in which many customers work securely separated from one another. Only this makes updates, support and a subscription model possible at all.",
          },
          {
            title: "A fair, predictable pricing model",
            description: "A subscription per connected bexio company and per user, sold through the bexio Marketplace, instead of a high one-off price.",
          },
          {
            title: "Customisation without development effort",
            description: "The customisation requests from the Power BI days should either be part of the standard or be something customers can implement themselves.",
          },
          {
            title: "No setup at the customer's site",
            description: "Sign up, connect bexio, done. Data should stay up to date automatically, without manual exports.",
          },
          {
            title: "Data protection as a baseline",
            description: "We're dealing with accounting and HR data. Tenant isolation, encryption and auditable access are non-negotiable.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Requirement 3 led to the most important product decision: we combine a strong standard with AI assistance. The typical requests from the Power BI days — hours, utilisation, balance sheet, income statement and KPIs — are built directly into the standard report. For everything beyond that, customers can create and adapt their own reports, optionally with the help of an AI that answers questions about the data and edits reports. That way even very individual requirements fit into a standard product.",
      },

      { type: "subheading", text: "Why not simply Power BI Embedded?" },
      {
        type: "paragraph",
        text: "The question was obvious, and we took it seriously. Power BI Embedded is strong for classic reporting. For our goal, however, it would have tied us to a licensing and embedding model we don't control — bringing back exactly the cost structure we wanted to escape. We also rejected embedding an open-source BI tool such as Metabase or Superset: for users it quickly feels like a foreign body, and it leaves little room for an AI that is deeply integrated into the data model and reports.",
      },
      {
        type: "paragraph",
        text: "So we decided to build our own application, based on proven open-source building blocks.",
      },

      { type: "heading", text: "The architecture at a glance" },
      { type: "paragraph", text: "The data flow can be described in five stages:" },
      {
        type: "image",
        src: `${SA}/architecture-en.webp`,
        width: 3840,
        height: 1320,
        maxWidth: 1040,
        alt: "smiit Analytics data flow: the .NET sync worker reads the bexio API, the data is prepared in PostgreSQL across the raw, staging and mart (star schema) schemas, modelled in the Cube semantic layer and displayed in the web app (Next.js, ASP.NET Core). AI features edit reports via Cube and explore the mart schema read-only. Everything runs on Microsoft Azure.",
        caption: "From the bexio API to the report: one database with separate schemas, a central semantic layer and row-level security on every analytical table.",
      },
      {
        type: "table",
        headers: ["Layer", "Technology", "Purpose"],
        rows: [
          ["Data integration", ".NET Worker Service", "Loads around 35 object types from bexio: accounting, orders, invoices, banking, projects, time entries, HR"],
          ["Raw data & staging", "PostgreSQL (raw, staging)", "Stores the original responses unchanged and converts them into typed tables"],
          ["Analytical model", "PostgreSQL (mart)", "Star schema with facts and dimensions, prepared for analysis"],
          ["Semantic layer", "Cube", "Defines metrics, relationships and time logic centrally — one query language for reports and AI"],
          ["Application", "Next.js/React, ASP.NET Core API", "Reports, filters, editing, user management, AI features"],
          ["Operations", "Microsoft Azure", "Container-based, automated deployments across separate environments"],
        ],
      },
      {
        type: "paragraph",
        text: "The analytical model follows Kimball and Ross's dimensional modelling: facts such as journal lines, invoice items or time entries are connected through shared dimensions such as date, customer, account or project. That way revenue, open items and hours can be filtered together in one report without every combination having to be programmed individually.",
        refs: [4],
      },
      {
        type: "image",
        src: `${SA}/star-schema-en.webp`,
        width: 3600,
        height: 1500,
        maxWidth: 940,
        alt: "Simplified star schema: the facts journal lines, invoices and time entries share the dimensions date, currency, customer, account, project and employee.",
        caption: "Shared dimensions connect the facts. Simplified excerpt: the model comprises around 20 facts and 17 dimensions.",
      },
      {
        type: "paragraph",
        text: "In smiit Analytics, reports are not hard-coded pages but declarative definitions: which visualisation shows which metric by which dimension. That has a far-reaching advantage. Whatever is described as data can be validated, versioned and compared — and it can be edited by an AI without any code being generated.",
      },

      { type: "heading", text: "The biggest challenges and how we solved them" },

      { type: "subheading", text: "1. Tenant isolation that holds even when things go wrong" },
      {
        type: "paragraph",
        text: "In a SaaS application, many customers share the same infrastructure. Economically, that is the core of the model — and at the same time its biggest risk. Bezemer and Zaidman point out that a wrong architecture decision on multi-tenancy quickly turns into a maintenance problem. The Force.com architecture shows how far a consistently shared model can go when isolation is anchored in the foundation. Microsoft's architecture guidance describes the range from fully isolated to fully shared models and the trade-offs of each.",
        refs: [5, 6, 7],
      },
      { type: "paragraph", text: "We opted for a shared model with several lines of defence:" },
      {
        type: "bullets",
        items: [
          "**The database is the last line of defence.** Every analytical table is protected by PostgreSQL row-level security. These policies also apply to the table owner (`FORCE ROW LEVEL SECURITY`). A filter forgotten in application code therefore doesn't cause a data leak — it produces an empty result.",
          "**The context travels with every query.** The application sets which bexio company is being queried per transaction. That way no context can “leak” from one request into the next on shared database connections.",
          "**The boundary is the data source.** What gets isolated is not the individual report but the connected bexio company. We corrected this decision early on. It allows several reports and users to access the same data source without weakening the isolation.",
          "**Tests prove the isolation.** Automated tests deliberately try to access other tenants' data — and must fail.",
        ],
        itemRefs: { 0: [8] },
      },
      {
        type: "image",
        src: `${SA}/tenant-isolation-en.webp`,
        width: 3600,
        height: 1230,
        maxWidth: 1040,
        alt: "Three lines of defence for tenant isolation: authorisation for the data source, context per transaction and row-level security with FORCE. In the database, a request from company A only sees company A's rows; isolation tests deliberately attempt cross-tenant access.",
        caption: "Several lines of defence: even if application code forgets a filter, a request from company A only sees company A's rows.",
      },
      {
        type: "paragraph",
        text: "The same principle applies to platform operations. Even smiit administrators cannot see customer data unless the customer grants time-limited, logged support access.",
      },

      { type: "subheading", text: "2. The bexio integration: robust rather than quick" },
      {
        type: "paragraph",
        text: "“Connecting” an API is done quickly. Connecting it so that many customers' data is reliably synchronised several times a day is a different job. A few things that kept us busy:",
      },
      {
        type: "bullets",
        items: [
          "**Incremental where possible.** Where the API allows it, we only load changed records, with an overlap window as a safety net. Where it doesn't, we load everything and discard unchanged records via a hash comparison.",
          "**Detecting deleted data.** Incremental queries don't return deletions. So we run a full reconciliation at regular intervals, ensuring deleted documents don't linger in the reports.",
          "**Fair load distribution.** API limits apply per connected company. We cap parallelism per connection and overall, respect the retry delays the API specifies, and spread automatic refreshes with a random offset so that not every customer syncs on the hour.",
          "**Time isn't just time.** Timestamps arrive without a time zone, in Swiss local time. Interpret them as UTC and you shift data by one or two hours — plus twice a year because of daylight saving time.",
        ],
      },
      {
        type: "paragraph",
        text: "From the customer's perspective, all of this boils down to simple settings: every data source is refreshed automatically at times of their choosing, and a manual refresh is possible at any time. A daily refresh budget keeps the load — and therefore operating costs — predictable. That, too, is a prerequisite for a fair subscription price.",
      },
      {
        type: "image",
        src: `${SA}/refresh-schedule-en.webp`,
        width: 1950,
        height: 753,
        maxWidth: 1040,
        alt: "“Automatic refresh” settings of a data source: a grid of 24 times with 05:00 and 12:00 selected (2 of 8). Below, the next refresh from 08/10/2026, 05:00 (Europe/Zurich), used today 0 of 12 automatic, 0 of them by the AI, and the “Reload everything” option, possible once a day.",
        caption: "Refresh from the customer's perspective: up to eight freely selectable times, a daily quota and a full reload when needed.",
      },

      { type: "subheading", text: "3. A deliberate departure from the standard stack" },
      {
        type: "paragraph",
        text: "For transforming raw data into the analytical model, dbt is today's de facto standard. We started with it — and dropped it again after just one week.",
      },
      {
        type: "paragraph",
        text: "The reason was a core requirement: a synchronisation has to work **end to end**. When a customer clicks “Refresh”, it shouldn't just reload the raw data. Exactly that customer's data should be computed all the way through to the report — immediately. dbt is designed as a batch tool that rebuilds entire models. It would also have added a second runtime and a second permission model alongside row-level security.",
      },
      {
        type: "flow",
        steps: [
          "Customer clicks “Refresh”",
          "Sync worker loads changed data from bexio (raw)",
          "Typing in staging",
          "SQL steps build the star schema (mart)",
          "All per data source in one transaction",
          "The report shows the new figures immediately",
        ],
      },
      {
        type: "paragraph",
        text: "We therefore built the transformation into the .NET worker as an ordered sequence of SQL steps. It runs per data source in a single transaction, writes only rows that actually changed and skips itself if nothing has changed. That was more in-house development than we would have liked. But it's the point where the architecture follows the product, not the other way round.",
      },

      { type: "subheading", text: "4. Numbers that look plausible and are still wrong" },
      {
        type: "paragraph",
        text: "This was the most instructive category of problems. A crash is noticed immediately. A balance sheet total that's three times too high may only be noticed by the fiduciary. A few examples we only found with real data:",
      },
      {
        type: "bullets",
        items: [
          "**Opening balances per fiscal year.** bexio books the opening balances anew in every fiscal year. A balance sheet query that isn't restricted to one fiscal year sums these balances across all years and inflates the result accordingly. Our solution is deliberately strict: the semantic layer rejects such queries before they reach the database.",
          "**Top-N lists with empty entries.** PostgreSQL sorts missing values first in descending order. As a result, a “top 10 customers by revenue” list showed customers without any revenue at the very top in certain combinations.",
          "**Year-over-year comparisons with 0% growth.** If a prior-year comparison is grouped by the year dimension rather than a real time axis, it compares every year with itself. The result is mathematically correct and useless from a business perspective.",
          "**Foreign currencies.** Every amount is held in its original currency and in the booking currency, converted at the rate valid on the document date — not today's rate.",
        ],
      },
      {
        type: "paragraph",
        text: "The common pattern: accounting rules belong in **one** central place, and wherever they could be violated, the system should rather refuse than guess. This mindset also shapes how we handle AI.",
      },

      { type: "subheading", text: "5. Individual requirements in a standard product — with AI" },
      {
        type: "paragraph",
        text: "This is where things come full circle back to the Power BI days. The most common customisation requests are now part of the standard. Every new workspace starts with a report covering overview, sales, purchasing, income statement, balance sheet, working hours, projects and cash flow. On top of that comes a catalogue of business KPIs, from liquidity ratios and EBITDA margin to return on equity.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-standard-report.webp`,
        width: 1916,
        height: 941,
        maxWidth: 1040,
        alt: "Standard report in smiit Analytics, “Overview” page: KPIs for revenue, result, incoming payments and open receivables, monthly revenue versus prior year, top customers by revenue, income, expenses and result per month, and revenue paid versus open; on the left, navigation from sales to cash flow",
        caption: "The standard report covers what used to be custom-built: from the overview to the balance sheet, working hours and cash flow.",
      },
      {
        type: "paragraph",
        text: "For the KPIs, someone has to define which accounts feed into which figure. That is exactly the work that used to cause customisation effort. Today the system suggests the mapping based on the account ranges of the Swiss SME chart of accounts and uses AI for ambiguous accounts. The customer only reviews and confirms.",
      },
      {
        type: "image",
        src: `${SA}/account-mapping-en.webp`,
        width: 1950,
        height: 1017,
        maxWidth: 1040,
        alt: "“KPIs” settings: balance sheet KPIs such as cash and equivalents (788.89), liquidity ratio 1 (10.1%), working capital (19,375.95) or days sales outstanding (303 d), and income statement KPIs such as EBIT, EBITDA, return on total assets (92.6%) or material expenses (5,111.89), each with the number of mapped accounts and the label “automatic”; top right, the “Suggest again” button.",
        caption: "Account mapping: every KPI gets its accounts assigned automatically, and the amounts are calculated live. The customer reviews and adjusts where needed.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-report-editor.webp`,
        width: 889,
        height: 995,
        maxWidth: 600,
        alt: "Report editor in smiit Analytics: for the “Top customers by revenue” chart, a bar chart is selected with the revenue metric as value and contact as category; below, the KPI catalogue with invoice metrics such as new-customer revenue, open invoice amount or dunning rate",
        caption: "Customise rather than commission: choose a visualisation and assign metrics from the catalogue, with no development effort. (Screenshot from the German interface.)",
      },
      {
        type: "paragraph",
        text: "Beyond that, there are two AI features that we deliberately secured in different ways:",
      },
      {
        type: "bullets",
        items: [
          "**Creating and editing reports.** The AI works exclusively through the defined semantic model and changes report definitions, not code. Changes first land in a draft. Nothing is saved until the user approves.",
          "**Exploring data freely.** For questions no report anticipates (“Which customers have payment terms over 60 days and an open reminder, by canton?”), the AI may generate read-only queries. These run through a dedicated read-only database role, an allow-list of permitted tables and a read-only transaction — in addition to row-level security.",
        ],
      },
      {
        type: "image",
        src: `${SA}/ai-lanes-en.webp`,
        width: 3600,
        height: 1650,
        maxWidth: 1040,
        alt: "Two AI lanes: when editing reports, the AI only changes the report definition via the semantic layer; the result lands in a draft and only becomes a report after approval. When exploring freely, the AI writes read-only queries that pass four barriers: read-only database role, allow-list, read-only transaction and row-level security; the result is labelled as unverified raw data.",
        caption: "Two paths, two security levels: whatever ends up in reports always goes through the verified model. Free exploration is allowed, but sandboxed.",
      },
      {
        type: "image",
        src: `${SA}/ai-report-editing-en.webp`,
        width: 1950,
        height: 1035,
        maxWidth: 1040,
        alt: "Editing reports with AI in three steps: 1. Instruction in the chat: “Please show cash flow and contribution margin on the overview page, and their development in the chart as well.” 2. The editor works on the report. 3. The AI explains the changes, notes that the contribution margin is empty because internal cost rates are missing, and lists four suggestions for the view; 8 rows and 0 pseudonyms were sent to the AI.",
        caption: "Editing reports with AI: the AI works in the editor and delivers suggestions. Nothing is applied until the user clicks “Apply”.",
      },
      {
        type: "image",
        src: `${SA}/ai-report-result-en.webp`,
        width: 1950,
        height: 1050,
        maxWidth: 1040,
        alt: "Overview before and after: the “Incoming payments” KPI card (CHF 3,722.03) becomes “Net cash flow” (CHF 588.89), and the chart “Income, expenses and result per month” becomes “Net cash flow and contribution margin per month”. The contribution margin stays empty because internal cost rates are missing.",
        caption: "The result on the overview. The contribution margin stays empty until internal cost rates are entered: better empty than wrong.",
      },
      {
        type: "image",
        src: `${SA}/ai-exploration-en.webp`,
        width: 1950,
        height: 1170,
        maxWidth: 1040,
        alt: "Exploring data freely in three steps: 1. A question about how net cash flow and contribution margin are calculated and which bexio accounts or bookings were used. 2. The analyst checks the data. 3. Answer with derivation: net cash flow of CHF 588.89 from CHF 3,722.03 inflows and CHF 3,133.14 outflows on the bank account “Example Bank”; the contribution margin is empty, not CHF 0, because no internal cost rates have been entered. Plus a table of bank inflows per month, labelled as unverified raw data.",
        caption: "Exploring data freely: the AI discloses how it calculates and which bexio data it uses. The result is labelled as unverified raw data.",
      },
      {
        type: "paragraph",
        text: "Why this separation? Research on natural-language database queries shows that enterprise-grade text-to-SQL is still not solved, despite large language models. Complex schemas and ambiguous terms lead to queries that look plausible but don't compute what was meant. In accounting, “revenue” isn't a column — it's a rule.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "And every point at which a language model generates queries is a potential target for prompt injection — the risk that tops the OWASP list for LLM applications. Whatever ends up in a report and gets shared therefore always goes through the verified model. Free exploration is allowed, but sandboxed.",
        refs: [10],
      },
      { type: "paragraph", text: "AI usage is budgeted per workspace and can be switched off." },

      { type: "heading", text: "Building with AI agents: an honest account" },
      {
        type: "paragraph",
        text: "smiit Analytics was built in around three months. The first line of code was written in mid-June 2026; by mid-September, data integration, data model, reporting environment, AI features, user management and the operations console were in place.",
      },
      {
        type: "grid",
        items: [
          { title: "~3 months", description: "from the first line of code to the finished platform" },
          { title: "4 languages", description: "German, English, French, Italian" },
          { title: "22 architecture decisions", description: "documented as architecture decision records" },
          { title: "~1,800 tests", description: "automated, including targeted isolation tests" },
        ],
      },
      {
        type: "paragraph",
        text: "Without AI coding agents, that would not have been possible in this time frame. But speed is only part of the story.",
      },

      { type: "subheading", text: "What the research says" },
      {
        type: "paragraph",
        text: "Research doesn't paint a clear picture. In a controlled experiment, developers using GitHub Copilot completed a well-defined programming task 55.8% faster. A randomised study by METR with experienced open-source developers in large, mature codebases, by contrast, found that AI tools increased completion time by 19%. The participants themselves had expected a speed-up and perceived one in hindsight, too. The 2025 DORA report sums it up: AI acts as an amplifier. Strong teams get better, existing problems get bigger.",
        refs: [11, 12, 13],
      },
      {
        type: "paragraph",
        text: "Our experience fits this reading — and it explains why it worked for us.",
      },

      { type: "subheading", text: "What made the difference for us" },
      {
        type: "bullets",
        items: [
          "**Architecture decisions stay with humans.** We documented every fundamental decision — on tenant isolation, replacing dbt or securing the AI features — as an architecture decision record: context, options, decision, consequences. The AI worked out options and laid out consequences. We made the decisions. These documents were also the most important context for the agents, because an AI that knows the reasons behind a decision sticks to it far more reliably.",
          "**Tests are the guardrails.** Especially for tenant isolation and KPI logic, we didn't just describe rules — we codified them as tests. A change that breaks a rule is noticed immediately, whether it comes from a human or an AI.",
          "**Systematic review rounds.** At regular intervals, we deliberately reviewed the entire codebase for security, performance and business correctness. Every finding got an ID, was fixed and was locked in with a test. Most of the “plausibly wrong” numbers described above were found in these rounds.",
          "**Domain knowledge can't be delegated.** No AI knows on its own that bexio books opening balances anew every year, or how fiduciaries want a balance sheet structured. Four years of bexio projects were the real foundation that made the speed usable in the first place.",
        ],
        itemRefs: { 0: [14] },
      },

      { type: "subheading", text: "Where we had to be careful" },
      {
        type: "paragraph",
        text: "High speed also builds up technical debt quickly. Cunningham, who coined the term, wrote back in 1992 that a little debt speeds development, as long as it is paid back promptly. With AI agents, this applies all the more. Code is produced faster than you can read it. Solutions look complete at first glance, even when an edge case is missing. And documentation goes stale unless you actively maintain it. We started early to plan clean-up as a fixed part of every phase — for example consolidating database migrations, or reducing the semantic model from 29 to 9 central views.",
        refs: [15],
      },
      {
        type: "paragraph",
        text: "Our verdict on this point: AI agents didn't do our thinking for us, but they did most of the typing. If you know exactly what you want to build and consistently safeguard quality, you can deliver in weeks what used to take months.",
      },

      { type: "heading", text: "What we learned" },
      {
        type: "numbered",
        items: [
          {
            title: "The business model is part of the architecture",
            description: "Our first product didn't fail because of the technology, but because its operating model didn't allow a fair pricing model.",
          },
          {
            title: "Customisation has to scale",
            description: "A standard product in which every customisation means development effort is a project business with a different label.",
          },
          {
            title: "Tenant isolation belongs in the database",
            description: "Application code is the first line of defence, but not the last.",
          },
          {
            title: "Better to refuse than to miscalculate",
            description: "In financial analysis, an error message is better than a plausible but wrong number.",
          },
          {
            title: "Standards are recommendations, not obligations",
            description: "dbt is an excellent tool — it just didn't fit our core requirement.",
          },
          {
            title: "AI needs guardrails, in the product and in development",
            description: "In both cases: clear boundaries, traceable decisions, tests.",
          },
          {
            title: "Domain knowledge is the real competitive advantage",
            description: "Code can be written quickly today. Knowing which code is the right code can't be accelerated.",
          },
        ],
      },

      { type: "heading", text: "Conclusion and outlook" },
      {
        type: "paragraph",
        text: "smiit Analytics is the result of a detour that paid off. The Power BI version showed us what bexio customers really need — and, at the same time, how not to sell it to them. The new platform takes both lessons on board: it covers typical needs in the standard and enables individual analyses without any development effort.",
      },
      {
        type: "paragraph",
        text: "smiit Analytics will soon be available through the bexio Marketplace, as a subscription per connected bexio company and user. We look forward to developing the platform further together with our first customers. And, to be honest, we're a little proud of what has come together over the past few months.",
      },
    ],

    faq: [
      {
        question: "Who is smiit Analytics for?",
        answer:
          "For Swiss SMEs that use bexio and want to analyse their financial, sales, project and HR data — and for fiduciaries who want to support their clients with meaningful analyses.",
      },
      {
        question: "How does the new version differ from the previous Power BI solution?",
        answer:
          "The previous solution was installed at the customer's site and paid for once; customisations were billed by effort. The new version is a centrally operated SaaS application with a subscription. Customers build individual analyses themselves, optionally with AI assistance.",
      },
      {
        question: "Which bexio data is analysed?",
        answer:
          "Around 35 object types, including accounting and the chart of accounts, invoices, quotes and orders, purchasing and expenses, banking, projects, time tracking and HR data, provided the relevant permissions are granted.",
      },
      {
        question: "How up to date is the data?",
        answer:
          "Every data source is refreshed automatically at times of your choosing. A manual refresh is also possible.",
      },
      {
        question: "How is the data protected?",
        answer:
          "Each customer's data is separated at database level by row-level security, bexio credentials are stored encrypted, and even administrators only get access with the customer's explicit, time-limited approval.",
      },
      {
        question: "Is using the AI mandatory?",
        answer:
          "No. The AI features are budgeted per workspace and can be switched off. All standard reports work without AI.",
      },
      {
        question: "Do I need Power BI or other licences?",
        answer:
          "No. smiit Analytics runs entirely in the browser; no additional software or licence is required.",
      },
    ],

    sources: [
      {
        title: "bexio AG (2026): 100'000 Schweizer KMU setzen für ihre Administration auf bexio. Press release, 18 Feb 2026",
        url: "https://www.presseportal.ch/de/pm/100058603/100938493",
      },
      {
        title: "Cusumano (2008): The Changing Software Business – Moving from Products to Services (IEEE Computer, 41(1))",
        url: "https://doi.org/10.1109/MC.2008.29",
      },
      {
        title: "Pine (1993): Mass Customization – The New Frontier in Business Competition (Harvard Business School Press)",
      },
      {
        title: "Kimball & Ross (2013): The Data Warehouse Toolkit – The Definitive Guide to Dimensional Modeling, 3rd edition (Wiley)",
      },
      {
        title: "Bezemer & Zaidman (2010): Multi-Tenant SaaS Applications – Maintenance Dream or Nightmare? (EVOL/IWPSE, ACM)",
        url: "https://doi.org/10.1145/1862372.1862393",
      },
      {
        title: "Weissman & Bobrowski (2009): The Design of the Force.com Multitenant Internet Application Development Platform (ACM SIGMOD)",
        url: "https://doi.org/10.1145/1559845.1559942",
      },
      {
        title: "Microsoft Azure Architecture Center: Tenancy Models for a Multitenant Solution",
        url: "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models",
      },
      {
        title: "PostgreSQL 16 Documentation, Section 5.8: Row Security Policies",
        url: "https://www.postgresql.org/docs/16/ddl-rowsecurity.html",
      },
      {
        title: "Floratou et al. (2024): NL2SQL is a Solved Problem... Not! (CIDR 2024)",
        url: "https://www.cidrdb.org/cidr2024/papers/p74-floratou.pdf",
      },
      {
        title: "OWASP Gen AI Security Project (2025): OWASP Top 10 for LLM Applications 2025 – LLM01: Prompt Injection",
        url: "https://genai.owasp.org/llm-top-10/",
      },
      {
        title: "Peng, Kalliamvakou, Cihon & Demirer (2023): The Impact of AI on Developer Productivity – Evidence from GitHub Copilot",
        url: "https://arxiv.org/abs/2302.06590",
      },
      {
        title: "Becker, Rush, Barnes & Rein (2025): Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (METR)",
        url: "https://arxiv.org/abs/2507.09089",
      },
      {
        title: "DORA / Google Cloud (2025): State of AI-assisted Software Development 2025",
        url: "https://dora.dev/dora-report-2025/",
      },
      {
        title: "Nygard (2011): Documenting Architecture Decisions (Cognitect Blog)",
        url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
      },
      {
        title: "Cunningham (1992): The WyCash Portfolio Management System (OOPSLA '92 Addendum, ACM)",
        url: "https://doi.org/10.1145/157709.157715",
      },
    ],

    relatedServicePath: "services/analytics",
    keywords: [
      "smiit Analytics",
      "bexio",
      "bexio reporting",
      "Power BI",
      "SaaS",
      "multi-tenancy",
      "row-level security",
      "semantic layer",
      "Cube",
      "AI agents",
      "AI-assisted software development",
    ],
    metaTitle: "smiit Analytics: From Power BI to a SaaS platform for bexio | smiit",
    metaDescription:
      "How Power BI projects for bexio customers became a SaaS platform: business model, architecture, tenant isolation, AI in the product and building with AI agents.",
  },
}

// ---------------------------------------------------------------------------
// Registry + helpers
// ---------------------------------------------------------------------------

const blogPosts: Record<string, LocalizedBlogPost> = {
  "mlops-with-microsoft-azure": mlopsAzure,
  "platform-economy-for-it-service-providers": platformEconomy,
  "azure-front-door-in-enterprise-architectures": azureFrontDoor,
  "smiit-analytics-from-power-bi-to-saas": smiitAnalyticsSaas,
}

/** All slugs (language-agnostic). */
export const blogPostSlugs = Object.keys(blogPosts)

/** Slugs that have a variant for the given locale — used for static params + sitemap. */
export function blogPostSlugsFor(lang: Locale): string[] {
  return blogPostSlugs.filter((slug) => Boolean(blogPosts[slug]?.[lang]))
}

export function getBlogPost(slug: string, lang: Locale): BlogPostContent | undefined {
  return blogPosts[slug]?.[lang]
}

/** Posts available in the given locale, newest first. */
export function listBlogPosts(lang: Locale): BlogPostContent[] {
  return blogPostSlugsFor(lang)
    .map((slug) => blogPosts[slug][lang] as BlogPostContent)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
}

/** Rough reading time in minutes, derived from the body blocks (~200 wpm). */
export function getReadingMinutes(post: BlogPostContent): number {
  const words = post.blocks.reduce((acc, block) => {
    if (block.type === "paragraph" || block.type === "heading" || block.type === "subheading") {
      return acc + block.text.split(/\s+/).length
    }
    if (block.type === "bullets") {
      return acc + block.items.join(" ").split(/\s+/).length
    }
    if (block.type === "code") {
      return acc + block.content.split(/\s+/).length
    }
    return acc
  }, 0)
  return Math.max(1, Math.round(words / 200))
}

type BlogUi = {
  eyebrow: string
  indexTitleLead: string
  indexTitleHighlight: string
  indexSubtitle: string
  readArticle: string
  backToOverview: string
  tocLabel: string
  byLabel: string
  publishedLabel: string
  updatedLabel: string
  readingTimeSuffix: string
  faqHeading: string
  sourcesHeading: string
  sourcesMore: string
  relatedServiceLabel: string
  relatedCaseStudyLabel: string
  ctaHeading: string
  ctaSubtitle: string
  ctaButton: string
  breadcrumbLabel: string
  emptyState: string
}

const blogUi: Record<Locale, BlogUi> = {
  de: {
    eyebrow: "Blog",
    indexTitleLead: "Fachartikel, die",
    indexTitleHighlight: "in die Tiefe gehen",
    indexSubtitle:
      "Praxiswissen zu Datenanalyse, Cloud, KI und digitaler Strategie — fundiert, ehrlich und aus echten Projekten heraus geschrieben.",
    readArticle: "Artikel lesen",
    backToOverview: "Alle Artikel",
    tocLabel: "Inhalt",
    byLabel: "von",
    publishedLabel: "Veröffentlicht am",
    updatedLabel: "Aktualisiert am",
    readingTimeSuffix: "Min. Lesezeit",
    faqHeading: "Häufige Fragen",
    sourcesHeading: "Quellen & weiterführende Literatur",
    sourcesMore: "weitere Quellen anzeigen",
    relatedServiceLabel: "Passende Leistung",
    relatedCaseStudyLabel: "Passende Case Study",
    ctaHeading: "Klingt das nach Ihrem nächsten Projekt?",
    ctaSubtitle: "Erzählen Sie uns von Ihrem Vorhaben — wir zeigen Ihnen, was technisch und wirtschaftlich sinnvoll ist.",
    ctaButton: "Kostenloses Erstgespräch",
    breadcrumbLabel: "Blog",
    emptyState: "Hier entstehen gerade die ersten Beiträge. Schauen Sie bald wieder vorbei.",
  },
  en: {
    eyebrow: "Blog",
    indexTitleLead: "In-depth articles that",
    indexTitleHighlight: "go beyond the surface",
    indexSubtitle:
      "Practical knowledge on data analytics, cloud, AI and digital strategy — well-founded, honest and written from real projects.",
    readArticle: "Read article",
    backToOverview: "All articles",
    tocLabel: "Contents",
    byLabel: "by",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    readingTimeSuffix: "min read",
    faqHeading: "Frequently asked questions",
    sourcesHeading: "Sources & further reading",
    sourcesMore: "more sources",
    relatedServiceLabel: "Related service",
    relatedCaseStudyLabel: "Related case study",
    ctaHeading: "Sounds like your next project?",
    ctaSubtitle: "Tell us about your plans — we'll show you what makes sense technically and commercially.",
    ctaButton: "Free initial consultation",
    breadcrumbLabel: "Blog",
    emptyState: "The first posts are on their way. Please check back soon.",
  },
}

export function getBlogUi(lang: Locale): BlogUi {
  return blogUi[lang]
}
