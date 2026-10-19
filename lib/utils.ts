import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Without this, tailwind-merge reads the custom type-scale classes (see the --text-* tokens
// in app/globals.css) as text colors and drops them next to e.g. `text-black`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "h4", "h5", "lead", "body", "prose"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
