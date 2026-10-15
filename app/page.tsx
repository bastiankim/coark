import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Statement } from '@/components/Statement';
import { LoopSection } from '@/components/LoopSection';
import { ScopeScene } from '@/components/ScopeScene';
import { WorkScene } from '@/components/WorkScene';
import { ReviewScene } from '@/components/ReviewScene';
import { HandoffScene } from '@/components/HandoffScene';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <div id="loop">
          <LoopSection
            id="scope"
            title={['Decide', 'the scope']}
            body="Talk as much as you need. The scope only moves when someone records a decision, and every version keeps who changed it and what it replaced."
            caption="Before: two thread messages arrive and the task scope stays at v2. After: @bastian records one message as a decision, and the task scope becomes v3 with a diff, the person who changed it, and v2 kept in history."
            features={[
              ['Decisions, not messages', 'Only a recorded decision changes a task’s scope.'],
              ['Versioned scope', 'Every change keeps its author and the version before it.'],
              ['Done, defined', 'Each task states its goal and what counts as complete.'],
            ]}
          ><ScopeScene /></LoopSection>
          <LoopSection
            id="work"
            title={['Anyone', 'can do the work']}
            body="A confirmed task goes to one owner, a person or an agent. Agents take the goal, instructions, and docs, and return logs and results. One task never runs twice at once."
            caption="Before: task T-0157 at scope v3 is unassigned. After: @agent-research takes it, the run log records the files it reads and writes, and a second run requested by @dana is blocked because a run is in progress."
            features={[
              ['One owner per task', 'People and agents take tasks the same way.'],
              ['One run at a time', 'A second run waits until the first one finishes.'],
              ['Logs on the record', 'Commands, files, and output stay with the task.'],
            ]}
          ><WorkScene /></LoopSection>
          <LoopSection
            id="review"
            title={['Review', 'the exact version']}
            body="A review is pinned to one scope version and one result version. If a source doc changes underneath it, the review asks for a re-check instead of passing silently."
            caption="Before: results r1 and r2 sit side by side. After: the review is pinned to scope v3 and r2; when @mina edits the source doc, the review shows a re-check scope flag."
            features={[
              ['Pinned versions', 'Approval applies to one scope and one result.'],
              ['A separate approver', 'Whoever does the work isn’t the one who signs off.'],
              ['Doc change flags', 'Edit a source doc and linked reviews ask for a re-check.'],
            ]}
          ><ReviewScene /></LoopSection>
          <LoopSection
            id="handoff"
            title={['Hand off', 'with context']}
            body="An approved result moves to the next owner with everything behind it: the result, the decisions that shaped it, and the docs it relied on."
            caption="Before: result r2 of T-0157 is approved by @yuhyun. After: the next task T-0161 goes to a new owner, chosen from a person and an agent shown the same way, and arrives with the approved result, the scope decision, and the reference docs."
            features={[
              ['Context travels', 'The next owner gets the result, decisions, and docs.'],
              ['Same card for everyone', 'A handoff to a person looks like a handoff to an agent.'],
              ['A full trail', 'Trace any result back to the decision behind it.'],
            ]}
          ><HandoffScene /></LoopSection>
        </div>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
