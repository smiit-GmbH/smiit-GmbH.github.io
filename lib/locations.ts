export interface Location {
  city: string;
  lat: number;
  lng: number;
  simpleMarker?: boolean;
  name?: string;
  company?: string;
  addressLines?: string[];
  phone?: string[];
  fax?: string[];
  email?: string;
  management?: string;
  officeHead?: string;
}

export const LOCATIONS: Location[] = [
  {
    city: "Berlin",
    lat: 52.5200,
    lng: 13.4050,
  },
  {
    city: "Wachtendonk",
    lat: 51.4300,
    lng: 6.3000,
  },
  {
    city: "Osnabrück",
    lat: 52.3000,
    lng: 8.0200,
  },
  {
    city: "Hünenberg See",
    lat: 47.1900,
    lng: 8.4600,
  },
  {
    city: "Stuttgart",
    lat: 48.7800,
    lng: 9.2500,
  },
  {
    city: "Wegberg",
    lat: 51.1700,
    lng: 6.2300,
  },
  {
    city: "Ehingen",
    lat: 48.3000,
    lng: 9.7800,
  },
  {
    city: "Aarau",
    lat: 47.4100,
    lng: 8.0100,
  },
  {
    city: "Köln",
    lat: 50.9500,
    lng: 6.9900,
  },
  {
    city: "Zürich",
    lat: 47.3900,
    lng: 8.5800,
  },
  {
    city: "Herrenberg",
    lat: 48.6200,
    lng: 8.8300,
  },
  {
    city: "Düsseldorf",
    lat: 51.2400,
    lng: 6.8100,
  },
  {
    city: "Hamburg",
    lat: 53.5600,
    lng: 10.0200,
  },
  {
    city: "Linz",
    lat: 48.3200,
    lng: 14.3300,
  },
  {
    city: "Hechingen",
    lat: 48.3700,
    lng: 8.9300,
  },
  {
    city: "Denkendorf",
    lat: 48.7100,
    lng: 9.3600,
  },
  {
    city: "Luzern",
    lat: 47.0700,
    lng: 8.3400,
  },
  {
    city: "Filderstadt",
    lat: 48.6900,
    lng: 9.2600,
  },
  {
    city: "Ibbenbüren",
    lat: 52.3100,
    lng: 7.7600,
  },
  {
    city: "Wien",
    lat: 48.2200,
    lng: 16.4200,
  },
  {
    city: "Basel",
    lat: 47.5800,
    lng: 7.6200,
  },
  {
    city: "Bern",
    lat: 46.9700,
    lng: 7.4200,
  },
  {
    city: "Winkel",
    lat: 47.5200,
    lng: 8.6200,
  }
];
