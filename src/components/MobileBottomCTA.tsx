import { Image, Calendar } from 'lucide-react';

const MobileBottomCTA = () => {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-border/50 p-3"
      role="navigation"
      aria-label="Mobile quick actions"
    >
      <div className="flex gap-3">
        <a
          href="#visuals"
          className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm"
        >
          <Image size={18} />
          Εικόνες
        </a>
        <a
          href="https://YOUR-SCHEDULING-LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm"
        >
          <Calendar size={18} />
          Demo
        </a>
      </div>
    </div>
  );
};

export default MobileBottomCTA;
