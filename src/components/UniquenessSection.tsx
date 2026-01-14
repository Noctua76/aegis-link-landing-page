import { X, Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const competitors = [
  'Chatbot / FAQ αυτοματισμοί',
  'Alerts χωρίς reporting',
  'Καμία καταγραφή ενεργειών',
  'Χωρίς escalation διαδικασία',
  'Γενικά εργαλεία ticketing',
];

const aegisFeatures = [
  'Διαδικασία, όχι απλό notification',
  'Δομημένη αναφορά περιστατικού',
  'Πλήρες audit trail',
  'Αυτόματο escalation (SMS/Voice)',
  'Live dashboard & έλεγχος',
];

const UniquenessSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      className="py-24 relative"
      aria-labelledby="uniqueness-heading"
    >
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <h2 
            id="uniqueness-heading"
            className={`text-3xl md:text-4xl font-bold mb-4 reveal ${isVisible ? 'visible' : ''}`}
          >
            <span className="text-foreground">Η </span>
            <span className="text-gradient">Διαφορά</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Competitors column */}
          <div 
            className={`glass-card p-8 border-destructive/20 reveal ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <h3 className="text-lg font-semibold text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <X size={16} className="text-destructive" />
              </span>
              Τι κάνουν οι περισσότεροι
            </h3>
            <ul className="space-y-4">
              {competitors.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <X size={18} className="text-destructive/60 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aegis column */}
          <div 
            className={`glass-card glow-border p-8 reveal ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center">
                <Check size={16} className="text-neon-green" />
              </span>
              Τι κάνει το Aegis Link
            </h3>
            <ul className="space-y-4">
              {aegisFeatures.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-foreground"
                >
                  <Check size={18} className="text-neon-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniquenessSection;
