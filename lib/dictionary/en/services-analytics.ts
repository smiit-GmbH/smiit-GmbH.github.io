import type { Dictionary } from "@/lib/dictionary"

export const servicesAnalytics: Dictionary["servicesAnalytics"] = {
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
      "We turn fragmented data sources into a clear decision layer — built in Power BI and the Microsoft stack, so teams can see faster what is happening, what matters, and what to do next.",
    primaryCta: "Discover the potential of your data",
    packagesLabel: "Popular services",
    packages: [
      "Power BI Dashboards",
      "Data Platform & BI Concept",
      "Power BI Health Check",
      "Microsoft Fabric",
      "Power BI Redesign",
      "Machine Learning & MLOps",
    ],
    scrollHint: "Scroll for more",
    boardEyebrow: "Executive Intelligence Layer",
    boardTitle: "From data silos to a decision layer",
    sourcesConnected: "5 connected data sources",
    platform: "Power BI",
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
    ariaLabels: {
      timeRange: "Time range",
    },
    dashboardTitle: "Management Dashboard",
    millionSuffix: "M",
    bottomLabels: {
      q: ["W 1", "W 4", "W 7", "W 10", "W 12"],
      h: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      y: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    linePointLabels: {
      q: ["W 1", "W 4", "W 7", "W 10", "W 12"],
      h: ["Jul", "Aug", "Sep", "Oct", "Nov"],
      y: ["Jan", "Apr", "Jul", "Sep", "Nov"],
    },
    forecastPointLabels: {
      q: "W 13",
      h: "Dec",
      y: "Dec",
    },
    signalValues: {
      riskMedium: "Medium",
      riskLow: "Low",
      riskHigh: "High",
    },
  },
  portfolio: {
    title: "Our",
    titleHighlight: "Portfolio",
    subtitle: "We help you extract maximum value from your data – from strategy to a productive Power BI solution.",
    visuals: {
      bi: { label: "Revenue Q3", kpiRevenue: "Revenue", target: "Target" },
      governance: { badge: "GDPR" },
    },
    learnMore: "Learn more",
    learnLess: "Show less",
    bookCta: "Book a call",
    items: [
      {
        title: "Business Intelligence & Dashboarding",
        shortDesc:
          "We turn distributed data into a reliable basis for decision-making – with clean data integration, clear models, and Power BI dashboards that are actually used. This creates reports and analyses in Power BI and Microsoft Fabric that provide transparency and effectively support leadership.",
        details:
          "We accompany the entire journey from the raw data source to decision-relevant visualization. This includes the integration and preparation of data, the construction of high-performance data models, the development of a semantic layer, and the design of dashboards for management, controlling, and operational teams.\n\nTechnologically, we focus primarily on the Microsoft environment – including Power BI and Fabric. We pay attention not only to technology but above all to a structure that can grow with your company.",
      },
      {
        title: "Data Governance & Data Strategy",
        shortDesc:
          "We create the organizational and technical foundations so that data can be used consistently, clearly, and reliably across the company. This ensures less friction, better decisions, and significantly more impact from existing data initiatives.",
        details:
          "We advise on central issues relating to data governance, master data management, data responsibility, KPI definitions, and the sensible setup of self-service analytics structures. The goal is not to leave data usage to chance, but to create clear frameworks that enable scaling and reliability.\n\nWe look not only at processes and systems but also at the organizational side. This creates a data strategy that does not remain theoretical but takes effect in the company.",
      },
      {
        title: "Machine Learning & ML Operations",
        shortDesc:
          "We bring AI from the concept phase into productive use – structured, scalable, and technically clean. This creates machine learning solutions that not only impress but deliver real added value in everyday life.",
        details:
          "We support the conception, development, and operationalization of ML models – from data preparation and feature engineering to training and validation, all the way to deployment in productive environments. The focus is not only on model quality but also on how AI can be integrated into existing processes in a stable, traceable, and maintainable way.\n\nAt the center is a practical MLOps approach with clear deployments, reproducible workflows, model monitoring, and a clean connection between data science and operations.",
      },
    ],
  },
  process: {
    title: "How we turn your data into",
    titleHighlight: "decisions.",
    subtitle: "Four clear steps – from the first conversation to productive operations.",
    stepLabel: "Step",
    steps: [
      {
        number: "01",
        title: "Understand",
        text: "We map your data landscape, sources and goals – and pinpoint the levers with the highest impact.",
      },
      {
        number: "02",
        title: "Design",
        text: "We craft data model, Power BI dashboards and governance, tailored to your decision flows and tooling.",
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
    swipeHint: "swipe →",
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
  faq: {
    eyebrow: "FREQUENTLY ASKED",
    heading: { lead: "Answers to the things", highlight: "people ask most" },
    items: [
      {
        question: "How fast will we see results?",
        answer:
          "We always start with an intro call to identify the biggest lever. First dashboards typically go live within a few weeks — sometimes even days — often before the full data model is in place.",
      },
      {
        question: "Do we need to switch our existing tools?",
        answer:
          "No. We work within your existing tool landscape, primarily in the Microsoft ecosystem with Power BI and Fabric. Tool migration is never our starting point.",
      },
      {
        question: "How do you handle our sensitive business data?",
        answer:
          "Your data stays in your infrastructure. We work GDPR-compliant, document data flows in full, and hand over cleanly to your team at the end.",
      },
      {
        question: "How are you different from a pure consultancy?",
        answer:
          "We advise and implement. Instead of just delivering concepts, we build the data models, dashboards, and pipelines ourselves — and document them so your team can keep going independently.",
      },
      {
        question: "Do we need internal BI expertise after the project?",
        answer:
          "We don't just build, we enable. Training and documentation are part of every project — so your team can extend and operate the platform on its own afterwards.",
      },
    ],
  },
  cta: {
    title: "What would change if your data finally started talking to each other?",
    subtitle:
      "30-minute intro call. Free. No strings attached. You'll find out where your biggest lever is — even if we don't end up working together.",
    primaryButton: "Free Consultation",
    secondaryButton: "Contact Us",
  },
  relatedLink: {
    text: "Using bexio and looking for a ready-made analytics solution? Take a look at our product smiit Analytics for bexio.",
    linkLabel: "Explore smiit Analytics for bexio",
    href: "/products/smiit-analytics",
  },
}
