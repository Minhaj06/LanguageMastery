import React from "react";
import Title from "../../components/title/Title";
import HomeBannerSlider from "../../components/home/HomeBannerSlider";
import PopularClassesSection from "../../components/home/PopularClassesSection";
import PopularInstructorsSection from "../../components/home/PopularInstructorsSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";

const HomePage = () => {
  return (
    <>
      <Title />
      <HomeBannerSlider />
      <PopularClassesSection />
      <PopularInstructorsSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;
