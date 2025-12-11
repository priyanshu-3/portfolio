import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Three.js', level: 75 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 82 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'GraphQL', level: 78 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 92 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Figma', level: 80 },
        { name: 'CI/CD', level: 78 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[var(--color-accent)] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            My Expertise
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass rounded-2xl p-8 hover:border-[var(--color-accent)] transition-all duration-500 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]" />
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-[var(--color-text-secondary)] font-medium">
                        {skill.name}
                      </span>
                      <span className="text-[var(--color-text-muted)] text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[var(--color-surface)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: [0.6, -0.05, 0.01, 0.99],
                        }}
                        className="h-full bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20"
        >
          <p className="text-center text-[var(--color-text-muted)] text-sm tracking-wider uppercase mb-8">
            Technologies I Work With
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 
              'MongoDB', 'Docker', 'AWS', 'Git', 'Figma'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1 + index * 0.05 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: '0 10px 30px rgba(255, 107, 53, 0.2)'
                }}
                className="px-5 py-3 glass rounded-xl cursor-default"
              >
                <span className="text-sm font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

