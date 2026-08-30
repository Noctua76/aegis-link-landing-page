import type { CSSProperties } from 'react';
import { Activity, FileClock, MapPin, RadioTower, ShieldAlert, UserRoundCheck } from 'lucide-react';

const operationSignals = [
  { label: 'GUARD', value: 'ON SCENE', icon: UserRoundCheck },
  { label: 'LOCATION', value: 'LIVE GPS', icon: MapPin },
  { label: 'RESPONSE', value: 'ESCALATING', icon: RadioTower },
  { label: 'RECORD', value: 'AUDIT ACTIVE', icon: FileClock },
];

const eventTrace = [
  'Panic alert received',
  'Call and message flow activated',
  'Operations view updated',
];

const VisualsSection = () => {
  return (
    <section id="visuals" className="operations-story" aria-labelledby="operations-story-heading">
      <div className="operations-story-veil" aria-hidden="true" />

      <div className="operations-story-shell">
        <div className="operations-story-copy">
          <div className="operations-scene-marker" aria-hidden="true">
            <span>07</span>
            <i />
            <strong>SHARED VISIBILITY</strong>
          </div>

          <div className="operations-time">
            <time dateTime="04:01">04:01</time>
            <span><i aria-hidden="true" /> LIVE</span>
          </div>

          <h2 id="operations-story-heading">
            The incident is no longer
            <strong>trapped inside one phone.</strong>
          </h2>

          <p className="operations-story-lead">
            Operations sees the same event as it unfolds: the guard, the site,
            the location, the response status and every action that follows.
          </p>

          <p className="operations-story-statement">
            One incident. One shared operational picture.
          </p>
        </div>

        <div className="operations-view" aria-label="Live Aegis Link operations incident view">
          <div className="operations-view-header">
            <div>
              <Activity size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>OPERATIONS VIEW</span>
            </div>
            <div className="operations-live-status">
              <i aria-hidden="true" />
              LIVE INCIDENT
            </div>
          </div>

          <div className="operations-incident-heading">
            <div className="operations-alert-mark" aria-hidden="true">
              <ShieldAlert size={25} strokeWidth={1.35} />
            </div>
            <div>
              <span>INCIDENT / #0400</span>
              <strong>PANIC ALERT</strong>
            </div>
            <div className="operations-incident-state">OPEN</div>
          </div>

          <div className="operations-signal-grid">
            {operationSignals.map(({ label, value, icon: Icon }, index) => (
              <div key={label} style={{ '--signal-index': index } as CSSProperties}>
                <Icon size={17} strokeWidth={1.35} aria-hidden="true" />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="operations-trace">
            <div className="operations-trace-heading">
              <span>EVENT TRACE</span>
              <span>AUDIT RECORDING</span>
            </div>
            <ol>
              {eventTrace.map((event, index) => (
                <li key={event} style={{ '--trace-index': index } as CSSProperties}>
                  <span>0{index + 1}</span>
                  <i aria-hidden="true" />
                  <strong>{event}</strong>
                  <small>{index === eventTrace.length - 1 ? 'CURRENT' : 'COMPLETE'}</small>
                </li>
              ))}
            </ol>
          </div>

          <div className="operations-view-footer">
            <span>SINGLE SOURCE OF TRUTH</span>
            <span>CONTROL · VISIBILITY · RESPONSE</span>
          </div>
        </div>

        <div className="operations-handoff" aria-hidden="true">
          <span>GUARD</span>
          <i />
          <span>AEGIS LINK</span>
          <i />
          <span>OPERATIONS</span>
        </div>

        <a className="operations-next" href="#accountability">
          <span>What happens next must be accountable</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default VisualsSection;
