// ---------- New (after) website — mobile-first redesign ----------

export function AfterWebsite() {
  return (
    <div className="absolute inset-0 isolate flex flex-col bg-[#f4f2ec] font-sans overflow-hidden">
      {/* Status bar — dark icons on light */}
      <div className="flex items-center justify-between px-[4cqw] h-[5.5cqw] shrink-0">
        <span className="text-[1.6cqw] font-semibold text-[#15151a]">9:41</span>
        <div className="flex items-center gap-[1.2cqw]">
          <div className="flex items-end gap-[0.4cqw] h-[2.2cqw]">
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "30%" }} />
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "55%" }} />
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "78%" }} />
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "100%" }} />
          </div>
          <div className="flex items-center gap-[0.3cqw]">
            <div className="w-[5cqw] h-[2.2cqw] border border-[#15151a] rounded-[0.4cqw] p-[0.3cqw]">
              <div className="h-full w-[75%] bg-[#15151a] rounded-[0.2cqw]" />
            </div>
            <div className="w-[0.5cqw] h-[1.2cqw] bg-[#15151a] rounded-r-[0.2cqw]" />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between px-[5cqw] py-[2cqw] shrink-0">
        <span className="font-extrabold text-[3.2cqw] tracking-[-0.02em] text-[#15151a]">
          muster<b className="text-[#F703EB]">bau</b>
        </span>
        <div className="flex flex-col gap-[0.8cqw]">
          <div className="w-[5.5cqw] h-[0.5cqw] bg-[#15151a] rounded-full" />
          <div className="w-[3.8cqw] h-[0.5cqw] bg-[#15151a] rounded-full ml-auto" />
          <div className="w-[5.5cqw] h-[0.5cqw] bg-[#15151a] rounded-full" />
        </div>
      </div>

      {/* ===== Body ===== */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Hero copy — editorial, generous space */}
        <div className="px-[7cqw] pt-[2.5cqw]">
          <p className="text-[1.45cqw] font-bold tracking-[0.24em] text-[#F703EB] uppercase mb-[1.4cqw]">
            Bauen mit Weitblick
          </p>
          <p className="font-serif text-[5.4cqw] leading-[1.12] text-[#15151a] tracking-[-0.02em] mb-[1.6cqw]">
            Wir bauen, worauf <em className="not-italic text-[#F703EB]">Sie</em> sich verlassen.
          </p>
          <p className="text-[1.8cqw] text-[#6b6b73] leading-[1.55] mb-[2.4cqw] max-w-[86%]">
            Ihr Partner für anspruchsvolle Bauprojekte.
          </p>
          <div className="inline-flex items-center gap-[1.2cqw] bg-[#15151a] text-white text-[1.95cqw] font-semibold px-[3.8cqw] py-[2.1cqw] rounded-full shadow-[0_2cqw_6cqw_-2cqw_rgba(21,21,26,0.4)]">
            Beratung anfragen
            <span className="text-[1.8cqw]">→</span>
          </div>
        </div>

        {/* Architectural "photo" — glass tower at golden hour, built in CSS */}
        <div className="relative mx-[5cqw] mt-[3.5cqw] overflow-hidden rounded-[3cqw] h-[40cqw] shadow-[0_5cqw_16cqw_-6cqw_rgba(21,21,26,0.34)]">
          {/* Sky */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg,#8ea2b6 0%,#b7c4cf 34%,#d8dde0 60%,#ece7df 100%)" }}
          />
          {/* Soft sun glow (golden hour) */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(38% 30% at 80% 16%, rgba(255,243,222,0.85), transparent 68%)" }}
          />

          {/* Rear, lower volume — depth on the left */}
          <div
            className="absolute bottom-0 left-[-3%] top-[50%] w-[30%]"
            style={{
              backgroundColor: "#445566",
              backgroundImage:
                "linear-gradient(180deg, rgba(168,182,196,0.85), rgba(48,60,73,0.96))," +
                "repeating-linear-gradient(0deg, rgba(9,14,20,0.40) 0 1px, transparent 1px, transparent 12%)," +
                "repeating-linear-gradient(90deg, rgba(9,14,20,0.30) 0 1px, transparent 1px, transparent 22%)",
            }}
          />

          {/* Main glass facade */}
          <div
            className="absolute bottom-0 left-[20%] right-[-4%] top-[30%] overflow-hidden"
            style={{
              backgroundColor: "#5d7185",
              backgroundImage:
                "linear-gradient(160deg, rgba(226,236,243,0.92) 0%, rgba(150,170,188,0.6) 34%, rgba(86,104,122,0.85) 64%, rgba(52,66,80,0.96) 100%)," +
                "repeating-linear-gradient(0deg, rgba(8,13,18,0.34) 0 1px, transparent 1px, transparent 8.5%)," +
                "repeating-linear-gradient(90deg, rgba(8,13,18,0.24) 0 1px, transparent 1px, transparent 6.5%)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
            }}
          >
            {/* Glass reflection sweep */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(118deg, transparent 36%, rgba(255,255,255,0.34) 47%, transparent 56%)",
              }}
            />
            {/* Bright left corner edge */}
            <div
              className="absolute inset-y-0 left-0 w-[2.5%]"
              style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.55), transparent)" }}
            />
            {/* Lit windows — a few warm/cool highlights */}
            {[
              { l: "10%", t: "20%", warm: true },
              { l: "32%", t: "44%", warm: false },
              { l: "60%", t: "30%", warm: true },
              { l: "18%", t: "66%", warm: false },
              { l: "72%", t: "58%", warm: true },
              { l: "47%", t: "74%", warm: false },
            ].map((w, i) => (
              <div
                key={i}
                className="absolute rounded-[0.3cqw]"
                style={{
                  left: w.l,
                  top: w.t,
                  width: "5.5%",
                  height: "6%",
                  background: w.warm ? "rgba(255,225,170,0.85)" : "rgba(215,235,250,0.8)",
                  boxShadow: w.warm ? "0 0 1.4cqw rgba(255,214,150,0.7)" : "0 0 1.2cqw rgba(200,228,250,0.6)",
                }}
              />
            ))}
          </div>

          {/* Roofline highlight where sky meets facade */}
          <div
            className="absolute left-[20%] right-[-4%] top-[30%] h-px"
            style={{ background: "rgba(255,255,255,0.4)" }}
          />

          {/* Atmospheric haze at the base */}
          <div
            className="absolute inset-x-0 bottom-0 h-[34%]"
            style={{ background: "linear-gradient(to top, rgba(236,231,223,0.7), transparent)" }}
          />
          {/* Grain texture for a photographic finish */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{ backgroundImage: "url(/assets/grain.webp)", backgroundSize: "160px" }}
          />
          {/* Vignette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ boxShadow: "inset 0 0 10cqw 2cqw rgba(18,26,36,0.34)" }}
          />

          {/* Label */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(15,19,26,0.6), transparent 44%)" }}
          />
          <span className="absolute top-[2.4cqw] left-[2.4cqw] bg-white/85 text-[#15151a] text-[1.1cqw] font-semibold tracking-[0.08em] uppercase px-[1.8cqw] py-[0.7cqw] rounded-full">
            Referenzprojekt
          </span>
          <div className="absolute bottom-[2.6cqw] left-[3cqw] right-[3cqw]">
            <p className="text-[2cqw] font-bold text-white leading-none">Verwaltungsgebäude Süd</p>
            <p className="text-[1.2cqw] text-white/75 mt-[0.6cqw]">Hochbau · 2024</p>
          </div>
        </div>

        {/* Floating stat card — overlaps the image, right-aligned */}
        <div className="relative z-10 -mt-[5cqw] mr-[5cqw] ml-auto flex w-max items-center gap-[2.2cqw] rounded-[2.4cqw] border border-[rgba(21,21,26,0.06)] bg-white px-[3cqw] py-[1.9cqw] shadow-[0_4cqw_14cqw_-4cqw_rgba(21,21,26,0.28)]">
          <div className="flex flex-col">
            <span className="font-serif text-[3.2cqw] leading-none text-[#15151a]">4,9</span>
            <span className="mt-[0.6cqw] text-[1.4cqw] leading-none tracking-[0.1em] text-[#c9a14a]">★★★★★</span>
          </div>
          <div className="h-[6cqw] w-px bg-[rgba(21,21,26,0.12)]" />
          <div>
            <p className="text-[2cqw] font-bold leading-none text-[#15151a]">200+</p>
            <p className="mt-[0.6cqw] text-[1.1cqw] text-[#6b6b73]">Zufriedene Kunden</p>
          </div>
        </div>

        {/* Leistungen — what we do */}
        <div className="px-[7cqw] mt-[5cqw]">
          <p className="text-[1.25cqw] font-semibold uppercase tracking-[0.22em] text-[#9a9aa2]">Unsere Leistungen</p>
          <div className="mt-[2.2cqw] grid grid-cols-2 gap-x-[3cqw] gap-y-[1.8cqw]">
            {["Hochbau", "Tiefbau", "Sanierung", "Schlüsselfertiges Bauen"].map((s) => (
              <div key={s} className="flex items-center gap-[1.4cqw]">
                <span className="h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-full bg-[#F703EB]" />
                <span className="text-[1.5cqw] font-medium leading-tight text-[#15151a]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 stat tiles */}
        <div className="px-[7cqw] grid grid-cols-3 gap-[2cqw] mt-[5cqw]">
          {[
            { v: "120+", l: "Projekte" },
            { v: "15 J.", l: "Erfahrung" },
            { v: "98 %", l: "Weiterempfehlung" },
          ].map(({ v, l }) => (
            <div
              key={l}
              className="bg-white border border-[rgba(21,21,26,0.06)] rounded-[2cqw] py-[2.5cqw] px-[1cqw] text-center shadow-sm"
            >
              <p className="font-serif text-[3cqw] text-[#15151a] leading-none">{v}</p>
              <p className="text-[1.2cqw] text-[#6b6b73] mt-[0.7cqw] leading-tight">{l}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mx-[5cqw] mt-[5cqw] rounded-[2.5cqw] border border-[rgba(21,21,26,0.06)] bg-white p-[3.2cqw] shadow-sm">
          <p className="font-serif text-[1.9cqw] leading-[1.4] text-[#15151a]">
            „Termintreu, sauber, transparent — genau so stellt man sich einen Baupartner vor.“
          </p>
          <div className="mt-[2cqw] flex items-center gap-[1.6cqw]">
            <div className="h-[4cqw] w-[4cqw] shrink-0 rounded-full bg-[#cdd3da]" />
            <div>
              <p className="text-[1.3cqw] font-semibold leading-none text-[#15151a]">M. Bauer</p>
              <p className="mt-[0.5cqw] text-[1.1cqw] text-[#6b6b73]">Geschäftsführer · Bauer GmbH</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-[7cqw] pt-[4cqw] pb-[3cqw] mt-auto flex items-center justify-between shrink-0">
          <span className="font-extrabold text-[2cqw] tracking-[-0.02em] text-[#15151a]">
            muster<b className="text-[#F703EB]">bau</b>
          </span>
          <span className="flex gap-[2cqw] text-[1.4cqw] text-[#8a8a92]">
            <span>Impressum</span>
            <span>Datenschutz</span>
          </span>
        </div>
      </div>
    </div>
  )
}
