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
      mobileCtaButton: "Kostenloses Erstgespräch buchen",
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
        periods: {
          q: "Quartal",
          h: "6 Monate",
          y: "12 Monate",
        },
        trendTooltip: {
          revenueLabel: "Umsatz",
          deltaLabel: "Δ Vormonat",
          forecastLabel: "Forecast · Konfidenz 89 %",
        },
        kpiDeltaLabels: {
          revenue: "vs. Vorjahr",
          margin: "vs. Vorjahr",
          forecastConfidence: "letzte 4 Wochen",
          activeProjects: "neu im Quartal",
        },
      },
      portfolio: {
        title: "Unser",
        titleHighlight: "Angebot",
        subtitle: "Wir unterstützen Sie dabei, den maximalen Wert aus Ihren Daten zu schöpfen – von der Strategie bis zur produktiven Analytics-Lösung.",
        learnMore: "Mehr erfahren",
        learnLess: "Weniger anzeigen",
        bookCta: "Gespräch vereinbaren",
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
      reviews: [
        {
          id: 6,
          name: "Masterhomepage GmbH",
          subtitle: "Dashboard für Zeitauswertung",
          quote:
            "Wir haben ein individuelles Dashboard von smiit erstellen lassen für die Auswertung der Zeiteinträge unserer Mitarbeiter mit Email Erinnerungsflows. Die Jungs sind sehr kompetent und äusserst freundlich. Super Service mit einem TOP Preis-/Leistungsverhältnis. Wir können smiit absolut weiterempfehlen!",
          metric: "5/5",
          metricSub: "Volle Empfehlung",
        },
        {
          id: 2,
          name: "G&B Logistics GmbH",
          subtitle: "Analysen für CRM, Buchhaltung, Disposition & HR",
          quote:
            "Mit den Auswertungen von smiit sehen wir CRM, Buchhaltung, Disposition und Mitarbeiterdaten erstmals an einer Stelle. Die Touren-, Auftrags- und Auslastungskennzahlen sind heute auf Knopfdruck verfügbar – das hat unsere monatliche Auswertung deutlich verschlankt.",
          metric: "140h",
          metricSub: "monatlich gespart",
        },
        {
          id: 1,
          name: "Dy Project AG",
          subtitle: "Datenintegration & zentrales Reporting",
          quote:
            "Endlich haben wir alle unsere Datenquellen zentral vereint. Die Datenintegration von smiit hat uns eine völlig neue Transparenz ermöglicht.",
          metric: "3→1",
          metricSub: "Berichtssysteme zusammengeführt",
        },
      ],
      cta: {
        title: "Was würde sich ändern, wenn Ihre Daten endlich miteinander reden?",
        subtitle: "30 Minuten Erstgespräch. Kostenlos. Unverbindlich. Sie erfahren, wo Ihr größter Hebel liegt — auch wenn wir am Ende nicht zusammenarbeiten.",
        primaryButton: "Kostenloses Erstgespräch",
        secondaryButton: "Kontakt aufnehmen",
      },
    },
    servicesStrategy: {
      eyebrows: {
        hero: "DIGITALE STRATEGIE",
        why: "DAS PROBLEM",
        portfolio: "WAS WIR TUN",
        manifest: "ZWISCHENRUF",
        process: "UNSER VORGEHEN",
        reviews: "STIMMEN",
        cta: "JETZT STARTEN",
      },
      manifest: {
        lead: "Tempo ohne Richtung",
        emphasis: "ist nur Lärm.",
      },
      hero: {
        title: "Eine digitale Strategie, die im Alltag trägt.",
        description:
          "Wir bringen Cloud, Sicherheit, Daten und Prozesse in eine kohärente Roadmap — mit ehrlichen Bestandsaufnahmen, klaren Prioritäten und der Umsetzungskraft, die Strategiepapiere meistens vermissen lassen.",
        primaryCta: "Strategie-Sparring vereinbaren",
        scrollHint: "Weiter scrollen",
        boardEyebrow: "Executive Intelligence Layer",
        boardTitle: "Von Datensilos zur Entscheidungsebene",
        sourcesConnected: "4 Themen · 12 Initiativen",
        updated: "aktualisiert vor 2 Min.",
        inPractice: "In der Praxis",
        swipeHint: "← Wischen zum Wechseln →",
        mobileTabTitle: "Warum",
        mobileTabTitleHighlight: "Strategie?",
        dashboardTitle: "Digital Strategy Cockpit",
        sections: {
          kpis: "Maturity-Index",
          trend: "Strategie-Roadmap",
          trendSub: "Milestones, Status und Forecast",
          signals: "Strategische Risiken",
          potentials: "Initiativen-Pipeline",
          filters: "Themen · Phasen · Risiko",
        },
        months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        kpiLabels: {
          cloud: "Cloud-Reife",
          security: "Sicherheit",
          data: "Daten",
          process: "Prozess-Reife",
        },
        chartLegend: {
          done: "Erledigt",
          progress: "In Umsetzung",
          planned: "Geplant",
        },
        signalLabels: {
          compliance: "Compliance",
          cyber: "Cyber",
          vendor: "Vendor-Lock",
          operational: "Operativ",
        },
        signalRadar: {
          title: "Risiko-Trend",
          period: "letzte 6 Monate",
        },
        segments: {
          sondieren: "Sondieren",
          konzipieren: "Konzipieren",
          umsetzen: "Umsetzen",
          verankern: "Verankern",
        },
        periods: {
          q: "Quartal",
          h: "6 Monate",
          y: "12 Monate",
        },
        trendTooltip: {
          statusDone: "Erledigt",
          statusProgress: "In Umsetzung",
          statusPlanned: "Geplant",
        },
        kpiDeltaLabels: {
          cloud: "→ Ziel",
          security: "→ Ziel",
          data: "→ Ziel",
          process: "→ Ziel",
        },
      },
      portfolio: {
        title: "Unser",
        titleHighlight: "Angebot",
        subtitle: "Wir begleiten Sie auf dem Weg zu einer digitalen Strategie, die im Alltag trägt – von der ehrlichen Bestandsaufnahme bis zur produktiven Cloud-Plattform.",
        learnMore: "Mehr erfahren",
        learnLess: "Weniger anzeigen",
        bookCta: "Gespräch vereinbaren",
        items: [
          {
            title: "Prozessoptimierung & -automatisierung",
            shortDesc: "Wir machen Geschäftsprozesse sichtbar, hinterfragen Brüche und Reibungspunkte und automatisieren, wo es sich messbar lohnt. So entstehen schlankere Abläufe, weniger Medienbrüche und Teams, die mehr Zeit für das Eigentliche haben.",
            details: "Wir starten mit einer sauberen Prozessmodellierung – von der Ist-Aufnahme über die Schwachstellen-Analyse bis zum Soll-Konzept, eng abgestimmt mit den Menschen, die den Prozess täglich leben. Dabei nutzen wir etablierte Notationen wie BPMN und halten Modelle bewusst pragmatisch und nutzbar.\n\nIm Anschluss übersetzen wir das Soll-Bild in digitalisierte Workflows – über Power Automate, individuelle Apps oder Integrationen in bestehende Systeme. Wir wählen den Weg, der zur Reife Ihrer IT-Landschaft passt, und automatisieren genau das, was nachweislich Aufwand spart oder Qualität verbessert."
          },
          {
            title: "Cloud-Infrastruktur & DevOps",
            shortDesc: "Wir bauen Ihre Azure-Landschaft so auf, dass sie skaliert, sicher ist und auch nach zwei Jahren noch verständlich bleibt. Infrastructure as Code, klare Netzwerk- und Governance-Konzepte, automatisierte Deployments – von Anfang an mitgedacht.",
            details: "Wir setzen ausschließlich auf Microsoft Azure und kennen das Ökosystem von der Tenant-Architektur bis zur einzelnen Pipeline. Konkret bauen wir Landing Zones, Hub-and-Spoke-Netzwerke, Identity- und Berechtigungskonzepte sowie durchdachte Naming- und Tagging-Strategien – abgestimmt auf Ihre Compliance- und Skalierungsanforderungen.\n\nInfrastruktur entsteht bei uns als Code (Bicep oder Terraform), nie per Klick im Portal. CI/CD-Pipelines, automatisierte Tests, Security-Scans und Dokumentation gehören zur Lieferung – damit Ihre Plattform nicht nur am Launch-Tag läuft, sondern auch im Audit, im Disaster-Recovery-Test und bei der nächsten größeren Erweiterung trägt."
          },
          {
            title: "IT-Sicherheit",
            shortDesc: "Sicherheit ist kein Produkt, das man kauft, sondern eine Disziplin, die man verankert. Wir bringen Ihre IT-Landschaft auf einen belastbaren Stand – von der ehrlichen Lagebewertung über die Härtung von Identity, Netzwerk und Daten bis zur Verankerung im Alltag.",
            details: "Wir beginnen mit einer ehrlichen Bestandsaufnahme: Wo liegen Ihre kritischen Werte, wo sind die größten Lücken, was sagen Audits – und was sagt die Realität? Aus diesem Lagebild leiten wir eine priorisierte Roadmap ab, mit Quick Wins (MFA, Patch-Disziplin, Backup-Tests) und strukturellen Maßnahmen (Zero Trust, Identity-Governance, Netzwerksegmentierung).\n\nSicherheit denken wir dabei nicht als Sonderprojekt, sondern als Querschnitt: Unsere Cloud-Architekturen sind von Grund auf gehärtet, unsere Prozessdesigns berücksichtigen Datenschutz und unsere DevOps-Pipelines integrieren Security-Scans. So entsteht ein Schutzniveau, das im Alltag trägt – ohne Ihr Tempo auszubremsen."
          }
        ]
      },
      process: {
        title: "So entwickeln wir Ihre",
        titleHighlight: "digitale Strategie.",
        subtitle: "Vier klare Schritte – von der ehrlichen Bestandsaufnahme bis zur verankerten Roadmap.",
        steps: [
          {
            number: "01",
            title: "Sondieren",
            text: "Wir nehmen Cloud-Reife, Sicherheits-Posture, Datenlandschaft und Kernprozesse unter die Lupe — ehrlich, quantifiziert, ohne Schönfärben.",
          },
          {
            number: "02",
            title: "Konzipieren",
            text: "Wir zeichnen Ihr Zielbild und priorisieren: Was bringt am meisten, was ist kritisch, was kann warten? Mit Aufwandsschätzung und Quick Wins.",
          },
          {
            number: "03",
            title: "Umsetzen",
            text: "Wir führen die Roadmap in die Praxis: Cloud-Migration, Sicherheits-Härtung, Datenfundament, Prozess-Automatisierung — iterativ, mit messbaren Etappen.",
          },
          {
            number: "04",
            title: "Verankern",
            text: "Wir übergeben sauber, schulen Ihr Team und stehen für Reviews und Weiterentwicklung bereit — damit die Strategie nicht im Schrank verschwindet.",
          },
        ],
      },
      reviewsHeading: {
        lead: "Was unsere",
        highlight: "Kunden sagen",
      },
      reviews: [
        {
          id: 7,
          name: "Azai AG",
          subtitle: "Cloud-Architektur & Governance für SaaS-Plattform",
          quote:
            "smiit hat uns beim Aufbau einer hochskalierenden SaaS-Plattform begleitet. Networking, Sicherheit und Governance waren von Anfang an Teil der Cloud-Architektur — nicht nachgereicht.",
          metric: "99,9 %",
          metricSub: "Plattform-Verfügbarkeit",
        },
        {
          id: 8,
          name: "Claimity AG",
          subtitle: "DSGVO-konforme Azure-Infrastruktur & DevOps",
          quote:
            "smiit hat unsere DSGVO-konforme Azure-Infrastruktur als Infrastructure-as-Code aufgesetzt — inklusive sauberer DevOps-Pipelines. Sechs Wochen vom Whiteboard zur produktiven SaaS-Plattform.",
          metric: "6 Wo.",
          metricSub: "von der Idee zur SaaS-Plattform",
        },
        {
          id: 2,
          name: "G&B Logistics GmbH",
          subtitle: "Stammdaten-Konsolidierung & Echtzeit-Analytics",
          quote:
            "Mit smiit haben wir Daten aus verschiedenen Systemen erstmals miteinander verbunden und unsere Stammdaten konsolidiert. Operative Prozesse laufen dadurch reibungsloser — und unsere Echtzeit-Auswertungen ziehen aus einer Quelle.",
          metric: "4→1",
          metricSub: "Systeme konsolidiert",
        },
      ],
      cta: {
        title: "Bevor Sie das nächste Tool kaufen — lassen Sie uns über Ihre Strategie reden.",
        subtitle: "30 Minuten. Kostenlos. Wir hören zu, ordnen ein und sagen Ihnen, was wir an Ihrer Stelle priorisieren würden — Cloud-Migration, Sicherheit, Datenstrategie oder Prozesse.",
        primaryButton: "Kostenloses Erstgespräch",
        secondaryButton: "Kontakt aufnehmen",
      },
    },
    servicesApps: {
      eyebrows: {
        hero: "APPS & WORKFLOWS",
        portfolio: "WAS WIR TUN",
        process: "UNSER VORGEHEN",
        reviews: "STIMMEN",
      },
      hero: {
        title: "Workflows verstehen. Apps bauen. Teams entlasten.",
        description:
          "Wir entwickeln individuelle Web-Apps, die Ihre Prozesse abbilden und Systeme verbinden – damit Ihr Team weniger klickt, sucht und wartet, und mehr liefert.",
        primaryCta: "Ideen jetzt besprechen",
        appName: "OperationsHub",
        pageTitle: "Dashboard",
        searchPlaceholder: "Suche…",
        createNewLabel: "Neuer Auftrag",
        avatarInitials: "JM",
        teamActiveLabel: "Team aktiv",
        updated: "Sync vor 2 Min.",
        views: { today: "Heute", week: "Woche", month: "Monat" },
        navItems: {
          dashboard: "Dashboard",
          orders: "Aufträge",
          customers: "Kunden",
          inventory: "Lager",
          reports: "Berichte",
          settings: "Einstellungen",
        },
        sections: {
          stats: "Kennzahlen",
          pipeline: "Auftragspipeline",
          pipelineSub: "Live · alle Phasen sichtbar",
          activity: "Live-Aktivität",
          tasks: "Offene Aufgaben",
        },
        statLabels: {
          orders: "Bestellungen",
          customers: "Aktive Kunden",
          tasks: "Offene Aufgaben",
          revenue: "Umsatz",
        },
        statDeltas: {
          orders: "vs. gestern",
          customers: "vs. gestern",
          tasks: "vs. gestern",
          revenue: "vs. gestern",
        },
        pipelineColumns: {
          incoming: "Eingang",
          active: "In Arbeit",
          done: "Erledigt",
        },
        taskPriorityLabels: {
          high: "Hoch",
          med: "Mittel",
          low: "Niedrig",
        },
      },
      reviewsHeading: {
        lead: "Was unsere",
        highlight: "Kunden sagen",
      },
      reviews: [
        {
          id: 3,
          name: "Claimity AG",
          subtitle: "SaaS-Plattform für die Versicherungsbranche",
          quote:
            "Von der Idee zur fertigen SaaS-Plattform in Rekordzeit. Das Team von smiit hat unsere Vision perfekt umgesetzt und technisch exzellent realisiert.",
          metric: "6 Wochen",
          metricSub: "von der Idee zur SaaS-Plattform",
        },
        {
          id: 7,
          name: "Bitix Media GmbH",
          subtitle: "Individuelle Verkaufs-App mit Live-Steuerung",
          quote:
            "Die individuelle App von smiit wickelt unseren gesamten Verkaufsprozess ab. Wir steuern Aktionen live und sehen sofort, wann, was und wie viel von einem Produkt bestellt und bezahlt wurde.",
          metric: "1 App",
          metricSub: "Verkauf End-to-End",
        },
        {
          id: 4,
          name: "RB Westkamp GmbH",
          subtitle: "Mitarbeiter-App für Zieltransparenz",
          quote:
            "smiit hat für uns eine Web App für unsere Mitarbeitenden entwickelt. Heute sehen unsere Mitarbeiter auf Knopfdruck, welche Ziele sie bereits erreicht haben und welches Potenzial sie noch ausschöpfen können. So haben wir unseren Vertrieb noch effizienter gestalten können.",
          metric: "Live",
          metricSub: "Vertriebsziele auf Knopfdruck",
        },
      ],
      manifest: {
        lead: "Software soll arbeiten.",
        emphasis: "Nicht beschäftigen.",
      },
      portfolio: {
        title: "Unser",
        titleHighlight: "Angebot",
        subtitle: "Wir bauen Web-Apps, Websites und Azure-Setups, die Ihre Workflows tragen – von der ersten Skizze bis zum stabilen Betrieb.",
        learnMore: "Mehr erfahren",
        learnLess: "Weniger anzeigen",
        bookCta: "Gespräch vereinbaren",
        items: [
          {
            title: "Web Applikationen & Plattformen",
            shortDesc: "Wir bauen individuelle Web-Apps und Plattformen, die Ihre Workflows abbilden, Systeme über APIs verbinden und Anwendern wirklich Arbeit abnehmen. So entstehen digitale Werkzeuge, die im Alltag funktionieren – nicht nur in der Demo.",
            details: "Wir entwickeln moderne Web-Anwendungen und SaaS-Plattformen entlang Ihres tatsächlichen Bedarfs – vom internen Tool bis zur Multi-Tenant-Lösung. Dabei verbinden wir bestehende Systeme über APIs, integrieren Authentifizierung und Berechtigungen sauber und sorgen dafür, dass Ihre App auch unter Last performt.\n\nTechnologisch setzen wir auf Next.js, React und .NET – mit klaren Architekturen, automatisierten Tests und CI/CD-Pipelines. So entstehen Anwendungen, die nicht nur in der ersten Version glänzen, sondern langfristig wartbar, sicher und skalierbar bleiben."
          },
          {
            title: "Websites & Design",
            shortDesc: "Wir gestalten und entwickeln Websites, die Ihre Marke ernst nehmen – schnell, klar strukturiert und auf Conversion ausgelegt. Ein Auftritt, der Vertrauen schafft, statt nur gut auszusehen.",
            details: "Von der ersten Skizze bis zum Go-Live: Wir entwerfen und bauen Websites, die Inhalte sauber führen, mobile-first gedacht sind und auf SEO, Performance und Barrierefreiheit achten. Dabei orientieren wir uns an Ihrer Markenidentität und sorgen für ein konsistentes visuelles System – von Typografie über Farbe bis Komponenten.\n\nTechnisch arbeiten wir mit Next.js und Headless-CMS, sodass Ihr Team Inhalte selbständig pflegen kann, ohne auf Entwickler angewiesen zu sein. Das Ergebnis: ein digitaler Auftritt, der nicht nur am Launch-Tag stark ist, sondern mit Ihrem Geschäft mitwächst."
          },
          {
            title: "Cloud Infrastruktur & Governance",
            shortDesc: "Wir bauen Ihre Cloud-Umgebung auf Microsoft Azure – sicher, kosteneffizient und nachvollziehbar. Eine Infrastruktur, die mit Ihrem Geschäft skaliert und Compliance-Anforderungen mühelos erfüllt.",
            details: "Wir konzipieren und betreiben Cloud-Architekturen auf Microsoft Azure – von Landing Zones über Identitäten und Netzwerk bis hin zu CI/CD-Pipelines und Observability. Dabei achten wir auf eine klare Governance-Struktur, sodass Ressourcen, Kosten und Berechtigungen jederzeit transparent bleiben.\n\nSchwerpunkte sind Infrastructure-as-Code mit Bicep oder Terraform, Sicherheits-Baselines nach dem Microsoft Cloud Adoption Framework und wartbare Deployment-Prozesse. So entsteht eine Azure-Umgebung, die nicht nur technisch sauber ist, sondern auch organisatorisch trägt – für stabile Apps, klare Verantwortlichkeiten und planbare Cloud-Kosten."
          }
        ]
      },
      process: {
        title: "So machen wir aus Ihren Workflows",
        titleHighlight: "produktive Apps.",
        subtitle: "Vier klare Schritte – von der ersten Idee bis zum produktiven Betrieb.",
        steps: [
          {
            number: "01",
            title: "Verstehen",
            text: "Wir analysieren Workflows, Anwender und Systemumgebung – und identifizieren, wo eine eigene App den größten Hebel bringt.",
          },
          {
            number: "02",
            title: "Konzipieren",
            text: "Wir entwerfen UX, Datenfluss und Architektur – abgestimmt auf Ihre Anwender, vorhandene Systeme und Skalierungsziele.",
          },
          {
            number: "03",
            title: "Umsetzen",
            text: "Wir entwickeln, integrieren und testen – iterativ, mit kurzen Feedbackzyklen und sauberer Übergabe.",
          },
          {
            number: "04",
            title: "Befähigen",
            text: "Wir rollen aus, schulen Ihr Team und betreuen die App im Betrieb – mit klaren SLAs und einer Roadmap für die Weiterentwicklung.",
          },
        ],
      },
      cta: {
        title: "Wie viele Stunden würde Ihr Team zurückgewinnen, wenn die Routine",
        titleHighlight: "sich selbst erledigt?",
        subtitle: "30 Minuten Erstgespräch. Kostenlos. Unverbindlich. Sie erfahren, wo sich Ihre größten Routinekiller automatisieren lassen — auch wenn wir am Ende nicht zusammenarbeiten.",
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
      button: "Kostenloses Erstgespräch buchen"
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
      mobileCtaButton: "Book a free consultation",
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
        periods: {
          q: "Quarter",
          h: "6 months",
          y: "12 months",
        },
        trendTooltip: {
          revenueLabel: "Revenue",
          deltaLabel: "Δ vs. last month",
          forecastLabel: "Forecast · 89% confidence",
        },
        kpiDeltaLabels: {
          revenue: "vs. last year",
          margin: "vs. last year",
          forecastConfidence: "last 4 weeks",
          activeProjects: "new this quarter",
        },
      },
      portfolio: {
        title: "Our",
        titleHighlight: "Portfolio",
        subtitle: "We help you extract maximum value from your data – from strategy to productive analytics solutions.",
        learnMore: "Learn more",
        learnLess: "Show less",
        bookCta: "Book a call",
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
      reviews: [
        {
          id: 6,
          name: "Masterhomepage GmbH",
          subtitle: "Dashboard for time tracking",
          quote:
            "smiit built us a custom dashboard to analyze our employees' time entries, complete with automated email reminder flows. The team is highly skilled and exceptionally friendly. Great service at an outstanding value for money. We can absolutely recommend smiit!",
          metric: "5/5",
          metricSub: "Wholehearted recommendation",
        },
        {
          id: 2,
          name: "G&B Logistics GmbH",
          subtitle: "Analyses for CRM, accounting, dispatch & HR",
          quote:
            "With smiit's analyses, we now see CRM, accounting, dispatch and employee data in a single place for the first time. Route, order and utilization KPIs are available at the click of a button — which has significantly streamlined our monthly reporting.",
          metric: "140h",
          metricSub: "saved every month",
        },
        {
          id: 1,
          name: "Dy Project AG",
          subtitle: "Data integration & central reporting",
          quote:
            "We finally have all our data sources unified in one place. smiit's data integration has given us an entirely new level of transparency.",
          metric: "3→1",
          metricSub: "reporting systems unified",
        },
      ],
      cta: {
        title: "What would change if your data finally started talking to each other?",
        subtitle: "30-minute intro call. Free. No strings attached. You'll find out where your biggest lever is — even if we don't end up working together.",
        primaryButton: "Free Consultation",
        secondaryButton: "Contact Us",
      },
    },
    servicesStrategy: {
      eyebrows: {
        hero: "DIGITAL STRATEGY",
        why: "THE PROBLEM",
        portfolio: "WHAT WE DO",
        manifest: "INTERLUDE",
        process: "HOW WE WORK",
        reviews: "VOICES",
        cta: "GET STARTED",
      },
      manifest: {
        lead: "Speed without direction",
        emphasis: "is just noise.",
      },
      hero: {
        title: "A digital strategy that holds up in daily operations.",
        description:
          "We turn cloud, security, data, and processes into a coherent roadmap — with honest assessments, clear priorities, and the execution power that strategy papers usually lack.",
        primaryCta: "Book a strategy session",
        scrollHint: "Scroll for more",
        boardEyebrow: "Executive Intelligence Layer",
        boardTitle: "From data silos to a decision layer",
        sourcesConnected: "4 themes · 12 initiatives",
        updated: "updated 2 min ago",
        inPractice: "In practice",
        swipeHint: "← Swipe to switch →",
        mobileTabTitle: "Why",
        mobileTabTitleHighlight: "Strategy?",
        dashboardTitle: "Digital Strategy Cockpit",
        sections: {
          kpis: "Maturity Index",
          trend: "Strategy Roadmap",
          trendSub: "Milestones, status and forecast",
          signals: "Strategic Risks",
          potentials: "Initiative Pipeline",
          filters: "Themes · Phases · Risk",
        },
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        kpiLabels: {
          cloud: "Cloud Maturity",
          security: "Security",
          data: "Data",
          process: "Process Maturity",
        },
        chartLegend: {
          done: "Done",
          progress: "In progress",
          planned: "Planned",
        },
        signalLabels: {
          compliance: "Compliance",
          cyber: "Cyber",
          vendor: "Vendor lock-in",
          operational: "Operational",
        },
        signalRadar: {
          title: "Risk trend",
          period: "last 6 months",
        },
        segments: {
          sondieren: "Assess",
          konzipieren: "Design",
          umsetzen: "Execute",
          verankern: "Embed",
        },
        periods: {
          q: "Quarter",
          h: "6 months",
          y: "12 months",
        },
        trendTooltip: {
          statusDone: "Done",
          statusProgress: "In progress",
          statusPlanned: "Planned",
        },
        kpiDeltaLabels: {
          cloud: "→ target",
          security: "→ target",
          data: "→ target",
          process: "→ target",
        },
      },
      portfolio: {
        title: "Our",
        titleHighlight: "Portfolio",
        subtitle: "We guide you toward a digital strategy that holds up in daily operations – from an honest assessment to a productive cloud platform.",
        learnMore: "Learn more",
        learnLess: "Show less",
        bookCta: "Book a call",
        items: [
          {
            title: "Process Optimization & Automation",
            shortDesc: "We make business processes visible, challenge breaks and friction points, and automate where it pays off measurably. The result: leaner workflows, fewer media breaks, and teams with more time for the work that matters.",
            details: "We start with clean process modeling – from a current-state assessment through pain-point analysis to a target concept, always closely aligned with the people who live the process every day. We use established notations like BPMN and keep models deliberately pragmatic and usable.\n\nWe then translate the target picture into digitalized workflows – via Power Automate, custom apps, or integrations with your existing systems. We choose the path that fits the maturity of your IT landscape, and automate exactly what demonstrably saves effort or improves quality."
          },
          {
            title: "Cloud Infrastructure & DevOps",
            shortDesc: "We build your Azure landscape so it scales, stays secure, and remains comprehensible two years down the road. Infrastructure as code, clear network and governance concepts, automated deployments – built in from day one.",
            details: "We focus exclusively on Microsoft Azure and know the ecosystem from tenant architecture down to individual pipelines. Concretely, we build landing zones, hub-and-spoke networks, identity and permission concepts, and well-thought-out naming and tagging strategies – aligned with your compliance and scaling requirements.\n\nInfrastructure is built as code (Bicep or Terraform), never clicked together in the portal. CI/CD pipelines, automated tests, security scans, and documentation are part of the delivery – so your platform doesn't just run on launch day but holds up in audits, in disaster-recovery tests, and during the next major expansion."
          },
          {
            title: "IT Security",
            shortDesc: "Security isn't a product you buy – it's a discipline you anchor. We bring your IT landscape to a resilient state, from honest situation assessment through hardening of identity, network, and data, to anchoring it in everyday operations.",
            details: "We begin with an honest assessment: where do your critical assets sit, where are the biggest gaps, what do audits say – and what does reality say? From this picture we derive a prioritized roadmap, with quick wins (MFA, patch discipline, backup tests) and structural measures (Zero Trust, identity governance, network segmentation).\n\nWe think of security not as a special project but as a cross-cutting concern: our cloud architectures are hardened from the ground up, our process designs account for data protection, and our DevOps pipelines integrate security scans. The result is a level of protection that holds up in daily operations – without slowing your tempo."
          }
        ]
      },
      process: {
        title: "How we shape your",
        titleHighlight: "digital strategy.",
        subtitle: "Four clear steps – from an honest assessment to a roadmap that sticks.",
        steps: [
          {
            number: "01",
            title: "Assess",
            text: "We take a hard look at your cloud maturity, security posture, data landscape and core processes — honest, quantified, no sugar-coating.",
          },
          {
            number: "02",
            title: "Design",
            text: "We draft your target picture and prioritize: what delivers most, what's critical, what can wait? With effort estimates and quick wins.",
          },
          {
            number: "03",
            title: "Execute",
            text: "We bring the roadmap to life: cloud migration, security hardening, data foundation, process automation — iteratively, with measurable milestones.",
          },
          {
            number: "04",
            title: "Embed",
            text: "We hand over cleanly, train your team and stay available for reviews and continuous improvement — so the strategy doesn't end up in a drawer.",
          },
        ],
      },
      reviewsHeading: {
        lead: "What our",
        highlight: "clients say",
      },
      reviews: [
        {
          id: 7,
          name: "Azai AG",
          subtitle: "Cloud architecture & governance for SaaS platform",
          quote:
            "smiit guided us in building a highly scalable SaaS platform. Networking, security, and governance were part of the cloud architecture from day one — not bolted on afterwards.",
          metric: "99.9%",
          metricSub: "platform availability",
        },
        {
          id: 8,
          name: "Claimity AG",
          subtitle: "GDPR-compliant Azure infrastructure & DevOps",
          quote:
            "smiit set up our GDPR-compliant Azure infrastructure as Infrastructure-as-Code — including clean DevOps pipelines. Six weeks from whiteboard to a productive SaaS platform.",
          metric: "6 wks",
          metricSub: "from idea to SaaS platform",
        },
        {
          id: 2,
          name: "G&B Logistics GmbH",
          subtitle: "Master data consolidation & real-time analytics",
          quote:
            "With smiit, we connected data from different systems for the first time and consolidated our master data. Operational processes run more smoothly — and our real-time analytics pull from a single source.",
          metric: "4→1",
          metricSub: "systems consolidated",
        },
      ],
      cta: {
        title: "Before you buy your next tool — let's talk about your strategy.",
        subtitle: "30 minutes. Free. We listen, sort things out, and tell you what we'd prioritize in your shoes — cloud migration, security, data strategy, or processes.",
        primaryButton: "Free Consultation",
        secondaryButton: "Contact Us",
      },
    },
    servicesApps: {
      eyebrows: {
        hero: "APPS & WORKFLOWS",
        portfolio: "WHAT WE DO",
        process: "HOW WE WORK",
        reviews: "VOICES",
      },
      hero: {
        title: "Understand workflows. Build apps. Free your team.",
        description:
          "We build custom web apps that map your processes and connect your systems – so your team clicks less, searches less, waits less, and delivers more.",
        primaryCta: "Let's talk about your idea",
        appName: "OperationsHub",
        pageTitle: "Dashboard",
        searchPlaceholder: "Search…",
        createNewLabel: "New order",
        avatarInitials: "JM",
        teamActiveLabel: "Team active",
        updated: "Synced 2 min ago",
        views: { today: "Today", week: "Week", month: "Month" },
        navItems: {
          dashboard: "Dashboard",
          orders: "Orders",
          customers: "Customers",
          inventory: "Inventory",
          reports: "Reports",
          settings: "Settings",
        },
        sections: {
          stats: "Key metrics",
          pipeline: "Order pipeline",
          pipelineSub: "Live · all stages visible",
          activity: "Live activity",
          tasks: "Open tasks",
        },
        statLabels: {
          orders: "Orders",
          customers: "Active customers",
          tasks: "Open tasks",
          revenue: "Revenue",
        },
        statDeltas: {
          orders: "vs. yesterday",
          customers: "vs. yesterday",
          tasks: "vs. yesterday",
          revenue: "vs. yesterday",
        },
        pipelineColumns: {
          incoming: "Inbox",
          active: "In progress",
          done: "Done",
        },
        taskPriorityLabels: {
          high: "High",
          med: "Medium",
          low: "Low",
        },
      },
      reviewsHeading: {
        lead: "What our",
        highlight: "clients say",
      },
      reviews: [
        {
          id: 3,
          name: "Claimity AG",
          subtitle: "SaaS Platform for the Insurance Industry",
          quote:
            "From idea to finished SaaS platform in record time. The smiit team brought our vision to life with technical excellence.",
          metric: "6 weeks",
          metricSub: "from idea to SaaS platform",
        },
        {
          id: 7,
          name: "Bitix Media GmbH",
          subtitle: "Custom Sales App with Live Control",
          quote:
            "smiit's custom app handles our entire sales process. We steer campaigns live and instantly see when, what and how much of a product was ordered and paid.",
          metric: "1 App",
          metricSub: "End-to-End Sales",
        },
        {
          id: 4,
          name: "RB Westkamp GmbH",
          subtitle: "Employee App for Goal Transparency",
          quote:
            "smiit built a web app for our employees. Today our team sees at the touch of a button which goals they've already reached and what potential is still untapped. This has made our sales operation even more efficient.",
          metric: "Live",
          metricSub: "Sales Goals at a Tap",
        },
      ],
      manifest: {
        lead: "Software should do the work.",
        emphasis: "Not be the work.",
      },
      portfolio: {
        title: "Our",
        titleHighlight: "Offering",
        subtitle: "We build web apps, websites and Azure setups that carry your workflows – from the first sketch to stable operations.",
        learnMore: "Learn more",
        learnLess: "Show less",
        bookCta: "Schedule a call",
        items: [
          {
            title: "Web Apps & Platforms",
            shortDesc: "We build custom web apps and platforms that map your workflows, connect systems through APIs, and genuinely take work off your users' shoulders. Digital tools that work in daily use – not just in the demo.",
            details: "We develop modern web applications and SaaS platforms tailored to your actual needs – from internal tools to multi-tenant solutions. We connect existing systems through APIs, integrate authentication and permissions cleanly, and ensure your app performs under load.\n\nTechnologically we work with Next.js, React and .NET – with clean architectures, automated tests and CI/CD pipelines. The result: applications that don't just shine in their first version but stay maintainable, secure and scalable long-term."
          },
          {
            title: "Websites & Design",
            shortDesc: "We design and build websites that take your brand seriously – fast, clearly structured and conversion-oriented. A presence that builds trust, not just one that looks good.",
            details: "From the first sketch to go-live: we design and build websites that lead content cleanly, are mobile-first by design, and pay attention to SEO, performance and accessibility. We align with your brand identity and ensure a consistent visual system – from typography to color to components.\n\nTechnically we work with Next.js and headless CMS, so your team can maintain content independently without depending on developers. The result: a digital presence that's not only strong on launch day but grows with your business."
          },
          {
            title: "Cloud Infrastructure & Governance",
            shortDesc: "We build your cloud environment on Microsoft Azure – secure, cost-efficient and traceable. An infrastructure that scales with your business and meets compliance requirements effortlessly.",
            details: "We design and operate cloud architectures on Microsoft Azure – from landing zones to identities and networking, all the way to CI/CD pipelines and observability. We ensure a clear governance structure, so resources, costs and permissions remain transparent at all times.\n\nFocus areas include Infrastructure-as-Code with Bicep or Terraform, security baselines based on the Microsoft Cloud Adoption Framework, and maintainable deployment processes. The result: an Azure environment that's not only technically clean but also organizationally sound – for stable apps, clear responsibilities and predictable cloud costs."
          }
        ]
      },
      process: {
        title: "How we turn your workflows into",
        titleHighlight: "productive apps.",
        subtitle: "Four clear steps – from the first idea to productive operations.",
        steps: [
          {
            number: "01",
            title: "Understand",
            text: "We map workflows, users and your system landscape – and pinpoint where a custom app delivers the biggest impact.",
          },
          {
            number: "02",
            title: "Design",
            text: "We design UX, data flow and architecture – tailored to your users, existing systems and scaling goals.",
          },
          {
            number: "03",
            title: "Build",
            text: "We build, integrate and test – iteratively, with short feedback cycles and a clean handover.",
          },
          {
            number: "04",
            title: "Enable",
            text: "We roll out, train your team and run the app in production – with clear SLAs and a roadmap for what's next.",
          },
        ],
      },
      cta: {
        title: "How many hours would your team get back if",
        titleHighlight: "routine ran itself?",
        subtitle: "30-minute intro call. Free. No strings attached. You'll find out where your biggest routine-killers can be automated — even if we don't end up working together.",
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
      button: "Book a free consultation"
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
