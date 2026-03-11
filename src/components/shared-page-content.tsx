"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface SectionProps {
  title: string;
  description: string;
  image: string;
  buttonText?: string;
}

interface InfoCardProps {
  title: string;
  link: string;
  bgColor: string;
}

const SharedPageContent = ({ title, description, image, sections, infoCards, children }: {
  title: string;
  description: string;
  image: string;
  sections?: SectionProps[];
  infoCards?: InfoCardProps[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[55vh] lg:h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover brightness-50"
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-[20px] sm:text-[36px] lg:text-[72px] font-bold mb-2 sm:mb-5 tracking-tight text-[#C8DC0A]">
              {title}
            </h1>
            <p className="text-[11px] sm:text-[16px] md:text-[22px] text-gray-300 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards (Screenshot Request) */}
      {infoCards && (
        <section className="py-12 bg-[#000000]">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infoCards.map((card, idx) => (
                <Link key={idx} href={card.link}>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-[16px] sm:rounded-[32px] p-4 sm:p-12 min-h-[160px] sm:min-h-[280px] flex flex-col justify-between group cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <h2 className="text-[16px] sm:text-[28px] md:text-[40px] font-bold leading-tight max-w-md">
                      {card.title}
                    </h2>
                    <div className="flex items-center text-lg font-medium tracking-wide">
                      View more
                      <svg
                        className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {sections && (
        <section className="py-6 sm:py-16 lg:py-24 bg-[#000000]">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative aspect-video mb-8 overflow-hidden rounded-sm border border-[#6B8C14]/30">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#C8DC0A]">{section.title}</h3>
                  <p className="text-gray-400 mb-6 text-lg leading-relaxed">{section.description}</p>
                  {section.buttonText && (
                    <button className="px-8 py-3 bg-[#C8DC0A] text-black font-bold text-sm tracking-widest hover:bg-[#6B8C14] transition-colors rounded-full uppercase">
                      {section.buttonText}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {children}
    </div>
  );
};

export default SharedPageContent;
