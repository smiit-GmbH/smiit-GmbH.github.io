import type { LocalizedCaseStudy } from "@/lib/case-studies"

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
      text: "smiit hat uns geholfen, unsere Plattformidee in sehr kurzer Zeit in ein produktives SaaS-Produkt zu überführen. Besonders wertvoll war, dass von Anfang an eine stabile Grundlage für Sicherheit, Wachstum und weitere Prozesse entstanden ist — nicht nur einzelne Funktionen.",
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
      text: "smiit helped us turn our platform idea into a production SaaS product in a very short time. What mattered most was that, from the start, we got a stable foundation for security, growth and further processes — not just individual features.",
      author: "Claimity AG",
      role: "InsurTech · SaaS platform for digital claims handling",
    },

    metaTitle: "Cloud architecture SaaS insurance – Claimity AG case study | smiit",
    metaDescription:
      "How smiit built a secure multi-tenant SaaS platform for digital insurance claims on Azure for Claimity in 6 weeks — from architecture to go-live.",
  },
}

export default claimity
