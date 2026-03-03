import { useEffect } from 'react';

interface LifeEvent {
  year: string;
  icon: string;
  title: string;
  description: string;
}

const lifeEvents: LifeEvent[] = [
  {
    year: '2019',
    icon: '🏓',
    title: 'Padel',
    description: 'Started playing padel — now a regular on the courts.',
  },
  {
    year: '2022',
    icon: '🏎️',
    title: 'Mustangs Club of Northern Portugal',
    description: 'Co-founded and board member of a Ford Mustang enthusiast club.',
  },
  {
    year: '2025',
    icon: '🍳',
    title: 'Culinary Arts Course',
    description: 'Completed a cooking course — because great code deserves great food.',
  },
  {
    year: '2025',
    icon: '⛳',
    title: 'Golf',
    description: 'Picked up golf — patience on and off the green.',
  },
  {
    year: '2026',
    icon: '🎮',
    title: 'Created Treta',
    description: 'Built and launched a Portuguese word game — jogartreta.pt',
  },
  {
    year: '2026',
    icon: '🎹',
    title: 'Learning Piano',
    description: 'Started learning piano on a Yamaha P-45.',
  },
];

const BeyondCode = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const items = document.querySelectorAll('.life-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="beyond-code" className="py-24 px-6 md:px-12 relative">
      {/* Section header */}
      <div className="text-center mb-16 reveal">
        <div className="section-tag mb-4">Life Path</div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
          Beyond Code
        </h2>
        <p className="text-text-dim text-base md:text-lg mt-4 max-w-xl mx-auto">
          Building things isn't limited to screens.
        </p>
      </div>

      {/* Life events grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lifeEvents.map((event, index) => (
          <div
            key={index}
            className="life-item group relative p-6 rounded-lg border border-border/50 
                       transition-all duration-300 hover:border-accent/30
                       hover:shadow-[0_0_30px_rgba(0,229,160,0.05)]"
            style={{
              background: 'rgba(255,255,255,0.01)',
              transitionDelay: `${index * 80}ms`,
            }}
          >
            {/* Year badge */}
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
              {event.year}
            </div>

            {/* Icon */}
            <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
              {event.icon}
            </div>

            {/* Title */}
            <h3 className="font-display text-lg font-normal tracking-tight mb-2 text-text 
                          transition-colors duration-300 group-hover:text-accent">
              {event.title}
            </h3>

            {/* Description */}
            <p className="font-mono text-xs text-text-dim leading-relaxed">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeyondCode;
