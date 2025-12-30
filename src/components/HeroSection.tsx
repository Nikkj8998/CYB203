import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Shield, Megaphone, Code, Server, Lock } from "lucide-react";
import { SiFacebook, SiX, SiLinkedin, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";
import { Link } from "react-router-dom";
import { useEffect, useRef, useMemo } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);

  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 10,
    }));
  }, []);

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapesRef.current.forEach((shape, index) => {
          if (shape) {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            shape.style.transform = `translate(${x}px, ${y}px)`;
          }
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden hero-section-wrapper">
      {/* Animated Background Grid */}
      <div className="grid-bg"></div>

      {/* Floating Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`particle ${particle.id % 2 === 1 ? 'particle-odd' : ''} ${particle.id % 3 === 0 ? 'particle-3n' : ''}`}
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Service Icons with Parallax */}
      <div className="geometric-bg">
        <div 
          ref={(el) => shapesRef.current[0] = el}
          className="geo-shape geo-shape-1 flex items-center justify-center"
        >
          <Cloud className="w-24 h-24 md:w-32 md:h-32 text-accent/80" strokeWidth={1.5} />
        </div>
        <div 
          ref={(el) => shapesRef.current[1] = el}
          className="geo-shape geo-shape-2 flex items-center justify-center"
        >
          <Shield className="w-20 h-20 md:w-24 md:h-24 text-primary/80" strokeWidth={1.5} />
        </div>
        <div 
          ref={(el) => shapesRef.current[2] = el}
          className="geo-shape geo-shape-3 flex items-center justify-center"
        >
          <Megaphone className="w-16 h-16 md:w-20 md:h-20 text-accent/80" strokeWidth={1.5} />
        </div>
      </div>

      {/* Animated Directional Arrows */}
      <div className="arrow-container">
        <div className="arrow arrow-1"></div>
        <div className="arrow arrow-2"></div>
        <div className="arrow arrow-3"></div>
        <div className="arrow arrow-4"></div>
      </div>

      {/* Additional Service Icon */}
      <div className="pulse-circle flex items-center justify-center">
        <Code className="w-12 h-12 md:w-16 md:h-16 text-accent/70" strokeWidth={1.5} />
      </div>

      {/* Social Media Icons with Heartbeat Animation */}
      <div className="pulse-circle pulse-social-1 flex items-center justify-center">
        <SiFacebook className="w-10 h-10 md:w-14 md:h-14 text-accent/70" />
      </div>
      <div className="pulse-circle pulse-social-2 flex items-center justify-center">
        <SiX className="w-10 h-10 md:w-14 md:h-14 text-primary/70" />
      </div>
      <div className="pulse-circle pulse-social-3 flex items-center justify-center">
        <SiLinkedin className="w-10 h-10 md:w-14 md:h-14 text-accent/70" />
      </div>
      <div className="pulse-circle pulse-social-4 flex items-center justify-center">
        <SiInstagram className="w-10 h-10 md:w-14 md:h-14 text-primary/70" />
      </div>
      <div className="pulse-circle pulse-social-5 flex items-center justify-center">
        <SiWhatsapp className="w-10 h-10 md:w-14 md:h-14 text-accent/70" />
      </div>
      <div className="pulse-circle pulse-social-6 flex items-center justify-center">
        <SiYoutube className="w-10 h-10 md:w-14 md:h-14 text-primary/70" />
      </div>
      
      {/* Existing Animated Background Blurs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/40 rounded-full blur-xl animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/25 rounded-full blur-2xl animate-bounce" style={{animationDuration: '15s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/30 rounded-full blur-xl animate-pulse" style={{animationDuration: '25s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent/35 rounded-full blur-2xl animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-16 md:pt-20 pb-8 md:pb-12">
        <div className="container text-center max-w-6xl mx-auto mobile-padding">
          <div className="animate-fade-in">
            {/* Main Headline with Animations */}
            <h1 className="main-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-balance leading-tight px-4">
              <span className="line line-first text-white">
                INNOVATE. SECURE.
              </span>
              <span className="line line-second text-accent mt-4 md:mt-5">
                SCALE!
              </span>
            </h1>

            {/* Tagline */}
            <div className="max-w-3xl mx-auto mb-8 md:mb-10 hero-description px-4">
              <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                Your Trusted Technology Partner for IT Infrastructure, Cloud Services, Cybersecurity, and Digital Marketing — Globally.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="hero-cta mt-10 md:mt-14 mb-12 md:mb-16">
              <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold touch-target group border-2 border-accent hover:border-accent/90 w-auto cta-button-enhanced"
                data-testid="button-get-free-consultation"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
