import { useEffect, useRef, type CSSProperties } from 'react';
import { BellRing, FileCheck2, RadioTower, ShieldCheck, UserRoundCheck } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import { useLanguage } from '@/i18n/LanguageContext';

const auditIcons = [BellRing, RadioTower, UserRoundCheck, FileCheck2];

const UniquenessSection = () => {
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
      id="accountability"
      className="accountability-story"
      aria-labelledby="accountability-story-heading"
    >
      <div className="accountability-story-veil" aria-hidden="true" />

      <div className="accountability-story-shell">
        <div className="accountability-ledger" aria-label={copy.accountability.ledgerLabel}>
          <div className="accountability-ledger-header">
            <div>
              <ShieldCheck size={16} strokeWidth={1.45} aria-hidden="true" />
              <span>{copy.accountability.record}</span>
            </div>
            <span>{copy.accountability.auditTrail}</span>
          </div>

          <div className="accountability-ledger-title">
            {copy.accountability.columns.map((column) => <span key={column}>{column}</span>)}
          </div>

          <ol className="accountability-event-list">
            {copy.accountability.events.map(({ action, actor }, index) => {
              const Icon = auditIcons[index];
              return (
              <li key={action} style={{ '--audit-index': index } as CSSProperties}>
                <div className="accountability-event-index">0{index + 1}</div>
                <div className="accountability-event-node" aria-hidden="true">
                  <Icon size={16} strokeWidth={1.35} />
                </div>
                <strong>{action}</strong>
                <span>{actor}</span>
                <small><i aria-hidden="true" /> {copy.accountability.recorded}</small>
              </li>
              );
            })}
          </ol>

          <div className="accountability-record-footer">
            {copy.accountability.summaries.map((summary) => (
              <div key={summary.label}>
                <span>{summary.label}</span>
                <strong>{summary.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="accountability-story-copy">
          <div className="accountability-scene-marker" aria-hidden="true">
            <span>07</span>
            <i />
            <strong>{copy.accountability.marker}</strong>
          </div>

          <p className="accountability-kicker">{copy.accountability.kicker}</p>

          <h2 id="accountability-story-heading">
            {copy.accountability.heading}
            <strong>{copy.accountability.headingStrong}</strong>
          </h2>

          <p className="accountability-story-lead">
            {copy.accountability.lead}
          </p>

          <blockquote>
            <GuidedCaption
              stacked
              segments={[
                { text: copy.accountability.quote },
                { text: copy.accountability.quoteStrong, emphasis: true, tone: 'gold' },
              ]}
            />
          </blockquote>
        </div>

        <div className="accountability-principles" aria-hidden="true">
          {copy.accountability.principles.map((principle, index) => (
            <span key={principle} className="contents"><span>{principle}</span>{index < copy.accountability.principles.length - 1 && <i />}</span>
          ))}
        </div>

        <a className="accountability-next" href="#extensions">
          <span>{copy.accountability.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default UniquenessSection;
