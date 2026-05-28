'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Globe, Monitor, Palette, MousePointer2,
  Heart, Scissors, Users, CalendarDays,
  MessageCircle, Mail, Bot, GitBranch,
  Server, Shield, Wrench, Activity,
  TrendingUp, ArrowUpRight,
} from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

type TabKey = 'web' | 'sys' | 'auto' | 'infra';

const tabs: { key: TabKey; tKey: 'tabWeb' | 'tabSystems' | 'tabAutomation' | 'tabInfra'; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { key: 'web',   tKey: 'tabWeb',        icon: Globe },
  { key: 'sys',   tKey: 'tabSystems',    icon: Server },
  { key: 'auto',  tKey: 'tabAutomation', icon: MessageCircle },
  { key: 'infra', tKey: 'tabInfra',      icon: Shield },
];

const tabStyle: Record<TabKey, { active: string; border: string; glow: string; iconBg: string; iconColor: string; benefitBg: string; benefitText: string }> = {
  web:   { active: 'text-[#3b82f6] border-[#3b82f6]',  border: 'border-[#1d4ed8]/30',  glow: 'rgba(29,78,216,0.10)',    iconBg: 'bg-[#1d4ed8]/15',  iconColor: 'text-[#3b82f6]',  benefitBg: 'bg-[#1d4ed8]/12',  benefitText: 'text-[#60a5fa]' },
  sys:   { active: 'text-[#f87171] border-[#f87171]',  border: 'border-[#7f1d1d]/30',  glow: 'rgba(127,29,29,0.10)',   iconBg: 'bg-[#7f1d1d]/15',  iconColor: 'text-[#f87171]',  benefitBg: 'bg-[#7f1d1d]/12',  benefitText: 'text-[#fca5a5]' },
  auto:  { active: 'text-[#a78bfa] border-[#a78bfa]',  border: 'border-[#6d28d9]/30',  glow: 'rgba(109,40,217,0.10)',  iconBg: 'bg-[#6d28d9]/15',  iconColor: 'text-[#a78bfa]',  benefitBg: 'bg-[#6d28d9]/12',  benefitText: 'text-[#c4b5fd]' },
  infra: { active: 'text-[#34d399] border-[#34d399]',  border: 'border-[#065f46]/30',  glow: 'rgba(6,95,70,0.10)',    iconBg: 'bg-[#065f46]/15',  iconColor: 'text-[#34d399]',  benefitBg: 'bg-[#065f46]/12',  benefitText: 'text-[#6ee7b7]' },
};

const itemIcons: Record<TabKey, React.ComponentType<{ size?: number; className?: string }>[]> = {
  web:   [Globe, Monitor, Palette, MousePointer2],
  sys:   [Users, Shield],
  auto:  [MessageCircle, Mail, GitBranch],
  infra: [Server, Shield, Wrench, Activity],
};

const itemCounts: Record<TabKey, number> = {
  web: 4, sys: 2, auto: 3, infra: 4,
};

const CARE_BASE = 'https://nexora-care-nu.vercel.app';

type TKey = Parameters<ReturnType<typeof useTranslations<'services'>>>[0];

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<TabKey>('web');

  const itemLinks: Partial<Record<TabKey, (string | null)[]>> = {
    sys: [`${CARE_BASE}?lang=${locale}`, null],
  };

  const style = tabStyle[activeTab];
  const icons = itemIcons[activeTab];
  const count = itemCounts[activeTab];

  const prefix: Record<TabKey, string> = {
    web: 'web', sys: 'sys', auto: 'auto', infra: 'infra',
  };
  const p = prefix[activeTab];

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #0a0b14 0%, #0f1120 50%, #0a0b14 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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

        {/* Tab row */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/4 border border-white/8 overflow-x-auto max-w-full">
            {tabs.map(({ key, tKey, icon: Icon }) => {
              const isActive = activeTab === key;
              const s = tabStyle[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? `bg-white/8 ${s.active} border border-white/10`
                      : 'text-[#64748b] hover:text-[#94a3b8] hover:bg-white/4'
                  }`}
                >
                  <Icon size={15} />
                  {t(tKey as TKey)}
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 inset-x-4 h-0.5 rounded-full"
                      style={{ background: s.active.includes('3b82f6') ? '#3b82f6' : s.active.includes('f87171') ? '#f87171' : s.active.includes('a78bfa') ? '#a78bfa' : '#34d399' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Tab intro */}
            <div className="text-center mb-8">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
              >
                {t(`${p}Title` as TKey)}
              </h3>
              <p className="text-[#94a3b8] max-w-xl mx-auto text-sm sm:text-base">
                {t(`${p}Desc` as TKey)}
              </p>
            </div>

            {/* 2×2 cards */}
            <div className={`grid sm:grid-cols-2 ${count === 2 ? 'lg:grid-cols-2 max-w-2xl mx-auto' : count === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-5`}>
              {Array.from({ length: count }, (_, i) => i).map((i) => {
                const Icon = icons[i];
                const titleKey = `${p}Item${i}Title` as TKey;
                const descKey = `${p}Item${i}Desc` as TKey;
                const benefitKey = `${p}Item${i}Benefit` as TKey;
                const link = itemLinks[activeTab]?.[i] ?? null;
                const glowColor = style.active.includes('3b82f6') ? 'linear-gradient(90deg,#3b82f6,transparent)' : style.active.includes('f87171') ? 'linear-gradient(90deg,#f87171,transparent)' : style.active.includes('a78bfa') ? 'linear-gradient(90deg,#a78bfa,transparent)' : 'linear-gradient(90deg,#34d399,transparent)';
                const cardClass = `group relative rounded-2xl border ${style.border} overflow-hidden flex flex-col ${link ? 'cursor-pointer' : 'cursor-default'}`;
                const cardStyle = { background: `radial-gradient(ellipse at top left, ${style.glow} 0%, transparent 65%), #161828` };
                const cardInner = (
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${style.iconBg} mb-4`}>
                      <Icon size={20} className={style.iconColor} />
                    </div>
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h4
                        className="text-base font-bold text-white leading-snug"
                        style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                      >
                        {t(titleKey)}
                      </h4>
                      {link && (
                        <ArrowUpRight size={16} className={`shrink-0 mt-0.5 ${style.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                      )}
                    </div>
                    <p className="text-sm text-[#94a3b8] leading-relaxed flex-1 mb-4">
                      {t(descKey)}
                    </p>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${style.benefitBg} border border-white/8 ${style.benefitText}`}>
                      <TrendingUp size={11} />
                      {t(benefitKey)}
                    </div>
                  </div>
                );
                return link ? (
                  <motion.a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ y: -4, transition: { duration: 0.18 } }}
                    className={cardClass}
                    style={cardStyle}
                  >
                    {cardInner}
                    <div className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ background: glowColor }} />
                  </motion.a>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ y: -4, transition: { duration: 0.18 } }}
                    className={cardClass}
                    style={cardStyle}
                  >
                    {cardInner}
                    <div className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ background: glowColor }} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
