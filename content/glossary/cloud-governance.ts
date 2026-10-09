import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

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

export default cloudGovernance

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Cloud Governance wird häufig auf reine Kostenkontrolle reduziert, umfasst aber ebenso Sicherheit, Compliance, Identitäts- und Ressourcenverwaltung über die gesamte Cloud-Umgebung hinweg.",
      "Es wird oft als einmaliges Projekt missverstanden, dabei ist Governance ein fortlaufender Prozess, der mit dem Wachstum der Cloud-Nutzung kontinuierlich angepasst werden muss.",
      "Viele setzen Governance mit starren Verboten gleich, doch gut umgesetzt schafft sie über Leitplanken und Automatisierung gerade mehr Handlungsspielraum für die Teams.",
    ],
    sources: [
      {
        title: "Microsoft Learn – Cloud Adoption Framework: Governance",
        url: "https://learn.microsoft.com/azure/cloud-adoption-framework/govern/",
      },
      {
        title: "Microsoft Learn – Azure Well-Architected Framework",
        url: "https://learn.microsoft.com/azure/well-architected/",
      },
    ],
  },
  en: {
    misconceptions: [
      "Cloud governance is often reduced to pure cost control, but it equally covers security, compliance, identity and resource management across the entire cloud environment.",
      "It is frequently misunderstood as a one-time project, whereas governance is an ongoing process that must be continuously adapted as cloud usage grows.",
      "Many equate governance with rigid prohibitions, yet when done well it actually creates more freedom for teams through guardrails and automation.",
    ],
    sources: [
      {
        title: "Microsoft Learn – Cloud Adoption Framework: Govern",
        url: "https://learn.microsoft.com/azure/cloud-adoption-framework/govern/",
      },
      {
        title: "Microsoft Learn – Azure Well-Architected Framework",
        url: "https://learn.microsoft.com/azure/well-architected/",
      },
    ],
  },
}
