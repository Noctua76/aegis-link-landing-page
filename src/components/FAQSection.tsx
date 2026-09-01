import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, Crosshair, MapPin, RadioTower, Route, ScanSearch } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const operationalQuestions = [
  {
    question: 'Where is every guard—right now?',
    answer: 'Live site presence, GPS position and active guard sessions replace assumptions with a shared operational picture.',
    icon: MapPin,
  },
  {
    question: 'Was every patrol actually completed?',
    answer: 'Time-stamped patrols and QR checkpoint verification turn a verbal confirmation into evidence.',
    icon: Route,
  },
  {
    question: 'Who was informed—and when?',
    answer: 'Calls, messages, acknowledgements and escalation events remain connected to one incident record.',
    icon: RadioTower,
  },
  {
    question: 'Can one team see every site?',
    answer: 'A single operations layer connects guards, shifts, patrols and incidents across the entire security operation.',
    icon: ScanSearch,
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;

    const updateReveal = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        if (reducedMotion.matches) {
          section.style.setProperty('--curtain-progress', '1');
          return;
        }

        const sectionTop = section.getBoundingClientRect().top;
        const revealStart = window.innerHeight * 0.96;
        const revealEnd = window.innerHeight * 0.2;
        const progress = Math.min(1, Math.max(0, (revealStart - sectionTop) / (revealStart - revealEnd)));

        section.style.setProperty('--curtain-progress', progress.toFixed(4));
      });
    };

    updateReveal();
    window.addEventListener('scroll', updateReveal, { passive: true });
    window.addEventListener('resize', updateReveal);
    reducedMotion.addEventListener('change', updateReveal);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateReveal);
      window.removeEventListener('resize', updateReveal);
      reducedMotion.removeEventListener('change', updateReveal);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="questions-story"
      aria-labelledby="questions-story-heading"
    >
      <div className="questions-story-image" aria-hidden="true" />
      <div className="questions-story-veil" aria-hidden="true" />
      <div className="questions-curtain" aria-hidden="true">
        <span className="questions-curtain-left" />
        <span className="questions-curtain-right" />
        <i />
      </div>

      <div className="questions-story-shell">
        <div className="questions-story-copy">
          <div className="questions-scene-marker" aria-hidden="true">
            <span>09</span>
            <i />
            <strong>THE QUESTIONS THAT MATTER</strong>
          </div>

          <div className="questions-dawn-marker">
            <span><i aria-hidden="true" /> 07:01</span>
            <strong>DAYLIGHT TEST</strong>
          </div>

          <h2 id="questions-story-heading">
            The night is over.
            <strong>Can your operation answer?</strong>
          </h2>

          <p className="questions-story-lead">
            A security operation is only as strong as the answers available
            before someone needs to make a call.
          </p>

          <p className="questions-story-statement">
            Technology is not the question.
            <strong>Operational certainty is.</strong>
          </p>
        </div>

        <div className="questions-panel">
          <div className="questions-panel-header">
            <Crosshair size={17} strokeWidth={1.35} aria-hidden="true" />
            <span>THE OPERATIONAL TEST</span>
            <strong>04 QUESTIONS</strong>
          </div>

          <Accordion type="single" collapsible defaultValue="question-0" className="questions-list">
            {operationalQuestions.map(({ question, answer, icon: Icon }, index) => (
              <AccordionItem
                key={question}
                value={`question-${index}`}
                className="questions-item"
                style={{ '--question-index': index } as CSSProperties}
              >
                <AccordionTrigger className="questions-trigger">
                  <span className="questions-number">0{index + 1}</span>
                  <Icon size={18} strokeWidth={1.25} aria-hidden="true" />
                  <span>{question}</span>
                </AccordionTrigger>
                <AccordionContent className="questions-answer">
                  <p>{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="questions-panel-footer">
            If the answer depends on a phone call, a memory or a spreadsheet,
            <strong> control is already delayed.</strong>
          </p>
        </div>

        <a className="questions-next" href="#preview-access">
          <span>See how Aegis Link answers them</span>
          <ArrowDown size={16} strokeWidth={1.25} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default FAQSection;
