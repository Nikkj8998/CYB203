import { CheckCircle, ArrowLeft, Phone, Mail, Calendar, Users, Clock, Star, Quote, Heart, MessageCircle, ArrowRight, BookOpen, Building, FileText, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ThankYouProps {
  onBack: () => void;
}

const ThankYou = ({ onBack }: ThankYouProps) => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "CTO, TechCorp",
      content: "Cybaem Tech transformed our entire infrastructure. Their expertise in cloud migration saved us 40% in operational costs.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      title: "CEO, DataFlow Solutions",
      content: "The cybersecurity solutions from Cybaem are top-notch. We've had zero incidents since implementation.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      title: "VP Operations, InnovateCorp",
      content: "Their AI analytics platform gave us insights we never knew existed. ROI was visible within 3 months.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const resources = [
    {
      icon: Building,
      title: "Browse our Solutions",
      description: "Explore our comprehensive technology solutions",
      href: "https://www.cybaemtech.com/solutions",
      color: "text-blue-400"
    },
    {
      icon: FileText,
      title: "Discover Industries We Serve",
      description: "See how we help businesses across different sectors",
      href: "https://www.cybaemtech.com/industries",
      color: "text-green-400"
    },
    {
      icon: BookOpen,
      title: "Read our Case Studies",
      description: "Learn from real success stories and implementations",
      href: "https://www.cybaemtech.com/case-studies",
      color: "text-purple-400"
    },
    {
      icon: Linkedin,
      title: "Connect with us on LinkedIn",
      description: "Stay updated with our latest insights and news",
      href: "https://in.linkedin.com/company/cybaemtech?trk=public_post_follow-view-profile",
      color: "text-blue-600"
    }
  ];

  // Update URL to show /thankyou
  React.useEffect(() => {
    window.history.pushState({}, '', '/thankyou');
  }, []);

  // Handler for resource navigation (clean URL, scroll to section if needed)
  const handleResourceClick = (path: string, scrollId?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    if (scrollId) {
      setTimeout(() => {
        const el = document.getElementById(scrollId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a0f1c]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-blue-500/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-blue-500/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/10 rounded-full"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Success Icon */}
            <div className="animate-scale-in mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="animate-fade-in text-4xl md:text-6xl font-bold mb-6 text-white">
              🎉 <span className="text-blue-400">Thank You</span> for Reaching Out to{" "}
              <span className="text-blue-400">Cybaem Tech!</span>
            </h1>

            {/* Sub-headline */}
            <p className="animate-fade-in text-xl md:text-2xl text-gray-300 mb-8" style={{ animationDelay: "0.2s" }}>
              Our sales representative will connect with you shortly — usually within a few minutes. 🚀
            </p>

            {/* Response Time Indicator */}
            <div className="animate-fade-in inline-flex items-center bg-blue-500/10 rounded-full px-6 py-3 mb-12" style={{ animationDelay: "0.4s" }}>
              <Clock className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-medium">Expected response time: 24 Hours</span>
            </div>

            {/* What Happens Next */}
            <div className="animate-fade-in bg-[#1a1f2e] backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-white">
                <Users className="w-6 h-6 text-blue-400 mr-2" />
                What Happens Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Review & Analysis</h3>
                    <p className="text-gray-400 text-sm">Our team is already reviewing your request details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Personal Connect</h3>
                    <p className="text-gray-400 text-sm">A dedicated expert will reach out to discuss your needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Tailored Solution</h3>
                    <p className="text-gray-400 text-sm">We'll craft a custom solution for your business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-[#0a0f1c]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              While You Wait, Explore More
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We've received your request and our team is already reviewing your details. 
              Why not discover how we can help your business grow?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Browse our Solutions navigates to home and scrolls to InsightCards */}
            <a
              href="/"
              onClick={handleResourceClick("/", "insight-cards")}
              className="group bg-[#1a1f2e] rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl cursor-pointer animate-fade-in block"
              style={{ animationDelay: `0s` }}
            >
              <Building className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300 mb-4" />
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Browse our Solutions
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Explore our comprehensive technology solutions
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </a>
            {/* Other resources unchanged, but update href to clean URLs if internal */}
            <a
              href="/industries"
              onClick={handleResourceClick("/industries")}
              className="group bg-[#1a1f2e] rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl cursor-pointer animate-fade-in block"
              style={{ animationDelay: `0.1s` }}
            >
              <FileText className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform duration-300 mb-4" />
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Discover Industries We Serve
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                See how we help businesses across different sectors
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </a>
            {/* External links remain unchanged */}
            {/* 
            <a
              href="https://www.cybaemtech.com/case-studies"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1a1f2e] rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl cursor-pointer animate-fade-in block"
              style={{ animationDelay: `0.2s` }}
            >
              <BookOpen className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300 mb-4" />
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Read our Case Studies
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Learn from real success stories and implementations
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </a>
            */}
            <a
              href="https://in.linkedin.com/company/cybaemtech?trk=public_post_follow-view-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1a1f2e] rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl cursor-pointer animate-fade-in block"
              style={{ animationDelay: `0.3s` }}
            >
              <Linkedin className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300 mb-4" />
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Connect with us on LinkedIn
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with our latest insights and news
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </a>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              💡 Ready to dive deeper?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Check out our latest insights and resources designed to fuel your digital success.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                {/* Connect Explore Our Services to /services page */}
                <a href="/industries" onClick={handleResourceClick("/industries")}>
                  🔗 Explore Our Services
                </a>
              </Button>
              {/* 
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <a href="/resources" onClick={handleResourceClick("/resources")}>
                  🔗 Visit Our Resources
                </a>
              </Button>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 bg-[#0a0f1c]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Closing Message */}
            <div className="animate-fade-in mb-8">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                We're excited to partner with you on your{" "}
                <span className="text-blue-400">growth journey</span>. 💙
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Talk to you very soon!
              </p>
            </div>

            {/* Bonus Engagement */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-2xl p-8 border border-blue-500 shadow-2xl animate-fade-in">
              <MessageCircle className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-white">
                Have an urgent question?
              </h3>
              <p className="text-blue-100 mb-6">
                Can't wait for our call? Feel free to reach out directly for immediate assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  asChild
                >
                  <a href="tel:+919028541383">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us: +91-9028-541-383
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white text-blue-600 border-white/30 font-semibold hover:bg-blue-50 hover:text-blue-700"
                  asChild
                >
                  <a href="mailto:sales@cybaemtech.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Email: sales@cybaemtech.com
                  </a>
                </Button>
              </div>
            </div>

            {/* Final Touch */}
            <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="inline-flex items-center bg-blue-500/10 rounded-full px-6 py-3">
                <span className="text-blue-400 font-medium">✨ Your digital transformation starts here</span>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <Button
                onClick={() => {
                  window.history.pushState({}, '', '/contact');
                  onBack();
                }}
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 border-gray-300 font-semibold hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Contact Form
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ThankYou;