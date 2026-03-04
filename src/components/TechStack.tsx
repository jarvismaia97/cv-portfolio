import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const TechStack = () => {
  const { content } = useLanguage();
  const stack = content.stack as {
    sectionTag: string;
    sectionTitle: string;
    categories: { category: string; items: { name: string; width: string }[] }[];
  };
  const techStacks = stack.categories;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const bars = entry.target.querySelectorAll('.stack-bar-fill');
            bars.forEach((bar: Element) => {
              const el = bar as HTMLElement;
              setTimeout(() => {
                el.style.width = el.dataset.width ?? '0';
              }, 200);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    const cells = document.querySelectorAll('.stack-cell');
    cells.forEach((cell) => observer.observe(cell));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" className="py-32 border-t border-b border-border overflow-hidden section-bg">
      {/* Section header */}
      <div className="text-center mb-20 px-6 md:px-12">
        <div className="section-tag mb-4 reveal">{stack.sectionTag}</div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight reveal">
          {stack.sectionTitle}
        </h2>
      </div>

      {/* Stack grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {techStacks.map((stackGroup, index) => (
          <div
            key={index}
            className="stack-cell bg-bg-elevated p-8 md:p-10"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-accent mb-5">
              {stackGroup.category}
            </div>
            
            <div className="space-y-3">
              {stackGroup.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-text font-normal">
                    {item.name}
                  </span>
                  
                  <div className="stack-bar-track">
                    <div 
                      className="stack-bar-fill"
                      data-width={item.width}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;