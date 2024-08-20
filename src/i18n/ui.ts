// ui.ts
import SpainFlag from '@/components/flags/Spain.astro';
import UnitedStatesFlag from '@/components/flags/UnitedStates.astro';

// Add missing imports
export const LANGUAGES: Record<
  string,
  { code: string; name: string; label: string; flag: typeof SpainFlag }
> = {
  en: {
    code: 'en',
    name: 'English',
    label: 'EN',
    flag: UnitedStatesFlag
  },
  es: {
    code: 'es',
    name: 'Español',
    label: 'ES',
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
    'conoce-a-tu-doctor': 'conoce-a-tu-doctor',
    procedures: 'procedimientos',
    galeria: 'galeria',
    virtual: 'consulta-virtual',
    contacto: 'contacto'
  },
  en: {
    'conoce-a-tu-doctor': 'meet-your-doctor',
    procedures: 'procedures',
    galeria: 'gallery',
    virtual: 'virtual-consultation',
    contacto: 'contact-us'
  }
};
