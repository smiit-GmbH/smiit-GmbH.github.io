import type { Dictionary } from "@/lib/dictionary"

export const servicesWebsite: Dictionary["servicesWebsite"] = {
  eyebrows: {
    hero: "WEB DESIGN FOR SMEs",
    problem: "PROBLEMS & SOLUTIONS",
    process: "HOW WE WORK",
    references: "REFERENCES",
    pricing: "INVESTMENT",
    cta: "FREE INITIAL CONCEPT",
  },
  hero: {
    title: "Your company is strong. Your website should",
    titleHighlight: "show it.",
    description:
      "We build high-quality corporate websites that make your expertise visible – technically fast, strong on mobile, and built to turn visitors into real enquiries.",
    primaryCta: "Get your free initial concept",
    secondaryCta: "How we work",
    packagesLabel: "Popular services",
    packages: ["Corporate website", "Relaunch", "Mobile & SEO", "CMS editing", "Conversion optimization"],
    beforeLabel: "Before",
    afterLabel: "After",
    sliderHint: "Drag the slider – this is what a relaunch by smiit looks like",
  },
  logoStrip: {
    label: "Trusted by construction, industry, logistics & waste management",
    names: [
      "RB Westkamp GmbH",
      "ASW Engineering AG",
      "Dy Project AG",
      "G&B Logistics GmbH",
      "SHW Schmiedetechnik GmbH & Co. KG",
      "Malpur Facility Services AG",
      "D & W GmbH",
      "Wörner Automatisierungstechnik GmbH",
    ],
  },
  problem: {
    title: "Many established companies appear online",
    titleHighlight: "smaller than they really are.",
    subtitle:
      "The work is first-class – but the website is ten years behind. That costs enquiries, applicants and trust.",
    problemLabel: "The problem",
    solutionLabel: "What we do",
    items: [
      {
        title: "Website looks outdated",
        solution: "Modern corporate design",
        solutionDetail: "Timeless, professional layout – tailored to your brand.",
      },
      {
        title: "Services are unclear",
        solution: "Clear structure & content hierarchy",
        solutionDetail: "Visitors understand what you do within seconds – and get in touch.",
      },
      {
        title: "Barely any enquiries",
        solution: "Conversion optimisation & strong CTAs",
        solutionDetail: "Strategically placed calls-to-action that turn visitors into leads.",
      },
      {
        title: "Slow & poor on mobile",
        solution: "Mobile-first, SEO & CMS",
        solutionDetail: "Fast on every device, found on Google – independently manageable.",
      },
    ],
  },
  manifest: {
    lead: "Your website should sell.",
    emphasis: "Not just look good.",
    subtitle:
      "A smiit website is a tool of structure, technology and content — built to turn visitors into enquiries and applications.",
  },
  process: {
    title: "How we turn your idea into",
    titleHighlight: "a strong website.",
    subtitle: "Four clear steps — from the first idea to live operation.",
    stepLabel: "Step",
    steps: [
      {
        number: "01",
        title: "Initial concept",
        text: "We analyse your market, goals and competitors — and deliver a concrete concept for your new website. Free and non-binding.",
      },
      {
        number: "02",
        title: "Design",
        text: "We create your corporate design and page structure in a modern, conversion-optimised layout — tailored to your brand and target audience.",
      },
      {
        number: "03",
        title: "Development",
        text: "We build your website to a high technical standard: fast, mobile-optimised, SEO-ready and with a CMS your team can manage themselves.",
      },
      {
        number: "04",
        title: "Go-live & maintenance",
        text: "We support you at launch, train your team and remain available for maintenance, updates and further development.",
      },
    ],
  },
  references: {
    title: "Results that your team and clients",
    titleHighlight: "actually feel.",
    items: [
      {
        tag: "Construction · Relaunch",
        title: "Complete relaunch with project showcase",
        text: "From an outdated site to a reference platform – more qualified enquiries.",
      },
      {
        tag: "Logistics · Careers",
        title: "Recruitment website that works",
        text: "A strong careers page that generates applications instead of bounces.",
      },
      {
        tag: "Industry · Performance",
        title: "Fast, mobile, visible",
        text: "Technically optimised for speed, SEO and a modern presence.",
      },
    ],
    stats: [
      {
        value: "5+",
        label: "Years of experience",
        detail: "Standardised processes and clear structures on every project.",
      },
      {
        value: "70+",
        label: "Successful projects",
        detail: "Delivered for clients in construction, industry, logistics & more.",
      },
      {
        value: "Ø 3.6",
        label: "Projects per client",
        detail: "Our clients stay – because the results speak for themselves.",
      },
      { value: "100%", label: "GDPR compliant", detail: "Legally sound implementation – thoroughly documented." },
    ],
  },
  pricing: {
    title: "Predictable. Transparent.",
    titleHighlight: "Worthwhile.",
    subtitle: "Clear frames instead of hidden costs — you always know exactly where you stand.",
    note: "Final price only after the free initial concept — no obligation.",
    cta: "Free initial concept",
    tiers: [
      {
        label: "Website relaunch",
        value: "from €5,000",
        currency: "",
        desc: "A high-quality restart for your online presence",
      },
      {
        label: "Typical projects",
        value: "5–15",
        currency: "k€",
        desc: "Depending on scope, page count & CMS",
      },
      {
        label: "Initial concept",
        value: "0",
        currency: "€",
        desc: "Non-binding for selected companies",
        featured: true,
        featuredLabel: "Recommended first step",
      },
    ],
  },
  cta: {
    title: "See what your website is",
    titleHighlight: "capable of.",
    subtitle:
      "In a free initial consultation we show you concretely where your website is leaving potential on the table – and what a relaunch could look like. Non-binding and without any sales pressure.",
    checks: [],
    bookTitle: "Book a call",
    bookSubtitle: "30-minute initial call – by phone or video.",
    bookEmail: "Send an email",
    primaryButton: "Get your free initial concept",
    secondaryButton: "Get in touch",
  },
  faq: {
    eyebrow: "FAQ",
    heading: {
      lead: "Common questions about",
      highlight: "web design & relaunch",
    },
    items: [
      {
        question: "How much does a new corporate website cost?",
        answer:
          "A website relaunch at smiit starts from €5,000. Most projects fall between €5,000 and €15,000, depending on scope, page count and CMS requirements. You receive the final price after the free initial concept – no obligation.",
      },
      {
        question: "How long does a website relaunch take?",
        answer:
          "Typically 6–12 weeks from kickoff to go-live. The duration depends on scope, content availability and your feedback cycles. The initial concept will include a realistic timeline.",
      },
      {
        question: "Can I edit the content myself afterwards?",
        answer:
          "Yes. We build your website with a CMS (e.g. Sanity or similar) that your team can use without any coding knowledge. You can manage texts, images and pages independently.",
      },
      {
        question: "Does smiit offer ongoing support after launch?",
        answer:
          "Yes. We support you after go-live too: updates, technical maintenance, content changes and further development. We'll discuss the terms during the initial consultation.",
      },
      {
        question: "What is included in the free initial concept?",
        answer:
          "We analyse your current website, review your competitors and develop a first concept idea – including a rough structure, design and technology recommendations, and an assessment of effort and budget.",
      },
    ],
  },
}
