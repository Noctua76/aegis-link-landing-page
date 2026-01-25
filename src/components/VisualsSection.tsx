import { ArrowRight, Smartphone, Monitor } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import fieldEscalationFlow from '@/assets/field-escalation-flow.png';
import controlDashboard from '@/assets/control-dashboard.png';

const VisualsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="visuals" 
      className="py-24 relative overflow-hidden"
      aria-labelledby="visuals-heading"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 
            id="visuals-heading"
            className={`text-3xl md:text-4xl font-bold mb-4 reveal ${isVisible ? 'visible' : ''}`}
          >
            <span className="text-gradient">Το Προϊόν</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Δύο διεπαφές, ένας στόχος: γρήγορη απόκριση με πλήρη έλεγχο.
          </p>
        </div>

        {/* Two-column product views */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* Field Interface */}
          <div className={`reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="glass-card p-6 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
                  <Smartphone className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Field Interface</h3>
                  <p className="text-sm text-muted-foreground">Για προσωπικό πεδίου</p>
                </div>
              </div>
              
              {/* Features list */}
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  Alert button με άμεση ειδοποίηση
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  Real-time status κλήσεων & SMS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  AI-guided αναφορά περιστατικού
                </li>
              </ul>

              {/* Screenshot */}
              <div className="relative overflow-hidden rounded-lg border border-border/50">
                <img
                  src={fieldEscalationFlow}
                  alt="Aegis Link Field Interface - Mobile alert with call and SMS status tracking"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <p className="text-xs text-muted-foreground/70 mt-4 text-center">
                Alert → Κλήσεις → SMS → Αναφορά — όλα σε μία ροή
              </p>
            </div>
          </div>

          {/* Control Interface */}
          <div className={`reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <div className="glass-card p-6 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
                  <Monitor className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Control Interface</h3>
                  <p className="text-sm text-muted-foreground">Για διοίκηση & operations</p>
                </div>
              </div>
              
              {/* Features list */}
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  Ζωντανό dashboard με KPIs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  Charts & analytics σε πραγματικό χρόνο
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  Πλήρες audit trail & ιστορικό
                </li>
              </ul>

              {/* Screenshot */}
              <div className="relative overflow-hidden rounded-lg border border-border/50">
                <img
                  src={controlDashboard}
                  alt="Aegis Link Control Dashboard - Operations overview with charts and live status"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <p className="text-xs text-muted-foreground/70 mt-4 text-center">
                Dashboard → Requests → Response times → Audit log
              </p>
            </div>
          </div>
        </div>

        {/* Copy block with CTA */}
        <div className={`max-w-3xl mx-auto text-center reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
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
