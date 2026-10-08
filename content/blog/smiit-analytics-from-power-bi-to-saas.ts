import type { LocalizedBlogPost } from "@/lib/blog"

// ---------------------------------------------------------------------------
// Post: smiit Analytics – vom Power-BI-Projekt zur SaaS-Plattform
// ---------------------------------------------------------------------------

const SA = "/assets/blog/smiit-analytics"

const smiitAnalyticsSaas: LocalizedBlogPost = {
  de: {
    slug: "smiit-analytics-from-power-bi-to-saas",
    category: "apps",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: "Noah Neßlauer",
    title:
      "Von individuellen Power-BI-Projekten zur SaaS-Plattform: Wie smiit Analytics für bexio entstanden ist",
    shortTitle: "smiit Analytics: Von Power BI zur SaaS",
    excerpt:
      "Was als Reihe individueller Power-BI-Projekte für bexio-Kunden begann, ist heute eine eigene Analytics-Plattform. Ein Erfahrungsbericht über ein Geschäftsmodell, das nicht funktionierte, die Architekturentscheidungen danach und das, was wir bei der Entwicklung mit KI-Agents gelernt haben.",
    coverImage: {
      url: `${SA}/cover.webp`,
      width: 2524,
      height: 1008,
      alt: "Von bexio über smiit Analytics zu Berichten und KI",
    },

    blocks: [
      {
        type: "paragraph",
        text: "Die meisten Softwareprodukte entstehen nicht aus einer Idee am Reißbrett. Sie entstehen aus einem Muster, das man irgendwann nicht mehr übersehen kann. Bei uns war es eine Häufung von Anfragen aus einer Richtung, mit der wir nicht gerechnet hatten: Schweizer KMU, die ihre Daten aus bexio endlich vernünftig auswerten wollten.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag erzählt, wie aus diesen Anfragen zunächst ein Power-BI-basiertes Produkt wurde, warum dieses Produkt wirtschaftlich an seine Grenzen stieß und wie wir smiit Analytics anschließend als eigene SaaS-Plattform neu gebaut haben. Es geht um Architekturentscheidungen, um Fehler, die man erst mit echten Buchhaltungsdaten findet, und um die Frage, was KI-gestützte Softwareentwicklung in einem anspruchsvollen Projekt tatsächlich leistet und was nicht.",
      },

      { type: "heading", text: "Warum ausgerechnet bexio?" },
      {
        type: "paragraph",
        text: "smiit ist im Kern ein Dienstleister für Apps, Workflows und Analytics im Mittelstand. Unser Schwerpunkt lag lange auf Auftragsmanagement und individuellen Geschäftsanwendungen. Eine Software, die ausschließlich in der Schweiz verbreitet ist, stand nicht auf unserem Radar.",
      },
      {
        type: "paragraph",
        text: "Zwischen Ende 2021 und Ende 2025 erreichten uns dann fünf bis sechs Anfragen, die sich konkret auf bexio bezogen. Das klingt nach wenig. Für ein einzelnes Drittsystem, noch dazu eines außerhalb unseres Heimatmarkts, war es für uns aber bemerkenswert viel. Die Anfragen ähnelten sich stark: Die Daten liegen in bexio, das Tagesgeschäft läuft dort gut, aber für Auswertungen über Zeit, über Bereiche hinweg oder für die Steuerung des Unternehmens reicht das Bordmittel nicht.",
      },
      {
        type: "paragraph",
        text: "Im Nachhinein ist das Muster leicht zu erklären. bexio ist in der Schweiz weit verbreitet und meldete im Februar 2026 mehr als 100.000 KMU-Kunden. Diese Unternehmen haben Buchhaltung, Aufträge, Rechnungen, Projekte und Zeiterfassung in einem System. Damit liegen die Daten für ein gutes Controlling bereits vor, sie werden nur selten genutzt. Wer das einmal erkannt hat, sieht in jeder weiteren Anfrage nicht mehr ein Einzelprojekt, sondern einen Markt.",
        refs: [1],
      },

      { type: "heading", text: "Die erste Antwort: smiit Analytics auf Basis von Power BI" },
      {
        type: "paragraph",
        text: "Die naheliegende Reaktion war, das zu tun, was wir ohnehin gut konnten: Power BI. 2024 haben wir aus den bisherigen Projekten ein standardisiertes Produkt gebaut. Es bestand aus einem vollständigen Datenmodell für die bexio-Daten und einer großen Zahl vorgefertigter Auswertungen. Ende 2025 kam es auf den bexio Marketplace.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-powerbi.webp`,
        width: 1523,
        height: 856,
        maxWidth: 960,
        alt: "Power-BI-Bericht „Verkauf – Rechnungen“ der bisherigen Version von smiit Analytics: Rechnungsverlauf nach Monat, Rechnungen nach Status, ABC-Analyse der Rechnungen je Kunde und Rechnungen je Mitarbeiter",
        caption: "Die erste Version: ein standardisiertes Power-BI-Datenmodell mit vorgefertigten Berichten, eingerichtet in der Umgebung des Kunden.",
      },
      { type: "paragraph", text: "Das Produkt hatte echte Stärken:" },
      {
        type: "bullets",
        items: [
          "**Maximale Flexibilität.** Power BI ist ein ausgereiftes Werkzeug. Nahezu jede Auswertung ließ sich umsetzen.",
          "**Datenhoheit beim Kunden.** Die Lösung wurde in der Umgebung des Kunden eingerichtet und dort betrieben.",
          "**Schneller Nutzen.** Mit den vorgefertigten Berichten war ein Großteil des Standardbedarfs sofort abgedeckt.",
        ],
      },
      { type: "paragraph", text: "Die Schwächen zeigten sich nicht in der Technik, sondern im Geschäftsmodell." },

      { type: "subheading", text: "Warum der Einmalpreis zur Falle wurde" },
      {
        type: "paragraph",
        text: "Weil die Lösung einmalig beim Kunden eingerichtet und dort gehostet wurde, hatten wir keine Kontrolle über Zugänge und Nutzung. Ein nutzungs- oder nutzerbasiertes Abo war damit praktisch nicht umsetzbar. Übrig blieb ein Einmalpreis.",
      },
      {
        type: "paragraph",
        text: "Hinzu kam: Fast jeder Kunde wollte Anpassungen. Und jede Anpassung war Entwicklungsarbeit, die wir nach Aufwand abrechnen mussten. Die Wünsche fielen dabei in zwei klar erkennbare Gruppen:",
      },
      {
        type: "bullets",
        items: [
          "**Operativ geführte Unternehmen** wollten vor allem Personalauswertungen. Gefragt waren Stundenrapporte, Auslastung und Soll-/Ist-Zeiten, oft kombiniert mit Automatisierungen wie dem regelmäßigen Mailversand an Mitarbeitende.",
          "**Treuhänder und Buchhaltungsverantwortliche** interessierten sich für die Finanzdaten. Sie wollten Bilanz, Erfolgsrechnung und Kennzahlen genau so gegliedert sehen, wie sie es für ihre Mandate brauchen.",
        ],
      },
      {
        type: "paragraph",
        text: "Für viele Kunden, gerade kleinere, summierten sich Einmalpreis und Anpassungsaufwand auf einen Betrag, der zu ihrem Budget nicht passte. Wir hatten ein gutes Produkt mit einem Preismodell, das seine eigene Zielgruppe ausschloss.",
      },

      { type: "subheading", text: "Die Lehre dahinter" },
      {
        type: "paragraph",
        text: "Rückblickend standen wir mitten in einem Spannungsfeld, das in der Literatur gut beschrieben ist. Cusumano zeigt, wie sich das Softwaregeschäft vom Verkauf von Produktlizenzen hin zu Services und wiederkehrenden Erlösen verschiebt, und welche Folgen das für Margen und Geschäftsmodelle hat. Pine beschreibt unter dem Begriff Mass Customization die Herausforderung, individuelle Leistungen zu den Kosten eines Standardprodukts anzubieten.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "Unser Power-BI-Produkt war an beiden Stellen falsch positioniert. Es war ein Produkt mit Projektlogik: standardisiert im Kern, aber jede Individualisierung kostete genauso viel wie im Projektgeschäft. Die Konsequenz war klar. Wir brauchten ein Produkt, bei dem Individualisierung nicht mehr Entwicklungsaufwand auf unserer Seite bedeutet.",
      },
      {
        type: "image",
        src: `${SA}/business-model.webp`,
        width: 3600,
        height: 1560,
        maxWidth: 1040,
        alt: "Vergleich der Betriebsmodelle: Bisher wurde Power BI in jeder Kundenumgebung einzeln eingerichtet und angepasst, abgerechnet per Einmalpreis und Aufwand. Heute bedient eine zentral betriebene SaaS-Plattform viele bexio-Firmen per Abo, mit Standard und KI-Selfservice.",
        caption: "Vom Projekt mit Produktetikett zur echten SaaS: Erst der zentrale Betrieb macht ein faires Abo und Updates für alle möglich.",
      },

      { type: "heading", text: "Die Neuausrichtung: Was das neue Produkt leisten musste" },
      {
        type: "paragraph",
        text: "Bevor wir eine Zeile Code geschrieben haben, haben wir die Anforderungen neu formuliert. Die wichtigsten waren:",
      },
      {
        type: "numbered",
        items: [
          {
            title: "Echte SaaS statt Installation",
            description: "Eine zentral betriebene Anwendung, in der viele Kunden sicher voneinander getrennt arbeiten. Nur so werden Updates, Support und ein Abo-Modell überhaupt möglich.",
          },
          {
            title: "Ein faires, planbares Preismodell",
            description: "Ein Abonnement pro verbundener bexio-Firma und pro Nutzer, vertrieben über den bexio Marketplace, statt eines hohen Einmalpreises.",
          },
          {
            title: "Individualisierung ohne Entwicklungsaufwand",
            description: "Die Anpassungswünsche aus der Power-BI-Zeit sollten entweder im Standard enthalten sein oder vom Kunden selbst umgesetzt werden können.",
          },
          {
            title: "Keine Einrichtung beim Kunden",
            description: "Anmeldung, bexio verbinden, fertig. Die Daten sollen ohne manuelle Exporte automatisch aktuell bleiben.",
          },
          {
            title: "Datenschutz als Grundvoraussetzung",
            description: "Es geht um Buchhaltungs- und Personaldaten. Mandantentrennung, Verschlüsselung und nachvollziehbare Zugriffe sind hier nicht verhandelbar.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Aus Anforderung 3 folgte die wichtigste Produktentscheidung: Wir kombinieren einen starken Standard mit KI-Unterstützung. Die typischen Wünsche aus der Power-BI-Zeit, also Stunden, Auslastung, Bilanz, Erfolgsrechnung und Kennzahlen, haben wir direkt im Standardbericht abgebildet. Für alles, was darüber hinausgeht, können Kunden ihre Berichte selbst erstellen und anpassen, auf Wunsch mit Hilfe einer KI, die Fragen an die Daten beantwortet und Berichte bearbeitet. So lassen sich auch sehr individuelle Anforderungen in einem Standardprodukt abbilden.",
      },

      { type: "subheading", text: "Warum nicht einfach Power BI Embedded?" },
      {
        type: "paragraph",
        text: "Die Frage lag nahe, und wir haben sie ernsthaft geprüft. Power BI Embedded ist für klassische Berichte stark. Für unser Ziel hätte es uns aber an ein Lizenz- und Einbettungsmodell gebunden, das wir nicht kontrollieren, und damit genau die Kostenstruktur zurückgebracht, der wir entkommen wollten. Auch das Einbetten eines Open-Source-BI-Tools wie Metabase oder Superset haben wir verworfen: Es fühlt sich für Anwender schnell wie ein Fremdkörper an und lässt kaum Raum für eine KI, die tief in Datenmodell und Berichte integriert ist.",
      },
      {
        type: "paragraph",
        text: "Wir haben uns deshalb für eine eigene Anwendung entschieden, gebaut auf bewährten Open-Source-Bausteinen.",
      },

      { type: "heading", text: "Die Architektur im Überblick" },
      { type: "paragraph", text: "Der Datenfluss lässt sich in fünf Stufen beschreiben:" },
      {
        type: "image",
        src: `${SA}/architecture.webp`,
        width: 3840,
        height: 1320,
        maxWidth: 1040,
        alt: "Datenfluss von smiit Analytics: Die bexio API wird vom .NET-Sync-Worker gelesen, in PostgreSQL über die Schemas raw, staging und mart (Sternschema) aufbereitet, im Semantic Layer Cube modelliert und in der Web-App (Next.js, ASP.NET Core) angezeigt. KI-Funktionen bearbeiten Berichte über Cube und erkunden das mart-Schema nur lesend. Alles läuft auf Microsoft Azure.",
        caption: "Von der bexio API bis zum Bericht: eine Datenbank mit getrennten Schemas, ein zentraler Semantic Layer und Row-Level-Security auf jeder analytischen Tabelle.",
      },
      {
        type: "table",
        headers: ["Schicht", "Technologie", "Aufgabe"],
        rows: [
          ["Datenanbindung", ".NET Worker Service", "Lädt rund 35 Objekttypen aus bexio: Buchhaltung, Aufträge, Rechnungen, Bank, Projekte, Zeiten, Personal"],
          ["Rohdaten & Staging", "PostgreSQL (raw, staging)", "Speichert die Originalantworten unverändert und überführt sie in typisierte Tabellen"],
          ["Analytisches Modell", "PostgreSQL (mart)", "Sternschema mit Fakten und Dimensionen, aufbereitet für Auswertungen"],
          ["Semantic Layer", "Cube", "Definiert Kennzahlen, Beziehungen und Zeitlogik zentral, eine Abfragesprache für Berichte und KI"],
          ["Anwendung", "Next.js/React, ASP.NET Core API", "Berichte, Filter, Bearbeitung, Benutzerverwaltung, KI-Funktionen"],
          ["Betrieb", "Microsoft Azure", "Container-basiert, automatisierte Deployments über getrennte Umgebungen"],
        ],
      },
      {
        type: "paragraph",
        text: "Das analytische Modell folgt der dimensionalen Modellierung nach Kimball und Ross: Fakten wie Buchungen, Rechnungspositionen oder Zeiteinträge werden über gemeinsame Dimensionen wie Datum, Kunde, Konto oder Projekt verbunden. So können Umsatz, offene Posten und Stunden in einem Bericht gemeinsam gefiltert werden, ohne dass jede Kombination einzeln programmiert werden muss.",
        refs: [4],
      },
      {
        type: "image",
        src: `${SA}/star-schema.webp`,
        width: 3600,
        height: 1500,
        maxWidth: 940,
        alt: "Vereinfachtes Sternschema: Die Fakten Buchungen, Rechnungen und Zeiteinträge teilen sich die Dimensionen Datum, Währung, Kunde, Konto, Projekt und Mitarbeitende.",
        caption: "Gemeinsame Dimensionen verbinden die Fakten. Vereinfachter Ausschnitt: Das Modell umfasst rund 20 Fakten und 17 Dimensionen.",
      },
      {
        type: "paragraph",
        text: "Berichte sind in smiit Analytics keine fest programmierten Seiten, sondern deklarative Definitionen: Welche Visualisierung zeigt welche Kennzahl nach welcher Dimension. Das hat einen weitreichenden Vorteil. Was als Daten beschrieben ist, kann validiert, versioniert und verglichen werden, und es kann von einer KI bearbeitet werden, ohne dass Code entsteht.",
      },

      { type: "heading", text: "Die größten Herausforderungen und wie wir sie gelöst haben" },

      { type: "subheading", text: "1. Mandantentrennung, die auch bei Fehlern hält" },
      {
        type: "paragraph",
        text: "In einer SaaS-Anwendung teilen sich viele Kunden dieselbe Infrastruktur. Das ist wirtschaftlich der Kern des Modells, und gleichzeitig das größte Risiko. Bezemer und Zaidman weisen darauf hin, dass eine falsche Architekturentscheidung bei der Mandantenfähigkeit schnell zum Wartungsproblem wird. Die Architektur von Force.com zeigt, wie weit ein konsequent geteiltes Modell tragen kann, wenn die Trennung im Fundament verankert ist. Microsoft beschreibt in seinem Architekturleitfaden die Bandbreite von vollständig isolierten bis vollständig geteilten Modellen und die jeweiligen Kompromisse.",
        refs: [5, 6, 7],
      },
      { type: "paragraph", text: "Wir haben uns für ein geteiltes Modell mit mehreren Verteidigungslinien entschieden:" },
      {
        type: "bullets",
        items: [
          "**Die Datenbank ist die letzte Instanz.** Jede analytische Tabelle ist durch PostgreSQL Row-Level-Security geschützt. Diese Regeln gelten auch für den Eigentümer der Tabelle (`FORCE ROW LEVEL SECURITY`). Ein vergessener Filter im Anwendungscode führt damit nicht zu einem Datenleck, sondern zu einem leeren Ergebnis.",
          "**Der Kontext reist mit jeder Abfrage.** Welche bexio-Firma abgefragt wird, setzt die Anwendung pro Transaktion. Damit kann bei geteilten Datenbankverbindungen kein Kontext von einer Anfrage in die nächste „durchsickern“.",
          "**Die Grenze liegt bei der Datenquelle.** Isoliert wird nicht der einzelne Bericht, sondern die verbundene bexio-Firma. Diese Entscheidung haben wir früh korrigiert. Sie macht es möglich, dass mehrere Berichte und Nutzer auf dieselbe Datenquelle zugreifen, ohne die Trennung aufzuweichen.",
          "**Tests beweisen die Trennung.** Automatisierte Tests versuchen gezielt, auf Daten anderer Mandanten zuzugreifen, und müssen daran scheitern.",
        ],
        itemRefs: { 0: [8] },
      },
      {
        type: "image",
        src: `${SA}/tenant-isolation.webp`,
        width: 3600,
        height: 1230,
        maxWidth: 1040,
        alt: "Drei Verteidigungslinien der Mandantentrennung: Berechtigung auf die Datenquelle, Kontext je Transaktion und Row-Level-Security mit FORCE. In der Datenbank sind für eine Anfrage von Firma A nur die Zeilen von Firma A sichtbar; Isolationstests prüfen gezielt Fremdzugriffe.",
        caption: "Mehrere Verteidigungslinien: Selbst wenn der Anwendungscode einen Filter vergisst, sieht eine Anfrage von Firma A nur die Zeilen von Firma A.",
      },
      {
        type: "paragraph",
        text: "Dasselbe Prinzip gilt für den Plattformbetrieb. Auch Administratoren von smiit sehen keine Kundendaten, solange der Kunde keinen zeitlich befristeten und protokollierten Supportzugang freigibt.",
      },

      { type: "subheading", text: "2. Die bexio-Anbindung: robust statt schnell" },
      {
        type: "paragraph",
        text: "Eine Schnittstelle „anzubinden“ ist schnell erledigt. Sie so anzubinden, dass die Daten vieler Kunden mehrmals täglich zuverlässig synchronisiert werden, ist eine andere Aufgabe. Einige Punkte, die uns beschäftigt haben:",
      },
      {
        type: "bullets",
        items: [
          "**Inkrementell, wo möglich.** Wo die API es erlaubt, laden wir nur geänderte Datensätze, mit einem Überlappungsfenster als Sicherheitsnetz. Wo das nicht geht, laden wir vollständig und verwerfen unveränderte Datensätze über einen Hash-Vergleich.",
          "**Gelöschte Daten erkennen.** Inkrementelle Abfragen liefern keine Löschungen. In regelmäßigen Abständen gleichen wir deshalb vollständig ab, damit gelöschte Belege nicht dauerhaft in den Auswertungen verbleiben.",
          "**Faire Lastverteilung.** Die API-Limits gelten pro verbundener Firma. Wir begrenzen die Parallelität pro Verbindung und insgesamt, respektieren die Wartezeiten, die die API vorgibt, und verteilen automatische Aktualisierungen mit einem zufälligen Versatz, damit nicht alle Kunden zur vollen Stunde gleichzeitig synchronisieren.",
          "**Zeit ist nicht gleich Zeit.** Zeitstempel kommen ohne Zeitzonenangabe in Schweizer Ortszeit. Wer sie als UTC interpretiert, verschiebt Daten um ein bis zwei Stunden, und zweimal im Jahr zusätzlich durch die Sommerzeit.",
        ],
      },
      {
        type: "paragraph",
        text: "Aus Kundensicht stecken dahinter ganz einfache Einstellungen: Jede Datenquelle wird zu frei wählbaren Uhrzeiten automatisch aktualisiert, und eine manuelle Aktualisierung ist jederzeit möglich. Ein tägliches Budget an Aktualisierungen hält die Last und damit die Betriebskosten planbar. Auch das ist eine Voraussetzung für einen fairen Abopreis.",
      },
      {
        type: "image",
        src: `${SA}/refresh-schedule.webp`,
        width: 1950,
        height: 753,
        maxWidth: 1040,
        alt: "Einstellungen „Automatische Aktualisierung“ einer Datenquelle: Raster mit 24 Uhrzeiten, davon 05:00 und 12:00 gewählt (2 von 8). Darunter die nächste Aktualisierung ab 08.10.2026, 05:00 (Europe/Zurich), heute genutzt 0 von 12 automatischen, davon 0 durch die KI, sowie die Option „Alles neu laden“, einmal pro Tag möglich.",
        caption: "Aktualisierung aus Kundensicht: bis zu acht frei wählbare Uhrzeiten, ein tägliches Kontingent und bei Bedarf ein vollständiges Neuladen.",
      },

      { type: "subheading", text: "3. Eine bewusste Abweichung vom Standard-Stack" },
      {
        type: "paragraph",
        text: "Für die Transformation von Rohdaten in das analytische Modell ist dbt heute der De-facto-Standard. Wir haben damit begonnen und uns nach nur einer Woche wieder davon verabschiedet.",
      },
      {
        type: "paragraph",
        text: "Der Grund war eine zentrale Anforderung: Eine Synchronisation muss **durchgängig** wirken. Wenn ein Kunde auf „Aktualisieren“ klickt, sollen nicht nur die Rohdaten neu geladen werden. Genau die Daten dieses Kunden sollen bis in den Bericht durchgerechnet werden, und zwar sofort. dbt ist als Batch-Werkzeug konzipiert, das ganze Modelle neu baut. Es hätte außerdem eine zweite Laufzeitumgebung und ein zweites Berechtigungskonzept neben die Row-Level-Security gestellt.",
      },
      {
        type: "flow",
        steps: [
          "Kunde klickt auf „Aktualisieren“",
          "Sync-Worker lädt geänderte Daten aus bexio (raw)",
          "Typisierung in staging",
          "SQL-Schritte bauen das Sternschema (mart)",
          "Alles pro Datenquelle in einer Transaktion",
          "Bericht zeigt sofort die neuen Zahlen",
        ],
      },
      {
        type: "paragraph",
        text: "Wir haben die Transformation deshalb als geordnete Abfolge von SQL-Schritten in den .NET-Worker integriert. Sie läuft pro Datenquelle in einer Transaktion, schreibt nur tatsächlich geänderte Zeilen und überspringt sich selbst, wenn sich nichts geändert hat. Das war mehr Eigenentwicklung, als uns lieb war. Aber es ist die Stelle, an der sich die Architektur nach dem Produkt richtet und nicht umgekehrt.",
      },

      { type: "subheading", text: "4. Zahlen, die plausibel aussehen und trotzdem falsch sind" },
      {
        type: "paragraph",
        text: "Das war die lehrreichste Kategorie von Problemen. Ein Absturz fällt sofort auf. Eine Bilanzsumme, die um den Faktor drei zu hoch ist, fällt womöglich erst dem Treuhänder auf. Einige Beispiele, die wir erst mit echten Daten gefunden haben:",
      },
      {
        type: "bullets",
        items: [
          "**Eröffnungsbilanzen pro Geschäftsjahr.** bexio bucht die Eröffnungssalden in jedem Geschäftsjahr neu. Eine Bilanzabfrage, die nicht auf ein Geschäftsjahr eingeschränkt ist, summiert diese Salden über alle Jahre und bläht das Ergebnis entsprechend auf. Unsere Lösung ist bewusst streng: Solche Abfragen werden vom Semantic Layer abgelehnt, bevor sie die Datenbank erreichen.",
          "**Top-N-Listen mit leeren Einträgen.** PostgreSQL sortiert fehlende Werte bei absteigender Sortierung zuerst ein. Eine „Top 10 Kunden nach Umsatz“ zeigte dadurch in bestimmten Kombinationen Kunden ohne Umsatz ganz oben.",
          "**Vorjahresvergleiche mit 0 % Wachstum.** Wird ein Vorjahresvergleich nach der Jahres-Dimension statt nach einer echten Zeitachse gruppiert, vergleicht er jedes Jahr mit sich selbst. Das Ergebnis ist mathematisch korrekt und fachlich wertlos.",
          "**Fremdwährungen.** Jeder Betrag wird in Originalwährung und in Buchungswährung geführt, umgerechnet mit dem Kurs, der am Belegdatum gültig war, und nicht mit dem heutigen.",
        ],
      },
      {
        type: "paragraph",
        text: "Das gemeinsame Muster: Fachliche Regeln der Buchhaltung gehören an **eine** zentrale Stelle, und wo sie verletzt werden könnten, muss das System lieber ablehnen als raten. Diese Haltung prägt auch den Umgang mit KI.",
      },

      { type: "subheading", text: "5. Individuelle Anforderungen im Standardprodukt, mit KI" },
      {
        type: "paragraph",
        text: "Hier schließt sich der Kreis zur Power-BI-Zeit. Die häufigsten Anpassungswünsche sind heute Teil des Standards. Jeder neue Arbeitsbereich startet mit einem Bericht, der Übersicht, Verkauf, Einkauf, Erfolgsrechnung, Bilanz, Arbeitszeiten, Projekte und Cashflow abdeckt. Dazu kommt ein Katalog betriebswirtschaftlicher Kennzahlen, von Liquiditätsgraden über EBITDA-Marge bis zur Eigenkapitalrendite.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-standard-report.webp`,
        width: 1916,
        height: 941,
        maxWidth: 1040,
        alt: "Standardbericht in smiit Analytics, Seite „Übersicht“: Kennzahlen zu Umsatz, Ergebnis, Zahlungseingängen und offenen Forderungen, Umsatz je Monat mit Vorjahr, Top-Kunden nach Umsatz, Ertrag, Aufwand und Ergebnis je Monat sowie Umsatz bezahlt und offen; links die Navigation von Verkauf bis Cashflow",
        caption: "Der Standardbericht deckt ab, was früher individuell entwickelt wurde: von der Übersicht bis zu Bilanz, Arbeitszeiten und Cashflow.",
      },
      {
        type: "paragraph",
        text: "Für die Kennzahlen muss festgelegt werden, welche Konten in welche Größe einfließen. Das ist genau die Arbeit, die früher Anpassungsaufwand verursacht hat. Heute schlägt das System die Zuordnung anhand der Kontenbereiche des Schweizer KMU-Kontenrahmens vor und nutzt bei unklaren Konten eine KI. Der Kunde prüft und bestätigt nur noch.",
      },
      {
        type: "image",
        src: `${SA}/account-mapping.webp`,
        width: 1950,
        height: 1017,
        maxWidth: 1040,
        alt: "Einstellungen „Kennzahlen“: Bilanzkennzahlen wie Liquide Mittel (788,89), Liquiditätsgrad 1 (10,1 %), Working Capital (19.375,95) oder Debitorenfrist (303 d) und Erfolgsrechnungskennzahlen wie EBIT, EBITDA, Gesamtkapitalrentabilität (92,6 %) oder Materialaufwand (5.111,89), jeweils mit der Anzahl zugeordneter Konten und dem Hinweis „automatisch“; oben rechts die Schaltfläche „Neu vorschlagen“.",
        caption: "Kontenzuordnung: Jede Kennzahl erhält ihre Konten automatisch zugeordnet, die Beträge rechnen sich live. Der Kunde prüft und passt bei Bedarf an.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-report-editor.webp`,
        width: 889,
        height: 995,
        maxWidth: 600,
        alt: "Bericht-Editor in smiit Analytics: Für das Diagramm „Top-Kunden nach Umsatz“ sind Balkendiagramm, die Kennzahl Umsatz als Wert und Kontakt als Kategorie gewählt; darunter der Kennzahlenkatalog mit Rechnungskennzahlen wie Neukundenumsatz, Offener Rechnungsbetrag oder Mahnquote",
        caption: "Selbst anpassen statt beauftragen: Visualisierung wählen und Kennzahlen aus dem Katalog zuordnen, ohne Entwicklungsaufwand.",
      },
      {
        type: "paragraph",
        text: "Darüber hinaus gibt es zwei KI-Funktionen, die wir bewusst unterschiedlich abgesichert haben:",
      },
      {
        type: "bullets",
        items: [
          "**Berichte erstellen und bearbeiten.** Die KI arbeitet ausschließlich über das definierte semantische Modell und verändert Berichtsdefinitionen, keinen Code. Änderungen landen zunächst in einem Entwurf. Gespeichert wird erst, wenn der Anwender zustimmt.",
          "**Daten frei erkunden.** Für Fragen, die kein Bericht vorhersieht („Welche Kunden haben ein Zahlungsziel über 60 Tage und eine offene Mahnung, nach Kanton?“), darf die KI lesende Abfragen erzeugen. Diese laufen über eine eigene, rein lesende Datenbankrolle, eine Positivliste erlaubter Tabellen und in einer schreibgeschützten Transaktion, zusätzlich zur Row-Level-Security.",
        ],
      },
      {
        type: "image",
        src: `${SA}/ai-lanes.webp`,
        width: 3600,
        height: 1650,
        maxWidth: 1040,
        alt: "Zwei KI-Lanes: Beim Bearbeiten von Berichten ändert die KI nur die Berichtsdefinition über den Semantic Layer, das Ergebnis landet im Entwurf und wird erst nach Bestätigung zum Bericht. Beim freien Erkunden erzeugt die KI lesende Abfragen, die vier Schranken passieren: lesende Datenbankrolle, Positivliste, schreibgeschützte Transaktion und Row-Level-Security; das Ergebnis ist als ungeprüfte Rohdaten gekennzeichnet.",
        caption: "Zwei Wege, zwei Sicherheitsniveaus: Was in Berichten landet, läuft immer über das geprüfte Modell. Freies Erkunden ist erlaubt, aber abgeschottet.",
      },
      {
        type: "image",
        src: `${SA}/ai-report-editing.webp`,
        width: 1950,
        height: 1013,
        maxWidth: 1040,
        alt: "Berichte bearbeiten mit KI in drei Schritten: 1. Anweisung im Chat „Bitte zeige mir Cashflow und Deckungsbeitrag auf der Übersichtsseite und auch im Graphen als Entwicklung an.“ 2. Der Editor arbeitet am Bericht. 3. Die KI erklärt die Änderungen, weist darauf hin, dass der Deckungsbeitrag wegen fehlender interner Kostensätze leer ist, und listet vier Vorschläge für die Ansicht; übermittelt wurden 8 Zeilen und 0 Pseudonyme.",
        caption: "Berichte bearbeiten mit KI: Die KI arbeitet im Editor und liefert Vorschläge. Angewendet wird erst mit «Übernehmen».",
      },
      {
        type: "image",
        src: `${SA}/ai-report-result.webp`,
        width: 1950,
        height: 1050,
        maxWidth: 1040,
        alt: "Übersicht vorher und nachher: Die KPI-Karte „Zahlungseingänge“ (3.722,03 CHF) wird zu „Netto-Cashflow“ (588,89 CHF), der Graph „Ertrag, Aufwand und Ergebnis je Monat“ wird zu „Netto-Cashflow und Deckungsbeitrag je Monat“. Der Deckungsbeitrag bleibt leer, weil interne Kostensätze fehlen.",
        caption: "Das Ergebnis auf der Übersicht. Der Deckungsbeitrag bleibt leer, bis interne Kostensätze erfasst sind: lieber leer als falsch.",
      },
      {
        type: "image",
        src: `${SA}/ai-exploration.webp`,
        width: 1950,
        height: 1200,
        maxWidth: 1040,
        alt: "Daten frei erkunden in drei Schritten: 1. Frage, wie sich Netto-Cashflow und Deckungsbeitrag berechnen und welche bexio-Konten oder Buchungen herangezogen wurden. 2. Der Analyst prüft die Daten. 3. Antwort mit Herleitung: Netto-Cashflow CHF 588.89 aus CHF 3'722.03 Zuflüssen und CHF 3'133.14 Abflüssen auf dem Bankkonto «Example Bank»; der Deckungsbeitrag ist leer, nicht CHF 0, weil keine internen Kostensätze hinterlegt sind. Dazu eine Tabelle der Bankzuflüsse je Monat, gekennzeichnet als ungeprüfte Rohdaten.",
        caption: "Daten frei erkunden: Die KI legt offen, wie sie rechnet und welche bexio-Daten sie nutzt. Das Ergebnis ist als ungeprüfte Rohdaten gekennzeichnet.",
      },
      {
        type: "paragraph",
        text: "Warum diese Trennung? Die Forschung zu natürlichsprachlichen Datenbankabfragen zeigt, dass unternehmenstaugliche Text-zu-SQL-Übersetzung trotz großer Sprachmodelle noch nicht gelöst ist. Komplexe Schemata und mehrdeutige Begriffe führen zu Abfragen, die plausibel wirken, aber nicht das Gemeinte berechnen. „Umsatz“ ist in einer Buchhaltung eben keine Spalte, sondern eine Regel.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "Und jede Stelle, an der ein Sprachmodell Abfragen erzeugt, ist potenziell ein Angriffspunkt für Prompt Injection. Das Risiko führt die OWASP-Liste für LLM-Anwendungen an erster Stelle. Was im Bericht landet und geteilt wird, läuft deshalb immer über das geprüfte Modell. Freies Erkunden ist erlaubt, aber abgeschottet.",
        refs: [10],
      },
      { type: "paragraph", text: "Die KI-Nutzung ist pro Arbeitsbereich budgetiert und kann abgeschaltet werden." },

      { type: "heading", text: "Entwickeln mit KI-Agents: ein ehrlicher Erfahrungsbericht" },
      {
        type: "paragraph",
        text: "smiit Analytics ist in rund drei Monaten entstanden. Die erste Zeile Code wurde Mitte Juni 2026 geschrieben, Mitte September waren Datenanbindung, Datenmodell, Berichtsumgebung, KI-Funktionen, Benutzerverwaltung und Betriebsoberfläche umgesetzt.",
      },
      {
        type: "grid",
        items: [
          { title: "~3 Monate", description: "von der ersten Zeile Code bis zur fertigen Plattform" },
          { title: "4 Sprachen", description: "Deutsch, Englisch, Französisch, Italienisch" },
          { title: "22 Architekturentscheidungen", description: "dokumentiert als Architecture Decision Records" },
          { title: "~1.800 Tests", description: "automatisiert, inklusive gezielter Isolationstests" },
        ],
      },
      {
        type: "paragraph",
        text: "Ohne KI-Coding-Agents wäre das in diesem Zeitraum nicht möglich gewesen. Die Geschwindigkeit ist aber nur ein Teil der Geschichte.",
      },

      { type: "subheading", text: "Was die Studienlage sagt" },
      {
        type: "paragraph",
        text: "Die Forschung zeichnet kein eindeutiges Bild. In einem kontrollierten Experiment lösten Entwickler mit GitHub Copilot eine abgegrenzte Programmieraufgabe um 55,8 % schneller. Eine randomisierte Studie von METR mit erfahrenen Open-Source-Entwicklern in großen, gewachsenen Codebasen kam dagegen zu dem Ergebnis, dass KI-Werkzeuge die Bearbeitungszeit um 19 % verlängerten. Die Teilnehmenden selbst hatten eine Beschleunigung erwartet und auch im Nachhinein wahrgenommen. Der DORA-Report 2025 fasst die Lage so zusammen: KI wirkt als Verstärker. Starke Teams werden besser, bestehende Probleme werden größer.",
        refs: [11, 12, 13],
      },
      {
        type: "paragraph",
        text: "Unsere Erfahrung passt zu dieser Lesart, und sie erklärt, warum es bei uns funktioniert hat.",
      },

      { type: "subheading", text: "Was bei uns den Unterschied gemacht hat" },
      {
        type: "bullets",
        items: [
          "**Architekturentscheidungen bleiben beim Menschen.** Jede grundlegende Entscheidung, etwa zur Mandantentrennung, zum Ersatz von dbt oder zur Absicherung der KI-Funktionen, haben wir als Architecture Decision Record dokumentiert: Kontext, Optionen, Entscheidung, Konsequenzen. Die KI hat Optionen ausgearbeitet und Konsequenzen aufgezeigt. Entschieden haben wir. Diese Dokumente waren zugleich der wichtigste Kontext für die Agents, denn eine KI, die die Gründe einer Entscheidung kennt, hält sich deutlich zuverlässiger daran.",
          "**Tests sind die Leitplanken.** Gerade bei Mandantentrennung und Kennzahlenlogik haben wir Regeln nicht nur beschrieben, sondern als Tests festgeschrieben. Eine Änderung, die eine Regel bricht, fällt sofort auf, egal ob sie von einem Menschen oder einer KI stammt.",
          "**Systematische Review-Runden.** In regelmäßigen Abständen haben wir den gesamten Stand gezielt auf Sicherheit, Performance und fachliche Korrektheit geprüft. Jeder Befund bekam eine Kennung, wurde behoben und mit einem Test abgesichert. Ein Großteil der oben beschriebenen „plausibel falschen“ Zahlen wurde in solchen Runden gefunden.",
          "**Fachwissen ist nicht delegierbar.** Dass bexio Eröffnungssalden jährlich neu bucht oder wie Treuhänder eine Bilanz gegliedert sehen wollen, weiß keine KI von allein. Die Erfahrung aus vier Jahren bexio-Projekten war die eigentliche Grundlage, auf der die Geschwindigkeit überhaupt sinnvoll nutzbar wurde.",
        ],
        itemRefs: { 0: [14] },
      },

      { type: "subheading", text: "Wo wir aufpassen mussten" },
      {
        type: "paragraph",
        text: "Hohe Geschwindigkeit erzeugt auch schnell technische Schulden. Cunningham, der den Begriff geprägt hat, beschreibt schon 1992, dass etwas Schuld die Entwicklung beschleunigt, solange sie zeitnah zurückgezahlt wird. Mit KI-Agents gilt das verstärkt. Code entsteht schneller, als man ihn lesen kann. Lösungen sehen auf den ersten Blick vollständig aus, auch wenn ein Randfall fehlt. Und Dokumentation veraltet, wenn man sie nicht aktiv mitpflegt. Wir haben früh angefangen, Aufräumen als festen Teil jeder Phase einzuplanen, etwa beim Zusammenfassen von Datenbankmigrationen oder bei der Konsolidierung des semantischen Modells von 29 auf 9 zentrale Sichten.",
        refs: [15],
      },
      {
        type: "paragraph",
        text: "Unser Fazit zu diesem Punkt: KI-Agents haben uns nicht die Denkarbeit abgenommen, aber einen Großteil der Schreibarbeit. Wer klar weiß, was er bauen will, und die Qualität konsequent absichert, kann damit in Wochen umsetzen, wofür früher Monate nötig waren.",
      },

      { type: "heading", text: "Was wir gelernt haben" },
      {
        type: "numbered",
        items: [
          {
            title: "Das Geschäftsmodell ist Teil der Architektur",
            description: "Unser erstes Produkt ist nicht an der Technik gescheitert, sondern daran, dass sein Betriebsmodell kein faires Preismodell zuließ.",
          },
          {
            title: "Individualisierung muss skalieren",
            description: "Ein Standardprodukt, bei dem jede Anpassung Entwicklungsaufwand bedeutet, ist ein Projektgeschäft mit anderem Etikett.",
          },
          {
            title: "Mandantentrennung gehört in die Datenbank",
            description: "Anwendungscode ist die erste Verteidigungslinie, aber nicht die letzte.",
          },
          {
            title: "Lieber ablehnen als falsch rechnen",
            description: "In der Finanzanalyse ist eine Fehlermeldung besser als eine plausible, falsche Zahl.",
          },
          {
            title: "Standards sind Empfehlungen, keine Pflicht",
            description: "dbt ist ein hervorragendes Werkzeug, es passte nur nicht zu unserer zentralen Anforderung.",
          },
          {
            title: "KI braucht Leitplanken, im Produkt wie in der Entwicklung",
            description: "In beiden Fällen gilt: klare Grenzen, nachvollziehbare Entscheidungen, Tests.",
          },
          {
            title: "Domänenwissen ist der eigentliche Wettbewerbsvorteil",
            description: "Code lässt sich heute schnell schreiben. Zu wissen, welcher Code der richtige ist, lässt sich nicht beschleunigen.",
          },
        ],
      },

      { type: "heading", text: "Fazit und Ausblick" },
      {
        type: "paragraph",
        text: "smiit Analytics ist das Ergebnis eines Umwegs, der sich gelohnt hat. Die Power-BI-Version hat uns gezeigt, was bexio-Kunden wirklich brauchen, und gleichzeitig, wie man es ihnen nicht verkaufen sollte. Die neue Plattform nimmt beides auf: Sie bildet den typischen Bedarf im Standard ab und ermöglicht individuelle Auswertungen, ohne dass dafür Entwicklungsaufwand entsteht.",
      },
      {
        type: "paragraph",
        text: "smiit Analytics wird in Kürze über den bexio Marketplace verfügbar sein, als Abonnement pro verbundener bexio-Firma und Nutzer. Wir freuen uns darauf, die Plattform gemeinsam mit den ersten Kunden weiterzuentwickeln. Und wir sind ehrlich gesagt ein wenig stolz darauf, was in den letzten Monaten entstanden ist.",
      },
    ],

    faq: [
      {
        question: "Für wen ist smiit Analytics gedacht?",
        answer:
          "Für Schweizer KMU, die bexio nutzen und ihre Finanz-, Verkaufs-, Projekt- und Personaldaten auswerten wollen, sowie für Treuhänder, die ihre Mandanten mit aussagekräftigen Auswertungen unterstützen.",
      },
      {
        question: "Was unterscheidet die neue Version von der bisherigen Power-BI-Lösung?",
        answer:
          "Die bisherige Lösung wurde beim Kunden installiert und einmalig bezahlt, Anpassungen wurden nach Aufwand abgerechnet. Die neue Version ist eine zentral betriebene SaaS-Anwendung mit Abonnement. Individuelle Auswertungen erstellen Kunden selbst, auf Wunsch mit KI-Unterstützung.",
      },
      {
        question: "Welche Daten aus bexio werden ausgewertet?",
        answer:
          "Rund 35 Objekttypen, darunter Buchhaltung und Kontenplan, Rechnungen, Offerten und Aufträge, Einkauf und Ausgaben, Bank, Projekte, Zeiterfassung sowie Personaldaten, sofern die entsprechenden Berechtigungen erteilt werden.",
      },
      {
        question: "Wie aktuell sind die Daten?",
        answer:
          "Jede Datenquelle wird zu frei wählbaren Uhrzeiten automatisch aktualisiert. Zusätzlich ist eine manuelle Aktualisierung möglich.",
      },
      {
        question: "Wie werden die Daten geschützt?",
        answer:
          "Die Daten jedes Kunden sind auf Datenbankebene durch Row-Level-Security getrennt, Zugangsdaten zu bexio werden verschlüsselt gespeichert, und auch Administratoren erhalten nur mit ausdrücklicher, befristeter Freigabe des Kunden Zugriff.",
      },
      {
        question: "Ist die KI-Nutzung verpflichtend?",
        answer:
          "Nein. Die KI-Funktionen sind pro Arbeitsbereich budgetiert und lassen sich abschalten. Alle Standardberichte funktionieren ohne KI.",
      },
      {
        question: "Braucht man Power BI oder andere Lizenzen?",
        answer:
          "Nein. smiit Analytics läuft vollständig im Browser, eine zusätzliche Software oder Lizenz ist nicht erforderlich.",
      },
    ],

    sources: [
      {
        title: "bexio AG (2026): 100'000 Schweizer KMU setzen für ihre Administration auf bexio. Medienmitteilung vom 18.02.2026",
        url: "https://www.presseportal.ch/de/pm/100058603/100938493",
      },
      {
        title: "Cusumano (2008): The Changing Software Business – Moving from Products to Services (IEEE Computer, 41(1))",
        url: "https://doi.org/10.1109/MC.2008.29",
      },
      {
        title: "Pine (1993): Mass Customization – The New Frontier in Business Competition (Harvard Business School Press)",
      },
      {
        title: "Kimball & Ross (2013): The Data Warehouse Toolkit – The Definitive Guide to Dimensional Modeling, 3. Auflage (Wiley)",
      },
      {
        title: "Bezemer & Zaidman (2010): Multi-Tenant SaaS Applications – Maintenance Dream or Nightmare? (EVOL/IWPSE, ACM)",
        url: "https://doi.org/10.1145/1862372.1862393",
      },
      {
        title: "Weissman & Bobrowski (2009): The Design of the Force.com Multitenant Internet Application Development Platform (ACM SIGMOD)",
        url: "https://doi.org/10.1145/1559845.1559942",
      },
      {
        title: "Microsoft Azure Architecture Center: Tenancy Models for a Multitenant Solution",
        url: "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models",
      },
      {
        title: "PostgreSQL 16 Documentation, Kapitel 5.8: Row Security Policies",
        url: "https://www.postgresql.org/docs/16/ddl-rowsecurity.html",
      },
      {
        title: "Floratou et al. (2024): NL2SQL is a Solved Problem... Not! (CIDR 2024)",
        url: "https://www.cidrdb.org/cidr2024/papers/p74-floratou.pdf",
      },
      {
        title: "OWASP Gen AI Security Project (2025): OWASP Top 10 for LLM Applications 2025 – LLM01: Prompt Injection",
        url: "https://genai.owasp.org/llm-top-10/",
      },
      {
        title: "Peng, Kalliamvakou, Cihon & Demirer (2023): The Impact of AI on Developer Productivity – Evidence from GitHub Copilot",
        url: "https://arxiv.org/abs/2302.06590",
      },
      {
        title: "Becker, Rush, Barnes & Rein (2025): Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (METR)",
        url: "https://arxiv.org/abs/2507.09089",
      },
      {
        title: "DORA / Google Cloud (2025): State of AI-assisted Software Development 2025",
        url: "https://dora.dev/dora-report-2025/",
      },
      {
        title: "Nygard (2011): Documenting Architecture Decisions (Cognitect Blog)",
        url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
      },
      {
        title: "Cunningham (1992): The WyCash Portfolio Management System (OOPSLA '92 Addendum, ACM)",
        url: "https://doi.org/10.1145/157709.157715",
      },
    ],

    relatedServicePath: "services/analytics",
    keywords: [
      "smiit Analytics",
      "bexio",
      "bexio Auswertungen",
      "Power BI",
      "SaaS",
      "Multi-Tenancy",
      "Row-Level-Security",
      "Semantic Layer",
      "Cube",
      "KI-Agents",
      "Softwareentwicklung mit KI",
    ],
    metaTitle: "smiit Analytics: Von Power BI zur SaaS-Plattform für bexio | smiit",
    metaDescription:
      "Wie aus Power-BI-Projekten für bexio-Kunden eine SaaS-Plattform wurde: Geschäftsmodell, Architektur, Mandantentrennung, KI im Produkt und Entwicklung mit KI-Agents.",
  },

  en: {
    slug: "smiit-analytics-from-power-bi-to-saas",
    category: "apps",
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: "Noah Neßlauer",
    title: "From individual Power BI projects to a SaaS platform: How smiit Analytics for bexio came about",
    shortTitle: "smiit Analytics: From Power BI to SaaS",
    excerpt:
      "What started as a series of individual Power BI projects for bexio customers is now an analytics platform of its own. A first-hand account of a business model that didn't work, the architecture decisions that followed and what we learned building it with AI agents.",
    coverImage: {
      url: `${SA}/cover-en.webp`,
      width: 2524,
      height: 1008,
      alt: "From bexio via smiit Analytics to reports and AI",
    },

    blocks: [
      {
        type: "paragraph",
        text: "Most software products aren't born from an idea on the drawing board. They emerge from a pattern you eventually can't ignore any more. For us, it was a cluster of requests from a direction we hadn't expected: Swiss SMEs that finally wanted to analyse their bexio data properly.",
      },
      {
        type: "paragraph",
        text: "This article tells how those requests first turned into a Power BI-based product, why that product hit its commercial limits, and how we then rebuilt smiit Analytics as a SaaS platform of its own. It is about architecture decisions, about bugs you only find with real accounting data, and about what AI-assisted software development actually delivers on a demanding project — and what it doesn't.",
      },

      { type: "heading", text: "Why bexio, of all things?" },
      {
        type: "paragraph",
        text: "At its core, smiit is a service provider for apps, workflows and analytics for mid-sized companies. For a long time our focus was order management and custom business applications. Software used exclusively in Switzerland was not on our radar.",
      },
      {
        type: "paragraph",
        text: "Between late 2021 and late 2025 we then received five or six requests that related specifically to bexio. That doesn't sound like much. For a single third-party system — one outside our home market, no less — it was remarkably many. The requests were strikingly similar: the data lives in bexio, day-to-day business runs well there, but for analysis over time, across departments or for steering the company, the built-in tools fall short.",
      },
      {
        type: "paragraph",
        text: "In hindsight the pattern is easy to explain. bexio is widespread in Switzerland and reported more than 100,000 SME customers in February 2026. These companies keep accounting, orders, invoices, projects and time tracking in one system. The data for good financial controlling is already there — it just rarely gets used. Once you've recognised that, every further request stops looking like a one-off project and starts looking like a market.",
        refs: [1],
      },

      { type: "heading", text: "The first answer: smiit Analytics on Power BI" },
      {
        type: "paragraph",
        text: "The obvious reaction was to do what we were already good at: Power BI. In 2024 we turned our previous projects into a standardised product. It consisted of a complete data model for bexio data and a large number of ready-made reports. At the end of 2025 it went live on the bexio Marketplace.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-powerbi.webp`,
        width: 1523,
        height: 856,
        maxWidth: 960,
        alt: "Power BI report “Sales – Invoices” from the previous version of smiit Analytics: invoice trend by month, invoices by status, ABC analysis of invoices per customer and invoices per employee",
        caption: "The first version: a standardised Power BI data model with ready-made reports, set up in the customer's own environment.",
      },
      { type: "paragraph", text: "The product had real strengths:" },
      {
        type: "bullets",
        items: [
          "**Maximum flexibility.** Power BI is a mature tool. Almost any analysis could be built.",
          "**Data stays with the customer.** The solution was set up and operated in the customer's own environment.",
          "**Fast time to value.** The ready-made reports covered most standard needs out of the box.",
        ],
      },
      { type: "paragraph", text: "The weaknesses didn't show up in the technology, but in the business model." },

      { type: "subheading", text: "Why the one-off price became a trap" },
      {
        type: "paragraph",
        text: "Because the solution was set up once at the customer's site and hosted there, we had no control over access or usage. A usage- or user-based subscription was practically impossible. What remained was a one-off price.",
      },
      {
        type: "paragraph",
        text: "On top of that, almost every customer wanted customisations. And every customisation was development work we had to bill by effort. The requests fell into two clearly distinct groups:",
      },
      {
        type: "bullets",
        items: [
          "**Operationally run companies** mainly wanted HR analytics: timesheets, utilisation and planned-versus-actual hours, often combined with automation such as regular emails to employees.",
          "**Fiduciaries and finance leads** were interested in the financial data. They wanted the balance sheet, income statement and KPIs structured exactly the way they need them for their clients.",
        ],
      },
      {
        type: "paragraph",
        text: "For many customers, especially smaller ones, the one-off price plus customisation effort added up to an amount that didn't fit their budget. We had a good product with a pricing model that excluded its own target group.",
      },

      { type: "subheading", text: "The lesson behind it" },
      {
        type: "paragraph",
        text: "In retrospect, we were caught in a tension that is well described in the literature. Cusumano shows how the software business is shifting from selling product licences towards services and recurring revenue, and what that means for margins and business models. Pine describes, under the term mass customisation, the challenge of delivering individual offerings at the cost of a standard product.",
        refs: [2, 3],
      },
      {
        type: "paragraph",
        text: "Our Power BI product was positioned wrongly on both counts. It was a product with project logic: standardised at the core, but every customisation cost just as much as in the project business. The conclusion was clear. We needed a product in which customisation no longer meant development effort on our side.",
      },
      {
        type: "image",
        src: `${SA}/business-model-en.webp`,
        width: 3600,
        height: 1560,
        maxWidth: 1040,
        alt: "Comparison of operating models: previously, Power BI was set up and customised in each customer environment, billed via a one-off price and effort. Today, a centrally operated SaaS platform serves many bexio companies on subscription, with standard reports and AI self-service.",
        caption: "From a project with a product label to real SaaS: only central operation makes a fair subscription and updates for everyone possible.",
      },

      { type: "heading", text: "The reset: what the new product had to deliver" },
      {
        type: "paragraph",
        text: "Before writing a single line of code, we redefined the requirements. The most important ones were:",
      },
      {
        type: "numbered",
        items: [
          {
            title: "Real SaaS instead of an installation",
            description: "A centrally operated application in which many customers work securely separated from one another. Only this makes updates, support and a subscription model possible at all.",
          },
          {
            title: "A fair, predictable pricing model",
            description: "A subscription per connected bexio company and per user, sold through the bexio Marketplace, instead of a high one-off price.",
          },
          {
            title: "Customisation without development effort",
            description: "The customisation requests from the Power BI days should either be part of the standard or be something customers can implement themselves.",
          },
          {
            title: "No setup at the customer's site",
            description: "Sign up, connect bexio, done. Data should stay up to date automatically, without manual exports.",
          },
          {
            title: "Data protection as a baseline",
            description: "We're dealing with accounting and HR data. Tenant isolation, encryption and auditable access are non-negotiable.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Requirement 3 led to the most important product decision: we combine a strong standard with AI assistance. The typical requests from the Power BI days — hours, utilisation, balance sheet, income statement and KPIs — are built directly into the standard report. For everything beyond that, customers can create and adapt their own reports, optionally with the help of an AI that answers questions about the data and edits reports. That way even very individual requirements fit into a standard product.",
      },

      { type: "subheading", text: "Why not simply Power BI Embedded?" },
      {
        type: "paragraph",
        text: "The question was obvious, and we took it seriously. Power BI Embedded is strong for classic reporting. For our goal, however, it would have tied us to a licensing and embedding model we don't control — bringing back exactly the cost structure we wanted to escape. We also rejected embedding an open-source BI tool such as Metabase or Superset: for users it quickly feels like a foreign body, and it leaves little room for an AI that is deeply integrated into the data model and reports.",
      },
      {
        type: "paragraph",
        text: "So we decided to build our own application, based on proven open-source building blocks.",
      },

      { type: "heading", text: "The architecture at a glance" },
      { type: "paragraph", text: "The data flow can be described in five stages:" },
      {
        type: "image",
        src: `${SA}/architecture-en.webp`,
        width: 3840,
        height: 1320,
        maxWidth: 1040,
        alt: "smiit Analytics data flow: the .NET sync worker reads the bexio API, the data is prepared in PostgreSQL across the raw, staging and mart (star schema) schemas, modelled in the Cube semantic layer and displayed in the web app (Next.js, ASP.NET Core). AI features edit reports via Cube and explore the mart schema read-only. Everything runs on Microsoft Azure.",
        caption: "From the bexio API to the report: one database with separate schemas, a central semantic layer and row-level security on every analytical table.",
      },
      {
        type: "table",
        headers: ["Layer", "Technology", "Purpose"],
        rows: [
          ["Data integration", ".NET Worker Service", "Loads around 35 object types from bexio: accounting, orders, invoices, banking, projects, time entries, HR"],
          ["Raw data & staging", "PostgreSQL (raw, staging)", "Stores the original responses unchanged and converts them into typed tables"],
          ["Analytical model", "PostgreSQL (mart)", "Star schema with facts and dimensions, prepared for analysis"],
          ["Semantic layer", "Cube", "Defines metrics, relationships and time logic centrally — one query language for reports and AI"],
          ["Application", "Next.js/React, ASP.NET Core API", "Reports, filters, editing, user management, AI features"],
          ["Operations", "Microsoft Azure", "Container-based, automated deployments across separate environments"],
        ],
      },
      {
        type: "paragraph",
        text: "The analytical model follows Kimball and Ross's dimensional modelling: facts such as journal lines, invoice items or time entries are connected through shared dimensions such as date, customer, account or project. That way revenue, open items and hours can be filtered together in one report without every combination having to be programmed individually.",
        refs: [4],
      },
      {
        type: "image",
        src: `${SA}/star-schema-en.webp`,
        width: 3600,
        height: 1500,
        maxWidth: 940,
        alt: "Simplified star schema: the facts journal lines, invoices and time entries share the dimensions date, currency, customer, account, project and employee.",
        caption: "Shared dimensions connect the facts. Simplified excerpt: the model comprises around 20 facts and 17 dimensions.",
      },
      {
        type: "paragraph",
        text: "In smiit Analytics, reports are not hard-coded pages but declarative definitions: which visualisation shows which metric by which dimension. That has a far-reaching advantage. Whatever is described as data can be validated, versioned and compared — and it can be edited by an AI without any code being generated.",
      },

      { type: "heading", text: "The biggest challenges and how we solved them" },

      { type: "subheading", text: "1. Tenant isolation that holds even when things go wrong" },
      {
        type: "paragraph",
        text: "In a SaaS application, many customers share the same infrastructure. Economically, that is the core of the model — and at the same time its biggest risk. Bezemer and Zaidman point out that a wrong architecture decision on multi-tenancy quickly turns into a maintenance problem. The Force.com architecture shows how far a consistently shared model can go when isolation is anchored in the foundation. Microsoft's architecture guidance describes the range from fully isolated to fully shared models and the trade-offs of each.",
        refs: [5, 6, 7],
      },
      { type: "paragraph", text: "We opted for a shared model with several lines of defence:" },
      {
        type: "bullets",
        items: [
          "**The database is the last line of defence.** Every analytical table is protected by PostgreSQL row-level security. These policies also apply to the table owner (`FORCE ROW LEVEL SECURITY`). A filter forgotten in application code therefore doesn't cause a data leak — it produces an empty result.",
          "**The context travels with every query.** The application sets which bexio company is being queried per transaction. That way no context can “leak” from one request into the next on shared database connections.",
          "**The boundary is the data source.** What gets isolated is not the individual report but the connected bexio company. We corrected this decision early on. It allows several reports and users to access the same data source without weakening the isolation.",
          "**Tests prove the isolation.** Automated tests deliberately try to access other tenants' data — and must fail.",
        ],
        itemRefs: { 0: [8] },
      },
      {
        type: "image",
        src: `${SA}/tenant-isolation-en.webp`,
        width: 3600,
        height: 1230,
        maxWidth: 1040,
        alt: "Three lines of defence for tenant isolation: authorisation for the data source, context per transaction and row-level security with FORCE. In the database, a request from company A only sees company A's rows; isolation tests deliberately attempt cross-tenant access.",
        caption: "Several lines of defence: even if application code forgets a filter, a request from company A only sees company A's rows.",
      },
      {
        type: "paragraph",
        text: "The same principle applies to platform operations. Even smiit administrators cannot see customer data unless the customer grants time-limited, logged support access.",
      },

      { type: "subheading", text: "2. The bexio integration: robust rather than quick" },
      {
        type: "paragraph",
        text: "“Connecting” an API is done quickly. Connecting it so that many customers' data is reliably synchronised several times a day is a different job. A few things that kept us busy:",
      },
      {
        type: "bullets",
        items: [
          "**Incremental where possible.** Where the API allows it, we only load changed records, with an overlap window as a safety net. Where it doesn't, we load everything and discard unchanged records via a hash comparison.",
          "**Detecting deleted data.** Incremental queries don't return deletions. So we run a full reconciliation at regular intervals, ensuring deleted documents don't linger in the reports.",
          "**Fair load distribution.** API limits apply per connected company. We cap parallelism per connection and overall, respect the retry delays the API specifies, and spread automatic refreshes with a random offset so that not every customer syncs on the hour.",
          "**Time isn't just time.** Timestamps arrive without a time zone, in Swiss local time. Interpret them as UTC and you shift data by one or two hours — plus twice a year because of daylight saving time.",
        ],
      },
      {
        type: "paragraph",
        text: "From the customer's perspective, all of this boils down to simple settings: every data source is refreshed automatically at times of their choosing, and a manual refresh is possible at any time. A daily refresh budget keeps the load — and therefore operating costs — predictable. That, too, is a prerequisite for a fair subscription price.",
      },
      {
        type: "image",
        src: `${SA}/refresh-schedule-en.webp`,
        width: 1950,
        height: 753,
        maxWidth: 1040,
        alt: "“Automatic refresh” settings of a data source: a grid of 24 times with 05:00 and 12:00 selected (2 of 8). Below, the next refresh from 08/10/2026, 05:00 (Europe/Zurich), used today 0 of 12 automatic, 0 of them by the AI, and the “Reload everything” option, possible once a day.",
        caption: "Refresh from the customer's perspective: up to eight freely selectable times, a daily quota and a full reload when needed.",
      },

      { type: "subheading", text: "3. A deliberate departure from the standard stack" },
      {
        type: "paragraph",
        text: "For transforming raw data into the analytical model, dbt is today's de facto standard. We started with it — and dropped it again after just one week.",
      },
      {
        type: "paragraph",
        text: "The reason was a core requirement: a synchronisation has to work **end to end**. When a customer clicks “Refresh”, it shouldn't just reload the raw data. Exactly that customer's data should be computed all the way through to the report — immediately. dbt is designed as a batch tool that rebuilds entire models. It would also have added a second runtime and a second permission model alongside row-level security.",
      },
      {
        type: "flow",
        steps: [
          "Customer clicks “Refresh”",
          "Sync worker loads changed data from bexio (raw)",
          "Typing in staging",
          "SQL steps build the star schema (mart)",
          "All per data source in one transaction",
          "The report shows the new figures immediately",
        ],
      },
      {
        type: "paragraph",
        text: "We therefore built the transformation into the .NET worker as an ordered sequence of SQL steps. It runs per data source in a single transaction, writes only rows that actually changed and skips itself if nothing has changed. That was more in-house development than we would have liked. But it's the point where the architecture follows the product, not the other way round.",
      },

      { type: "subheading", text: "4. Numbers that look plausible and are still wrong" },
      {
        type: "paragraph",
        text: "This was the most instructive category of problems. A crash is noticed immediately. A balance sheet total that's three times too high may only be noticed by the fiduciary. A few examples we only found with real data:",
      },
      {
        type: "bullets",
        items: [
          "**Opening balances per fiscal year.** bexio books the opening balances anew in every fiscal year. A balance sheet query that isn't restricted to one fiscal year sums these balances across all years and inflates the result accordingly. Our solution is deliberately strict: the semantic layer rejects such queries before they reach the database.",
          "**Top-N lists with empty entries.** PostgreSQL sorts missing values first in descending order. As a result, a “top 10 customers by revenue” list showed customers without any revenue at the very top in certain combinations.",
          "**Year-over-year comparisons with 0% growth.** If a prior-year comparison is grouped by the year dimension rather than a real time axis, it compares every year with itself. The result is mathematically correct and useless from a business perspective.",
          "**Foreign currencies.** Every amount is held in its original currency and in the booking currency, converted at the rate valid on the document date — not today's rate.",
        ],
      },
      {
        type: "paragraph",
        text: "The common pattern: accounting rules belong in **one** central place, and wherever they could be violated, the system should rather refuse than guess. This mindset also shapes how we handle AI.",
      },

      { type: "subheading", text: "5. Individual requirements in a standard product — with AI" },
      {
        type: "paragraph",
        text: "This is where things come full circle back to the Power BI days. The most common customisation requests are now part of the standard. Every new workspace starts with a report covering overview, sales, purchasing, income statement, balance sheet, working hours, projects and cash flow. On top of that comes a catalogue of business KPIs, from liquidity ratios and EBITDA margin to return on equity.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-standard-report.webp`,
        width: 1916,
        height: 941,
        maxWidth: 1040,
        alt: "Standard report in smiit Analytics, “Overview” page: KPIs for revenue, result, incoming payments and open receivables, monthly revenue versus prior year, top customers by revenue, income, expenses and result per month, and revenue paid versus open; on the left, navigation from sales to cash flow",
        caption: "The standard report covers what used to be custom-built: from the overview to the balance sheet, working hours and cash flow.",
      },
      {
        type: "paragraph",
        text: "For the KPIs, someone has to define which accounts feed into which figure. That is exactly the work that used to cause customisation effort. Today the system suggests the mapping based on the account ranges of the Swiss SME chart of accounts and uses AI for ambiguous accounts. The customer only reviews and confirms.",
      },
      {
        type: "image",
        src: `${SA}/account-mapping-en.webp`,
        width: 1950,
        height: 1017,
        maxWidth: 1040,
        alt: "“KPIs” settings: balance sheet KPIs such as cash and equivalents (788.89), liquidity ratio 1 (10.1%), working capital (19,375.95) or days sales outstanding (303 d), and income statement KPIs such as EBIT, EBITDA, return on total assets (92.6%) or material expenses (5,111.89), each with the number of mapped accounts and the label “automatic”; top right, the “Suggest again” button.",
        caption: "Account mapping: every KPI gets its accounts assigned automatically, and the amounts are calculated live. The customer reviews and adjusts where needed.",
      },
      {
        type: "image",
        src: `${SA}/screenshot-report-editor.webp`,
        width: 889,
        height: 995,
        maxWidth: 600,
        alt: "Report editor in smiit Analytics: for the “Top customers by revenue” chart, a bar chart is selected with the revenue metric as value and contact as category; below, the KPI catalogue with invoice metrics such as new-customer revenue, open invoice amount or dunning rate",
        caption: "Customise rather than commission: choose a visualisation and assign metrics from the catalogue, with no development effort. (Screenshot from the German interface.)",
      },
      {
        type: "paragraph",
        text: "Beyond that, there are two AI features that we deliberately secured in different ways:",
      },
      {
        type: "bullets",
        items: [
          "**Creating and editing reports.** The AI works exclusively through the defined semantic model and changes report definitions, not code. Changes first land in a draft. Nothing is saved until the user approves.",
          "**Exploring data freely.** For questions no report anticipates (“Which customers have payment terms over 60 days and an open reminder, by canton?”), the AI may generate read-only queries. These run through a dedicated read-only database role, an allow-list of permitted tables and a read-only transaction — in addition to row-level security.",
        ],
      },
      {
        type: "image",
        src: `${SA}/ai-lanes-en.webp`,
        width: 3600,
        height: 1650,
        maxWidth: 1040,
        alt: "Two AI lanes: when editing reports, the AI only changes the report definition via the semantic layer; the result lands in a draft and only becomes a report after approval. When exploring freely, the AI writes read-only queries that pass four barriers: read-only database role, allow-list, read-only transaction and row-level security; the result is labelled as unverified raw data.",
        caption: "Two paths, two security levels: whatever ends up in reports always goes through the verified model. Free exploration is allowed, but sandboxed.",
      },
      {
        type: "image",
        src: `${SA}/ai-report-editing-en.webp`,
        width: 1950,
        height: 1035,
        maxWidth: 1040,
        alt: "Editing reports with AI in three steps: 1. Instruction in the chat: “Please show cash flow and contribution margin on the overview page, and their development in the chart as well.” 2. The editor works on the report. 3. The AI explains the changes, notes that the contribution margin is empty because internal cost rates are missing, and lists four suggestions for the view; 8 rows and 0 pseudonyms were sent to the AI.",
        caption: "Editing reports with AI: the AI works in the editor and delivers suggestions. Nothing is applied until the user clicks “Apply”.",
      },
      {
        type: "image",
        src: `${SA}/ai-report-result-en.webp`,
        width: 1950,
        height: 1050,
        maxWidth: 1040,
        alt: "Overview before and after: the “Incoming payments” KPI card (CHF 3,722.03) becomes “Net cash flow” (CHF 588.89), and the chart “Income, expenses and result per month” becomes “Net cash flow and contribution margin per month”. The contribution margin stays empty because internal cost rates are missing.",
        caption: "The result on the overview. The contribution margin stays empty until internal cost rates are entered: better empty than wrong.",
      },
      {
        type: "image",
        src: `${SA}/ai-exploration-en.webp`,
        width: 1950,
        height: 1170,
        maxWidth: 1040,
        alt: "Exploring data freely in three steps: 1. A question about how net cash flow and contribution margin are calculated and which bexio accounts or bookings were used. 2. The analyst checks the data. 3. Answer with derivation: net cash flow of CHF 588.89 from CHF 3,722.03 inflows and CHF 3,133.14 outflows on the bank account “Example Bank”; the contribution margin is empty, not CHF 0, because no internal cost rates have been entered. Plus a table of bank inflows per month, labelled as unverified raw data.",
        caption: "Exploring data freely: the AI discloses how it calculates and which bexio data it uses. The result is labelled as unverified raw data.",
      },
      {
        type: "paragraph",
        text: "Why this separation? Research on natural-language database queries shows that enterprise-grade text-to-SQL is still not solved, despite large language models. Complex schemas and ambiguous terms lead to queries that look plausible but don't compute what was meant. In accounting, “revenue” isn't a column — it's a rule.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "And every point at which a language model generates queries is a potential target for prompt injection — the risk that tops the OWASP list for LLM applications. Whatever ends up in a report and gets shared therefore always goes through the verified model. Free exploration is allowed, but sandboxed.",
        refs: [10],
      },
      { type: "paragraph", text: "AI usage is budgeted per workspace and can be switched off." },

      { type: "heading", text: "Building with AI agents: an honest account" },
      {
        type: "paragraph",
        text: "smiit Analytics was built in around three months. The first line of code was written in mid-June 2026; by mid-September, data integration, data model, reporting environment, AI features, user management and the operations console were in place.",
      },
      {
        type: "grid",
        items: [
          { title: "~3 months", description: "from the first line of code to the finished platform" },
          { title: "4 languages", description: "German, English, French, Italian" },
          { title: "22 architecture decisions", description: "documented as architecture decision records" },
          { title: "~1,800 tests", description: "automated, including targeted isolation tests" },
        ],
      },
      {
        type: "paragraph",
        text: "Without AI coding agents, that would not have been possible in this time frame. But speed is only part of the story.",
      },

      { type: "subheading", text: "What the research says" },
      {
        type: "paragraph",
        text: "Research doesn't paint a clear picture. In a controlled experiment, developers using GitHub Copilot completed a well-defined programming task 55.8% faster. A randomised study by METR with experienced open-source developers in large, mature codebases, by contrast, found that AI tools increased completion time by 19%. The participants themselves had expected a speed-up and perceived one in hindsight, too. The 2025 DORA report sums it up: AI acts as an amplifier. Strong teams get better, existing problems get bigger.",
        refs: [11, 12, 13],
      },
      {
        type: "paragraph",
        text: "Our experience fits this reading — and it explains why it worked for us.",
      },

      { type: "subheading", text: "What made the difference for us" },
      {
        type: "bullets",
        items: [
          "**Architecture decisions stay with humans.** We documented every fundamental decision — on tenant isolation, replacing dbt or securing the AI features — as an architecture decision record: context, options, decision, consequences. The AI worked out options and laid out consequences. We made the decisions. These documents were also the most important context for the agents, because an AI that knows the reasons behind a decision sticks to it far more reliably.",
          "**Tests are the guardrails.** Especially for tenant isolation and KPI logic, we didn't just describe rules — we codified them as tests. A change that breaks a rule is noticed immediately, whether it comes from a human or an AI.",
          "**Systematic review rounds.** At regular intervals, we deliberately reviewed the entire codebase for security, performance and business correctness. Every finding got an ID, was fixed and was locked in with a test. Most of the “plausibly wrong” numbers described above were found in these rounds.",
          "**Domain knowledge can't be delegated.** No AI knows on its own that bexio books opening balances anew every year, or how fiduciaries want a balance sheet structured. Four years of bexio projects were the real foundation that made the speed usable in the first place.",
        ],
        itemRefs: { 0: [14] },
      },

      { type: "subheading", text: "Where we had to be careful" },
      {
        type: "paragraph",
        text: "High speed also builds up technical debt quickly. Cunningham, who coined the term, wrote back in 1992 that a little debt speeds development, as long as it is paid back promptly. With AI agents, this applies all the more. Code is produced faster than you can read it. Solutions look complete at first glance, even when an edge case is missing. And documentation goes stale unless you actively maintain it. We started early to plan clean-up as a fixed part of every phase — for example consolidating database migrations, or reducing the semantic model from 29 to 9 central views.",
        refs: [15],
      },
      {
        type: "paragraph",
        text: "Our verdict on this point: AI agents didn't do our thinking for us, but they did most of the typing. If you know exactly what you want to build and consistently safeguard quality, you can deliver in weeks what used to take months.",
      },

      { type: "heading", text: "What we learned" },
      {
        type: "numbered",
        items: [
          {
            title: "The business model is part of the architecture",
            description: "Our first product didn't fail because of the technology, but because its operating model didn't allow a fair pricing model.",
          },
          {
            title: "Customisation has to scale",
            description: "A standard product in which every customisation means development effort is a project business with a different label.",
          },
          {
            title: "Tenant isolation belongs in the database",
            description: "Application code is the first line of defence, but not the last.",
          },
          {
            title: "Better to refuse than to miscalculate",
            description: "In financial analysis, an error message is better than a plausible but wrong number.",
          },
          {
            title: "Standards are recommendations, not obligations",
            description: "dbt is an excellent tool — it just didn't fit our core requirement.",
          },
          {
            title: "AI needs guardrails, in the product and in development",
            description: "In both cases: clear boundaries, traceable decisions, tests.",
          },
          {
            title: "Domain knowledge is the real competitive advantage",
            description: "Code can be written quickly today. Knowing which code is the right code can't be accelerated.",
          },
        ],
      },

      { type: "heading", text: "Conclusion and outlook" },
      {
        type: "paragraph",
        text: "smiit Analytics is the result of a detour that paid off. The Power BI version showed us what bexio customers really need — and, at the same time, how not to sell it to them. The new platform takes both lessons on board: it covers typical needs in the standard and enables individual analyses without any development effort.",
      },
      {
        type: "paragraph",
        text: "smiit Analytics will soon be available through the bexio Marketplace, as a subscription per connected bexio company and user. We look forward to developing the platform further together with our first customers. And, to be honest, we're a little proud of what has come together over the past few months.",
      },
    ],

    faq: [
      {
        question: "Who is smiit Analytics for?",
        answer:
          "For Swiss SMEs that use bexio and want to analyse their financial, sales, project and HR data — and for fiduciaries who want to support their clients with meaningful analyses.",
      },
      {
        question: "How does the new version differ from the previous Power BI solution?",
        answer:
          "The previous solution was installed at the customer's site and paid for once; customisations were billed by effort. The new version is a centrally operated SaaS application with a subscription. Customers build individual analyses themselves, optionally with AI assistance.",
      },
      {
        question: "Which bexio data is analysed?",
        answer:
          "Around 35 object types, including accounting and the chart of accounts, invoices, quotes and orders, purchasing and expenses, banking, projects, time tracking and HR data, provided the relevant permissions are granted.",
      },
      {
        question: "How up to date is the data?",
        answer:
          "Every data source is refreshed automatically at times of your choosing. A manual refresh is also possible.",
      },
      {
        question: "How is the data protected?",
        answer:
          "Each customer's data is separated at database level by row-level security, bexio credentials are stored encrypted, and even administrators only get access with the customer's explicit, time-limited approval.",
      },
      {
        question: "Is using the AI mandatory?",
        answer:
          "No. The AI features are budgeted per workspace and can be switched off. All standard reports work without AI.",
      },
      {
        question: "Do I need Power BI or other licences?",
        answer:
          "No. smiit Analytics runs entirely in the browser; no additional software or licence is required.",
      },
    ],

    sources: [
      {
        title: "bexio AG (2026): 100'000 Schweizer KMU setzen für ihre Administration auf bexio. Press release, 18 Feb 2026",
        url: "https://www.presseportal.ch/de/pm/100058603/100938493",
      },
      {
        title: "Cusumano (2008): The Changing Software Business – Moving from Products to Services (IEEE Computer, 41(1))",
        url: "https://doi.org/10.1109/MC.2008.29",
      },
      {
        title: "Pine (1993): Mass Customization – The New Frontier in Business Competition (Harvard Business School Press)",
      },
      {
        title: "Kimball & Ross (2013): The Data Warehouse Toolkit – The Definitive Guide to Dimensional Modeling, 3rd edition (Wiley)",
      },
      {
        title: "Bezemer & Zaidman (2010): Multi-Tenant SaaS Applications – Maintenance Dream or Nightmare? (EVOL/IWPSE, ACM)",
        url: "https://doi.org/10.1145/1862372.1862393",
      },
      {
        title: "Weissman & Bobrowski (2009): The Design of the Force.com Multitenant Internet Application Development Platform (ACM SIGMOD)",
        url: "https://doi.org/10.1145/1559845.1559942",
      },
      {
        title: "Microsoft Azure Architecture Center: Tenancy Models for a Multitenant Solution",
        url: "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models",
      },
      {
        title: "PostgreSQL 16 Documentation, Section 5.8: Row Security Policies",
        url: "https://www.postgresql.org/docs/16/ddl-rowsecurity.html",
      },
      {
        title: "Floratou et al. (2024): NL2SQL is a Solved Problem... Not! (CIDR 2024)",
        url: "https://www.cidrdb.org/cidr2024/papers/p74-floratou.pdf",
      },
      {
        title: "OWASP Gen AI Security Project (2025): OWASP Top 10 for LLM Applications 2025 – LLM01: Prompt Injection",
        url: "https://genai.owasp.org/llm-top-10/",
      },
      {
        title: "Peng, Kalliamvakou, Cihon & Demirer (2023): The Impact of AI on Developer Productivity – Evidence from GitHub Copilot",
        url: "https://arxiv.org/abs/2302.06590",
      },
      {
        title: "Becker, Rush, Barnes & Rein (2025): Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (METR)",
        url: "https://arxiv.org/abs/2507.09089",
      },
      {
        title: "DORA / Google Cloud (2025): State of AI-assisted Software Development 2025",
        url: "https://dora.dev/dora-report-2025/",
      },
      {
        title: "Nygard (2011): Documenting Architecture Decisions (Cognitect Blog)",
        url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
      },
      {
        title: "Cunningham (1992): The WyCash Portfolio Management System (OOPSLA '92 Addendum, ACM)",
        url: "https://doi.org/10.1145/157709.157715",
      },
    ],

    relatedServicePath: "services/analytics",
    keywords: [
      "smiit Analytics",
      "bexio",
      "bexio reporting",
      "Power BI",
      "SaaS",
      "multi-tenancy",
      "row-level security",
      "semantic layer",
      "Cube",
      "AI agents",
      "AI-assisted software development",
    ],
    metaTitle: "smiit Analytics: From Power BI to a SaaS platform for bexio | smiit",
    metaDescription:
      "How Power BI projects for bexio customers became a SaaS platform: business model, architecture, tenant isolation, AI in the product and building with AI agents.",
  },
}

export default smiitAnalyticsSaas
