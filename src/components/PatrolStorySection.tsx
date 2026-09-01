import { useEffect, useRef, type CSSProperties } from 'react';
import { Check, Clock3, MapPin, QrCode, Route, ShieldCheck } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import NightTimeline from '@/components/NightTimeline';

const checkpoints = [
  { number: '01', time: '01:31', state: 'VERIFIED' },
  { number: '02', time: '01:36', state: 'VERIFIED' },
  { number: '03', time: '01:42', state: 'VERIFIED' },
  { number: '04', time: '01:47', state: 'VERIFIED' },
];

const patrolStates = ['DUE SOON', 'OVERDUE', 'MISSED', 'COMPLETED LATE'];

const PatrolStorySection = () => {
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
        <div className="patrol-verification" aria-label="Verified patrol evidence">
          <div className="patrol-contrast">
            <div className="patrol-reported">
              <span>REPORTED</span>
              <strong>“Patrol completed.”</strong>
              <small>NO OPERATIONAL EVIDENCE</small>
            </div>
            <div className="patrol-versus" aria-hidden="true">VS</div>
            <div className="patrol-verified-heading">
              <span>VERIFIED</span>
              <strong>Patrol record / #0130</strong>
              <small><i aria-hidden="true" /> EVIDENCE CONNECTED</small>
            </div>
          </div>

          <div className="patrol-route-header">
            <div><Route size={17} strokeWidth={1.35} aria-hidden="true" /> NIGHT PATROL</div>
            <time><Clock3 size={14} strokeWidth={1.35} aria-hidden="true" /> 01:30 / SCHEDULED</time>
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
                  <strong>QR CHECKPOINT {checkpoint.number}</strong>
                  <small><MapPin size={12} strokeWidth={1.45} aria-hidden="true" /> LOCATION MATCHED</small>
                </div>
                <time>{checkpoint.time}</time>
                <span className="patrol-checkpoint-status"><Check size={12} aria-hidden="true" /> {checkpoint.state}</span>
              </li>
            ))}
          </ol>

          <div className="patrol-state-strip" aria-label="Patrol lifecycle states">
            {patrolStates.map((state) => <span key={state}>{state}</span>)}
          </div>

          <div className="patrol-record-footer">
            <ShieldCheck size={17} strokeWidth={1.35} aria-hidden="true" />
            <span>ROUTE · TIME · LOCATION · CHECKPOINTS</span>
            <strong>COMPLETED / VERIFIED</strong>
          </div>
        </div>

        <div className="patrol-story-copy">
          <div className="patrol-scene-marker" aria-hidden="true">
            <span>03</span>
            <i />
            <strong>THE PATROL</strong>
          </div>

          <time className="patrol-time" dateTime="01:30">01:30</time>

          <h2 id="patrol-story-heading">
            <span>The patrol was scheduled.</span>
            <strong>Was it actually completed?</strong>
          </h2>

          <p className="patrol-story-lead">
            A verbal confirmation says a patrol happened. Aegis Link connects every checkpoint to time and location.
          </p>

          <blockquote>
            <GuidedCaption
              stacked
              segments={[
                { text: 'A patrol is not completed because someone said it was.' },
                { text: 'It is completed when the operation can verify it.', emphasis: true, tone: 'blue' },
              ]}
            />
          </blockquote>
        </div>

        <NightTimeline active="01:30" label="Night shift timeline at 01:30" />

        <a className="patrol-next" href="#silence-story">
          <span>Verification exists. But the night is not over.</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default PatrolStorySection;
