import { useEffect } from 'react';

const TechStack = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars
            const bars = entry.target.querySelectorAll('.stack-bar-fill');
            bars.forEach((bar: any) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.width;
              }, 200);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    const cells = document.querySelectorAll('.stack-cell');
    cells.forEach((cell) => observer.observe(cell));

    return () => observer.disconnect();
  }, []);

  const techStacks = [
    {
      category: 'Languages',
      items: [
        { name: 'TypeScript', width: '95%' },
        { name: 'JavaScript', width: '90%' },
        { name: 'PHP', width: '75%' },
        { name: 'SQL', width: '80%' }
      ]
    },
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', width: '92%' },
        { name: 'React', width: '88%' },
        { name: 'HTML/CSS', width: '95%' },
        { name: 'Responsive Design', width: '90%' }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', width: '85%' },
        { name: 'PHP MVC', width: '78%' },
        { name: 'REST APIs', width: '90%' },
        { name: 'Database Design', width: '82%' }
      ]
    },
    {
      category: 'Infrastructure',
      items: [
        { name: 'Docker', width: '75%' },
        { name: 'Azure', width: '70%' },
        { name: 'Git/Version Control', width: '95%' },
        { name: 'CI/CD', width: '65%' }
      ]
    },
    {
      category: 'Tools',
      items: [
        { name: 'SharePoint', width: '85%' },
        { name: 'Visual Studio', width: '90%' },
        { name: 'Postman', width: '88%' },
        { name: 'Browser Dev Tools', width: '95%' }
      ]
    },
    {
      category: 'Soft Skills',
      items: [
        { name: 'Problem Solving', width: '95%' },
        { name: 'Communication', width: '90%' },
        { name: 'Team Leadership', width: '85%' },
        { name: 'Process Analysis', width: '92%' }
      ]
    }
  ];

  return (
    <section id="stack" className="py-32 bg-bg-elevated border-t border-b border-border overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-20 px-6 md:px-12">
        <div className="section-tag mb-4 reveal">Technical Proficiency</div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight reveal">
          Tech Stack
        </h2>
      </div>

      {/* Stack grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {techStacks.map((stack, index) => (
          <div
            key={index}
            className="stack-cell bg-bg-elevated p-8 md:p-10"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-accent mb-5">
              {stack.category}
            </div>
            
            <div className="space-y-3">
              {stack.items.map((item, itemIndex) => (
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