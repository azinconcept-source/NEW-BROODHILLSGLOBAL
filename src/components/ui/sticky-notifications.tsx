"use client";

import React, { useState, useEffect, useId } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";

const StickyNotifications = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showAiPopup, setShowAiPopup] = useState(true);
  const [showMarketUpdate, setShowMarketUpdate] = useState(true);

  const nameId = useId();
  const companyId = useId();
  const emailId = useId();

  // Close AI popup automatically after some time or just keep it for demo
  useEffect(() => {
    // In a real app, we might check localStorage
  }, []);

  const closeAiPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAiPopup(false);
  };
  const closeCookieBanner = () => setShowCookieBanner(false);
  const closeMarketUpdate = () => setShowMarketUpdate(false);

  return (
    <>
      {/* Versoil Waitlist Popup */}
      {showAiPopup && (
        <ExpandableScreen
          layoutId="waitlist-card"
          className="fixed z-[1000] top-[140px] right-[40px] w-[350px]"
        >
          <div 
            className="bg-[#121212] border border-[#6B8C14]/30 rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.5)] p-6 animate-in fade-in slide-in-from-right-4 duration-500 relative group"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <button 
              onClick={closeAiPopup}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            
            <h3 className="text-white text-[18px] font-bold leading-[1.3] pr-6 mb-2">
              The Energy Marketplace Is Being Rebuilt.
            </h3>
            <p className="text-white/80 text-[13px] leading-[1.5] mb-6 opacity-90">
              Versoil is bringing structured deal execution, live cargo visibility, and institutional-grade coordination to West African energy transactions.
            </p>
            
            <ExpandableScreenTrigger>
              <button 
                className="w-full bg-[#C8DC0A] hover:bg-[#6B8C14] text-[#000000] hover:text-white font-bold py-3 rounded-full text-[12px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Join the Waitlist →
              </button>
            </ExpandableScreenTrigger>
          </div>

          <ExpandableScreenContent className="bg-[#121212] border border-[#6B8C14]/20">
            <div className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-[1100px] mx-auto items-center p-6 sm:p-10 lg:p-16 gap-8 lg:gap-16 text-white">
              <div className="flex-1 flex flex-col justify-center space-y-4 w-full">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-[-0.03em]">
                  The Energy Marketplace Is Being Rebuilt.
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Versoil is bringing structured deal execution, live cargo and export flow visibility, and institutional-grade coordination to West African energy transactions. Verified counterparties. Clean documentation. Real-time shipment intelligence — all in one place.
                </p>

                <div className="space-y-4 sm:space-y-6 pt-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#C8DC0A]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#C8DC0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base text-white/80 leading-relaxed">
                        We are opening access to serious buyers, sellers, and trade professionals first. Be first in line.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/40 italic">
                    Your information is confidential. You will only hear from us when it matters.
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full bg-black/40 p-8 rounded-2xl border border-white/5">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <Label htmlFor={nameId} className="block text-[10px] font-mono font-medium text-[#C8DC0A] mb-2 tracking-[1px] uppercase">
                      FULL NAME *
                    </Label>
                    <Input
                      type="text"
                      id={nameId}
                      name="name"
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#C8DC0A]/50 focus:ring-0 transition-all text-sm h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor={companyId} className="block text-[10px] font-mono font-medium text-[#C8DC0A] mb-2 tracking-[1px] uppercase">
                      COMPANY *
                    </Label>
                    <Input
                      type="text"
                      id={companyId}
                      name="company"
                      placeholder="Energy Corp"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#C8DC0A]/50 focus:ring-0 transition-all text-sm h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor={emailId} className="block text-[10px] font-mono font-medium text-[#C8DC0A] mb-2 tracking-[1px] uppercase">
                      EMAIL *
                    </Label>
                    <Input
                      type="email"
                      id={emailId}
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#C8DC0A]/50 focus:ring-0 transition-all text-sm h-12"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full px-8 py-6 rounded-full bg-[#C8DC0A] text-black font-bold hover:bg-[#6B8C14] hover:text-white transition-all tracking-tight text-base mt-4"
                  >
                    Join the Waitlist →
                  </Button>
                </form>
              </div>
            </div>
          </ExpandableScreenContent>
        </ExpandableScreen>
      )}

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[1050] bg-[#121212] text-white border-t border-[#6B8C14]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] transform translate-y-0 transition-transform duration-500">
          <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-[32px] font-bold leading-tight mb-2">
                This website uses cookies
              </h4>
              <p className="text-[14px] leading-relaxed max-w-[900px] text-white/80">
                This website uses cookies to show you adverts and offer you services customised according to the preferences you have shown while browsing online. For further information please refer to our <a href="#" className="underline font-semibold hover:text-[#C8DC0A]">Cookie Policy</a>.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={closeCookieBanner}
                className="bg-[#C8DC0A] hover:bg-[#6B8C14] text-[#000000] hover:text-white font-bold px-12 py-3 rounded-full text-[14px] transition-colors whitespace-nowrap"
              >
                ACCEPT
              </button>
              <button 
                onClick={closeCookieBanner}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white/50" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2026 Capital Markets Update Sticky Bar */}
      {showMarketUpdate && !showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[999] bg-[#121212] border-t border-[#6B8C14]/30 shadow-[0_-2px_10px_rgba(0,0,0,0.5)] h-[100px]">
          <div className="flex h-full w-full">
            {/* Left Section */}
            <div className="flex-1 flex items-center px-10">
              <div className="flex flex-col">
                <h5 className="text-white text-[20px] font-bold mb-1">
                  2026 Capital Markets Update
                </h5>
                <div className="flex items-center gap-2">
                  <img 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/Calendar_empty_black-7.svg"
                    alt="Calendar"
                    className="w-4 h-4 invert"
                  />
                  <span className="text-white/80 text-[14px]">19/03/2026</span>
                </div>
              </div>
            </div>

            {/* Right Section - Black */}
            <div className="w-[35%] bg-[#000000] flex items-center justify-center px-10 relative border-l border-[#6B8C14]/30">
              <a 
                href="#"
                className="bg-[#C8DC0A] hover:bg-[#6B8C14] text-[#000000] hover:text-white font-bold px-8 py-3 rounded-full text-[12px] uppercase tracking-wide transition-colors"
              >
                Go to the calendar
              </a>
              <button 
                onClick={closeMarketUpdate}
                className="absolute right-8 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .modal-open {
          overflow-x: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default StickyNotifications;