import React from 'react';
import Image from 'next/image';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const assets = {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/logoEniFooter-14.svg",
    linkedin: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/linkedin-9.svg",
    facebook: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/facebook-10.svg",
    twitter: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/svgs/twitter-11.svg",
    instagram: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/icons/Instagram_new_footer-1.png",
    youtube: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1a2f4cae-140e-4892-89b2-df10cbfa01ea-eni-com/assets/icons/YouTube_new_footer-2.png"
  };

  return (
    <footer className="bg-[#000000] text-white pt-6 sm:pt-14 lg:pt-20 pb-6 sm:pb-10 font-sans highlight-component" data-component="Footer">
      <div className="container mx-auto px-3 sm:px-8 max-w-[1400px]">
        {/* Middle Section: Description and Policies */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12 pb-6 sm:pb-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
              <img
                src="https://res.cloudinary.com/dycc51iwn/image/upload/v1772463804/broodhills_2_oiovoo_e_background_removal_f_png_trm008.png"
                alt="Broodhills Global Services Logo"
                className="h-[32px] sm:h-[48px] lg:h-[60px] w-auto brightness-110"
              />
              <div className="flex flex-col">
                <span className="text-[13px] sm:text-[18px] lg:text-[20px] font-[900] tracking-[-0.02em] text-white leading-none uppercase" style={{ fontFamily: "'Times New Roman', serif" }}>
                  BROODHILLS
                </span>
                <span className="text-[9px] font-[800] tracking-[0.45em] text-[#00AEEF] leading-none mt-[3px] uppercase whitespace-nowrap">
                  GLOBAL SERVICES
                </span>
              </div>
            </div>
            <p className="text-[11px] sm:text-[13px] lg:text-[14px] leading-[1.6] text-[#CCCCCC] mb-2 sm:mb-3 max-w-[420px]">
              Broodhills Global Services is a digitally designed platform that offers an immediate overview of Broodhills Global Services&apos; activities. It addresses everyone, recounting in a transparent and accessible way the values, actions and vision of the company.
            </p>
            <div className="flex gap-3 sm:gap-4 mb-2 sm:mb-3">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={assets.linkedin} alt="LinkedIn" className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={assets.instagram} alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full p-0.5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={assets.youtube} alt="YouTube" className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full p-0.5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={assets.facebook} alt="Facebook" className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={assets.twitter} alt="X" className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-[11px] sm:text-[12px] text-white/50">
              <p>© Broodhills Global Services 2024</p>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="hover:text-white transition-colors">Credits</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
              <div className="flex flex-col gap-2 sm:gap-4">
                <h4 className="text-[10px] sm:text-[12px] font-bold tracking-widest text-white/50">LEGAL</h4>
                <a href="#" className="text-[12px] sm:text-[14px] hover:text-[#6B8C14]">Legal Notes</a>
                <a href="#" className="text-[12px] sm:text-[14px] hover:text-[#6B8C14]">Privacy Policy</a>
                <a href="#" className="text-[12px] sm:text-[14px] hover:text-[#6B8C14]">Cookie Policy</a>
              </div>
              <div className="flex flex-col gap-2 sm:gap-4">
                <h4 className="text-[10px] sm:text-[12px] font-bold tracking-widest text-white/50">FOLLOW US</h4>
                <a href="#" className="text-[12px] sm:text-[14px] hover:text-[#6B8C14]">Newsletter</a>
                <a href="#" className="text-[12px] sm:text-[14px] hover:text-[#6B8C14]">Podcast</a>
              </div>
              <div className="flex flex-col gap-2 sm:gap-4">
                <h4 className="text-[10px] sm:text-[12px] font-bold tracking-widest text-white/50">CONTACTS</h4>
                <a href="#" className="text-[12px] sm:text-[14px] hover:text-[#6B8C14]">Contact us</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
