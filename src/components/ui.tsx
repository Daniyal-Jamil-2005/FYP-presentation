import type { ReactNode } from 'react';

export function Kicker({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-[0.4em] ${
        tone === 'dark' ? 'text-maroon' : 'text-bone/70'
      }`}
    >
      {children}
    </span>
  );
}

/** White bento — the contrast block: white surface, midnight text. */
export function WhiteCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-paper p-6 text-midnight shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)] ${className}`}>
      {children}
    </div>
  );
}

/** Dark bento — midnight surface, bone text. */
export function DarkCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-midnight-line bg-midnight p-6 text-bone ${className}`}>
      {children}
    </div>
  );
}

export function Stat({ value, label, dark }: { value: string; label: string; dark?: boolean }) {
  if (dark) {
    return (
      <div className="flex flex-col gap-2 rounded-2xl border border-midnight-line bg-midnight p-6">
        <span className="font-display text-4xl font-black leading-none text-bone sm:text-5xl">{value}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-paper p-6">
      <span className="font-display text-4xl font-black leading-none text-maroon sm:text-5xl">{value}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-midnight/60">{label}</span>
    </div>
  );
}
