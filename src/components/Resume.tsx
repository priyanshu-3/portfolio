import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import DownloadButton from "@/components/ui/button-download";
import { useState } from "react";

export function ResumeSection() {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "downloaded" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    if (downloadStatus !== "idle") return;

    setDownloadStatus("downloading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setDownloadStatus("downloaded");
          return 100;
        }
        return prevProgress + 5;
      });
    }, 200);

    // Show 'Downloaded' state for 1.5 seconds
    setTimeout(() => {
      setDownloadStatus("complete");
    }, 4000 + 1500);

    // Reset to idle state after download completes
    setTimeout(() => {
      setDownloadStatus("idle");
      setProgress(0);
    }, 4000 + 1500 + 100);

    // Trigger actual download
    const link = document.createElement("a");
    link.href = "/PriyanshuResume.pdf";
    link.download = "PriyanshuResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-20">
      <ContainerScroll
        titleComponent={
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Resume</span>
            </h1>
            <DownloadButton
              downloadStatus={downloadStatus}
              progress={progress}
              onClick={handleDownload}
              className="hover:shadow-xl transition-shadow duration-300 pointer-events-auto"
            />
          </div>
        }
      >
        <iframe
          src="/PriyanshuResume.pdf#view=FitH&zoom=page-width"
          className="w-full h-full rounded-lg"
          title="Priyanshu Mehra Resume"
        />
      </ContainerScroll>
    </section>
  );
}

