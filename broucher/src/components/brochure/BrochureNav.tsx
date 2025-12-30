import { ChevronUp, ChevronDown, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BrochureNavProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
  brochureType?: string;
}

const BrochureNav = ({ currentPage, totalPages, onNavigate, brochureType = "digital-marketing" }: BrochureNavProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const html2pdf = (window as any).html2pdf;
      if (!html2pdf) {
        toast.error("PDF library not loaded. Please refresh the page.");
        return;
      }

      // Get the brochure content (prefer explicit brochure container)
      const element = document.getElementById("brochure-content") || document.documentElement;
      
      // Determine filename based on brochure type
      const filename = brochureType === 'cybersecurity' 
        ? "Cybersecurity-Services-Brochure.pdf"
        : "Digital-Marketing-Services-Brochure.pdf";

      const opt = {
        margin: [0, 0, 0, 0],
        filename: filename,
        image: { type: "jpeg", quality: 0.99 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          orientation: "portrait", 
          unit: "mm", 
          format: "a4",
          compress: true
        },
        pagebreak: { mode: ['css', 'avoid-all', 'legacy'] }
      };

      html2pdf().set(opt).from(element).save();
      toast.success("Brochure downloaded successfully!");
    } catch (error) {
      console.error("Failed to download PDF:", error);
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="fixed right-8 top-8 z-50 flex flex-col items-center gap-3">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="w-10 h-10 rounded-full bg-primary shadow-lg border border-primary flex items-center justify-center text-white hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Download PDF"
          title="Download as PDF"
        >
          <Download size={20} />
        </button>
      </div>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      <button
        onClick={() => onNavigate(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="w-10 h-10 rounded-full bg-card shadow-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronUp size={20} />
      </button>
      
      <div className="flex flex-col gap-2 py-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentPage === i 
                ? "bg-primary scale-125" 
                : "bg-border hover:bg-muted-foreground"
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={() => onNavigate(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className="w-10 h-10 rounded-full bg-card shadow-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronDown size={20} />
      </button>
      </div>
    </>
  );
};

export default BrochureNav;
