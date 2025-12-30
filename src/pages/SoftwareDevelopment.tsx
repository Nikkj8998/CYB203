import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Globe,
  Smartphone,
  Layers,
  Database,
  Users,
  Zap,
  TrendingUp,
  Headphones,
  Code,
  Palette,
  Plug,
  Wrench,
  Building2,
  Heart,
  Truck,
  Monitor,
  GraduationCap,
  Building,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SoftwareDevelopment = () => {
  const location = useLocation();
  const [highlightedService, setHighlightedService] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setHighlightedService(id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedService(null);
      }, 3000);
    }
  }, [location.hash]);

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [whyChooseRef, whyChooseInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [industriesRef, industriesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const softwareServices = [
    { icon: Globe, title: "Website Development", description: "SEO-friendly, fast, and responsive websites designed to represent your brand professionally", features: ["SEO Optimized", "Responsive Design", "Fast Loading", "User-Friendly"] },
    { icon: Code, title: "Web Application Development", description: "Custom web applications that streamline business processes and manage data efficiently", features: ["Scalable", "Secure", "Cloud-Ready", "API Integrated"] },
    { icon: Smartphone, title: "Mobile App Development", description: "Secure and user-friendly Android, iOS, and cross-platform mobile apps for real-world use", features: ["iOS & Android", "Cross-Platform", "Offline Support", "Push Notifications"] },
    { icon: Database, title: "ERP Development", description: "Centralized ERP solutions to manage finance, inventory, HR, and operations seamlessly", features: ["Finance Module", "Inventory Mgmt", "HR Automation", "Real-time Reports"] },
    { icon: Users, title: "CRM Development", description: "Custom CRM platforms to manage leads, sales pipelines, and customer interactions effectively", features: ["Lead Management", "Sales Pipeline", "Customer Portal", "Analytics"] },
    { icon: Palette, title: "UI / UX Design", description: "Intuitive, modern, and user-focused designs that improve usability and engagement", features: ["Wireframing", "Prototyping", "User Research", "Accessibility"] },
    { icon: Plug, title: "API Integrations", description: "Secure API integrations connecting your software with payment gateways and analytics", features: ["Payment Gateway", "Third-party APIs", "Cloud Integration", "Real-time Sync"] },
    { icon: Wrench, title: "Website Maintenance & Support", description: "Ongoing monitoring, updates, security patches, and performance optimization services", features: ["24/7 Monitoring", "Security Updates", "Backup Systems", "Performance Tuning"] }
  ];

  const whyChoosePoints = [
    { icon: Building2, title: "Enterprise-Grade Architecture", description: "Built with scalability and security at the core, using modern tech stacks and best practices." },
    { icon: TrendingUp, title: "Cost-Effective Pricing", description: "Premium quality solutions at competitive rates, maximizing your ROI without compromise." },
    { icon: Zap, title: "Scalable & Secure", description: "Future-proof solutions that grow with your business, protected by industry standards." },
    { icon: Headphones, title: "Dedicated Support", description: "Round-the-clock maintenance and support to ensure your systems run smoothly always." }
  ];

  const developmentProcess = [
    { step: "01", title: "Requirement Gathering", description: "Deep dive into your business needs, goals, and technical requirements", icon: CheckCircle },
    { step: "02", title: "UI/UX & Architecture", description: "Design intuitive interfaces and plan scalable system architecture", icon: Palette },
    { step: "03", title: "Agile Development", description: "Iterative development with regular updates and feedback loops", icon: Code },
    { step: "04", title: "Testing & QA", description: "Rigorous testing to ensure quality, performance, and security standards", icon: Shield },
    { step: "05", title: "Deployment", description: "Smooth deployment to production with zero downtime strategies", icon: Zap },
    { step: "06", title: "Support & Optimization", description: "Ongoing maintenance, monitoring, and continuous improvement services", icon: Headphones }
  ];

  const industries = [
    { icon: Building2, label: "Manufacturing" },
    { icon: Heart, label: "Healthcare" },
    { icon: Truck, label: "Logistics" },
    { icon: Monitor, label: "IT & SaaS" },
    { icon: Layers, label: "Finance" },
    { icon: GraduationCap, label: "Education" },
    { icon: Building, label: "Enterprises" }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section" style={{
        minHeight: '100vh',
        padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 4vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#000'
      }}>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(50px, -50px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.9); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 157, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(0, 255, 157, 0); }
          }
          @keyframes sparkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.3) rotate(180deg); opacity: 0.7; }
          }
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes deviceFloat {
            0%, 100% { transform: translateY(0) rotateY(-5deg); }
            50% { transform: translateY(-15px) rotateY(-5deg); }
          }
          @media (min-width: 768px) {
            #hero-content-wrapper {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #2563eb, transparent)',
            top: '-200px',
            left: '-100px',
            filter: 'blur(100px)',
            opacity: 0.3,
            animation: 'float 20s infinite ease-in-out'
          }}></div>
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00b8ff, transparent)',
            top: '20%',
            right: '-150px',
            filter: 'blur(100px)',
            opacity: 0.3,
            animation: 'float 20s infinite ease-in-out',
            animationDelay: '3s'
          }}></div>
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #3b82f6, transparent)',
            bottom: '-100px',
            left: '30%',
            filter: 'blur(100px)',
            opacity: 0.3,
            animation: 'float 20s infinite ease-in-out',
            animationDelay: '6s'
          }}></div>
        </div>

        {/* Content Wrapper */}
        <div id="hero-content-wrapper" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          padding: '0 clamp(1rem, 3vw, 3rem)'
        }}>
          {/* Left Content */}
          <div style={{ animation: 'fadeInLeft 1s ease-out' }}>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed mb-6 font-extrabold">
              <div className="text-white">Enterprise Software</div>
              <div className="text-primary">Development</div>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-10 opacity-95 text-white">
              Custom software solutions designed to transform your business. From web development to enterprise systems, we deliver end-to-end solutions with cutting-edge technology and proven expertise.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }} className="sm:flex-row sm:gap-3 sm:items-center"
              onMouseEnter={() => {}}>
              <Link to="/contact">
                <button style={{
                  background: 'linear-gradient(135deg, #2563eb, #0088ff)',
                  color: '#fff',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                  borderRadius: '50px',
                  fontWeight: 700,
                  border: 'none',
                  fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                  cursor: 'pointer',
                  boxShadow: '0 5px 30px rgba(37, 99, 235, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  transition: 'all 0.4s ease',
                  whiteSpace: 'nowrap'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(37, 99, 235, 0.5)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 5px 30px rgba(37, 99, 235, 0.3)';
                }}>
                  <ArrowRight size={20} /> Get Free Consultation
                </button>
              </Link>
              <button style={{
                background: 'transparent',
                color: '#fff',
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                borderRadius: '50px',
                fontWeight: 600,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Schedule a Demo
              </button>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}>
              Trusted by <strong style={{ color: '#ffffff', fontWeight: 'bold' }}>150+ enterprises</strong> • Serving businesses globally
            </p>
          </div>

          {/* Right Content - Devices */}
          <div style={{ position: 'relative', animation: 'fadeInRight 1s ease-out', height: 'clamp(300px, 60vw, 550px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }} className="md:mt-0">
            {/* Desktop Device */}
            <div style={{
              position: 'absolute',
              width: 'clamp(280px, 60vw, 500px)',
              zIndex: 3,
              animation: 'deviceFloat 6s ease-in-out infinite'
            }}>
              {/* Desktop Frame */}
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
                borderRadius: '12px 12px 0 0',
                padding: '8px',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}>
                {/* Desktop Top Bar */}
                <div style={{
                  background: 'rgba(20, 20, 20, 0.95)',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  gap: '6px',
                  borderRadius: '6px 6px 0 0'
                }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57', animation: 'dotPulse 2s infinite' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', animation: 'dotPulse 2s infinite', animationDelay: '0.3s' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28ca42', animation: 'dotPulse 2s infinite', animationDelay: '0.6s' }}></div>
                </div>
                {/* Desktop Screen */}
                <div style={{
                  background: 'linear-gradient(180deg, #0a1628 0%, #0d2240 50%, #0a1628 100%)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '0.55rem',
                  color: '#fff'
                }}>
                  {/* Desktop Header */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    padding: '6px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.4rem',
                    fontWeight: '500'
                  }}>
                    <div style={{ color: '#0066cc', fontWeight: '700', fontSize: '0.5rem' }}>Cybaem<span style={{ color: '#333' }}>Tech</span></div>
                    <div style={{ fontSize: '0.35rem', color: '#333', display: 'flex', gap: '8px' }}>
                      <span>Services ▾</span>
                      <span>Industries ▾</span>
                      <span>About ▾</span>
                      <span>Resources</span>
                    </div>
                    <div style={{ background: '#0066cc', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.35rem', fontWeight: '600' }}>
                      Contact
                    </div>
                  </div>
                  {/* Desktop Hero Content */}
                  <div style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, #0a1628 0%, #0d2240 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Floating Icons */}
                    <div style={{ position: 'absolute', top: '8%', left: '8%', fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)' }}>📷</div>
                    <div style={{ position: 'absolute', top: '15%', left: '20%', fontSize: '0.4rem', color: 'rgba(255,255,255,0.12)' }}>☁️</div>
                    <div style={{ position: 'absolute', bottom: '25%', left: '12%', fontSize: '0.35rem', color: 'rgba(255,255,255,0.1)' }}>&lt;/&gt;</div>
                    <div style={{ position: 'absolute', top: '12%', right: '15%', fontSize: '0.5rem', color: 'rgba(255,255,255,0.12)' }}>✉️</div>
                    <div style={{ position: 'absolute', top: '8%', right: '6%', fontSize: '0.55rem', color: 'rgba(59,89,152,0.4)' }}>f</div>
                    <div style={{ position: 'absolute', top: '40%', right: '8%', fontSize: '0.5rem', color: 'rgba(255,0,0,0.3)' }}>▶</div>
                    <div style={{ position: 'absolute', bottom: '20%', right: '10%', fontSize: '0.4rem', color: 'rgba(255,255,255,0.15)' }}>🛡️</div>
                    <div style={{ position: 'absolute', bottom: '15%', right: '5%', fontSize: '0.45rem', color: 'rgba(10,102,194,0.4)' }}>in</div>
                    {/* Main Text */}
                    <div style={{ fontSize: '0.72rem', color: '#fff', fontWeight: '800', marginBottom: '2px', letterSpacing: '1px', fontStyle: 'italic' }}>
                      INNOVATE. SECURE.
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#0066cc', fontWeight: '800', marginBottom: '6px', letterSpacing: '1px', fontStyle: 'italic' }}>
                      SCALE!
                    </div>
                    <div style={{ fontSize: '0.28rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', lineHeight: '1.4', maxWidth: '85%' }}>
                      Your Trusted Technology Partner for IT Infrastructure, Cloud Services, Cybersecurity, and Digital Marketing — Globally.
                    </div>
                    <div style={{
                      fontSize: '0.35rem',
                      background: '#0066cc',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      Get Free Consultation →
                    </div>
                  </div>
                  {/* Partner Logos */}
                  <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '4px 8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.25rem',
                    color: '#333'
                  }}>
                    <span style={{ background: '#f5f5f5', padding: '2px 4px', borderRadius: '2px' }}>HP</span>
                    <span style={{ background: '#f5f5f5', padding: '2px 4px', borderRadius: '2px' }}>aws</span>
                    <span style={{ background: '#f5f5f5', padding: '2px 4px', borderRadius: '2px' }}>ESET</span>
                    <span style={{ background: '#f5f5f5', padding: '2px 4px', borderRadius: '2px' }}>Fortinet</span>
                  </div>
                </div>
              </div>
              {/* Desktop Stand */}
              <div style={{
                width: '180px',
                height: '6px',
                background: 'linear-gradient(135deg, #2d2d2d, #1a1a1a)',
                margin: '0 auto',
                borderRadius: '0 0 6px 6px'
              }}></div>
              {/* Desktop Base */}
              <div style={{
                width: '250px',
                height: '8px',
                background: 'linear-gradient(135deg, #1a1a1a, #000)',
                margin: '0 auto',
                borderRadius: '12px',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)'
              }}></div>
            </div>

            {/* Tablet Device */}
            <div style={{
              position: 'absolute',
              width: 'clamp(140px, 40vw, 220px)',
              bottom: 'clamp(30px, 8vw, 60px)',
              left: 'clamp(-60px, -10vw, -80px)',
              zIndex: 5,
              animation: 'tabletFloat 5s ease-in-out infinite',
              animationDelay: '1s'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
                borderRadius: '20px',
                padding: '12px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                border: '3px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  background: 'linear-gradient(180deg, #0a1628 0%, #0d2240 100%)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '0.4rem',
                  color: '#fff'
                }}>
                  {/* Tablet Header */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    padding: '5px 8px',
                    fontSize: '0.32rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#0066cc', fontWeight: '700' }}>Cybaem<span style={{ color: '#333' }}>Tech</span></span>
                    <span style={{ background: '#0066cc', color: '#fff', padding: '2px 5px', borderRadius: '3px', fontSize: '0.25rem' }}>Contact</span>
                  </div>
                  {/* Tablet Content */}
                  <div style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, #0a1628 0%, #0d2240 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    {/* Floating Icons */}
                    <div style={{ position: 'absolute', top: '10%', left: '10%', fontSize: '0.35rem', color: 'rgba(255,255,255,0.12)' }}>📷</div>
                    <div style={{ position: 'absolute', top: '8%', right: '8%', fontSize: '0.4rem', color: 'rgba(59,89,152,0.3)' }}>f</div>
                    <div style={{ position: 'absolute', bottom: '18%', right: '8%', fontSize: '0.35rem', color: 'rgba(10,102,194,0.3)' }}>in</div>
                    <div style={{ fontSize: '0.45rem', color: '#fff', fontWeight: '800', marginBottom: '2px', fontStyle: 'italic' }}>
                      INNOVATE. SECURE.
                    </div>
                    <div style={{ fontSize: '0.45rem', color: '#0066cc', fontWeight: '800', marginBottom: '5px', fontStyle: 'italic' }}>
                      SCALE!
                    </div>
                    <div style={{ fontSize: '0.2rem', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', lineHeight: '1.3' }}>
                      Your Trusted Technology Partner
                    </div>
                    <div style={{
                      fontSize: '0.25rem',
                      background: '#0066cc',
                      color: '#fff',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontWeight: '600'
                    }}>
                      Get Consultation →
                    </div>
                  </div>
                  {/* Partner Logos */}
                  <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '3px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '4px',
                    fontSize: '0.18rem',
                    color: '#333'
                  }}>
                    <span style={{ background: '#f5f5f5', padding: '1px 3px', borderRadius: '2px' }}>HP</span>
                    <span style={{ background: '#f5f5f5', padding: '1px 3px', borderRadius: '2px' }}>aws</span>
                    <span style={{ background: '#f5f5f5', padding: '1px 3px', borderRadius: '2px' }}>ESET</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Device */}
            <div style={{
              position: 'absolute',
              width: 'clamp(90px, 30vw, 140px)',
              bottom: 'clamp(40px, 10vw, 80px)',
              right: 'clamp(-40px, -8vw, -50px)',
              zIndex: 4,
              animation: 'mobileFloat 4s ease-in-out infinite',
              animationDelay: '2s'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
                borderRadius: '28px',
                padding: '10px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                border: '3px solid rgba(255, 255, 255, 0.15)',
                position: 'relative'
              }}>
                {/* Notch */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '18px',
                  background: '#000',
                  borderRadius: '0 0 12px 12px',
                  zIndex: 10
                }}></div>
                <div style={{
                  background: 'linear-gradient(180deg, #0a1628 0%, #0d2240 100%)',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  aspectRatio: '9/19.5',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '0.32rem',
                  color: '#fff'
                }}>
                  {/* Mobile Header */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    padding: '5px 6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.25rem'
                  }}>
                    <span style={{ color: '#0066cc', fontWeight: '700' }}>Cybaem<span style={{ color: '#333' }}>Tech</span></span>
                    <span style={{ background: '#0066cc', color: '#fff', padding: '1px 3px', borderRadius: '2px', fontSize: '0.18rem' }}>☰</span>
                  </div>
                  {/* Mobile Content */}
                  <div style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, #0a1628 0%, #0d2240 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '6px',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    {/* Floating Icons */}
                    <div style={{ position: 'absolute', top: '12%', right: '10%', fontSize: '0.28rem', color: 'rgba(59,89,152,0.3)' }}>f</div>
                    <div style={{ position: 'absolute', bottom: '20%', left: '12%', fontSize: '0.22rem', color: 'rgba(255,255,255,0.1)' }}>&lt;/&gt;</div>
                    <div style={{ fontSize: '0.35rem', color: '#fff', fontWeight: '800', marginBottom: '1px', fontStyle: 'italic' }}>
                      INNOVATE.
                    </div>
                    <div style={{ fontSize: '0.32rem', color: '#fff', fontWeight: '800', marginBottom: '1px', fontStyle: 'italic' }}>
                      SECURE.
                    </div>
                    <div style={{ fontSize: '0.35rem', color: '#0066cc', fontWeight: '800', marginBottom: '4px', fontStyle: 'italic' }}>
                      SCALE!
                    </div>
                    <div style={{ fontSize: '0.15rem', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>
                      Your Trusted Partner
                    </div>
                    <div style={{
                      fontSize: '0.2rem',
                      background: '#0066cc',
                      color: '#fff',
                      padding: '2px 5px',
                      borderRadius: '2px',
                      fontWeight: '600'
                    }}>
                      Consultation →
                    </div>
                  </div>
                  {/* Partner Logos */}
                  <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '2px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2px',
                    fontSize: '0.12rem',
                    color: '#333'
                  }}>
                    <span style={{ background: '#f5f5f5', padding: '1px 2px', borderRadius: '1px' }}>HP</span>
                    <span style={{ background: '#f5f5f5', padding: '1px 2px', borderRadius: '1px' }}>aws</span>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes tabletFloat {
                0%, 100% { transform: translateY(0) rotate(-8deg); }
                50% { transform: translateY(-12px) rotate(-8deg); }
              }
              @keyframes mobileFloat {
                0%, 100% { transform: translateY(0) rotate(12deg); }
                50% { transform: translateY(-10px) rotate(12deg); }
              }
              @keyframes dotPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.8; }
              }
              @keyframes serviceHighlight {
                0% { 
                  box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4);
                  transform: scale(1.02);
                }
                50% { 
                  box-shadow: 0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.6);
                  transform: scale(1.025);
                }
                100% { 
                  box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4);
                  transform: scale(1.02);
                }
              }
              .service-highlighted {
                animation: serviceHighlight 0.6s ease-in-out 1;
                border-color: rgba(59, 130, 246, 0.9) !important;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative py-24 bg-gradient-to-b from-black via-slate-900/40 to-black overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Comprehensive Software </span>
              <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From web development to enterprise systems, we deliver end-to-end solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareServices.map((service, index) => {
              const Icon = service.icon;
              const serviceId = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <div
                  id={serviceId}
                  key={index}
                  className={`group transition-all duration-500 ${
                    servicesInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <Card className={`h-full bg-black border backdrop-blur-sm shadow-lg transition-all duration-500 hover:-translate-y-3 relative overflow-hidden ${
                    highlightedService === serviceId 
                      ? 'service-highlighted border-primary/90 shadow-2xl shadow-primary/50' 
                      : 'border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-6 relative z-10 flex gap-5">
                      {/* Icon Container */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors">
                          <Icon className="w-6 h-6 text-primary group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                      
                      {/* Content Container */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base md:text-lg text-white mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 2).map((feature, i) => (
                            <span key={i} className="inline-flex items-center text-xs bg-primary/10 text-cyan-400 px-2 py-1 rounded border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseRef} className="relative py-24 bg-gradient-to-b from-slate-900/50 to-black overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Why Businesses Trust </span>
              <span className="text-primary">Cybaem Tech</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We combine technical excellence with business understanding to deliver solutions that drive real results and transform your operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoosePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className={`group transition-all duration-500 transform hover:-translate-y-3 ${
                    whyChooseInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-300" />
                    <Card className="relative h-full bg-black border border-gray-700/30 hover:border-primary/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-lg text-white mb-3 group-hover:text-primary transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {point.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="relative py-24 bg-gradient-to-b from-black via-slate-900/60 to-slate-900/30 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">How We Build </span>
              <span className="text-primary">Success</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our proven development process ensures quality delivery, on time and within budget with transparent communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developmentProcess.map((process, index) => {
              const Icon = process.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 transform group ${
                    processInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                    <Card className="relative bg-black border border-gray-700/30 hover:border-primary/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 h-full">
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 min-w-fit bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/50 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
                            {process.step}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                              <Icon className="w-5 h-5 text-primary" />
                              {process.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed ml-20">
                          {process.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section ref={industriesRef} className="relative py-24 bg-gradient-to-b from-slate-900/30 to-black overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Transforming Industries </span>
              <span className="text-primary">Worldwide</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our solutions power businesses across diverse sectors, each tailored to industry-specific challenges and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className={`group transition-all duration-500 transform hover:scale-110 ${
                    industriesInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Card className="bg-black border border-gray-700/30 hover:border-primary/50 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/40 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
                      </div>
                      <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                        {industry.label}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center">
          <span className="text-white">Frequently Asked </span>
          <span className="text-primary">Questions</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
              <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                What software development services does Cybaem Tech provide?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Cybaem Tech provides end-to-end software development services, including website development, web application development, mobile app development, ERP development, CRM development, UI/UX design, API integrations, and website maintenance. Our solutions are designed for startups, SMEs, and enterprises looking for scalable and secure digital systems.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
              <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                Is Cybaem Tech a custom software development company in India?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Yes, Cybaem Tech is a custom software development company in India, delivering tailored solutions based on specific business requirements. We design and develop custom software for clients across Pune, Mumbai, Bangalore, Delhi, Hyderabad, and also serve international businesses in USA, UAE, UK, and Europe.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
              <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                Do you develop ERP and CRM software for enterprises?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Absolutely. We specialize in enterprise ERP and CRM software development that helps businesses manage operations, sales, customer data, inventory, finance, and reporting through a single integrated platform. Our ERP and CRM systems are fully customizable, secure, and scalable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
              <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                How does Cybaem Tech ensure quality and scalability in software development?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                We follow an agile software development process that includes requirement analysis, UI/UX planning, development, testing, deployment, and ongoing support. Our solutions are built using modern technologies, secure coding practices, and scalable architecture to ensure long-term performance and business growth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-primary/20 rounded-xl px-6 hover:border-primary/50 transition-all duration-300">
              <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                Which industries and locations does Cybaem Tech serve for software development?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Cybaem Tech serves industries such as manufacturing, healthcare, logistics, finance, education, IT & SaaS, startups, and enterprises. We provide software development services across India, including Pune and major metro cities, and offer global delivery for clients in USA, UAE, UK, and Europe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob" />
        </div>

        <div className="relative container mx-auto px-6 text-center z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            <span className="text-white">Ready to Transform Your </span>
            <span className="text-primary">Business?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Get a free consultation with our experts. Let's discuss how we can help you achieve your digital goals with custom software solutions tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg shadow-blue-600/50 transform hover:-translate-y-1 transition-all duration-300">
                Talk to Our Experts
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://wa.me/919028541383?text=Hi%20CybaemTech%2C%20I%20want%20to%20know%20about%20software%20development%20services" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="px-8 py-6 text-lg font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300">
                <Clock className="mr-3 w-5 h-5" />
                WhatsApp us
              </Button>
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-12">
            ✓ Serving businesses across Pune, Mumbai, Bangalore, Delhi, Hyderabad and globally in USA, UAE, UK & Europe.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SoftwareDevelopment;
