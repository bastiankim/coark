import { Assignee } from './Assignee';

export function ScopeScene() {
  return (
    <div className="scene ba" data-scene="" data-timeline="700,1700,2900,3900" aria-hidden="true">
      <div className="panel fold">
        <div className="panel-head"><span>Thread</span><span className="mono">#interview-summary</span></div>
        <div className="panel-body">
          <div className="msg">
            <div className="msg-meta"><Assignee handle="@mina" /><span className="mono time">10:02</span></div>
            <p className="msg-text">Can we keep the summary to one page?</p>
          </div>
          <div className="msg" data-at="1">
            <div className="msg-meta"><Assignee handle="@dana" /><span className="mono time">10:03</span></div>
            <p className="msg-text">Maybe just the top themes? Not sure how many.</p>
          </div>
          <div className="msg" data-at="2">
            <div className="msg-meta"><Assignee handle="@bastian" /><span className="mono time">10:04</span></div>
            <p className="msg-text">One page, top five themes. Quotes go in the appendix.</p>
            <div className="msg-foot stack">
              <span data-until="3"><span className="ghost-action">Record as decision</span></span>
              <span data-at="3"><span className="stamp mono">decision · scope v3 · @bastian · 10:05</span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="flow"><span>→</span></div>
      <div className="panel">
        <div className="panel-head"><span>Task</span><span className="mono">T-0157</span></div>
        <div className="panel-body">
          <div>
            <p className="task-title">Summarize customer interviews</p>
            <p className="task-goal">A brief the roadmap meeting can read in five minutes.</p>
          </div>
          <div className="scope">
            <div className="scope-head stack">
              <span className="mono" data-until="4">scope v2</span>
              <span className="mono" data-at="4">scope v3 · was v2</span>
            </div>
            <div className="scope-line"><span className="mark" /><span>12 interviews, US customers</span></div>
            <div className="stack">
              <div data-until="4">
                <div className="scope-line"><span className="mark" /><span>Full summary, every theme</span></div>
                <div className="scope-line"><span className="mark" /><span>{' '}</span></div>
              </div>
              <div data-at="4">
                <div className="scope-line del"><span className="mark">−</span><span>Full summary, every theme</span></div>
                <div className="scope-line"><span className="mark">+</span><span>One page, top five themes; quotes in appendix</span></div>
              </div>
            </div>
            <div className="stack">
              <span className="mono trace" data-until="4">unchanged by messages</span>
              <span className="mono trace" data-at="4">changed by @bastian · 10:05 · from decision</span>
            </div>
          </div>
          <ol className="log mono">
            <li className="log-row"><span className="t">v1</span><span className="e">09:40 · @bastian</span></li>
            <li className="log-row"><span className="t">v2</span><span className="e">09:52 · @mina</span></li>
            <li className="log-row" data-at="4"><span className="t">v3</span><span className="e">10:05 · @bastian · v2 kept</span></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
