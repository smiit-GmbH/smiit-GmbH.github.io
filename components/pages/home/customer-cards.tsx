"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, Globe, ShieldCheck, Zap } from "lucide-react"

const LOGOS = {
  1: Activity,
  2: BarChart3,
  3: Globe,
  4: ShieldCheck,
  5: Zap,
}

interface CustomerCardsProps {
  dict: any
}

export default function CustomerCards({ dict }: CustomerCardsProps) {
  const customers = dict.customerCards.map((c: any) => ({
    ...c,
    logo: LOGOS[c.id as keyof typeof LOGOS],
  }))

  return (
    <section className="relative">
      {/* Background that starts below the overlap area */}
      <div className="absolute top-0 md:top-[128px] inset-x-0 bottom-0 bg-background -z-10" />
      
      <div className="overflow-x-auto pb-8 no-scrollbar">
        <div className="flex gap-4 md:gap-8 px-4 md:px-12 min-w-max">
          {customers.map((customer: any) => {
            const Logo = customer.logo
            return (
              <Card key={customer.id} className="w-[280px] sm:w-[350px] shrink-0 md:w-[450px] bg-white border-none shadow-sm rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2">
                <div className="p-5 md:p-8 flex flex-col h-full justify-between">
                  <div>
                    <CardTitle className="font-serif text-xl md:text-[2rem] font-normal text-black tracking-tight leading-[1.1]">
                      {customer.name}
                    </CardTitle>
                    <p className="text-sm md:text-lg text-black/90 mt-2 md:mt-4 leading-snug font-normal max-w-[80%] md:max-w-[60%]">
                      {customer.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-0">
                    <div className="rounded-xl bg-[#F2F0E9] h-10 w-14 md:h-14 md:w-20 flex items-center justify-center shrink-0">
                      <Logo className="h-5 w-5 md:h-7 md:w-7 text-black" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-500 leading-relaxed">
                      {customer.feedback}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
