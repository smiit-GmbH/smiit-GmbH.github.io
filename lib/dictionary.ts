export type Locale = 'de' | 'en'

const dictionaries = {
  de: {
    hero: {
      title: "Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
      subtitle: "Digitale Lösungen für Anwendungen, Workflows, Datenanalyse und digitale Strategie",
      cta: "Starten Sie Ihre Transformation",
    },
    about: {
      title: "smiit hilft Unternehmen,\nDaten in Handlungen zu verwandeln",
      text: "Wir stehen an Ihrer Seite.\nDurch Apps, Dashboards und Workflows — für mehr\nProduktivität und schnellere Entscheidungen.",
    },
    services: {
      title: "Workflows für messbaren Impact",
      subtitle:
        "Bei smiit entwickeln wir Apps, Workflows und Analytics — damit Ihr Business schneller vorankommt.",
      items: [
        {
          title: "Digitale Strategie",
          tags: ["Beratung", "Prozesse", "IT"],
          text: "Wir unterstützen den Mittelstand mit IT-Beratung und digitaler Strategie — mit Fokus auf Apps, Workflows und Daten. Praktisch, pragmatisch und umsetzungsstark.",
        },
        {
          title: "Datenanalyse",
          tags: ["Power BI", "SQL & Python", "Azure"],
          text: "Wir verwandeln Ihre Daten in klare Dashboards und KPIs — schnell, aussagekräftig und direkt handlungsorientiert.",
        },
        {
          title: "Apps & Workflows",
          tags: [".NET", "React", "Next.js"],
          text: "Wir bauen intuitive Web-Apps, die Eingaben vereinfachen, Systeme über APIs verbinden und Workflows automatisieren — sicher und skalierbar.",
        },
      ],
      mobileCta: "Sie haben Fragen zu unseren Dienstleistungen? Buchen Sie gerne ein kostenloses und unverbindliches Erstgespräch mit uns.",
      mobileCtaButton: "Sprechen Sie mit uns",
    },
    servicesAnalytics: {
      eyebrows: {
        hero: "DATENANALYSE",
        why: "DAS PROBLEM",
        portfolio: "WAS WIR TUN",
        manifest: "ZWISCHENRUF",
        process: "UNSER VORGEHEN",
        reviews: "STIMMEN",
        cta: "JETZT STARTEN",
      },
      manifest: {
        lead: "Daten haben Sie genug.",
        emphasis: "Klarheit ist die Arbeit.",
      },
      hero: {
        title: "Daten verstehen. Chancen erkennen. Besser entscheiden.",
        description:
          "Wir verdichten verstreute Datenquellen zu einer klaren Entscheidungsebene – damit Teams schneller sehen, was passiert, was relevant wird und was als Nächstes zu tun ist.",
        primaryCta: "Jetzt Datenpotenziale entdecken",
        scrollHint: "Weiter scrollen",
        boardEyebrow: "Executive Intelligence Layer",
        boardTitle: "Von Datensilos zur Entscheidungsebene",
        sourcesConnected: "5 Datenquellen verbunden",
        updated: "aktualisiert vor 2 Min.",
        inPractice: "In der Praxis",
        swipeHint: "← Wischen zum Wechseln →",
        mobileTabTitle: "Warum",
        mobileTabTitleHighlight: "Datenanalyse?",
        tabs: {
          speed: "Entscheidungstempo",
          clarity: "Datenklarheit",
          profit: "Margenkontrolle",
          ai: "KI-Signale",
        },
        sections: {
          kpis: "Zentrale Kennzahlen",
          trend: "Umsatz & Marge · 12 Monate",
          trendSub: "Entwicklung über Zeit, mit Forecast ab Q4",
          actions: "Priorisierte Maßnahmen",
          signals: "Frühwarnsignale",
          potentials: "Segmentpotenziale",
          insights: "Executive Insights",
          filters: "Zeitraum · Segmente · Vergleich",
        },
        months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        story: {
          speed: {
            step: "Kapitel 1",
            label: "Entscheidungstempo",
            pain: "Sie raten zu viel.",
            gain: "Priorisierte Maßnahmen.",
            title: "Schluss mit Daten-Pingpong.",
            body: "Eine Datenbasis. Keine Rückfragen. Direkt sichtbar, was jetzt zählt – und wer was tun sollte.",
            emphasis: "Entscheidungen entstehen dort, wo die Daten sind.",
          },
          clarity: {
            step: "Kapitel 2",
            label: "Datenklarheit",
            pain: "Daten in Silos.",
            gain: "Eine einzige Wahrheit.",
            title: "Ein gemeinsames Bild für alle Ebenen.",
            body: "Vertrieb, Projekte, Operations – alles in einer Sicht. Kein Suchen. Kein Vergleichen. Kein Streit über Zahlen.",
            emphasis: "Transparenz ist keine Frage des Vertrauens – sondern der Infrastruktur.",
          },
          profit: {
            step: "Kapitel 3",
            label: "Margenkontrolle",
            pain: "Margen entgleiten unbemerkt.",
            gain: "Forecast mit 89% Konfidenz.",
            title: "Wachstum sehen, bevor es passiert.",
            body: "Forecasts und Margentrends zeigen, wo Momentum entsteht – und wo Sie früh gegensteuern sollten.",
            emphasis: "Der stärkste Hebel liegt in der Margenqualität.",
          },
          ai: {
            step: "Kapitel 4",
            label: "KI-Signale",
            pain: "Frühwarnung kommt zu spät.",
            gain: "KI-Signale rund um die Uhr.",
            title: "Muster erkennen, die Menschen übersehen.",
            body: "KI erkennt Abweichungen, Chancen und Risiken automatisch – bevor sie überhaupt in Reports auftauchen.",
            emphasis: "Intelligente Analysen arbeiten rund um die Uhr.",
          },
        },
        kpiLabels: {
          revenue: "Umsatz",
          margin: "Deckungsbeitrag",
          forecastConfidence: "Genauigkeit",
          activeProjects: "Aktive Projekte",
        },
        chartLegend: {
          actual: "Ist",
          forecast: "Forecast",
        },
        signalLabels: {
          forecastRisk: "Forecast-Risiko",
          forecastRiskValue: "Mittel",
          deviation: "Abweichung",
          opportunityScore: "Opportunity Score",
          trendStrength: "Trendstärke",
        },
        signalRadar: {
          title: "KI-Signalradar",
          period: "letzte 30 Tage",
        },
        segments: {
          dach: "Bestandskunden DACH",
          swiss: "Projektgeschäft Schweiz",
          serviceUpsell: "Service-Upsell",
          industrialLeads: "Neue Leads Industrie",
        },
        dashboard: {
          eyebrow: "Datenanalyse und Künstliche Intelligenz",
          heading: "Live-Einblicke für Vertrieb, Finanzen und Operations",
          chartLabel: "Umsatzentwicklung",
          chartValue: "+18,4 %",
          chartTrend: "im Vergleich zum Vormonat",
          months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul"],
          kpis: [
            {
              label: "Forecast Accuracy",
              value: "94 %",
            },
            {
              label: "Automatisierte Reports",
              value: "28",
            },
            {
              label: "Aktive Datenquellen",
              value: "12",
            },
          ],
          insightsTitle: "Empfohlene Maßnahmen",
          insights: [
            "Absatztrend im Süden steigt seit 3 Wochen",
            "Marge bei Top-Produktgruppe über Zielwert",
            "Lagerbestand für A-Kategorie frühzeitig optimieren",
          ],
        },
      },
      why: {
        title: "Daten in Silos. Entscheidungen im Dunkeln.",
        titleHighlight: "Das sind Probleme, die wir lösen.",
        subtitle: "Wir verbinden Ihre Quellen zu einer Sicht, auf die sich alle gleichermaßen verlassen können.",
      },
      portfolio: {
        title: "Unser",
        titleHighlight: "Angebot",
        subtitle: "Wir unterstützen Sie dabei, den maximalen Wert aus Ihren Daten zu schöpfen – von der Strategie bis zur produktiven Analytics-Lösung.",
        learnMore: "Mehr erfahren",
        learnLess: "Weniger anzeigen",
        items: [
          {
            title: "Business Intelligence & Dashboarding",
            shortDesc: "Wir verwandeln verteilte Daten in eine belastbare Entscheidungsgrundlage – mit sauberer Datenintegration, klaren Modellen und Dashboards, die wirklich genutzt werden. So entstehen Reports und Analysen, die Transparenz schaffen und Führung wirksam unterstützen.",
            details: "Wir begleiten den gesamten Weg von der Rohdatenquelle bis zur entscheidungsrelevanten Visualisierung. Dazu gehören die Integration und Aufbereitung von Daten, der Aufbau performanter Datenmodelle, die Entwicklung einer semantischen Schicht sowie die Gestaltung von Dashboards für Management, Controlling und operative Teams.\n\nTechnologisch arbeiten wir schwerpunktmäßig im Microsoft-Umfeld – unter anderem mit Power BI und Fabric. Dabei achten wir nicht nur auf Technik, sondern vor allem auf eine Struktur, die mit Ihrem Unternehmen mitwachsen kann."
          },
          {
            title: "Data Governance & Datenstrategie",
            shortDesc: "Wir schaffen die organisatorischen und fachlichen Grundlagen dafür, dass Daten im Unternehmen konsistent, verständlich und vertrauenswürdig genutzt werden können. Das sorgt für weniger Reibung, bessere Entscheidungen und deutlich mehr Wirkung aus bestehenden Dateninitiativen.",
            details: "Wir beraten zu zentralen Fragestellungen rund um Data Governance, Master Data Management, Datenverantwortung, Kennzahlendefinitionen und den sinnvollen Aufbau von Self-Service-Analytics-Strukturen. Ziel ist es, Datennutzung nicht dem Zufall zu überlassen, sondern klare Rahmenbedingungen zu schaffen, die Skalierung und Verlässlichkeit ermöglichen.\n\nDabei betrachten wir nicht nur Prozesse und Systeme, sondern auch die organisatorische Seite. So entsteht eine Datenstrategie, die nicht theoretisch bleibt, sondern im Unternehmen greift."
          },
          {
            title: "Machine Learning & ML Operations",
            shortDesc: "Wir bringen KI aus der Konzeptphase in den produktiven Einsatz – strukturiert, skalierbar und technisch sauber. So entstehen Machine-Learning-Lösungen, die nicht nur beeindrucken, sondern im Alltag echten Mehrwert liefern.",
            details: "Wir unterstützen bei der Konzeption, Entwicklung und Operationalisierung von ML-Modellen – von der Datenaufbereitung und Feature-Entwicklung über Training und Validierung bis hin zur Bereitstellung in produktiven Umgebungen. Dabei steht nicht nur die Modellgüte im Fokus, sondern auch die Frage, wie KI stabil, nachvollziehbar und wartbar in bestehende Prozesse integriert werden kann.\n\nIm Zentrum steht ein praxisnaher MLOps-Ansatz mit klaren Deployments, reproduzierbaren Workflows, Überwachung von Modellen und einer sauberen Verbindung zwischen Data Science und Betrieb."
          }
        ]
      },
      process: {
        title: "So machen wir aus Ihren Daten",
        titleHighlight: "Entscheidungen.",
        subtitle: "Vier klare Schritte – vom ersten Gespräch bis zum produktiven Betrieb.",
        steps: [
          {
            number: "01",
            title: "Verstehen",
            text: "Wir analysieren Datenlandschaft, Quellen und Ziele – und identifizieren die Hebel mit dem größten Wirkungsgrad.",
          },
          {
            number: "02",
            title: "Konzipieren",
            text: "Wir entwerfen Datenmodell, Dashboards und Governance, abgestimmt auf Ihre Entscheidungswege und Ihr Tooling.",
          },
          {
            number: "03",
            title: "Umsetzen",
            text: "Wir bauen, integrieren und dokumentieren – iterativ, mit kurzen Feedbackzyklen und sauberer Übergabe.",
          },
          {
            number: "04",
            title: "Befähigen",
            text: "Wir schulen Ihr Team, sichern den Betrieb und entwickeln Ihre Analytics-Plattform schrittweise weiter.",
          },
        ],
      },
      reviewsHeading: {
        lead: "Was unsere",
        highlight: "Kunden sagen",
      },
      cta: {
        title: "Sind Sie bereit für den nächsten Schritt?",
        subtitle: "Lassen Sie uns gemeinsam herausfinden, wie wir Ihre Daten optimal nutzen können.",
        primaryButton: "Kostenloses Erstgespräch",
        secondaryButton: "Kontakt aufnehmen",
      },
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
            image: "/assets/people/sebastian.webp",
            education: ["B.A. BWL - Industrie", "M.Sc. Digital Processes and Technologies"],
            bio: "Ich verantworte die technische Architektur und Umsetzung unserer Lösungen. Mein Fokus liegt darauf, aus Anforderungen robuste Systeme zu entwickeln – von Datenanalysen über Prozessautomatisierungen bis hin zu individuellen Web-Applikationen.",
            email: "sebastian.grab@smiit.de",
            cvLink: "https://grab.smiit.de",
            linkedIn: "https://www.linkedin.com/in/sebastian-grab/",
          },
          {
            name: "Noah Neßlauer",
            role: "Co-Founder & Business Analyst",
            image: "/assets/people/noah.webp",
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
      closing: {
        lead: "smiit ist Ihr Partner für",
        highlight: "langlebige Softwarelösungen,",
        tail: "die Ihre Prozesse heute vereinfachen — und morgen noch effizienter machen.",
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
          "Digitale Unternehmensstrategie",
          "Datenanalyse",
          "Apps & Workflows",
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
          image: "/assets/people/sebastian.webp",
          email: "sebastian.grab@smiit.de",
          cvLink: "https://grab.smiit.de",
        },
        {
          name: "Noah Neßlauer",
          role: "Business Analyst",
          image: "/assets/people/noah.webp",
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
      subtitle: "Digital solutions for applications, workflows, data analytics, and digital strategy",
      cta: "Start your transformation",
    },
    about: {
      title: "smiit helps businesses\nto turn data into action",
      text: "We are by your side.\nThrough apps, dashboards, and workflows — boosting\nproductivity and accelerating decisions.",
    },
    services: {
      title: "Workflows for measurable impact",
      subtitle: "At smiit, we build apps, workflows, and analytics that move your business forward.",
      items: [
        {
          title: "Digital strategy",
          tags: ["Consulting", "Processes", "IT"],
          text: "We guide SMEs with IT consulting and digital strategy focused on apps, workflows, and data — practical and actionable.",
        },
        {
          title: "Data analytics",
          tags: ["Power BI", "SQL & Python", "Azure"],
          text: "We turn your data into clear dashboards and KPIs — fast, insightful, and ready for action.",
        },
        {
          title: "Apps & workflows",
          tags: [".NET", "React", "Next.js"],
          text: "We create intuitive web apps that simplify inputs, connect systems via API, and automate workflows — secure and scalable.",
        },
      ],
      mobileCta: "Have questions about our services? Book a free, no-obligation introductory call with us.",
      mobileCtaButton: "Talk to a digital expert",
    },
    servicesAnalytics: {
      eyebrows: {
        hero: "DATA ANALYTICS",
        why: "THE PROBLEM",
        portfolio: "WHAT WE DO",
        manifest: "INTERLUDE",
        process: "HOW WE WORK",
        reviews: "VOICES",
        cta: "GET STARTED",
      },
      manifest: {
        lead: "You already have data.",
        emphasis: "Clarity is the work.",
      },
      hero: {
        title: "Understand data. Spot opportunities. Decide better.",
        description:
          "We turn fragmented data sources into a clear decision layer — so teams can see faster what is happening, what matters, and what to do next.",
        primaryCta: "Discover the potential of your data",
        scrollHint: "Scroll for more",
        boardEyebrow: "Executive Intelligence Layer",
        boardTitle: "From data silos to a decision layer",
        sourcesConnected: "5 connected data sources",
        updated: "updated 2 min ago",
        inPractice: "In practice",
        swipeHint: "← Swipe to switch →",
        mobileTabTitle: "Why",
        mobileTabTitleHighlight: "Data Analytics?",
        tabs: {
          speed: "Decision speed",
          clarity: "Data clarity",
          profit: "Margin control",
          ai: "AI signals",
        },
        sections: {
          kpis: "Core metrics",
          trend: "Revenue & margin · 12 months",
          trendSub: "Performance over time, with forecast from Q4",
          actions: "Prioritized actions",
          signals: "Early signals",
          potentials: "Segment potential",
          insights: "Executive insights",
          filters: "Timeframe · Segments · Compare",
        },
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        story: {
          speed: {
            step: "Chapter 1",
            label: "Decision speed",
            pain: "You guess too much.",
            gain: "Prioritized actions.",
            title: "End the data ping-pong.",
            body: "One data source. No back-and-forth. Instantly clear what matters now – and who needs to act.",
            emphasis: "Decisions happen where the data is.",
          },
          clarity: {
            step: "Chapter 2",
            label: "Data clarity",
            pain: "Data trapped in silos.",
            gain: "One single source of truth.",
            title: "One shared picture for every level.",
            body: "Sales, projects, operations – all in one view. No searching. No reconciling. No arguing about numbers.",
            emphasis: "Transparency is not a matter of trust — it is a matter of infrastructure.",
          },
          profit: {
            step: "Chapter 3",
            label: "Margin control",
            pain: "Margins slip away unnoticed.",
            gain: "Forecasts at 89% confidence.",
            title: "See growth before it happens.",
            body: "Forecasts and margin trends reveal where momentum is building – and where to steer early.",
            emphasis: "The strongest lever is margin quality.",
          },
          ai: {
            step: "Chapter 4",
            label: "AI signals",
            pain: "Early warnings arrive too late.",
            gain: "AI signals around the clock.",
            title: "Spot patterns humans miss.",
            body: "AI detects deviations, opportunities and risks automatically – before they ever hit a report.",
            emphasis: "Intelligent analytics work around the clock.",
          },
        },
        kpiLabels: {
          revenue: "Revenue",
          margin: "Margin",
          forecastConfidence: "Accuracy",
          activeProjects: "Active projects",
        },
        chartLegend: {
          actual: "Actual",
          forecast: "Forecast",
        },
        signalLabels: {
          forecastRisk: "Forecast risk",
          forecastRiskValue: "Medium",
          deviation: "Deviation",
          opportunityScore: "Opportunity score",
          trendStrength: "Trend strength",
        },
        signalRadar: {
          title: "AI signal radar",
          period: "last 30 days",
        },
        segments: {
          dach: "DACH existing clients",
          swiss: "Swiss projects",
          serviceUpsell: "Service upsell",
          industrialLeads: "Industrial new leads",
        },
        dashboard: {
          eyebrow: "Data Analytics and Artificial Intelligence",
          heading: "Live insights for sales, finance, and operations",
          chartLabel: "Revenue performance",
          chartValue: "+18.4%",
          chartTrend: "compared to last month",
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          kpis: [
            {
              label: "Forecast accuracy",
              value: "94%",
            },
            {
              label: "Automated reports",
              value: "28",
            },
            {
              label: "Active data sources",
              value: "12",
            },
          ],
          insightsTitle: "Recommended actions",
          insights: [
            "Demand trend in the south has increased for 3 weeks",
            "Margin for the top product cluster is above target",
            "Optimize stock levels for category A earlier",
          ],
        },
      },
      why: {
        title: "Data in silos. Decisions in the dark.",
        titleHighlight: "These are problems we can solve.",
        subtitle: "We connect your sources into one view that everyone can rely on.",
      },
      portfolio: {
        title: "Our",
        titleHighlight: "Portfolio",
        subtitle: "We help you extract maximum value from your data – from strategy to productive analytics solutions.",
        learnMore: "Learn more",
        learnLess: "Show less",
        items: [
          {
            title: "Business Intelligence & Dashboarding",
            shortDesc: "We turn distributed data into a reliable basis for decision-making – with clean data integration, clear models, and dashboards that are actually used. This creates reports and analyses that provide transparency and effectively support leadership.",
            details: "We accompany the entire journey from the raw data source to decision-relevant visualization. This includes the integration and preparation of data, the construction of high-performance data models, the development of a semantic layer, and the design of dashboards for management, controlling, and operational teams.\n\nTechnologically, we focus primarily on the Microsoft environment – including Power BI and Fabric. We pay attention not only to technology but above all to a structure that can grow with your company."
          },
          {
            title: "Data Governance & Data Strategy",
            shortDesc: "We create the organizational and technical foundations so that data can be used consistently, understandably, and reliably in the company. This ensures less friction, better decisions, and significantly more impact from existing data initiatives.",
            details: "We advise on central issues relating to data governance, master data management, data responsibility, KPI definitions, and the sensible setup of self-service analytics structures. The goal is not to leave data usage to chance, but to create clear frameworks that enable scaling and reliability.\n\nWe look not only at processes and systems but also at the organizational side. This creates a data strategy that does not remain theoretical but takes effect in the company."
          },
          {
            title: "Machine Learning & ML Operations",
            shortDesc: "We bring AI from the concept phase into productive use – structured, scalable, and technically clean. This creates machine learning solutions that not only impress but deliver real added value in everyday life.",
            details: "We support the conception, development, and operationalization of ML models – from data preparation and feature engineering to training and validation, all the way to deployment in productive environments. The focus is not only on model quality but also on how AI can be integrated into existing processes in a stable, traceable, and maintainable way.\n\nAt the center is a practical MLOps approach with clear deployments, reproducible workflows, model monitoring, and a clean connection between data science and operations."
          }
        ]
      },
      process: {
        title: "How we turn your data into",
        titleHighlight: "decisions.",
        subtitle: "Four clear steps – from the first conversation to productive operations.",
        steps: [
          {
            number: "01",
            title: "Understand",
            text: "We map your data landscape, sources and goals – and pinpoint the levers with the highest impact.",
          },
          {
            number: "02",
            title: "Design",
            text: "We craft data model, dashboards and governance, tailored to your decision flows and tooling.",
          },
          {
            number: "03",
            title: "Build",
            text: "We build, integrate and document – iteratively, with short feedback cycles and a clean handover.",
          },
          {
            number: "04",
            title: "Enable",
            text: "We train your team, secure operations and evolve your analytics platform step by step.",
          },
        ],
      },
      reviewsHeading: {
        lead: "What our",
        highlight: "clients say",
      },
      cta: {
        title: "Are you ready for the next step?",
        subtitle: "Let's find out together how we can make the most of your data.",
        primaryButton: "Free Consultation",
        secondaryButton: "Contact Us",
      },
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
            text: "We don't work for our clients – we work with them. Open communication, collaboration at eye level, and joy in shared projects are the foundation of successful outcomes.",
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
            image: "/assets/people/sebastian.webp",
            education: ["B.A. BWL - Industrie", "M.Sc. Digital Processes and Technologies"],
            bio: "I am responsible for the technical architecture and implementation of our solutions. My focus is on developing robust systems based on requirements – from data analysis and process automation to customized web applications.",
            email: "sebastian.grab@smiit.de",
            cvLink: "https://grab.smiit.de",
            linkedIn: "https://www.linkedin.com/in/sebastian-grab/",
          },
          {
            name: "Noah Neßlauer",
            role: "Co-Founder & Business Analyst",
            image: "/assets/people/noah.webp",
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
      closing: {
        lead: "smiit is your partner for",
        highlight: "lasting software solutions",
        tail: "that simplify your processes today — and make them even more efficient tomorrow.",
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
          "Digital strategy",
          "Data analytics",
          "Apps & workflows",
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
          image: "/assets/people/sebastian.webp",
          email: "sebastian.grab@smiit.de",
          cvLink: "https://grab.smiit.de",
        },
        {
          name: "Noah Neßlauer",
          role: "Business Analyst",
          image: "/assets/people/noah.webp",
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
