import { de } from "./dictionary/de"
import { en } from "./dictionary/en"

export type Locale = "de" | "en"

/** Shape of a locale dictionary. German is the source of truth; every other locale must match it exactly. */
export type Dictionary = typeof de

const dictionaries: Record<Locale, Dictionary> = { de, en }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]
