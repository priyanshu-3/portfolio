import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { BubbleText } from "@/components/ui/bubble-text";
import { LeetCodeLogoButton } from "@/components/ui/leetcode-button";
import { CallToActionSection } from "@/components/CallToAction";
import { Github, Linkedin } from "lucide-react";
import { SkillsPage } from "@/pages/SkillsPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ContactPage } from "@/pages/ContactPage";
import { GitHubContributions } from "@/components/GitHubContributions";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Background */}
      <section id="home" className="pt-48 pb-8 px-6 min-h-screen flex items-center relative overflow-hidden">
        {/* Interactive Mouse Spotlight Effect */}
        <Spotlight size={500} className="z-20" />
        
        {/* 3D Spline Background - Interactive */}
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-auto">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent z-[1] pointer-events-none" />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10 pointer-events-none">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <div className="pointer-events-auto">
              <BubbleText 
                text="Priyanshu Mehra"
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight drop-shadow-2xl whitespace-nowrap"
              />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto pointer-events-none">
              Passionate about creating sustainable and innovative solutions through modern technologies.
              Specializing in Web Development, Blockchain, and AI.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
              <a
                href="https://github.com/priyanshu-3"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:scale-105 pointer-events-auto"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors hover:scale-105 pointer-events-auto"
              >
                Start a Project
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 pt-8">
              <a
                href="https://github.com/priyanshu-3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-primary transition-colors hover:scale-110 pointer-events-auto"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://leetcode.com/oiee"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto"
              >
                <LeetCodeLogoButton 
                  variant="ghost" 
                  size="md" 
                  className="text-white hover:text-primary hover:bg-transparent"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/priyanshu-mehra-060070245/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-primary transition-colors hover:scale-110 pointer-events-auto"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <SkillsPage />

      {/* Projects */}
      <ProjectsPage />

      {/* GitHub Contributions */}
      <GitHubContributions />

      {/* Call To Action Section */}
      <CallToActionSection />

      {/* Contact */}
      <ContactPage />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Priyanshu Mehra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

