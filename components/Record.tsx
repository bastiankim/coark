import { changelog } from '@/lib/changelog';

export function Record() {
  return (
    <section id="record" aria-labelledby="record-title" className="border-t border-line py-18 md:py-32">
      <div className="wrap">
        <div className="flex items-end justify-between gap-4">
          <h2 id="record-title" className="h2">On the record</h2>
          <a href="#record" className="link-arrow">View all <span aria-hidden="true">→</span></a>
        </div>
        {/* TODO: real proof */}
        <div className="mt-10 h-12 rounded-lg border border-dashed border-line" aria-hidden="true" />
        {/* placeholder: lib/changelog.ts holds example entries */}
        <ol className="mt-10 border-t border-ink">
          {changelog.map((e) => (
            <li key={e.version} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1 border-b border-line py-4 text-[15px] md:grid-cols-[112px_72px_200px_1fr] md:gap-4">
              <span className="mono text-muted">{e.date}</span>
              <span className="mono text-muted">{e.version}</span>
              <span className="col-span-full font-medium md:col-span-1">{e.title}</span>
              <span className="col-span-full text-muted md:col-span-1">{e.description}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
