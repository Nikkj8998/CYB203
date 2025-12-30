import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const clientStories = [
  {
    title: "AI Refinery: Smarter, faster marketing",
    description: "CybaemTech's marketers can focus on more creative, strategic work with AI agents, thanks to a strong digital core that paved the way for agentic architecture.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1920&h=1080",
    category: "AI & Technology"
  },
  {
    title: "The Enterprise reinvents the future of business",
    description: "How leading enterprises are using data to drive better decision-making and grow their business internationally.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1920&h=1080",
    category: "Digital Marketing"
  },
  {
    title: "Blockchain pioneers trust in supply chain traceability",
    description: "The industry-first blockchain platform creates a traceable, tamper-proof record of product provenance from the source.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920&h=1080",
    category: "Blockchain & Security"
  },
  {
    title: "Smart Manufacturing reimagines operations with AI-powered robotics",
    description: "Manufacturing companies are making operations smarter, faster and ready for the future using advanced AI and simulation technologies.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1920&h=1080",
    category: "AI & Robotics"
  },
  {
    title: "Digital Platform lays the foundation for a seamless future",
    description: "The global technology leader's interoperable, secure platform unifies digital identity, payments and assets, setting a new standard for trust and convenience.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=1920&h=1080",
    category: "Platform Solutions"
  },
  {
    title: "Enterprise workforce runs on gen AI fuel",
    description: "How global enterprises are using AI to redefine how work gets done, boosting quality, efficiency and productivity.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1920&h=1080",
    category: "Workforce AI"
  }
];

const ClientStoriesCarousel = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => api.off("select", onSelect);
  }, [api]);

  useEffect(() => {
    if (!api || !isPlaying) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto mobile-padding">
        <div className="relative">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {clientStories.map((story, index) => (
                <CarouselItem key={index} className="relative">
                  <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0">
                      <div className="relative aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/9] overflow-hidden rounded-lg">
                        <img 
                          src={story.image} 
                          alt={story.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                          <div className="max-w-2xl">
                            <div className="text-accent text-xs md:text-sm font-semibold mb-1 md:mb-2 uppercase tracking-wide">
                              {story.category}
                            </div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 md:mb-4 leading-tight">
                              {story.title}
                            </h3>
                            <p className="text-lg text-white/90 mb-6 leading-relaxed">
                              {story.description}
                            </p>
                            <Button 
                              variant="outline" 
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                            >
                              Read more <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              className="bg-white border-gray-300 hover:bg-gray-50"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => api?.scrollPrev()}
                className="p-1 h-auto"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="min-w-[60px] text-center">
                {current + 1} of {clientStories.length}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => api?.scrollNext()}
                className="p-1 h-auto"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {clientStories.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? 'bg-accent' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesCarousel;