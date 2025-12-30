import React, { useState, useEffect, useRef } from 'react';

const solutionGroups = [
  {
    title: "Digital Marketing Services",
    subtitle: "Drive traffic, generate leads, and boost ROI",
    solutions: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        ),
        title: "SEO Optimization",
        description: "Improve search rankings and organic traffic with data-driven SEO strategies and technical optimization.",
        gradient: "from-blue-500 via-cyan-500 to-teal-400",
        glowColor: "rgba(59, 130, 246, 0.4)",
        link: "/digital-marketing",
        category: "Digital Marketing",
        categoryDesc: "Drive traffic, generate leads, and boost ROI"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        ),
        title: "PPC Advertising",
        description: "Targeted ads with measurable ROI through strategic campaign management and conversion optimization.",
        gradient: "from-orange-500 via-amber-500 to-yellow-400",
        glowColor: "rgba(249, 115, 22, 0.4)",
        link: "/digital-marketing",
        category: "Digital Marketing",
        categoryDesc: "Drive traffic, generate leads, and boost ROI"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        ),
        title: "Social Media Marketing",
        description: "Build brand presence across platforms with engaging content and strategic social media campaigns.",
        gradient: "from-pink-500 via-rose-500 to-red-400",
        glowColor: "rgba(236, 72, 153, 0.4)",
        link: "/digital-marketing",
        category: "Digital Marketing",
        categoryDesc: "Drive traffic, generate leads, and boost ROI"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
        ),
        title: "Content Marketing",
        description: "Engaging content that converts visitors into customers with compelling storytelling and strategic distribution.",
        gradient: "from-purple-500 via-indigo-500 to-blue-400",
        glowColor: "rgba(168, 85, 247, 0.4)",
        link: "/digital-marketing",
        category: "Digital Marketing",
        categoryDesc: "Drive traffic, generate leads, and boost ROI"
      },
    ]
  },
  {
    title: "Cloud & Hosting Services",
    subtitle: "Scalable, secure cloud infrastructure solutions",
    solutions: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            <path d="M12 14l-3 3m0 0l3 3m-3-3h6"/>
          </svg>
        ),
        title: "Azure Migration",
        description: "Seamless cloud migration to Microsoft Azure with comprehensive infrastructure management, optimization, and 24/7 support for enhanced performance.",
        gradient: "from-blue-600 via-cyan-500 to-blue-400",
        glowColor: "rgba(37, 99, 235, 0.4)",
        link: "/cloud-solutions",
        category: "Cloud & Hosting Services",
        categoryDesc: "Scalable, secure cloud infrastructure solutions"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <path d="M8 21h8M12 17v4"/>
            <path d="M7 7h10M7 11h10"/>
          </svg>
        ),
        title: "AWS Solutions",
        description: "Comprehensive Amazon Web Services implementation including EC2, S3, Lambda, and RDS with expert cloud architecture design and cost optimization strategies.",
        gradient: "from-orange-500 via-yellow-500 to-amber-400",
        glowColor: "rgba(249, 115, 22, 0.4)",
        link: "/cloud-solutions",
        category: "Cloud & Hosting Services",
        categoryDesc: "Scalable, secure cloud infrastructure solutions"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        ),
        title: "Google Cloud",
        description: "Google Cloud Platform optimization with advanced compute engine, cloud storage, and BigQuery solutions to accelerate your digital transformation journey.",
        gradient: "from-red-500 via-yellow-500 to-green-500",
        glowColor: "rgba(239, 68, 68, 0.4)",
        link: "/cloud-solutions",
        category: "Cloud & Hosting Services",
        categoryDesc: "Scalable, secure cloud infrastructure solutions"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <circle cx="12" cy="9" r="2"/>
            <path d="M12 11v6"/>
          </svg>
        ),
        title: "Backup & DR",
        description: "Enterprise-grade data protection and disaster recovery solutions ensuring business continuity with automated backups and rapid recovery capabilities.",
        gradient: "from-cyan-500 via-blue-500 to-indigo-500",
        glowColor: "rgba(6, 182, 212, 0.4)",
        link: "/cloud-solutions",
        category: "Cloud & Hosting Services",
        categoryDesc: "Scalable, secure cloud infrastructure solutions"
      },
    ]
  },
  {
    title: "IT Support & Management",
    subtitle: "Comprehensive IT operations and maintenance",
    solutions: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
        ),
        title: "Microsoft 365",
        description: "Complete Microsoft 365 setup, migration, and management including Teams, SharePoint, Exchange, and security configuration for maximum productivity.",
        gradient: "from-blue-600 via-blue-500 to-cyan-500",
        glowColor: "rgba(37, 99, 235, 0.4)",
        link: "/managed-services",
        category: "IT Support & Management",
        categoryDesc: "Comprehensive IT operations and maintenance"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        ),
        title: "ITSM Solutions",
        description: "Professional IT service management and helpdesk solutions with incident tracking, change management, and automated workflows to streamline IT operations.",
        gradient: "from-purple-600 via-purple-500 to-blue-500",
        glowColor: "rgba(147, 51, 234, 0.4)",
        link: "/managed-services",
        category: "IT Support & Management",
        categoryDesc: "Comprehensive IT operations and maintenance"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        ),
        title: "IT AMC",
        description: "Comprehensive annual maintenance contracts providing proactive IT support, regular system updates, hardware maintenance, and priority technical assistance.",
        gradient: "from-teal-600 via-teal-500 to-cyan-500",
        glowColor: "rgba(13, 148, 136, 0.4)",
        link: "/managed-services",
        category: "IT Support & Management",
        categoryDesc: "Comprehensive IT operations and maintenance"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6"/>
          </svg>
        ),
        title: "IT Consulting",
        description: "Strategic IT planning and advisory services to align technology with business goals, optimize infrastructure, and drive digital innovation initiatives.",
        gradient: "from-blue-500 via-indigo-500 to-purple-500",
        glowColor: "rgba(99, 102, 241, 0.4)",
        link: "/managed-services",
        category: "IT Support & Management",
        categoryDesc: "Comprehensive IT operations and maintenance"
      },
    ]
  },
  {
    title: "Cybersecurity Services",
    subtitle: "Comprehensive security solutions and compliance",
    solutions: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        ),
        title: "VAPT Testing",
        description: "Comprehensive vulnerability assessment and penetration testing to identify security gaps, assess risks, and strengthen your cybersecurity defense mechanisms.",
        gradient: "from-blue-600 via-indigo-600 to-blue-500",
        glowColor: "rgba(37, 99, 235, 0.4)",
        link: "/cybersecurity-services",
        category: "Cybersecurity Services",
        categoryDesc: "Comprehensive security solutions and compliance"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
          </svg>
        ),
        title: "SOC Services",
        description: "Round-the-clock security operations center monitoring with real-time threat detection, incident response, and proactive security management for your infrastructure.",
        gradient: "from-cyan-600 via-blue-600 to-indigo-500",
        glowColor: "rgba(8, 145, 178, 0.4)",
        link: "/cybersecurity-services",
        category: "Cybersecurity Services",
        categoryDesc: "Comprehensive security solutions and compliance"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <circle cx="12" cy="9" r="1"/>
            <path d="M12 10v6"/>
          </svg>
        ),
        title: "SIEM Solutions",
        description: "Advanced security information and event management platforms for centralized log monitoring, threat intelligence, and automated security incident response.",
        gradient: "from-indigo-600 via-purple-600 to-blue-600",
        glowColor: "rgba(79, 70, 229, 0.4)",
        link: "/cybersecurity-services",
        category: "Cybersecurity Services",
        categoryDesc: "Comprehensive security solutions and compliance"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <path d="M9 15l2 2 4-4"/>
          </svg>
        ),
        title: "Compliance",
        description: "Expert compliance support for ISO 27001, SOX, GDPR, and other regulatory standards with audit preparation, policy development, and implementation guidance.",
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        glowColor: "rgba(59, 130, 246, 0.4)",
        link: "/cybersecurity-services",
        category: "Cybersecurity Services",
        categoryDesc: "Comprehensive security solutions and compliance"
      },
    ]
  },
  {
    title: "Enterprise Product Solutions",
    subtitle: "Custom software and digital products for modern businesses",
    solutions: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2"/>
            <path d="M7 8h10M7 12h6M7 16h4"/>
          </svg>
        ),
        title: "CRM & ERP",
        description: "Streamline business operations with custom CRM and ERP solutions that integrate seamlessly with your workflows and boost productivity.",
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        glowColor: "rgba(16, 185, 129, 0.4)",
        link: "/enterprise-solutions",
        category: "Enterprise Product Solutions",
        categoryDesc: "Custom software and digital products for modern businesses"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
        ),
        title: "Website Designing",
        description: "Create stunning, responsive websites that deliver exceptional user experiences and drive conversions with modern design principles.",
        gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
        glowColor: "rgba(139, 92, 246, 0.4)",
        link: "/enterprise-solutions",
        category: "Enterprise Product Solutions",
        categoryDesc: "Custom software and digital products for modern businesses"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <path d="M12 18h.01"/>
          </svg>
        ),
        title: "Mobile Development",
        description: "Build powerful native and cross-platform mobile applications that engage users and expand your business reach on iOS and Android.",
        gradient: "from-blue-500 via-indigo-500 to-purple-600",
        glowColor: "rgba(59, 130, 246, 0.4)",
        link: "/enterprise-solutions",
        category: "Enterprise Product Solutions",
        categoryDesc: "Custom software and digital products for modern businesses"
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        ),
        title: "Custom Software Solutions",
        description: "Tailored software development to solve unique business challenges with scalable, secure, and innovative technology solutions.",
        gradient: "from-orange-500 via-red-500 to-pink-500",
        glowColor: "rgba(249, 115, 22, 0.4)",
        link: "/enterprise-solutions",
        category: "Enterprise Product Solutions",
        categoryDesc: "Custom software and digital products for modern businesses"
      },
    ]
  }
];

