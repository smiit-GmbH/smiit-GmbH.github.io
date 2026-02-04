export type Locale = 'de' | 'en'

const dictionaries = {
  de: {
    hero: {
      title: "Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
      subtitle: "Digitale Lösungen für Anwendungen für Automatisierung, Datenanalyse und Unternehmensberatung",
      cta: "Starten Sie Ihre Transformation",
    },
    cta: {
      title: "Smiit hilft Unternehmen,\nDaten in Handlungen zu verwandeln",
      text: "Wir stehen an Ihrer Seite.\nDurch Apps, Dashboards und Automatisierung — für mehr\nProduktivität und schnellere Entscheidungen.",
    },
    services: {
      title: "Workflows für messbaren Impact",
      subtitle:
        "Bei smiit entwickeln wir Apps, Automatisierung und Analytics — damit Ihr Business schneller vorankommt.",
      items: [
        {
          title: "Unternehmensberatung",
          tags: ["Strategie", "Prozesse", "IT"],
          text: "Wir unterstützen den Mittelstand mit IT-Beratung und digitaler Strategie — mit Fokus auf Apps, Automatisierung und Daten. Praktisch, pragmatisch und umsetzungsstark.",
        },
        {
          title: "Datenanalyse",
          tags: ["Power BI", "SQL & Python", "Azure"],
          text: "Wir verwandeln Ihre Daten in klare Dashboards und KPIs — schnell, aussagekräftig und direkt handlungsorientiert.",
        },
        {
          title: "Apps / Automatisierung",
          tags: [".NET", "React", "Next.js"],
          text: "Wir bauen intuitive Web-Apps, die Eingaben vereinfachen, Systeme über APIs verbinden und Workflows automatisieren — sicher, skalierbar und nahtlos.",
        },
      ],
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
      title: "Data-driven transformations, tailored for the backbone of enterprises",
      subtitle: "Digital solutions for applications for automation, data analytics, and business consulting",
      cta: "Start your transformation",
    },
    cta: {
      title: "Smiit helps businesses\nturn data into action",
      text: "We are by your side.\nThrough apps, dashboards, and automation — boosting\nproductivity and accelerating decisions.",
    },
    services: {
      title: "Workflows engineered for impact",
      subtitle: "At smiit, we build apps, automation, and analytics that move your business forward.",
      items: [
        {
          title: "Business consulting",
          tags: ["Strategy", "Processes", "IT"],
          text: "We guide SMEs with IT consulting and digital strategy focused on apps, automation, and data — practical and actionable.",
        },
        {
          title: "Data analysis",
          tags: ["Power BI", "SQL & Python", "Azure"],
          text: "We turn your data into clear dashboards and KPIs — fast, insightful, and ready for action.",
        },
        {
          title: "Apps / automation",
          tags: [".NET", "React", "Next.js"],
          text: "We create intuitive web apps that simplify inputs, connect systems via API, and automate workflows — secure, scalable, and seamless.",
        },
      ],
    },
    customerCards: [
      {
        id: 1,
        name: "Dy Project AG",
        subtitle: "Power BI analyses for controlling & operations",
        feedback: "Three separate systems combined into one real-time reporting solution.",
      },
      {
        id: 2,
        name: "G&B Logistics GmbH",
        subtitle: "Digital Strategy & Process Optimization",
        feedback: "140 hours per month freed up through automation.",
      },
      {
        id: 3,
        name: "Claimity AG",
        subtitle: "SaaS Development for the Insurance Industry",
        feedback: "From idea to go-live in 3 months – efficient and effective.",
      },
      {
        id: 4,
        name: "RB Westkamp GmbH",
        subtitle: "Transformation of the employee experience",
        feedback: "Real-time analyses of employee performance as an individual incentive system.",
      },
      {
        id: 5,
        name: "ASW Engineering AG",
        subtitle: "Automation of project planning",
        feedback: "Full transparency regarding operating capacity utilization and profit expectations.",
      },
    ],
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale]
