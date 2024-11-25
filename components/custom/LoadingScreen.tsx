import React from 'react';
import { Loader2 } from 'lucide-react';

interface data{
    heading : string,
    description: string
}

const LoadingScreen = ({heading, description}:data) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 
          className="h-16 w-16 animate-spin text-blue-600" 
          strokeWidth={1.5} 
        />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {heading}
          </h2>
          <p className="text-gray-500 mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;