import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyNexora from '@/components/sections/WhyNexora';
import Process from '@/components/sections/Process';
import Vision from '@/components/sections/Vision';
import AIActions from '@/components/sections/AIActions';
import Portfolio from '@/components/sections/Portfolio';
import CTA from '@/components/sections/CTA';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="overflow-hidden">
      <Navbar locale={locale} />
      <Hero />
      <Services />
      <WhyNexora />
      <Process />
      <Vision />
      <AIActions />
      <Portfolio />
      <CTA />
      <Footer locale={locale} />
    </main>
  );
}
