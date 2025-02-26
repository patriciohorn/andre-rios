// ui.ts
import MexicoFlag from "@/components/flags/Mexico.astro";
import UnitedStatesFlag from "@/components/flags/UnitedStates.astro";

// Add missing imports
export const LANGUAGES: Record<
  string,
  { code: string; name: string; label: string; flag: typeof MexicoFlag }
> = {
  en: {
    code: "en",
    name: "English",
    label: "EN",
    flag: UnitedStatesFlag,
  },
  es: {
    code: "es",
    name: "Español",
    label: "ES",
    flag: MexicoFlag,
  },
};

export const defaultLang = "es";
export const showDefaultLang = false;

export const ui = {
  es: {
    "nav.meet": "Conoce a tu Doctor",
    "nav.procedures": "Procedimientos",
    "nav.gallery": "Galería",
    "nav.virtual": "Consulta Virtual",
    "nav.contacto": "Contacto",
  },
  en: {
    "nav.meet": "Meet Your Doctor",
    "nav.procedures": "Procedures",
    "nav.gallery": "Gallery",
    "nav.virtual": "Virtual Consultation",
    "nav.contacto": "Contact Us",
  },
} as const;

export const routes = {
  es: {
    "conoce-a-tu-doctor": "conoce-a-tu-doctor",
    procedimientos: "procedimientos",
    galeria: "galeria",
    "consulta-virtual": "consulta-virtual",
    contacto: "contacto",
  },
  en: {
    "conoce-a-tu-doctor": "meet-your-doctor",
    procedimientos: "procedures",
    galeria: "gallery",
    "consulta-virtual": "virtual-consultation",
    contacto: "contact-us",
  },
};
