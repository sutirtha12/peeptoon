import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Globe2,
  Boxes,
  FileText,
  Package,
  Warehouse,
  PackageOpen,
  Workflow,
} from "lucide-react";

export type Service = {
  id: string;
  num: string;
  title: string;
  tagline: string;
  stat: string;
  icon: LucideIcon;
  bullets: string[];
  extra: string[];
};

// Content sourced from the live peeptoon.com service cards.
export const SERVICES: Service[] = [
  {
    id: "local",
    num: "01",
    title: "Local Shipment",
    tagline: "Same-day across Tripura — flat ₹30.",
    stat: "₹30 flat",
    icon: Truck,
    bullets: [
      "Flat ₹30 per parcel, anywhere in Tripura",
      "Same-day pickup & evening delivery",
      "Cash-on-delivery available",
      "Doorstep pickup",
      "SMS + WhatsApp status updates",
    ],
    extra: [
      "Agartala hub",
      "Live tracking on every parcel",
      "Booked on WhatsApp in 60 seconds",
    ],
  },
  {
    id: "international",
    num: "02",
    title: "International Shipment",
    tagline: "Door-to-door global delivery, from ₹300/kg.",
    stat: "from ₹300/kg",
    icon: Globe2,
    bullets: [
      "Minimal cost: ₹300/kg",
      "Free home pickup",
      "No documents — zero paperwork",
      "Fast 2-day delivery",
      "PAN-India reach + live tracking",
    ],
    extra: [
      "Partners: Aramex · Royal Mail · UPS · India Post Air",
      "Door-to-door international delivery",
      "24×7 support · no hidden fees",
    ],
  },
  {
    id: "b2b",
    num: "03",
    title: "B2B Parcel",
    tagline: "Bulk & business-friendly freight.",
    stat: "from ₹5.5/kg",
    icon: Boxes,
    bullets: [
      "Minimum start weight: 15 kg / shipment",
      "Max per box: up to 70 kg",
      "Pricing: starts at just ₹5.5/kg",
      "Chargeable weight: volumetric or actual, whichever is higher",
      "PAN-India reach · doorstep pickup",
    ],
    extra: [
      "Trusted couriers: Movin · Bluedart · Delhivery · Ekart",
      "Built for wholesalers, traders & manufacturers",
      "Live tracking · priority support",
    ],
  },
  {
    id: "document",
    num: "04",
    title: "Document Parcel",
    tagline: "Secure. Swift. Reliable.",
    stat: "from ₹30",
    icon: FileText,
    bullets: [
      "Weight limit: up to 3 kg per parcel",
      "Pricing: starts at ₹30 (incl. GST)",
      "Transit: surface 4–6 days · air 2–3 days",
      "Same-day & express delivery",
      "Real-time tracking",
    ],
    extra: [
      "Tamper-proof packaging",
      "PAN-India shipping & international coverage",
      "For legal papers, contracts & certificates",
    ],
  },
  {
    id: "b2c",
    num: "05",
    title: "B2C Parcel",
    tagline: "Flexible, affordable last-mile (up to 40 kg).",
    stat: "from ₹30/kg",
    icon: Package,
    bullets: [
      "Weight limit: up to 40 kg per parcel",
      "Pricing: starts at ₹30/kg (incl. GST)",
      "Chargeable weight: dimension or dead weight (divisor 5000)",
      "Transit: surface 4–6 days · air 2–3 days",
      "PAN-India door-to-door delivery",
    ],
    extra: [
      "Ship bulk orders or single parcels",
      "Live tracking on every order",
      "Average rate may vary by dimension",
    ],
  },
  {
    id: "warehouse",
    num: "06",
    title: "Warehouse Solutions",
    tagline: "Storage, inventory & fulfilment.",
    stat: "Hubs: Kolkata & Agartala",
    icon: Warehouse,
    bullets: [
      "Pan-India storage hubs",
      "Inventory management",
      "Order fulfilment from our hubs",
      "Real-time stock visibility",
    ],
    extra: ["Multi-city hubs", "Scales with your order volume"],
  },
  {
    id: "packaging",
    num: "07",
    title: "Packaging Solutions",
    tagline: "Custom protective packaging.",
    stat: "Lower DIM cost",
    icon: PackageOpen,
    bullets: [
      "Custom boxes engineered to cut volumetric weight",
      "Protective, eco materials",
      "Right-sized for your products",
    ],
    extra: ["Lower DIM cost", "Reduces damage & returns"],
  },
  {
    id: "dropshipping",
    num: "08",
    title: "Dropshipping Integration",
    tagline: "Plug your store in — we ship.",
    stat: "Auto-fulfil",
    icon: Workflow,
    bullets: [
      "Connect your store via API / plugin",
      "We pick, pack & ship every order",
      "Automatic fulfilment",
      "99.2% accuracy",
    ],
    extra: ["API & dashboard", "Real-time stock sync"],
  },
];
