import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Monitor,
  Laptop,
  HardDrive,
  Cpu,
  Shield,
  Network,
  Wrench,
  CheckCircle,
  Clock,
  Users,
  Building2,
  BadgeCheck,
  RefreshCw,
  Headphones,
  Bug,
  Activity,
  ShieldCheck,
  Download,
  Settings,
  FileCheck,
  Phone,
  Calendar,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import computerAmcHero from "@/assets/computer-amc-hero.png";
import computerAmcNetwork from "@/assets/computer-amc-network.png";
import computerAmcOffice from "@/assets/computer-amc-office.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const generateId = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const ComputerAMCServices = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-black');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-black');
          }, 2000);
        }
      }, 300);
    }
  }, [location.hash]);

  const amcServices = [
    { icon: RefreshCw, title: "Preventive & Corrective Maintenance", description: "Regular system maintenance and quick fixes for hardware and software issues" },
    { icon: Wrench, title: "Hardware & Software Support", description: "Comprehensive support for all your computer hardware and software needs" },
    { icon: Shield, title: "Security Patches", description: "Timely security updates and patches to protect your systems" },
    { icon: Phone, title: "Onsite & Remote Support", description: "Flexible support options with both on-location and remote assistance" },
    { icon: FileCheck, title: "SLA Driven Services", description: "Service level agreement based support with guaranteed response times" },
    { icon: Calendar, title: "Quarterly Performance Review", description: "Regular performance assessments and system health reports" },
  ];

  const remoteITServices = [
    { icon: Headphones, title: "Helpdesk & Ticketing", description: "24/7 helpdesk support with efficient ticket management system" },
    { icon: Bug, title: "Troubleshooting (Desktop, Laptop, Printers)", description: "Expert troubleshooting for all your office equipment" },
    { icon: Activity, title: "RMM Monitoring", description: "Remote Monitoring and Management for proactive IT support" },
    { icon: ShieldCheck, title: "Antivirus & Malware Removal", description: "Protection against viruses, malware, and cyber threats" },
    { icon: Download, title: "OS/Software Installations", description: "Professional installation of operating systems and software" },
    { icon: Settings, title: "Remote Tuning & Fixes", description: "Remote optimization and quick fixes for system performance" },
  ];
  const whyChooseUs = [
    { icon: CheckCircle, title: "Guaranteed onsite & remote IT support" },
    { icon: Clock, title: "SLA-based response for critical issues" },
    { icon: BadgeCheck, title: "Certified hardware & networking engineers" },
    { icon: RefreshCw, title: "Regular preventive maintenance" },
    { icon: Wrench, title: "Hardware & software troubleshooting" },
    { icon: Shield, title: "Antivirus monitoring & updates" },
    { icon: Users, title: "Affordable PC AMC plans for SMEs & enterprises" },
    { icon: Building2, title: "Monthly or quarterly IT health reports" },
  ];

  const amcCoverage = [
    {
      icon: Monitor,
      title: "Hardware Support",
      items: [
        "Desktop & laptop repair",
        "HDD, RAM, SMPS, motherboard diagnostics",
        "System performance tuning",
        "Overheating & fan cleaning",
      ],
    },
    {
      icon: Cpu,
      title: "Software Support",
      items: [
        "Windows installation & upgrade",
        "Driver installation",
        "Antivirus setup & security scan",
        "Outlook/email configuration",
        "Slow system optimization",
      ],
    },
    {
      icon: Network,
      title: "Network Support",
      items: [
        "LAN troubleshooting",
        "Router/WiFi configuration",
        "IP setup & network security check",
      ],
    },
    {
      icon: RefreshCw,
      title: "Preventive Maintenance",
      items: [
        "Quarterly system cleaning",
        "Backup verification",
        "System health report",
        "Thermal paste & hardware check",
      ],
    },
  ];

  const amcPlans = [
    {
      name: "Basic AMC",
      features: [
        "Remote support",
        "Quarterly maintenance",
        "Antivirus updates",
        "Email & phone support",
      ],
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      name: "Standard AMC",
      features: [
        "Includes all Basic features",
        "Monthly onsite visit",
        "Hardware diagnostics",
        "Priority support",
      ],
      gradient: "from-purple-600 to-blue-500",
      popular: true,
    },
    {
      name: "Premium AMC",
      features: [
        "Unlimited onsite visits",
        "Same-day SLA",
        "Backup & security monitoring",
        "Annual IT audit & report",
      ],
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Minimize IT downtimes",
      description: "Keep your systems running smoothly",
    },
    {
      icon: Cpu,
      title: "Increase system performance & lifespan",
      description: "Optimize hardware and software",
    },
    {
      icon: Shield,
      title: "Strengthen data security",
      description: "Protect your critical information",
    },
    {
      icon: CheckCircle,
      title: "Reduce repair and maintenance costs",
      description: "Preventive care saves money",
    },
    {
      icon: Monitor,
      title: "Continuous IT monitoring",
      description: "24/7 system health tracking",
    },
    {
      icon: Users,
      title: "Dedicated team for your business",
      description: "Expert support when you need it",
    },
  ];

  const industries = [
    "Corporate Offices",
    "Schools",
    "Hospitals",
    "Hotels",
    "Retail",
    "Manufacturing",
    "Construction",
    "Finance",
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Free site assessment",
      description: "We evaluate your IT infrastructure",
    },
    {
      step: 2,
      title: "Customized AMC plan",
      description: "Tailored to your specific needs",
    },
    {
      step: 3,
      title: "Asset documentation & onboarding",
      description: "Complete inventory and setup",
    },
    {
      step: 4,
      title: "Scheduled preventive maintenance",
      description: "Regular health checks",
    },
    {
      step: 5,
      title: "Monthly/quarterly performance reports",
      description: "Detailed insights and analytics",
    },
  ];

  const faqs = [
    {
      question: "Does Cybaem Tech provide onsite computer repair?",
      answer: "Yes, onsite support is provided based on your AMC plan.",
    },
    {
      question: "Are replacement parts included in the AMC?",
      answer: "No, parts are billed separately.",
    },
    {
      question: "Can Cybaem Tech manage AMC for multiple branches?",
      answer: "Yes, we support multi-location IT infrastructure.",
    },
    {
      question: "How often do you provide maintenance visits?",
      answer: "Quarterly or monthly depending on the plan.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
   

      <Header />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={computerAmcHero}
            alt="Computer AMC Services"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/80 to-black/95"></div>
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              Computer AMC
              <span className="text-blue-500"> Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Annual Maintenance Contracts designed to keep your computers,
              laptops, and IT infrastructure running smoothly throughout the
              year
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg hover-lift shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Get a Free AMC Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Maintenance Contract Services Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Annual Maintenance Contract </span>
              <span className="text-primary">(IT AMC)</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive IT maintenance services to keep your systems running at peak performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amcServices.map((service, index) => (
              <Card
                key={index}
                id={generateId(service.title)}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift card-interactive animate-slide-up transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Remote IT Support Services Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Remote IT </span>
              <span className="text-primary">Support</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert remote assistance for all your IT needs, available when you need it
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remoteITServices.map((service, index) => (
              <Card
                key={index}
                id={generateId(service.title)}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift card-interactive animate-slide-up transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Why Choose Cybaem Tech for </span>
              <span className="text-primary">Computer AMC?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional IT support and maintenance that keeps your business
              running
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift card-interactive animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-white font-medium">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Our AMC Covers Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">What Our AMC </span>
              <span className="text-primary">Covers?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive coverage for all your IT needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {amcCoverage.map((coverage, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift card-interactive animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <coverage.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    {coverage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {coverage.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-300 flex items-center"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Plans Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Cybaem Tech AMC </span>
              <span className="text-primary">Plans</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic AMC */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Basic AMC
                </h3>
                <p className="text-sm text-gray-400 mb-6">Essential Support</p>

                <ul className="space-y-3 mb-8 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Remote support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Quarterly maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Antivirus updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Email & phone support</span>
                  </li>
                </ul>

                <Link to="/contact">
                  <Button className="w-full bg-transparent border border-white/20 hover:bg-primary/20 hover:border-primary text-white">
                    Select Plan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Standard AMC - Most Popular */}
            <div className="group relative bg-gradient-to-br from-primary/10 to-blue-900/30 backdrop-blur-sm border-2 border-primary rounded-2xl p-6 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Most Popular
                </div>
              </div>
              <div className="relative z-10 mt-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Standard AMC
                </h3>
                <p className="text-sm text-gray-300 mb-6">
                  For Growing Businesses
                </p>

                <ul className="space-y-3 mb-8 text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Includes all Basic features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Monthly onsite visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Hardware diagnostics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>

                <Link to="/contact">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Select Plan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Premium AMC */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Premium AMC
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Enterprise Solutions
                </p>

                <ul className="space-y-3 mb-8 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Unlimited onsite visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Same-day SLA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Backup & security monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Annual IT audit & report</span>
                  </li>
                </ul>

                <Link to="/contact">
                  <Button className="w-full bg-transparent border border-white/20 hover:bg-primary/20 hover:border-primary text-white">
                    Select Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Benefits of </span>
              <span className="text-primary">Cybaem Tech AMC</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Why businesses trust us for their IT maintenance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift card-interactive animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white text-lg">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Support */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Industries We </span>
              <span className="text-primary">Support</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm px-6 py-3 rounded-full text-white hover:bg-primary/20 transition-colors duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">How Cybaem Tech AMC </span>
              <span className="text-primary">Works?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A streamlined, professional process designed for your business
              success
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-6 relative">
              {/* Connection line for desktop */}
              <div
                className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                style={{ top: "60px" }}
              ></div>

              {howItWorks.map((step, index) => (
                <div
                  key={index}
                  className="relative animate-slide-up group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Step number circle */}
                  <div className="flex justify-center mb-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-2xl">
                          {step.step}
                        </span>
                      </div>
                      {/* Pulse effect */}
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                    </div>
                  </div>

                  {/* Content card */}
                  <Card className="bg-gray-800/60 border-gray-700/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20">
                    <CardContent className="p-4 text-center flex flex-col justify-center min-h-[130px]">
                      <h3 className="text-base font-bold text-white mb-3 leading-relaxed">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Not Included */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center">
              <span className="text-white">What's </span>
              <span className="text-primary">Not Included?</span>
            </h3>
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "Replacement of hardware parts",
                    "Physical or liquid damage",
                    "Consumables (keyboard/mouse/toner)",
                    "Third-party software licensing",
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">
                Professional IT Infrastructure{" "}
              </span>
              <span className="text-primary">Management</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              State-of-the-art facilities and expert technicians for your
              complete IT support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift animate-slide-up">
              <CardContent className="p-6">
                <img
                  src={computerAmcNetwork}
                  alt="Network Infrastructure Management"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Network Infrastructure
                </h3>
                <p className="text-gray-300">
                  Professional network setup, monitoring, and maintenance for
                  optimal performance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover-lift animate-slide-up animate-delay-200">
              <CardContent className="p-6">
                <img
                  src={computerAmcOffice}
                  alt="Office IT Systems"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Office IT Systems
                </h3>
                <p className="text-gray-300">
                  Complete coverage for all your office computers, laptops, and
                  peripherals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Frequently Asked </span>
              <span className="text-primary">Questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  Does Cybaem Tech provide onsite computer repair?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  Yes, onsite support is provided based on your AMC plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  Are replacement parts included in the AMC?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  No, parts are billed separately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  Can Cybaem Tech manage AMC for multiple branches?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  Yes, we support multi-location IT infrastructure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  How often do you provide maintenance visits?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  Quarterly or monthly depending on the plan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Get a Free AMC Quote from </span>
              <span className="text-primary">Cybaem Tech</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Looking for reliable Computer AMC Services for your office?
              Contact Cybaem Tech today for a free assessment and customized
              annual maintenance plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg hover-lift shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Request Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComputerAMCServices;