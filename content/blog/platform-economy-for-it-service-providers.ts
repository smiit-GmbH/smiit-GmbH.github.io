import type { LocalizedBlogPost } from "@/lib/blog"

// ---------------------------------------------------------------------------
// Post: Plattformökonomie für IT-Dienstleister
// ---------------------------------------------------------------------------

const platformEconomy: LocalizedBlogPost = {
  de: {
    slug: "platform-economy-for-it-service-providers",
    category: "apps",
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    author: "Noah Neßlauer",
    title:
      "Plattformökonomie für IT-Dienstleister: Wie aus Projektgeschäft skalierbare Softwareprodukte werden",
    shortTitle: "Plattformökonomie für IT-Dienstleister",
    excerpt:
      "Ein gutes Softwareprodukt zu entwickeln ist nur der Anfang. Wie IT-Dienstleister aus projektbasiertem Geschäft skalierbare SaaS- und Plattformprodukte machen – und warum über den Erfolg selten die Technologie allein entscheidet, sondern Strategie, Organisation, Vertrieb und Timing.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Plattformökonomie für IT-Dienstleister",
    },
    coverImage: {
      url: "/assets/blog/platform-economy/platform.webp",
      width: 2499,
      height: 942,
      alt: "Die Plattform als Zusammenspiel der vier Handlungsfelder Strategie, Organisation, Technologie und Vertrieb.",
    },

    blocks: [
      { type: "heading", text: "Warum aus guter Software noch kein skalierbares Geschäft wird" },
      {
        type: "paragraph",
        text: "Ein gutes Softwareprodukt zu entwickeln, ist nur der Anfang. Entscheidend ist, ob daraus ein skalierbares Geschäftsmodell entsteht: mit einer klaren Zielgruppe, wiederkehrenden Umsätzen, belastbarer Positionierung und einem Vertrieb, der nicht bei jedem neuen Kunden wieder bei null beginnt.",
      },
      {
        type: "paragraph",
        text: "Viele IT-Dienstleister kennen die Ausgangslage: Das Projektgeschäft läuft, Kunden schätzen die individuelle Umsetzung und die Nachfrage ist grundsätzlich vorhanden. Gleichzeitig bleibt Wachstum eng an verfügbare Mitarbeitende gebunden. Mehr Umsatz bedeutet meist mehr Projektstunden, mehr Abstimmung und mehr operative Komplexität.",
      },
      {
        type: "paragraph",
        text: "Eine SaaS- oder Plattformlösung kann diesen Zusammenhang verändern. Sie ersetzt individuelle Leistungen zwar nicht vollständig, baut die variablen Kosten jedoch ab und generiert wiederkehrende Umsätze. Der Weg dorthin ist jedoch deutlich anspruchsvoller als lediglich eine bestehende Dienstleistung zu „produktisieren“.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag zeigt, welche Faktoren für IT-Dienstleister bei der Einführung plattformbasierter Softwareprodukte besonders relevant sind – und warum Technologie allein selten über den Erfolg entscheidet.",
      },

      { type: "heading", text: "Warum das Projektgeschäft an Skalierungsgrenzen stößt" },
      {
        type: "paragraph",
        text: "Klassische IT-Dienstleistungen sind wertvoll, aber nur begrenzt skalierbar. Der Umsatz eines Beratungs-, Entwicklungs- oder Datenanalyseprojekts ist in der Regel unmittelbar an Arbeitszeit gebunden: Konzeption, Entwicklung, Abstimmung, Betrieb und Support.",
      },
      {
        type: "paragraph",
        text: "Das schafft Nähe zum Kunden und ermöglicht individuelle Lösungen. Gleichzeitig entstehen variable Kosten mit jedem weiteren Auftrag. Wachstum erfordert zusätzliche Kapazitäten, qualifizierte Mitarbeitende und eine Organisation, die mit zunehmender Projektzahl komplexer wird.",
      },
      {
        type: "paragraph",
        text: "Digitale Produkte funktionieren wirtschaftlich anders. Ihre Entwicklung, Wartung und der Aufbau einer sicheren Betriebsumgebung verursachen zunächst hohe Fixkosten. Ist das Produkt jedoch einmal verfügbar, können zusätzliche Nutzer häufig mit geringen Grenzkosten bedient werden. Genau darin liegt das Skalierungspotenzial von Software-as-a-Service- und Plattformmodellen.",
        refs: [1, 2],
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/cost-development.webp",
        width: 3200,
        height: 1413,
        maxWidth: 940,
        alt: "Diagramm: Skalierungspotenzial über Wachstum bzw. Kundenzahl. Das Projektgeschäft verläuft linear, da der Umsatz an Arbeitszeit gekoppelt ist und die variablen Kosten je Projekt steigen; die SaaS-/Plattformkurve steigt nach hohen Anfangs-Fixkosten und geringen Grenzkosten überproportional an.",
        caption: "Skalierung im Vergleich: Im Projektgeschäft ist der Umsatz an Arbeitszeit gekoppelt und die variablen Kosten steigen mit jedem Projekt. SaaS- und Plattformmodelle haben hohe Anfangs-Fixkosten, danach aber geringe Grenzkosten – und damit deutlich mehr Skalierungspotenzial.",
      },
      {
        type: "paragraph",
        text: "Das bedeutet nicht, dass ein SaaS-Produkt automatisch profitabel wird. Im Gegenteil: Die Vorleistung verschiebt sich. Während im Projektgeschäft einzelne Kundenaufträge früh Umsatz erzeugen, müssen Plattformanbieter häufig zunächst in Produktentwicklung, Markteintritt, Vertrieb, Sicherheit und Betriebsfähigkeit investieren.",
        refs: [3],
      },
      {
        type: "paragraph",
        text: "Die zentrale Frage lautet daher nicht: „Können wir diese Software entwickeln?“ Sondern: „Können wir ein standardisiertes Produkt so positionieren, finanzieren und vertreiben, dass es dauerhaft von vielen Kunden genutzt wird?“",
      },

      { type: "heading", text: "Was Plattformökonomie im B2B-Kontext bedeutet" },
      {
        type: "paragraph",
        text: "Der Begriff Plattform wird häufig mit großen Marktplätzen wie Amazon, Airbnb oder Uber verbunden. Diese Beispiele stehen für sogenannte Transaktionsplattformen: Sie bringen zwei oder mehr Marktseiten zusammen, etwa Anbieter und Nachfrager, und profitieren von Vermittlung, Provisionen oder Werbung.",
        refs: [4],
      },
      {
        type: "paragraph",
        text: "Für IT-Dienstleister ist jedoch eine breitere Perspektive relevant. Plattformökonomie beschreibt Geschäftsmodelle, bei denen digitale Infrastruktur, standardisierte Leistungen und wiederholbare Prozesse einen überproportionalen Skalierungseffekt ermöglichen.",
        refs: [5],
      },
      { type: "paragraph", text: "Dabei lassen sich unter anderem vier Typen unterscheiden:" },
      {
        type: "grid",
        items: [
          { title: "Transaktionsplattformen", description: "Vermitteln zwischen unterschiedlichen Marktseiten, etwa Kunden, Dienstleistern oder Lieferanten." },
          { title: "Innovationsplattformen", description: "Schaffen Ökosysteme, auf denen Dritte eigene Lösungen entwickeln oder vertreiben können, beispielsweise App Stores." },
          { title: "Integrationsplattformen", description: "Verbinden unterschiedliche Systeme, Datenquellen und Anwendungen." },
          { title: "SaaS-Plattformen", description: "Stellen standardisierte Software über eine zentrale, vom Anbieter betriebene Infrastruktur bereit." },
        ],
      },
      {
        type: "paragraph",
        text: "Für viele kleinere und mittelständische IT-Dienstleister ist vor allem der letzte Typ relevant. Ein spezialisiertes SaaS-Produkt kann beispielsweise Reporting, Projektsteuerung, Datenintegration, Dokumentenmanagement oder branchenspezifische Prozesse standardisieren.",
        refs: [6, 7, 8, 9],
      },
      {
        type: "paragraph",
        text: "Der Unterschied zur Individualentwicklung liegt nicht nur in der Bereitstellung über die Cloud. Entscheidend ist die Produktlogik: Statt einzelne Kundenanforderungen vollständig neu umzusetzen, wird ein wiederverwendbarer Kern geschaffen, der für eine klar definierte Zielgruppe ausreichend wertvoll ist.",
      },

      { type: "heading", text: "SaaS ist nicht automatisch eine Plattform" },
      {
        type: "paragraph",
        text: "Nicht jedes cloudbasierte Softwareprodukt ist automatisch eine Plattform. Gerade im B2B-Bereich werden die Begriffe häufig vermischt.",
      },
      {
        type: "paragraph",
        text: "Eine klassische Plattform profitiert typischerweise von Netzwerkeffekten: Der Nutzen für einzelne Nutzer steigt, wenn weitere Nutzer, Anbieter, Partner oder Integrationen hinzukommen. Bei Marktplätzen ist dieser Zusammenhang besonders sichtbar. Je mehr Anbieter aktiv sind, desto attraktiver wird die Plattform für Kunden – und umgekehrt.",
      },
      {
        type: "paragraph",
        text: "Bei SaaS-Produkten sind diese Effekte oft schwächer ausgeprägt. Eine Buchhaltungssoftware wird nicht zwangsläufig besser, nur weil viele andere Unternehmen sie nutzen. Dennoch können auch SaaS-Produkte Plattformcharakter entwickeln:",
        refs: [2],
      },
      {
        type: "grid",
        items: [
          { title: "Mehrere Nutzergruppen", description: "Das Produkt verbindet mehrere interne oder externe Nutzergruppen miteinander." },
          { title: "Standardisierte Prozesse", description: "Es standardisiert Abläufe zwischen Unternehmen und macht sie wiederholbar." },
          { title: "Software-Ökosystem", description: "Über Schnittstellen wird es Teil eines wachsenden Ökosystems aus Anwendungen." },
          { title: "Wertvolle Integrationen", description: "Zusätzliche Integrationen erhöhen den Nutzen für bestehende Kunden." },
          { title: "Daten & Partner", description: "Daten, Partner und ergänzende Anwendungen machen das Produkt langfristig attraktiver." },
        ],
      },
      {
        type: "paragraph",
        text: "Gerade in spezialisierten B2B-Nischen kann daher ein Produkt erfolgreich sein, ohne sofort starke Netzwerkeffekte wie ein Marktplatz zu benötigen. Entscheidend ist zunächst ein klarer, wiederholbarer Kundennutzen.",
      },

      { type: "heading", text: "Der Wechsel von Auftragsarbeit zu Produktverantwortung" },
      {
        type: "paragraph",
        text: "Die größte Veränderung beim Aufbau eines Softwareprodukts ist meist nicht technisch. Sie betrifft das Denken und Handeln des Unternehmens.",
      },
      {
        type: "paragraph",
        text: "Im Projektgeschäft beschreibt der Kunde häufig das gewünschte Ergebnis. Der IT-Dienstleister analysiert die Anforderungen, entwickelt eine individuelle Lösung und rechnet die Leistung ab. Der Bedarf ist bereits konkret, der Vertrieb basiert stark auf Vertrauen, Referenzen und persönlicher Beratung.",
        refs: [10],
      },
      { type: "paragraph", text: "Im Plattformgeschäft ist die Ausgangslage anders. Das Unternehmen muss selbst entscheiden:" },
      {
        type: "bullets",
        items: [
          "Welches Problem wird für welche Zielgruppe gelöst?",
          "Welche Anforderungen gehören in den Produktkern?",
          "Welche Kundenwünsche bleiben bewusst außerhalb des Standards?",
          "Wie wird der Mehrwert verständlich kommuniziert?",
          "Welche Preislogik ist für Kunden nachvollziehbar und für den Anbieter tragfähig?",
          "Welche Funktionen erhöhen den Nutzen vieler Kunden – und welche erzeugen nur Einzelfallaufwand?",
        ],
      },
      {
        type: "paragraph",
        text: "Damit verschiebt sich die Rolle des Dienstleisters. Er wird vom Umsetzer zum Produktunternehmen. Das erfordert eine klare Vision, die Fähigkeit zur Priorisierung und den Mut, nicht jede Kundenanforderung individuell zu bedienen.",
      },
      {
        type: "paragraph",
        text: "Gerade für etablierte Dienstleister kann dieser Wandel anspruchsvoll sein. Bestehende Kundenprojekte erzeugen kurzfristig Umsatz und verlangen Aufmerksamkeit. Ein neues Produkt benötigt dagegen Investitionen, Geduld und einen eigenständigen Fokus. Die empirischen Erkenntnisse deuten deshalb darauf hin, dass neu gegründete Plattformunternehmen häufig bessere Ausgangsbedingungen haben als Dienstleister, die ein Produkt nur neben dem Tagesgeschäft aufbauen. Das ist kein allgemeines Gesetz, aber ein wichtiger Hinweis auf den nötigen organisatorischen und finanziellen Freiraum.",
        refs: [11],
      },

      { type: "heading", text: "Die vier zentralen Handlungsfelder" },
      {
        type: "paragraph",
        text: "Der Aufbau eines erfolgreichen Plattform- oder SaaS-Geschäfts lässt sich nicht auf Produktentwicklung reduzieren. Besonders relevant sind vier miteinander verbundene Ebenen: Strategie, Organisation, Technologie und Vertrieb.",
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/platform.webp",
        width: 2499,
        height: 942,
        maxWidth: 820,
        alt: "Donut-Diagramm mit „Platform“ im Zentrum und den vier Handlungsfeldern Strategie, Organisation, Technologie und Vertrieb.",
        caption: "Die vier zentralen Handlungsfelder eines Plattform- oder SaaS-Geschäfts: Strategie, Organisation, Technologie und Vertrieb.",
      },

      { type: "subheading", text: "1. Strategische Ebene: Zielgruppe, Markt und Geschäftsmodell" },
      { type: "paragraph", text: "Am Anfang steht keine Feature-Liste, sondern eine klare Marktentscheidung." },
      {
        type: "paragraph",
        text: "Ein Produkt ist besonders dann anschlussfähig, wenn es ein relevantes Problem für eine eng definierte Zielgruppe löst. Gerade kleinere IT-Dienstleister profitieren häufig davon, zunächst eine Nische zu fokussieren: eine Branche, eine bestimmte Unternehmensgröße, eine wiederkehrende Prozesslandschaft oder ein konkretes Datenproblem.",
      },
      {
        type: "paragraph",
        text: "Eine breite Zielgruppe klingt zunächst attraktiv, erhöht aber häufig die Komplexität. Unterschiedliche Anforderungen, längere Entscheidungswege und eine unklare Positionierung erschweren Produktentwicklung und Vertrieb zugleich.",
      },
      { type: "paragraph", text: "Zur Strategie gehören außerdem:" },
      {
        type: "grid",
        items: [
          { title: "Differenzierung", description: "Eine klare Abgrenzung gegenüber bestehenden Lösungen am Markt." },
          { title: "Markteintritt", description: "Der richtige Zeitpunkt für den Eintritt in den Zielmarkt." },
          { title: "Preismodell", description: "Eine tragfähige Preis- und Monetarisierungslogik." },
          { title: "Wettbewerbsanalyse", description: "Ein realistisches Bild von Anbietern, Substituten und Marktdynamik." },
          { title: "Partner & Integrationen", description: "Eine Strategie für Partnerschaften und die Anbindung an Drittsysteme." },
          { title: "Finanzierung", description: "Eine zur nötigen Vorleistung passende Finanzierungslogik." },
          { title: "Produktvision", description: "Eine langfristige Vision für die Weiterentwicklung des Produkts." },
        ],
      },
      {
        type: "paragraph",
        text: "In der Plattformökonomie ist der Markteintritt besonders sensibel. Märkte mit geringen Grenzkosten und ausgeprägten Netzwerkeffekten können sich schnell konzentrieren. Sobald wenige Anbieter eine starke Marktposition aufgebaut haben, steigen die Eintrittsbarrieren erheblich.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "Für kleinere Anbieter bedeutet das nicht, dass sie große Märkte meiden müssen. Es bedeutet jedoch, dass sie eine glaubwürdige Differenzierung benötigen: durch Branchenwissen, Prozessnähe, Integrationen, Datenkompetenz, eine spezialisierte Nutzererfahrung oder ein besonders gut verstandenes Problem.",
      },

      { type: "subheading", text: "2. Organisatorische Ebene: Produktarbeit braucht eigene Verantwortung" },
      { type: "paragraph", text: "Ein Plattformprodukt darf nicht dauerhaft nur ein Nebenprojekt zwischen Kundenaufträgen bleiben." },
      {
        type: "paragraph",
        text: "Damit ein Produkt marktfähig wird, braucht es klare Verantwortlichkeiten. Dazu gehören Entscheidungen über Produktvision, Priorisierung, Kundenfeedback, Architektur, Qualität, Go-to-Market und Weiterentwicklung.",
      },
      {
        type: "paragraph",
        text: "Erfolgreiche Plattformunternehmen arbeiten häufig mit dedizierten, cross-funktionalen Produktteams. Diese verbinden technische Kompetenz mit Marktverständnis, Produktmanagement und Vertriebsperspektive. Je nach Unternehmensgröße muss das kein großes Team sein. Entscheidend ist, dass Produktentscheidungen nicht ausschließlich reaktiv aus einzelnen Kundenprojekten entstehen.",
      },
      {
        type: "paragraph",
        text: "Besonders kritisch ist die Balance zwischen Standardisierung und Kundennähe. Kundenfeedback ist unverzichtbar. Es sollte jedoch nicht dazu führen, dass das Produkt zu einer Sammlung individueller Sonderlösungen wird. Eine sinnvolle Leitfrage lautet: Macht diese Anforderung das Produkt für einen relevanten Teil der Zielgruppe besser – oder löst sie nur ein individuelles Problem eines einzelnen Kunden? Diese Unterscheidung schützt Produktteams davor, die Skalierbarkeit des eigenen Angebots schrittweise wieder aufzugeben.",
      },

      { type: "subheading", text: "3. Technologische Ebene: Vertrauen ist Teil des Produkts" },
      { type: "paragraph", text: "Technologie ist nicht der einzige Erfolgsfaktor, aber sie setzt die Grenzen des Geschäftsmodells." },
      {
        type: "paragraph",
        text: "B2B-Kunden kaufen nicht nur Funktionen. Sie bewerten auch, ob eine Software langfristig sicher, zuverlässig und integrierbar betrieben werden kann. Gerade bei datenintensiven Anwendungen spielen Themen wie Datenschutz, Berechtigungen, Datenexport, Schnittstellen, Verfügbarkeit, Skalierbarkeit und Governance eine zentrale Rolle.",
      },
      {
        type: "paragraph",
        text: "Ein Produkt muss nicht von Beginn an die technische Komplexität eines globalen Enterprise-Systems besitzen. Es sollte aber so aufgebaut sein, dass es weiterentwickelt werden kann, ohne bei jedem neuen Kunden grundlegend angepasst werden zu müssen. Wichtig sind insbesondere:",
      },
      {
        type: "grid",
        items: [
          { title: "Standardisierter Produktkern", description: "Ein wiederverwendbarer Kern statt individueller Einzellösungen." },
          { title: "Daten- & Berechtigungslogik", description: "Eine nachvollziehbare Verwaltung von Daten und Zugriffen." },
          { title: "Skalierbare Architektur", description: "Eine Betriebsarchitektur, die mit der Nutzerzahl mitwächst." },
          { title: "Klare Schnittstellen", description: "Definierte Schnittstellen zu relevanten Drittsystemen." },
          { title: "Sicherheit & Datenschutz", description: "Verlässliche Sicherheits- und Datenschutzmaßnahmen." },
          { title: "Iterative Weiterentwicklung", description: "Die Fähigkeit, Funktionen schrittweise auszubauen." },
        ],
      },
      {
        type: "paragraph",
        text: "Die technische Architektur ist damit nicht nur ein Kostenfaktor. Sie ist ein Vertrauenssignal und beeinflusst unmittelbar, wie gut sich ein Produkt verkaufen, betreiben und langfristig skalieren lässt.",
      },

      { type: "subheading", text: "4. Vertriebliche Ebene: Dienstleistungsvertrieb ist nicht Produktvertrieb" },
      {
        type: "paragraph",
        text: "Ein bestehendes Vertriebsnetz im Projektgeschäft ist wertvoll – aber kein automatischer Beweis dafür, dass ein Softwareprodukt erfolgreich vermarktet werden kann.",
      },
      {
        type: "paragraph",
        text: "Der Grund liegt in der unterschiedlichen Vertriebslogik. Individuelle Dienstleistungen haben häufig hohe Auftragswerte. Es kann sich daher lohnen, mehrere Gespräche, Workshops und Beratungstage in die Akquise eines einzelnen Kunden zu investieren. Bei einem standardisierten SaaS-Produkt ist der Umsatz pro Kunde oft niedriger. Vertriebskosten, Onboarding-Aufwand und Support müssen deshalb stärker mit dem langfristigen Kundenwert ins Verhältnis gesetzt werden.",
      },
      {
        type: "paragraph",
        text: "Die Untersuchung zeigt: Besonders wertvoll sind Kontakte innerhalb der konkreten Zielgruppe, weil sie Direktvertrieb, Vertrauen und glaubwürdige Empfehlungen erleichtern. Ein allgemeiner Vertriebserfolg im Dienstleistungsumfeld lässt sich dagegen nicht automatisch auf ein Plattformprodukt übertragen.",
        refs: [5],
      },
      { type: "paragraph", text: "Für den Vertrieb eines B2B-Produkts bedeutet das:" },
      {
        type: "numbered",
        items: [
          { title: "Schnell verständlicher Nutzen", description: "Der Mehrwert des Produkts muss sofort erfassbar sein." },
          { title: "Klares Problem", description: "Die Zielgruppe muss erkennen, welches Risiko oder welchen Aufwand das Produkt reduziert." },
          { title: "Vertrauen aufbauen", description: "Datenschutz, Support und langfristige Verfügbarkeit müssen glaubwürdig sein." },
          { title: "Passendes Modell", description: "Preis, Onboarding und Vertragsmodell müssen zum Reifegrad des Kunden passen." },
          { title: "Netzwerke als Türöffner", description: "Bestehende Kontakte erleichtern den Einstieg, ersetzen aber kein belastbares Go-to-Market-Modell." },
        ],
      },

      { type: "heading", text: "Welche Erfolgsfaktoren sich in der Praxis zeigen" },
      {
        type: "paragraph",
        text: "Die zugrunde liegende Untersuchung kombiniert zehn halbstrukturierte Experteninterviews mit einer qualitativen Analyse von zwei etablierten Plattformunternehmen. Die Ergebnisse liefern keine allgemeingültigen Kausalgesetze, zeigen aber wiederkehrende Muster, die für IT-Dienstleister bei der Produktentwicklung und Markteinführung relevant sind.",
        refs: [11],
      },

      { type: "subheading", text: "Früh mit einem MVP in den Markt" },
      {
        type: "paragraph",
        text: "Ein frühes, funktionsfähiges Minimum Viable Product hilft dabei, Marktannahmen schnell zu überprüfen. Entscheidend ist nicht, möglichst viele Funktionen umzusetzen, sondern früh zu lernen:",
      },
      {
        type: "bullets",
        items: [
          "Versteht die Zielgruppe das Angebot?",
          "Wird das Problem als dringend genug wahrgenommen?",
          "Welche Funktionen sind tatsächlich kaufentscheidend?",
          "Welche Anforderungen sind nur vermeintlich wichtig?",
          "Gibt es eine echte Zahlungsbereitschaft?",
        ],
      },
      {
        type: "paragraph",
        text: "Nutzerfeedback ist dabei kein einmaliger Validierungsschritt. Es muss Teil eines kontinuierlichen Produktprozesses werden. Plattformen entwickeln sich selten erfolgreich entlang eines vollständig im Voraus definierten Plans. Sie entstehen durch wiederholte Zyklen aus Annahme, Feedback, Priorisierung und Verbesserung.",
      },
      {
        type: "flow",
        steps: [
          "Annahme treffen",
          "MVP bereitstellen",
          "Nutzerfeedback einholen",
          "Erkenntnisse priorisieren",
          "Produkt verbessern",
          "Erneut testen",
        ],
      },

      { type: "subheading", text: "Marktlücke und Timing ernst nehmen" },
      {
        type: "paragraph",
        text: "Der Zeitpunkt des Markteintritts kann entscheidend sein. In der Untersuchung weisen Plattformen bessere Erfolgsaussichten auf, wenn sie in Märkte mit wenigen vergleichbaren Angeboten eintreten oder eine bestehende Lücke klar besetzen können.",
        refs: [11],
      },
      {
        type: "paragraph",
        text: "Das bedeutet nicht, dass nur First Mover erfolgreich sein können. Ein später Markteintritt kann funktionieren, wenn der Anbieter eine relevante Differenzierung schafft. Ohne klare Positionierung wird es jedoch schwierig, gegen etablierte Produkte mit höherem Budget, größerer Markenbekanntheit und umfangreicheren Vertriebsressourcen anzutreten.",
      },

      { type: "subheading", text: "Organisationsumbau mit wachsender Plattform" },
      {
        type: "paragraph",
        text: "Mit der Skalierung verändert sich nicht nur das Produkt, sondern auch die passende Organisationsstruktur. Bei einer zunächst schlanken und wenig modularen Plattform kann ein gemeinsames, cross-funktionales Team Entwicklung, fachliche Anforderungen und direktes Kundenfeedback eng verbinden. Support, Vertrieb oder weitere administrative Aufgaben lassen sich in dieser Phase häufig noch mit dem bestehenden Dienstleistungsgeschäft bündeln.",
      },
      {
        type: "paragraph",
        text: "Wächst die Plattform jedoch zu mehreren fachlich eigenständigen Modulen, sollte sich diese Struktur weiterentwickeln: Dedizierte, cross-funktionale Produktteams übernehmen dann Verantwortung für einzelne Produktbereiche und deren Weiterentwicklung. Unterstützende Funktionen wie Vertrieb, Support oder Customer Success werden zunehmend als eigenständige, skalierbare Bereiche relevant. Entscheidend ist dabei nicht eine möglichst komplexe Organisation, sondern eine Struktur, die klare Produktverantwortung schafft und verhindert, dass die Plattform durch einzelne Kundenanforderungen wieder in die Logik des klassischen Projektgeschäfts zurückfällt.",
      },

      { type: "subheading", text: "Vertrieb bei begrenzten Ressourcen" },
      { type: "paragraph", text: "Ein Produkt kann technisch hervorragend sein und dennoch scheitern." },
      {
        type: "paragraph",
        text: "Besonders bei kleineren IT-Dienstleistern besteht die Gefahr, Produktentwicklung isoliert zu betrachten. Einer der wichtigsten Faktoren bei der Produktentwicklung ist es, den Vertrieb von vornherein mitzudenken: Wie werden potenzielle Kunden auf uns aufmerksam? Wie vertreiben wir das Produkt kosteneffizient?",
      },
      {
        type: "paragraph",
        text: "Stehen ausreichende finanzielle Ressourcen zur Verfügung, können Plattformanbieter mehrere Vertriebswege parallel erproben und skalieren. Dazu zählen insbesondere Direktvertrieb, gezieltes Online-Marketing, Empfehlungsprogramme, Anreize für Mund-zu-Mund-Propaganda oder – bei einer geeigneten, aufmerksamkeitsstarken Produktidee – PR-Kampagnen. Entscheidend ist dabei, die einzelnen Kanäle zunächst kontrolliert zu testen und nur dort weiter zu investieren, wo die Kundenakquisekosten dauerhaft in einem wirtschaftlich sinnvollen Verhältnis zum erwarteten Customer Lifetime Value stehen.",
      },
      {
        type: "paragraph",
        text: "Die Realität vieler kleinerer IT-Dienstleister sieht jedoch anders aus: Für die Markteinführung eines neuen Produkts stehen meist keine großen Budgets für Vertrieb und Kundenakquise bereit. Deshalb sollte die Vertriebslogik bereits vor der eigentlichen Produktentwicklung mitgedacht werden. Unternehmen sollten früh prüfen, welche Zielgruppen sie bereits kennen, in welchen Branchen belastbare Kontakte bestehen, welche Vertriebs- oder Marketingkompetenzen intern vorhanden sind und wie sich diese Stärken auf das neue Produkt übertragen lassen.",
      },
      {
        type: "paragraph",
        text: "Bei begrenzten Ressourcen gewinnen kostengünstige und glaubwürdige Kanäle an Bedeutung. Bestehende Kontakte in der Zielgruppe, Empfehlungen zufriedener Pilotkunden, gezielt aufgebaute Mund-zu-Mund-Propaganda oder branchenspezifische Partnerschaften können wirksamer sein als breit gestreute Werbekampagnen. Auch PR kann ein effizienter Hebel sein, sofern das Produkt oder die zugrunde liegende Problemstellung eine relevante, erzählbare Geschichte bietet. Direkter Vertrieb und Online-Marketing bleiben wichtige Optionen, sollten bei kleinem Budget jedoch fokussiert, schrittweise und mit klaren Effizienzkriterien eingesetzt werden.",
      },
      {
        type: "paragraph",
        text: "Der Engpass begrenzter Budgets lässt sich damit nicht allein durch geringere Ausgaben lösen. Er erfordert vor allem Kreativität in der Marktbearbeitung: Nicht jeder Vertriebskanal passt zu jedem Produkt. Erfolgreich ist eher, wer die eigene Erfahrung, das vorhandene Netzwerk und einen klar abgegrenzten Kundennutzen so kombiniert, dass erste Kunden mit überschaubarem Ressourceneinsatz gewonnen werden können.",
      },

      { type: "heading", text: "Fazit: Plattformgeschäft ist eine unternehmerische Transformation" },
      {
        type: "paragraph",
        text: "Der Aufbau eines SaaS- oder Plattformprodukts ist keine reine Erweiterung des bestehenden Leistungsportfolios. Er verändert die wirtschaftliche Logik, die Organisation und den Vertrieb eines IT-Dienstleisters.",
      },
      {
        type: "paragraph",
        text: "Das Potenzial ist groß: Wiederkehrende Umsätze, standardisierte Leistungen, bessere Skalierbarkeit und eine stärkere Unabhängigkeit von einzelnen Projektaufträgen. Gleichzeitig steigen die Anforderungen an Marktverständnis, Positionierung, Finanzierung, Produktmanagement und Betriebsfähigkeit.",
      },
      {
        type: "paragraph",
        text: "Der wichtigste Erfolgsfaktor ist deshalb nicht, möglichst schnell möglichst viele Features zu entwickeln. Entscheidend ist, die richtigen strategischen Entscheidungen früh zu treffen:",
      },
      {
        type: "numbered",
        items: [
          { title: "Klar abgegrenzte Zielgruppe", description: "Lieber eine fokussierte Nische als ein breiter, unscharfer Markt." },
          { title: "Wiederholbarer Kundennutzen", description: "Ein relevantes Problem, das sich für viele Kunden gleichartig lösen lässt." },
          { title: "Glaubwürdige Differenzierung", description: "Ein klarer Grund, warum Kunden dieses Produkt wählen." },
          { title: "Kontinuierliches Nutzerfeedback", description: "Feedback als fester Bestandteil der Produktentwicklung, nicht als einmaliger Schritt." },
          { title: "Organisatorische Anpassungen", description: "Eigene Verantwortung und Strukturen für die Produktarbeit." },
          { title: "Realistische Ressourcenplanung", description: "Budget, Zeit und Personal ehrlich auf das Vorhaben abgestimmt." },
          { title: "Kosteneffizientes Vertriebskonzept", description: "Ein Go-to-Market, das zu begrenzten Ressourcen passt." },
        ],
      },
      {
        type: "paragraph",
        text: "So wird aus einer guten Idee nicht nur eine Softwarelösung, sondern ein tragfähiges digitales Geschäftsmodell.",
      },
    ],

    faq: [
      {
        question: "Was ist der Unterschied zwischen einem SaaS-Produkt und einer Plattform?",
        answer:
          "Die Begriffe überschneiden sich, sind aber nicht identisch. SaaS beschreibt zunächst ein Bereitstellungs- und Geschäftsmodell: standardisierte Software, die zentral betrieben und meist im Abonnement genutzt wird. Zur Plattform wird ein Produkt erst, wenn zusätzlicher Wert durch das Zusammenspiel mehrerer Seiten entsteht – etwa durch Netzwerkeffekte, ein Ökosystem aus Partnern und Integrationen oder die Standardisierung von Prozessen zwischen Unternehmen. Viele erfolgreiche B2B-Produkte starten als fokussiertes SaaS und entwickeln Plattformcharakter erst später, wenn Schnittstellen, Partner und ergänzende Anwendungen hinzukommen. Für den Anfang ist diese Unterscheidung weniger wichtig als ein klarer, wiederholbarer Kundennutzen.",
      },
      {
        question: "Sollten etablierte IT-Dienstleister überhaupt eigene SaaS-Produkte entwickeln?",
        answer:
          "Das kann sehr sinnvoll sein – aber nicht automatisch. Der richtige Auslöser ist meist ein wiederkehrendes Problem, das in vielen Kundenprojekten in ähnlicher Form auftritt und sich zu einem standardisierbaren Produktkern verdichten lässt. Entscheidend ist weniger die technische Machbarkeit als die Frage, ob Zeit, Budget und klare Verantwortlichkeiten für Produktentwicklung, Markteintritt und Betrieb bereitstehen. Wird das Produkt nur nebenbei zwischen Kundenaufträgen gebaut, fehlt häufig der nötige Fokus. Wer den Schritt geht, sollte ihn deshalb als eigenständiges unternehmerisches Vorhaben behandeln, nicht als bloße Erweiterung des Tagesgeschäfts.",
      },
      {
        question: "Wie finde ich die richtige Zielgruppe oder Nische für ein Produkt?",
        answer:
          "Am besten dort, wo Sie bereits Vertrauen, Referenzen und echtes Problemverständnis besitzen. Gerade kleinere Anbieter profitieren davon, zunächst eng zu fokussieren – etwa auf eine Branche, eine bestimmte Unternehmensgröße oder eine wiederkehrende Prozess- und Datenlandschaft. Eine breite Zielgruppe klingt attraktiver, erhöht aber die Komplexität, verlängert Entscheidungswege und verwässert die Positionierung. Ein guter Test ist, ob Sie das Problem Ihrer Zielgruppe so präzise beschreiben können, dass Betroffene sich sofort wiedererkennen. Erst wenn Nutzen und Zahlungsbereitschaft in dieser Nische belegt sind, lohnt sich die Ausweitung.",
      },
      {
        question: "Warum reicht ein erfolgreicher Dienstleistungsvertrieb nicht aus?",
        answer:
          "Weil die Vertriebslogik eine andere ist. Im Projektgeschäft rechtfertigen hohe Auftragswerte mehrere Gespräche, Workshops und Beratungstage pro Kunde. Bei einem standardisierten SaaS-Produkt ist der Umsatz pro Kunde meist deutlich niedriger, sodass Akquisekosten, Onboarding und Support viel stärker zum langfristigen Kundenwert (Customer Lifetime Value) passen müssen. Bestehende Netzwerke sind wertvoll – vor allem Kontakte direkt in der Zielgruppe –, ersetzen aber kein belastbares Go-to-Market-Modell. Produktvertrieb muss den Nutzen schnell verständlich machen und planbar wiederholbar sein.",
      },
      {
        question: "Was gehört in ein MVP – und wie viel Funktionsumfang ist am Anfang nötig?",
        answer:
          "So wenig wie möglich, aber genug, um die zentrale Annahme ehrlich zu testen: Löst das Produkt ein als dringend empfundenes Problem, für das Kunden zu zahlen bereit sind? Ein MVP ist kein unfertiges Produkt, sondern das kleinste Funktionsbündel, mit dem sich echtes Nutzerfeedback und Zahlungsbereitschaft messen lassen. Wichtiger als viele Features ist, früh zu lernen, welche Funktionen tatsächlich kaufentscheidend sind und welche nur vermeintlich wichtig. Nutzerfeedback ist dabei kein einmaliger Schritt, sondern Teil eines kontinuierlichen Zyklus aus Annahme, Feedback, Priorisierung und Verbesserung.",
      },
      {
        question: "Wie sollte ein SaaS-Produkt bepreist werden?",
        answer:
          "Der Preis sollte zugleich für Kunden nachvollziehbar und für den Anbieter tragfähig sein. Üblich sind wiederkehrende Modelle – etwa pro Nutzer, pro Nutzungseinheit oder nach Funktionsumfang –, die mit dem Wert für den Kunden skalieren. Wichtig ist, Preis, Onboarding und Vertragsmodell zum Reifegrad der Zielgruppe passen zu lassen und die Kosten für Akquise, Betrieb und Support einzukalkulieren. Pricing ist selten von Anfang an perfekt; es sollte regelmäßig anhand realer Nutzung und Zahlungsbereitschaft überprüft und angepasst werden. Entscheidend ist, dass der Customer Lifetime Value dauerhaft über den Akquisekosten liegt.",
      },
      {
        question: "Braucht ein Plattformprodukt zwingend Venture Capital?",
        answer:
          "Nein. Externes Kapital kann Wachstum beschleunigen und zusätzliche Expertise bringen, ist aber nicht für jedes Produkt notwendig. Viele B2B-Produkte lassen sich anfangs aus dem bestehenden Dienstleistungsgeschäft heraus finanzieren, solange Vorleistung, Marktpotenzial und Vertriebsmodell zusammenpassen. In Märkten mit geringen Grenzkosten und starken Netzwerkeffekten, in denen sich Anbieter schnell konzentrieren, kann Kapital allerdings über Geschwindigkeit und Marktposition entscheiden. Die Finanzierungsform sollte deshalb zur Marktdynamik und zur eigenen Wachstumsambition passen – nicht umgekehrt.",
      },
      {
        question: "Wie wichtig sind Netzwerkeffekte für ein B2B-SaaS-Produkt?",
        answer:
          "Netzwerkeffekte sind ein starker Hebel, aber keine zwingende Voraussetzung für Erfolg. Klassische Marktplätze leben davon, dass jeder zusätzliche Teilnehmer den Nutzen für alle erhöht. Viele B2B-SaaS-Produkte – etwa eine Fachsoftware – werden dagegen nicht automatisch besser, nur weil mehr Unternehmen sie nutzen. In spezialisierten Nischen kann ein Produkt deshalb allein durch einen klaren, wiederholbaren Kundennutzen erfolgreich sein. Netzwerkeffekte können später entstehen – etwa durch Integrationen, geteilte Daten oder ein wachsendes Partner-Ökosystem. Sie sollten angestrebt, aber nicht zur Bedingung für den Markteintritt gemacht werden.",
      },
      {
        question: "Wie organisiere ich Produktarbeit neben dem laufenden Projektgeschäft?",
        answer:
          "Die größte Gefahr ist, dass das Produkt dauerhaft Nebenprojekt bleibt und durch einzelne Kundenwünsche schrittweise wieder zur Individuallösung wird. Deshalb braucht Produktarbeit eine eigene, klare Verantwortung für Vision, Priorisierung, Architektur, Qualität und Go-to-Market. In einer frühen, schlanken Phase kann ein gemeinsames, cross-funktionales Team Entwicklung, fachliche Anforderungen und Kundenfeedback eng verbinden; Support und Vertrieb lassen sich teils noch mit dem Dienstleistungsgeschäft bündeln. Mit wachsendem, modularem Produkt sollten dedizierte Produktteams sowie eigenständige Funktionen für Vertrieb, Support und Customer Success entstehen. Eine hilfreiche Leitfrage bei jedem Wunsch: Macht das das Produkt für einen relevanten Teil der Zielgruppe besser – oder löst es nur ein Einzelfallproblem?",
      },
      {
        question: "Kann ich die zugrunde liegenden Erkenntnisse im Detail erhalten?",
        answer:
          "Ja. Die Erkenntnisse basieren neben der theoretischen Aufarbeitung auf der empirischen Forschung der Masterarbeit von Noah Neßlauer (Mitgründer und Geschäftsführer der smiit GmbH). Diese stellen wir Ihnen auf Anfrage gerne zur Verfügung. Schicken Sie dafür einfach eine E-Mail an noah.nesslauer@smiit.de. Gerne beraten wir Sie auch persönlich zum Thema Plattform- und SaaS-Gründung.",
      },
    ],

    sources: [
      {
        title: "Rochet, J.-C. & Tirole, J. (2003): Platform Competition in Two-Sided Markets. Journal of the European Economic Association, 1(4), 990–1029.",
      },
      {
        title: "Van Alstyne, M. W., Parker, G. G. & Choudary, S. P. (2016): Pipelines, Platforms, and the New Rules of Strategy. Harvard Business Review.",
      },
      {
        title: "Demary, V. (2015): The Platformization of Digital Markets. IW policy papers, S. 1–22.",
      },
      {
        title: "Lehmann, N. (2019): Verkauf über Vermittlungsplattformen. Eine empirische Untersuchung von Erfolgsfaktoren. Hagen: Springer Gabler.",
      },
      {
        title: "Parker, G. G., Van Alstyne, M. W. & Choudary, S. P. (2016): Platform Revolution – How Networked Markets Are Transforming the Economy and How to Make Them Work for You. W. W. Norton & Company.",
      },
      {
        title: "Evans, D. S. & Gawer, A. (2016): The Rise of the Platform Enterprise – A Global Survey. The Center for Global Enterprise.",
      },
      {
        title: "Schneider, M. & Abeck, S. (2023): Engineering Microservice-Based Applications Using an Integration Platform as a Service. IEEE SOSE 2023, S. 124–129.",
      },
      {
        title: "Hyrynsalmi, S. M. (2022): The State-of-the-Art of the Integration Platforms as a Service research. IEEE/ACM IWSiB 2022, S. 17–22.",
      },
      {
        title: "Younis, R. et al. (2024): A Comprehensive Analysis of Cloud Service Models – IaaS, PaaS, and SaaS in the Context of Emerging Technologies and Trends. ICECCE 2024, S. 1–6.",
      },
      {
        title: "Friederici, N. et al. (2020): Plattforminnovation im Mittelstand. Berlin: Alexander von Humboldt Institut für Internet und Gesellschaft.",
      },
      {
        title: "Neßlauer, N.: Plattformökonomie für IT-Dienstleister – empirische Untersuchung (Masterarbeit, smiit GmbH). Auf Anfrage erhältlich.",
      },
    ],

    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    keywords: [
      "Plattformökonomie",
      "SaaS",
      "IT-Dienstleister",
      "Plattformgeschäftsmodell",
      "Software-as-a-Service",
      "MVP",
      "Go-to-Market",
      "Netzwerkeffekte",
      "Produktstrategie",
      "Digitales Geschäftsmodell",
    ],
    metaTitle: "Plattformökonomie für IT-Dienstleister: Von Projektgeschäft zu SaaS | smiit",
    metaDescription:
      "Wie IT-Dienstleister aus Projektgeschäft skalierbare SaaS- und Plattformprodukte entwickeln – Strategie, Organisation, Technologie, Vertrieb, MVP, Timing und Erfolgsfaktoren.",
  },

  en: {
    slug: "platform-economy-for-it-service-providers",
    category: "apps",
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    author: "Noah Neßlauer",
    title:
      "Platform economy for IT service providers: turning project business into scalable software products",
    shortTitle: "Platform economy for IT service providers",
    excerpt:
      "Building a good software product is only the beginning. How IT service providers turn project-based business into scalable SaaS and platform products — and why success rarely comes down to technology alone, but to strategy, organisation, sales and timing.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Platform economy for IT service providers",
    },
    coverImage: {
      url: "/assets/blog/platform-economy/platform.webp",
      width: 2499,
      height: 942,
      alt: "The platform as the interplay of the four fields of action: strategy, organisation, technology and sales.",
    },

    blocks: [
      { type: "heading", text: "Why good software doesn't automatically make a scalable business" },
      {
        type: "paragraph",
        text: "Building a good software product is only the beginning. What matters is whether it becomes a scalable business model: with a clear target group, recurring revenue, a solid market position and a sales motion that doesn't start from scratch with every new customer.",
      },
      {
        type: "paragraph",
        text: "Many IT service providers know the starting point: the project business runs, customers value bespoke delivery and demand is fundamentally there. At the same time, growth stays tightly coupled to available staff. More revenue usually means more project hours, more coordination and more operational complexity.",
      },
      {
        type: "paragraph",
        text: "A SaaS or platform solution can change that relationship. It doesn't fully replace bespoke services, but it reduces variable costs and generates recurring revenue. Getting there, however, is far more demanding than simply “productising” an existing service.",
      },
      {
        type: "paragraph",
        text: "This article shows which factors are particularly relevant for IT service providers when introducing platform-based software products — and why technology alone rarely determines success.",
      },

      { type: "heading", text: "Why project business hits scaling limits" },
      {
        type: "paragraph",
        text: "Classic IT services are valuable, but only scale to a limited degree. The revenue of a consulting, development or data analytics project is usually tied directly to working time: conception, development, coordination, operations and support.",
      },
      {
        type: "paragraph",
        text: "This creates closeness to the customer and enables bespoke solutions. At the same time, variable costs arise with every additional engagement. Growth requires additional capacity, qualified staff and an organisation that becomes more complex as the number of projects increases.",
      },
      {
        type: "paragraph",
        text: "Digital products work differently in economic terms. Their development, maintenance and the build-up of a secure operating environment cause high fixed costs at first. But once the product is available, additional users can often be served at low marginal cost. This is exactly where the scaling potential of software-as-a-service and platform models lies.",
        refs: [1, 2],
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/cost-development.webp",
        width: 3200,
        height: 1413,
        maxWidth: 940,
        alt: "Chart: scaling potential over growth and number of customers. Project-based business grows linearly, because revenue is tied to working hours and variable costs rise per project; the SaaS/platform curve rises disproportionately after high initial fixed costs and low marginal costs.",
        caption: "Scaling compared: in project business, revenue is tied to working hours and variable costs rise with every project. SaaS and platform models have high initial fixed costs but then low marginal costs — and therefore far greater scaling potential.",
      },
      {
        type: "paragraph",
        text: "That doesn't mean a SaaS product becomes profitable automatically. On the contrary: the upfront investment shifts. While in project business individual customer engagements generate revenue early, platform providers often first have to invest in product development, market entry, sales, security and operational readiness.",
        refs: [3],
      },
      {
        type: "paragraph",
        text: "The central question is therefore not “Can we build this software?” but “Can we position, finance and sell a standardised product in such a way that it is used permanently by many customers?”",
      },

      { type: "heading", text: "What the platform economy means in a B2B context" },
      {
        type: "paragraph",
        text: "The term platform is often associated with large marketplaces such as Amazon, Airbnb or Uber. These examples represent so-called transaction platforms: they bring two or more market sides together — for example providers and customers — and profit from intermediation, commissions or advertising.",
        refs: [4],
      },
      {
        type: "paragraph",
        text: "For IT service providers, however, a broader perspective is relevant. The platform economy describes business models in which digital infrastructure, standardised services and repeatable processes enable a disproportionate scaling effect.",
        refs: [5],
      },
      { type: "paragraph", text: "Among others, four types can be distinguished:" },
      {
        type: "grid",
        items: [
          { title: "Transaction platforms", description: "Mediate between different market sides, such as customers, service providers or suppliers." },
          { title: "Innovation platforms", description: "Create ecosystems on which third parties build or distribute their own solutions, for example app stores." },
          { title: "Integration platforms", description: "Connect different systems, data sources and applications." },
          { title: "SaaS platforms", description: "Provide standardised software via a central infrastructure operated by the provider." },
        ],
      },
      {
        type: "paragraph",
        text: "For many smaller and mid-sized IT service providers, the last type in particular is relevant. A specialised SaaS product can, for example, standardise reporting, project management, data integration, document management or industry-specific processes.",
        refs: [6, 7, 8, 9],
      },
      {
        type: "paragraph",
        text: "The difference from bespoke development is not only delivery via the cloud. What matters is the product logic: instead of fully re-implementing individual customer requirements, a reusable core is created that is valuable enough for a clearly defined target group.",
      },

      { type: "heading", text: "SaaS is not automatically a platform" },
      {
        type: "paragraph",
        text: "Not every cloud-based software product is automatically a platform. In the B2B space in particular, the terms are frequently conflated.",
      },
      {
        type: "paragraph",
        text: "A classic platform typically benefits from network effects: the value for individual users increases as further users, providers, partners or integrations are added. With marketplaces this relationship is especially visible. The more providers are active, the more attractive the platform becomes for customers — and vice versa.",
      },
      {
        type: "paragraph",
        text: "With SaaS products these effects are often weaker. Accounting software doesn't necessarily get better just because many other companies use it. Nevertheless, SaaS products can also develop platform characteristics:",
        refs: [2],
      },
      {
        type: "grid",
        items: [
          { title: "Multiple user groups", description: "The product connects several internal or external user groups." },
          { title: "Standardised processes", description: "It standardises processes between companies and makes them repeatable." },
          { title: "Software ecosystem", description: "Via interfaces it becomes part of a growing ecosystem of applications." },
          { title: "Valuable integrations", description: "Additional integrations increase the value for existing customers." },
          { title: "Data & partners", description: "Data, partners and complementary applications make the product more attractive over time." },
        ],
      },
      {
        type: "paragraph",
        text: "Especially in specialised B2B niches, a product can therefore succeed without immediately needing strong network effects like a marketplace. What matters first is a clear, repeatable customer benefit.",
      },

      { type: "heading", text: "From contract work to product ownership" },
      {
        type: "paragraph",
        text: "The biggest change when building a software product is usually not technical. It concerns how the company thinks and acts.",
      },
      {
        type: "paragraph",
        text: "In project business, the customer often describes the desired outcome. The IT service provider analyses the requirements, develops a bespoke solution and bills for the work. The need is already concrete, and sales rely heavily on trust, references and personal consulting.",
        refs: [10],
      },
      { type: "paragraph", text: "In the platform business the starting point is different. The company itself has to decide:" },
      {
        type: "bullets",
        items: [
          "Which problem is being solved for which target group?",
          "Which requirements belong in the product core?",
          "Which customer wishes deliberately stay outside the standard?",
          "How is the value communicated clearly?",
          "Which pricing logic is comprehensible for customers and viable for the provider?",
          "Which features increase the value for many customers — and which only create one-off effort?",
        ],
      },
      {
        type: "paragraph",
        text: "This shifts the role of the service provider. It moves from an implementer to a product company. That requires a clear vision, the ability to prioritise and the courage not to serve every customer requirement individually.",
      },
      {
        type: "paragraph",
        text: "For established service providers in particular, this change can be challenging. Existing customer projects generate short-term revenue and demand attention. A new product, by contrast, needs investment, patience and its own focus. The empirical findings therefore suggest that newly founded platform companies often have better starting conditions than service providers who build a product merely alongside day-to-day business. This is no general law, but an important indication of the organisational and financial latitude required.",
        refs: [11],
      },

      { type: "heading", text: "The four central fields of action" },
      {
        type: "paragraph",
        text: "Building a successful platform or SaaS business cannot be reduced to product development. Four interconnected levels are particularly relevant: strategy, organisation, technology and sales.",
      },
      {
        type: "image",
        src: "/assets/blog/platform-economy/platform.webp",
        width: 2499,
        height: 942,
        maxWidth: 820,
        alt: "Donut chart with “Platform” at the centre and the four fields of action: strategy, organisation, technology and sales.",
        caption: "The four central fields of action of a platform or SaaS business: strategy, organisation, technology and sales.",
      },

      { type: "subheading", text: "1. Strategy: target group, market and business model" },
      { type: "paragraph", text: "At the start there is no feature list, but a clear market decision." },
      {
        type: "paragraph",
        text: "A product is especially viable when it solves a relevant problem for a narrowly defined target group. Smaller IT service providers in particular often benefit from focusing on a niche first: an industry, a specific company size, a recurring process landscape or a concrete data problem.",
      },
      {
        type: "paragraph",
        text: "A broad target group sounds attractive at first, but often increases complexity. Diverging requirements, longer decision paths and an unclear market position make product development and sales harder at the same time.",
      },
      { type: "paragraph", text: "Strategy also includes:" },
      {
        type: "grid",
        items: [
          { title: "Differentiation", description: "A clear distinction from existing solutions on the market." },
          { title: "Market entry", description: "The right timing for entering the target market." },
          { title: "Pricing model", description: "A viable pricing and monetisation logic." },
          { title: "Competitive analysis", description: "A realistic picture of providers, substitutes and market dynamics." },
          { title: "Partners & integrations", description: "A strategy for partnerships and connecting to third-party systems." },
          { title: "Financing", description: "A financing logic that fits the required upfront investment." },
          { title: "Product vision", description: "A long-term vision for evolving the product." },
        ],
      },
      {
        type: "paragraph",
        text: "In the platform economy, market entry is particularly sensitive. Markets with low marginal costs and pronounced network effects can concentrate quickly. Once a few providers have built a strong market position, the barriers to entry rise considerably.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "For smaller providers this doesn't mean they have to avoid large markets. But it does mean they need a credible differentiation: through industry knowledge, process proximity, integrations, data expertise, a specialised user experience or a particularly well-understood problem.",
      },

      { type: "subheading", text: "2. Organisation: product work needs its own ownership" },
      { type: "paragraph", text: "A platform product must not remain merely a side project between customer engagements." },
      {
        type: "paragraph",
        text: "For a product to become market-ready, it needs clear responsibilities. These include decisions about product vision, prioritisation, customer feedback, architecture, quality, go-to-market and further development.",
      },
      {
        type: "paragraph",
        text: "Successful platform companies often work with dedicated, cross-functional product teams. These combine technical expertise with market understanding, product management and a sales perspective. Depending on company size, this doesn't have to be a large team. What matters is that product decisions don't arise solely as a reaction to individual customer projects.",
      },
      {
        type: "paragraph",
        text: "Particularly critical is the balance between standardisation and customer proximity. Customer feedback is indispensable. But it should not turn the product into a collection of individual special cases. A useful guiding question is: does this requirement make the product better for a relevant part of the target group — or does it only solve an individual problem for a single customer? This distinction protects product teams from gradually giving up the scalability of their own offering.",
      },

      { type: "subheading", text: "3. Technology: trust is part of the product" },
      { type: "paragraph", text: "Technology is not the only success factor, but it sets the limits of the business model." },
      {
        type: "paragraph",
        text: "B2B customers don't just buy features. They also assess whether software can be operated securely, reliably and in an integrable way over the long term. Especially for data-intensive applications, topics such as data protection, permissions, data export, interfaces, availability, scalability and governance play a central role.",
      },
      {
        type: "paragraph",
        text: "A product doesn't have to have the technical complexity of a global enterprise system from day one. But it should be built so that it can evolve without needing fundamental adaptation for every new customer. The following are particularly important:",
      },
      {
        type: "grid",
        items: [
          { title: "Standardised product core", description: "A reusable core instead of individual one-off solutions." },
          { title: "Data & permission logic", description: "Comprehensible management of data and access rights." },
          { title: "Scalable architecture", description: "An operating architecture that grows with the number of users." },
          { title: "Clear interfaces", description: "Defined interfaces to relevant third-party systems." },
          { title: "Security & data protection", description: "Reliable security and data protection measures." },
          { title: "Iterative development", description: "The ability to expand features step by step." },
        ],
      },
      {
        type: "paragraph",
        text: "The technical architecture is therefore not just a cost factor. It is a signal of trust and directly influences how well a product can be sold, operated and scaled over the long term.",
      },

      { type: "subheading", text: "4. Sales: service selling is not product selling" },
      {
        type: "paragraph",
        text: "An existing sales network in project business is valuable — but no automatic proof that a software product can be marketed successfully.",
      },
      {
        type: "paragraph",
        text: "The reason lies in the different sales logic. Bespoke services often have high deal values. It can therefore be worthwhile to invest several conversations, workshops and consulting days into acquiring a single customer. With a standardised SaaS product, revenue per customer is often lower. Sales costs, onboarding effort and support must therefore be weighed more heavily against the long-term customer value.",
      },
      {
        type: "paragraph",
        text: "The research shows: contacts within the specific target group are particularly valuable, because they facilitate direct sales, trust and credible recommendations. General sales success in a services environment, by contrast, cannot be transferred automatically to a platform product.",
        refs: [5],
      },
      { type: "paragraph", text: "For selling a B2B product, this means:" },
      {
        type: "numbered",
        items: [
          { title: "Quickly understandable value", description: "The product's benefit must be graspable immediately." },
          { title: "A clear problem", description: "The target group must see which risk or effort the product reduces." },
          { title: "Building trust", description: "Data protection, support and long-term availability must be credible." },
          { title: "A fitting model", description: "Price, onboarding and contract model must match the customer's maturity." },
          { title: "Networks as door openers", description: "Existing contacts ease the entry, but don't replace a robust go-to-market model." },
        ],
      },

      { type: "heading", text: "Which success factors show up in practice" },
      {
        type: "paragraph",
        text: "The underlying research combines ten semi-structured expert interviews with a qualitative analysis of two established platform companies. The results do not provide universally valid causal laws, but they do show recurring patterns that are relevant for IT service providers in product development and market launch.",
        refs: [11],
      },

      { type: "subheading", text: "Enter the market early with an MVP" },
      {
        type: "paragraph",
        text: "An early, functional minimum viable product helps to test market assumptions quickly. What matters is not implementing as many features as possible, but learning early:",
      },
      {
        type: "bullets",
        items: [
          "Does the target group understand the offering?",
          "Is the problem perceived as urgent enough?",
          "Which features are actually decisive for purchase?",
          "Which requirements are only supposedly important?",
          "Is there a genuine willingness to pay?",
        ],
      },
      {
        type: "paragraph",
        text: "User feedback is not a one-off validation step here. It has to become part of a continuous product process. Platforms rarely develop successfully along a plan defined entirely in advance. They emerge through repeated cycles of assumption, feedback, prioritisation and improvement.",
      },
      {
        type: "flow",
        steps: [
          "Form an assumption",
          "Ship the MVP",
          "Gather user feedback",
          "Prioritise insights",
          "Improve the product",
          "Test again",
        ],
      },

      { type: "subheading", text: "Take the market gap and timing seriously" },
      {
        type: "paragraph",
        text: "The timing of market entry can be decisive. In the research, platforms show better prospects of success when they enter markets with few comparable offerings or can clearly occupy an existing gap.",
        refs: [11],
      },
      {
        type: "paragraph",
        text: "This doesn't mean that only first movers can succeed. A later market entry can work if the provider creates a relevant differentiation. Without a clear market position, however, it becomes difficult to compete against established products with larger budgets, greater brand awareness and more extensive sales resources.",
      },

      { type: "subheading", text: "Reorganising as the platform grows" },
      {
        type: "paragraph",
        text: "As the platform scales, not only the product changes, but also the appropriate organisational structure. With an initially lean and not very modular platform, a single cross-functional team can closely connect development, business requirements and direct customer feedback. Support, sales or other administrative tasks can often still be bundled with the existing services business at this stage.",
      },
      {
        type: "paragraph",
        text: "But as the platform grows into several functionally independent modules, this structure should evolve: dedicated, cross-functional product teams then take responsibility for individual product areas and their development. Supporting functions such as sales, support or customer success increasingly become relevant as independent, scalable areas. What matters is not an organisation that is as complex as possible, but a structure that creates clear product ownership and prevents the platform from falling back into the logic of classic project business through individual customer requirements.",
      },

      { type: "subheading", text: "Sales with limited resources" },
      { type: "paragraph", text: "A product can be technically excellent and still fail." },
      {
        type: "paragraph",
        text: "Especially with smaller IT service providers there is a risk of viewing product development in isolation. One of the most important factors in product development is to think about sales from the very beginning: how do potential customers become aware of us? How do we sell the product cost-efficiently?",
      },
      {
        type: "paragraph",
        text: "If sufficient financial resources are available, platform providers can trial and scale several sales channels in parallel. These include in particular direct sales, targeted online marketing, referral programmes, incentives for word-of-mouth or — for a suitable, attention-grabbing product idea — PR campaigns. What matters is to test the individual channels in a controlled way first and only invest further where customer acquisition costs remain in an economically sensible ratio to the expected customer lifetime value.",
      },
      {
        type: "paragraph",
        text: "The reality for many smaller IT service providers, however, looks different: for the market launch of a new product there are usually no large budgets for sales and customer acquisition. The sales logic should therefore be considered before the actual product development. Companies should check early which target groups they already know, in which industries they have solid contacts, which sales or marketing competencies exist internally and how these strengths can be transferred to the new product.",
      },
      {
        type: "paragraph",
        text: "With limited resources, cost-effective and credible channels gain importance. Existing contacts in the target group, recommendations from satisfied pilot customers, deliberately built word-of-mouth or industry-specific partnerships can be more effective than broadly scattered advertising campaigns. PR, too, can be an efficient lever, provided the product or the underlying problem offers a relevant, tellable story. Direct sales and online marketing remain important options, but with a small budget they should be deployed in a focused, step-by-step way with clear efficiency criteria.",
      },
      {
        type: "paragraph",
        text: "The bottleneck of limited budgets cannot be solved by lower spending alone. Above all, it requires creativity in approaching the market: not every sales channel fits every product. Success is more likely for those who combine their own experience, their existing network and a clearly defined customer benefit so that the first customers can be won with manageable use of resources.",
      },

      { type: "heading", text: "Conclusion: the platform business is an entrepreneurial transformation" },
      {
        type: "paragraph",
        text: "Building a SaaS or platform product is not merely an extension of the existing service portfolio. It changes the economic logic, the organisation and the sales of an IT service provider.",
      },
      {
        type: "paragraph",
        text: "The potential is large: recurring revenue, standardised services, better scalability and greater independence from individual project engagements. At the same time, the demands on market understanding, positioning, financing, product management and operational readiness increase.",
      },
      {
        type: "paragraph",
        text: "The most important success factor is therefore not to develop as many features as quickly as possible. What matters is making the right strategic decisions early:",
      },
      {
        type: "numbered",
        items: [
          { title: "A clearly defined target group", description: "A focused niche rather than a broad, blurry market." },
          { title: "A repeatable customer benefit", description: "A relevant problem that can be solved similarly for many customers." },
          { title: "A credible differentiation", description: "A clear reason why customers choose this product." },
          { title: "Continuous user feedback", description: "Feedback as an integral part of product development, not a one-off step." },
          { title: "Organisational adjustments", description: "Dedicated ownership and structures for product work." },
          { title: "Realistic resource planning", description: "Budget, time and staff honestly aligned with the venture." },
          { title: "A cost-efficient sales concept", description: "A go-to-market that fits limited resources." },
        ],
      },
      {
        type: "paragraph",
        text: "This is how a good idea becomes not just a software solution, but a viable digital business model.",
      },
    ],

    faq: [
      {
        question: "What is the difference between a SaaS product and a platform?",
        answer:
          "The terms overlap, but they aren't identical. SaaS first describes a delivery and business model: standardised software that is operated centrally and usually consumed via subscription. A product becomes a platform only when additional value arises from the interplay of several sides — for example through network effects, an ecosystem of partners and integrations, or the standardisation of processes between companies. Many successful B2B products start as focused SaaS and only develop platform characteristics later, once interfaces, partners and complementary applications are added. In the beginning, this distinction matters less than a clear, repeatable customer benefit.",
      },
      {
        question: "Should established IT service providers build their own SaaS products at all?",
        answer:
          "It can make a lot of sense — but not automatically. The right trigger is usually a recurring problem that appears in a similar form across many customer projects and can be condensed into a standardisable product core. What matters is less the technical feasibility than whether time, budget and clear responsibilities for product development, market entry and operations are in place. If the product is only built on the side between customer engagements, the necessary focus is often missing. Anyone taking the step should therefore treat it as an independent entrepreneurial venture, not as a mere extension of day-to-day business.",
      },
      {
        question: "How do I find the right target group or niche for a product?",
        answer:
          "Ideally where you already have trust, references and a genuine understanding of the problem. Smaller providers in particular benefit from focusing narrowly at first — for example on an industry, a specific company size or a recurring process and data landscape. A broad target group sounds more attractive, but it increases complexity, lengthens decision paths and dilutes positioning. A good test is whether you can describe your target group's problem so precisely that those affected immediately recognise themselves. Only once benefit and willingness to pay are proven in that niche does expansion become worthwhile.",
      },
      {
        question: "Why isn't a successful service-business sales motion enough?",
        answer:
          "Because the sales logic is different. In project business, high deal values justify several conversations, workshops and consulting days per customer. With a standardised SaaS product, revenue per customer is usually much lower, so acquisition costs, onboarding and support have to fit far more closely to the long-term customer value (customer lifetime value). Existing networks are valuable — especially contacts directly in the target group — but they don't replace a robust go-to-market model. Product sales must make the benefit quick to understand and be predictably repeatable.",
      },
      {
        question: "What belongs in an MVP — and how much functionality is needed at the start?",
        answer:
          "As little as possible, but enough to honestly test the central assumption: does the product solve a problem perceived as urgent that customers are willing to pay for? An MVP is not an unfinished product, but the smallest bundle of features with which real user feedback and willingness to pay can be measured. More important than many features is learning early which functions are actually decisive for purchase and which are only supposedly important. User feedback is not a one-off step here, but part of a continuous cycle of assumption, feedback, prioritisation and improvement.",
      },
      {
        question: "How should a SaaS product be priced?",
        answer:
          "The price should be comprehensible for customers and viable for the provider at the same time. Recurring models are common — e.g. per user, per usage unit or by feature scope — that scale with the value delivered to the customer. It's important to match price, onboarding and contract model to the maturity of the target group and to factor in the costs of acquisition, operations and support. Pricing is rarely perfect from the start; it should be reviewed and adjusted regularly based on real usage and willingness to pay. What matters is that the customer lifetime value stays sustainably above acquisition costs.",
      },
      {
        question: "Does a platform product necessarily need venture capital?",
        answer:
          "No. External capital can accelerate growth and bring additional expertise, but it isn't necessary for every product. Many B2B products can initially be financed out of the existing services business, as long as upfront investment, market potential and sales model fit together. In markets with low marginal costs and strong network effects, where providers concentrate quickly, capital can however be decisive for speed and market position. The form of financing should therefore fit the market dynamics and your own growth ambition — not the other way around.",
      },
      {
        question: "How important are network effects for a B2B SaaS product?",
        answer:
          "Network effects are a powerful lever, but not a mandatory prerequisite for success. Classic marketplaces thrive on the fact that every additional participant increases the value for everyone. Many B2B SaaS products — a piece of specialist software, for instance — by contrast don't automatically get better just because more companies use them. In specialised niches, a product can therefore succeed purely through a clear, repeatable customer benefit. Network effects can emerge later — for example through integrations, shared data or a growing partner ecosystem. They should be aimed for, but not made a condition for market entry.",
      },
      {
        question: "How do I organise product work alongside ongoing project business?",
        answer:
          "The biggest risk is that the product remains a permanent side project and gradually turns back into a bespoke solution through individual customer requests. Product work therefore needs its own clear ownership of vision, prioritisation, architecture, quality and go-to-market. In an early, lean phase, a single cross-functional team can closely connect development, business requirements and customer feedback; support and sales can sometimes still be bundled with the services business. As the product grows and becomes modular, dedicated product teams as well as independent functions for sales, support and customer success should emerge. A helpful guiding question for every request: does this make the product better for a relevant part of the target group — or does it only solve a one-off problem?",
      },
      {
        question: "Can I get the underlying findings in detail?",
        answer:
          "Yes. Alongside the theoretical groundwork, the findings are based on the empirical research in the master's thesis of Noah Neßlauer (co-founder and managing director of smiit GmbH). We're happy to make it available to you on request. Simply send an email to noah.nesslauer@smiit.de. We're also glad to advise you personally on founding a platform or SaaS business.",
      },
    ],

    sources: [
      {
        title: "Rochet, J.-C. & Tirole, J. (2003): Platform Competition in Two-Sided Markets. Journal of the European Economic Association, 1(4), 990–1029.",
      },
      {
        title: "Van Alstyne, M. W., Parker, G. G. & Choudary, S. P. (2016): Pipelines, Platforms, and the New Rules of Strategy. Harvard Business Review.",
      },
      {
        title: "Demary, V. (2015): The Platformization of Digital Markets. IW policy papers, pp. 1–22.",
      },
      {
        title: "Lehmann, N. (2019): Verkauf über Vermittlungsplattformen. Eine empirische Untersuchung von Erfolgsfaktoren. Hagen: Springer Gabler.",
      },
      {
        title: "Parker, G. G., Van Alstyne, M. W. & Choudary, S. P. (2016): Platform Revolution – How Networked Markets Are Transforming the Economy and How to Make Them Work for You. W. W. Norton & Company.",
      },
      {
        title: "Evans, D. S. & Gawer, A. (2016): The Rise of the Platform Enterprise – A Global Survey. The Center for Global Enterprise.",
      },
      {
        title: "Schneider, M. & Abeck, S. (2023): Engineering Microservice-Based Applications Using an Integration Platform as a Service. IEEE SOSE 2023, pp. 124–129.",
      },
      {
        title: "Hyrynsalmi, S. M. (2022): The State-of-the-Art of the Integration Platforms as a Service research. IEEE/ACM IWSiB 2022, pp. 17–22.",
      },
      {
        title: "Younis, R. et al. (2024): A Comprehensive Analysis of Cloud Service Models – IaaS, PaaS, and SaaS in the Context of Emerging Technologies and Trends. ICECCE 2024, pp. 1–6.",
      },
      {
        title: "Friederici, N. et al. (2020): Plattforminnovation im Mittelstand. Berlin: Alexander von Humboldt Institut für Internet und Gesellschaft.",
      },
      {
        title: "Neßlauer, N.: Platform economy for IT service providers – empirical study (master's thesis, smiit GmbH). Available on request.",
      },
    ],

    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    keywords: [
      "platform economy",
      "SaaS",
      "IT service providers",
      "platform business model",
      "software-as-a-service",
      "MVP",
      "go-to-market",
      "network effects",
      "product strategy",
      "digital business model",
    ],
    metaTitle: "Platform economy for IT service providers: from project business to SaaS | smiit",
    metaDescription:
      "How IT service providers turn project business into scalable SaaS and platform products — strategy, organisation, technology, sales, MVP, timing and success factors.",
  },
}

export default platformEconomy
