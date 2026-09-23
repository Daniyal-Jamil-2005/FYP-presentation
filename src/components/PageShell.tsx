import type { ReactNode } from 'react';
import PhoenixMark from './PhoenixMark';

type Props = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  tone?: 'maroon' | 'bone';
};

/**
 * A single brochure "page". Maroon is the primary ground; the `bone` tone is
 * reserved for the Market page. A small black brand mark sits top-right and a
 * mono running foot repeats on every page. Breaks to its own page in print.
 */
export default function PageShell({ id, index, label, children, tone = 'maroon' }: Props) {
  const onBone = tone === 'bone';
  return (
    <section
      id={id}
      className={`page relative flex min-h-screen scroll-mt-4 flex-col overflow-hidden ${
        onBone ? 'bg-bone text-midnight' : 'bg-maroon text-bone'
      }`}
    >
      {/* soft depth: vignette on maroon, warm wash on bone */}
      {!onBone && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 78% 8%, rgba(216,56,74,0.10), transparent 45%), radial-gradient(140% 120% at 50% 120%, rgba(0,0,0,0.45), transparent 60%)',
          }}
        />
      )}

      <header className="relative z-10 flex items-start justify-between px-6 pt-6 sm:px-12 sm:pt-10">
        <div className="flex items-center gap-3">
          <span
            className={`font-display text-3xl font-black leading-none ${
              onBone ? 'text-maroon/25' : 'text-bone/25'
            }`}
          >
            {index}
          </span>
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.35em] ${
              onBone ? 'text-maroon' : 'text-bone/70'
            }`}
          >
            {label}
          </span>
        </div>
        <PhoenixMark size={136} className={onBone ? 'text-midnight' : 'text-white'} />
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-start px-6 pb-8 pt-4 sm:px-12 sm:pt-6 lg:px-20">
        {children}
      </div>

      <footer
        className={`relative z-10 flex items-center justify-between border-t px-6 py-4 font-mono text-[10px] uppercase tracking-[0.3em] sm:px-12 ${
          onBone ? 'border-midnight/15 text-midnight/50' : 'border-maroon-line/60 text-bone/60'
        }`}
      >
        <span>S.W.A.R.M.</span>
        <span>Multi-Agent Penetration Testing System</span>
      </footer>
    </section>
  );
}
