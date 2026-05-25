'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

export default function Logo({ size = 'md', variant = 'full' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon Mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="-6 -6 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="55%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#9b1c1c" />
          </linearGradient>
          <linearGradient id="logo-accent" x1="48" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Hexagon background */}
        <path
          d="M24 2L43.0526 13.5V36.5L24 48L4.94744 36.5V13.5L24 2Z"
          fill="url(#logo-grad)"
          opacity="0.15"
        />
        <path
          d="M24 2L43.0526 13.5V36.5L24 48L4.94744 36.5V13.5L24 2Z"
          stroke="url(#logo-grad)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* N letter paths */}
        <path
          d="M14 34V14L24 30V14"
          stroke="url(#logo-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M24 30L34 14V34"
          stroke="url(#logo-accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Accent dots */}
        <circle cx="14" cy="14" r="2" fill="#3b82f6" />
        <circle cx="34" cy="34" r="2" fill="#dc2626" />
      </svg>

      {/* Wordmark */}
      {variant === 'full' && (
        <span
          className={`font-display font-bold tracking-tight ${s.text}`}
          style={{
            fontFamily: 'var(--font-poppins, Poppins, sans-serif)',
            background: 'linear-gradient(135deg, #f0f0f5 40%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Nexora
        </span>
      )}
    </div>
  );
}
