import { Fragment } from 'react';
import { stack } from '@/lib/stack';

// Docs anchor: the stack coark is built on. Same ledger grammar as Record (ink rule on top, line between rows).
export function Stack() {
  return (
    <section id="docs" aria-labelledby="docs-title" className="border-t border-line py-18 md:py-32">
      <div className="wrap">
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 md:gap-8">
          <h2 id="docs-title" className="h2">How it’s built</h2>
          <p className="body max-w-[46ch]">The coark app runs on a small, standard web stack.</p>
        </div>
        <table className="mt-10 block w-full border-collapse border-t border-ink text-[15px] md:table">
          <caption className="sr-only">coark technology stack by area</caption>
          <thead className="sr-only">
            <tr><th scope="col">Area</th><th scope="col">Stack</th><th scope="col">Notes</th></tr>
          </thead>
          <tbody className="block md:table-row-group">
            {stack.map(({ area, stack: tech, note }) => (
              <tr key={area} className="block border-b border-line py-3.5 md:table-row md:py-0">
                <th scope="row" className="block p-0 text-left font-normal text-muted md:table-cell md:w-[200px] md:py-4 md:pr-4">{area}</th>
                <td className="mt-1 block p-0 font-medium md:mt-0 md:table-cell md:w-[380px] md:py-4 md:pr-4">
                  {tech.map((s, i) => (
                    <Fragment key={s}>{i > 0 && <span className="font-normal text-muted" aria-hidden="true"> + </span>}<span>{s}</span></Fragment>
                  ))}
                </td>
                <td className="mt-0.5 block p-0 text-muted md:mt-0 md:table-cell md:py-4">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
