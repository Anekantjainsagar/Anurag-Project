"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Leaf,
  Globe,
  HeartHandshake,
  ArrowRight,
  Sprout,
  Microscope,
  Droplets,
  Sun,
  Scale,
  Users,
  CheckCircle2,
  FileText,
  ChevronDown,
  HelpCircle,
  Truck,
  MapPin,
  TrendingUp,
} from "lucide-react";

const STATS = [
  { value: "15,000+", label: "Certified Organic Acres", sub: "Under regenerative management" },
  { value: "4,200+", label: "Farmer Families", sub: "Fair trade partnership clusters" },
  { value: "192+", label: "Lab-Tested Staples", sub: "100% sortex-cleaned catalogue" },
  { value: "0%", label: "Synthetic Chemical Buffer", sub: "Zero pesticides or artificial wax" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Native Heirloom Seeds & Bio-Dynamic Soil",
    desc: "We exclusively cultivate non-GMO, open-pollinated heritage seeds. Farmlands undergo a strict mandatory 3-year organic detox period with cow dung composting, Jivamrit, and green manuring before initial harvest.",
    icon: Sprout,
    badge: "Stage 1: Soil Agni",
  },
  {
    step: "02",
    title: "Regional Terroir & Rainfed Cultivation",
    desc: "Each crop is planted in its native agricultural biome—Sharbati wheat in MP black-cotton valleys, heritage pulses in Vidarbha drylands, high-curcumin turmeric in Western Ghats, and walnuts in Kashmir.",
    icon: Sun,
    badge: "Stage 2: Micro-Climate",
  },
  {
    step: "03",
    title: "Solar Sun-Drying & Moisture Equilibrium",
    desc: "Harvested grains and legumes are naturally air- and sun-dried on clean poly-sheets to optimal 10-12% moisture levels, preserving active plant enzymes, volatile aroma oils, and natural grain germination vitality.",
    icon: Droplets,
    badge: "Stage 3: Solar Curing",
  },
  {
    step: "04",
    title: "Sortex Optical Cleanse (Zero Polish)",
    desc: "Grains pass through multi-spectrum optical color sorters, air destoners, and vibrating sieves. We strictly prohibit talcum buffing, synthetic oil glazes, paraffin shining, and sulphur gas bleaching.",
    icon: Scale,
    badge: "Stage 4: Pure Mechanical",
  },
  {
    step: "05",
    title: "7-Stage GC-MS/MS Pesticide Analysis",
    desc: "Every crop batch is quarantined and subjected to High-Resolution Gas Chromatography-Mass Spectrometry testing across 218 pesticide residues, heavy metals (Lead, Cadmium, Arsenic), and aflatoxins.",
    icon: Microscope,
    badge: "Stage 5: Lab Purity",
  },
  {
    step: "06",
    title: "Nitrogen-Flushed Hermetic Packaging",
    desc: "Packed in multi-layer barrier pouches flushed with inert food-grade nitrogen to eliminate oxygen oxidation and insect infestation naturally, ensuring farm freshness for up to 12 months without chemical preservatives.",
    icon: Truck,
    badge: "Stage 6: Farm to Fork",
  },
];

const TERROIR_REGIONS = [
  {
    region: "Central Madhya Pradesh & Narmada Valley",
    crops: "Sharbati Wheat, Desi Chana, Tuvar Dal, Mustard",
    soil: "Rich Deep Black Vertisol Soils",
    specialty: "High protein, natural sweetness, and superior water absorption capacity.",
  },
  {
    region: "Deccan Plateau & Rainfed Vidarbha",
    crops: "Heirloom Millets (Ragi, Foxtail, Kodo), Moong, Urad",
    soil: "Drought-Resilient Basalt Mineral Soil",
    specialty: "Nutrient-dense, low glycemic index, and grown with 70% less groundwater consumption.",
  },
  {
    region: "Western Ghats & Malabar Forest Slopes",
    crops: "Lakadong & Waigaon Turmeric, Tellicherry Pepper, Cardamom",
    soil: "Loamy Humus-Rich Forest Terroir",
    specialty: "Exceptionally high curcumin (>5%) and essential volatile piperine oils.",
  },
  {
    region: "Satpura Hills & Corbett Forest Reserves",
    crops: "Wild Multi-Flora Blossom Raw Honey",
    soil: "Pristine Untouched Deciduous Canopy",
    specialty: "Cold-harvested from wild cliff beehives, unheated, unpasteurized, retaining raw bee pollen.",
  },
  {
    region: "Kashmir Valley & High-Altitude Kishtwar",
    crops: "Organic Kashmiri Almonds, Walnuts, Saffron",
    soil: "Glacial Silt & Mountain Clay Valleys",
    specialty: "Cold mountain maturation yields extraordinary oil content (>42%) and crisp nutty texture.",
  },
  {
    region: "Saurashtra Coastal Plains & Kachchh",
    crops: "A2 Gir Cow Bilona Ghee, Sesame, Cold-Pressed Groundnut",
    soil: "Organic Arid Coastal Bio-Farms",
    specialty: "Slow wooden kohlu cold expelling below 42°C, safeguarding omega fatty acids.",
  },
];

