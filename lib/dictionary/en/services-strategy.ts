import type { Dictionary } from "@/lib/dictionary"

export const servicesStrategy: Dictionary["servicesStrategy"] = {
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
    packagesLabel: "Popular services",
    packages: [
      "Digitalization Roadmap",
      "Data Strategy & BI Concept",
      "Azure Cloud Architecture",
      "IT Security Check",
      "Process Analysis & Automation Plan",
    ],
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
    ariaLabels: {
      timeRange: "Time range",
    },
    bottomLabels: {
      q: ["W 1", "W 4", "W 7", "W 10", "W 13"],
      h: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      y: ["Q1", "Q2", "Q3", "Q4"],
    },
    milestoneLabels: {
      tenantAudit: "Tenant Audit",
      landingZone: "Landing Zone",
      iacMigration: "IaC Migration",
      multiRegion: "Multi-Region",
      mfaRollout: "MFA Rollout",
      zeroTrust: "Zero Trust",
      identityGov: "Identity Gov",
      socSetup: "SOC Setup",
      dataLineage: "Data Lineage",
      masterData: "Master Data",
      selfService: "Self-Service",
      processMap: "Process Map",
      bpmnModels: "BPMN Models",
      powerAutomate: "Power Automate",
      kpiSteering: "KPI Steering",
      patchAudit: "Patch Audit",
      data: "Data",
      sourceInventory: "Source Inventory",
      processMapping: "Process Mapping",
      top3Modeling: "Top-3 Modeling",
      pilotWorkflow: "Pilot Workflow",
      iacSetup: "IaC Setup",
    },
  },
  portfolio: {
    title: "Our",
    titleHighlight: "Portfolio",
    subtitle:
      "We guide you towards a digital strategy that holds up in daily operations – from an honest assessment to a productive cloud platform.",
    visuals: {
      process: {
        label: "Approval flow",
        yes: "✓ yes",
        no: "✗ no",
      },
      security: {
        eventBackupVerified: "Backup verified",
        eventAnomalyDetected: "Anomaly detected",
      },
    },
    learnMore: "Learn more",
    learnLess: "Show less",
    bookCta: "Book a call",
    items: [
      {
        title: "Process Optimization & Automation",
        shortDesc:
          "We make business processes visible, identify bottlenecks and friction points, and automate where it pays off measurably. The result: leaner workflows, fewer media breaks, and teams with more time for the work that matters.",
        details:
          "We start with clean process modeling – from a current-state assessment through pain-point analysis to a target concept, always closely aligned with the people who live the process every day. We use established notations like BPMN and keep models deliberately pragmatic and usable.\n\nWe then translate the target state into digitalized workflows – via Power Automate, custom apps, or integrations with your existing systems. We choose the path that fits the maturity of your IT landscape, and automate exactly what demonstrably saves effort or improves quality.",
      },
      {
        title: "Cloud Infrastructure & DevOps",
        shortDesc:
          "We build your Azure landscape so it scales, stays secure, and remains comprehensible two years down the road. Infrastructure as code, clear network and governance concepts, automated deployments – built in from day one.",
        details:
          "We focus exclusively on Microsoft Azure and know the ecosystem from tenant architecture down to individual pipelines. Concretely, we build landing zones, hub-and-spoke networks, identity and permission concepts, and well-thought-out naming and tagging strategies – aligned with your compliance and scaling requirements.\n\nInfrastructure is built as code (Bicep or Terraform), never clicked together in the portal. CI/CD pipelines, automated tests, security scans, and documentation are part of the delivery – so your platform doesn't just run on launch day but holds up in audits, in disaster-recovery tests, and during the next major expansion.",
      },
      {
        title: "IT Security",
        shortDesc:
          "Security isn't a product you buy – it's a discipline you anchor. We bring your IT landscape to a resilient state, from honest situation assessment through hardening of identity, network, and data, to anchoring it in everyday operations.",
        details:
          "We begin with an honest assessment: where do your critical assets sit, where are the biggest gaps, what do audits say – and what does reality say? From this picture we derive a prioritized roadmap, with quick wins (MFA, patch discipline, backup tests) and structural measures (Zero Trust, identity governance, network segmentation).\n\nWe think of security not as a special project but as a cross-cutting concern: our cloud architectures are hardened from the ground up, our process designs account for data protection, and our DevOps pipelines integrate security scans. The result is a level of protection that holds up in daily operations – without slowing your tempo.",
      },
    ],
  },
  process: {
    title: "How we shape your",
    titleHighlight: "digital strategy.",
    subtitle: "Four clear steps – from an honest assessment to a roadmap that sticks.",
    stepLabel: "Step",
    steps: [
      {
        number: "01",
        title: "Assess",
        text: "We take a hard look at your cloud maturity, security posture, data landscape and core processes — honest, quantified, no sugar-coating.",
      },
      {
        number: "02",
        title: "Design",
        text: "We draft your target state and prioritize: what delivers the most value, what's critical, what can wait? With effort estimates and quick wins.",
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
    swipeHint: "swipe →",
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
  faq: {
    eyebrow: "FREQUENTLY ASKED",
    heading: { lead: "Answers to the things", highlight: "people ask most" },
    items: [
      {
        question: "How are you different from a classic management consultancy?",
        answer:
          "We implement what we recommend. Knowing we'll have to build it ourselves disciplines the strategy — no over-engineered slides, no shelfware.",
      },
      {
        question: "How long does strategy development take?",
        answer:
          "A focused digital roadmap takes 4-8 weeks, depending on complexity and stakeholder involvement. We always start with a clearly scoped engagement, not a months-long discovery.",
      },
      {
        question: "What happens after the strategy is delivered?",
        answer:
          "You decide — either we implement the roadmap with you (apps, analytics, workflows), or your team takes over with our documentation. Both paths are fine.",
      },
      {
        question: "How do you approach cloud vs. on-prem?",
        answer:
          "Technology-neutral. We assess based on your requirements — compliance, existing infrastructure, scaling needs — and recommend what fits your context, not what's currently trending.",
      },
      {
        question: "Can you take on a focused topic, e.g. just cloud migration?",
        answer:
          "Yes. Strategy projects can have a clear focus (data strategy, cloud architecture, tooling selection). We start with a 30-minute call to align on scope and expectations.",
      },
    ],
  },
  cta: {
    title: "Before you buy your next tool — let's talk about your strategy.",
    subtitle:
      "30 minutes. Free. We listen, sort things out, and tell you what we'd prioritize in your shoes — cloud migration, security, data strategy, or processes.",
    primaryButton: "Free Consultation",
    secondaryButton: "Contact Us",
  },
  relatedLink: {
    text: "A solid strategy needs solid data — explore our analytics services.",
    linkLabel: "Explore our analytics services",
    href: "/services/analytics",
  },
}
