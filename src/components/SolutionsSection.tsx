import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Cloud, Shield, Users } from "lucide-react";

const solutions = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable, secure cloud solutions that grow with your business. From migration to optimization, we handle the entire cloud journey.",
    features: ["Multi-cloud architecture", "24/7 monitoring", "Auto-scaling", "Disaster recovery"]
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Bespoke applications tailored to your unique business requirements. Modern, maintainable code that delivers results.",
    features: ["Full-stack development", "API integration", "Mobile applications", "Legacy modernization"]
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Comprehensive security frameworks to protect your digital assets from evolving threats and ensure compliance.",
    features: ["Threat assessment", "Security audits", "Compliance management", "Incident response"]
  },
  {
    icon: Users,
    title: "IT Consulting & Strategy",
    description: "Strategic technology guidance to align IT investments with business objectives and drive digital transformation.",
    features: ["Digital strategy", "Technology roadmaps", "Process optimization", "Change management"]
  }
];

const SolutionsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Enterprise Solutions That Drive Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            From cloud infrastructure to custom software development, we deliver comprehensive 
            technology solutions that transform how businesses operate and compete.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card 
              key={index} 
              className="group hover-lift bg-card border-border/50 hover:border-primary/20 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <solution.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {solution.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {solution.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full group/btn hover:bg-primary hover:text-primary-foreground">
                  Learn More
                  <Code className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our enterprise solutions can drive your digital transformation 
              and unlock new opportunities for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="hover:bg-muted">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;