import { useEffect, useMemo, useState } from 'react';

const DIGIT_SEGMENTS: Record<string, string[]> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'c', 'd', 'g'],
  '4': ['f', 'g', 'b', 'c'],
  '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'g', 'e', 'c', 'd'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'],
};

const SEGMENTS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const SevenSegmentDigit = ({ value }: { value: string }) => {
  if (value === ':') {
    return (
      <span className="editorial-clock-colon" aria-hidden="true">
        <span />
        <span />
      </span>
    );
  }

  const activeSegments = DIGIT_SEGMENTS[value] ?? [];

  return (
    <span className="editorial-clock-digit" aria-hidden="true">
      {SEGMENTS.map((segment) => (
        <span
          key={segment}
          className={`editorial-clock-segment editorial-clock-segment-${segment} ${
            activeSegments.includes(segment) ? 'is-active' : ''
          }`}
        />
      ))}
    </span>
  );
};

const EditorialHeroSection = () => {
  const [seconds, setSeconds] = useState(47);
  const [activeTimelineStop, setActiveTimelineStop] = useState(2);

  useEffect(() => {
    const startedAt = Date.now();

    const updateClock = () => {
      const elapsedSteps = Math.floor((Date.now() - startedAt) / 1200);
      const cycleStep = elapsedSteps % 16;
      setSeconds(cycleStep <= 12 ? 47 + cycleStep : 59);
    };

    updateClock();
    const interval = window.setInterval(updateClock, 250);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTimeline = () => {
      const focusLine = window.scrollY + window.innerHeight * 0.42;
      const operations = document.getElementById('operations-view');
      const evidence = document.getElementById('visuals');

      if (evidence && evidence.offsetTop <= focusLine) {
        setActiveTimelineStop(4);
      } else if (operations && operations.offsetTop <= focusLine) {
        setActiveTimelineStop(3);
      } else {
        setActiveTimelineStop(2);
      }
    };

    updateTimeline();
    window.addEventListener('scroll', updateTimeline, { passive: true });
    window.addEventListener('resize', updateTimeline);

    return () => {
      window.removeEventListener('scroll', updateTimeline);
      window.removeEventListener('resize', updateTimeline);
    };
  }, []);

  const time = useMemo(
    () => `03:59:${seconds.toString().padStart(2, '0')}`,
    [seconds],
  );

  return (
    <section
      id="editorial-opening"
      className="editorial-hero editorial-hero-v2"
      aria-labelledby="editorial-hero-heading"
    >
      <div className="editorial-hero-veil" aria-hidden="true" />

      <div className="editorial-hero-v2-layout">
        <div className="editorial-hero-v2-content">
          <div
            className={`editorial-clock editorial-reveal-clock ${seconds >= 57 ? 'is-near' : ''}`}
            role="img"
            aria-label={`Time ${time}`}
          >
            {time.split('').map((character, index) => (
              <SevenSegmentDigit key={`${index}-${character}`} value={character} />
            ))}
            <span className="editorial-clock-signal" aria-hidden="true" />
          </div>

        <h1 id="editorial-hero-heading" className="editorial-hero-heading">
          <span className="editorial-reveal editorial-reveal-one">
            Security does not fail when an incident happens.
          </span>
          <strong className="editorial-reveal editorial-reveal-two">
            It fails when no one sees it soon enough.
          </strong>
        </h1>

          <span className="editorial-hero-rule editorial-reveal editorial-reveal-three" aria-hidden="true" />

        <p className="editorial-hero-subtitle editorial-reveal editorial-reveal-three">
          Aegis Link connects guards, supervisors and operations
          <span> in one real-time Security Operations Platform.</span>
        </p>

          <div className="editorial-pillars editorial-reveal editorial-reveal-four" aria-label="Aegis Link principles">
            <span>Visibility</span>
            <i aria-hidden="true">·</i>
            <span>Control</span>
            <i aria-hidden="true">·</i>
            <span>Response</span>
            <i aria-hidden="true">·</i>
            <span>Accountability</span>
          </div>

        <div className="editorial-hero-actions editorial-reveal editorial-reveal-four">
          <a className="editorial-action editorial-action-primary" href="#operations-view">
              <span>Enter the Operations View</span>
              <i aria-hidden="true">→</i>
          </a>
          <a className="editorial-action" href="#preview-access">
              Request Preview Access
          </a>
        </div>
        </div>

        <div className="editorial-timeline editorial-reveal editorial-reveal-five" aria-label="Incident timeline">
          <div className="editorial-timeline-line" aria-hidden="true" />
          {['23:00', '01:30', '03:59', '04:00', '07:00'].map((label, index) => (
            <div
              key={label}
              className={`editorial-timeline-stop ${index === activeTimelineStop ? 'is-active' : ''} ${index < activeTimelineStop ? 'is-past' : ''} ${index === 3 ? 'is-alert' : ''}`}
            >
              <span aria-hidden="true" />
              <time>{label}</time>
            </div>
          ))}
        </div>
      </div>

      <div className="editorial-scene-index" aria-hidden="true">
        <span>01</span>
        <i />
        <strong>The moment before</strong>
      </div>
    </section>
  );
};

export default EditorialHeroSection;
