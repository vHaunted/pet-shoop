// Hero.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { assets } from '../assets/assets';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    image: assets.header,
    title: "Найкраща якість для ваших улюбленців!",
    subtitle: "Лише оригінальні товари"
  },
  {
    image: assets.cat_banner, 
    title: "Нові надходження для котів",
    subtitle: "Іграшки, догляд та аксесуари"
  },
  {
    image: assets.dog_banner_2, 
    title: "Все для собак",
    subtitle: "Шлейки, повідки та спеціальні корми"
  }
];

const Hero = () => {
  return (
    <div className="relative z-10 min-h-[400px] mt-4 rounded-[40px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative h-[400px]"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
                <div className="text-white max-w-2xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;