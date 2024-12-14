'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Infinity, MessagesSquare, Zap, ZoomIn } from 'lucide-react';

const features = [
  {
    title: 'Smart Form Design',
    description:
      'Leverage AI to automatically design forms based on your needs, reducing manual effort and ensuring user-friendly layouts.',
    icon: <ZoomIn className="size-6" />,
  },
  {
    title: 'AI-Powered Suggestions',
    description:
      'Get real-time AI-driven suggestions for field types, layouts, and validations to optimize form performance.',
    icon: <Zap className="size-6" />,
  },
  {
    title: '24/7 Customer Support',
    description:
      'Our dedicated support team is available round-the-clock to assist with any issues or custom requirements.',
    icon: <MessagesSquare className="size-6" />,
  },
  {
    title: 'Seamless Integration',
    description:
      'Integrate your forms effortlessly with popular tools and platforms for a smooth data flow.',
    icon: <Infinity className="size-6" />,
  },
];

const FeatureSection: React.FC = () => {
  const headerRef = useRef(null);
  const featuresRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  return (
    <section className="py-20" id="features">
      <div className="container">
        <motion.div 
          ref={headerRef}
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              WHY CHOOSE US
            </motion.p>
            <motion.h2 
              className="text-3xl font-medium md:text-5xl"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transforming Form Creation with AI-Powered Solutions
            </motion.h2>

            <motion.p 
              className="text-muted-foreground md:max-w-2xl"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Experience the future of form building with our AI-driven platform that simplifies design, enhances usability, and delivers exceptional results.
            </motion.p>
          </div>
        </motion.div>
        <motion.div 
          ref={featuresRef}
          className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={featuresInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8 
                border border-black/20 transition-all duration-300 
                hover:border-black/40 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span 
                className="mb-6 flex size-11 items-center justify-center rounded-full bg-background"
                initial={{ scale: 0 }}
                animate={featuresInView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 + idx * 0.1 }}
              >
                {feature.icon}
              </motion.span>
              <div>
                <motion.h3 
                  className="text-lg font-medium md:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="mt-2 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={featuresInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;