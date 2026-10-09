import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const mfa2fa: LocalizedGlossaryTerm = {
  de: {
    slug: "mfa-2fa",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Multifaktor-Authentifizierung (MFA / 2FA)",
    title: "Was ist Multifaktor-Authentifizierung (MFA / 2FA)?",
    shortDefinition:
      "Multifaktor-Authentifizierung (MFA) verlangt für die Anmeldung mehr als nur ein Passwort, indem mindestens zwei unabhängige Faktoren kombiniert werden – etwa Wissen (Passwort) und Besitz (Einmalcode auf dem Smartphone). Zwei-Faktor-Authentifizierung (2FA) ist der Spezialfall mit genau zwei Faktoren und erschwert unbefugten Zugriff erheblich.",
    synonyms: ["MFA", "2FA", "Zwei-Faktor-Authentifizierung", "OTP", "Einmalpasswort"],
    sections: [
      {
        heading: "Einordnung: Wofür wird MFA / 2FA genutzt?",
        paragraphs: [
          "MFA schützt Anmeldungen für den Fall, dass ein Passwort gestohlen oder erraten wird. Üblicherweise werden Faktoren aus drei Kategorien kombiniert: Wissen (Passwort), Besitz (Smartphone, Token) und Inhärenz (Fingerabdruck, Gesicht). Erst die Kombination mehrerer Faktoren macht einen Zugang deutlich schwerer angreifbar.",
          "Ein verbreiteter zweiter Faktor ist ein zeitbasiertes Einmalpasswort (OTP) aus einer Authenticator-App. Ergänzend kommen Recovery-Codes zum Einsatz, falls der zweite Faktor verloren geht. Moderne Verfahren wie Passkeys gehen noch weiter, werden aber je nach Reifegrad eines Projekts bewusst gestaffelt eingeführt.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Für eine SaaS-Plattform wird die Anmeldung mit MFA abgesichert: Nach Passwort und Benutzername bestätigen Nutzer ihre Identität über ein zeitbasiertes Einmalpasswort (OTP). Für den Fall eines verlorenen zweiten Faktors stehen Recovery-Codes bereit. Komfortablere, aber komplexere Verfahren wie Passkeys werden zunächst bewusst deaktiviert, um den Start einfach und kontrolliert zu halten.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "2FA ist der Sonderfall von MFA mit genau zwei Faktoren; MFA ist der Oberbegriff. MFA ist eng mit IAM und Keycloak verbunden, da die Identitätslösung die zusätzlichen Faktoren erzwingt, und ist ein zentraler Baustein der IT-Sicherheit. Für die Claimity AG hat smiit MFA per OTP mit Recovery-Codes umgesetzt und Passkeys bewusst zunächst deaktiviert – eine pragmatische, sichere Konfiguration über Keycloak.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen MFA und 2FA?",
        answer:
          "2FA verwendet genau zwei Faktoren, MFA mindestens zwei und ist damit der Oberbegriff. Jede 2FA ist eine MFA, aber MFA kann auch mehr als zwei Faktoren umfassen.",
      },
      {
        question: "Was passiert, wenn ich meinen zweiten Faktor verliere?",
        answer:
          "Dafür gibt es Recovery-Codes, die bei der Einrichtung erzeugt und sicher aufbewahrt werden. Mit ihnen lässt sich der Zugang wiederherstellen, ohne die Sicherheit grundsätzlich zu schwächen.",
      },
      {
        question: "Ist eine SMS als zweiter Faktor sicher genug?",
        answer:
          "SMS-Codes sind besser als gar kein zweiter Faktor, gelten aber als weniger sicher, weil sie etwa durch Umleitung der Rufnummer abgefangen werden können. Authenticator-Apps mit zeitbasierten Einmalpasswörtern oder Verfahren wie Passkeys bieten ein höheres Schutzniveau.",
      },
      {
        question: "Was sind Passkeys und worin unterscheiden sie sich von einem OTP?",
        answer:
          "Passkeys sind ein passwortloses Verfahren auf Basis kryptografischer Schlüsselpaare, bei dem kein Code abgetippt wird und nichts Abfangbares übertragen wird. Im Gegensatz zu einem zeitbasierten Einmalpasswort (OTP) sind sie resistenter gegen Phishing, erfordern aber unterstützende Geräte und etwas mehr Einrichtungsaufwand.",
      },
      {
        question: "Lohnt sich MFA auch für kleine Teams?",
        answer:
          "Ja. Der Schutz vor gestohlenen oder erratenen Passwörtern ist unabhängig von der Teamgröße wertvoll, und der Einrichtungsaufwand ist gering. Gerade für Konten mit Zugriff auf sensible Daten gilt MFA als eine der wirksamsten und günstigsten Maßnahmen.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "MFA / 2FA: Definition, Faktoren & Beispiel | smiit Glossar",
    metaDescription:
      "Multifaktor-Authentifizierung (MFA / 2FA) erklärt: Faktoren, OTP und Recovery-Codes für sichere Anmeldungen – mit Praxisbeispiel von smiit.",
  },
  en: {
    slug: "mfa-2fa",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Multi-factor authentication (MFA / 2FA)",
    title: "What is multi-factor authentication (MFA / 2FA)?",
    shortDefinition:
      "Multi-factor authentication (MFA) requires more than just a password for sign-in by combining at least two independent factors — such as knowledge (password) and possession (one-time code on a smartphone). Two-factor authentication (2FA) is the special case with exactly two factors and makes unauthorised access considerably harder.",
    synonyms: ["MFA", "2FA", "two-factor authentication", "OTP", "one-time password"],
    sections: [
      {
        heading: "Where MFA / 2FA is used",
        paragraphs: [
          "MFA protects sign-ins in case a password is stolen or guessed. Typically, factors from three categories are combined: knowledge (password), possession (smartphone, token) and inherence (fingerprint, face). Only the combination of multiple factors makes access significantly harder to attack.",
          "A common second factor is a time-based one-time password (OTP) from an authenticator app. Recovery codes are used in addition, in case the second factor is lost. Modern methods such as passkeys go even further but are deliberately introduced in a staged way depending on a project's maturity.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "For a SaaS platform, sign-in is secured with MFA: after username and password, users confirm their identity via a time-based one-time password (OTP). In case the second factor is lost, recovery codes are available. More convenient but more complex methods such as passkeys are deliberately disabled at first to keep the launch simple and controlled.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "2FA is the special case of MFA with exactly two factors; MFA is the umbrella term. MFA is closely linked to IAM and Keycloak, since the identity solution enforces the additional factors, and it is a central building block of IT security. For Claimity AG, smiit implemented MFA via OTP with recovery codes and deliberately disabled passkeys at first — a pragmatic, secure configuration through Keycloak.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between MFA and 2FA?",
        answer:
          "2FA uses exactly two factors, MFA at least two and is therefore the umbrella term. Every 2FA is an MFA, but MFA can also involve more than two factors.",
      },
      {
        question: "What happens if I lose my second factor?",
        answer:
          "For that there are recovery codes, generated during setup and kept securely. They allow access to be restored without fundamentally weakening security.",
      },
      {
        question: "Is an SMS secure enough as a second factor?",
        answer:
          "SMS codes are better than no second factor at all, but they are considered less secure because they can be intercepted, for instance by redirecting the phone number. Authenticator apps with time-based one-time passwords or methods such as passkeys offer a higher level of protection.",
      },
      {
        question: "What are passkeys and how do they differ from an OTP?",
        answer:
          "Passkeys are a passwordless method based on cryptographic key pairs, where no code is typed and nothing interceptable is transmitted. Unlike a time-based one-time password (OTP), they are more resistant to phishing, but they require supporting devices and a little more setup effort.",
      },
      {
        question: "Is MFA worthwhile for small teams too?",
        answer:
          "Yes. Protection against stolen or guessed passwords is valuable regardless of team size, and the setup effort is low. Especially for accounts with access to sensitive data, MFA is considered one of the most effective and inexpensive measures.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "MFA / 2FA: definition, factors & example | smiit glossary",
    metaDescription:
      "Multi-factor authentication (MFA / 2FA) explained: factors, OTP and recovery codes for secure sign-ins — with a practical example from smiit.",
  },
}

export default mfa2fa

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "MFA und 2FA werden oft als dasselbe gesehen; 2FA ist genau genommen ein Spezialfall der MFA mit genau zwei Faktoren, während MFA zwei oder mehr Faktoren umfasst.",
      "Viele halten SMS-Codes für sicher; sie sind jedoch anfällig für SIM-Swapping und Abfangen und gelten als schwächster MFA-Faktor gegenüber App- oder Hardware-Token.",
      "Es herrscht der Irrglaube, MFA mache Phishing unmöglich; moderne Angriffe umgehen sie über MFA-Fatigue oder Echtzeit-Phishing-Proxys, weshalb phishingresistente Verfahren wichtig sind.",
    ],
    sources: [
      {
        title: "NIST SP 800-63B – Digital Identity Guidelines (Authentication)",
        url: "https://pages.nist.gov/800-63-3/sp800-63b.html",
      },
      { title: "BSI – Zwei-Faktor-Authentisierung", url: "https://www.bsi.bund.de/" },
    ],
  },
  en: {
    misconceptions: [
      "MFA and 2FA are often treated as the same; strictly speaking 2FA is a special case of MFA using exactly two factors, while MFA covers two or more.",
      "Many consider SMS codes secure; however, they are vulnerable to SIM swapping and interception and are regarded as the weakest MFA factor compared to app or hardware tokens.",
      "There is a misconception that MFA makes phishing impossible; modern attacks bypass it via MFA fatigue or real-time phishing proxies, which is why phishing-resistant methods matter.",
    ],
    sources: [
      {
        title: "NIST SP 800-63B – Digital Identity Guidelines (Authentication)",
        url: "https://pages.nist.gov/800-63-3/sp800-63b.html",
      },
      { title: "BSI – German Federal Office for Information Security", url: "https://www.bsi.bund.de/" },
    ],
  },
}
