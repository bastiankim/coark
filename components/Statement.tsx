import { FIGURES } from './figures.generated';

const figs = [
  {
    label: 'FIG 0.1',
    title: 'Scope is the source of truth',
    body: 'Conversations and docs don’t move the scope. Decisions do, and they leave a trace.',
    aria: 'Isometric view: a solid scope slab extended by two stepped increments, each tied by a dashed trace to a decision pin. Thin docs and message tiles float nearby without touching it.',
  },
  {
    label: 'FIG 0.2',
    title: 'Every step has an owner',
    body: 'Who decided, who did it, who approved it. Always traceable.',
    aria: 'Isometric view: three blocks rising like stairs from front to back, each topped by an owner token. One unbroken dashed line runs from the ground through all three tokens and back to the ground.',
  },
  {
    label: 'FIG 0.3',
    title: 'People and agents, same frame',
    body: 'Both take tasks, submit results, and get reviewed.',
    aria: 'Isometric view: one tray with two identical lanes, a cylinder for a person and a dot-grid cube for an agent, each taking a task sheet and putting out a result sheet, both passing through one shared review gate.',
  },
];

export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="border-t border-line py-18 md:py-32">
      <div className="wrap">
        <h2 id="statement-title" className="statement-text max-w-[26ch]">
          <span className="text-ink">Scope is the contract.</span>{' '}
          <span className="text-muted">Conversations move fast, but nothing changes the work until someone decides it, and every decision, run, review, and handoff stays on the record.</span>
        </h2>

        <div className="figs mt-14 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {figs.map((f, i) => (
            <figure key={f.label} className="fig flex flex-col gap-5">
              {/* Generated isometric drawing (scripts/figs.mjs). Plays once in view; loops pause off-screen. */}
              <svg viewBox="0 0 240 240" data-scene="" data-timeline="0" data-loop="" role="img" aria-label={f.aria}
                dangerouslySetInnerHTML={{ __html: FIGURES[i] }} />
              <figcaption className="flex flex-col gap-1.5 text-[15px] leading-normal">
                <span className="mono text-muted">{f.label}</span>
                <span className="text-base font-medium">{f.title}</span>
                <span className="text-muted">{f.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
