const steps = [
  { id: '01', name: 'Recon' },
  { id: '02', name: 'Mapper' },
  { id: '03', name: 'Attacker' },
  { id: '04', name: 'Validator' },
  { id: '05', name: 'Reporter' },
];

const chain = ['Host', 'Port', 'Service', 'CVE', 'Hypothesis', 'Confirmed'];

/** Compact pipeline strip: Coordinator delegates across the agent chain, all
 *  reading/writing one shared graph. */
export default function FlowDiagram() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-xl bg-midnight px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone">
          Operator scope
        </span>
        <Arrow />
        <span className="rounded-xl bg-paper px-4 py-2 font-display text-sm font-black text-maroon">
          Coordinator
        </span>
        <Arrow />
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <span className="rounded-xl border border-bone/30 px-3 py-2 font-display text-sm font-bold text-bone">
                <span className="mr-1.5 font-mono text-[10px] text-bone/60">{s.id}</span>
                {s.name}
              </span>
              {i < steps.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-paper p-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-maroon">
          Shared memory · graph of the attack chain
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
          {chain.map((n, i) => (
            <div key={n} className="flex items-center gap-2">
              <span className="rounded-full bg-maroon/12 px-3 py-1 font-mono text-[12px] font-medium text-maroon">
                {n}
              </span>
              {i < chain.length - 1 && <span className="font-mono text-maroon/50">→</span>}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-midnight/60">
          Every finding traces back through the graph to the exact evidence that confirmed it.
        </p>
      </div>
    </div>
  );
}

function Arrow() {
  return <span className="font-mono text-bone/50">→</span>;
}
