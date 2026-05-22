import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

/* ─────────────────────────────────────────────
   Category data — 4 cards
   ───────────────────────────────────────────── */
interface Category {
  emoji: string;
  hueA: number;
  hueB: number;
  title: string;
  subtitle: string;
  skills: string[];
}

const categories: Category[] = [
  {
    emoji: "🖥️",
    hueA: 200,
    hueB: 240,
    title: "Frontend",
    subtitle: "UI & Client-side",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Redux",
    ],
  },
  {
    emoji: "⚙️",
    hueA: 100,
    hueB: 150,
    title: "Backend",
    subtitle: "The Core",
    skills: [
      "Java (Core & Advanced)",
      "Spring Boot",
      "Spring Microservices",
      "Hibernate / JPA",
      "PostgreSQL / MySQL",
      "MongoDB",
    ],
  },
  {
    emoji: "⛓️",
    hueA: 260,
    hueB: 300,
    title: "Blockchain",
    subtitle: "Web3 & Smart Contracts",
    skills: [
      "Solidity",
      "Smart Contracts",
      "DApps",
      "Hardhat / Foundry",
    ],
  },
  {
    emoji: "🛠️",
    hueA: 20,
    hueB: 50,
    title: "Tools & DevOps",
    subtitle: "Build & Deploy",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Kubernetes",
      "Maven / Gradle",
    ],
  },
];

/* ─────────────────────────────────────────────
   Card variants
   ───────────────────────────────────────────── */
const cardVariants: Variants = {
  offscreen: { y: 300 },
  onscreen: {
    y: 60,
    rotate: -6,
    transition: { type: "spring", bounce: 0.35, duration: 0.9 },
  },
};

const hue = (h: number) => `hsl(${h}, 88%, 55%)`;

/* ─────────────────────────────────────────────
   Individual category card
   ───────────────────────────────────────────── */
function CategoryCard({
  cat,
  i,
}: {
  cat: Category;
  i: number;
}) {
  const background = `linear-gradient(306deg, ${hue(cat.hueA)}, ${hue(cat.hueB)})`;

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.5 }}
    >
      {/* Splash */}
      <div style={{ ...splash, background }} />

      {/* Card face */}
      <motion.div style={card} variants={cardVariants}>
        {/* Header */}
        <div style={cardHeader}>
          <span style={{ fontSize: 48, lineHeight: 1 }}>{cat.emoji}</span>
          <div>
            <h3 style={cardTitle}>{cat.title}</h3>
            <p style={cardSubtitle}>{cat.subtitle}</p>
          </div>
        </div>

        {/* Divider */}
        <div style={divider} />

        {/* Skill pills */}
        <div style={pillGrid}>
          {cat.skills.map((skill) => (
            <span key={skill} style={pill}>
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Exported component
   ───────────────────────────────────────────── */
export function ScrollTriggered() {
  return (
    <div style={outerContainer}>
      {/* Section heading */}
      <div style={headingBlock}>
        <p style={eyebrow}>What I work with</p>
        <h1 style={heading}>
          Skills &amp;{" "}
          <span
            style={{
              background: "linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Technologies
          </span>
        </h1>
        <p style={subheading}>Scroll to explore each category</p>
      </div>

      {/* Cards */}
      <div style={container}>
        {categories.map((cat, i) => (
          <CategoryCard key={cat.title} cat={cat} i={i} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Styles
   ───────────────────────────────────────────── */
const outerContainer: React.CSSProperties = {
  background: "#000",
  minHeight: "100vh",
  width: "100%",
};

const headingBlock: React.CSSProperties = {
  textAlign: "center",
  paddingTop: "6rem",
  paddingBottom: "1rem",
};

const eyebrow: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: "0.75rem",
};

const heading: React.CSSProperties = {
  fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
  fontWeight: 900,
  color: "#fff",
  margin: 0,
  lineHeight: 1.1,
};

const subheading: React.CSSProperties = {
  marginTop: "0.75rem",
  color: "rgba(255,255,255,0.35)",
  fontSize: "0.95rem",
};

const container: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 540,
  paddingBottom: 220,
  width: "100%",
};

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -150,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
  width: 360,
  minHeight: 340,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  borderRadius: 24,
  background: "#111",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow:
    "0 0 2px hsl(0 0% 0%/.15), 0 0 8px hsl(0 0% 0%/.1), 0 0 32px hsl(0 0% 0%/.15)",
  transformOrigin: "10% 60%",
  padding: "1.75rem",
  gap: "1rem",
};

const cardHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const cardTitle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 800,
  color: "#fff",
  margin: 0,
  lineHeight: 1.2,
};

const cardSubtitle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "rgba(255,255,255,0.4)",
  margin: "0.2rem 0 0",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const divider: React.CSSProperties = {
  height: 1,
  background: "rgba(255,255,255,0.08)",
  borderRadius: 1,
};

const pillGrid: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const pill: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.85)",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 999,
  padding: "0.35rem 0.85rem",
  whiteSpace: "nowrap",
};
