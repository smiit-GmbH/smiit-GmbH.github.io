export type Locale = 'de' | 'en'

const dictionaries = {
  de: {
    hero: {
      title: "Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
      subtitle: "Digitale Lösungen für Anwendungen für Automatisierung, Datenanalyse und Unternehmensberatung",
      cta: "Starten Sie Ihre Transformation",
    },
  },
  en: {
    hero: {
      title: "Data-driven transformations, tailored for the backbone of SMEs",
      subtitle: "Digital solutions for applications for automation, data analytics, and business consulting",
      cta: "Start your transformation",
    },
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale]
