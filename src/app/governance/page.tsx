"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Governance() {
  const sections = [
    {
      title: "Board Committees",
      description: "Our board is supported by four specialized committees: Control and Risk, Remuneration, Nomination, and Sustainability & Scenarios, ensuring integrity, accountability, and the integration of climate transition into our strategic planning.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200",
      buttonText: "THE BOARD"
    },
    {
      title: "Ethics & Integrity (2023 Update)",
      description: "Our updated Code of Ethics provides mandatory principles for all Eni employees and partners. We maintain a 'Zero Tolerance' policy against violence and harassment, with a central focus on human rights and operational excellence.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200",
      buttonText: "ETHICS CODE"
    },
    {
      title: "Control and Risk Management",
      description: "The Control and Risk Committee oversees our internal system (ICRMS), ensuring financial reporting integrity and anti-corruption compliance across our 69 countries of operation.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200",
      buttonText: "RISK MANAGEMENT"
    },
    {
      title: "Sustainability & Scenarios",
      description: "This committee oversees our climate transition, energy efficiency, and human rights protection, ensuring that sustainability is deeply embedded in every facet of our Strategic Plan.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
      buttonText: "SUSTAINABILITY"
    }
  ];

  return (
    <SharedPageContent 
      title="GOVERNANCE"
      description="Transparent and solid governance to ensure the long-term sustainability of our business."
      image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400"
      sections={sections}
    />
  );
}
