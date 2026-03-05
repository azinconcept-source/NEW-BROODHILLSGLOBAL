"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Sustainability() {
  const sections = [
    {
      title: "Environmental Responsibility",
      description: "We work every day to protect the environment and promote biodiversity.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200",
      buttonText: "NATURE FIRST"
    },
    {
      title: "Social Development",
      description: "We are committed to social development in the communities where we operate.",
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1200",
      buttonText: "SOCIAL PROJECTS"
    }
  ];

  return (
    <SharedPageContent 
      title="SUSTAINABILITY"
      description="Sustainability is the driver of our development and the core of our strategy."
      image="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=1400"
      sections={sections}
    />
  );
}
