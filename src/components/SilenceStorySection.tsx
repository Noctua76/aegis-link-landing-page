import { useEffect, useRef } from 'react';
import { Activity, Clock3, MapPin, Radio, Route } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import NightTimeline from '@/components/NightTimeline';
import { useLanguage } from '@/i18n/LanguageContext';

const signalIcons = [Radio, Route, Activity, MapPin];

const SilenceStorySection = () => {
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
          <span>03</span>
          <i />
          <strong>{copy.silence.marker}</strong>
        </div>

        <div className="silence-clock-wrap">
          <Clock3 size={16} strokeWidth={1.25} aria-hidden="true" />
          <time dateTime="03:58">03:58</time>
          <span><i aria-hidden="true" /> {copy.silence.noIncident}</span>
        </div>

        <h2 id="silence-story-heading">
          <span>{copy.silence.heading}</span>
          <strong>
            <GuidedCaption
              segments={[{ text: copy.silence.headingStrong }]}
              startDelayMs={500}
              cycleMs={23540}
            />
          </strong>
        </h2>

        <p className="silence-story-lead">
          <GuidedCaption
            segments={[{ text: copy.silence.lead }]}
            startDelayMs={500}
            cycleMs={23540}
          />
        </p>

        <div className="silence-signal-line" aria-label={copy.silence.signalsLabel}>
          {copy.silence.signals.map(({ label, value }, index) => {
            const Icon = signalIcons[index];
            return (
            <div key={label}>
              <Icon size={15} strokeWidth={1.25} aria-hidden="true" />
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
            );
          })}
        </div>

        <blockquote>
          {copy.silence.quote}
        </blockquote>

        <NightTimeline active="03:58" label={copy.silence.timelineLabel} />

        <a className="silence-next" href="#incident-story">
          <span>{copy.silence.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default SilenceStorySection;
