// The ONLY way a person or an agent is rendered (§3-F, Pass #4).
// No prop distinguishes humans from agents; the handle text is the only cue.
export function Assignee({ handle }: { handle: string }) {
  const initial = handle.replace(/^@/, '').charAt(0).toUpperCase();
  return (
    <span className="assignee">
      <span className="avatar mono" aria-hidden="true">{initial}</span>
      <span className="mono">{handle}</span>
    </span>
  );
}
