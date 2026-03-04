import ContactHero from "@/components/pages/contact/contact-hero"
import ContactForm from "@/components/pages/contact/contact-form"
import ContactInfo from "@/components/pages/contact/contact-info"
import type { Locale } from "@/lib/dictionary"

export default function ContactPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-12 lg:pb-16 flex items-center">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-10 lg:gap-16 xl:gap-20 lg:grid-cols-2 items-start">
          <div className="flex flex-col space-y-10 lg:space-y-12">
            <ContactHero dict={dict} lang={lang} />
            <ContactInfo dict={dict} />
          </div>

          <div id="book" className="relative z-30 rounded-2xl md:rounded-[1.75rem] border border-black/10 bg-[#F4F4F5] shadow-xl ring-1 ring-black/5 p-5 sm:p-8 lg:p-10">
            <ContactForm dict={dict} lang={lang} />
          </div>
        </div>
      </div>
    </main>
  )
}
