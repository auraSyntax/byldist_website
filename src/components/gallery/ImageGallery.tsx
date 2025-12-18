import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          navigation={{
            prevEl: ".gallery-prev",
            nextEl: ".gallery-next",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-md overflow-hidden aspect-[16/10]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <button
                  onClick={() => {
                    setActiveIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="absolute top-4 right-4 p-3 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-accent-foreground"
                  aria-label="Expand image"
                >
                  <Expand className="h-5 w-5" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          className="gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={12}
        watchSlidesProgress
        breakpoints={{
          640: { slidesPerView: 5 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
        }}
        className="mt-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div
              className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-300 ${
                activeIndex === index
                  ? "border-accent"
                  : "border-transparent hover:border-border"
              }`}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                modules={[Navigation, Zoom]}
                navigation
                zoom
                initialSlide={activeIndex}
                className="lightbox-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container flex items-center justify-center h-[80vh]">
                      <img
                        src={image}
                        alt={`${title} - Image ${index + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
