import { useEffect, useRef, type CSSProperties } from 'react';
import { Check, Clock3, MapPin, QrCode, Route, ShieldCheck } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import NightTimeline from '@/components/NightTimeline';
import { useLanguage } from '@/i18n/LanguageContext';

const checkpoints = [
  { number: '01', time: '01:31' },
  { number: '02', time: '01:36' },
  { number: '03', time: '01:42' },
  { number: '04', time: '01:47' },
];

const PatrolStorySection = () => {
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
      id="patrol-story"
      className="patrol-story"
      aria-labelledby="patrol-story-heading"
    >
      <div className="patrol-story-veil" aria-hidden="true" />

      <div className="patrol-story-shell">
        <div className="patrol-verification" aria-label={copy.patrol.verificationLabel}>
          <div className="patrol-contrast">
            <div className="patrol-reported">
              <span>{copy.patrol.reported}</span>
              <strong>{copy.patrol.reportedValue}</strong>
              <small>{copy.patrol.noEvidence}</small>
            </div>
            <div className="patrol-versus" aria-hidden="true">{copy.patrol.versus}</div>
            <div className="patrol-verified-heading">
              <span>{copy.patrol.verified}</span>
              <strong>{copy.patrol.record}</strong>
              <small><i aria-hidden="true" /> {copy.patrol.evidenceConnected}</small>
            </div>
          </div>

          <div className="patrol-route-header">
            <div><Route size={17} strokeWidth={1.35} aria-hidden="true" /> {copy.patrol.nightPatrol}</div>
            <time><Clock3 size={14} strokeWidth={1.35} aria-hidden="true" /> {copy.patrol.scheduled}</time>
          </div>

          <ol className="patrol-checkpoints">
            {checkpoints.map((checkpoint, index) => (
              <li key={checkpoint.number} style={{ '--checkpoint-index': index } as CSSProperties}>
                <span className="patrol-checkpoint-number">{checkpoint.number}</span>
                <i className="patrol-checkpoint-line" aria-hidden="true" />
                <span className="patrol-checkpoint-node" aria-hidden="true">
                  <QrCode size={16} strokeWidth={1.4} />
                </span>
                <div>
                  <strong>{copy.patrol.checkpoint} {checkpoint.number}</strong>
                  <small><MapPin size={12} strokeWidth={1.45} aria-hidden="true" /> {copy.patrol.locationMatched}</small>
                </div>
                <time>{checkpoint.time}</time>
                <span className="patrol-checkpoint-status"><Check size={12} aria-hidden="true" /> {copy.patrol.verifiedState}</span>
              </li>
            ))}
          </ol>

          <div className="patrol-state-strip" aria-label={copy.patrol.statesLabel}>
            {copy.patrol.states.map((state) => <span key={state}>{state}</span>)}
          </div>

          <div className="patrol-record-footer">
            <ShieldCheck size={17} strokeWidth={1.35} aria-hidden="true" />
            <span>{copy.patrol.evidence}</span>
            <strong>{copy.patrol.completion}</strong>
          </div>
        </div>

        <div className="patrol-story-copy">
          <div className="patrol-scene-marker" aria-hidden="true">
            <span>02</span>
            <i />
            <strong>{copy.patrol.marker}</strong>
          </div>

          <time className="patrol-time" dateTime="01:30">01:30</time>

          <h2 id="patrol-story-heading">
            <span>{copy.patrol.heading}</span>
            <strong>{copy.patrol.headingStrong}</strong>
          </h2>

          <p className="patrol-story-lead">
            {copy.patrol.lead}
          </p>

          <blockquote>
            <GuidedCaption
              stacked
              segments={[
                { text: copy.patrol.quote },
                { text: copy.patrol.quoteStrong, emphasis: true, tone: 'blue' },
              ]}
            />
          </blockquote>
        </div>

        <NightTimeline active="01:30" label={copy.patrol.timelineLabel} />

        <a className="patrol-next" href="#silence-story">
          <span>{copy.patrol.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default PatrolStorySection;
