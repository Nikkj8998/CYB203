import { Shield, Award, CheckCircle, Star, Cloud, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedStat = ({ value, label, index }: { value: string; label: string; index: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    if (value === "24/7") {
      setCount(247);
      return;
    }

    if (value === "4.8 ⭐") {
      let startTime: number | null = null;
      const targetValue = 48;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / 2000, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * targetValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(targetValue);
        }
      };
      requestAnimationFrame(animate);
      return;
    }

    const numericValue = parseInt(value.replace(/\D/g, ""));
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 2000, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  const displayValue = () => {
    if (value === "24/7") return value;
    if (value === "4.8 ⭐") return `${(count / 10).toFixed(1)} ⭐`;
    if (value.includes("+")) return `${count}+`;
    return count;
  };

  return (
    <div
      ref={ref}
      className="text-center group relative px-3 py-4 md:px-4 md:py-5 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-950/10 border border-blue-800/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
      data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
      style={{
        animation: inView ? `fadeInUp 0.6s ease-out ${index * 0.15}s both` : 'none',
      }}
    >
      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 transition-all duration-300 group-hover:scale-105 group-hover:text-primary">
        {displayValue()}
      </div>
      <div className="text-xs text-white/80 font-semibold tracking-wide group-hover:text-white transition-colors duration-300">
        {label}
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

const StatsAndCertifications = () => {
  const [activeCard, setActiveCard] = useState(0);

  const stats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "10+", label: "Countries Served" },
    { value: "24/7", label: "Support Available" },
    { value: "4.8 ⭐", label: "Client Satisfaction" },
  ];

  const certifications = [
    {
      icon: Shield,
      title: "ISO 27001 Ready",
      subtitle: "Security Standard",
    },
    {
      icon: User,
      title: "Microsoft Partner",
      subtitle: "Cloud Solutions",
    },
    {
      icon: CheckCircle,
      title: "MSME Registered",
      subtitle: "UDYAM-MH-26-0207684",
    },
    {
      icon: Shield,
      title: "SSL Secured",
      subtitle: "Website Protection",
    },
    {
      icon: Star,
      title: "4.8/5 Rating",
      subtitle: "Global Clients",
    },
    {
      icon: Cloud,
      title: "AWS Certified",
      subtitle: "Cloud Infrastructure",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % certifications.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [certifications.length]);

  return (
    <section className="relative bg-black pt-0 pb-6 md:pb-10 lg:pb-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Certifications Heading */}
        <div className="text-center mt-8 md:mt-10 mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">Trusted & Certified by </span>
            <span className="text-primary">Leading Organizations</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 max-w-7xl mx-auto">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            const isActive = activeCard === index;
            return (
              <div
                key={index}
                className={`group relative p-5 md:p-6 rounded-xl bg-[#1e3a5f] border cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/20 -translate-y-1' 
                    : 'border-blue-900/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1'
                }`}
                data-testid={`cert-${cert.title.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s both`,
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`p-2.5 rounded-lg bg-blue-500/20 transition-all duration-300 ${
                    isActive ? 'scale-110 rotate-12 bg-blue-500/30' : 'group-hover:scale-110 group-hover:rotate-12 group-hover:bg-blue-500/30'
                  }`}>
                    <IconComponent className={`w-6 h-6 md:w-7 md:h-7 text-blue-400 transition-all duration-300 ${
                      isActive ? 'text-blue-300' : 'group-hover:text-blue-300'
                    }`} />
                  </div>
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="text-sm md:text-base font-semibold text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className={`text-xs transition-colors duration-300 ${
                    isActive ? 'text-white/80' : 'text-white/60 group-hover:text-white/80'
                  }`}>
                    {cert.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsAndCertifications;
