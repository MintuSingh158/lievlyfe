"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// GALLERY PHOTO CATALOG (User warehouse photo + cohesive documentary shoots)
// ============================================================================

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  caption: string;
  objectPosition?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "packaged-pallet",
    src: "/photos/01_packaged_pallet.jpg",
    alt: "Batch-inspected LievLyfe traction battery pack in reinforced shrink-wrap with 36 Months Warranty badge on wooden pallet",
    title: "Production Batch & Warranty Seal",
    category: "Fulfillment",
    caption:
      "Batch-verified LievLyfe 51.2V traction batteries with 36-month warranty seals and corner impact armor staged for dispatch.",
    objectPosition: "50% 50%",
  },
  {
    id: "metal-casing",
    src: "/photos/02_metal_casing.jpg",
    alt: "Heavy-duty matte black LievLyfe battery enclosure with bolted perimeter rim, chrome latches, and industrial wiring",
    title: "Heavy-Duty Armored Chassis",
    category: "Engineering",
    caption:
      "Aircraft-grade aluminium and steel casing secured by perimeter torque bolts for high shock absorption on uneven roads.",
    objectPosition: "50% 50%",
  },
  {
    id: "studio-podium",
    src: "/photos/03_studio_podium.jpg",
    alt: "LievLyfe 51.2V LiFePO4 battery on illuminated circular podium with Smart BMS and High Safety verification metrics",
    title: "Smart BMS & Core Parameters",
    category: "Quality Control",
    caption:
      "Precision bench validation demonstrating 51.2V nominal stability, active cell balancing, and multi-tier thermal protection.",
    objectPosition: "50% 50%",
  },
  {
    id: "erickshaw-poster",
    src: "/photos/04_erickshaw_poster.jpg",
    alt: "Official LievLyfe E-Rickshaw mobility poster featuring passenger e-rickshaw, driver, passengers, and battery pack",
    title: "Electric Rickshaw Mobility",
    category: "EV Fleet",
    caption:
      "Purpose-built traction packs empowering commercial electric rickshaw operators with 120+ km per charge.",
    objectPosition: "50% 50%",
  },
  {
    id: "field-unboxing",
    src: "/photos/05_field_unboxing.jpg",
    alt: "LievLyfe battery pack sitting in high-density protective foam cradle during unboxing and pre-delivery inspection",
    title: "Unboxing & Dispatch Inspection",
    category: "Assembly",
    caption:
      "Rigorous pre-delivery inspection verifying heavy-gauge cable insulation, terminal torque, and weatherproof seal integrity.",
    objectPosition: "50% 50%",
  },
  {
    id: "vertical-pack",
    src: "/photos/06_vertical_pack.jpg",
    alt: "Vertical slim-profile LievLyfe lithium battery pack with top handle and Anderson harness on glowing circular base",
    title: "Vertical Traction Architecture",
    category: "EV Mobility",
    caption:
      "High-density vertical battery architecture engineered with quick-release Anderson connectors for rapid depot turnarounds.",
    objectPosition: "50% 50%",
  },
  {
    id: "tech-specs",
    src: "/photos/07_tech_specs.jpg",
    alt: "LievLyfe Energy Lithium Iron Phosphate LiFePO4 technical specifications sheet and 36 Months Warranty badge",
    title: "LiFePO4 Safeguards & Compliance",
    category: "Compliance",
    caption:
      "AIS 156 Phase 2 certified battery chemistry with multi-point thermal cut-offs and 3,500+ lifecycle longevity.",
    objectPosition: "50% 50%",
  },
  {
    id: "dispatch-crate",
    src: "/photos/08_dispatch_crate.jpg",
    alt: "LievLyfe battery pack strapped with clear top protector on heavy wooden packing crate inside dispatch facility",
    title: "Reinforced Wooden Crate Transit",
    category: "Logistics",
    caption:
      "Custom shock-damped timber freight crates safeguarding sensitive prismatic cell banks and BMS telematics across transit.",
    objectPosition: "50% 50%",
  },
  {
    id: "dual-modules",
    src: "/photos/09_dual_modules.jpg",
    alt: "Multi-angle technical overview of horizontal and vertical LievLyfe traction battery module configurations",
    title: "Modular Traction Form Factors",
    category: "Product Range",
    caption:
      "Versatile form factors accommodating under-seat passenger rickshaw compartments as well as compact commercial cargo bays.",
    objectPosition: "50% 50%",
  },
];

