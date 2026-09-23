export type Member = { role: string; roll: string; name: string };

export const MEMBERS: Member[] = [
  { role: 'Lead Member', roll: '03-134232-024', name: 'Daniyal Jamil' },
  { role: 'Member 2', roll: '03-134232-051', name: 'Muaaz Nazeer' },
  { role: 'Member 3', roll: '03-134232-022', name: 'Aymal Ahmed' },
];

/**
 * Reusable roster used on the title slide and closing slide.
 * `tone='light'` sits on a dark (midnight/maroon) ground; `tone='dark'` on bone.
 */
export default function MemberTable({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const onDark = tone === 'light';
  const line = onDark ? 'border-bone/15' : 'border-midnight/15';
  const label = onDark ? 'text-bone/45' : 'text-midnight/45';
  const roll = onDark ? 'text-crimson' : 'text-maroon';
  const name = onDark ? 'text-bone' : 'text-midnight';

  return (
    <div className="flex flex-col">
      {MEMBERS.map((m, i) => (
        <div
          key={m.roll}
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-t py-3 ${line} ${
            i === MEMBERS.length - 1 ? 'border-b' : ''
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className={`font-mono text-[10px] uppercase tracking-[0.28em] ${label}`}>
              {m.role}
            </span>
            <span className={`font-display text-lg font-black leading-none ${name}`}>{m.name}</span>
          </div>
          <span className={`font-mono text-sm tracking-wide ${roll}`}>{m.roll}</span>
        </div>
      ))}
    </div>
  );
}
