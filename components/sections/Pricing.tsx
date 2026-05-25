'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

type TKey = Parameters<ReturnType<typeof useTranslations<'pricing'>>>[0];

const LP_TIERS = ['lp0', 'lp1', 'lp2'] as const;
const SYS_TIERS = ['sys0', 'sys1', 'sys2'] as const;
const FEATURES = ['F0', 'F1', 'F2', 'F3', 'F4'] as const;

const tierStyles = [
  {
    border: 'border-white/8',
    bg: '#141624',
    nameBg: 'bg-white/4 text-[#94a3b8]',
    rangeBg: 'from-[#94a3b8] to-[#64748b]',
    btn: 'bg-white/8 border border-white/12 text-white hover:bg-white/12',
  },
  {
    border: 'border-[#1d4ed8]/50',
    bg: '#0f1628',
    nameBg: 'bg-[#1d4ed8]/20 text-[#3b82f6]',
    rangeBg: 'from-[#3b82f6] to-[#1d4ed8]',
    btn: 'bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] text-white hover:brightness-110',
  },
  {
    border: 'border-[#7f1d1d]/40',
    bg: '#160f14',
    nameBg: 'bg-[#7f1d1d]/20 text-[#f87171]',
    rangeBg: 'from-[#f87171] to-[#7f1d1d]',
    btn: 'bg-white/8 border border-white/12 text-white hover:bg-white/12',
  },
];

function PricingColumn({
  titleKey,
  tiers,
  prefix,
}: {
  titleKey: TKey;
  tiers: readonly string[];
  prefix: string;
}) {
  const t = useTranslations('pricing');

  return (
    <div>
      <h3
        className="text-xl font-bold text-white mb-6 text-center"
        style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
      >
        {t(titleKey)}
      </h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {tiers.map((tier, i) => {
          const s = tierStyles[i];
          const isHighlight = i === 1;
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              className={`relative rounded-2xl border ${s.border} overflow-hidden flex flex-col`}
              style={{ background: s.bg }}
            >
              {isHighlight && (
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent" />
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Name + popular badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.nameBg}`}>
                    {t(`${tier}Name` as TKey)}
                  </span>
                  {isHighlight && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#fbbf24] bg-[#fbbf24]/12 px-2 py-0.5 rounded-full">
                      <Star size={10} className="fill-[#fbbf24]" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Price range */}
                <div className="mb-2">
                  <span
                    className="text-2xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${s.rangeBg.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: 'var(--font-poppins, Poppins, sans-serif)',
                    }}
                  >
                    {t(`${tier}Range` as TKey)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#64748b] leading-relaxed mb-5">
                  {t(`${tier}Desc` as TKey)}
                </p>

                {/* Features */}
                <ul className="space-y-2 flex-1 mb-5">
                  {FEATURES.map((fk) => (
                    <li key={fk} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                      <CheckCircle2 size={13} className={isHighlight ? 'text-[#3b82f6] shrink-0 mt-0.5' : 'text-[#475569] shrink-0 mt-0.5'} />
                      {t(`${tier}${fk}` as TKey)}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-semibold transition-all duration-200 ${s.btn}`}
                >
                  {t('cta')}
                  <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');

  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(29,78,216,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(127,29,29,0.08) 0%, transparent 55%), #0a0b14',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto mb-3">{t('subtitle')}</p>
          <p className="text-xs text-[#475569]">{t('note')}</p>
        </motion.div>

        {/* Two columns */}
        <div className="space-y-12">
          <PricingColumn titleKey="lpTitle" tiers={LP_TIERS} prefix="lp" />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <PricingColumn titleKey="sysTitle" tiers={SYS_TIERS} prefix="sys" />
        </div>

        {/* Bottom CTA note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-[#64748b] mt-10"
        >
          Not sure what you need?{' '}
          <a href="#contact" className="text-[#3b82f6] hover:text-[#60a5fa] transition-colors font-medium">
            Book a free consultation
          </a>{' '}
          and we'll scope it together.
        </motion.p>
      </div>
    </section>
  );
}
