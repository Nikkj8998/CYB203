import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CareersSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <Card className="overflow-hidden border-none shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="aspect-[4/3] lg:aspect-auto">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=600"
                  alt="Join us at the heart of change"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content Section */}
              <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                <div className="text-accent text-sm font-semibold mb-4 uppercase tracking-wide">
                  Careers
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Grow your career at the heart of change
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  It's your time to shine. Bring your ingenuity, curiosity and big ideas.
                </p>
                <div>
                  <Link to="/careers">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold group"
                  >
                    Join us
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CareersSection;