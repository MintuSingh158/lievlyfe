"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// ICONS FOR THE 8 TELEMETRY ITEMS
// ============================================================================

function ChemistryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M10 2v7.31L4.1 19.3A2 2 0 0 0 5.8 22h12.4a2 2 0 0 0 1.7-2.7L14 9.31V2" />
      <line x1="8.5" y1="2" x2="15.5" y2="2" />
      <path d="M7 16h10" />
    </svg>
  );
}

function BmsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M13.5 1.5L4 13.5h6.5l-2 9 11.5-12.5h-6.5l2-8.5z" />
    </svg>
  );
}

function EfficiencyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M13 7.5L9.5 11.5h3.5L11 15.5" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function DeepCycleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <line x1="6" y1="4" x2="6" y2="7" strokeWidth="2.5" />
      <line x1="18" y1="4" x2="18" y2="7" strokeWidth="2.5" />
      <path d="M13 10.5L9.5 14.5h4L11 18" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function VoltageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CapacityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <rect x="2" y="6" width="18" height="12" rx="2" />
      <line x1="22" y1="10" x2="22" y2="14" strokeWidth="2" />
      <line x1="6" y1="10" x2="6" y2="14" />
      <line x1="10" y1="10" x2="10" y2="14" />
      <line x1="14" y1="10" x2="14" y2="14" />
    </svg>
  );
}

function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// ============================================================================
// DATA FOR THE 8 TELEMETRY CARDS (From Official LievLyfe Catalog)
// ============================================================================

export interface OrbitalCardItem {
  num: string;
  label: string;
  title: string;
  highlight: string;
  desc: string;
  icon: React.ComponentType;
}

const PHILOSOPHY_ITEMS: OrbitalCardItem[] = [
  {
    num: "01",
    label: "PHILOSOPHY",
    title: "LiFePO4",
    highlight: "Technology",
    desc: "High-safety lithium iron phosphate chemistry",
    icon: ChemistryIcon,
  },
  {
    num: "02",
    label: "PHILOSOPHY",
    title: "Smart BMS",
    highlight: "Protection",
    desc: "Protection against key electrical operating risks",
    icon: BmsIcon,
  },
  {
    num: "03",
    label: "PHILOSOPHY",
    title: "High Yield",
    highlight: "Efficiency",
    desc: "Designed for dependable daily energy delivery",
    icon: EfficiencyIcon,
  },
  {
    num: "04",
    label: "PHILOSOPHY",
    title: "Long Life",
    highlight: "Service Life",
    desc: "Built for repeated charge and discharge use",
    icon: DeepCycleIcon,
  },
];

const SPEC_ITEMS: OrbitalCardItem[] = [
  {
    num: "01",
    label: "SPECIFICATION",
    title: "12.8 V",
    highlight: "Nominal Voltage",
    desc: "Nominal voltage architecture for reliable output",
    icon: VoltageIcon,
  },
  {
    num: "02",
    label: "SPECIFICATION",
    title: "200 Ah",
    highlight: "Capacity",
    desc: "Rated capacity for home, business and solar",
    icon: CapacityIcon,
  },
  {
    num: "03",
    label: "SPECIFICATION",
    title: "2,560 Wh",
    highlight: "Total Energy",
    desc: "Dependable daily delivered usable energy",
    icon: EnergyIcon,
  },
  {
    num: "04",
    label: "SPECIFICATION",
    title: "3 Years*",
    highlight: "Warranty",
    desc: "Warranty terms subject to policy and invoice",
    icon: WarrantyIcon,
  },
];

// ============================================================================
// ORBITAL RING COMPONENT: ROTATES CLOCKWISE ALONG THE RING SURFACE
// ============================================================================

interface OrbitalRingProps {
  items: OrbitalCardItem[];
  isTop: boolean;
  ringId: string;
}

