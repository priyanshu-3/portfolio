import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { BubbleText } from "@/components/ui/bubble-text";
import { ResumeSection } from "@/components/Resume";
import { ScrollSection } from "@/components/ScrollSection";
import { LeetCodeLogoButton } from "@/components/ui/leetcode-button";
import { ContactForm } from "@/components/ui/contact-sections";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Background */}
      <section className="pt-32 pb-20 px-6 min-h-screen flex items-center relative overflow-hidden">
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
            <p className="text-sm text-muted-foreground uppercase tracking-wider pointer-events-none">
              Computer Science Student
            </p>
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
                Get In Touch
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
                href="https://linkedin.com"
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

      {/* About Section */}
      <ScrollSection id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary mb-2">3+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Technologies</div>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Resume Section with Scroll Animation */}
      <ResumeSection />

      {/* Achievements */}
      <ScrollSection className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Achievements & Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card flex items-start gap-4 hover:border-primary/50 transition-colors">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="font-semibold mb-2">1st Prize</h3>
                <p className="text-sm text-muted-foreground">
                  Code Debugging Session
                </p>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card flex items-start gap-4 hover:border-primary/50 transition-colors">
              <div className="text-3xl">🥈</div>
              <div>
                <h3 className="font-semibold mb-2">2nd Prize</h3>
                <p className="text-sm text-muted-foreground">
                  Python for Data Science Workshop
                </p>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card flex items-start gap-4 hover:border-primary/50 transition-colors">
              <div className="text-3xl">🥈</div>
              <div>
                <h3 className="font-semibold mb-2">2nd Prize</h3>
                <p className="text-sm text-muted-foreground">
                  "Project and Research Expo 2025" for Skin Cancer Detection Using Deep Learning Techniques
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Contact Section */}
      <ScrollSection id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-12">
            Let's discuss your next project or collaboration
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="mailto:mehrapriyansh33@gmail.com"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
              mehrapriyansh33@gmail.com
            </a>
            <a
              href="tel:+918449915251"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <Phone className="w-5 h-5" />
              +91 8449915251
            </a>
          </div>
        </div>
      </ScrollSection>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Priyanshu Mehra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

