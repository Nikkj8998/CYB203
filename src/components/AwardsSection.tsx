import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Star, Users } from "lucide-react";

const awards = [
  {
    icon: Users,
    category: "A Great Place to Work®",
    title: "A Great Place to Work®",
    description: "Ranked No. 6 on the Great Place To Work® World's Best Workplaces™ list.",
    details: "This recognition is based on feedback from our people—measuring their level of trust, pride and camaraderie at work.",
    link: "See related awards"
  },
  {
    icon: Award,
    category: "The Top Consulting Firm",
    title: "The Top Consulting Firm",
    description: "Earned the top spot among the World's Best Management Consulting Firms.",
    details: "Forbes recognized CybaemTech as the management consulting firm most recommended by consultants and clients, across industries and functional areas, around the world.",
    link: "See related awards"
  },
  {
    icon: Star,
    category: "An Influential Innovator",
    title: "An Influential Innovator",
    description: "Our leadership team ranked among Fortune's Most Powerful Leaders in Technology in 2025, and received industry recognition for innovation excellence.",
    details: "Every day, our leadership and all of us at CybaemTech help the world's leading companies embrace continuous reinvention, with innovation and people at the center.",
    link: "See related awards"
  }
];

const AwardsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Global recognition and awards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <Card key={index} className="border-none shadow-lg hover-lift">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <award.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="text-sm text-accent font-semibold mb-2 uppercase tracking-wide">
                  {award.category}
                </div>
                <CardTitle className="text-xl font-bold mb-2">
                  {award.title}
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-foreground">
                  {award.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {award.details}
                </p>
                <Button variant="link" className="text-accent hover:text-accent/80 font-semibold">
                  {award.link}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;