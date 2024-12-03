'use client'

import React from "react";
import { ArrowDownRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const HomeSection = () => {
  return (
    <section className="py-20 px-10">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.h1 
              className="my-6 text-pretty text-4xl font-bold lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              AI-Powered Form Builder
            </motion.h1>
            <motion.p 
              className="mb-8 max-w-xl text-muted-foreground lg:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Build powerful forms in just minutes with the power of AI.
            </motion.p>
            <motion.div 
              className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full sm:w-auto">Try Now</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full sm:w-auto group">
                  Learn More
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowDownRight className="size-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-md"
          >
            <motion.div
              initial={{ height: "100%" }}
              animate={{ height: "0%" }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-background z-10"
            />
            <motion.img
              src="/banner.png"
              alt="AI Form Builder"
              className="max-h-96 w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;

