import { useEffect, useState } from 'react';
import { ArrowUpRight, Cookie, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

type ConsentChoice = 'accepted' | 'necessary';

type StoredConsent = {
  choice: ConsentChoice;
  savedAt: string;
  expiresAt: string;
};

const CONSENT_KEY = 'aegis-cookie-consent-v1';
const CONSENT_LIFETIME_DAYS = 180;

const hasValidConsent = () => {
  try {
    const rawValue = window.localStorage.getItem(CONSENT_KEY);
    if (!rawValue) return false;

    const stored = JSON.parse(rawValue) as StoredConsent;
    if (!stored.choice || !stored.expiresAt || new Date(stored.expiresAt).getTime() <= Date.now()) {
      window.localStorage.removeItem(CONSENT_KEY);
      return false;
    }

    return true;
  } catch {
    window.localStorage.removeItem(CONSENT_KEY);
    return false;
  }
};

const CookieConsent = () => {
  const { copy, language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasValidConsent());
  }, []);

  const saveChoice = (choice: ConsentChoice) => {
    const savedAt = new Date();
    const expiresAt = new Date(savedAt);
    expiresAt.setDate(expiresAt.getDate() + CONSENT_LIFETIME_DAYS);

    const value: StoredConsent = {
      choice,
      savedAt: savedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } finally {
      setVisible(false);
    }
  };

  if (!visible) return null;

  const privacyHref = `${import.meta.env.BASE_URL}${language}/privacy/`;

  return (
    <aside className="cookie-consent-shell" aria-label={copy.cookieConsent.ariaLabel}>
      <div className="cookie-consent-panel" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title">
        <div className="cookie-consent-icon" aria-hidden="true">
          <Cookie size={22} strokeWidth={1.5} />
        </div>

        <div className="cookie-consent-copy">
          <span className="cookie-consent-eyebrow">
            <ShieldCheck size={13} aria-hidden="true" />
            {copy.cookieConsent.eyebrow}
          </span>
          <h2 id="cookie-consent-title">{copy.cookieConsent.title}</h2>
          <p>{copy.cookieConsent.description}</p>
          <a href={privacyHref}>
            {copy.cookieConsent.policyLink}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="cookie-consent-actions">
          <button type="button" className="cookie-consent-secondary" onClick={() => saveChoice('necessary')}>
            {copy.cookieConsent.necessaryOnly}
          </button>
          <button type="button" className="cookie-consent-primary" onClick={() => saveChoice('accepted')}>
            {copy.cookieConsent.acceptAll}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieConsent;
