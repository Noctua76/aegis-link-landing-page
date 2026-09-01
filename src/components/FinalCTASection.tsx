import { ArrowRight, Link2, MonitorCog, ShieldCheck, Smartphone } from 'lucide-react';
import { openPreviewAccessModal } from '@/lib/previewAccess';
import { useLanguage } from '@/i18n/LanguageContext';

const FinalCTASection = () => {
  const { copy } = useLanguage();
  return (
    <section id="preview-access" className="access-story" aria-labelledby="access-story-heading">
      <div className="access-story-shell">
        <div className="access-scene-marker" aria-hidden="true">
          <span>10</span>
          <i />
          <strong>{copy.access.marker}</strong>
        </div>

        <div className="access-story-copy">
          <p className="access-kicker">{copy.access.kicker}</p>
          <h2 id="access-story-heading">
            {copy.access.heading}
            <strong>{copy.access.headingStrong}</strong>
          </h2>
          <p>
            {copy.access.lead}
          </p>
        </div>

        <div className="access-bridge" aria-label={copy.access.bridgeLabel}>
          <div className="access-surface access-surface-operations">
            <span>{copy.access.operationsLabel}</span>
            <MonitorCog size={30} strokeWidth={1.15} aria-hidden="true" />
            <strong>{copy.access.operationsTitle}</strong>
            <small>{copy.access.operationsDetails}</small>
          </div>

          <div className="access-connection" aria-hidden="true">
            <i />
            <span><Link2 size={18} strokeWidth={1.25} /></span>
            <i />
            <strong>{copy.access.connection}</strong>
          </div>

          <div className="access-surface access-surface-field">
            <span>{copy.access.fieldLabel}</span>
            <Smartphone size={30} strokeWidth={1.15} aria-hidden="true" />
            <strong>{copy.access.fieldTitle}</strong>
            <small>{copy.access.fieldDetails}</small>
          </div>
        </div>

        <div className="access-action-row">
          <div className="access-assurance">
            <ShieldCheck size={17} strokeWidth={1.25} aria-hidden="true" />
            {copy.access.assurances.map((assurance, index) => (
              <span key={assurance} className="contents"><span>{assurance}</span>{index < copy.access.assurances.length - 1 && <i />}</span>
            ))}
          </div>

          <button
            type="button"
            className="access-primary-action"
            onClick={openPreviewAccessModal}
          >
            <span>{copy.common.requestPreview}</span>
            <ArrowRight size={18} strokeWidth={1.35} aria-hidden="true" />
          </button>
        </div>

        <p className="access-closing-line">
          {copy.access.closing}
          <strong>{copy.access.closingStrong}</strong>
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
