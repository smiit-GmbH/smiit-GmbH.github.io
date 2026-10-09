import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const sdlc: LocalizedGlossaryTerm = {
  de: {
    slug: "sdlc",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "SDLC (Software Development Life Cycle)",
    title: "Was ist der SDLC (Software Development Life Cycle)?",
    shortDefinition:
      "Der Software Development Life Cycle (SDLC) beschreibt den strukturierten Ablauf der Softwareentwicklung von der Idee bis zum Betrieb. Er gliedert das Vorgehen in Phasen wie Analyse, Design, Entwicklung, Test, Auslieferung und Wartung und schafft so Planbarkeit und Qualität.",
    synonyms: ["Softwareentwicklungszyklus", "Entwicklungslebenszyklus", "SDLC-Prozess"],
    sections: [
      {
        heading: "Einordnung: Wofür wird der SDLC genutzt?",
        paragraphs: [
          "Der SDLC gibt Softwareprojekten einen verlässlichen Rahmen, indem er die Arbeit in nachvollziehbare Phasen unterteilt. Jede Phase hat klare Ziele und Ergebnisse, von der Anforderungsanalyse über Design und Implementierung bis zu Test, Auslieferung und laufendem Betrieb. So werden Risiken früh erkannt und Qualität systematisch gesichert.",
          "Ob klassisch sequenziell oder iterativ-agil – der SDLC strukturiert die Zusammenarbeit zwischen Fachbereich und Entwicklung. Im Mittelstand sorgt er dafür, dass auch knappe Budgets und kurze Zeitfenster effizient genutzt werden und Software wartbar bleibt.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Für eine neue Anwendung werden zunächst Anforderungen mit den Fachbereichen geklärt und priorisiert. Es folgt ein Architektur- und Datenmodell-Design, anschließend wird in kurzen Zyklen entwickelt und getestet. Nach automatisierten Tests geht eine erste Version live, danach wird die Software auf Basis von Rückmeldungen iterativ erweitert und gepflegt – ein vollständiger Durchlauf des Lebenszyklus.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Ein klar definierter SDLC reduziert Risiken, macht Aufwände planbar und sorgt für gleichbleibende Qualität – besonders wenn mehrere Beteiligte zusammenarbeiten.",
        ],
        bullets: [
          "Planbare Phasen mit klaren Ergebnissen und Verantwortlichkeiten",
          "Frühe Fehlererkennung durch systematische Tests und Reviews",
          "Bessere Wartbarkeit durch dokumentierte Entscheidungen und sauberes Design",
          "Schnellere Auslieferung über automatisierte Build- und Test-Pipelines",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Der SDLC beschreibt den gesamten Lebenszyklus, während konkrete Vorgehensmodelle wie agile Methoden oder DevOps festlegen, wie einzelne Phasen umgesetzt werden. Ein MVP ist dabei ein typisches Ergebnis früher SDLC-Durchläufe, und die fertige Software läuft anschließend auf Cloud-Infrastruktur, oft als Teil einer digitalen Plattform.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "Bei der SaaS-Plattform für die Claimity AG hat smiit einen straffen SDLC genutzt, um in nur sechs Wochen produktiv zu gehen. Anforderungen wurden früh geklärt, die Multi-Tenant-Architektur sauber entworfen und in kurzen Zyklen auf Microsoft Azure umgesetzt – mit Azure App Service, Azure Database for PostgreSQL und REST-APIs. Tests, sichere Geheimnisverwaltung über Azure Key Vault und ein DSGVO-konformer Betrieb waren von Anfang an Teil des Lebenszyklus.",
        ],
      },
    ],
    faq: [
      {
        question: "Welche Phasen gehören zum SDLC?",
        answer:
          "Typisch sind Anforderungsanalyse, Design, Entwicklung, Test, Auslieferung und Wartung. Je nach Vorgehensmodell werden diese Phasen einmal sequenziell oder wiederholt in kurzen Iterationen durchlaufen.",
      },
      {
        question: "Ist der SDLC dasselbe wie agile Entwicklung?",
        answer:
          "Nein. Der SDLC beschreibt den Lebenszyklus an sich, agile Methoden sind ein Weg, diesen Zyklus iterativ und flexibel umzusetzen. Auch klassische, sequenzielle Vorgehen folgen einem SDLC.",
      },
      {
        question: "Lohnt sich ein strukturierter SDLC auch bei kleinen Projekten?",
        answer:
          "Ja. Schon ein leichtgewichtiger SDLC mit klaren Phasen und automatisierten Tests senkt Fehlerquoten und Wartungsaufwand spürbar, ohne kleine Teams mit unnötiger Bürokratie zu belasten.",
      },
      {
        question: "Wie hängen SDLC und DevOps zusammen?",
        answer:
          "Der SDLC beschreibt die Phasen von der Idee bis zur Wartung, DevOps verbindet Entwicklung und Betrieb und automatisiert Übergänge etwa über Build-, Test- und Deployment-Pipelines. DevOps ist damit kein Ersatz für den SDLC, sondern eine Art, ihn schneller und durchgängiger umzusetzen.",
      },
      {
        question: "Welche Rolle spielt Sicherheit im SDLC?",
        answer:
          "Sicherheit sollte nicht erst am Ende geprüft, sondern über alle Phasen hinweg mitgedacht werden – von der Anforderungsanalyse über sicheres Design bis zu automatisierten Sicherheitstests. Dieser Ansatz wird oft als Security by Design oder DevSecOps bezeichnet.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "SDLC: Software Development Life Cycle erklärt | smiit Glossar",
    metaDescription:
      "SDLC einfach erklärt: Definition, Phasen, Abgrenzung zu Agile und DevOps sowie Vorteile – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "sdlc",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "SDLC (software development life cycle)",
    title: "What is the SDLC (software development life cycle)?",
    shortDefinition:
      "The software development life cycle (SDLC) describes the structured course of software development from idea to operation. It divides the work into phases such as analysis, design, development, testing, delivery and maintenance, creating predictability and quality.",
    synonyms: ["software development cycle", "development life cycle", "SDLC process"],
    sections: [
      {
        heading: "Where the SDLC is used",
        paragraphs: [
          "The SDLC gives software projects a reliable framework by dividing the work into traceable phases. Each phase has clear goals and deliverables, from requirements analysis through design and implementation to testing, delivery and ongoing operation. This way, risks are identified early and quality is systematically assured.",
          "Whether classically sequential or iterative and agile, the SDLC structures the collaboration between business departments and development. In mid-sized companies it ensures that even tight budgets and short time windows are used efficiently and that software remains maintainable.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a new application, requirements are first clarified and prioritized with the business departments. This is followed by architecture and data-model design, after which development and testing proceed in short cycles. After automated tests, a first version goes live, and the software is then iteratively extended and maintained based on feedback – a full run through the life cycle.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "A clearly defined SDLC reduces risks, makes effort predictable and ensures consistent quality – especially when several parties collaborate.",
        ],
        bullets: [
          "Predictable phases with clear deliverables and responsibilities",
          "Early defect detection through systematic tests and reviews",
          "Better maintainability through documented decisions and clean design",
          "Faster delivery via automated build and test pipelines",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "The SDLC describes the entire life cycle, while concrete approaches such as agile methods or DevOps define how individual phases are implemented. An MVP is a typical outcome of early SDLC runs, and the finished software then runs on cloud infrastructure, often as part of a digital platform.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "For the SaaS platform for Claimity AG, smiit used a streamlined SDLC to go into production in just six weeks. Requirements were clarified early, the multi-tenant architecture was cleanly designed and implemented in short cycles on Microsoft Azure – with Azure App Service, Azure Database for PostgreSQL and REST APIs. Testing, secure secret management via Azure Key Vault and GDPR-compliant operations were part of the life cycle from the start.",
        ],
      },
    ],
    faq: [
      {
        question: "Which phases belong to the SDLC?",
        answer:
          "Typical ones are requirements analysis, design, development, testing, delivery and maintenance. Depending on the approach, these phases are run through once sequentially or repeatedly in short iterations.",
      },
      {
        question: "Is the SDLC the same as agile development?",
        answer:
          "No. The SDLC describes the life cycle itself, while agile methods are one way to implement that cycle iteratively and flexibly. Classic, sequential approaches also follow an SDLC.",
      },
      {
        question: "Is a structured SDLC worthwhile for small projects too?",
        answer:
          "Yes. Even a lightweight SDLC with clear phases and automated tests noticeably reduces defect rates and maintenance effort without burdening small teams with unnecessary bureaucracy.",
      },
      {
        question: "How are the SDLC and DevOps related?",
        answer:
          "The SDLC describes the phases from idea to maintenance, while DevOps connects development and operations and automates transitions through build, test and deployment pipelines, for example. DevOps is therefore not a replacement for the SDLC but a way to implement it faster and more seamlessly.",
      },
      {
        question: "What role does security play in the SDLC?",
        answer:
          "Security should not only be checked at the end but considered across all phases – from requirements analysis through secure design to automated security tests. This approach is often called security by design or DevSecOps.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "SDLC: software development life cycle | smiit glossary",
    metaDescription:
      "SDLC explained simply: definition, phases, difference from Agile and DevOps, and benefits – with hands-on Azure context from smiit.",
  },
}

export default sdlc

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Der SDLC wird oft mit dem starren Wasserfallmodell gleichgesetzt, obwohl er ein allgemeines Rahmenkonzept ist, das sich auch agil oder iterativ umsetzen lässt.",
      "Viele glauben, der Lebenszyklus ende mit der Auslieferung der Software, dabei gehören Betrieb, Wartung und schließlich die Außerbetriebnahme ausdrücklich dazu.",
      "Es wird häufig angenommen, dass Tests eine eigene Phase ganz am Ende sind, während Qualitätssicherung in modernen Ansätzen über den gesamten Zyklus hinweg stattfindet.",
    ],
    sources: [
      {
        title: "NIST – Secure Software Development Framework (SSDF, SP 800-218)",
        url: "https://csrc.nist.gov/projects/ssdf",
      },
      { title: "OWASP SAMM – Software Assurance Maturity Model", url: "https://owaspsamm.org/" },
    ],
  },
  en: {
    misconceptions: [
      "The SDLC is often equated with the rigid waterfall model, although it is a general framework that can also be implemented in an agile or iterative way.",
      "Many believe the life cycle ends when the software is delivered, when operation, maintenance and eventual decommissioning are explicitly part of it.",
      "It is frequently assumed that testing is a single phase at the very end, whereas in modern approaches quality assurance happens throughout the whole cycle.",
    ],
    sources: [
      {
        title: "NIST – Secure Software Development Framework (SSDF, SP 800-218)",
        url: "https://csrc.nist.gov/projects/ssdf",
      },
      { title: "OWASP SAMM – Software Assurance Maturity Model", url: "https://owaspsamm.org/" },
    ],
  },
}
