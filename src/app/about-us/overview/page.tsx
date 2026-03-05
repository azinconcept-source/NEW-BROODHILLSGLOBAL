"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Overview() {
  const sections = [
    {
      title: "Structured Access",
      description: "Broodhills facilitates structured and professionally managed frameworks for physical energy transactions, eliminating ambiguity and reducing execution risks in emerging markets.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
      buttonText: "OUR STORY"
    },
    {
      title: "Operational Focus",
      description: "With a strong focus on West African crude oil, LPG, and refined petroleum products, we ensure transactions are conducted within clear, secure, and professional frameworks.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400",
      buttonText: "OUR FOCUS"
    }
  ];

  return (
    <SharedPageContent 
      title="COMPANY OVERVIEW"
      description="Broodhills Global Services Limited is an energy market coordination company focused on facilitating structured access to West African energy commodities through discipline and compliance."
      image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400"
      sections={sections}
    />
  );
}
