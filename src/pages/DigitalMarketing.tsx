import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import digitalTransformationHero from "@/assets/digital-transformation-hero.jpg";
import digitalMarketingServices from "@/assets/digital-marketing-services.jpg";
import techTeamCollaboration from "@/assets/tech-team-collaboration.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Share2, MousePointerClick, FileText, Mail, Award, BarChart3, ArrowRight, Smartphone, Target, Layout, Video, Users, Zap, TrendingUp, Rocket, Settings, ChevronDown } from "lucide-react";
import { FaQuoteLeft, FaStar, FaChartLine, FaEye, FaUsers, FaCog, FaHeadphones, FaTrophy } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import { MagazineCards } from "@/components/MagazineCards";
import { DigitalMarketingBook, serviceToPageMap, DigitalMarketingBookRef } from "@/components/DigitalMarketingBook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Animated Counter Hook
const useCounter = (end: number, duration: number = 1000, isVisible: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return count;
};

// Process Step Component
const ProcessStep = ({ step, title, description, icon: Icon, index }: any) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const count = useCounter(step, 800, inView);

  return (
    <div 
      ref={ref}
      className={`relative flex items-start gap-6 transition-all duration-700 transform ${
        inView ? 'opacity-100 translate-x-0' : index % 2 === 0 ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'
      }`}
    >
      {/* Animated Step Number */}
      <div className={`flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg shadow-primary/50 transition-all duration-500 ${
        inView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
      }`}>
        {count}
      </div>

      {/* Card with Icon */}
      <div className={`flex-1 group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-transparent hover:border-primary/30 ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`transition-all duration-700 ${inView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <Icon className="w-10 h-10 text-primary group-hover:text-blue-600 transition-colors duration-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Process Section Component - Orbital Animation
const ProcessSection = () => {
  useEffect(() => {
    // Generate floating particles
    const section = document.getElementById('process-section');
    if (!section) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
      section.appendChild(particle);
    }
  }, []);

  return (
    <section id="process-section" className="relative mb-16 py-16 overflow-hidden">
      {/* Animated background */}
      <div className="absolute w-[200%] h-[200%] bg-gradient-radial-orbit animate-rotate-gradient"></div>
      
      <style>{`
        .bg-gradient-radial-orbit {
          background: radial-gradient(circle at 20% 50%, rgba(33, 150, 243, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.3) 0%, transparent 50%);
        }

        .animate-rotate-gradient {
          animation: rotateGradient 15s ease-in-out infinite;
        }

        @keyframes rotateGradient {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        @keyframes orbit-1 {
          from { transform: rotate(0deg) translateX(250px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(250px) rotate(-360deg); }
        }

        @keyframes orbit-2 {
          from { transform: rotate(60deg) translateX(250px) rotate(-60deg); }
          to { transform: rotate(420deg) translateX(250px) rotate(-420deg); }
        }

        @keyframes orbit-3 {
          from { transform: rotate(120deg) translateX(250px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(250px) rotate(-480deg); }
        }

        @keyframes orbit-4 {
          from { transform: rotate(180deg) translateX(250px) rotate(-180deg); }
          to { transform: rotate(540deg) translateX(250px) rotate(-540deg); }
        }

        @keyframes orbit-5 {
          from { transform: rotate(240deg) translateX(250px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(250px) rotate(-600deg); }
        }

        @keyframes orbit-6 {
          from { transform: rotate(300deg) translateX(250px) rotate(-300deg); }
          to { transform: rotate(660deg) translateX(250px) rotate(-660deg); }
        }

        @keyframes rotatePath {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes centerPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 60px rgba(33, 150, 243, 0.6);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 0 80px rgba(33, 150, 243, 0.8);
          }
        }

        @keyframes stepPulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(33, 150, 243, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 50px rgba(33, 150, 243, 0.8);
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.8;
          }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #2196F3;
          border-radius: 50%;
          opacity: 0.6;
          animation: float 8s ease-in-out infinite;
        }

        .orbit-step-1 { animation-delay: 0s; }
        .orbit-step-2 { animation-delay: -3.33s; }
        .orbit-step-3 { animation-delay: -6.66s; }
        .orbit-step-4 { animation-delay: -10s; }
        .orbit-step-5 { animation-delay: -13.33s; }
        .orbit-step-6 { animation-delay: -16.66s; }

        .step-pulse-1 { animation-delay: 0s; }
        .step-pulse-2 { animation-delay: 0.5s; }
        .step-pulse-3 { animation-delay: 1s; }
        .step-pulse-4 { animation-delay: 1.5s; }
        .step-pulse-5 { animation-delay: 2s; }
        .step-pulse-6 { animation-delay: 2.5s; }

        @media (max-width: 768px) {
          @keyframes orbit-1 {
            from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
          }

          @keyframes orbit-2 {
            from { transform: rotate(60deg) translateX(160px) rotate(-60deg); }
            to { transform: rotate(420deg) translateX(160px) rotate(-420deg); }
          }

          @keyframes orbit-3 {
            from { transform: rotate(120deg) translateX(160px) rotate(-120deg); }
            to { transform: rotate(480deg) translateX(160px) rotate(-480deg); }
          }

          @keyframes orbit-4 {
            from { transform: rotate(180deg) translateX(160px) rotate(-180deg); }
            to { transform: rotate(540deg) translateX(160px) rotate(-540deg); }
          }

          @keyframes orbit-5 {
            from { transform: rotate(240deg) translateX(160px) rotate(-240deg); }
            to { transform: rotate(600deg) translateX(160px) rotate(-600deg); }
          }

          @keyframes orbit-6 {
            from { transform: rotate(300deg) translateX(160px) rotate(-300deg); }
            to { transform: rotate(660deg) translateX(160px) rotate(-660deg); }
          }
        }
      `}</style>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Our </span>
            <span className="text-primary">Process</span>
          </h2>
        </div>

        <div className="relative w-full max-w-[500px] h-[500px] md:max-w-[550px] md:h-[550px] mx-auto">
          {/* Orbital path */}
          <div 
            className="absolute top-1/2 left-1/2 w-full h-full border-2 border-primary/30 rounded-full -translate-x-1/2 -translate-y-1/2" 
            style={{ animation: 'rotatePath 20s linear infinite' }}
          ></div>
          
          {/* Center circle */}
          <div 
            className="absolute top-1/2 left-1/2 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-primary/30 to-cyan-500/30 border-3 border-primary rounded-full flex flex-col items-center justify-center backdrop-blur-md z-10"
            style={{ animation: 'centerPulse 3s ease-in-out infinite' }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">Digital<br/>Marketing</h3>
            <p className="text-gray-400 text-sm mt-2">Excellence</p>
          </div>

          {/* Process steps orbiting */}
          <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-36 md:h-36 orbit-step-1" style={{ animation: 'orbit-1 20s linear infinite' }}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border-3 border-primary rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(0,212,255,1)] step-pulse-1" style={{ animation: 'stepPulse 3s ease-in-out infinite' }}>
              <div className="text-3xl md:text-4xl font-bold text-white">1</div>
              <svg className="w-6 h-6 md:w-8 md:h-8 stroke-primary fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <div className="text-center mt-1">
                <div className="text-xs md:text-sm font-bold text-white">Discover</div>
                <div className="text-[10px] md:text-xs text-gray-400">Audit baseline</div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-36 md:h-36 orbit-step-2" style={{ animation: 'orbit-2 20s linear infinite' }}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border-3 border-primary rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(0,212,255,1)] step-pulse-2" style={{ animation: 'stepPulse 3s ease-in-out infinite' }}>
              <div className="text-3xl md:text-4xl font-bold text-white">2</div>
              <svg className="w-6 h-6 md:w-8 md:h-8 stroke-primary fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M3 3v18h18"/>
                <path d="M18 17V9"/>
                <path d="M13 17V5"/>
                <path d="M8 17v-3"/>
              </svg>
              <div className="text-center mt-1">
                <div className="text-xs md:text-sm font-bold text-white">Plan</div>
                <div className="text-[10px] md:text-xs text-gray-400">Strategy build</div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-36 md:h-36 orbit-step-3" style={{ animation: 'orbit-3 20s linear infinite' }}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border-3 border-primary rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(0,212,255,1)] step-pulse-3" style={{ animation: 'stepPulse 3s ease-in-out infinite' }}>
              <div className="text-3xl md:text-4xl font-bold text-white">3</div>
              <svg className="w-6 h-6 md:w-8 md:h-8 stroke-primary fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="12" r="8"/>
                <path d="M12 2v4"/>
                <path d="M12 18v4"/>
              </svg>
              <div className="text-center mt-1">
                <div className="text-xs md:text-sm font-bold text-white">Build</div>
                <div className="text-[10px] md:text-xs text-gray-400">Create content</div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-36 md:h-36 orbit-step-4" style={{ animation: 'orbit-4 20s linear infinite' }}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border-3 border-primary rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(0,212,255,1)] step-pulse-4" style={{ animation: 'stepPulse 3s ease-in-out infinite' }}>
              <div className="text-3xl md:text-4xl font-bold text-white">4</div>
              <svg className="w-6 h-6 md:w-8 md:h-8 stroke-primary fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
              </svg>
              <div className="text-center mt-1">
                <div className="text-xs md:text-sm font-bold text-white">Launch</div>
                <div className="text-[10px] md:text-xs text-gray-400">Deploy & QA</div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-36 md:h-36 orbit-step-5" style={{ animation: 'orbit-5 20s linear infinite' }}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border-3 border-primary rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(0,212,255,1)] step-pulse-5" style={{ animation: 'stepPulse 3s ease-in-out infinite' }}>
              <div className="text-3xl md:text-4xl font-bold text-white">5</div>
              <svg className="w-6 h-6 md:w-8 md:h-8 stroke-primary fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <div className="text-center mt-1">
                <div className="text-xs md:text-sm font-bold text-white">Optimize</div>
                <div className="text-[10px] md:text-xs text-gray-400">Weekly improve</div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-36 md:h-36 orbit-step-6" style={{ animation: 'orbit-6 20s linear infinite' }}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border-3 border-primary rounded-full flex flex-col items-center justify-center backdrop-blur-md cursor-pointer transition-all hover:scale-110 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(0,212,255,1)] step-pulse-6" style={{ animation: 'stepPulse 3s ease-in-out infinite' }}>
              <div className="text-3xl md:text-4xl font-bold text-white">6</div>
              <svg className="w-6 h-6 md:w-8 md:h-8 stroke-primary fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <div className="text-center mt-1">
                <div className="text-xs md:text-sm font-bold text-white">Scale</div>
                <div className="text-[10px] md:text-xs text-gray-400">Quarterly reset</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DigitalMarketing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookSectionRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<DigitalMarketingBookRef>(null);
  const [initialBookPage, setInitialBookPage] = useState<number | undefined>(undefined);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && serviceToPageMap[hash] !== undefined) {
      const pageIndex = serviceToPageMap[hash];
      setInitialBookPage(pageIndex);
      
      setTimeout(() => {
        if (bookSectionRef.current) {
          bookSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [location.hash]);
  
  return (
    <div className="min-h-screen bg-black">

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen text-white overflow-hidden" style={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
      }}>
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[300px] h-[300px] bg-white opacity-10 rounded-full top-[10%] left-[5%]" style={{
            animation: 'float 20s infinite ease-in-out',
            animationDelay: '0s'
          }}></div>
          <div className="absolute w-[200px] h-[200px] bg-white opacity-10 top-[60%] right-[10%]" style={{
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'float 20s infinite ease-in-out',
            animationDelay: '5s'
          }}></div>
          <div className="absolute w-[150px] h-[150px] bg-white opacity-10 rounded-full bottom-[15%] left-[15%]" style={{
            animation: 'float 20s infinite ease-in-out',
            animationDelay: '10s'
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-between max-w-[1400px] mx-auto px-[5%] py-12 md:py-16 min-h-[calc(100vh-80px)] flex-col lg:flex-row gap-12">
          {/* Hero Text */}
          <div className="flex-1 max-w-[600px] text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 font-extrabold">
              <div className="text-white">Digital Marketing That</div>
              <div className="text-primary">Drives Growth</div>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10 opacity-95">
              SEO • PPC • Content • Social • Branding — end-to-end digital marketing services
            </p>
            <div className="flex gap-5 flex-wrap justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold rounded-[30px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onClick={() => {
                  const brochureUrl = import.meta.env.VITE_BROCHURE_URL || 
                    (window.location.hostname === 'localhost' 
                      ? 'http://localhost:8080'
                      : `${window.location.protocol}//${window.location.hostname}:8080`);
                  window.open(brochureUrl, "_blank", "noopener,noreferrer");
                }}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Get Our Brochure
              </Button>
              <Button
                size="lg"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-6 text-base font-semibold rounded-[30px] transition-all duration-300 hover:-translate-y-1"
                onClick={() => window.location.href = "/contact?source=digital-marketing-hero"}
              >
                Get a Free Strategy Call
              </Button>
            </div>
            <p className="text-white/80 text-sm md:text-base">
              Trusted by <span className="text-primary font-semibold">100+ clients</span> • Serving businesses globally
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="flex-1 relative flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]">
              {/* Main Screen */}
              <div className="absolute w-[200px] h-[140px] sm:w-[280px] sm:h-[200px] md:w-[350px] md:h-[245px] lg:w-[400px] lg:h-[280px] bg-white rounded-lg sm:rounded-xl md:rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_15px_40px_rgba(0,0,0,0.3)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden" style={{
                animation: 'screenFloat 6s infinite ease-in-out'
              }}>
                <div className="bg-[#f8f9fa] p-1 sm:p-1.5 md:p-2.5 border-b border-[#e9ecef]">
                  <div className="flex gap-0.5 sm:gap-1 md:gap-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#28ca42]"></div>
                  </div>
                </div>
                <div className="p-2 sm:p-3 md:p-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] h-[calc(100%-24px)] sm:h-[calc(100%-32px)] md:h-[calc(100%-40px)] flex flex-col justify-center items-center text-white">
                  <div className="text-sm sm:text-lg md:text-2xl font-bold mb-1 sm:mb-1.5 md:mb-2.5 text-center">Digital Growth Strategy</div>
                  <div className="text-[10px] sm:text-xs md:text-sm opacity-90 text-center">Innovative Marketing Solutions</div>
                </div>
              </div>

              {/* Social Media Logos */}
              {/* Facebook */}
              <div className="absolute top-[8%] left-[2%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatFacebook 5s infinite ease-in-out'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>

              {/* Instagram */}
              <div className="absolute top-[5%] right-[15%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatInstagram 6s infinite ease-in-out',
                animationDelay: '0.5s'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#833AB4"/>
                      <stop offset="50%" stopColor="#FD1D1D"/>
                      <stop offset="100%" stopColor="#FCAF45"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>

              {/* YouTube */}
              <div className="absolute top-[32%] left-[-2%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatYoutube 7s infinite ease-in-out',
                animationDelay: '1s'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>

              {/* WhatsApp */}
              <div className="absolute top-[55%] left-[8%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatWhatsapp 5.5s infinite ease-in-out',
                animationDelay: '1.5s'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>

              {/* X (Twitter) */}
              <div className="absolute bottom-[15%] left-[5%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatX 6.5s infinite ease-in-out',
                animationDelay: '2s'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>

              {/* LinkedIn */}
              <div className="absolute bottom-[18%] right-[8%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatLinkedin 6.2s infinite ease-in-out',
                animationDelay: '3s'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>

              {/* TikTok */}
              <div className="absolute top-[60%] right-[2%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatTiktok 5.3s infinite ease-in-out',
                animationDelay: '3.5s'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="#000000">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>

              {/* Snapchat */}
              <div className="absolute top-[25%] right-[3%] bg-white rounded-[8px] sm:rounded-[12px] md:rounded-[20px] p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] cursor-pointer" style={{
                animation: 'floatSnapchat 5.8s infinite ease-in-out',
                animationDelay: '2.5s'
              }}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-9 md:h-9 lg:w-11 lg:h-11" viewBox="0 0 24 24" fill="#FFFC00">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-1.5.75-2.25 1.5-2.25.376 0 .625.181.825.45.291.39.488.855.488 1.44 0 1.005-.526 1.529-1.053 2.027l-.014.012c-.503.476-.987.933-.987 1.553 0 .115.027.232.078.344.044.097.105.193.19.295.383.455 1.445 1.011 2.917 1.528 1.473.518 2.687 1.089 2.687 2.007 0 .625-.417.931-.73 1.156-.309.221-.639.357-.949.502-.62.292-1.061.627-1.061 1.224 0 .157.044.317.154.505.11.188.273.368.458.546.738.712 1.555 1.498 1.555 2.624 0 1.447-.974 2.088-1.94 2.088-.49 0-.97-.15-1.42-.45-.452-.3-.902-.75-1.352-1.35-.225-.3-.45-.673-.675-1.095-.224-.423-.448-.898-.672-1.424l-.028-.066c-.225-.527-.45-1.056-.675-1.582-.224-.526-.449-1.052-.673-1.58-.224-.526-.449-1.052-.673-1.578-.224-.527-.448-1.054-.672-1.58-.225-.526-.45-1.052-.674-1.577-.225-.526-.45-1.052-.675-1.578-.224-.526-.448-1.052-.672-1.578-.224-.526-.448-1.052-.672-1.578l-.028-.067c-.224-.526-.448-1.052-.672-1.578-.224-.526-.448-1.052-.672-1.578-.225-.526-.45-1.052-.675-1.577-.224-.526-.448-1.052-.672-1.578-.224-.526-.448-1.052-.672-1.578-.224-.527-.448-1.054-.672-1.58-.225-.526-.45-1.053-.675-1.579-.224-.526-.448-1.052-.672-1.578l-.028-.066c-.224-.527-.448-1.054-.672-1.58-.224-.526-.448-1.053-.672-1.579-.225-.526-.45-1.053-.675-1.579-.224-.526-.448-1.053-.672-1.579-.224-.526-.448-1.053-.672-1.579-.224-.526-.448-1.053-.672-1.579-.225-.526-.45-1.053-.675-1.579-.224-.526-.448-1.053-.672-1.579l-.028-.066c-.224-.526-.448-1.053-.672-1.579C8.04 1.386 7.816.86 7.592.334 7.367-.192 7.143-.718 6.919-1.244L6.89-1.31C6.666-1.836 6.442-2.362 6.218-2.888 5.993-3.414 5.769-3.94 5.545-4.466 5.32-4.992 5.096-5.518 4.872-6.044 4.647-6.57 4.423-7.096 4.199-7.622L4.17-7.688C3.946-8.214 3.722-8.74 3.498-9.266 3.273-9.792 3.049-10.318 2.825-10.844 2.6-11.37 2.376-11.896 2.152-12.422 1.927-12.948 1.703-13.474 1.479-14L1.45-14.066C1.226-14.592 1.002-15.118.778-15.644.553-16.17.329-16.696.105-17.222-.119-17.748-.343-18.274-.567-18.8L-.596-18.866C-.82-19.392-1.044-19.918-1.268-20.444-1.492-20.97-1.716-21.496-1.94-22.022-2.165-22.548-2.389-23.074-2.613-23.6L-2.642-23.666C-2.866-24.192-3.09-24.718-3.314-25.244-3.539-25.77-3.763-26.296-3.987-26.822-4.211-27.348-4.435-27.874-4.659-28.4L-4.688-28.466C-4.912-28.992-5.136-29.518-5.36-30.044-5.585-30.57-5.809-31.096-6.033-31.622-6.257-32.148-6.481-32.674-6.705-33.2L-6.734-33.266C-6.958-33.792-7.182-34.318-7.406-34.844-7.631-35.37-7.855-35.896-8.079-36.422-8.303-36.948-8.527-37.474-8.751-38L-8.78-38.066Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Our Digital Marketing Services Section - Book Flip */}
      <section 
        ref={bookSectionRef}
        id="services-book"
        className="relative py-20 bg-black overflow-hidden min-h-screen flex flex-col justify-center"
      >

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Our Digital Marketing </span>
              <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-2">
              Comprehensive solutions to elevate your online presence and drive measurable results
            </p>
            <p className="text-sm text-gray-400 italic">
              Flip through our service catalog
            </p>
          </div>

          <DigitalMarketingBook ref={bookRef} initialPage={initialBookPage} />
        </div>
      </section>

      <div className="container mx-auto px-5 py-10">
        {/* Trust Signals */}
        <section className="bg-card/10 backdrop-blur-sm p-10 rounded-xl text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            <span className="text-white">Trusted by 100+ Businesses </span>
            <span className="text-primary">Worldwide</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="animate-scale-in animate-delay-100">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-white/80">Happy Clients</p>
            </div>
            <div className="animate-scale-in animate-delay-200">
              <div className="text-4xl font-bold text-primary mb-2">400%</div>
              <p className="text-white/80">Average ROI Increase</p>
            </div>
            <div className="animate-scale-in animate-delay-300">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-white/80">Client Retention Rate</p>
            </div>
            <div className="animate-scale-in animate-delay-400">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-white/80">Customer Support</p>
            </div>
          </div>
        </section>

        {/* Recommended Add-ons Section */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            <span className="text-white">Recommended </span>
            <span className="text-primary">Add-ons</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ASO Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      ASO (App Store Optimization)
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Listings, creatives, keywords, reviews uplift
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CRO Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Conversion Rate Optimization (CRO)
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Heatmaps, session replays, A/B tests
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Landing Page Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Layout className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Landing Page Design & Copy
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Fast pages that convert paid traffic
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video/YouTube Marketing Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Video/YouTube Marketing
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Scripts, edits, SEO, channel growth
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Influencer & UGC Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Influencer & UGC
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Brief creation, sourcing, whitelisting ads
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Automation & CRM Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Marketing Automation & CRM
                    </h3>
                    <p className="text-gray-400 text-sm">
                      HubSpot/Zoho journeys, lead scoring
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose CybaemTech Section */}
        <section className="mb-16 py-16 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Why Choose </span>
              <span className="text-primary">CybaemTech</span>
            </h2>
            <p className="text-gray-400 text-lg">What makes us different from other digital marketing agencies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Proven ROI Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaChartLine className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Proven ROI</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We focus on measurable ROI, not vanity metrics. Every campaign is optimized for real business outcomes.
                </p>
              </div>
            </div>

            {/* Transparent Reporting Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaEye className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Transparent Reporting</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Clear dashboards and regular reports keep you informed. No hidden metrics, no confusing jargon.
                </p>
              </div>
            </div>

            {/* Expert Team Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Expert Team</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Team of certified specialists in SEO, ads, content, design, and analytics working for your success.
                </p>
              </div>
            </div>

            {/* Tailored Strategies Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-400">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaCog className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Tailored Strategies</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Not one-size-fits-all. Each marketing plan is custom-built for your unique business goals.
                </p>
              </div>
            </div>

            {/* Ongoing Support Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaHeadphones className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Ongoing Support</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We don't just launch and leave. Continuous optimization and dedicated support throughout your journey.
                </p>
              </div>
            </div>

            {/* Proven Track Record Card */}
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-600">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaTrophy className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Proven Track Record</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  50+ satisfied clients across industries with consistent results and long-term partnerships.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-6">Trusted by leading brands worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="text-sm font-semibold">ISO 27001</div>
              <div className="text-sm font-semibold">Microsoft Partner</div>
              <div className="text-sm font-semibold">AWS Certified</div>
              <div className="text-sm font-semibold">4.8/5 Rating</div>
            </div>
          </div>
        </section>

        {/* What you can expect in the first 90 days */}
        <section className="mb-16 py-16 bg-gradient-to-b from-black to-gray-900 rounded-2xl animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">What you can expect in the first </span>
              <span className="text-primary">90 days</span>
            </h2>
            <p className="text-gray-400 text-lg">Real results, not empty promises</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {/* Card 1 */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-500">
                  20-40%
                </h3>
                <p className="text-gray-300 text-sm">Page speed & crawlability</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-500">
                  2-3x
                </h3>
                <p className="text-gray-300 text-sm">Email speed with structured experiments</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-500">
                  +30-80%
                </h3>
                <p className="text-gray-300 text-sm">Revenue from lifecycle flows</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-400">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-500">
                  100%
                </h3>
                <p className="text-gray-300 text-sm">Live ROAS/LTV dashboards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <ProcessSection />

        {/* Pricing Section */}
        <section id="pricing" className="mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
            <span className="text-white">Pricing </span>
            <span className="text-primary">Packages</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Choose a package that fits your business goals. All plans can be customized.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Basic Package */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
                <p className="text-sm text-gray-400 mb-6">Startups & Small Businesses</p>
                
                <ul className="space-y-3 mb-8 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic SEO optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Social media management (2 platforms)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Monthly content creation (4 posts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic analytics reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Email support</span>
                  </li>
                </ul>

                <Button onClick={() => navigate('/contact?plan=Basic')} className="w-full bg-transparent border border-white/20 hover:bg-primary/20 hover:border-primary text-white">
                  Select Plan
                </Button>
              </div>
            </div>

            {/* Growth Package - Most Popular */}
            <div className="group relative bg-gradient-to-br from-primary/10 to-blue-900/30 backdrop-blur-sm border-2 border-primary rounded-2xl p-6 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Most Popular
                </div>
              </div>
              <div className="relative z-10 mt-2">
                <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
                <p className="text-sm text-gray-300 mb-6">Growing Businesses</p>
                
                <ul className="space-y-3 mb-8 text-gray-200 text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced SEO + PPC campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Social media management (4 platforms)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Weekly content creation (12 posts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Google Ads management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed analytics & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority email & chat support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Monthly strategy calls</span>
                  </li>
                </ul>

                <Button onClick={() => navigate('/contact?plan=Growth')} className="w-full bg-primary hover:bg-primary/90 text-white">
                  Select Plan
                </Button>
              </div>
            </div>

            {/* Premium Package */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <p className="text-sm text-gray-400 mb-6">Large Enterprises</p>
                
                <ul className="space-y-3 mb-8 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full-stack digital marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All-platform social media</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Daily content & video creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Multi-channel PPC campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Email marketing automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Branding & design services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 priority support</span>
                  </li>
                </ul>

                <Button onClick={() => navigate('/contact?plan=Premium')} className="w-full bg-transparent border border-white/20 hover:bg-primary/20 hover:border-primary text-white">
                  Select Plan
                </Button>
              </div>
            </div>

            {/* Custom Package */}
            <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Custom</h3>
                <p className="text-sm text-gray-400 mb-6">Enterprise & Special Projects</p>
                
                <ul className="space-y-3 mb-8 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Fully customized solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated team assignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>API integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>White-label options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom reporting & dashboards</span>
                  </li>
                </ul>

                <Button onClick={() => navigate('/contact?plan=Custom')} className="w-full bg-transparent border border-white/20 hover:bg-primary/20 hover:border-primary text-white">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="text-white">Professional Photography & </span>
              <span className="text-primary">Video Services</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-6">Photography Services</h3>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex justify-between border-b border-gray-700/50 pb-3">
                      <strong className="text-white">Product Photography:</strong>
                      <span className="text-gray-400">Per session (up to 5 products)</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-700/50 pb-3">
                      <strong className="text-white">Individual Product Shots:</strong>
                      <span className="text-gray-400">Per product</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-700/50 pb-3">
                      <strong className="text-white">Corporate/Team Photography:</strong>
                      <span className="text-gray-400">Per session</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-700/50 pb-3">
                      <strong className="text-white">Event Photography:</strong>
                      <span className="text-gray-400">Per event</span>
                    </li>
                    <li className="flex justify-between pb-3">
                      <strong className="text-white">Social Media Content Shoots:</strong>
                      <span className="text-gray-400">Per session</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 italic mt-6">All photography includes professional editing, high-resolution delivery within 48-72 hours</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-4">Video Content Creation</h3>
                  <div className="text-2xl font-bold text-primary mb-6">Pro-Video <span className="text-sm font-normal text-gray-400">(Professional Pack)</span></div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>2 comprehensive process videos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>End-to-end production</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Professional editing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Platform optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Multiple format delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            <span className="text-white">What Our Clients Say About Our Digital Marketing </span>
            <span className="text-primary">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial Card 1 */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <FaQuoteLeft className="text-primary text-3xl opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">
                  "CYBAEM transformed our IT operations with 24/7 support and robust security monitoring."
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <strong className="text-primary font-semibold">CTO</strong>
                  <p className="text-gray-400 text-sm">FinTech Company</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <FaQuoteLeft className="text-primary text-3xl opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">
                  "Their digital marketing team increased our lead flow by 300% within six months — the ROI has exceeded all expectations."
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <strong className="text-primary font-semibold">CMO</strong>
                  <p className="text-gray-400 text-sm">E-commerce Brand</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 animate-slide-up animate-delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <FaQuoteLeft className="text-primary text-3xl opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">
                  "CYBAEM's SEO & content strategies helped us break into the top three search results in our industry — traffic and revenue both jumped."
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <strong className="text-primary font-semibold">Head of Growth</strong>
                  <p className="text-gray-400 text-sm">SaaS Company</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            <span className="text-white">Frequently Asked </span>
            <span className="text-primary">Questions</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  What types of digital marketing services does CybaemTech offer?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  We provide a full-suite of services including SEO (on-page, off-page, local), SEM/Google Ads, social media marketing (organic & paid), content marketing, email marketing & automation, influencer outreach, and analytics & conversion optimization.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  How does CybaemTech measure ROI and success in digital campaigns?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  We track Key Performance Indicators (KPIs) such as organic traffic growth, click-through rate (CTR), cost per acquisition (CPA), conversion rate, customer lifetime value (CLTV), and return on ad spend (ROAS). Our dashboards let you see real-time performance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  How quickly can I expect to see results from digital marketing?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  While paid campaigns (PPC, social ads) can deliver early traction within days, SEO and organic strategies typically take 3–6 months for sustained visibility, depending on market competition and content maturity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  Do you work with small businesses and startups—not just large enterprises?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  Absolutely. We tailor strategies depending on your budget, goals, and stage. Whether you're a startup looking to build brand awareness or an established firm scaling marketing, we adapt to your needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  How do you approach SEO for local vs national vs global markets?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  For local SEO, we optimize your Google Business Profile, citation building, locally targeted keywords. For national scale, we use broader keyword strategies, content clusters, and domain authority building. For global, we also factor in multilingual SEO, hreflang tags, geo-targeting, and content localization.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  Will I own the content, ad accounts, and assets created?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  Yes. All content (blogs, graphics, videos), ad accounts (Google, Meta, etc.), analytics dashboards, and data remain your intellectual property. We operate as your agency partner, not gatekeepers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
                <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                  How do you ensure transparency and communication throughout the project?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  We provide regular reports (weekly, monthly) with clear metrics, hold review calls, and maintain shared dashboards. Our project management ensures you always know what's happening and why each step is taken.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DigitalMarketing;