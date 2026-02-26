import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Resume: React.FC = () => {
  const { content } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const educationItems = [
    {
      title: content.resume.resumeEduItem1.resumeEduItem1Title,
      date: content.resume.resumeEduItem1.resumeEduItem1Date,
      location: content.resume.resumeEduItem1.resumeEduItem1Local,
      description: content.resume.resumeEduItem1.resumeEduItem1Desc,
    },
    {
      title: content.resume.resumeEduItem2.resumeEduItem2Title,
      date: content.resume.resumeEduItem2.resumeEduItem2Date,
      location: content.resume.resumeEduItem2.resumeEduItem2Local,
      description: content.resume.resumeEduItem2.resumeEduItem2Desc,
    },
    {
      title: content.resume.resumeEduItem3.resumeEduItem3Title,
      date: content.resume.resumeEduItem3.resumeEduItem3Date,
      location: content.resume.resumeEduItem3.resumeEduItem3Local,
      description: content.resume.resumeEduItem3.resumeEduItem3Desc,
    },
    {
      title: content.resume.resumeEduItem4.resumeEduItem4Title,
      date: content.resume.resumeEduItem4.resumeEduItem4Date,
      location: content.resume.resumeEduItem4.resumeEduItem4Local,
      description: content.resume.resumeEduItem4.resumeEduItem4Desc,
    },
  ];

  const experienceItems = [
    {
      title: content.resume.resumeProfItem3.resumeProfItem3Title,
      date: content.resume.resumeProfItem3.resumeProfItem3Date,
      location: content.resume.resumeProfItem3.resumeProfItem3Local,
      description: Object.values(content.resume.resumeProfItem3.resumeProfItem3Desc),
    },
    {
      title: content.resume.resumeProfItem1.resumeProfItem1Title,
      date: content.resume.resumeProfItem1.resumeProfItem1Date,
      location: content.resume.resumeProfItem1.resumeProfItem1Local,
      description: Object.values(content.resume.resumeProfItem1.resumeProfItem1Desc),
    },
    {
      title: content.resume.resumeProfItem2.resumeProfItem2Title,
      date: content.resume.resumeProfItem2.resumeProfItem2Date,
      location: content.resume.resumeProfItem2.resumeProfItem2Local,
      description: Object.values(content.resume.resumeProfItem2.resumeProfItem2Desc),
    },
  ];

  const TimelineItem: React.FC<{
    item: any;
    index: number;
    icon: React.ReactNode;
    isLast?: boolean;
  }> = ({ item, index, icon, isLast = false }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative pl-8"
    >
      {/* Timeline line */}
      {!isLast && <div className="timeline-line" />}
      
      {/* Timeline dot */}
      <div className="timeline-item relative">
        <div className="absolute -left-8 top-6 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center z-10">
          <div className="text-white text-xs">
            {icon}
          </div>
        </div>
        
        {/* Content card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-dark-secondary border border-gray-700 rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-xl"
          style={{ 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' 
          }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
            <h3 className="text-xl font-bold text-white mb-2 sm:mb-0">
              {item.title}
            </h3>
            <span className="text-primary font-medium text-sm bg-primary/10 px-3 py-1 rounded-full">
              {item.date}
            </span>
          </div>
          
          <p className="text-gray-400 mb-4 font-medium">
            {item.location}
          </p>
          
          <div className="text-gray-300 leading-relaxed">
            {Array.isArray(item.description) ? (
              <ul className="space-y-2">
                {item.description.map((desc: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="text-primary mr-2 mt-2">•</span>
                    <span>{desc}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p>{item.description}</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="resume" className="section bg-dark">
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
            {content.resume.resumeTitle}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {content.resume.resumeTitle0}
          </p>
          
          {/* Download CV Button */}
          <motion.a
            href={content.resume.pdfDownload}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
          >
            <FaDownload />
            <span>{content.resume.pdfDownloadText}</span>
          </motion.a>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-8 gradient-text">
            {content.resume.resumeTitle1}
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg text-center">
            {content.resume.resumeSummary}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <motion.div
            style={{ y }}
          >
            <div className="flex items-center space-x-3 mb-12">
              <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold gradient-text">
                {content.resume.resumeTitle2}
              </h3>
            </div>
            
            <div className="space-y-8">
              {educationItems.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  index={index}
                  icon={<FaGraduationCap />}
                  isLast={index === educationItems.length - 1}
                />
              ))}
            </div>
          </motion.div>

          {/* Professional Experience */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
          >
            <div className="flex items-center space-x-3 mb-12">
              <div className="p-3 bg-gradient-to-r from-secondary to-primary rounded-lg">
                <FaBriefcase className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold gradient-text">
                {content.resume.resumeTitle3}
              </h3>
            </div>
            
            <div className="space-y-8">
              {experienceItems.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  index={index}
                  icon={<FaBriefcase />}
                  isLast={index === experienceItems.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;