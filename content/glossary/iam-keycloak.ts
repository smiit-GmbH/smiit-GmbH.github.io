import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const iamKeycloak: LocalizedGlossaryTerm = {
  de: {
    slug: "iam-keycloak",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IAM / Keycloak",
    title: "Was ist IAM / Keycloak?",
    shortDefinition:
      "IAM (Identity and Access Management) umfasst die Verwaltung digitaler Identitäten und ihrer Zugriffsrechte – also wer sich wie anmeldet und worauf zugreifen darf. Keycloak ist eine verbreitete Open-Source-Lösung für IAM, die Single Sign-On, Multifaktor-Authentifizierung und Standardprotokolle wie OpenID Connect und OAuth 2.0 bereitstellt.",
    synonyms: ["Identity and Access Management", "Identitätsmanagement", "Single Sign-On", "SSO", "OpenID Connect"],
    sections: [
      {
        heading: "Einordnung: Wofür wird IAM / Keycloak genutzt?",
        paragraphs: [
          "IAM beantwortet zwei Kernfragen: Authentifizierung (wer ist der Nutzer?) und Autorisierung (was darf er?). Eine zentrale IAM-Lösung bündelt Anmeldung, Rollen und Rechte, statt sie über viele Anwendungen zu verstreuen. Das senkt Risiken und vereinfacht die Verwaltung erheblich.",
          "Keycloak ist eine etablierte Open-Source-Plattform dafür. Sie bietet Single Sign-On über mehrere Anwendungen, unterstützt Multifaktor-Authentifizierung und setzt auf offene Standards wie OpenID Connect, OAuth 2.0 und SAML. Damit lassen sich eigene Anwendungen und Drittsysteme unter einer einheitlichen Identitätsverwaltung zusammenführen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine SaaS-Plattform benötigt eine sichere, zentrale Anmeldung für ihre Nutzer. Keycloak übernimmt Authentifizierung und Identitätsverwaltung, erzwingt Multifaktor-Authentifizierung und stellt Tokens über OpenID Connect aus. Die einzelnen Anwendungskomponenten müssen sich so nicht selbst um Login und Passwortverwaltung kümmern, sondern vertrauen der zentralen Identitätslösung.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "IAM ist das übergeordnete Konzept, Keycloak ein konkretes Werkzeug zu seiner Umsetzung. IAM bildet die Grundlage für Multifaktor-Authentifizierung und ist ein zentraler Baustein der IT-Sicherheit, grenzt sich aber von der reinen Netzwerksicherheit ab, die Datenverkehr und Segmentierung adressiert. Für die Claimity AG hat smiit Keycloak für Identität und MFA eingesetzt und so eine sichere, DSGVO-konforme Anmeldung in der Azure-Infrastruktur verankert.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Authentifizierung und Autorisierung?",
        answer:
          "Authentifizierung prüft, wer ein Nutzer ist, etwa über Passwort und zweiten Faktor. Autorisierung legt fest, worauf dieser Nutzer zugreifen darf. IAM-Lösungen wie Keycloak verwalten beides zentral.",
      },
      {
        question: "Warum eine zentrale IAM-Lösung statt Login je Anwendung?",
        answer:
          "Eine zentrale Lösung reduziert Sicherheitsrisiken, ermöglicht Single Sign-On und vereinfacht die Verwaltung von Nutzern und Rechten erheblich. Änderungen müssen nur an einer Stelle gepflegt werden.",
      },
      {
        question: "Was ist der Unterschied zwischen Keycloak und einem Cloud-Dienst wie Microsoft Entra ID?",
        answer:
          "Keycloak ist eine selbst betreibbare Open-Source-Lösung, die volle Kontrolle über Konfiguration und Datenhaltung bietet. Cloud-Dienste wie Microsoft Entra ID werden als verwalteter Service betrieben und nehmen Betriebsaufwand ab. Die Wahl hängt von Anforderungen an Kontrolle, Betrieb und Integration ab.",
      },
      {
        question: "Wofür stehen OpenID Connect und OAuth 2.0?",
        answer:
          "OAuth 2.0 ist ein Standard für die Autorisierung, also das kontrollierte Gewähren von Zugriff, ohne Passwörter weiterzugeben. OpenID Connect baut darauf auf und ergänzt die Authentifizierung, also die Feststellung der Identität. Beide sind offene Standards, die ein zentrales Login über mehrere Anwendungen ermöglichen.",
      },
      {
        question: "Bedeutet Single Sign-On, dass ein Passwort für alles ausreicht?",
        answer:
          "Single Sign-On bedeutet, dass sich Nutzer einmal zentral anmelden und danach mehrere Anwendungen nutzen können, ohne sich erneut einzuloggen. Es ersetzt nicht die Sicherheit der einzelnen Anmeldung – im Gegenteil wird diese eine Anmeldung üblicherweise durch Multifaktor-Authentifizierung zusätzlich abgesichert.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IAM & Keycloak: Definition, Funktionen & Beispiel | smiit Glossar",
    metaDescription:
      "IAM und Keycloak erklärt: Identitäts- und Zugriffsverwaltung, Single Sign-On und MFA mit offenen Standards – mit Azure-Praxisbeispiel von smiit.",
  },
  en: {
    slug: "iam-keycloak",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "IAM / Keycloak",
    title: "What is IAM / Keycloak?",
    shortDefinition:
      "IAM (identity and access management) covers the administration of digital identities and their access rights — that is, who signs in how and what they are allowed to access. Keycloak is a widely used open-source IAM solution that provides single sign-on, multi-factor authentication and standard protocols such as OpenID Connect and OAuth 2.0.",
    synonyms: ["identity and access management", "identity management", "single sign-on", "SSO", "OpenID Connect"],
    sections: [
      {
        heading: "Where IAM / Keycloak is used",
        paragraphs: [
          "IAM answers two core questions: authentication (who is the user?) and authorization (what may they do?). A central IAM solution bundles sign-in, roles and rights instead of scattering them across many applications. This lowers risks and considerably simplifies administration.",
          "Keycloak is an established open-source platform for this. It offers single sign-on across multiple applications, supports multi-factor authentication and relies on open standards such as OpenID Connect, OAuth 2.0 and SAML. This makes it possible to bring your own applications and third-party systems together under unified identity management.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A SaaS platform needs a secure, central sign-in for its users. Keycloak handles authentication and identity management, enforces multi-factor authentication and issues tokens via OpenID Connect. The individual application components therefore do not have to manage login and passwords themselves but trust the central identity solution.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "IAM is the overarching concept, Keycloak a concrete tool for implementing it. IAM forms the basis for multi-factor authentication and is a central building block of IT security, but it is distinct from pure network security, which addresses traffic and segmentation. For Claimity AG, smiit used Keycloak for identity and MFA, anchoring a secure, GDPR-compliant sign-in within the Azure infrastructure.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between authentication and authorization?",
        answer:
          "Authentication verifies who a user is, for example via password and second factor. Authorisation defines what that user is allowed to access. IAM solutions such as Keycloak manage both centrally.",
      },
      {
        question: "Why a central IAM solution instead of login per application?",
        answer:
          "A central solution reduces security risks, enables single sign-on and considerably simplifies the management of users and rights. Changes only have to be maintained in one place.",
      },
      {
        question: "What is the difference between Keycloak and a cloud service like Microsoft Entra ID?",
        answer:
          "Keycloak is a self-hostable open-source solution that offers full control over configuration and data storage. Cloud services such as Microsoft Entra ID run as a managed service and reduce operational effort. The choice depends on requirements around control, operations and integration.",
      },
      {
        question: "What do OpenID Connect and OAuth 2.0 stand for?",
        answer:
          "OAuth 2.0 is a standard for authorization, that is the controlled granting of access without passing on passwords. OpenID Connect builds on it and adds authentication, that is establishing identity. Both are open standards that enable a central login across multiple applications.",
      },
      {
        question: "Does single sign-on mean one password is enough for everything?",
        answer:
          "Single sign-on means users sign in centrally once and can then use multiple applications without logging in again. It does not replace the security of that single sign-in — on the contrary, this one login is usually additionally protected with multi-factor authentication.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "IAM & Keycloak: definition, features & example | smiit glossary",
    metaDescription:
      "IAM and Keycloak explained: identity and access management, single sign-on and MFA with open standards — with an Azure example from smiit.",
  },
}

export default iamKeycloak

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Identity and Access Management wird oft mit reiner Benutzerverwaltung gleichgesetzt; es umfasst aber auch Authentifizierung, Autorisierung, Rollen und den gesamten Lebenszyklus von Identitäten.",
      "Viele glauben, Keycloak sei nach der Installation ohne Pflege betriebsbereit; in der Produktion brauchen Updates, Hochverfügbarkeit und sichere Konfiguration laufende Aufmerksamkeit.",
      "Es herrscht der Irrglaube, eine eigene Login-Lösung selbst zu bauen sei einfacher als ein etablierter Identity-Provider — dabei sind Standards wie OpenID Connect und OAuth2 sicherheitskritisch und fehleranfällig.",
    ],
    sources: [
      { title: "Keycloak – Offizielle Dokumentation", url: "https://www.keycloak.org/documentation" },
      { title: "OpenID Connect Core 1.0 (OpenID Foundation)", url: "https://openid.net/specs/openid-connect-core-1_0.html" },
      { title: "IETF RFC 6749 – The OAuth 2.0 Authorization Framework", url: "https://www.rfc-editor.org/rfc/rfc6749" },
    ],
  },
  en: {
    misconceptions: [
      "Identity and access management is often equated with mere user administration; it also covers authentication, authorization, roles and the entire identity lifecycle.",
      "Many believe Keycloak is ready to run without maintenance after installation; in production, updates, high availability and secure configuration require ongoing attention.",
      "There is a misconception that building your own login solution is easier than using an established identity provider — yet standards like OpenID Connect and OAuth2 are security-critical and error-prone.",
    ],
    sources: [
      { title: "Keycloak – Official documentation", url: "https://www.keycloak.org/documentation" },
      { title: "OpenID Connect Core 1.0 (OpenID Foundation)", url: "https://openid.net/specs/openid-connect-core-1_0.html" },
      { title: "IETF RFC 6749 – The OAuth 2.0 Authorization Framework", url: "https://www.rfc-editor.org/rfc/rfc6749" },
    ],
  },
}
