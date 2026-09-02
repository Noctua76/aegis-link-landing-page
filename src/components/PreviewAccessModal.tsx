import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, Check, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { PREVIEW_ACCESS_EVENT } from '@/lib/previewAccess';
import { useLanguage } from '@/i18n/LanguageContext';

type PreviewFormData = {
  fullName: string;
  businessEmail: string;
  company: string;
  role: string;
  operationSize: string;
  priority: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialFormData: PreviewFormData = {
  fullName: '',
  businessEmail: '',
  company: '',
  role: '',
  operationSize: '',
  priority: '',
  phone: '',
  message: '',
  consent: false,
  website: '',
};

const operationSizes = ['1–10', '11–50', '51–200', '200+'];
const priorityValues = [
  'Live operational visibility',
  'Patrol verification',
  'Incident response and escalation',
  'Accountability and audit trail',
];

const PreviewAccessModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { copy, language } = useLanguage();

  useEffect(() => {
    const handleOpen = () => {
      setStep(1);
      setStatus('idle');
      setOpen(true);
    };

    window.addEventListener(PREVIEW_ACCESS_EVENT, handleOpen);
    return () => window.removeEventListener(PREVIEW_ACCESS_EVENT, handleOpen);
  }, []);

  const updateField = <K extends keyof PreviewFormData>(key: K, value: PreviewFormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    if (formData.website) {
      setStatus('success');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@eliaskalyvas.gr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.businessEmail,
          company: formData.company,
          role: formData.role,
          security_operation_size: formData.operationSize,
          primary_priority: formData.priority,
          phone: formData.phone || copy.previewModal.notProvided,
          operational_need: formData.message,
          consent_to_contact: copy.previewModal.consentYes,
          source: `${copy.previewModal.source} (${language.toUpperCase()})`,
          _subject: `Aegis Link preview request — ${formData.company}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: formData.businessEmail,
        }),
      });

      const result = await response.json();
      const succeeded = result.success === true || result.success === 'true';

      if (!response.ok || !succeeded) {
        throw new Error('The request could not be sent.');
      }

      setStatus('success');
      setFormData(initialFormData);
    } catch {
      setStatus('error');
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && status !== 'submitting') {
      window.setTimeout(() => {
        setStep(1);
        setStatus('idle');
      }, 220);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="preview-modal-overlay" />
        <Dialog.Content className="preview-modal">
          <aside className="preview-modal-context">
            <div className="preview-modal-mark" aria-hidden="true">
              <ShieldCheck size={25} strokeWidth={1.35} />
            </div>
            <p className="preview-modal-kicker">Aegis Link</p>
            <Dialog.Title>{copy.previewModal.title}</Dialog.Title>
            <Dialog.Description>
              {copy.previewModal.description}
            </Dialog.Description>

            <ul>
              {copy.previewModal.benefits.map((benefit) => (
                <li key={benefit}><Check size={15} aria-hidden="true" /><span>{benefit}</span></li>
              ))}
            </ul>
          </aside>

          <div className="preview-modal-main">
            <Dialog.Close className="preview-modal-close" aria-label={copy.previewModal.close}>
              <X size={20} aria-hidden="true" />
            </Dialog.Close>

            {status === 'success' ? (
              <div className="preview-modal-result" role="status">
                <span><Check size={27} aria-hidden="true" /></span>
                <p className="preview-modal-kicker">{copy.previewModal.received}</p>
                <h3>{copy.previewModal.thankYou}</h3>
                <p>{copy.previewModal.success}</p>
                <Dialog.Close className="preview-modal-primary">{copy.previewModal.return}</Dialog.Close>
              </div>
            ) : (
              <form className="preview-modal-form" onSubmit={handleSubmit}>
                <div className="preview-modal-progress" aria-label={`${copy.previewModal.step} ${step} ${copy.previewModal.of} 2`}>
                  <span>{step === 1 ? copy.previewModal.stepOne : copy.previewModal.stepTwo}</span>
                  <i className="is-active" />
                  <i className={step === 2 ? 'is-active' : ''} />
                </div>

                {step === 1 ? (
                  <div className="preview-modal-fields">
                    <label>
                      <span>{copy.previewModal.fullName}</span>
                      <input
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(event) => updateField('fullName', event.target.value)}
                        placeholder={copy.previewModal.fullNamePlaceholder}
                        required
                        autoFocus
                      />
                    </label>
                    <label>
                      <span>{copy.previewModal.email}</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={formData.businessEmail}
                        onChange={(event) => updateField('businessEmail', event.target.value)}
                        placeholder="name@company.com"
                        required
                      />
                    </label>
                    <label className="preview-modal-field-wide">
                      <span>{copy.previewModal.company}</span>
                      <input
                        type="text"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(event) => updateField('company', event.target.value)}
                        placeholder={copy.previewModal.companyPlaceholder}
                        required
                      />
                    </label>
                    <label className="preview-modal-field-wide">
                      <span>{copy.previewModal.role}</span>
                      <input
                        type="text"
                        autoComplete="organization-title"
                        value={formData.role}
                        onChange={(event) => updateField('role', event.target.value)}
                        placeholder={copy.previewModal.rolePlaceholder}
                        required
                      />
                    </label>
                  </div>
                ) : (
                  <div className="preview-modal-fields">
                    <label>
                      <span>{copy.previewModal.operation}</span>
                      <select
                        value={formData.operationSize}
                        onChange={(event) => updateField('operationSize', event.target.value)}
                        required
                        autoFocus
                      >
                        <option value="" disabled>{copy.previewModal.selectSize}</option>
                        {operationSizes.map((size) => (
                          <option key={size} value={`${size} guards`}>{size} {copy.previewModal.guards}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>{copy.previewModal.priority}</span>
                      <select
                        value={formData.priority}
                        onChange={(event) => updateField('priority', event.target.value)}
                        required
                      >
                        <option value="" disabled>{copy.previewModal.selectPriority}</option>
                        {priorityValues.map((value, index) => (
                          <option key={value} value={value}>{copy.previewModal.priorities[index]}</option>
                        ))}
                      </select>
                    </label>
                    <label className="preview-modal-field-wide">
                      <span>{copy.previewModal.phone} <small>{copy.previewModal.optional}</small></span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        placeholder={copy.previewModal.phonePlaceholder}
                      />
                    </label>
                    <label className="preview-modal-field-wide">
                      <span>{copy.previewModal.need}</span>
                      <textarea
                        value={formData.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        placeholder={copy.previewModal.needPlaceholder}
                        required
                      />
                    </label>

                    <label className="preview-modal-consent preview-modal-field-wide">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(event) => updateField('consent', event.target.checked)}
                        required
                      />
                      <span>{copy.previewModal.consent}</span>
                    </label>

                    <label className="preview-modal-honeypot" aria-hidden="true">
                      {copy.previewModal.website}
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={(event) => updateField('website', event.target.value)}
                      />
                    </label>
                  </div>
                )}

                {status === 'error' && (
                  <p className="preview-modal-error" role="alert">
                    {copy.previewModal.error}
                  </p>
                )}

                <div className="preview-modal-actions">
                  <p><LockKeyhole size={14} aria-hidden="true" /> {copy.previewModal.privacy}</p>
                  <div>
                    {step === 2 && (
                      <button
                        className="preview-modal-back"
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setStep(1);
                        }}
                        disabled={status === 'submitting'}
                      >
                        <ArrowLeft size={15} aria-hidden="true" /> {copy.previewModal.back}
                      </button>
                    )}
                    <button className="preview-modal-primary" type="submit" disabled={status === 'submitting'}>
                      {step === 1 ? copy.previewModal.continue : status === 'submitting' ? copy.previewModal.sending : copy.previewModal.requestAccess}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PreviewAccessModal;
