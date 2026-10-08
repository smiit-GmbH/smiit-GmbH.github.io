import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const mlops: LocalizedGlossaryTerm = {
  de: {
    slug: "mlops",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "MLOps",
    title: "Was ist MLOps?",
    shortDefinition:
      "MLOps (Machine Learning Operations) bezeichnet die Prinzipien und Werkzeuge, mit denen Machine-Learning-Modelle zuverlässig entwickelt, ausgeliefert, überwacht und aktualisiert werden. Es überträgt die Ideen von DevOps auf den Lebenszyklus von ML-Modellen, sodass aus einem Prototyp ein dauerhaft betriebsfähiges System wird.",
    synonyms: ["Machine Learning Operations", "ML Operations", "ML-Betrieb"],
    sections: [
      {
        heading: "Einordnung: Wofür wird MLOps genutzt?",
        paragraphs: [
          "MLOps schließt die Lücke zwischen einem im Notebook funktionierenden Modell und einem System, das im Tagesbetrieb verlässlich Vorhersagen liefert. Es regelt, wie Daten und Modelle versioniert werden, wie Training und Auslieferung automatisiert ablaufen, wie Modelle überwacht und bei nachlassender Güte neu trainiert werden.",
          "Zentrale Bausteine sind Versionierung von Daten, Code und Modellen, automatisierte Trainings- und Deployment-Pipelines, ein Modellregister, Monitoring auf Modell- und Datenqualität sowie Mechanismen für reproduzierbares Re-Training. In Azure werden diese Bausteine etwa mit Azure Machine Learning und Azure DevOps oder GitHub umgesetzt.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Modell sagt die zu erwartende Nachfrage voraus. Ohne MLOps wird es einmalig trainiert und veraltet schleichend, weil sich Marktbedingungen ändern (Data Drift). Mit MLOps werden Eingangsdaten und Vorhersagegüte überwacht, und bei Abweichungen stößt eine Pipeline automatisch ein erneutes Training und eine kontrollierte Auslieferung an.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "MLOps lohnt sich, sobald ein ML-Modell dauerhaft im Betrieb wirken soll, statt nur als einmalige Analyse zu dienen.",
        ],
        bullets: [
          "Reproduzierbarkeit: Trainings lassen sich mit denselben Daten und Parametern nachvollziehen",
          "Automatisierte Auslieferung neuer Modellversionen ohne manuelle Handarbeit",
          "Monitoring von Modellgüte und Eingangsdaten, um Data Drift früh zu erkennen",
          "Klare Governance und Nachvollziehbarkeit, welche Modellversion wann im Einsatz war",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "DevOps bezieht sich auf Software allgemein, MLOps erweitert dies um die Besonderheiten von Daten und Modellen, etwa Datenversionierung und Modell-Monitoring. Machine Learning in Azure stellt die Plattform und Modelle bereit, MLOps sorgt für deren verlässlichen Betrieb. CI/CD ist eine Technik, die in MLOps für automatisierte Pipelines genutzt wird.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit hilft mittelständischen Unternehmen, Machine-Learning-Lösungen nicht nur zu entwickeln, sondern dauerhaft betriebsfähig zu machen. Im Azure-Umfeld werden reproduzierbare Pipelines, Monitoring und kontrollierte Auslieferung so aufgesetzt, dass Modelle verlässlich Wert stiften, statt im Prototyp-Stadium zu verharren.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen DevOps und MLOps?", answer: "DevOps automatisiert die Entwicklung und Auslieferung von Software allgemein. MLOps überträgt diese Prinzipien auf Machine-Learning-Modelle und ergänzt sie um Datenversionierung, Modellregister und Monitoring der Modellgüte." },
      { question: "Brauchen wir MLOps schon für ein einzelnes Modell?", answer: "Für eine einmalige Analyse meist nicht. Sobald ein Modell aber dauerhaft Vorhersagen liefern und mit neuen Daten aktuell bleiben soll, sorgt MLOps für verlässlichen und nachvollziehbaren Betrieb." },
      { question: "Was ist Data Drift im MLOps-Kontext?", answer: "Data Drift bezeichnet die Veränderung der Eingangsdaten gegenüber den Trainingsdaten, wodurch ein Modell schleichend ungenauer wird. MLOps erkennt dies durch Monitoring und stößt bei Bedarf ein erneutes Training an." },
      { question: "Welche Werkzeuge werden für MLOps in Azure genutzt?", answer: "Typisch sind Azure Machine Learning für Training, Modellregister und Bereitstellung, kombiniert mit Azure DevOps oder GitHub für Versionierung und Pipelines. Für die Datenaufbereitung kommt häufig Azure Databricks hinzu. Welche Bausteine nötig sind, hängt von der Komplexität der Modelle ab." },
      { question: "Wie hängen MLOps und Modell-Governance zusammen?", answer: "MLOps liefert die technische Grundlage für Governance: Versionierung, Modellregister und Monitoring machen nachvollziehbar, welche Modellversion mit welchen Daten trainiert wurde und wann sie im Einsatz war. Das ist die Voraussetzung für Audits und für klare Verantwortlichkeiten im Modellbetrieb." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "Was ist MLOps? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription: "MLOps einfach erklärt: Definition, Bausteine, Anwendungsfälle und Abgrenzung zu DevOps und Machine Learning in Azure – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "mlops",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "MLOps",
    title: "What is MLOps?",
    shortDefinition:
      "MLOps (machine learning operations) describes the principles and tools used to reliably develop, deploy, monitor and update machine learning models. It applies the ideas of DevOps to the lifecycle of ML models, turning a prototype into a system that can be operated permanently.",
    synonyms: ["machine learning operations", "ML operations", "ML ops"],
    sections: [
      {
        heading: "Where MLOps is used",
        paragraphs: [
          "MLOps closes the gap between a model that works in a notebook and a system that reliably delivers predictions in daily operation. It governs how data and models are versioned, how training and deployment are automated, and how models are monitored and retrained when their quality declines.",
          "Core building blocks are versioning of data, code and models, automated training and deployment pipelines, a model registry, monitoring of model and data quality, and mechanisms for reproducible retraining. In Azure these building blocks are implemented with Azure Machine Learning and Azure DevOps or GitHub, for example.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A model predicts expected demand. Without MLOps it is trained once and gradually becomes outdated as market conditions change (data drift). With MLOps the input data and prediction quality are monitored, and when deviations occur a pipeline automatically triggers retraining and a controlled deployment.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "MLOps pays off as soon as an ML model is meant to operate permanently rather than serve as a one-off analysis.",
        ],
        bullets: [
          "Reproducibility: training can be traced with the same data and parameters",
          "Automated deployment of new model versions without manual effort",
          "Monitoring of model quality and input data to detect data drift early",
          "Clear governance and traceability of which model version was in use and when",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "DevOps applies to software in general; MLOps extends it with the specifics of data and models, such as data versioning and model monitoring. Machine learning in Azure provides the platform and models, while MLOps ensures their reliable operation. CI/CD is a technique used within MLOps for automated pipelines.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit helps mid-sized companies not only develop machine learning solutions but make them permanently operable. In the Azure ecosystem, reproducible pipelines, monitoring and controlled deployment are set up so that models reliably create value instead of remaining stuck in the prototype stage.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between DevOps and MLOps?", answer: "DevOps automates the development and deployment of software in general. MLOps applies these principles to machine learning models and adds data versioning, a model registry and monitoring of model quality." },
      { question: "Do we need MLOps for just a single model?", answer: "Usually not for a one-off analysis. But as soon as a model is meant to deliver predictions permanently and stay current with new data, MLOps ensures reliable and traceable operation." },
      { question: "What is data drift in the MLOps context?", answer: "Data drift describes the change of input data compared to the training data, which gradually makes a model less accurate. MLOps detects this through monitoring and triggers retraining when needed." },
      { question: "Which tools are used for MLOps in Azure?", answer: "Typically Azure Machine Learning for training, model registry and deployment, combined with Azure DevOps or GitHub for versioning and pipelines. Azure Databricks is often added for data preparation. Which building blocks are needed depends on the complexity of the models." },
      { question: "How are MLOps and model governance related?", answer: "MLOps provides the technical basis for governance: versioning, a model registry and monitoring make it traceable which model version was trained on which data and when it was in use. This is the precondition for audits and for clear responsibilities in model operation." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "What is MLOps? Definition, benefits & practice | smiit glossary",
    metaDescription: "MLOps explained simply: definition, building blocks, use cases and how it differs from DevOps and machine learning in Azure – with practical insight from smiit.",
  },
}

export default mlops

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "MLOps ist nicht nur DevOps für Modelle; es muss zusätzlich Daten- und Modellversionierung, Drift-Überwachung und Reproduzierbarkeit von Trainingsläufen abdecken.",
      "Viele glauben, ein einmal trainiertes Modell bleibe dauerhaft gut. Modelle verlieren jedoch durch sich ändernde Daten an Qualität und müssen überwacht und neu trainiert werden.",
      "Ein verbreiteter Irrtum ist, MLOps beginne erst nach dem Deployment. Tatsächlich umfasst es den gesamten Zyklus von Datenaufbereitung über Training bis Betrieb.",
    ],
    sources: [
      { title: "Microsoft Learn – MLOps mit Azure Machine Learning", url: "https://learn.microsoft.com/azure/machine-learning/" },
      { title: "Martin Fowler – Continuous Delivery for Machine Learning (CD4ML)", url: "https://martinfowler.com/articles/cd4ml.html" },
    ],
  },
  en: {
    misconceptions: [
      "MLOps is not just DevOps for models; it must also cover data and model versioning, drift monitoring and reproducibility of training runs.",
      "Many assume a trained model stays good forever, but models degrade as data changes and must be monitored and retrained.",
      "A common error is to think MLOps starts only after deployment. In fact it spans the whole cycle from data preparation through training to operations.",
    ],
    sources: [
      { title: "Microsoft Learn – MLOps with Azure Machine Learning", url: "https://learn.microsoft.com/azure/machine-learning/" },
      { title: "Martin Fowler – Continuous Delivery for Machine Learning (CD4ML)", url: "https://martinfowler.com/articles/cd4ml.html" },
    ],
  },
}
