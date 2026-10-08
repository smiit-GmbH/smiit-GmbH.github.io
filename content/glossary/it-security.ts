import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

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

export default itSicherheit

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
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
}
