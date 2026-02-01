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
        name: "Dy Project AG",
        subtitle: "Power BI Analysen für Controlling & Betrieb",
        feedback: "Drei getrennte Systeme in eine echtzeit Berichtslösung vereint.",
      },
      {
        id: 2,
        name: "G&B Logistics GmbH",
        subtitle: "Digitale Strategie & Prozessoptimierung",
        feedback: "Freisetzung von 140 Stunden je Monat durch Automatisierung.",
      },
      {
        id: 3,
        name: "Claimity AG",
        subtitle: "SaaS-Entwicklung für die Versicherungsbranche",
        feedback: "Von der Idee zum Go-Live in 3 Monaten - effizient und effektiv.",
      },
      {
        id: 4,
        name: "RB Westkamp GmbH",
        subtitle: "Transformation der Mitarbeitererfahrung",
        feedback: "Echtzeitanalysen zur Mitarbeiterperformance als individuelles Anreizsystem.",
      },
      {
        id: 5,
        name: "ASW Engineering AG",
        subtitle: "Automatisierung der Projektplanung",
        feedback: "Volle Transparenz über Betriebsauslastung und Gewinnerwartung.",
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
