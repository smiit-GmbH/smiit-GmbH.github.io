import type { Dictionary } from "@/lib/dictionary"

export const servicesApps: Dictionary["servicesApps"] = {
  eyebrows: {
    hero: "APPS & WORKFLOWS",
    portfolio: "WHAT WE DO",
    process: "HOW WE WORK",
    reviews: "VOICES",
  },
  hero: {
    title: "Understand workflows. Build apps. Free your team.",
    description:
      "We build custom software and web apps that automate your processes and connect your systems through clean interfaces and APIs – so your team clicks less, searches less, waits less, and delivers more.",
    primaryCta: "Let's talk about your idea",
    packagesLabel: "Popular services",
    packages: [
      "Custom Web Apps",
      "Process Automation with Power Automate",
      "API Integration",
      "SaaS Platforms",
      "App Maintenance & Evolution",
    ],
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
    ariaLabels: {
      timeRange: "Time range",
      mainNav: "Main navigation",
    },
    activeBadge: "active",
    activitiesByView: {
      today: [
        { user: "J. Müller", action: "created order #4831", time: "2 min ago" },
        { user: "A. Schmidt", action: "approved quote", time: "14 min ago" },
        { user: "T. Weber", action: "confirmed delivery", time: "38 min ago" },
        { user: "M. Becker", action: "logged payment", time: "1 hr ago" },
      ],
      week: [
        { user: "J. Müller", action: "created order #4831", time: "3 hrs ago" },
        { user: "S. Voss", action: "renewed contract", time: "8 hrs ago" },
        { user: "A. Schmidt", action: "sent dunning notice", time: "1 day ago" },
        { user: "M. Becker", action: "opened complaint", time: "2 days ago" },
      ],
      month: [
        { user: "J. Müller", action: "closed 14 orders", time: "4 days ago" },
        { user: "S. Voss", action: "renewed 6 contracts", time: "1 week ago" },
        { user: "A. Schmidt", action: "onboarded 3 key accounts", time: "2 weeks ago" },
        { user: "M. Becker", action: "completed Q3 reporting", time: "3 weeks ago" },
      ],
    },
    tasksByView: {
      today: [
        { label: "Approve Müller GmbH quote", due: "today, 5:00 pm" },
        { label: "Confirm Becker delivery", due: "today" },
        { label: "Review invoice #4823", due: "tomorrow" },
        { label: "Update Q4 forecast", due: "this week" },
      ],
      week: [
        { label: "Klein KG: prepare quote", due: "Wed" },
        { label: "Process Becker complaint", due: "Wed" },
        { label: "Approve dunning run #34", due: "Thu" },
        { label: "Prepare sales meeting", due: "Fri" },
      ],
      month: [
        { label: "Schäfer AG: contract negotiation", due: "this week" },
        { label: "Align Q1 quarterly plan", due: "this week" },
        { label: "Approve commission statement", due: "next week" },
        { label: "Consolidate CRM data", due: "this month" },
      ],
    },
  },
  reviewsHeading: {
    lead: "What our",
    highlight: "clients say",
    swipeHint: "swipe →",
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
      metric: "1 System",
      metricSub: "Sales End-to-End",
    },
    {
      id: 4,
      name: "RB Westkamp GmbH",
      subtitle: "Employee App for Goal Transparency",
      quote:
        "smiit built a web app for our employees. Today our team sees at the touch of a button which goals they've already reached and what potential is still untapped. This has made our sales operation even more efficient.",
      metric: "Live",
      metricSub: "Sales Goals at a Tap of a Button",
    },
  ],
  manifest: {
    lead: "Software should do the work.",
    emphasis: "Not be the work.",
  },
  portfolio: {
    title: "Our",
    titleHighlight: "Offering",
    subtitle:
      "We build web apps, websites and Azure setups that carry your workflows – from the first sketch to stable operations.",
    visuals: {
      bi: {
        label: "Active users",
        tabs: ["Overview", "Reports", "Settings"],
        modules: ["Sales", "Warehouse", "Customers"],
        activity: "J. Müller created order #4831",
        moduleCount: "3 modules",
      },
    },
    learnMore: "Learn more",
    learnLess: "Show less",
    bookCta: "Schedule a call",
    items: [
      {
        title: "Web Apps & Platforms",
        shortDesc:
          "We build custom software – web apps and platforms that map your workflows, connect systems through interfaces (APIs), and genuinely take work off your users' plates. Digital tools that work in daily use – not just in the demo.",
        details:
          "We develop modern web applications and SaaS platforms tailored to your actual needs – from internal tools to multi-tenant solutions. We connect existing systems through APIs, integrate authentication and permissions cleanly, and ensure your app performs under load.\n\nTechnologically we work with Next.js, React and .NET – with clean architectures, automated tests and CI/CD pipelines. The result: applications that don't just shine in their first version but stay maintainable, secure and scalable long-term.",
      },
      {
        title: "Websites & Design",
        shortDesc:
          "We design and build websites that take your brand seriously – fast, clearly structured and conversion-oriented. A presence that builds trust, not just one that looks good.",
        details:
          "From the first sketch to go-live: we design and build websites that lead content cleanly, are mobile-first by design, and pay attention to SEO, performance and accessibility. We align with your brand identity and ensure a consistent visual system – from typography to color to components.\n\nTechnically we work with Next.js and headless CMS, so your team can maintain content independently without depending on developers. The result: a digital presence that's not only strong on launch day but grows with your business.",
      },
      {
        title: "Cloud Infrastructure & Governance",
        shortDesc:
          "We build your cloud environment on Microsoft Azure – secure, cost-efficient and traceable. An infrastructure that scales with your business and meets compliance requirements effortlessly.",
        details:
          "We design and operate cloud architectures on Microsoft Azure – from landing zones to identities and networking, all the way to CI/CD pipelines and observability. We ensure a clear governance structure, so resources, costs and permissions remain transparent at all times.\n\nFocus areas include Infrastructure-as-Code with Bicep or Terraform, security baselines based on the Microsoft Cloud Adoption Framework, and maintainable deployment processes. The result: an Azure environment that's not only technically clean but also organizationally sound – for stable apps, clear responsibilities and predictable cloud costs.",
      },
    ],
  },
  process: {
    title: "How we turn your workflows into",
    titleHighlight: "productive apps.",
    subtitle: "Four clear steps – from the first idea to productive operations.",
    stepLabel: "Step",
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
  faq: {
    eyebrow: "FREQUENTLY ASKED",
    heading: { lead: "Answers to the things", highlight: "people ask most" },
    items: [
      {
        question: "How long does it take to build a custom web app?",
        answer:
          "Typically 6-12 weeks from first concept to go-live, depending on scope. We deliver in short iterations so you can use the app productively early — not after months of development.",
      },
      {
        question: "Who owns the code at the end?",
        answer:
          "You do. You receive the full source code and documentation, and can extend or switch vendors later. No vendor lock-in.",
      },
      {
        question: "What tech stack do you use?",
        answer:
          "On the backend we use .NET; on the frontend, JavaScript and TypeScript with React and Next.js. A deliberately focused stack — no framework wild west, just proven technologies we run in production and can keep maintainable long-term.",
      },
      {
        question: "What does maintenance cost after go-live?",
        answer:
          "Your call. We offer maintenance packages, or you take over. Since the code and documentation are yours, you're not dependent on us — we stay because we're good, not because you can't leave.",
      },
      {
        question: "How do you handle GDPR and data residency?",
        answer:
          "GDPR-compliant architecture is standard, not optional. We set up hosting in the EU or Switzerland, document data flows in full, and support data processing agreements.",
      },
    ],
  },
  cta: {
    title: "How many hours would your team get back if",
    titleHighlight: "routine ran itself?",
    subtitle:
      "30-minute intro call. Free. No strings attached. You'll find out where your biggest routine-killers can be automated — even if we don't end up working together.",
    primaryButton: "Free Consultation",
    secondaryButton: "Contact Us",
  },
  relatedLink: {
    text: "Automated workflows reach their full potential with clear data — explore our analytics services.",
    linkLabel: "Explore our analytics services",
    href: "/services/analytics",
  },
}
