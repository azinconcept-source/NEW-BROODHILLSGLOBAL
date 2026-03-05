"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Mission() {
  const sections = [
    {
      title: "Secure Access",
      description: "Providing a reliable gateway to energy commodities through disciplined frameworks that bridge the gap between supply and demand.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200",
      buttonText: "OUR MISSION"
    },
    {
      title: "Coordinated Execution",
      description: "Aligning supply, finance, compliance, and logistics to ensure every transaction is executed with professional precision and clarity.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200",
      buttonText: "STRATEGIC ALIGNMENT"
    }
  ];

  return (
    <SharedPageContent 
      title="OUR MISSION"
      description="To provide secure, structured, and professionally coordinated access to energy commodities through disciplined frameworks that align supply, finance, compliance, and logistics — enabling all parties to transact with confidence and clarity."
      image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400"
      sections={sections}
    />
  );
}
