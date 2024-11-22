import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Basic",
    price: "$9",
    features: ["100 AI-generated forms", "Basic analytics", "Email support"],
    bgColor: "from-gray-100 to-gray-200",
    recommended: false
  },
  {
    name: "Pro",
    price: "$29",
    features: ["Unlimited AI-generated forms", "Advanced analytics", "Priority support"],
    bgColor: "from-blue-100 to-blue-200",
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom AI model training", "Dedicated account manager", "SLA guarantees"],
    bgColor: "from-purple-100 to-purple-200",
    recommended: false
  },
];

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Choose Your Plan
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`
                flex flex-col overflow-hidden 
                bg-gradient-to-br ${plan.bgColor}
                border-2 ${selectedPlan === plan.name ? 'border-blue-500' : 'border-transparent'}
                hover:shadow-xl transition-all duration-300
              `}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 m-2">
                  <Badge variant="secondary" className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    Recommended
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-5xl font-extrabold mb-6 text-gray-900">
                  {plan.price}
                  {plan.price !== 'Custom' && <span className="text-base">/mo</span>}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li 
                      key={fIndex} 
                      className="flex items-center text-gray-700"
                    >
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`
                    w-full 
                    ${selectedPlan === plan.name 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-800 hover:bg-gray-900'
                    }
                  `}
                >
                  {selectedPlan === plan.name ? 'Selected' : 'Choose Plan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;