import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { ScrollSection } from "@/components/ScrollSection";
import ContributionSkyline, { type ContributionDay } from "@/components/ui/contribution-skyline";

const GITHUB_USER = "priyanshu-3";

export function GitHubContributions() {
  const [data, setData] = useState<ContributionDay[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: { contributions: ContributionDay[] }) => {
        if (!cancelled) setData(json.contributions.map(({ date, count }) => ({ date, count })));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ScrollSection id="github" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">GitHub Activity</h2>
        <p className="text-muted-foreground text-center mb-12">
          A year of commits, PRs and reviews — switch to 3D and drag to orbit.
        </p>

        {data ? (
          <ContributionSkyline data={data} />
        ) : (
          <div className="rounded-xl border border-border h-64 flex items-center justify-center text-muted-foreground">
            {failed ? (
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                View my contributions on GitHub
              </a>
            ) : (
              <span className="loader" />
            )}
          </div>
        )}
      </div>
    </ScrollSection>
  );
}
