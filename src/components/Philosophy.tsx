import { useEffect } from 'react';

const Philosophy = () => {
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

    const elements = document.querySelectorAll('.philosophy-quote, .quote-attribution');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden section-bg">
      <div className="max-w-4xl mx-auto">
        <div className="philosophy-quote font-display text-3xl md:text-4xl lg:text-5xl 
                        font-normal italic leading-relaxed tracking-tight 
                        opacity-0 transform translate-y-8">
          "The best solutions come from understanding that{' '}
          <span className="gradient-text">efficiency is intelligent laziness</span>
          —finding the smartest way to solve tomorrow's problems today."
        </div>
        
        <div className="quote-attribution font-mono text-xs uppercase tracking-wider 
                        text-text-dim mt-8 opacity-0 transform translate-y-4">
          — Engineering Philosophy
        </div>
      </div>
    </section>
  );
};

export default Philosophy;