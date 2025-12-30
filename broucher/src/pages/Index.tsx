import { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Share2, 
  MousePointerClick, 
  FileText, 
  Mail, 
  Code,
  Shield,
  Lock,
  AlertTriangle,
  Eye,
  HardDrive,
  BarChart3,
  Search as SearchIcon,
  Users,
  Phone,
  ArrowRight
} from "lucide-react";

import CoverPage from "@/components/brochure/CoverPage";
import ServicePage from "@/components/brochure/ServicePage";
import CTAPage from "@/components/brochure/CTAPage";
import BrochureNav from "@/components/brochure/BrochureNav";
import Logo from "@/components/brochure/Logo";

/* ---------------- SERVICES DATA ---------------- */

const digitalMarketingServices = [
  {
    step: 1,
    title: "Search Engine Optimization (SEO)",
    icon: Search,
    items: [
      "Website Audit & Analysis",
      "Keyword Research",
      "AEO, GEO, SXO",
      "On-Page SEO",
      "Technical SEO",
      "Off-Page SEO",
      "Local SEO",
      "Content Optimization",
      "Analytics & Reporting"
    ]
  },
  {
    step: 2,
    title: "Social Media Marketing (SMM)",
    icon: Share2,
    items: [
      "Social Media Strategy Development",
      "Content Creation & Design",
      "Social Media Account Management (Facebook, Instagram, LinkedIn, X, and more)",
      "Community Engagement",
      "Paid Social Advertising",
      "Analytics & Performance Tracking",
      "Influencer Collaboration (Optional)"
    ]
  },
  {
    step: 3,
    title: "Pay-Per-Click (PPC) Advertising",
    icon: MousePointerClick,
    items: [
      "Campaign Strategy & Planning",
      "Search Ads (Google & Bing Ads)",
      "Retargeting & Remarketing Campaigns",
      "Shopping Ads (E-commerce)",
      "Social Media Paid Ads",
      "Ad Copywriting & Creative Design",
      "Landing Page Optimization",
      "Ongoing Campaign Optimization",
      "Analytics & Reporting"
    ]
  },
  {
    step: 4,
    title: "Content Marketing",
    icon: FileText,
    items: [
      "Content Strategy & Planning",
      "Blog Writing & Articles",
      "Website Copywriting",
      "Social Media Content",
      "Infographics & Visual Content",
      "Video Content",
      "E-books, Whitepapers & Case Studies",
      "Email Content & Newsletters",
      "Content Optimization & SEO",
      "Content Performance Reporting"
    ]
  },
  {
    step: 5,
    title: "Email Marketing",
    icon: Mail,
    items: [
      "Email Campaign Strategy",
      "Email Design & Copywriting",
      "Email Automation & Workflows",
      "Newsletters",
      "Lead Nurturing & Customer Retention",
      "A/B Testing & Optimization",
      "List Management & Growth",
      "Analytics & Reporting"
    ]
  },
  {
    step: 6,
    title: "Web Design, CRO & Development",
    icon: Code,
    items: [
      "Custom Website Design",
      "Landing Page Design",
      "Website Redesign",
      "Speed & Performance Optimization",
      "SEO-Friendly Development",
      "UX & Heatmap Analysis",
      "Form Optimization",
      "Call-to-Action (CTA) Improvement",
      "Analytics & Reporting"
    ]
  }
];

