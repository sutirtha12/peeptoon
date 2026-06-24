import Navbar from "@/components/Navbar";
import CourierTicker from "@/components/CourierTicker";
import dynamic from "next/dynamic";

const ScrollFilm = dynamic(() => import("@/components/ScrollFilm"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100dvh", background: "#1c1813" }} />,
});

const DeliveryMap = dynamic(() => import("@/components/DeliveryMap"), {
  ssr: false,
});

const ShipSteps = dynamic(() => import("@/components/ShipSteps"), {
  ssr: false,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
});

const TrackingCTA = dynamic(() => import("@/components/TrackingCTA"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
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
