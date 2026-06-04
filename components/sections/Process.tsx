'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Phone, Compass, Code2, Rocket } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

const stepIcons = [Phone, Compass, Code2, Rocket];
const stepColors = [
  { num: 'text-[#3b82f6]', bg: 'bg-[#1d4ed8]/15 border-[#1d4ed8]/30', connector: '#1d4ed8' },
  { num: 'text-[#f87171]', bg: 'bg-[#7f1d1d]/15 border-[#7f1d1d]/30', connector: '#7f1d1d' },
  { num: 'text-[#3b82f6]', bg: 'bg-[#1d4ed8]/15 border-[#1d4ed8]/30', connector: '#1d4ed8' },
  { num: 'text-[#f87171]', bg: 'bg-[#7f1d1d]/15 border-[#7f1d1d]/30', connector: '#7f1d1d' },
];

export default function Process() {
  const t = useTranslations('process');

  return (
    <section
      id="process"
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
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <SectionBadge color="blue">{t('badge')}</SectionBadge>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
          >
            {t('title')}
          </h2>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1d4ed8]/30 via-50% to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {([0, 1, 2, 3] as const).map((i) => {
              const Icon = stepIcons[i];
              const colors = stepColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    <div className={`relative z-10 w-28 h-28 rounded-2xl ${colors.bg} border flex flex-col items-center justify-center gap-1 shadow-lg`}>
                      <Icon size={24} className={colors.num} />
                      <span
                        className={`text-3xl font-black ${colors.num}`}
                        style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                      >
                        {t(`steps.${i}.number` as Parameters<typeof t>[0])}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                  >
                    {t(`steps.${i}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed max-w-xs">
                    {t(`steps.${i}.description` as Parameters<typeof t>[0])}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
