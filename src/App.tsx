import { Navigation } from "@/components/Navigation";
import { Home } from "@/pages/Home";
import { useState } from "react";
import { SplashScreen } from "@/components/ui/splash-screen";
import { AnimatePresence } from "framer-motion";

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash on first visit or hard refresh
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    return !hasSeenSplash;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!showSplash && <Navigation />}
      <Home />
    </>
  );
}

export default App;
