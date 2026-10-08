import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

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

export default multiTenantArchitektur

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
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
}
