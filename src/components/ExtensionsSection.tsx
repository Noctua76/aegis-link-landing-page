import type { CSSProperties } from 'react';
import { Building2, Clock3, MapPin, QrCode, RadioTower, Route, ShieldCheck, UsersRound } from 'lucide-react';

const siteRows = [
  { site: 'SITE 01', guard: 'ON SITE', shift: 'HANDOVER', patrol: 'VERIFIED', status: 'CONTROLLED' },
  { site: 'SITE 02', guard: 'ON SHIFT', shift: 'NIGHT → DAY', patrol: 'DUE SOON', status: 'ACTIVE' },
  { site: 'SITE 03', guard: 'SESSION LIVE', shift: 'MORNING', patrol: 'SCHEDULED', status: 'ACTIVE' },
];

const operationLayers = [
  { label: 'LIVE GPS', icon: MapPin },
  { label: 'GUARD SESSIONS', icon: UsersRound },
  { label: 'PATROLS', icon: Route },
  { label: 'QR CHECKPOINTS', icon: QrCode },
  { label: 'INCIDENTS', icon: RadioTower },
];

const ExtensionsSection = () => {
  return (
    <section id="extensions" className="scale-story" aria-labelledby="scale-story-heading">
      <div className="scale-story-veil" aria-hidden="true" />

      <div className="scale-story-shell">
        <div className="scale-story-copy">
          <div className="scale-scene-marker" aria-hidden="true">
            <span>09</span>
            <i />
            <strong>OPERATIONAL CONTROL</strong>
          </div>

          <div className="scale-time">
            <time dateTime="07:00">07:00</time>
            <span><i aria-hidden="true" /> SHIFT HANDOVER</span>
          </div>

          <h2 id="scale-story-heading">
            The night ends.
            <strong>The operation continues.</strong>
          </h2>

          <p className="scale-story-lead">
            Aegis Link extends the same visibility beyond incidents—to every
            site, every guard, every shift and every patrol.
          </p>

          <p className="scale-story-statement">
            One platform across the entire security operation.
          </p>
        </div>

        <div className="scale-board" aria-label="Aegis Link multi-site operations board">
          <div className="scale-board-header">
            <div>
              <Building2 size={16} strokeWidth={1.4} aria-hidden="true" />
              <span>MULTI-SITE OPERATIONS</span>
            </div>
            <div>
              <Clock3 size={15} strokeWidth={1.4} aria-hidden="true" />
              <span>07:00 / LIVE</span>
            </div>
          </div>

          <div className="scale-board-columns" aria-hidden="true">
            <span>SITE</span>
            <span>GUARD</span>
            <span>SHIFT</span>
            <span>PATROL</span>
            <span>STATUS</span>
          </div>

          <div className="scale-site-list">
            {siteRows.map((row, index) => (
              <div key={row.site} style={{ '--site-index': index } as CSSProperties}>
                <strong><i aria-hidden="true" /> {row.site}</strong>
                <span>{row.guard}</span>
                <span>{row.shift}</span>
                <span>{row.patrol}</span>
                <small><i aria-hidden="true" /> {row.status}</small>
              </div>
            ))}
          </div>

          <div className="scale-operation-layers">
            {operationLayers.map(({ label, icon: Icon }, index) => (
              <div key={label} style={{ '--layer-index': index } as CSSProperties}>
                <Icon size={16} strokeWidth={1.35} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="scale-board-footer">
            <ShieldCheck size={17} strokeWidth={1.4} aria-hidden="true" />
            <span>ONE OPERATING LAYER / EVERY SITE CONNECTED</span>
          </div>
        </div>

        <div className="scale-continuity" aria-hidden="true">
          <span>23:00</span>
          <i />
          <span>01:30</span>
          <i />
          <span>04:00</span>
          <i />
          <span>04:01</span>
          <i />
          <span>07:00</span>
          <strong>CONTINUOUS CONTROL</strong>
        </div>

        <a className="scale-next" href="#faq">
          <span>The platform is ready. The questions remain.</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default ExtensionsSection;
