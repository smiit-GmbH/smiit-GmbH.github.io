import React from 'react';

/**
 * Analytics Service page mockup
 *
 * This component implements a basic layout for the analytics services page. It
 * follows the general look and feel of the existing site: large hero header,
 * clearly separated sections with alternating backgrounds, icons and concise
 * text, and a strong call‑to‑action at the end. The content is based on the
 * previously developed concept, summarising the benefits of Business
 * Intelligence, Reporting and Machine Learning/MLOps for SMEs. Replace
 * placeholder images (`/images/...`) with appropriate assets from your
 * project.
 */

export default function AnalyticsPage() {
  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entfesseln Sie die Macht Ihrer Daten
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            Von interaktiven Dashboards bis zu KI‑gestützten Prognosen – wir
            verwandeln Ihre Daten in Erkenntnisse, die Ihr Wachstum fördern.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-block px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md transition-colors"
            >
              Beratungstermin vereinbaren
            </a>
            <a
              href="#demo"
              className="inline-block px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-700 transition-colors"
            >
              Demo ansehen
            </a>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden md:block">
          <img
            src="/images/analytics-hero-placeholder.png"
            alt="Dashboard Illustration"
            className="h-full w-full object-cover opacity-40"
          />
        </div>
      </section>

      {/* Why Analytics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Warum Datenanalyse?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Moderne Unternehmen erzeugen riesige Datenmengen aus Cloud‑,
                SaaS‑ und Streaming‑Quellen. Herkömmliche Berichte sind zu
                langsam und ineffizient – deshalb verlassen sich Organisationen
                heute auf Business‑Intelligence‑Dashboards für akkurate
                Echtzeit‑Reports und Erkenntnisse.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Studien zeigen, dass 70 % der Führungskräfte Schwierigkeiten
                haben, aus Daten Maßnahmen abzuleiten. Realtime‑Analytics hilft,
                schneller zu entscheiden, weshalb 73 % der Unternehmen mehr in
                Datenkompetenzen investieren.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Data‑Driven‑Firmen sind 23‑mal wahrscheinlicher, Kunden zu
                gewinnen, sechsmal wahrscheinlicher, sie zu halten und
                deutlich profitabler als ihre Mitbewerber.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Example icon; replace with your own SVG/icon component */}
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 11a1 1 0 011-1h1V5a1 1 0 011-1h2a1 1 0 011 1v5h1a1 1 0 011 1v2a1 1 0 01-1 1h-1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5H3a1 1 0 01-1-1v-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Schnellere Entscheidungen
                  </h3>
                  <p className="text-gray-600">
                    Echtzeit‑Dashboards verkürzen Entscheidungszyklen und
                    identifizieren Chancen sowie Risiken frühzeitig.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Mehr Transparenz
                  </h3>
                  <p className="text-gray-600">
                    Gemeinsam geteilte Kennzahlen schaffen eine klare "Single
                    Source of Truth" für alle Bereiche.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 3h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm7 10h5v2H10v-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Profitsteigerung
                  </h3>
                  <p className="text-gray-600">
                    Datengetriebene Unternehmen sind nachweislich profitabler
                    und gewinnen schneller neue Kunden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Unser Angebot
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Business Intelligence */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <svg
                  className="h-12 w-12 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3h2v14H4V3zm3 4h2v10H7V7zm3 3h2v7h-2v-7zm3 2h2v5h-2v-5zm3-8h2v13h-2V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Business Intelligence & Dashboarding
              </h3>
              <p className="text-gray-600 mb-4">
                Entwicklung interaktiver Dashboards und Berichte in Power BI und
                Microsoft Fabric. Rollenspezifische KPIs, Drill‑Downs und
                AI‑gestützte Prognosen für alle Geschäftsbereiche.
              </p>
              <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
                Mehr erfahren →
              </a>
            </div>
            {/* Reporting & Data Governance */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <svg
                  className="h-12 w-12 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 012 0v1h5a1 1 0 011 1v2h-2V5H5v2H3V4a1 1 0 011-1h5V2zm8 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8h14zm-8 3H7v2h2v-2zm4 0h-2v2h2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Reporting & Data Governance
              </h3>
              <p className="text-gray-600 mb-4">
                Zentrale Datenmodelle, automatisierte Reports und klare
                Governance sorgen für zuverlässige Zahlen und höchste
                Datenqualität. Self‑Service‑Analytics macht Ihr Team
                handlungsfähig.
              </p>
              <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
                Mehr erfahren →
              </a>
            </div>
            {/* Machine Learning & MLOps */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <svg
                  className="h-12 w-12 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm4.707 4.293a1 1 0 00-1.414 0L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414L8.586 11l-3.293 3.293a1 1 0 001.414 1.414L10 12.414l3.293 3.293a1 1 0 001.414-1.414L11.414 11l3.293-3.293a1 1 0 000-1.414z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Machine Learning & MLOps
              </h3>
              <p className="text-gray-600 mb-4">
                Wir bauen prädiktive Modelle und operationalisieren sie mit
                MLOps: automatische Bereitstellung, Überwachung, Retraining
                und Compliance. Nutzen Sie KI, um Chancen zu erkennen und
                Prozesse zu automatisieren.
              </p>
              <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
                Mehr erfahren →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Unser Prozess
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="text-4xl font-bold text-pink-500 mb-2">1</div>
              <h3 className="font-semibold mb-2 text-gray-900">Verstehen</h3>
              <p className="text-gray-600">
                Workshops zur Analyse Ihrer Geschäftsmodelle und Datenquellen.
              </p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="text-4xl font-bold text-pink-500 mb-2">2</div>
              <h3 className="font-semibold mb-2 text-gray-900">Modell & Design</h3>
              <p className="text-gray-600">
                Aufbau eines konsolidierten Datenmodells und Storyboarding Ihrer
                Dashboards.
              </p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="text-4xl font-bold text-pink-500 mb-2">3</div>
              <h3 className="font-semibold mb-2 text-gray-900">Implementierung</h3>
              <p className="text-gray-600">
                Entwicklung von ETL‑Pipelines, Machine‑Learning‑Modellen und
                Dashboard‑Layouts.
              </p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="text-4xl font-bold text-pink-500 mb-2">4</div>
              <h3 className="font-semibold mb-2 text-gray-900">Support</h3>
              <p className="text-gray-600">
                Testing, Schulungen, laufende Betreuung und kontinuierliche
                Verbesserung via MLOps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Ihre Vorteile
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h5v-5h2v5h5a1 1 0 001-1V4a1 1 0 00-1-1z" />
              </svg>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">
                  Schnellere Entscheidungen
                </h3>
                <p className="text-gray-600">
                  Realtime‑Dashboards verkürzen Entscheidungszyklen, wodurch
                  Sie schneller handeln können.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3 9H7v-2h6v2z" />
              </svg>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Umsatzwachstum</h3>
                <p className="text-gray-600">
                  Data‑Driven‑Unternehmen erzielen nachweislich mehr Profit und
                  gewinnen leichter Kunden.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 8a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1z" />
              </svg>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">
                  Bessere Zusammenarbeit
                </h3>
                <p className="text-gray-600">
                  Ein zentraler Datenhub schafft Transparenz und vereinfacht
                  die abteilungsübergreifende Kooperation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="kontakt" className="py-20 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Starten Sie Ihre Daten‑Reise
          </h2>
          <p className="mb-8 text-lg md:text-xl">
            Lassen Sie uns gemeinsam herausfinden, wie Sie mehr aus Ihren Daten
            herausholen können. Vereinbaren Sie jetzt Ihr unverbindliches
            Beratungsgespräch.
          </p>
          <a
            href="mailto:info@smiit.ch"
            className="inline-block px-8 py-4 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            Jetzt Termin vereinbaren
          </a>
        </div>
      </section>
    </main>
  );
}