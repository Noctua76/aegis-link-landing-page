import { useEffect, useRef } from 'react';
import { Activity, Clock3, MapPin, Radio, Route } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import NightTimeline from '@/components/NightTimeline';

const quietSignals = [
  { label: 'GUARDS', value: 'ACTIVE', icon: Radio },
  { label: 'PATROLS', value: 'MONITORED', icon: Route },
  { label: 'ACTIVITY', value: 'LIVE', icon: Activity },
  { label: 'SITES', value: 'VISIBLE', icon: MapPin },
];

const SilenceStorySection = () => {
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
      id="silence-story"
      className="silence-story"
      aria-labelledby="silence-story-heading"
    >
      <div className="silence-story-veil" aria-hidden="true" />

      <div className="silence-story-shell">
        <div className="silence-scene-marker" aria-hidden="true">
          <span>04</span>
          <i />
          <strong>OPERATIONAL SILENCE</strong>
        </div>

        <div className="silence-clock-wrap">
          <Clock3 size={16} strokeWidth={1.25} aria-hidden="true" />
          <time dateTime="03:58">03:58</time>
          <span><i aria-hidden="true" /> NO INCIDENT REPORTED</span>
        </div>

        <h2 id="silence-story-heading">
          <span>Nothing has been reported.</span>
          <strong>
            <GuidedCaption
              segments={[{ text: 'But does that mean everything is under control?' }]}
              startDelayMs={500}
              cycleMs={23540}
            />
          </strong>
        </h2>

        <p className="silence-story-lead">
          <GuidedCaption
            segments={[{ text: 'No call. No alert. No visible disruption. Yet operations still needs to know what remains active—and what has quietly stopped.' }]}
            startDelayMs={6240}
            cycleMs={23540}
          />
        </p>

        <div className="silence-signal-line" aria-label="Operational signals still monitored">
          {quietSignals.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <Icon size={15} strokeWidth={1.25} aria-hidden="true" />
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <blockquote>
          Operational silence is not operational visibility.
        </blockquote>

        <NightTimeline active="03:58" label="Night shift timeline at 03:58" />

        <a className="silence-next" href="#incident-story">
          <span>One minute later, the night changes.</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default SilenceStorySection;
