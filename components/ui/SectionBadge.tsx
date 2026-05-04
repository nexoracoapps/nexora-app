interface SectionBadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'maroon' | 'mixed';
}

export default function SectionBadge({ children, color = 'blue' }: SectionBadgeProps) {
  const colorStyles = {
    blue: 'bg-[#1d4ed8]/15 text-[#3b82f6] border-[#1d4ed8]/30',
    maroon: 'bg-[#7f1d1d]/20 text-[#f87171] border-[#7f1d1d]/40',
    mixed: 'bg-gradient-to-r from-[#1d4ed8]/15 to-[#7f1d1d]/15 text-[#94a3b8] border-[#1d4ed8]/20',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${colorStyles[color]}`}
    >
      {children}
    </span>
  );
}
