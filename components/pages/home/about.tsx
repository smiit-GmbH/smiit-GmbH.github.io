import Image from "next/image"

interface AboutProps {
  dict: any
}

export default function About({ dict }: AboutProps) {
  return (
    <section className="relative pt-12 pb-0 md:pt-20 md:pb-8">
      <div className="max-w-[1400px] mx-auto px-0 sm:px-6 lg:px-8">
        <div
          className={[
            "relative overflow-hidden",
            "rounded-[1.75rem]",
            "border-none sm:border sm:border-black/10",
            // Mobile (<md): increase overall About height
            "min-h-[600px] sm:min-h-[675px] md:min-h-[580px] lg:min-h-[660px]",
          ].join(" ")}
        >
          {/* Background image */}
          <Image
            src="/assets/about_mobile.png"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover object-bottom scale-[1.12] md:hidden"
            priority={false}
          />
          <Image
            src="/assets/about.png"
            alt=""
            fill
            sizes="(min-width: 768px) 1200px, 100vw"
            aria-hidden="true"
            className="hidden md:block object-cover object-top"
            priority={false}
          />

          {/* Text overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-3 md:px-10 pt-16 sm:pt-14 md:pt-12 lg:pt-16">
            <h2 className="font-serif text-[2.05rem] sm:text-[2.6rem] md:text-[3.0rem] leading-[1.19] sm:leading-[1.08] text-black tracking-tight max-w-[22ch] sm:max-w-[30ch] whitespace-normal sm:whitespace-pre-line text-balance">
              {dict.about.title}
            </h2>
            <p className="mt-4 md:mt-5 text-[0.87rem] sm:text-xs md:text-[0.88rem] leading-[1.89] sm:leading-relaxed text-black/80 max-w-[40ch] sm:max-w-[52ch] whitespace-normal sm:whitespace-pre-line text-pretty">
              {dict.about.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

