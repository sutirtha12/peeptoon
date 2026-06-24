import Navbar from "@/components/Navbar";
import ScrollFilm from "@/components/ScrollFilm";
import CourierTicker from "@/components/CourierTicker";
import DeliveryMap from "@/components/DeliveryMap";
import ShipSteps from "@/components/ShipSteps";
import Testimonials from "@/components/Testimonials";
import TrackingCTA from "@/components/TrackingCTA";
import Footer from "@/components/Footer";

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
