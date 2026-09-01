import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoMark from '@/assets/aegis-link-logo-mark.png';
import { openPreviewAccessModal } from '@/lib/previewAccess';
import { openNavigationInfoModal, type NavigationInfoKey } from '@/lib/navigationInfo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'platform', label: 'Platform' },
    { key: 'solutions', label: 'Solutions' },
    { key: 'product', label: 'Product' },
    { key: 'resources', label: 'Resources' },
  ] satisfies Array<{ key: NavigationInfoKey; label: string }>;

  return (
    <nav
      className={`aegis-nav ${isScrolled ? 'is-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="aegis-nav-inner">
        {/* Logo */}
        <a href="#" className="aegis-nav-brand" aria-label="Aegis Link home">
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
          <button
            type="button"
            className="aegis-nav-cta"
            onClick={openPreviewAccessModal}
          >
            Request Preview Access
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="aegis-nav-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            <div className="aegis-nav-mobile-cta-wrap">
              <button
                type="button"
                className="aegis-nav-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openPreviewAccessModal();
                }}
              >
                Request Preview Access
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
