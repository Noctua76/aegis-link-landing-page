const nightStops = ['23:00', '01:30', '03:58', '04:00', '04:01', '07:00'];

type NightTimelineProps = {
  active: string;
  label: string;
};

const NightTimeline = ({ active, label }: NightTimelineProps) => {
  const activeIndex = nightStops.indexOf(active);

  return (
    <div className="night-timeline" aria-label={label}>
      <div className="night-timeline-track" aria-hidden="true" />
      {nightStops.map((stop, index) => (
        <div
          key={stop}
          className={`night-timeline-stop ${index < activeIndex ? 'is-past' : ''} ${index === activeIndex ? 'is-active' : ''}`}
        >
          <span aria-hidden="true" />
          <time>{stop}</time>
        </div>
      ))}
    </div>
  );
};

export default NightTimeline;
