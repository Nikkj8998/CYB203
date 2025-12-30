import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ServiceData {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string;
}

const services: ServiceData[] = [
  {
    number: 1,
    title: "Search Engine Optimization (SEO)",
    subtitle: "Higher rankings, steady organic leads, lower CAC",
    description: "Keyword & intent research, technical SEO, on-page optimization, internal links, schema markup, local SEO (GMB), link earning, content hubs, Core Web Vitals optimization.",
    deliverables: "Audit, 3–6-mo roadmap, page briefs, content calendar, monthly reports."
  },
  {
    number: 2,
    title: "Social Media Marketing & Management",
    subtitle: "Awareness, engagement, assisted conversions",
    description: "Content strategy, editorial calendar, creatives/reels production, community management, influencer collaborations, social listening, UTM tracking.",
    deliverables: "12–20 posts/month, captions/hashtags, community replies, monthly insights."
  },
  {
    number: 3,
    title: "Pay-Per-Click (PPC) & Google Ads",
    subtitle: "Immediate, qualified traffic and measurable ROAS",
    description: "Search campaigns, Performance Max, Display ads, Remarketing, YouTube advertising, call-only campaigns; negative keyword strategy; landing-page CRO.",
    deliverables: "Account build/restructure, A/B tests, weekly optimizations, live dashboards."
  },
  {
    number: 4,
    title: "Content Marketing & Copywriting",
    subtitle: "Authority, organic demand capture, improved conversion",
    description: "Topic clusters, blog posts, comprehensive guides, case studies, lead magnets, website & ad copy, video scripts.",
    deliverables: "Editorial calendar, brand voice guidelines, on-page SEO, compelling CTAs."
  },
  {
    number: 5,
    title: "Email Marketing Campaigns & Automation",
    subtitle: "Nurture → pipeline → revenue",
    description: "List growth tactics, audience segmentation, drip/journey flows, cart & churn recovery, deliverability optimization, UTM + revenue attribution.",
    deliverables: "Automated flows (welcome, nurture, win-back), monthly campaigns, performance reports."
  },
  {
    number: 6,
    title: "Branding & Online Reputation Management",
    subtitle: "Consistent brand identity, trust building, higher conversion",
    description: "Brand messaging development, visual system design, review generation, issue handling, listings cleanup, PR mentions.",
    deliverables: "Brand kit, response playbooks, review cadence, sentiment reporting."
  },
  {
    number: 7,
    title: "Website Analytics & Reporting",
    subtitle: "Single source of truth for performance",
    description: "GA4/Tag Manager setup, event schema configuration, conversion funnels, dashboards (Looker/Data Studio), MMM insights, LTV/CAC analysis.",
    deliverables: "Tracking documentation, custom dashboards, monthly insights & experiments."
  }
];

