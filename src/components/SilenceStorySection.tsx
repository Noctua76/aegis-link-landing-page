import { Activity, Clock3, MapPin, Radio, Route } from 'lucide-react';
import NightTimeline from '@/components/NightTimeline';

const quietSignals = [
  { label: 'GUARDS', value: 'ACTIVE', icon: Radio },
  { label: 'PATROLS', value: 'MONITORED', icon: Route },
  { label: 'ACTIVITY', value: 'LIVE', icon: Activity },
  { label: 'SITES', value: 'VISIBLE', icon: MapPin },
];

const SilenceStorySection = () => {
  return (
    <section id="silence-story" className="silence-story" aria-labelledby="silence-story-heading">
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
          Nothing has been reported.
          <strong>But does that mean everything is under control?</strong>
        </h2>

        <p className="silence-story-lead">
          No call. No alert. No visible disruption. Yet operations still needs to know what remains active—and what has quietly stopped.
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
