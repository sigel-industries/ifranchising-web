// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL a BASE_PATH nastavuje GitHub Actions (viz .github/workflows/deploy.yml).
// Na vlastní doméně (www.ifranchising.cz) stačí BASE_PATH="/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.ifranchising.cz',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/clenska-zona/') })],
});
