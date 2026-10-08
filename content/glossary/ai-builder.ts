import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const aiBuilder: LocalizedGlossaryTerm = {
  de: {
    slug: "ai-builder",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "AI Builder (Dokumentenextraktion / OCR)",
    title: "Was ist AI Builder (Dokumentenextraktion / OCR)?",
    shortDefinition:
      "AI Builder ist die KI-Komponente der Microsoft Power Platform, mit der sich vortrainierte und eigene KI-Modelle ohne tiefe Data-Science-Kenntnisse nutzen lassen. Ein zentraler Anwendungsfall ist die Dokumentenextraktion per OCR: AI Builder liest Felder aus PDFs, Rechnungen oder Formularen aus und macht sie maschinell weiterverarbeitbar.",
    synonyms: ["Document Processing", "OCR", "Texterkennung", "Dokumentenextraktion", "AI Builder"],
    sections: [
      {
        heading: "Einordnung: Wofür wird AI Builder genutzt?",
        paragraphs: [
          "OCR (Optical Character Recognition) wandelt Bild- oder PDF-Inhalte in maschinenlesbaren Text um. AI Builder geht darüber hinaus: Mit Modellen zur Dokumentenverarbeitung erkennt er nicht nur Text, sondern auch Struktur – also welches Feld der Rechnungsbetrag, die Auftragsnummer oder das Datum ist. Diese strukturierte Ausgabe lässt sich direkt in Folgeprozesse übergeben.",
          "AI Builder ist eng mit Power Automate verzahnt: Ein Flow übergibt ein Dokument an das Modell, erhält die extrahierten Felder zurück und verarbeitet sie weiter. So lassen sich manuelle Erfassungsschritte ersetzen, die bisher Medienbrüche und Fehler verursacht haben.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Logistikunternehmen erhält Aufträge als PDF in unterschiedlichen Layouts. Ein trainiertes AI-Builder-Modell zur Dokumentenextraktion liest die relevanten Felder – etwa Absender, Positionen und Mengen – zuverlässig aus, auch wenn sich die Formate unterscheiden. Power Automate übernimmt die extrahierten Daten und überträgt sie ohne manuelle Eingabe in das Zielsystem.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Reine OCR liefert nur Text, AI Builder liefert strukturierte, feldbasierte Daten – das ist der entscheidende Unterschied für die Automatisierung. AI Builder ist dabei kein eigenständiger Workflow-Motor, sondern wird über Power Automate orchestriert und speist häufig in Systeme ein, deren Stammdaten zuvor konsolidiert wurden. Für die G&B Logistics GmbH hat smiit die PDF-Auftragserfassung mit AI Builder und Power Automate automatisiert und spart so rund 140 Arbeitsstunden pro Monat.",
        ],
      },
    ],
    faq: [
      {
        question: "Funktioniert AI Builder auch bei unterschiedlichen Dokumentlayouts?",
        answer:
          "Ja. Modelle zur Dokumentenverarbeitung lassen sich auf verschiedene Layouts trainieren und erkennen Felder auch dann, wenn die Formate variieren. Die Genauigkeit steigt mit passenden Trainingsbeispielen.",
      },
      {
        question: "Brauche ich für AI Builder ein Data-Science-Team?",
        answer:
          "Nein. AI Builder ist darauf ausgelegt, ohne tiefe Data-Science-Kenntnisse nutzbar zu sein. Für die Einbindung in Prozesse und das Training auf eigene Dokumente ist Erfahrung mit der Power Platform jedoch hilfreich.",
      },
      {
        question: "Was ist der Unterschied zwischen AI Builder und reiner OCR?",
        answer:
          "Reine OCR wandelt ein Dokument lediglich in Text um, ohne dessen Bedeutung zu verstehen. AI Builder erkennt zusätzlich die Struktur und liefert benannte Felder wie Rechnungsbetrag oder Auftragsnummer zurück, die sich direkt weiterverarbeiten lassen.",
      },
      {
        question: "Wie viele Beispieldokumente werden für das Training benötigt?",
        answer:
          "Das hängt von der Komplexität und der Vielfalt der Layouts ab. Für klar strukturierte Dokumente genügen oft wenige Beispiele, während stark variierende Formate mehr Trainingsbeispiele erfordern, damit die Felderkennung zuverlässig wird.",
      },
      {
        question: "Was passiert, wenn AI Builder ein Feld falsch oder unsicher erkennt?",
        answer:
          "AI Builder liefert zu erkannten Feldern in der Regel Konfidenzwerte. Diese lassen sich nutzen, um unsichere Fälle automatisch zur manuellen Prüfung auszusteuern, statt fehlerhafte Daten ungeprüft in Folgeprozesse zu übernehmen.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "AI Builder & OCR: Dokumentenextraktion | smiit Glossar",
    metaDescription:
      "AI Builder erklärt: Dokumentenextraktion und OCR in der Power Platform, Zusammenspiel mit Power Automate – mit Praxisbeispiel von smiit (140 Std./Monat gespart).",
  },
  en: {
    slug: "ai-builder",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "AI Builder (document extraction / OCR)",
    title: "What is AI Builder (document extraction / OCR)?",
    shortDefinition:
      "AI Builder is the AI component of the Microsoft Power Platform that lets you use pretrained and custom AI models without deep data science skills. A central use case is document extraction via OCR: AI Builder reads fields out of PDFs, invoices or forms and makes them available for automated processing.",
    synonyms: ["document processing", "OCR", "text recognition", "document extraction", "AI Builder"],
    sections: [
      {
        heading: "Where AI Builder is used",
        paragraphs: [
          "OCR (optical character recognition) converts image or PDF content into machine-readable text. AI Builder goes further: with document processing models it recognizes not only text but also structure — that is, which field is the invoice amount, the order number or the date. This structured output can be passed directly into downstream processes.",
          "AI Builder is tightly integrated with Power Automate: a flow passes a document to the model, receives the extracted fields back and processes them further. This replaces manual data entry steps that previously caused broken handoffs and errors.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A logistics company receives orders as PDFs in different layouts. A trained AI Builder document extraction model reliably reads the relevant fields — such as sender, line items and quantities — even when the formats differ. Power Automate takes the extracted data and transfers it into the target system without manual input.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Pure OCR only delivers text, AI Builder delivers structured, field-based data — that is the decisive difference for automation. AI Builder is not a standalone workflow engine but is orchestrated through Power Automate and often feeds into systems whose master data was consolidated beforehand. For G&B Logistics GmbH, smiit automated PDF order capture with AI Builder and Power Automate, saving around 140 working hours per month.",
        ],
      },
    ],
    faq: [
      {
        question: "Does AI Builder also work with different document layouts?",
        answer:
          "Yes. Document processing models can be trained on different layouts and recognize fields even when the formats vary. Accuracy improves with suitable training examples.",
      },
      {
        question: "Do I need a data science team for AI Builder?",
        answer:
          "No. AI Builder is designed to be usable without deep data science skills. For integrating it into processes and training it on your own documents, experience with the Power Platform is nonetheless helpful.",
      },
      {
        question: "What is the difference between AI Builder and pure OCR?",
        answer:
          "Pure OCR merely converts a document into text without understanding its meaning. AI Builder additionally recognizes the structure and returns named fields such as invoice amount or order number that can be processed directly.",
      },
      {
        question: "How many sample documents are needed for training?",
        answer:
          "That depends on the complexity and the variety of layouts. For clearly structured documents a few examples are often enough, whereas widely varying formats require more training examples for field recognition to become reliable.",
      },
      {
        question: "What happens if AI Builder reads a field incorrectly or with low certainty?",
        answer:
          "AI Builder typically provides confidence scores for the fields it recognizes. These can be used to automatically route uncertain cases for manual review instead of passing faulty data unchecked into downstream processes.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "AI Builder & OCR: document extraction | smiit glossary",
    metaDescription:
      "AI Builder explained: document extraction and OCR in the Power Platform and its interplay with Power Automate — with a smiit example (140 hours/month saved).",
  },
}

export default aiBuilder

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "AI Builder wird oft als Ersatz für eigene Data-Science-Projekte gesehen; es bietet jedoch vorgefertigte und einfach trainierbare Modelle für klar umrissene Aufgaben, keine beliebige Custom-KI.",
      "Viele erwarten von der Dokumentenextraktion fehlerfreie Ergebnisse; gerade bei schlechter Scan-Qualität oder ungewohnten Layouts bleibt eine Validierung der erkannten Daten nötig.",
      "Es wird übersehen, dass AI Builder kostenpflichtige Credits verbraucht und an die Power-Platform-Lizenzierung gebunden ist.",
    ],
    sources: [
      { title: "Microsoft Learn – AI Builder Dokumentation", url: "https://learn.microsoft.com/ai-builder/" },
      { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
    ],
  },
  en: {
    misconceptions: [
      "AI Builder is often seen as a replacement for custom data-science projects; in fact it offers prebuilt and easily trainable models for well-defined tasks, not arbitrary custom AI.",
      "Many expect document extraction to be error-free; especially with poor scan quality or unusual layouts, the recognized data still needs validation.",
      "People overlook that AI Builder consumes paid credits and is tied to Power Platform licensing.",
    ],
    sources: [
      { title: "Microsoft Learn – AI Builder documentation", url: "https://learn.microsoft.com/ai-builder/" },
      { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
    ],
  },
}
