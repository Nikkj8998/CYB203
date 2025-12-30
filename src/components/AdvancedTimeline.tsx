import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Building, MapPin, Lightbulb, Trophy, Handshake, Rocket } from "lucide-react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  isLeft: boolean;
  index: number;
}

const TimelineItem = ({ year, title, description, icon, image, isLeft, index }: TimelineItemProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [detailsRef, detailsInView] = useInView({
    threshold: 0.6,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center relative transition-all duration-1000 ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        transform: inView ? 'translateY(0)' : 'translateY(64px)'
      }}
    >
      {/* Timeline Dot with Pulsing Effect */}
      <div 
        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-black shadow-lg transition-all duration-700 z-20 ${
          inView ? 'bg-primary scale-110 shadow-primary/50' : 'bg-primary/50 scale-100'
        }`}
        style={{ 
          transitionDelay: `${index * 150 + 300}ms`,
          boxShadow: inView ? '0 0 20px hsl(var(--primary) / 0.4)' : 'none'
        }}
      >
        <div className={`absolute inset-0 rounded-full bg-primary transition-all duration-1000 ${
          inView ? 'animate-ping' : ''
        }`} style={{ animationDelay: `${index * 150 + 500}ms` }} />
      </div>

      {/* Left Side Content (when isLeft is true) */}
      {isLeft && (
        <div className="md:w-1/2 md:pr-8 md:text-right">
          <div 
            ref={detailsRef}
            className={`bg-card border-border rounded-lg overflow-hidden shadow-lg transition-all duration-700 group hover:shadow-2xl hover:shadow-primary/10 ${
              detailsInView 
                ? 'translate-y-0 opacity-100 rotate-0' 
                : 'translate-x-8 rotate-1 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 150 + 200}ms`,
              transform: detailsInView 
                ? 'translateY(0) translateX(0) rotate(0)' 
                : 'translateY(20px) translateX(32px) rotate(1deg)'
            }}
          >
            {/* Image with Parallax Effect */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={image}
                alt={`${title} - ${year}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                style={{ 
                  transform: detailsInView ? 'scale(1)' : 'scale(1.1)',
                  filter: detailsInView ? 'brightness(1)' : 'brightness(0.8)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="flex items-center justify-end mb-4">
                <div className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${
                  detailsInView ? 'rotate-0 scale-100' : 'rotate-45 scale-75'
                }`}>
                  {icon}
                </div>
                <h3 className={`text-2xl font-bold text-foreground transition-all duration-500 ${
                  detailsInView ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}>
                  {year}
                </h3>
              </div>
              
              <h4 className={`text-xl font-semibold text-primary mb-3 transition-all duration-500 ${
                detailsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ transitionDelay: `${index * 150 + 400}ms` }}>
                {title}
              </h4>
              
              <p className={`text-muted-foreground leading-relaxed transition-all duration-500 ${
                detailsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ transitionDelay: `${index * 150 + 600}ms` }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty space for left side when content is on right */}
      {!isLeft && <div className="md:w-1/2 md:pr-8" />}

      {/* Right Side Content (when isLeft is false) */}
      {!isLeft && (
        <div className="md:w-1/2 md:pl-8 md:text-left">
          <div 
            ref={detailsRef}
            className={`bg-card border-border rounded-lg overflow-hidden shadow-lg transition-all duration-700 group hover:shadow-2xl hover:shadow-primary/10 ${
              detailsInView 
                ? 'translate-y-0 opacity-100 rotate-0' 
                : '-translate-x-8 -rotate-1 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 150 + 200}ms`,
              transform: detailsInView 
                ? 'translateY(0) translateX(0) rotate(0)' 
                : 'translateY(20px) translateX(-32px) rotate(-1deg)'
            }}
          >
            {/* Image with Parallax Effect */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={image}
                alt={`${title} - ${year}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                style={{ 
                  transform: detailsInView ? 'scale(1)' : 'scale(1.1)',
                  filter: detailsInView ? 'brightness(1)' : 'brightness(0.8)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="flex items-center justify-start mb-4">
                <div className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${
                  detailsInView ? 'rotate-0 scale-100' : 'rotate-45 scale-75'
                }`}>
                  {icon}
                </div>
                <h3 className={`text-2xl font-bold text-foreground transition-all duration-500 ${
                  detailsInView ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}>
                  {year}
                </h3>
              </div>
              
              <h4 className={`text-xl font-semibold text-primary mb-3 transition-all duration-500 ${
                detailsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ transitionDelay: `${index * 150 + 400}ms` }}>
                {title}
              </h4>
              
              <p className={`text-muted-foreground leading-relaxed transition-all duration-500 ${
                detailsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ transitionDelay: `${index * 150 + 600}ms` }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty space for right side when content is on left */}
      {isLeft && <div className="md:w-1/2 md:pl-8" />}
    </div>
  );
};

const AdvancedTimeline = () => {
  const [progressRef, progressInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('timeline-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (elementHeight + windowHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineItems = [
    {
      year: "2020",
      title: "Foundation",
      description: "CybaemTech was founded with a clear vision: to revolutionize enterprise IT solutions and empower businesses with cutting-edge technology. It was a year of laying the groundwork and assembling a passionate team dedicated to innovation.",
      icon: <Building className="h-6 w-6 text-primary-foreground" />,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6000&q=80"
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Building on our initial success, we rapidly expanded our operations, extending our reach to serve clients across multiple continents. This global footprint allowed us to bring our transformative solutions to a broader audience and tackle diverse IT challenges.",
      icon: <MapPin className="h-6 w-6 text-primary-foreground" />,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6000&q=80"
    },
    {
      year: "2022",
      title: "Innovation Hub",
      description: "Understanding the pace of technological change, we launched our dedicated Innovation Hub. This specialized unit focuses on cutting-edge research and development, ensuring we remain at the forefront of emerging technologies and can consistently deliver future-proof solutions to our clients.",
      icon: <Lightbulb className="h-6 w-6 text-primary-foreground" />,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5530&q=80"
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Our commitment to excellence didn't go unnoticed. 2023 was a landmark year where we received multiple prestigious industry awards, acknowledging our leadership and outstanding contributions in IT services. These accolades are a testament to our team's hard work and dedication.",
      icon: <Trophy className="h-6 w-6 text-primary-foreground" />,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6052&q=80"
    },
    {
      year: "2024",
      title: "Strategic Partnerships",
      description: "To further enhance our capabilities and offer comprehensive solutions, we formed strategic alliances with several leading technology providers. These partnerships allow us to integrate best-in-class tools and platforms, providing our clients with even more robust and integrated IT ecosystems.",
      icon: <Handshake className="h-6 w-6 text-primary-foreground" />,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4076&q=80"
    },
    {
      year: "2025",
      title: "Client-Centric Solutions & Future Growth",
      description: "This year, we're doubling down on our commitment to client-centricity. We're rolling out enhanced service frameworks and customized solution offerings, ensuring every client's unique needs are met with precision and foresight. We're also actively exploring new market verticals and investing in advanced AI and machine learning capabilities to further enrich our portfolio and drive sustainable growth for both CybaemTech and our valued partners.",
      icon: <Rocket className="h-6 w-6 text-primary-foreground" />,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5760&q=80"
    }
  ];

  return (
    <section id="timeline-section" className="pt-32 pb-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={progressRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              progressInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Journey: Milestones in Transforming Enterprise IT
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're proud of the path we've forged in the world of enterprise IT. Here's a look at some of the key milestones in our journey:
            </p>
          </div>
          
          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full hidden md:block">
              <div 
                className="w-full bg-gradient-to-b from-primary to-primary/50 transition-all duration-1000 ease-out"
                style={{ 
                  height: `${scrollProgress * 100}%`,
                  boxShadow: '0 0 10px hsl(var(--primary) / 0.3)'
                }}
              />
            </div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  {...item}
                  isLeft={index % 2 === 0}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedTimeline;