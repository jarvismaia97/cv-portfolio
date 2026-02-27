import { useEffect, useState, useRef } from 'react';

interface Props {
  onComplete: () => void;
  splineReady: boolean;
}

const Loader = ({ onComplete, splineReady }: Props) => {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    // Fake progress up to 90% quickly, then wait for spline
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90 && !splineReady) {
          // Hold at ~90% until spline loads
          return Math.min(prev + 0.3, 95);
        }
        const increment = Math.random() * 10 + 3;
        return Math.min(prev + increment, splineReady ? 100 : 90);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [splineReady]);

  useEffect(() => {
    // When spline is ready, rush to 100%
    if (splineReady && progress < 100) {
      setProgress(100);
    }
  }, [splineReady, progress]);

  useEffect(() => {
    if (progress >= 100 && !completed.current) {
      completed.current = true;
      setTimeout(() => setHiding(true), 200);
      setTimeout(() => onComplete(), 900);
    }
  }, [progress, onComplete]);

  return (
    <div className={`loader ${hiding ? 'hidden' : ''}`}>
      <div className="loader-name">Luís Maia</div>
      <div className="loader-title">Loading experience</div>
      <div className="loader-bar">
        <div
          className="loader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Loader;
