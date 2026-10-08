import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

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
        paragraphs: ["Neben den Service-Modellen unterscheidet man die Betriebsmodelle (Deployment-Modelle):"],
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
        paragraphs: ["Beyond the service models, clouds are distinguished by their deployment models:"],
        bullets: [
          "Public cloud: a provider's shared infrastructure (e.g. Microsoft Azure) – highly scalable and cost-efficient.",
          "Private cloud: operated dedicated to one company – more control and isolation, often for sensitive data or regulatory needs.",
          "Hybrid cloud: a combination of public and private cloud or on-premise, with workloads placed deliberately – a common, pragmatic route for SMEs.",
          "Multi-cloud: using several cloud providers in parallel to reduce dependency or combine specialized services.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: ["Cloud computing pays off wherever flexibility, fast provisioning and scalability matter."],
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

export default cloudComputing

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Cloud Computing heißt nicht einfach „die Server stehen woanders“ — der Kern sind on-demand bereitgestellte, elastisch skalierende Ressourcen mit nutzungsbasierter Abrechnung.",
      "Public Cloud gilt fälschlich als unsicher und Private Cloud als automatisch sicherer; tatsächlich entscheidet die saubere Umsetzung (Konfiguration, Identitäten, Datenschutz) über die Sicherheit, nicht das Betriebsmodell.",
      "Hybrid Cloud ist nicht „ein bisschen Cloud und ein bisschen On-Premise“, sondern eine bewusste Verteilung von Workloads anhand von Anforderungen wie Datenschutz, Latenz und Kosten.",
    ],
    sources: [
      {
        title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)",
        url: "https://csrc.nist.gov/pubs/sp/800/145/final",
      },
      {
        title: "Microsoft Azure – Was ist Cloud Computing? (Cloud Computing Dictionary)",
        url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-cloud-computing/",
      },
    ],
  },
  en: {
    misconceptions: [
      "Cloud computing is not simply about the servers being somewhere else — at its core it is on-demand, elastically scaling resources billed by usage.",
      "Public cloud is wrongly seen as insecure and private cloud as automatically safer; in reality clean implementation (configuration, identities, data protection) decides security, not the deployment model.",
      "Hybrid cloud is not a bit of cloud and a bit of on-premise, but a deliberate placement of workloads based on requirements such as data protection, latency and cost.",
    ],
    sources: [
      {
        title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)",
        url: "https://csrc.nist.gov/pubs/sp/800/145/final",
      },
      {
        title: "Microsoft Azure – What is cloud computing? (Cloud Computing Dictionary)",
        url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-cloud-computing/",
      },
    ],
  },
}
