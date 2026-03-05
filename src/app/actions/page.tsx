"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Actions() {
  const sections = [
    {
      title: "Real-world Impact",
      description: "Our actions across the globe are making a difference in the lives of millions by providing reliable energy and fostering development.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=1200",
      buttonText: "OUR PROJECTS"
    },
    {
      title: "Decarbonization Journey",
      description: "We are committed to reducing our carbon footprint through concrete actions in our operations and our product portfolio.",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=1200",
      buttonText: "DISCOVER MORE"
    }
  ];

  return (
    <SharedPageContent 
      title="ACTIONS"
      description="Our concrete commitment to energy security and sustainability through global projects and innovation."
      image="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1400"
      sections={sections}
    />
  );
}
