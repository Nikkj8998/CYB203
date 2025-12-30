import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";

const AnimatedNumber = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const TransformBusinessCTA = () => {
  return (
    <section className="relative bg-black py-8 md:py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 p-6 md:p-8 lg:p-10 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAydjJoMnYtMmgtMnptLTIgMGgtMnYyaDJ2LTJ6bTAtMnYyaDJ2LTJoLTJ6bTItMmgydi0yaC0ydjJ6bTAtMnYtMmgtMnYyaDJ6bTIgMGgydjJoLTJ2LTJ6bTAgMnYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-base md:text-lg text-blue-50/90 max-w-3xl mx-auto leading-relaxed">
                  Join 50+ successful companies worldwide who trust us with their digital transformation journey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 md:mb-8">
                <a href="tel:+919028541383" className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Book a Strategy Call
                </a>
                <div className="flex items-center gap-2 text-white/90">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm md:text-base">Free 30-minute consultation</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-5 md:pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="text-center group">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        <AnimatedNumber end={4} duration={1500} />.<AnimatedNumber end={8} duration={1500} />
                      </span>
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 fill-yellow-300 animate-pulse" />
                    </div>
                    <p className="text-blue-50/80 text-xs md:text-sm font-medium">Client Rating</p>
                  </div>

                  <div className="text-center group">
                    <div className="mb-1">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        <AnimatedNumber end={100} duration={2000} suffix="%" />
                      </span>
                    </div>
                    <p className="text-blue-50/80 text-xs md:text-sm font-medium">Project Success</p>
                  </div>

                  <div className="text-center group">
                    <div className="mb-1">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        <AnimatedNumber end={24} duration={1500} suffix="h" />
                      </span>
                    </div>
                    <p className="text-blue-50/80 text-xs md:text-sm font-medium">Response Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformBusinessCTA;
