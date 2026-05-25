import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexora — Connected Innovation',
  description:
    'Nexora builds modern digital infrastructure that streamlines operations, enhances customer experience, and drives scalable growth.',
  keywords: ['software company', 'custom software', 'healthcare systems', 'business automation', 'SaaS', 'digital transformation'],
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
  },
  openGraph: {
    title: 'Nexora — Connected Innovation',
    description: 'Modern digital infrastructure for ambitious businesses.',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    title: 'Nexora',
    statusBarStyle: 'black-translucent',
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-[#0a0b14] text-[#f0f0f5] antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
