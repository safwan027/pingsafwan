'use client';

import { useState } from 'react';

export default function BlogHeader() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Grabs the full current URL from the browser bar
      await navigator.clipboard.writeText(window.location.href);
      
      // Show "Copied!" feedback
      setCopied(true);
      
      // Reset the text back to "Copy Link" after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <button 
        onClick={handleCopy}
        className={`text-sm px-3 py-1 rounded border transition-all ${
          copied 
            ? 'border-green-500 text-green-500' 
            : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
        }`}
      >
        {copied ? '✓ Copied!' : '🔗 Copy Link'}
      </button>
    </div>
  );
}