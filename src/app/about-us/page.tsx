"use client";

import SharedPageContent from "@/components/shared-page-content";
import { motion } from "framer-motion";

export default function AboutUs() {
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

    const team = [
      {
        name: "Anthony Owivri",
        role: "Founder & Transaction Coordinator",
        desc: "Leads overall transaction oversight and primary authority for deal strategy, partner/buyer coordination, negotiations, and commission structures."
      },
      {
        name: "Mr. Emmanuel",
        role: "Chief Technology Officer & Chief Platform Officer (CTO/CPO)",
        desc: "Mr. Emmanuel leads the technical vision and platform strategy behind Versoil and the broader Broodhills digital infrastructure. Holding a dual mandate across technology and product, he is responsible for how the platform is built, how it performs, and how it evolves — ensuring that every layer of the Versoil ecosystem remains secure, scalable, and operationally relevant as the company grows."
      },
      {
        name: "Sajid",
        role: "Strategic Advisor & Market Intelligence",
        desc: "Provides market insights, pricing guidance, and deal structuring advisory. Oversees vessel tracking and cargo monitoring through third-party platforms."
      },
      {
        name: "Collins",
        role: "Sales Funnel Engineer",
        desc: "Responsible for designing and managing the buyer acquisition funnel, lead generation, and engagement optimisation."
      },
      {
        name: "Olivette",
        role: "Data Analysis & Compliance Support",
        desc: "Handles transaction data analysis and compliance oversight. Coordinates logistics and sanctions compliance alongside Sajid."
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
      {/* Team Section */}
      <section className="py-24 bg-[#000000] border-t border-[#6B8C14]/20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#C8DC0A]">OUR TEAM</h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              Experienced professionals from energy, legal, compliance, logistics, and technology sectors, managing every engagement with precision and accountability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="p-8 border border-[#6B8C14]/20 hover:border-[#C8DC0A]/50 transition-colors bg-[#0a0a0a]"
              >
                <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">{member.name}</h3>
                <p className="text-[#C8DC0A] font-medium mb-4 text-sm">{member.role}</p>
                <p className="text-gray-400 leading-relaxed text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-[#000000] border-t border-[#6B8C14]/20">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#C8DC0A]">OUR PARTNERS</h2>
              <h3 className="text-2xl font-bold text-white mb-4">NNPC Limited</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                NNPC Limited is Nigeria's national oil company and a key institutional participant in West African crude oil supply. Broodhills' operational focus is informed by and aligned with the supply frameworks and procedural standards that NNPC governs.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our partnerships are built on mutual alignment with institutional-grade standards, prioritizing transparency and professionally managed energy transactions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-12 rounded-lg border border-[#6B8C14]/20 flex items-center justify-center aspect-square md:aspect-auto md:h-[400px]"
            >
              <div className="text-center">
                <div className="text-[#C8DC0A] text-6xl font-bold mb-4">NNPC</div>
                <div className="text-white text-xl tracking-widest uppercase">Institutional Alignment</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-24 bg-[#050505] border-t border-[#6B8C14]/20">
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#C8DC0A]">CAREERS</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              We do not hire for noise — we build for structure. We welcome professionals in energy trading, commodity compliance, legal structuring, and logistics coordination.
            </p>
            <button className="px-12 py-4 bg-[#C8DC0A] text-black font-bold text-lg tracking-widest hover:bg-[#6B8C14] transition-colors rounded-full uppercase">
              JOIN THE TEAM
            </button>
          </motion.div>
        </div>
      </section>
    </SharedPageContent>
  );
}
