import type { Dictionary } from "@/lib/dictionary"

export const aboutPage: Dictionary["aboutPage"] = {
  titlePrefix: "Digital transformation. Wide expertise. ",
  titleHighlight: "Sustainable",
  titleSuffix: " value.",
  description:
    "We are an IT company with the vision of digitizing small and medium-sized enterprises in the DACH region - through tailored solutions in data analytics, automation, and app development.",
  primaryButton: "Free Consultation",
  secondaryButton: "Our Services",
  features: ["5+ years experience", "DACH-wide focus", "In-house development"],
  ourClients: "Our Clients",
  overview: "Overview",
  mission: {
    title: "Our Mission & Values",
    subtitle:
      "We want to drive change and give our clients clear insights,\nsave valuable time, and establish modern ways of working",
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
        text: "We don't work for our clients – we work with them. Open communication, collaboration on equal terms, and joy in shared projects are the foundation of successful outcomes.",
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
        education: ["B.A. Business Administration", "M.Sc. Digital Processes and Technologies"],
        alumniOf: ["DHBW Stuttgart", "Hochschule für Technik Stuttgart"],
        knowsAbout: [
          "Software Architecture",
          "Data Analysis",
          "Process Automation",
          "Web Development",
          "Cloud Solutions",
        ],
        bio: "I am responsible for the technical architecture and implementation of our solutions. My focus is on developing robust systems based on requirements – from data analysis and process automation to customized web applications.",
        email: "sebastian.grab@smiit.de",
        cvLink: "https://grab.smiit.de/en/",
        linkedIn: "https://www.linkedin.com/in/sebastian-grab/",
      },
      {
        name: "Noah Neßlauer",
        role: "Co-Founder & Business Analyst",
        image: "/assets/people/noah.webp",
        education: ["B.A. Business Administration", "M.Sc. Consulting & Business Analytics"],
        alumniOf: ["DHBW Ravensburg", "ESB Business School Reutlingen"],
        knowsAbout: [
          "Business Analysis",
          "Requirements Engineering",
          "Data-Driven Consulting",
          "Process Analysis",
          "Digital Transformation",
        ],
        bio: "I accompany our customers from the initial analysis to the implementation of the appropriate solution. Together, we identify challenges, structure requirements, and develop data-driven approaches that truly add value.",
        email: "noah.nesslauer@smiit.de",
        cvLink: "https://nesslauer.smiit.de/en/",
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
}
