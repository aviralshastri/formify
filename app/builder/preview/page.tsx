"use client";

import React, { useEffect, useState } from "react";
import LoadingScreen from "@/components/custom/LoadingScreen";

const Preview = () => {
  const [Data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = sessionStorage.getItem("formele");
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingScreen
        description="Grabbing the data from our servers..."
        heading="Almost There... Your Form is On Its Way!"
      />
    );
  }

  return (
    <div>
      <h2>Preview</h2>
      {Data ? (
        <pre>{JSON.stringify(Data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Preview;
