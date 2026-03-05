"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function OurApproach() {
  const sections = [
    {
      title: "Counterparty Qualification",
      description: "We ensure all parties meet defined standards before engagement through rigorous verification and qualification processes.",
      image: "https://images.unsplash.com/photo-1551288049-bbda48658a7d?q=80&w=1200",
      buttonText: "QUALIFICATION"
    },
    {
      title: "Commercial Structuring",
      description: "Structured transaction frameworks under internationally recognised trade terms such as FOB (Free On Board) and CIF (Cost, Insurance and Freight).",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200",
      buttonText: "OUR TERMS"
    },
    {
      title: "Banking Alignment",
      description: "Alignment of banking instruments such as Standby Letters of Credit (SBLC), Letters of Credit (LC), and Documentary Letters of Credit (DLC) covering critical deal phases.",
      image: "https://images.unsplash.com/photo-1454165833767-027eeef1626b?q=80&w=1200",
      buttonText: "FINANCE ALIGNMENT"
    },
    {
      title: "Documentation Control",
      description: "Maintaining accuracy and chain-of-custody integrity through controlled documentation workflows and full commission allocation transparency.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200",
      buttonText: "DOCUMENTATION"
    }
  ];

  return (
    <SharedPageContent 
      title="OUR APPROACH"
      description="Energy markets, particularly in West Africa, can be complex and highly fragmented. Broodhills addresses these challenges by designing and coordinating structured transaction frameworks that bring alignment across every critical phase of a deal."
      image="https://images.unsplash.com/photo-1454165833767-027eeef1626b?q=80&w=1400"
      sections={sections}
    />
  );
}