const solutions = solutionGroups.flatMap(group => group.solutions);

interface SolutionCardProps {
  solution: typeof solutions[0];
  index: number;
  isGrid?: boolean;
  onHover?: (category: string, desc: string) => void;
  onLeave?: () => void;
  autoAnimate?: boolean;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, index, isGrid = false, onHover, onLeave, autoAnimate = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const isActive = isHovered || autoAnimate;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleCardClick = () => {
    window.location.href = solution.link;
  };

  return (
    <div
      className="solution-card group"
      style={{
        minWidth: isGrid ? 'auto' : '380px',
        width: isGrid ? '100%' : 'auto',
        height: '400px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: isActive ? 'translateY(-20px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: isActive 
          ? `0 40px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.2), 0 0 60px ${solution.glowColor}`
          : '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(148, 163, 184, 0.1)',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (onHover && solution.category && solution.categoryDesc) {
          onHover(solution.category, solution.categoryDesc);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (onLeave) {
          onLeave();
        }
      }}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms]"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${solution.glowColor}, transparent 50%)`,
          borderRadius: '32px',
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-[32px] transition-opacity duration-[1500ms]"
        style={{
          opacity: isActive ? 1 : 0,
          background: `linear-gradient(45deg, ${solution.glowColor}, transparent, ${solution.glowColor})`,
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              opacity: isActive ? 0.6 : 0,
              animation: isActive ? `float-particle-${i} 3s ease-in-out infinite` : 'none',
              ...(isActive && { animationDelay: `${i * 0.3}s` }),
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Icon container with advanced effects */}
      <div
        className="relative mb-6"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '24px',
          background: `linear-gradient(135deg, ${solution.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => {
            const colorMap: { [key: string]: string } = {
              'purple-600': '#9333ea', 'blue-600': '#2563eb', 'cyan-600': '#0891b2', 'cyan-500': '#06b6d4',
              'red-500': '#ef4444', 'pink-500': '#ec4899', 'rose-400': '#fb7185',
              'blue-500': '#3b82f6', 'blue-400': '#60a5fa', 'teal-500': '#14b8a6', 'green-400': '#4ade80', 'green-500': '#22c55e',
              'orange-500': '#f97316', 'amber-500': '#f59e0b', 'amber-400': '#fbbf24', 'yellow-500': '#eab308', 'yellow-400': '#facc15',
              'indigo-600': '#4f46e5', 'indigo-500': '#6366f1', 'emerald-500': '#10b981', 'cyan-400': '#22d3ee',
              'violet-600': '#8b5cf6', 'fuchsia-500': '#d946ef', 'pink-400': '#f472b6',
            };
            return colorMap[color] || '#3b82f6';
          }).join(', ')})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: isActive ? 'scale(1.2) rotate(360deg)' : 'scale(1) rotate(0deg)',
          boxShadow: isActive 
            ? `0 20px 60px ${solution.glowColor}, inset 0 0 20px rgba(255, 255, 255, 0.1)`
            : `0 15px 40px ${solution.glowColor}`,
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            color: 'white',
            transition: 'all 1s ease',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
          }}
        >
          {solution.icon}
        </div>

        {/* Rotating ring */}
        <div
          className="absolute inset-0 rounded-[24px] border-2 border-white/20"
          style={{
            animation: isActive ? 'spin 2s linear infinite' : 'none',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col" style={{ height: 'calc(100% - 110px)' }}>
        <h3
          className="text-xl font-bold mb-3 leading-tight"
          style={{
            color: isActive ? '#f1f5f9' : '#e2e8f0',
            transition: 'all 1s ease',
            textShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none',
          }}
        >
          {solution.title}
        </h3>

        <p
          className="text-sm leading-relaxed mb-6 flex-grow"
          style={{
            color: isActive ? '#cbd5e1' : '#94a3b8',
            transition: 'all 1s ease',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {solution.description}
        </p>

        {/* CTA Button */}
        <button
          className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-[1000ms] relative overflow-hidden mt-auto"
          style={{
            background: isActive 
              ? `linear-gradient(135deg, ${solution.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => {
                  const colorMap: { [key: string]: string } = {
                    'purple-600': '#9333ea', 'blue-600': '#2563eb', 'cyan-500': '#06b6d4',
                    'red-500': '#ef4444', 'pink-500': '#ec4899', 'rose-400': '#fb7185',
                    'blue-500': '#3b82f6', 'teal-500': '#14b8a6', 'green-400': '#4ade80',
                    'orange-500': '#f97316', 'amber-500': '#f59e0b', 'yellow-400': '#facc15',
                    'indigo-600': '#4f46e5', 'emerald-500': '#10b981', 'cyan-400': '#22d3ee',
                    'violet-600': '#8b5cf6', 'fuchsia-500': '#d946ef', 'pink-400': '#f472b6',
                  };
                  return colorMap[color] || '#3b82f6';
                }).join(', ')})`
              : 'rgba(148, 163, 184, 0.1)',
            color: isActive ? 'white' : '#e2e8f0',
            border: `2px solid ${isActive ? 'transparent' : 'rgba(148, 163, 184, 0.2)'}`,
            transform: isActive ? 'translateX(8px)' : 'translateX(0)',
            boxShadow: isActive ? `0 10px 30px ${solution.glowColor}` : 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          Explore Solution
          <span
            className="ml-3 transition-transform duration-[1000ms]"
            style={{
              transform: isActive ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
};

interface InsightCardsProps {
  title?: string;
  highlightedWord?: string;
  displayMode?: 'scroll' | 'carousel';
}

const InsightCards: React.FC<InsightCardsProps> = ({ 
  title = "Services We",
  highlightedWord = "Provide",
  displayMode = 'carousel'
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Digital Marketing");
  const [activeCategoryDesc, setActiveCategoryDesc] = useState("Drive traffic, generate leads, and boost ROI");
  const [animatingCardIndex, setAnimatingCardIndex] = useState<number>(-1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentGroupIndex >= solutionGroups.length) {
      setCurrentGroupIndex(0);
    }
  }, [currentGroupIndex]);

  const currentGroup = solutionGroups[currentGroupIndex] || solutionGroups[0];

  const handleNext = () => {
    setCurrentGroupIndex((prev) => (prev + 1) % solutionGroups.length);
  };

  const handlePrev = () => {
    setCurrentGroupIndex((prev) => (prev - 1 + solutionGroups.length) % solutionGroups.length);
  };

  const handleCardHover = (category: string, desc: string) => {
    if (displayMode === 'scroll') {
      setActiveCategory(category);
      setActiveCategoryDesc(desc);
    }
  };

  const handleCardLeave = () => {
    if (displayMode === 'scroll') {
      setActiveCategory("Digital Marketing");
      setActiveCategoryDesc("Drive traffic, generate leads, and boost ROI");
    }
  };

  useEffect(() => {
    if (displayMode === 'carousel') {
      setActiveCategory(currentGroup.title);
      setActiveCategoryDesc(currentGroup.subtitle);
    }
  }, [currentGroupIndex, displayMode, currentGroup]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollProgress(prev => (prev + 0.1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (displayMode !== 'carousel') return;

    let cardAnimationTimer: NodeJS.Timeout;
    let slideChangeTimer: NodeJS.Timeout;

    const startCardAnimationCycle = () => {
      let currentCardIndex = 0;
      
      const animateNextCard = () => {
        if (currentCardIndex < 4) {
          setAnimatingCardIndex(currentCardIndex);
          currentCardIndex++;
          cardAnimationTimer = setTimeout(animateNextCard, 2000);
        } else {
          setAnimatingCardIndex(-1);
          slideChangeTimer = setTimeout(() => {
            handleNext();
          }, 2000);
        }
      };

      animateNextCard();
    };

    const cycleTimer = setTimeout(startCardAnimationCycle, 1000);

    return () => {
      clearTimeout(cycleTimer);
      clearTimeout(cardAnimationTimer);
      clearTimeout(slideChangeTimer);
    };
  }, [currentGroupIndex, displayMode]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const toggleAutoScroll = () => {
    setIsAutoScrollPaused(!isAutoScrollPaused);
  };

  return (
    <>
      <style>{`
        @keyframes float-particle-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 1; }
        }
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-20px) rotate(-180deg); opacity: 0.8; }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-12px) rotate(90deg); opacity: 0.9; }
        }
        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-18px) rotate(-90deg); opacity: 0.7; }
        }
        @keyframes float-particle-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-14px) rotate(270deg); opacity: 1; }
        }
        @keyframes float-particle-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-16px) rotate(-270deg); opacity: 0.8; }
        }

        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes autoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-380px * 7 - 8px * 6)); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }

        @keyframes fadeInScale {
          from { 
            opacity: 0; 
            transform: scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }

        .solutions-scroll {
          animation: autoScroll 42s linear infinite;
        }

        .solutions-scroll:hover,
        .solutions-scroll.paused {
          animation-play-state: paused;
        }

        .solutions-scroll::-webkit-scrollbar {
          display: none;
        }

        .solution-card {
          animation: slideInUp 0.8s ease-out both;
        }

        .category-content {
          animation: fadeInScale 0.5s ease-out;
        }
      `}</style>

      <div
        className="min-h-screen overflow-x-hidden relative"
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: '#0D0D0D',
        }}
      >
        <div className="relative z-10 py-10 md:py-14">
          {/* Header */}
          <div className="text-center mb-8 px-8">
            <>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                <span className="text-white">{title} </span>
                <span className="text-primary">{highlightedWord}</span>
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
              
              {/* Dynamic Subtitle and Description */}
              <div className="category-content" key={activeCategory}>
                <h3 
                  className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
                  style={{
                    animation: 'fadeInScale 0.5s ease-out',
                  }}
                >
                  {activeCategory}
                </h3>
                
                <p
                  className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                  style={{
                    color: '#94a3b8',
                    animation: 'fadeInScale 0.5s ease-out 0.1s both',
                  }}
                >
                  {activeCategoryDesc}
                </p>
              </div>
            </>
          </div>

          <div className="relative overflow-hidden pt-4 pb-12">
            {displayMode === 'carousel' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 max-w-[1800px] mx-auto transition-all duration-500">
                  {currentGroup.solutions.map((solution, index) => (
                    <SolutionCard 
                      key={index} 
                      solution={solution} 
                      index={index} 
                      isGrid={true}
                      onHover={handleCardHover}
                      onLeave={handleCardLeave}
                      autoAnimate={animatingCardIndex === index}
                    />
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex justify-center items-center gap-8 mt-12">
                  <button
                    onClick={handlePrev}
                    className="group flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 hover:scale-110 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))',
                      border: '2px solid rgba(147, 51, 234, 0.3)',
                      color: '#e2e8f0',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px rgba(147, 51, 234, 0.2)',
                    }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover:scale-110 transition-transform duration-300"
                    >
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>

                  {/* Dots indicator */}
                  <div className="flex gap-3">
                    {solutionGroups.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentGroupIndex(index)}
                        className="cursor-pointer transition-all duration-300"
                        style={{
                          width: currentGroupIndex === index ? '32px' : '12px',
                          height: '12px',
                          borderRadius: '6px',
                          background: currentGroupIndex === index 
                            ? 'linear-gradient(135deg, #9333ea, #3b82f6)' 
                            : 'rgba(148, 163, 184, 0.3)',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="group flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 hover:scale-110 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))',
                      border: '2px solid rgba(147, 51, 234, 0.3)',
                      color: '#e2e8f0',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px rgba(147, 51, 234, 0.2)',
                    }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover:scale-110 transition-transform duration-300"
                    >
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="solutions-scroll flex gap-8 px-8">
                {solutions.map((solution, index) => (
                  <SolutionCard 
                    key={index} 
                    solution={solution} 
                    index={index} 
                    isGrid={false}
                    onHover={handleCardHover}
                    onLeave={handleCardLeave}
                  />
                ))}
                
                {solutions.map((solution, index) => (
                  <SolutionCard 
                    key={`duplicate-${index}`} 
                    solution={solution} 
                    index={index} 
                    isGrid={false}
                    onHover={handleCardHover}
                    onLeave={handleCardLeave}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InsightCards;
