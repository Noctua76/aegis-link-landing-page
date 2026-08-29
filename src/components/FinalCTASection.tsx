import { ArrowRight, Link2, MonitorCog, ShieldCheck, Smartphone } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section id="preview-access" className="access-story" aria-labelledby="access-story-heading">
      <div className="access-story-shell">
        <div className="access-scene-marker" aria-hidden="true">
          <span>08</span>
          <i />
          <strong>PREVIEW ACCESS</strong>
        </div>

        <div className="access-story-copy">
          <p className="access-kicker">THE PLATFORM, FROM BOTH SIDES</p>
          <h2 id="access-story-heading">
            One operation.
            <strong>Seen from both sides.</strong>
          </h2>
          <p>
            Open the Operations Dashboard and Guard Web App side by side.
            Follow the same patrol, incident and response through one connected platform.
          </p>
        </div>

        <div className="access-bridge" aria-label="Connected Aegis Link preview experience">
          <div className="access-surface access-surface-operations">
            <span>01 / OPERATIONS</span>
            <MonitorCog size={30} strokeWidth={1.15} aria-hidden="true" />
            <strong>Operations Dashboard</strong>
            <small>Control · Visibility · Audit</small>
          </div>

          <div className="access-connection" aria-hidden="true">
            <i />
            <span><Link2 size={18} strokeWidth={1.25} /></span>
            <i />
            <strong>ONE LIVE OPERATION</strong>
          </div>

          <div className="access-surface access-surface-field">
            <span>02 / FIELD</span>
            <Smartphone size={30} strokeWidth={1.15} aria-hidden="true" />
            <strong>Guard Web App</strong>
            <small>Patrols · Incidents · Response</small>
          </div>
        </div>

        <div className="access-action-row">
          <div className="access-assurance">
            <ShieldCheck size={17} strokeWidth={1.25} aria-hidden="true" />
            <span>Temporary access</span>
            <i />
            <span>Read-only environment</span>
            <i />
            <span>Controlled duration</span>
          </div>

          <a
            className="access-primary-action"
            href="https://YOUR-SCHEDULING-LINK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Request Preview Access</span>
            <ArrowRight size={18} strokeWidth={1.35} aria-hidden="true" />
          </a>
        </div>

        <p className="access-closing-line">
          No slideshow. No simulation.
          <strong>The real operational flow.</strong>
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
