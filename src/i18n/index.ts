import spanish from './es.json';
import english from './en.json';

const LANG = {
  SPANISH: 'es',
  ENGLISH: 'en'
};

export const getI18N = ({ currentLocale = 'es' }: { currentLocale: string | undefined }) => {
  if (currentLocale === LANG.ENGLISH) return english;
  if (currentLocale === LANG.SPANISH) return spanish;
  return spanish;
};
