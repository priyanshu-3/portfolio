import { ScrollSection } from "@/components/ScrollSection";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function CallToActionSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#101010" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <ScrollSection className="py-32 px-6 relative overflow-hidden">
      {/* Optional background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
          Book Your Free Session — <br className="hidden md:block" />
          Power Up Your Project's Future
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light">
          I bring big ideas to life with clear, sharp, meaningful design 
          and craft them with expert, purposeful development.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/contact"
            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start a project
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <button
            data-cal-link="priyanshu_3"
            data-cal-config='{"layout":"month_view"}'
            className="flex items-center gap-2 px-8 py-4 border border-border bg-card rounded-full text-lg font-medium hover:bg-accent transition-all hover:scale-105 shadow-sm cursor-pointer"
          >
            <Phone className="w-5 h-5" />
            Schedule a call
          </button>
        </div>
      </div>
    </ScrollSection>
  );
}
