import { AccessForm } from './AccessForm';

// The only centered section on the page.
export function FinalCTA() {
  return (
    <section id="access" aria-labelledby="cta-title" className="border-t border-line bg-(image:--hero-gradient) py-24 md:py-40">
      <div className="wrap flex flex-col items-center text-center">
        <h2 id="cta-title" className="cta-title">Decide once.<br />Keep the record.</h2>
        <AccessForm />
      </div>
    </section>
  );
}
