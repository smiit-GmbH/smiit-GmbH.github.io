import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const machineLearningAzure: LocalizedGlossaryTerm = {
  de: {
    slug: "machine-learning-azure",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Machine Learning in Azure",
    title: "Was ist Machine Learning in Azure?",
    shortDefinition:
      "Machine Learning in Azure bezeichnet die Entwicklung, das Training und den Betrieb von Machine-Learning-Modellen auf der Microsoft-Azure-Cloud, vor allem mit dem Dienst Azure Machine Learning. Unternehmen nutzen es, um aus ihren Daten Vorhersagen, Klassifizierungen oder Erkennungen abzuleiten, ohne eine eigene ML-Infrastruktur betreiben zu müssen.",
    synonyms: ["Azure ML", "Azure Machine Learning", "ML in Azure", "Azure AI"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Machine Learning in Azure genutzt?",
        paragraphs: [
          "Azure Machine Learning stellt eine verwaltete Umgebung bereit, in der Daten aufbereitet, Modelle trainiert, bewertet und als Endpunkte bereitgestellt werden. Statt eigene Server und Bibliotheken zu pflegen, nutzen Teams skalierbare Rechenleistung, fertige Werkzeuge und eine durchgängige Plattform von der Datenanbindung bis zur Auslieferung.",
          "Die Plattform deckt verschiedene Vorgehensweisen ab, vom assistierten Automated Machine Learning über klassisches Modelltraining mit Python und vertrauten Bibliotheken bis zur Integration mit Azure Databricks für große Datenmengen. Über den Betrieb hinweg lassen sich MLOps-Praktiken anwenden.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Unternehmen möchte aus historischen Auftragsdaten die zu erwartende Nachfrage je Region vorhersagen. In Azure werden die Daten aus dem Lakehouse angebunden, ein Modell trainiert und als Endpunkt bereitgestellt, den ein Reporting oder eine Anwendung abfragt. Die Rechenleistung wird nur bei Bedarf genutzt und skaliert mit der Last.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Machine Learning in Azure eignet sich, wenn datengetriebene Vorhersagen oder Erkennungen gebraucht werden, ohne dass eine eigene ML-Infrastruktur entstehen soll.",
        ],
        bullets: [
          "Nachfrage-, Absatz- oder Bedarfsprognosen auf Basis historischer Daten",
          "Klassifizierung, etwa von Dokumenten, Anfragen oder Qualitätsmerkmalen",
          "Anomalie- und Mustererkennung in operativen oder Sensordaten",
          "Skalierbare, verwaltete Infrastruktur statt eigener Server und Bibliotheken",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Machine Learning in Azure ist die Plattform zum Entwickeln und Betreiben von Modellen. MLOps ist die Disziplin, die deren verlässlichen Betrieb sicherstellt, und nutzt diese Plattform. Azure Databricks dient als leistungsfähige Umgebung für große Datenmengen und Feature-Aufbereitung und lässt sich mit Azure Machine Learning kombinieren. Power BI visualisiert die Ergebnisse, ist aber selbst kein ML-Werkzeug.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit setzt Machine-Learning-Lösungen im Azure-Umfeld pragmatisch und am Geschäftsnutzen orientiert um. Im Vordergrund steht nicht das größtmögliche Modell, sondern eine verlässliche, betreibbare Lösung, die sich sauber in vorhandene Datenplattformen und Reporting einfügt.",
        ],
      },
    ],
    faq: [
      { question: "Braucht man für Machine Learning in Azure tiefe Data-Science-Kenntnisse?", answer: "Nicht zwingend. Mit Automated Machine Learning lassen sich erste Modelle ohne tiefen Code erstellen. Für anspruchsvollere Anwendungen sind Data-Science-Kenntnisse hilfreich, die smiit einbringen kann." },
      { question: "Was kostet Machine Learning in Azure?", answer: "Die Kosten richten sich vor allem nach der genutzten Rechenleistung und Speicherung. Da Ressourcen bedarfsgesteuert skalieren, lassen sich Kosten an die tatsächliche Nutzung anpassen." },
      { question: "Wie verhält sich Azure Machine Learning zu Azure Databricks?", answer: "Azure Databricks ist besonders stark bei der Verarbeitung großer Datenmengen und der Feature-Aufbereitung, Azure Machine Learning beim Trainieren, Verwalten und Bereitstellen von Modellen. Beide lassen sich kombinieren." },
      { question: "Welche Daten brauchen wir, um sinnvoll mit Machine Learning zu starten?", answer: "Nötig sind ausreichend viele, verlässliche historische Daten zum jeweiligen Anwendungsfall sowie eine klare Fragestellung. Eine saubere, integrierte Datenbasis, etwa aus einem Data Warehouse oder Lakehouse, ist oft wichtiger für den Erfolg als die Wahl des Modells." },
      { question: "Bleiben unsere Daten beim Training in Azure unter unserer Kontrolle?", answer: "Ja. Daten und Modelle liegen in der eigenen Azure-Umgebung, deren Region, Zugriffe und Verschlüsselung das Unternehmen steuert. Über Identitäts- und Berechtigungskonzepte lässt sich festlegen, wer auf Daten und Modelle zugreifen darf." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "Machine Learning in Azure: Definition & Praxis | smiit Glossar",
    metaDescription: "Machine Learning in Azure einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu MLOps und Azure Databricks – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "machine-learning-azure",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Machine learning in Azure",
    title: "What is machine learning in Azure?",
    shortDefinition:
      "Machine learning in Azure refers to the development, training and operation of machine learning models on the Microsoft Azure cloud, primarily with the Azure Machine Learning service. Companies use it to derive predictions, classifications or detections from their data without having to run their own ML infrastructure.",
    synonyms: ["Azure ML", "Azure Machine Learning", "ML in Azure", "Azure AI"],
    sections: [
      {
        heading: "Where machine learning in Azure is used",
        paragraphs: [
          "Azure Machine Learning provides a managed environment in which data is prepared, models are trained, evaluated and deployed as endpoints. Instead of maintaining their own servers and libraries, teams use scalable compute, ready-made tools and an end-to-end platform from data connection to deployment.",
          "The platform covers different approaches, from assisted automated machine learning to classic model training with Python and familiar libraries, to integration with Azure Databricks for large data volumes. Across operation, MLOps practices can be applied.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A company wants to predict expected demand per region from historical order data. In Azure the data is connected from the lakehouse, a model is trained and deployed as an endpoint that a report or application queries. Compute is used only on demand and scales with the load.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Machine learning in Azure is suitable when data-driven predictions or detections are needed without building one's own ML infrastructure.",
        ],
        bullets: [
          "Demand, sales or capacity forecasts based on historical data",
          "Classification, for example of documents, requests or quality features",
          "Anomaly and pattern detection in operational or sensor data",
          "Scalable, managed infrastructure instead of self-run servers and libraries",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Machine learning in Azure is the platform for developing and operating models. MLOps is the discipline that ensures their reliable operation and uses this platform. Azure Databricks serves as a powerful environment for large data volumes and feature preparation and can be combined with Azure Machine Learning. Power BI visualizes the results but is not itself an ML tool.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit implements machine learning solutions in the Azure ecosystem pragmatically and oriented towards business value. The focus is not on the largest possible model but on a reliable, operable solution that fits cleanly into existing data platforms and reporting.",
        ],
      },
    ],
    faq: [
      { question: "Do you need deep data science skills for machine learning in Azure?", answer: "Not necessarily. With automated machine learning, first models can be created without deep code. For more demanding applications, data science skills are helpful, which smiit can contribute." },
      { question: "What does machine learning in Azure cost?", answer: "Costs depend mainly on the compute and storage used. Since resources scale on demand, costs can be aligned with actual usage." },
      { question: "How does Azure Machine Learning relate to Azure Databricks?", answer: "Azure Databricks is particularly strong at processing large data volumes and feature preparation, while Azure Machine Learning excels at training, managing and deploying models. The two can be combined." },
      { question: "What data do we need to start meaningfully with machine learning?", answer: "You need enough reliable historical data for the use case in question, plus a clear question to answer. A clean, integrated data basis, for example from a data warehouse or lakehouse, is often more important to success than the choice of model." },
      { question: "Does our data stay under our control during training in Azure?", answer: "Yes. Data and models reside in your own Azure environment, whose region, access and encryption the company controls. Identity and permission concepts let you define who may access data and models." },
    ],
    relatedServicePath: "services/analytics",
    metaTitle: "Machine learning in Azure explained | smiit glossary",
    metaDescription: "Machine learning in Azure explained simply: definition, how it works, use cases and how it differs from MLOps and Azure Databricks – with practical insight from smiit.",
  },
}

export default machineLearningAzure

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Azure Machine Learning ist nicht nur ein Trainingsdienst; es bietet einen kompletten Workflow mit Pipelines, Modellregistrierung, Deployment und Monitoring.",
      "Viele glauben, man brauche keine eigene Datenaufbereitung mehr. Die Modellqualität hängt aber weiterhin stark von sauberen, gut strukturierten Trainingsdaten ab.",
      "Ein verbreiteter Irrtum ist, dass AutoML jedes Problem ohne Fachwissen löst. AutoML beschleunigt die Modellsuche, ersetzt aber kein Verständnis der Daten und Zielgrößen.",
    ],
    sources: [
      { title: "Microsoft Learn – Was ist Azure Machine Learning?", url: "https://learn.microsoft.com/azure/machine-learning/overview-what-is-azure-machine-learning" },
      { title: "Microsoft Learn – Azure Machine Learning Dokumentation", url: "https://learn.microsoft.com/azure/machine-learning/" },
    ],
  },
  en: {
    misconceptions: [
      "Azure Machine Learning is not just a training service; it provides a full workflow with pipelines, model registration, deployment and monitoring.",
      "Many believe data preparation is no longer needed, but model quality still depends heavily on clean, well-structured training data.",
      "A common error is to assume AutoML solves any problem without expertise. AutoML speeds up model search but does not replace understanding of data and targets.",
    ],
    sources: [
      { title: "Microsoft Learn – What is Azure Machine Learning?", url: "https://learn.microsoft.com/azure/machine-learning/overview-what-is-azure-machine-learning" },
      { title: "Microsoft Learn – Azure Machine Learning documentation", url: "https://learn.microsoft.com/azure/machine-learning/" },
    ],
  },
}
