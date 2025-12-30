import { Target, Users, Lightbulb, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const AnimatedNumber = ({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-primary mb-2">
      {count}{suffix}
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <section className="py-10 md:py-14 bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="container mx-auto mobile-padding relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">Who We </span>
            <span className="text-primary">Are</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Founded in 2020, Cybaem Tech is your global IT solutions partner, driving digital transformation across industries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              <span className="text-primary font-semibold">Cybaem Tech</span> is a global IT solutions provider helping businesses 
              adopt digital transformation through cloud, cybersecurity, infrastructure management, and digital marketing services. 
              We serve startups, SMEs, and enterprises across industries with a mission to deliver scalable, secure, and sustainable 
              IT ecosystems that drive real business growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border border-primary/50 mb-3">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Mission</h3>
                <p className="text-sm text-gray-400">Scalable, secure IT ecosystems</p>
              </div>
              
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border border-primary/50 mb-3">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Clients</h3>
                <p className="text-sm text-gray-400">Startups to Enterprises</p>
              </div>
              
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border border-primary/50 mb-3">
                  <Lightbulb className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Innovation</h3>
                <p className="text-sm text-gray-400">Digital transformation</p>
              </div>
            </div>

            {/* Know More About Us Button */}
            <div className="pt-8">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-primary/30"
              >
                Know More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Column - Statistics Cards in 2x2 Grid with Animated Numbers */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 rounded-lg p-8 text-center backdrop-blur-sm hover:border-primary/60 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <AnimatedNumber end={2020} />
              <div className="text-gray-300">Founded</div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 rounded-lg p-8 text-center backdrop-blur-sm hover:border-primary/60 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <AnimatedNumber end={10} suffix="+" />
              <div className="text-gray-300">Service Verticals</div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 rounded-lg p-8 text-center backdrop-blur-sm hover:border-primary/60 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <AnimatedNumber end={100} suffix="+" />
              <div className="text-gray-300">Projects Delivered</div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 rounded-lg p-8 text-center backdrop-blur-sm hover:border-primary/60 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-300">Global Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
