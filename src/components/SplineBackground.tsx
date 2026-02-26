import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        setScrollProgress(window.scrollY / maxScroll);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Zoom: 1x at top → 2.5x at bottom
  const scale = 1 + scrollProgress * 1.5;
  // Slight opacity fade at the very end
  const opacity = 1 - scrollProgress * 0.3;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          opacity,
          transformOrigin: 'center center',
          willChange: 'transform',
          transition: 'none',
        }}
      >
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/oDXvwqdleYbMiG8I/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SplineBackground;
