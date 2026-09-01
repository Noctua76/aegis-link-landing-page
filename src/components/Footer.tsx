import logoMark from '@/assets/aegis-link-logo-mark.png';
import { openPreviewAccessModal } from '@/lib/previewAccess';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer-desktop relative z-10 py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logoMark} alt="Aegis Link" className="h-16 w-auto opacity-100" />
            <div className="leading-tight">
              <span className="font-semibold text-foreground">Aegis Link</span>
              <p className="text-sm text-muted-foreground">by Noctua Core</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="https://noctuacore.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              noctuacore.ai
            </a>
            <a href="mailto:info@eliaskalyvas.gr" className="text-muted-foreground hover:text-foreground transition-colors">
              Email
            </a>
            <button
              type="button"
              onClick={openPreviewAccessModal}
              className="text-muted-foreground hover:text-neon-purple transition-colors"
            >
              Book Demo
            </button>
          </div>

          <p className="text-sm text-muted-foreground">© {currentYear} Noctua Core</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
