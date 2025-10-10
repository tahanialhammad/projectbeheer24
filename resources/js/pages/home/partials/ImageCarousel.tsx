import { motion } from 'framer-motion';
import { useState } from 'react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Image = { src: string; alt?: string };

export default function ImageCarousel({ images }: { images: Image[] }) {
    const [active, setActive] = useState(0);

    return (
        //[Navigation, Pagination, Autoplay, A11y]
        <Swiper
            modules={[Pagination, Autoplay, A11y]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            onSlideChange={(swiper) => setActive(swiper.realIndex)}
            className="w-full rounded-3xl"
        >
            {images.map((img, i) => (
                <SwiperSlide key={i}>
                    <div className="h-[400px] w-full overflow-hidden rounded-lg">
                        <motion.img
                            src={img.src}
                            alt={img.alt ?? `slide-${i}`}
                            loading="lazy"
                            className="h-full w-full object-cover"
                            initial={{ opacity: 0, y: 8 }}
                            animate={active === i ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 6 }}
                            transition={{ duration: 0.45 }}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
