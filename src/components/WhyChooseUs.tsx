import { CheckCircle, Clock, User, Users, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const WhyChooseUs = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplayInterval = setInterval(() => {
      if (!isHovered && emblaApi) {
        emblaApi.scrollNext();
      }
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi, isHovered]);

  const reasons = [
    {
      icon: CheckCircle,
      title: "10+ Global Service Verticals",
      description: "Comprehensive IT solutions covering all your business needs from cloud to cybersecurity",
      badge: "14 Core Services",
    },
    {
      icon: Clock,
      title: "24/7 Support & Remote Monitoring",
      description: "Round-the-clock technical support and proactive monitoring across all time zones",
      badge: "99.9% Uptime",
    },
    {
      icon: User,
      title: "Certified Experts",
      description: "Cloud, Cybersecurity, and Microsoft 365 certified professionals at your service",
      badge: "50+ Certifications",
    },
    {
      icon: Users,
      title: "100+ Successful Projects",
      description: "Delivered globally across startups, SMEs, and enterprise clients worldwide",
      badge: "10+ Countries",
    },
    {
      icon: TrendingUp,
      title: "Proven ROI-Driven Campaigns",
      description: "Digital marketing campaigns that deliver measurable results and business growth",
      badge: "300%+ ROI Average",
    },
  ];

  return (
    <section className="relative bg-black py-8 md:py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">Why Choose </span>
            <span className="text-primary">Us</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by businesses worldwide for our expertise, reliability, and results-driven approach
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 opacity-100 hover:bg-primary/30 hover:scale-110 cursor-pointer shadow-lg shadow-primary/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 opacity-100 hover:bg-primary/30 hover:scale-110 cursor-pointer shadow-lg shadow-primary/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          <div 
            className="overflow-hidden px-2" 
            ref={emblaRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex -ml-4">
              {reasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <div
                    key={index}
                    className="pl-4 w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
                  >
                    <div className="group relative h-full p-5 md:p-6 lg:p-7 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#0f1f3a] border-2 border-blue-900/40 transition-all duration-500 ease-out hover:border-blue-400/80 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] cursor-pointer backdrop-blur-sm overflow-hidden">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-purple-500/0 opacity-0 group-hover:from-blue-500/15 group-hover:via-blue-600/10 group-hover:to-purple-500/15 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Subtle shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="mb-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/30 to-blue-600/30 border-2 border-primary/40 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary/70 group-hover:to-blue-500/70 group-hover:border-primary/70 shadow-lg shadow-primary/20 group-hover:shadow-[0_10px_30px_-5px_rgba(59,130,246,0.6)]">
                            <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-12" />
                          </div>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-all duration-500">
                          {reason.title}
                        </h3>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 group-hover:text-gray-100 transition-all duration-500">
                          {reason.description}
                        </p>

                        <div className="inline-block">
                          <span className="px-4 py-2.5 rounded-full bg-primary/10 border-2 border-primary/30 text-sm font-semibold text-primary group-hover:bg-primary/40 group-hover:text-white group-hover:border-primary/70 group-hover:shadow-lg group-hover:shadow-primary/40 transition-all duration-500">
                            {reason.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {reasons.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === selectedIndex 
                    ? 'bg-primary w-8 scale-110' 
                    : 'bg-primary/30 hover:bg-primary/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
