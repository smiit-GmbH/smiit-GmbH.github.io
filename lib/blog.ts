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
 */

export type BlogCategory = "analytics" | "apps" | "strategy"

export type BlogBlock =
  | { type: "heading"; text: string } // renders as <h2>
  | { type: "subheading"; text: string } // renders as <h3>
  /** `refs` are 1-based indices into `sources`, rendered as superscript citations. */
  | { type: "paragraph"; text: string; refs?: number[] }
  | { type: "bullets"; items: string[] }
  | { type: "code"; content: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string; maxWidth?: number }
  | { type: "maturity"; items: { level: number; label: string }[] }
  | { type: "grid"; items: { title: string; description: string }[] }
  | { type: "numbered"; items: { title: string; description: string }[] }
  | { type: "filetree"; nodes: FileTreeNode[] }
  | { type: "flow"; steps: string[] }
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
// Registry + helpers
// ---------------------------------------------------------------------------

const blogPosts: Record<string, LocalizedBlogPost> = {
  "mlops-with-microsoft-azure": mlopsAzure,
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
