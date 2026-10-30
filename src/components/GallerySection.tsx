import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS } from '../data/resortData';
import { GalleryPhoto } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isCrossFading, setIsCrossFading] = useState<boolean>(false);
  const [sectionRef, hasEntered] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setIsCrossFading(true);
    setTimeout(() => {
      setSelectedPhotoIndex((prev) => ((prev! + 1) % GALLERY_PHOTOS.length));
      setIsCrossFading(false);
    }, 200);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setIsCrossFading(true);
    setTimeout(() => {
      setSelectedPhotoIndex((prev) =>
        prev! === 0 ? GALLERY_PHOTOS.length - 1 : prev! - 1
      );
      setIsCrossFading(false);
    }, 200);
  };

  const currentPhoto: GalleryPhoto | null =
    selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null;

  return (
    <section id="gallery" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div
        className="text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ease-luxury"
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block mb-3">
          Visual Anthology
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#181716]">
          Atmospheres of The Hotel Sunset
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#736e67] font-sans font-light">
          A glimpse into the architectural lines, Aegean light, and timeless Mediterranean textures that frame your stay.
        </p>
      </div>

      {/* Gallery Grid: Staggered by 80ms each */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_PHOTOS.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(idx)}
            className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer bg-stone-200 border border-[#181716]/6 shadow-xs hover:shadow-lg transition-all duration-600 ease-luxury"
            style={{
              transitionDelay: `${idx * 80}ms`,
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            {/* Gallery Image: Zooms gently on hover */}
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            />

            {/* Gradient Overlay & Hover Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-luxury flex flex-col justify-end p-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#e6ca85] font-medium">
                {photo.category}
              </span>
              <h3 className="text-lg font-serif text-white mt-0.5 flex items-center justify-between">
                <span>{photo.title}</span>
                <Maximize2 className="w-4 h-4 text-white/80" />
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox with Cross-Fade between photos */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md animate-[fadeIn_0.4s_ease-out_forwards]"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            aria-label="Close Lightbox"
            className="btn-luxury absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Photo Button */}
          <button
            onClick={handlePrevPhoto}
            aria-label="Previous Photo"
            className="btn-luxury absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Photo Button */}
          <button
            onClick={handleNextPhoto}
            aria-label="Next Photo"
            className="btn-luxury absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container with Cross-Fade */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            <div
              className={`relative overflow-hidden rounded-2xl max-h-[75vh] transition-opacity duration-300 ease-luxury ${
                isCrossFading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
              }`}
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto shadow-2xl"
              />
            </div>

            {/* Photo Caption & Counter */}
            <div className="mt-4 text-center text-white/90">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059]">
                {currentPhoto.category}
              </span>
              <h3 className="text-xl font-serif mt-0.5">{currentPhoto.title}</h3>
              <p className="text-xs text-white/50 mt-1">
                Photo {selectedPhotoIndex + 1} of {GALLERY_PHOTOS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
