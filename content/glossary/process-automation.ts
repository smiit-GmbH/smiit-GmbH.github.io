import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const prozessautomatisierung: LocalizedGlossaryTerm = {
  de: {
    slug: "process-automation",
    cluster: "strategy",
    dateModified: "2026-05-24",
    term: "Prozessoptimierung & -automatisierung",
    title: "Was ist Prozessoptimierung & -automatisierung?",
    shortDefinition:
      "Prozessoptimierung macht Geschäftsabläufe schlanker, klarer und weniger fehleranfällig; Prozessautomatisierung übernimmt wiederkehrende Schritte technisch, sodass sie ohne manuelle Arbeit ablaufen. Zusammen reduzieren sie Aufwand, Medienbrüche und Fehler – und schaffen Zeit für wertschöpfende Tätigkeiten.",
    synonyms: ["Prozessautomatisierung", "Workflow-Automatisierung", "Geschäftsprozessoptimierung", "RPA"],
    sections: [
      {
        heading: "Einordnung: Wofür wird das genutzt?",
        paragraphs: [
          "Am Anfang steht die Optimierung: Prozesse werden sichtbar gemacht, Brüche und Reibungspunkte analysiert und ein verbessertes Soll-Bild entworfen – häufig mit etablierten Notationen wie BPMN. Erst danach folgt die Automatisierung der Schritte, die sich messbar lohnen.",
          "Wichtig ist die Reihenfolge: Wer einen schlechten Prozess automatisiert, macht ihn nur schneller falsch. Optimierung vor Automatisierung sorgt dafür, dass technische Lösungen auf einem sinnvollen Ablauf aufsetzen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Aufträge erreichen ein Unternehmen per E-Mail als PDF und müssen manuell ausgelesen und in ein System übertragen werden. Mit Microsoft Power Automate und dem AI Builder werden diese PDFs automatisch erkannt, ausgelesen und übertragen – inklusive einer Kontrolllogik, die prüft, ob jeder Auftrag vollständig verarbeitet wurde. Der Eingangskanal bleibt für Kunden gleich, der interne Aufwand sinkt deutlich.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Automatisierung lohnt sich vor allem bei wiederkehrenden, regelbasierten und fehleranfälligen Tätigkeiten.",
        ],
        bullets: [
          "Automatisierte Datenerfassung aus Dokumenten, E-Mails oder Formularen",
          "Freigabe- und Genehmigungsabläufe ohne manuelles Nachhalten",
          "Synchronisation von Daten zwischen ERP, CRM und Fachsystemen",
          "Wiederkehrende Reports und Benachrichtigungen ohne manuellen Anstoß",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Prozessautomatisierung ist breiter als reine RPA (Robotic Process Automation), die vor allem Bildschirminteraktionen nachahmt. In der Microsoft-Welt ist Power Automate das zentrale Werkzeug, oft ergänzt um AI Builder für Dokumentenextraktion. Die Automatisierung baut auf optimierten Prozessen auf und greift häufig auf konsolidierte Stammdaten zurück.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit verbindet Prozessanalyse mit konkreter technischer Umsetzung – statt nur Konzepte zu liefern. Für die G&B Logistics GmbH wurde die Auftragserfassung mit Power Automate und AI Builder automatisiert und spart allein dadurch rund 140 Arbeitsstunden pro Monat. Mitarbeitende werden von repetitiver Erfassung entlastet und können sich auf Disposition und Kundenkommunikation konzentrieren.",
        ],
      },
    ],
    faq: [
      {
        question: "Lohnt sich Automatisierung auch für kleine und mittlere Unternehmen?",
        answer:
          "Ja. Gerade im Mittelstand binden manuelle Routineaufgaben viel Zeit. Mit Werkzeugen wie Power Automate lassen sich Abläufe oft schrittweise und ohne großes Systemprojekt automatisieren – mit schnell messbarem Nutzen.",
      },
      {
        question: "Müssen wir bestehende Systeme ablösen, um zu automatisieren?",
        answer:
          "In der Regel nicht. Häufig ist es sinnvoller, bestehende Systeme über Schnittstellen zu verbinden und die Prozesse dazwischen zu automatisieren, statt alles neu zu bauen.",
      },
      {
        question: "Was passiert bei Ausnahmen und Fehlern?",
        answer:
          "Gute Automatisierung macht Ausnahmen sichtbar, statt sie zu verstecken. Eine Kontrolllogik prüft, ob Vorgänge vollständig verarbeitet wurden, und meldet Fälle, die manuell geprüft werden müssen.",
      },
      {
        question: "Worin unterscheiden sich Prozessoptimierung und Prozessautomatisierung?",
        answer:
          "Prozessoptimierung verbessert den Ablauf selbst: Schritte werden vereinfacht, Brüche entfernt und Verantwortlichkeiten geklärt. Automatisierung übernimmt anschließend einzelne Schritte technisch. Sinnvoll ist die Reihenfolge Optimierung vor Automatisierung, weil ein automatisierter schlechter Prozess nur schneller falsch läuft.",
      },
      {
        question: "Wie identifiziert man, welche Prozesse sich zuerst lohnen?",
        answer:
          "Gute Kandidaten sind Abläufe, die häufig wiederkehren, klaren Regeln folgen, viel manuelle Zeit binden und fehleranfällig sind. Eine kurze Aufnahme von Häufigkeit, Aufwand und Fehlerquote je Prozess macht sichtbar, wo die größten Hebel liegen. smiit beginnt Automatisierungsprojekte bewusst mit dieser Priorisierung, statt breit gestreut zu automatisieren.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Prozessautomatisierung: Definition & Beispiele | smiit Glossar",
    metaDescription:
      "Prozessoptimierung und -automatisierung erklärt: Definition, Vorgehen, Anwendungsfälle und Abgrenzung zu RPA – mit smiit-Praxisbeispiel (140 Std./Monat gespart).",
  },
  en: {
    slug: "process-automation",
    cluster: "strategy",
    dateModified: "2026-05-24",
    term: "Process optimization & automation",
    title: "What is process optimization & automation?",
    shortDefinition:
      "Process optimization makes business workflows leaner, clearer and less error-prone; process automation handles repetitive steps technically, so they run without manual work. Together they reduce effort, broken handoffs and errors — and free up time for value-adding work.",
    synonyms: ["process automation", "workflow automation", "business process optimization", "RPA"],
    sections: [
      {
        heading: "Where it is used",
        paragraphs: [
          "It starts with optimization: processes are made visible, friction points are analyzed and an improved target picture is designed — often with established notations such as BPMN. Only then comes the automation of the steps that demonstrably pay off.",
          "The order matters: automating a poor process only makes it faster at being wrong. Optimisation before automation ensures technical solutions build on a sensible workflow.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "Orders reach a company by email as PDFs and have to be read and entered into a system manually. With Microsoft Power Automate and AI Builder, these PDFs are detected, read and transferred automatically — including control logic that checks whether every order was processed completely. The intake channel stays the same for customers, while internal effort drops significantly.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Automation pays off above all for repetitive, rule-based and error-prone tasks.",
        ],
        bullets: [
          "Automated data capture from documents, emails or forms",
          "Approval and sign-off workflows without manual chasing",
          "Synchronising data between ERP, CRM and domain systems",
          "Recurring reports and notifications without manual triggering",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Process automation is broader than pure RPA (robotic process automation), which mainly mimics screen interactions. In the Microsoft world, Power Automate is the central tool, often complemented by AI Builder for document extraction. Automation builds on optimized processes and frequently relies on consolidated master data.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit combines process analysis with concrete technical delivery — instead of only providing concepts. For G&B Logistics GmbH, order capture was automated with Power Automate and AI Builder, saving around 140 working hours per month by that alone. Staff are relieved of repetitive data entry and can focus on dispatch and customer communication.",
        ],
      },
    ],
    faq: [
      {
        question: "Is automation worthwhile for small and medium-sized companies too?",
        answer:
          "Yes. In SMEs especially, manual routine tasks tie up a lot of time. With tools like Power Automate, workflows can often be automated step by step without a large system project — with quickly measurable value.",
      },
      {
        question: "Do we have to replace existing systems to automate?",
        answer:
          "Usually not. It is often more sensible to connect existing systems via interfaces and automate the processes in between, rather than rebuilding everything.",
      },
      {
        question: "What happens with exceptions and errors?",
        answer:
          "Good automation makes exceptions visible instead of hiding them. Control logic checks whether transactions were fully processed and flags cases that need manual review.",
      },
      {
        question: "How do process optimization and process automation differ?",
        answer:
          "Process optimization improves the workflow itself: steps are simplified, broken handoffs removed and responsibilities clarified. Automation then handles individual steps technically. The sensible order is optimization before automation, because an automated poor process only runs wrong faster.",
      },
      {
        question: "How do you identify which processes are worth automating first?",
        answer:
          "Good candidates are workflows that recur frequently, follow clear rules, tie up a lot of manual time and are error-prone. A short assessment of frequency, effort and error rate per process makes it visible where the biggest levers are. smiit deliberately starts automation projects with this prioritization rather than automating broadly.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Process automation: definition & examples | smiit glossary",
    metaDescription:
      "Process optimization and automation explained: definition, approach, use cases and how it differs from RPA — with a smiit example (140 hours/month saved).",
  },
}

export default prozessautomatisierung

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Prozessautomatisierung wird oft mit reiner Werkzeugeinführung verwechselt — ein ineffizienter Prozess wird durch Automatisierung nur schneller fehlerhaft, statt dass er vorher analysiert und optimiert wird.",
      "Viele glauben, RPA und echte Prozessautomatisierung seien dasselbe; RPA imitiert jedoch nur Benutzeraktionen an der Oberfläche und ersetzt keine saubere Integration über APIs oder Schnittstellen.",
      "Es wird unterschätzt, dass automatisierte Prozesse laufende Pflege brauchen — ändert sich eine Quellanwendung oder Maske, brechen viele Automatisierungen ohne Wartung schnell.",
    ],
    sources: [
      { title: "Object Management Group – Business Process Model and Notation (BPMN)", url: "https://www.bpmn.org/" },
      { title: "Microsoft Learn – Power Automate", url: "https://learn.microsoft.com/power-automate/" },
    ],
  },
  en: {
    misconceptions: [
      "Process automation is often mistaken for simply rolling out a tool — an inefficient process only fails faster once automated unless it is analyzed and improved first.",
      "Many assume RPA and true process automation are the same; RPA merely mimics user actions on the surface and does not replace proper integration via APIs or interfaces.",
      "People underestimate that automated processes need ongoing maintenance — if a source application or screen changes, many automations break quickly without upkeep.",
    ],
    sources: [
      { title: "Object Management Group – Business Process Model and Notation (BPMN)", url: "https://www.bpmn.org/" },
      { title: "Microsoft Learn – Power Automate", url: "https://learn.microsoft.com/power-automate/" },
    ],
  },
}
