"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Commitment() {
  const sections = [
    {
      title: "Structure Before Speed",
      description: "We ensure every engagement is properly framed and structured before execution begins, avoiding the risks of hasty or unclear transactions.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
      buttonText: "OUR STANDARDS"
    },
    {
      title: "Compliance Before Commitment",
      description: "No transaction moves forward without the necessary verification and documentation, ensuring regulatory and ethical alignment at every step.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200",
      buttonText: "COMPLIANCE"
    },
    {
      title: "Transparency Before Execution",
      description: "All parties enter transactions with full commercial and logistical visibility, promoting trust and sustainable institutional partnerships.",
      image: "https://images.unsplash.com/photo-1454165833767-027eeef1626b?q=80&w=1200",
      buttonText: "TRANSPARENCY"
    }
  ];

  return (
    <SharedPageContent 
      title="OUR COMMITMENT"
      description="Broodhills operates with a long-term focus on credibility and institutional alignment. We understand that sustainable relevance in commodity markets is earned through consistent standards, not short-term deal volumes."
      image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400"
      sections={sections}
    />
  );
}
