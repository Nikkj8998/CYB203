import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    title: "Microsoft 365",
    description: "Complete M365 setup and management",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    glowColor: "rgba(37, 99, 235, 0.4)",
    link: "/managed-services",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "ITSM Solutions",
    description: "IT service management and helpdesk",
    gradient: "from-purple-600 via-purple-500 to-blue-500",
    glowColor: "rgba(147, 51, 234, 0.4)",
    link: "/managed-services",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "IT AMC",
    description: "Annual maintenance contracts and support",
    gradient: "from-teal-600 via-teal-500 to-cyan-500",
    glowColor: "rgba(13, 148, 136, 0.4)",
    link: "/managed-services",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6"/>
      </svg>
    ),
    title: "IT Consulting",
    description: "Strategic IT planning and advisory",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    link: "/managed-services",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: "Enterprise Solutions",
    description: "Scalable enterprise-grade solutions",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    glowColor: "rgba(139, 92, 246, 0.4)",
    link: "/enterprise-solutions",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
    ),
    title: "Cybersecurity",
    description: "Comprehensive security solutions",
    gradient: "from-red-500 via-pink-500 to-rose-400",
    glowColor: "rgba(239, 68, 68, 0.4)",
    link: "/cybersecurity-services",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    ),
    title: "Cloud Services",
    description: "Modern cloud infrastructure and migration",
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    glowColor: "rgba(14, 165, 233, 0.4)",
    link: "/cloud-solutions",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    glowColor: "rgba(249, 115, 22, 0.4)",
    link: "/digital-marketing",
  },
];

const ServiceCard: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    window.location.href = service.link;
  };

  return (
    <div
      className="group"
      style={{
        minWidth: 'calc(25% - 24px)',
        height: '500px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '40px 32px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        border: isHovered ? `2px solid ${service.glowColor}` : '2px solid rgba(148, 163, 184, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered 
          ? `0 10px 30px -10px ${service.glowColor}`
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.glowColor}, transparent, ${service.glowColor})`,
        }}
      />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10"
          style={{
            animation: isHovered ? 'shine 1.5s ease-in-out' : 'none',
          }}
        ></div>
      </div>

      {/* Icon container */}
      <div
        className="relative mb-8"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '28px',
          background: `linear-gradient(135deg, ${service.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => {
            const colorMap: { [key: string]: string } = {
              'purple-600': '#9333ea', 'blue-600': '#2563eb', 'cyan-500': '#06b6d4',
              'red-500': '#ef4444', 'pink-500': '#ec4899', 'rose-400': '#fb7185',
              'blue-500': '#3b82f6', 'teal-500': '#14b8a6', 'green-400': '#4ade80',
              'orange-500': '#f97316', 'amber-500': '#f59e0b', 'yellow-400': '#facc15',
              'indigo-600': '#4f46e5', 'emerald-500': '#10b981', 'cyan-400': '#22d3ee',
              'violet-600': '#8b5cf6', 'fuchsia-500': '#d946ef', 'pink-400': '#f472b6',
              'sky-500': '#0ea5e9',
            };
            return colorMap[color] || '#3b82f6';
          }).join(', ')})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.5s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isHovered 
            ? `0 10px 30px -5px ${service.glowColor}`
            : `0 5px 20px ${service.glowColor}`,
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            color: 'white',
            transition: 'all 0.5s ease',
            transform: isHovered ? 'scale(1.1) rotate(12deg)' : 'scale(1) rotate(0deg)',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
          }}
        >
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3
          className="text-2xl font-bold mb-6 leading-tight"
          style={{
            color: isHovered ? '#ffffff' : '#e2e8f0',
            transition: 'color 0.5s ease',
          }}
        >
          {service.title}
        </h3>

        <p
          className="text-base mb-10 leading-relaxed"
          style={{
            color: isHovered ? '#f1f5f9' : '#94a3b8',
            transition: 'color 0.5s ease',
          }}
        >
          {service.description}
        </p>

        <button
          className="relative overflow-hidden px-8 py-4 rounded-full font-semibold text-sm"
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${service.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => {
                  const colorMap: { [key: string]: string } = {
                    'purple-600': '#9333ea', 'blue-600': '#2563eb', 'cyan-500': '#06b6d4',
                    'red-500': '#ef4444', 'pink-500': '#ec4899', 'rose-400': '#fb7185',
                    'blue-500': '#3b82f6', 'teal-500': '#14b8a6', 'green-400': '#4ade80',
                    'orange-500': '#f97316', 'amber-500': '#f59e0b', 'yellow-400': '#facc15',
                    'indigo-600': '#4f46e5', 'emerald-500': '#10b981', 'cyan-400': '#22d3ee',
                    'violet-600': '#8b5cf6', 'fuchsia-500': '#d946ef', 'pink-400': '#f472b6',
                    'sky-500': '#0ea5e9',
                  };
                  return colorMap[color] || '#3b82f6';
                }).join(', ')})`
              : 'rgba(148, 163, 184, 0.1)',
            color: isHovered ? 'white' : '#e2e8f0',
            border: `2px solid ${isHovered ? 'transparent' : 'rgba(148, 163, 184, 0.2)'}`,
            boxShadow: isHovered ? `0 10px 30px ${service.glowColor}` : 'none',
            transition: 'all 0.5s ease',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          Explore Solution
          <span
            className="ml-3 inline-block transition-transform duration-500"
            style={{
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
};

const ServicesWeProvide: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardsPerView = 4;
  const totalSlides = Math.ceil(services.length / cardsPerView);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 3000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, totalSlides]);

  return (
    <section className="py-10 md:py-14 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Services We </span>
            <span className="text-primary">Provide</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            IT Support & Management
          </h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive IT operations and maintenance
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="flex gap-8 min-w-full">
                  {services
                    .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
                    .map((service, index) => (
                      <ServiceCard
                        key={slideIndex * cardsPerView + index}
                        service={service}
                        index={index}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full p-4 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous slides"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full p-4 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next slides"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
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

export default ServicesWeProvide;
