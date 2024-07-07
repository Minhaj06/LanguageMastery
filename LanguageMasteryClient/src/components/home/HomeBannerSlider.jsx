import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const slideItems = [
  {
    title: "Learn a New Language Today!",
    subtitle: "Unlock new opportunities with language proficiency.",
    image:
      "https://img.freepik.com/free-photo/learn-learning-knowledge-education-college-concept_53876-133560.jpg?w=1380&t=st=1686454577~exp=1686455177~hmac=45cf37b8efd38b6dbb7a0deb6bf8a8baf6d3e4e253eb0cff8967b105dbe12853",
  },
  {
    title: "Explore the World of Languages!",
    subtitle: "Open doors to diverse cultures and endless possibilities.",
    image:
      "https://img.freepik.com/free-photo/english-british-england-language-education-concept_53876-133735.jpg?w=900&t=st=1686455047~exp=1686455647~hmac=933458c83870f5cd3ef2390dd8385ead4102b2dff5dd6b685aca71cad0a24051",
  },
];

const HomeBannerSlider = () => {
  return (
    <div className="mt-20">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slideItems.map((slideItem, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative bg-cover bg-center lg:min-h-[30rem] 2xl:min-h-[33rem]"
              style={{
                backgroundImage: `url(${slideItem?.image})`,
              }}
            >
              <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-error text-center">
                  {slideItem?.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 text-white font-semibold text-center">
                  {slideItem?.subtitle}
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 mt-8 rounded-full">
                  Get Started
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBannerSlider;
