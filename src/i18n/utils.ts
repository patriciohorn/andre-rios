import { ui, defaultLang, routes, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const pathName = path.replaceAll('/', '');
    const hasTranslation =
      defaultLang !== l &&
      (routes[l as keyof typeof routes] as Record<string, string>)[pathName] !== undefined;
    const translatedPath = hasTranslation
      ? '/' + (routes[l as keyof typeof routes] as Record<string, string>)[pathName]
      : path;

    return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`;
  };
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  console.log(pathname);
  const parts = pathname?.split('/');
  console.log(parts);
  const path = parts.pop() || parts.pop();
  console.log(path);

  if (path === undefined) {
    return undefined;
  }

  const currentLang = getLangFromUrl(url);

  if (defaultLang === currentLang) {
    const route = Object.values(routes)[0];
    console.log(route);
    return route[path as keyof typeof route] !== undefined
      ? route[path as keyof typeof route]
      : undefined;
  }

  const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined => {
    return Object.keys(obj).find((key) => obj[key] === value);
  };

  const reversedKey = getKeyByValue(routes[currentLang], path);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return undefined;
}
