import { useEffect, useRef, type CSSProperties } from 'react';
import { Activity, FileClock, MapPin, RadioTower, ShieldAlert, UserRoundCheck } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import { useLanguage } from '@/i18n/LanguageContext';

const signalIcons = [UserRoundCheck, MapPin, RadioTower, FileClock];

const VisualsSection = () => {
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
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visuals"
      className="operations-story"
      aria-labelledby="operations-story-heading"
    >
      <div className="operations-story-veil" aria-hidden="true" />

      <div className="operations-story-shell">
        <div className="operations-story-copy">
          <div className="operations-scene-marker" aria-hidden="true">
            <span>06</span>
            <i />
            <strong>{copy.operations.marker}</strong>
          </div>

          <div className="operations-time">
            <time dateTime="04:01">04:01</time>
            <span><i aria-hidden="true" /> {copy.operations.live}</span>
          </div>

          <h2 id="operations-story-heading">
            {copy.operations.heading}
            <strong>{copy.operations.headingStrong}</strong>
          </h2>

          <p className="operations-story-lead">
            {copy.operations.lead}
          </p>

          <p className="operations-story-statement">
            <GuidedCaption segments={[{ text: copy.operations.statement, tone: 'gold' }]} />
          </p>
        </div>

        <div className="operations-view" aria-label={copy.operations.viewLabel}>
          <div className="operations-view-header">
            <div>
              <Activity size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{copy.operations.viewTitle}</span>
            </div>
            <div className="operations-live-status">
              <i aria-hidden="true" />
              {copy.operations.liveIncident}
            </div>
          </div>

          <div className="operations-incident-heading">
            <div className="operations-alert-mark" aria-hidden="true">
              <ShieldAlert size={25} strokeWidth={1.35} />
            </div>
            <div>
              <span>{copy.operations.incidentNumber}</span>
              <strong>{copy.operations.panicAlert}</strong>
            </div>
            <div className="operations-incident-state">{copy.operations.open}</div>
          </div>

          <div className="operations-signal-grid">
            {copy.operations.signals.map(({ label, value }, index) => {
              const Icon = signalIcons[index];
              return (
              <div key={label} style={{ '--signal-index': index } as CSSProperties}>
                <Icon size={17} strokeWidth={1.35} aria-hidden="true" />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
              );
            })}
          </div>

          <div className="operations-trace">
            <div className="operations-trace-heading">
              <span>{copy.operations.eventTrace}</span>
              <span>{copy.operations.auditRecording}</span>
            </div>
            <ol>
              {copy.operations.events.map((event, index) => (
                <li key={event} style={{ '--trace-index': index } as CSSProperties}>
                  <span>0{index + 1}</span>
                  <i aria-hidden="true" />
                  <strong>{event}</strong>
                  <small>{index === copy.operations.events.length - 1 ? copy.operations.current : copy.operations.complete}</small>
                </li>
              ))}
            </ol>
          </div>

          <div className="operations-view-footer">
            <span>{copy.operations.truth}</span>
            <span>{copy.operations.principles}</span>
          </div>
        </div>

        <div className="operations-handoff" aria-hidden="true">
          <span>{copy.operations.handoff[0]}</span>
          <i />
          <span>{copy.operations.handoff[1]}</span>
          <i />
          <span>{copy.operations.handoff[2]}</span>
        </div>

        <a className="operations-next" href="#accountability">
          <span>{copy.operations.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default VisualsSection;
