import { useEffect, useRef, type CSSProperties } from 'react';
import { Building2, Clock3, MapPin, QrCode, RadioTower, Route, ShieldCheck, UsersRound } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import { useLanguage } from '@/i18n/LanguageContext';

const operationLayerIcons = [MapPin, UsersRound, Route, QrCode, RadioTower];

const ExtensionsSection = () => {
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
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="extensions"
      className="scale-story"
      aria-labelledby="scale-story-heading"
    >
      <div className="scale-story-veil" aria-hidden="true" />

      <div className="scale-story-shell">
        <div className="scale-story-copy">
          <div className="scale-scene-marker" aria-hidden="true">
            <span>08</span>
            <i />
            <strong>{copy.scale.marker}</strong>
          </div>

          <div className="scale-time">
            <time dateTime="07:00">07:00</time>
            <span><i aria-hidden="true" /> {copy.scale.handover}</span>
          </div>

          <h2 id="scale-story-heading">
            {copy.scale.heading}
            <strong>{copy.scale.headingStrong}</strong>
          </h2>

          <p className="scale-story-lead">
            {copy.scale.lead}
          </p>

          <p className="scale-story-statement">
            <GuidedCaption segments={[{ text: copy.scale.statement, tone: 'blue' }]} />
          </p>
        </div>

        <div className="scale-board" aria-label={copy.scale.boardLabel}>
          <div className="scale-board-header">
            <div>
              <Building2 size={16} strokeWidth={1.4} aria-hidden="true" />
              <span>{copy.scale.boardTitle}</span>
            </div>
            <div>
              <Clock3 size={15} strokeWidth={1.4} aria-hidden="true" />
              <span>{copy.scale.live}</span>
            </div>
          </div>

          <div className="scale-board-columns" aria-hidden="true">
            {copy.scale.columns.map((column) => <span key={column}>{column}</span>)}
          </div>

          <div className="scale-site-list">
            {copy.scale.rows.map((row, index) => (
              <div key={row.site} style={{ '--site-index': index } as CSSProperties}>
                <strong><i aria-hidden="true" /> {row.site}</strong>
                <span>{row.guard}</span>
                <span>{row.shift}</span>
                <span>{row.patrol}</span>
                <small><i aria-hidden="true" /> {row.status}</small>
              </div>
            ))}
          </div>

          <div className="scale-operation-layers">
            {copy.scale.layers.map((label, index) => {
              const Icon = operationLayerIcons[index];
              return (
              <div key={label} style={{ '--layer-index': index } as CSSProperties}>
                <Icon size={16} strokeWidth={1.35} aria-hidden="true" />
                <span>{label}</span>
              </div>
              );
            })}
          </div>

          <div className="scale-board-footer">
            <ShieldCheck size={17} strokeWidth={1.4} aria-hidden="true" />
            <span>{copy.scale.footer}</span>
          </div>
        </div>

        <div className="scale-continuity" aria-hidden="true">
          <span>23:00</span>
          <i />
          <span>01:30</span>
          <i />
          <span>04:00</span>
          <i />
          <span>04:01</span>
          <i />
          <span>07:00</span>
          <strong>{copy.scale.continuous}</strong>
        </div>

        <a className="scale-next" href="#faq">
          <span>{copy.scale.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default ExtensionsSection;
