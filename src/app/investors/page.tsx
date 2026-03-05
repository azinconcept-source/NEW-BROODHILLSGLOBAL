"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Investors() {
  const sections = [
    {
      title: "Financial Performance",
      description: "Transparency and excellence in financial reporting for our global investors.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200",
      buttonText: "QUARTERLY RESULTS"
    },
    {
      title: "Shareholder Value",
      description: "We are committed to delivering sustainable value to our shareholders.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
      buttonText: "SHARE DATA"
    }
  ];

  return (
    <SharedPageContent 
      title="INVESTORS"
      description="Clear information and solid financial performance for our investors around the world."
      image="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1400"
      sections={sections}
    />
  );
}
