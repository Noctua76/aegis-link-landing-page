import { useEffect, useRef, type CSSProperties } from 'react';
import { MessageSquareText, PhoneCall, Radio, ShieldCheck } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';
import { useLanguage } from '@/i18n/LanguageContext';

const CapabilitiesSection = () => {
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
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="response-story"
      aria-labelledby="response-story-heading"
    >
      <div className="response-story-veil" aria-hidden="true" />

      <div className="response-story-shell">
        <div className="response-system" aria-label={copy.response.systemLabel}>
          <div className="response-system-heading">
            <span>{copy.response.systemTitle}</span>
            <span>{copy.response.chainReady}</span>
          </div>

          <div className="response-network">
            <div className="response-panic-wrap">
              <div className="response-panic-rings" aria-hidden="true" />
              <div className="response-panic-control">
                <Radio size={21} strokeWidth={1.45} aria-hidden="true" />
                <strong>{copy.response.panic}</strong>
                <span>{copy.response.oneAction}</span>
              </div>
            </div>

            <ol className="response-recipient-list">
              {copy.response.recipients.map((recipient, index) => (
                <li key={recipient} style={{ '--recipient-index': index } as CSSProperties}>
                  <i className="response-connector" aria-hidden="true" />
                  <div className="response-recipient-number">0{index + 1}</div>
                  <div className="response-recipient-copy">
                    <strong>{recipient}</strong>
                    <span>
                      <PhoneCall size={13} strokeWidth={1.5} aria-hidden="true" />
                      <MessageSquareText size={13} strokeWidth={1.5} aria-hidden="true" />
                      {copy.response.callMessage}
                    </span>
                  </div>
                  <div className="response-recipient-status">
                    <i aria-hidden="true" />
                    {copy.response.dispatched}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="response-system-outcome">
            <ShieldCheck size={18} strokeWidth={1.4} aria-hidden="true" />
            <span>{copy.response.outcome}</span>
          </div>
        </div>

        <div className="response-story-copy">
          <div className="response-scene-marker" aria-hidden="true">
            <span>05</span>
            <i />
            <strong>{copy.response.marker}</strong>
          </div>

          <p className="response-time">04:00</p>

          <h2 id="response-story-heading">
            {copy.response.heading}
            <strong>{copy.response.headingStrong}</strong>
          </h2>

          <p className="response-story-lead">
            {copy.response.lead}
          </p>

          <div className="response-outcomes">
            <div>
              <span>{copy.response.system}</span>
              <p>
                <GuidedCaption
                  segments={[{ text: copy.response.systemOutcome }]}
                  startDelayMs={500}
                  cycleMs={16160}
                />
              </p>
            </div>
            <div>
              <span>{copy.response.guard}</span>
              <p>
                <GuidedCaption
                  segments={[{ text: copy.response.guardOutcome }]}
                  startDelayMs={7060}
                  cycleMs={16160}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="response-timeline" aria-label={copy.response.timelineLabel}>
          <div className="response-timeline-track" aria-hidden="true" />
          <div className="response-timeline-event is-past">
            <span aria-hidden="true" />
            <time>03:59</time>
            <small>{copy.response.watch}</small>
          </div>
          <div className="response-timeline-event is-incident">
            <span aria-hidden="true" />
            <time>04:00</time>
            <small>{copy.response.incident}</small>
          </div>
          <div className="response-timeline-event is-active">
            <span aria-hidden="true" />
            <time>{copy.response.now}</time>
            <small>{copy.response.response}</small>
          </div>
        </div>

        <a className="response-next" href="#visuals">
          <span>{copy.response.next}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
