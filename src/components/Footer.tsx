import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { content } = useLanguage();
  return (
    <footer className="py-12 px-6 md:px-12 text-center border-t border-border">
      <p className="font-mono text-xs uppercase tracking-wide text-text-dim">
        {content.footer.copyright}
      </p>
      
      <div className="mt-4 font-mono text-xs text-text-dim/70">
        {content.footer.builtWith}
      </div>
    </footer>
  );
};

export default Footer;