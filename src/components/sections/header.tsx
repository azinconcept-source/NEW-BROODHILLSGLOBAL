"use client";

import React from 'react';
import Image from 'next/image';
import { Search, ChevronDown, LogIn } from 'lucide-react';

const Header = () => {
      const mainNavLinks = [
        { name: 'VISION', href: '/vision' },
        { name: 'ACTIONS', href: '/actions' },
        { name: 'PRODUCTS', href: '/products' },
        { name: 'ABOUT US', href: '/about-us' },
        { name: 'GOVERNANCE', href: '/governance' },
        { name: 'SUSTAINABILITY', href: '/sustainability' },
        { name: 'INNOVATION', href: '/innovation' },
        { name: 'INVESTORS', href: '/investors' },
      ];

    const utilityLinks = [
      { name: 'Publications', href: '/en-IT/publications.html' },
      { name: 'Global Presence', href: '#' },
    ];

    return (
      <>
        {/* Top Header Utilities */}
        <div 
          className="w-full bg-[#000000] highlight-component shadow-lg relative z-[1000]"
          data-component="Header"
        >
          <div className="container mx-auto max-w-[1400px] px-8 h-[76px] flex items-center justify-between relative bg-[#000000]">
            {/* Left: Logo and Brand */}
            <div className="flex items-center">
                <a href="/" className="flex items-center gap-3 transition-transform hover:scale-105 duration-200" aria-label="Broodhills Global Services Home Page">
                  <img 
                    src="https://res.cloudinary.com/dycc51iwn/image/upload/v1772463804/broodhills_2_oiovoo_e_background_removal_f_png_trm008.png" 
                    alt="Broodhills Global Services Logo" 
                    width={60}
                    height={60}
                    className="brightness-110"
                  />
                  <div className="flex flex-col">
                    <span className="text-[24px] font-[900] tracking-[-0.02em] text-white leading-none uppercase" style={{ fontFamily: "'Times New Roman', serif" }}>
                      BROODHILLS
                    </span>
                    <span className="text-[11px] font-[800] tracking-[0.45em] text-[#00AEEF] leading-none mt-[4px] uppercase whitespace-nowrap">
                      GLOBAL SERVICES
                    </span>
                  </div>
                </a>
            </div>

            {/* Center: AI Button (Centered exactly like screenshot) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <button 
                className="flex items-center justify-center bg-[#C8DC0A] rounded-full w-[48px] h-[48px] hover:bg-[#6B8C14] transition-colors duration-200 shadow-md"
                aria-label="Explore EnergIA"
              >
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/Sparkle_medium_AI-2.svg" 
                  alt="" 
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* Right: Search, Login, Menu */}
            <div className="flex items-center gap-6 text-white">
              <button className="p-2 hover:text-[#6B8C14]" aria-label="Search">
                <Search size={22} />
              </button>
              
              <button className="hidden lg:flex p-2 hover:text-[#6B8C14]" aria-label="Login">
                <LogIn size={22} strokeWidth={2.5} />
              </button>

              <button className="p-2 hover:text-[#6B8C14]" aria-label="Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Row - STICKY ONLY THIS ROW */}
        <nav className="sticky top-0 border-t border-[#6B8C14]/30 bg-[#000000]/95 backdrop-blur-sm z-[1001] shadow-md w-full">
          <div className="container mx-auto max-w-[1400px] px-8">
            <ul className="flex items-center justify-center gap-12 h-[54px]">
              {mainNavLinks.map((link) => (
                <li key={link.name} className="h-full flex items-center group relative">
                  <a 
                    href={link.href}
                    className="text-[14px] font-bold tracking-[0.15em] text-[#C8DC0A] hover:text-white transition-colors h-full flex items-center uppercase"
                  >
                    {link.name}
                  </a>
                  {/* Underline on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#C8DC0A] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <style jsx global>{`
          nav ul li a {
            letter-spacing: 0.1em;
            font-family: var(--font-sans);
          }
        `}</style>
      </>
    );
  };

export default Header;