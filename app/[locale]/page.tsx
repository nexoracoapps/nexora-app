import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import WhyNexora from '@/components/sections/WhyNexora';
import Process from '@/components/sections/Process';
import Results from '@/components/sections/Results';
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
      <About />
      <Services />
<WhyNexora />
      <Process />
      <Results />
      <CTA />
      <Footer locale={locale} />
    </main>
  );
}
