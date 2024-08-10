import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    icon()
  ],
  i18n: {
    defaultLocale: 'es', // Language default
    locales: ['es', 'en'], // Languages support
    routing: {
      prefixDefaultLocale: false // es -> '/', en -> '/en'
    }
  }
});
