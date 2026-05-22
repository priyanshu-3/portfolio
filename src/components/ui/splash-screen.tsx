import { motion } from "framer-motion";
import { useEffect } from "react";
import { AnimatedText } from "./animated-underline-text-one";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Wait for the animation sequence to finish before triggering onComplete
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // 2.8 seconds total duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Premium ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-orange-500/20 via-purple-500/10 to-rose-500/20 blur-[100px] pointer-events-none"
        />
        
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2"
        >
          {/* Namaste Text with SVG animated underline */}
          <div className="overflow-visible pb-6">
            <AnimatedText 
              text="Namaste."
              textClassName="text-6xl font-black tracking-tight text-white md:text-8xl"
              underlineClassName="text-orange-500 -bottom-8"
              underlineDuration={1}
            />
          </div>
          {/* Hindi Script fading in */}
          <motion.p 
            initial={{ opacity: 0, filter: "blur(10px)", y: -10 }}
            animate={{ opacity: 0.4, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-2xl font-medium tracking-[0.3em] text-white"
          >
            नमस्ते
          </motion.p>
        </motion.div>
      </div>
      
      {/* Loading progress bar at the bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-rose-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
