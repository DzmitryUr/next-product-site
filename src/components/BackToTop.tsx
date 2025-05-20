'use client';

import { useState, useEffect } from 'react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className='fixed bottom-5 right-5 text-white bg-gray-700 hover:bg-gray-900 font-semibold p-3 rounded-lg transition-all'
        title='Back to Top'
      >
        ↑ Back to Top
      </button>
    )
  );
}
