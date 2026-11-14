export type UpcomingEvent = {
  id: string;
  title: string;
  category: 'Talks' | 'Bootcamps' | 'Learning series' | 'Workshops' | 'Socials';
  summary: string;
  start: string;
  end: string;
  location: string;
  registerUrl?: string;
};

export const eventTimeZone = 'Asia/Beirut';

export const upcomingEvents: UpcomingEvent[] = [];

export function getUpcomingEvents(now = new Date()): UpcomingEvent[] {
  return upcomingEvents
    .filter((event) => new Date(event.end).getTime() > now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

const pad = (value: number) => String(value).padStart(2, '0');

export function icsStamp(date: Date): string {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

export function googleCalendarUrl(event: UpcomingEvent, pageUrl: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} | AI Journey`,
    dates: `${icsStamp(new Date(event.start))}/${icsStamp(new Date(event.end))}`,
    details: `${event.summary}\n\n${pageUrl}`,
    location: event.location,
    ctz: eventTimeZone,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function formatEventDay(iso: string) {
  const date = new Date(iso);
  const part = (options: Intl.DateTimeFormatOptions) => date.toLocaleString('en-US', { timeZone: eventTimeZone, ...options });
  return {
    weekday: part({ weekday: 'short' }),
    day: part({ day: 'numeric' }),
    month: part({ month: 'short' }),
    long: part({ weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

export function formatEventTime(start: string, end: string): string {
  const time = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { timeZone: eventTimeZone, hour: 'numeric', minute: '2-digit' });
  return `${time(start)} to ${time(end)}`;
}
