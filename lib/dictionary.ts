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
          href: "/products/smiit-analytics",
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
      overview: "Übersicht",
      mission: {
        title: "Unsere Mission & Werte",
        subtitle: "Wir möchten Veränderungen bewirken und unseren Kunden klare Einblicke\nermöglichen, wertvolle Zeit sparen und moderne Arbeitsweisen etablieren",
        values: [
          {
            title: "Vertrauen & Engagement",
            text: "Erfolgreiche Projekte entstehen nur durch gegenseitiges Vertrauen und Engagement. Wir bringen unsere Expertise ein – und erwarten die gleiche Offenheit und Beteiligung von unseren Partnern.",
          },
          {
            title: "Nachhaltige Qualität",
            text: "Wir entwickeln Lösungen, die langfristig funktionieren. Qualität braucht manchmal mehr Zeit – dafür entstehen Systeme, die skalierbar, wartbar und nachhaltig nutzbar sind.",
          },
          {
            title: "Partnerschaftliche Zusammenarbeit",
            text: "Wir arbeiten nicht für unsere Kunden – sondern mit ihnen. Offene Kommunikation, Zusammenarbeit auf Augenhöhe und Freude an gemeinsamen Projekten sind für uns die Grundlage erfolgreicher Ergebnisse.",
          },
        ],
      },
      founders: {
        title: "Die Gründer",
        subtitle: "Lernen Sie die Köpfe hinter smiit kennen - Sebastian und Noah",
        flipHint: "Karte antippen für mehr",
        members: [
          {
            name: "Sebastian Grab",
            role: "Co-Founder & Software Entwickler",
            image: "/assets/people/sebastian.png",
            education: ["B.A. BWL - Industrie", "M.Sc. Digital Processes and Technologies"],
            bio: "Ich verantworte die technische Architektur und Umsetzung unserer Lösungen. Mein Fokus liegt darauf, aus Anforderungen robuste Systeme zu entwickeln – von Datenanalysen über Prozessautomatisierungen bis hin zu individuellen Web-Applikationen.",
            email: "sebastian.grab@smiit.de",
            cvLink: "https://grab.smiit.de",
            linkedIn: "https://www.linkedin.com/in/sebastian-grab/",
          },
          {
            name: "Noah Neßlauer",
            role: "Co-Founder & Business Analyst",
            image: "/assets/people/noah.png",
            education: ["B.A. BWL - Industrie", "M.Sc. Consulting & Business Analytics"],
            bio: "Ich begleite unsere Kunden von der ersten Analyse bis zur Umsetzung der passenden Lösung. Gemeinsam identifizieren wir Herausforderungen, strukturieren Anforderungen und entwickeln datengetriebene Ansätze, die wirklich Mehrwert schaffen.",
            email: "noah.nesslauer@smiit.de",
            cvLink: "https://nesslauer.smiit.de",
            linkedIn: "https://www.linkedin.com/in/noah-nesslauer/",
          },
        ],
        cvLinkText: "Lebenslauf",
        ctaText: "Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen voranbringen können.",
        ctaButton: "Kostenloses Erstgespräch buchen",
      },
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
    smiitAnalytics: {
      hero: {
        title: "Business Intelligence\nfür bexio-Nutzer",
        subtitle: "Ist Ihr Business intelligent genug?",
        description: "Wir haben erfolgreich eine Daten-Infrastruktur entwickelt, um Nutzern der bexio-Software bessere Entscheidungsfindung und strategische sowie operative Planung zu ermöglichen.",
        primaryCta: "Los gehts!",
        secondaryCta: "Erfahren Sie mehr",
      },
      features: {
        badge: "INTRODUCING",
        title: "Was ist smiit Analytics",
        titleHighlight: "für bexio?",
        subtitle: "smiit Analytics für bexio ist Ihr Weg in eine klare Zukunft. Ein System, volle Kontrolle, Information & KI-Integration!",
        items: [
          {
            title: "Vollständiges Datenmodell",
            text: "Integration aller bexio-Daten in einem System",
          },
          {
            title: "Dashboarding",
            text: "Tiefgehende Analysen für Ihre Organisation",
          },
          {
            title: "Ihr System für die Zukunft",
            text: "Ihre Infrastruktur für Add-ons und KI",
          },
        ],
      },
      advantages: {
        badge: "ADVANTAGE",
        title: "Your one-time solution,\nbuilt for the future.",
        items: [
          {
            label: "Volle Kontrolle",
            title: "Complete Ownership",
            text: "Sie erhalten die volle Kontrolle über Ihre Daten und Analysen. Kein Vendor-Lock-in, keine Abhängigkeiten – Ihr System gehört Ihnen.",
            details:
              "Sie entscheiden selbst, welche Kennzahlen Sie priorisieren, wie Datenmodelle erweitert werden und wann neue Auswertungen live gehen. Dadurch bleiben Sie bei jeder strategischen Entscheidung unabhängig und flexibel.",
          },
          {
            label: "Individualisierung & Weiterentwicklung",
            title: "Individualisierung",
            text: "Passen Sie das System individuell an Ihre Bedürfnisse an. Wir entwickeln maßgeschneiderte Analysen und Erweiterungen für Ihr Unternehmen.",
            details:
              "Gemeinsam definieren wir Ihre fachlichen Anforderungen und setzen diese strukturiert um: von spezifischen KPI-Dashboards bis zu unternehmensspezifischen Datenflüssen. So wächst die Lösung mit Ihrem Unternehmen mit.",
          },
          {
            label: "Grundgerüst für technologische Innovation",
            title: "Innovation",
            text: "Mit der Backend / smiit Analytics-Infrastruktur erhalten Sie das perfekte Gerüst für eine gesamtheitliche digitale Transformation.",
            details:
              "Die vorhandene Struktur schafft die Basis für weitere Automatisierungen, KI-Use-Cases und neue digitale Services. Damit investieren Sie nicht nur in ein Reporting-Tool, sondern in eine zukunftsfähige Datenplattform.",
          },
        ],
        learnMore: "Mehr erfahren",
        learnLess: "Weniger anzeigen",
      },
      pricing: {
        badge: "UNSER PRODUKT",
        title: "Ein pre-built System statt\nteurer Individualberatung",
        subtitle: "Die Vorteile von smiit Analytics auf einen Blick – bexio-Datenanalyse zum geringen Preis. Wir informieren Sie gerne in einem kostenlosen Call zu unserem Produkt und unseren verschiedenen Preismodellen.",
        productTitle: "smiit Analytics für bexio",
        productDescription: "Mit über 250 Analysen können Sie praktisch alles tracken, was in Ihrem Unternehmen passiert! Darüber hinaus können Sie die Analysesoftware von uns individuell anpassen lassen, um unternehmensspezifische Analysen zu erhalten. Überzeugen Sie sich über den Link von unserem Angebot.",
        priceOneTime: "CHF 1,000.00",
        priceCustom: "CHF 450.00 einmalig",
        priceCustomNote: "+ CHF 120.00 je Stunde bei 8-100 Stunden",
        or: "oder",
        features: [
          "250+ Analysen",
          "Vollständiges Datenmodell",
          "30 Tage gratis testen",
        ],
        demoLink: "Zur Demoversion",
        consultationLink: "Beratungstermin",
        freeVersionLink: "Kostenlose Version",
      },
      process: {
        badge: "PROCESS",
        title: "Der Rollout-Prozess",
        steps: [
          {
            number: "01",
            title: "Verstehen",
            text: "Wir wollen Ihre Anforderungen und Bedürfnisse verstehen.",
          },
          {
            number: "02",
            title: "Zeigen & Beraten",
            text: "Wir zeigen Ihnen das Dashboard mit Ihren Daten und beraten Sie zu potentiellen Individualisierungen.",
          },
          {
            number: "03",
            title: "Integration & Dokumentation",
            text: "Wir integrieren das Dashboard in Ihre IT-Infrastruktur und dokumentieren alle Prozesse.",
          },
          {
            number: "04",
            title: "Launch und Schulungen",
            text: "Nach dem Launch schulen wir Ihre Mitarbeiter im Umgang mit dem System.",
          },
        ],
      },
      cta: {
        title: "Begleiten Sie uns in eine\nKI-gesteuerte Zukunft!",
        button: "Vereinbaren Sie einen Termin",
      },
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
          href: "/products/smiit-analytics",
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
      overview: "Overview",
      mission: {
        title: "Our Mission & Values",
        subtitle: "We want to drive change and give our clients clear insights,\nsave valuable time, and establish modern ways of working",
        values: [
          {
            title: "Trust & Commitment",
            text: "Successful projects are built on mutual trust and commitment. We bring our expertise – and expect the same openness and involvement from our partners.",
          },
          {
            title: "Sustainable Quality",
            text: "We develop solutions that work long-term. Quality sometimes takes more time – but the result is systems that are scalable, maintainable, and sustainably usable.",
          },
          {
            title: "Collaborative Partnership",
            text:           "We don't work for our clients – we work with them. Open communication, collaboration at eye level, and joy in shared projects are the foundation of successful outcomes.",
          },
        ],
      },
      founders: {
        title: "The Founders",
        subtitle: "Meet the minds behind smiit - Sebastian and Noah",
        flipHint: "Tap card for more",
        members: [
          {
            name: "Sebastian Grab",
            role: "Co-Founder & Software Engineer",
            image: "/assets/people/sebastian.png",
            education: ["B.A. BWL - Industrie", "M.Sc. Digital Processes and Technologies"],
            bio: "I am responsible for the technical architecture and implementation of our solutions. My focus is on developing robust systems based on requirements – from data analysis and process automation to customized web applications.",
            email: "sebastian.grab@smiit.de",
            cvLink: "https://grab.smiit.de",
            linkedIn: "https://www.linkedin.com/in/sebastian-grab/",
          },
          {
            name: "Noah Neßlauer",
            role: "Co-Founder & Business Analyst",
            image: "/assets/people/noah.png",
            education: ["B.A. BWL - Industrie", "M.Sc. Consulting & Business Analytics"],
            bio: "I accompany our customers from the initial analysis to the implementation of the appropriate solution. Together, we identify challenges, structure requirements, and develop data-driven approaches that truly add value.",
            email: "noah.nesslauer@smiit.de",
            cvLink: "https://nesslauer.smiit.de",
            linkedIn: "https://www.linkedin.com/in/noah-nesslauer/",
          },
        ],
        cvLinkText: "Resume",
        ctaText: "Let's find out together how we can move your business forward.",
        ctaButton: "Book a free consultation",
      },
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
    smiitAnalytics: {
      hero: {
        title: "Business Intelligence\nfor bexio Users",
        subtitle: "Is your business intelligent enough?",
        description: "We have successfully developed a data infrastructure to enable bexio software users to make better decisions and improve strategic as well as operational planning.",
        primaryCta: "Get started!",
        secondaryCta: "Learn more",
      },
      features: {
        badge: "INTRODUCING",
        title: "What is smiit Analytics",
        titleHighlight: "for bexio?",
        subtitle: "smiit Analytics for bexio is your path to a clear future. One system, full control, information & AI integration!",
        items: [
          {
            title: "Complete Data Model",
            text: "Integration of all bexio data in one system",
          },
          {
            title: "Dashboarding",
            text: "In-depth analyses for your organization",
          },
          {
            title: "Your System for the Future",
            text: "Your infrastructure for add-ons and AI",
          },
        ],
      },
      advantages: {
        badge: "ADVANTAGE",
        title: "Your one-time solution,\nbuilt for the future.",
        items: [
          {
            label: "Full Control",
            title: "Complete Ownership",
            text: "You get full control over your data and analyses. No vendor lock-in, no dependencies – your system belongs to you.",
            details:
              "You decide which KPIs matter most, how data models evolve, and when new reports go live. This keeps your strategic decisions independent and your operations highly adaptable.",
          },
          {
            label: "Customization & Development",
            title: "Individualization",
            text: "Customize the system to your specific needs. We develop tailored analyses and extensions for your business.",
            details:
              "Together, we translate your business requirements into concrete implementation steps—from specific KPI dashboards to custom data flows. This ensures the solution scales with your company.",
          },
          {
            label: "Foundation for Technological Innovation",
            title: "Innovation",
            text: "With the backend / smiit Analytics infrastructure, you get the perfect foundation for a comprehensive digital transformation.",
            details:
              "The existing architecture enables future automation, AI use cases, and additional digital services. You are not only adopting reporting—you are building a future-ready data platform.",
          },
        ],
        learnMore: "Learn more",
        learnLess: "Show less",
      },
      pricing: {
        badge: "OUR PRODUCT",
        title: "A pre-built system instead of\nexpensive individual consulting",
        subtitle: "The advantages of smiit Analytics at a glance – bexio data analysis at a low price. We are happy to inform you in a free call about our product and our various pricing models.",
        productTitle: "smiit Analytics for bexio",
        productDescription: "With over 250 analyses, you can track practically everything happening in your company! Additionally, you can have the analysis software customized by us to receive company-specific analyses. See for yourself via the link to our offering.",
        priceOneTime: "CHF 1,000.00",
        priceCustom: "CHF 450.00 one-time",
        priceCustomNote: "+ CHF 120.00 per hour for 8-100 hours",
        or: "or",
        features: [
          "250+ Analyses",
          "Complete Data Model",
          "30 Days Free Trial",
        ],
        demoLink: "View Demo",
        consultationLink: "Book Consultation",
        freeVersionLink: "Free Version",
      },
      process: {
        badge: "PROCESS",
        title: "The Rollout Process",
        steps: [
          {
            number: "01",
            title: "Understand",
            text: "We want to understand your requirements and needs.",
          },
          {
            number: "02",
            title: "Show & Advise",
            text: "We show you the dashboard with your data and advise you on potential customizations.",
          },
          {
            number: "03",
            title: "Integration & Documentation",
            text: "We integrate the dashboard into your IT infrastructure and document all processes.",
          },
          {
            number: "04",
            title: "Launch & Training",
            text: "After launch, we train your employees on how to use the system.",
          },
        ],
      },
      cta: {
        title: "Join us on the journey to an\nAI-powered future!",
        button: "Schedule a meeting",
      },
    },
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale]
