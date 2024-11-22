import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Palette, Zap, ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "AI-Powered Form Generation",
    description: "Create complex forms in seconds using natural language prompts, transforming how you design and deploy digital interactions.",
    icon: Brain,
    gradient: "from-purple-100 to-purple-200"
  },
  {
    title: "Lightning-Fast Performance",
    description: "Optimized for speed and efficiency, ensuring smooth user experiences with near-instantaneous form creation and loading.",
    icon: Zap,
    gradient: "from-blue-100 to-blue-200"
  },
  {
    title: "Modern Design System",
    description: "Sleek, responsive interfaces with intuitive user experience, leveraging latest UI/UX design principles and accessibility standards.",
    icon: Palette,
    gradient: "from-green-100 to-green-200"
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Powerful Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`
                bg-gradient-to-br ${feature.gradient}
                hover:shadow-xl transition-all duration-300
                border-2 border-transparent hover:border-blue-300
              `}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="p-3 bg-white rounded-full shadow-md">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <ArrowUpRight className="h-6 w-6 text-gray-500 opacity-50" />
              </CardHeader>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;