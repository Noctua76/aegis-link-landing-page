import { useEffect, useState } from 'react';

const stops = [
  { id: 'editorial-opening', label: 'The crucial moment', time: '03:59' },
  { id: 'operations-view', label: 'The shift begins', time: '23:00' },
  { id: 'patrol-story', label: 'The patrol', time: '01:30' },
  { id: 'silence-story', label: 'Operational silence', time: '03:58' },
  { id: 'incident-story', label: 'The incident', time: '04:00' },
  { id: 'capabilities', label: 'One action', time: '04:00' },
  { id: 'visuals', label: 'Shared visibility', time: '04:01' },
  { id: 'accountability', label: 'Accountability', time: 'LIVE' },
  { id: 'extensions', label: 'Operational control', time: '07:00' },
  { id: 'faq', label: 'The questions', time: '07:01' },
  { id: 'preview-access', label: 'Preview access', time: 'ACCESS' },
];

const SectionProgressRail = () => {
  const [activeStop, setActiveStop] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveStop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const focusLine = window.innerHeight * 0.42;
        let nextStop = 0;

        stops.forEach((stop, index) => {
          const element = document.getElementById(stop.id);
          if (element && element.getBoundingClientRect().top <= focusLine) nextStop = index;
        });

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
          nextStop = stops.length - 1;
        }

        setActiveStop(nextStop);
        frameId = null;
      });
    };

    updateActiveStop();
    window.addEventListener('scroll', updateActiveStop, { passive: true });
    window.addEventListener('resize', updateActiveStop);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateActiveStop);
      window.removeEventListener('resize', updateActiveStop);
    };
  }, []);

  const isDaylight = ['faq', 'preview-access'].includes(stops[activeStop]?.id);

  return (
    <aside className={`section-progress-rail ${isDaylight ? 'is-daylight' : ''}`} aria-label="Page sections">
      <div className="section-progress-dots">
        {stops.map((stop, index) => (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            className={index === activeStop ? 'is-active' : ''}
            aria-label={`Go to ${stop.label}`}
            aria-current={index === activeStop ? 'step' : undefined}
          >
            <em>{stop.time}</em>
            <span />
          </a>
        ))}
      </div>
      <div className="section-progress-line" aria-hidden="true" />
      <a className="section-progress-scroll" href="#operations-view">
        <span>Scroll to rewind the night</span>
        <i aria-hidden="true" />
      </a>
    </aside>
  );
};

export default SectionProgressRail;
