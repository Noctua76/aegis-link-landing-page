import { useEffect, useRef, type CSSProperties } from 'react';
import { Phone, RotateCcw, Search, ShieldAlert } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import { useLanguage } from '@/i18n/LanguageContext';

const notificationStepIcons = [Search, Phone, ShieldAlert, RotateCcw];

const timelineStops = ['23:00', '01:30', '03:59', '04:00', '07:00'];

const HeroSection = () => {
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
      { threshold: 0.22, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="incident-story"
      className="incident-story"
      aria-labelledby="incident-story-heading"
    >
      <div className="incident-story-veil" aria-hidden="true" />

      <div className="incident-story-shell">
        <div className="incident-story-copy">
          <div className="incident-scene-marker" aria-hidden="true">
            <span>04</span>
            <i />
            <strong>{copy.incident.marker}</strong>
          </div>

          <time className="incident-time" dateTime="04:00">04:00</time>

          <h2 id="incident-story-heading">
            {copy.incident.heading}
            <strong>{copy.incident.headingStrong}</strong>
          </h2>

          <p className="incident-story-lead">
            {copy.incident.lead}
          </p>

          <p className="incident-story-question">
            <GuidedCaption
              stacked
              segments={[
                { text: copy.incident.question },
                { text: copy.incident.questionStrong, emphasis: true, tone: 'gold' },
              ]}
            />
          </p>
        </div>

        <div className="incident-sequence" aria-label={copy.incident.sequenceLabel}>
          <div className="incident-sequence-heading">
            <span>{copy.incident.manualNotification}</span>
            <span>{copy.incident.noAutomation}</span>
          </div>

          <ol className="incident-sequence-list">
            {copy.incident.steps.map(({ label, state }, index) => {
              const Icon = notificationStepIcons[index];
              const number = `0${index + 1}`;
              return (
              <li key={number} style={{ '--sequence-index': index } as CSSProperties}>
                <div className="incident-sequence-number">{number}</div>
                <div className="incident-sequence-icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.4} />
                </div>
                <div className="incident-sequence-text">
                  <strong>{label}</strong>
                  <span>{state}</span>
                </div>
                <i className="incident-sequence-pulse" aria-hidden="true" />
              </li>
              );
            })}
          </ol>

          <div className="incident-sequence-conclusion">
            <span>{copy.incident.meanwhile}</span>
            <p>{copy.incident.conclusion}</p>
          </div>
        </div>

        <div className="incident-timeline" aria-label={copy.incident.timelineLabel}>
          <div className="incident-timeline-line" aria-hidden="true" />
          {timelineStops.map((label, index) => (
            <div
              key={label}
              className={`incident-timeline-stop ${index < 3 ? 'is-past' : ''} ${index === 3 ? 'is-active' : ''}`}
            >
              <span aria-hidden="true" />
              <time>{label}</time>
            </div>
          ))}
        </div>

        <a className="incident-next" href="#capabilities">
          <span>{copy.incident.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
