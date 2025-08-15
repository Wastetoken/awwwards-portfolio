import React, { Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";

const LoadingScreen = () => (
  <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
    <p className="mb-4 text-xl tracking-widest animate-pulse">
      Loading...
    </p>
    <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
      <div className="absolute top-0 left-0 h-full transition-all duration-300 bg-white animate-pulse w-full"></div>
    </div>
  </div>
);

const App = () => {
  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      <Suspense fallback={<LoadingScreen />}>
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </Suspense>
    </ReactLenis>
  );
};

export default App;
