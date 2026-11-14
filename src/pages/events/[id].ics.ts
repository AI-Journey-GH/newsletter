import type { APIRoute, GetStaticPaths } from 'astro';
import { icsStamp, upcomingEvents, type UpcomingEvent } from '../../data/upcoming';
import { u } from '../../lib/utils';

export const getStaticPaths: GetStaticPaths = () => upcomingEvents.map((event) => ({ params: { id: event.id }, props: { event } }));

const escape = (text: string) => text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

const fold = (line: string) => {
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    parts.push(rest.slice(0, 74));
    rest = ` ${rest.slice(74)}`;
  }
  parts.push(rest);
  return parts.join('\r\n');
};

export const GET: APIRoute = ({ props, site }) => {
  const event = props.event as UpcomingEvent;
  const pageUrl = new URL(u('/events'), site).href;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI Journey//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@${site?.hostname ?? 'ai-journey'}`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(new Date(event.start))}`,
    `DTEND:${icsStamp(new Date(event.end))}`,
    `SUMMARY:${escape(`${event.title} | AI Journey`)}`,
    `DESCRIPTION:${escape(`${event.summary}\n\n${event.registerUrl ?? pageUrl}`)}`,
    `LOCATION:${escape(event.location)}`,
    `URL:${event.registerUrl ?? pageUrl}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escape(event.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return new Response(`${lines.map(fold).join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${event.id}.ics"`,
    },
  });
};
