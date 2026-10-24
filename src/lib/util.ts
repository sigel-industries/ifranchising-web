import fs from 'node:fs';
import path from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';

export type ClubEvent = CollectionEntry<'events'>;

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

/** Interní odkaz s ohledem na base path (GitHub Pages podsložka). */
export const href = (p = '') => BASE + p.replace(/^\//, '');

const REMOTE_IMG = 'https://www.ifranchising.cz/img/';

/**
 * Obrázek: pokud existuje lokálně v public/img/, použije se lokální kopie
 * (stáhne ji scripts/fetch-assets.sh), jinak se načte z původního webu.
 */
export function img(name?: string) {
  if (!name) return '';
  if (/^https?:\/\//.test(name)) return name;
  const local = path.join(process.cwd(), 'public', 'img', name);
  return fs.existsSync(local) ? href(`img/${name}`) : REMOTE_IMG + name;
}

const TZ = 'Europe/Prague';
export const todayISO = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const fmtLong = (d: Date) =>
  new Intl.DateTimeFormat('cs-CZ', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(d);

export const fmtShort = (d: Date) =>
  new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(d);

export const fmtDay = (d: Date) =>
  new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', timeZone: 'UTC' }).format(d).replace('.', '');

export const fmtMonth = (d: Date) =>
  new Intl.DateTimeFormat('cs-CZ', { month: 'long', timeZone: 'UTC' }).format(d);

export const label = (e: ClubEvent) =>
  e.data.kind === 'vecer' ? `${e.data.number}. klubový večer` : `${e.data.number}. exkurze`;

/** Všechny akce rozdělené na nadcházející (vzestupně) a proběhlé (sestupně). */
export async function getEvents() {
  const all = await getCollection('events');
  const today = todayISO();
  const upcoming = all
    .filter((e) => isoDate(e.data.date) >= today)
    .sort((a, b) => +a.data.date - +b.data.date);
  const past = all
    .filter((e) => isoDate(e.data.date) < today)
    .sort((a, b) => +b.data.date - +a.data.date);
  return { all, upcoming, past };
}
