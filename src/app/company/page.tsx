"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Company() {
  const sections = [
    {
      title: "Board Committees",
      description: "Our company's strategic goals are supported by four specialized board committees: Control and Risk, Remuneration, Nomination, and Sustainability & Scenarios. These committees facilitate decision-making through preliminary and consultative functions.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200",
      buttonText: "COMMITTEES"
    },
    {
      title: "Our History",
      description: "Founded in 1953, Eni has a long history of excellence and innovation in the energy sector, always focused on delivering energy security and progress for humanity.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
      buttonText: "OUR STORY"
    },
    {
      title: "Global Presence",
      description: "We are an integrated energy company, with over 30,000 employees and operations in 69 countries. We promote the development of our people and the communities where we work.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400",
      buttonText: "OUR LOCATIONS"
    },
    {
      title: "Transformation Strategy",
      description: "We are reinventing our industrial model to lead the energy transition. Our transformation focuses on biochemistry, circular polymers, and cutting-edge energy solutions.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200",
      buttonText: "TRANSFORMATION"
    }
  ];

  return (
    <SharedPageContent 
      title="COMPANY"
      description="A global energy company committed to a just transition and long-term sustainability."
      image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400"
      sections={sections}
    />
  );
}
