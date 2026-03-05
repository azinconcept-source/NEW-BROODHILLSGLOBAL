"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Vision() {
  const sections = [
    {
      title: "Trusted Ecosystem",
      description: "Building a reliable framework where every transaction is backed by verified data and institutional-grade oversight, ensuring long-term credibility in global energy markets.",
      image: "https://images.unsplash.com/photo-1466611653911-954554331f4a?q=80&w=1200",
      buttonText: "OUR STANDARDS"
    },
    {
      title: "Market Transparency",
      description: "Enhancing visibility into transaction workflows and commission structures to eliminate ambiguity and promote professional standards across the industry.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200",
      buttonText: "TRANSPARENCY"
    }
  ];

  return (
    <SharedPageContent 
      title="OUR VISION"
      description="To build a trusted and structured energy transaction ecosystem that enhances transparency, reduces execution risk, and supports institutional-grade coordination within West African energy markets."
      image="https://images.unsplash.com/photo-1466611653911-954554331f4a?q=80&w=1400"
      sections={sections}
    />
  );
}
