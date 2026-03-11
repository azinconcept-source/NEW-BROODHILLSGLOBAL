"use client";

import React, { useState, useEffect, useId } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import { supabase } from "@/lib/supabase";

const StickyNotifications = () => {
  const [showAiPopup, setShowAiPopup] = useState(true);

  // Waitlist form state
  const [formData, setFormData] = useState({ name: "", company: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await supabase.from("waitlist_submissions").insert({
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
    });
    setSubmitting(false);
    if (error) {
      setSubmitError("Failed to submit. Please try again.");
    } else {
      setSubmitSuccess(true);
      setFormData({ name: "", company: "", email: "" });
    }
  }

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
                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                    <CheckCircle className="w-14 h-14 text-[#C8DC0A]" />
                    <h3 className="text-white text-2xl font-bold">You&apos;re on the list!</h3>
                    <p className="text-white/60 text-sm max-w-xs">
                      We&apos;ve received your submission. We&apos;ll be in touch when Versoil opens access.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleWaitlistSubmit}>
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
                        value={formData.name}
                        onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
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
                        value={formData.company}
                        onChange={(e) => setFormData(f => ({ ...f, company: e.target.value }))}
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
                        value={formData.email}
                        onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#C8DC0A]/50 focus:ring-0 transition-all text-sm h-12"
                      />
                    </div>

                    {submitError && (
                      <p className="text-red-400 text-sm">{submitError}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-8 py-6 rounded-full bg-[#C8DC0A] text-black font-bold hover:bg-[#6B8C14] hover:text-white transition-all tracking-tight text-base mt-4 flex items-center justify-center gap-2"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {submitting ? "Submitting..." : "Join the Waitlist →"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </ExpandableScreenContent>
        </ExpandableScreen>
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