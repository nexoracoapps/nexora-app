'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Heart, Building2, Users, Settings, CheckCircle2 } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

const serviceConfig = [
  {
    key: 'healthcare' as const,
    icon: Heart,
    gradient: 'from-[#1d4ed8]/20 to-[#1d4ed8]/5',
    borderColor: 'border-[#1d4ed8]/30',
    iconBg: 'bg-[#1d4ed8]/15',
    iconColor: 'text-[#3b82f6]',
    glowColor: 'rgba(29,78,216,0.15)',
  },
  {
    key: 'realestate' as const,
    icon: Building2,
    gradient: 'from-[#7f1d1d]/20 to-[#7f1d1d]/5',
    borderColor: 'border-[#7f1d1d]/30',
    iconBg: 'bg-[#7f1d1d]/15',
    iconColor: 'text-[#f87171]',
    glowColor: 'rgba(127,29,29,0.15)',
  },
  {
    key: 'elderly' as const,
    icon: Users,
    gradient: 'from-[#1d4ed8]/15 to-[#7f1d1d]/15',
    borderColor: 'border-white/10',
    iconBg: 'bg-gradient-to-br from-[#1d4ed8]/20 to-[#7f1d1d]/20',
    iconColor: 'text-[#c4b5fd]',
    glowColor: 'rgba(100,40,160,0.12)',
  },
  {
    key: 'custom' as const,
    icon: Settings,
    gradient: 'from-[#7f1d1d]/20 to-[#1d4ed8]/20',
    borderColor: 'border-[#7f1d1d]/25',
    iconBg: 'bg-[#7f1d1d]/15',
    iconColor: 'text-[#fca5a5]',
    glowColor: 'rgba(127,29,29,0.12)',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Services() {
  const t = useTranslations('services');

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
          viewport={{ once: true, margin: '-100px' }}
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

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {serviceConfig.map((service) => {
            const Icon = service.icon;
            const featureKeys = ['0', '1', '2', '3', '4'] as const;
            const features = featureKeys.map(
              (k) => t(`${service.key}.features.${k}` as Parameters<typeof t>[0])
            );

            return (
              <motion.div
                key={service.key}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative group rounded-2xl border ${service.borderColor} overflow-hidden cursor-default`}
                style={{
                  background: `radial-gradient(ellipse at top left, ${service.glowColor} 0%, transparent 60%), #161828`,
                }}
              >
                <div className="p-7 lg:p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.iconBg} mb-5`}>
                    <Icon size={22} className={service.iconColor} />
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                  >
                    {t(`${service.key}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
                    {t(`${service.key}.description` as Parameters<typeof t>[0])}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-[#cbd5e1]">
                        <CheckCircle2 size={14} className={service.iconColor + ' shrink-0'} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover gradient bottom border */}
                <div
                  className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.glowColor.replace('0.15', '0.8')}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