export const MagazineCards = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flippedPages, setFlippedPages] = useState<number[]>([]);

  useEffect(() => {
    const totalPages = services.length + 1; // +1 for cover page
    const flipPage = (index: number) => {
      if (index < totalPages) {
        setTimeout(() => {
          setFlippedPages(prev => [...prev, index]);
          setCurrentPage(index + 1);
          
          if (index < totalPages - 1) {
            flipPage(index + 1);
          } else {
            setTimeout(() => {
              setFlippedPages([]);
              setCurrentPage(0);
              setTimeout(() => flipPage(0), 1500);
            }, 3000);
          }
        }, 2500);
      }
    };

    const timer = setTimeout(() => {
      flipPage(0);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-20 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">
      <style>
        {`
          .magazine-container {
            perspective: 2000px;
            position: relative;
            width: 800px;
            height: 600px;
            max-width: 95vw;
            max-height: 80vh;
            display: flex;
          }

          .book {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            display: flex;
          }

          .left-blank {
            width: 50%;
            height: 100%;
            background: transparent;
          }

          .right-pages {
            width: 50%;
            height: 100%;
            position: relative;
          }

          .page {
            position: absolute;
            width: 100%;
            height: 100%;
            right: 0;
            transform-origin: left center;
            transform-style: preserve-3d;
            transition: transform 2s cubic-bezier(0.645, 0.045, 0.355, 1);
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
          }

          .page.flipped {
            transform: rotateY(-180deg);
          }

          .page-front, .page-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            background: #000000;
            padding: 30px;
            overflow: hidden;
            border: 3px solid #0EA5E9;
          }

          .page-back {
            transform: rotateY(180deg);
          }

          .cover {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            color: #0EA5E9;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }

          .cover h1 {
            font-size: 3em;
            font-weight: bold;
            margin-bottom: 20px;
          }

          .cover p {
            font-size: 1.2em;
            color: #38BDF8;
          }

          .service-page {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .service-page h2 {
            color: #0EA5E9;
            font-size: 1.3em;
            border-bottom: 3px solid #0EA5E9;
            padding-bottom: 8px;
            margin-bottom: 8px;
          }

          .service-page h3 {
            color: #38BDF8;
            font-size: 1em;
            font-style: italic;
            margin-bottom: 8px;
          }

          .service-page p {
            color: #BAE6FD;
            line-height: 1.5;
            margin-bottom: 6px;
            font-size: 0.9em;
          }

          .service-page strong {
            color: #0EA5E9;
            display: block;
            margin-top: 10px;
            margin-bottom: 4px;
          }

          .page-number {
            position: absolute;
            bottom: 20px;
            right: 40px;
            font-size: 0.9em;
            color: #0EA5E9;
          }

          .progress-indicator {
            position: absolute;
            bottom: -60px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 1000;
          }

          .progress-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(14, 165, 233, 0.3);
            transition: all 0.5s;
          }

          .progress-dot.active {
            background: #0EA5E9;
            width: 30px;
            border-radius: 5px;
          }

          @media (max-width: 768px) {
            .magazine-container {
              width: 100%;
              max-width: 400px;
            }

            .left-blank {
              display: none;
            }

            .right-pages {
              width: 100%;
            }

            .cover h1 {
              font-size: 2em;
            }

            .cover p {
              font-size: 1em;
            }

            .service-page h2 {
              font-size: 1.1em;
            }
            
            .service-page h3 {
              font-size: 0.9em;
            }
            
            .service-page p {
              font-size: 0.8em;
            }
            
            .page-front, .page-back {
              padding: 20px;
            }
            
            .progress-indicator {
              bottom: -50px;
            }
          }
        `}
      </style>

      <div className="magazine-container">
        <div className="book">
          {/* Blank Left Side */}
          <div className="left-blank"></div>

          {/* Right Side - Cover Page + Service Pages */}
          <div className="right-pages">
            {/* Cover Page */}
            <div className={`page ${flippedPages.includes(0) ? 'flipped' : ''}`} style={{ zIndex: services.length + 1 }}>
              <div className="page-front cover">
                <h1>Digital Marketing</h1>
                <p>Your Complete Growth Partner</p>
              </div>
              <div className="page-back"></div>
            </div>

            {/* Service Pages 1-7 */}
            {services.map((service, idx) => {
              const pageIndex = idx + 1; // +1 because cover is index 0
              
              return (
                <div key={service.number} className={`page ${flippedPages.includes(pageIndex) ? 'flipped' : ''}`} style={{ zIndex: services.length - idx }}>
                  <div className="page-front service-page">
                    <h2>{service.number}. {service.title}</h2>
                    <h3>{service.subtitle}</h3>
                    <p>{service.description}</p>
                    <strong>Deliverables:</strong>
                    <p>{service.deliverables}</p>
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-4 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white hover:opacity-90 font-semibold"
                      onClick={() =>
                        window.open(
                          "https://cybaemtech.com/Digital%20Marketing%20deck.pdf",
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Learn more
                    </Button>
                    <span className="page-number">{service.number}</span>
                  </div>
                  <div className="page-back"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="progress-indicator">
        {[...Array(services.length + 1)].map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${currentPage === index ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};
