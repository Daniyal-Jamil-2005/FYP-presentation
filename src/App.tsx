import type { ReactNode } from 'react';
import PhoenixMark from './components/PhoenixMark';
import PageShell from './components/PageShell';
import FlowDiagram from './components/FlowDiagram';
import MemberTable from './components/MemberTable';
import Gantt, { GANTT_P1, GANTT_P2 } from './components/Gantt';
import { Kicker, Stat } from './components/ui';
import universityLogo from './imports/university-logo.png';

const NAV = [
  ['clo', 'CLO Mapping'],
  ['abstract', 'Abstract'],
  ['objectives', 'Objectives'],
  ['deliverables', 'Deliverables'],
  ['scope', 'Scope'],
  ['methodology', 'Methodology'],
  ['resources', 'Resources'],
  ['gantt', 'Gantt'],
];

const CLO: [string, string, string, string][] = [
  ['CLO1', 'PLO3 · Problem Analysis', 'Analyze the given problem to propose a computing-based solution.', 'Analysis of manual, fragmented pentest workflows that motivate an automated swarm'],
  ['CLO2', 'PLO4 · Design & Development', 'Design and develop computing solutions to complex computing problems.', 'Design of the multi-agent architecture and DynamoDB shared-memory graph'],
  ['CLO3', 'PLO5 · Modern Tool Usage', 'Demonstrate the ability to use modern tools to solve the given problem.', 'AWS Bedrock, DynamoDB, Nmap, Nuclei, NVD/OSV and LLM tool-calling'],
  ['CLO4', 'PLO6 · Individual & Team Work', 'Demonstrate the ability to work effectively as an individual and a team member.', 'Three-member team with divided agent ownership and integration'],
  ['CLO5', 'PLO10 · Life Long Learning', 'Understand the significance of broader aspects of innovation, potential legal implications, and development.', 'Authorization, PECA/legal and ethical considerations of autonomous testing'],
  ['CLO6', 'PLO7 · Communication', 'Demonstrate effective skills in verbal and written communication during presentations, discussions, and reports.', 'Proposal document, defense presentation and automated vulnerability reports'],
];

const TOOLS: [string, string][] = [
  ['Orchestration', 'Amazon Bedrock — multi-agent collaboration'],
  ['Shared state', 'Amazon DynamoDB — adjacency-list graph'],
  ['Reconnaissance', 'Nmap · httpx · Wappalyzer · katana'],
  ['Recon APIs', 'Shodan (free tier)'],
  ['Vulnerability mapping', 'NVD · OSV CVE databases'],
  ['Attack execution', 'Nuclei · SQLmap · sandboxed Python'],
  ['Hosting / compute', 'AWS EC2 — vulnerable target lab'],
  ['Plagiarism screening', 'Turnitin'],
];

const RISKS: [string, string][] = [
  ['Targets must only be tested in a controlled, approved environment', 'All testing is limited to predetermined, authorized targets in a contained lab.'],
  ['Automated recon + CVE correlation can produce false positives', 'Agent 4 (Validation) runs differential baseline checks before anything is reported.'],
  ['Improper use of AWS credits can overrun the budget', 'Intensive tasks are scheduled and rate-limited by the Coordinator.'],
  ['External APIs may go down or rate-limit and stall the pipeline', 'Intermediate results are cached in DynamoDB with fallbacks.'],
];

const TEAM: [string, string][] = [
  ['Aymal Ahmed', 'Cybersecurity — reconnaissance, vulnerability assessment, exploitation methodology'],
  ['Daniyal Jamil', 'AWS project experience — cloud architecture and Bedrock/DynamoDB integration'],
  ['Muaaz Nazeer', 'Software engineering — development, integration and evaluation'],
];

const TECHNIQUES: [string, string][] = [
  ['LLM tool-calling', 'Function-calling as the interface between each agent’s reasoning loop and its security tools — not hard-coded scripts.'],
  ['Retrieval-Augmented Generation', 'Grounds agent decisions in a knowledge base of known vulnerability patterns, reducing invalid payloads.'],
  ['CPE → CVE matching', 'Version-based vulnerability identification against NVD / OSV with a confidence score per match.'],
  ['Security tooling', 'Nmap, Shodan, Wappalyzer, Nuclei and SQLmap driven through the agents.'],
  ['Differential validation', 'Baseline and logic-proof probes increase confidence that findings are true positives.'],
  ['Rate-limiting & locks', 'Coordinator prevents agents from flooding the target or issuing colliding attacks.'],
];

/** Full-width, high-impact bullet list: no boxes — a clean hairline between
 *  each row, an oversized diamond, and large readable type. */
