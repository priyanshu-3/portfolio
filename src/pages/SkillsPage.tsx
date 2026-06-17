import { ScrollSection } from "@/components/ScrollSection";
import { SkillSectionBlock } from "@/components/ui/team-section-block-shadcnui";

export function SkillsPage() {
  return (
    <ScrollSection id="skills" className="bg-black min-h-screen">
      <SkillSectionBlock />
    </ScrollSection>
  );
}
