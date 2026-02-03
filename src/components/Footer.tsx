import logoMark from "@/assets/aegis-link-logo-mark.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/30" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and branding */}
          <div className="flex items-center gap-3">
            <img
  src={logoMark}
  alt="Noctua Core"
  className="h-7 w-auto opacity-80"
/>
              <span className="font-semibold text-foreground">Noctua Core</span>
              <p className="text-sm text-muted-foreground">Aegis Link</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="https://noctuacore.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              noctuacore.ai
            </a>
            <a
              href="mailto:YOUR@EMAIL.COM"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Email
            </a>
            <a
              href="https://YOUR-SCHEDULING-LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-purple transition-colors"
            >
              Book Demo
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Noctua Core
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
