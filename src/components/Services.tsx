import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaPaintBrush, 
  FaLightbulb, 
  FaCloud, 
  FaBullhorn, 
  FaTools 
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { content } = useLanguage();

  const services = [
    {
      icon: FaCode,
      title: content.services.services1.service1Title,
      description: content.services.services1.service1Description,
      color: 'from-blue-500 to-purple-600',
    },
    {
      icon: FaPaintBrush,
      title: content.services.services2.service2Title,
      description: content.services.services2.service2Description,
      color: 'from-pink-500 to-red-500',
    },
    {
      icon: FaLightbulb,
      title: content.services.services3.service3Title,
      description: content.services.services3.service3Description,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FaCloud,
      title: content.services.services4.service4Title,
      description: content.services.services4.service4Description,
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: FaBullhorn,
      title: content.services.services5.service5Title,
      description: content.services.services5.service5Description,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: FaTools,
      title: content.services.services6.service6Title,
      description: content.services.services6.service6Description,
      color: 'from-gray-500 to-gray-700',
    },
  ];

  return (
    <section id="services" className="section bg-dark-secondary/30">
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
            {content.services.servicesTitle}
          </h2>
          <p className="text-xl text-gray-400">
            {content.services.servicesTitle1}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="service-card group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative mb-6"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <service.icon className="text-2xl text-white" />
                </div>
                
                {/* Floating background effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-lg blur-md -z-10`}
                />
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-400 mb-8">
              Let's discuss your ideas and turn them into reality. I'm here to help you build something amazing.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating shapes */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-8 h-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;