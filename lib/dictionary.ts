export type Locale = 'de' | 'en'

const dictionaries = {
  de: {
    hero: {
      title: "Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
      subtitle: "Digitale Lösungen für Anwendungen für Automatisierung, Datenanalyse und Unternehmensberatung",
      cta: "Starten Sie Ihre Transformation",
    },
    customerCards: [
      {
        id: 1,
        name: "Alpine Retail Group",
        subtitle: "Power BI Analysen für Vertrieb & Betrieb",
        feedback: "Echtzeit-Dashboards erhöhten die Prognosegenauigkeit um 40%.",
      },
      {
        id: 2,
        name: "G&B Logistics GmbH",
        subtitle: "Digitale Strategie & Prozessoptimierung",
        feedback: "Operative Effizienz innerhalb von drei Monaten um 35% verbessert.",
      },
      {
        id: 3,
        name: "TechLine Services AG",
        subtitle: "End-to-End API-Integrationen",
        feedback: "Fünf getrennte Systeme in einen nahtlosen Workflow vereint.",
      },
      {
        id: 4,
        name: "Helvetia Systems",
        subtitle: "Transformation der Kundenerfahrung",
        feedback: "NPS-Score im ersten Quartal durch bessere Dateneinblicke um 25 Punkte gestiegen.",
      },
      {
        id: 5,
        name: "Nova Pharma Solutions",
        subtitle: "Automatisierung der regulatorischen Compliance",
        feedback: "Vorbereitungszeit für Audits durch automatisierte Berichterstattung um 60% reduziert.",
      },
    ],
  },
  en: {
    hero: {
      title: "Data-driven transformations, tailored for the backbone of SMEs",
      subtitle: "Digital solutions for applications for automation, data analytics, and business consulting",
      cta: "Start your transformation",
    },
    customerCards: [
      {
        id: 1,
        name: "Alpine Retail Group",
        subtitle: "Power BI Analytics for Sales & Operations",
        feedback: "Real-time dashboards increased forecasting accuracy by 40%.",
      },
      {
        id: 2,
        name: "G&B Logistics GmbH",
        subtitle: "Digital Strategy & Process Optimization",
        feedback: "Operational efficiency improved by 35% within three months.",
      },
      {
        id: 3,
        name: "TechLine Services AG",
        subtitle: "End-to-End API Integrations",
        feedback: "Five disconnected systems unified into one seamless workflow.",
      },
      {
        id: 4,
        name: "Helvetia Systems",
        subtitle: "Customer Experience Transformation",
        feedback: "NPS score increased by 25 points in Q1 through better data insights.",
      },
      {
        id: 5,
        name: "Nova Pharma Solutions",
        subtitle: "Regulatory Compliance Automation",
        feedback: "Reduced audit preparation time by 60% with automated reporting.",
      },
    ],
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale]
