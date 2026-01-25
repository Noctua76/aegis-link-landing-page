import { ArrowRight, Play } from 'lucide-react';
import aegisDashboard from '@/assets/aegis-dashboard.jpg';
import aegisAlertFlow from '@/assets/aegis-alert-flow.jpg';

const HeroSection = () => {
  const chips = [
    'Vonage SMS/Voice',
    'Αναφορές με καθοδήγηση AI',
    'Ιχνηλασιμότητα ενεργειών',
    'Ζωντανό dashboard',
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Background effects */}
      <div className="grid-overlay" />
      <div className="scanlines" />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-16">
          {/* Main headline */}
          <h1 
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="text-gradient">Aegis Link</span>
            <span className="text-foreground"> — AI Incident Response System</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Ένα alert δεν είναι notification. Είναι διαδικασία απόκρισης: escalation, αναφορά, audit trail, dashboard.
          </p>

          {/* Chips */}
          <div 
            className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {chips.map((chip) => (
              <span key={chip} className="chip">
                <span className="w-2 h-2 rounded-full bg-neon-green" />
                {chip}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href="https://YOUR-SCHEDULING-LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 text-base"
            >
              Κλείσε παρουσίαση (15')
              <ArrowRight size={18} />
            </a>
            <a
              href="#capabilities"
              className="btn-secondary inline-flex items-center justify-center gap-2 text-base"
            >
              <Play size={18} />
              Δες δυνατότητες
            </a>
          </div>

          {/* Trust line */}
          <p 
            className="text-sm text-muted-foreground/70 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            Designed for security & operational teams with high control needs.
          </p>
        </div>

        {/* Hero visuals */}
        <div 
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          {/* Dashboard screenshot */}
          <div className="glass-card glow-border p-1 group">
            <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
              <img
                src={aegisDashboard}
                alt="Aegis Link Dashboard - Real-time operations overview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <p className="text-center text-sm text-muted-foreground py-3">
              Ζωντανό dashboard — Πραγματικός χρόνος λειτουργίας
            </p>
          </div>

          {/* Alert flow screenshot */}
          <div className="glass-card glow-border p-1 group">
            <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
              <img
                src={aegisAlertFlow}
                alt="Aegis Link Alert Flow - AI-guided incident reporting"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <p className="text-center text-sm text-muted-foreground py-3">
              Alert → Ροή ερωτήσεων — Δομημένη αναφορά περιστατικού
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
