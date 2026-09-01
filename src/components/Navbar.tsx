import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoMark from '@/assets/aegis-link-logo-mark.png';
import { openPreviewAccessModal } from '@/lib/previewAccess';
import { openNavigationInfoModal, type NavigationInfoKey } from '@/lib/navigationInfo';
import { useLanguage, type Language } from '@/i18n/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, copy } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'platform', label: copy.navbar.links[0] },
    { key: 'solutions', label: copy.navbar.links[1] },
    { key: 'product', label: copy.navbar.links[2] },
    { key: 'resources', label: copy.navbar.links[3] },
  ] satisfies Array<{ key: NavigationInfoKey; label: string }>;

  const LanguageSwitch = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`aegis-language-switch${mobile ? ' is-mobile' : ''}`} aria-label={copy.navbar.languageLabel}>
      {(['en', 'gr'] as Language[]).map((option) => (
        <button
          key={option}
          type="button"
          className={language === option ? 'is-active' : ''}
          aria-pressed={language === option}
          onClick={() => {
            setLanguage(option);
            if (mobile) setIsMobileMenuOpen(false);
          }}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <nav
      className={`aegis-nav ${isScrolled ? 'is-scrolled' : ''}`}
      role="navigation"
      aria-label={copy.navbar.ariaLabel}
    >
      <div className="aegis-nav-inner">
        {/* Logo */}
        <a href={`${import.meta.env.BASE_URL}${language}`} className="aegis-nav-brand" aria-label={copy.navbar.homeLabel}>
          <img src={logoMark} alt="" aria-hidden="true" />
          <span>Aegis Link</span>
        </a>

        {/* Desktop Navigation */}
        <div className="aegis-nav-links">
          {navLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => openNavigationInfoModal(link.key)}
              className="aegis-nav-link"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="aegis-nav-cta-wrap">
          <LanguageSwitch />
          <button
            type="button"
            className="aegis-nav-cta"
            onClick={openPreviewAccessModal}
          >
            {copy.common.requestPreview}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="aegis-nav-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? copy.navbar.closeMenu : copy.navbar.openMenu}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="aegis-nav-mobile">
          <div className="aegis-nav-mobile-inner">
            {navLinks.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openNavigationInfoModal(link.key);
                }}
                className="aegis-nav-mobile-link"
              >
                {link.label}
              </button>
            ))}
            <LanguageSwitch mobile />
            <div className="aegis-nav-mobile-cta-wrap">
              <button
                type="button"
                className="aegis-nav-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openPreviewAccessModal();
                }}
              >
                {copy.common.requestPreview}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
