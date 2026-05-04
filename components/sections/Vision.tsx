'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

const stageStyles = {
  current: {
    border: 'border-[#1d4ed8]/60',
    bg: 'bg-[#1d4ed8]/10',
    badge: 'bg-[#1d4ed8] text-white text-xs px-2 py-0.5 rounded-full font-semibold',
    dot: 'bg-[#3b82f6]',
    glow: 'rgba(29,78,216,0.2)',
  },
  next: {
    border: 'border-[#7f1d1d]/50',
    bg: 'bg-[#7f1d1d]/8',
    badge: 'bg-[#7f1d1d] text-white text-xs px-2 py-0.5 rounded-full font-semibold',
    dot: 'bg-[#dc2626]',
    glow: 'rgba(127,29,29,0.15)',
  },
  future: {
    border: 'border-white/10',
    bg: 'bg-white/3',
    badge: 'bg-white/10 text-[#94a3b8] text-xs px-2 py-0.5 rounded-full font-semibold',
    dot: 'bg-[#475569]',
    glow: 'rgba(71,85,105,0.08)',
  },
};

const statusKeys = ['current', 'next', 'future', 'future'] as const;

export default function Vision() {
  const t = useTranslations('vision');
  const featureKeys = [0, 1, 2, 3, 4, 5] as const;

  return (
    <section
      id="vision"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 10% 50%, rgba(29,78,216,0.08) 0%, transparent 50%), radial-gradient(ellipse at 90% 50%, rgba(127,29,29,0.08) 0%, transparent 50%), #0a0b14',
      }}
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
            <SectionBadge color="maroon">{t('badge')}</SectionBadge>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
          >
            {t('title')}
          </h2>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Roadmap */}
          <div className="space-y-4">
            {([0, 1, 2, 3] as const).map((i) => {
              const status = statusKeys[i];
              const styles = stageStyles[status];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' as const }}
                  className={`relative rounded-xl border ${styles.border} p-5 overflow-hidden`}
                  style={{ background: `radial-gradient(ellipse at left, ${styles.glow} 0%, transparent 70%), #161828` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className="relative mt-1 shrink-0">
                      <div className={`w-3 h-3 rounded-full ${styles.dot} shadow-lg`} />
                      {i < 3 && (
                        <div className="absolute top-3 left-1.5 w-px h-8 bg-gradient-to-b from-current to-transparent opacity-20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={styles.badge}>
                          {t(`stages.${i}.stage` as Parameters<typeof t>[0])}
                        </span>
                        {status === 'current' && (
                          <span className="inline-flex items-center gap-1 text-xs text-[#3b82f6]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-base font-bold text-white mb-1"
                        style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                      >
                        {t(`stages.${i}.title` as Parameters<typeof t>[0])}
                      </h3>
                      <p className="text-sm text-[#94a3b8]">
                        {t(`stages.${i}.description` as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Future Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="rounded-2xl border border-white/8 overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at top right, rgba(29,78,216,0.12) 0%, transparent 60%), #161828' }}
          >
            <div className="p-7">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={18} className="text-[#3b82f6]" />
                <span
                  className="font-bold text-white"
                  style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                >
                  Future Capabilities
                </span>
              </div>
              <div className="space-y-3">
                {featureKeys.map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-white/6 hover:border-[#1d4ed8]/30 transition-colors duration-200"
                  >
                    <CheckCircle2
                      size={16}
                      className={i % 2 === 0 ? 'text-[#3b82f6] shrink-0' : 'text-[#f87171] shrink-0'}
                    />
                    <span className="text-sm text-[#cbd5e1] font-medium">
                      {t(`features.${i}` as Parameters<typeof t>[0])}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="px-7 py-5 border-t border-white/5 bg-[#1d4ed8]/5">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3b82f6] hover:text-white transition-colors group"
              >
                Partner with us on this journey
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
