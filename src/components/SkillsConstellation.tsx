import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  size: number;
  angle: number;
  color: string;
  category: 'tech' | 'soft';
}

const skills: Skill[] = [
  { name: 'TypeScript', size: 1.3, angle: 0, color: '#3178c6', category: 'tech' },
  { name: 'Angular', size: 1.2, angle: 0.5, color: '#dd0031', category: 'tech' },
  { name: 'Node.js', size: 1.15, angle: 1.0, color: '#68a063', category: 'tech' },
  { name: 'React', size: 1.25, angle: 1.5, color: '#61dafb', category: 'tech' },
  { name: 'SQL', size: 1.0, angle: 2.0, color: '#336791', category: 'tech' },
  { name: 'Docker', size: 1.1, angle: 2.5, color: '#2496ed', category: 'tech' },
  { name: 'PHP', size: 0.9, angle: 3.0, color: '#777bb4', category: 'tech' },
  { name: 'JavaScript', size: 1.05, angle: 3.5, color: '#f7df1e', category: 'tech' },
  { name: 'CSS/HTML', size: 1.0, angle: 4.0, color: '#e44d26', category: 'tech' },
  { name: 'Git', size: 0.95, angle: 4.5, color: '#f05032', category: 'tech' },
  { name: 'SharePoint', size: 0.85, angle: 5.0, color: '#0078d4', category: 'tech' },
  { name: 'Azure', size: 0.8, angle: 5.5, color: '#0078d4', category: 'tech' },
  { name: 'Leadership', size: 1.2, angle: 0.25, color: '#00e5a0', category: 'soft' },
  { name: 'Problem Solving', size: 0.85, angle: 1.75, color: '#ff6b6b', category: 'soft' },
  { name: 'Communication', size: 0.8, angle: 2.75, color: '#dc382d', category: 'soft' },
  { name: 'Analysis', size: 0.9, angle: 3.75, color: '#666666', category: 'soft' },
  { name: 'Automation', size: 0.85, angle: 4.75, color: '#42b883', category: 'soft' },
  { name: 'Innovation', size: 1.0, angle: 5.75, color: '#ffd060', category: 'soft' },
];

// Safely append alpha hex to a color (handles 3-digit hex)
function colorWithAlpha(hex: string, alpha: string): string {
  // Expand 3-digit hex to 6-digit
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex + alpha;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  progress: number,
  time: number
) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  if (w === 0 || h === 0) return;

  const cx = w / 2;
  const cy = h / 2;
  const maxDist = Math.min(w, h) * 0.38;

  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Clear
  ctx.fillStyle = '#060608';
  ctx.fillRect(0, 0, w, h);

  // Central glow — always visible, pulses gently
  const pulse = Math.sin(time * 0.001) * 0.01;
  const glowSize = 120 + progress * 180;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
  glow.addColorStop(0, `rgba(0, 229, 160, ${0.08 + pulse})`);
  glow.addColorStop(0.5, `rgba(0, 229, 160, ${0.02 + pulse})`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Spread: start at 0.6 (already visible) → 1.0 fully expanded
  const ease = easeInOutCubic(progress);
  const spread = 0.6 + ease * 0.4;

  // Compute positions — always spread out from center
  const positions = skills.map((skill) => {
    const d = spread * maxDist * (0.5 + skill.size * 0.5);
    // Slow orbit animation + scroll rotation
    const orbit = time * 0.00004 * (skill.category === 'soft' ? -1 : 1);
    const angle = skill.angle + orbit + ease * Math.PI * 0.4;
    return {
      x: cx + Math.cos(angle) * d,
      y: cy + Math.sin(angle) * d,
    };
  });

  // Connection lines — from center and between neighbors
  ctx.strokeStyle = 'rgba(0, 229, 160, 0.3)';
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.12 + ease * 0.1;
  positions.forEach((pos, i) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    // Connect to next neighbor (circular)
    const next = positions[(i + 1) % positions.length];
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
  });

  // Nodes
  ctx.globalAlpha = 1;
  skills.forEach((skill, i) => {
    const { x, y } = positions[i];
    const r = 3 + skill.size * 14;

    // Node glow
    const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
    nodeGlow.addColorStop(0, colorWithAlpha(skill.color, '25'));
    nodeGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = nodeGlow;
    ctx.beginPath();
    ctx.arc(x, y, r * 3, 0, Math.PI * 2);
    ctx.fill();

    // Circle fill
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = skill.color;
    ctx.globalAlpha = 0.7 + ease * 0.3;
    ctx.fill();

    // Circle stroke
    ctx.globalAlpha = 0.8 + ease * 0.2;
    ctx.strokeStyle = skill.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label — always visible
    ctx.globalAlpha = 0.6 + ease * 0.4;
    ctx.fillStyle = '#e8e4dc';
    ctx.font = `${Math.round(9 + skill.size * 3)}px 'IBM Plex Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(skill.name, x, y + r + 16);
    ctx.globalAlpha = 1;
  });

  // Central text — fades as constellation expands
  const centerAlpha = Math.max(0, 1 - ease * 1.5);
  if (centerAlpha > 0.01) {
    ctx.globalAlpha = centerAlpha;
    ctx.fillStyle = '#6b6872';
    ctx.font = "11px 'IBM Plex Mono', monospace";
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.2em';
    ctx.fillText('CORE SKILLS', cx, cy - 8);
    ctx.fillStyle = '#e8e4dc';
    ctx.font = "italic 24px 'Playfair Display', serif";
    ctx.fillText('Luís Maia', cx, cy + 22);
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

const SkillsConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    const section = sectionRef.current;
    if (!canvas || !sticky || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastW = 0, lastH = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = sticky.clientWidth;
      const h = sticky.clientHeight;
      if (w === 0 || h === 0) return;
      if (w !== lastW || h !== lastH) {
        lastW = w;
        lastH = h;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      // Use only the first 100vh of scroll within the section for the animation
      // so the expansion happens while the constellation is still fully visible
      const scrollIntoSection = -rect.top;
      // Animate over the scrollable portion of the section (total height - viewport)
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrollIntoSection / scrollable));
      progressRef.current = progress;
      if (progressTextRef.current) {
        progressTextRef.current.textContent = String(Math.round(progress * 100));
      }
    };

    // Animation loop — always running for gentle orbit effect
    let running = true;
    const animate = (time: number) => {
      if (!running) return;
      resize();
      renderCanvas(canvas, ctx, progressRef.current, time);
      animRef.current = requestAnimationFrame(animate);
    };

    onScroll();
    animRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    const scrollHandler = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onScroll);
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scrollHandler);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ height: '120vh', position: 'relative' }}
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

        <div style={{ position: 'absolute', bottom: '2rem', right: '1.5rem', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#6b6872' }}>
          Scroll <span ref={progressTextRef} style={{ color: '#00e5a0', fontSize: '1rem' }}>0</span>%
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
