"use client";

import HeroSection from "@/components/sections/hero";
import PressReleases from "@/components/sections/press-releases";
import BusinessHighlights from "@/components/sections/business-highlights";
import DiscoverBroodhills from "@/components/sections/discover-broodhills";

export default function Home() {
    return (
      <main className="min-h-screen">
        <HeroSection />
        <PressReleases />
        <BusinessHighlights />
        <DiscoverBroodhills />
      </main>
    );
}
