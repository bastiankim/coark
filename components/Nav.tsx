import { CtaButton } from './CtaButton';

export function Nav() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-(--z-nav) border-b border-line bg-paper">
      <div className="wrap flex h-[60px] items-center gap-8">
        <a href="/" className="hit text-[19px] font-medium tracking-[-0.02em]" aria-label="coark home">coark</a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-6 text-sm text-muted">
            <li><a className="hit transition-colors duration-150 ease-out hover:text-ink" href="#loop">Product</a></li>
            <li><a className="hit transition-colors duration-150 ease-out hover:text-ink" href="#record">Changelog</a></li>
            <li><a className="hit transition-colors duration-150 ease-out hover:text-ink" href="#docs">Docs</a></li>
          </ul>
        </nav>
        <CtaButton href="#access" size="sm" className="ml-auto">Request access</CtaButton>
      </div>
    </header>
  );
}
