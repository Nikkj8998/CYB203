import { Mail, Phone } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Logo from "./Logo";

interface ServicePageProps {
  step: number;
  title: string;
  items: string[];
  icon: LucideIcon;
  isEven?: boolean;
}

const ServicePage = ({ step, title, items, icon: Icon, isEven = false }: ServicePageProps) => {
  return (
    <section className={`page min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 relative overflow-visible ${isEven ? 'bg-secondary/30' : 'bg-background'}`}>
      {/* Background decoration */}
      <div className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-1/2 h-3/4 bg-primary/[0.03] ${isEven ? 'rounded-r-[200px]' : 'rounded-l-[200px]'}`} />
      
      {/* Header with logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8">
        <Logo className="scale-50 md:scale-60 lg:scale-75 origin-left" />
      </div>
      
      <div className="container mx-auto relative z-10 pt-12">
        <div className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content Side */}
          <div className={`${isEven ? 'lg:order-2' : ''} animate-fade-in`}>
            {/* Step Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-3">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {step}
              </span>
              <span className="font-body tracking-wide">Step {step}</span>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-5 leading-tight">
              {title}
            </h2>
            
            {/* Service Items */}
            <ul className="space-y-2.5">
              {items.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform flex-shrink-0" />
                  <span className="text-muted-foreground font-body text-sm md:text-base leading-snug group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Icon Side */}
          <div className={`${isEven ? 'lg:order-1' : ''} flex items-center justify-center animate-scale-in`}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-75" />
              
              {/* Icon container */}
              <div className="relative w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-hero shadow-glow flex items-center justify-center">
                <Icon size={60} className="text-primary-foreground md:w-16 md:h-16 lg:w-20 lg:h-20" strokeWidth={1.5} />
              </div>
              
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 scale-125" />
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-150" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer contact */}
      <div className="mt-8 md:mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-muted-foreground pt-4 border-t border-border/50">
        <a href="mailto:sales@cybaemtech.com" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Mail size={14} />
          <span className="font-body">sales@cybaemtech.com</span>
        </a>
        <a href="tel:+919028541383" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Phone size={14} />
          <span className="font-body">+91 90285 41383</span>
        </a>
      </div>
    </section>
  );
};

export default ServicePage;
