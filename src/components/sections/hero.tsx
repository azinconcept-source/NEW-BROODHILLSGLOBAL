"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

// Updated Features from User Request
const FEATURES = [
  {
    button: "ABOUT US",
    label: "Broodhills Global Services",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400",
    description: "A leader in global energy trading and strategic investment.\nTransforming markets through innovation and institutional excellence.\nYour partner for the energy transition.",
  },
  {
    button: "OUR APPROACH",
    label: "Solving Market Fragmentation",
    image: "https://images.unsplash.com/photo-1454165833767-027eeef1626b?q=80&w=1200",
    description: "Bridging the gap between production and consumption.\nDigitally integrated supply chain model for real-time efficiency.\nExcellence in logistical execution.",
  },
  {
    button: "VERSOIL",
    label: "The Marketplace Platform",
    image: "https://images.unsplash.com/photo-1611974714155-70a50285099b?q=80&w=1200",
    description: "The next-generation digital environment for energy trading.\nSecure, transparent, and designed for institutional investors.\nReal-time pricing and deep global liquidity.",
  },
  {
    button: "ENERGY FOCUS",
    label: "Commodity Coverage",
    image: "https://images.unsplash.com/photo-1542332606-b3d270646671?q=80&w=1200",
    description: "Strategic access to crude oil, refined products, and gas.\nProven offshore assets in West Africa and beyond.\nEnsuring energy security and market liquidity.",
  },
  {
    button: "START YOUR JOURNEY",
    label: "West Africa Oil Investment Growth",
    image: "https://res.cloudinary.com/dycc51iwn/image/upload/v1772436537/Gemini_Generated_Image_5veob55veob55veo_a9o52e.png",
    description: "Unlock scalable energy investment opportunities anchored in proven offshore assets.\nStructured capital deployment aligned with measurable ROI performance.\nBuilt for long-term institutional growth.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % FEATURES.length);
      }, AUTO_PLAY_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="relative w-full h-[300px] sm:h-[460px] lg:h-[720px] overflow-hidden bg-[#000000] highlight-component" data-component="HeroSection">
      {/* Background Images with AnimatePresence */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/95 via-[#000000]/40 to-transparent z-10" />
            <Image
              src={FEATURES[activeSlide].image}
              alt={FEATURES[activeSlide].label}
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container with Slide Animation */}
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-3 sm:px-6 lg:px-12 pt-8 sm:pt-16">
        <div className="max-w-[850px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-white text-[18px] sm:text-[36px] md:text-[64px] font-bold leading-[1.05] mb-2 sm:mb-6 tracking-tight">
                {FEATURES[activeSlide].label}
              </h1>
              <p className="text-[#CCCCCC] text-[11px] sm:text-[15px] md:text-[22px] font-medium leading-[1.4] mb-3 sm:mb-8 max-w-[750px] whitespace-pre-line drop-shadow-md line-clamp-2 sm:line-clamp-none">
                {FEATURES[activeSlide].description}
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center bg-[#C8DC0A] text-[#000000] font-bold text-[10px] sm:text-[13px] tracking-[0.1em] sm:tracking-[0.2em] px-4 sm:px-10 py-[8px] sm:py-[16px] rounded-full hover:bg-[#6B8C14] hover:text-white transition-all duration-300 uppercase shadow-xl hover:shadow-[#C8DC0A]/30 group"
              >
                {FEATURES[activeSlide].button}
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="absolute bottom-2 sm:bottom-10 left-0 right-0 z-30 px-3 sm:px-6 container mx-auto">
        <div className="flex items-end justify-between border-t border-[#6B8C14]/40 pt-3 sm:pt-8 relative">
          {/* Progress Bars and Labels */}
          <div className="flex-1 overflow-x-auto no-scrollbar pb-2">
            <div className="flex gap-6 min-w-max pr-12">
              {FEATURES.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className="relative text-left group transition-all duration-300 outline-none w-[60px] sm:w-[160px]"
                >
                  {/* Active Indicator Bar */}
                  <div className="absolute top-[-33px] left-0 w-full h-[4px] bg-[#6B8C14]/10 rounded-full">
                    <motion.div
                      className="h-full bg-[#C8DC0A] rounded-full"
                      initial={false}
                      animate={{ width: index === activeSlide ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute top-[-34px] left-0 w-[8px] h-[8px] rounded-full border-2 transition-all duration-300",
                      index === activeSlide ? "bg-[#C8DC0A] border-[#C8DC0A] scale-150 shadow-[0_0_10px_#C8DC0A]" : "bg-transparent border-[#6B8C14]/50"
                    )}
                  />

                  {/* Text Label */}
                  <span
                    className={cn(
                      "hidden sm:block text-[10px] leading-[1.3] pt-4 transition-colors font-black uppercase tracking-widest",
                      index === activeSlide ? "text-[#C8DC0A]" : "text-[#CCCCCC] opacity-40 group-hover:opacity-100 group-hover:text-white"
                    )}
                  >
                    {feature.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 ml-2 sm:ml-8 pb-[6px]">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
              className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#6B8C14]/40 text-white hover:bg-[#C8DC0A] hover:text-black transition-all duration-300"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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
}
