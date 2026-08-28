import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
    { href: '#operations-view', label: 'Platform' },
    { href: '#capabilities', label: 'Solutions' },
    { href: '#visuals', label: 'Product' },
    { href: '#faq', label: 'Resources' },
  ];

  return (
    <nav
      className={`aegis-nav ${isScrolled ? 'is-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="aegis-nav-inner">
        {/* Logo */}
        <a href="#" className="aegis-nav-brand" aria-label="Aegis Link home">
          Aegis Link
        </a>

        {/* Desktop Navigation */}
        <div className="aegis-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="aegis-nav-link"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="aegis-nav-cta-wrap">
          <a
            href="#preview-access"
            className="aegis-nav-cta"
          >
            Request Preview Access
          </a>
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="aegis-nav-mobile-link"
              >
                {link.label}
              </a>
            ))}
            <div className="aegis-nav-mobile-cta-wrap">
              <a href="#preview-access" className="aegis-nav-cta" onClick={() => setIsMobileMenuOpen(false)}>
                Request Preview Access
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
