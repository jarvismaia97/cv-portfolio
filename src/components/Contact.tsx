import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { content } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'default_service', // Replace with your EmailJS service ID
        'template_contact', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'mwNFi1715yJ6L0u9p' // EmailJS public key from the brief
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: content.contact.contactAdress1,
      info: content.contact.contactAdress2,
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: FaEnvelope,
      title: content.contact.contactEmail1,
      info: content.contact.contactEmail2,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaPhone,
      title: content.contact.contactPhone1,
      info: content.contact.contactPhone2,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/lmaia-22', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/luis-luis-maia-maia', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/MaiaLuismsm14', label: 'Twitter' },
    { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=100001977161534', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/luisluismaiamaia/', label: 'Instagram' },
  ];

  return (
    <section id="contact" className="section bg-dark-secondary">
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
            {content.contact.contactTitle1}
          </h2>
          <p className="text-xl text-gray-400">
            {content.contact.contactTitle2}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold gradient-text mb-8">
                Get In Touch
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to drop me a message!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-6 p-6 bg-dark-tertiary border border-gray-700 rounded-lg hover:border-primary transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                    <item.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-400">
                      {item.info}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold gradient-text mb-6">
                {content.contact.contactSocial}
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="p-4 bg-dark-tertiary hover:bg-dark rounded-lg border border-gray-700 hover:border-primary text-gray-400 hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder={content.contact.form.name}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder={content.contact.form.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  name="subject"
                  placeholder={content.contact.form.subject}
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <textarea
                  name="message"
                  placeholder={content.contact.form.message}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="form-input resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-8 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg transition-all duration-300 ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : content.contact.form.liveAlertBtn}
                </motion.button>
              </motion.div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center"
                >
                  Something went wrong. Please try again or send me an email directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;