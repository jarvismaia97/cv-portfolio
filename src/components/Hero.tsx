import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { content } = useLanguage();
  const [animatedStats, setAnimatedStats] = useState({
    processes: 0,
    projects: 0,
    hoursSupport: 0,
    hoursCoding: 0
  });

  // Target stats from Luís's achievements
  const targetStats = {
    processes: 132,
    projects: 28,
    hoursSupport: 8980,
    hoursCoding: 3920
  };

  const titles = [
    "Tech Lead",
    "Full-Stack Developer", 
    "Builder",
    "Problem Solver"
  ];

  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    // Animate numbers on load
    const timer = setTimeout(() => {
      animateCounters();
    }, 1500);

    // Cycle through titles
    const titleInterval = setInterval(() => {
      setCurrentTitle(prev => (prev + 1) % titles.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(titleInterval);
    };
  }, []);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedStats({
        processes: Math.round(targetStats.processes * progress),
        projects: Math.round(targetStats.projects * progress),
        hoursSupport: Math.round(targetStats.hoursSupport * progress),
        hoursCoding: Math.round(targetStats.hoursCoding * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats); // Ensure exact final values
      }
    }, increment);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 70%)'
        }}
      />
      
      {/* Hero glow */}
      <div 
        className="absolute w-96 md:w-[600px] h-96 md:h-[600px] rounded-full pointer-events-none 
                   top-[10%] left-[-10%] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-4xl">
        {/* Eyebrow text */}
        <div className="flex items-center gap-4 mb-6 animate-fade-up animate-fade-up-delay-1">
          <div className="w-10 h-px bg-accent"></div>
          <span className="font-mono text-xs uppercase tracking-wide text-accent">
            {titles[currentTitle]}
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal leading-tight 
                       tracking-tight mb-6 animate-fade-up animate-fade-up-delay-2">
          Luís<br />
          Maia<em className="gradient-text">.</em>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-dim max-w-2xl leading-relaxed mb-12 
                      animate-fade-up animate-fade-up-delay-3">
          {content.about.aboutText1}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 md:gap-12 mb-12 animate-fade-up animate-fade-up-delay-4">
          <div className="flex flex-col">
            <div className="font-display text-3xl md:text-4xl font-bold text-text">
              {animatedStats.processes}<span className="text-accent">+</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-wide text-text-dim mt-1">
              {content.about.counts.countProcess}
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="font-display text-3xl md:text-4xl font-bold text-text">
              {animatedStats.projects}<span className="text-accent">+</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-wide text-text-dim mt-1">
              {content.about.counts.countProjects}
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="font-display text-3xl md:text-4xl font-bold text-text">
              {animatedStats.hoursSupport.toLocaleString()}<span className="text-accent">h</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-wide text-text-dim mt-1">
              {content.about.counts.countHoursSupport}
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="font-display text-3xl md:text-4xl font-bold text-text">
              {animatedStats.hoursCoding.toLocaleString()}<span className="text-accent">h</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-wide text-text-dim mt-1">
              {content.about.counts.countHoursCoding}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-12 animate-fade-up animate-fade-up-delay-5">
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
          >
            Get in touch
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="btn-ghost"
          >
            View experience
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator animate-fade-up-delay-6">
        <span className="font-mono text-xs uppercase tracking-wider text-text-dim mb-2">
          Explore
        </span>
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
};

export default Hero;