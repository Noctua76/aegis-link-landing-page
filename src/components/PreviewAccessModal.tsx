import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, Check, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { PREVIEW_ACCESS_EVENT } from '@/lib/previewAccess';

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

const PreviewAccessModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
          phone: formData.phone || 'Not provided',
          operational_need: formData.message,
          consent_to_contact: 'Yes',
          source: 'Aegis Link landing page',
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
        <Dialog.Content className="preview-modal" aria-describedby="preview-modal-description">
          <aside className="preview-modal-context">
            <div className="preview-modal-mark" aria-hidden="true">
              <ShieldCheck size={25} strokeWidth={1.35} />
            </div>
            <p className="preview-modal-kicker">Aegis Link</p>
            <Dialog.Title>A preview built around your operation.</Dialog.Title>
            <Dialog.Description id="preview-modal-description">
              A short qualification helps us present the platform through the use case that matters to you.
            </Dialog.Description>

            <ul>
              <li><Check size={15} aria-hidden="true" /><span>Read-only environment</span></li>
              <li><Check size={15} aria-hidden="true" /><span>Controlled duration</span></li>
              <li><Check size={15} aria-hidden="true" /><span>Operational walkthrough</span></li>
            </ul>
          </aside>

          <div className="preview-modal-main">
            <Dialog.Close className="preview-modal-close" aria-label="Close preview request">
              <X size={20} aria-hidden="true" />
            </Dialog.Close>

            {status === 'success' ? (
              <div className="preview-modal-result" role="status">
                <span><Check size={27} aria-hidden="true" /></span>
                <p className="preview-modal-kicker">Request received</p>
                <h3>Thank you.</h3>
                <p>Your preview request has been sent. We will contact you shortly to arrange the next step.</p>
                <Dialog.Close className="preview-modal-primary">Return to Aegis Link</Dialog.Close>
              </div>
            ) : (
              <form className="preview-modal-form" onSubmit={handleSubmit}>
                <div className="preview-modal-progress" aria-label={`Step ${step} of 2`}>
                  <span>{step === 1 ? '01 · Your details' : '02 · Your operation'}</span>
                  <i className="is-active" />
                  <i className={step === 2 ? 'is-active' : ''} />
                </div>

                {step === 1 ? (
                  <div className="preview-modal-fields">
                    <label>
                      <span>Full name</span>
                      <input
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(event) => updateField('fullName', event.target.value)}
                        placeholder="Your name"
                        required
                        autoFocus
                      />
                    </label>
                    <label>
                      <span>Business email</span>
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
                      <span>Company / organization</span>
                      <input
                        type="text"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(event) => updateField('company', event.target.value)}
                        placeholder="Organization name"
                        required
                      />
                    </label>
                    <label className="preview-modal-field-wide">
                      <span>Your role</span>
                      <input
                        type="text"
                        autoComplete="organization-title"
                        value={formData.role}
                        onChange={(event) => updateField('role', event.target.value)}
                        placeholder="Role or responsibility"
                        required
                      />
                    </label>
                  </div>
                ) : (
                  <div className="preview-modal-fields">
                    <label>
                      <span>Security operation</span>
                      <select
                        value={formData.operationSize}
                        onChange={(event) => updateField('operationSize', event.target.value)}
                        required
                        autoFocus
                      >
                        <option value="" disabled>Select size</option>
                        <option value="1–10 guards">1–10 guards</option>
                        <option value="11–50 guards">11–50 guards</option>
                        <option value="51–200 guards">51–200 guards</option>
                        <option value="200+ guards">200+ guards</option>
                      </select>
                    </label>
                    <label>
                      <span>Primary priority</span>
                      <select
                        value={formData.priority}
                        onChange={(event) => updateField('priority', event.target.value)}
                        required
                      >
                        <option value="" disabled>Select priority</option>
                        <option value="Live operational visibility">Live operational visibility</option>
                        <option value="Patrol verification">Patrol verification</option>
                        <option value="Incident response and escalation">Incident response & escalation</option>
                        <option value="Accountability and audit trail">Accountability & audit trail</option>
                      </select>
                    </label>
                    <label className="preview-modal-field-wide">
                      <span>Phone <small>Optional</small></span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        placeholder="Phone number"
                      />
                    </label>
                    <label className="preview-modal-field-wide">
                      <span>Operational need</span>
                      <textarea
                        value={formData.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        placeholder="Briefly describe your current operation or the challenge you want to evaluate."
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
                      <span>I agree to be contacted regarding this preview request. My information will only be used for this purpose.</span>
                    </label>

                    <label className="preview-modal-honeypot" aria-hidden="true">
                      Website
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
                    The request could not be sent. Please try again or email info@eliaskalyvas.gr.
                  </p>
                )}

                <div className="preview-modal-actions">
                  <p><LockKeyhole size={14} aria-hidden="true" /> Your details remain private</p>
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
                        <ArrowLeft size={15} aria-hidden="true" /> Back
                      </button>
                    )}
                    <button className="preview-modal-primary" type="submit" disabled={status === 'submitting'}>
                      {step === 1 ? 'Continue →' : status === 'submitting' ? 'Sending…' : 'Request access →'}
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
