import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const networkingSecurity: LocalizedGlossaryTerm = {
  de: {
    slug: "networking-security",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Networking & Security (VNet, Zero Trust)",
    title: "Was ist Networking & Security (VNet, Zero Trust)?",
    shortDefinition:
      "Networking & Security umfasst die Gestaltung und Absicherung der Netzwerkebene einer Cloud-Umgebung. Ein Virtual Network (VNet) schottet Ressourcen logisch ab und kontrolliert ihren Datenverkehr; Zero Trust ist das Prinzip, keinem Zugriff blind zu vertrauen, sondern jeden Zugriff zu prüfen – unabhängig davon, ob er aus dem internen Netz kommt.",
    synonyms: ["VNet", "Virtual Network", "Zero Trust", "Netzwerksicherheit", "Netzwerksegmentierung"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Networking & Security genutzt?",
        paragraphs: [
          "In der Cloud ist das Netzwerk eine eigene Sicherheitsebene. Ein Virtual Network (VNet) gruppiert Ressourcen in einem abgeschotteten Bereich, in dem sich über Subnetze und Regeln steuern lässt, welche Komponenten miteinander und mit dem Internet kommunizieren dürfen. So entsteht eine kontrollierte Angriffsfläche statt eines offenen Systems.",
          "Zero Trust ergänzt dies als Grundhaltung: Es gibt kein implizit vertrauenswürdiges internes Netz mehr. Jeder Zugriff wird authentifiziert, autorisiert und möglichst minimal gewährt. Vorgelagerte Dienste wie Azure Front Door filtern eingehenden Datenverkehr, bevor er interne Komponenten überhaupt erreicht.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Bei einer SaaS-Plattform liegen die internen Komponenten in einem Azure Virtual Network und sind nicht direkt aus dem Internet erreichbar. Eingehender Datenverkehr läuft über Azure Front Door, das als geschützter Eingangspunkt dient und unerwünschte Anfragen abfängt. Zugriffe werden konsequent geprüft, sodass selbst innerhalb der Umgebung kein blindes Vertrauen besteht.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Networking & Security adressiert die Netzwerk- und Transportebene und grenzt sich damit von IAM ab, das Identitäten und Zugriffsrechte regelt – beide sind komplementäre Bausteine der IT-Sicherheit und tragen gemeinsam zu DSGVO-konformem Datenschutz bei. Für die Claimity AG hat smiit eine Azure-Umgebung mit Virtual Network, Azure Front Door und Azure Key Vault aufgebaut und so eine abgeschottete, nach Zero-Trust-Prinzipien gestaltete Infrastruktur geschaffen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist ein Virtual Network (VNet)?",
        answer:
          "Ein VNet ist ein logisch abgeschotteter Netzwerkbereich in der Cloud, in dem sich über Subnetze und Regeln steuern lässt, welche Ressourcen miteinander und mit dem Internet kommunizieren dürfen. Es reduziert die Angriffsfläche erheblich.",
      },
      {
        question: "Bedeutet Zero Trust, dass man niemandem vertraut?",
        answer:
          "Zero Trust bedeutet, keinem Zugriff allein aufgrund seiner Herkunft zu vertrauen. Stattdessen wird jeder Zugriff geprüft und nur so weit gewährt, wie er wirklich nötig ist – auch innerhalb des internen Netzes.",
      },
      {
        question: "Worin unterscheidet sich Networking & Security von IAM?",
        answer:
          "Networking & Security sichert die Netzwerk- und Transportebene – also welche Komponenten überhaupt miteinander kommunizieren dürfen. IAM regelt dagegen Identitäten und Zugriffsrechte – also wer sich anmeldet und worauf er zugreifen darf. Beide ergänzen sich als komplementäre Ebenen der IT-Sicherheit.",
      },
      {
        question: "Reicht eine Firewall aus, um die Cloud abzusichern?",
        answer:
          "Eine Firewall ist ein wichtiger Baustein, aber allein nicht ausreichend. In der Cloud wirken mehrere Ebenen zusammen: Netzwerksegmentierung über ein VNet, vorgelagerte Filterung des eingehenden Datenverkehrs, Verschlüsselung sowie Identitäts- und Zugriffskontrolle nach Zero-Trust-Prinzipien.",
      },
      {
        question: "Wie unterscheidet sich Zero Trust vom klassischen Perimeter-Ansatz?",
        answer:
          "Der klassische Perimeter-Ansatz vertraut allem innerhalb des „inneren“ Netzes und sichert vor allem die Außengrenze ab. Zero Trust gibt dieses implizite Vertrauen auf und prüft jeden Zugriff einzeln – das ist besonders in Cloud- und verteilten Umgebungen sinnvoll, in denen es keine klare Außengrenze mehr gibt.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Networking & Security (VNet, Zero Trust) | smiit Glossar",
    metaDescription:
      "Networking & Security erklärt: Virtual Network (VNet), Zero Trust und Netzwerksegmentierung in der Cloud – mit Azure-Praxisbeispiel von smiit.",
  },
  en: {
    slug: "networking-security",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Networking & security (VNet, zero trust)",
    title: "What is networking & security (VNet, zero trust)?",
    shortDefinition:
      "Networking & security covers the design and protection of the network layer of a cloud environment. A virtual network (VNet) logically isolates resources and controls their traffic; zero trust is the principle of never trusting any access blindly but verifying every access — regardless of whether it comes from the internal network.",
    synonyms: ["VNet", "virtual network", "zero trust", "network security", "network segmentation"],
    sections: [
      {
        heading: "Where networking & security is used",
        paragraphs: [
          "In the cloud, the network is its own security layer. A virtual network (VNet) groups resources in an isolated area, in which subnets and rules control which components may communicate with each other and with the internet. This creates a controlled attack surface instead of an open system.",
          "Zero trust complements this as a basic stance: there is no longer an implicitly trustworthy internal network. Every access is authenticated, authorised and granted as minimally as possible. Upstream services such as Azure Front Door filter inbound traffic before it even reaches internal components.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a SaaS platform, the internal components sit in an Azure virtual network and are not directly reachable from the internet. Inbound traffic runs through Azure Front Door, which serves as a protected entry point and intercepts unwanted requests. Access is consistently verified, so that even within the environment there is no blind trust.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Networking & security addresses the network and transport layer and is therefore distinct from IAM, which governs identities and access rights — both are complementary building blocks of IT security and jointly contribute to GDPR-compliant data protection. For Claimity AG, smiit built an Azure environment with a virtual network, Azure Front Door and Azure Key Vault, creating an isolated infrastructure designed along zero-trust principles.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a virtual network (VNet)?",
        answer:
          "A VNet is a logically isolated network area in the cloud in which subnets and rules control which resources may communicate with each other and with the internet. It considerably reduces the attack surface.",
      },
      {
        question: "Does zero trust mean you trust no one?",
        answer:
          "Zero trust means not trusting any access purely because of its origin. Instead, every access is verified and granted only as far as it is really needed — even within the internal network.",
      },
      {
        question: "How does networking & security differ from IAM?",
        answer:
          "Networking & security secures the network and transport layer — that is, which components are even allowed to communicate with each other. IAM, by contrast, governs identities and access rights — that is, who signs in and what they may access. The two complement each other as layers of IT security.",
      },
      {
        question: "Is a firewall enough to secure the cloud?",
        answer:
          "A firewall is an important building block, but on its own it is not sufficient. In the cloud, several layers work together: network segmentation via a VNet, upstream filtering of inbound traffic, encryption, and identity and access control along zero-trust principles.",
      },
      {
        question: "How does zero trust differ from the classic perimeter approach?",
        answer:
          "The classic perimeter approach trusts everything inside the \"internal\" network and mainly secures the outer boundary. Zero trust gives up this implicit trust and verifies every access individually — which is especially useful in cloud and distributed environments where there is no longer a clear outer boundary.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Networking & security (VNet, zero trust) | smiit glossary",
    metaDescription:
      "Networking & security explained: virtual network (VNet), zero trust and network segmentation in the cloud — with an Azure example from smiit.",
  },
}

export default networkingSecurity

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Netzwerksicherheit wird oft auf eine Perimeter-Firewall reduziert; moderne Bedrohungen erfordern jedoch Segmentierung und Schutz auch innerhalb des Netzwerks.",
      "Viele glauben, interner Netzwerkverkehr sei automatisch vertrauenswürdig — das Zero-Trust-Modell geht hingegen davon aus, dass keinem Standort oder Gerät pauschal vertraut werden darf.",
      "Es wird angenommen, ein VPN oder eine Verschlüsselung allein genüge; ohne konsequente Authentifizierung, Monitoring und Rechtevergabe bleiben gravierende Lücken bestehen.",
    ],
    sources: [
      { title: "Microsoft Learn – Zero-Trust-Sicherheitsmodell", url: "https://learn.microsoft.com/security/zero-trust/" },
      { title: "NIST SP 800-207 – Zero Trust Architecture", url: "https://csrc.nist.gov/pubs/sp/800/207/final" },
    ],
  },
  en: {
    misconceptions: [
      "Network security is often reduced to a perimeter firewall; modern threats, however, require segmentation and protection inside the network as well.",
      "Many believe internal network traffic is automatically trustworthy — the zero trust model instead assumes that no location or device should be trusted by default.",
      "People assume a VPN or encryption alone is enough; without consistent authentication, monitoring and access control, serious gaps remain.",
    ],
    sources: [
      { title: "Microsoft Learn – Zero Trust security model", url: "https://learn.microsoft.com/security/zero-trust/" },
      { title: "NIST SP 800-207 – Zero Trust Architecture", url: "https://csrc.nist.gov/pubs/sp/800/207/final" },
    ],
  },
}
