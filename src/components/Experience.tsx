import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const { content } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);

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

    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Luís's actual experience from JSON
  const experienceContent = content.experience as { sectionTag: string; sectionTitle: string; tagSets: string[][] };
  const experiences = [
    {
      date: content.resume.resumeProfItem5.resumeProfItem5Date,
      role: content.resume.resumeProfItem5.resumeProfItem5Title,
      company: content.resume.resumeProfItem5.resumeProfItem5Local,
      description: content.resume.resumeProfItem5.resumeProfItem5Desc.resumeProfItem5Desc1,
      tags: experienceContent.tagSets[0]
    },
    {
      date: content.resume.resumeProfItem4.resumeProfItem4Date,
      role: content.resume.resumeProfItem4.resumeProfItem4Title,
      company: content.resume.resumeProfItem4.resumeProfItem4Local,
      description: content.resume.resumeProfItem4.resumeProfItem4Desc.resumeProfItem4Desc1,
      tags: experienceContent.tagSets[1]
    },
    {
      date: content.resume.resumeProfItem3.resumeProfItem3Date,
      role: content.resume.resumeProfItem3.resumeProfItem3Title,
      company: content.resume.resumeProfItem3.resumeProfItem3Local,
      description: content.resume.resumeProfItem3.resumeProfItem3Desc.resumeProfItem3Desc1,
      tags: experienceContent.tagSets[2]
    },
    {
      date: content.resume.resumeProfItem1.resumeProfItem1Date,
      role: content.resume.resumeProfItem1.resumeProfItem1Title,
      company: content.resume.resumeProfItem1.resumeProfItem1Local,
      description: content.resume.resumeProfItem1.resumeProfItem1Desc.resumeProfItem1Desc1,
      tags: experienceContent.tagSets[3]
    },
    {
      date: content.resume.resumeProfItem2.resumeProfItem2Date,
      role: content.resume.resumeProfItem2.resumeProfItem2Title,
      company: content.resume.resumeProfItem2.resumeProfItem2Local,
      description: content.resume.resumeProfItem2.resumeProfItem2Desc.resumeProfItem2Desc1,
      tags: experienceContent.tagSets[4]
    },
    {
      date: content.resume.resumeEduItem4.resumeEduItem4Date,
      role: content.resume.resumeEduItem4.resumeEduItem4Title,
      company: content.resume.resumeEduItem4.resumeEduItem4Local,
      description: content.resume.resumeEduItem4.resumeEduItem4Desc,
      tags: experienceContent.tagSets[5]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-12 relative section-bg">
      {/* Section header */}
      <div className="text-center mb-20 reveal">
        <div className="section-tag mb-4">{experienceContent.sectionTag}</div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
          {experienceContent.sectionTitle}
        </h2>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item relative pl-12 mb-16">
              <div className="font-mono text-xs uppercase tracking-wide text-accent mb-2">
                {exp.date}
              </div>
              
              <div className="font-display text-2xl md:text-3xl font-normal tracking-tight mb-1">
                {exp.role}
              </div>
              
              <div className="text-base md:text-lg text-text-dim mb-4">
                {exp.company}
              </div>
              
              <div className="text-sm md:text-base text-text-dim leading-relaxed max-w-2xl mb-4">
                {exp.description}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="font-mono text-xs uppercase tracking-wide px-3 py-1 
                             border border-border rounded-sm text-text-dim
                             transition-all duration-300 hover:border-accent/20 hover:text-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;