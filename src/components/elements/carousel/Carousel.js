import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { BikunCard } from "../../elements";

export const Carousel = ({ data, isBikun }) => {
  console.log(data);
  const bikunData = isBikun
    ? data?.sort((a, b) => a?.detail?.eta - b?.detail?.eta)
    : [];
  return (
    <Swiper
      spaceBetween={280}
      slidesPerView={2}
      breakpoints={{
        // when window width is >= 768px
        360: {
          spaceBetween: 240,
        },
        480: {
          spaceBetween: 128,
        },
        560: {
          spaceBetween: 80,
        },
        640: {
          spaceBetween: 50,
        },
        768: {
          width: 768,
          slidesPerView: 2,
          spaceBetween: 100,
        },
        1200: {
          width: 768,
          slidesPerView: 3,
          spaceBetween: 100,
        },
      }}
      className="p-3"
      onSlideChange={() => console.log("slide change")}
    >
      {isBikun
        ? bikunData?.map((slide, index) => (
            <SwiperSlide key={index}>
              <BikunCard data={slide} />
            </SwiperSlide>
          ))
        : data?.map((slide, index) => (
            <SwiperSlide key={index}>{slide?.name}</SwiperSlide>
          ))}
    </Swiper>
  );
};
