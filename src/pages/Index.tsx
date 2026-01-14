import { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import VisualsSection from '@/components/VisualsSection';
import UniquenessSection from '@/components/UniquenessSection';
import ExtensionsSection from '@/components/ExtensionsSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';
import MobileBottomCTA from '@/components/MobileBottomCTA';

const Index = () => {
  useEffect(() => {
    // Update document metadata
    document.title = 'Aegis Link — AI Incident Response System | Noctua Core';
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Aegis Link by Noctua Core — Ολοκληρωμένο σύστημα διαχείρισης περιστατικών με AI-guided reporting, escalation, audit trail και live dashboard.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Aegis Link by Noctua Core — Ολοκληρωμένο σύστημα διαχείρισης περιστατικών με AI-guided reporting, escalation, audit trail και live dashboard.';
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Aegis Link — AI Incident Response System' },
      { property: 'og:description', content: 'Ένα alert δεν είναι notification. Είναι διαδικασία απόκρισης: escalation, αναφορά, audit trail, dashboard.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Noctua Core' },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated particle background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main>
        <HeroSection />
        <CapabilitiesSection />
        <VisualsSection />
        <UniquenessSection />
        <ExtensionsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Mobile bottom CTA bar */}
      <MobileBottomCTA />
      
      {/* Extra padding for mobile bottom bar */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </div>
  );
};

export default Index;
