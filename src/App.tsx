import { LanguageProvider } from './context/LanguageContext';
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

// Error boundary to prevent one component from crashing the whole app
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
  return (
    <LanguageProvider>
      <div className="min-h-screen" style={{ background: '#060608', color: '#e8e4dc' }}>
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
