import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * BusinessHighlights component
 * 
 * Clones the "Business highlights" section from the provided design.
 * Features:
 * - Category filters with pill styling and yellow chevron icons.
 * - Asymmetrical masonry-style grid of cards.
 * - Image-driven cards with gradient overlays and tag labels.
 * - Responsive layout following the 12-column grid system.
 * - Hover effects (subtle scale and brightness) as specified in the design guide.
 */

const BusinessHighlights = () => {
  const highlights = [
    {
      id: 1,
      tag: "ACTIONS",
      title: "Strategic expansion of oil export gateways in West Africa",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/images/images_2.png",
      span: "md:col-span-8",
      height: "h-[400px]"
    },
    {
      id: 2,
      tag: "ACTIONS",
      title: "New offshore exploration phase begins in the Gulf of Guinea",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/images/images_5.png",
      span: "md:col-span-4",
      height: "h-[400px]"
    },
    {
      id: 3,
      tag: "MEDIA",
      title: "Broodhills Global's strategic presence in Africa",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/images/images_4.png",
      span: "md:col-span-4",
      height: "h-[320px]"
    },
    {
      id: 4,
      tag: "ACTIONS",
      title: "Global energy routes: the worldwide reach of our trading network",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/images/images_3.png",
      span: "md:col-span-8",
      height: "h-[320px]"
    }
  ];

  const filters = [
    { name: "Global Trade", active: true },
    { name: "Investment Portfolios", active: false },
    { name: "Energy 2026", active: false }
  ];

  return (
    <section className="bg-[#000000] py-6 sm:py-12 lg:py-[80px] w-full overflow-hidden highlight-component" data-component="BusinessHighlights">
      <div className="container mx-auto px-3 sm:px-8 max-w-[1400px]">
        {/* Section Heading */}
        <h2 className="text-[14px] sm:text-[22px] lg:text-[32px] font-bold text-white mb-3 sm:mb-6 tracking-tight">
          Business highlights
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`flex items-center gap-1 px-3 sm:px-6 py-1 sm:py-2.5 rounded-full border border-[#6B8C14]/30 transition-colors hover:border-[#6B8C14] text-[10px] sm:text-sm font-semibold ${filter.active ? 'bg-[#6B8C14]/10 border-[#6B8C14]' : ''
                }`}
            >
              <span className="text-white">{filter.name}</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#C8DC0A]" strokeWidth={3} />
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {highlights.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden group cursor-pointer rounded-[10px] sm:rounded-[16px] hover-lift ${item.span} h-[150px] sm:h-[260px] md:${item.height}`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
                role="img"
                aria-label={item.title}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-3 sm:p-8 flex flex-col justify-end items-start transition-opacity group-hover:bg-[#C8DC0A]/5">
                <span className="bg-[#C8DC0A] text-[#000000] text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 mb-1.5 sm:mb-3 tracking-wider uppercase rounded-sm">
                  {item.tag}
                </span>
                <h3 className="text-white text-[11px] sm:text-[16px] md:text-[20px] font-semibold leading-tight max-w-[500px]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          filter: brightness(1.05);
        }
      `}</style>
    </section>
  );
};

export default BusinessHighlights;