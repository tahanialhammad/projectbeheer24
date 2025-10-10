import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  { src: '/images/slide1.jpg', alt: 'Slide 1' },
  { src: '/images/slide2.jpg', alt: 'Slide 2' },
  { src: '/images/slide3.jpg', alt: 'Slide 3' },
];

export default function VerticalSlider() {
  return (
    <div className="relative w-full h-[50vh]">
      <Swiper
        direction="vertical"
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{img.alt}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
