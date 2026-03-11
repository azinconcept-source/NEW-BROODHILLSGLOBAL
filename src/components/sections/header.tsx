"use client";

import React, { useState } from 'react';
import { Search, LogIn, X, Menu } from 'lucide-react';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
      {/* Top Header Bar */}
      <div
        className="w-full bg-[#000000] highlight-component shadow-lg relative z-[1000]"
        data-component="Header"
      >
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-8 h-[60px] sm:h-[76px] flex items-center justify-between relative bg-[#000000]">
          {/* Left: Logo and Brand */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-2 sm:gap-3 transition-transform hover:scale-105 duration-200"
              aria-label="Broodhills Global Services Home Page"
            >
              <img
                src="https://res.cloudinary.com/dycc51iwn/image/upload/v1772463804/broodhills_2_oiovoo_e_background_removal_f_png_trm008.png"
                alt="Broodhills Global Services Logo"
                width={44}
                height={44}
                className="brightness-110 w-[44px] h-[44px] sm:w-[60px] sm:h-[60px]"
              />
              <div className="flex flex-col">
                <span
                  className="text-[18px] sm:text-[24px] font-[900] tracking-[-0.02em] text-white leading-none uppercase"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  BROODHILLS
                </span>
                <span className="text-[9px] sm:text-[11px] font-[800] tracking-[0.35em] sm:tracking-[0.45em] text-[#00AEEF] leading-none mt-[3px] sm:mt-[4px] uppercase whitespace-nowrap">
                  GLOBAL SERVICES
                </span>
              </div>
            </a>
          </div>

          {/* Center: AI Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              className="flex items-center justify-center bg-[#C8DC0A] rounded-full w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] hover:bg-[#6B8C14] transition-colors duration-200 shadow-md"
              aria-label="Explore EnergIA"
            >
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/Sparkle_medium_AI-2.svg"
                alt=""
                width={22}
                height={22}
              />
            </button>
          </div>

          {/* Right: Search, Login, Hamburger */}
          <div className="flex items-center gap-3 sm:gap-6 text-white">
            <button className="p-2 hover:text-[#6B8C14]" aria-label="Search">
              <Search size={20} />
            </button>

            <button className="hidden lg:flex p-2 hover:text-[#6B8C14]" aria-label="Login">
              <LogIn size={20} strokeWidth={2.5} />
            </button>

            {/* Hamburger (mobile only) */}
            <button
              className="lg:hidden p-2 hover:text-[#C8DC0A] transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop menu icon */}
            <button className="hidden lg:flex p-2 hover:text-[#6B8C14]" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Row — sticky, hidden on mobile */}
      <nav className="hidden lg:block sticky top-0 border-t border-[#6B8C14]/30 bg-[#000000]/95 backdrop-blur-sm z-[1001] shadow-md w-full">
        <div className="container mx-auto max-w-[1400px] px-8">
          <ul className="flex items-center justify-center gap-8 xl:gap-12 h-[54px]">
            {mainNavLinks.map((link) => (
              <li key={link.name} className="h-full flex items-center group relative">
                <a
                  href={link.href}
                  className="text-[12px] xl:text-[14px] font-bold tracking-[0.12em] xl:tracking-[0.15em] text-[#C8DC0A] hover:text-white transition-colors h-full flex items-center uppercase"
                >
                  {link.name}
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#C8DC0A] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 z-[1100] bg-[#000000]/98 flex flex-col pt-[60px] overflow-y-auto">
          <div className="flex justify-end p-4 border-b border-[#6B8C14]/30">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white hover:text-[#C8DC0A] transition-colors"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>
          <ul className="flex flex-col py-4">
            {mainNavLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-8 py-4 text-[15px] font-bold tracking-[0.15em] text-[#C8DC0A] hover:bg-[#121212] hover:text-white transition-colors uppercase border-b border-[#6B8C14]/20"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/editor"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-8 py-4 text-[15px] font-bold tracking-[0.15em] text-white hover:bg-[#121212] transition-colors uppercase border-b border-[#6B8C14]/20"
              >
                <LogIn size={16} />
                LOGIN
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;