import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLogoClicks } from '../hooks/useEasterEggs';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { matrixMode, handleClick: handleLogoClick } = useLogoClicks();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-400
      px-6 md:px-12 py-6 flex justify-between items-center
      ${isScrolled ? 'nav-scrolled' : ''}
    `}>
      <div 
        className="font-display text-xl cursor-pointer nav-logo"
        onClick={() => { handleLogoClick(); scrollToSection('hero'); }}
      >
        L<span className="text-accent">.</span>
        M<span className="text-accent">.</span>
      </div>

      {matrixMode && (
        <div className="fixed inset-0 pointer-events-none z-[99989]"
          style={{ background: 'rgba(0,229,160,0.03)', mixBlendMode: 'screen' }}>
          <div className="matrix-rain" />
        </div>
      )}
      
      <ul className="hidden md:flex gap-8 list-none">
        {[
          { label: 'Skills', id: 'skills' },
          { label: 'Experience', id: 'experience' },
          { label: 'Stack', id: 'stack' },
          { label: 'Projects', id: 'projects' },
          { label: 'Contact', id: 'contact' }
        ].map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className="font-mono text-xs uppercase tracking-wider text-text-dim 
                       hover:text-accent transition-colors duration-300"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
        className="font-mono text-xs uppercase tracking-wider text-text-dim 
                   hover:text-accent transition-colors duration-300
                   border border-border px-3 py-2 rounded-sm
                   hover:border-accent"
      >
        {language.toUpperCase()}
      </button>
    </nav>
  );
};

export default Navbar;