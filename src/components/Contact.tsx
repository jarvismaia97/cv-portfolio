import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { content } = useLanguage();

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

  const contactLinks = [
    {
      label: content.contact.contactLabelEmail,
      value: content.contact.contactEmail2,
      url: `mailto:${content.contact.contactEmail2}`,
      icon: '✉'
    },
    {
      label: content.contact.contactLabelLinkedIn,
      value: '/in/luis-luis-maia-maia',
      url: 'https://www.linkedin.com/in/luis-luis-maia-maia',
      icon: '💼'
    },
    {
      label: content.contact.contactLabelGitHub,
      value: '@lmaia-22',
      url: 'https://github.com/lmaia-22',
      icon: '🔗'
    },
    {
      label: content.contact.contactLabelLocation,
      value: content.contact.contactAdress2,
      url: '#',
      icon: '📍'
    }
  ];

  return (
    <section id="contact" className="py-24 border-t border-border section-bg">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="reveal">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal 
                         tracking-tight mb-6">
              {content.contact.contactTitle1}{' '}
              <em className="italic text-accent">{content.contact.contactTitle2}</em>
            </h2>
            
            <p className="text-base md:text-lg text-text-dim leading-relaxed">
              {content.contact.contactTitle3}
            </p>
          </div>

          {/* Right contact links */}
          <div className="space-y-4 reveal">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                className="contact-link group"
                onClick={link.url === '#' ? (e) => e.preventDefault() : undefined}
              >
                <div>
                  <div className="font-mono text-xs uppercase tracking-wide text-text-dim mb-1">
                    {link.label}
                  </div>
                  <div className="text-base md:text-lg">
                    {link.value}
                  </div>
                </div>
                
                <span className="link-arrow text-xl">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-24 pt-12 border-t border-border text-center">
          <div className="font-mono text-sm text-text-dim">
            <p className="mb-4">
              "{content.contact.footerQuote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;