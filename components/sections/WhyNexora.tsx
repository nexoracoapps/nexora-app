'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Layers, Code2, Target, Shield, Cpu, Handshake } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

const icons = [Layers, Code2, Target, Shield, Cpu, Handshake];

const cardColors = [
  { border: 'border-[#1d4ed8]/30', icon: 'bg-[#1d4ed8]/15 text-[#3b82f6]', glow: '#1d4ed8' },
  { border: 'border-[#7f1d1d]/30', icon: 'bg-[#7f1d1d]/15 text-[#f87171]', glow: '#7f1d1d' },
  { border: 'border-[#1d4ed8]/20', icon: 'bg-[#1d4ed8]/10 text-[#60a5fa]', glow: '#1d4ed8' },
  { border: 'border-[#7f1d1d]/20', icon: 'bg-[#7f1d1d]/10 text-[#fca5a5]', glow: '#7f1d1d' },
  { border: 'border-[#1d4ed8]/25', icon: 'bg-gradient-to-br from-[#1d4ed8]/15 to-[#7f1d1d]/15 text-[#c4b5fd]', glow: '#6d28d9' },
  { border: 'border-white/10', icon: 'bg-white/8 text-[#94a3b8]', glow: '#475569' },
];

export default function WhyNexora() {
  const t = useTranslations('why');
  const itemKeys = [0, 1, 2, 3, 4, 5] as const;

  return (
    <section
      id="why"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1d4ed8]/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#7f1d1d]/5 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <SectionBadge color="mixed">{t('badge')}</SectionBadge>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
          >
            {t('title')}
          </h2>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {itemKeys.map((i) => {
            const Icon = icons[i];
            const colors = cardColors[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' as const }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border ${colors.border} p-6 cursor-default overflow-hidden`}
                style={{ background: `radial-gradient(ellipse at top left, rgba(${colors.glow === '#1d4ed8' ? '29,78,216' : colors.glow === '#7f1d1d' ? '127,29,29' : '109,40,217'},0.08) 0%, transparent 70%), #161828` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${colors.icon} mb-4`}>
                  <Icon size={20} />
                </div>

                {/* Text */}
                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                >
                  {t(`items.${i}.title` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  {t(`items.${i}.description` as Parameters<typeof t>[0])}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                  style={{
                    background: `linear-gradient(90deg, #${colors.glow === '#1d4ed8' ? '1d4ed8' : '7f1d1d'}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
