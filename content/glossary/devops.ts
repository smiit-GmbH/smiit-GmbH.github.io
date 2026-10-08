import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const devops: LocalizedGlossaryTerm = {
  de: {
    slug: "devops",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "DevOps",
    title: "Was ist DevOps?",
    shortDefinition:
      "DevOps ist eine Arbeitsweise, die Softwareentwicklung (Dev) und IT-Betrieb (Ops) eng verzahnt, um Software häufiger, schneller und zuverlässiger auszuliefern. Im Kern stehen Automatisierung, kurze Feedback-Schleifen und eine gemeinsame Verantwortung für das laufende System – von der ersten Codezeile bis zum Betrieb in der Cloud.",
    synonyms: ["DevSecOps", "Continuous Delivery", "Dev und Ops", "Azure DevOps"],
    sections: [
      {
        heading: "Einordnung: Wofür wird DevOps genutzt?",
        paragraphs: [
          "DevOps adressiert ein klassisches Problem: Entwicklung will schnell neue Funktionen liefern, der Betrieb will Stabilität – und zwischen beiden entstehen Reibung und manuelle Übergaben. DevOps löst das auf, indem Build, Test, Auslieferung und Betrieb so weit wie möglich automatisiert und in eine durchgängige Pipeline gegossen werden.",
          "Technisch ist DevOps kein einzelnes Werkzeug, sondern ein Zusammenspiel aus Praktiken: CI/CD für automatisiertes Bauen und Ausliefern, Infrastructure as Code für reproduzierbare Umgebungen, Monitoring für schnelles Feedback und eine Kultur gemeinsamer Verantwortung. In der Microsoft-Welt bildet Azure DevOps (oder GitHub Actions) das Rückgrat dieser Abläufe.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine neue SaaS-Plattform soll innerhalb weniger Wochen produktiv gehen. Statt Server manuell aufzusetzen und Releases von Hand einzuspielen, wird die gesamte Azure-Umgebung als Infrastructure as Code definiert und über DevOps-Pipelines automatisiert ausgerollt. Jede Code-Änderung durchläuft automatisierte Tests und wird kontrolliert in Test- und Produktivumgebungen ausgeliefert – nachvollziehbar, wiederholbar und ohne manuelle Fehlerquellen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "DevOps lohnt sich überall dort, wo Software regelmäßig weiterentwickelt und zuverlässig betrieben werden muss – besonders bei Cloud- und SaaS-Lösungen.",
        ],
        bullets: [
          "Schnellere und planbarere Releases durch automatisierte Pipelines",
          "Weniger Fehler durch reproduzierbare Umgebungen statt manueller Konfiguration",
          "Schnelle Rückmeldung über Monitoring und automatisierte Tests",
          "Klare Nachvollziehbarkeit, wer wann was ausgeliefert hat",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "DevOps ist der übergeordnete Ansatz; CI/CD und Infrastructure as Code (IaC) sind konkrete Bausteine darin. „Azure DevOps“ wiederum ist ein Produktname für eine Werkzeugplattform und nicht mit dem Konzept DevOps gleichzusetzen. Wird Sicherheit von Anfang an in die Pipeline integriert, spricht man von DevSecOps.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit setzt DevOps-Praktiken konsequent in Cloud-Projekten ein. Für die Claimity AG wurde eine SaaS-Plattform in nur sechs Wochen produktiv auf Azure gebracht – möglich durch eine vollständig als Infrastructure as Code beschriebene Infrastruktur und automatisierte DevOps-Pipelines. So bleiben Umgebungen reproduzierbar, Releases nachvollziehbar und der Betrieb von Beginn an stabil.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist DevOps nur etwas für große Tech-Unternehmen?",
        answer:
          "Nein. Gerade im Mittelstand sorgen DevOps-Praktiken dafür, dass kleine Teams Software zuverlässig ausliefern, ohne in manuelle Routinen und Fehler zu verfallen. Der Einstieg kann schrittweise erfolgen, etwa mit einer ersten CI/CD-Pipeline.",
      },
      {
        question: "Brauchen wir dafür ein eigenes DevOps-Team?",
        answer:
          "Nicht zwingend. DevOps ist primär eine Arbeitsweise, kein Stellenplan. Oft genügt es, bestehende Entwicklungs- und Betriebsaufgaben besser zu verzahnen und die richtigen Automatisierungen aufzusetzen.",
      },
      {
        question: "Wie hängt DevOps mit Sicherheit zusammen?",
        answer:
          "Eng. Wird Sicherheit früh in die Pipeline integriert – etwa durch automatisierte Prüfungen und sauber verwaltete Geheimnisse – spricht man von DevSecOps. Das verhindert, dass Sicherheit erst am Ende aufgesetzt wird.",
      },
      {
        question: "Worin unterscheiden sich DevOps und Agile?",
        answer:
          "Agile beschreibt vor allem, wie Anforderungen und Entwicklung organisiert werden – in kurzen, iterativen Zyklen. DevOps setzt eine Ebene tiefer an und sorgt dafür, dass die so entstandene Software auch automatisiert ausgeliefert und stabil betrieben wird. Beide ergänzen sich, lösen aber unterschiedliche Probleme.",
      },
      {
        question: "Wie fängt man mit der Einführung von DevOps an?",
        answer:
          "Meist mit dem größten manuellen Schmerzpunkt: häufig dem Bauen und Ausliefern von Software über eine erste CI/CD-Pipeline. Von dort lassen sich weitere Praktiken wie Infrastructure as Code und Monitoring schrittweise ergänzen, statt alles auf einmal umzustellen.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "DevOps: Definition, Praktiken & Nutzen | smiit Glossar",
    metaDescription:
      "DevOps erklärt: Wie Entwicklung und Betrieb durch CI/CD, IaC und Automatisierung zusammenwachsen – mit Praxisbeispiel von smiit (SaaS in 6 Wochen auf Azure).",
  },
  en: {
    slug: "devops",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "DevOps",
    title: "What is DevOps?",
    shortDefinition:
      "DevOps is a way of working that tightly integrates software development (Dev) and IT operations (Ops) to ship software more often, faster and more reliably. At its core are automation, short feedback loops and shared ownership of the running system — from the first line of code to operation in the cloud.",
    synonyms: ["DevSecOps", "continuous delivery", "dev and ops", "Azure DevOps"],
    sections: [
      {
        heading: "Where DevOps is used",
        paragraphs: [
          "DevOps addresses a classic problem: development wants to ship new features quickly, operations wants stability — and friction and manual handovers arise between the two. DevOps resolves this by automating build, test, delivery and operation as far as possible and casting them into a continuous pipeline.",
          "Technically, DevOps is not a single tool but an interplay of practices: CI/CD for automated building and shipping, infrastructure as code for reproducible environments, monitoring for fast feedback and a culture of shared ownership. In the Microsoft world, Azure DevOps (or GitHub Actions) forms the backbone of these workflows.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A new SaaS platform is meant to go live within a few weeks. Instead of setting up servers manually and deploying releases by hand, the entire Azure environment is defined as infrastructure as code and rolled out automatically through DevOps pipelines. Every code change runs through automated tests and is delivered in a controlled way to test and production environments — traceable, repeatable and free of manual error sources.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "DevOps pays off wherever software has to be developed continuously and operated reliably — especially for cloud and SaaS solutions.",
        ],
        bullets: [
          "Faster, more predictable releases through automated pipelines",
          "Fewer errors thanks to reproducible environments instead of manual configuration",
          "Fast feedback via monitoring and automated tests",
          "Clear traceability of who shipped what and when",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "DevOps is the overarching approach; CI/CD and infrastructure as code (IaC) are concrete building blocks within it. „Azure DevOps“, in turn, is a product name for a tooling platform and should not be equated with the DevOps concept. When security is integrated into the pipeline from the start, the term is DevSecOps.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit applies DevOps practices consistently in cloud projects. For Claimity AG, a SaaS platform was taken live on Azure in just six weeks — made possible by infrastructure fully described as infrastructure as code and automated DevOps pipelines. This keeps environments reproducible, releases traceable and operation stable from day one.",
        ],
      },
    ],
    faq: [
      {
        question: "Is DevOps only for large tech companies?",
        answer:
          "No. In SMEs in particular, DevOps practices help small teams ship software reliably without falling back into manual routines and errors. Adoption can be gradual, for example starting with a first CI/CD pipeline.",
      },
      {
        question: "Do we need a dedicated DevOps team for it?",
        answer:
          "Not necessarily. DevOps is primarily a way of working, not a staffing plan. Often it is enough to integrate existing development and operations tasks more closely and set up the right automation.",
      },
      {
        question: "How does DevOps relate to security?",
        answer:
          "Closely. When security is integrated into the pipeline early — for instance through automated checks and properly managed secrets — the term is DevSecOps. This prevents security from being bolted on only at the end.",
      },
      {
        question: "How do DevOps and Agile differ?",
        answer:
          "Agile mainly describes how requirements and development are organized — in short, iterative cycles. DevOps operates one level deeper and ensures that the resulting software is also delivered automatically and operated reliably. The two complement each other but solve different problems.",
      },
      {
        question: "How do you start adopting DevOps?",
        answer:
          "Usually with the biggest manual pain point, often building and shipping software via a first CI/CD pipeline. From there, further practices such as infrastructure as code and monitoring can be added step by step instead of changing everything at once.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "DevOps: definition, practices & benefits | smiit glossary",
    metaDescription:
      "DevOps explained: how development and operations merge through CI/CD, IaC and automation — with a smiit example (SaaS live on Azure in 6 weeks).",
  },
}

export default devops

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "DevOps wird häufig als reine Toolkette (Pipelines, Container) missverstanden — tatsächlich ist es vor allem eine Kultur- und Organisationsfrage, die Entwicklung und Betrieb enger zusammenbringt.",
      "Viele denken, DevOps bedeute, ein eigenes DevOps-Team zu gründen; das schafft jedoch oft ein neues Silo statt die Zusammenarbeit zwischen den bestehenden Teams zu verbessern.",
      "Es wird angenommen, DevOps gehe nur um Geschwindigkeit; ohne Automatisierung von Tests und Qualitätssicherung führt schnelleres Deployment aber lediglich zu schnelleren Fehlern.",
    ],
    sources: [
      { title: "DORA – DevOps Research and Assessment", url: "https://dora.dev/" },
      { title: "Microsoft Learn – DevOps-Ressourcen", url: "https://learn.microsoft.com/devops/" },
    ],
  },
  en: {
    misconceptions: [
      "DevOps is often misunderstood as just a tool chain (pipelines, containers) — in reality it is primarily a cultural and organizational practice that brings development and operations closer together.",
      "Many believe DevOps means creating a dedicated DevOps team; this often creates a new silo instead of improving collaboration between existing teams.",
      "People assume DevOps is only about speed; without automated testing and quality assurance, faster deployments simply produce faster failures.",
    ],
    sources: [
      { title: "DORA – DevOps Research and Assessment", url: "https://dora.dev/" },
      { title: "Microsoft Learn – DevOps resource center", url: "https://learn.microsoft.com/devops/" },
    ],
  },
}
