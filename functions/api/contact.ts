// Cloudflare Pages Function: POST /api/contact
// Validates the form, verifies Cloudflare Turnstile, and emails the message via Resend.
//
// Environment variables (Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY        (secret)  Resend API key
//   TURNSTILE_SECRET_KEY  (secret)  Turnstile secret key
//   CONTACT_TO_EMAIL      (secret)  inbox that receives messages
//   CONTACT_FROM_EMAIL    (optional) sender, e.g. "Portfolio <contact@yourdomain.com>".
//                                    Must be on a domain verified in Resend.
//                                    Defaults to Resend's test sender, which can only deliver
//                                    to the email address of your own Resend account.

interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const LIMITS = { name: 200, email: 320, message: 5000 };

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const fail = (error: string, status = 400) => json({ ok: false, error }, status);

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

// Anything other than POST is rejected.
export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY || !env.CONTACT_TO_EMAIL) {
    console.error('Contact form is missing RESEND_API_KEY, TURNSTILE_SECRET_KEY or CONTACT_TO_EMAIL');
    return fail('The contact form isn’t available right now — please try again later.', 500);
  }

  const type = request.headers.get('Content-Type') ?? '';
  let raw: Record<string, unknown>;
  try {
    if (type.includes('application/json')) {
      raw = (await request.json()) as Record<string, unknown>;
    } else {
      raw = Object.fromEntries((await request.formData()).entries());
      raw.turnstileToken ??= raw['cf-turnstile-response'];
    }
  } catch {
    return fail('Invalid request.');
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(raw.name);
  const email = str(raw.email);
  const message = str(raw.message);
  const company = str(raw.company); // honeypot
  const turnstileToken = str(raw.turnstileToken);

  // Bots that fill the hidden field get a fake success.
  if (company) return json({ ok: true });

  if (!name || !email || !message || !EMAIL_RE.test(email)) return fail('Please fill in all fields.');
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return fail('Your message is too long.');
  }
  if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) return fail('Please check your name and email.');

  if (!turnstileToken) return fail('Please complete the spam check and try again.');
  const human = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
  if (!human) return fail('Spam check failed — please try again.', 403);

  const from = env.CONTACT_FROM_EMAIL || 'Portfolio contact form <onboarding@resend.dev>';
  const text = `New message from your website\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0e3a44">
<p style="margin:0 0 16px;color:#8aa0a2;font-size:13px">New message from your website</p>
<p style="margin:0"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
<p style="margin:16px 0 0;white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: env.CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
      reply_to: email,
      subject: `Website message from ${name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''));
    return fail('Something went wrong sending your message — please try again in a moment.', 502);
  }

  return json({ ok: true });
};
