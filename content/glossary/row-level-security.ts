import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const rowLevelSecurity: LocalizedGlossaryTerm = {
  de: {
    slug: "row-level-security",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Row-Level Security (RLS)",
    title: "Was ist Row-Level Security (RLS)?",
    shortDefinition:
      "Row-Level Security (RLS) ist ein Sicherheitsmechanismus, der steuert, welche Datenzeilen ein Nutzer in einem Bericht oder Datenmodell sehen darf. In Power BI sorgt RLS dafür, dass jeder Anwender denselben Bericht öffnet, aber nur die für ihn freigegebenen Daten angezeigt bekommt, etwa nur die eigene Region oder Abteilung.",
    synonyms: ["RLS", "zeilenbasierte Sicherheit", "Datenzeilensicherheit"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Row-Level Security genutzt?",
        paragraphs: [
          "Row-Level Security filtert die Daten je nach Nutzer, ohne dass für jede Gruppe ein eigener Bericht gebaut werden muss. Über definierte Rollen und Filterregeln wird festgelegt, welche Zeilen eine Person sehen darf. Häufig wird die Identität des angemeldeten Nutzers herangezogen, um dynamisch die passenden Zeilen einzublenden (dynamische RLS).",
          "In Power BI wird RLS auf dem Semantic Model definiert und greift für alle darauf aufbauenden Berichte. Damit ist die Zugriffssteuerung zentral und konsistent, statt sie pro Bericht zu wiederholen.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Row-Level Security wird gebraucht, sobald derselbe Bericht von Personen mit unterschiedlichen Sichtrechten genutzt wird.",
        ],
        bullets: [
          "Regional- oder Niederlassungsleiter sehen nur ihre eigene Region",
          "Vertriebsmitarbeiter sehen nur ihre eigenen Kunden oder Gebiete",
          "Mandanten- oder Kundentrennung in einem gemeinsam genutzten Bericht",
          "Abteilungsbezogene Sichten ohne separate Berichtskopien",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "RLS steuert, welche Zeilen sichtbar sind, nicht welche Berichte oder Arbeitsbereiche jemand öffnen darf; das regeln die Berechtigungen in Power BI darüber. RLS ist ein konkretes Werkzeug der Data Governance und wird auf dem Semantic Model umgesetzt, oft in Kombination mit DAX-Filterausdrücken. In der Datenplattform der dy Project AG stellte RLS sicher, dass verschiedene Projektbeteiligte nur die für sie relevanten Daten sahen. smiit gestaltet RLS so, dass sie sicher, nachvollziehbar und performant bleibt.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen statischer und dynamischer RLS?",
        answer:
          "Bei statischer RLS wird je Rolle ein fester Filter hinterlegt. Bei dynamischer RLS wird die Identität des angemeldeten Nutzers genutzt, um die sichtbaren Zeilen automatisch zu bestimmen, was bei vielen Nutzern deutlich wartungsärmer ist.",
      },
      {
        question: "Schützt Row-Level Security die Daten vollständig?",
        answer:
          "RLS steuert die Sichtbarkeit von Zeilen im Bericht. Für umfassenden Schutz gehört sie in ein Gesamtkonzept aus Berechtigungen, Verschlüsselung und Governance, das smiit ganzheitlich betrachtet.",
      },
      {
        question: "Wie testet man, ob Row-Level Security korrekt greift?",
        answer:
          "Power BI bietet eine Funktion, mit der sich ein Bericht aus der Sicht einer bestimmten Rolle oder eines bestimmten Nutzers anzeigen lässt. So kann vor der Veröffentlichung geprüft werden, ob jede Rolle wirklich nur die vorgesehenen Zeilen sieht.",
      },
      {
        question: "Beeinträchtigt Row-Level Security die Performance eines Berichts?",
        answer:
          "RLS-Filter werden bei jeder Abfrage ausgewertet und können bei sehr komplexen Regeln oder großen Modellen die Antwortzeiten beeinflussen. Mit einem sauberen Datenmodell und möglichst einfachen Filterausdrücken bleibt der Effekt in der Regel gering.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Row-Level Security (RLS): Definition & Praxis | smiit Glossar",
    metaDescription:
      "Row-Level Security einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Berechtigungen und Data Governance – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "row-level-security",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Row-level security (RLS)",
    title: "What is row-level security (RLS)?",
    shortDefinition:
      "Row-level security (RLS) is a security mechanism that controls which rows of data a user may see in a report or data model. In Power BI, RLS ensures that every user opens the same report but only sees the data released for them, such as only their own region or department.",
    synonyms: ["RLS", "row-based security"],
    sections: [
      {
        heading: "Where row-level security is used",
        paragraphs: [
          "Row-level security filters the data per user without having to build a separate report for each group. Through defined roles and filter rules, it is determined which rows a person may see. Often the identity of the signed-in user is used to dynamically show the appropriate rows (dynamic RLS).",
          "In Power BI, RLS is defined on the semantic model and applies to all reports built on it. This makes access control central and consistent instead of repeating it per report.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "Row-level security is needed as soon as the same report is used by people with different viewing rights.",
        ],
        bullets: [
          "Regional or branch managers see only their own region",
          "Sales staff see only their own customers or territories",
          "Tenant or customer separation in a shared report",
          "Department-specific views without separate report copies",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "RLS controls which rows are visible, not which reports or workspaces someone may open; that is governed by the permissions in Power BI above it. RLS is a concrete tool of data governance and is implemented on the semantic model, often in combination with DAX filter expressions. In the dy Project AG data platform, RLS ensured that different project participants saw only the data relevant to them. smiit designs RLS so that it stays secure, traceable and performant.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between static and dynamic RLS?",
        answer:
          "With static RLS, a fixed filter is stored per role. With dynamic RLS, the identity of the signed-in user is used to determine the visible rows automatically, which is considerably less maintenance with many users.",
      },
      {
        question: "Does row-level security protect the data completely?",
        answer:
          "RLS controls the visibility of rows in the report. For comprehensive protection it belongs in an overall concept of permissions, encryption and governance, which smiit considers holistically.",
      },
      {
        question: "How do you test whether row-level security works correctly?",
        answer:
          "Power BI provides a feature that lets you view a report from the perspective of a specific role or user. This makes it possible to verify before publishing that each role really only sees the intended rows.",
      },
      {
        question: "Does row-level security affect a report's performance?",
        answer:
          "RLS filters are evaluated with every query and, with very complex rules or large models, can influence response times. With a clean data model and filter expressions kept as simple as possible, the effect usually stays small.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Row-level security (RLS): definition & practice | smiit glossary",
    metaDescription:
      "Row-level security explained simply: definition, how it works, use cases and how it differs from permissions and data governance – with practical insight from smiit.",
  },
}

export default rowLevelSecurity

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Row-Level Security verbirgt nur Zeilen, nicht Spalten. Sensible Felder bleiben für berechtigte Zeilen sichtbar; das Ausblenden von Spalten erfordert andere Mechanismen.",
      "Viele glauben, RLS schütze automatisch alle Zugriffswege. Die Regeln greifen im Modell, doch Export, Direktzugriff auf die Quelle oder fehlende Tests können sie umgehen.",
      "Ein verbreiteter Irrtum ist, dass RLS-Rollen nach dem Anlegen nicht getestet werden müssen. Ohne „Als Rolle anzeigen“-Tests bleiben Fehlkonfigurationen oft unbemerkt.",
    ],
    sources: [
      {
        title: "Microsoft Learn – Row-Level Security (RLS) in Power BI",
        url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls",
      },
      {
        title: "Microsoft Learn – Power BI Sicherheit (Guidance)",
        url: "https://learn.microsoft.com/power-bi/guidance/",
      },
    ],
  },
  en: {
    misconceptions: [
      "Row-level security hides only rows, not columns. Sensitive fields stay visible for permitted rows; hiding columns needs different mechanisms.",
      "Many believe RLS automatically protects every access path, but rules apply in the model while export, direct source access or missing tests can bypass them.",
      "A common error is to skip testing RLS roles after creating them. Without view-as-role testing, misconfigurations often go unnoticed.",
    ],
    sources: [
      {
        title: "Microsoft Learn – Row-level security (RLS) in Power BI",
        url: "https://learn.microsoft.com/power-bi/enterprise/service-admin-rls",
      },
      {
        title: "Microsoft Learn – Power BI security (guidance)",
        url: "https://learn.microsoft.com/power-bi/guidance/",
      },
    ],
  },
}
