import { useEffect, useRef, useState } from 'react';

type GuidedCaptionTone = 'neutral' | 'gold' | 'blue';

type GuidedCaptionSegment = {
  text: string;
  emphasis?: boolean;
  tone?: GuidedCaptionTone;
};

type GuidedCaptionProps = {
  segments: GuidedCaptionSegment[];
  stacked?: boolean;
  className?: string;
  startDelayMs?: number;
  cycleMs?: number;
};

const WORD_STEP_MS = 820;
const DEFAULT_START_DELAY_MS = 500;
const DEFAULT_PAUSE_MS = 1400;

const GuidedCaption = ({
  segments,
  stacked = false,
  className = '',
  startDelayMs = DEFAULT_START_DELAY_MS,
  cycleMs,
}: GuidedCaptionProps) => {
  const captionRef = useRef<HTMLSpanElement>(null);
  const [activeWord, setActiveWord] = useState(-1);
  const totalWords = segments.reduce((total, segment) => total + segment.text.trim().split(/\s+/).length, 0);
  const resolvedCycleMs = cycleMs ?? startDelayMs + totalWords * WORD_STEP_MS + DEFAULT_PAUSE_MS;

  useEffect(() => {
    const caption = captionRef.current;
    if (!caption) return;

    const mobile = window.matchMedia('(max-width: 767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mobile.matches || reducedMotion.matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let running = false;
    let cancelled = false;

    const clearTimer = () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
    };

    const stop = () => {
      running = false;
      clearTimer();
      setActiveWord(-1);
    };

    const runCycle = () => {
      if (!running || cancelled) return;

      timer = setTimeout(() => {
        let wordIndex = 0;

        const showNextWord = () => {
          if (!running || cancelled) return;
          setActiveWord(wordIndex);

          timer = setTimeout(() => {
            wordIndex += 1;

            if (wordIndex < totalWords) {
              showNextWord();
              return;
            }

            setActiveWord(-1);
            const remainingPause = Math.max(
              cycleMs ? 500 : DEFAULT_PAUSE_MS,
              resolvedCycleMs - startDelayMs - totalWords * WORD_STEP_MS,
            );
            timer = setTimeout(runCycle, remainingPause);
          }, WORD_STEP_MS);
        };

        showNextWord();
      }, startDelayMs);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (running) return;
          running = true;
          runCycle();
          return;
        }

        stop();
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(caption);

    return () => {
      cancelled = true;
      clearTimer();
      observer.disconnect();
    };
  }, [cycleMs, resolvedCycleMs, startDelayMs, totalWords]);

  let globalWordIndex = 0;
  const accessibleText = segments.map((segment) => segment.text).join(' ');

  return (
    <span
      ref={captionRef}
      className={`guided-caption${stacked ? ' guided-caption--stacked' : ''}${className ? ` ${className}` : ''}`}
      aria-label={accessibleText}
    >
      {segments.map((segment, segmentIndex) => {
        const SegmentTag = segment.emphasis ? 'strong' : 'span';
        const words = segment.text.trim().split(/\s+/);

        return (
          <SegmentTag
            key={`${segment.text}-${segmentIndex}`}
            className={`guided-caption-segment guided-caption-segment--${segment.tone ?? 'neutral'}`}
            aria-hidden="true"
          >
            {words.map((word, wordIndex) => {
              const currentIndex = globalWordIndex;
              globalWordIndex += 1;

              return (
                <span
                  key={`${word}-${wordIndex}`}
                  className={`guided-caption-word${activeWord === currentIndex ? ' is-active' : ''}`}
                  data-word={word}
                >
                  {word}
                </span>
              );
            })}
          </SegmentTag>
        );
      })}
    </span>
  );
};

export default GuidedCaption;
