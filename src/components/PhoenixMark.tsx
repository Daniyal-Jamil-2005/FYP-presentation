type Props = {
  size?: number;
  className?: string;
  title?: string;
  ring?: boolean;
};

/**
 * S.W.A.R.M. brand mark: three angular birds in a triangular swarm formation
 * (one leading, two behind), optionally inside a clean ring. Fill is driven by
 * currentColor, so `text-midnight` renders the black-on-maroon logo.
 */
function Bird() {
  return (
    <g fill="currentColor">
      {/* head */}
      <path d="M0 -50 L11 -32 L0 -15 L-11 -32 Z" />
      {/* upper wings, swept to sharp outer tips */}
      <path d="M4 -28 Q34 -47 57 -44 Q34 -31 16 -12 Z" />
      <path d="M-4 -28 Q-34 -47 -57 -44 Q-34 -31 -16 -12 Z" />
      {/* lower barbs */}
      <path d="M7 -15 Q27 -13 35 -5 Q21 -7 12 2 Z" />
      <path d="M-7 -15 Q-27 -13 -35 -5 Q-21 -7 -12 2 Z" />
      {/* body + forked tail */}
      <path d="M-3 -14 L3 -14 L2 15 L7 28 L0 19 L-7 28 L-2 15 Z" />
    </g>
  );
}

export default function PhoenixMark({ size = 120, className, title = 'S.W.A.R.M.', ring = true }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-135 -130 270 270"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {ring && (
        <circle cx="0" cy="0" r="120" fill="none" stroke="currentColor" strokeWidth="7" />
      )}
      <g transform="translate(0 -44) scale(0.9)">
        <Bird />
      </g>
      <g transform="translate(-54 42) scale(0.82)">
        <Bird />
      </g>
      <g transform="translate(54 42) scale(0.82)">
        <Bird />
      </g>
    </svg>
  );
}
