export type Locale = 'de' | 'en'

const dictionaries = {
  de: {
    hero: {
      title: "Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
      subtitle: "Digitale Lösungen für Anwendungen, Automatisierung, Datenanalyse und Unternehmensberatung",
      cta: "Starten Sie Ihre Transformation",
    },
    about: {
      title: "smiit hilft Unternehmen,\nDaten in Handlungen zu verwandeln",
      text: "Wir stehen an Ihrer Seite.\nDurch Apps, Dashboards und Automatisierungen — für mehr\nProduktivität und schnellere Entscheidungen.",
    },
    services: {
      title: "Workflows für messbaren Impact",
      subtitle:
        "Bei smiit entwickeln wir Apps, Automatisierungen und Analytics — damit Ihr Business schneller vorankommt.",
      items: [
        {
          title: "Unternehmensberatung",
          tags: ["Strategie", "Prozesse", "IT"],
          text: "Wir unterstützen den Mittelstand mit IT-Beratung und digitaler Strategie — mit Fokus auf Apps, Automatisierungen und Daten. Praktisch, pragmatisch und umsetzungsstark.",
        },
        {
          title: "Datenanalyse",
          tags: ["Power BI", "SQL & Python", "Azure"],
          text: "Wir verwandeln Ihre Daten in klare Dashboards und KPIs — schnell, aussagekräftig und direkt handlungsorientiert.",
        },
        {
          title: "Apps / Automatisierungen",
          tags: [".NET", "React", "Next.js"],
          text: "Wir bauen intuitive Web-Apps, die Eingaben vereinfachen, Systeme über APIs verbinden und Workflows automatisieren — sicher und skalierbar.",
        },
      ],
      mobileCta: "Sie haben Fragen zu unseren Dienstleistungen? Buchen Sie gerne ein kostenloses und unverbindliches Erstgespräch mit uns.",
      mobileCtaButton: "Sprechen Sie mit uns",
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
        feedback: "Echtzeitanalysen zur Vertriebs- und Mitarbeiterperformance.",
      },
      {
        id: 5,
        name: "ASW Engineering AG",
        subtitle: "Automatisierung der Projektplanung und -steuerung",
        feedback: "Volle Transparenz über die Betriebsauslastung.",
      },
    ],
    results: {
      titlePrefix: "Ergebnisse, die Ihr Team und Ihre Kunden ",
      titleHighlight: "tatsächlich",
      titleSuffix: " spüren",
      items: [
        { value: "5+", label: "Jahre Erfahrung", text: "Mit über 5 Jahren Erfahrung arbeitet die smiit GmbH mit standardisierten Prozessen und klarer Strukturierung." },
        { value: "70+", label: "Erfolgreiche Projekte", text: "Wir haben in den letzten Jahren mit mehr als 20 Kunden insgesamt über 70 Projekte erfolgreich umgesetzt." },
        { value: "Ø 3,6", label: "Projekte je Kunde", text: "Über 3,6 Projekte je Kunde zeigen klar: Unsere Kunden vertrauen uns und sind zufrieden mit unseren Ergebnissen." },
        { value: "3", label: "Service Bereiche", text: "Unsere breite fachliche Aufstellung ermöglicht eine integrierte Umsetzung: Datenanalyse, Automatisierungen & Apps." }
      ],
      button: "Bringen Sie Ihr Business voran"
    },
    products: {
      title: "Entscheidungen gestützt\nauf Daten, nicht auf Vermutungen",
      subtitle: "smiit-Produkte verwandeln Rohdaten in klare Erkenntnisse und ermöglichen\nintelligentere, faktenbasierte Geschäftsentscheidungen.",
      cta: "Kostenloses Erstgespräch buchen",
      items: [
        {
          title: "Product\nScout",
          text: "KI-gestützte Preisvergleichs-Suchmaschine für Einzelhändler und Handwerker. Durchsuchen Sie alle Ihre Lieferanten gleichzeitig.",
          image: "/assets/home/product_scout.png",
          href: "#book",
        },
        {
          title: "smiit Analytics\nfür bexio",
          text: "Unser bexio Analysedashboard für Schweizer Nutzer automatisiert Ihre Auswertungen und konsolidiert alle KPIs aus bexio in übersichtlichen Reports.",
          image: "/assets/home/smiit_analytics.png",
          href: "/smiit-analytics",
        },
        {
          title: "Azai\nElevate",
          text: "Intelligente Projektmanagement-Plattform mit KI-gestützter Risikoanalyse und automatisierten Workflows für erfolgreiche Projekte.",
          image: "/assets/home/azai.png",
          href: "https://www.azai.ch",
          external: true,
        },
      ],
      ctaBottom: "Lassen Sie uns über Ihre\nHerausforderungen sprechen",
      ctaSubtext: "Wir beraten Sie unverbindlich zu Ihren Möglichkeiten.",
      ctaBottomButton: "Kostenloses Erstgespräch buchen",
    },
    aboutPage: {
      titlePrefix: "Digitale Transformation. Weite Expertise. ",
      titleHighlight: "Nachhaltiger",
      titleSuffix: " Mehrwert.",
      description: "Wir sind ein IT-Unternehmen mit der Vision, kleine und mittelständische Unternehmen im DACH-Raum zu digitalisieren - durch maßgeschneiderte Lösungen in den Bereichen Datenanalyse, Automatisierung und App-Entwicklung.",
      primaryButton: "Kostenloses Erstgespräch",
      secondaryButton: "Unsere Services",
      features: [
        "5+ Jahre Erfahrung",
        "DACH-weiter Fokus",
        "In-House Entwicklung"
      ],
      ourClients: "Unsere Kunden",
      overview: "Übersicht"
    },
    contact: {
      titlePrefix: "",
      titleHighlight: "Kontaktieren",
      titleSuffix: " Sie uns",
      subtitle: "Wir freuen uns auf Ihr Projekt und Ihre Fragen.",
      cta: "Kostenloses Erstgespräch buchen",
      formTitle: "Schreiben Sie uns",
      infoTitle: "Kontaktinformationen",
      form: {
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefon",
        optional: "(optional)",
        interest: "Interesse auswählen",
        message: "Wie können wir Ihnen helfen?",
        submit: "Anfrage absenden",
        sending: "Wird gesendet...",
        successTitle: "Nachricht gesendet!",
        successText: "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.",
        errorTitle: "Fehler beim Senden",
        errorText: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.",
        disclaimer: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur Bearbeitung zu.",
        interests: [
          "Unternehmensberatung",
          "Datenanalyse",
          "Apps / Automatisierungen",
          "Website Entwicklung",
          "smiit Analytics für bexio",
          "Azai Elevate",
          "Product Scout",
          "Sonstiges",
        ],
      },
      info: {
        emailLabel: "E-Mail:",
        phoneLabel: "Telefon:",
        bookText: "Möchten Sie direkt mit uns sprechen?",
        bookLink: "Termin buchen",
        cvLinkText: "Lebenslauf",
        email: "kontakt@smiit.de",
        phone: "+49 160 4073198",
        phoneHref: "tel:+491604073198",
        address: "Reiherweg 96, 89584 Ehingen",
        addressFull: "Reiherweg 96\n89584 Ehingen\nDeutschland",
      },
      team: [
        {
          name: "Sebastian Grab",
          role: "Software Entwickler",
          image: "/assets/people/sebastian.png",
          email: "sebastian.grab@smiit.de",
          cvLink: "https://grab.smiit.de",
        },
        {
          name: "Noah Neßlauer",
          role: "Business Analyst",
          image: "/assets/people/noah.png",
          email: "noah.nesslauer@smiit.de",
          cvLink: "https://nesslauer.smiit.de",
        },
      ],
    },
  },
  en: {
    hero: {
      title: "Data-driven transformations, tailored for the backbone of enterprises",
      subtitle: "Digital solutions for applications, automation, data analytics, and business consulting",
      cta: "Start your transformation",
    },
    about: {
      title: "smiit helps businesses\nto turn data into action",
      text: "We are by your side.\nThrough apps, dashboards, and automation — boosting\nproductivity and accelerating decisions.",
    },
    services: {
      title: "Workflows for measurable impact",
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
          text: "We create intuitive web apps that simplify inputs, connect systems via API, and automate workflows — secure and scalable.",
        },
      ],
      mobileCta: "Have questions about our services? Book a free, no-obligation introductory call with us.",
      mobileCtaButton: "Talk to a digital expert",
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
        feedback: "Real-time analyses of sales and employee performance.",
      },
      {
        id: 5,
        name: "ASW Engineering AG",
        subtitle: "Automation of project planning and control",
        feedback: "Full transparency regarding operating capacity utilization.",
      },
    ],
    results: {
      titlePrefix: "Results your team and customers ",
      titleHighlight: "actually",
      titleSuffix: " feel",
      items: [
        { value: "5+", label: "Years of experience", text: "With over 5 years of experience, smiit GmbH works with standardized processes and clear structuring." },
        { value: "70+", label: "Successful projects", text: "We have successfully implemented a total of over 70 projects with more than 20 customers in recent years." },
        { value: "Ø 3.6", label: "Projects per customer", text: "Over 3.6 projects per customer clearly show: our customers trust us and are satisfied with our results." },
        { value: "3", label: "Service areas", text: "Our broad range of expertise enables integrated implementation: data analysis, automation & apps." }
      ],
      button: "Boost your business"
    },
    products: {
      title: "Decisions backed\nby data, not guesswork",
      subtitle: "smiit products turn raw data into clear insights, enabling\nsmarter, fact-based business decisions.",
      cta: "Schedule a free demo",
      items: [
        {
          title: "Product\nScout",
          text: "AI-powered price comparison search engine for retailers and craftsmen. Search all your suppliers simultaneously.",
          image: "/assets/home/product_scout.png",
          href: "#book",
        },
        {
          title: "smiit Analytics\nfor bexio",
          text: "Our bexio analysis dashboard for Swiss users automates your evaluations and consolidates all KPIs from bexio in clear reporting.",
          image: "/assets/home/smiit_analytics.png",
          href: "/smiit-analytics",
        },
        {
          title: "Azai\nElevate",
          text: "Intelligent project management platform with AI-powered risk analysis and automated workflows for successful projects.",
          image: "/assets/home/azai.png",
          href: "https://www.azai.ch",
          external: true,
        },
      ],
      ctaBottom: "Let's talk about your\nchallenges",
      ctaSubtext: "We'll advise you on your options — no strings attached.",
      ctaBottomButton: "Schedule a free demo",
    },
    aboutPage: {
      titlePrefix: "Digital transformation. Wide expertise. ",
      titleHighlight: "Sustainable",
      titleSuffix: " value.",
      description: "We are an IT company with the vision of digitizing small and medium-sized enterprises in the DACH region - through tailored solutions in data analytics, automation, and app development.",
      primaryButton: "Free Consultation",
      secondaryButton: "Our Services",
      features: [
        "5+ years experience",
        "DACH-wide focus",
        "In-house development"
      ],
      ourClients: "Our Clients",
      overview: "Overview"
    },
    contact: {
      titlePrefix: "Get in ",
      titleHighlight: "touch",
      titleSuffix: " with us",
      subtitle: "We look forward to your project and your questions.",
      cta: "Book a free consultation",
      formTitle: "Write to us",
      infoTitle: "Contact information",
      form: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        optional: "(optional)",
        interest: "Select your interest",
        message: "How can we help you?",
        submit: "Send request",
        sending: "Sending...",
        successTitle: "Message sent!",
        successText: "Thank you for your message. We will get back to you shortly.",
        errorTitle: "Error sending message",
        errorText: "Please try again or contact us directly via email.",
        disclaimer: "By submitting, you agree to the processing of your data for handling your request.",
        interests: [
          "Business consulting",
          "Data analytics",
          "Apps / Automation",
          "Website Development",
          "smiit Analytics for bexio",
          "Azai Elevate",
          "Product Scout",
          "Other",
        ],
      },
      info: {
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        bookText: "Want to talk right away?",
        bookLink: "Book an appointment",
        cvLinkText: "Resume",
        email: "kontakt@smiit.de",
        phone: "+49 160 4073198",
        phoneHref: "tel:+491604073198",
        address: "Reiherweg 96, 89584 Ehingen",
        addressFull: "Reiherweg 96\n89584 Ehingen\nGermany",
      },
      team: [
        {
          name: "Sebastian Grab",
          role: "Software Engineer",
          image: "/assets/people/sebastian.png",
          email: "sebastian.grab@smiit.de",
          cvLink: "https://grab.smiit.de",
        },
        {
          name: "Noah Neßlauer",
          role: "Business Analyst",
          image: "/assets/people/noah.png",
          email: "noah.nesslauer@smiit.de",
          cvLink: "https://nesslauer.smiit.de",
        },
      ],
    },
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale]
