// ---------- Old (before) website — intentionally not mobile-optimised ----------

export function BeforeWebsite() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#e9e7e1] font-sans overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-[1.2cqw] px-[2.3cqw] h-[5.7cqw] bg-[#c9c6bd] shrink-0">
        <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#a7a399]" />
        <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#a7a399]" />
        <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#a7a399]" />
        <span className="ml-[1.7cqw] h-[2.7cqw] rounded-[0.8cqw] flex-1 max-w-[36.7cqw] bg-[#d8d5cc]" />
      </div>
      {/* Desktop nav crammed into mobile width */}
      <div className="flex items-center gap-[0.8cqw] px-[2cqw] h-[8cqw] bg-white border-b border-[#bbb] shrink-0 overflow-hidden">
        <span className="font-serif font-bold text-[2.4cqw] text-[#555] shrink-0 mr-[0.5cqw]">
          Muster<span className="text-[#8a6d3b]">Bau</span> GmbH
        </span>
        <div className="flex items-center gap-[0.6cqw] text-[1cqw] text-[#666]">
          {["Startseite", "Über uns", "Leistungen", "Referenzen", "Karriere", "Presse", "Kontakt"].map((item, i) => (
            <span key={item} className="flex items-center gap-[0.6cqw] whitespace-nowrap">
              {i > 0 && <span className="text-[#ccc]">|</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* Thin hero banner */}
      <div className="h-[12cqw] bg-[repeating-linear-gradient(45deg,#cfccc3,#cfccc3_5px,#c4c0b6_5px,#c4c0b6_10px)] flex items-center px-[2cqw] gap-[2cqw] shrink-0">
        <div className="flex-1">
          <div className="text-[1.8cqw] font-serif font-bold text-[#444] leading-[1.2]">
            Ihr zuverlässiger Baupartner seit 1998
          </div>
          <div className="text-[1.1cqw] text-[#666] mt-[0.5cqw]">Hochbau · Tiefbau · Sanierung · Abbruch</div>
        </div>
        <div className="shrink-0 bg-[#8a6d3b] text-white text-[1cqw] px-[1.5cqw] py-[0.8cqw] whitespace-nowrap">
          Kontakt aufnehmen
        </div>
      </div>
      {/* 3-column desktop layout */}
      <div className="flex flex-1 overflow-hidden text-[1.1cqw]">
        {/* Left sidebar: navigation */}
        <div className="w-[22%] bg-[#dedad3] border-r border-[#ccc] shrink-0 px-[1.2cqw] py-[1.5cqw]">
          <div className="font-bold text-[1.3cqw] text-[#555] mb-[0.8cqw] pb-[0.5cqw] border-b border-[#bbb]">
            Leistungen
          </div>
          {["Hochbau", "Tiefbau", "Sanierung", "Abbruch", "Erdbau", "Rohbau", "Pflaster", "Fassade", "Innenausbau"].map(
            (s) => (
              <div key={s} className="py-[0.45cqw] border-b border-[#d0ccc4] text-[#777] text-[1cqw]">
                {s}
              </div>
            ),
          )}
        </div>
        {/* Main content */}
        <div className="flex-1 px-[1.5cqw] py-[1.5cqw] overflow-hidden">
          <h4 className="font-serif text-[2.2cqw] text-[#444] font-bold mb-[1cqw]">Willkommen auf unserer Webseite!</h4>
          <div className="text-[1.1cqw] text-[#666] mb-[1.5cqw] leading-[1.4]">
            Die MusterBau GmbH ist Ihr kompetenter Ansprechpartner für alle Bauleistungen.
          </div>
          {/* 2-col news grid */}
          <div className="grid grid-cols-2 gap-[1cqw] mb-[1.5cqw]">
            {[
              { t: "Neues Projekt", d: "Wohnanlage Feldstraße fertiggestellt" },
              { t: "Stellenangebot", d: "Polier (m/w/d) ab sofort gesucht" },
            ].map((item) => (
              <div key={item.t} className="border border-[#ccc] bg-white p-[0.8cqw]">
                <div className="bg-[repeating-linear-gradient(45deg,#eee,#eee_3px,#e5e3dc_3px,#e5e3dc_6px)] h-[5cqw] mb-[0.6cqw]" />
                <div className="font-bold text-[1.1cqw] text-[#8a6d3b]">{item.t}</div>
                <div className="text-[1cqw] text-[#777] mt-[0.3cqw]">{item.d}</div>
                <span className="text-[0.9cqw] text-[#8a6d3b] underline">mehr lesen »</span>
              </div>
            ))}
          </div>
          {/* Filler text lines */}
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[92%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[78%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[85%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[65%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[71%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[88%]" />
          {/* Wide table — causes visual overflow */}
          <div className="mt-[1.5cqw] border border-[#ccc] overflow-hidden">
            <div className="flex bg-[#8a6d3b] text-white text-[0.9cqw]">
              {["Leistung", "Ort", "Status", "Auftraggeber", "Fertigstellung"].map((h) => (
                <div
                  key={h}
                  className="flex-1 px-[0.7cqw] py-[0.5cqw] border-r border-[#9a7d4b] last:border-0 whitespace-nowrap"
                >
                  {h}
                </div>
              ))}
            </div>
            {[
              ["Tiefbau A1", "München", "laufend", "Stadt München", "Q3 2024"],
              ["Hochbau B2", "Augsburg", "geplant", "Privat", "Q1 2025"],
            ].map((row, i) => (
              <div key={i} className={`flex text-[0.9cqw] ${i % 2 === 0 ? "bg-white" : "bg-[#f5f3ee]"}`}>
                {row.map((cell) => (
                  <div
                    key={cell}
                    className="flex-1 px-[0.7cqw] py-[0.5cqw] border-r border-[#ddd] last:border-0 text-[#666] whitespace-nowrap"
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Über uns teaser */}
          <div className="mt-[1.5cqw] border border-[#ccc] bg-white p-[0.8cqw]">
            <div className="font-bold text-[1.2cqw] text-[#555] mb-[0.5cqw]">Über die MusterBau GmbH</div>
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.4cqw] w-[95%]" />
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.4cqw] w-[88%]" />
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.4cqw] w-[92%]" />
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.6cqw] w-[75%]" />
            <span className="text-[0.9cqw] text-[#8a6d3b] underline">» mehr erfahren</span>
          </div>
          {/* More filler text */}
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[88%] mt-[1.5cqw]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[72%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[81%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[60%]" />
        </div>
        {/* Right sidebar: contact */}
        <div className="w-[26%] bg-[#f0ece5] border-l border-[#ccc] shrink-0 px-[1.2cqw] py-[1.5cqw]">
          <div className="font-bold text-[1.3cqw] text-[#555] mb-[0.8cqw] pb-[0.5cqw] border-b border-[#bbb]">
            Kontakt
          </div>
          <div className="text-[1.1cqw] text-[#666] leading-[1.8]">
            <div>MusterBau GmbH</div>
            <div>Baustraße 12</div>
            <div>12345 Musterstadt</div>
            <div className="mt-[0.5cqw]">Tel.: 01234/56789</div>
            <div>Fax: 01234/56780</div>
          </div>
          <div className="mt-[1.5cqw] bg-[#8a6d3b] text-white text-center text-[1.1cqw] p-[0.8cqw] cursor-pointer">
            Jetzt anfragen
          </div>
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Aktuelles</div>
          {["Neues Projekt in München...", "Offene Stellen 2024...", "Messe Stuttgart..."].map((n) => (
            <div key={n} className="text-[1cqw] text-[#8a6d3b] underline mb-[0.5cqw]">
              {n}
            </div>
          ))}
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Zertifizierungen</div>
          <div className="grid grid-cols-2 gap-[0.7cqw]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[4cqw] bg-[#d8d3ca] border border-[#bbb]" />
            ))}
          </div>
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Folgen Sie uns</div>
          <div className="flex gap-[0.7cqw]">
            {["f", "in", "xing"].map((s) => (
              <div
                key={s}
                className="w-[4cqw] h-[4cqw] bg-[#8a6d3b] text-white text-[1cqw] grid place-items-center font-bold"
              >
                {s}
              </div>
            ))}
          </div>
          <div className="mt-[1.5cqw] border border-[#ccc] bg-[#eae8e0] p-[0.7cqw]">
            <div className="font-bold text-[1.1cqw] text-[#555] mb-[0.5cqw]">Wetter Musterstadt</div>
            <div className="flex items-center gap-[1cqw]">
              <div className="text-[4cqw] leading-none">☀</div>
              <div>
                <div className="text-[1.8cqw] font-bold text-[#444]">18°C</div>
                <div className="text-[1cqw] text-[#777]">Sonnig, wenig Wind</div>
              </div>
            </div>
          </div>
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Newsletter</div>
          <div className="border border-[#bbb] bg-white text-[1cqw] text-[#aaa] px-[0.7cqw] py-[0.6cqw] mb-[0.5cqw]">
            E-Mail-Adresse eingeben
          </div>
          <div className="bg-[#8a6d3b] text-white text-[1cqw] text-center py-[0.6cqw]">Anmelden</div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-[#444] text-white px-[2cqw] py-[1.5cqw] flex justify-between items-center text-[1cqw] shrink-0">
        <span>© 2014 MusterBau GmbH – Alle Rechte vorbehalten</span>
        <span className="flex gap-[1.5cqw]">
          <span>Impressum</span>
          <span>Datenschutz</span>
          <span>AGB</span>
          <span>Sitemap</span>
        </span>
      </div>
    </div>
  )
}
