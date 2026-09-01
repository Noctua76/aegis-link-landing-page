import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Blocks,
  BrainCircuit,
  Building2,
  Cable,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Code2,
  Database,
  Expand,
  GitBranch,
  Link2,
  LockKeyhole,
  MapPin,
  MessageSquareText,
  MonitorCog,
  MonitorSmartphone,
  Palette,
  Radio,
  Route,
  ServerCog,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import {
  NAVIGATION_INFO_EVENT,
  type NavigationInfoKey,
} from '@/lib/navigationInfo';
import { openPreviewAccessModal } from '@/lib/previewAccess';
import { useLanguage } from '@/i18n/LanguageContext';

const modalConfig: Record<NavigationInfoKey, {
  index: string;
  sectionId: string;
  icons: typeof Radio[];
}> = {
  platform: {
    index: '01',
    sectionId: 'operations-view',
    icons: [Radio, MapPin, Route, ClipboardCheck],
  },
  solutions: {
    index: '02',
    sectionId: 'capabilities',
    icons: [Palette, SlidersHorizontal, Building2, UsersRound, Cable, Expand],
  },
  product: {
    index: '03',
    sectionId: 'visuals',
    icons: [Cloud, ShieldCheck, Blocks, Expand, MonitorSmartphone, BrainCircuit],
  },
  resources: {
    index: '04',
    sectionId: 'faq',
    icons: [Code2, ServerCog, Database, MessageSquareText, BrainCircuit, GitBranch, LockKeyhole],
  },
};

const NavigationInfoModal = () => {
  const [activeSection, setActiveSection] = useState<NavigationInfoKey | null>(null);
  const { copy } = useLanguage();
  const selectedKey = activeSection ?? 'platform';
  const content = copy.navigationModal.sections[selectedKey];
  const config = modalConfig[selectedKey];

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const section = (event as CustomEvent<{ section?: NavigationInfoKey }>).detail?.section;
      if (section && section in modalConfig) {
        setActiveSection(section);
      }
    };

    window.addEventListener(NAVIGATION_INFO_EVENT, handleOpen);
    return () => window.removeEventListener(NAVIGATION_INFO_EVENT, handleOpen);
  }, []);

  const handleExplore = () => {
    const targetId = config.sectionId;
    setActiveSection(null);

    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${targetId}`);
    }, 180);
  };

  const handlePreview = () => {
    setActiveSection(null);
    window.setTimeout(openPreviewAccessModal, 180);
  };

  return (
    <Dialog.Root
      open={activeSection !== null}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setActiveSection(null);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="nav-info-overlay" />
        <Dialog.Content
          className={`nav-info-modal nav-info-modal-${activeSection ?? 'platform'}`}
          aria-describedby="nav-info-description"
        >
          <header className="nav-info-header">
            <div className="nav-info-marker" aria-hidden="true">
              <span>{config.index}</span>
              <i />
              <strong>{content.label}</strong>
            </div>
            <Dialog.Close className="nav-info-close" aria-label={copy.navigationModal.close}>
              <X size={20} aria-hidden="true" />
            </Dialog.Close>
            <Dialog.Title>{content.title}</Dialog.Title>
            <Dialog.Description id="nav-info-description">
              {content.introduction}
            </Dialog.Description>
          </header>

          <div className="nav-info-body">
            {activeSection === 'platform' && (
              <div className="nav-info-platform-flow" aria-label={copy.navigationModal.platformFlowLabel}>
                <div className="nav-info-flow-node">
                  <Smartphone size={28} strokeWidth={1.25} aria-hidden="true" />
                  <span>{copy.navigationModal.fieldLabel}</span>
                  <strong>{copy.navigationModal.fieldTitle}</strong>
                  <small>{copy.navigationModal.fieldDetails}</small>
                </div>
                <div className="nav-info-flow-core">
                  <i />
                  <span><Link2 size={19} strokeWidth={1.3} aria-hidden="true" /></span>
                  <strong>{copy.navigationModal.connectedLayer}</strong>
                  <small>{copy.navigationModal.oneLiveOperation}</small>
                  <i />
                </div>
                <div className="nav-info-flow-node">
                  <MonitorCog size={28} strokeWidth={1.25} aria-hidden="true" />
                  <span>{copy.navigationModal.operationsLabel}</span>
                  <strong>{copy.navigationModal.operationsTitle}</strong>
                  <small>{copy.navigationModal.operationsDetails}</small>
                </div>
              </div>
            )}

            <div className={`nav-info-grid ${activeSection === 'resources' ? 'is-technical' : ''}`}>
              {content.items.map((item, index) => {
                const Icon = config.icons[index];
                return (
                  <article className="nav-info-item" key={item.title}>
                    <Icon size={20} strokeWidth={1.35} aria-hidden="true" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="nav-info-ai">
              <span aria-hidden="true"><Sparkles size={20} strokeWidth={1.35} /></span>
              <div>
                <small>{copy.navigationModal.integratedAi}</small>
                <h3>{content.aiTitle}</h3>
                <p>{content.aiDescription}</p>
              </div>
            </aside>
          </div>

          <footer className="nav-info-footer">
            <p><CheckCircle2 size={15} aria-hidden="true" /> {content.closing}</p>
            <div>
              <button type="button" className="nav-info-secondary" onClick={handleExplore}>
                {content.exploreLabel}
              </button>
              <button type="button" className="nav-info-primary" onClick={handlePreview}>
                {copy.navigationModal.preview}
              </button>
            </div>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NavigationInfoModal;