function ImpactList({
  items,
  dark = false,
  className = '',
}: {
  items: ReactNode[];
  dark?: boolean;
  className?: string;
}) {
  const line = dark ? 'border-bone/15' : 'border-midnight/15';
  const diamond = dark ? 'bg-crimson' : 'bg-maroon';
  const text = dark ? 'text-bone/90' : 'text-midnight/90';
  return (
    <ul className={className}>
      {items.map((it, i) => (
        <li
          key={i}
          className={`flex items-start gap-4 border-t py-3.5 ${line} ${
            i === items.length - 1 ? 'border-b' : ''
          }`}
        >
          <span className={`mt-2 h-3 w-3 shrink-0 rotate-45 ${diamond}`} />
          <span className={`text-lg font-medium leading-snug sm:text-xl ${text}`}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Small label above a list/section. */
function GroupLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-[0.3em] ${dark ? 'text-crimson' : 'text-maroon'}`}
    >
      {children}
    </span>
  );
}

export default function App() {
  return (
    <main className="bg-maroon">
      {/* Screen-only PDF export */}
      <button
        type="button"
        onClick={() => window.print()}
        className="no-print fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-bone px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-maroon shadow-[0_14px_34px_-12px_rgba(0,0,0,0.8)] transition-transform hover:-translate-y-0.5"
      >
        ↓ Download PDF
      </button>

      {/* Screen-only sticky section nav */}
      <nav className="no-print fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        {NAV.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-bone"
          >
            <span className="opacity-0 transition-opacity group-hover:opacity-100">{label}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-bone/40 transition-colors group-hover:bg-bone" />
          </a>
        ))}
      </nav>

      {/* ── TITLE SLIDE ─── half split: maroon identity | FYP presentation ──── */}
      <section className="page grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden bg-maroon px-8 py-16 text-center"
          style={{
            background:
              'radial-gradient(130% 100% at 50% 40%, #3f1626, #35121e 55%, #230c14 100%)',
          }}
        >
          <PhoenixMark
            size={640}
            ring={false}
            className="pointer-events-none absolute -bottom-40 text-bone/[0.04]"
          />
          <div className="relative z-10 flex flex-col items-center">
            <PhoenixMark size={230} className="-translate-y-[52px] text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]" />
            <h1 className="mt-10 font-display text-6xl font-black tracking-tight text-bone sm:text-7xl">
              S.W.A.R.M.
            </h1>
            <span className="mt-5 h-px w-24 bg-crimson/70" />
            <p className="mt-5 max-w-xs font-mono text-xs uppercase tracking-[0.32em] text-bone/80 sm:text-sm">
              Shared-State Working Agents for Red-Team Mapping
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-8 bg-midnight px-8 py-16 sm:px-14">
          <div>
            <div className="-mt-6 mb-6 flex justify-center">
              <img
                src={universityLogo}
                alt="Bahria University"
                className="h-36 w-36 object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
              />
            </div>
            <span className="block text-center font-mono text-[11px] uppercase tracking-[0.3em] text-bone/50">
              FYP Proposal Defense · 2026
            </span>
            <h2 className="mt-3 text-center font-display text-4xl font-black leading-none text-bone sm:text-5xl">
              FYP <span className="text-crimson">PRESENTATION</span>
            </h2>
          </div>

          <MemberTable tone="light" />

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/45">
              Supervisor
            </span>
            <span className="font-display text-lg font-black text-bone">Dawood Akram</span>
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/40">
            Dept. of Computer Sciences · Bahria University Lahore
          </span>
        </div>
      </section>

      {/* ── CLO MAPPING ───────────────────────────────────── */}
      <PageShell id="clo" index="02" label="CLO Mapping">
        <Kicker>CLO Mapping</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          Course &amp; program learning outcomes.
        </h2>
        <div className="mt-8 overflow-hidden rounded-2xl bg-paper text-midnight shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-[3.5rem_10rem_1fr_1fr] items-center gap-x-4 border-b border-midnight/10 bg-midnight px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone">
            <span>CLO</span>
            <span>PLO</span>
            <span>Description</span>
            <span>Specified aspects</span>
          </div>
          {CLO.map(([clo, plo, desc, aspect], i) => (
            <div
              key={clo}
              className={`grid grid-cols-[3.5rem_10rem_1fr_1fr] gap-x-4 px-5 py-3 text-[13px] leading-snug ${
                i < CLO.length - 1 ? 'border-b border-midnight/10' : ''
              }`}
            >
              <span className="font-display font-black text-maroon">{clo}</span>
              <span className="font-mono text-[11px] text-midnight/70">{plo}</span>
              <span className="text-midnight/80">{desc}</span>
              <span className="text-midnight/60">{aspect}</span>
            </div>
          ))}
        </div>
      </PageShell>

      {/* ── ABSTRACT ──────────────────────────────────────── */}
      <PageShell id="abstract" index="03" label="Abstract">
        <Kicker>Abstract</Kicker>
        <h2 className="mt-2 font-display text-5xl font-black leading-none text-bone sm:text-6xl">
          ABSTRACT
        </h2>
        <h3 className="mt-3 max-w-3xl font-display text-2xl font-black leading-tight text-bone/90 sm:text-3xl">
          Point it at your app. Watch a swarm break in.{' '}
          <span className="text-crimson">Get the fixes.</span>
        </h3>

        <ImpactList
          className="mt-5"
          dark
          items={[
            'Manual security assessment is slow, repetitive, error-prone',
            'Analysts hand-link service banners to CVEs across disconnected tools',
            'S.W.A.R.M. replaces the lone analyst with five coordinated AI agents',
            'Recon · Mapper · Attacker · Validator · Reporter, run by a supervisor',
            'All agents share one graph-structured memory',
            'An independent validation stage removes false positives',
            'Findings flow automatically: discovery → confirmed, fix-ready report',
          ]}
        />

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat value="5" label="Specialized agents" />
          <Stat value="1" label="Shared graph brain" dark />
          <Stat value="Live" label="Watch it run" />
          <Stat value="2" label="Report ↔ exploit modes" dark />
        </div>
      </PageShell>

      {/* ── OBJECTIVES & NOVELTY ──────────────────────────── */}
      <PageShell id="objectives" index="04" label="Objectives & Novelty">
        <Kicker>Objectives &amp; Novelty</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          What we set out to do — and why it’s different.
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
          <div>
            <GroupLabel dark>Objectives</GroupLabel>
            <ImpactList
              className="mt-2"
              dark
              items={[
                'To build an autonomous multi-agent pipeline (Recon, Mapper, Attacker, Validation, Reporting) that assesses web-app security within user-set limits',
                'To create a shared graph memory system rather than passing discoveries as isolated messages',
                'To build an agent-based validation stage that removes false positives before the final report',
                'To evaluate the system on a custom demo app and real-world apps to prove it works',
              ]}
            />
          </div>
          <div>
            <GroupLabel dark>Novelty</GroupLabel>
            <ImpactList
              className="mt-2"
              dark
              items={[
                'Most recent undergrad FYPs are CRUD apps — management systems, booking platforms',
                'S.W.A.R.M. is an offensive-security system: agents make independent decisions, share state and self-coordinate',
                'No known precedent as a Pakistani undergraduate FYP for a Bedrock-coordinated pentest swarm on a shared graph memory',
                'Comparable work exists only as recent international research prototypes',
              ]}
            />
          </div>
        </div>
      </PageShell>

      {/* ── DELIVERABLE & BENEFICIARIES ───────────────────── */}
      <PageShell id="deliverables" index="05" label="Deliverable & Beneficiaries">
        <Kicker>Deliverable &amp; Beneficiaries</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          What ships — and who it’s for.
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
          <div>
            <GroupLabel dark>The deliverable</GroupLabel>
            <ImpactList
              className="mt-2"
              dark
              items={[
                'An autonomous, multi-agent software system that detects, verifies and reports web-application vulnerabilities',
                'Built on AWS Bedrock and DynamoDB',
                'Two modes: non-destructive report-only and sandbox-gated full exploitation',
              ]}
            />
          </div>
          <div>
            <GroupLabel dark>The beneficiaries</GroupLabel>
            <ImpactList
              className="mt-2"
              dark
              items={[
                'Security teams and developers who need a quick security review',
                'Owners whose applications are assessed and approved',
                'Future researchers and students building on the work',
              ]}
            />
          </div>
        </div>
      </PageShell>

      {/* ── SCOPE ─────────────────────────────────────────── */}
      <PageShell id="scope" index="06" label="Scope">
        <Kicker>Scope</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          What the system does — and its boundaries.
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <GroupLabel dark>Primary</GroupLabel>
            <ImpactList
              className="mt-2"
              dark
              items={[
                'Automate the full assessment — discovery, correlation, testing, independent verification and reporting',
                'Replace manual tool-switching with a coordinated agent swarm',
                'Operate strictly within the operator’s authorized scope',
              ]}
            />
          </div>
          <div>
            <GroupLabel dark>Optional</GroupLabel>
            <ImpactList
              className="mt-2"
              dark
              items={[
                'Expand the RAG knowledge base of vulnerability patterns',
                'Extend beyond web applications in future iterations',
              ]}
            />
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-lg leading-snug text-bone/70">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson">
            Assumption ·{' '}
          </span>
          Targets are approved and tested only in a controlled, safe environment.
        </p>
      </PageShell>

      {/* ── METHODOLOGY [1/2] ─────────────────────────────── */}
      <PageShell id="methodology" index="07" label="Methodology [1/2]">
        <Kicker>Methodology · Architecture</Kicker>
        <h2 className="mt-2 max-w-3xl font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          A shared-state swarm, not a single chained prompt.
        </h2>
        <ImpactList
          className="mt-5 max-w-4xl"
          dark
          items={[
            'Shared-state, multi-agent (blackboard) architecture',
            'Central graph datastore on Amazon DynamoDB (adjacency-list)',
            'Each agent reads current state, acts in its lane, writes back',
            'Five specialist agents plus one supervisory Coordinator',
          ]}
        />
        <div className="mt-6">
          <FlowDiagram />
        </div>
      </PageShell>

      {/* ── METHODOLOGY [2/2] ─────────────────────────────── */}
      <PageShell id="techniques" index="07" label="Methodology [2/2]">
        <Kicker>Methodology · Techniques &amp; Algorithms</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          Techniques and algorithms used.
        </h2>
        <ul className="mt-5">
          {TECHNIQUES.map(([t, d], i) => (
            <li
              key={t}
              className={`grid grid-cols-1 items-baseline gap-x-8 gap-y-1 border-t border-bone/15 py-3.5 sm:grid-cols-[16rem_1fr] ${
                i === TECHNIQUES.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="mt-2 h-3 w-3 shrink-0 rotate-45 bg-crimson" />
                <h3 className="font-display text-xl font-black text-bone">{t}</h3>
              </div>
              <p className="text-lg leading-snug text-bone/80 sm:pl-0">{d}</p>
            </li>
          ))}
        </ul>
      </PageShell>

      {/* ── RESOURCES & RISKS ─────────────────────────────── */}
      <PageShell id="resources" index="08" label="Resources & Risks">
        <Kicker>Resources &amp; Risks</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          Feasibility — team, tools, budget, risks.
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-2">
          <div>
            <GroupLabel dark>Team expertise</GroupLabel>
            <ImpactList
              className="mt-2"
              dark
              items={TEAM.map(([n, d]) => (
                <>
                  <strong className="text-bone">{n}</strong> — {d}
                </>
              ))}
            />
            <p className="mt-4 text-lg leading-snug text-bone/70">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson">
                Budget ·{' '}
              </span>
              AWS usage-based (Bedrock, DynamoDB, EC2) plus Turnitin — final figure as per the
              proposal.
            </p>
          </div>

          <div>
            <GroupLabel dark>Tools / technology</GroupLabel>
            <ul className="mt-2">
              {TOOLS.map(([cat, tool], i) => (
                <li
                  key={cat}
                  className={`flex items-baseline justify-between gap-6 border-t border-bone/15 py-2.5 ${
                    i === TOOLS.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone/55">
                    {cat}
                  </span>
                  <span className="text-right text-base font-medium text-bone/90">{tool}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <GroupLabel dark>Risks &amp; mitigations</GroupLabel>
          <ul className="mt-2 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {RISKS.map(([r, m]) => (
              <li key={r} className="border-t border-bone/15 py-3">
                <p className="text-lg font-semibold leading-snug text-bone">{r}</p>
                <p className="mt-1 text-base leading-snug text-bone/70">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-crimson">
                    Fix ·{' '}
                  </span>
                  {m}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </PageShell>

      {/* ── GANTT · 7TH SEMESTER ──────────────────────────── */}
      <PageShell id="gantt" index="09" label="Gantt Chart · 7th Semester">
        <Kicker>Gantt Chart · 7th Semester</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          P1 — Proposal phase (Weeks 1–16).
        </h2>
        <div className="mt-8">
          <Gantt tasks={GANTT_P1} weeks={16} />
        </div>
      </PageShell>

      {/* ── GANTT · 8TH SEMESTER ──────────────────────────── */}
      <PageShell id="gantt-2" index="10" label="Gantt Chart · 8th Semester">
        <Kicker>Gantt Chart · 8th Semester</Kicker>
        <h2 className="mt-2 font-display text-4xl font-black leading-tight text-bone sm:text-5xl">
          P2 — Implementation &amp; evaluation (Weeks 1–13).
        </h2>
        <div className="mt-8">
          <Gantt tasks={GANTT_P2} weeks={13} />
        </div>
      </PageShell>

      {/* ── CLOSING / THANKS ──────────────────────────────── */}
      <section className="page flex min-h-screen flex-col items-center justify-center bg-maroon px-6 text-center">
        <PhoenixMark size={140} className="text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]" />
        <p className="mt-8 font-display text-5xl font-black text-bone">Thank you</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">
          Please feel free to ask any further details · advise any improvements
        </p>
        <div className="mt-10 w-full max-w-md text-left">
          <MemberTable tone="light" />
        </div>
      </section>
    </main>
  );
}
