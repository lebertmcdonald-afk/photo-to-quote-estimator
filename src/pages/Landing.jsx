import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import Problem from "../components/Problem.jsx";
import Outcomes from "../components/Outcomes.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Trades from "../components/Trades.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import WhatYouGet from "../components/WhatYouGet.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Faq from "../components/Faq.jsx";
import Footer from "../components/Footer.jsx";

export default function Landing() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Outcomes />
      <HowItWorks />
      <Trades />
      <BeforeAfter />
      <WhatYouGet />
      <CtaBand />
      <Faq />
      <Footer />
    </>
  );
}
