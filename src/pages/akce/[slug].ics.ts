import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { isoDate, label } from '../../lib/util';

export async function getStaticPaths() {
  const events = await getCollection('events');
  return events.map((e) => ({ params: { slug: e.id }, props: { event: e } }));
}

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/[,;]/g, (m) => '\\' + m).replace(/\n/g, '\\n');

export const GET: APIRoute = ({ props, site }) => {
  const e = (props as { event: CollectionEntry<'events'> }).event;
  const d = e.data;
  const day = isoDate(d.date).replace(/-/g, '');
  const t = (hm: string) => hm.replace(':', '') + '00';
  const url = new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}akce/${e.id}/`, site);
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Franchise Club//ifranchising.cz//CS',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${e.id}@ifranchising.cz`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Europe/Prague:${day}T${t(d.start)}`,
    `DTEND;TZID=Europe/Prague:${day}T${t(d.end)}`,
    `SUMMARY:${esc(`Franchise Club: ${d.title}`)}`,
    `LOCATION:${esc(d.venue)}`,
    `DESCRIPTION:${esc(`${label(e)}${d.speakers ? `\nHost: ${d.speakers}` : ''}\n${url}`)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return new Response(ics, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
