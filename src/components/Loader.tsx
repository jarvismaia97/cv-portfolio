import { useEffect, useState, useRef } from 'react';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 12 + 5;
        const next = Math.min(prev + increment, 100);
        if (next >= 100 && !completed.current) {
          completed.current = true;
          clearInterval(interval);
          // Start fade-out after bar fills
          setTimeout(() => setHiding(true), 200);
          // Remove loader after fade completes
          setTimeout(() => onComplete(), 900);
        }
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

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