const cybersecurityServices = [
  {
    step: 1,
    title: "VAPT Assessment",
    icon: Shield,
    items: [
      "Vulnerability Assessment & Penetration Testing",
      "Security Posture Reports",
      "Remediation Recommendations",
      "Compliance Validation",
      "Regular Security Testing"
    ]
  },
  {
    step: 2,
    title: "Endpoint Security",
    icon: Lock,
    items: [
      "Advanced Anti-Malware Protection",
      "Endpoint Detection & Response (EDR)",
      "Device Control & Management",
      "Behavior-Based Threat Detection",
      "Automated Threat Remediation"
    ]
  },
  {
    step: 3,
    title: "Firewall & IDS/IPS",
    icon: AlertTriangle,
    items: [
      "Enterprise-Grade Firewalls",
      "Intrusion Detection Systems",
      "Real-Time Threat Monitoring",
      "Automated Threat Response",
      "Network Segmentation"
    ]
  },
  {
    step: 4,
    title: "Email Security",
    icon: Mail,
    items: [
      "AI-Powered Threat Detection",
      "Anti-Phishing Protection",
      "Advanced Malware Filtering",
      "Encryption & Data Loss Prevention",
      "Email Threat Intelligence"
    ]
  },
  {
    step: 5,
    title: "Encryption & Backup",
    icon: HardDrive,
    items: [
      "Military-Grade AES-256 Encryption",
      "Secure Cloud Backup Solutions",
      "Rapid Disaster Recovery",
      "Data Protection at Rest & In Transit",
      "Compliance-Ready Backup"
    ]
  },
  {
    step: 6,
    title: "SIEM & SOC Monitoring",
    icon: BarChart3,
    items: [
      "Advanced Security Analytics",
      "24/7 Real-Time Log Analysis",
      "Threat Correlation & Detection",
      "Security Intelligence Feeds",
      "Automated Incident Response"
    ]
  },
  {
    step: 7,
    title: "Threat Hunting",
    icon: SearchIcon,
    items: [
      "Proactive Threat Hunting",
      "Forensic Analysis & Investigation",
      "Rapid Incident Response",
      "Threat Containment",
      "Post-Incident Reporting"
    ]
  },
  {
    step: 8,
    title: "Compliance Management",
    icon: Eye,
    items: [
      "ISO 27001 Compliance",
      "GDPR & HIPAA Support",
      "Gap Assessments & Audits",
      "Policy Development",
      "Continuous Compliance Monitoring"
    ]
  },
  {
    step: 9,
    title: "User Awareness Training",
    icon: Users,
    items: [
      "Interactive Security Training",
      "Simulated Phishing Campaigns",
      "Security Best Practices Education",
      "Compliance Training Programs",
      "Ongoing Support & Updates"
    ]
  }
];

/* ---------------- COVER PAGE ---------------- */

const CybersecurityCoverPage = () => (
  <section className="page min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-12 bg-gradient-subtle relative overflow-hidden">
    <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">

      {/* ✅ FIXED LOGO */}
      <div className="mb-6 md:mb-8 lg:mb-10 flex justify-center">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Cybaem Tech"
          className="h-16 md:h-20 lg:h-24 w-auto object-contain"
        />
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
        Cybersecurity Services
      </h1>

      <p className="text-lg md:text-xl lg:text-2xl mb-8">
        Complete. Comprehensive. Protective.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 text-sm md:text-base">
        <a href="mailto:sales@cybaemtech.com" className="flex items-center gap-2">
          <Mail size={16} /> sales@cybaemtech.com
        </a>
        <a href="tel:+919028541383" className="flex items-center gap-2">
          <Phone size={16} /> +91 90285 41383
        </a>
      </div>
    </div>
  </section>
);

/* ---------------- CTA PAGE ---------------- */

const CybersecurityCTAPage = () => (
  <section className="page min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-12 bg-gradient-hero">
    <div className="text-center max-w-4xl">

      {/* ✅ Logo component already fixed */}
      <Logo variant="light" className="mb-6 md:mb-8 scale-90 md:scale-100 lg:scale-110" />

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        Ready to Secure Your Business?
      </h2>

      <button className="px-6 py-3 bg-white text-black rounded-full text-base md:text-lg font-semibold inline-flex items-center gap-2">
        Schedule Assessment <ArrowRight size={18} />
      </button>
    </div>
  </section>
);

/* ---------------- MAIN INDEX ---------------- */

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const params = new URLSearchParams(window.location.search);
  const brochureType = params.get("type");
  const services = brochureType === "cybersecurity" ? cybersecurityServices : digitalMarketingServices;
  const totalPages = services.length + 2;

  useEffect(() => {
    const handleScroll = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let closest = 0;
      let min = Infinity;

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(el.offsetTop + el.offsetHeight / 2 - center);
        if (d < min) {
          min = d;
          closest = i;
        }
      });

      setCurrentPage(closest);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="brochure-content">
      <BrochureNav
        currentPage={currentPage}
        totalPages={totalPages}
        onNavigate={(p) => sectionRefs.current[p]?.scrollIntoView({ behavior: "smooth" })}
        brochureType={brochureType || "digital-marketing"}
      />

      <div ref={(el) => (sectionRefs.current[0] = el)}>
        {brochureType === "cybersecurity" ? <CybersecurityCoverPage /> : <CoverPage />}
      </div>

      {services.map((service, i) => (
        <div key={service.step} ref={(el) => (sectionRefs.current[i + 1] = el)}>
          <ServicePage {...service} isEven={i % 2 === 1} />
        </div>
      ))}

      <div ref={(el) => (sectionRefs.current[services.length + 1] = el)}>
        {brochureType === "cybersecurity" ? <CybersecurityCTAPage /> : <CTAPage />}
      </div>
    </div>
  );
};

export default Index;
