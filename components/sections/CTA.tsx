'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Phone, CheckCircle2, Send } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';

type TKey = Parameters<ReturnType<typeof useTranslations<'contact'>>>[0];

export default function CTA() {
  const t = useTranslations('contact');

  const [form, setForm] = useState({ name: '', business: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Nexora! 👋\n\nName: ${form.name}\nBusiness: ${form.business}\n\n${form.message}`
    );
    window.open(`https://wa.me/962790891028?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden scroll-mt-20"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 40%, rgba(29,78,216,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(127,29,29,0.12) 0%, transparent 55%), #0a0b14',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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
          <p className="text-lg text-[#94a3b8] max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left — WhatsApp + contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            {/* WhatsApp CTA — primary */}
            <a
              href="https://wa.me/962790891028"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-[#22c55e]/30 bg-[#16a34a]/8 hover:bg-[#16a34a]/14 hover:border-[#22c55e]/50 transition-all duration-200 mb-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#22c55e] flex items-center justify-center shadow-lg shadow-green-900/30 shrink-0">
                <MessageCircle size={26} className="text-white" />
              </div>
              <div>
                <div
                  className="text-lg font-bold text-white group-hover:text-[#4ade80] transition-colors"
                  style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
                >
                  {t('whatsapp')}
                </div>
                <div className="text-sm text-[#64748b]">{t('whatsappSub')}</div>
              </div>
              <div className="ml-auto text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </a>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/6" />
              <span className="text-xs text-[#475569] font-medium">or reach us at</span>
              <div className="flex-1 h-px bg-white/6" />
            </div>

            {/* Email + Phone */}
            <div className="space-y-3 mb-8">
              <a
                href="mailto:nexoracoapps@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 hover:border-white/10 transition-all duration-150 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1d4ed8]/15 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#3b82f6]" />
                </div>
                <div>
                  <div className="text-xs text-[#64748b] mb-0.5">{t('emailLabel')}</div>
                  <div className="text-sm text-[#cbd5e1] group-hover:text-white transition-colors font-medium">
                    nexoracoapps@gmail.com
                  </div>
                </div>
              </a>
              <a
                href="https://wa.me/962790891028"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 hover:border-white/10 transition-all duration-150 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#22c55e]/12 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#22c55e]" />
                </div>
                <div>
                  <div className="text-xs text-[#64748b] mb-0.5">{t('phoneLabel')}</div>
                  <div className="text-sm text-[#cbd5e1] group-hover:text-white transition-colors font-medium">
                    +962 79 089 1028
                  </div>
                </div>
              </a>
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-2 text-sm text-[#64748b]">
              <CheckCircle2 size={15} className="text-[#22c55e]" />
              {t('guarantee')}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-white/8 bg-white/3 p-7">
              <h3
                className="text-lg font-bold text-white mb-6"
                style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
              >
                {t('formTitle')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#64748b] mb-1.5 font-medium">
                      {t('nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-white/8 bg-white/4 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#1d4ed8]/60 focus:bg-white/6 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#64748b] mb-1.5 font-medium">
                      {t('businessLabel')}
                    </label>
                    <input
                      type="text"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-white/8 bg-white/4 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#1d4ed8]/60 focus:bg-white/6 transition-all"
                      placeholder="e.g. Clinic, Spa, Retail"
                    />
                  </div>
                </div>

<div>
                  <label className="block text-xs text-[#64748b] mb-1.5 font-medium">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/8 bg-white/4 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#1d4ed8]/60 focus:bg-white/6 transition-all resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#1d4ed8] to-[#7f1d1d] text-white hover:brightness-110 transition-all duration-200 shadow-lg shadow-blue-900/20"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 size={16} />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      {t('submitLabel')}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
