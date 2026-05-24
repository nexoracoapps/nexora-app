'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const navLinks = [
    { label: t('services'), href: '#services' },
{ label: t('why'), href: '#why' },
    { label: t('process'), href: '#process' },
    { label: t('results'), href: '#results' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0b14]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href={`/${locale}`} className="shrink-0">
            <Logo size="md" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#94a3b8] hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150 font-medium"
              aria-label="Toggle language"
            >
              <Globe size={15} />
              <span>{locale === 'en' ? 'عربي' : 'EN'}</span>
            </button>
            <a
              href="#contact"
              className="flex items-center justify-center h-9 px-5 text-sm font-semibold rounded-full transition-all duration-200 bg-gradient-to-r from-[#1d4ed8] to-[#7f1d1d] text-white hover:brightness-110 hover:shadow-lg hover:shadow-blue-900/30"
            >
              {t('getStarted')}
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLocale}
              className="p-2 text-[#94a3b8] hover:text-white rounded-lg hover:bg-white/5 transition-all"
              aria-label="Toggle language"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#94a3b8] hover:text-white rounded-lg hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/5 bg-[#0f1120]/95 backdrop-blur-xl"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-[#94a3b8] hover:text-white rounded-xl hover:bg-white/5 transition-all font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/5">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#7f1d1d] text-white hover:brightness-110 transition-all"
                >
                  {t('getStarted')}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
