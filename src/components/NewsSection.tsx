import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const newsItems = [
  {
    date: "January 06, 2025",
    title: "CybaemTech Launches AI Refinery for Industry to Reinvent Processes and Accelerate Agentic AI Journeys",
    link: "#",
    category: "AI Innovation",
    readTime: "3 min read"
  },
  {
    date: "January 07, 2025", 
    title: "CybaemTech Technology Vision 2025: New Age of AI to Bring Unprecedented Autonomy to Business",
    link: "#",
    category: "Technology Vision",
    readTime: "5 min read"
  },
  {
    date: "March 18, 2025",
    title: "CybaemTech Expands AI Refinery and Launches New Industry Agent Solutions to Accelerate Agentic AI Adoption",
    link: "#",
    category: "Product Launch",
    readTime: "4 min read"
  },
  // {
  //   date: "April 01, 2025",
  //   title: "CybaemTech and Leading Manufacturers Pave the Way for Industrial Humanoid Robots with NVIDIA and Microsoft Technologies",
  //   link: "#",
  //   category: "Partnership",
  //   readTime: "6 min read"
  // },
  {
    date: "May 13, 2025",
    title: "Enterprise Leaders and CybaemTech Launch Innovation Hub to Rapidly Advance Benefits of AI for Customers and Teams",
    link: "#",
    category: "Innovation",
    readTime: "4 min read"
  },
  {
    date: "June 20, 2025",
    title: "CybaemTech Reports Third-Quarter Fiscal 2025 Results",
    link: "#",
    category: "Financial",
    readTime: "2 min read"
  }
];

const NewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(newsItems.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(newsItems.length / 3)) % Math.ceil(newsItems.length / 3));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI Innovation": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Technology Vision": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Product Launch": "bg-green-500/20 text-green-400 border-green-500/30",
      "Partnership": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "Innovation": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "Financial": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className={`mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-center mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mr-4"></div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-4">
            CybaemTech news
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Stay informed with the latest developments, innovations, and insights from CybaemTech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-700 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                willChange: 'transform, opacity'
              }}
            >
              <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:bg-white/90 hover:border-gray-300/50 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-500 group-hover:scale-[1.02]">
                {/* Futuristic Corner Accent */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-br-full rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)} transition-all duration-300`}>
                    {item.category}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Date and Read Time */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold leading-tight mb-6 group-hover:text-blue-600 transition-colors duration-300 line-clamp-3">
                  {item.title}
                </h3>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-gray-700 hover:text-blue-600 font-semibold group/button transition-colors duration-300"
                  >
                    Read more 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                  </Button>
                  
                  {/* Animated Progress Bar */}
                  <div className="w-12 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Carousel Controls */}
        <div className={`flex items-center justify-center mt-16 space-x-4 transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full p-2 border border-gray-200/50">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`rounded-full h-10 w-10 p-0 ${isAutoPlay ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-gray-100'} transition-all duration-300`}
            >
              {isAutoPlay ? '⏸' : '▶'}
            </Button>
            <div className="h-6 w-px bg-gray-200"></div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={prevSlide}
              className="rounded-full h-10 w-10 p-0 hover:bg-gray-100 transition-all duration-300"
            >
              ←
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextSlide}
              className="rounded-full h-10 w-10 p-0 hover:bg-gray-100 transition-all duration-300"
            >
              →
            </Button>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(newsItems.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;