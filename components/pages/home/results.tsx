import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface ResultsProps {
  dict: any
}

export default function Results({ dict }: ResultsProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-tight text-black max-w-4xl mx-auto">
            {dict.results.titlePrefix}
            <span className="text-[#F703EB]">
              {dict.results.titleHighlight}
            </span>
            {dict.results.titleSuffix}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {dict.results.items.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-[1.5rem] p-8 shadow-sm flex flex-col h-full"
            >
              <div className="text-[#F703EB] text-5xl font-medium mb-4">
                {item.value}
              </div>
              <h3 className="text-lg font-medium text-black mb-4">
                {item.label}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mt-auto">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-colors"
          >
            {dict.results.button}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
