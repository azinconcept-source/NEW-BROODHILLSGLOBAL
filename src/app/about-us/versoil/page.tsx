"use client";

import SharedPageContent from "@/components/shared-page-content";

export default function Versoil() {
  const sections = [
    {
      title: "Marketplace Initiative",
      description: "A defined infrastructure layer purpose-built to address structural weaknesses in commodity trading environments through institutional-grade oversight.",
      image: "https://images.unsplash.com/photo-1611974714155-70a50285099b?q=80&w=1200",
      buttonText: "THE PLATFORM"
    },
    {
      title: "Participant Onboarding",
      description: "Verified and credentialed counterparty access, ensuring all marketplace participants meet defined standards before transaction initiation.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200",
      buttonText: "ONBOARDING"
    },
    {
      title: "Transaction Workflow",
      description: "Structured workflows with clear process visibility, controlled documentation exchange, and defined commission allocation frameworks.",
      image: "https://images.unsplash.com/photo-1454165833767-027eeef1626b?q=80&w=1200",
      buttonText: "WORKFLOW"
    },
    {
      title: "Institutional Oversight",
      description: "Limiting intermediaries and enforcing disciplined execution standards to create an environment where energy transactions are conducted with total transparency.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
      buttonText: "OVERSIGHT"
    }
  ];

  return (
    <SharedPageContent 
      title="VERSOIL"
      description="Versoil is the marketplace initiative developed by Broodhills to support controlled and efficient engagement within the energy transaction ecosystem, creating institutional-grade oversight."
      image="https://images.unsplash.com/photo-1611974714155-70a50285099b?q=80&w=1400"
      sections={sections}
    />
  );
}
