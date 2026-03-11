"use client";

import SharedPageContent from "@/components/shared-page-content";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AboutUs() {
  const [teamExpanded, setTeamExpanded] = useState(false);

  const sections = [
    {
      title: "Our Approach",
      description: "Broodhills addresses complex energy market fragmentation by designing and coordinating structured transaction frameworks that bring alignment across counterparty qualification, commercial structuring (FOB/CIF), banking instrument alignment (SBLC/LC/DLC), and documentation workflow control.",
      image: "https://images.unsplash.com/photo-1454165833767-027eeef1626b?q=80&w=1200",
      buttonText: "LEARN MORE"
    },
    {
      title: "Our Energy Focus",
      description: "Our structured coordination capabilities extend across crude oil, LPG (liquefied petroleum gas), refined petroleum products, and general energy trade support services, with a core operational strength in West African crude supply.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200",
      buttonText: "OUR FOCUS"
    },
    {
      title: "Versoil",
      description: "Versoil is a defined infrastructure layer purpose-built to address structural weaknesses in commodity trading. It enables verified participant onboarding, structured transaction workflows, and full banking/logistics alignment visibility with institutional-grade oversight.",
      image: "https://images.unsplash.com/photo-1611974714155-70a50285099b?q=80&w=1200",
      buttonText: "VISIT VERSOIL"
    },
    {
      title: "Our Commitment",
      description: "We prioritise structure before speed, compliance before commitment, and transparency before execution. Our goal is to build sustainable infrastructure and long-term partnerships through consistent institutional-grade standards.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
      buttonText: "READ COMMITMENT"
    }
  ];

  const infoCards = [
    {
      title: "Our Vision",
      link: "/about-us/vision",
      bgColor: "#007399"
    },
    {
      title: "Our Mission",
      link: "/about-us/mission",
      bgColor: "#00334d"
    }
  ];

  // Team members WITH photos — shown first
  const featuredTeam = [
    {
      name: "Anthony Owivri",
      role: "Founder & Transaction Coordinator",
      desc: "Leads overall transaction oversight and primary authority for deal strategy, partner/buyer coordination, negotiations, and commission structures.",
      photo: "https://res.cloudinary.com/dycc51iwn/image/upload/v1773222847/1747485441740_wspxsc.jpg"
    },
    {
      name: "Mr. Emmanuel",
      role: "Chief Technology Officer & Chief Platform Officer (CTO/CPO)",
      desc: "Mr. Emmanuel leads the technical vision and platform strategy behind Versoil and the broader Broodhills digital infrastructure, ensuring every layer remains secure, scalable, and operationally relevant.",
      photo: "https://res.cloudinary.com/dycc51iwn/image/upload/v1773222865/ChatGPT_Image_Jan_24_2026_04_34_56_PM_fpjgo5.png"
    },
    {
      name: "Collins",
      role: "Sales Funnel Engineer",
      desc: "Responsible for designing and managing the buyer acquisition funnel, lead generation, and engagement optimisation.",
      photo: "https://res.cloudinary.com/dycc51iwn/image/upload/v1773222768/WhatsApp_Image_2026-03-11_at_10.20.02_AM_wrz7gh.jpg"
    },
    {
      name: "Olivette",
      role: "Data Analysis & Compliance Support",
      desc: "Handles transaction data analysis and compliance oversight. Coordinates logistics and sanctions compliance alongside Sajid.",
      photo: "https://res.cloudinary.com/dycc51iwn/image/upload/v1773222628/WhatsApp_Image_2026-03-11_at_9.38.38_AM_khptbv.jpg"
    }
  ];

  // Remaining team members — shown in dropdown
  const additionalTeam = [
    {
      name: "Sajid",
      role: "Strategic Advisor & Market Intelligence",
      desc: "Provides market insights, pricing guidance, and deal structuring advisory. Oversees vessel tracking and cargo monitoring through third-party platforms."
    },
    {
      name: "Lord Mayor",
      role: "Community & Local Engagement Liaison",
      desc: "Facilitates access to operational areas and local communities within the West African region, acting as an intermediary with local authorities."
    },
    {
      name: "Mr. Zeno",
      role: "Crude Market Expert & Seller Liaison",
      desc: "Direct link to accredited sellers, advising on procedural execution and coordinating vessels, terminals, loading and discharge schedules."
    },
    {
      name: "Pastor Amos",
      role: "Strategic Advisor & Industry Connector",
      desc: "Provides high-level strategic guidance and supports stakeholder engagement, leveraging his network for institutional opportunities."
    },
    {
      name: "Barrister Meshack",
      role: "Legal & Compliance Lead",
      desc: "Leads all legal matters, drafting SPAs, NCNDAs, and IMFPA. Ensures regulatory and contractual protection for the company."
    }
  ];

  return (
    <SharedPageContent
      title="ABOUT US"
      description="Broodhills Global Services Limited is an energy market coordination company focused on facilitating structured access to West African energy commodities through discipline, transparency, and execution."
      image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400"
      sections={sections}
      infoCards={infoCards}
    >
      {/* ── TEAM SECTION ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#000000] border-t border-[#6B8C14]/20">
        <div className="container mx-auto px-3 sm:px-8">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-16"
          >
            <h2 className="text-[22px] sm:text-[36px] lg:text-[48px] font-bold mb-3 sm:mb-6 text-[#C8DC0A]">OUR TEAM</h2>
            <p className="text-[12px] sm:text-[16px] lg:text-xl text-gray-400 max-w-3xl">
              Experienced professionals from energy, legal, compliance, logistics, and technology sectors, managing every engagement with precision and accountability.
            </p>
          </motion.div>

          {/* Featured 4 — with photos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-14">
            {featuredTeam.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[12px] sm:rounded-[16px] border border-[#6B8C14]/20 hover:border-[#C8DC0A]/50 transition-all"
              >
                {/* Photo */}
                <div className="relative w-full h-[160px] sm:h-auto sm:aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  {/* Name + role pinned to bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-5">
                    <h3 className="text-[10px] sm:text-[16px] lg:text-[18px] font-bold text-white uppercase tracking-tight leading-tight">{member.name}</h3>
                    <p className="text-[#C8DC0A] text-[8px] sm:text-[12px] font-medium mt-0.5 leading-tight">{member.role}</p>
                  </div>
                </div>
                {/* Description below photo — hidden on mobile */}
                <div className="hidden sm:block p-3 sm:p-5 bg-[#0a0a0a]">
                  <p className="text-gray-400 text-[10px] sm:text-[13px] leading-relaxed line-clamp-3 sm:line-clamp-4">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dropdown toggle for additional members */}
          <div>
            <button
              onClick={() => setTeamExpanded(!teamExpanded)}
              className="flex items-center gap-2 sm:gap-3 w-full px-4 sm:px-6 py-3 sm:py-4 border border-[#6B8C14]/30 hover:border-[#C8DC0A]/50 rounded-[10px] sm:rounded-[12px] bg-[#0a0a0a] hover:bg-[#111] transition-all group"
              aria-expanded={teamExpanded}
            >
              <span className="text-[12px] sm:text-[15px] font-bold text-white uppercase tracking-widest flex-1 text-left">
                View More Team Members ({additionalTeam.length})
              </span>
              <motion.div
                animate={{ rotate: teamExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8DC0A]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {teamExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mt-4 sm:mt-6">
                    {additionalTeam.map((member, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.07 }}
                        className="p-4 sm:p-8 border border-[#6B8C14]/20 hover:border-[#C8DC0A]/50 transition-colors bg-[#0a0a0a] rounded-[10px] sm:rounded-none"
                      >
                        {/* Initials avatar */}
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#6B8C14]/20 border border-[#6B8C14]/40 flex items-center justify-center mb-3 sm:mb-4">
                          <span className="text-[#C8DC0A] font-bold text-[13px] sm:text-[18px]">
                            {member.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                        <h3 className="text-[14px] sm:text-[20px] font-bold text-white mb-1 uppercase tracking-tight">{member.name}</h3>
                        <p className="text-[#C8DC0A] font-medium mb-2 sm:mb-4 text-[10px] sm:text-sm">{member.role}</p>
                        <p className="text-gray-400 leading-relaxed text-[10px] sm:text-sm">{member.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── PARTNERS SECTION ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#000000] border-t border-[#6B8C14]/20">
        <div className="container mx-auto px-3 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[22px] sm:text-[36px] lg:text-[48px] font-bold mb-4 sm:mb-8 text-[#C8DC0A]">OUR PARTNERS</h2>
              <h3 className="text-[16px] sm:text-[22px] font-bold text-white mb-3 sm:mb-4">NNPC Limited</h3>
              <p className="text-gray-400 text-[12px] sm:text-[16px] lg:text-lg leading-relaxed mb-4 sm:mb-6">
                NNPC Limited is Nigeria&apos;s national oil company and a key institutional participant in West African crude oil supply. Broodhills&apos; operational focus is informed by and aligned with the supply frameworks and procedural standards that NNPC governs.
              </p>
              <p className="text-gray-400 text-[12px] sm:text-[16px] lg:text-lg leading-relaxed">
                Our partnerships are built on mutual alignment with institutional-grade standards, prioritizing transparency and professionally managed energy transactions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-8 sm:p-12 rounded-lg border border-[#6B8C14]/20 flex items-center justify-center aspect-square md:aspect-auto md:h-[300px] lg:h-[400px]"
            >
              <div className="text-center">
                <div className="text-[#C8DC0A] text-[40px] sm:text-[60px] font-bold mb-3 sm:mb-4">NNPC</div>
                <div className="text-white text-[12px] sm:text-xl tracking-widest uppercase">Institutional Alignment</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAREERS SECTION ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#050505] border-t border-[#6B8C14]/20">
        <div className="container mx-auto px-3 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[22px] sm:text-[36px] lg:text-[48px] font-bold mb-4 sm:mb-8 text-[#C8DC0A]">CAREERS</h2>
            <p className="text-[12px] sm:text-[16px] lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12">
              We do not hire for noise — we build for structure. We welcome professionals in energy trading, commodity compliance, legal structuring, and logistics coordination.
            </p>
            <button className="px-8 sm:px-12 py-3 sm:py-4 bg-[#C8DC0A] text-black font-bold text-[12px] sm:text-lg tracking-widest hover:bg-[#6B8C14] transition-colors rounded-full uppercase">
              JOIN THE TEAM
            </button>
          </motion.div>
        </div>
      </section>
    </SharedPageContent>
  );
}
