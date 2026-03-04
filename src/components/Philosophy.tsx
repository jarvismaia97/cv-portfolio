import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Philosophy = () => {
  const { content } = useLanguage();
  const philosophy = content.philosophy as {
    quoteStart: string;
    quoteHighlight: string;
    quoteEnd: string;
    attribution: string;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden section-bg">
      <div className="max-w-4xl mx-auto">
        <div className="reveal philosophy-quote font-display text-3xl md:text-4xl lg:text-5xl font-normal italic leading-relaxed tracking-tight">
          &quot;{philosophy.quoteStart}
          <span className="gradient-text">{philosophy.quoteHighlight}</span>
          {philosophy.quoteEnd}&quot;
        </div>
        
        <div className="reveal quote-attribution font-mono text-xs uppercase tracking-wider text-text-dim mt-8">
          {philosophy.attribution}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;