import { useEffect, useState } from 'react';

const stops = [
  { id: 'editorial-opening', label: 'Opening' },
  { id: 'operations-view', label: 'Operations' },
  { id: 'capabilities', label: 'Control' },
  { id: 'visuals', label: 'Evidence' },
  { id: 'extensions', label: 'Scale' },
  { id: 'preview-access', label: 'Access' },
];

const SectionProgressRail = () => {
  const [activeStop, setActiveStop] = useState(0);

  useEffect(() => {
    const updateActiveStop = () => {
      const focusLine = window.scrollY + window.innerHeight * 0.42;
      let nextStop = 0;

      stops.forEach((stop, index) => {
        const element = document.getElementById(stop.id);
        if (element && element.offsetTop <= focusLine) nextStop = index;
      });

      setActiveStop(nextStop);
    };

    updateActiveStop();
    window.addEventListener('scroll', updateActiveStop, { passive: true });
    window.addEventListener('resize', updateActiveStop);

    return () => {
      window.removeEventListener('scroll', updateActiveStop);
      window.removeEventListener('resize', updateActiveStop);
    };
  }, []);

  return (
    <aside className="section-progress-rail" aria-label="Page sections">
      <div className="section-progress-dots">
        {stops.map((stop, index) => (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            className={index === activeStop ? 'is-active' : ''}
            aria-label={`Go to ${stop.label}`}
            aria-current={index === activeStop ? 'step' : undefined}
          >
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
