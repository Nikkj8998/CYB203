import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Globe, Menu, ChevronRight, Share2, Shield, Laptop, Network, Cloud, Briefcase, Code, UsersRound, Brain, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string>("digital-marketing");
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutUsRef.current && !aboutUsRef.current.contains(event.target as Node)) {
        setAboutUsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAboutUsMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setAboutUsOpen(false);
    }, 100);
  };

  const handleAboutUsMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setAboutUsOpen(true);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResourcesClick = (e: React.MouseEvent) => {
    if (location.pathname === "/resources") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMenuItemClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serviceCategories = [
    {
      id: "digital-marketing",
      name: "Digital Marketing Services",
      icon: Share2,
      path: "/digital-marketing",
      services: [
        { name: "Search Engine Optimization (SEO)", hash: "search-engine-optimization-seo" },
        { name: "Pay-Per-Click (PPC) & Google Ads", hash: "pay-per-click-ppc-google-ads" },
        { name: "Email Marketing Campaigns", hash: "email-marketing-campaigns" },
        { name: "Website Analytics & Reporting", hash: "website-analytics-reporting" },
        { name: "Social Media Marketing & Management", hash: "social-media-marketing-management" },
        { name: "Content Marketing & Copywriting", hash: "content-marketing-copywriting" },
        { name: "Branding & Online Reputation", hash: "branding-online-reputation" },
        { name: "Influencer Marketing", hash: "influencer-marketing" },
        { name: "Video Production / Reels", hash: "video-production-reels" },
      ]
    },
    {
      id: "cloud-hosting",
      name: "Cloud, Hosting & Microsoft 365",
      icon: Cloud,
      path: "/cloud-solutions",
      services: [],
      threeColumnServices: {
        column1: {
          title: "Cloud Services",
          items: [
            "Cloud Architecture & Deployment",
            "Cloud Migration",
            "Hybrid & Multi-Cloud Solutions",
            "Managed Cloud Services",
            "Cloud Security",
            "Auto-Scaling & High Availability",
          ]
        },
        column2: {
          title: "Web & Hosting Services",
          items: [
            "Web & Email Hosting",
            "VPS & Dedicated Hosting",
            "Cloud Infrastructure (Azure, AWS, GCP)",
            "Backup & Disaster Recovery",
            "Domain Registration & SSL",
          ]
        },
        column3: {
          title: "Microsoft 365 / Office 365",
          items: [
            "Microsoft 365 Licensing & Setup",
            "Email Migration",
            "SharePoint & OneDrive Setup",
            "Teams Implementation & Training",
            "Data Security & Compliance",
            "Ongoing M365 Admin & Support",
          ]
        }
      }
    },
    {
      id: "ai-analytics",
      name: "AI and Data Analytics",
      icon: Brain,
      path: "/ai-data-analytics",
      services: [
        { name: "Machine Learning & AI Development", hash: "machine-learning-ai-development" },
        { name: "Business Intelligence & Analytics", hash: "business-intelligence-analytics" },
        { name: "Real-Time Data Processing", hash: "real-time-data-processing" },
        { name: "Intelligent Automation", hash: "intelligent-automation" },
        { name: "Data Engineering & Pipelines", hash: "data-engineering-pipelines" },
        { name: "Computer Vision & NLP", hash: "computer-vision-nlp" },
      ]
    },
    {
      id: "it-infrastructure",
      name: "IT Infrastructure & Networking",
      icon: Network,
      path: "/managed-services",
      services: [],
      threeColumnServices: {
        column1: {
          title: "Server Implementation & Support",
          items: [
            "Windows & Linux Deployment",
            "Virtualization (VMware, Hyper-V)",
            "Server Migration & Upgrades",
            "Performance & Optimization",
            "Security Hardening",
            "24/7 Server Maintenance",
          ]
        },
        column2: {
          title: "Data & Network Solutions",
          items: [
            "LAN/WAN Setup & Management",
            "Firewall Configuration",
            "VPN & Remote Connectivity",
            "Structured Cabling",
            "Network Monitoring & Optimization",
            "Wireless Deployment",
          ]
        },
        column3: {
          title: "IT Infrastructure Management",
          items: [
            "Datacenter Setup",
            "VDI",
            "SAN/NAS Storage Solutions",
            "Network Operations Center (NOC)",
            "Infra Monitoring & Optimization",
          ]
        }
      }
    },
    {
      id: "it-support",
      name: "IT Support, Remote Support & AMC",
      icon: Laptop,
      path: "/computer-amc-services",
      services: [],
      twoColumnServices: {
        column1: {
          title: "Annual Maintenance Contract (IT AMC)",
          items: [
            "Preventive & Corrective Maintenance",
            "Hardware & Software Support",
            "Security Patches",
            "Onsite & Remote Support",
            "SLA Driven Services",
            "Quarterly Performance Review",
          ]
        },
        column2: {
          title: "Remote IT Support",
          items: [
            "Helpdesk & Ticketing",
            "Troubleshooting (Desktop, Laptop, Printers)",
            "RMM Monitoring",
            "Antivirus & Malware Removal",
            "OS/Software Installations",
            "Remote Tuning & Fixes",
          ]
        }
      }
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity Solutions",
      icon: Shield,
      path: "/cybersecurity-services",
      services: [
        { name: "VAPT (Vulnerability Assessment & Penetration Testing)", hash: "vapt" },
        { name: "Endpoint Security & Antivirus", hash: "endpoint-security" },
        { name: "Firewall, IDS/IPS", hash: "firewall-ids-ips" },
        { name: "Email Security", hash: "email-security" },
        { name: "Encryption & Secure Backup", hash: "encryption-secure-backup" },
        { name: "SIEM & SOC Monitoring", hash: "siem-soc-monitoring" },
        { name: "Threat Hunting & Incident Response", hash: "threat-hunting-incident-response" },
        { name: "Compliance (ISO, GDPR, HIPAA)", hash: "compliance" },
        { name: "User Awareness Training", hash: "user-awareness-training" },
      ]
    },
    {
      id: "consulting",
      name: "ITSM, Compliance & Consulting",
      icon: Briefcase,
      path: "/itsm-consulting",
      services: [],
      threeColumnServices: {
        column1: {
          title: "ITSM (IT Service Management)",
          items: [
            { name: "ITIL Process Implementation", hash: "itil-process-implementation" },
            { name: "Incident/Change/Problem Management", hash: "incident-change-problem-management" },
            { name: "Service Desk Setup", hash: "service-desk-setup" },
            { name: "SLA Reporting", hash: "sla-reporting" },
            { name: "Asset & Configuration Management", hash: "asset-configuration-management" },
            { name: "Knowledge Base Setup", hash: "knowledge-base-setup" },
          ]
        },
        column2: {
          title: "IT Consulting & Advisory",
          items: [
            { name: "IT Strategy & Roadmap", hash: "it-strategy-roadmap" },
            { name: "Technology Gap Analysis", hash: "technology-gap-analysis" },
            { name: "Digital Transformation", hash: "digital-transformation" },
            { name: "Cloud Adoption Strategy", hash: "cloud-adoption-strategy" },
            { name: "ROI & Cost Optimization", hash: "roi-cost-optimization" },
          ]
        },
        column3: {
          title: "IT Compliance & Audits",
          items: [
            { name: "IT Policy & Governance", hash: "it-policy-governance" },
            { name: "Risk Management Audits", hash: "risk-management-audits" },
            { name: "License & Asset Compliance", hash: "license-asset-compliance" },
            { name: "Cybersecurity Assessments", hash: "cybersecurity-assessments" },
            { name: "Regulatory Compliance (PCI-DSS, SOC 2, etc.)", hash: "regulatory-compliance" },
          ]
        }
      }
    },
    {
      id: "software-dev",
      name: "Software Development & Web Design",
      icon: Code,
      path: "/software-development",
      services: [
        { name: "Website Development", hash: "website-development" },
        { name: "Web Applications", hash: "web-applications" },
        { name: "Mobile App Development", hash: "mobile-app-development" },
        { name: "ERP Development", hash: "erp-development" },
        { name: "CRM Development", hash: "crm-development" },
        { name: "UI/UX Design", hash: "ui-ux-design" },
        { name: "API Integrations", hash: "api-integrations" },
        { name: "Website Maintenance", hash: "website-maintenance" },
      ]
    },
    {
      id: "it-staffing",
      name: "IT Staff Augmentation",
      icon: UsersRound,
      path: "/it-augmentation",
      services: [
        { name: "Dedicated Onsite IT Engineers", hash: "dedicated-onsite-it-engineers" },
        { name: "Remote IT Specialists", hash: "remote-it-specialists" },
        { name: "Project-Based Staffing", hash: "project-based-staffing" },
        { name: "Helpdesk Outsourcing", hash: "helpdesk-outsourcing" },
        { name: "Network & System Admins", hash: "network-system-admins" },
        { name: "Contract / Long-Term Hiring", hash: "contract-long-term-hiring" },
      ]
    },
  ];

  const activeCategory = serviceCategories.find(cat => cat.id === activeServiceCategory) || serviceCategories[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 text-black shadow-sm">
      <div className="container flex h-16 md:h-20 items-center justify-between mobile-padding">
        {/* Logo Section */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center space-x-2 touch-target"
        >
          <img
            src="/uploads/77cb2418-56bd-44ad-8bfd-3651e3cdb2c0.png"
            alt="CybaemTech Logo"
            className="h-12 md:h-16 w-auto"
          />
        </Link>

        {/* Mobile and Tablet Contact Button and Hamburger Menu */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            asChild
            className="text-xs md:text-sm font-medium bg-primary hover:bg-primary/90 text-white px-3 py-2"
          >
            <Link to="/contact">Contact</Link>
          </Button>
          <button
            className="p-2 rounded focus:outline-none bg-white shadow"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 md:h-7 md:w-7 text-primary" />
          </button>
        </div>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="gap-6 xl:gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black hover:text-primary bg-transparent">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white text-black">
                <div className="flex md:w-[650px] lg:w-[750px]">
                  {/* Left Column - Service Categories */}
                  <div className="w-[270px] bg-gray-50 p-4 border-r border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                      Service Categories
                    </h3>
                    <div className="space-y-1">
                      {serviceCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={category.path}
                          onClick={handleMenuItemClick}
                          onMouseEnter={() => setActiveServiceCategory(category.id)}
                          className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors no-underline ${activeServiceCategory === category.id
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <category.icon className={`h-4 w-4 ${activeServiceCategory === category.id ? 'text-white' : 'text-gray-500'}`} />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <ChevronRight className={`h-4 w-4 ${activeServiceCategory === category.id ? 'text-white' : 'text-gray-400'}`} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Sub-services */}
                  <div className="flex-1 p-5">
                    <h3 className="text-base font-semibold text-primary mb-3">
                      {activeCategory.name}
                    </h3>
                    {activeCategory.threeColumnServices ? (
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800 mb-2">
                            {activeCategory.threeColumnServices.column1.title}
                          </h4>
                          <div className="space-y-1">
                            {activeCategory.threeColumnServices.column1.items.map((service, index) => {
                              const serviceName = typeof service === 'string' ? service : service.name;
                              const serviceHash = typeof service === 'string' 
                                ? service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                                : service.hash;
                              return (
                                <Link
                                  key={index}
                                  to={`${activeCategory.path}#${serviceHash}`}
                                  onClick={handleMenuItemClick}
                                  className="block text-xs text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors py-1.5 px-2 rounded-md"
                                >
                                  {serviceName}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800 mb-2">
                            {activeCategory.threeColumnServices.column2.title}
                          </h4>
                          <div className="space-y-1">
                            {activeCategory.threeColumnServices.column2.items.map((service, index) => {
                              const serviceName = typeof service === 'string' ? service : service.name;
                              const serviceHash = typeof service === 'string' 
                                ? service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                                : service.hash;
                              return (
                                <Link
                                  key={index}
                                  to={`${activeCategory.path}#${serviceHash}`}
                                  onClick={handleMenuItemClick}
                                  className="block text-xs text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors py-1.5 px-2 rounded-md"
                                >
                                  {serviceName}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800 mb-2">
                            {activeCategory.threeColumnServices.column3.title}
                          </h4>
                          <div className="space-y-1">
                            {activeCategory.threeColumnServices.column3.items.map((service, index) => {
                              const serviceName = typeof service === 'string' ? service : service.name;
                              const serviceHash = typeof service === 'string' 
                                ? service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                                : service.hash;
                              return (
                                <Link
                                  key={index}
                                  to={`${activeCategory.path}#${serviceHash}`}
                                  onClick={handleMenuItemClick}
                                  className="block text-xs text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors py-1.5 px-2 rounded-md"
                                >
                                  {serviceName}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : activeCategory.twoColumnServices ? (
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800 mb-2">
                            {activeCategory.twoColumnServices.column1.title}
                          </h4>
                          <div className="space-y-1">
                            {activeCategory.twoColumnServices.column1.items.map((service, index) => (
                              <Link
                                key={index}
                                to={`${activeCategory.path}#${service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                onClick={handleMenuItemClick}
                                className="block text-xs text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors py-1.5 px-2 rounded-md"
                              >
                                {service}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800 mb-2">
                            {activeCategory.twoColumnServices.column2.title}
                          </h4>
                          <div className="space-y-1">
                            {activeCategory.twoColumnServices.column2.items.map((service, index) => (
                              <Link
                                key={index}
                                to={`${activeCategory.path}#${service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                onClick={handleMenuItemClick}
                                className="block text-xs text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors py-1.5 px-2 rounded-md"
                              >
                                {service}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {activeCategory.services.map((service, index) => {
                          const serviceName = typeof service === 'string' ? service : service.name;
                          const serviceHash = typeof service === 'string' ? '' : `#${service.hash}`;
                          return (
                            <Link
                              key={index}
                              to={`${activeCategory.path}${serviceHash}`}
                              onClick={handleMenuItemClick}
                              className="text-xs text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors py-1.5 px-2 rounded-md"
                            >
                              {serviceName}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <Link
                        to={activeCategory.path}
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View all services
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black hover:text-primary bg-transparent">
                Industries We Serve
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white text-black">
                <div className="grid gap-3 p-4 w-[280px]">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#it-software"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        IT & Software
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#manufacturing"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        Manufacturing
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#healthcare"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        Healthcare
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#finance"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        Finance
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#education"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        Education
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#ecommerce"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        Ecommerce
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#logistics"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        Logistics
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/industries#smes-corporates"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    >
                      <div className="text-sm font-medium leading-none">
                        SMEs & Corporates
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <div
              ref={aboutUsRef}
              className="relative"
              onMouseEnter={handleAboutUsMouseEnter}
              onMouseLeave={handleAboutUsMouseLeave}
            >
              <button
                className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${aboutUsOpen ? 'bg-accent/50 text-primary' : 'bg-transparent text-black hover:text-primary'}`}
                onClick={() => setAboutUsOpen(!aboutUsOpen)}
              >
                About Us
                <ChevronDown
                  className={`relative top-[1px] ml-1 h-3 w-3 transition duration-200 ${aboutUsOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {aboutUsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[240px] bg-white rounded-md border shadow-lg z-50">
                  <div className="grid gap-3 p-4">
                    <Link
                      to="/about"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      onClick={() => setAboutUsOpen(false)}
                    >
                      <div className="text-sm font-medium leading-none">
                        About CybaemTech
                      </div>
                    </Link>
                    <Link
                      to="/leadership"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      onClick={() => setAboutUsOpen(false)}
                    >
                      <div className="text-sm font-medium leading-none">
                        Leadership and Partnership
                      </div>
                    </Link>
                    <Link
                      to="/careers"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      onClick={() => setAboutUsOpen(false)}
                    >
                      <div className="text-sm font-medium leading-none">
                        Job Opportunities
                      </div>
                    </Link>
                    <Link
                      to="/life-at-cybaemtech"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      onClick={() => setAboutUsOpen(false)}
                    >
                      <div className="text-sm font-medium leading-none">
                        Life at CybaemTech
                      </div>
                    </Link>
                    <a
                      href="https://skilltonitedu.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                      onClick={() => setAboutUsOpen(false)}
                    >
                      <div className="text-sm font-medium leading-none">
                        Train with CybaemTech
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/resources"
                  onClick={handleResourcesClick}
                  className="text-black hover:text-primary transition-colors text-sm font-medium"
                >
                  Resources
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Navigation Items and CTA */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <Button
            variant="default"
            size="sm"
            asChild
            className="text-sm font-medium touch-target bg-primary hover:bg-primary/90 text-white px-5 py-2 shadow-lg"
          >
            <Link to="/contact">Contact</Link>
          </Button>
          <div className="flex items-center space-x-2 xl:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-black hover:text-black hover:bg-gray-100 touch-target"
            >
              <Globe className="h-4 w-4 mr-1" />
              <span className="text-sm">India</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          isOpen={mobileMenuOpen}
          onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
    </header>
  );
};

export default Header;
