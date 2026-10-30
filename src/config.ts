// All external links and site-wide text live here.
// Replace every "REPLACE_ME" link with the real form or page before launch.

export const site = {
  name: 'AI Journey',
  tagline: 'Curious minds. Shared ideas.',
  description:
    'A student-led AI community at AUB. Explore our talks, bootcamps, learning sessions, and the people behind them.',
  locale: 'en',
};

export const links = {
  instagram: 'https://www.instagram.com/ai.journey.aub/',
  whatsapp: 'https://chat.whatsapp.com/GGwUjQZzhN609XzBsDz3EE', // TO CONFIRM: current group invite link
  linkedin: 'https://www.linkedin.com/company/ai-journey-aub/',
  eventRecap: 'https://www.instagram.com/p/De97Al8DbIK/',
  // The Google Form that collects email subscriptions (its answers go to a Google Sheet)
  subscribe: 'https://forms.gle/u4hAF2B5KPKryNuG6',
  // Default poll link, used when an issue does not set its own yourTurn.pollUrl
  poll: 'https://forms.gle/REPLACE_ME_POLL',
};

// The subscribe box on the site sends emails straight into the Google Form above.
// To find these two values: in the form, open "Get pre-filled link", type any email,
// and copy the link. The address before "viewform" + "formResponse" is `action`,
// and the "entry.123..." part is `emailField`.
export const subscribeForm = {
  action: 'https://docs.google.com/forms/d/e/1FAIpQLSeT2lkvrOP9sA-kHQoOVfFBKytr4yzeI8s_nk4uB1DpnmapbA/formResponse',
  emailField: 'entry.334681311',
};

// Visitor stats with Umami Cloud (see "Visitor stats" in the README).
// Paste the site's "Website ID" from umami.is here. While it is empty, no stats code is added.
// Visits are only counted on the live address (SITE_URL), never on your own computer.
export const analytics = {
  umamiWebsiteId: '701333c3-d46b-4608-af91-a3f3fe2393d1',
};

export const nav = [
  { label: 'Activities', href: '/events' },
  { label: 'Community', href: '/community' },
  { label: 'Blogs', href: '/issues' },
];

export const social = [
  { label: 'Instagram', href: links.instagram, icon: 'instagram' },
  { label: 'WhatsApp', href: links.whatsapp, icon: 'whatsapp' },
  { label: 'LinkedIn', href: links.linkedin, icon: 'linkedin' },
] as const;
