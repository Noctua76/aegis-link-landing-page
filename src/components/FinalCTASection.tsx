import { ArrowRight, Mail } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FinalCTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      className="py-24 relative overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-purple/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-neon-cyan/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <div className={`glass-card glow-border p-10 md:p-16 reveal ${isVisible ? 'visible' : ''}`}>
            <h2 
              id="final-cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Ένα link. Μια διαδικασία.
              <br />
              <span className="text-gradient">Πλήρης έλεγχος.</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Δες πώς το Aegis Link μπορεί να μεταμορφώσει τη διαχείριση περιστατικών στην ομάδα σου.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://YOUR-SCHEDULING-LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                Κλείσε demo
                <ArrowRight size={20} />
              </a>
              <a
                href="mailto:YOUR@EMAIL.COM"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Mail size={20} />
                Μίλα μαζί μας
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
