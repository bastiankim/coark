import { Assignee } from './Assignee';
import { StatusChip } from './StatusChip';

export function WorkScene() {
  return (
    <div className="scene ba" data-scene="" data-timeline="700,1600,2500,3500,4800" aria-hidden="true">
      <div className="panel">
        <div className="panel-head"><span>Task</span><span className="mono">T-0157</span></div>
        <div className="panel-body">
          <div className="task-top">
            <span className="mono task-id">scope v3</span>
            <span className="stack chip-end">
              <span data-until="1"><span className="tag mono">ready</span></span>
              <span data-at="1"><StatusChip status="running" /></span>
            </span>
          </div>
          <div>
            <p className="task-title">Summarize customer interviews</p>
            <p className="task-goal">One page, top five themes; quotes in appendix.</p>
          </div>
          <dl className="fields">
            <dt>Owner</dt>
            <dd className="stack">
              <span className="mono muted" data-until="1">unassigned</span>
              <span data-at="1"><Assignee handle="@agent-research" /></span>
            </dd>
            <dt>Approver</dt><dd><Assignee handle="@yuhyun" /></dd>
            <dt>Inputs</dt><dd className="mono">goal · instructions · docs/interview-guide.md</dd>
            <dt>Runs</dt>
            <dd className="runs">
              <span className="stack">
                <span className="mono muted" data-until="1">no active run</span>
                <span className="tag mono" data-at="1">run #1 · active</span>
              </span>
              <span className="tag tag-strong mono" data-at="5">run #2 · blocked · run in progress</span>
            </dd>
          </dl>
        </div>
      </div>
      <div className="flow"><span>→</span></div>
      <div className="panel fold">
        <div className="panel-head"><span>Run log</span><span className="mono">run #1</span></div>
        <div className="panel-body">
          <ol className="log mono">
            <li className="log-row" data-at="1"><span className="t">10:06</span><span className="e">run #1 started · scope v3 · @agent-research</span></li>
            <li className="log-row" data-at="2"><span className="t">10:06</span><span className="e">read docs/interview-guide.md</span></li>
            <li className="log-row" data-at="3"><span className="t">10:07</span><span className="e">read interviews/ · 12 files</span></li>
            <li className="log-row" data-at="4"><span className="t">10:11</span><span className="e">write summaries/interviews-r2.md</span></li>
            <li className="log-row" data-at="5"><span className="t">10:12</span><span className="e">run #2 requested · @dana<br /><span className="tag tag-strong blocked">blocked · run in progress</span></span></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
