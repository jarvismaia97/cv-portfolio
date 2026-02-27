import { lazy, Suspense, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface Props {
  onLoad?: () => void;
}

const SplineBackground = ({ onLoad }: Props) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = innerRef.current;
        if (!el) return;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        const progress = window.scrollY / maxScroll;
        const scale = 1 + progress * 1.5;
        const opacity = 1 - progress * 0.3;
        el.style.transform = `scale(${scale})`;
        el.style.opacity = String(opacity);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
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
