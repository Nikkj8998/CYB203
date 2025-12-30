import { Mail, Phone } from "lucide-react";
import Logo from "./Logo";

const CoverPage = () => {
  return (
    <section className="page min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-12 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-[200px]" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-tr-[150px]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        {/* Logo */}
        <div className="mb-6 md:mb-8 lg:mb-10 flex justify-center">
          <Logo className="scale-[1.2] md:scale-[1.5] lg:scale-[1.75]" />
        </div>
        
        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 tracking-tight">
          Digital Marketing Services
        </h1>
        
        {/* Decorative Line */}
        <div className="w-20 h-1 bg-gradient-hero mx-auto mb-6 rounded-full" />
        
        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-body font-light tracking-wide mb-8">
          Innovative. Data-Driven. ROI-Focused.
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-muted-foreground">
          <a 
            href="mailto:sales@cybaemtech.com" 
            className="flex items-center gap-2 hover:text-primary transition-colors group text-sm md:text-base"
          >
            <Mail size={16} className="group-hover:scale-110 transition-transform" />
            <span className="font-body">sales@cybaemtech.com</span>
          </a>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <a 
            href="tel:+919028541383" 
            className="flex items-center gap-2 hover:text-primary transition-colors group text-sm md:text-base"
          >
            <Phone size={16} className="group-hover:scale-110 transition-transform" />
            <span className="font-body">+91 90285 41383</span>
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce hidden md:flex">
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default CoverPage;
