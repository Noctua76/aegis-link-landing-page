import { useEffect, useRef, type CSSProperties } from 'react';
import { Phone, RotateCcw, Search, ShieldAlert } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';

const notificationSteps = [
  { number: '01', label: 'Find the number', icon: Search, state: 'Searching' },
  { number: '02', label: 'Place the call', icon: Phone, state: 'Ringing' },
  { number: '03', label: 'Wait for an answer', icon: ShieldAlert, state: 'No answer' },
  { number: '04', label: 'Try again', icon: RotateCcw, state: 'Repeat' },
];

const timelineStops = ['23:00', '01:30', '03:59', '04:00', '07:00'];

const HeroSection = () => {
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
            <strong>THE INCIDENT</strong>
          </div>

          <time className="incident-time" dateTime="04:00">04:00</time>

          <h2 id="incident-story-heading">
            The incident has happened.
            <strong>Now the delay begins.</strong>
          </h2>

          <p className="incident-story-lead">
            At 04:00, a tired guard must manage the danger while finding numbers,
            placing calls, waiting for answers—and trying again.
          </p>

          <p className="incident-story-question">
            <GuidedCaption
              stacked
              segments={[
                { text: 'Four people must be informed.' },
                { text: 'Who answers the first call?', emphasis: true, tone: 'gold' },
              ]}
            />
          </p>
        </div>

        <div className="incident-sequence" aria-label="Manual incident notification sequence">
          <div className="incident-sequence-heading">
            <span>MANUAL NOTIFICATION</span>
            <span>NO AUTOMATION</span>
          </div>

          <ol className="incident-sequence-list">
            {notificationSteps.map(({ number, label, icon: Icon, state }, index) => (
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
            ))}
          </ol>

          <div className="incident-sequence-conclusion">
            <span>Meanwhile</span>
            <p>The guard's attention is divided between the phone and the threat.</p>
          </div>
        </div>

        <div className="incident-timeline" aria-label="Incident timeline at 04:00">
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
          <span>One action should reach everyone</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
