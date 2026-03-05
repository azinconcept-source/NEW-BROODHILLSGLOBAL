import React from 'react';
import Image from 'next/image';

interface PressRelease {
  date: string;
  title: string;
  link: string;
}

const pressReleases: PressRelease[] = [
  {
    date: '04 MARCH 2026 - 10:45 AM CET',
    title: 'Broodhills Global expands offshore operations in West Africa with new strategic partners',
    link: '#',
  },
  {
    date: '28 FEBRUARY 2026 - 8:15 AM CET',
    title: 'Broodhills Global: Annual Results 2025. Record growth in energy trade and infrastructure deployment',
    link: '#',
  },
  {
    date: '25 FEBRUARY 2026 - 4:30 PM CET',
    title: "Broodhills Global Board of Directors approves new investment framework for 2026",
    link: '#',
  },
  {
    date: '20 FEBRUARY 2026 - 11:00 AM CET',
    title: 'Sustainability at the core: Broodhills Global achieves milestone in decarbonized supply chain initiatives',
    link: '#',
  },
];

const PressReleases = () => {
  return (
    <section className="bg-[#000000] py-[80px] highlight-component" data-component="PressReleases">
      <div className="container mx-auto px-8 max-w-[1400px]">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#FFFFFF] text-[32px] font-semibold leading-[1.2] tracking-[-0.02em]">
            Press releases
          </h2>
          <a
            href="#"
            className="flex items-center gap-2 text-[#C8DC0A] text-[12px] font-semibold uppercase tracking-[0.05em] hover:text-[#6B8C14] transition-opacity"
          >
            See all
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/Chevron_right_medium_AI-28.svg"
              alt="Chevron Right"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </a>
        </div>

        {/* Scrollable Grid Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 no-scrollbar">
            {pressReleases.map((release, index) => (
              <a
                key={index}
                href={release.link}
                className="group block bg-[#000000] border border-[#6B8C14]/30 p-6 rounded-[4px] min-h-[180px] hover:bg-[#121212] transition-colors flex flex-col justify-between"
              >
                <div>
                  <p className="text-[#CCCCCC] text-[12px] font-semibold uppercase tracking-[0.05em] mb-4">
                    {release.date}
                  </p>
                  <h3 className="text-[#FFFFFF] text-[18px] font-semibold leading-[1.4] line-clamp-4 group-hover:text-[#6B8C14] transition-colors">
                    {release.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PressReleases;