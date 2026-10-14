import { VisuallyHidden } from '@radix-ui/themes';
import { Assignee } from './Assignee';
import { StatusChip } from './StatusChip';
import { CtaButton } from './CtaButton';

// Hero loop state machine — one pass, ~12s, then holds the final state.
// s1 msg (general) · s2 msg (general) + "Record as decision" · s3 decision → scope v2→v3
// s4 agent picks up, running · s5–s6 run log · s7 r2 submitted, review bound to scope v3·r2
// s8 approved by a different person · s9 handoff with context
const TIMELINE = '1000,2200,3700,5100,6100,7100,8500,10000,11500';

const activity: [string, string, number?][] = [
  ['13:02', 'created · @bastian'],
  ['13:09', 'r1 submitted · scope v2 · @agent-copy'],
  ['13:12', 'changes requested · r1 · @yuhyun'],
  ['13:20', 'scope v2 → v3 · @bastian', 3],
  ['13:21', 'run started · scope v3 · @agent-copy', 4],
  ['13:21', 'read docs/brand-voice.md', 5],
  ['13:24', 'write copy/landing-r2.md', 6],
  ['13:26', 'r2 submitted · review: scope v3 · r2', 7],
  ['13:31', 'approved · scope v3 · r2 · @yuhyun', 8],
  ['13:31', 'handed off → @mina · T-0143', 9],
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-(image:--hero-gradient) pt-14 pb-18 md:pt-24 md:pb-32">
      <div className="wrap">
        <h1 id="hero-title" className="h1 max-w-[20ch]">
          The work record for teams <br className="hidden md:inline" />of people and agents
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="body">Decide the scope. Anyone can do the work. Everything stays on the record.</p>
          {/* placeholder: replace with the real latest release */}
          <a href="#record" className="hit inline-flex h-[30px] items-center gap-2 rounded-full border border-line bg-surface pr-3 pl-1 text-[13px] transition-[border-color] duration-150 ease-out hover:border-ink">
            <span className="inline-flex h-[22px] items-center rounded-full bg-ink px-2 text-xs font-medium text-paper">New</span>
            <span>Decision stamps in threads</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <CtaButton href="#access" className="mt-8">Request access</CtaButton>
      </div>

      <figure className="wrap mt-12 md:mt-18">
        <VisuallyHidden asChild>
          <figcaption>
            Product scene. In a thread, two ordinary messages are posted and the task card does not change.
            @bastian records one message as a decision; the task scope moves from v2 to v3 and the change is logged.
            @agent-copy picks up task T-0142 and runs; the log records the files it reads and writes.
            Result r2 is submitted and its review is bound to scope v3 and r2.
            @yuhyun, a different person from the task owner, approves it, and the task is handed off to @mina
            with the approved result, the decision, and the reference doc.
          </figcaption>
        </VisuallyHidden>

        <div className="scene hero-scene" data-scene="" data-timeline={TIMELINE} aria-hidden="true">
          {/* Conversation */}
          <div className="panel fold">
            <div className="panel-head"><span>Thread</span><span className="mono">#landing-copy</span></div>
            <div className="panel-body">
              <div className="msg">
                <div className="msg-meta"><Assignee handle="@yuhyun" /><span className="mono time">13:12</span></div>
                <p className="msg-text">r1 reads well, but pricing in the hero feels early.</p>
              </div>
              <div className="msg" data-at="1">
                <div className="msg-meta"><Assignee handle="@mina" /><span className="mono time">13:15</span></div>
                <p className="msg-text">Agreed. Could we link to the pricing page instead?</p>
              </div>
              <div className="msg" data-at="2">
                <div className="msg-meta"><Assignee handle="@bastian" /><span className="mono time">13:18</span></div>
                <p className="msg-text">Yes. Drop pricing from the hero and link to /pricing.</p>
                <div className="msg-foot stack">
                  <span data-until="3"><span className="ghost-action">Record as decision</span></span>
                  <span data-at="3"><span className="stamp mono">decision · scope v3 · @bastian · 13:20</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Task */}
          <div className="col-task">
            <div className="task-card">
              <div className="task-top">
                <span className="mono task-id">T-0142</span>
                <span className="stack chip-stack">
                  <span data-until="4"><StatusChip status="changes" /></span>
                  <span data-at="4" data-until="7"><StatusChip status="running" /></span>
                  <span data-at="7" data-until="8"><StatusChip status="pending" /></span>
                  <span data-at="8"><StatusChip status="approved" /></span>
                </span>
              </div>
              <div>
                <p className="task-title">Finalize landing page copy</p>
                <p className="task-goal">US-English copy for the hero, four loop sections, and the final CTA.</p>
              </div>
              <div className="scope">
                <div className="scope-head stack">
                  <span className="mono" data-until="3">scope v2</span>
                  <span className="mono" data-at="3">scope v3 · was v2</span>
                </div>
                <div className="scope-line"><span className="mark" /><span>Hero, four sections, final CTA</span></div>
                <div className="stack">
                  <div data-until="3">
                    <div className="scope-line"><span className="mark" /><span>Pricing line in the hero</span></div>
                    <div className="scope-line"><span className="mark" /><span>{' '}</span></div>
                  </div>
                  <div data-at="3">
                    <div className="scope-line del"><span className="mark">−</span><span>Pricing line in the hero</span></div>
                    <div className="scope-line"><span className="mark">+</span><span>No pricing in the hero; link to /pricing</span></div>
                  </div>
                </div>
                <div className="stack">
                  <span className="mono trace" data-until="3">unchanged by 2 messages</span>
                  <span className="mono trace" data-at="3">changed by @bastian · 13:20 · v2 kept</span>
                </div>
              </div>
              <dl className="fields">
                <dt>Owner</dt><dd><Assignee handle="@agent-copy" /></dd>
                <dt>Approver</dt><dd><Assignee handle="@yuhyun" /></dd>
                <dt>Results</dt>
                <dd className="row-tags">
                  <span className="tag mono">r1 · scope v2</span>
                  <span className="tag mono" data-at="7" data-mark-at="7">r2 · scope v3</span>
                </dd>
                <dt>Review</dt>
                <dd className="stack">
                  <span className="mono" data-until="7">r1 · changes requested · @yuhyun</span>
                  <span className="mono" data-at="7" data-until="8">bound to scope v3 · r2</span>
                  <span className="mono" data-at="8">scope v3 · r2 · approved · @yuhyun</span>
                </dd>
              </dl>
            </div>

            <div className="task-card handoff" data-at="9">
              <div className="task-top">
                <span className="handoff-to"><span className="muted">Handed off to</span> <Assignee handle="@mina" /></span>
                <span className="mono task-id">T-0143</span>
              </div>
              <p className="task-title">Lay out the landing page</p>
              <div className="row-tags">
                <span className="tag mono">T-0142 · r2 · approved</span>
                <span className="tag mono">decision · scope v3</span>
                <span className="tag mono">docs/brand-voice.md</span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="panel fold">
            <div className="panel-head"><span>Activity</span><span className="mono">T-0142</span></div>
            <div className="panel-body">
              <ol className="log mono">
                {activity.map(([t, e, at], i) => (
                  <li key={i} className="log-row" data-at={at}>
                    <span className="t">{t}</span><span className="e">{e}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </figure>
    </section>
  );
}
