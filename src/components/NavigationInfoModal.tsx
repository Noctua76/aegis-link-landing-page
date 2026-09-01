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
  type LucideIcon,
} from 'lucide-react';
import {
  NAVIGATION_INFO_EVENT,
  type NavigationInfoKey,
} from '@/lib/navigationInfo';
import { openPreviewAccessModal } from '@/lib/previewAccess';

type InfoItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ModalContent = {
  index: string;
  label: string;
  title: string;
  introduction: string;
  items: InfoItem[];
  aiTitle: string;
  aiDescription: string;
  closing: string;
  sectionId: string;
  exploreLabel: string;
};

const modalContent: Record<NavigationInfoKey, ModalContent> = {
  platform: {
    index: '01',
    label: 'Platform',
    title: 'Two platforms. One operational command.',
    introduction:
      'Aegis Link connects the field and the control room through one shared, real-time operational environment.',
    items: [
      {
        title: 'Live operations',
        description: 'Guards, patrols, incidents and sites remain visible as the operation unfolds.',
        icon: Radio,
      },
      {
        title: 'Verified activity',
        description: 'Presence and patrol actions are connected to identity, time and location.',
        icon: MapPin,
      },
      {
        title: 'Connected response',
        description: 'Operational events move through one coordinated response flow.',
        icon: Route,
      },
      {
        title: 'Accountable record',
        description: 'The record is created during the operation—not reconstructed afterwards.',
        icon: ClipboardCheck,
      },
    ],
    aiTitle: 'AI-assisted operational awareness',
    aiDescription:
      'The integrated AI layer helps structure incident information, identify missing actions and support faster operational understanding.',
    closing: 'The field acts. Operations sees. The system connects both.',
    sectionId: 'operations-view',
    exploreLabel: 'See the platform in operation',
  },
  solutions: {
    index: '02',
    label: 'Solutions',
    title: 'Built for your company. Ready for your operation.',
    introduction:
      'Aegis Link can be configured around the commercial model, identity and operational structure of each security provider.',
    items: [
      {
        title: 'White-label deployment',
        description: 'Adapt the platform to the company’s identity and client-facing environment.',
        icon: Palette,
      },
      {
        title: 'Company configuration',
        description: 'Align roles, workflows, patrols and escalation rules with existing procedures.',
        icon: SlidersHorizontal,
      },
      {
        title: 'Multi-site operations',
        description: 'Coordinate multiple sites, teams and active contracts through one control layer.',
        icon: Building2,
      },
      {
        title: 'Roles and permissions',
        description: 'Define controlled access for management, supervisors, operators and guards.',
        icon: UsersRound,
      },
      {
        title: 'Integration-ready',
        description: 'Connect with APIs, ERP environments and other operational systems when required.',
        icon: Cable,
      },
      {
        title: 'Scalable model',
        description: 'Expand across clients, locations and teams without replacing the operating platform.',
        icon: Expand,
      },
    ],
    aiTitle: 'AI adapted to the operation',
    aiDescription:
      'AI functions can be configured around each company’s procedures, escalation rules and operational priorities.',
    closing: 'Not another fixed security application. A platform shaped around the business.',
    sectionId: 'capabilities',
    exploreLabel: 'Explore the operational solutions',
  },
  product: {
    index: '03',
    label: 'Product',
    title: 'A secure, scalable Security Operations SaaS.',
    introduction:
      'Aegis Link is a cloud-based product designed to evolve with the structure, responsibilities and scale of each security operation.',
    items: [
      {
        title: 'Cloud-based SaaS',
        description: 'Operate through a managed web environment without complex local installation.',
        icon: Cloud,
      },
      {
        title: 'Security by design',
        description: 'Controlled access, defined permissions, auditability and protected operational workflows.',
        icon: ShieldCheck,
      },
      {
        title: 'Modular architecture',
        description: 'Add capabilities without rebuilding the entire operational environment.',
        icon: Blocks,
      },
      {
        title: 'Company scalability',
        description: 'Support a single operation, multiple locations or a wider client portfolio.',
        icon: Expand,
      },
      {
        title: 'Cross-device access',
        description: 'Use the platform through desktop, tablet and mobile web interfaces.',
        icon: MonitorSmartphone,
      },
      {
        title: 'Integrated AI',
        description: 'AI is embedded in the operational architecture—not attached as a separate add-on.',
        icon: BrainCircuit,
      },
    ],
    aiTitle: 'AI inside the operational workflow',
    aiDescription:
      'AI supports incident documentation, operational summaries, information prioritisation and future predictive capabilities.',
    closing: 'One product. Configured for every security operation.',
    sectionId: 'visuals',
    exploreLabel: 'View the product workflow',
  },
  resources: {
    index: '04',
    label: 'Resources · Technology & architecture',
    title: 'The technology behind Aegis Link.',
    introduction:
      'A modern, modular technology stack supports real-time operations, controlled access and continuous product evolution.',
    items: [
      {
        title: 'Frontend and interfaces',
        description: 'React, TypeScript, responsive web interfaces and Progressive Web App technology.',
        icon: Code2,
      },
      {
        title: 'Backend and APIs',
        description: 'Node.js services, controlled API endpoints and event-driven application communication.',
        icon: ServerCog,
      },
      {
        title: 'Data and infrastructure',
        description: 'Cloud infrastructure, centralised data management and separated company environments.',
        icon: Database,
      },
      {
        title: 'Communication services',
        description: 'Vonage integration for SMS, calls and automated response sequences.',
        icon: MessageSquareText,
      },
      {
        title: 'AI layer',
        description: 'AI model integration for incident assistance, structured reporting and operational intelligence.',
        icon: BrainCircuit,
      },
      {
        title: 'Engineering and deployment',
        description: 'GitHub version control, traceable releases and controlled deployment workflows.',
        icon: GitBranch,
      },
      {
        title: 'Security controls',
        description: 'Authentication, role-based permissions, temporary access and operational audit logs.',
        icon: LockKeyhole,
      },
    ],
    aiTitle: 'AI with human accountability',
    aiDescription:
      'AI supports clarity, documentation and awareness. Authority, escalation and security decisions remain with responsible people.',
    closing: 'Modern architecture. Controlled access. Continuous evolution.',
    sectionId: 'faq',
    exploreLabel: 'Review the operational questions',
  },
};

