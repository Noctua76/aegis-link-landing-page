import { useEffect, useRef, type CSSProperties } from 'react';
import { BellRing, FileCheck2, RadioTower, ShieldCheck, UserRoundCheck } from 'lucide-react';

const auditEvents = [
  { action: 'Panic alert triggered', actor: 'GUARD', icon: BellRing },
  { action: 'Response chain activated', actor: 'SYSTEM', icon: RadioTower },
  { action: 'Incident acknowledged', actor: 'OPERATIONS', icon: UserRoundCheck },
  { action: 'Incident report completed', actor: 'SUPERVISOR', icon: FileCheck2 },
];

const UniquenessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        <div className="accountability-ledger" aria-label="Aegis Link incident audit trail">
          <div className="accountability-ledger-header">
            <div>
              <ShieldCheck size={16} strokeWidth={1.45} aria-hidden="true" />
              <span>INCIDENT RECORD / #0400</span>
            </div>
            <span>CONTINUOUS AUDIT TRAIL</span>
          </div>

          <div className="accountability-ledger-title">
            <span>EVENT</span>
            <span>ACTOR</span>
            <span>STATUS</span>
          </div>

          <ol className="accountability-event-list">
            {auditEvents.map(({ action, actor, icon: Icon }, index) => (
              <li key={action} style={{ '--audit-index': index } as CSSProperties}>
                <div className="accountability-event-index">0{index + 1}</div>
                <div className="accountability-event-node" aria-hidden="true">
                  <Icon size={16} strokeWidth={1.35} />
                </div>
                <strong>{action}</strong>
                <span>{actor}</span>
                <small><i aria-hidden="true" /> RECORDED</small>
              </li>
            ))}
          </ol>

          <div className="accountability-record-footer">
            <div>
              <span>INCIDENT HISTORY</span>
              <strong>COMPLETE</strong>
            </div>
            <div>
              <span>REPORT</span>
              <strong>READY</strong>
            </div>
            <div>
              <span>ACCOUNTABILITY</span>
              <strong>VISIBLE</strong>
            </div>
          </div>
        </div>

        <div className="accountability-story-copy">
          <div className="accountability-scene-marker" aria-hidden="true">
            <span>08</span>
            <i />
            <strong>ACCOUNTABILITY</strong>
          </div>

          <p className="accountability-kicker">EVERY ACTION LEAVES A TRACE</p>

          <h2 id="accountability-story-heading">
            If it cannot be reconstructed,
            <strong>it cannot be improved.</strong>
          </h2>

          <p className="accountability-story-lead">
            Aegis Link records who initiated the alert, how the response moved,
            who acknowledged the incident and how the operation was completed.
          </p>

          <blockquote>
            Accountability is not a report written later.
            <strong>It is the record created while the operation unfolds.</strong>
          </blockquote>
        </div>

        <div className="accountability-principles" aria-hidden="true">
          <span>VISIBLE</span>
          <i />
          <span>REVIEWABLE</span>
          <i />
          <span>REPORTABLE</span>
        </div>

        <a className="accountability-next" href="#extensions">
          <span>From one incident to every operation</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default UniquenessSection;
