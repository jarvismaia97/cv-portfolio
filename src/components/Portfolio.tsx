import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Portfolio = () => {
  const { content } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Luís's key projects from JSON data
  const projects = [
    {
      type: 'Full-Stack Development',
      name: content.portfolio.portfolio1.portfolio1Title,
      description: content.portfolio.portfolio1.portfolio1Desc1,
      url: content.portfolio.portfolio1.portfolio1ProjectUrlValue,
      metrics: [
        { label: 'Impact', value: 'High' },
        { label: 'Tech', value: 'React' },
        { label: 'Year', value: '2021' }
      ]
    },
    {
      type: 'Website Development',
      name: content.portfolio.portfolio3.portfolio3Title,
      description: content.portfolio.portfolio3.portfolio3Desc1,
      url: content.portfolio.portfolio3.portfolio3ProjectUrlValue,
      metrics: [
        { label: 'Views', value: '2K+' },
        { label: 'Tech', value: 'HTML/CSS' },
        { label: 'Status', value: 'Live' }
      ]
    },
    {
      type: 'Tool Development',
      name: content.portfolio.portfolio4.portfolio4Title,
      description: content.portfolio.portfolio4.portfolio4Desc1,
      url: content.portfolio.portfolio4.portfolio4ProjectUrlValue,
      metrics: [
        { label: 'AI', value: 'Powered' },
        { label: 'Stage', value: 'Beta' },
        { label: 'Users', value: 'Global' }
      ]
    },
    {
      type: 'Backend Service',
      name: content.portfolio.portfolio5.portfolio5Title,
      description: content.portfolio.portfolio5.portfolio5Desc1,
      url: content.portfolio.portfolio5.portfolio5ProjectUrlValue,
      metrics: [
        { label: 'Tech', value: 'Node.js' },
        { label: 'Deploy', value: 'Heroku' },
        { label: 'Status', value: 'Active' }
      ]
    },
    {
      type: 'Robotics',
      name: content.portfolio.portfolio7.portfolio7Title,
      description: content.portfolio.portfolio7.portfolio7Desc1,
      url: content.portfolio.portfolio7.portfolio7ProjectUrlValue,
      metrics: [
        { label: 'Award', value: 'Winner' },
        { label: 'Tech', value: 'Arduino' },
        { label: 'Event', value: 'National' }
      ]
    },
    {
      type: 'Hardware Project',
      name: content.portfolio.portfolio8.portfolio8Title,
      description: content.portfolio.portfolio8.portfolio8Desc1,
      url: '#',
      metrics: [
        { label: 'Design', value: 'OpenSCAD' },
        { label: 'Build', value: 'Custom' },
        { label: 'Type', value: 'Furniture' }
      ]
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 md:px-12 section-bg">
      {/* Section header */}
      <div className="text-center mb-20">
        <div className="section-tag mb-4 reveal">Selected Work</div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight reveal">
          Key Projects
        </h2>
      </div>

      {/* Projects grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card p-8 md:p-10 cursor-pointer group"
            onClick={() => project.url !== '#' && window.open(project.url, '_blank')}
          >
            <div className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
              {project.type}
            </div>
            
            <div className="font-display text-xl md:text-2xl font-normal tracking-tight mb-3">
              {project.name}
            </div>
            
            <div className="text-sm md:text-base text-text-dim leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </div>
            
            <div className="flex gap-6">
              {project.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="flex flex-col">
                  <div className="font-display text-lg md:text-xl font-bold text-accent">
                    {metric.value}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wide text-text-dim">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {project.url !== '#' && (
              <div className="mt-6 font-mono text-xs uppercase tracking-wide text-accent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Project →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;