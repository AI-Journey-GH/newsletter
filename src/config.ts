// All external links and site-wide text live here.
// Replace every "REPLACE_ME" link with the real form or page before launch.

export const site = {
  name: 'AI Journey',
  tagline: 'The weekly AI newsletter',
  description:
    'Every week, the AI news that matters to university students, in one 10 to 15 minute read. By AI Journey at AUB.',
  locale: 'en',
};

export const links = {
  instagram: 'https://www.instagram.com/ai.journey.aub/',
  whatsapp: 'https://chat.whatsapp.com/GGwUjQZzhN609XzBsDz3EE', // TO CONFIRM: current group invite link
  linkedin: 'https://www.linkedin.com/company/ai-journey-aub/',
  // External form that collects email subscriptions (Google Form, Tally, Mailchimp, Substack...)
  subscribe: 'https://forms.gle/REPLACE_ME_SUBSCRIBE',
  // Default poll link, used when an issue does not set its own yourTurn.pollUrl
  poll: 'https://forms.gle/REPLACE_ME_POLL',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Issues', href: '/issues' },
];

export const social = [
  { label: 'Instagram', href: links.instagram, icon: 'instagram' },
  { label: 'WhatsApp', href: links.whatsapp, icon: 'whatsapp' },
  { label: 'LinkedIn', href: links.linkedin, icon: 'linkedin' },
] as const;
