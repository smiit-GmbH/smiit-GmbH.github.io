import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

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

export default dsgvoDatenschutz

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
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
}
