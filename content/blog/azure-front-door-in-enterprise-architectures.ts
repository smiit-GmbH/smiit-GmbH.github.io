import type { LocalizedBlogPost } from "@/lib/blog"

// ---------------------------------------------------------------------------
// Post: Azure Front Door in Enterprise-Architekturen
// ---------------------------------------------------------------------------

const azureFrontDoor: LocalizedBlogPost = {
  de: {
    slug: "azure-front-door-in-enterprise-architectures",
    category: "strategy",
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    author: "Sebastian Grab",
    title:
      "Azure Front Door in Enterprise-Architekturen: Best Practices für sichere und skalierbare Webanwendungen",
    shortTitle: "Azure Front Door in Enterprise-Architekturen",
    excerpt:
      "Webanwendungen direkt öffentlich bereitzustellen ist einfach – aber selten sicher genug. Wie Azure Front Door als globale Edge-Schicht mit WAF, Private Link und Infrastructure as Code zum kontrollierten, reproduzierbaren Einstiegspunkt moderner Enterprise-Webanwendungen wird.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Azure Front Door in Enterprise-Architekturen",
    },
    coverImage: {
      url: "/assets/blog/azure-front-door/afd-map.webp",
      width: 2979,
      height: 1827,
      alt: "Azure Front Door als globale Edge-Schicht mit TLS, WAF, Routing und Caching, die Anfragen an weltweit verteilte Edge-Standorte lenkt.",
    },

    blocks: [
      { type: "heading", text: "Sicherheit beginnt vor der Anwendung" },
      {
        type: "paragraph",
        text: "Webanwendungen und APIs gehören heute zu den wichtigsten Schnittstellen zwischen Unternehmen, Kunden, Partnern und internen Systemen. Häufig werden sie zunächst direkt über einen öffentlichen App Service, eine Containerplattform oder ein API-Gateway bereitgestellt. Für erste Anwendungen kann dieser Ansatz ausreichend sein. Mit steigenden Anforderungen an Sicherheit, Verfügbarkeit und Skalierbarkeit entstehen jedoch schnell zusätzliche Herausforderungen.",
      },
      {
        type: "paragraph",
        text: "Neben der eigentlichen Anwendung müssen TLS-Zertifikate verwaltet, Angriffe auf Anwendungsebene erkannt, mehrere Backends geroutet und Ausfälle einzelner Instanzen abgefangen werden. Gleichzeitig sollte verhindert werden, dass Angreifer vorgeschaltete Sicherheitskontrollen umgehen und den Ursprungsdienst direkt erreichen können.",
      },
      {
        type: "paragraph",
        text: "Azure Front Door setzt vor der eigentlichen Anwendung an. Der Dienst bildet eine global verteilte Edge-Schicht, die eingehenden HTTP- und HTTPS-Traffic entgegennimmt, über eine Web Application Firewall prüft und kontrolliert an geeignete Ursprungsdienste weiterleitet. In Kombination mit Private Link, Azure Monitor und Infrastructure as Code entsteht daraus ein zentraler und reproduzierbarer Einstiegspunkt für moderne Enterprise-Webanwendungen.",
      },
      {
        type: "paragraph",
        text: "Dieser Beitrag zeigt, wie Azure Front Door in einer solchen Architektur eingesetzt werden kann, welche Aufgaben WAF und Private Link übernehmen und welche Best Practices bei Routing, Monitoring und Deployment berücksichtigt werden sollten.",
      },
      {
        type: "paragraph",
        text: "Hinweis: Dieser Beitrag bezieht sich auf Azure Front Door Standard und Premium. Azure Front Door Classic wird am 31. März 2027 eingestellt und sollte für neue Architekturen nicht mehr verwendet werden.",
        refs: [1],
      },

      { type: "heading", text: "Warum öffentlich erreichbare Webanwendungen zusätzliche Schutzmechanismen benötigen" },
      {
        type: "paragraph",
        text: "Viele Webanwendungen beginnen mit einer vergleichsweise einfachen Architektur: Ein Frontend oder eine API wird auf Azure App Service, Azure Container Apps, Azure Kubernetes Service oder einer virtuellen Maschine betrieben und über einen öffentlichen HTTPS-Endpunkt erreichbar gemacht.",
      },
      {
        type: "paragraph",
        text: "Das ist technisch unkompliziert, verbindet jedoch mehrere Verantwortlichkeiten in einer einzigen Komponente. Der Ursprungsdienst nimmt öffentlichen Traffic entgegen, terminiert TLS und verarbeitet gleichzeitig die eigentliche Anwendungslogik. Sicherheitsregeln, Zertifikate, Routing und Monitoring werden häufig pro Anwendung separat konfiguriert.",
      },
      { type: "paragraph", text: "Mit wachsender Nutzung entstehen dadurch typische Herausforderungen:" },
      {
        type: "bullets",
        items: [
          "Mehrere Anwendungen benötigen unterschiedliche Domains und Zertifikate.",
          "APIs und Frontends sollen über gemeinsame oder getrennte Pfade erreichbar sein.",
          "Angriffe wie SQL Injection, Cross-Site Scripting oder automatisierte Bot-Zugriffe sollen möglichst früh erkannt werden.",
          "Eine Anwendung soll auch bei Ausfall einer Instanz oder Region erreichbar bleiben.",
          "Statische Inhalte sollen performant an geografisch verteilte Nutzer ausgeliefert werden.",
          "Sicherheits- und Routingkonfigurationen sollen zwischen Entwicklungs-, Test- und Produktionsumgebungen konsistent bleiben.",
        ],
      },
      {
        type: "paragraph",
        text: "Die OWASP Top 10 dokumentieren zentrale Sicherheitsrisiken moderner Webanwendungen. Eine vorgeschaltete Web Application Firewall kann einen Teil entsprechender Angriffsmuster erkennen und blockieren. Sie ersetzt jedoch weder sichere Softwareentwicklung noch eine korrekte Authentifizierung und Autorisierung.",
        refs: [2],
      },
      {
        type: "paragraph",
        text: "Ein weiteres Problem entsteht, wenn eine WAF zwar vor die Anwendung gestellt wird, der ursprüngliche App-Service- oder API-Endpunkt aber weiterhin frei erreichbar bleibt. Der vorgesehene Weg führt über die Firewall:",
      },
      {
        type: "diagram",
        steps: [{ label: "Nutzer" }, { label: "Web Application Firewall" }, { label: "Anwendung" }],
      },
      {
        type: "paragraph",
        text: "In diesem Fall schützt die WAF ausschließlich den Traffic, der tatsächlich durch sie hindurchläuft. Kennt ein Angreifer den technischen Hostnamen des Ursprungs, kann er versuchen, diesen unter Umgehung der Firewall direkt aufzurufen.",
      },
      {
        type: "paragraph",
        text: "Aus Sicht einer Zero-Trust-Architektur sollte dem Traffic nicht allein deshalb vertraut werden, weil er einen bestimmten Netzwerkpfad verwendet. NIST beschreibt Zero Trust als ein Sicherheitsmodell, das Ressourcen und explizite Zugriffsentscheidungen in den Mittelpunkt stellt, anstatt implizites Vertrauen aus einem Netzwerkstandort abzuleiten. Übertragen auf eine Webarchitektur bedeutet dies: Der vorgesehene Zugriffspfad sollte nicht nur dokumentiert, sondern technisch erzwungen werden.",
        refs: [3],
      },
      {
        type: "grid",
        items: [
          { title: "Direkter öffentlicher Origin", description: "Internet → Public App Service. Risiken: direkter Origin-Zugriff, dezentrale TLS-Konfiguration, keine zentrale WAF, uneinheitliches Monitoring." },
          { title: "Kontrollierter Zugriff über Front Door", description: "Internet → Azure Front Door + WAF → Private Origin. Vorteile: kontrollierter Einstiegspunkt, zentrale Sicherheitsregeln, privater Ursprung, einheitliche Protokollierung." },
        ],
      },

      { type: "heading", text: "Was Azure Front Door in der Praxis bedeutet" },
      {
        type: "paragraph",
        text: "Azure Front Door ist Microsofts globaler Application-Delivery- und Content-Delivery-Dienst für HTTP- und HTTPS-Anwendungen. Der Dienst nutzt das globale Edge-Netzwerk von Microsoft, um Anfragen an geografisch verteilten Points of Presence entgegenzunehmen und anschließend an geeignete Ursprungsdienste weiterzuleiten.",
        refs: [4],
      },
      { type: "paragraph", text: "Vereinfacht lässt sich Azure Front Door als eine Art global verteilter Reverse Proxy verstehen:" },
      {
        type: "diagram",
        steps: [
          { label: "Nutzer" },
          { label: "Azure Front Door Edge", items: ["TLS", "WAF", "Routing", "Caching", "Health-basierte Origin-Auswahl"] },
          { label: "Anwendung oder API" },
        ],
      },
      {
        type: "paragraph",
        text: "Der Client verbindet sich nicht unmittelbar mit dem App Service oder API-Gateway. Stattdessen ruft er eine benutzerdefinierte Domain wie app.example.com auf, die mit Azure Front Door verbunden ist. Front Door nimmt die Anfrage entgegen, prüft sie anhand der konfigurierten Regeln und leitet sie an einen passenden Ursprung weiter.",
      },
      { type: "paragraph", text: "Zu den zentralen Funktionen gehören:" },
      {
        type: "grid",
        items: [
          { title: "Globales HTTP- und HTTPS-Routing", description: "Requests werden anhand von Domains und URL-Pfaden unterschiedlichen Anwendungen oder APIs zugeordnet, z. B. /api/* an API Management." },
          { title: "Web Application Firewall", description: "Die integrierte WAF schützt Anwendungen mit Microsoft-verwalteten und eigenen Regeln gegen typische Angriffe und ungewöhnliche Zugriffsmuster." },
          { title: "TLS und Zertifikatsverwaltung", description: "Front Door terminiert TLS am Edge und verwaltet Zertifikate für benutzerdefinierte Domains inklusive automatischer Erneuerung." },
          { title: "Caching und Komprimierung", description: "Geeignete Inhalte werden an Edge-Standorten zwischengespeichert und näher am Nutzer ausgeliefert – das senkt Latenz und Origin-Last." },
          { title: "Health-basierte Origin-Auswahl", description: "Bei mehreren Origins prüft Front Door deren Verfügbarkeit und leitet Requests bei einem Ausfall an einen anderen Ursprung weiter." },
          { title: "Private Origin-Anbindung", description: "Azure Front Door Premium bindet unterstützte Azure-Dienste über Private Link an – der Ursprung muss nicht mehr frei über das Internet erreichbar sein." },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Front Door ist damit mehr als ein klassischer Load Balancer. Der Dienst verbindet globale Traffic-Verteilung, Websicherheit, Content Delivery und Origin-Schutz in einer gemeinsamen Edge-Schicht.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Wissenschaftliche Arbeiten zu Content Delivery Networks zeigen ebenfalls, dass global verteilte Auslieferungsstrukturen sowohl Performancevorteile als auch eigene Sicherheitsanforderungen mit sich bringen. Yang et al. untersuchen beispielsweise DoS- und Cache-Pollution-Angriffe in realen CDN-Daten und verdeutlichen die Bedeutung mehrschichtiger Analyse- und Monitoringmechanismen.",
        refs: [6],
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-map.webp",
        width: 2979,
        height: 1827,
        maxWidth: 940,
        alt: "Weltkarte: Die Azure-Front-Door-Edge-Schicht (TLS, WAF, Routing, Cache) leitet Anfragen an geografisch verteilte Edge-Standorte auf mehreren Kontinenten weiter.",
        caption: "Azure Front Door nimmt Anfragen an Microsofts global verteilten Edge-Standorten entgegen und leitet sie kontrolliert an geeignete Ursprungsdienste weiter.",
      },

      { type: "heading", text: "Warum Microsoft Azure ein guter Ansatz für sichere Webarchitekturen ist" },
      {
        type: "paragraph",
        text: "Der wesentliche Vorteil von Azure Front Door liegt nicht nur im einzelnen Dienst, sondern in seiner Integration mit anderen Azure-Komponenten.",
      },
      { type: "paragraph", text: "Eine typische Enterprise-Webarchitektur kann unter anderem folgende Dienste kombinieren:" },
      {
        type: "bullets",
        items: [
          "Azure Front Door als globalen Einstiegspunkt,",
          "Web Application Firewall zum Schutz des HTTP-Traffics,",
          "Azure App Service oder Container Apps für die Anwendung,",
          "Azure API Management für API-Governance,",
          "Private Link für geschützte Origin-Verbindungen,",
          "Key Vault für Zertifikate und Geheimnisse,",
          "Azure Monitor und Log Analytics für Monitoring,",
          "Microsoft Entra ID für Identitäten und Zugriffssteuerung,",
          "Bicep oder Terraform für Infrastructure as Code,",
          "Azure DevOps oder GitHub Actions für CI/CD.",
        ],
      },
      {
        type: "paragraph",
        text: "Dadurch lassen sich Netzwerk, Identitäten, Anwendungen, Monitoring und Deployment in ein gemeinsames Betriebsmodell integrieren.",
      },

      { type: "subheading", text: "Front Door, Application Gateway und API Management" },
      {
        type: "paragraph",
        text: "Da mehrere Azure-Dienste HTTP-Traffic verarbeiten, werden ihre Aufgaben häufig verwechselt. Azure Front Door wird eingesetzt, bevor der Traffic die eigentliche Anwendungsregion erreicht. Application Gateway ist dagegen ein regionaler Dienst und eignet sich beispielsweise als VNet-naher Ingress für virtuelle Maschinen oder Kubernetes-Workloads.",
      },
      {
        type: "paragraph",
        text: "API Management übernimmt wiederum keine globale Content-Auslieferung, sondern API-spezifische Aufgaben wie Tokenvalidierung, Transformationen, Versionierung, Quotas und die Verwaltung von API-Produkten. Die Dienste können kombiniert werden, müssen es aber nicht. Eine typische SaaS-Anwendung auf App Service benötigt häufig Azure Front Door und API Management, aber kein zusätzliches Application Gateway. Mehrere Gateways sollten nur eingesetzt werden, wenn jedes davon eine klar definierte Verantwortung erfüllt.",
      },
      {
        type: "paragraph",
        text: "Architektur-Hinweis: Eine Architektur wird nicht automatisch sicherer, wenn möglichst viele Sicherheits- und Netzwerkdienste hintereinandergeschaltet werden. Entscheidend sind klare Zuständigkeiten und ein kontrollierter Request Flow.",
      },

      { type: "subheading", text: "Abgrenzung zu selbst betriebenen Proxies (NGINX, Traefik)" },
      {
        type: "paragraph",
        text: "NGINX und Traefik sind leistungsfähige Reverse Proxies und Load Balancer. Sie eignen sich besonders als regionaler Ingress für Container-, Docker- oder Kubernetes-Umgebungen, für internes Routing und für Architekturen, bei denen Unternehmen möglichst viel Kontrolle über Konfiguration und Betrieb behalten möchten. Traefik kann Dienste aus Orchestrierungsplattformen automatisch erkennen, während NGINX sehr flexible Proxy-, Routing- und Load-Balancing-Funktionen bereitstellt.",
        refs: [15, 16],
      },
      {
        type: "paragraph",
        text: "Sie sind jedoch nicht unmittelbar mit Azure Front Door gleichzusetzen. Azure Front Door ist ein vollständig verwalteter und global verteilter Edge-Dienst. Er kombiniert das weltweite Microsoft-Netzwerk mit WAF, DDoS-Schutz, Zertifikatsverwaltung, CDN-Caching, Health-basiertem globalem Routing und der privaten Anbindung unterstützter Azure-Origins. Bei einer selbst betriebenen Lösung müssten Hochverfügbarkeit, globale Verteilung, Skalierung, Updates, Zertifikate, WAF, DDoS-Schutz und Monitoring separat aufgebaut und betrieben werden. Beide Ansätze lassen sich auch kombinieren: Front Door übernimmt den globalen Edge-Layer, während NGINX oder Traefik innerhalb einer Region als Ingress dienen.",
        refs: [4, 5, 17],
      },

      { type: "heading", text: "Zielarchitektur: Azure Front Door in einer Enterprise-Anwendung" },
      {
        type: "paragraph",
        text: "Eine mögliche Zielarchitektur besteht aus einer browserbasierten Webanwendung, einer API und mehreren privaten Plattformdiensten. Nur Azure Front Door befindet sich im öffentlichen Bereich; alle nachgelagerten Dienste werden über Private Link angebunden.",
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-traffic.webp",
        width: 2960,
        height: 1970,
        maxWidth: 900,
        alt: "Vier-Ebenen-Referenzarchitektur: Users & Internet, Global Edge Layer mit Azure Front Door (Custom Domain, TLS, Firewall, Routing), Application Layer mit Web Application und API Management über Private Link, sowie Data & Platform Services mit Backend API, Datenbank und Storage.",
        caption: "Enterprise-Referenzarchitektur mit vier Ebenen: Nur Azure Front Door liegt öffentlich; Web-App und API Management werden über Private Link angebunden, dahinter folgen Backend-API und Datenplattform.",
      },

      { type: "subheading", text: "Azure Front Door als zentraler Einstiegspunkt" },
      {
        type: "paragraph",
        text: "Alle öffentlichen Domains der Anwendung verweisen auf Azure Front Door. Front Door übernimmt TLS, WAF-Prüfung und Routing. Der technische Hostname des App Service oder API-Gateways wird nicht als öffentlicher Einstiegspunkt verwendet.",
      },
      { type: "paragraph", text: "Dadurch entsteht eine zentrale Stelle für:" },
      {
        type: "bullets",
        items: [
          "Domains und Zertifikate,",
          "Sicherheitsregeln,",
          "HTTP-zu-HTTPS-Weiterleitungen,",
          "URL-Routing,",
          "Caching,",
          "Health Checks,",
          "Access Logs.",
        ],
      },

      { type: "subheading", text: "Getrennte Routen für Frontend und API" },
      { type: "paragraph", text: "Frontend und API können über unterschiedliche Domains veröffentlicht werden:" },
      {
        type: "code",
        content: "app.example.com   →  Web Application\napi.example.com   →  API Management",
      },
      { type: "paragraph", text: "Alternativ können beide über dieselbe Domain erreichbar sein:" },
      {
        type: "code",
        content: "app.example.com/*       →  Web Application\napp.example.com/api/*   →  API Management",
      },
      {
        type: "paragraph",
        text: "Eine gemeinsame Domain vereinfacht häufig browserbasierte Anwendungen, weil weniger Cross-Origin-Konfigurationen erforderlich sind. Eine getrennte API-Domain ist dagegen sinnvoll, wenn die API zusätzlich von mobilen Anwendungen, Partnern oder anderen Systemen verwendet wird.",
      },

      { type: "subheading", text: "Web Application Firewall am Edge" },
      {
        type: "paragraph",
        text: "Die WAF prüft Requests, bevor sie Ressourcen des App Service oder API Management beanspruchen. Microsoft empfiehlt für internetbasierte Anwendungen den Einsatz der WAF mit verwalteten Regeln. Die Regeln sollten zunächst an den tatsächlichen Traffic angepasst werden, weil legitime Requests andernfalls fälschlicherweise blockiert werden können. Während dieser Abstimmung kann die Policy im Detection Mode protokollieren, ohne Traffic zu blockieren.",
        refs: [7],
      },
      {
        type: "paragraph",
        text: "Die WAF ergänzt die Anwendungssicherheit, ersetzt sie aber nicht. Ob ein Nutzer auf einen bestimmten Datensatz zugreifen darf, muss weiterhin durch die Anwendung oder API geprüft werden.",
      },

      { type: "subheading", text: "Private Origins" },
      {
        type: "paragraph",
        text: "Der wichtigste Sicherheitsgewinn entsteht, wenn der Origin nicht unabhängig von Front Door erreichbar ist. Azure Front Door Premium kann unterstützte PaaS-Dienste über Private Link anbinden. Der Ursprung sollte zusätzlich so konfiguriert werden, dass er keinen Traffic akzeptiert, der nicht über diese private Verbindung eintrifft.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Ist Private Link nicht verfügbar, kann der Zugriff beispielsweise über den Service Tag AzureFrontDoor.Backend und die Prüfung des profilspezifischen Headers X-Azure-FDID eingeschränkt werden. Diese Variante ist weniger konsequent als ein privater Ursprung, verhindert aber ebenfalls, dass beliebige Clients den Origin direkt verwenden.",
        refs: [8],
      },

      { type: "subheading", text: "API Management als zweite Sicherheitsebene" },
      { type: "paragraph", text: "API Management ergänzt Front Door um API-spezifische Kontrollen. Während die WAF technische Angriffsmuster untersucht, kann API Management beispielsweise:" },
      {
        type: "bullets",
        items: [
          "OAuth- und JWT-Token validieren,",
          "erforderliche Claims und Scopes prüfen,",
          "Limits je Subscription oder Nutzer anwenden,",
          "Requests und Responses transformieren,",
          "API-Versionen verwalten,",
          "interne Backend-Endpunkte verbergen.",
        ],
      },
      {
        type: "paragraph",
        text: "Microsoft unterstützt sowohl öffentlich eingeschränkte als auch privat angebundene APIM-Origins hinter Azure Front Door.",
        refs: [8],
      },

      { type: "heading", text: "Technische Umsetzung: Wie Azure Front Door konkret aufgebaut wird" },
      {
        type: "paragraph",
        text: "Nachdem die Zielarchitektur definiert ist, stellt sich die praktische Frage, wie sie reproduzierbar umgesetzt und betrieben werden kann. Eine robuste Implementierung verfolgt fünf Ziele:",
      },
      {
        type: "bullets",
        items: [
          "Front Door ist der einzige vorgesehene öffentliche Zugriffspfad.",
          "Sicherheitsregeln werden kontrolliert eingeführt und überwacht.",
          "Routing und Health Checks bilden die tatsächliche Anwendungsstruktur ab.",
          "Infrastrukturänderungen werden versioniert bereitgestellt.",
          "Fehler lassen sich über zentrale Logs nachvollziehen.",
        ],
      },

      { type: "subheading", text: "1. Domains und Routing definieren" },
      {
        type: "paragraph",
        text: "Zunächst werden die öffentlichen Domains und die gewünschten Request-Pfade festgelegt. Dabei sollte die Routingstruktur möglichst einfach bleiben. Ein mögliches Modell lautet:",
      },
      {
        type: "code",
        content: "app.example.com/*       →  frontend-origin-group\napp.example.com/api/*   →  api-origin-group",
      },
      {
        type: "paragraph",
        text: "Azure Front Door unterstützt neben pfadbasiertem Routing auch unterschiedliche Verfahren zur Auswahl eines Origins. Prioritäten ermöglichen beispielsweise eine Active-Passive-Architektur, während Gewichtungen für schrittweise Migrationen oder Canary Deployments verwendet werden können.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "Die Architektur sollte jedoch nicht mit komplexem Routing beginnen, wenn nur ein Ursprung benötigt wird. Für viele Anwendungen reicht zunächst eine einzelne Region mit einem klar definierten Frontend- und API-Pfad.",
      },

      { type: "subheading", text: "2. WAF kontrolliert einführen" },
      {
        type: "paragraph",
        text: "Die WAF sollte mit Microsofts verwalteten Regeln aktiviert werden. Zusätzlich können eigene Regeln für anwendungsspezifische Anforderungen ergänzt werden, beispielsweise:",
      },
      {
        type: "bullets",
        items: [
          "Rate Limits für Login- oder Export-Endpunkte,",
          "Einschränkung von Administrationspfaden,",
          "Blockierung nicht benötigter HTTP-Methoden,",
          "Geo-Filter für regional begrenzte Anwendungen,",
          "Behandlung bekannter Bots.",
        ],
      },
      { type: "paragraph", text: "Für die Einführung empfiehlt sich ein kontrollierter Ablauf:" },
      {
        type: "diagram",
        steps: [
          { label: "WAF-Baseline definieren" },
          { label: "Detection Mode aktivieren" },
          { label: "Logs und False Positives analysieren" },
          { label: "Ausnahmen möglichst eng definieren" },
          { label: "Prevention Mode aktivieren" },
          { label: "Kontinuierlich überwachen" },
        ],
      },
      {
        type: "paragraph",
        text: "Pauschale Ausnahmen sollten vermieden werden. Löst beispielsweise ein einzelnes Suchfeld fälschlicherweise eine SQL-Injection-Regel aus, sollte nur dieses konkrete Feld für die betroffene Regel ausgenommen werden. Das vollständige Deaktivieren aller SQL-Injection-Regeln würde die Schutzwirkung unnötig reduzieren.",
      },
      {
        type: "paragraph",
        text: "Rate Limits sollten ebenfalls nicht zu niedrig angesetzt werden. Viele legitime Nutzer können sich zudem eine gemeinsame Unternehmens- oder Mobilfunk-IP teilen. Microsoft empfiehlt generell ausreichend hohe Schwellenwerte, die extreme Nutzung begrenzen, ohne legitimen Traffic vorschnell zu blockieren.",
        refs: [7],
      },

      { type: "subheading", text: "3. Origins absichern" },
      { type: "paragraph", text: "Bei Azure Front Door Premium ist Private Link für unterstützte Origins die bevorzugte Variante:" },
      {
        type: "diagram",
        steps: [{ label: "Azure Front Door" }, { label: "Private Link" }, { label: "App Service oder API Management" }],
      },
      {
        type: "paragraph",
        text: "Nach der Einrichtung muss die Private-Endpoint-Verbindung am jeweiligen Dienst genehmigt werden. Anschließend sollte der öffentliche Netzwerkzugriff des Ursprungs deaktiviert werden, soweit der Dienst und das Betriebsmodell dies zulassen.",
      },
      { type: "paragraph", text: "Ein praktischer Test sollte nicht nur prüfen, ob die Anwendung über Front Door erreichbar ist, sondern auch, ob ein direkter Request an den Origin scheitert:" },
      {
        type: "grid",
        items: [
          { title: "Test 1 – Zugriff über Front Door", description: "Request über Azure Front Door. Erwartung: 200 OK." },
          { title: "Test 2 – Direkter Origin-Zugriff", description: "Direkter Request an den Origin. Erwartung: Zugriff blockiert." },
        ],
      },
      {
        type: "paragraph",
        text: "Dieser Negativtest ist besonders wichtig. Eine funktionierende Front-Door-Route beweist nicht automatisch, dass kein alternativer Zugriffspfad mehr existiert.",
      },

      { type: "subheading", text: "4. Health Checks und Performance konfigurieren" },
      {
        type: "paragraph",
        text: "Sind mehrere Origins vorhanden, verwendet Front Door Health Probes, um ihre Verfügbarkeit zu bewerten. Der Health Endpoint (z. B. /healthz) sollte einen eindeutigen 200-OK-Status liefern und die Komponenten prüfen, die für die Verarbeitung von Produktionstraffic tatsächlich erforderlich sind. Microsoft empfiehlt für neue Profile standardmäßig ressourcenschonende HEAD-Anfragen. Der Endpoint sollte keine Weiterleitung auf eine Login-Seite auslösen und keine unnötig aufwendigen Datenbank- oder API-Abfragen durchführen.",
        refs: [10],
      },
      { type: "paragraph", text: "Caching sollte nur für eindeutig geeignete Inhalte aktiviert werden, beispielsweise:" },
      {
        type: "bullets",
        items: [
          "JavaScript- und CSS-Dateien,",
          "Bilder,",
          "Schriftarten,",
          "öffentliche Downloads,",
          "nicht personalisierte Inhalte.",
        ],
      },
      {
        type: "paragraph",
        text: "Bei dynamischen oder nutzerspezifischen Responses ist besondere Vorsicht erforderlich. Query Strings und Cache Keys bestimmen, ob unterschiedliche Requests als dieselbe Ressource behandelt werden. Eine unpassende Konfiguration kann im schlimmsten Fall dafür sorgen, dass personalisierte Inhalte an andere Nutzer ausgeliefert werden.",
        refs: [11],
      },

      { type: "subheading", text: "5. Monitoring aktivieren" },
      {
        type: "paragraph",
        text: "Front Door Access Logs, Health Probe Logs und WAF Logs sind nicht automatisch aktiviert. Sie sollten über Diagnostic Settings an Log Analytics oder eine andere zentrale Logplattform übertragen werden.",
        refs: [12],
      },
      { type: "paragraph", text: "Ein grundlegendes Monitoring sollte mindestens folgende Kennzahlen abdecken:" },
      {
        type: "bullets",
        items: [
          "Request-Anzahl,",
          "Antwortzeiten,",
          "4xx- und 5xx-Fehler,",
          "blockierte WAF-Requests,",
          "häufig ausgelöste WAF-Regeln,",
          "Origin-Verfügbarkeit,",
          "Cache-Hit-Rate,",
          "ausgehende Datenmenge.",
        ],
      },
      {
        type: "diagram",
        steps: [
          { label: "Azure Front Door", items: ["Access Logs", "WAF Logs", "Health Probe Logs", "Metrics"] },
          { label: "Diagnostic Settings" },
          { label: "Log Analytics", items: ["Dashboards", "KQL Queries", "Alerts"] },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Monitor und Log Analytics ermöglichen, Fehler über mehrere Ebenen zu untersuchen. So kann beispielsweise unterschieden werden, ob ein Request bereits durch die WAF blockiert wurde, Front Door keinen gesunden Origin gefunden hat oder die Anwendung selbst einen Fehler zurückgegeben hat.",
        refs: [13],
      },

      { type: "subheading", text: "6. Infrastructure as Code und CI/CD" },
      {
        type: "paragraph",
        text: "Front Door, WAF Policies, Routen, Origins und Diagnostic Settings sind produktionskritische Konfigurationen. Sie sollten nicht ausschließlich manuell im Azure Portal gepflegt werden.",
      },
      {
        type: "paragraph",
        text: "Mit Bicep oder Terraform lassen sie sich deklarativ beschreiben und über Pull Requests kontrolliert verändern. Microsoft empfiehlt Infrastructure as Code ausdrücklich, um Front-Door-Konfigurationen konsistent bereitzustellen und Änderungen wie neue WAF-Regelversionen nachvollziehbar zu verwalten. Die vollständige Implementierung sollte modular aufgebaut sein:",
        refs: [14],
      },
      {
        type: "filetree",
        nodes: [
          {
            type: "folder",
            name: "infrastructure",
            defaultOpen: true,
            children: [
              { type: "file", name: "main.bicep" },
              {
                type: "folder",
                name: "modules",
                note: "Wiederverwendbare Bicep-Module je Ressource",
                children: [
                  { type: "file", name: "front-door.bicep" },
                  { type: "file", name: "waf-policy.bicep" },
                  { type: "file", name: "origins.bicep" },
                  { type: "file", name: "routes.bicep" },
                  { type: "file", name: "app-service.bicep" },
                  { type: "file", name: "monitoring.bicep" },
                ],
              },
              {
                type: "folder",
                name: "environments",
                note: "Parameter je Umgebung",
                children: [
                  { type: "file", name: "dev.bicepparam" },
                  { type: "file", name: "test.bicepparam" },
                  { type: "file", name: "prod.bicepparam" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "Beispielcode, wie Infrastructure as Code mit Bicep umgesetzt werden kann, stellen wir in einem offenen Repository bereit:",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-iac-with-bicep",
        description: "Infrastructure as Code für Azure – reproduzierbar mit Bicep.",
        url: "https://github.com/smiit-GmbH/azure-iac-with-bicep",
      },
      { type: "paragraph", text: "Ein möglicher Deployment-Prozess lautet:" },
      {
        type: "diagram",
        steps: [
          { label: "Feature Branch" },
          { label: "Pull Request" },
          { label: "Bicep Validation" },
          { label: "Deployment nach Dev" },
          { label: "Smoke- und Security-Tests" },
          { label: "Approval" },
          { label: "Deployment nach Produktion" },
        ],
      },
      {
        type: "paragraph",
        text: "Dadurch werden nicht nur wiederkehrende Aufgaben automatisiert. Jede Änderung an Routing, WAF oder Origin-Konfiguration ist versioniert, überprüfbar und im Fehlerfall leichter zurückzuverfolgen.",
      },

      { type: "heading", text: "Architektur-Reifegrad: Nicht jede Anwendung benötigt sofort Multi-Region" },
      {
        type: "paragraph",
        text: "Ein häufiger Fehler besteht darin, Azure Front Door direkt als globale Active-Active-Plattform mit mehreren Regionen zu planen. Technisch ist das möglich, aber nicht für jede Anwendung wirtschaftlich oder betrieblich sinnvoll.",
      },
      {
        type: "paragraph",
        text: "Eine zweite Anwendungsregion allein erzeugt noch keine vollständige Multi-Region-Architektur. Zusätzlich müssen Datenreplikation, Identity Provider, Storage, Messaging, Hintergrundprozesse und Failback-Verfahren berücksichtigt werden. Für viele Unternehmen ist deshalb ein schrittweiser Aufbau sinnvoll:",
      },
      {
        type: "maturity",
        items: [
          { level: 0, label: "Direkter öffentlicher Origin" },
          { level: 1, label: "Zentraler Einstiegspunkt (Front Door)" },
          { level: 2, label: "WAF und Monitoring" },
          { level: 3, label: "Geschützter Origin" },
          { level: 4, label: "Private Link und Infrastructure as Code" },
          { level: 5, label: "Multi-Region und automatisiertes Failover" },
        ],
      },
      {
        type: "paragraph",
        text: "Level 0 bedeutet direkten Zugriff auf den technischen Endpunkt mit dezentraler Verwaltung. Mit Level 1 wird Front Door zur zentralen Domain- und Routingebene, mit Level 2 kommen Managed WAF Rules und Monitoring hinzu. Ab Level 3 wird der direkte Origin-Zugriff eingeschränkt und Front Door zum verbindlichen Zugriffspfad, mit Level 4 folgen Private Link und Infrastructure as Code. Level 5 verbindet schließlich mehrere Regionen über prioritäts- oder gewichtsbasiertes Routing.",
      },
      {
        type: "paragraph",
        text: "Für viele Anwendungen stellt bereits Level 3 oder 4 einen großen Fortschritt dar. Multi-Region sollte dann ergänzt werden, wenn fachliche Anforderungen an Verfügbarkeit, Recovery Time Objective und Recovery Point Objective den zusätzlichen Aufwand rechtfertigen.",
      },

      { type: "heading", text: "Best Practices für Azure Front Door" },
      {
        type: "numbered",
        items: [
          { title: "Front Door als verbindlichen Einstiegspunkt etablieren", description: "Eine WAF schützt nur den Traffic, der sie tatsächlich durchläuft. Der Origin sollte nicht über einen alternativen öffentlichen Pfad erreichbar bleiben." },
          { title: "Private Link bevorzugen", description: "Für unterstützte Azure-Dienste bietet Azure Front Door Premium mit Private Link die konsequenteste Origin-Absicherung. Ist Private Link nicht möglich, sollten Service Tags und profilspezifische Header-Prüfungen kombiniert werden." },
          { title: "WAF schrittweise einführen", description: "Eine neue Policy sollte zunächst im Detection Mode beobachtet werden. Erst nach der Analyse legitimer Requests und notwendiger Ausnahmen sollte sie Traffic aktiv blockieren." },
          { title: "Ausnahmen möglichst eng definieren", description: "Nicht eine vollständige Regelgruppe deaktivieren, wenn nur ein einzelnes Request-Feld einen False Positive verursacht. Je kleiner die Ausnahme, desto größer bleibt die Schutzwirkung." },
          { title: "Caching bewusst einsetzen", description: "Caching ist vor allem für statische und nicht personalisierte Inhalte geeignet. Query Strings, Cookies und Autorisierungsheader müssen bei der Cache-Konzeption ausdrücklich berücksichtigt werden." },
          { title: "Konfigurationen versionieren", description: "Front Door, WAF Policies, Routen, Domains und Diagnostic Settings sollten als Code beschrieben und über einen kontrollierten CI/CD-Prozess bereitgestellt werden." },
          { title: "Architektur aus Geschäftsanforderungen ableiten", description: "Nicht jede Anwendung benötigt mehrere Regionen, zusätzliche Gateways oder hochkomplexes Routing. Die technische Ausprägung sollte aus Sicherheits-, Verfügbarkeits- und Performanceanforderungen entstehen." },
        ],
      },

      { type: "heading", text: "Fazit: Ein sicherer Edge-Layer für moderne Webanwendungen" },
      {
        type: "paragraph",
        text: "Azure Front Door ist mehr als ein globaler Load Balancer. Der Dienst verbindet Traffic Routing, TLS, Content Delivery, Web Application Firewall und Origin-Anbindung in einer gemeinsamen Edge-Schicht.",
      },
      {
        type: "paragraph",
        text: "Der größte Sicherheitsgewinn entsteht nicht allein durch die Aktivierung einer WAF. Entscheidend ist, dass Front Door zum verbindlichen Einstiegspunkt der Anwendung wird und alternative Zugriffe auf den Origin technisch verhindert werden.",
      },
      {
        type: "paragraph",
        text: "In Kombination mit Azure Front Door Premium, Private Link, API Management, Azure Monitor und Infrastructure as Code entsteht eine Architektur, die sich sicher und reproduzierbar betreiben lässt. Domains, Routing und Sicherheitsregeln werden zentral verwaltet, während Frontend, API und Datenplattform klar getrennte Verantwortlichkeiten behalten.",
      },
      {
        type: "paragraph",
        text: "Dabei muss nicht jede Anwendung sofort als globale Multi-Region-Plattform aufgebaut werden. Ein schrittweiser Reifegrad ist häufig wirtschaftlicher und operativ robuster: zunächst ein zentraler Einstiegspunkt, anschließend WAF und Monitoring, danach Origin-Schutz und Private Link. Multi-Region und automatisiertes Failover folgen erst, wenn die fachlichen Anforderungen es rechtfertigen. So wird Azure Front Door nicht zu einer weiteren vorgeschalteten Azure-Ressource, sondern zu einem zentralen Bestandteil einer sicheren und skalierbaren Enterprise-Webarchitektur.",
      },
    ],

    faq: [
      {
        question: "Wann benötigt man Azure Front Door Premium?",
        answer:
          "Premium unterscheidet sich von Standard vor allem in zwei praxisrelevanten Punkten: der privaten Origin-Anbindung über Private Link und dem Zugriff auf Microsofts verwaltete WAF-Regelsätze inklusive Bot-Schutz. Wer seinen Ursprung nicht öffentlich erreichbar lassen möchte oder auf gepflegte Managed Rules statt ausschließlich eigener Regeln setzt, braucht Premium. Für reines globales Routing, TLS, CDN-Caching und einfache, selbst definierte WAF-Regeln reicht dagegen häufig Standard. In der Praxis lohnt sich Premium besonders für datenintensive Enterprise-Anwendungen mit hohen Sicherheits- und Compliance-Anforderungen; für kleinere, unkritische Workloads ist Standard oft der wirtschaftlichere Einstieg.",
      },
      {
        question: "Ersetzt Azure Front Door API Management?",
        answer:
          "Nein – die beiden Dienste arbeiten auf unterschiedlichen Ebenen und ergänzen sich. Front Door ist die globale Edge-Schicht für Routing, TLS, WAF und Content Delivery und entscheidet, welcher Request überhaupt an welche Region und welchen Ursprung gelangt. API Management setzt danach an und übernimmt API-spezifische Aufgaben: Tokenvalidierung (OAuth/JWT), Prüfung von Scopes und Claims, Rate Limits je Subscription, Request- und Response-Transformationen, Versionierung und die Verwaltung von API-Produkten. In der Praxis liegt API Management hinter Front Door – idealerweise privat angebunden –, sodass die WAF technische Angriffsmuster filtert und API Management die fachliche API-Governance übernimmt. Nur eines der beiden abzudecken, lässt in der Regel eine wichtige Schutzebene offen.",
      },
      {
        question: "Braucht man zusätzlich Application Gateway?",
        answer:
          "Nicht grundsätzlich. Application Gateway ist ein regionaler Layer-7-Load-Balancer und spielt seine Stärken dort aus, wo ein VNet-naher Ingress benötigt wird – etwa vor virtuellen Maschinen, einem AKS-Cluster oder Legacy-Workloads innerhalb eines virtuellen Netzwerks. Front Door hingegen ist global und sitzt vor der Region. Für eine typische PaaS-Architektur auf App Service oder Container Apps mit API Management kann Front Door direkt mit den – idealerweise privat angebundenen – Ursprüngen verbunden werden, ohne dass ein Application Gateway dazwischenliegt. Beide zu kombinieren ergibt nur Sinn, wenn jede Schicht eine klar getrennte Aufgabe erfüllt; mehr hintereinandergeschaltete Gateways bedeuten sonst vor allem mehr Latenz, Kosten und Betriebsaufwand.",
      },
      {
        question: "Reicht die Web Application Firewall als Schutz der Anwendung aus?",
        answer:
          "Nein. Die WAF filtert bekannte technische Angriffsmuster wie SQL Injection oder Cross-Site Scripting und begrenzt über Rate Limits automatisierte Zugriffe – sie ist eine wichtige, aber generische Schicht. Ob ein bestimmter Nutzer einen bestimmten Datensatz sehen darf, ob Tokens gültig sind oder ob die Geschäftslogik missbraucht wird, kann sie nicht beurteilen. Solche fachlichen Lücken – etwa Broken Access Control, die in den OWASP Top 10 ganz oben stehen – müssen weiterhin in der Anwendung, in der Authentifizierung und in der API-Governance abgesichert werden. Die WAF ergänzt sichere Softwareentwicklung also, ersetzt sie aber nicht; der eigentliche Schutz entsteht erst im Zusammenspiel aus WAF, API Management und sauberer Anwendungslogik.",
      },
      {
        question: "Wie stelle ich sicher, dass der Origin wirklich nur über Front Door erreichbar ist?",
        answer:
          "Das ist der wichtigste Sicherheitsschritt – und er passiert nicht automatisch, nur weil Front Door davorsteht. Die konsequenteste Variante ist Azure Front Door Premium mit Private Link: Der Ursprung wird privat angebunden und sein öffentlicher Netzwerkzugriff anschließend deaktiviert, soweit der Dienst das zulässt. Ist Private Link nicht möglich, lässt sich der Zugriff über den Service Tag AzureFrontDoor.Backend einschränken und zusätzlich der profilspezifische Header X-Azure-FDID prüfen, sodass nur das eigene Front-Door-Profil den Origin verwenden darf. Entscheidend ist der abschließende Negativtest: Ein Request über Front Door muss mit 200 OK durchgehen, ein direkter Request auf den technischen Origin-Hostnamen dagegen blockiert werden. Erst wenn dieser direkte Zugriff scheitert, ist Front Door tatsächlich der verbindliche Einstiegspunkt.",
      },
      {
        question: "Wie führe ich Azure Front Door vor einer bestehenden Anwendung ein, ohne Ausfallzeiten?",
        answer:
          "Am besten schrittweise und testbar, bevor der öffentliche Datenverkehr umgeleitet wird. Zunächst wird das Front-Door-Profil mit der bestehenden Anwendung als Origin, der benutzerdefinierten Domain, TLS und einer zunächst im Detection Mode laufenden WAF eingerichtet. Über den vorläufigen Front-Door-Endpunkt lässt sich die gesamte Kette testen – Routing, Zertifikate, Header und Health Checks –, während die produktive Domain noch direkt auf den Origin zeigt. Erst danach folgt die DNS-Umstellung, in der Regel per CNAME auf den Front-Door-Endpunkt, idealerweise mit vorab reduzierter TTL, um schnell zurückwechseln zu können. Sobald der Traffic stabil über Front Door läuft und die WAF abgestimmt ist, folgen die beiden letzten Schritte: die WAF in den Prevention Mode überführen und den direkten öffentlichen Zugriff auf den Origin sperren.",
      },
      {
        question: "Sollte jede Anwendung über mehrere Azure-Regionen betrieben werden?",
        answer:
          "Nein. Multi-Region erhöht die Verfügbarkeit deutlich, aber auch Kosten, Komplexität und Betriebsaufwand. Front Door kann zwar per Prioritäts- oder Gewichts-Routing schnell auf eine zweite Region umschalten – eine zweite Anwendungsregion allein ergibt jedoch noch keine belastbare Ausfallsicherheit. Entscheidend sind die nachgelagerten Ebenen: Datenreplikation, Identity Provider, Storage, Messaging und Hintergrundprozesse müssen ebenfalls auf einen regionalen Ausfall und ein sauberes Failback vorbereitet sein. In der Praxis sollte Multi-Region an konkreten Zielwerten festgemacht werden – Recovery Time Objective und Recovery Point Objective; für viele Anwendungen ist ein robuster Single-Region-Betrieb mit geschütztem Origin und Monitoring der wirtschaftlichere erste Schritt.",
      },
      {
        question: "Können Front Door und der Origin dasselbe Zertifikat verwenden?",
        answer:
          "Sie müssen nicht dasselbe Zertifikat verwenden – und in der Praxis tun sie es meist auch nicht. Der Client baut eine TLS-Verbindung zur benutzerdefinierten Domain auf Front Door auf; Front Door terminiert diese und stellt eine separate TLS-Verbindung zum Origin her. Für die öffentliche Domain verwaltet Front Door das Zertifikat in der Regel automatisch (Managed Certificate) oder greift auf ein Zertifikat aus Key Vault zu. Der Origin sollte trotzdem ein gültiges Zertifikat besitzen, damit auch die zweite Verbindung verschlüsselt und der Hostname prüfbar bleibt – „TLS bis zum Edge und danach unverschlüsselt“ ist keine sichere Konfiguration. Ein selbstsigniertes oder abgelaufenes Origin-Zertifikat führt sonst zu Verbindungsfehlern oder unnötigen Sicherheitslücken.",
      },
      {
        question: "Warum sind Front-Door-Logs in Log Analytics nicht sichtbar?",
        answer:
          "Weil sie nicht standardmäßig aktiviert sind. Access Logs, Health Probe Logs und WAF Logs entstehen erst, wenn in den Diagnostic Settings des Front-Door-Profils ein Ziel konfiguriert ist – etwa ein Log-Analytics-Workspace, ein Storage Account oder ein Event Hub. Praktisch heißt das: Diagnostic Settings anlegen, die gewünschten Log-Kategorien auswählen und einige Minuten bis zum Eintreffen der ersten Einträge einplanen. Danach lassen sich mit KQL gezielt Fragen beantworten, etwa welche WAF-Regeln am häufigsten auslösen oder ob ein Fehler bereits an der WAF, an einem ungesunden Origin oder erst in der Anwendung entstand. Ohne aktivierte Diagnostics fehlt im Ernstfall genau die Datengrundlage für die Fehlersuche.",
      },
    ],

    sources: [
      { title: "Microsoft Learn: Azure Front Door (classic) – Abkündigung und Migration (Retirement FAQ)", url: "https://learn.microsoft.com/en-us/azure/frontdoor/classic-retirement-faq" },
      { title: "OWASP Foundation: OWASP Top 10:2025", url: "https://owasp.org/Top10/2025/" },
      { title: "Rose, S., Borchert, O., Mitchell, S. & Connelly, S. (2020): Zero Trust Architecture. NIST Special Publication 800-207.", url: "https://doi.org/10.6028/NIST.SP.800-207" },
      { title: "Microsoft Learn: What is Azure Front Door? (Overview)", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview" },
      { title: "Microsoft Learn: Secure your origin with Private Link", url: "https://learn.microsoft.com/en-us/azure/frontdoor/private-link" },
      { title: "Yang, L. et al. (2022): Multi-Perspective Content Delivery Networks Security Framework Using Optimized Unsupervised Anomaly Detection. IEEE Transactions on Network and Service Management, 19(1), 686–705. DOI: 10.1109/TNSM.2021.3100308 (frei zugänglicher Preprint: arXiv:2107.11514).", url: "https://arxiv.org/abs/2107.11514" },
      { title: "Microsoft Learn: Best practices for Azure Web Application Firewall in Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-best-practices" },
      { title: "Microsoft Learn: Configure Azure Front Door in front of Azure API Management", url: "https://learn.microsoft.com/en-us/azure/api-management/front-door-api-management" },
      { title: "Microsoft Learn: Traffic routing methods to origin", url: "https://learn.microsoft.com/en-us/azure/frontdoor/routing-methods" },
      { title: "Microsoft Learn: Health probes – Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/health-probes" },
      { title: "Microsoft Learn: Caching with Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching" },
      { title: "Microsoft Learn: Configure Azure Front Door logs", url: "https://learn.microsoft.com/en-us/azure/frontdoor/standard-premium/how-to-logs" },
      { title: "Microsoft Learn: Monitor Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/monitor-front-door" },
      { title: "Microsoft Learn: Architecture best practices for Azure Front Door (Azure Well-Architected Framework)", url: "https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-front-door" },
      { title: "NGINX Documentation: Using NGINX as an HTTP load balancer", url: "https://nginx.org/en/docs/http/load_balancing.html" },
      { title: "Traefik Proxy Documentation", url: "https://doc.traefik.io/traefik/" },
      { title: "Microsoft Learn: Secure an Azure Front Door deployment", url: "https://learn.microsoft.com/en-us/azure/frontdoor/secure-front-door" },
    ],

    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    keywords: [
      "Azure Front Door",
      "Web Application Firewall",
      "WAF",
      "Private Link",
      "Zero Trust",
      "Edge",
      "CDN",
      "Reverse Proxy",
      "Enterprise-Architektur",
      "Infrastructure as Code",
      "API Management",
      "Azure Sicherheit",
    ],
    metaTitle: "Azure Front Door in Enterprise-Architekturen: WAF, Private Link & Best Practices | smiit",
    metaDescription:
      "Wie Azure Front Door als sicherer, globaler Einstiegspunkt für Webanwendungen dient – WAF, Private Link, Routing, Monitoring, Infrastructure as Code und ein Reifegradmodell.",
  },

  en: {
    slug: "azure-front-door-in-enterprise-architectures",
    category: "strategy",
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    author: "Sebastian Grab",
    title:
      "Azure Front Door in enterprise architectures: best practices for secure and scalable web applications",
    shortTitle: "Azure Front Door in enterprise architectures",
    excerpt:
      "Exposing web applications directly to the public internet is easy — but rarely secure enough. How Azure Front Door becomes a controlled, reproducible entry point for modern enterprise web applications as a global edge layer with WAF, Private Link and infrastructure as code.",
    ogImage: {
      url: "/og/blog.png",
      width: 1920,
      height: 999,
      alt: "smiit GmbH – Azure Front Door in enterprise architectures",
    },
    coverImage: {
      url: "/assets/blog/azure-front-door/afd-map.webp",
      width: 2979,
      height: 1827,
      alt: "Azure Front Door as a global edge layer with TLS, WAF, routing and caching, directing requests to edge locations worldwide.",
    },

    blocks: [
      { type: "heading", text: "Security starts in front of the application" },
      {
        type: "paragraph",
        text: "Web applications and APIs are among the most important interfaces between companies, customers, partners and internal systems. They are often exposed directly via a public App Service, a container platform or an API gateway. For a first application this can be sufficient. But as requirements for security, availability and scalability grow, additional challenges quickly arise.",
      },
      {
        type: "paragraph",
        text: "Alongside the application itself, TLS certificates have to be managed, application-layer attacks detected, multiple backends routed and the failure of individual instances absorbed. At the same time, attackers should be prevented from bypassing upstream security controls and reaching the origin service directly.",
      },
      {
        type: "paragraph",
        text: "Azure Front Door sits in front of the actual application. The service forms a globally distributed edge layer that accepts incoming HTTP and HTTPS traffic, inspects it via a web application firewall and forwards it in a controlled way to suitable origin services. Combined with Private Link, Azure Monitor and infrastructure as code, this creates a central, reproducible entry point for modern enterprise web applications.",
      },
      {
        type: "paragraph",
        text: "This article shows how Azure Front Door can be used in such an architecture, which tasks the WAF and Private Link take on, and which best practices should be considered for routing, monitoring and deployment.",
      },
      {
        type: "paragraph",
        text: "Note: this article refers to Azure Front Door Standard and Premium. Azure Front Door Classic will be retired on 31 March 2027 and should no longer be used for new architectures.",
        refs: [1],
      },

      { type: "heading", text: "Why publicly reachable web applications need additional protection" },
      {
        type: "paragraph",
        text: "Many web applications begin with a comparatively simple architecture: a frontend or an API runs on Azure App Service, Azure Container Apps, Azure Kubernetes Service or a virtual machine and is made reachable via a public HTTPS endpoint.",
      },
      {
        type: "paragraph",
        text: "That is technically straightforward, but it combines several responsibilities in a single component. The origin service accepts public traffic, terminates TLS and processes the actual application logic at the same time. Security rules, certificates, routing and monitoring are often configured separately per application.",
      },
      { type: "paragraph", text: "As usage grows, typical challenges arise:" },
      {
        type: "bullets",
        items: [
          "Multiple applications need different domains and certificates.",
          "APIs and frontends should be reachable via shared or separate paths.",
          "Attacks such as SQL injection, cross-site scripting or automated bot access should be detected as early as possible.",
          "An application should stay reachable even if an instance or region fails.",
          "Static content should be delivered performantly to geographically distributed users.",
          "Security and routing configurations should stay consistent across development, test and production environments.",
        ],
      },
      {
        type: "paragraph",
        text: "The OWASP Top 10 document central security risks of modern web applications. An upstream web application firewall can detect and block some of these attack patterns. But it replaces neither secure software development nor correct authentication and authorisation.",
        refs: [2],
      },
      {
        type: "paragraph",
        text: "A further problem arises when a WAF is placed in front of the application but the original App Service or API endpoint remains freely reachable. The intended path leads through the firewall:",
      },
      {
        type: "diagram",
        steps: [{ label: "User" }, { label: "Web application firewall" }, { label: "Application" }],
      },
      {
        type: "paragraph",
        text: "In that case, the WAF only protects the traffic that actually passes through it. If an attacker knows the technical hostname of the origin, they can try to call it directly, bypassing the firewall.",
      },
      {
        type: "paragraph",
        text: "From the perspective of a zero-trust architecture, traffic should not be trusted simply because it uses a certain network path. NIST describes zero trust as a security model that puts resources and explicit access decisions at the centre, instead of deriving implicit trust from a network location. Applied to a web architecture this means: the intended access path should not only be documented, but technically enforced.",
        refs: [3],
      },
      {
        type: "grid",
        items: [
          { title: "Direct public origin", description: "Internet → public App Service. Risks: direct origin access, decentralised TLS configuration, no central WAF, inconsistent monitoring." },
          { title: "Controlled access via Front Door", description: "Internet → Azure Front Door + WAF → private origin. Benefits: controlled entry point, central security rules, private origin, consistent logging." },
        ],
      },

      { type: "heading", text: "What Azure Front Door means in practice" },
      {
        type: "paragraph",
        text: "Azure Front Door is Microsoft's global application delivery and content delivery service for HTTP and HTTPS applications. It uses Microsoft's global edge network to accept requests at geographically distributed points of presence and then forward them to suitable origin services.",
        refs: [4],
      },
      { type: "paragraph", text: "Simplified, Azure Front Door can be understood as a kind of globally distributed reverse proxy:" },
      {
        type: "diagram",
        steps: [
          { label: "User" },
          { label: "Azure Front Door edge", items: ["TLS", "WAF", "Routing", "Caching", "Health-based origin selection"] },
          { label: "Application or API" },
        ],
      },
      {
        type: "paragraph",
        text: "The client does not connect directly to the App Service or API gateway. Instead, it calls a custom domain such as app.example.com that is connected to Azure Front Door. Front Door accepts the request, checks it against the configured rules and forwards it to a suitable origin.",
      },
      { type: "paragraph", text: "Its central capabilities include:" },
      {
        type: "grid",
        items: [
          { title: "Global HTTP and HTTPS routing", description: "Requests are mapped to different applications or APIs based on domains and URL paths, e.g. /api/* to API Management." },
          { title: "Web application firewall", description: "The integrated WAF protects applications with Microsoft-managed and custom rules against typical attacks and unusual access patterns." },
          { title: "TLS and certificate management", description: "Front Door terminates TLS at the edge and manages certificates for custom domains, including automatic renewal." },
          { title: "Caching and compression", description: "Suitable content is cached at edge locations and served closer to the user, reducing latency and origin load." },
          { title: "Health-based origin selection", description: "With multiple origins, Front Door checks their availability and reroutes requests to another origin on failure." },
          { title: "Private origin connectivity", description: "Azure Front Door Premium connects supported Azure services via Private Link, so the origin no longer has to be reachable over the public internet." },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Front Door is therefore more than a classic load balancer. It combines global traffic distribution, web security, content delivery and origin protection in a shared edge layer.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "Research on content delivery networks likewise shows that globally distributed delivery structures bring both performance advantages and their own security requirements. Yang et al., for example, study DoS and cache-pollution attacks in real CDN data and highlight the importance of multi-layered analysis and monitoring mechanisms.",
        refs: [6],
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-map.webp",
        width: 2979,
        height: 1827,
        maxWidth: 940,
        alt: "World map with an Azure Front Door edge (TLS, WAF, routing, cache) forwarding requests to geographically distributed edge locations across several continents.",
        caption: "Azure Front Door accepts requests at Microsoft's globally distributed edge locations and forwards them in a controlled way to suitable origin services.",
      },

      { type: "heading", text: "Why Microsoft Azure is a good approach for secure web architectures" },
      {
        type: "paragraph",
        text: "The key advantage of Azure Front Door lies not only in the individual service, but in its integration with other Azure components.",
      },
      { type: "paragraph", text: "A typical enterprise web architecture can combine, among others, the following services:" },
      {
        type: "bullets",
        items: [
          "Azure Front Door as the global entry point,",
          "web application firewall to protect HTTP traffic,",
          "Azure App Service or Container Apps for the application,",
          "Azure API Management for API governance,",
          "Private Link for protected origin connections,",
          "Key Vault for certificates and secrets,",
          "Azure Monitor and Log Analytics for monitoring,",
          "Microsoft Entra ID for identities and access control,",
          "Bicep or Terraform for infrastructure as code,",
          "Azure DevOps or GitHub Actions for CI/CD.",
        ],
      },
      {
        type: "paragraph",
        text: "This lets network, identities, applications, monitoring and deployment be integrated into a shared operating model.",
      },

      { type: "subheading", text: "Front Door, Application Gateway and API Management" },
      {
        type: "paragraph",
        text: "Because several Azure services process HTTP traffic, their responsibilities are often confused. Azure Front Door is used before the traffic reaches the actual application region. Application Gateway, by contrast, is a regional service and suits, for example, a VNet-close ingress for virtual machines or Kubernetes workloads.",
      },
      {
        type: "paragraph",
        text: "API Management, in turn, does not handle global content delivery but API-specific tasks such as token validation, transformations, versioning, quotas and the management of API products. The services can be combined, but don't have to be. A typical SaaS application on App Service often needs Azure Front Door and API Management, but no additional Application Gateway. Multiple gateways should only be used when each fulfils a clearly defined responsibility.",
      },
      {
        type: "paragraph",
        text: "Architecture note: an architecture does not automatically become more secure by chaining together as many security and network services as possible. What matters is clear responsibilities and a controlled request flow.",
      },

      { type: "subheading", text: "Delineation from self-managed proxies (NGINX, Traefik)" },
      {
        type: "paragraph",
        text: "NGINX and Traefik are powerful reverse proxies and load balancers. They are particularly well suited as a regional ingress for container, Docker or Kubernetes environments, for internal routing and for architectures where companies want to keep as much control over configuration and operations as possible. Traefik can automatically discover services from orchestration platforms, while NGINX provides very flexible proxy, routing and load-balancing capabilities.",
        refs: [15, 16],
      },
      {
        type: "paragraph",
        text: "However, they are not directly equivalent to Azure Front Door. Azure Front Door is a fully managed, globally distributed edge service. It combines Microsoft's worldwide network with WAF, DDoS protection, certificate management, CDN caching, health-based global routing and the private connection of supported Azure origins. With a self-operated solution, high availability, global distribution, scaling, updates, certificates, WAF, DDoS protection and monitoring would all have to be built and run separately. Both approaches can also be combined: Front Door handles the global edge layer, while NGINX or Traefik serve as an ingress within a region.",
        refs: [4, 5, 17],
      },

      { type: "heading", text: "Target architecture: Azure Front Door in an enterprise application" },
      {
        type: "paragraph",
        text: "A possible target architecture consists of a browser-based web application, an API and several private platform services. Only Azure Front Door is in the public zone; all downstream services are connected via Private Link.",
      },
      {
        type: "image",
        src: "/assets/blog/azure-front-door/afd-traffic.webp",
        width: 2960,
        height: 1970,
        maxWidth: 900,
        alt: "Four-layer reference architecture: users & internet, global edge layer with Azure Front Door (custom domain, TLS, firewall, routing), application layer with web application and API Management via Private Link, and data & platform services with backend API, database and storage.",
        caption: "Enterprise reference architecture with four layers: only Azure Front Door is public; the web app and API Management are connected via Private Link, followed by the backend API and data platform.",
      },

      { type: "subheading", text: "Azure Front Door as the central entry point" },
      {
        type: "paragraph",
        text: "All public domains of the application point to Azure Front Door. Front Door handles TLS, WAF inspection and routing. The technical hostname of the App Service or API gateway is not used as a public entry point.",
      },
      { type: "paragraph", text: "This creates a central place for:" },
      {
        type: "bullets",
        items: [
          "domains and certificates,",
          "security rules,",
          "HTTP-to-HTTPS redirects,",
          "URL routing,",
          "caching,",
          "health checks,",
          "access logs.",
        ],
      },

      { type: "subheading", text: "Separate routes for frontend and API" },
      { type: "paragraph", text: "Frontend and API can be published via different domains:" },
      {
        type: "code",
        content: "app.example.com   →  web application\napi.example.com   →  API Management",
      },
      { type: "paragraph", text: "Alternatively, both can be reachable via the same domain:" },
      {
        type: "code",
        content: "app.example.com/*       →  web application\napp.example.com/api/*   →  API Management",
      },
      {
        type: "paragraph",
        text: "A shared domain often simplifies browser-based applications because fewer cross-origin configurations are required. A separate API domain, by contrast, makes sense when the API is also used by mobile applications, partners or other systems.",
      },

      { type: "subheading", text: "Web application firewall at the edge" },
      {
        type: "paragraph",
        text: "The WAF inspects requests before they consume resources of the App Service or API Management. Microsoft recommends using the WAF with managed rules for internet-facing applications. The rules should first be tuned to the actual traffic, otherwise legitimate requests can be blocked by mistake. During this tuning, the policy can log in detection mode without blocking traffic.",
        refs: [7],
      },
      {
        type: "paragraph",
        text: "The WAF complements application security but does not replace it. Whether a user may access a specific record must still be checked by the application or API.",
      },

      { type: "subheading", text: "Private origins" },
      {
        type: "paragraph",
        text: "The most important security gain arises when the origin is not reachable independently of Front Door. Azure Front Door Premium can connect supported PaaS services via Private Link. The origin should additionally be configured so that it accepts no traffic that does not arrive over this private connection.",
        refs: [5],
      },
      {
        type: "paragraph",
        text: "If Private Link is not available, access can be restricted, for example, via the AzureFrontDoor.Backend service tag and by checking the profile-specific X-Azure-FDID header. This variant is less rigorous than a private origin, but likewise prevents arbitrary clients from using the origin directly.",
        refs: [8],
      },

      { type: "subheading", text: "API Management as a second security layer" },
      { type: "paragraph", text: "API Management complements Front Door with API-specific controls. While the WAF examines technical attack patterns, API Management can, for example:" },
      {
        type: "bullets",
        items: [
          "validate OAuth and JWT tokens,",
          "check required claims and scopes,",
          "apply limits per subscription or user,",
          "transform requests and responses,",
          "manage API versions,",
          "hide internal backend endpoints.",
        ],
      },
      {
        type: "paragraph",
        text: "Microsoft supports both publicly restricted and privately connected APIM origins behind Azure Front Door.",
        refs: [8],
      },

      { type: "heading", text: "Implementation: how Azure Front Door is set up in concrete terms" },
      {
        type: "paragraph",
        text: "Once the target architecture is defined, the practical question is how it can be implemented and operated reproducibly. A robust implementation pursues five goals:",
      },
      {
        type: "bullets",
        items: [
          "Front Door is the only intended public access path.",
          "Security rules are introduced and monitored in a controlled way.",
          "Routing and health checks reflect the actual application structure.",
          "Infrastructure changes are deployed in a versioned way.",
          "Errors can be traced via central logs.",
        ],
      },

      { type: "subheading", text: "1. Define domains and routing" },
      {
        type: "paragraph",
        text: "First, the public domains and the desired request paths are defined. The routing structure should stay as simple as possible. One possible model is:",
      },
      {
        type: "code",
        content: "app.example.com/*       →  frontend-origin-group\napp.example.com/api/*   →  api-origin-group",
      },
      {
        type: "paragraph",
        text: "In addition to path-based routing, Azure Front Door supports different methods for selecting an origin. Priorities enable, for example, an active-passive architecture, while weights can be used for gradual migrations or canary deployments.",
        refs: [9],
      },
      {
        type: "paragraph",
        text: "The architecture should not start with complex routing when only one origin is needed. For many applications, a single region with a clearly defined frontend and API path is enough at first.",
      },

      { type: "subheading", text: "2. Introduce the WAF in a controlled way" },
      {
        type: "paragraph",
        text: "The WAF should be activated with Microsoft's managed rules. Custom rules can additionally be added for application-specific requirements, for example:",
      },
      {
        type: "bullets",
        items: [
          "rate limits for login or export endpoints,",
          "restriction of administration paths,",
          "blocking of unneeded HTTP methods,",
          "geo filters for regionally limited applications,",
          "handling of known bots.",
        ],
      },
      { type: "paragraph", text: "A controlled rollout is recommended for the introduction:" },
      {
        type: "diagram",
        steps: [
          { label: "Define WAF baseline" },
          { label: "Enable detection mode" },
          { label: "Analyse logs and false positives" },
          { label: "Define exceptions as narrowly as possible" },
          { label: "Enable prevention mode" },
          { label: "Monitor continuously" },
        ],
      },
      {
        type: "paragraph",
        text: "Blanket exceptions should be avoided. If a single search field falsely triggers a SQL injection rule, only that specific field should be excluded for the affected rule. Fully disabling all SQL injection rules would unnecessarily reduce the protective effect.",
      },
      {
        type: "paragraph",
        text: "Rate limits should also not be set too low. Many legitimate users may also share a common corporate or mobile IP. Microsoft generally recommends sufficiently high thresholds that limit extreme usage without prematurely blocking legitimate traffic.",
        refs: [7],
      },

      { type: "subheading", text: "3. Secure the origins" },
      { type: "paragraph", text: "With Azure Front Door Premium, Private Link is the preferred option for supported origins:" },
      {
        type: "diagram",
        steps: [{ label: "Azure Front Door" }, { label: "Private Link" }, { label: "App Service or API Management" }],
      },
      {
        type: "paragraph",
        text: "After setup, the private endpoint connection must be approved at the respective service. Public network access to the origin should then be disabled, as far as the service and operating model allow.",
      },
      { type: "paragraph", text: "A practical test should not only check whether the application is reachable via Front Door, but also whether a direct request to the origin fails:" },
      {
        type: "grid",
        items: [
          { title: "Test 1 – access via Front Door", description: "Request via Azure Front Door. Expectation: 200 OK." },
          { title: "Test 2 – direct origin access", description: "Direct request to the origin. Expectation: access blocked." },
        ],
      },
      {
        type: "paragraph",
        text: "This negative test is particularly important. A working Front Door route does not automatically prove that no alternative access path exists any more.",
      },

      { type: "subheading", text: "4. Configure health checks and performance" },
      {
        type: "paragraph",
        text: "With multiple origins, Front Door uses health probes to assess their availability. The health endpoint (e.g. /healthz) should return a clear 200 OK status and check the components actually required to process production traffic. Microsoft recommends resource-friendly HEAD requests by default for new profiles. The endpoint should not trigger a redirect to a login page and should not perform unnecessarily expensive database or API queries.",
        refs: [10],
      },
      { type: "paragraph", text: "Caching should only be enabled for clearly suitable content, for example:" },
      {
        type: "bullets",
        items: [
          "JavaScript and CSS files,",
          "images,",
          "fonts,",
          "public downloads,",
          "non-personalised content.",
        ],
      },
      {
        type: "paragraph",
        text: "Dynamic or user-specific responses require particular caution. Query strings and cache keys determine whether different requests are treated as the same resource. In the worst case, an unsuitable configuration can cause personalised content to be delivered to other users.",
        refs: [11],
      },

      { type: "subheading", text: "5. Enable monitoring" },
      {
        type: "paragraph",
        text: "Front Door access logs, health probe logs and WAF logs are not enabled automatically. They should be sent via diagnostic settings to Log Analytics or another central logging platform.",
        refs: [12],
      },
      { type: "paragraph", text: "Basic monitoring should cover at least the following metrics:" },
      {
        type: "bullets",
        items: [
          "request count,",
          "response times,",
          "4xx and 5xx errors,",
          "blocked WAF requests,",
          "frequently triggered WAF rules,",
          "origin availability,",
          "cache hit rate,",
          "outbound data volume.",
        ],
      },
      {
        type: "diagram",
        steps: [
          { label: "Azure Front Door", items: ["Access logs", "WAF logs", "Health probe logs", "Metrics"] },
          { label: "Diagnostic settings" },
          { label: "Log Analytics", items: ["Dashboards", "KQL queries", "Alerts"] },
        ],
      },
      {
        type: "paragraph",
        text: "Azure Monitor and Log Analytics make it possible to investigate errors across multiple layers. For example, it can be distinguished whether a request was already blocked by the WAF, Front Door found no healthy origin, or the application itself returned an error.",
        refs: [13],
      },

      { type: "subheading", text: "6. Infrastructure as code and CI/CD" },
      {
        type: "paragraph",
        text: "Front Door, WAF policies, routes, origins and diagnostic settings are production-critical configurations. They should not be maintained exclusively by hand in the Azure portal.",
      },
      {
        type: "paragraph",
        text: "With Bicep or Terraform they can be described declaratively and changed in a controlled way via pull requests. Microsoft explicitly recommends infrastructure as code to deploy Front Door configurations consistently and to manage changes such as new WAF rule versions traceably. The full implementation should be built modularly:",
        refs: [14],
      },
      {
        type: "filetree",
        nodes: [
          {
            type: "folder",
            name: "infrastructure",
            defaultOpen: true,
            children: [
              { type: "file", name: "main.bicep" },
              {
                type: "folder",
                name: "modules",
                note: "Reusable Bicep modules per resource",
                children: [
                  { type: "file", name: "front-door.bicep" },
                  { type: "file", name: "waf-policy.bicep" },
                  { type: "file", name: "origins.bicep" },
                  { type: "file", name: "routes.bicep" },
                  { type: "file", name: "app-service.bicep" },
                  { type: "file", name: "monitoring.bicep" },
                ],
              },
              {
                type: "folder",
                name: "environments",
                note: "Parameters per environment",
                children: [
                  { type: "file", name: "dev.bicepparam" },
                  { type: "file", name: "test.bicepparam" },
                  { type: "file", name: "prod.bicepparam" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        text: "We provide example code showing how infrastructure as code can be implemented with Bicep in an open repository:",
      },
      {
        type: "repo",
        name: "smiit-GmbH/azure-iac-with-bicep",
        description: "Infrastructure as code for Azure — reproducible with Bicep.",
        url: "https://github.com/smiit-GmbH/azure-iac-with-bicep",
      },
      { type: "paragraph", text: "A possible deployment process is:" },
      {
        type: "diagram",
        steps: [
          { label: "Feature branch" },
          { label: "Pull request" },
          { label: "Bicep validation" },
          { label: "Deployment to dev" },
          { label: "Smoke and security tests" },
          { label: "Approval" },
          { label: "Deployment to production" },
        ],
      },
      {
        type: "paragraph",
        text: "This not only automates recurring tasks. Every change to routing, WAF or origin configuration is versioned, reviewable and easier to trace in case of an error.",
      },

      { type: "heading", text: "Architecture maturity: not every application needs multi-region right away" },
      {
        type: "paragraph",
        text: "A common mistake is to plan Azure Front Door directly as a global active-active platform with multiple regions. Technically that is possible, but not economically or operationally sensible for every application.",
      },
      {
        type: "paragraph",
        text: "A second application region alone does not yet create a complete multi-region architecture. In addition, data replication, identity providers, storage, messaging, background processes and failback procedures have to be considered. For many companies, a step-by-step build-up is therefore sensible:",
      },
      {
        type: "maturity",
        items: [
          { level: 0, label: "Direct public origin" },
          { level: 1, label: "Central entry point (Front Door)" },
          { level: 2, label: "WAF and monitoring" },
          { level: 3, label: "Protected origin" },
          { level: 4, label: "Private Link and infrastructure as code" },
          { level: 5, label: "Multi-region and automated failover" },
        ],
      },
      {
        type: "paragraph",
        text: "Level 0 means direct access to the technical endpoint with decentralised management. At level 1, Front Door becomes the central domain and routing layer; at level 2, managed WAF rules and monitoring are added. From level 3, direct origin access is restricted and Front Door becomes the binding access path; at level 4, Private Link and infrastructure as code follow. Level 5 finally connects multiple regions via priority- or weight-based routing.",
      },
      {
        type: "paragraph",
        text: "For many applications, level 3 or 4 already represents major progress. Multi-region should be added when business requirements for availability, recovery time objective and recovery point objective justify the additional effort.",
      },

      { type: "heading", text: "Best practices for Azure Front Door" },
      {
        type: "numbered",
        items: [
          { title: "Establish Front Door as the binding entry point", description: "A WAF only protects the traffic that actually passes through it. The origin should not remain reachable via an alternative public path." },
          { title: "Prefer Private Link", description: "For supported Azure services, Azure Front Door Premium with Private Link offers the most rigorous origin protection. If Private Link is not possible, service tags and profile-specific header checks should be combined." },
          { title: "Introduce the WAF gradually", description: "A new policy should first be observed in detection mode. Only after analysing legitimate requests and necessary exceptions should it actively block traffic." },
          { title: "Define exceptions as narrowly as possible", description: "Don't disable a whole rule group when only a single request field causes a false positive. The smaller the exception, the greater the protection that remains." },
          { title: "Use caching deliberately", description: "Caching is mainly suitable for static, non-personalised content. Query strings, cookies and authorisation headers must be explicitly considered when designing the cache." },
          { title: "Version configurations", description: "Front Door, WAF policies, routes, domains and diagnostic settings should be described as code and deployed via a controlled CI/CD process." },
          { title: "Derive the architecture from business requirements", description: "Not every application needs multiple regions, additional gateways or highly complex routing. The technical shape should emerge from security, availability and performance requirements." },
        ],
      },

      { type: "heading", text: "Conclusion: a secure edge layer for modern web applications" },
      {
        type: "paragraph",
        text: "Azure Front Door is more than a global load balancer. The service combines traffic routing, TLS, content delivery, a web application firewall and origin connectivity in a shared edge layer.",
      },
      {
        type: "paragraph",
        text: "The biggest security gain does not come from activating a WAF alone. What matters is that Front Door becomes the binding entry point of the application and that alternative access to the origin is technically prevented.",
      },
      {
        type: "paragraph",
        text: "Combined with Azure Front Door Premium, Private Link, API Management, Azure Monitor and infrastructure as code, this creates an architecture that can be operated securely and reproducibly. Domains, routing and security rules are managed centrally, while frontend, API and data platform retain clearly separated responsibilities.",
      },
      {
        type: "paragraph",
        text: "At the same time, not every application has to be built as a global multi-region platform straight away. A step-by-step maturity path is often more economical and operationally more robust: first a central entry point, then WAF and monitoring, then origin protection and Private Link. Multi-region and automated failover follow only when the business requirements justify them. This way, Azure Front Door does not become just another upstream Azure resource, but a central component of a secure and scalable enterprise web architecture.",
      },
    ],

    faq: [
      {
        question: "When do you need Azure Front Door Premium?",
        answer:
          "Premium differs from Standard mainly in two practically relevant points: the private origin connection via Private Link and access to Microsoft's managed WAF rule sets, including bot protection. Anyone who does not want to leave their origin publicly reachable, or who relies on maintained managed rules rather than only custom ones, needs Premium. For pure global routing, TLS, CDN caching and simple, self-defined WAF rules, Standard is often sufficient. In practice, Premium is especially worthwhile for data-intensive enterprise applications with high security and compliance requirements; for smaller, non-critical workloads, Standard is often the more economical entry point.",
      },
      {
        question: "Does Azure Front Door replace API Management?",
        answer:
          "No — the two services operate on different layers and complement each other. Front Door is the global edge layer for routing, TLS, WAF and content delivery, and decides which request reaches which region and origin in the first place. API Management then takes over and handles API-specific tasks: token validation (OAuth/JWT), checking scopes and claims, rate limits per subscription, request and response transformations, versioning and the management of API products. In practice, API Management sits behind Front Door — ideally privately connected — so that the WAF filters technical attack patterns and API Management handles the API governance. Covering only one of the two usually leaves an important layer of protection open.",
      },
      {
        question: "Do you also need Application Gateway?",
        answer:
          "Not in general. Application Gateway is a regional layer-7 load balancer and shows its strengths where a VNet-close ingress is needed — for example in front of virtual machines, an AKS cluster or legacy workloads inside a virtual network. Front Door, by contrast, is global and sits in front of the region. For a typical PaaS architecture on App Service or Container Apps with API Management, Front Door can be connected directly to the — ideally privately connected — origins, without an Application Gateway in between. Combining both only makes sense when each layer fulfils a clearly separate task; otherwise, more chained gateways mainly mean more latency, cost and operational effort.",
      },
      {
        question: "Is the web application firewall enough to protect the application?",
        answer:
          "No. The WAF filters known technical attack patterns such as SQL injection or cross-site scripting and limits automated access via rate limits — it is an important but generic layer. Whether a specific user may see a specific record, whether tokens are valid, or whether the business logic is being abused, it cannot judge. Such business-logic gaps — for example broken access control, which tops the OWASP Top 10 — must still be secured in the application, in authentication and in API governance. The WAF therefore complements secure software development but does not replace it; real protection only emerges from the interplay of WAF, API Management and clean application logic.",
      },
      {
        question: "How do I ensure the origin is really only reachable via Front Door?",
        answer:
          "This is the most important security step — and it doesn't happen automatically just because Front Door sits in front. The most rigorous option is Azure Front Door Premium with Private Link: the origin is connected privately and its public network access is then disabled, as far as the service allows. If Private Link is not possible, access can be restricted via the AzureFrontDoor.Backend service tag and additionally by checking the profile-specific X-Azure-FDID header, so that only your own Front Door profile may use the origin. What matters is the final negative test: a request via Front Door must return 200 OK, while a direct request to the technical origin hostname must be blocked. Only once that direct access fails is Front Door genuinely the binding entry point.",
      },
      {
        question: "How do I put Azure Front Door in front of an existing application without downtime?",
        answer:
          "Best done step by step and testably, before public traffic is redirected. First, the Front Door profile is set up with the existing application as origin, the custom domain, TLS and a WAF running initially in detection mode. Via the preliminary Front Door endpoint, the whole chain can be tested — routing, certificates, headers and health checks — while the production domain still points directly at the origin. Only then does the DNS change follow, usually via a CNAME to the Front Door endpoint, ideally with a TTL reduced in advance so you can switch back quickly. Once traffic runs stably through Front Door and the WAF is tuned, the final two steps follow: move the WAF into prevention mode and block direct public access to the origin.",
      },
      {
        question: "Should every application run across multiple Azure regions?",
        answer:
          "No. Multi-region significantly increases availability, but also cost, complexity and operational effort. Front Door can indeed switch quickly to a second region via priority- or weight-based routing — but a second application region alone does not create resilient failover. What matters are the downstream layers: data replication, identity providers, storage, messaging and background processes must also be prepared for a regional outage and a clean failback. In practice, multi-region should be tied to concrete targets — recovery time objective and recovery point objective; for many applications, a robust single-region setup with a protected origin and monitoring is the more economical first step.",
      },
      {
        question: "Can Front Door and the origin use the same certificate?",
        answer:
          "They don't have to use the same certificate — and in practice they usually don't. The client establishes a TLS connection to the custom domain on Front Door; Front Door terminates it and establishes a separate TLS connection to the origin. For the public domain, Front Door usually manages the certificate automatically (managed certificate) or uses one from Key Vault. The origin should nevertheless have a valid certificate so that the second connection is also encrypted and the hostname verifiable — “TLS to the edge and unencrypted after that” is not a secure configuration. A self-signed or expired origin certificate otherwise leads to connection errors or unnecessary security gaps.",
      },
      {
        question: "Why aren't Front Door logs visible in Log Analytics?",
        answer:
          "Because they are not enabled by default. Access logs, health probe logs and WAF logs are only produced once a destination is configured in the Front Door profile's diagnostic settings — for example a Log Analytics workspace, a storage account or an event hub. In practice that means: create diagnostic settings, select the desired log categories and allow a few minutes for the first entries to arrive. After that, KQL can answer targeted questions, such as which WAF rules trigger most often or whether an error originated at the WAF, at an unhealthy origin or only in the application. Without enabled diagnostics, the very data needed for troubleshooting is missing when it matters.",
      },
    ],

    sources: [
      { title: "Microsoft Learn: Azure Front Door (classic) retirement FAQ", url: "https://learn.microsoft.com/en-us/azure/frontdoor/classic-retirement-faq" },
      { title: "OWASP Foundation: OWASP Top 10:2025", url: "https://owasp.org/Top10/2025/" },
      { title: "Rose, S., Borchert, O., Mitchell, S. & Connelly, S. (2020): Zero Trust Architecture. NIST Special Publication 800-207.", url: "https://doi.org/10.6028/NIST.SP.800-207" },
      { title: "Microsoft Learn: What is Azure Front Door? (Overview)", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview" },
      { title: "Microsoft Learn: Secure your origin with Private Link", url: "https://learn.microsoft.com/en-us/azure/frontdoor/private-link" },
      { title: "Yang, L. et al. (2022): Multi-Perspective Content Delivery Networks Security Framework Using Optimized Unsupervised Anomaly Detection. IEEE Transactions on Network and Service Management, 19(1), 686–705. DOI: 10.1109/TNSM.2021.3100308 (open-access preprint: arXiv:2107.11514).", url: "https://arxiv.org/abs/2107.11514" },
      { title: "Microsoft Learn: Best practices for Azure Web Application Firewall in Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/waf-front-door-best-practices" },
      { title: "Microsoft Learn: Configure Azure Front Door in front of Azure API Management", url: "https://learn.microsoft.com/en-us/azure/api-management/front-door-api-management" },
      { title: "Microsoft Learn: Traffic routing methods to origin", url: "https://learn.microsoft.com/en-us/azure/frontdoor/routing-methods" },
      { title: "Microsoft Learn: Health probes – Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/health-probes" },
      { title: "Microsoft Learn: Caching with Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching" },
      { title: "Microsoft Learn: Configure Azure Front Door logs", url: "https://learn.microsoft.com/en-us/azure/frontdoor/standard-premium/how-to-logs" },
      { title: "Microsoft Learn: Monitor Azure Front Door", url: "https://learn.microsoft.com/en-us/azure/frontdoor/monitor-front-door" },
      { title: "Microsoft Learn: Architecture best practices for Azure Front Door (Azure Well-Architected Framework)", url: "https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-front-door" },
      { title: "NGINX Documentation: Using NGINX as an HTTP load balancer", url: "https://nginx.org/en/docs/http/load_balancing.html" },
      { title: "Traefik Proxy Documentation", url: "https://doc.traefik.io/traefik/" },
      { title: "Microsoft Learn: Secure an Azure Front Door deployment", url: "https://learn.microsoft.com/en-us/azure/frontdoor/secure-front-door" },
    ],

    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    keywords: [
      "Azure Front Door",
      "web application firewall",
      "WAF",
      "Private Link",
      "zero trust",
      "edge",
      "CDN",
      "reverse proxy",
      "enterprise architecture",
      "infrastructure as code",
      "API Management",
      "Azure security",
    ],
    metaTitle: "Azure Front Door in enterprise architectures: WAF, Private Link & best practices | smiit",
    metaDescription:
      "How Azure Front Door serves as a secure, global entry point for web applications — WAF, Private Link, routing, monitoring, infrastructure as code and a maturity model.",
  },
}

export default azureFrontDoor
