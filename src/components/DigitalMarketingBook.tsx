import { useState, useEffect, useImperativeHandle, forwardRef } from "react";

// BookPage Component - Updated Title Section
const BookPage = ({
  title,
  description,
  features,
  gradient,
  stats,
  pageNumber,
  side,
  isTitle = false,
  isVisible = true,
}: any) => {
  if (isTitle) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-2xl shadow-2xl border-2 border-cyan-500/50 ${
          side === "left"
            ? "rounded-l-lg rounded-r-none"
            : "rounded-r-lg rounded-l-none"
        }`}
      >
        <div className="relative h-full flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight px-4"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: "1.5",
              }}
            >
              Digital
              <br />
              Marketing
            </h2>
            <p className="text-cyan-400 text-lg md:text-xl font-light">
              Your Complete Growth Partner
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ... rest of the component remains the same
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-white/5 backdrop-blur-2xl shadow-2xl ${
        side === "left"
          ? "rounded-l-lg rounded-r-none"
          : "rounded-r-lg rounded-l-none"
      }`}
    >
      <div
        className={`absolute inset-0 border-2 border-white/10 ${
          side === "left"
            ? "rounded-l-lg border-r-0"
            : "rounded-r-lg border-l-0"
        }`}
      />

      <div className="relative h-full flex flex-col p-4 md:p-6">
        <div className="absolute top-3 right-3">
          <div
            className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${gradient} backdrop-blur-sm`}
          >
            <span className="text-white text-xs font-semibold">
              {pageNumber.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div
            className={`inline-block h-0.5 w-12 bg-gradient-to-r ${gradient} rounded-full mb-2`}
          />
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1.5 leading-tight">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex-1 space-y-4 mb-1.5 overflow-y-auto scrollbar-thin">
          {features.map((feature: string, index: number) => (
            <div
              key={`${pageNumber}-${index}`}
              className={`flex items-start gap-2 group ${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              <div
                className={`flex-shrink-0 w-4 h-4 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-200 text-xs md:text-sm group-hover:text-white transition-colors duration-300">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 p-3">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10`}
          />
          <div className="relative text-center">
            <div
              className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-0.5`}
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stats.value}
            </div>
            <div className="text-gray-300 text-[10px] uppercase tracking-wider">
              {stats.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const serviceToPageMap: { [key: string]: number } = {
  "seo": 1,
  "search-engine-optimization-seo": 1,
  "ppc": 2,
  "pay-per-click-ppc-google-ads": 2,
  "social-media": 3,
  "social-media-marketing-management": 3,
  "content-marketing": 4,
  "content-marketing-copywriting": 4,
  "email-marketing": 5,
  "email-marketing-campaigns": 5,
  "analytics": 6,
  "website-analytics-reporting": 6,
  "influencer-marketing": 7,
  "branding-online-reputation": 3,
  "video-production-reels": 4,
};

export interface DigitalMarketingBookRef {
  goToPage: (pageIndex: number) => void;
}

// BookFlip Component
export const DigitalMarketingBook = forwardRef<DigitalMarketingBookRef, { initialPage?: number }>(({ initialPage }, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pages = [
    {
      isTitle: true,
      title: "Digital Marketing",
      description: "Your Complete Growth Partner",
    },
    {
      title: "Search Engine Optimization",
      description:
        "Dominate search results and drive organic traffic to your website",
      features: [
        "Keyword research & strategy",
        "On-page optimization",
        "Technical SEO audits",
        "Link building campaigns",
        "Local SEO optimization",
      ],
      gradient: "from-purple-600 to-pink-600",
      stats: { value: "300%", label: "Avg Traffic Growth" },
    },
    {
      title: "Pay-Per-Click Advertising",
      description: "Maximize ROI with targeted paid advertising campaigns",
      features: [
        "Google Ads management",
        "Social media advertising",
        "Display & remarketing",
        "Conversion optimization",
        "Budget management",
      ],
      gradient: "from-blue-600 to-cyan-600",
      stats: { value: "450%", label: "Average ROI" },
    },
    {
      title: "Social Media Marketing",
      description: "Build brand awareness and engage with your audience",
      features: [
        "Content strategy & creation",
        "Community management",
        "Influencer partnerships",
        "Analytics & reporting",
        "Paid social campaigns",
      ],
      gradient: "from-pink-600 to-rose-600",
      stats: { value: "2M+", label: "Audience Reached" },
    },
    {
      title: "Content Marketing",
      description: "Create compelling content that drives engagement",
      features: [
        "Blog writing & strategy",
        "Video production",
        "Infographic design",
        "Email newsletters",
        "Content distribution",
      ],
      gradient: "from-orange-600 to-amber-600",
      stats: { value: "85%", label: "Engagement Rate" },
    },
    {
      title: "Email Marketing",
      description: "Convert leads with personalized email campaigns",
      features: [
        "Campaign design & setup",
        "List segmentation",
        "A/B testing",
        "Automation workflows",
        "Performance analytics",
      ],
      gradient: "from-green-600 to-emerald-600",
      stats: { value: "42%", label: "Open Rate" },
    },
    {
      title: "Analytics & Reporting",
      description: "Data-driven insights to optimize your marketing",
      features: [
        "Custom dashboards",
        "KPI tracking",
        "Conversion analysis",
        "Competitor benchmarking",
        "Monthly reports",
      ],
      gradient: "from-indigo-600 to-purple-600",
      stats: { value: "24/7", label: "Real-time Data" },
    },
    {
      title: "Influencer Marketing",
      description: "Leverage influencer partnerships to amplify your brand",
      features: [
        "Influencer identification",
        "Campaign management",
        "Content collaboration",
        "Performance tracking",
        "ROI measurement",
      ],
      gradient: "from-violet-600 to-fuchsia-600",
      stats: { value: "5X", label: "Brand Reach" },
    },
  ];

  const getSpreadFromPage = (pageIndex: number) => {
    if (isMobile) return pageIndex;
    return Math.floor(pageIndex / 2);
  };

  const [currentSpread, setCurrentSpread] = useState(() => {
    if (initialPage !== undefined && initialPage >= 0 && initialPage < 8) {
      return isMobile ? initialPage : Math.floor(initialPage / 2);
    }
    return 0;
  });
  const [isFlipping, setIsFlipping] = useState(false);
  const [autoFlip, setAutoFlip] = useState(initialPage === undefined);
  const totalSpreads = Math.ceil(pages.length / 2);

  useImperativeHandle(ref, () => ({
    goToPage: (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < pages.length) {
        setAutoFlip(false);
        const targetSpread = getSpreadFromPage(pageIndex);
        if (targetSpread !== currentSpread) {
          setIsFlipping(true);
          setTimeout(() => {
            setCurrentSpread(targetSpread);
            setIsFlipping(false);
          }, 100);
        }
      }
    }
  }));

  useEffect(() => {
    if (initialPage !== undefined && initialPage >= 0 && initialPage < pages.length) {
      const targetSpread = isMobile ? initialPage : Math.floor(initialPage / 2);
      setCurrentSpread(targetSpread);
      setAutoFlip(false);
    }
  }, [initialPage, isMobile, pages.length]);

  useEffect(() => {
    if (!autoFlip) return;
    
    const interval = setInterval(() => {
      nextSpread();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSpread, isMobile, autoFlip]);

  const nextSpread = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      if (isMobile) {
        setCurrentSpread((prev) => (prev + 1) % pages.length);
      } else {
        setCurrentSpread((prev) => (prev + 1) % totalSpreads);
      }
      setIsFlipping(false);
    }, 1200);
  };

  const prevSpread = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      if (isMobile) {
        setCurrentSpread((prev) => (prev - 1 + pages.length) % pages.length);
      } else {
        setCurrentSpread((prev) => (prev - 1 + totalSpreads) % totalSpreads);
      }
      setIsFlipping(false);
    }, 1200);
  };

  const goToSpread = (spreadIndex: number) => {
    if (isFlipping || spreadIndex === currentSpread) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpread(spreadIndex);
      setIsFlipping(false);
    }, 1200);
  };

  // For mobile: currentSpread is the page index
  // For desktop: currentSpread is the spread index
  const leftPageIndex = isMobile ? currentSpread : currentSpread * 2;
  const rightPageIndex = currentSpread * 2 + 1;
  const leftPage = pages[leftPageIndex];
  const rightPage =
    rightPageIndex < pages.length ? pages[rightPageIndex] : null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <style>{`
        .book-container {
          perspective: 2500px;
          perspective-origin: center;
        }

        .book {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .page {
          position: absolute;
          transform-style: preserve-3d;
          transform-origin: left center;
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
          backface-visibility: hidden;
        }

        .page-front,
        .page-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .page-front {
          transform: rotateY(0deg);
        }

        .page-back {
          transform: rotateY(180deg);
        }

        .page.flipping {
          animation: realistic-flip 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          z-index: 10;
        }

        @keyframes realistic-flip {
          0% {
            transform: rotateY(0deg) translateZ(0px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          }
          25% {
            transform: rotateY(-45deg) translateZ(50px);
            box-shadow: -20px 10px 60px rgba(0,0,0,0.5);
          }
          50% {
            transform: rotateY(-90deg) translateZ(60px);
            box-shadow: -30px 10px 70px rgba(0,0,0,0.6);
          }
          75% {
            transform: rotateY(-135deg) translateZ(50px);
            box-shadow: -20px 10px 60px rgba(0,0,0,0.5);
          }
          100% {
            transform: rotateY(-180deg) translateZ(0px);
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          }
        }

        .page-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to left, 
            rgba(0,0,0,0.4) 0%, 
            rgba(0,0,0,0.1) 20%, 
            transparent 50%);
          opacity: 0;
          transition: opacity 0.8s;
          pointer-events: none;
        }

        .page.flipping .page-shadow {
          opacity: 1;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .book-spine {
          background: linear-gradient(90deg, 
            rgba(0,0,0,0.3) 0%, 
            rgba(0,0,0,0.1) 10%,
            rgba(255,255,255,0.1) 50%,
            rgba(0,0,0,0.1) 90%,
            rgba(0,0,0,0.3) 100%);
          box-shadow: 
            inset 3px 0 8px rgba(0,0,0,0.5),
            inset -3px 0 8px rgba(0,0,0,0.5),
            0 0 15px rgba(0,0,0,0.3);
        }

        .page-edge {
          position: absolute;
          top: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom,
            rgba(255,255,255,0.3) 0%,
            rgba(255,255,255,0.1) 50%,
            rgba(255,255,255,0.3) 100%);
        }

        .page-edge-left {
          left: 0;
        }

        .page-edge-right {
          right: 0;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }

        .book-shadow {
          position: absolute;
          bottom: -20px;
          left: 5%;
          width: 90%;
          height: 30px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%);
          filter: blur(15px);
          z-index: -1;
        }
      `}</style>

      <div className="book-container">
        {/* Mobile View - Single Page */}
        <div
          className="md:hidden relative w-full max-w-md mx-auto"
          style={{ aspectRatio: "3/4", maxHeight: "500px" }}
        >
          <div className="relative w-full h-full">
            <div className="relative h-full shadow-2xl rounded-lg">
              <BookPage
                {...leftPage}
                pageNumber={leftPageIndex + 1}
                totalPages={pages.length}
                side="left"
                isVisible={true}
              />
            </div>
          </div>
        </div>

        {/* Desktop View - Two Pages */}
        <div
          className="hidden md:block relative w-full max-w-5xl mx-auto"
          style={{ aspectRatio: "2/1", maxHeight: "480px" }}
        >
          <div className="relative w-full h-full book">
            {/* Book Shadow */}
            <div className="book-shadow" />

            {/* Left Page (Static) */}
            <div className="absolute left-0 w-1/2 h-full" style={{ zIndex: 1 }}>
              <div className="relative h-full shadow-2xl">
                <BookPage
                  {...leftPage}
                  pageNumber={leftPageIndex + 1}
                  totalPages={pages.length}
                  side="left"
                  isVisible={true}
                />
                <div className="page-edge page-edge-right" />
              </div>
            </div>

            {/* Book Spine */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-full book-spine"
              style={{ zIndex: 5 }}
            />

            {/* Right Page (Flipping) */}
            <div
              className={`page absolute left-1/2 w-1/2 h-full ${isFlipping ? "flipping" : ""}`}
              style={{
                transformOrigin: "left center",
                zIndex: isFlipping ? 10 : 2,
              }}
            >
              {/* Front of page (current right page) */}
              <div className="page-front absolute w-full h-full">
                <div className="relative h-full shadow-2xl">
                  {rightPage ? (
                    <BookPage
                      {...rightPage}
                      pageNumber={rightPageIndex + 1}
                      totalPages={pages.length}
                      side="right"
                      isVisible={true}
                    />
                  ) : (
                    <div className="relative h-full w-full bg-white/5 backdrop-blur-2xl rounded-r-lg border-2 border-white/10 border-l-0 flex items-center justify-center">
                      <div className="text-white/30 text-2xl font-light">
                        End
                      </div>
                    </div>
                  )}
                  <div className="page-edge page-edge-left" />
                </div>
                <div className="page-shadow" />
              </div>

              {/* Back of page (next left page) */}
              <div className="page-back absolute w-full h-full">
                <div className="relative h-full shadow-2xl">
                  {pages[leftPageIndex + 2] && (
                    <BookPage
                      {...pages[leftPageIndex + 2]}
                      pageNumber={leftPageIndex + 3}
                      totalPages={pages.length}
                      side="left"
                      isVisible={false}
                    />
                  )}
                  <div className="page-edge page-edge-right" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prevSpread}
            disabled={isFlipping}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {[...Array(isMobile ? pages.length : totalSpreads)].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSpread(index)}
                  disabled={isFlipping}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSpread
                      ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ),
            )}
          </div>

          <button
            onClick={nextSpread}
            disabled={isFlipping}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-white/60 text-sm">
            <span className="md:hidden">
              Page {leftPageIndex + 1} of {pages.length}
            </span>
            <span className="hidden md:inline">
              Pages {leftPageIndex + 1} -{" "}
              {rightPage ? rightPageIndex + 1 : leftPageIndex + 1} of{" "}
              {pages.length}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
});
