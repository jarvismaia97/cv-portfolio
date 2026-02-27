import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface Props {
  onLoad?: () => void;
}

const SplineBackground = ({ onLoad }: Props) => {
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

  const scale = 1 + scrollProgress * 1.5;
  const opacity = 1 - scrollProgress * 0.3;

  return (
    <div
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
        }}
      >
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/oDXvwqdleYbMiG8I/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
            onLoad={() => onLoad?.()}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SplineBackground;
