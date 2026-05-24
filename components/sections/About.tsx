'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Target, Zap, Layers } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

const icons = [Target, Zap, Layers];
const iconColors = [
  { bg: 'bg-[#1d4ed8]/15', color: 'text-[#3b82f6]' },
  { bg: 'bg-[#7f1d1d]/15', color: 'text-[#f87171]' },
  { bg: 'bg-gradient-to-br from-[#1d4ed8]/15 to-[#7f1d1d]/15', color: 'text-[#c4b5fd]' },
];

type TKey = 'p0title' | 'p0desc' | 'p1title' | 'p1desc' | 'p2title' | 'p2desc';

export default function About() {
  const t = useTranslations('about');

  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0b14 0%, #0f1120 60%, #0a0b14 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#1d4ed8]/5 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5">
              <SectionBadge color="blue">{t('badge')}</SectionBadge>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-[1.12]"
              style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
            >
              {t('title')}
            </h2>
            <p className="text-lg text-[#94a3b8] leading-relaxed mb-8 max-w-lg">
              {t('subtitle')}
            </p>

            {/* Quality indicators */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {[t('q0'), t('q1'), t('q2')].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/8 bg-white/4 text-[#94a3b8]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #dc2626)' }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — 3 point cards */}
          <div className="space-y-4">
            {([0, 1, 2] as const).map((i) => {
              const Icon = icons[i];
              const ic = iconColors[i];
              const titleKey = `p${i}title` as TKey;
              const descKey = `p${i}desc` as TKey;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
                  className="flex gap-4 p-5 rounded-2xl border border-white/6 bg-white/3 hover:bg-white/5 hover:border-white/10 transition-all duration-200"
                >
                  <div className={`shrink-0 w-11 h-11 rounded-xl ${ic.bg} flex items-center justify-center`}>
                    <Icon size={20} className={ic.color} />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-white mb-1"
                      style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                    >
                      {t(titleKey)}
                    </h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{t(descKey)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
