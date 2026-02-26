import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  size: number;
  angle: number;
  color: string;
}

const SkillsConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Luís's actual skills from the JSON data
  const skills: Skill[] = [
    { name: 'TypeScript', size: 1.3, angle: 0, color: '#3178c6' },
    { name: 'Angular', size: 1.2, angle: 0.5, color: '#dd0031' },
    { name: 'Node.js', size: 1.15, angle: 1.0, color: '#68a063' },
    { name: 'React', size: 1.25, angle: 1.5, color: '#61dafb' },
    { name: 'SQL', size: 1.0, angle: 2.0, color: '#336791' },
    { name: 'Docker', size: 1.1, angle: 2.5, color: '#2496ed' },
    { name: 'PHP', size: 0.9, angle: 3.0, color: '#777bb4' },
    { name: 'JavaScript', size: 1.05, angle: 3.5, color: '#f7df1e' },
    { name: 'CSS/HTML', size: 1.0, angle: 4.0, color: '#e44d26' },
    { name: 'Git', size: 0.95, angle: 4.5, color: '#f05032' },
    { name: 'SharePoint', size: 0.85, angle: 5.0, color: '#0078d4' },
    { name: 'Azure', size: 0.8, angle: 5.5, color: '#0078d4' },
    { name: 'Leadership', size: 1.2, angle: 0.25, color: '#00e5a0' },
    { name: 'Problem Solving', size: 0.85, angle: 1.75, color: '#e44d26' },
    { name: 'Communication', size: 0.8, angle: 2.75, color: '#dc382d' },
    { name: 'Analysis', size: 0.9, angle: 3.75, color: '#231f20' },
    { name: 'Automation', size: 0.85, angle: 4.75, color: '#42b883' },
    { name: 'Innovation', size: 1.0, angle: 5.75, color: '#ffd060' },
  ];

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return;
      
      canvasRef.current.width = containerRef.current.offsetWidth;
      canvasRef.current.height = containerRef.current.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / containerHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.min(w, h) * 0.35;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, w, h);

      // Central glow that dims as skills expand
      const glowSize = 100 + scrollProgress * 200;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
      glow.addColorStop(0, `rgba(0, 229, 160, ${0.06 - scrollProgress * 0.03})`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Easing function for smooth animation
      const ease = scrollProgress < 0.5 
        ? 2 * scrollProgress * scrollProgress 
        : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;

      // Draw connection lines between skills
      ctx.save();
      ctx.globalAlpha = 0.06 + ease * 0.08;
      ctx.strokeStyle = 'rgba(0, 229, 160, 0.5)';
      ctx.lineWidth = 0.5;
      
      skills.forEach((skill, i) => {
        const d = ease * maxDist * (0.5 + skill.size * 0.5);
        const angle = skill.angle + ease * 0.3;
        const x = cx + Math.cos(angle) * d;
        const y = cy + Math.sin(angle) * d;

        // Connect to center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Connect to neighbors
        if (i < skills.length - 1) {
          const next = skills[i + 1];
          const nd = ease * maxDist * (0.5 + next.size * 0.5);
          const na = next.angle + ease * 0.3;
          const nx = cx + Math.cos(na) * nd;
          const ny = cy + Math.sin(na) * nd;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        }
      });
      ctx.restore();

      // Draw skill nodes
      skills.forEach((skill) => {
        const d = ease * maxDist * (0.5 + skill.size * 0.5);
        const angle = skill.angle + ease * 0.3;
        const x = cx + Math.cos(angle) * d;
        const y = cy + Math.sin(angle) * d;
        const r = 4 + skill.size * 16;

        // Glow behind node
        const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        nodeGlow.addColorStop(0, skill.color + '30');
        nodeGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.globalAlpha = 0.15 + ease * 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Border
        ctx.strokeStyle = skill.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label (only show when expanded enough)
        if (ease > 0.2) {
          ctx.globalAlpha = Math.min(1, (ease - 0.2) * 2);
          ctx.fillStyle = '#e8e4dc';
          ctx.font = `${Math.round(10 + skill.size * 3)}px 'IBM Plex Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(skill.name, x, y + r + 18);
          ctx.globalAlpha = 1;
        }
      });

      // Central label that fades out
      ctx.globalAlpha = 1 - ease * 0.7;
      ctx.fillStyle = '#e8e4dc';
      ctx.font = `${Math.round(14)}px 'IBM Plex Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.letterSpacing = '3px';
      ctx.fillText('CORE SKILLS', cx, cy - 10);
      ctx.font = `italic ${Math.round(28)}px 'Playfair Display', serif`;
      ctx.fillText('Luís Maia', cx, cy + 25);
      ctx.globalAlpha = 1;
    };

    renderFrame();
  }, [scrollProgress, skills]);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="block w-full h-full"
        />
        
        {/* Overlay content */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-12">
          <div className="absolute top-8 left-6 md:left-12">
            <div className="section-tag mb-2">Core Competencies</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight">
              Skill Constellation
            </h2>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 right-6 md:right-12 font-mono text-sm text-text-dim">
          Scroll <span className="text-accent text-base">{Math.round(scrollProgress * 100)}</span>%
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;