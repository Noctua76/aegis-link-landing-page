import { useEffect, useRef, type CSSProperties } from 'react';
import { MessageSquareText, PhoneCall, Radio, ShieldCheck } from 'lucide-react';
import GuidedCaption from '@/components/GuidedCaption';

const recipients = ['RESPONSIBLE 01', 'RESPONSIBLE 02', 'RESPONSIBLE 03', 'RESPONSIBLE 04'];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        <div className="response-system" aria-label="Aegis Link automated panic alert sequence">
          <div className="response-system-heading">
            <span>AEGIS LINK / AUTOMATED RESPONSE</span>
            <span>ALERT CHAIN READY</span>
          </div>

          <div className="response-network">
            <div className="response-panic-wrap">
              <div className="response-panic-rings" aria-hidden="true" />
              <div className="response-panic-control">
                <Radio size={21} strokeWidth={1.45} aria-hidden="true" />
                <strong>PANIC</strong>
                <span>ONE ACTION</span>
              </div>
            </div>

            <ol className="response-recipient-list">
              {recipients.map((recipient, index) => (
                <li key={recipient} style={{ '--recipient-index': index } as CSSProperties}>
                  <i className="response-connector" aria-hidden="true" />
                  <div className="response-recipient-number">0{index + 1}</div>
                  <div className="response-recipient-copy">
                    <strong>{recipient}</strong>
                    <span>
                      <PhoneCall size={13} strokeWidth={1.5} aria-hidden="true" />
                      <MessageSquareText size={13} strokeWidth={1.5} aria-hidden="true" />
                      CALL + MESSAGE
                    </span>
                  </div>
                  <div className="response-recipient-status">
                    <i aria-hidden="true" />
                    DISPATCHED
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="response-system-outcome">
            <ShieldCheck size={18} strokeWidth={1.4} aria-hidden="true" />
            <span>THE RESPONSE CHAIN IS ALREADY MOVING</span>
          </div>
        </div>

        <div className="response-story-copy">
          <div className="response-scene-marker" aria-hidden="true">
            <span>06</span>
            <i />
            <strong>ONE ACTION</strong>
          </div>

          <p className="response-time">04:00</p>

          <h2 id="response-story-heading">
            One action.
            <strong>Everyone who matters, reached.</strong>
          </h2>

          <p className="response-story-lead">
            With the panic button, the guard does not need to search, dial, wait
            and repeat. Aegis Link activates the predefined call and message flow.
          </p>

          <div className="response-outcomes">
            <div>
              <span>SYSTEM</span>
              <p>
                <GuidedCaption
                  segments={[{ text: 'Calls and messages move through the response chain.' }]}
                  startDelayMs={500}
                  cycleMs={16160}
                />
              </p>
            </div>
            <div>
              <span>GUARD</span>
              <p>
                <GuidedCaption
                  segments={[{ text: 'Stays focused on the threat and can contact the authorities.' }]}
                  startDelayMs={7060}
                  cycleMs={16160}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="response-timeline" aria-label="Incident response timeline">
          <div className="response-timeline-track" aria-hidden="true" />
          <div className="response-timeline-event is-past">
            <span aria-hidden="true" />
            <time>03:59</time>
            <small>WATCH</small>
          </div>
          <div className="response-timeline-event is-incident">
            <span aria-hidden="true" />
            <time>04:00</time>
            <small>INCIDENT</small>
          </div>
          <div className="response-timeline-event is-active">
            <span aria-hidden="true" />
            <time>NOW</time>
            <small>RESPONSE</small>
          </div>
        </div>

        <a className="response-next" href="#visuals">
          <span>The alert is only the beginning</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
