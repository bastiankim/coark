import { CtaButton } from './CtaButton';

export function Nav() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-(--z-nav) border-b border-line bg-paper">
      <div className="wrap flex h-[60px] items-center gap-8">
        <a href="/" className="hit flex items-center" aria-label="coark home"><img src="/coark-lockup.png" alt="" width={90} height={33} /></a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-6 text-sm text-muted">
            <li><a className="hit transition-colors duration-150 ease-out hover:text-ink" href="#loop">Product</a></li>
          </ul>
        </nav>
        <CtaButton href="#access" size="sm" className="ml-auto">Request access</CtaButton>
      </div>
    </header>
  );
}
