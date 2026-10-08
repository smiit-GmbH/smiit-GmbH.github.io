import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

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

export default cloudInfrastruktur

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Cloud-Infrastruktur wird oft als das bloße Verschieben von Servern in ein fremdes Rechenzentrum verstanden, dabei geht es um abstrahierte, on-demand bereitgestellte Ressourcen, die elastisch skalieren und nutzungsbasiert abgerechnet werden.",
      "Es herrscht der Irrglaube, die Cloud sei automatisch günstiger, doch ohne Kostensteuerung und passende Dimensionierung führen ungenutzte oder überdimensionierte Ressourcen schnell zu höheren Ausgaben als On-Premises.",
      "Viele gehen davon aus, dass der Cloud-Anbieter für alles haftet, obwohl im Modell der geteilten Verantwortung die Absicherung von Konfiguration, Identitäten und Daten beim Kunden liegt.",
    ],
    sources: [
      {
        title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)",
        url: "https://csrc.nist.gov/pubs/sp/800/145/final",
      },
      {
        title: "Microsoft Learn – Cloud Adoption Framework für Azure",
        url: "https://learn.microsoft.com/azure/cloud-adoption-framework/",
      },
    ],
  },
  en: {
    misconceptions: [
      "Cloud infrastructure is often understood as merely moving servers into someone else's data center, when it is really about abstracted, on-demand resources that scale elastically and are billed by usage.",
      "There is a misconception that the cloud is automatically cheaper, yet without cost management and proper sizing, idle or oversized resources can quickly cost more than on-premises.",
      "Many assume the cloud provider is liable for everything, although under the shared responsibility model securing configuration, identities and data remains the customer's job.",
    ],
    sources: [
      {
        title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)",
        url: "https://csrc.nist.gov/pubs/sp/800/145/final",
      },
      {
        title: "Microsoft Learn – Cloud Adoption Framework for Azure",
        url: "https://learn.microsoft.com/azure/cloud-adoption-framework/",
      },
    ],
  },
}
