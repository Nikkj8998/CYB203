import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, GraduationCap, Users, Globe, Shield, Coffee, Gamepad2, Lightbulb, Award, Target, TrendingUp, ArrowRight } from "lucide-react";
import officeCollaboration from "@/assets/office-collaboration.jpg";
import teamCelebration from "@/assets/team-celebration.jpg";
import benefitsIllustration from "@/assets/benefits-illustration.jpg";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_BASE_URL } from "@/config/api";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  display_order: number;
  status: string;
}

const LifeAtCybaemTech = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  // Fetch gallery items from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery.php?status=active`);
        const data = await response.json();
        if (data.success && data.data) {
          setGalleryItems(data.data);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoadingGallery(false);
      }
    };
    fetchGallery();
  }, []);

  const whyChooseUs = [{
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovation-Driven Approach",
    description: "We embrace creativity and cutting-edge technology to keep your business ahead of the competition. Our team stays updated with latest technological trends and industry best practices.",
    keywords: ["digital marketing services", "technology implementation"]
  }, {
    icon: <Award className="h-8 w-8" />,
    title: "Quality & Excellence",
    description: "Our commitment to quality ensures high-performance, result-driven IT solutions that meet and exceed client expectations. We follow rigorous testing and quality assurance processes.",
    keywords: ["IT consulting company", "software development company Pune"]
  }, {
    icon: <Target className="h-8 w-8" />,
    title: "Customer-Centric Solutions",
    description: "We tailor our services to meet unique business needs, fostering long-term partnerships and sustainable success. Every solution is designed with your specific requirements in mind.",
    keywords: ["technology partner", "IT consulting company"]
  }, {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Proven Track Record",
    description: "With 75+ satisfied clients across diverse industries, we have demonstrated our ability to deliver successful technology implementations and digital marketing projects.",
    keywords: ["technology implementation", "digital marketing services"]
  }];
  const benefits = [{
    icon: <Heart className="h-6 w-6" />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, dental, vision, and wellness programs",
    details: ["Medical Insurance", "Mental health support"]
  }, {
    icon: <Clock className="h-6 w-6" />,
    title: "Work-Life Balance",
    description: "Flexible work arrangements and generous time off policies",
    details: ["Flexible work hours", "Remote work options", "Unlimited PTO"]
  }, {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Professional Development",
    description: "Continuous learning opportunities and career advancement programs",
    details: ["Training and certification budget", "Conference attendance", "Internal mentorship", "Leadership development"]
  }, {
    icon: <Users className="h-6 w-6" />,
    title: "Team & Culture",
    description: "Collaborative environment with regular team events and activities",
    details: ["Team building events", "Monthly social gatherings", "Office game rooms", "Volunteer opportunities"]
  }, {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Opportunities",
    description: "Work with international teams and travel opportunities",
    details: ["Global project assignments", "International collaboration", "Cultural exchange programs"]
  }];
  const perks = [{
    icon: <Coffee className="h-6 w-6" />,
    title: "Learning & Growth",
    description: "Access to mentorship, skill development programs, and cross-team learning opportunities"
  }, {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: "Flexible Hours",
    description: "Work schedules that adapt to your productivity and personal needs."
  }, {
    icon: <Users className="h-6 w-6" />,
    title: "Team Events",
    description: "Regular social events and team building activities"
  }, {
    icon: <Globe className="h-6 w-6" />,
    title: "Remote Work",
    description: "Flexible remote work options and home office setup"
  }];
  const cultureValues = [{
    title: "Innovation First",
    description: "We encourage creative thinking and innovative solutions to complex problems.",
    color: "bg-blue-500"
  }, {
    title: "Collaboration & Brainstorming",
    description: "We believe in the power of teamwork and cross-functional collaboration.",
    color: "bg-green-500"
  }, {
    title: "Continuous Learning",
    description: "We invest in our people's growth and encourage lifelong learning.",
    color: "bg-purple-500"
  }, {
    title: "Diversity & Inclusion",
    description: "We celebrate diversity and create an inclusive environment for all.",
    color: "bg-orange-500"
  }, {
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code to client service.",
    color: "bg-red-500"
  }, {
    title: "Work-Life Balance",
    description: "We support our team's personal well-being and work-life integration.",
    color: "bg-teal-500"
  }];
  const testimonials = [{
    name: "Alex Rivera",
    role: "Software Engineer",
    quote: "The learning opportunities here are incredible. I've grown more in my first year than in my previous three jobs combined.",
    image: "/placeholder.svg"
  }, {
    name: "Maria Santos",
    role: "Product Manager",
    quote: "CybaemTech truly cares about work-life balance. I can be present for my family while building an amazing career.",
    image: "/placeholder.svg"
  }, {
    name: "James Wilson",
    role: "DevOps Engineer",
    quote: "The collaborative culture here is outstanding. Everyone is willing to help and share knowledge.",
    image: "/placeholder.svg"
  }];
  return <div className="min-h-screen bg-black text-white">


    <Header />

    {/* Hero Section */}
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={officeCollaboration} alt="Team collaboration" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container text-center max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 text-balance leading-tight tracking-tight">
              LIFE AT
              <br />
              <span className="text-accent">CYBAEMTECH</span>
            </h1>

            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 animate-slide-up px-4">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed text-balance">
                Experience a workplace that values your growth, well-being, and success while building the future of technology.
              </p>
            </div>

            <div className="animate-slide-up">
              <Link to="/careers">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover-lift group border-2 border-accent hover:border-accent/90">
                  Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/30 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>


    {/* Team Culture & Celebrations */}
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-900 via-black to-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-teal-300">
            Team Culture & Celebrations
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 px-4">
            At CybaemTech, we celebrate every milestone together. From festivals to achievements,
            our vibrant culture brings us closer as one team.
          </p>
        </div>

        {/* Slider */}
        {loadingGallery ? (
          <div className="text-center py-12 text-gray-300">Loading celebrations...</div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-12 text-gray-300">No celebrations to display yet.</div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            {galleryItems.map((item) => (
              <SwiperSlide key={item.id} className="w-[300px] sm:w-[400px] md:w-[500px]">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>


    {/* Why Choose CYBAEM TECH Section */}
    <section className="py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={teamCelebration} alt="Team celebration" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              WHY CHOOSE
              <span className="text-accent block">CYBAEM TECH</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
              Your Trusted Technology Partner Since 2020
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {whyChooseUs.map((item, index) => <div key={index} className="flex gap-4 sm:gap-6 animate-slide-up hover-lift p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10" style={{
              animationDelay: `${index * 0.2}s`
            }}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                  {item.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">{item.description}</p>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </section>


    {/* Diversity & Inclusion */}
    <section className="py-12 sm:py-16 md:py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title & Intro */}
          <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              DIVERSITY & <span className="text-accent block">INCLUSION</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl">
              At CybaemTech, we believe that diversity drives innovation.
              We're committed to creating an inclusive environment where
              everyone can thrive, regardless of their background, identity,
              or experience.
            </p>
          </div>

          {/* Grid: Stats + Image Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">

            {/* Left Side - Stats */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-12 text-center">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-2 sm:mb-4">40%</div>
                <div className="text-sm sm:text-base md:text-lg text-white/70">Women in Leadership</div>
              </div>

              {/* <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-2 sm:mb-4">35+</div>
            <div className="text-sm sm:text-base md:text-lg text-white/70">Countries Represented</div>
          </div> */}

              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-2 sm:mb-4">60%</div>
                <div className="text-sm sm:text-base md:text-lg text-white/70">Diverse Hiring</div>
              </div>
            </div>

            {/* Right Side - Image Slider (with arrows) */}
            {(() => {
              const images = [
                "/uploads/Posts/w1.jpeg",
                "/uploads/Posts/w2.jpeg",
                "/uploads/Posts/w5.2.jpeg",
              ];

              const [slide, setSlide] = useState(0);

              useEffect(() => {
                const id = setInterval(() => {
                  setSlide((s) => (s + 1) % images.length);
                }, 5000);
                return () => clearInterval(id);
              }, []);

              return (
                <div className="relative w-full max-w-3xl h-64 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 group">
                  <div className="relative w-full max-w-3xl h-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 group">
                    <div
                      className="flex h-full transition-transform duration-700 ease-in-out"
                      style={{ transform: `translateX(-${slide * 100}%)` }}
                    >
                      {images.map((src, i) => (
                        <div
                          key={i}
                          className="w-full h-full flex items-center justify-center flex-shrink-0 bg-black"
                        >
                          <img
                            src={src}
                            alt={`Diversity ${i + 1}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* Left Arrow */}
                  <button
                    onClick={() => setSlide(slide === 0 ? images.length - 1 : slide - 1)}
                    className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 bg-black/50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition text-sm sm:text-base"
                  >
                    &#8592;
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={() => setSlide((slide + 1) % images.length)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 bg-black/50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition text-sm sm:text-base"
                  >
                    &#8594;
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>

    {/* Slider Animation */}
    <style>
      {`
    @keyframes slide-x {
      0%, 15%   { transform: translateX(0%); }
      20%, 35%  { transform: translateX(-20%); }
      40%, 55%  { transform: translateX(-40%); }
      60%, 75%  { transform: translateX(-60%); }
      80%, 95%  { transform: translateX(-80%); }
      100%      { transform: translateX(0%); }
    }

    .animate-slide-x {
      animation: slide-x 25s infinite ease-in-out;
    }
  `}
    </style>

    {/* Benefits Overview */}
    <section className="py-12 sm:py-16 md:py-20 bg-black relative">
      <div className="absolute inset-0 z-0 right-0 top-0 w-1/2 hidden md:block">
        <img src={benefitsIllustration} alt="Benefits illustration" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              BENEFITS FOR THE
              <span className="text-accent block">WHOLE YOU</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl">
              Our comprehensive benefits support your well-being at work and at home, so you can achieve your aspirations personally and professionally as part of our software development company in Pune.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {benefits.map((benefit, index) => <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start animate-slide-up hover-lift p-4 sm:p-6 md:p-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10" style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                  {benefit.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white">{benefit.title}</h3>
                <p className="text-base sm:text-lg text-white/70 mb-4 sm:mb-6">{benefit.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {benefit.details.map((detail, detailIndex) => <div key={detailIndex} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-white/60">{detail}</span>
                  </div>)}
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    {/* Office Perks */}
    <section className="py-12 sm:py-16 md:py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              YOUR WORK
              <span className="text-accent block">ENVIRONMENT</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl">
              We've created a modern workspace that supports collaboration, creativity, and well-being for our IT consulting company team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {perks.map((perk, index) => <div key={index} className="flex gap-4 sm:gap-6 animate-slide-up hover-lift p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10" style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                  {perk.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{perk.title}</h3>
                <p className="text-sm sm:text-base text-white/70">{perk.description}</p>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    {/* Company Culture */}
    <section className="py-12 sm:py-16 md:py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              OUR CULTURE &
              <span className="text-accent block">VALUES</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl">
              As a leading technology partner, we foster an environment where innovation thrives and every team member can reach their full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {cultureValues.map((value, index) => <div key={index} className="flex gap-4 sm:gap-6 animate-slide-up hover-lift p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10" style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${value.color} mt-1.5 sm:mt-2`}></div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
                  {value.title === "Collaboration & Brainstorming" ? (
                    <>
                      Collaboration & <span className="text-green-500">Brainstorming</span>
                    </>
                  ) : value.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">{value.description}</p>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    {/* Employee Testimonials */}
    {/* <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                WHAT OUR
                <span className="text-accent block">PEOPLE SAY</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl">
                Hear from our team members about their experience working with our digital transformation services team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg hover-lift animate-slide-up" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <div className="mb-6">
                    <p className="text-lg text-white/70 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section> */}




    {/* Call to Action */}
    <section className="py-12 sm:py-16 md:py-20 bg-black border-t border-white/10 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              READY TO JOIN
              <span className="text-accent block">OUR TEAM?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/80 leading-relaxed px-4">
              Discover opportunities to grow your career while making a meaningful impact in the world of technology implementation and digital marketing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up">
              <Link to="/careers" className="w-full sm:w-auto">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover-lift group border-2 border-accent hover:border-accent/90 w-full">
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="border-white hover:bg-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover-lift text-gray-950 w-full">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>;
};
export default LifeAtCybaemTech;