import { useEffect, useMemo, useState } from 'react';
import { openPreviewAccessModal } from '@/lib/previewAccess';

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
const storyTimeline = ['23:00', '01:30', '03:58', '03:59', '04:00', '04:01', '07:00'];

const MOBILE_SEGMENT_POINTS: Record<string, string> = {
  a: '12,0 88,0 94,4 88,8 12,8 6,4',
  b: '92,12 96,6 100,12 100,82 96,88 92,82',
  c: '92,98 96,92 100,98 100,168 96,174 92,168',
  d: '12,172 88,172 94,176 88,180 12,180 6,176',
  e: '0,98 4,92 8,98 8,168 4,174 0,168',
  f: '0,12 4,6 8,12 8,82 4,88 0,82',
  g: '12,86 88,86 94,90 88,94 12,94 6,90',
};

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

const MobileSevenSegmentClock = ({ value }: { value: string }) => {
  let cursor = 0;
  const glyphs = value.split('').map((character, index) => {
    const x = cursor;

    if (character === ':') {
      cursor += 34;
      return (
        <g key={`${index}-${character}`} transform={`translate(${x} 0)`}>
          <circle className="mobile-clock-active" cx="17" cy="68" r="4" fill="#ffc21c" />
          <circle className="mobile-clock-active" cx="17" cy="112" r="4" fill="#ffc21c" />
        </g>
      );
    }

    cursor += 108;
    const activeSegments = DIGIT_SEGMENTS[character] ?? [];

    return (
      <g key={`${index}-${character}`} transform={`translate(${x} 0)`}>
        {SEGMENTS.map((segment) => (
          <polygon
            key={segment}
            className={activeSegments.includes(segment) ? 'mobile-clock-active' : 'mobile-clock-inactive'}
            points={MOBILE_SEGMENT_POINTS[segment]}
            fill={activeSegments.includes(segment) ? '#ffc21c' : 'transparent'}
          />
        ))}
      </g>
    );
  });

  return (
    <svg
      className="mobile-editorial-clock"
      viewBox={`0 0 ${cursor} 180`}
      role="img"
      aria-label={`Time ${value}`}
      preserveAspectRatio="xMinYMid meet"
      shapeRendering="geometricPrecision"
    >
      {glyphs}
    </svg>
  );
};

const EditorialHeroSection = () => {
  const [seconds, setSeconds] = useState(47);
  const [activeTimelineStop, setActiveTimelineStop] = useState(3);

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
      const timedSections = [
        { id: 'operations-view', timelineIndex: 0 },
        { id: 'patrol-story', timelineIndex: 1 },
        { id: 'silence-story', timelineIndex: 2 },
        { id: 'incident-story', timelineIndex: 4 },
        { id: 'visuals', timelineIndex: 5 },
        { id: 'extensions', timelineIndex: 6 },
      ];
      let nextIndex = 3;

      timedSections.forEach(({ id, timelineIndex }) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= focusLine) nextIndex = timelineIndex;
      });

      setActiveTimelineStop(nextIndex);
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

          <MobileSevenSegmentClock value={time} />

          <div className="editorial-crucial-moment">
            <i aria-hidden="true" />
            <strong>THE CRUCIAL MOMENT</strong>
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
          <button className="editorial-action" type="button" onClick={openPreviewAccessModal}>
              Request Preview Access
          </button>
        </div>
        </div>

        <div className="editorial-timeline editorial-reveal editorial-reveal-five" aria-label="Incident timeline">
          <div className="editorial-timeline-line" aria-hidden="true" />
          {storyTimeline.map((label, index) => (
            <div
              key={label}
              className={`editorial-timeline-stop ${index === activeTimelineStop ? 'is-active' : ''} ${index < activeTimelineStop ? 'is-past' : ''} ${index === 4 ? 'is-alert' : ''}`}
            >
              <span aria-hidden="true" />
              <time>{label}</time>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default EditorialHeroSection;
