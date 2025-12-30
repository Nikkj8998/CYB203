import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestInsights = () => {
  const navigate = useNavigate();
  
  const insights = [
    {
      category: "Cybersecurity",
      categoryColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      date: "December 15, 2024",
      title: "Zero Trust Security: Why It's No Longer Optional",
      description: "Discover how Zero Trust architecture is becoming essential for modern businesses...",
      gradient: "from-cyan-500/10 to-blue-500/10",
      link: "/blog/zero-trust-security",
    },
    {
      category: "Cloud",
      categoryColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      date: "December 10, 2024",
      title: "How to Maximize ROI from Cloud Migration",
      description: "Learn proven strategies to optimize costs and performance in your cloud journey...",
      gradient: "from-blue-500/10 to-purple-500/10",
      link: "/blog/cloud-migration-roi",
    },
    {
      category: "Digital Marketing",
      categoryColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      date: "December 5, 2024",
      title: "The Future of SEO for IT Companies in 2025",
      description: "Stay ahead with emerging SEO trends specifically tailored for tech businesses...",
      gradient: "from-purple-500/10 to-pink-500/10",
      link: "/blog/seo-future-2025",
    },
  ];

  const handleViewAllInsights = () => {
    navigate("/industries");
  };

  return (
    <section className="relative bg-black py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">Latest </span>
            <span className="text-primary">Insights</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-white/70 text-base md:text-lg">
            Stay updated with industry trends and expert advice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="group relative block cursor-pointer"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
              onClick={(e) => e.preventDefault()}
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a1628]/90 to-[#0f1f3a]/70 border border-blue-900/40 transition-all duration-500 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold border ${insight.categoryColor} transition-all duration-300`}>
                      {insight.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">{insight.date}</span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                    {insight.title}
                  </h3>

                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                    {insight.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm">Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleViewAllInsights}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border-2 border-primary/30 text-primary font-semibold hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 cursor-pointer"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;