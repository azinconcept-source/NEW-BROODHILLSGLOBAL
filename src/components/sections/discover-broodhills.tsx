import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DiscoverBroodhills = () => {
  const cards = [
    {
      category: "APPROACH",
      title: "How Broodhills solves market fragmentation",
      image: "https://images.unsplash.com/photo-1454165833767-027eeef1626b?q=80&w=1200",
      alt: "Market fragmentation solutions",
      link: "/about-us/approach"
    },
    {
      category: "VERSOIL",
      title: "The marketplace platform for modern trading",
      image: "https://images.unsplash.com/photo-1611974714155-70a50285099b?q=80&w=1200",
      alt: "Versoil platform",
      link: "/about-us/versoil"
    },
    {
      category: "COMMITMENT",
      title: "Our steadfast commitment to ethical governance",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
      alt: "Ethical governance",
      link: "/about-us/commitment"
    }
  ];

  return (
    <section className="bg-[#000000] py-6 sm:py-16 lg:py-[100px] highlight-component" data-component="DiscoverBroodhills">
      <div className="container mx-auto max-w-[1400px] px-3 sm:px-12 md:px-16">
        {/* Header Section */}
        <div className="mb-5 sm:mb-12 max-w-[800px]">
          <h2 className="text-white text-[14px] sm:text-[26px] md:text-[40px] font-bold leading-[1.1] mb-2 sm:mb-5 tracking-tight">
            Discover Broodhills Global Services
          </h2>
          <p className="text-white text-[11px] sm:text-[15px] md:text-[18px] leading-[1.5] opacity-90">
            We are a global energy and investment firm. We create increasingly sustainable and profitable solutions for institutional partners and energy markets.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="group relative flex flex-col h-[200px] sm:h-[360px] md:h-[450px] overflow-hidden rounded-[10px] sm:rounded-[16px] hover-lift"
            >
              {/* Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80" />
              </div>

              {/* Content Holder */}
              <div className="relative z-10 mt-auto p-3 sm:p-6 flex flex-col items-start">
                <span className="bg-[#C8DC0A] text-[#000000] text-[8px] sm:text-[10px] font-bold tracking-widest px-1.5 sm:px-2 py-0.5 sm:py-1 mb-2 sm:mb-4">
                  {card.category}
                </span>
                <h3 className="text-white text-[12px] sm:text-[17px] md:text-[20px] font-semibold leading-[1.3] group-hover:text-[#6B8C14] transition-colors duration-200">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverBroodhills;
