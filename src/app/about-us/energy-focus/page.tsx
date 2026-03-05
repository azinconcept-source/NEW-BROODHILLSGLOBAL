"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function EnergyFocus() {
  const sections = [
    {
      title: "Crude Oil",
      description: "Our core operational strength is in West African crude oil supply, ensuring physical energy transactions are conducted within clear, secure, and professional frameworks.",
      image: "https://images.unsplash.com/photo-1542332606-b3d270646671?q=80&w=1200",
      buttonText: "CRUDE OIL"
    },
    {
      title: "LPG & Refined Products",
      description: "Expanding our disciplined execution standards to LPG (liquefied petroleum gas) and refined petroleum products for institutional markets.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200",
      buttonText: "REFINED PRODUCTS"
    }
  ];

  return (
    <SharedPageContent 
      title="OUR ENERGY FOCUS"
      description="While crude oil remains a core operational strength, Broodhills operates broadly within the energy commodity ecosystem, focusing on West African crude oil supply, LPG, and refined petroleum products."
      image="https://images.unsplash.com/photo-1542332606-b3d270646671?q=80&w=1400"
      sections={sections}
    />
  );
}
