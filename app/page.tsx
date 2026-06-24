import Navbar from "@/components/Navbar";
import CourierTicker from "@/components/CourierTicker";
import DeliveryMap from "@/components/DeliveryMap";
import ShipSteps from "@/components/ShipSteps";
import Testimonials from "@/components/Testimonials";
import TrackingCTA from "@/components/TrackingCTA";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

// ScrollFilm uses GSAP ScrollTrigger pinning which requires the browser DOM.
// It cannot run during SSR — use dynamic import with ssr:false + a dark placeholder.
const ScrollFilm = dynamic(() => import("@/components/ScrollFilm"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100dvh", background: "#1c1813" }} />,
});

export default function Page() {
  return (
    <main style={{ position: "relative" }}>
      <Navbar />
      <ScrollFilm />
      <CourierTicker />
      <DeliveryMap />
      <ShipSteps />
      <Testimonials />
      <TrackingCTA />
      <Footer />
    </main>
  );
}
