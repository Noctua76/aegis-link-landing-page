import { ArrowRight, Play } from 'lucide-react';
import fieldAlertMobile from '@/assets/field-alert-mobile.jpg';

const HeroSection = () => {
  const chips = [
    'Vonage SMS/Voice',
    'Αναφορές με καθοδήγηση AI',
    'Ιχνηλασιμότητα ενεργειών',
    'Ζωντανό dashboard',
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Subtle background gradient - less cinematic, more professional */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Main headline */}
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="text-gradient">Aegis Link</span>
              <br />
              <span className="text-foreground text-2xl md:text-3xl lg:text-4xl font-medium">AI Incident Response System</span>
            </h1>

            {/* Subheadline */}
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Ένα alert δεν είναι notification. Είναι διαδικασία απόκρισης: escalation, αναφορά, audit trail, dashboard.
            </p>

            {/* Chips */}
            <div 
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              {chips.map((chip) => (
                <span key={chip} className="chip text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                  {chip}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-6 animate-fade-in"
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

          {/* Right: Mobile Alert UI - Phone Mockup */}
          <div 
            className="flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl shadow-black/50 border border-zinc-700/50">
                {/* Screen */}
                <div className="relative overflow-hidden rounded-[2rem] w-[280px] md:w-[320px] aspect-[9/19]">
                  <img
                    src={fieldAlertMobile}
                    alt="Aegis Link Field Alert - Mobile panic button interface"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-full" />
              </div>
              
              {/* Floating labels */}
              <div className="absolute -left-4 top-1/4 glass-card px-3 py-2 text-xs font-medium shadow-lg animate-pulse">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
                  Online
                </span>
              </div>
              <div className="absolute -right-4 bottom-1/3 glass-card px-3 py-2 text-xs font-medium shadow-lg">
                <span className="text-red-400">PANIC MODE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
