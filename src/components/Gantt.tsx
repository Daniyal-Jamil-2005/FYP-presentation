type Kind = 'dev' | 'fixed' | 'contingency';
type Task = { id: string; name: string; start: number; end: number; type: Kind };

/** 7th Semester (P1) — Proposal Phase, weeks 1–16 */
export const GANTT_P1: Task[] = [
  { id: 'M1', name: 'Literature Review & Requirement Gathering', start: 1, end: 2, type: 'dev' },
  { id: 'M2', name: 'FYP Title Allocation Form', start: 2, end: 2, type: 'fixed' },
  { id: 'M3', name: 'System Architecture & Shared-Memory Schema', start: 2, end: 4, type: 'dev' },
  { id: 'M4', name: 'FYP Proposal Document (Form A, B)', start: 3, end: 4, type: 'fixed' },
  { id: 'M5', name: 'Proposal Defense (Form C)', start: 5, end: 5, type: 'fixed' },
  { id: 'M6', name: 'Revised Proposal', start: 6, end: 6, type: 'contingency' },
  { id: 'M7', name: 'Reappear for Proposal Defense', start: 7, end: 7, type: 'contingency' },
  { id: 'M8', name: 'Approved Proposal Signed (Form G)', start: 8, end: 8, type: 'fixed' },
  { id: 'M9', name: 'Lab Environment & Tooling Setup', start: 5, end: 8, type: 'dev' },
  { id: 'M10', name: 'Agent 1 (Recon) Development', start: 9, end: 11, type: 'dev' },
  { id: 'M11', name: 'Agent 2 (Mapper) Development', start: 11, end: 14, type: 'dev' },
  { id: 'M12', name: 'Recon + Mapper Integration Testing', start: 14, end: 15, type: 'dev' },
  { id: 'M13', name: 'Mid-Term Evaluation (Form D)', start: 16, end: 16, type: 'fixed' },
];

/** 8th Semester (P2) — Implementation & Evaluation Phase, weeks 1–13 */
export const GANTT_P2: Task[] = [
  { id: 'M14', name: 'Agent 3 (Attacker) Development', start: 1, end: 3, type: 'dev' },
  { id: 'M15', name: 'Agent 4 (Validation) Development', start: 3, end: 5, type: 'dev' },
  { id: 'M16', name: 'Agent 5 (Reporting) Development', start: 5, end: 7, type: 'dev' },
  { id: 'M17', name: 'End-to-End Integration & Testing', start: 7, end: 9, type: 'dev' },
  { id: 'M18', name: 'Progress Report & Project File (Form H)', start: 9, end: 10, type: 'fixed' },
  { id: 'M19', name: 'Internal Evaluation', start: 10, end: 10, type: 'fixed' },
  { id: 'M20', name: 'Correctness + Open House (Form E, I)', start: 11, end: 11, type: 'fixed' },
  { id: 'M21', name: 'Internal-External Evaluation (Form J)', start: 12, end: 12, type: 'fixed' },
  { id: 'M22', name: 'Final Docs, Hard-Bound Report & CD', start: 12, end: 13, type: 'fixed' },
];

const BAR: Record<Kind, string> = {
  dev: 'bg-crimson',
  fixed: 'bg-bone text-midnight',
  contingency: 'bg-maroon-line',
};

/** A compact week-grid Gantt. Each row is its own grid sharing one column
 *  track: column 1 is the milestone label, the rest are the week track. */
export default function Gantt({ tasks, weeks }: { tasks: Task[]; weeks: number }) {
  const track = { gridTemplateColumns: `minmax(0, 15rem) repeat(${weeks}, minmax(0, 1fr))` };

  return (
    <div className="rounded-2xl bg-paper p-4 text-midnight sm:p-5">
      {/* week header */}
      <div className="grid items-center" style={track}>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-midnight/50">
          Milestone
        </span>
        {Array.from({ length: weeks }, (_, i) => (
          <span key={i} className="text-center font-mono text-[10px] text-midnight/40">
            {i + 1}
          </span>
        ))}
      </div>

      {/* rows */}
      <div className="mt-1.5 flex flex-col gap-1.5">
        {tasks.map((t) => (
          <div key={t.id} className="grid items-center" style={track}>
            <div className="flex items-center gap-2 pr-3">
              <span className="font-mono text-[10px] text-maroon">{t.id}</span>
              <span className="truncate text-[11px] font-medium leading-tight text-midnight/80">
                {t.name}
              </span>
            </div>
            <span
              className={`h-2.5 rounded-full ${BAR[t.type]}`}
              style={{ gridColumn: `${t.start + 1} / ${t.end + 2}` }}
              aria-label={`${t.name}: weeks ${t.start} to ${t.end}`}
            />
          </div>
        ))}
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/60">
        <Legend className="bg-crimson" label="Internal development" />
        <Legend className="border border-midnight/25 bg-bone" label="Fixed FYP-office milestone" />
        <Legend className="bg-maroon-line" label="Contingency" />
      </div>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-4 rounded-full ${className}`} />
      {label}
    </span>
  );
}
