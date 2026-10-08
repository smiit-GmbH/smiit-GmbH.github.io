import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const mvp: LocalizedGlossaryTerm = {
  de: {
    slug: "mvp",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "MVP (Minimum Viable Product)",
    title: "Was ist ein MVP (Minimum Viable Product)?",
    shortDefinition:
      "Ein Minimum Viable Product (MVP) ist die erste, bewusst schlanke Version eines Produkts, die nur die wichtigsten Funktionen enthält. Es dient dazu, eine Idee mit minimalem Aufwand am Markt zu testen und auf Basis echter Rückmeldungen weiterzuentwickeln.",
    synonyms: ["minimal funktionsfähiges Produkt", "erste Produktversion", "MVP-Ansatz"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ein MVP genutzt?",
        paragraphs: [
          "Ein MVP reduziert ein Produkt auf den Kern, der nötig ist, um den zentralen Nutzen zu beweisen. Statt Monate in einen vollständigen Funktionsumfang zu investieren, gehen Teams früh mit einer lauffähigen Version live und lernen aus dem echten Einsatz, welche Funktionen wirklich gebraucht werden.",
          "Dieser Ansatz senkt das Risiko von Fehlinvestitionen, weil Annahmen früh überprüft werden. Im Mittelstand eignet er sich besonders, um neue digitale Angebote schnell zu testen, ohne von Beginn an ein großes Budget zu binden – oft als erster Durchlauf im SDLC.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Unternehmen will eine Plattform zur digitalen Schadenmeldung anbieten. Statt sofort alle denkbaren Funktionen zu bauen, startet das MVP mit dem Kernablauf: Schaden melden, Status verfolgen, Bestätigung erhalten. Nach dem Livegang zeigen Nutzungsdaten und Rückmeldungen, welche Erweiterungen – etwa Reporting oder Partneranbindung – als Nächstes sinnvoll sind.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Ein MVP ist nicht mit einem unfertigen oder fehlerhaften Produkt zu verwechseln: Es ist bewusst klein, aber stabil und nutzbar. Es bildet den Ausgangspunkt für die weitere Entwicklung entlang des SDLC und wächst später oft zu einer vollwertigen digitalen Plattform. smiit hat für die Claimity AG genau diesen Weg gewählt und eine funktionsfähige SaaS-Plattform in nur sechs Wochen produktiv auf Microsoft Azure gebracht – mit Multi-Tenant-Architektur, Azure App Service, Azure Database for PostgreSQL und REST-APIs, DSGVO-konform und von Anfang an erweiterbar angelegt.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist ein MVP einfach eine unfertige Version?",
        answer:
          "Nein. Ein MVP ist bewusst auf die wichtigsten Funktionen reduziert, dabei aber stabil und für echte Nutzer einsatzfähig. Ziel ist nicht ein halbfertiges Produkt, sondern ein verwertbarer Kern zum Lernen.",
      },
      {
        question: "Wie schnell lässt sich ein MVP umsetzen?",
        answer:
          "Das hängt vom Umfang ab, doch gerade die Konzentration auf den Kern macht kurze Zeiträume möglich. smiit hat etwa für die Claimity AG eine produktive SaaS-Plattform in sechs Wochen auf Azure realisiert.",
      },
      {
        question: "Was ist der Unterschied zwischen einem MVP und einem Prototyp?",
        answer:
          "Ein Prototyp dient meist nur dazu, eine Idee zu veranschaulichen, und wird oft wieder verworfen. Ein MVP ist dagegen ein echtes, nutzbares Produkt, das von Anfang an im Markt eingesetzt und schrittweise erweitert wird.",
      },
      {
        question: "Woran erkennt man, welche Funktionen ins MVP gehören?",
        answer:
          "Maßgeblich ist die zentrale Annahme, die überprüft werden soll: Welche Funktionen sind nötig, damit Nutzer den Kernnutzen erleben können? Alles, was diesen Kernablauf nicht stützt, wird bewusst auf spätere Iterationen verschoben.",
      },
      {
        question: "Was passiert mit einem MVP nach dem Markttest?",
        answer:
          "Auf Basis der gewonnenen Erkenntnisse wird das Produkt gezielt weiterentwickelt – Funktionen, die sich bewähren, werden ausgebaut, weniger relevante verworfen. So wächst das MVP entlang des SDLC iterativ zu einer vollwertigen Lösung.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was ist ein MVP? Minimum Viable Product erklärt | smiit Glossar",
    metaDescription:
      "MVP einfach erklärt: Definition, Zweck, Abgrenzung zum unfertigen Produkt und Bezug zum SDLC – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "mvp",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "MVP (minimum viable product)",
    title: "What is an MVP (minimum viable product)?",
    shortDefinition:
      "A minimum viable product (MVP) is the first, deliberately lean version of a product that contains only the most important functions. It serves to test an idea on the market with minimal effort and to develop it further based on real feedback.",
    synonyms: ["minimum viable product", "first product version", "MVP approach"],
    sections: [
      {
        heading: "Where an MVP is used",
        paragraphs: [
          "An MVP reduces a product to the core needed to prove its central value. Instead of investing months in a full feature set, teams go live early with a working version and learn from real usage which functions are actually needed.",
          "This approach lowers the risk of misguided investment because assumptions are validated early. In mid-sized companies it is especially suitable for quickly testing new digital offerings without committing a large budget from the start – often as the first run in the SDLC.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A company wants to offer a platform for digital claims reporting. Instead of building every conceivable function right away, the MVP starts with the core flow: report a claim, track its status, receive a confirmation. After going live, usage data and feedback show which extensions – such as reporting or partner connectivity – make sense next.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "An MVP should not be confused with an unfinished or faulty product: it is deliberately small, yet stable and usable. It forms the starting point for further development along the SDLC and often grows later into a full-fledged digital platform. smiit chose exactly this path for Claimity AG and brought a working SaaS platform into production on Microsoft Azure in just six weeks – with a multi-tenant architecture, Azure App Service, Azure Database for PostgreSQL and REST APIs, GDPR-compliant and designed to be extensible from the start.",
        ],
      },
    ],
    faq: [
      {
        question: "Is an MVP simply an unfinished version?",
        answer:
          "No. An MVP is deliberately reduced to the most important functions, yet stable and ready for real users. The goal is not a half-finished product but a usable core for learning.",
      },
      {
        question: "How quickly can an MVP be delivered?",
        answer:
          "That depends on scope, but precisely the focus on the core makes short timeframes possible. For Claimity AG, for example, smiit delivered a production SaaS platform on Azure in six weeks.",
      },
      {
        question: "What is the difference between an MVP and a prototype?",
        answer:
          "A prototype usually only serves to illustrate an idea and is often discarded afterwards. An MVP, by contrast, is a real, usable product that is put on the market from the start and extended step by step.",
      },
      {
        question: "How do you decide which functions belong in the MVP?",
        answer:
          "The decisive factor is the central assumption to be validated: which functions are needed for users to experience the core value? Anything that does not support this core flow is deliberately deferred to later iterations.",
      },
      {
        question: "What happens to an MVP after the market test?",
        answer:
          "Based on the insights gained, the product is developed further in a targeted way — functions that prove their worth are expanded, less relevant ones are dropped. This way the MVP grows iteratively into a full-fledged solution along the SDLC.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What is an MVP? Minimum viable product explained | smiit glossary",
    metaDescription:
      "MVP explained simply: definition, purpose, difference from an unfinished product and relation to the SDLC – with hands-on Azure context from smiit.",
  },
}

export default mvp

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Ein MVP wird oft als unfertiges oder minderwertiges Produkt missverstanden, dabei soll es eine funktionsfähige Version mit echtem Nutzerwert sein, die gezielt eine Annahme überprüft.",
      "Viele setzen das MVP mit der ersten Release-Version gleich, obwohl sein eigentlicher Zweck darin besteht, mit minimalem Aufwand maximales Lernen über den Markt zu erzielen.",
      "Es wird häufig angenommen, ein MVP enthalte möglichst viele Funktionen in reduzierter Qualität, dabei geht es vielmehr um wenige Funktionen, die den Kernnutzen sauber abbilden.",
    ],
    sources: [
      { title: "The Lean Startup (Eric Ries)", url: "https://theleanstartup.com/" },
      { title: "Agile Alliance – Minimum Viable Product (MVP)", url: "https://www.agilealliance.org/glossary/mvp/" },
    ],
  },
  en: {
    misconceptions: [
      "An MVP is often misunderstood as an unfinished or low-quality product, when it should be a working version with real user value that deliberately tests an assumption.",
      "Many equate the MVP with the first release version, although its actual purpose is to achieve maximum learning about the market with minimal effort.",
      "It is frequently assumed that an MVP packs in as many features as possible at reduced quality, whereas it is really about a few features that cleanly deliver the core value.",
    ],
    sources: [
      { title: "The Lean Startup (Eric Ries)", url: "https://theleanstartup.com/" },
      { title: "Agile Alliance – Minimum Viable Product (MVP)", url: "https://www.agilealliance.org/glossary/mvp/" },
    ],
  },
}