const NavigationInfoModal = () => {
  const [activeSection, setActiveSection] = useState<NavigationInfoKey | null>(null);
  const content = modalContent[activeSection ?? 'platform'];

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const section = (event as CustomEvent<{ section?: NavigationInfoKey }>).detail?.section;
      if (section && section in modalContent) {
        setActiveSection(section);
      }
    };

    window.addEventListener(NAVIGATION_INFO_EVENT, handleOpen);
    return () => window.removeEventListener(NAVIGATION_INFO_EVENT, handleOpen);
  }, []);

  const handleExplore = () => {
    const targetId = content.sectionId;
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
              <span>{content.index}</span>
              <i />
              <strong>{content.label}</strong>
            </div>
            <Dialog.Close className="nav-info-close" aria-label="Close information">
              <X size={20} aria-hidden="true" />
            </Dialog.Close>
            <Dialog.Title>{content.title}</Dialog.Title>
            <Dialog.Description id="nav-info-description">
              {content.introduction}
            </Dialog.Description>
          </header>

          <div className="nav-info-body">
            {activeSection === 'platform' && (
              <div className="nav-info-platform-flow" aria-label="Aegis Link platform flow">
                <div className="nav-info-flow-node">
                  <Smartphone size={28} strokeWidth={1.25} aria-hidden="true" />
                  <span>01 / Field</span>
                  <strong>Guard Web App</strong>
                  <small>Patrols · Incidents · Response</small>
                </div>
                <div className="nav-info-flow-core">
                  <i />
                  <span><Link2 size={19} strokeWidth={1.3} aria-hidden="true" /></span>
                  <strong>Connected operational layer</strong>
                  <small>One live operation</small>
                  <i />
                </div>
                <div className="nav-info-flow-node">
                  <MonitorCog size={28} strokeWidth={1.25} aria-hidden="true" />
                  <span>02 / Operations</span>
                  <strong>Operations Dashboard</strong>
                  <small>Control · Visibility · Audit</small>
                </div>
              </div>
            )}

            <div className={`nav-info-grid ${activeSection === 'resources' ? 'is-technical' : ''}`}>
              {content.items.map((item) => {
                const Icon = item.icon;
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
                <small>Integrated AI layer</small>
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
                Request Preview Access →
              </button>
            </div>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NavigationInfoModal;
