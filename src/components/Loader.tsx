import { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
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