"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Products() {
  const sections = [
    {
      title: "Renewable Energy Products",
      description: "Our range of green energy products helps customers reduce their environmental impact.",
      image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=1200",
      buttonText: "GREEN SOLUTIONS"
    },
    {
      title: "Sustainable Mobility",
      description: "Discover our solutions for the mobility of tomorrow, from electric charging to biofuels.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200",
      buttonText: "MOBILITY HUB"
    }
  ];

  return (
    <SharedPageContent 
      title="PRODUCTS"
      description="Innovative energy products and services designed for a sustainable future for everyone."
      image="https://images.unsplash.com/photo-1560177112-fbfd5fde9566?q=80&w=1400"
      sections={sections}
    />
  );
}
