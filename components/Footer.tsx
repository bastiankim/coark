export function Footer() {
  return (
    <footer className="border-t border-line pt-10 pb-[calc(56px+env(safe-area-inset-bottom))]">
      <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="text-[17px] font-medium tracking-[-0.02em]">coark</span>
        <ul className="flex gap-6 text-sm text-muted">
          <li><a className="hit transition-colors duration-150 ease-out hover:text-ink" href="#loop">Product</a></li>
          <li><a className="hit transition-colors duration-150 ease-out hover:text-ink" href="#record">Changelog</a></li>
          <li><a className="hit transition-colors duration-150 ease-out hover:text-ink" href="#docs">Docs</a></li>
        </ul>
        <span className="ml-auto text-[13px] text-muted">© 2026 coark</span>
      </div>
    </footer>
  );
}
