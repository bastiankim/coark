export type Status = 'running' | 'pending' | 'approved' | 'changes';

const LABEL: Record<Status, string> = {
  running: 'running',
  pending: 'pending review',
  approved: 'approved',
  changes: 'changes requested',
};

// The only place status colors appear. Color is never the sole cue: the Mono label is always present.
export function StatusChip({ status }: { status: Status }) {
  return (
    <span className={`chip mono chip-${status}`}>
      <span className="dot" aria-hidden="true" />
      {LABEL[status]}
    </span>
  );
}
