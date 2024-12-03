"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const pricingPlans = [
  {
    name: "Free",
    description: "Ideal for individuals and hobby projects",
    price: "$0",
    features: [
      "Basic form templates",
      "Up to 5 active forms",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    description: "Perfect for small businesses and professionals",
    price: "$5",
    features: [
      "Unlimited forms",
      "AI-powered field suggestions",
      "Advanced analytics",
      "Email notifications",
    ],
  },
  {
    name: "Plus",
    description: "Best for teams and enterprises",
    price: "$30",
    features: [
      "Team collaboration tools",
      "Custom branding",
      "Priority support",
      "Integrations with popular tools",
    ],
  },
];

const PricingSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20" id={"pricing"}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-pretty text-4xl font-bold lg:text-6xl"
          >
            Pricing Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground lg:text-xl"
          >
            Choose a plan that fits your needs and start building smarter forms today.
          </motion.p>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="flex w-80 flex-col justify-between text-left">
                  <CardHeader>
                    <CardTitle>
                      <p>{plan.name}</p>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </CardHeader>
                  <CardContent>
                    <Separator className="mb-6" />
                    {plan.name !== "Free" && (
                      <p className="mb-3 text-lg font-semibold">
                        Everything in {index === 1 ? "Free" : "Pro"} +
                      </p>
                    )}
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: 0.8 + index * 0.1 + featureIndex * 0.05 }}
                        >
                          <CircleCheck className="size-4" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <Button className="w-full">
                        Get Started
                        <motion.div
                          className="ml-2"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ArrowRight className="size-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

