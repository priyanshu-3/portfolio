import { ScrollSection } from "@/components/ScrollSection";
import { Code2, Cpu, Database, Layout, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function SkillsPage() {
  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Python", "Java", "MongoDB"] },
    { category: "Blockchain", items: ["Solidity", "Web3.js", "Smart Contracts", "DApps"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Figma"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors backdrop-blur-sm bg-background/80"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* Skills Section */}
      <ScrollSection id="skills" className="py-32 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Skills & <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Technologies</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A comprehensive overview of my technical skills and expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {index === 0 && <Layout className="w-6 h-6 text-primary" />}
                    {index === 1 && <Database className="w-6 h-6 text-primary" />}
                    {index === 2 && <Cpu className="w-6 h-6 text-primary" />}
                    {index === 3 && <Code2 className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="text-2xl font-bold">{skillCategory.category}</h3>
                </div>
                <ul className="space-y-3">
                  {skillCategory.items.map((skill, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 p-8 rounded-2xl border border-border bg-card/50"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'React', 'Node.js', 'TypeScript', 'Python', 'Java', 'MongoDB',
                'Solidity', 'Next.js', 'Tailwind CSS', 'Git', 'Docker', 'AWS',
                'Web3.js', 'Smart Contracts', 'DApps', 'Figma'
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-5 py-3 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-card transition-all cursor-default"
                >
                  <span className="text-sm font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
  );
}

