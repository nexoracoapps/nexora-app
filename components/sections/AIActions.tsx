'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Brain,
  Cpu,
  LineChart,
  BotMessageSquare,
  ScanSearch,
  Workflow,
  Zap,
  ArrowRight,
} from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

const AIOrb = dynamic(() => import('@/components/3d/AIOrb'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const actionIcons = [Brain, LineChart, BotMessageSquare, Cpu, ScanSearch, Workflow];

const actionColors = [
  { border: 'border-[#1d4ed8]/40', icon: 'bg-[#1d4ed8]/15 text-[#60a5fa]', glow: '#1d4ed8' },
  { border: 'border-[#7f1d1d]/40', icon: 'bg-[#7f1d1d]/15 text-[#f87171]', glow: '#7f1d1d' },
  { border: 'border-[#1d4ed8]/30', icon: 'bg-[#1d4ed8]/10 text-[#93c5fd]', glow: '#1d4ed8' },
  { border: 'border-[#7f1d1d]/30', icon: 'bg-[#7f1d1d]/10 text-[#fca5a5]', glow: '#7f1d1d' },
  { border: 'border-[#6d28d9]/30', icon: 'bg-[#6d28d9]/12 text-[#c4b5fd]', glow: '#6d28d9' },
  { border: 'border-white/10',     icon: 'bg-white/6 text-[#94a3b8]',       glow: '#475569' },
];

export default function AIActions() {
  const t = useTranslations('ai');

  return (
    <section
      id="ai"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 15% 60%, rgba(29,78,216,0.1) 0%, transparent 55%), radial-gradient(ellipse at 85% 40%, rgba(127,29,29,0.1) 0%, transparent 55%), #0a0b14',
      }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t('title').split(' ').slice(0, 2).join(' ')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('title').split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Two-column layout: 3D orb + action cards */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left: 3D AI Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1d4ed8]/20 to-[#7f1d1d]/20 blur-2xl scale-75" />

            {/* 3D canvas */}
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-white/6"
              style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.07) 0%, #0f1120 70%)' }}
            >
              <AIOrb />
              {/* Centre label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div
                    className="text-lg font-bold text-white/80 mb-1"
                    style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)', textShadow: '0 0 20px rgba(59,130,246,0.5)' }}
                  >
                    Nexora AI
                  </div>
                  <div className="text-xs text-[#94a3b8]">{t('orbLabel')}</div>
                </div>
              </div>
            </div>

            {/* Floating stat chips around the orb */}
            {([
              { label: t('chip1'), pos: 'top-4 left-4', color: '#3b82f6' },
              { label: t('chip2'), pos: 'top-4 right-4', color: '#dc2626' },
              { label: t('chip3'), pos: 'bottom-4 left-4', color: '#a78bfa' },
              { label: t('chip4'), pos: 'bottom-4 right-4', color: '#34d399' },
            ] as const).map(({ label, pos, color }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: 'easeInOut' }}
                className={`absolute ${pos} flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0f1120]/90 border border-white/10 backdrop-blur-md text-xs font-semibold`}
                style={{ color }}
              >
                <Zap size={10} style={{ color }} />
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* Right: 6 action cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([0, 1, 2, 3, 4, 5] as const).map((i) => {
              const Icon = actionIcons[i];
              const c = actionColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl border ${c.border} p-5 cursor-default overflow-hidden`}
                  style={{
                    background: `radial-gradient(ellipse at top left, rgba(${
                      c.glow === '#1d4ed8' ? '29,78,216' : c.glow === '#7f1d1d' ? '127,29,29' : '109,40,217'
                    },0.1) 0%, transparent 70%), #161828`,
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.icon} mb-3`}>
                    <Icon size={18} />
                  </div>
                  <h3
                    className="text-sm font-bold text-white mb-1"
                    style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                  >
                    {t(`actions.${i}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {t(`actions.${i}.description` as Parameters<typeof t>[0])}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{ background: `linear-gradient(90deg, ${c.glow}, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-white/8 bg-gradient-to-r from-[#1d4ed8]/8 to-[#7f1d1d]/8"
        >
          <div>
            <p
              className="font-bold text-white mb-1"
              style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
            >
              {t('ctaTitle')}
            </p>
            <p className="text-sm text-[#94a3b8]">{t('ctaSubtitle')}</p>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group shrink-0 inline-flex items-center gap-2 h-11 px-7 text-sm font-semibold rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#7f1d1d] text-white hover:brightness-110 transition-all duration-200 shadow-lg shadow-blue-900/25"
          >
            {t('ctaButton')}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
