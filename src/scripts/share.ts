// Share buttons: [data-share] uses the Web Share API, falling back to copying the link.
// [data-copy-link] always copies. A status message is announced in [data-share-status].

function announce(message: string) {
  document.querySelectorAll<HTMLElement>('[data-share-status]').forEach((el) => {
    el.textContent = message;
    el.classList.add('is-visible');
    window.setTimeout(() => {
      el.classList.remove('is-visible');
      el.textContent = '';
    }, 2200);
  });
}

async function copy(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    announce('Link copied');
  } catch {
    window.prompt('Copy this link:', url);
  }
}

document.addEventListener('click', async (e) => {
  const target = (e.target as HTMLElement).closest<HTMLElement>('[data-share], [data-copy-link]');
  if (!target) return;
  e.preventDefault();
  const url = target.dataset.url || window.location.href;
  const title = target.dataset.title || document.title;
  if (target.hasAttribute('data-share') && navigator.share) {
    try {
      await navigator.share({ title, url });
    } catch {
      /* closed by the reader */
    }
    return;
  }
  copy(url);
});
