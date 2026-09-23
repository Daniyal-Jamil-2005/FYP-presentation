export type Agent = {
  id: string;
  name: string;
  alias: string;
  role: string;
  approach: string[];
  tools: string[];
  io: string;
  safety: string;
};

export const AGENTS: Agent[] = [
  {
    id: '01',
    name: 'Recon',
    alias: 'The Scout',
    role: 'Discovers the target’s attack surface across infrastructure, technology stack, and application surface — without attempting any exploitation.',
    approach: [
      'Infrastructure: port scanning, DNS enumeration, proxy/CDN detection',
      'Stack: service & technology version fingerprinting',
      'Surface: crawling for endpoints, forms, and URL parameters',
    ],
    tools: ['nmap', 'httpx', 'wappalyzer', 'katana'],
    io: 'Writes host / port / service / endpoint nodes. Reads operator scope before every scan.',
    safety: 'Enforces the exclusion list as a hard check — out-of-scope hosts are never contacted. Purely observational.',
  },
  {
    id: '02',
    name: 'Vulnerability Mapper',
    alias: 'The Detective',
    role: 'Correlates recon data against public vulnerability sources to produce ranked, structured attack hypotheses — without ever contacting the target.',
    approach: [
      'Engine A: matches discovered CPEs against NVD / OSV CVEs with a confidence score',
      'Engine B: profiles URL parameters for likely injection points',
      'Bedrock reasoning prioritizes what is actually worth testing',
    ],
    tools: ['NVD', 'OSV', 'Bedrock reasoning'],
    io: 'Reads recon nodes. Writes hypothesis records — parameter, vuln class, confidence, payload family.',
    safety: 'Read-only with respect to the target — never issues a request to it. Confidence scoring gates weak matches.',
  },
  {
    id: '03',
    name: 'Attacker',
    alias: 'The Executor',
    role: 'Tests approved, in-scope hypotheses against the target using established tools and custom payloads — strictly within authorized boundaries.',
    approach: [
      'Hybrid tool calling: Nuclei / SQLmap for known classes, custom payloads for allow-listed ones',
      'Custom payloads only run against pre-approved, sandboxed targets',
      'Parses raw tool output into structured fields before writing',
    ],
    tools: ['Nuclei', 'SQLmap', 'sandboxed Python'],
    io: 'Reads hypothesis nodes. Writes structured raw results linked to the originating hypothesis.',
    safety: 'Hard scope-allowlist check before any request. Exploitation gated on a confirmed sandbox. Coordinator rate-limits & locks.',
  },
  {
    id: '04',
    name: 'Validation',
    alias: 'The Fact-Checker',
    role: 'Independently re-tests every raw result to confirm a genuine vulnerability before it reaches the report — filtering out false positives.',
    approach: [
      'Differential baselining against benign / invalid requests',
      'Blind logic proofs (e.g. arithmetic only a vulnerable target would evaluate)',
      'Re-runs each confirmation to rule out WAF / network jitter',
    ],
    tools: ['Differential logic', 'Nuclei', 'SQLmap'],
    io: 'Reads raw results. Writes confirmed-finding nodes, or discards with a logged reason.',
    safety: 'Findings are “differentially validated”, not claimed as absolute. Every one carries a baseline + proof audit trail.',
  },
  {
    id: '05',
    name: 'Reporting',
    alias: 'The Scribe',
    role: 'Traverses the confirmed graph to reconstruct each full attack chain and produces a prioritized, actionable report for the operator.',
    approach: [
      'Graph traversal: open port → outdated service → CVE → confirmed injection point',
      'CVSS-inspired severity so findings can be triaged, not dumped as a flat list',
      'Remediation as vetted vuln-class templates (e.g. parameterized-query example)',
    ],
    tools: ['Bedrock narrative', 'DynamoDB graph queries'],
    io: 'Reads confirmed findings + full edge history. Writes the final report artifact.',
    safety: 'Class-level remediation avoids recommending a broken patch. Every finding is traceable back to its evidence.',
  },
];

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-paper p-7 text-midnight shadow-[0_20px_50px_-28px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon font-display text-lg font-black text-bone">
          {agent.id}
        </span>
        <div>
          <h3 className="font-display text-2xl font-black leading-none text-midnight">{agent.name}</h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-maroon">
            {agent.alias}
          </span>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-midnight/75">{agent.role}</p>

      <ul className="mt-5 space-y-2.5">
        {agent.approach.map((a) => (
          <li key={a} className="flex gap-3 text-[15px] leading-snug text-midnight/85">
            <span className="mt-[7px] h-2 w-2 shrink-0 rotate-45 bg-maroon" />
            <span>{a}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {agent.tools.map((t) => (
          <span
            key={t}
            className="rounded-full bg-maroon/12 px-3 py-1 font-mono text-[11px] text-maroon"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto space-y-2 border-t border-midnight/10 pt-4 text-[13px] leading-snug text-midnight/70">
        <p>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/45">I/O · </span>
          {agent.io}
        </p>
        <p>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-maroon">Safety · </span>
          {agent.safety}
        </p>
      </div>
    </article>
  );
}
