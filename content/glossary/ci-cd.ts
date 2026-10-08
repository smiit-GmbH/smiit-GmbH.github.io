import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const ciCd: LocalizedGlossaryTerm = {
  de: {
    slug: "ci-cd",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "CI/CD",
    title: "Was ist CI/CD?",
    shortDefinition:
      "CI/CD steht für Continuous Integration und Continuous Delivery/Deployment – das automatisierte Bauen, Testen und Ausliefern von Software. Code-Änderungen werden fortlaufend zusammengeführt, automatisch geprüft und über eine Pipeline kontrolliert in Test- und Produktivumgebungen gebracht.",
    synonyms: ["Continuous Integration", "Continuous Delivery", "Continuous Deployment", "Build-Pipeline"],
    sections: [
      {
        heading: "Einordnung: Wofür wird CI/CD genutzt?",
        paragraphs: [
          "Continuous Integration (CI) bedeutet, dass Entwickler ihre Änderungen häufig in einen gemeinsamen Stand zusammenführen, wobei automatisierte Builds und Tests sofort prüfen, ob alles zusammenpasst. Continuous Delivery (CD) sorgt dafür, dass jede geprüfte Version jederzeit ausgeliefert werden könnte; bei Continuous Deployment geschieht die Auslieferung sogar vollautomatisch.",
          "Technisch wird das über eine Pipeline abgebildet – eine definierte Abfolge aus Schritten wie Build, Test, Sicherheitsprüfung und Deployment. In der Microsoft-Welt kommen dafür Azure DevOps Pipelines oder GitHub Actions zum Einsatz.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Für eine SaaS-Plattform wird jede Code-Änderung automatisch gebaut und getestet. Besteht sie alle Prüfungen, wird sie über die Pipeline zunächst in eine Testumgebung und nach Freigabe kontrolliert in die Produktivumgebung ausgeliefert. So sind Releases nachvollziehbar, wiederholbar und ohne manuelle Fehlerquellen – auch bei kurzer Time-to-Market.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "CI/CD ist ein konkreter Baustein der übergeordneten DevOps-Arbeitsweise und wird häufig mit Infrastructure as Code kombiniert, damit nicht nur der Code, sondern auch die Umgebung reproduzierbar ausgerollt wird. Für die Claimity AG hat smiit DevOps-Pipelines aufgebaut, die das automatisierte Ausliefern ermöglichten und maßgeblich dazu beitrugen, die Plattform in nur sechs Wochen produktiv auf Azure zu bringen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Continuous Delivery und Continuous Deployment?",
        answer:
          "Bei Continuous Delivery ist jede geprüfte Version jederzeit auslieferbar, der finale Schritt in die Produktion erfolgt aber auf Freigabe. Bei Continuous Deployment wird auch dieser Schritt vollständig automatisiert.",
      },
      {
        question: "Lohnt sich CI/CD auch für kleine Teams?",
        answer:
          "Ja. Schon eine einfache Pipeline für automatisiertes Bauen und Testen reduziert Fehler und manuellen Aufwand erheblich. CI/CD lässt sich schrittweise einführen und mitwachsen.",
      },
      {
        question: "Was gehört typischerweise in eine CI/CD-Pipeline?",
        answer:
          "Eine Pipeline besteht aus aufeinanderfolgenden Schritten, üblicherweise Build, automatisierte Tests, Sicherheitsprüfungen und Deployment in die jeweilige Umgebung. Der genaue Zuschnitt hängt vom Projekt ab, doch das Prinzip bleibt gleich: jeder Schritt ist automatisiert und nachvollziehbar.",
      },
      {
        question: "Was passiert, wenn ein Build oder Test in der Pipeline fehlschlägt?",
        answer:
          "Schlägt ein Schritt fehl, stoppt die Pipeline und die Änderung wird nicht weiter ausgeliefert. So gelangen fehlerhafte Stände gar nicht erst in Test- oder Produktivumgebungen, und das Team erhält frühzeitig eine klare Rückmeldung zur Ursache.",
      },
      {
        question: "Wie hängen CI/CD und Infrastructure as Code zusammen?",
        answer:
          "CI/CD automatisiert das Bauen und Ausliefern der Software, Infrastructure as Code beschreibt die zugehörige Umgebung. Werden beide kombiniert, lassen sich Anwendung und Infrastruktur gemeinsam reproduzierbar ausrollen, statt die Umgebung manuell vorzuhalten.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "CI/CD: Definition, Pipeline & Nutzen | smiit Glossar",
    metaDescription:
      "CI/CD erklärt: Continuous Integration und Delivery/Deployment, Pipelines und Nutzen – mit Praxisbeispiel von smiit (SaaS in 6 Wochen auf Azure).",
  },
  en: {
    slug: "ci-cd",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "CI/CD",
    title: "What is CI/CD?",
    shortDefinition:
      "CI/CD stands for continuous integration and continuous delivery/deployment — the automated building, testing and shipping of software. Code changes are continuously merged, checked automatically and brought into test and production environments in a controlled way through a pipeline.",
    synonyms: ["continuous integration", "continuous delivery", "continuous deployment", "build pipeline"],
    sections: [
      {
        heading: "Where CI/CD is used",
        paragraphs: [
          "Continuous integration (CI) means that developers merge their changes into a shared state frequently, with automated builds and tests immediately checking that everything fits together. Continuous delivery (CD) ensures that every checked version could be shipped at any time; with continuous deployment, the release even happens fully automatically.",
          "Technically this is represented through a pipeline — a defined sequence of steps such as build, test, security check and deployment. In the Microsoft world, Azure DevOps Pipelines or GitHub Actions are used for this.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a SaaS platform, every code change is built and tested automatically. If it passes all checks, it is shipped through the pipeline first to a test environment and, after approval, in a controlled way to production. This makes releases traceable, repeatable and free of manual error sources — even with a short time to market.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "CI/CD is a concrete building block of the overarching DevOps way of working and is often combined with infrastructure as code so that not only the code but also the environment is rolled out reproducibly. For Claimity AG, smiit built DevOps pipelines that enabled automated delivery and contributed significantly to taking the platform live on Azure in just six weeks.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between continuous delivery and continuous deployment?",
        answer:
          "With continuous delivery, every checked version can be shipped at any time, but the final step into production happens on approval. With continuous deployment, this step is fully automated too.",
      },
      {
        question: "Is CI/CD worthwhile for small teams too?",
        answer:
          "Yes. Even a simple pipeline for automated building and testing significantly reduces errors and manual effort. CI/CD can be introduced step by step and grow over time.",
      },
      {
        question: "What typically belongs in a CI/CD pipeline?",
        answer:
          "A pipeline consists of consecutive steps, usually build, automated tests, security checks and deployment to the respective environment. The exact shape depends on the project, but the principle stays the same: every step is automated and traceable.",
      },
      {
        question: "What happens when a build or test fails in the pipeline?",
        answer:
          "If a step fails, the pipeline stops and the change is not shipped any further. This prevents faulty states from reaching test or production environments in the first place, and the team gets clear, early feedback on the cause.",
      },
      {
        question: "How do CI/CD and infrastructure as code relate?",
        answer:
          "CI/CD automates building and shipping the software, infrastructure as code describes the associated environment. When both are combined, application and infrastructure can be rolled out reproducibly together instead of maintaining the environment manually.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "CI/CD: definition, pipeline & benefits | smiit glossary",
    metaDescription:
      "CI/CD explained: continuous integration and delivery/deployment, pipelines and benefits — with a smiit example (SaaS live on Azure in 6 weeks).",
  },
}

export default ciCd

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "CI und CD werden oft in einen Topf geworfen; Continuous Integration meint das häufige Zusammenführen und automatisierte Testen von Code, während Continuous Delivery bzw. Deployment die Auslieferung betrifft.",
      "Viele glauben, eine Pipeline allein bedeute schon Continuous Integration; ohne aussagekräftige automatisierte Tests ist es nur ein automatisierter Build ohne echte Qualitätssicherung.",
      "Es wird angenommen, Continuous Deployment passe für jedes Team; ohne ausgereifte Tests, Monitoring und Rollback-Strategien ist automatisches Ausspielen in Produktion riskant.",
    ],
    sources: [
      { title: "Martin Fowler – Continuous Integration", url: "https://martinfowler.com/articles/continuousIntegration.html" },
      { title: "Microsoft Learn – Azure Pipelines", url: "https://learn.microsoft.com/azure/devops/pipelines/" },
    ],
  },
  en: {
    misconceptions: [
      "CI and CD are often lumped together; continuous integration means frequently merging and automatically testing code, while continuous delivery or deployment concerns releasing it.",
      "Many believe having a pipeline already means continuous integration; without meaningful automated tests it is just an automated build with no real quality assurance.",
      "People assume continuous deployment fits every team; without mature tests, monitoring and rollback strategies, automatically shipping to production is risky.",
    ],
    sources: [
      { title: "Martin Fowler – Continuous Integration", url: "https://martinfowler.com/articles/continuousIntegration.html" },
      { title: "Microsoft Learn – Azure Pipelines", url: "https://learn.microsoft.com/azure/devops/pipelines/" },
    ],
  },
}
