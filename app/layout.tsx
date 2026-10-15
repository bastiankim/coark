import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Theme } from '@radix-ui/themes';
import { SceneEngine } from '@/components/SceneEngine';
import './globals.css';

export const metadata: Metadata = {
  title: 'coark — the work record for people and agents',
  description: 'Decide the scope. Anyone can do the work. Everything stays on the record.',
  icons: { icon: { url: '/logo.svg', type: 'image/svg+xml' } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
};

// Runs before first paint: flags motion so scenes start at step 0 instead of flashing their final state.
const MOTION_FLAG = `(function(){if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+KR:wght@400;500&family=Geist:wght@400;500&display=swap" />
      </head>
      <body>
        <Script id="motion-flag" strategy="beforeInteractive">{MOTION_FLAG}</Script>
        {/* Dark only. Radix supplies primitives; globals.css maps its palette onto the coark tokens. */}
        <Theme appearance="dark" accentColor="gray" grayColor="sand" radius="full" panelBackground="solid" hasBackground={false}>
          <a className="skip" href="#main">Skip to content</a>
          {children}
          <SceneEngine />
        </Theme>
      </body>
    </html>
  );
}
