import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current!;
    const circle = circleRef.current!;
    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, .project-card, .contact-link, [role="button"]')) {
        setHovering(true);
      }
    };

    const onOut = () => setHovering(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    let raf: number;
    const animate = () => {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      circle.style.transform = `translate(${circleX - 20}px, ${circleY - 20}px) scale(${hovering ? 1.5 : 1})`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, [visible, hovering]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 8, height: 8,
          borderRadius: '50%', background: '#00e5a0', pointerEvents: 'none',
          zIndex: 99999, opacity: visible ? 1 : 0, transition: 'opacity 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={circleRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 40, height: 40,
          borderRadius: '50%', border: '1px solid rgba(0,229,160,0.4)',
          pointerEvents: 'none', zIndex: 99998,
          opacity: visible ? 1 : 0, transition: 'opacity 0.3s',
        }}
      />
    </>
  );
};

export default CustomCursor;
