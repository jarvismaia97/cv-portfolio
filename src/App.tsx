import { useState, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Loader from './components/Loader';
import SplineBackground from './components/SplineBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsConstellation from './components/SkillsConstellation';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Portfolio from './components/Portfolio';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }, []);

  return (
    <LanguageProvider>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      {!loading && <SplineBackground />}
      <div 
        className="min-h-screen" 
        style={{ 
          background: 'transparent', 
          position: 'relative',
          zIndex: 1,
          // Prevent scroll during loader
          overflow: loading ? 'hidden' : undefined,
          height: loading ? '100vh' : undefined,
        }}
      >
        <ScrollProgress />
        <Navbar />
        <Hero />
        <SkillsConstellation />
        <Experience />
        <TechStack />
        <Portfolio />
        <Philosophy />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
