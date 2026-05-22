"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

/* -----------------------------------------------------------------------
 * Pixel canvas — canvas-driven shimmer that ripples from the center on hover
 * --------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0,
    sizeStep: Math.random() * 0.4,
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) { p.counter += p.counterStep; return; }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false; p.counter = 0;
      if (p.size <= 0) { p.isIdle = true; return; }
      p.size -= 0.1; p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed; else p.size += p.speed;
    },
  };
  return p;
}

type PixelCanvasProps = { colors: string[]; gap?: number; speed?: number };

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w; canvas.height = h;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2, dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy);
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }
    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;
    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);
      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();
      if (pixels.every((p) => p.isIdle)) cancelAnimationFrame(animationRef.current);
    };
    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();
    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);
    const card = wrapRef.current?.parentElement;
    const handleEnter = () => animate("appear");
    const handleLeave = () => animate("disappear");
    card?.addEventListener("mouseenter", handleEnter);
    card?.addEventListener("mouseleave", handleLeave);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
      card?.removeEventListener("mouseenter", handleEnter);
      card?.removeEventListener("mouseleave", handleLeave);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden rounded-2xl">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

/* -----------------------------------------------------------------------
 * Skill data — name, icon (SVG), and brand pixel colors
 * --------------------------------------------------------------------- */

export type Skill = {
  name: string;
  colors: string[];
  icon: React.ReactNode;
};

/* -----------------------------------------------------------------------
 * Individual skill card
 * --------------------------------------------------------------------- */

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3",
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
        "p-6 cursor-default overflow-hidden",
        "transition-all duration-300",
        "hover:border-white/20 hover:bg-white/8 hover:shadow-2xl"
      )}
      style={{ minHeight: "120px" }}
    >
      <PixelCanvas colors={skill.colors} gap={4} speed={25} />

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-12 h-12 transition-transform duration-300 group-hover:scale-110">
        {skill.icon}
      </div>

      {/* Name */}
      <span className="relative z-10 text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 text-center leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

/* -----------------------------------------------------------------------
 * Section header label
 * --------------------------------------------------------------------- */

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-white/10" />
      <span
        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
        style={{ color, borderColor: `${color}40`, background: `${color}15` }}
      >
        {label}
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/* -----------------------------------------------------------------------
 * SVG icons for each skill
 * --------------------------------------------------------------------- */

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" />
    <path d="M14.5 11h-3V18h-1.5v-7H7.5V9.5H14.5V11Z" fill="white" />
    <path d="M17.5 14c0-.8-.5-1.3-1.5-1.5l-.8-.2c-.5-.1-.7-.3-.7-.6 0-.4.3-.6.8-.6.6 0 1 .3 1 .8h1.4c0-1.2-.9-2-2.4-2s-2.3.8-2.3 1.9c0 .9.5 1.4 1.7 1.7l.7.2c.6.1.8.3.8.7 0 .4-.3.7-.9.7-.7 0-1.1-.3-1.2-.9H13c.1 1.3 1 2 2.5 2 1.6 0 2.5-.8 2.5-2.1Z" fill="white" />
  </svg>
);

const NextJsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <circle cx="12" cy="12" r="10" fill="black" />
    <path d="M7 8.5h2.5v5.5l5.5-7.5H17v9.5h-2.5v-5.5L9 18.5H7V8.5Z" fill="white" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M12 6c-2.7 0-4.4 1.35-5 4.05 1-1.35 2.17-1.856 3.5-1.519.76.19 1.3.742 1.9 1.354C13.347 10.958 14.478 12.15 17 12.15c2.7 0 4.4-1.35 5-4.05-1 1.35-2.17 1.856-3.5 1.519-.76-.19-1.3-.742-1.9-1.354C15.653 7.192 14.522 6 12 6Z" fill="#38BDF8" />
    <path d="M7 12c-2.7 0-4.4 1.35-5 4.05 1-1.35 2.17-1.856 3.5-1.519.76.19 1.3.742 1.9 1.354C8.347 16.958 9.478 18.15 12 18.15c2.7 0 4.4-1.35 5-4.05-1 1.35-2.17 1.856-3.5 1.519-.76-.19-1.3-.742-1.9-1.354C10.653 13.192 9.522 12 7 12Z" fill="#38BDF8" />
  </svg>
);

const ReduxIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M16.3 5.5a2.6 2.6 0 0 0-2.5 1.9c-.6 2.1.7 3.5 1.3 4.1.3.3.4.7.2 1.1-.2.3-.6.5-1 .5H12c-1.2 0-2.2.5-2.9 1.3" stroke="#764ABC" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M8.2 16.5a2.5 2.5 0 1 0 0 2.5" stroke="#764ABC" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M18.5 16.5a2.5 2.5 0 1 1-4.5 1.5" stroke="#764ABC" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M12 4a2.5 2.5 0 1 1 2.5 2.5" stroke="#764ABC" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const JavaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M9.3 16.2s-.9.5.6.7c1.8.2 2.7.2 4.7-.2 0 0 .5.3 1.2.6-4.4 1.9-10-.1-6.5-1.1Z" fill="#EA2D2E"/>
    <path d="M8.8 13.8s-1 .8.6 1c2.1.2 3.8.2 6.7-.3 0 0 .4.3.9.5-5.9 1.7-12.5.2-8.2-1.2Z" fill="#EA2D2E"/>
    <path d="M13.5 9.5c1.2 1.4-.3 2.6-.3 2.6s3-1.5 1.6-3.5c-1.3-1.8-2.3-2.7 3.2-5.8 0 0-8.7 2.2-4.5 6.7Z" fill="#EA2D2E"/>
    <path d="M18.3 17.7s.7.6-.7 1c-2.7.8-11.1 1-13.4 0-.8-.4.8-.9 1.3-1 .5-.1.8-.1.8-.1-.9-.7-6 1.3-2.6 1.8 9.4 1.5 17.1-.7 14.6-1.7Z" fill="#EA2D2E"/>
    <path d="M9.7 11.5s-4 .9-1.4 1.3c1.1.1 3.3.1 5.3-.1 1.7-.1 3.3-.4 3.3-.4s-.6.2-1 .5c-3.9 1-11.5.5-9.3-.5 1.9-.8 3.1-.8 3.1-.8Z" fill="#EA2D2E"/>
    <path d="M16.2 14.8c4-2.1 2.1-4 .8-3.7-.3.1-.5.1-.5.1s.1-.2.4-.3c2.9-1 5.1 3-0.8 4.6 0 0 .1-.1.1-.7Z" fill="#EA2D2E"/>
    <path d="M14.5 2s2.3 2.3-2.2 5.8c-3.6 2.8-.8 4.4 0 6.3-2.1-1.9-3.6-3.5-2.6-5 1.5-2.3 5.7-3.4 4.8-7.1Z" fill="#EA2D2E"/>
    <path d="M10.1 20.8c3.8.2 9.7-.1 9.8-1.5 0 0-.3.6-3.1 1.1-3.3.5-7.3.5-9.7.1 0 0 .5.4 3 .3Z" fill="#EA2D2E"/>
  </svg>
);

const SpringIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M20.2 2c-.5.9-2.2 3.6-4.2 4.3C14.5 3.8 11.7 2 8.5 2 4.4 2 1 5.4 1 9.5c0 3.4 2.2 6.3 5.2 7.4-.1.4-.2.8-.2 1.2C6 20.3 7.7 22 9.8 22c1.4 0 2.6-.7 3.3-1.8.6.1 1.2.2 1.9.2 4.4 0 8-3.6 8-8 0-3.5-2.2-6.5-2.8-10.4Z" fill="#6DB33F"/>
    <path d="M8 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="white"/>
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M13.5 5.5h2v2h-2zM10.5 5.5h2v2h-2zM7.5 5.5h2v2h-2zM10.5 8.5h2v2h-2zM7.5 8.5h2v2h-2zM4.5 8.5h2v2h-2zM13.5 8.5h2v2h-2z" fill="#2496ED"/>
    <path d="M21.5 10.5c-.4-.3-1.3-.4-2-.3-.2-.8-.7-1.5-1.5-1.9l-.5-.3-.3.5c-.3.5-.4 1.3-.3 1.9-.3-.2-.7-.3-1-.3H2.5l-.1.4c-.2 1.1 0 2.4.7 3.4.7 1 1.7 1.6 3.1 1.6 2.8 0 4.9-1.3 5.9-3.7.4 0 .8.1 1.2.1.5 0 1-.2 1.4-.5.2-.2.4-.5.6-.9l.1-.4-.4-.1c-.3-.1-.5-.2-.6-.2.1-.1.2-.3.3-.5l.1-.3-.5-.3Z" fill="#2496ED"/>
  </svg>
);

const AWSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M6.8 10.8c0 .4.1.7.2.9.1.2.3.4.5.5.2.1.5.1.7.1.3 0 .5-.1.7-.2.2-.2.3-.4.3-.6h.9c0 .3-.1.6-.3.8-.2.2-.4.4-.7.5-.3.1-.6.2-.9.2-.5 0-.9-.1-1.2-.3-.3-.2-.6-.5-.7-.8-.2-.3-.2-.7-.2-1.1v-.2c0-.4.1-.8.2-1.1.2-.3.4-.6.7-.8.3-.2.7-.3 1.2-.3.3 0 .6.1.9.2.3.1.5.3.7.5.2.2.3.5.3.8h-.9c0-.2-.1-.4-.3-.6-.2-.1-.4-.2-.7-.2-.4 0-.7.1-.9.4-.2.3-.3.7-.3 1.1v.2ZM12 8.5l1.3 4.2 1.3-4.2h1l-2 5.5H12l-2-5.5h1ZM17.8 13.4c.1.2.3.4.5.5v.1c-.2.1-.4.2-.7.2-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7-.2.3-.5.5-.8.7-.3.2-.6.2-1 .2-.4 0-.8-.1-1.1-.4-.3-.2-.4-.6-.4-1 0-.5.2-.8.5-1.1.3-.3.8-.4 1.4-.5l1.3-.1v-.3c0-.3-.1-.5-.2-.7-.2-.1-.4-.2-.7-.2-.5 0-.9.2-1 .7h-.9c0-.3.1-.6.3-.8.2-.2.4-.4.7-.5.3-.1.6-.2 1-.2.6 0 1 .2 1.3.5.3.3.5.7.5 1.3v2.1c0 .1 0 .2.1.3l.2.2Z" fill="#FF9900"/>
    <path d="M6 16.5c2.4 1.2 5.2 1.5 7.8.7 2.3-.7 4.3-2.1 5.7-4" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M17.5 13.5l2.5-.5-.5 2.5" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const KubernetesIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M12 2L3 7v10l9 5 9-5V7L12 2Z" fill="#326CE5" opacity="0.2"/>
    <path d="M12 2L3 7v10l9 5 9-5V7L12 2Z" stroke="#326CE5" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="#326CE5"/>
    <path d="M12 8v2M12 14v2M8 10l1.7 1M14.3 13l1.7 1M8 14l1.7-1M14.3 11l1.7-1" stroke="#326CE5" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M21.5 11.1 12.9 2.5a1.4 1.4 0 0 0-2 0L9 4.4l2.4 2.4a1.7 1.7 0 0 1 2.1 2.1L16 11.4a1.7 1.7 0 1 1-1 1l-2.3-2.3v6a1.7 1.7 0 1 1-1.4 0V10a1.7 1.7 0 0 1-.9-2.2L8 5.4 2.5 10.9a1.4 1.4 0 0 0 0 2L11 21.4a1.4 1.4 0 0 0 2 0l8.5-8.5a1.4 1.4 0 0 0 0-1.8Z" fill="#F05032"/>
  </svg>
);

const SolidityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M14.5 3h-5L6 8h5l-3 5h5l3-10ZM9.5 21h5L18 16h-5l3-5h-5L9.5 21Z" fill="#6C757D" opacity="0.5"/>
    <path d="M14.5 3h-5L6 8h5l-3 5h5l3-10Z" fill="#9B9B9B"/>
    <path d="M9.5 21h5L18 16h-5l3-5h-5L9.5 21Z" fill="#6C757D"/>
  </svg>
);

const MongoDBIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M12 2C9 5 7 8 7 12c0 2.4.9 4.6 2.4 6.2L12 22l2.6-3.8C16.1 16.6 17 14.4 17 12c0-4-2-7-5-10Z" fill="#47A248"/>
    <path d="M12 3.5v17" stroke="#3D8A3D" strokeWidth="0.8"/>
  </svg>
);

const PostgreSQLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M12 3C8.7 3 6 5.7 6 9v6c0 3.3 2.7 6 6 6s6-2.7 6-6V9c0-3.3-2.7-6-6-6Z" fill="#336791" opacity="0.3"/>
    <path d="M12 3C8.7 3 6 5.7 6 9v6c0 3.3 2.7 6 6 6s6-2.7 6-6V9c0-3.3-2.7-6-6-6Z" stroke="#336791" strokeWidth="1.5" fill="none"/>
    <path d="M9 11h6M9 14h4" stroke="#336791" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="15" cy="8" r="1" fill="#336791"/>
  </svg>
);

const HardhatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M4 14h16c0-4.4-3.6-8-8-8S4 9.6 4 14Z" fill="#FFF100" opacity="0.9"/>
    <rect x="3" y="14" width="18" height="3" rx="1" fill="#FFF100"/>
    <path d="M12 6V4M7 8.5 5.5 7M17 8.5l1.5-1.5" stroke="#FFF100" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MavenIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path d="M12 2L4 7v10l8 5 8-5V7L12 2Z" stroke="#C71A36" strokeWidth="1.5" fill="none"/>
    <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#C71A36">M</text>
  </svg>
);

/* -----------------------------------------------------------------------
 * All skills data
 * --------------------------------------------------------------------- */

export const SKILLS: { section: string; sectionColor: string; items: Skill[] }[] = [
  {
    section: "Frontend",
    sectionColor: "#61DAFB",
    items: [
      { name: "React",        colors: ["#61dafb55", "#61dafb33", "#61dafb22"], icon: <ReactIcon /> },
      { name: "TypeScript",   colors: ["#3178c655", "#3178c633", "#3178c622"], icon: <TypeScriptIcon /> },
      { name: "Next.js",      colors: ["#ffffff33", "#ffffff22", "#ffffff11"], icon: <NextJsIcon /> },
      { name: "Tailwind CSS", colors: ["#38bdf855", "#38bdf833", "#38bdf822"], icon: <TailwindIcon /> },
      { name: "Redux",        colors: ["#764abc55", "#764abc33", "#764abc22"], icon: <ReduxIcon /> },
    ],
  },
  {
    section: "Backend (The Core)",
    sectionColor: "#6DB33F",
    items: [
      { name: "Java",                 colors: ["#ea2d2e55", "#ea2d2e33", "#ea2d2e22"], icon: <JavaIcon /> },
      { name: "Spring Boot",          colors: ["#6db33f55", "#6db33f33", "#6db33f22"], icon: <SpringIcon /> },
      { name: "Spring Microservices", colors: ["#6db33f44", "#6db33f22", "#6db33f11"], icon: <SpringIcon /> },
      { name: "Hibernate / JPA",      colors: ["#bcae7955", "#bcae7933", "#bcae7922"], icon: <PostgreSQLIcon /> },
      { name: "PostgreSQL / MySQL",   colors: ["#33679155", "#33679133", "#33679122"], icon: <PostgreSQLIcon /> },
      { name: "MongoDB",              colors: ["#47a24855", "#47a24833", "#47a24822"], icon: <MongoDBIcon /> },
    ],
  },
  {
    section: "Blockchain",
    sectionColor: "#9B9B9B",
    items: [
      { name: "Solidity",        colors: ["#9b9b9b55", "#9b9b9b33", "#9b9b9b22"], icon: <SolidityIcon /> },
      { name: "Smart Contracts", colors: ["#7c7c7c55", "#7c7c7c33", "#7c7c7c22"], icon: <SolidityIcon /> },
      { name: "DApps",           colors: ["#627eea55", "#627eea33", "#627eea22"], icon: <ReactIcon /> },
      { name: "Hardhat",         colors: ["#fff10055", "#fff10033", "#fff10022"], icon: <HardhatIcon /> },
    ],
  },
  {
    section: "Tools & DevOps",
    sectionColor: "#F05032",
    items: [
      { name: "Git",          colors: ["#f0503255", "#f0503233", "#f0503222"], icon: <GitIcon /> },
      { name: "Docker",       colors: ["#2496ed55", "#2496ed33", "#2496ed22"], icon: <DockerIcon /> },
      { name: "AWS",          colors: ["#ff990055", "#ff990033", "#ff990022"], icon: <AWSIcon /> },
      { name: "Kubernetes",   colors: ["#326ce555", "#326ce533", "#326ce522"], icon: <KubernetesIcon /> },
      { name: "Maven / Gradle", colors: ["#c71a3655", "#c71a3633", "#c71a3622"], icon: <MavenIcon /> },
    ],
  },
];

/* -----------------------------------------------------------------------
 * Main exported component
 * --------------------------------------------------------------------- */

export function Component() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">
            What I work with
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Hover over a skill to see the pixel shimmer effect
          </p>
        </div>

        {/* Skill sections */}
        <div className="space-y-14">
          {SKILLS.map((section) => (
            <div key={section.section}>
              <SectionLabel label={section.section} color={section.sectionColor} />
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(140px, 1fr))`,
                }}
              >
                {section.items.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
