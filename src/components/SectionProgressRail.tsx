import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const stopIds = ['editorial-opening', 'operations-view', 'patrol-story', 'silence-story', 'incident-story', 'capabilities', 'visuals', 'accountability', 'extensions', 'faq', 'preview-access'];

const SectionProgressRail = () => {
  const [activeStop, setActiveStop] = useState(0);
  const { copy } = useLanguage();
  const stops = stopIds.map((id, index) => ({ id, ...copy.progress.stops[index] }));

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveStop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const focusLine = window.innerHeight * 0.42;
        let nextStop = 0;

        stopIds.forEach((id, index) => {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= focusLine) nextStop = index;
        });

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
          nextStop = stopIds.length - 1;
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

  const isDaylight = ['faq', 'preview-access'].includes(stopIds[activeStop]);

  return (
    <aside className={`section-progress-rail ${isDaylight ? 'is-daylight' : ''}`} aria-label={copy.progress.ariaLabel}>
      <div className="section-progress-dots">
        {stops.map((stop, index) => (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            className={index === activeStop ? 'is-active' : ''}
            aria-label={`${copy.progress.goTo} ${stop.label}`}
            aria-current={index === activeStop ? 'step' : undefined}
          >
            <em>{stop.time}</em>
            <span />
          </a>
        ))}
      </div>
      <div className="section-progress-line" aria-hidden="true" />
      <a className="section-progress-scroll" href="#operations-view">
        <span>{copy.progress.scroll}</span>
        <i aria-hidden="true" />
      </a>
    </aside>
  );
};

export default SectionProgressRail;
