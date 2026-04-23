import { ScrollSection } from "@/components/ScrollSection";
import { type Variants } from "framer-motion";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  gradient: string;
  emoji: string;
}

const projects: Project[] = [
  {
    title: "SkinCare – AI Skin Disease Platform",
    description:
      "Full-stack web platform for skin disease detection powered by a deep learning model. Features a React + JavaScript frontend with real-time image analysis, a Python/Flask backend, and Dockerized deployment. Bridges AI with a practical healthcare interface.",
    tags: ["JavaScript", "Python", "React", "Flask", "Docker", "CSS"],
    github: "https://github.com/priyanshu-3/SkinCare",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    emoji: "🧬",
  },

  {
    title: "Cura – Full-Stack Health App",
    description:
      "Large-scale full-stack application built with JavaScript and PostgreSQL. Features complex relational data modeling (PLpgSQL stored procedures), a rich front-end UI, and Python-powered services — one of the most substantial projects in the portfolio.",
    tags: ["JavaScript", "PostgreSQL", "PLpgSQL", "HTML", "CSS", "Python"],
    github: "https://github.com/priyanshu-3/cura",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    emoji: "💊",
  },
  {
    title: "LoopTask – Task Management App",
    description:
      "A modern task management application built entirely in TypeScript with PostgreSQL for persistent storage. Features a clean, type-safe codebase, shell-scripted automation, and a polished UI for managing tasks effectively.",
    tags: ["TypeScript", "PostgreSQL", "PLpgSQL", "JavaScript", "CSS"],
    github: "https://github.com/priyanshu-3/LoopTask",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    emoji: "✅",
  },
  {
    title: "Travel Agency Website",
    description:
      "Beautiful travel agency landing page with smooth animations, responsive design, and interactive destination showcases. Built with vanilla JavaScript and CSS, and deployed live on Vercel.",
    tags: ["JavaScript", "CSS", "HTML", "Vercel"],
    github: "https://github.com/priyanshu-3/travelAgency",
    live: "https://travel-agency-git-main-priyanshus-projects-c12e86e2.vercel.app",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    emoji: "✈️",
  },
  {
    title: "Paper Piano – Air Instrument",
    description:
      "Play piano in the air using just your hands and a webcam! Built entirely in Python using computer vision and MediaPipe for real-time hand tracking. Maps hand gestures to piano notes — a creative blend of music and ML.",
    tags: ["Python", "MediaPipe", "Computer Vision", "OpenCV"],
    github: "https://github.com/priyanshu-3/PaperPiano",
    live: "https://paper-piano.vercel.app",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    emoji: "🎹",
  },
  {
    title: "Hand Gesture Controller",
    description:
      "Control your computer using hand gestures captured by webcam. A Python + OpenCV project that uses MediaPipe to recognize and map specific hand poses to system actions — volume, scrolling, and more.",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Shell"],
    github: "https://github.com/priyanshu-3/HandGesture",
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    emoji: "🖐️",
  },

];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <ScrollSection id="projects" className="py-32 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
              Built by Priyanshu Mehra
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              My{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Real projects from my GitHub — spanning AI, Computer Vision, Full-Stack Development,
              and creative experiments.
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none`}
                />

                {/* Card content */}
                <div className="relative z-10 p-7 flex flex-col h-full">
                  {/* Emoji */}
                  <div className="text-5xl mb-5 select-none">{project.emoji}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full border border-border bg-background/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-auto flex-wrap">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all duration-200"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-accent transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Explore all repositories and contributions on GitHub.
            </p>
            <a
              href="https://github.com/priyanshu-3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary/30"
            >
              <Code2 className="w-5 h-5" />
              View All on GitHub
            </a>
          </motion.div>

        </div>
      </ScrollSection>
    </div>
  );
}
