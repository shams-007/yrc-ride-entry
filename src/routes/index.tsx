import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Branches } from "@/components/Branches";
import { RoadSafety } from "@/components/RoadSafety";
import { Gallery } from "@/components/Gallery";
import { Membership } from "@/components/Membership";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { PressStrip } from "@/components/PressStrip";
import { Testimonials } from "@/components/Testimonials";
import { Conclave } from "@/components/Conclave";
import { FAQ } from "@/components/FAQ";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YRC.BD — Yamaha Riders Club Bangladesh" },
      { name: "description", content: "Bangladesh's #1 Yamaha riding community. 472,000+ riders. 47 branches. One family." },
      { property: "og:title", content: "YRC.BD — Yamaha Riders Club Bangladesh" },
      { property: "og:description", content: "Bangladesh's #1 Yamaha riding community. 472,000+ riders. 47 branches. One family." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f8f9ff", color: "#0d0d0d" }}>
      <Navbar />
      <Hero />
      <hr className="yrc-divider" />
      <PressStrip />
      <hr className="yrc-divider" />
      <Stats />
      <hr className="yrc-divider" />
      <About />
      <hr className="yrc-divider" />
      <Testimonials />
      <hr className="yrc-divider" />
      <Events />
      <hr className="yrc-divider" />
      <Branches />
      <hr className="yrc-divider" />
      <Conclave />
      <hr className="yrc-divider" />
      <RoadSafety />
      <hr className="yrc-divider" />
      <Gallery />
      <hr className="yrc-divider" />
      <FAQ />
      <hr className="yrc-divider" />
      <Membership />
      <hr className="yrc-divider" />
      <CTABanner />
      <Footer />
    </div>
  );
}
