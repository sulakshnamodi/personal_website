// Contact form: client-side validation, Cloudflare Turnstile, POST to /api/contact.

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      getResponse: (id: string) => string | undefined;
    };
  }
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  const success = document.querySelector<HTMLElement>('[data-contact-success]');
  if (!form || !success) return;

  const errorEl = form.querySelector<HTMLElement>('[data-form-error]')!;
  const labelEl = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const slot = form.querySelector<HTMLElement>('[data-turnstile]')!;
  const { sitekey = '', labelIdle = '', labelSending = '', errorRequired = '', errorGeneric = '' } = form.dataset;

  // --- Turnstile (loaded lazily when the form gets close to the viewport) ---
  let widgetId: string | null = null;
  let token = '';
  let waiters: ((t: string) => void)[] = [];
  let loading: Promise<void> | null = null;

  const loadTurnstile = () => {
    loading ??= new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = TURNSTILE_SRC;
      s.async = true;
      s.onload = () => {
        widgetId = window.turnstile!.render(slot, {
          sitekey,
          appearance: 'interaction-only',
          theme: 'light',
          size: 'flexible',
          callback: (t: string) => {
            token = t;
            waiters.forEach((fn) => fn(t));
            waiters = [];
          },
          'expired-callback': () => {
            token = '';
          },
          'error-callback': () => {
            token = '';
          },
        });
        resolve();
      };
      s.onerror = () => reject(new Error('Turnstile failed to load'));
      document.head.appendChild(s);
    });
    return loading;
  };

  const getToken = async (): Promise<string> => {
    await loadTurnstile();
    if (token) return token;
    return new Promise((resolve) => {
      waiters.push(resolve);
      setTimeout(() => resolve(''), 15000);
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          loadTurnstile().catch(() => {});
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(form);
  }
  form.addEventListener('focusin', () => loadTurnstile().catch(() => {}), { once: true });

  // --- Form state ---
  const setError = (msg: string) => {
    errorEl.textContent = msg;
  };
  const setSending = (sending: boolean) => {
    submitBtn.disabled = sending;
    labelEl.textContent = sending ? labelSending : labelIdle;
  };

  form.addEventListener('input', () => setError(''));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const company = String(data.get('company') ?? '');

    if (!name || !EMAIL_RE.test(email) || !message) {
      setError(errorRequired);
      return;
    }

    setSending(true);
    try {
      const turnstileToken = await getToken().catch(() => '');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company, turnstileToken }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) throw new Error(body.error || errorGeneric);

      form.reset();
      form.hidden = true;
      success.hidden = false;
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : errorGeneric);
    } finally {
      setSending(false);
      // Tokens are single-use: get a fresh one for the next attempt.
      token = '';
      if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
    }
  });

  success.querySelector('[data-contact-reset]')?.addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    setError('');
    form.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
  });
}
