// placeholder: example entries only. Replace with real releases.
export type ChangelogEntry = { date: string; version: string; title: string; description: string };

export const changelog: ChangelogEntry[] = [
  { date: '2026-10-08', version: 'v0.6.0', title: 'Decision stamps', description: 'Record any thread message as a scope decision.' },
  { date: '2026-09-24', version: 'v0.5.2', title: 'Re-check flags', description: 'Editing a source doc flags every review that cites it.' },
  { date: '2026-09-10', version: 'v0.5.0', title: 'Run locks', description: 'One active run per task; a second run waits.' },
  { date: '2026-08-27', version: 'v0.4.0', title: 'Handoff cards', description: 'The next owner gets the result, decisions, and docs.' },
];
