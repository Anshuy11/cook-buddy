import React from "react";

const CardSkeleton = () => {
  return (
     <div
    
      className="animate-pulse rounded-xl bg-white shadow-md p-4 space-y-4"
    >
      <div className="h-40 bg-gray-200 rounded-lg"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
