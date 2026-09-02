import { ArrowLeft, Languages, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import logoMark from '@/assets/aegis-link-logo-mark.png';
import { useLanguage } from '@/i18n/LanguageContext';

const PrivacyPolicy = () => {
  const { copy, language } = useLanguage();
  const policy = copy.privacyPolicy;
  const otherLanguage = language === 'en' ? 'gr' : 'en';
  const base = import.meta.env.BASE_URL;

  return (
    <div className="privacy-page">
      <div className="privacy-page-glow" aria-hidden="true" />

      <header className="privacy-header">
        <a className="privacy-brand" href={`${base}${language}`} aria-label={copy.navbar.homeLabel}>
          <img src={logoMark} alt="" />
          <span>
            <strong>Aegis Link</strong>
            <small>Security Operations Platform</small>
          </span>
        </a>

        <a className="privacy-language" href={`${base}${otherLanguage}/privacy/`}>
          <Languages size={15} aria-hidden="true" />
          {otherLanguage.toUpperCase()}
        </a>
      </header>

      <main className="privacy-main">
        <section className="privacy-hero">
          <span className="privacy-eyebrow"><ShieldCheck size={15} aria-hidden="true" />{policy.eyebrow}</span>
          <h1>{policy.title}</h1>
          <p>{policy.introduction}</p>
          <time dateTime="2026-09-02">{policy.lastUpdatedLabel} · {policy.lastUpdated}</time>
        </section>

        <div className="privacy-layout">
          <aside className="privacy-summary" aria-label={policy.title}>
            <span><LockKeyhole size={20} aria-hidden="true" /></span>
            <p>{language === 'gr' ? 'Σαφής ενημέρωση. Ελεγχόμενη χρήση. Ανθρώπινη λογοδοσία.' : 'Clear information. Controlled use. Human accountability.'}</p>
            <a href="mailto:info@eliaskalyvas.gr"><Mail size={15} aria-hidden="true" />info@eliaskalyvas.gr</a>
          </aside>

          <article className="privacy-content">
            {policy.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {'bullets' in section && section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>

        <a className="privacy-back" href={`${base}${language}`}>
          <ArrowLeft size={16} aria-hidden="true" />
          {policy.backToSite}
        </a>
      </main>

      <footer className="privacy-footer">© {new Date().getFullYear()} Noctua Core · Aegis Link</footer>
    </div>
  );
};

export default PrivacyPolicy;
