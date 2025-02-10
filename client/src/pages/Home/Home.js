import React from "react";
import Faq from "../../components/Faq.js";
import HeroSection from "../../components/Herosection.js";
import Features from "../../components/Features.js";
import Cards from "../../components/Cards.js";
import BecomeSecure from "../../components/BecomeSecure.js";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <Cards />
      <BecomeSecure/>
      <Faq />
    </div>
  );
};

export default Home;
