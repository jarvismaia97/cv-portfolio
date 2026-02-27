import { useEffect, useRef } from 'react';

const FIREFLY_COUNT = 30;

const Fireflies = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create fireflies with random properties
    const fireflies = Array.from({ length: FIREFLY_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random(),
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
      // Warm colors: gold, orange, amber
      hue: 30 + Math.random() * 30, // 30-60 range
      saturation: 80 + Math.random() * 20,
      lightness: 55 + Math.random() * 15,
    }));

    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const f of fireflies) {
        // Drift movement
        f.x += f.speedX + Math.sin(time * 0.01 + f.pulseOffset) * 0.15;
        f.y += f.speedY + Math.cos(time * 0.008 + f.pulseOffset) * 0.1;

        // Wrap around
        if (f.x < -10) f.x = canvas.width + 10;
        if (f.x > canvas.width + 10) f.x = -10;
        if (f.y < -10) f.y = canvas.height + 10;
        if (f.y > canvas.height + 10) f.y = -10;

        // Pulse opacity
        f.opacity = 0.3 + Math.sin(time * f.pulseSpeed + f.pulseOffset) * 0.5 + 0.2;
        const alpha = Math.max(0, Math.min(1, f.opacity));

        // Glow effect
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 6);
        gradient.addColorStop(0, `hsla(${f.hue}, ${f.saturation}%, ${f.lightness}%, ${alpha})`);
        gradient.addColorStop(0.3, `hsla(${f.hue}, ${f.saturation}%, ${f.lightness}%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${f.hue}, ${f.saturation}%, ${f.lightness}%, 0)`);

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${f.hue}, 100%, 85%, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Fireflies;
