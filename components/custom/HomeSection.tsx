import React from "react";
import { ArrowDownRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HomeSection = () => {
  return (
    <section className="py-20 px-10">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              AI-Powered Form Builder
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Build powerful forms in just minutes with the power of AI.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">Try Now</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Learn More
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <img
            src="/banner.png"
            alt="AI Form Builder"
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;

