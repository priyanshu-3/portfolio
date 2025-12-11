import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
    { value: '10+', label: 'Technologies' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Image/Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Decorative elements */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-full border border-[var(--color-border)]"
              />
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-4 rounded-full border border-[var(--color-border)]"
              />
              
              {/* Center content */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)] flex items-center justify-center glow">
                <div className="text-center">
                  <span className="text-6xl md:text-7xl font-bold gradient-text">
                    PM
                  </span>
                  <p className="text-[var(--color-text-muted)] text-sm mt-2 tracking-widest">
                    DEVELOPER
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-0 glass px-4 py-2 rounded-full"
              >
                <span className="text-sm font-medium">React</span>
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 left-0 glass px-4 py-2 rounded-full"
              >
                <span className="text-sm font-medium">Node.js</span>
              </motion.div>
              <motion.div
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -left-4 glass px-4 py-2 rounded-full"
              >
                <span className="text-sm font-medium">TypeScript</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <p className="text-[var(--color-accent)] text-sm font-medium tracking-[0.2em] uppercase mb-4">
                About Me
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: 'var(--font-family-display)' }}
              >
                Turning Ideas Into
                <span className="gradient-text"> Digital Reality</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                I'm a passionate Full Stack Developer with a love for creating 
                elegant solutions to complex problems. With expertise in modern 
                web technologies, I build applications that are not only functional 
                but also beautiful and user-friendly.
              </p>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                My journey in tech started with curiosity and has evolved into a 
                career focused on continuous learning and innovation. I believe 
                in writing clean, maintainable code and creating experiences that 
                users love.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[var(--color-text-muted)] text-xs tracking-wider uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Download CV Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

