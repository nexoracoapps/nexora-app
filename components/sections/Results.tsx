'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

type TKey = Parameters<ReturnType<typeof useTranslations<'results'>>>[0];

const STATS = [0, 1, 2, 3] as const;
const CASES = [0, 1, 2] as const;
const METRICS = [0, 1, 2] as const;

const caseAccents = [
  { border: 'border-[#1d4ed8]/30', catBg: 'bg-[#1d4ed8]/15 text-[#60a5fa]', glow: 'rgba(29,78,216,0.08)' },
  { border: 'border-[#7f1d1d]/30', catBg: 'bg-[#7f1d1d]/15 text-[#fca5a5]', glow: 'rgba(127,29,29,0.08)' },
  { border: 'border-[#6d28d9]/30', catBg: 'bg-[#6d28d9]/15 text-[#c4b5fd]', glow: 'rgba(109,40,217,0.08)' },
];

const statGradients = [
  ['#3b82f6', '#1d4ed8'],
  ['#f87171', '#7f1d1d'],
  ['#3b82f6', '#6d28d9'],
  ['#f87171', '#dc2626'],
];

export default function Results() {
  const t = useTranslations('results');

  return (
    <section
      id="results"
      className="relative py-24 lg:py-32 scroll-mt-20"
      style={{ background: 'linear-gradient(180deg, #0a0b14 0%, #0f1120 50%, #0a0b14 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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
          <p className="text-lg text-[#94a3b8] max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-16 rounded-2xl overflow-hidden border border-white/8 bg-white/4"
        >
          {STATS.map((i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-4 bg-[#0f1120]/80 hover:bg-[#161828]/90 transition-colors duration-200"
            >
              <span
                className="text-4xl sm:text-5xl font-black mb-2"
                style={{
                  background: `linear-gradient(135deg, ${statGradients[i][0]}, ${statGradients[i][1]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-poppins, Poppins, sans-serif)',
                }}
              >
                {t(`stat${i}Value` as TKey)}
              </span>
              <span className="text-xs text-[#64748b] text-center font-medium">
                {t(`stat${i}Label` as TKey)}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((i) => {
            const acc = caseAccents[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className={`group relative rounded-2xl border ${acc.border} overflow-hidden cursor-default flex flex-col`}
                style={{ background: `radial-gradient(ellipse at top left, ${acc.glow} 0%, transparent 65%), #161828` }}
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Category pill */}
                  <span className={`self-start text-xs font-bold px-3 py-1 rounded-full ${acc.catBg} border border-white/8 mb-4`}>
                    {t(`case${i}Cat` as TKey)}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold text-white mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                  >
                    {t(`case${i}Title` as TKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#94a3b8] leading-relaxed flex-1 mb-5">
                    {t(`case${i}Desc` as TKey)}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2">
                    {METRICS.map((m) => (
                      <div key={m} className="flex items-center gap-2 text-xs text-[#cbd5e1]">
                        <ArrowUpRight size={12} className="text-[#3b82f6] shrink-0" />
                        {t(`case${i}M${m}` as TKey)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom glow on hover */}
                <div
                  className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${acc.border.includes('1d4ed8') ? '#3b82f6' : acc.border.includes('7f1d1d') ? '#f87171' : '#a78bfa'}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
