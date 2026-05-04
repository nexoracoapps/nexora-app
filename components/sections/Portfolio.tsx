'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

const DashboardMockup = dynamic(() => import('@/components/3d/DashboardMockup'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const cardStyles = [
  {
    category: 'bg-[#1d4ed8]/20 text-[#60a5fa]',
    border: 'border-[#1d4ed8]/25',
    glow: 'rgba(29,78,216,0.12)',
    accent: '#1d4ed8',
    tagBg: 'bg-[#1d4ed8]/15 text-[#93c5fd]',
  },
  {
    category: 'bg-[#7f1d1d]/20 text-[#fca5a5]',
    border: 'border-[#7f1d1d]/25',
    glow: 'rgba(127,29,29,0.12)',
    accent: '#7f1d1d',
    tagBg: 'bg-[#7f1d1d]/15 text-[#fca5a5]',
  },
  {
    category: 'bg-gradient-to-r from-[#1d4ed8]/15 to-[#7f1d1d]/15 text-[#c4b5fd]',
    border: 'border-white/10',
    glow: 'rgba(109,40,217,0.1)',
    accent: '#6d28d9',
    tagBg: 'bg-white/8 text-[#c4b5fd]',
  },
  {
    category: 'bg-[#7f1d1d]/15 text-[#f87171]',
    border: 'border-[#7f1d1d]/20',
    glow: 'rgba(127,29,29,0.1)',
    accent: '#dc2626',
    tagBg: 'bg-[#7f1d1d]/12 text-[#fca5a5]',
  },
];

const tagKeys = ['0', '1', '2'] as const;

export default function Portfolio() {
  const t = useTranslations('portfolio');

  return (
    <section
      id="portfolio"
      className="relative py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #0a0b14 0%, #0f1120 60%, #0a0b14 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
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

        {/* 3D Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[340px] sm:h-[420px] mb-12 rounded-2xl overflow-hidden border border-white/8"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.08) 0%, #0f1120 70%)' }}
        >
          <DashboardMockup />
          {/* Label overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0b14]/80 backdrop-blur-md border border-white/10 text-xs text-[#94a3b8] font-medium whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
            Interactive 3D Platform Preview
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {([0, 1, 2, 3] as const).map((i) => {
            const styles = cardStyles[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border ${styles.border} overflow-hidden cursor-default`}
                style={{ background: `radial-gradient(ellipse at top right, ${styles.glow} 0%, transparent 60%), #161828` }}
              >
                <div className="p-7">
                  {/* Category */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${styles.category}`}>
                      {t(`items.${i}.category` as Parameters<typeof t>[0])}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                  >
                    {t(`items.${i}.title` as Parameters<typeof t>[0])}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                    {t(`items.${i}.description` as Parameters<typeof t>[0])}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tagKeys.map((k) => (
                      <span
                        key={k}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${styles.tagBg}`}
                      >
                        {t(`items.${i}.tags.${k}` as Parameters<typeof t>[0])}
                      </span>
                    ))}
                  </div>

                  {/* Learn more link */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#64748b] group-hover:text-white transition-colors duration-200">
                    <span>View details</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>

                {/* Bottom gradient bar */}
                <div
                  className="h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${styles.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
