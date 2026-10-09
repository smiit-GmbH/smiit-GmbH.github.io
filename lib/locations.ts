export interface Location {
  city: string
  lat: number
  lng: number
  simpleMarker?: boolean
  name?: string
  company?: string
  addressLines?: string[]
  phone?: string[]
  fax?: string[]
  email?: string
  management?: string
  officeHead?: string
}

export const LOCATIONS: Location[] = [
  {
    city: "Berlin",
    lat: 52.52,
    lng: 13.405,
  },
  {
    city: "Wachtendonk",
    lat: 51.43,
    lng: 6.3,
  },
  {
    city: "Osnabrück",
    lat: 52.3,
    lng: 8.02,
  },
  {
    city: "Hünenberg See",
    lat: 47.19,
    lng: 8.46,
  },
  {
    city: "Stuttgart",
    lat: 48.78,
    lng: 9.25,
  },
  {
    city: "Wegberg",
    lat: 51.17,
    lng: 6.23,
  },
  {
    city: "Ehingen",
    lat: 48.3,
    lng: 9.78,
  },
  {
    city: "Aarau",
    lat: 47.41,
    lng: 8.01,
  },
  {
    city: "Köln",
    lat: 50.95,
    lng: 6.99,
  },
  {
    city: "Zürich",
    lat: 47.39,
    lng: 8.58,
  },
  {
    city: "Herrenberg",
    lat: 48.62,
    lng: 8.83,
  },
  {
    city: "Düsseldorf",
    lat: 51.24,
    lng: 6.81,
  },
  {
    city: "Hamburg",
    lat: 53.56,
    lng: 10.02,
  },
  {
    city: "Linz",
    lat: 48.32,
    lng: 14.33,
  },
  {
    city: "Hechingen",
    lat: 48.37,
    lng: 8.93,
  },
  {
    city: "Denkendorf",
    lat: 48.71,
    lng: 9.36,
  },
  {
    city: "Luzern",
    lat: 47.07,
    lng: 8.34,
  },
  {
    city: "Filderstadt",
    lat: 48.69,
    lng: 9.26,
  },
  {
    city: "Ibbenbüren",
    lat: 52.31,
    lng: 7.76,
  },
  {
    city: "Wien",
    lat: 48.22,
    lng: 16.42,
  },
  {
    city: "Basel",
    lat: 47.58,
    lng: 7.62,
  },
  {
    city: "Bern",
    lat: 46.97,
    lng: 7.42,
  },
  {
    city: "Winkel",
    lat: 47.52,
    lng: 8.62,
  },
]
