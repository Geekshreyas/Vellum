import React from 'react';

function Logo({ width = '100px', className = "" }) {
 
  const imageUrl = "https://fra.cloud.appwrite.io/v1/storage/buckets/69aead79002af431d48d/files/69c05a81001e02c79e59/view?project=69aea90400004bd8f717";

  return (
    <img 
      src={imageUrl} 
      alt="Brand Logo" 
      style={{ width }} 
      className={`
        aspect-square object-cover
        rounded-2xl border border-gray-100 shadow-sm
        transition-all duration-300 ease-in-out
        hover:shadow-md hover:border-gray-200
        bg-white
        ${className}
      `}
    />
  );
}

export default Logo;