const HIGHLIGHT_POINTS = [
  "Grade-A LiFePO4 cells.",
  "Smart BMS testing.",
  "Ready for dispatch.",
  "Real-world durability.",
];

// ============================================================================
// HELPER ICONS
// ============================================================================

function ArrowUpRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 11.5L11.5 4.5" />
      <path d="M5.5 4.5H11.5V10.5" />
    </svg>
  );
}

// ============================================================================
// SINGLE GALLERY PHOTO CARD
// ============================================================================

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  aspectClass: string;
  sizes: string;
  onOpen: (idx: number) => void;
}

function GalleryCard({ item, index, aspectClass, sizes, onOpen }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`View ${item.title} in full size`}
      className={`gallery-card group relative w-full ${aspectClass} rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] xl:rounded-[20px] overflow-hidden bg-zinc-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 text-left`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        quality={90}
        style={{ objectPosition: item.objectPosition ?? "50% 50%" }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
      />

      {/* Subtle hover caption veil — clean & unobstructed at rest */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-3.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-red-400">
          {item.category}
        </span>
        <p className="text-xs sm:text-[13px] font-semibold text-white leading-snug line-clamp-1 mt-0.5">
          {item.title}
        </p>
      </div>
    </button>
  );
}

// ============================================================================
// MAIN GALLERY SECTION COMPONENT
// ============================================================================

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % GALLERY_ITEMS.length
    );
  }, []);

  // Lock page scroll (including Lenis) & enable keyboard navigation while lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      lenis?.start();
    };
  }, [activeIndex, closeLightbox, goPrev, goNext]);

  // Subtle GPU-accelerated scroll reveal (fires once when entering viewport)
  useGSAP(
    () => {
      gsap.fromTo(
        ".gallery-reveal",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".gallery-card",
        { y: 24, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.68,
          stagger: { amount: 0.3, from: "start" },
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const activeItem = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative z-20 w-full bg-white text-[#111113] border-t border-zinc-200/80 py-14 sm:py-18 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* ================================================================ */}
        {/* DESKTOP (lg+): EXACT 5-COLUMN BOTTOM-ALIGNED STAGGERED MOSAIC    */}
        {/* Mirrors reference #2 geometry in crisp natural color photography  */}
        {/* ================================================================ */}
        <div className="hidden lg:block relative">
          {/* Top-Left Editorial Overlay Block */}
          <div className="gallery-reveal lg:absolute lg:top-1 xl:top-2 lg:left-0 z-10 pointer-events-auto lg:max-w-[365px] xl:max-w-[460px]">
            <h2
              id="gallery-heading"
              className="text-[36px] xl:text-[50px] 2xl:text-[54px] font-bold tracking-[-0.03em] leading-[1.07] text-[#111113]"
            >
              Inside LievLyfe.
              <br />
              Built to Endure.
            </h2>

            <p className="mt-3.5 xl:mt-4.5 text-[13px] xl:text-[15px] leading-[1.55] text-zinc-600 font-normal max-w-[275px] xl:max-w-[345px]">
              Real frames of precision assembly, strict testing, and dependable lithium power in action.
            </p>

            <div className="mt-5 xl:mt-6">
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="inline-flex items-center justify-center rounded-full bg-[#111113] hover:bg-zinc-800 active:scale-[0.98] text-white text-[12px] xl:text-[13.5px] font-medium px-6 py-2.5 xl:px-7 xl:py-3 shadow-xs transition-all cursor-pointer"
              >
                Explore Gallery
              </button>
            </div>
          </div>

          {/* 5-Column Asymmetric Bottom-Aligned Grid */}
          <div className="grid grid-cols-5 items-end gap-3.5 xl:gap-5">
            {/* COLUMN 1: Open top air + 1 bottom card */}
            <div className="flex flex-col">
              <GalleryCard
                item={GALLERY_ITEMS[0]}
                index={0}
                aspectClass="aspect-[1/1.08]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
            </div>

            {/* COLUMN 2: Stepped mid-low + 2 stacked cards (Cell Sorting + User Warehouse Photo) */}
            <div className="flex flex-col gap-3.5 xl:gap-5">
              <GalleryCard
                item={GALLERY_ITEMS[1]}
                index={1}
                aspectClass="aspect-[4/4.25]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[2]}
                index={2}
                aspectClass="aspect-[16/10]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
            </div>

            {/* COLUMN 3: Stepped higher than Col 2 + 2 stacked cards (BMS Testing + Busbars) */}
            <div className="flex flex-col gap-3.5 xl:gap-5">
              <GalleryCard
                item={GALLERY_ITEMS[3]}
                index={3}
                aspectClass="aspect-square"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[4]}
                index={4}
                aspectClass="aspect-[1/1.05]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
            </div>

            {/* COLUMN 4: 4 Up-Right Arrow Highlights + 1 tall Home Solar card */}
            <div className="flex flex-col justify-end">
              <ul className="gallery-reveal flex flex-col gap-2.5 xl:gap-3.5 mb-7 xl:mb-10 pl-0.5">
                {HIGHLIGHT_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-[12.5px] xl:text-[14.5px] font-normal text-zinc-700 leading-snug whitespace-nowrap"
                  >
                    <ArrowUpRightIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#111113] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <GalleryCard
                item={GALLERY_ITEMS[5]}
                index={5}
                aspectClass="aspect-[9/14]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
            </div>

            {/* COLUMN 5: Full-height 3 stacked cards (EV Depot + Aging Racks + Commercial Solar) */}
            <div className="flex flex-col gap-3.5 xl:gap-5">
              <GalleryCard
                item={GALLERY_ITEMS[6]}
                index={6}
                aspectClass="aspect-[4/3.1]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[7]}
                index={7}
                aspectClass="aspect-[2/3.2]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[8]}
                index={8}
                aspectClass="aspect-[16/10]"
                sizes="(max-width: 1280px) 19vw, 260px"
                onOpen={openLightbox}
              />
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* MOBILE & TABLET (< lg): RESPONSIVE STAGGERED GALLERY EXPERIENCE  */}
        {/* ================================================================ */}
        <div className="block lg:hidden">
          {/* Header Block */}
          <div className="gallery-reveal max-w-xl">
            <h2 className="text-[32px] min-[390px]:text-[36px] sm:text-[42px] font-bold tracking-[-0.03em] leading-[1.08] text-[#111113]">
              Inside LievLyfe.
              <br />
              Built to Endure.
            </h2>

            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-zinc-600 max-w-md">
              Real frames of precision assembly, strict testing, and dependable lithium power in action.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="inline-flex items-center justify-center rounded-full bg-[#111113] hover:bg-zinc-800 active:scale-[0.98] text-white text-xs sm:text-sm font-medium px-6 py-2.5 shadow-xs transition-all cursor-pointer"
              >
                Explore Gallery
              </button>
            </div>

            <ul className="mt-6 grid grid-cols-2 sm:max-w-md sm:gap-x-8 gap-x-4 gap-y-2.5">
              {HIGHLIGHT_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-1.5 text-xs sm:text-[13px] font-normal text-zinc-700 whitespace-nowrap"
                >
                  <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#111113] shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tablet (md to lg): Balanced 3-Column Mosaic */}
          <div className="hidden md:grid grid-cols-3 items-start gap-4 mt-10">
            <div className="flex flex-col gap-4">
              <GalleryCard
                item={GALLERY_ITEMS[0]}
                index={0}
                aspectClass="aspect-[1/1.05]"
                sizes="32vw"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[2]}
                index={2}
                aspectClass="aspect-[16/10]"
                sizes="32vw"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[5]}
                index={5}
                aspectClass="aspect-[9/14]"
                sizes="32vw"
                onOpen={openLightbox}
              />
            </div>

            <div className="flex flex-col gap-4">
              <GalleryCard
                item={GALLERY_ITEMS[1]}
                index={1}
                aspectClass="aspect-[4/4.3]"
                sizes="32vw"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[3]}
                index={3}
                aspectClass="aspect-[1/1.05]"
                sizes="32vw"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[4]}
                index={4}
                aspectClass="aspect-[4/4.4]"
                sizes="32vw"
                onOpen={openLightbox}
              />
            </div>

            <div className="flex flex-col gap-4">
              <GalleryCard
                item={GALLERY_ITEMS[6]}
                index={6}
                aspectClass="aspect-[4/3.1]"
                sizes="32vw"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[7]}
                index={7}
                aspectClass="aspect-[9/15.6]"
                sizes="32vw"
                onOpen={openLightbox}
              />
              <GalleryCard
                item={GALLERY_ITEMS[8]}
                index={8}
                aspectClass="aspect-[16/11.5]"
                sizes="32vw"
                onOpen={openLightbox}
              />
            </div>
          </div>

          {/* Mobile (< md): Zero-Orphan 2-Column Editorial Grid */}
          <div className="grid md:hidden grid-cols-2 gap-3 mt-8">
            <GalleryCard
              item={GALLERY_ITEMS[2]}
              index={2}
              aspectClass="col-span-2 aspect-[16/9]"
              sizes="94vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[0]}
              index={0}
              aspectClass="aspect-square"
              sizes="46vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[3]}
              index={3}
              aspectClass="aspect-square"
              sizes="46vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[1]}
              index={1}
              aspectClass="aspect-[3/4]"
              sizes="46vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[4]}
              index={4}
              aspectClass="aspect-[3/4]"
              sizes="46vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[6]}
              index={6}
              aspectClass="col-span-2 aspect-[16/10]"
              sizes="94vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[5]}
              index={5}
              aspectClass="aspect-[3/4.3]"
              sizes="46vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[7]}
              index={7}
              aspectClass="aspect-[3/4.3]"
              sizes="46vw"
              onOpen={openLightbox}
            />
            <GalleryCard
              item={GALLERY_ITEMS[8]}
              index={8}
              aspectClass="col-span-2 aspect-[16/9]"
              sizes="94vw"
              onOpen={openLightbox}
            />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* INTERACTIVE LIGHTBOX VIEWER (Opens on Image Click or Pill CTA)     */}
      {/* ================================================================== */}
      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 md:p-8 select-none transition-opacity duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">
                {String(activeIndex + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}
              </span>
              <span className="h-3 w-px bg-zinc-700" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400">
                {activeItem.category}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery lightbox"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Center Image Stage */}
          <div
            className="relative flex-1 max-w-5xl w-full mx-auto my-4 flex items-center justify-center min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[70vh] rounded-2xl overflow-hidden bg-zinc-950/60 border border-white/10">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="90vw"
                quality={95}
                className="object-contain p-2 sm:p-4"
              />
            </div>

            {/* Prev / Next Overlay Controls */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous gallery image"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next gallery image"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Caption & Quick Indicator Dots */}
          <div
            className="max-w-3xl w-full mx-auto text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base sm:text-lg font-bold tracking-tight">
              {activeItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl mx-auto">
              {activeItem.caption}
            </p>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {GALLERY_ITEMS.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Jump to image ${idx + 1}: ${thumb.title}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
