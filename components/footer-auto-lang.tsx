"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"

/** Footer for pages without a [lang] segment (404): picks the language from the URL at runtime. */
export default function FooterAutoLang() {
  const pathname = usePathname() || "/"
  return <Footer forceLang={pathname.startsWith("/en") ? "en" : "de"} />
}
