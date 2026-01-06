"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/de/")
  }, [router])

  return (
    <>
      <noscript>
        <main className="min-h-screen flex items-center justify-center bg-slate-950 p-8 text-slate-50">
          <div className="text-center text-sm text-slate-200/80">
            <p>
              JavaScript ist deaktiviert. Bitte öffnen Sie{" "}
              <a href="/de/" className="text-teal-200 underline">
                /de/
              </a>
              .
            </p>
          </div>
        </main>
      </noscript>
    </>
  )
}
