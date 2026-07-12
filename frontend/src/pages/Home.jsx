import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import Features from "../components/Features";
import Menu from "../components/Menu";
import Story from "../components/Story";
import Gallery from "../components/Gallery";
import Testimonial from "../components/Testimonial";
import HowItWorks from "../components/HowItWorks";
import Visit from "../components/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Features />
      <Menu />
      <Story />
      <Gallery />
      <Testimonial />
      <HowItWorks />
      <Visit />
    </>
  );
}