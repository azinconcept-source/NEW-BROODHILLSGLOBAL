"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Innovation() {
  const sections = [
    {
      title: "Digital Transformation",
      description: "We are leveraging digital technologies to optimize our operations and create new value.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
      buttonText: "DIGITAL FUTURE"
    },
    {
      title: "Research & Development",
      description: "Our R&D centers are working on the next generation of energy solutions.",
      image: "https://images.unsplash.com/photo-1532187863486-abf91ad1b26e?q=80&w=1200",
      buttonText: "OUR LABS"
    }
  ];

  return (
    <SharedPageContent 
      title="INNOVATION"
      description="Driving the energy transition through continuous technological research and digital evolution."
      image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1400"
      sections={sections}
    />
  );
}
