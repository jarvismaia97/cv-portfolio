import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { content } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = [
    { number: '132', label: content.about.counts.countProcess },
    { number: '28', label: content.about.counts.countProjects },
    { number: '8980h', label: content.about.counts.countHoursSupport },
    { number: '3920h', label: content.about.counts.countHoursCoding },
  ];

  const personalInfo = [
    { label: content.about.birthday, value: content.about.birthdayValue },
    { label: content.about.website, value: content.about.websiteValue },
    { label: content.about.phone, value: content.about.phoneValue },
    { label: content.about.city, value: content.about.cityValue },
    { label: content.about.age, value: content.about.ageValue },
    { label: content.about.degree, value: content.about.degreeValue },
    { label: content.about.email1, value: content.about.email1Value },
    { label: content.about.freelance, value: content.about.freelanceValue },
  ];

  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'React', level: 88 },
    { name: 'Angular', level: 82 },
    { name: 'Node.js', level: 80 },
    { name: 'PHP', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'SQL', level: 85 },
  ];

  const interests = Object.values(content.about.interests);

  return (
    <section id="about" className="section bg-dark-secondary/50">
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
            {content.about.aboutTitle1}
          </h2>
          <p className="text-xl text-gray-400">
            {content.about.aboutTitle2}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Photo and stats */}
          <motion.div
            style={{ y }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-20" />
                <img
                  src="https://placehold.co/400x400/1a1a2e/00d2ff?text=LM"
                  alt="Luís Maia"
                  className="relative z-10 w-full rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-dark-tertiary rounded-lg border border-gray-700"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - About content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* About text */}
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>{content.about.aboutText1}</p>
              <p>{content.about.aboutText2}</p>
            </div>

            {/* Personal Info Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {personalInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-3 bg-dark-tertiary/30 rounded-lg border border-gray-700/50"
                >
                  <span className="text-primary font-medium min-w-0 flex-shrink-0">
                    {info.label}
                  </span>
                  <span className="text-gray-300 truncate">{info.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            {content.about.aboutSkills}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.2 + 0.1 * index }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            {content.about.interestsTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 bg-dark-tertiary rounded-lg border border-gray-700 text-center hover:border-primary transition-all duration-300 cursor-default"
              >
                <span className="text-gray-300 text-sm font-medium">
                  {interest}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;