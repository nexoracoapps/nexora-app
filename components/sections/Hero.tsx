'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Zap } from 'lucide-react';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const stats = [
  { key: 'stat1', value: 'Expert' },
  { key: 'stat2', value: 'Premium' },
  { key: 'stat3', value: 'Trusted' },
];

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 20% 20%, rgba(29,78,216,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(127,29,29,0.15) 0%, transparent 55%), #0a0b14',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3D Scene — full canvas background */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* Soft vignette over the 3D scene so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, #0a0b14 85%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-[#1d4ed8]/20 to-[#7f1d1d]/20 border border-[#1d4ed8]/30 text-[#94a3b8]">
            <Zap size={11} className="text-[#3b82f6]" />
            {t('badge')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
        >
          <span className="text-white">{t('headline').split(' ').slice(0, 2).join(' ')}</span>{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('headline').split(' ').slice(2, 5).join(' ')}
          </span>{' '}
          <span className="text-white">{t('headline').split(' ').slice(5).join(' ')}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[#94a3b8] leading-relaxed mb-10"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 h-12 px-8 text-sm font-semibold rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#7f1d1d] text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-800/50 hover:brightness-110 transition-all duration-200"
          >
            {t('cta1')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 h-12 px-8 text-sm font-semibold rounded-full bg-white/8 border border-white/12 text-white hover:bg-white/12 hover:border-white/20 transition-all duration-200"
          >
            {t('cta2')}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-px max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/8 bg-white/5"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.key}
              className="flex flex-col items-center py-6 px-4 bg-[#0f1120]/70 hover:bg-[#161828]/90 backdrop-blur-sm transition-colors duration-200"
            >
              <span
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    : 'linear-gradient(135deg, #dc2626, #7f1d1d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'var(--font-poppins, Poppins, sans-serif)',
                }}
              >
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-[#64748b] font-medium">{t(stat.key as 'stat1')}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-[#64748b]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#1d4ed8] to-transparent"
        />
      </motion.div>
    </section>
  );
}
