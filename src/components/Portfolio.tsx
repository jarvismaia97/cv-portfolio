import { useEffect } from 'react';

interface Project {
  type: string;
  name: string;
  description: string;
  url: string;
  metrics: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    type: 'Word Game',
    name: 'Treta',
    description:
      'A Portuguese Wordle clone built with Expo (React Native + Web). Multiple modes: 4/5/6/7 letters, daily challenge with streak tracking, share results with emoji grid. Live at jogartreta.pt.',
    url: 'https://github.com/jarvismaia97/letreco',
    metrics: [
      { label: 'Tech', value: 'Expo' },
      { label: 'Platform', value: 'Web + Mobile' },
      { label: 'Status', value: 'Live' },
    ],
  },
  {
    type: 'Community Platform',
    name: 'Mustang Clube do Norte',
    description:
      'Official website for the Mustangs Club of Northern Portugal. Built from scratch as co-founder and board member. Event management, member showcase, and club identity.',
    url: 'https://github.com/lmaia-22/mustangclubedonorte',
    metrics: [
      { label: 'Tech', value: 'TypeScript' },
      { label: 'Deploy', value: 'Vercel' },
      { label: 'Status', value: 'Live' },
    ],
  },
  {
    type: 'SaaS Product',
    name: 'Prima Prime',
    description:
      'My next big personal project — a full-stack SaaS application with a modern API architecture. Currently in active development, designing for scale from day one.',
    url: 'https://github.com/lmaia-22/primaprime',
    metrics: [
      { label: 'Stage', value: 'Building' },
      { label: 'Scope', value: 'Full-Stack' },
      { label: 'Vision', value: 'SaaS' },
    ],
  },
  {
    type: 'AI Assistant',
    name: 'Jarvis',
    description:
      'A personal AI assistant powered by OpenClaw with specialized sub-agents (designer, backend, frontend, crypto, QA, devops, research). Features skill-based architecture, ChromaDB long-term memory, and multi-agent orchestration.',
    url: '#',
    metrics: [
      { label: 'Agents', value: '11' },
      { label: 'Memory', value: 'ChromaDB' },
      { label: 'Status', value: 'Active' },
    ],
  },
  {
    type: 'Education',
    name: 'Blog Boa Nova — Teaching Day',
    description:
      'Gave a full-day programming class to 12th-grade students at Escola Boa Nova in Leça. Students built a blog from scratch, learning HTML, CSS, JavaScript, and deployment fundamentals.',
    url: '#',
    metrics: [
      { label: 'Duration', value: 'Full Day' },
      { label: 'Students', value: '12º Ano' },
      { label: 'Impact', value: 'Mentoring' },
    ],
  },
  {
    type: 'Collaboration Tool',
    name: 'Hotaru',
    description:
      'A shared clipboard platform with auth (Magic Link, GitHub, Google), paste expiration, public/private visibility controls, rate limiting, and real-time user search.',
    url: 'https://github.com/lmaia-22/hotaru',
    metrics: [
      { label: 'Tech', value: 'Next.js' },
      { label: 'Auth', value: 'Supabase' },
      { label: 'Cache', value: 'Redis' },
    ],
  },
];

const Portfolio = () => {
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