function OrbitalRing({ items, isTop, ringId }: OrbitalRingProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clockwise progression: 1st -> 2nd -> 3rd -> 4th -> repeat
  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Continuous auto-rotation cycle: pause in center for ~3 seconds, then slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3600); // 3.6s cycle: ~2.8s pause + 0.8s transition
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleManualSelect = (idx: number) => {
    setActiveIdx(idx);
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 2000);
  };

  // Stations along the curved arc surface
  // All cards sit in the dedicated Cards Track at vertical center (top: 50%)
  // with gentle rotation angles matching the orbital curvature
  const getStationStyle = (diff: number) => {
    if (isTop) {
      switch (diff) {
        case -2: // Far left entering
          return { left: "4%", top: "50%", rot: -18, opacity: 0, scale: 0.75, pointer: false };
        case -1: // Left incoming ghost
          return { left: "18%", top: "50%", rot: -10, opacity: 0.35, scale: 0.88, pointer: true };
        case 0:  // Center active (anchored level)
          return { left: "50%", top: "50%", rot: 0,   opacity: 1, scale: 1.0, pointer: true };
        case 1:  // Right outgoing ghost
          return { left: "82%", top: "50%", rot: 10,  opacity: 0.35, scale: 0.88, pointer: true };
        case 2:  // Far right exiting
          return { left: "96%", top: "50%", rot: 18,  opacity: 0, scale: 0.75, pointer: false };
        default:
          return { left: "4%", top: "50%", rot: -18, opacity: 0, scale: 0.75, pointer: false };
      }
    } else {
      switch (diff) {
        case -2: // Far left entering
          return { left: "4%", top: "50%", rot: 18,  opacity: 0, scale: 0.75, pointer: false };
        case -1: // Left incoming ghost
          return { left: "18%", top: "50%", rot: 10,  opacity: 0.35, scale: 0.88, pointer: true };
        case 0:  // Center active (anchored level)
          return { left: "50%", top: "50%", rot: 0,   opacity: 1, scale: 1.0, pointer: true };
        case 1:  // Right outgoing ghost
          return { left: "82%", top: "50%", rot: -10, opacity: 0.35, scale: 0.88, pointer: true };
        case 2:  // Far right exiting
          return { left: "96%", top: "50%", rot: -18, opacity: 0, scale: 0.75, pointer: false };
        default:
          return { left: "4%", top: "50%", rot: 18, opacity: 0, scale: 0.75, pointer: false };
      }
    }
  };

  const bladeGradId = `bladeGrad-${ringId}`;
  const coreGradId = `coreGrad-${ringId}`;
  const glowFilterId = `glow-${ringId}`;

  // Render the 4 Cards Track (Active card in center + ghost milestone numbers)
  const renderCardsTrack = () => (
    <div className="relative w-full h-[64px] min-[390px]:h-[68px] sm:h-[76px] lg:h-[84px] flex items-center justify-center overflow-visible z-20">
      {items.map((item, idx) => {
        let diff = (activeIdx - idx) % 4;
        if (diff < -1) diff += 4;
        if (diff > 2) diff -= 4;

        const st = getStationStyle(diff);
        const isCenter = diff === 0;
        const Icon = item.icon;

        return (
          <div
            key={`${ringId}-card-${idx}`}
            onClick={() => st.pointer && handleManualSelect(idx)}
            style={{
              left: st.left,
              top: st.top,
              transform: `translate(-50%, -50%) rotate(${st.rot}deg) scale(${st.scale})`,
              opacity: st.opacity,
              zIndex: isCenter ? 35 : 15,
              transition: "all 0.75s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className={`absolute will-change-transform ${
              st.pointer ? "cursor-pointer" : "pointer-events-none"
            }`}
          >
            {/* Card Capsule Body */}
            <div
              className={`flex items-center gap-2.5 min-[390px]:gap-3 sm:gap-3.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl transition-all duration-500 ${
                isCenter
                  ? "bg-white/95 border border-zinc-200/90 shadow-[0_6px_28px_rgba(0,0,0,0.08)] backdrop-blur-md"
                  : "bg-transparent border-transparent shadow-none"
              }`}
            >
              {/* Slashed Stencil / Mono Number (Exactly as shown in reference) */}
              <div className="flex items-center gap-1.5 shrink-0">
                {isCenter && (
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
                )}
                <span
                  style={{ fontVariantNumeric: "slashed-zero", fontFeatureSettings: '"zero" 1' }}
                  className={`font-mono font-black tracking-tight leading-none text-2xl min-[390px]:text-3xl sm:text-4xl lg:text-5xl transition-colors duration-500 ${
                    isCenter ? "text-zinc-950" : "text-zinc-400/90 hover:text-zinc-600"
                  }`}
                >
                  {item.num}
                </span>
              </div>

              {/* Details Body (Title, Badge, and Description) */}
              <div
                style={{
                  maxWidth: isCenter ? "340px" : "0px",
                  opacity: isCenter ? 1 : 0,
                  marginLeft: isCenter ? "4px" : "0px",
                  transition: "all 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className="flex flex-col text-left overflow-hidden whitespace-normal"
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-xs min-[390px]:text-sm sm:text-base font-bold text-zinc-950">
                    {item.title}
                  </span>
                  <span className="text-[8.5px] min-[390px]:text-[9.5px] sm:text-[10.5px] font-bold text-red-600 uppercase tracking-wider">
                    {item.highlight}
                  </span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 ml-0.5">
                    <Icon />
                  </div>
                </div>
                <span className="text-[9.5px] min-[390px]:text-[10.5px] sm:text-xs text-zinc-500 font-medium leading-tight max-w-[190px] min-[390px]:max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] line-clamp-2 mt-0.5">
                  {item.desc}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Render the Curved Ring Arc SVG (Identical mirrored geometry, thickness, and glow on both top & bottom)
  const renderRingSvg = () => {
    // Symmetric geometry in 800x70 viewBox: top mirrors bottom cleanly about Y = 35
    const yEnd = isTop ? 55 : 15;
    const yCtrlOuter = isTop ? 9 : 61;
    const yCtrlInner = isTop ? 18 : 52;
    const yCtrlMid = isTop ? 13.5 : 56.5;

    // Exact Cubic Bezier evaluations at t = 0.5 (center) and t = 0.25 / 0.75 (ghost milestones)
    const centerDotY = isTop ? 23.875 : 46.125;
    const ghostDotY = isTop ? 31.66 : 38.34;

    const bladePath = `M 40,${yEnd} C 220,${yCtrlOuter} 580,${yCtrlOuter} 760,${yEnd} C 580,${yCtrlInner} 220,${yCtrlInner} 40,${yEnd} Z`;
    const corePath = `M 40,${yEnd} C 220,${yCtrlMid} 580,${yCtrlMid} 760,${yEnd}`;

    return (
      <div className="relative w-full h-[36px] min-[390px]:h-[40px] sm:h-[48px] lg:h-[56px] flex items-center justify-center overflow-visible z-10 pointer-events-none">
        <svg
          viewBox="0 0 800 70"
          className="w-full h-full overflow-visible pointer-events-none"
          fill="none"
        >
          <defs>
            <linearGradient
              id={bladeGradId}
              gradientUnits="userSpaceOnUse"
              x1="40"
              y1="0"
              x2="760"
              y2="0"
            >
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.05" />
              <stop offset="15%" stopColor="#EF4444" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#EF4444" stopOpacity="1" />
              <stop offset="85%" stopColor="#EF4444" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id={coreGradId}
              gradientUnits="userSpaceOnUse"
              x1="40"
              y1="0"
              x2="760"
              y2="0"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="12%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="88%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Ambient Glow */}
          <path
            d={bladePath}
            fill="#EF4444"
            opacity="0.3"
            filter={`url(#${glowFilterId})`}
          />

          {/* Balanced Luminous Red Glass Blade (Identical thickness top & bottom) */}
          <path
            d={bladePath}
            fill={`url(#${bladeGradId})`}
            stroke="#EF4444"
            strokeWidth="0.8"
            strokeOpacity="0.9"
            className="drop-shadow-[0_0_12px_rgba(239,68,68,0.72)]"
          />

          {/* White dashed laser core mathematically centered along the arc */}
          <path
            d={corePath}
            stroke={`url(#${coreGradId})`}
            strokeWidth="1.25"
            strokeDasharray="5 7"
          />

          {/* Active Center Node Dot centered on the ring arc */}
          <circle cx="400" cy={centerDotY} r="5" fill="#EF4444" filter={`url(#${glowFilterId})`} />
          <circle cx="400" cy={centerDotY} r="2" fill="#FFFFFF" />

          {/* Left & Right Ghost Nodes centered on the ring arc */}
          <circle cx="203.125" cy={ghostDotY} r="3.5" fill="#EF4444" opacity="0.7" />
          <circle cx="596.875" cy={ghostDotY} r="3.5" fill="#EF4444" opacity="0.7" />
        </svg>
      </div>
    );
  };

  return (
    <div
      className={`sec2-orbital-stage relative w-full max-w-[430px] sm:max-w-[620px] lg:max-w-[840px] xl:max-w-[900px] flex flex-col items-center select-none overflow-visible z-20 ${
        isTop ? "sec2-ring-mob-top" : "sec2-ring-mob-bottom"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {isTop ? (
        <>
          {/* TIER 1: CARDS TRACK (Strictly Above the Top Ring) */}
          {renderCardsTrack()}

          {/* TIER 2: AIR GAP (Small clean separation between cards and top ring) */}
          <div className="h-3.5 sm:h-4 lg:h-5 w-full pointer-events-none" />

          {/* TIER 3: TOP RING ARC SVG (Sharp needle blade) */}
          {renderRingSvg()}
        </>
      ) : (
        <>
          {/* TIER 1: BOTTOM RING ARC SVG (Bulkier luminous body) */}
          {renderRingSvg()}

          {/* TIER 2: AIR GAP (Small clean separation between bottom ring and cards) */}
          <div className="h-3.5 sm:h-4 lg:h-5 w-full pointer-events-none" />

          {/* TIER 3: CARDS TRACK (Strictly Below the Bottom Ring) */}
          {renderCardsTrack()}
        </>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: TechnologySection
// ============================================================================

export interface TechnologySectionProps {
  dockTargetRef?: React.RefObject<HTMLDivElement | null>;
  isBatteryCentered?: boolean;
}

export default function TechnologySection({
  dockTargetRef,
  isBatteryCentered,
}: TechnologySectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const isMob = typeof window !== "undefined" && window.innerWidth < 1024;

      // Initial hidden states
      gsap.set([".sec2-headline", ".sec2-sub"], { opacity: 0 });
      gsap.set(".sec2-headline", { y: isMob ? 20 : 35, ...(isMob ? {} : { filter: "blur(12px)" }) });
      gsap.set(".sec2-sub", { y: isMob ? 12 : 20, ...(isMob ? {} : { filter: "blur(6px)" }) });

      // Desktop Left & Right half rings
      gsap.set(".sec2-half-ring-left", { opacity: 0, x: isMob ? 0 : 50 });
      gsap.set(".sec2-half-ring-right", { opacity: 0, x: isMob ? 0 : -50 });

      // Desktop Cards
      gsap.set(".sec2-bubble-left", { opacity: 0, scale: 0, x: -25, transformOrigin: "right center" });
      gsap.set(".sec2-bubble-right", { opacity: 0, scale: 0, x: 25, transformOrigin: "left center" });

      // Mobile Top & Bottom Rings
      gsap.set([".sec2-ring-mob-top", ".sec2-ring-mob-bottom"], { opacity: 0, scale: 0.94 });

      // Master entrance timeline
      const tl = gsap.timeline({
        paused: isBatteryCentered !== undefined ? true : false,
        ...(isBatteryCentered === undefined
          ? {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                toggleActions: "play none none reverse",
              },
            }
          : {}),
      });

      tl
        // 1. Headline & Subtitle reveal
        .to(".sec2-headline", {
          opacity: 1,
          y: 0,
          ...(isMob ? {} : { filter: "blur(0px)" }),
          duration: 0.35,
          ease: "power2.out",
        })
        .to(
          ".sec2-sub",
          {
            opacity: 1,
            y: 0,
            ...(isMob ? {} : { filter: "blur(0px)" }),
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.18"
        )
        // 2. Rings glide outward into place around the battery
        // Desktop: Left & Right half circles glide outward into place around the battery
        .to(
          ".sec2-half-ring-left",
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.1"
        )
        .to(
          ".sec2-half-ring-right",
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          "<"
        )
        // Mobile: Top & Bottom rings glide outward
        .to(
          [".sec2-ring-mob-top", ".sec2-ring-mob-bottom"],
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.05,
          },
          "<"
        )
        // 3. Desktop cards pop in surrounding the half circles
        .to(
          [".sec2-bubble-left", ".sec2-bubble-right"],
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.32,
            stagger: 0.03,
            ease: "back.out(1.5)",
          },
          "+=0.02"
        );

      tlRef.current = tl;

      if (isBatteryCentered) {
        tl.play();
      }
    },
    { scope: sectionRef }
  );

  // Mount/play animations ONLY when the battery is exactly in the center of Section 2
  useEffect(() => {
    if (!tlRef.current || isBatteryCentered === undefined) return;
    if (isBatteryCentered) {
      tlRef.current.timeScale(1.2).play();
    } else {
      tlRef.current.timeScale(2.0).reverse();
    }
  }, [isBatteryCentered]);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="w-full min-h-screen bg-[#F7F8FA] text-[#111113] relative flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-6 min-[390px]:pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-t border-zinc-200/80 overflow-hidden select-none"
    >
      {/* Ambient Studio Lighting Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] lg:w-[1100px] h-[500px] rounded-full bg-radial from-red-600/6 via-zinc-200/20 to-transparent blur-3xl pointer-events-none" />

      {/* ============================================================ */}
      {/* 1. SECTION 2 HEADER: Powering a Better Tomorrow              */}
      {/* ============================================================ */}
      <div className="w-full text-center max-w-3xl mx-auto pt-1 sm:pt-2 mb-2 sm:mb-4 lg:mb-6 z-20">
        <h2 className="sec2-headline text-[22px] min-[390px]:text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-black text-zinc-950 tracking-tight leading-tight">
          Powering a Better Tomorrow
        </h2>
        <p className="sec2-sub text-xs min-[390px]:text-[13px] sm:text-sm font-medium text-zinc-500 mt-2 max-w-xl mx-auto">
          Dependable lithium battery technology for home, business, solar and electric mobility applications.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN ARENA: Mobile Top/Bottom Rings vs Desktop Left/Right */}
      {/* ============================================================ */}
      <div className="relative w-full max-w-5xl lg:max-w-6xl xl:max-w-[1520px] 2xl:max-w-[1680px] mx-auto flex flex-col items-center justify-center my-auto py-1 sm:py-3 lg:py-4 z-20">
        
        {/* MOBILE ONLY (< lg): Top Orbital Ring with Clean Air Gap */}
        <div className="lg:hidden w-full flex flex-col items-center">
          <OrbitalRing
            items={PHILOSOPHY_ITEMS}
            isTop={true}
            ringId="top"
          />
        </div>

        {/* CENTER BATTERY DOCKING STAGE (Shared Across All Devices) */}
        {/* On Mobile: min-h-[190px] to [240px] */}
        {/* On Desktop: min-h-[660px] to [700px] with Left/Right Rings & 8 Surrounding Cards */}
        <div
          ref={dockTargetRef}
          className="relative z-20 w-full max-w-[1480px] mx-auto min-h-[190px] min-[390px]:min-h-[210px] sm:min-h-[240px] lg:min-h-[660px] xl:min-h-[700px] flex items-center justify-center my-2 sm:my-4 lg:my-auto py-1 sm:py-2 lg:py-6"
        >
          {/* Floor Contact Shadow beneath battery */}
          <div className="absolute bottom-1 sm:bottom-3 lg:bottom-8 left-1/2 -translate-x-1/2 w-[240px] min-[390px]:w-[270px] sm:w-[350px] lg:w-[620px] h-5 sm:h-7 lg:h-9 bg-zinc-950/14 rounded-full blur-md pointer-events-none" />

          {/* Central Ambient Spotlight Circle (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-white/70 to-zinc-200/20 border border-zinc-200/60 shadow-xs items-center justify-center opacity-60 pointer-events-none">
            <div className="w-[88%] h-[88%] rounded-full border border-dashed border-zinc-300/80" />
          </div>

          {/* ------------------------------------------------------------ */}
          {/* DESKTOP ONLY: SVG GLOWING CIRCLE (LEFT & RIGHT HALF CIRCLES) */}
          {/* Visible only on Desktop (lg+)                                */}
          {/* ------------------------------------------------------------ */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none overflow-visible">
            <svg
              viewBox="0 0 1440 680"
              className="w-full max-w-[1440px] h-[660px] xl:h-[680px] overflow-visible"
              fill="none"
            >
              <defs>
                <filter id="glassRedGlowDesktop" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur1" />
                  <feGaussianBlur stdDeviation="14" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="redGlassLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#F87171" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="redGlassRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#F87171" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Desktop Left Semicircle Arc */}
              <g className="sec2-half-ring-left">
                <path
                  d="M 605,60 A 280,280 0 0,0 605,620 A 268,280 0 0,1 605,60 Z"
                  fill="#EF4444"
                  opacity="0.32"
                  filter="url(#glassRedGlowDesktop)"
                />
                <path
                  d="M 605,60 A 280,280 0 0,0 605,620 A 268,280 0 0,1 605,60 Z"
                  fill="url(#redGlassLeft)"
                  stroke="#FFFFFF"
                  strokeWidth="0.85"
                  strokeOpacity="0.75"
                  className="drop-shadow-[0_0_14px_rgba(239,68,68,0.75)]"
                />
                <path
                  d="M 603,66 A 274,280 0 0,0 603,614"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                  strokeDasharray="6 12"
                />
                <line x1="401" y1="157" x2="345" y2="157" stroke="url(#redGlassLeft)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />
                <line x1="339" y1="274" x2="280" y2="274" stroke="url(#redGlassLeft)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />
                <line x1="339" y1="406" x2="280" y2="406" stroke="url(#redGlassLeft)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />
                <line x1="401" y1="523" x2="345" y2="523" stroke="url(#redGlassLeft)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />

                <g>
                  <circle cx="401" cy="157" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="401" cy="157" r="3" fill="#FFFFFF" />
                </g>
                <g>
                  <circle cx="339" cy="274" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="339" cy="274" r="3" fill="#FFFFFF" />
                </g>
                <g>
                  <circle cx="339" cy="406" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="339" cy="406" r="3" fill="#FFFFFF" />
                </g>
                <g>
                  <circle cx="401" cy="523" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="401" cy="523" r="3" fill="#FFFFFF" />
                </g>
              </g>

              {/* Desktop Right Semicircle Arc */}
              <g className="sec2-half-ring-right">
                <path
                  d="M 835,60 A 280,280 0 0,1 835,620 A 268,280 0 0,0 835,60 Z"
                  fill="#EF4444"
                  opacity="0.32"
                  filter="url(#glassRedGlowDesktop)"
                />
                <path
                  d="M 835,60 A 280,280 0 0,1 835,620 A 268,280 0 0,0 835,60 Z"
                  fill="url(#redGlassRight)"
                  stroke="#FFFFFF"
                  strokeWidth="0.85"
                  strokeOpacity="0.75"
                  className="drop-shadow-[0_0_14px_rgba(239,68,68,0.75)]"
                />
                <path
                  d="M 837,66 A 274,280 0 0,1 837,614"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                  strokeDasharray="6 12"
                />
                <line x1="1039" y1="157" x2="1095" y2="157" stroke="url(#redGlassRight)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />
                <line x1="1101" y1="274" x2="1160" y2="274" stroke="url(#redGlassRight)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />
                <line x1="1101" y1="406" x2="1160" y2="406" stroke="url(#redGlassRight)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />
                <line x1="1039" y1="523" x2="1095" y2="523" stroke="url(#redGlassRight)" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />

                <g>
                  <circle cx="1039" cy="157" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="1039" cy="157" r="3" fill="#FFFFFF" />
                </g>
                <g>
                  <circle cx="1101" cy="274" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="1101" cy="274" r="3" fill="#FFFFFF" />
                </g>
                <g>
                  <circle cx="1101" cy="406" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="1101" cy="406" r="3" fill="#FFFFFF" />
                </g>
                <g>
                  <circle cx="1039" cy="523" r="8.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glassRedGlowDesktop)" />
                  <circle cx="1039" cy="523" r="3" fill="#FFFFFF" />
                </g>
              </g>
            </svg>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* DESKTOP ONLY: 4 PRECISION CARDS ON LEFT (PHILOSOPHY)         */}
          {/* ------------------------------------------------------------ */}
          <div className="hidden lg:flex flex-col justify-between absolute left-2 lg:left-3 xl:left-4 top-14 bottom-14 w-[240px] xl:w-[320px] pointer-events-none z-30">
            {/* Card L1 */}
            <div className="w-full flex justify-end xl:-translate-x-1">
              <div className="sec2-bubble-left pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">01 // PHILOSOPHY</span>
                  </div>
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <ChemistryIcon />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">LiFePO4</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Technology</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  High-safety lithium iron phosphate chemistry
                </p>
              </div>
            </div>

            {/* Card L2 */}
            <div className="w-full flex justify-end xl:-translate-x-6">
              <div className="sec2-bubble-left pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">02 // PHILOSOPHY</span>
                  </div>
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <BmsIcon />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">Smart BMS</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Protection</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  Protection against key electrical operating risks
                </p>
              </div>
            </div>

            {/* Card L3 */}
            <div className="w-full flex justify-end xl:-translate-x-10">
              <div className="sec2-bubble-left pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">03 // PHILOSOPHY</span>
                  </div>
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <EfficiencyIcon />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">High Yield</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Efficiency</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  Designed for dependable daily energy delivery
                </p>
              </div>
            </div>

            {/* Card L4 */}
            <div className="w-full flex justify-end xl:-translate-x-1">
              <div className="sec2-bubble-left pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">04 // PHILOSOPHY</span>
                  </div>
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <DeepCycleIcon />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">Long Life</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Service Life</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  Built for repeated charge and discharge use
                </p>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* DESKTOP ONLY: 4 PRECISION CARDS ON RIGHT (SPECIFICATIONS)    */}
          {/* ------------------------------------------------------------ */}
          <div className="hidden lg:flex flex-col justify-between absolute right-2 lg:right-3 xl:right-4 top-14 bottom-14 w-[240px] xl:w-[320px] pointer-events-none z-30">
            {/* Card R1 */}
            <div className="w-full flex justify-start xl:translate-x-1">
              <div className="sec2-bubble-right pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <VoltageIcon />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">01 // SPECIFICATION</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">12.8 V</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Nominal Voltage</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  Nominal voltage architecture for reliable output
                </p>
              </div>
            </div>

            {/* Card R2 */}
            <div className="w-full flex justify-start xl:translate-x-6">
              <div className="sec2-bubble-right pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <CapacityIcon />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">02 // SPECIFICATION</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">200 Ah</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Capacity</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  Rated capacity for home, business and solar
                </p>
              </div>
            </div>

            {/* Card R3 */}
            <div className="w-full flex justify-start xl:translate-x-10">
              <div className="sec2-bubble-right pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <EnergyIcon />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">03 // SPECIFICATION</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">2,560 Wh</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Total Energy</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  Dependable daily delivered usable energy
                </p>
              </div>
            </div>

            {/* Card R4 */}
            <div className="w-full flex justify-start xl:translate-x-1">
              <div className="sec2-bubble-right pointer-events-auto w-[215px] xl:w-[280px] relative p-2.5 xl:p-3.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(239,68,68,0.12)] transition-all duration-300 group">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-red-500/40 group-hover:bg-red-600 transition-colors" />
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 transition-colors">
                    <WarrantyIcon />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase">04 // SPECIFICATION</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg xl:text-2xl font-black text-zinc-950 tracking-tight leading-none">3 Years*</span>
                  <span className="text-[9.5px] xl:text-[10px] font-bold text-red-600 uppercase tracking-wider">Warranty</span>
                </div>
                <p className="text-[10px] xl:text-[11px] font-medium text-zinc-500 leading-snug mt-1">
                  Warranty terms subject to policy and invoice
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ONLY (< lg): Bottom Orbital Ring with Clean Air Gap */}
        <div className="lg:hidden w-full flex flex-col items-center">
          <OrbitalRing
            items={SPEC_ITEMS}
            isTop={false}
            ringId="bottom"
          />
        </div>

      </div>
    </section>
  );
}
