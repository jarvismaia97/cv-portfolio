import { useEffect, useRef } from 'react';

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
  { name: 'Problem Solving', size: 0.85, angle: 1.75, color: '#ff6b6b' },
  { name: 'Communication', size: 0.8, angle: 2.75, color: '#dc382d' },
  { name: 'Analysis', size: 0.9, angle: 3.75, color: '#666' },
  { name: 'Automation', size: 0.85, angle: 4.75, color: '#42b883' },
  { name: 'Innovation', size: 1.0, angle: 5.75, color: '#ffd060' },
];

function renderCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  progress: number
) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  if (w === 0 || h === 0) return;

  const cx = w / 2;
  const cy = h / 2;
  const maxDist = Math.min(w, h) * 0.35;

  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Background
  ctx.fillStyle = '#060608';
  ctx.fillRect(0, 0, w, h);

  // Central glow
  const glowSize = 100 + progress * 200;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
  glow.addColorStop(0, `rgba(0, 229, 160, ${0.06 - progress * 0.03})`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Ease
  const ease = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  // Compute positions
  const positions = skills.map((skill) => {
    const d = ease * maxDist * (0.5 + skill.size * 0.5);
    const angle = skill.angle + ease * 0.3;
    return {
      x: cx + Math.cos(angle) * d,
      y: cy + Math.sin(angle) * d,
    };
  });

  // Connection lines
  ctx.globalAlpha = 0.06 + ease * 0.08;
  ctx.strokeStyle = 'rgba(0, 229, 160, 0.5)';
  ctx.lineWidth = 0.5;
  positions.forEach((pos, i) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(positions[i - 1].x, positions[i - 1].y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  });

  // Nodes
  ctx.globalAlpha = 1;
  skills.forEach((skill, i) => {
    const { x, y } = positions[i];
    const r = 4 + skill.size * 16;

    // Glow
    const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
    nodeGlow.addColorStop(0, skill.color + '30');
    nodeGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = nodeGlow;
    ctx.beginPath();
    ctx.arc(x, y, r * 3, 0, Math.PI * 2);
    ctx.fill();

    // Circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = skill.color;
    ctx.globalAlpha = 0.15 + ease * 0.85;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = skill.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label
    if (ease > 0.2) {
      ctx.globalAlpha = Math.min(1, (ease - 0.2) * 2);
      ctx.fillStyle = '#e8e4dc';
      ctx.font = `${Math.round(10 + skill.size * 3)}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(skill.name, x, y + r + 18);
      ctx.globalAlpha = 1;
    }
  });

  // Central label
  ctx.globalAlpha = 1 - ease * 0.7;
  ctx.fillStyle = '#e8e4dc';
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CORE SKILLS', cx, cy - 10);
  ctx.font = 'italic 28px serif';
  ctx.fillText('Luís Maia', cx, cy + 25);
  ctx.globalAlpha = 1;

  ctx.restore();
}

const SkillsConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    const section = sectionRef.current;
    if (!canvas || !sticky || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = sticky.clientWidth;
      const h = sticky.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      renderCanvas(canvas, ctx, progressRef.current);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      if (Math.abs(progress - progressRef.current) > 0.002) {
        progressRef.current = progress;
        renderCanvas(canvas, ctx, progress);
        if (progressTextRef.current) {
          progressTextRef.current.textContent = String(Math.round(progress * 100));
        }
      }
    };

    resize();
    onScroll();

    window.addEventListener('resize', resize);
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
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ height: '350vh', position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />

        <div style={{ position: 'absolute', top: '2rem', left: '1.5rem', pointerEvents: 'none' }}>
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Core Competencies</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400 }}>
            Skill Constellation
          </h2>
        </div>

        <div style={{ position: 'absolute', bottom: '2rem', right: '1.5rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#6b6872' }}>
          Scroll <span ref={progressTextRef} style={{ color: '#00e5a0', fontSize: '1rem' }}>0</span>%
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
