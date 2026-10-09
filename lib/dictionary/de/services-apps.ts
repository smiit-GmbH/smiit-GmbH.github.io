export const servicesApps = {
  eyebrows: {
    hero: "APPS & WORKFLOWS",
    portfolio: "WAS WIR TUN",
    process: "UNSER VORGEHEN",
    reviews: "STIMMEN",
  },
  hero: {
    title: "Workflows verstehen. Apps bauen. Teams entlasten.",
    description:
      "Wir entwickeln Individualsoftware und Web-Apps, die Ihre Prozesse automatisieren und Systeme über Schnittstellen verbinden – damit Ihr Team weniger klickt, sucht und wartet, und mehr liefert.",
    primaryCta: "Ideen jetzt besprechen",
    packagesLabel: "Beliebte Leistungen",
    packages: [
      "Individuelle Web Apps",
      "Prozessautomatisierung mit Power Automate",
      "API-Integration",
      "SaaS Plattformen",
      "App Wartung & Weiterentwicklung",
    ],
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
    ariaLabels: {
      timeRange: "Zeitraum",
      mainNav: "Hauptnavigation",
    },
    activeBadge: "aktiv",
    activitiesByView: {
      today: [
        { user: "J. Müller", action: "hat Auftrag #4831 angelegt", time: "vor 2 Min." },
        { user: "A. Schmidt", action: "hat Angebot freigegeben", time: "vor 14 Min." },
        { user: "T. Weber", action: "hat Lieferung bestätigt", time: "vor 38 Min." },
        { user: "M. Becker", action: "hat Zahlung erfasst", time: "vor 1 Std." },
      ],
      week: [
        { user: "J. Müller", action: "hat Auftrag #4831 angelegt", time: "vor 3 Std." },
        { user: "S. Voss", action: "hat Vertrag verlängert", time: "vor 8 Std." },
        { user: "A. Schmidt", action: "hat Mahnung versendet", time: "vor 1 Tag" },
        { user: "M. Becker", action: "hat Reklamation eröffnet", time: "vor 2 Tagen" },
      ],
      month: [
        { user: "J. Müller", action: "hat 14 Aufträge abgeschlossen", time: "vor 4 Tagen" },
        { user: "S. Voss", action: "hat 6 Verträge verlängert", time: "vor 1 Woche" },
        { user: "A. Schmidt", action: "hat 3 Großkunden onboarded", time: "vor 2 Wochen" },
        { user: "M. Becker", action: "hat Q3-Reporting abgeschlossen", time: "vor 3 Wochen" },
      ],
    },
    tasksByView: {
      today: [
        { label: "Angebot Müller GmbH freigeben", due: "heute, 17:00" },
        { label: "Lieferung Becker bestätigen", due: "heute" },
        { label: "Rechnung #4823 prüfen", due: "morgen" },
        { label: "Q4-Forecast aktualisieren", due: "diese Woche" },
      ],
      week: [
        { label: "Klein KG: Angebot kalkulieren", due: "Mi" },
        { label: "Reklamation Becker bearbeiten", due: "Mi" },
        { label: "Mahnlauf #34 freigeben", due: "Do" },
        { label: "Vertriebsmeeting vorbereiten", due: "Fr" },
      ],
      month: [
        { label: "Schäfer AG: Vertragsverhandlung", due: "diese Woche" },
        { label: "Quartalsplanung Q1 abstimmen", due: "diese Woche" },
        { label: "Provisionsabrechnung freigeben", due: "nächste Woche" },
        { label: "CRM-Daten konsolidieren", due: "diesen Monat" },
      ],
    },
  },
  reviewsHeading: {
    lead: "Was unsere",
    highlight: "Kunden sagen",
    swipeHint: "wischen →",
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
      metric: "1 System",
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
    subtitle:
      "Wir bauen Web-Apps, Websites und Azure-Setups, die Ihre Workflows tragen – von der ersten Skizze bis zum stabilen Betrieb.",
    visuals: {
      bi: {
        label: "Aktive Nutzer",
        tabs: ["Übersicht", "Berichte", "Einstellungen"],
        modules: ["Vertrieb", "Lager", "Kunden"],
        activity: "J. Müller hat Auftrag #4831 angelegt",
        moduleCount: "3 Module",
      },
    },
    learnMore: "Mehr erfahren",
    learnLess: "Weniger anzeigen",
    bookCta: "Gespräch vereinbaren",
    items: [
      {
        title: "Web Applikationen & Plattformen",
        shortDesc:
          "Wir bauen Individualsoftware – Web-Apps und Plattformen, die Ihre Workflows abbilden, Systeme über Schnittstellen (APIs) verbinden und Anwendern wirklich Arbeit abnehmen. So entstehen digitale Werkzeuge, die im Alltag funktionieren – nicht nur in der Demo.",
        details:
          "Wir entwickeln moderne Web-Anwendungen und SaaS-Plattformen entlang Ihres tatsächlichen Bedarfs – vom internen Tool bis zur Multi-Tenant-Lösung. Dabei verbinden wir bestehende Systeme über APIs, integrieren Authentifizierung und Berechtigungen sauber und sorgen dafür, dass Ihre App auch unter Last performt.\n\nTechnologisch setzen wir auf Next.js, React und .NET – mit klaren Architekturen, automatisierten Tests und CI/CD-Pipelines. So entstehen Anwendungen, die nicht nur in der ersten Version glänzen, sondern langfristig wartbar, sicher und skalierbar bleiben.",
      },
      {
        title: "Websites & Design",
        shortDesc:
          "Wir gestalten und entwickeln Websites, die Ihre Marke ernst nehmen – schnell, klar strukturiert und auf Conversion ausgelegt. Ein Auftritt, der Vertrauen schafft, statt nur gut auszusehen.",
        details:
          "Von der ersten Skizze bis zum Go-Live: Wir entwerfen und bauen Websites, die Inhalte sauber führen. Unsere Websites sind auf mobile-first, SEO, Performance und Barrierefreiheit ausgerichtet. Dabei orientieren wir uns an Ihrer Markenidentität und sorgen für ein konsistentes visuelles System – von Typografie über Farbe bis zu den Komponenten.\n\nTechnisch arbeiten wir mit Next.js und Headless-CMS, sodass Ihr Team Inhalte selbständig pflegen kann, ohne auf Entwickler angewiesen zu sein. Das Ergebnis: ein digitaler Auftritt, der nicht nur am Launch-Tag stark ist, sondern mit Ihrem Geschäft mitwächst.",
      },
      {
        title: "Cloud Infrastruktur & Governance",
        shortDesc:
          "Wir bauen Ihre Cloud-Umgebung auf Microsoft Azure – sicher, kosteneffizient und nachvollziehbar. Eine Infrastruktur, die mit Ihrem Geschäft skaliert und Compliance-Anforderungen mühelos erfüllt.",
        details:
          "Wir konzipieren und betreiben Cloud-Architekturen auf Microsoft Azure – von Landing Zones über Identitäten und Netzwerk bis hin zu CI/CD-Pipelines und Observability. Dabei achten wir auf eine klare Governance-Struktur, sodass Ressourcen, Kosten und Berechtigungen jederzeit transparent bleiben.\n\nSchwerpunkte sind Infrastructure-as-Code mit Bicep oder Terraform, Sicherheits-Baselines nach dem Microsoft Cloud Adoption Framework und wartbare Deployment-Prozesse. So entsteht eine Azure-Umgebung, die nicht nur technisch sauber ist, sondern auch organisatorisch trägt – für stabile Apps, klare Verantwortlichkeiten und planbare Cloud-Kosten.",
      },
    ],
  },
  process: {
    title: "So machen wir aus Ihren Workflows",
    titleHighlight: "produktive Apps.",
    subtitle: "Vier klare Schritte – von der ersten Idee bis zum produktiven Betrieb.",
    stepLabel: "Schritt",
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
  faq: {
    eyebrow: "HÄUFIGE FRAGEN",
    heading: { lead: "Antworten auf das, was", highlight: "oft gefragt wird" },
    items: [
      {
        question: "Wie lange dauert die Entwicklung einer individuellen Web-App?",
        answer:
          "Vom ersten Konzept bis zum Go-Live dauert es je nach Umfang ca. 6-12 Wochen. Wir liefern in kurzen Iterationen, sodass Sie die Ergebnisse frühzeitig & produktiv nutzen können — nicht erst nach Monaten Entwicklung.",
      },
      {
        question: "Wem gehört der Code am Ende?",
        answer:
          "Ihnen. Sie erhalten den vollen Source-Code und die Dokumentation und können später selbst weiterentwickeln oder den Anbieter wechseln. Kein Vendor-Lock-in.",
      },
      {
        question: "Welchen Tech-Stack verwendet ihr?",
        answer:
          "Im Backend setzen wir auf .NET, im Frontend auf JavaScript und TypeScript mit React und Next.js. Bewusst ein fokussierter Stack — keine Framework-Wildwestern, sondern eingespielte Technologien, die wir produktiv beherrschen und langfristig wartbar halten.",
      },
      {
        question: "Was kostet die Wartung nach dem Go-Live?",
        answer:
          "Sie entscheiden. Wir bieten Wartungspakete an, oder Sie übernehmen die Wartung selbst. Da Code und Dokumentation Ihnen gehören, sind Sie nicht von uns abhängig — wir bleiben gerne, weil wir gut sind, nicht weil Sie nicht wegkönnen.",
      },
      {
        question: "Wie geht ihr mit DSGVO und Datenhaltung um?",
        answer:
          "DSGVO-konforme Architektur ist Standard, nicht Option. Wir setzen Hosting in der EU oder Schweiz auf, dokumentieren Datenflüsse vollständig und unterstützen bei Auftragsverarbeitungsverträgen.",
      },
    ],
  },
  cta: {
    title: "Wie viele Stunden würde Ihr Team zurückgewinnen, wenn sich die",
    titleHighlight: "Routine selbst erledigt?",
    subtitle:
      "30 Minuten Erstgespräch. Kostenlos. Unverbindlich. Sie erfahren, wo sich Ihre größten Routinekiller automatisieren lassen — auch wenn wir am Ende nicht zusammenarbeiten.",
    primaryButton: "Kostenloses Erstgespräch",
    secondaryButton: "Kontakt aufnehmen",
  },
  relatedLink: {
    text: "Automatisierte Workflows entfalten ihren Wert erst mit klaren Daten — entdecken Sie unsere Datenanalyse-Leistungen.",
    linkLabel: "Zur Datenanalyse",
    href: "/services/analytics",
  },
}
