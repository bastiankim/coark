import { Button } from '@radix-ui/themes';
import type { ReactNode } from 'react';

// Radix Button as the primitive (focus, semantics), with the coark pill skin on top.
export function CtaButton({ href, variant = 'solid', size = 'md', className = '', children }: {
  href: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button asChild radius="full" className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`}>
      <a href={href}>{children}</a>
    </Button>
  );
}
