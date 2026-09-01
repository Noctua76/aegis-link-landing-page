import { Image, Calendar } from 'lucide-react';
import { openPreviewAccessModal } from '@/lib/previewAccess';
import { useLanguage } from '@/i18n/LanguageContext';

const MobileBottomCTA = () => {
  const { copy, language } = useLanguage();
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-border/50 p-3"
      role="navigation"
      aria-label={language === 'gr' ? 'Γρήγορες ενέργειες mobile' : 'Mobile quick actions'}
    >
      <div className="flex gap-3">
        <a
          href="#visuals"
          className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm"
        >
          <Image size={18} />
          {language === 'gr' ? 'Επιχειρησιακή εικόνα' : 'Operations View'}
        </a>
        <button
          type="button"
          onClick={openPreviewAccessModal}
          className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm"
        >
          <Calendar size={18} />
          {copy.footer.demo}
        </button>
      </div>
    </div>
  );
};

export default MobileBottomCTA;
