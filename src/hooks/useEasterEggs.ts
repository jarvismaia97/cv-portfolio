import { useEffect, useRef, useState } from 'react';

export const useKonamiCode = () => {
  const [triggered, setTriggered] = useState(false);
  const seq = useRef<string[]>([]);
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seq.current.push(e.code);
      seq.current = seq.current.slice(-10);
      if (seq.current.join(',') === code.join(',')) {
        setTriggered(true);
        setTimeout(() => setTriggered(false), 4000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return triggered;
};

export const useLogoClicks = () => {
  const [matrixMode, setMatrixMode] = useState(false);
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleClick = () => {
    clicks.current++;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { clicks.current = 0; }, 2000);
    if (clicks.current >= 5) {
      clicks.current = 0;
      setMatrixMode(true);
      setTimeout(() => setMatrixMode(false), 5000);
    }
  };

  return { matrixMode, handleClick };
};
