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
      spaceBetween={50}
      slidesPerView={1}
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
