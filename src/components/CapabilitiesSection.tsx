import { Zap, Phone, MessageSquare, Clock, LayoutDashboard, Settings } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const capabilities = [
  {
    icon: Zap,
    title: 'Instant Alert',
    description: 'Άμεση ειδοποίηση μέσω web, mobile-first σχεδιασμός για γρήγορη πρόσβαση.',
    color: 'neon-purple',
  },
  {
    icon: Phone,
    title: 'Escalation',
    description: 'SMS & Voice μέσω Vonage — αυτόματη κλιμάκωση αν δεν υπάρξει απάντηση.',
    color: 'neon-cyan',
  },
  {
    icon: MessageSquare,
    title: 'AI-guided Reporting',
    description: 'Δομημένες ερωτήσεις που οδηγούν σε πλήρη αναφορά περιστατικού.',
    color: 'neon-green',
  },
  {
    icon: Clock,
    title: 'Audit Trail',
    description: 'Timeline όλων των ενεργειών — ποιος είδε, απάντησε, πότε, τι.',
    color: 'neon-purple',
  },
  {
    icon: LayoutDashboard,
    title: 'Live Dashboard',
    description: 'Real-time παρακολούθηση λειτουργιών και ανοιχτών περιστατικών.',
    color: 'neon-cyan',
  },
  {
    icon: Settings,
    title: 'Custom Logic',
    description: 'Ρόλοι, SLA, κανόνες, multi-site — πλήρης προσαρμογή στη δομή σας.',
    color: 'neon-green',
  },
];

const CapabilitiesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="capabilities" 
      className="py-24 relative"
      aria-labelledby="capabilities-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" ref={ref}>
          <h2 
            id="capabilities-heading"
            className={`text-3xl md:text-4xl font-bold mb-4 reveal ${isVisible ? 'visible' : ''}`}
          >
            <span className="text-gradient">Capabilities</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Ολοκληρωμένη διαχείριση περιστατικών — από το alert μέχρι την τελική αναφορά.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {capabilities.map((cap, index) => (
            <CapabilityCard key={cap.title} {...cap} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CapabilityCardProps {
  icon: typeof Zap;
  title: string;
  description: string;
  color: string;
  index: number;
}

const CapabilityCard = ({ icon: Icon, title, description, color, index }: CapabilityCardProps) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const colorClasses = {
    'neon-purple': 'text-neon-purple bg-neon-purple/10 border-neon-purple/30 hover:border-neon-purple/60 hover:shadow-[0_0_30px_hsl(255_100%_68%/0.3)]',
    'neon-cyan': 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30 hover:border-neon-cyan/60 hover:shadow-[0_0_30px_hsl(187_100%_58%/0.3)]',
    'neon-green': 'text-neon-green bg-neon-green/10 border-neon-green/30 hover:border-neon-green/60 hover:shadow-[0_0_30px_hsl(153_81%_54%/0.3)]',
  };

  return (
    <div
      ref={ref}
      className={`glass-card p-6 transition-all duration-500 group reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 border ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default CapabilitiesSection;
