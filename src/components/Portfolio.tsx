import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Project {
  type: string;
  name: string;
  description: string;
  url: string;
  metrics: { label: string; value: string }[];
}

const Portfolio = () => {
  const { content } = useLanguage();
  const { sectionTag, sectionTitle, viewProject, projects } = content.keyProjects as {
    sectionTag: string;
    sectionTitle: string;
    viewProject: string;
    projects: Project[];
  };

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

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-32 px-6 md:px-12 section-bg">
      {/* Section header */}
      <div className="text-center mb-20">
        <div className="section-tag mb-4 reveal">{sectionTag}</div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight reveal">
          {sectionTitle}
        </h2>
      </div>

      {/* Projects grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card p-8 md:p-10 cursor-pointer group"
            onClick={() =>
              project.url !== '#' && window.open(project.url, '_blank')
            }
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
              <div className="mt-6 font-mono text-xs uppercase tracking-wide text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {viewProject}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
