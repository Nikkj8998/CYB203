import { Star, Quote } from "lucide-react";

const ClientTestimonials = () => {
  const testimonials = [
    {
      quote: "CYBAEM transformed our IT operations with 24/7 support and robust security monitoring.",
      author: "CTO",
      company: "FinTech Company",
      rating: 5,
    },
    {
      quote: "Their cloud team helped us migrate to Azure seamlessly, cutting costs by 30%.",
      author: "Head of IT",
      company: "Manufacturing Group",
      rating: 5,
    },
    {
      quote: "Digital campaigns delivered a 2× boost in qualified leads within 90 days.",
      author: "Marketing Lead",
      company: "SaaS Startup",
      rating: 5,
    },
  ];

  return (
    <section className="relative bg-black py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">Client </span>
            <span className="text-primary">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-white/70 text-base md:text-lg">
            Trusted by industry leaders worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-[#0a1628]/80 to-[#0f1f3a]/60 border border-blue-900/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              <div className="absolute top-6 left-6 opacity-20">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-white/90 text-base md:text-lg italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="mt-auto">
                  <p className="text-white font-semibold text-sm md:text-base">
                    {testimonial.author}
                  </p>
                  <p className="text-white/60 text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
