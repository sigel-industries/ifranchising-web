import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Klubové akce. Nový večer = nový .md soubor v src/content/events/.
 * Název souboru = URL adresa akce (např. 2026-12-09-188-nazev-tematu.md).
 */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    kind: z.enum(['vecer', 'exkurze']),
    number: z.number().int(),
    title: z.string(),
    date: z.coerce.date(),
    start: z.string().regex(/^\d{2}:\d{2}$/),
    end: z.string().regex(/^\d{2}:\d{2}$/),
    venue: z.string(),
    image: z.string().optional(),
    invite: z.string().url().optional(),
    speakers: z.string().optional(),
    /** Interní poznámka, na webu se nezobrazuje. */
    todo: z.string().optional(),
  }),
});

/** Články v sekci Franchising. */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    lead: z.string(),
  }),
});

export const collections = { events, articles };
