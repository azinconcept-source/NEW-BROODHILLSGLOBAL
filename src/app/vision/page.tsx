"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Vision() {
  const sections = [
    {
      title: "Strategic Plan 2025–2028",
      description: "Our strategy centers on a 'Transition and Transformation' model, accelerating our journey toward carbon neutrality by 2050 while ensuring energy security. We are building a resilient, high-margin upstream business integrated with low-carbon satellites.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200",
      buttonText: "2028 PLAN"
    },
    {
      title: "The Satellite Model",
      description: "By creating independent business units like Plenitude and Enilive, we unlock dedicated capital for growth. Plenitude targets 15GW of renewable capacity by 2030, while Enilive aims to triple biorefining capacity to over 5 MTPA.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200",
      buttonText: "EXPLORE SATELLITES"
    },
    {
      title: "Global Natural Resources",
      description: "Natural gas is our bridge to the future. We are focused on high-margin upstream growth, with a 3–4% annual production increase, supported by strategic joint ventures and optimization of global gas flows.",
      image: "https://images.unsplash.com/photo-1542332606-b3d270646671?q=80&w=1200",
      buttonText: "NATURAL RESOURCES"
    },
    {
      title: "Transformation & Circularity",
      description: "We are reinventing our industrial base. Versalis is transitioning toward biochemistry and circular polymers, aiming for EBIT break-even by 2027. Our new CCUS satellite will be a key enabler for decarbonizing hard-to-abate sectors.",
      image: "https://images.unsplash.com/photo-1532187863486-abf71ad1b74d?q=80&w=1200",
      buttonText: "CIRCULAR ECONOMY"
    }
    ];
  
    const infoCards = [
      {
        title: "Our mission, our values",
        link: "/company",
        bgColor: "#007399"
      },
      {
        title: "Sustainability: the commitment that guides our actions",
        link: "/sustainability",
        bgColor: "#00334d"
      }
    ];
  
    return (
      <SharedPageContent 
        title="STRATEGIC VISION"
        description="Towards a carbon-neutral future through innovation, accessibility, and the satellite business model."
        image="https://images.unsplash.com/photo-1466611653911-954554331f4a?q=80&w=1400"
        sections={sections}
        infoCards={infoCards}
      />
    );
}
