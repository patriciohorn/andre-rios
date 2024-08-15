// ui.ts
import SpainFlag from '@/components/flags/Spain.astro';
import UnitedStatesFlag from '@/components/flags/UnitedStates.astro';

// Add missing imports
export const LANGUAGES: Record<string, { code: string; name: string; flag: typeof SpainFlag }> = {
  en: {
    code: 'en',
    name: 'English',
    flag: UnitedStatesFlag
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: SpainFlag
  }
};

export const defaultLang = 'es';
export const showDefaultLang = false;

export const ui = {
  es: {
    'nav.meet': 'Conoce a tu Doctor',
    'nav.procedures': 'Procedimientos',
    'nav.gallery': 'Galería',
    'nav.virtual': 'Consulta Virtual'
  },
  en: {
    'nav.meet': 'Meet Your Doctor',
    'nav.procedures': 'Procedures',
    'nav.gallery': 'Gallery',
    'nav.virtual': 'Virtual Consultation'
  }
} as const;

export const routes = {
  es: {
    meet: 'conoce-a-tu-doctor',
    procedures: 'procedimientos',
    gallery: 'galeria',
    virtual: 'consulta-virtual'
  },
  en: {
    meet: 'meet-your-doctor',
    procedures: 'procedures',
    gallery: 'gallery',
    virtual: 'virtual-consultation'
  }
};