const CERTIFICATIONS = [
  {
    title: "NPOP Organic India",
    authority: "Ministry of Commerce & Industry",
    desc: "Accredited under National Programme for Organic Production. Full farm audit confirming zero synthetic fertilizers or GMO seeds.",
    code: "NPOP / APEDA / CERT-89420",
  },
  {
    title: "FSSAI Central Organic License",
    authority: "Food Safety and Standards Authority of India",
    desc: "Complies with rigorous Central Food Safety and organic handling standards. Complete batch testing on 24 critical food parameters.",
    code: "Lic. No. 10021043000842",
  },
  {
    title: "Jaivik Bharat Unified Trustmark",
    authority: "National Unified Regulatory Framework",
    desc: "Government-authorized organic certification emblem distinguishing genuine, verified organic agro-products from fake greenwashing claims.",
    code: "JB-IN-2026-ORGANIC",
  },
  {
    title: "APEDA & ISO 22000 Accreditation",
    authority: "Agricultural & Processed Food Export Dev Authority",
    desc: "Certified for international export grade quality, hazard analysis, critical control points (HACCP), and phytosanitary traceability.",
    code: "ISO 22000:2018 Certified",
  },
];

const FAQS = [
  {
    q: "How does YOUR BRAND prove that products are 100% organic and not fake?",
    a: "Every single lot of grain, pulse, spice, and honey is traced back to a registered organic farmer cluster with Geo-tagged GPS coordinates. We test every batch in NABL-accredited third-party laboratories via Gas Chromatography-Mass Spectrometry (GC-MS/MS) for 218 pesticide residues and heavy metals. Lab certificates are accessible upon request for batch verification.",
  },
  {
    q: "Why do your organic dals and grains look less shiny than supermarket brands?",
    a: "Commercial brands buff their dals with water, talcum powder, synthetic food colors (like Tartrazine yellow), and liquid paraffin wax to create a false high-gloss shine. YOUR BRAND dals are 100% unpolished. They retain their natural, nutrient-dense outer aleurone layer and natural earthy hue, which contains 80% of the fiber, potassium, and B-vitamins.",
  },
  {
    q: "What does 'Cold-Pressed' and 'Traditional Bilona' actually mean?",
    a: "Unlike industrial solvent extraction that heats oils above 200°C using hexane solvents, our oils are extracted in traditional wooden kohlus (Ghani) below 42°C, preserving active antioxidants and vitamin E. Our A2 ghee is prepared using the ancient Vedic Bilona method: fresh A2 Gir cow milk is boiled, cultured into whole curd, hand-churned in both directions to extract Makhan, and slow-simmered over low wood flame.",
  },
  {
    q: "Why does raw organic honey crystallize over time?",
    a: "Pure, unprocessed honey naturally contains glucose, fructose, and live pollen grains. In colder weather, natural glucose separates and crystallizes—a definitive scientific sign that the honey is 100% raw and has NOT been boiled, pasteurized, or adulterated with corn/sugar syrup. Simply place the glass jar in lukewarm water (below 40°C) to reliquefy naturally.",
  },
  {
    q: "How do your fair-trade agreements benefit smallholder farmers?",
    a: "We bypass multi-tier mandi agents and buy directly from farmer producer organizations (FPOs). Farmers receive an upfront premium of 20% to 30% above the Minimum Support Price (MSP). Furthermore, YOUR BRAND bears the cost of annual organic land inspection, third-party lab audits, and indigenous seed distribution, insulating smallholders from financial risk.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      {/* 1. Hero Banner with Stat Counters */}
      <section className="w-full bg-[#013e18] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#58cf8b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#7de0a8] text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>Rooted in Earth • Committed to Absolute Purity</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-sm">
            Restoring Ancient Agricultural Purity To The Modern Kitchen
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#c3decb] leading-relaxed max-w-3xl mx-auto font-normal">
            We partner directly with certified regenerative organic farmer collectives across
            India&apos;s most fertile bio-valleys, eliminating harmful pesticides, synthetic buffing,
            and artificial processing from everyday food staples.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#58cf8b] hover:bg-[#46bb77] text-[#013816] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-98"
            >
              <span>Explore All 192 Harvests</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#testing-protocol"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all border border-white/20 backdrop-blur-xs"
            >
              <span>Our 7-Stage Lab Testing</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Impact Statistics Bar */}
      <section className="w-full bg-[#014d1e] text-white border-t border-[#035f26] py-8 sm:py-10">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1 p-2">
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#7de0a8]">
                  {stat.value}
                </div>
                <div className="font-bold text-xs sm:text-sm text-white tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#a9d8ba]">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Founding Mission & Vedic Philosophy */}
      <section className="py-16 sm:py-24 bg-[#faf9f5] w-full border-b border-[#f0eee6]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Ancestral Wisdom Meets Precision Science</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Why We Refuse To Polish, Bleach, Or Compromise
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Industrial agriculture in recent decades prioritized appearance over nutrition. Dals are stripped of their vitamin-dense aleurone layer with abrasive emery machines, glazed with petroleum mineral oil for sheen, and fumigated with chemical sulphur to artificially extend shelf life.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <strong>YOUR BRAND</strong> was born out of a rebellion against this chemical adulteration. We revived ancient agricultural science documented in the <em>Vrikshayurveda</em>: treating the soil as a living organism nurtured with cow-dung Jivamrit, herbal pest deterrents (Neem & Dashparni ark), and inter-cropping leguminous pulses to replenish natural atmospheric nitrogen.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-[#e4ded0] shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#01722C]">
                <CheckCircle2 className="w-4 h-4 text-[#01722C]" />
                <span>The YOUR BRAND Purity Pledge:</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                If a grain requires synthetic polishing, chemical preservatives, or artificial dyes to look appealing, it does not belong in your kitchen and it will never be packed by our facility.
              </p>
            </div>
          </div>

          {/* Right Visual Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5 hover:border-[#01722C] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="font-serif font-bold text-base text-gray-900">100% Unpolished Purity</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our lentils, rice, and millets retain their complete outer bran and germ layer, delivering maximum natural fiber, iron, magnesium, and bio-available zinc.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5 hover:border-[#01722C] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-serif font-bold text-base text-gray-900">Zero Pesticide Residue</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Quarantined and lab-tested against 218 organophosphates, carbamates, and synthetic pyrethroids. Zero chemicals touch our crop at any stage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5 hover:border-[#01722C] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="font-serif font-bold text-base text-gray-900">Direct Farmer Pricing</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                We contract directly with 4,200+ smallholders, paying 20-30% above standard APMC mandi rates while sponsoring organic land certification costs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5 hover:border-[#01722C] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div className="font-serif font-bold text-base text-gray-900">Export Certified Standards</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Audited under NPOP India Organic and conforming to rigorous EU / Codex Alimentarius food safety protocols for export to 14+ countries worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Direct Farm-to-Fork 6-Stage Process */}
      <section className="py-16 sm:py-24 bg-white w-full border-b border-[#f0eee6]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Full Chain Traceability</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              The 6-Stage Farm-To-Fork Journey
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Every packet of YOUR BRAND organic food passes through an unbroken chain of custody,
              from certified fertile fields directly to your kitchen pantry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-[#faf8f4] border border-[#e8e2d4] hover:border-[#01722C] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-black text-2xl text-[#01722C]/40 group-hover:text-[#01722C] transition-colors">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-bold text-[#01722C] bg-[#edf7f1] px-2.5 py-1 rounded-full border border-[#cbe4d4]">
                        {step.badge}
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-2xl bg-[#01722C] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-[#82e4ad]" />
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Geographic Terroir & Regional Sourcing Map */}
      <section className="py-16 sm:py-24 bg-[#faf9f5] w-full border-b border-[#f0eee6]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Indigenous Indian Biomes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Where Our Commodities Grow Best
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              True organic food requires authentic geographical terroir. We cultivate each species
              where natural soil minerals, seasonal rainfall, and solar intensity produce the highest nutrient density.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TERROIR_REGIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e5decb] shadow-2xs space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#01722C]">
                    <MapPin className="w-4 h-4 text-[#01722C] shrink-0" />
                    <span>{item.region}</span>
                  </div>

                  <h3 className="font-serif font-black text-lg text-gray-900 leading-snug">
                    {item.crops}
                  </h3>

                  <div className="text-xs text-gray-500 font-medium">
                    <strong className="text-gray-700">Soil Terroir:</strong> {item.soil}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed pt-1 border-t border-gray-100">
                    {item.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Scientific 7-Stage Testing Protocol (Detailed Showcase) */}
      <section id="testing-protocol" className="py-16 sm:py-24 bg-white w-full border-b border-[#f0eee6]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
                <Microscope className="w-3.5 h-3.5 text-[#01722C]" />
                <span>NABL Lab Verified</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
                218 Pesticides Tested. Zero Tolerated.
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Many brands rely on paper certificates from unverified brokers. At <strong>YOUR BRAND</strong>, every single incoming truckload is sealed and sampled under strict chain-of-custody protocols before unboarding at our central facility.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-gray-700">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f9f7f2] border border-[#ece4d6]">
                  <CheckCircle2 className="w-4 h-4 text-[#01722C] shrink-0 mt-0.5" />
                  <div>
                    <strong>GC-MS/MS & LC-MS/MS Chromatography:</strong> Detects synthetic pesticide residues down to 0.01 parts per million (PPM).
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f9f7f2] border border-[#ece4d6]">
                  <CheckCircle2 className="w-4 h-4 text-[#01722C] shrink-0 mt-0.5" />
                  <div>
                    <strong>ICP-MS Heavy Metal Screening:</strong> Stringent verification for Lead, Cadmium, Arsenic, and Mercury below Codex limits.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f9f7f2] border border-[#ece4d6]">
                  <CheckCircle2 className="w-4 h-4 text-[#01722C] shrink-0 mt-0.5" />
                  <div>
                    <strong>PCR Non-GMO Genetic Testing:</strong> Molecular biological assay ensuring zero hybrid gene modification or GMO contamination.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#013816] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#035f26] pb-4">
                <div className="font-serif font-black text-xl text-white">
                  Batch Quality Analysis Thresholds
                </div>
                <span className="text-xs font-bold text-[#7de0a8] bg-[#024a1e] px-3 py-1 rounded-full border border-[#046128]">
                  ISO / IEC 17025 Standard
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Chemical & Organophosphate Pesticides</span>
                    <span className="text-[#7de0a8]">0.00 PPM (Not Detected)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#58cf8b] w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Heavy Metals (Lead, Arsenic, Mercury)</span>
                    <span className="text-[#7de0a8]">&lt; 0.05 PPM (Codex Safe)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#58cf8b] w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Aflatoxins & Mold Toxins (B1, B2, G1, G2)</span>
                    <span className="text-[#7de0a8]">0.00 ppb (Zero Microbial)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#58cf8b] w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Genetic Non-GMO Authenticity</span>
                    <span className="text-[#7de0a8]">100% Native Heirloom Strain</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#58cf8b] w-full" />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#a9cfbe] leading-relaxed border-t border-[#035f26]">
                All test reports are catalogued per batch lot number printed on the back of your product pouch. You can request a copy of the analytical certificate at any time via <a href="mailto:support@yourbrand.com" className="text-white underline font-bold">support@yourbrand.com</a>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Certifications & National Regulatory Compliance */}
      <section id="certifications" className="py-16 sm:py-24 bg-[#faf9f5] w-full border-b border-[#f0eee6]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center space-y-12">
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Statutory Accreditations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Recognized & Licensed by National Authorities
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              We hold complete legal certifications under the Government of India&apos;s National Programme for Organic Production, Central Food Safety Standards, and APEDA Export Standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-[#e5dfd2] text-center space-y-4 hover:border-[#01722C] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center mx-auto shadow-2xs border border-[#b8dfc7]">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900">
                    {cert.title}
                  </h3>
                  <div className="text-[11px] font-bold text-[#01722C] uppercase tracking-wider">
                    {cert.authority}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-mono font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md block">
                    {cert.code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (Interactive Accordion) */}
      <section className="py-16 sm:py-24 bg-white w-full border-b border-[#f0eee6]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Transparency & Verification</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Frequently Asked Questions About Organic Authenticity
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Clear, honest, scientific answers to your most common questions about pure food.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#e4ded0] bg-[#faf8f4] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-gray-900 leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#01722C] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-[#ede7d8] pt-4 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="py-16 sm:py-20 bg-[#014d1e] text-white w-full text-center">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>Pure Food • Better Life</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Bring Pure Farm Goodness To Your Table Today
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#c3decb] leading-relaxed">
            Taste the difference of true unpolished grains, stone-ground flours, and wood-pressed spices.
            Fast, hermetically sealed, pan-India delivery straight to your doorstep.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-[#014d1e] hover:bg-[#edf7f1] text-xs sm:text-sm font-black uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-lg active:scale-98"
            >
              <span>Shop All 192 Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#023b18] hover:bg-[#012f13] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all border border-white/20"
            >
              <span>Wholesale & Institutional B2B Supply</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
      <BulkEnquiryModal />
      <ToastNotification />
    </div>
  );
}
