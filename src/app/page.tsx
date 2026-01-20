"use client";

import AlphaWorldAdvantage from "./Components/AdvantageCard";
import CtaSection from "./Components/CtaSection";
import FeaturedColleges from "./Components/FeaturedColleges";
import Hero from "./Components/Hero";
import { InfiniteMovingCardsDemo } from "./Components/InfiniteMovingCardsDemo";
import LatestBlogs from "./Components/LatestBlogs";
import PopularCountries from "./Components/PopularCountries";
import ProcessJourney from "./Components/ProcessJourney";
import Services from "./Components/Services";
import StudentTestimonials from "./Components/StudentTestimonials";

const page = () => {
  return (
    <div className="w-full bg-white text-black">
      <Hero />
      <FeaturedColleges />
      <LatestBlogs />
      <PopularCountries />
      <Services />
      <AlphaWorldAdvantage />
      <ProcessJourney />
      <StudentTestimonials />
      <InfiniteMovingCardsDemo />
      <CtaSection />
    </div>
  );
};

export default page;