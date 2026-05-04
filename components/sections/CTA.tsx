'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

export default function CTA() {
  const t = useTranslations('cta');

  const features = [
    { key: 'feature1' as const, icon: CheckCircle2 },
    { key: 'feature2' as const, icon: CheckCircle2 },
    { key: 'feature3' as const, icon: CheckCircle2 },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(29,78,216,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(127,29,29,0.15) 0%, transparent 60%), #0a0b14',
        }}
      />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#1d4ed8]/10 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#7f1d1d]/10 blur-[100px] pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <SectionBadge color="mixed">{t('badge')}</SectionBadge>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
          >
            {t('title').split(' ').slice(0, 3).join(' ')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('title').split(' ').slice(3, 5).join(' ')}
            </span>{' '}
            {t('title').split(' ').slice(5).join(' ')}
          </h2>

          <p className="text-lg text-[#94a3b8] max-w-xl mx-auto mb-10 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {features.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/8 text-sm text-[#cbd5e1]"
              >
                <Icon size={14} className="text-[#3b82f6]" />
                {t(key)}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:mhammad.wahbeh@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2.5 h-13 px-8 text-base font-semibold rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#7f1d1d] text-white shadow-xl shadow-blue-900/30 hover:brightness-110 hover:shadow-blue-800/50 transition-all duration-200"
            >
              <Sparkles size={17} />
              {t('cta1')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="https://wa.me/00962790891028"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 h-13 px-8 text-base font-semibold rounded-full bg-white/8 border border-white/12 text-white hover:bg-white/12 hover:border-white/22 transition-all duration-200"
            >
              <Phone size={16} />
              {t('cta2')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
