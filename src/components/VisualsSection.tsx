import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import aegisMontage from '@/assets/aegis-montage.jpg';

const VisualsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="visuals" 
      className="py-24 relative overflow-hidden"
      aria-labelledby="visuals-heading"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 
            id="visuals-heading"
            className={`text-3xl md:text-4xl font-bold mb-4 reveal ${isVisible ? 'visible' : ''}`}
          >
            <span className="text-gradient">Visuals</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Πραγματικές εικόνες από το προϊόν — καμία υπόσχεση, μόνο αποδείξεις.
          </p>
        </div>

        {/* Large image montage */}
        <div className={`max-w-5xl mx-auto mb-12 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="glass-card glow-border p-2 holographic">
            <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
              <img
                src={aegisMontage}
                alt="Aegis Link Product Montage - Dashboard, alerts, and reporting views"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Copy block with CTA */}
        <div className={`max-w-3xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
          <div className="glass-card p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              Θες να το δουν πάνω στη δική τους ροή;
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Δείξε στην ομάδα σου πώς φαίνεται το Aegis Link στη δική σας δομή — 
              ρόλοι, sites, escalation rules, όλα προσαρμοσμένα.
            </p>
            <a
              href="https://YOUR-SCHEDULING-LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Κλείσε προσωπική επίδειξη
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualsSection;
