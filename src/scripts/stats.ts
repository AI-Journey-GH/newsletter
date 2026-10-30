// Visitor stats (Umami). Buttons are counted with a data-umami-event="Name" attribute;
// trackEvent is for things a click cannot show, like a finished sign-up.
// Does nothing when the stats script is off or blocked.

declare global {
  interface Window {
    umami?: { track: (event: string) => void };
  }
}

export function trackEvent(name: string) {
  window.umami?.track(name);
}
