import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Shield, Lock, Eye, Wifi, Database, Key, Search, AlertTriangle, Zap, Mail, HardDrive, FileCheck, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";

// Import HQ images
import firewallImage from "@/assets/cybersecurity-firewall.jpg";
import threatDetectionImage from "@/assets/cybersecurity-threat-detection.jpg";
import vpnImage from "@/assets/cybersecurity-vpn.jpg";
import endpointImage from "@/assets/cybersecurity-endpoint.jpg";
import dlpImage from "@/assets/cybersecurity-dlp.jpg";
import iamImage from "@/assets/cybersecurity-iam.jpg";
import vaptImage from "@/assets/cybersecurity-vapt.jpg";
import siemImage from "@/assets/cybersecurity-siem.jpg";
import incidentImage from "@/assets/cybersecurity-incident.jpg";

const CybersecurityServices = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Scroll to hash on navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Matrix binary rain effect
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = "01010";
    const binaryArray = binary.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Darker fade for more dramatic effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Bright neon green like Matrix
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px "Courier New", monospace`;
      ctx.shadowColor = '#00ff41';
      ctx.shadowBlur = 10;

      for (let i = 0; i < drops.length; i++) {
        // Only use 0s and 1s
        const text = binaryArray[Math.floor(Math.random() * binaryArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Create trail effect with different opacity
        if (drops[i] > 1) {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.7)';
          ctx.fillText(text, i * fontSize, (drops[i] - 1) * fontSize);
          
          ctx.fillStyle = 'rgba(0, 255, 65, 0.4)';
          ctx.fillText(text, i * fontSize, (drops[i] - 2) * fontSize);
          
          ctx.fillStyle = '#00ff41';
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      // Reset shadow
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      id: "vapt",
      icon: Search,
      title: "VAPT (Vulnerability Assessment & Penetration Testing)",
      description: "Comprehensive security assessments with ethical hacking and vulnerability management programs.",
      details: "Regular penetration testing, vulnerability scanning, and detailed security posture reports.",
      image: vaptImage,
      category: "Assessment & Testing",
      color: "from-orange-500 to-red-600"
    },
    {
      id: "endpoint-security",
      icon: Lock,
      title: "Endpoint Security & Antivirus",
      description: "Comprehensive endpoint security with EDR capabilities, behavioral analysis, and automated threat remediation.",
      details: "Protect all devices with advanced anti-malware, device control, and continuous monitoring solutions.",
      image: endpointImage,
      category: "Endpoint & Data Security",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: "firewall-ids-ips",
      icon: Shield,
      title: "Firewall, IDS/IPS",
      description: "Next-generation firewall solutions with intrusion detection and prevention systems for comprehensive network protection.",
      details: "Deploy enterprise-grade firewalls with advanced threat intelligence, real-time monitoring, and automated response capabilities.",
      image: firewallImage,
      category: "Perimeter Defense",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "email-security",
      icon: Mail,
      title: "Email Security",
      description: "Advanced email protection with anti-phishing, malware filtering, and data loss prevention for enterprise communications.",
      details: "Secure your organization's email with AI-powered threat detection, encryption, and compliance controls.",
      image: threatDetectionImage,
      category: "Communication Security",
      color: "from-green-500 to-cyan-600"
    },
    {
      id: "encryption-secure-backup",
      icon: HardDrive,
      title: "Encryption & Secure Backup",
      description: "Military-grade encryption for data at rest and in transit, with secure backup and disaster recovery solutions.",
      details: "Protect sensitive data with AES-256 encryption, secure cloud backups, and rapid recovery capabilities.",
      image: dlpImage,
      category: "Data Protection",
      color: "from-cyan-500 to-green-600"
    },
    {
      id: "siem-soc-monitoring",
      icon: AlertTriangle,
      title: "SIEM & SOC Monitoring",
      description: "Centralized SIEM platform with 24/7 Security Operations Center monitoring and automated threat response.",
      details: "Advanced security analytics, real-time log analysis, correlation, and integrated threat intelligence feeds.",
      image: siemImage,
      category: "Monitoring & Response",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: "threat-hunting-incident-response",
      icon: Zap,
      title: "Threat Hunting & Incident Response",
      description: "Proactive threat hunting combined with rapid incident response and digital forensics capabilities.",
      details: "24/7 emergency response, forensic analysis, threat containment, and complete incident lifecycle management.",
      image: incidentImage,
      category: "Monitoring & Response",
      color: "from-red-500 to-pink-600"
    },
    {
      id: "compliance",
      icon: FileCheck,
      title: "Compliance (ISO, GDPR, HIPAA)",
      description: "Comprehensive compliance management for ISO 27001, GDPR, HIPAA, PCI-DSS, and other regulatory frameworks.",
      details: "Gap assessments, policy development, audit preparation, and continuous compliance monitoring.",
      image: iamImage,
      category: "Compliance & Governance",
      color: "from-green-500 to-blue-600"
    },
    {
      id: "user-awareness-training",
      icon: GraduationCap,
      title: "User Awareness Training",
      description: "Security awareness programs to educate employees on cyber threats, phishing prevention, and security best practices.",
      details: "Interactive training modules, simulated phishing campaigns, and ongoing security culture development.",
      image: vpnImage,
      category: "Training & Education",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const ImageMosaicService = ({ service, index }: { service: any, index: number }) => {
    const { ref, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true
    });

    return (
      <div
        id={service.id}
        ref={ref}
        className={`group relative cursor-pointer scroll-mt-24 ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Image Container with Hover Effects */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Floating Icon */}
          <div className="absolute top-3 right-3 md:top-6 md:right-6 transform group-hover:scale-110 transition-transform duration-500">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="mb-2">
              <span className="px-2 md:px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-xs text-cyan-300 font-medium">
                {service.category}
              </span>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
              {service.title}
            </h3>
            
            <p className="text-gray-300 text-xs md:text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
              {service.description}
            </p>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <button className="text-cyan-400 text-xs md:text-sm font-medium hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2">
                Explore Solution
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>

          {/* Scan Line Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000">
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">

      {/* Matrix Background Canvas */}
      <canvas
        id="matrix-canvas"
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{ zIndex: 1 }}
      />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 md:px-6 py-20 md:py-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent opacity-50" />
        
        <div className="relative z-10 max-w-4xl w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
            CYBERSECURITY
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 text-white px-2">
            SERVICES
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Advanced cybersecurity solutions powered by AI, machine learning, and zero-trust architecture to protect your digital assets from sophisticated threats.
          </p>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 px-4">
            <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 md:mb-2">99.9%</div>
              <div className="text-sm md:text-base text-gray-300">Threat Detection Rate</div>
            </div>
            <div className="bg-black/40 backdrop-blur-lg border border-blue-500/30 rounded-xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1 md:mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-300">Security Monitoring</div>
            </div>
            <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-4 md:p-6 sm:col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1 md:mb-2">&lt;5min</div>
              <div className="text-sm md:text-base text-gray-300">Incident Response</div>
            </div>
  </div>

  <Link to="/contact">
    <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-base md:text-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]">
      Secure Your Organization
    </button>
  </Link>
