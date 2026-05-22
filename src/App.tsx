import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Home } from "@/pages/Home";
import { SkillsPage } from "@/pages/SkillsPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { useEffect, useState } from "react";
import { SplashScreen } from "@/components/ui/splash-screen";
import { AnimatePresence } from "framer-motion";

function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else if (location.pathname === "/") {
      // If navigating to home without hash, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <BrowserRouter>
        {!showSplash && <Navigation />}
        <ScrollToHashElement />
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
