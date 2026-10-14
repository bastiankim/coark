import { Assignee } from './Assignee';
import { StatusChip } from './StatusChip';

export function HandoffScene() {
  return (
    <div className="scene ba" data-scene="" data-timeline="700,1600,2500,3300" aria-hidden="true">
      <div className="panel fold">
        <div className="panel-head"><span>Result</span><span className="mono">T-0157 · r2</span></div>
        <div className="panel-body">
          <div className="task-top"><span className="mono task-id">scope v3 · r2</span><StatusChip status="approved" /></div>
          <p className="task-title">Summarize customer interviews</p>
          <p className="task-goal">One page, top five themes. Quotes in appendix.</p>
          <dl className="fields">
            <dt>Done by</dt><dd><Assignee handle="@agent-research" /></dd>
            <dt>Approved</dt><dd><Assignee handle="@yuhyun" /></dd>
            <dt>File</dt><dd className="mono">summaries/interviews-r2.md</dd>
          </dl>
          <span className="mono trace">approved · scope v3 · r2 · @yuhyun · 10:31</span>
        </div>
      </div>
      <div className="flow"><span>→</span></div>
      <div className="panel">
        <div className="panel-head"><span>Next task</span><span className="mono">T-0161</span></div>
        <div className="panel-body">
          <p className="task-title">Draft the Q4 roadmap memo</p>
          <div className="cands">
            <span className="muted text-[13px]">Next owner</span>
            {/* Two candidates, one person and one agent, rendered identically. */}
            <div className="cand"><Assignee handle="@dana" /></div>
            <div className="cand" data-mark-at="1"><Assignee handle="@agent-memo" /></div>
          </div>
          <dl className="fields">
            <dt data-at="2">Result</dt><dd data-at="2"><span className="tag mono">T-0157 · r2 · approved</span></dd>
            <dt data-at="3">Decision</dt><dd data-at="3"><span className="tag mono">scope v3 · @bastian · 10:05</span></dd>
            <dt data-at="4">Docs</dt>
            <dd data-at="4" className="docs"><span className="tag mono">docs/interview-guide.md</span><span className="tag mono">summaries/interviews-r2.md</span></dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
