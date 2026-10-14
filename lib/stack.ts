export type StackRow = { area: string; stack: string[]; note: string };

export const stack: StackRow[] = [
  { area: 'Frontend', stack: ['React', 'Next.js App Router'], note: 'Runs and builds with vinext on Vite.' },
  { area: 'UI', stack: ['Radix Themes', 'Tailwind CSS v4'], note: 'Accessible primitives, utility styling.' },
  { area: 'Backend', stack: ['Hono'], note: 'Deployed on Cloudflare Workers.' },
];
