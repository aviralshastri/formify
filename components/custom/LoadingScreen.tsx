import React, { useState, useEffect } from 'react';
import { 
  Type, 
  CheckSquare, 
  Calendar, 
  List,
  Layers,
  Grid 
} from 'lucide-react';

interface LoadingScreenProps {
  heading?: string;
  description?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  heading = "Building Your Form",
  description = "Preparing form elements..."
}) => {
  // Form builder element types
  const formElements = [
    { 
      icon: <Type className="text-blue-500" size={48} />,
      name: "Text Input"
    },
    { 
      icon: <CheckSquare className="text-green-500" size={48} />,
      name: "Checkbox"
    },
    { 
      icon: <Calendar className="text-purple-500" size={48} />,
      name: "Date Picker"
    },
    { 
      icon: <List className="text-orange-500" size={48} />,
      name: "Dropdown"
    },
    { 
      icon: <Layers className="text-red-500" size={48} />,
      name: "Sections"
    },
    { 
      icon: <Grid className="text-teal-500" size={48} />,
      name: "Grid"
    }
  ];

  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % formElements.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {formElements.map((element, index) => (
          <div 
            key={index}
            className={`
              absolute transition-all duration-700 ease-in-out
              ${currentIconIndex === index 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-50 rotate-180'}
            `}
          >
            {element.icon}
          </div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {heading}
        </h2>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;