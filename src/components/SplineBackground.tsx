import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/oDXvwqdleYbMiG8I/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
};

export default SplineBackground;
