import { useEffect, useRef, type CSSProperties } from 'react';
import { Building2, Clock3, LogIn, MapPin, ShieldCheck, UserRoundCheck } from 'lucide-react';
import NightTimeline from '@/components/NightTimeline';

const shiftSignals = [
  { label: 'GUARD', value: 'ON DUTY', detail: 'Identity confirmed', icon: UserRoundCheck },
  { label: 'SITE', value: 'ASSIGNED', detail: 'Correct installation', icon: Building2 },
  { label: 'SESSION', value: 'ACTIVE', detail: 'Connected at 22:57', icon: LogIn },
  { label: 'LOCATION', value: 'VERIFIED', detail: 'Inside site perimeter', icon: MapPin },
];

const ShiftBeginsSection = () => {
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
            <strong>THE SHIFT BEGINS</strong>
          </div>

          <time className="shift-time" dateTime="23:00">23:00</time>

          <h2 id="shift-story-heading">
            <span>The shift has started.</span>
            <strong>But do you know who is actually on duty?</strong>
          </h2>

          <p className="shift-story-lead">
            Presence cannot depend on an assumption, a phone call or a message sent after the shift has begun.
          </p>

          <blockquote>
            <span className="presence-line">
              <span className="presence-word" data-word="Presence" style={{ '--word-delay': '0s' } as CSSProperties}>Presence</span>{' '}
              <span className="presence-word" data-word="should" style={{ '--word-delay': '0.82s' } as CSSProperties}>should</span>{' '}
              <span className="presence-word" data-word="never" style={{ '--word-delay': '1.64s' } as CSSProperties}>never</span>{' '}
              <span className="presence-word" data-word="be" style={{ '--word-delay': '2.46s' } as CSSProperties}>be</span>{' '}
              <span className="presence-word" data-word="assumed." style={{ '--word-delay': '3.28s' } as CSSProperties}>assumed.</span>
            </span>
            <strong className="presence-line presence-line--gold">
              <span className="presence-word" data-word="It" style={{ '--word-delay': '4.1s' } as CSSProperties}>It</span>{' '}
              <span className="presence-word" data-word="should" style={{ '--word-delay': '4.92s' } as CSSProperties}>should</span>{' '}
              <span className="presence-word" data-word="be" style={{ '--word-delay': '5.74s' } as CSSProperties}>be</span>{' '}
              <span className="presence-word" data-word="visible." style={{ '--word-delay': '6.56s' } as CSSProperties}>visible.</span>
            </strong>
          </blockquote>
        </div>

        <div className="shift-status-board" aria-label="Live guard shift status">
          <div className="shift-board-header">
            <div>
              <ShieldCheck size={17} strokeWidth={1.35} aria-hidden="true" />
              <span>LIVE SHIFT STATUS</span>
            </div>
            <strong><i aria-hidden="true" /> COVERAGE CONFIRMED</strong>
          </div>

          <div className="shift-board-identity">
            <div className="shift-guard-mark" aria-hidden="true">
              <UserRoundCheck size={25} strokeWidth={1.25} />
            </div>
            <div>
              <span>NIGHT SHIFT / SITE 02</span>
              <strong>ACTIVE GUARD</strong>
            </div>
            <time><Clock3 size={14} strokeWidth={1.35} aria-hidden="true" /> 23:00–07:00</time>
          </div>

          <div className="shift-signal-grid">
            {shiftSignals.map(({ label, value, detail, icon: Icon }, index) => (
              <div key={label} style={{ '--shift-index': index } as CSSProperties}>
                <Icon size={17} strokeWidth={1.3} aria-hidden="true" />
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>

          <div className="shift-board-footer">
            <span>NO CHECK-IN CALL REQUIRED</span>
            <strong>ONE LIVE OPERATIONAL PICTURE</strong>
          </div>
        </div>

        <NightTimeline active="23:00" label="Night shift timeline at 23:00" />

        <a className="shift-next" href="#patrol-story">
          <span>Presence is visible. Verification comes next.</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default ShiftBeginsSection;
