import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import EditorialHeroSection from '@/components/EditorialHeroSection';
import HeroSection from '@/components/HeroSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import VisualsSection from '@/components/VisualsSection';
import UniquenessSection from '@/components/UniquenessSection';
import ExtensionsSection from '@/components/ExtensionsSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import SectionProgressRail from '@/components/SectionProgressRail';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated particle background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar />
      <SectionProgressRail />
      
      {/* Main content */}
      <main>
        <EditorialHeroSection />
        <div id="operations-view">
          <HeroSection />
        </div>
        <CapabilitiesSection />
        <VisualsSection />
        <UniquenessSection />
        <ExtensionsSection />
        <FAQSection />
      </main>

      <div className="access-story-continuation">
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
