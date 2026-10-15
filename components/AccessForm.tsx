'use client';

import { Button, TextField } from '@radix-ui/themes';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

type State = { step: 'idle' } | { step: 'form' } | { step: 'sending' } | { step: 'done' } | { step: 'error'; message: string };

// Request access: the two CTA buttons open an inline form in the same row (no layout shift),
// which posts to the Hono route POST /api/access.
export function AccessForm() {
  const [state, setState] = useState<State>({ step: 'idle' });
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  // Hero and nav buttons link to #access; arriving there opens the form.
  useEffect(() => {
    const open = () => { if (location.hash === '#access') setState((s) => (s.step === 'idle' ? { step: 'form' } : s)); };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);

  useEffect(() => { if (state.step === 'form') input.current?.focus({ preventScroll: true }); }, [state.step]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    setState({ step: 'sending' });
    try {
      const res = await fetch('/api/access', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) return setState({ step: 'error', message: data.error ?? 'Something went wrong. Try again.' });
      setState({ step: 'done' });
    } catch {
      setState({ step: 'error', message: 'Couldn’t reach the server. Check your connection and try again.' });
    }
  }

  const showForm = state.step !== 'idle' && state.step !== 'done';

  return (
    <div className="mt-10 flex w-full max-w-[520px] flex-col items-center gap-3">
      <div className="flex min-h-11 w-full flex-wrap items-center justify-center gap-3">
        {state.step === 'idle' && (
          <>
            <Button radius="full" className="btn btn-solid" onClick={() => setState({ step: 'form' })}>Request access</Button>
          </>
        )}
        {showForm && (
          <form onSubmit={submit} className="flex w-full flex-wrap items-center justify-center gap-3" noValidate={false}>
            <label htmlFor={id} className="sr-only">Work email</label>
            <TextField.Root ref={input} id={id} name="email" type="email" required autoComplete="email"
              placeholder="you@company.com" size="3" radius="full" className="access-field min-w-0 flex-1 basis-56" />
            <Button type="submit" radius="full" className="btn btn-solid" disabled={state.step === 'sending'}>
              {state.step === 'sending' ? 'Sending…' : 'Request access'}
            </Button>
          </form>
        )}
        {state.step === 'done' && <p className="text-[15px]">You’re on the list. We’ll email you when a spot opens.</p>}
      </div>
      <p className="min-h-6 text-sm text-muted" role="status" aria-live="polite">
        {state.step === 'error' ? state.message : ''}
      </p>
    </div>
  );
}
