import { useEffect, useRef, useCallback } from 'react';

interface Skill {
  name: string;
  size: number;
  angle: number;
  color: string;
}

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
  { name: 'Analysis', size: 0.9, angle: 3.75, color: '#666' },
  { name: 'Automation', size: 0.85, angle: 4.75, color: '#42b883' },
  { name: 'Innovation', size: 1.0, angle: 5.75, color: '#ffd060' },
];

const SkillsConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  const renderFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, progress: number) => {
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;
    
    const cx = w / 2;
    const cy = h / 2;
    const maxDist = Math.min(w, h) * 0.35;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#060608';
    ctx.fillRect(0, 0, w, h);

    const glowSize = 100 + progress * 200;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
    glow.addColorStop(0, `rgba(0, 229, 160, ${0.06 - progress * 0.03})`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    const ease = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Connection lines
    ctx.save();
    ctx.globalAlpha = 0.06 + ease * 0.08;
    ctx.strokeStyle = 'rgba(0, 229, 160, 0.5)';
    ctx.lineWidth = 0.5;
    const positions: { x: number; y: number }[] = [];

    skills.forEach((skill, i) => {
      const d = ease * maxDist * (0.5 + skill.size * 0.5);
      const angle = skill.angle + ease * 0.3;
      const x = cx + Math.cos(angle) * d;
      const y = cy + Math.sin(angle) * d;
      positions.push({ x, y });

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();

      if (i > 0) {
        ctx.beginPath();
        ctx.moveTo(positions[i - 1].x, positions[i - 1].y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });
    ctx.restore();

    // Skill nodes
    skills.forEach((skill, i) => {
      const { x, y } = positions[i];
      const r = 4 + skill.size * 16;

      const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      nodeGlow.addColorStop(0, skill.color + '30');
      nodeGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = nodeGlow;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = skill.color;
      ctx.globalAlpha = 0.15 + ease * 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = skill.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (ease > 0.2) {
        ctx.globalAlpha = Math.min(1, (ease - 0.2) * 2);
        ctx.fillStyle = '#e8e4dc';
        ctx.font = `${Math.round(10 + skill.size * 3)}px 'IBM Plex Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, x, y + r + 18);
        ctx.globalAlpha = 1;
      }
    });

    // Central label
    ctx.globalAlpha = 1 - ease * 0.7;
    ctx.fillStyle = '#e8e4dc';
    ctx.font = "14px 'IBM Plex Mono', monospace";
    ctx.textAlign = 'center';
    ctx.fillText('CORE SKILLS', cx, cy - 10);
    ctx.font = "italic 28px 'Playfair Display', serif";
    ctx.fillText('Luís Maia', cx, cy + 25);
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    const section = sectionRef.current;
    if (!canvas || !sticky || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = sticky.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
      // Store logical size for rendering
      (canvas as any)._logicalW = rect.width;
      (canvas as any)._logicalH = rect.height;
      renderFrame(canvas, ctx, progressRef.current);
    };

    const onScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -sectionRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

      if (Math.abs(progress - progressRef.current) > 0.001) {
        progressRef.current = progress;
        
        // Reset transform for DPR scaling before each render
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        renderFrame(canvas, ctx, progress);
        
        if (progressTextRef.current) {
          progressTextRef.current.textContent = String(Math.round(progress * 100));
        }
      }
    };

    resize();
    onScroll();

    window.addEventListener('resize', resize);
    
    // Use rAF-throttled scroll handler for smooth canvas updates
    const scrollHandler = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onScroll);
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scrollHandler);
      cancelAnimationFrame(rafRef.current);
    };
  }, [renderFrame]);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative"
      style={{ height: '350vh' }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} />
        
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-12">
          <div className="absolute top-8 left-6 md:left-12">
            <div className="section-tag mb-2">Core Competencies</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight">
              Skill Constellation
            </h2>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 md:right-12 font-mono text-sm" style={{ color: '#6b6872' }}>
          Scroll <span ref={progressTextRef} className="text-base" style={{ color: '#00e5a0' }}>0</span>%
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;