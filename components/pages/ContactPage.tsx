import ContactHero from "@/components/pages/contact/contact-hero"
import BookingCard from "@/components/pages/contact/booking-card"
import ContactInfo from "@/components/pages/contact/contact-info"
import type { Locale, Dictionary } from "@/lib/dictionary"

export default function ContactPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-12 lg:pb-16 flex items-center">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile: hero → booking card → contact details. Desktop: hero and details left, card right. */}
        <div className="grid gap-10 lg:gap-x-14 xl:gap-x-20 lg:gap-y-12 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[auto_1fr] items-start">
          <div className="lg:col-start-1 lg:row-start-1">
            <ContactHero dict={dict} lang={lang} />
          </div>

          <div
            id="book"
            className="relative z-30 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center rounded-2xl md:rounded-[1.75rem] border border-black/10 bg-[#F4F4F5] shadow-xl ring-1 ring-black/5 p-5 sm:p-7 lg:p-7 xl:p-8"
          >
            <BookingCard dict={dict} lang={lang} />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <ContactInfo dict={dict} />
          </div>
        </div>
      </div>
    </main>
  )
}
