import { Hono } from 'hono';

type KV = { put(key: string, value: string): Promise<void> };
type Bindings = { ACCESS_REQUESTS?: KV };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// All /api/* traffic. Mounted by app/api/[[...route]]/route.ts, runs inside the Worker.
export const api = new Hono<{ Bindings: Bindings }>().basePath('/api');

api.get('/health', (c) => c.json({ ok: true }));

api.post('/access', async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Send a JSON body with an email field.' }, 400);
  }
  const email = String((body as { email?: unknown })?.email ?? '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) {
    return c.json({ error: 'Enter a valid email address, like you@company.com.' }, 400);
  }
  const kv = c.env?.ACCESS_REQUESTS;
  if (!kv) return c.json({ error: 'Access requests are not set up on this server yet.' }, 503);
  await kv.put(`access:${email}`, JSON.stringify({ email, requestedAt: new Date().toISOString() }));
  return c.json({ ok: true }, 202);
});

api.notFound((c) => c.json({ error: `No API route at ${c.req.path}.` }, 404));
