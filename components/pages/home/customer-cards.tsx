"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, Globe, ShieldCheck, Zap } from "lucide-react"

const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: "Alpine Retail Group",
    subtitle: "Power BI Analytics for Sales & Operations",
    logo: Activity,
    feedback: "Real-time dashboards increased forecasting accuracy by 40%.",
  },
  {
    id: 2,
    name: "G&B Logistics GmbH",
    subtitle: "Digital Strategy & Process Optimization",
    logo: BarChart3,
    feedback: "Operational efficiency improved by 35% within three months.",
  },
  {
    id: 3,
    name: "TechLine Services AG",
    subtitle: "End-to-End API Integrations Across Departments",
    logo: Globe,
    feedback: "Five disconnected systems unified into one seamless workflow.",
  },
  {
    id: 4,
    name: "Helvetia Systems",
    subtitle: "Customer Experience Transformation",
    logo: ShieldCheck,
    feedback: "NPS score increased by 25 points in Q1 through better data insights.",
  },
  {
    id: 5,
    name: "Nova Pharma Solutions",
    subtitle: "Regulatory Compliance Automation",
    logo: Zap,
    feedback: "Reduced audit preparation time by 60% with automated reporting.",
  },
]

export default function CustomerCards() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      {/* Background that starts below the overlap area */}
      <div className="absolute top-[96px] md:top-[128px] inset-x-0 bottom-0 bg-[#FDFBF7] -z-10" />
      
      <div className="sticky top-[72px] flex h-auto overflow-hidden py-8">
        <motion.div style={{ x }} className="flex gap-8 px-12">
          {MOCK_CUSTOMERS.map((customer) => (
            <Card key={customer.id} className="w-[350px] shrink-0 md:w-[450px] bg-white border-none shadow-sm rounded-[2rem] p-2">
              <div className="p-6 md:p-8 flex flex-col h-full justify-between">
                <div>
                  <CardTitle className="font-serif text-2xl md:text-[2rem] font-normal text-black tracking-tight leading-[1.1]">
                    {customer.name}
                  </CardTitle>
                  <p className="text-base md:text-md text-black/90 mt-4 leading-snug font-normal max-w-[60%]">
                    {customer.subtitle}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-8">
                  <div className="rounded-xl bg-[#F2F0E9] h-14 w-20 flex items-center justify-center shrink-0">
                    <customer.logo className="h-7 w-7 text-black" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    {customer.feedback}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
