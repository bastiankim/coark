import { Assignee } from './Assignee';
import { StatusChip } from './StatusChip';

export function ReviewScene() {
  return (
    <div className="scene ba" data-scene="" data-timeline="700,1700,2900,3900" aria-hidden="true">
      <div className="panel fold">
        <div className="panel-head"><span>Results</span><span className="mono">T-0157</span></div>
        <div className="panel-body results">
          <div className="result">
            <span className="mono">r1</span>
            <span className="mono muted">scope v2 · 09:58</span>
            <p className="r-text">Full summary, every theme. Three pages.</p>
            <span className="mono muted">summaries/interviews-r1.md</span>
          </div>
          <div className="result" data-mark-at="1">
            <span className="mono">r2</span>
            <span className="mono muted">scope v3 · 10:14</span>
            <p className="r-text">One page, top five themes. Quotes in appendix.</p>
            <span className="mono muted">summaries/interviews-r2.md</span>
          </div>
        </div>
      </div>
      <div className="flow"><span>→</span></div>
      <div className="panel">
        <div className="panel-head"><span>Review</span><span className="mono">T-0157</span></div>
        <div className="panel-body">
          <div className="task-top">
            <span className="stack">
              <span className="mono muted" data-until="2">no version pinned</span>
              <span className="tag tag-strong mono" data-at="2">pinned · scope v3 · r2</span>
            </span>
            <StatusChip status="pending" />
          </div>
          <dl className="fields">
            <dt>Owner</dt><dd><Assignee handle="@agent-research" /></dd>
            <dt>Approver</dt><dd><Assignee handle="@yuhyun" /></dd>
            <dt>Source</dt><dd className="mono">docs/interview-guide.md</dd>
          </dl>
          <ol className="log mono">
            <li className="log-row" data-at="2"><span className="t">10:15</span><span className="e">review opened · scope v3 · r2</span></li>
            <li className="log-row" data-at="3"><span className="t">10:20</span><span className="e">docs/interview-guide.md edited · @mina</span></li>
          </ol>
          <div className="recheck" data-at="4">
            <span className="tag tag-strong mono">re-check scope</span>
            <span className="r-text muted">The source doc changed after this review opened. Confirm scope v3 still holds.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
