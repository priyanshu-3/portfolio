import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Skill items — logo from devicons CDN + label
   ───────────────────────────────────────────── */
const row1 = [
  { id: 'react',      label: 'React',              logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { id: 'ts',         label: 'TypeScript',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { id: 'nextjs',     label: 'Next.js',             logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { id: 'tailwind',   label: 'Tailwind CSS',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { id: 'redux',      label: 'Redux',               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
  { id: 'java',       label: 'Java',                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { id: 'spring',     label: 'Spring Boot',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { id: 'micro',      label: 'Microservices',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { id: 'hibernate',  label: 'Hibernate / JPA',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-plain.svg' },
  { id: 'pg',         label: 'PostgreSQL',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { id: 'mysql',      label: 'MySQL',               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
];

const row2 = [
  { id: 'mongo',      label: 'MongoDB',             logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { id: 'solidity',   label: 'Solidity',            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg' },
  { id: 'contracts',  label: 'Smart Contracts',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ethereum/ethereum-original.svg' },
  { id: 'dapps',      label: 'DApps',               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ethereum/ethereum-original.svg' },
  { id: 'hardhat',    label: 'Hardhat / Foundry',   logo: 'https://cdn.simpleicons.org/hardhat/F7DF1E' },
  { id: 'git',        label: 'Git',                 logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { id: 'docker',     label: 'Docker',              logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { id: 'aws',        label: 'AWS',                 logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { id: 'k8s',        label: 'Kubernetes',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
  { id: 'maven',      label: 'Maven / Gradle',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg' },
];

/* ─────────────────────────────────────────────
   Single skill chip
   ───────────────────────────────────────────── */
function SkillChip({ label, logo }: { label: string; logo: string }) {
  return (
    <div className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 cursor-default select-none">
      <img
        src={logo}
        alt={label}
        className="h-6 w-6 object-contain"
        loading="lazy"
      />
      <span className="text-sm font-semibold text-white/75 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Exported section
   ───────────────────────────────────────────── */
export function SkillsSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-24">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[160px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[160px]"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/35">
            What I work with
          </p>
          <h1 className="mb-3 text-5xl font-black tracking-tight text-white md:text-6xl">
            Skills &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h1>
          <p className="text-base text-white/40">
            A full-stack toolkit from UI to blockchain
          </p>
        </motion.div>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative mb-5 h-[68px] w-full overflow-hidden">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={35}
          durationOnHover={80}
          gap={14}
        >
          {row1.map((skill) => (
            <SkillChip key={skill.id} label={skill.label} logo={skill.logo} />
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
          direction="left"
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
          direction="right"
          blurIntensity={0.8}
        />
      </div>

      {/* Row 2 — right to left */}
      <div className="relative h-[68px] w-full overflow-hidden">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={30}
          durationOnHover={80}
          gap={14}
          reverse
        >
          {row2.map((skill) => (
            <SkillChip key={skill.id} label={skill.label} logo={skill.logo} />
          ))}
        </InfiniteSlider>

        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
          direction="left"
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
          direction="right"
          blurIntensity={0.8}
        />
      </div>
    </section>
  );
}
