import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Portfolio: React.FC = () => {
  const { content } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const portfolioItems = [
    {
      id: 1,
      title: content.portfolio.portfolio1.portfolio1Title,
      category: 'Website',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=Green+Foodprint',
      description: content.portfolio.portfolio1.portfolio1Desc1,
      technologies: ['React', 'TypeScript', 'CSS'],
      liveUrl: content.portfolio.portfolio1.portfolio1ProjectUrlValue,
      githubUrl: content.portfolio.portfolio1.portfolio1ProjectUrlValue,
    },
    {
      id: 2,
      title: content.portfolio.portfolio2.portfolio2Title,
      category: 'Website',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=Unipessoal',
      description: content.portfolio.portfolio2.portfolio2Desc1,
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: content.portfolio.portfolio2.portfolio2ProjectUrlValue,
      githubUrl: content.portfolio.portfolio2.portfolio2ProjectUrlValue,
    },
    {
      id: 3,
      title: content.portfolio.portfolio3.portfolio3Title,
      category: 'Website',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=Curriculum',
      description: content.portfolio.portfolio3.portfolio3Desc1,
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: content.portfolio.portfolio3.portfolio3ProjectUrlValue,
      githubUrl: content.portfolio.portfolio3.portfolio3ProjectUrlValue,
    },
    {
      id: 4,
      title: content.portfolio.portfolio4.portfolio4Title,
      category: 'Project',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=Gift+Finder',
      description: content.portfolio.portfolio4.portfolio4Desc1,
      technologies: ['AI', 'Python', 'Web'],
      liveUrl: content.portfolio.portfolio4.portfolio4ProjectUrlValue,
      githubUrl: content.portfolio.portfolio4.portfolio4ProjectUrlValue,
    },
    {
      id: 5,
      title: content.portfolio.portfolio5.portfolio5Title,
      category: 'Project',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=GitHub+Project',
      description: content.portfolio.portfolio5.portfolio5Desc1,
      technologies: ['Node.js', 'SMTP', 'Heroku'],
      liveUrl: content.portfolio.portfolio5.portfolio5ProjectUrlValue,
      githubUrl: content.portfolio.portfolio5.portfolio5ProjectUrlValue,
    },
    {
      id: 6,
      title: content.portfolio.portfolio6.portfolio6Title,
      category: 'Project',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=Otto+Robot',
      description: content.portfolio.portfolio6.portfolio6Desc1,
      technologies: ['C++', '3D Printing', 'Arduino'],
      liveUrl: content.portfolio.portfolio6.portfolio6ProjectUrlValue,
      githubUrl: content.portfolio.portfolio6.portfolio6ProjectUrlValue,
    },
    {
      id: 7,
      title: content.portfolio.portfolio7.portfolio7Title,
      category: 'Project',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=Firefighter+Robot',
      description: content.portfolio.portfolio7.portfolio7Desc1,
      technologies: ['Robotics', 'C++', 'Sensors'],
      liveUrl: content.portfolio.portfolio7.portfolio7ProjectUrlValue,
      githubUrl: content.portfolio.portfolio7.portfolio7ProjectUrlValue,
    },
    {
      id: 8,
      title: content.portfolio.portfolio8.portfolio8Title,
      category: 'Project',
      image: 'https://placehold.co/600x400/1a1a2e/3a7bd5?text=Furniture+Design',
      description: content.portfolio.portfolio8.portfolio8Desc1,
      technologies: ['OpenSCAD', 'Design', '3D'],
      liveUrl: null,
      githubUrl: null,
    },
  ];

  const filters = [
    content.portfolio.filters.filter1, // All
    content.portfolio.filters.filter2, // Website
    content.portfolio.filters.filter3, // Brand
    content.portfolio.filters.filter4, // Project
  ];

  const filteredItems = activeFilter === filters[0] 
    ? portfolioItems 
    : portfolioItems.filter(item => 
        item.category === 
        (activeFilter === filters[1] ? 'Website' : 
         activeFilter === filters[2] ? 'Brand' : 'Project')
      );

  return (
    <section id="portfolio" className="section bg-dark">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {content.portfolio.portfolioTitle1}
          </h2>
          <p className="text-xl text-gray-400">
            {content.portfolio.portfolioTitle2}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="portfolio-item"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-70" />
                  
                  {/* Hover content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                  >
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/20 backdrop-blur-sm text-xs rounded-full border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex space-x-3">
                      {item.liveUrl && (
                        <motion.a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-primary hover:bg-primary/80 rounded-full transition-colors"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </motion.a>
                      )}
                      {item.githubUrl && (
                        <motion.a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                        >
                          <FaGithub className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="content p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/lmaia-22"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
          >
            <FaGithub />
            <span>View All Projects</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;