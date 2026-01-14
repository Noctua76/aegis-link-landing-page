import { Timer, Users, Link, BarChart3, Camera, Palette } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const extensions = [
  {
    icon: Timer,
    title: 'SLA & Severity',
    description: 'Επίπεδα προτεραιότητας και χρονικά όρια απόκρισης.',
  },
  {
    icon: Users,
    title: 'Multi-site / Shifts / Roles',
    description: 'Διαχείριση πολλαπλών τοποθεσιών, βαρδιών και ρόλων.',
  },
  {
    icon: Link,
    title: 'Integrations',
    description: 'CRM, ERP, ticketing, Teams, Slack, webhooks.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Analytics',
    description: 'KPIs, response times, patterns — data-driven αποφάσεις.',
  },
  {
    icon: Camera,
    title: 'Evidence Capture',
    description: 'Φωτογραφίες, checklists, σημειώσεις — τεκμηρίωση.',
  },
  {
    icon: Palette,
    title: 'White-label',
    description: 'Branding, domain/subdomain — δική σας ταυτότητα.',
  },
];

const ExtensionsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="extensions" 
      className="py-24 relative"
      aria-labelledby="extensions-heading"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 
            id="extensions-heading"
            className={`text-3xl md:text-4xl font-bold mb-4 reveal ${isVisible ? 'visible' : ''}`}
          >
            <span className="text-gradient">Extensions</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Modular δυνατότητες που προσθέτεις όταν τις χρειαστείς.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {extensions.map((ext, index) => (
            <ExtensionCard key={ext.title} {...ext} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExtensionCardProps {
  icon: typeof Timer;
  title: string;
  description: string;
  index: number;
}

const ExtensionCard = ({ icon: Icon, title, description, index }: ExtensionCardProps) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`glass-card p-5 flex items-start gap-4 group transition-all duration-300 hover:border-neon-cyan/40 reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-neon-cyan/20">
        <Icon size={20} className="text-neon-cyan" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ExtensionsSection;
