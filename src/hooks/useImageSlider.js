import { useState, useEffect } from 'react';

export default function useImageSlider(images) {
  const normalized = Array.isArray(images) && images.length > 0 ? images : ['/img/placeholder.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex((idx) => (idx >= normalized.length ? 0 : idx));
  }, [images]);

  const prevSlide = () => {
    setCurrentIndex((idx) => (idx === 0 ? normalized.length - 1 : idx - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((idx) => (idx === normalized.length - 1 ? 0 : idx + 1));
  };

  const jumpToSlide = (index) => {
    if (index >= 0 && index < normalized.length) setCurrentIndex(index);
  };

  const currentImage = normalized[currentIndex];

  return { currentIndex, currentImage, prevSlide, nextSlide, jumpToSlide };
}