</div>

        {/* Floating Security Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Services Grid - Image Mosaic Layout */}
      <section className="relative z-10 py-12 md:py-16 lg:py-20 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent px-4">
              Comprehensive Security Arsenal
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Advanced cybersecurity solutions designed to protect every layer of your digital infrastructure
            </p>
          </div>

          {/* Masonry-style Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className={`${
                  index === 0 || index === 4 || index === 7 ? 'md:col-span-2 lg:col-span-1' : ''
                } ${
                  index === 2 || index === 5 ? 'lg:col-span-2' : ''
                }`}
              >
                <ImageMosaicService service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent px-4">
            Ready to Fortify Your Defenses?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Get a comprehensive cybersecurity assessment and discover how our advanced solutions can protect your organization from evolving threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
            <Link to="/contact">
            <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-base md:text-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]">
              Schedule Security Assessment
            </button>
            </Link>
            <button
  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-cyan-500/50 text-cyan-400 rounded-lg text-base md:text-lg font-medium hover:bg-cyan-500/10 transition-all duration-300"
  onClick={() => {
    const brochureUrl = import.meta.env.VITE_BROCHURE_URL || 
      (window.location.hostname === 'localhost' 
        ? 'http://localhost:8080'
        : `${window.location.protocol}//${window.location.hostname}:8080`);
    window.open(brochureUrl + '?type=cybersecurity', "_blank", "noopener,noreferrer");
  }}
>
  Download Security Guide
</button>


          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default CybersecurityServices;