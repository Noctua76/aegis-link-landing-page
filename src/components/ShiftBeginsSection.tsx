import { useEffect, useRef, type CSSProperties } from 'react';
import { Building2, Clock3, LogIn, MapPin, ShieldCheck, UserRoundCheck } from 'lucide-react';
import NightTimeline from '@/components/NightTimeline';
import { useLanguage } from '@/i18n/LanguageContext';

const signalIcons = [UserRoundCheck, Building2, LogIn, MapPin];

const ShiftBeginsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { copy } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      section.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add('is-revealed');
        observer.disconnect();
      },
      { threshold: 0.24, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="operations-view"
      className="shift-story"
      aria-labelledby="shift-story-heading"
    >
      <div className="shift-story-veil" aria-hidden="true" />

      <div className="shift-story-shell">
        <div className="shift-story-copy">
          <div className="shift-scene-marker" aria-hidden="true">
            <span>01</span>
            <i />
            <strong>{copy.shift.marker}</strong>
          </div>

          <time className="shift-time" dateTime="23:00">23:00</time>

          <h2 id="shift-story-heading">
            <span>{copy.shift.heading}</span>
            <strong>{copy.shift.headingStrong}</strong>
          </h2>

          <p className="shift-story-lead">
            {copy.shift.lead}
          </p>

          <blockquote>
            <span className="presence-line">
              {copy.shift.quote.map((word, index) => (
                <span key={`${word}-${index}`}><span className="presence-word" data-word={word} style={{ '--word-delay': `${index * 0.82}s` } as CSSProperties}>{word}</span>{' '}</span>
              ))}
            </span>
            <strong className="presence-line presence-line--gold">
              {copy.shift.quoteStrong.map((word, index) => (
                <span key={`${word}-${index}`}><span className="presence-word" data-word={word} style={{ '--word-delay': `${(copy.shift.quote.length + index) * 0.82}s` } as CSSProperties}>{word}</span>{' '}</span>
              ))}
            </strong>
          </blockquote>
        </div>

        <div className="shift-status-board" aria-label={copy.shift.boardLabel}>
          <div className="shift-board-header">
            <div>
              <ShieldCheck size={17} strokeWidth={1.35} aria-hidden="true" />
              <span>{copy.shift.boardTitle}</span>
            </div>
            <strong><i aria-hidden="true" /> {copy.shift.boardStatus}</strong>
          </div>

          <div className="shift-board-identity">
            <div className="shift-guard-mark" aria-hidden="true">
              <UserRoundCheck size={25} strokeWidth={1.25} />
            </div>
            <div>
              <span>{copy.shift.identityLabel}</span>
              <strong>{copy.shift.identityValue}</strong>
            </div>
            <time><Clock3 size={14} strokeWidth={1.35} aria-hidden="true" /> 23:00–07:00</time>
          </div>

          <div className="shift-signal-grid">
            {copy.shift.signals.map(({ label, value, detail }, index) => {
              const Icon = signalIcons[index];
              return (
              <div key={label} style={{ '--shift-index': index } as CSSProperties}>
                <Icon size={17} strokeWidth={1.3} aria-hidden="true" />
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </div>
              );
            })}
          </div>

          <div className="shift-board-footer">
            <span>{copy.shift.footerLeft}</span>
            <strong>{copy.shift.footerRight}</strong>
          </div>
        </div>

        <NightTimeline active="23:00" label={copy.shift.timelineLabel} />

        <a className="shift-next" href="#patrol-story">
          <span>{copy.shift.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default ShiftBeginsSection;
