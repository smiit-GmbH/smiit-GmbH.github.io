import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const iac: LocalizedGlossaryTerm = {
  de: {
    slug: "iac",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IaC (Infrastructure as Code)",
    title: "Was ist IaC (Infrastructure as Code)?",
    shortDefinition:
      "Infrastructure as Code (IaC) bedeutet, IT-Infrastruktur wie Server, Netzwerke und Dienste nicht manuell zu klicken, sondern in Code zu beschreiben und automatisiert bereitzustellen. Die Infrastruktur wird damit versionierbar, reproduzierbar und prüfbar – wie Anwendungscode.",
    synonyms: ["Infrastructure as Code", "deklarative Infrastruktur", "Bicep", "Terraform", "ARM-Templates"],
    sections: [
      {
        heading: "Einordnung: Wofür wird IaC genutzt?",
        paragraphs: [
          "Statt Ressourcen in der Cloud per Konsole von Hand anzulegen, beschreibt IaC den gewünschten Zielzustand in Dateien – häufig deklarativ. Werkzeuge wie Bicep, ARM-Templates oder Terraform lesen diese Beschreibung und erstellen oder aktualisieren die Infrastruktur entsprechend. Das Ergebnis ist immer gleich, unabhängig davon, wer es ausführt.",
          "Dadurch lassen sich Umgebungen wie Test und Produktion identisch aufbauen, Änderungen über Versionskontrolle nachvollziehen und im Fehlerfall reproduzierbar wiederherstellen. IaC ist damit eine zentrale Grundlage für zuverlässige, automatisierte Cloud-Betriebsmodelle.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine komplette Azure-Umgebung – inklusive Netzwerk, Diensten und Sicherheitskomponenten – wird vollständig in Code beschrieben. Über eine Pipeline wird diese Beschreibung automatisiert ausgerollt, sodass eine neue Umgebung in kurzer Zeit identisch zur bestehenden aufgebaut werden kann. Manuelle Konfigurationsfehler entfallen, und jede Änderung ist nachvollziehbar dokumentiert.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "IaC beschreibt die Bereitstellung von Infrastruktur, während CI/CD das Bauen und Ausliefern von Software automatisiert; beide sind Bausteine der DevOps-Arbeitsweise und greifen oft ineinander. Für die Claimity AG hat smiit die gesamte DSGVO-konforme Azure-Infrastruktur als Infrastructure as Code mit DevOps-Pipelines umgesetzt – Grundlage dafür, die SaaS-Plattform in nur sechs Wochen reproduzierbar und sicher produktiv zu bringen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen deklarativem und imperativem IaC?",
        answer:
          "Deklaratives IaC beschreibt den gewünschten Zielzustand, und das Werkzeug ermittelt die nötigen Schritte selbst. Imperatives IaC legt die Abfolge der Schritte explizit fest. In der Cloud sind deklarative Ansätze wie Bicep oder Terraform verbreitet.",
      },
      {
        question: "Warum ist IaC für die Cloud so wichtig?",
        answer:
          "Cloud-Umgebungen sind komplex und ändern sich häufig. IaC sorgt dafür, dass Umgebungen reproduzierbar, nachvollziehbar und konsistent bleiben, statt durch manuelle Eingriffe auseinanderzulaufen.",
      },
      {
        question: "Was bedeutet „Configuration Drift“ und wie hilft IaC dagegen?",
        answer:
          "Von Configuration Drift spricht man, wenn der tatsächliche Zustand einer Umgebung durch manuelle Änderungen vom dokumentierten Soll abweicht. Da IaC den Zielzustand in Code festhält und reproduzierbar anwendet, lässt sich Drift erkennen und die Umgebung wieder in den definierten Zustand bringen.",
      },
      {
        question: "Erhöht IaC nicht den anfänglichen Aufwand?",
        answer:
          "Zu Beginn ist der Aufwand höher, weil die Infrastruktur zunächst in Code beschrieben werden muss. Dieser Mehraufwand zahlt sich aus, sobald Umgebungen wiederholt aufgebaut, geändert oder im Fehlerfall wiederhergestellt werden – dann sind manuelle Schritte fehleranfälliger und langsamer.",
      },
      {
        question: "Sollte man Geheimnisse wie Passwörter in IaC-Dateien speichern?",
        answer:
          "Nein. Geheimnisse gehören nicht im Klartext in versionierte IaC-Dateien, da diese sonst sensible Daten preisgeben. Stattdessen werden sie über sichere Tresore oder Geheimnis-Verwaltungen referenziert und erst zur Laufzeit aufgelöst.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IaC (Infrastructure as Code): Definition & Nutzen | smiit Glossar",
    metaDescription:
      "Infrastructure as Code (IaC) erklärt: reproduzierbare, versionierbare Cloud-Infrastruktur per Code – mit Azure-Praxisbeispiel von smiit (SaaS in 6 Wochen).",
  },
  en: {
    slug: "iac",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IaC (infrastructure as code)",
    title: "What is IaC (infrastructure as code)?",
    shortDefinition:
      "Infrastructure as code (IaC) means describing IT infrastructure such as servers, networks and services in code and provisioning it automatically, rather than clicking it together manually. Infrastructure thereby becomes versionable, reproducible and reviewable — just like application code.",
    synonyms: ["infrastructure as code", "declarative infrastructure", "Bicep", "Terraform", "ARM templates"],
    sections: [
      {
        heading: "Where IaC is used",
        paragraphs: [
          "Instead of creating cloud resources by hand through a console, IaC describes the desired target state in files — often declaratively. Tools such as Bicep, ARM templates or Terraform read this description and create or update the infrastructure accordingly. The result is always the same, regardless of who runs it.",
          "This makes it possible to build environments such as test and production identically, trace changes through version control and restore reproducibly in case of failure. IaC is therefore a central foundation for reliable, automated cloud operating models.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A complete Azure environment — including network, services and security components — is described entirely in code. Through a pipeline, this description is rolled out automatically, so a new environment can be built identically to the existing one in a short time. Manual configuration errors are eliminated and every change is documented traceably.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "IaC describes the provisioning of infrastructure, while CI/CD automates the building and shipping of software; both are building blocks of the DevOps way of working and often interlock. For Claimity AG, smiit implemented the entire GDPR-compliant Azure infrastructure as infrastructure as code with DevOps pipelines — the basis for taking the SaaS platform live reproducibly and securely in just six weeks.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between declarative and imperative IaC?",
        answer:
          "Declarative IaC describes the desired target state, and the tool works out the necessary steps itself. Imperative IaC explicitly defines the sequence of steps. In the cloud, declarative approaches such as Bicep or Terraform are common.",
      },
      {
        question: "Why is IaC so important for the cloud?",
        answer:
          "Cloud environments are complex and change frequently. IaC ensures that environments stay reproducible, traceable and consistent instead of drifting apart through manual intervention.",
      },
      {
        question: "What is \"configuration drift\" and how does IaC help against it?",
        answer:
          "Configuration drift occurs when the actual state of an environment deviates from the documented target due to manual changes. Since IaC captures the target state in code and applies it reproducibly, drift can be detected and the environment brought back to the defined state.",
      },
      {
        question: "Doesn't IaC increase the initial effort?",
        answer:
          "At the start the effort is higher, because the infrastructure first has to be described in code. This extra effort pays off as soon as environments are built, changed or restored repeatedly — manual steps are then more error-prone and slower.",
      },
      {
        question: "Should secrets such as passwords be stored in IaC files?",
        answer:
          "No. Secrets do not belong in plain text in versioned IaC files, as these would otherwise expose sensitive data. Instead they are referenced through secure vaults or secret management and only resolved at runtime.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IaC (infrastructure as code): definition | smiit glossary",
    metaDescription:
      "Infrastructure as code (IaC) explained: reproducible, versionable cloud infrastructure via code — with an Azure example from smiit (SaaS in 6 weeks).",
  },
}

export default iac

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Infrastructure as Code wird oft auf Skripte reduziert; entscheidend ist aber der deklarative, versionierte und reproduzierbare Ansatz statt manueller, einmaliger Befehle.",
      "Viele glauben, einmal geschriebener IaC-Code bleibe dauerhaft korrekt; durch manuelle Änderungen an der Infrastruktur entsteht jedoch schnell ein Configuration Drift zwischen Code und Realität.",
      "Es wird unterschätzt, dass IaC-Definitionen wie Anwendungscode behandelt werden müssen — mit Reviews, Tests und einer sicheren Verwaltung von Secrets.",
    ],
    sources: [
      { title: "Martin Fowler – Infrastructure as Code", url: "https://martinfowler.com/bliki/InfrastructureAsCode.html" },
      { title: "Microsoft Learn – Was ist Infrastructure as Code?", url: "https://learn.microsoft.com/devops/deliver/what-is-infrastructure-as-code" },
    ],
  },
  en: {
    misconceptions: [
      "Infrastructure as Code is often reduced to scripts; what matters is the declarative, versioned and reproducible approach rather than manual one-off commands.",
      "Many believe IaC code written once stays correct forever; manual changes to the infrastructure quickly cause configuration drift between code and reality.",
      "People underestimate that IaC definitions must be treated like application code — with reviews, tests and secure handling of secrets.",
    ],
    sources: [
      { title: "Martin Fowler – Infrastructure as Code", url: "https://martinfowler.com/bliki/InfrastructureAsCode.html" },
      { title: "Microsoft Learn – What is Infrastructure as Code?", url: "https://learn.microsoft.com/devops/deliver/what-is-infrastructure-as-code" },
    ],
  },
}
