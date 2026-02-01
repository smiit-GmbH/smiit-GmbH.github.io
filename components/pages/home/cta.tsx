import Image from "next/image"

interface CtaProps {
  dict: any
}

export default function Cta({ dict }: CtaProps) {
  return (
    <section className="relative py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto px-0 sm:px-6 lg:px-8">
        <div
          className={[
            "relative overflow-hidden",
            "rounded-[1.75rem]",
            "border border-black/10",
            "min-h-[500px] sm:min-h-[620px] md:min-h-[580px] lg:min-h-[660px]",
          ].join(" ")}
        >
          {/* Background image */}
          <Image
            src="/assets/cta_mobile.png"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover object-[center_82%] scale-[1.12] md:hidden"
            priority={false}
          />
          <Image
            src="/assets/cta.png"
            alt=""
            fill
            sizes="(min-width: 768px) 1200px, 100vw"
            aria-hidden="true"
            className="hidden md:block object-cover object-top"
            priority={false}
          />

          {/* Text overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-3 md:px-10 pt-14 sm:pt-14 md:pt-12 lg:pt-16">
            <h2 className="font-serif text-[2.05rem] sm:text-[2.6rem] md:text-[3.0rem] leading-[1.08] text-black tracking-tight max-w-[22ch] sm:max-w-[30ch] whitespace-normal sm:whitespace-pre-line text-balance">
              {dict.cta.title}
            </h2>
            <p className="mt-4 md:mt-5 text-[0.82rem] sm:text-xs md:text-[0.88rem] text-black/80 max-w-[40ch] sm:max-w-[52ch] whitespace-normal sm:whitespace-pre-line leading-relaxed text-pretty">
              {dict.cta.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

