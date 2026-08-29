import type { CSSProperties } from 'react';
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
  return (
    <section id="faq" className="questions-story" aria-labelledby="questions-story-heading">
      <div className="questions-story-image" aria-hidden="true" />
      <div className="questions-story-veil" aria-hidden="true" />

      <div className="questions-story-shell">
        <div className="questions-story-copy">
          <div className="questions-scene-marker" aria-hidden="true">
            <span>07</span>
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
