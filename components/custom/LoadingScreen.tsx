"use client"
import React from 'react';
import { useTheme } from 'next-themes';
import Lottie from 'lottie-react';

import LoaderLight from '@/public/loader-light.json';
import LoaderDark from '@/public/loader-dark.json';

interface LoadingScreenProps {
  heading?: string;
  description?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  heading = "Building Your Form",
  description = "Preparing form elements..."
}) => {
  const { resolvedTheme } = useTheme();

  // Choose animation based on current theme
  const animationData = resolvedTheme === 'dark' ? LoaderDark : LoaderLight;

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <Lottie 
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </div>

      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;