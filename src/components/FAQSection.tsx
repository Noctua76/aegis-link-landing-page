import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, Crosshair, MapPin, RadioTower, Route, ScanSearch } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/i18n/LanguageContext';

const questionIcons = [MapPin, Route, RadioTower, ScanSearch];

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { copy } = useLanguage();

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
            <strong>{copy.questions.marker}</strong>
          </div>

          <div className="questions-dawn-marker">
            <span><i aria-hidden="true" /> 07:01</span>
            <strong>{copy.questions.daylight}</strong>
          </div>

          <h2 id="questions-story-heading">
            {copy.questions.heading}
            <strong>{copy.questions.headingStrong}</strong>
          </h2>

          <p className="questions-story-lead">
            {copy.questions.lead}
          </p>

          <p className="questions-story-statement">
            {copy.questions.statement}
            <strong>{copy.questions.statementStrong}</strong>
          </p>
        </div>

        <div className="questions-panel">
          <div className="questions-panel-header">
            <Crosshair size={17} strokeWidth={1.35} aria-hidden="true" />
            <span>{copy.questions.panelTitle}</span>
            <strong>{copy.questions.panelCount}</strong>
          </div>

          <Accordion type="single" collapsible defaultValue="question-0" className="questions-list">
            {copy.questions.items.map(({ question, answer }, index) => {
              const Icon = questionIcons[index];
              return (
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
              );
            })}
          </Accordion>

          <p className="questions-panel-footer">
            {copy.questions.footer}
            <strong>{copy.questions.footerStrong}</strong>
          </p>
        </div>

        <a className="questions-next" href="#preview-access">
          <span>{copy.questions.next}</span>
          <ArrowDown size={16} strokeWidth={1.25} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default FAQSection;
