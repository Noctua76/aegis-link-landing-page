import Navbar from '@/components/Navbar';
import EditorialHeroSection from '@/components/EditorialHeroSection';
import ShiftBeginsSection from '@/components/ShiftBeginsSection';
import PatrolStorySection from '@/components/PatrolStorySection';
import SilenceStorySection from '@/components/SilenceStorySection';
import HeroSection from '@/components/HeroSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import VisualsSection from '@/components/VisualsSection';
import UniquenessSection from '@/components/UniquenessSection';
import ExtensionsSection from '@/components/ExtensionsSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import SectionProgressRail from '@/components/SectionProgressRail';
import Footer from '@/components/Footer';
import PreviewAccessModal from '@/components/PreviewAccessModal';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      <SectionProgressRail />
      
      {/* Main content */}
      <main>
        <EditorialHeroSection />
        <ShiftBeginsSection />
        <PatrolStorySection />
        <SilenceStorySection />
        <HeroSection />
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
      <PreviewAccessModal />
    </div>
  );
};

export default Index;
