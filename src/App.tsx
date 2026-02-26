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

import { Component, type ReactNode, type ErrorInfo } from 'react';

class ErrorBoundary extends Component<{children: ReactNode; fallback?: ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Component error:', error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback || null;
    return this.props.children;
  }
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    // Trigger resize so canvas components recalculate dimensions
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
          color: '#e8e4dc',
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
        <ErrorBoundary>
          <SkillsConstellation />
        </ErrorBoundary>
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
