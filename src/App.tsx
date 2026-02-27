import { useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LanguageProvider } from './context/LanguageContext';
import Loader from './components/Loader';
import SplineBackground from './components/SplineBackground';
import Fireflies from './components/Fireflies';
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
import CustomCursor from './components/CustomCursor';
import { useKonamiCode } from './hooks/useEasterEggs';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [splineReady, setSplineReady] = useState(false);
  const konamiTriggered = useKonamiCode();

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }, []);

  const handleSplineLoad = useCallback(() => {
    setSplineReady(true);
  }, []);

  return (
    <LanguageProvider>
      <CustomCursor />
      {/* Spline loads behind the loader */}
      <SplineBackground onLoad={handleSplineLoad} />
      <Fireflies />
      {loading && <Loader onComplete={handleLoaderComplete} splineReady={splineReady} />}

      {/* Konami code easter egg */}
      {konamiTriggered && (
        <div className="fixed inset-0 z-[99990] flex items-center justify-center pointer-events-none">
          <div className="text-center animate-fade-up" style={{ animationDuration: '0.5s' }}>
            <div className="text-6xl mb-4">🎮</div>
            <div className="font-display text-3xl gradient-text">You found the secret!</div>
            <div className="font-mono text-sm text-accent mt-2">↑↑↓↓←→←→BA</div>
          </div>
        </div>
      )}

      <div 
        className="min-h-screen" 
        style={{ 
          background: 'transparent', 
          position: 'relative',
          zIndex: 1,
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
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}

export default App;
