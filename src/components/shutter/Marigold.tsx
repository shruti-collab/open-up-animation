export function Marigold({ delay = 0, size = 44 }: { delay?: number; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="marigold"
      style={{ animationDelay: `${delay}s` }}
    >
      <g transform="translate(50 50)">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-28"
            rx="12"
            ry="20"
            fill="#f59e0b"
            transform={`rotate(${(i * 360) / 12})`}
            opacity="0.95"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <ellipse
            key={`b${i}`}
            cx="0"
            cy="-20"
            rx="10"
            ry="16"
            fill="#ea580c"
            transform={`rotate(${(i * 360) / 10 + 18})`}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={`c${i}`}
            cx="0"
            cy="-12"
            rx="8"
            ry="12"
            fill="#b91c1c"
            transform={`rotate(${(i * 360) / 8})`}
          />
        ))}
        <circle r="6" fill="#7c2d12" />
      </g>
    </svg>
  );
}

export function Leaf({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      width="26"
      height="34"
      viewBox="0 0 40 60"
      className="marigold"
      style={{ animationDelay: `${delay}s` }}
    >
      <path
        d="M20 2 C 4 20, 4 40, 20 58 C 36 40, 36 20, 20 2 Z"
        fill="#166534"
      />
      <path d="M20 6 L20 54" stroke="#052e16" strokeWidth="1.5" />
    </svg>
  );
}
