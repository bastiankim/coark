import { VisuallyHidden } from '@radix-ui/themes';
import type { ReactNode } from 'react';

// One grammar, used four times (§3-D): title | body + link, full-width scene, three sub-features.
export function LoopSection({ id, title, body, caption, features, children }: {
  id: string;
  title: [string, string];
  body: string;
  caption: string;
  features: [string, string][];
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-18 md:py-32">
      <div className="wrap">
        <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2 md:gap-8">
          <h2 id={`${id}-title`} className="h2">{title[0]}<br />{title[1]}</h2>
          <p className="body max-w-[46ch]">{body}</p>
        </div>
        <figure className="mt-10 md:mt-16">
          <VisuallyHidden asChild><figcaption>{caption}</figcaption></VisuallyHidden>
          {children}
        </figure>
        <ul className="mt-8 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3 md:gap-8">
          {features.map(([t, d]) => (
            <li key={t} className="flex flex-col gap-1 border-t border-line pt-4 text-[15px] leading-normal">
              <span className="font-medium">{t}</span>
              <span className="text-muted">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
