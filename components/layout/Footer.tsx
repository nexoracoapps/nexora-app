'use client';

import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone, GitBranch, ExternalLink, X as XIcon } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const isRTL = locale === 'ar';

  const serviceLinks = [
    { key: 'web',        href: '#services', tab: 'web'   },
    { key: 'systems',    href: '#services', tab: 'sys'   },
    { key: 'automation', href: '#services', tab: 'auto'  },
    { key: 'infra',      href: '#services', tab: 'infra' },
  ] as const;

  const companyLinks = [
    { key: 'about', href: '#about' },
    { key: 'process', href: '#process' },
] as const;

  return (
    <footer className="relative border-t border-white/6 bg-[#060810]">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1d4ed8]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href={`/${locale}`} className="inline-block mb-4">
              <Logo size="md" />
            </a>
            <p className="text-sm text-[#64748b] leading-relaxed mb-6 max-w-[220px]">
              {t('description')}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: GitBranch, href: '#', label: 'GitHub' },
                { Icon: ExternalLink, href: '#', label: 'LinkedIn' },
                { Icon: XIcon, href: '#', label: 'X/Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/8 text-[#64748b] hover:text-white hover:border-[#1d4ed8]/40 hover:bg-[#1d4ed8]/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-sm font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
            >
              {t('services')}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map(({ key, href, tab }) => (
                <li key={key}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      // Fire event so Services component switches to the right tab
                      window.dispatchEvent(new CustomEvent('nexora-services-tab', { detail: tab }));
                      // Scroll to services section
                      const el = document.getElementById('services');
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors duration-150"
                  >
                    {t(`links.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-sm font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
            >
              {t('company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors duration-150"
                  >
                    {t(`links.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
            >
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-[#1d4ed8] shrink-0 mt-0.5" />
                <a
                  href="mailto:nexoracoapps@gmail.com"
                  className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors"
                >
                  {t('contactInfo.email')}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#dc2626] shrink-0 mt-0.5" />
                <span className="text-sm text-[#64748b]">
                  {t('contactInfo.location')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-[#22c55e] shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/962790891028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#64748b] hover:text-[#22c55e] transition-colors"
                >
                  +962 79 089 1028
                </a>
              </li>
            </ul>

            {/* CTA pill */}
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center h-9 px-5 text-xs font-semibold rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#7f1d1d] text-white hover:brightness-110 transition-all duration-200"
            >
              {t('cta')}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-[#475569]">{t('copyright')}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#475569] hover:text-[#94a3b8] transition-colors">
              {t('privacy')}
            </a>
            <a href="#" className="text-xs text-[#475569] hover:text-[#94a3b8] transition-colors">
              {t('terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
