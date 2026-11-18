"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ============================================================================
// CRISP BRAND VECTOR ICONS (LIGHT-HERO AESTHETIC)
// ============================================================================

// 1. Deep Cycle Icon
function DeepCycleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <line x1="6" y1="4" x2="6" y2="7" strokeWidth="2.5" />
      <line x1="18" y1="4" x2="18" y2="7" strokeWidth="2.5" />
      <path d="M13 10.5L9.5 14.5h4L11 18" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// 2. BMS Protection Icon
function BmsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 1.5L4 13.5h6.5l-2 9 11.5-12.5h-6.5l2-8.5z" />
    </svg>
  );
}

// 3. High Efficiency Icon
function HighEfficiencyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M13 7.5L9.5 11.5h3.5L11 15.5" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// 4. Smart & Safe Icon
function SmartSafeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2.2 2.2 4.5-4.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 5. Home Application Icon
function HomeAppIcon({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M10 21v-6h4v6" />
      <path d="M18 6.5V4h-2" />
    </svg>
  );
}

// 6. Business Application Icon
function BusinessAppIcon({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="9" height="18" rx="0.5" />
      <rect x="13" y="8" width="7" height="13" rx="0.5" />
      <line x1="7" y1="6" x2="7.01" y2="6" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="6" x2="10.01" y2="6" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="10" x2="7.01" y2="10" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="10" x2="10.01" y2="10" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="14" x2="7.01" y2="14" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="14" x2="10.01" y2="14" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="12" x2="16.01" y2="12" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 7. Solar System Application Icon
function SolarSystemAppIcon({ className = "w-4.5 h-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v2" />
      <path d="M6 4.5l1.5 1.5" />
      <path d="M18 4.5l-1.5 1.5" />
      <path d="M8 7.5a4 4 0 0 1 8 0" />
      <polygon points="3,17 6,9 18,9 21,17" />
      <line x1="12" y1="9" x2="12" y2="17" />
      <line x1="4.5" y1="13" x2="19.5" y2="13" />
      <line x1="9" y1="17" x2="7" y2="21" />
      <line x1="15" y1="17" x2="17" y2="21" />
      <line x1="6" y1="21" x2="18" y2="21" />
    </svg>
  );
}

// 8. Voltage circular badge
function VoltageIcon() {
  return (
    <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
        <path d="M13 2L5 13h5l-2 9 11-12h-5l2-8z" />
      </svg>
    </div>
  );
}

// 9. Battery Capacity/Energy badge
function CellBatteryIcon() {
  return (
    <div className="w-4 h-5 sm:w-4.5 sm:h-5.5 rounded-xs border-1.5 border-red-600/80 bg-red-50 text-red-600 relative flex items-center justify-center shrink-0">
      <div className="absolute -top-1 w-2 h-0.5 bg-red-600 rounded-t-xs" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
        <path d="M13 2L6 13h4l-2 9 10-12h-4l2-8z" />
      </svg>
    </div>
  );
}

// ============================================================================
// 3D PERSPECTIVE PILLAR / PEDESTAL (ANCHORED TO BASE OF GRAY RECTANGLE)
// ============================================================================
function Floating3DPillar({ idPrefix = "desktop" }: { idPrefix?: string }) {
  const topGradId = `${idPrefix}-pedestalTop`;
  const leftGradId = `${idPrefix}-pedestalLeft`;
  const rightGradId = `${idPrefix}-pedestalRight`;
  const shadowGradId = `${idPrefix}-batteryPillarShadow`;
  const clipId = `${idPrefix}-pedestalTopClip`;

  return (
    <div className="hero-pedestal-platform opacity-0 absolute bottom-[-36px] min-[390px]:bottom-[-46px] sm:bottom-[-36px] lg:bottom-[-20px] xl:bottom-[-25px] 2xl:bottom-[-35px] left-1/2 -translate-x-1/2 w-[114%] h-[125px] min-[390px]:h-[135px] sm:h-[160px] md:h-[180px] lg:h-[250px] xl:h-[290px] 2xl:h-[340px] pointer-events-none z-10">
      <svg viewBox="0 0 500 450" className="w-full h-full drop-shadow-[0_18px_32px_rgba(0,0,0,0.07)]" fill="none">
        <defs>
          {/* Top Surface Gradient - Crisp Studio White/Grey */}
          <linearGradient id={topGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAFBFD" />
            <stop offset="50%" stopColor="#EFF1F5" />
            <stop offset="100%" stopColor="#DFE3EA" />
          </linearGradient>

          {/* Left Face Gradient - Short side in soft diffuse shade */}
          <linearGradient id={leftGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D6DBE3" />
            <stop offset="60%" stopColor="#C4C9D3" />
            <stop offset="100%" stopColor="#B2B8C3" />
          </linearGradient>

          {/* Right Face Gradient - Long front face catching key light */}
          <linearGradient id={rightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAEDF3" />
            <stop offset="50%" stopColor="#DEE2E9" />
            <stop offset="100%" stopColor="#CFD4DE" />
          </linearGradient>

          {/* Floating Battery Cast Shadow on Pedestal Top Surface */}
          <radialGradient id={shadowGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B0B10" stopOpacity="0.32" />
            <stop offset="40%" stopColor="#0B0B10" stopOpacity="0.16" />
            <stop offset="75%" stopColor="#0B0B10" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0B0B10" stopOpacity="0.0" />
          </radialGradient>

          {/* Top Surface Rhomboid ClipPath */}
          <clipPath id={clipId}>
            <polygon points="265,18 35,55 165,95 465,58" />
          </clipPath>
        </defs>

        {/* Left Face (Short side extends straight down to base) */}
        <polygon points="35,55 165,95 165,450 35,450" fill={`url(#${leftGradId})`} />

        {/* Right Face (Long front face extends straight down to base) */}
        <polygon points="165,95 465,58 465,450 165,450" fill={`url(#${rightGradId})`} />

        {/* Top Surface (Rhomboid perspective plane) */}
        <polygon points="265,18 35,55 165,95 465,58" fill={`url(#${topGradId})`} />

        {/* Ambient Contact Shadow Cast by the Hovering Battery */}
        <g clipPath={`url(#${clipId})`}>
          <g className="hero-pedestal-shadow" transform="translate(245, 58) rotate(-2)">
            <ellipse cx="0" cy="0" rx="140" ry="20" fill={`url(#${shadowGradId})`} />
          </g>
        </g>

        {/* Clean Architectural Bevel Highlight Lines */}
        <line x1="165" y1="95" x2="165" y2="450" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.75" />
        <polyline points="35,55 165,95 465,58" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.85" />
      </svg>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: LightHeroDesign
// ============================================================================
export interface LightHeroDesignProps {
  desktopAnchorRef?: React.RefObject<HTMLDivElement | null>;
  mobileAnchorRef?: React.RefObject<HTMLDivElement | null>;
  hideBatteryImage?: boolean;
  onNavigate?: (target: string) => void;
}

export default function LightHeroDesign({
  desktopAnchorRef,
  mobileAnchorRef,
  hideBatteryImage = false,
  onNavigate,
}: LightHeroDesignProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileCardIndex, setMobileCardIndex] = React.useState<"rickshaw" | "applications">("rickshaw");

  // Buttery-smooth navigation handler powered by GSAP + Lenis
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    target: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // GSAP micro-interaction: tactile elastic feedback on the clicked control
    if (e.currentTarget) {
      gsap.fromTo(
        e.currentTarget,
        { scale: 0.93, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }
      );
    }

    // Cleanly update URL history without triggering instant jump
    if (typeof window !== "undefined") {
      const newPath = target === "/" || target === "#overview" || target === "top" ? "/" : target;
      window.history.pushState(null, "", newPath);
    }

    // Delegate to unified section orchestrator if provided
    if (onNavigate) {
      onNavigate(target);
      return;
    }

    const lenis = typeof window !== "undefined" ? (window as any).__lenis : null;

    // Home / Top
    if (target === "/" || target === "#overview" || target === "top") {
      if (lenis) {
        lenis.scrollTo(0, {
          duration: 1.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Target element lookup with intelligent fallback
    const targetEl = document.querySelector(target);
    const dest = targetEl || document.getElementById("technology");
    if (dest) {
      if (lenis) {
        lenis.scrollTo(dest, {
          duration: 1.6,
          offset: -20,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        dest.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Orchestrated entrance reveals for Hero typography, cards, and image stages
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 0.0s: Top Navigation Bar
      tl.fromTo(
        ".hero-nav-logo",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 },
        0
      )
        .fromTo(
          ".hero-nav-center",
          { opacity: 0, y: -16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          0.08
        )
        .fromTo(
          ".hero-nav-right",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.7 },
          0.08
        )
        .fromTo(
          ".hero-nav-mobile",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6 },
          0.08
        );

      // 0.1s: Background Watermark & 3D Pedestal Platform (Rises up from the bottom)
      tl.fromTo(
        ".hero-watermark",
        { opacity: 0, scale: 0.94 },
        { opacity: 0.95, scale: 1, duration: 1.1 },
        0.1
      )
        .fromTo(
          ".hero-pillar-backdrop",
          { opacity: 0, y: 140 },
          { opacity: 1, y: 0, duration: 1.25, ease: "power3.out" },
          0.1
        )
        .fromTo(
          ".hero-pedestal-platform",
          { opacity: 0, y: 140 },
          { opacity: 1, y: 0, duration: 1.25, ease: "power3.out" },
          0.1
        )
        .fromTo(
          ".hero-mobile-pillar-card",
          { opacity: 0, y: 120 },
          { opacity: 1, y: 0, duration: 1.25, ease: "power3.out" },
          0.1
        )
        .fromTo(
          ".hero-pedestal-shadow",
          { opacity: 0, scale: 0.45, transformOrigin: "center center" },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          0.18
        );

      // 0.15s: Left Column (Headline typography, Badge, 4 Feature Cards, CTA)
      tl.fromTo(
        ".hero-title-line",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
        0.15
      )
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.35
        )
        .fromTo(
          ".hero-feature-card",
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.06 },
          0.4
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, y: 16, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
          0.6
        );

      // 0.25s: Right Column (Applications Card, E-Rickshaw Card & Vehicle Image)
      tl.fromTo(
        ".hero-app-card",
        { opacity: 0, x: 25, y: 10 },
        { opacity: 1, x: 0, y: 0, duration: 0.75 },
        0.25
      )
        .fromTo(
          ".hero-app-icon",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, stagger: 0.05, ease: "back.out(1.8)" },
          0.45
        )
        .fromTo(
          ".hero-rickshaw-card",
          { opacity: 0, x: 25, y: 15 },
          { opacity: 1, x: 0, y: 0, duration: 0.75 },
          0.35
        )
        .fromTo(
          ".hero-rickshaw-img",
          { scale: 0.82, opacity: 0, y: 12 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.45
        )
        .fromTo(
          ".hero-ev-badge",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          0.6
        );

      // 0.4s: Bottom Specs Ribbon
      tl.fromTo(
        ".hero-bottom-ribbon",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.4
      )
        .fromTo(
          ".hero-spec-pill",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 },
          0.5
        );
    },
    { scope: heroContainerRef }
  );

  return (
    <div
      ref={heroContainerRef}
      className="w-full min-h-screen lg:h-screen bg-[#F7F8FA] text-[#111113] relative overflow-x-clip lg:overflow-hidden flex flex-col justify-between px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-4 sm:pt-6 lg:pt-8 pb-3.5 sm:pb-5"
    >
      
      {/* ========================================================== */}
      {/* CENTRAL ROUNDED PILLAR BACKDROP (z-05) - DESKTOP ONLY      */}
      {/* Positioned cleanly ABOVE the footer line (bottom-[64px])   */}
      {/* Contains the 3D Pedestal Platform extending beneath it     */}
      {/* ========================================================== */}
      <div className="hero-pillar-backdrop opacity-0 hidden lg:block absolute left-1/2 -translate-x-1/2 top-3 sm:top-3.5 lg:top-4 bottom-[64px] w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] xl:w-[480px] 2xl:w-[530px] bg-[#E9EBEF] rounded-[36px] sm:rounded-[44px] lg:rounded-[48px] z-05 border border-zinc-200/60 pointer-events-none shadow-xs overflow-hidden">
        {/* 3D Isometric Pedestal Platform rising seamlessly beneath the gray rectangle */}
        <Floating3DPillar idPrefix="desktop" />
      </div>

      {/* ========================================================== */}
      {/* "LievLyfe" GIANT STATEMENT WATERMARK (z-10) - DESKTOP ONLY */}
      {/* ========================================================== */}
      <div className="hero-watermark hidden lg:block absolute right-0 sm:right-3 md:right-5 lg:right-7 xl:right-9 top-[22%] sm:top-[24%] lg:top-[25%] -translate-y-1/2 select-none pointer-events-none font-black text-[#1C1C20] text-[75px] sm:text-[100px] md:text-[120px] lg:text-[140px] xl:text-[180px] 2xl:text-[215px] tracking-tighter leading-none z-10 whitespace-nowrap opacity-95">
        LievLyfe
      </div>

      {/* ========================================================== */}
      {/* TOP NAVIGATION BAR                                         */}
      {/* Must be z-50 when mobile menu is open so close button is   */}
      {/* crisp, above the backdrop blur, and directly clickable     */}
      {/* ========================================================== */}
      <header className={`relative ${mobileMenuOpen ? "z-50" : "z-30"} flex items-center justify-between w-full`}>
        {/* Left: Official Brand Vector Logo leading to Home / */}
        <div className="hero-nav-logo shrink-0">
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center cursor-pointer group"
            aria-label="LievLyfe Home"
          >
            <Image
              src="/LOGO.svg"
              alt="LievLyfe Logo"
              width={160}
              height={30}
              style={{ width: "auto" }}
              className="h-5.5 sm:h-6 lg:h-7.5 w-auto object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform"
              priority
            />
          </Link>
        </div>

        {/* Center: Floating Capsule Navigation (Visible on md and up) */}
        <nav
          aria-label="Primary navigation"
          className="hero-nav-center hidden md:flex items-center gap-5 lg:gap-7 xl:gap-9 px-5 lg:px-7 xl:px-9 py-2 lg:py-2.5 rounded-full bg-white border border-zinc-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] absolute left-1/2 -translate-x-1/2 z-30"
        >
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="text-xs lg:text-[13px] xl:text-sm font-semibold text-zinc-950 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Home
          </Link>
          <a
            href="#technology"
            onClick={(e) => handleNavClick(e, "#technology")}
            className="text-xs lg:text-[13px] xl:text-sm font-semibold text-zinc-600 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Technology
          </a>
          <a
            href="#products"
            onClick={(e) => handleNavClick(e, "#products")}
            className="text-xs lg:text-[13px] xl:text-sm font-semibold text-zinc-600 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Products
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, "#gallery")}
            className="text-xs lg:text-[13px] xl:text-sm font-semibold text-zinc-600 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Gallery
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, "#faq")}
            className="text-xs lg:text-[13px] xl:text-sm font-semibold text-zinc-600 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            FAQ
          </a>
        </nav>

        {/* Right side contact pill (Desktop & Tablet md+) */}
        <div className="hero-nav-right hidden md:flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="px-4 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-800 transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Button (Visible on screens < md) */}
        <div className="hero-nav-mobile flex md:hidden items-center relative z-50">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-9 h-9 rounded-full ${
              mobileMenuOpen
                ? "bg-white text-zinc-950 border border-zinc-300 shadow-md ring-2 ring-zinc-900/10"
                : "bg-white text-zinc-800 border border-zinc-200/90 shadow-2xs hover:text-black"
            } flex items-center justify-center focus:outline-none transition-all cursor-pointer`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ========================================================== */}
      {/* MOBILE DROPDOWN NAVIGATION MENU (z-50 FIXED OVERLAY)       */}
      {/* ========================================================== */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop dimming layer (z-40 so header & close button at z-50 stay crisp and above the blur) */}
          <div
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-[3px] z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Floating Mobile Navigation Sheet */}
          <div className="md:hidden fixed inset-x-3.5 top-18 z-50 p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-[0_16px_48px_rgba(0,0,0,0.18)] animate-in fade-in slide-in-from-top-2 duration-150">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-950 hover:bg-zinc-100 hover:text-red-600 transition-colors cursor-pointer"
              >
                Home
              </Link>
              <a
                href="#technology"
                onClick={(e) => handleNavClick(e, "#technology")}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-red-600 transition-colors cursor-pointer"
              >
                Technology
              </a>
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "#products")}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-red-600 transition-colors cursor-pointer"
              >
                Products
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, "#gallery")}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-red-600 transition-colors cursor-pointer"
              >
                Gallery
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, "#faq")}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-red-600 transition-colors cursor-pointer"
              >
                FAQ
              </a>
              <div className="pt-2 border-t border-zinc-100 mt-1">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="w-full block text-center py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* ========================================================== */}
      {/* HERO MAIN BODY: Left, Center Floating Battery Stage, Right */}
      {/* ========================================================== */}
      <div className="relative z-25 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-3 xl:gap-6 items-center my-auto py-3 sm:py-4 lg:py-5 w-full max-w-[1540px] mx-auto">
        
        {/* -------------------------------------------------------- */}
        {/* LEFT COLUMN: Headline & 4 Feature Badges Grid            */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col justify-center z-25 w-full max-w-full sm:max-w-[540px] md:max-w-[620px] lg:max-w-[360px] xl:max-w-[460px] mx-auto lg:mx-0 text-center lg:text-left">
          {/* Main Title Hierarchy */}
          <h1 className="text-[24px] min-[390px]:text-[28px] sm:text-[34px] md:text-[38px] lg:text-[32px] xl:text-[40px] 2xl:text-[46px] leading-[1.14] tracking-[-0.01em] lg:tracking-tight">
            <span className="hero-title-line font-bold text-zinc-950 block">LievLyfe Energy</span>
            <span className="hero-title-line font-bold text-zinc-950 block">specialist in Future</span>
            <span className="hero-title-line block mt-0.5">
              <span className="text-zinc-400 font-normal">LiFePO4</span>{" "}
              <span className="font-bold text-zinc-950">power</span>
            </span>
          </h1>

          {/* Section Category Header */}
          <div className="hero-badge flex items-center justify-center lg:justify-start gap-1.5 text-[9.5px] min-[390px]:text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-widest text-zinc-500 uppercase mt-2.5 sm:mt-3.5 lg:mt-4">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-xs inline-block" />
            <span>CORE TECHNOLOGY & SAFETY</span>
          </div>

          {/* 4 FEATURE CARDS (DEEP CYCLE, BMS, HIGH EFFICIENCY, SMART SAFE) */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 lg:gap-3 mt-2.5 sm:mt-3 w-full max-w-full sm:max-w-[540px] md:max-w-[620px] lg:max-w-none mx-auto lg:mx-0 text-left">
            
            {/* 1. Deep Cycle */}
            <div className="hero-feature-card flex items-center gap-2 sm:gap-2.5 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white/95 border border-zinc-200/90 shadow-2xs hover:border-red-400 hover:shadow-xs transition-all group">
              <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg sm:rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <DeepCycleIcon />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-zinc-900 block whitespace-nowrap">
                  Deep Cycle
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] text-zinc-500 font-medium block whitespace-nowrap mt-0.5">
                  3,500+ Lifecycles
                </span>
              </div>
            </div>

            {/* 2. BMS Protection */}
            <div className="hero-feature-card flex items-center gap-2 sm:gap-2.5 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white/95 border border-zinc-200/90 shadow-2xs hover:border-red-400 hover:shadow-xs transition-all group">
              <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg sm:rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BmsIcon />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-zinc-900 block whitespace-nowrap">
                  BMS Protection
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] text-zinc-500 font-medium block whitespace-nowrap mt-0.5">
                  Auto Cut-Off Guard
                </span>
              </div>
            </div>

            {/* 3. High Efficiency */}
            <div className="hero-feature-card flex items-center gap-2 sm:gap-2.5 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white/95 border border-zinc-200/90 shadow-2xs hover:border-red-400 hover:shadow-xs transition-all group">
              <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg sm:rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <HighEfficiencyIcon />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-zinc-900 block whitespace-nowrap">
                  High Efficiency
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] text-zinc-500 font-medium block whitespace-nowrap mt-0.5">
                  &gt;98% Energy Yield
                </span>
              </div>
            </div>

            {/* 4. Smart & Safe */}
            <div className="hero-feature-card flex items-center gap-2 sm:gap-2.5 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-white/95 border border-zinc-200/90 shadow-2xs hover:border-red-400 hover:shadow-xs transition-all group">
              <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 lg:w-8 lg:h-8 rounded-lg sm:rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <SmartSafeIcon />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold text-zinc-900 block whitespace-nowrap">
                  Smart & Safe
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] text-zinc-500 font-medium block whitespace-nowrap mt-0.5">
                  Stable LiFePO4
                </span>
              </div>
            </div>

          </div>

          {/* CTA Action Button */}
          <div className="hero-cta-btn mt-3 sm:mt-4 lg:mt-5 flex justify-center lg:justify-start w-full">
            <button
              onClick={(e) => handleNavClick(e, "#technology")}
              className="w-full sm:w-auto px-4.5 sm:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full bg-[#18181B] hover:bg-black text-white inline-flex items-center justify-between sm:justify-start gap-3 sm:gap-4 shadow-sm transition-all group cursor-pointer max-w-full sm:max-w-none"
            >
              <span className="text-[11.5px] sm:text-xs lg:text-sm font-semibold tracking-tight">Explore 200Ah battery specs</span>
              <span className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 text-white shadow-[0_2px_10px_rgba(239,68,68,0.45)] flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* CENTER COLUMN (MOBILE / TABLET < lg): STUDIO SHOWCASE    */}
        {/* Dedicated self-contained card holding Battery & 3D Pillar */}
        {/* -------------------------------------------------------- */}
        <div className="lg:hidden w-full flex items-center justify-center my-2.5 sm:my-4 relative z-20">
          <div className="relative w-full max-w-full sm:max-w-[540px] md:max-w-[620px] h-[295px] min-[390px]:h-[320px] sm:h-[365px] md:h-[400px] flex items-center justify-center">
            
            {/* Animated Studio Showcase Card: rises up seamlessly from the bottom */}
            <div className="hero-mobile-pillar-card opacity-0 absolute inset-0 rounded-[28px] sm:rounded-[36px] bg-[#E9EBEF] border border-zinc-200/80 shadow-xs overflow-hidden flex items-center justify-center pointer-events-none will-change-transform">
              {/* Background Watermark inside Mobile Studio Card */}
              <div className="absolute right-0 sm:right-2 top-[10%] select-none pointer-events-none font-black text-[#1C1C20] text-[54px] min-[390px]:text-[64px] sm:text-[84px] md:text-[96px] tracking-tighter leading-none z-10 whitespace-nowrap opacity-90">
                LievLyfe
              </div>

              {/* 3D Isometric Pedestal Platform rising seamlessly from base */}
              <Floating3DPillar idPrefix="mobile" />
            </div>

            {/* Static Mobile Anchor for the Floating Battery: positioned to float elegantly higher above the 3D pillar */}
            <div
              ref={mobileAnchorRef}
              className="absolute top-3 min-[390px]:top-4 sm:top-5 md:top-6 left-1/2 -translate-x-1/2 w-[88%] sm:w-[85%] md:w-[80%] h-[58%] min-[390px]:h-[60%] sm:h-[62%] md:h-[64%] z-20 pointer-events-none"
            >
              <div className={`relative w-full h-full ${hideBatteryImage ? "opacity-0 pointer-events-none" : "animate-hero-float"}`}>
                <Image
                  src="/assets/lievlyfe_hero_battery_v5.png"
                  alt="LievLyfe LiFePO4 Premium Lithium Battery"
                  fill
                  sizes="(max-width: 640px) 380px, (max-width: 1024px) 540px, 620px"
                  priority
                  className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.22)] select-none pointer-events-none"
                />
              </div>
            </div>

          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* CENTER COLUMN (DESKTOP lg+): Floating Battery Stage      */}
        {/* -------------------------------------------------------- */}
        <div className="hidden lg:flex lg:col-span-4 items-center justify-center relative z-20 my-2 lg:my-0 overflow-visible">
          <div className="relative w-[340px] sm:w-[410px] md:w-[450px] lg:w-[460px] xl:w-[490px] 2xl:w-[580px] aspect-[16/14] shrink-0 flex items-center justify-center -translate-y-5 lg:-translate-y-7 xl:-translate-y-9 2xl:-translate-y-10">
            
            {/* Smooth Floating Battery hovering elegantly above the pillar */}
            <div
              ref={desktopAnchorRef}
              className="relative w-full h-[90%] z-20 -translate-y-3 lg:-translate-y-4 xl:-translate-y-5"
            >
              <div className={`relative w-full h-full ${hideBatteryImage ? "opacity-0 pointer-events-none" : "animate-hero-float"}`}>
                <Image
                  src="/assets/lievlyfe_hero_battery_v5.png"
                  alt="LievLyfe LiFePO4 Premium Lithium Battery"
                  fill
                  sizes="(max-width: 1024px) 450px, (max-width: 1440px) 550px, 600px"
                  priority
                  className="object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.22)] select-none pointer-events-none"
                />
              </div>
            </div>

          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* RIGHT COLUMN: Desktop, Tablet, and Mobile Adaptive Cards */}
        {/* -------------------------------------------------------- */}
        {/* 1. DESKTOP ONLY (lg+): Vertical Stack in Right Column    */}
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-between items-end z-25 gap-5 lg:gap-6 w-full max-w-none mx-0 translate-y-7 xl:translate-y-9">
          
          {/* Top Applications Card: Home, Business, Solar System */}
          <div id="applications" className="hero-app-card rounded-2xl sm:rounded-3xl bg-white/92 border border-zinc-200/90 p-2.5 sm:p-3 xl:p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] w-full max-w-[225px] xl:max-w-[270px] text-left relative z-25 mt-20 xl:mt-28">
            
            {/* Header: Powering Tomorrow */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-100">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[9.5px] sm:text-[10px] font-black text-zinc-900 uppercase tracking-wider">
                  Powering Tomorrow
                </span>
              </div>
              <span className="text-[8.5px] font-bold text-zinc-400 uppercase">
                Applications
              </span>
            </div>

            {/* 3 Application Icons & Details */}
            <div className="grid grid-cols-3 gap-1 text-center">
              {/* Home */}
              <div className="hero-app-item flex flex-col items-center p-1.5 rounded-lg bg-zinc-50 hover:bg-red-50/50 hover:border-red-200 border border-transparent transition-all group cursor-default">
                <div className="hero-app-icon w-7 h-7 rounded-md bg-white shadow-2xs flex items-center justify-center text-zinc-700 group-hover:text-red-600 transition-colors mb-0.5">
                  <HomeAppIcon />
                </div>
                <span className="text-[9.5px] font-bold text-zinc-900 uppercase block">
                  Home
                </span>
                <span className="text-[7.5px] text-zinc-500 font-medium block">
                  Residential
                </span>
              </div>

              {/* Business */}
              <div className="hero-app-item flex flex-col items-center p-1.5 rounded-lg bg-zinc-50 hover:bg-red-50/50 hover:border-red-200 border border-transparent transition-all group cursor-default">
                <div className="hero-app-icon w-7 h-7 rounded-md bg-white shadow-2xs flex items-center justify-center text-zinc-700 group-hover:text-red-600 transition-colors mb-0.5">
                  <BusinessAppIcon />
                </div>
                <span className="text-[9.5px] font-bold text-zinc-900 uppercase block">
                  Business
                </span>
                <span className="text-[7.5px] text-zinc-500 font-medium block">
                  Commercial
                </span>
              </div>

              {/* Solar System */}
              <div className="hero-app-item flex flex-col items-center p-1.5 rounded-lg bg-zinc-50 hover:bg-red-50/50 hover:border-red-200 border border-transparent transition-all group cursor-default">
                <div className="hero-app-icon w-7 h-7 rounded-md bg-white shadow-2xs flex items-center justify-center text-zinc-700 group-hover:text-red-600 transition-colors mb-0.5">
                  <SolarSystemAppIcon />
                </div>
                <span className="text-[9.5px] font-bold text-zinc-900 uppercase block">
                  Solar
                </span>
                <span className="text-[7.5px] text-zinc-500 font-medium block">
                  Renewable
                </span>
              </div>
            </div>

            <p className="text-[8.5px] text-zinc-500 mt-1.5 text-center font-medium">
              For home. For business. For the future.
            </p>
          </div>

          {/* Lower-Right Floating Card with ELECTRIC RICKSHAW SHOWCASE */}
          <div id="hero-rickshaw-preview" className="hero-rickshaw-card rounded-[28px] sm:rounded-[32px] bg-[#E9EBEF] border border-zinc-200/80 p-3 sm:p-3.5 shadow-xs w-full max-w-[225px] xl:max-w-[270px] text-left relative z-25 translate-y-2 group">
            {/* E-Rickshaw Showcase Container */}
            <div className="relative w-full h-24 sm:h-27 xl:h-29 mb-1 flex items-center justify-center overflow-visible">
              <div className="absolute inset-0 bg-radial from-red-600/15 via-red-500/5 to-transparent blur-md pointer-events-none rounded-xl" />

              <div className="hero-ev-badge absolute top-0 right-0 z-10">
                <span className="px-2 py-0.5 rounded-full text-[7.5px] font-bold font-mono tracking-wider bg-red-600/10 text-red-600 border border-red-500/20">
                  EV GRADE
                </span>
              </div>

              <div className="hero-rickshaw-img relative w-full h-full flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 ease-out">
                <Image
                  src="/assets/erickshaw_red_theme.png"
                  alt="LievLyfe Powered Electric Rickshaw"
                  width={420}
                  height={290}
                  className="w-auto h-full max-h-[90px] sm:max-h-[102px] xl:max-h-[112px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.16)]"
                  priority
                />
              </div>
            </div>

            {/* Title, Subtitle, and Nav Arrows */}
            <div className="flex items-end justify-between pt-0.5">
              <div>
                <h4 className="text-[10.5px] sm:text-[11px] font-bold text-zinc-900 tracking-tight">
                  51.2V E-Rickshaw Battery
                </h4>
                <p className="text-[8.5px] sm:text-[9px] text-zinc-500 font-medium mt-0.5">
                  105Ah • 5.376 kWh • EV Grade
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous"
                  className="w-5.5 h-5.5 rounded-full border border-zinc-300 bg-white/90 hover:bg-white hover:border-red-300 hover:text-red-600 flex items-center justify-center text-zinc-600 transition-colors shadow-2xs cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="w-5.5 h-5.5 rounded-full border border-zinc-300 bg-white/90 hover:bg-white hover:border-red-300 hover:text-red-600 flex items-center justify-center text-zinc-600 transition-colors shadow-2xs cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TABLET ONLY (md to lg-1): Side-by-Side Dual Card Row */}
        <div className="hidden md:flex lg:hidden flex-row justify-center items-center z-25 gap-4 w-full max-w-[620px] mx-auto mt-2">
          {/* Applications Card */}
          <div className="hero-app-card rounded-2xl bg-white/92 border border-zinc-200/90 p-3 shadow-xs w-[290px] text-left relative z-25">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-100">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-black text-zinc-900 uppercase tracking-wider">Powering Tomorrow</span>
              </div>
              <span className="text-[8.5px] font-bold text-zinc-400 uppercase">Applications</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="flex flex-col items-center p-1.5 rounded-lg bg-zinc-50">
                <div className="w-7 h-7 rounded-md bg-white shadow-2xs flex items-center justify-center text-zinc-700 mb-0.5">
                  <HomeAppIcon />
                </div>
                <span className="text-[9.5px] font-bold text-zinc-900 uppercase block">Home</span>
                <span className="text-[7.5px] text-zinc-500 font-medium block">Residential</span>
              </div>
              <div className="flex flex-col items-center p-1.5 rounded-lg bg-zinc-50">
                <div className="w-7 h-7 rounded-md bg-white shadow-2xs flex items-center justify-center text-zinc-700 mb-0.5">
                  <BusinessAppIcon />
                </div>
                <span className="text-[9.5px] font-bold text-zinc-900 uppercase block">Business</span>
                <span className="text-[7.5px] text-zinc-500 font-medium block">Commercial</span>
              </div>
              <div className="flex flex-col items-center p-1.5 rounded-lg bg-zinc-50">
                <div className="w-7 h-7 rounded-md bg-white shadow-2xs flex items-center justify-center text-zinc-700 mb-0.5">
                  <SolarSystemAppIcon />
                </div>
                <span className="text-[9.5px] font-bold text-zinc-900 uppercase block">Solar</span>
                <span className="text-[7.5px] text-zinc-500 font-medium block">Renewable</span>
              </div>
            </div>
            <p className="text-[8.5px] text-zinc-500 mt-1.5 text-center font-medium">For home. For business. For the future.</p>
          </div>

          {/* E-Rickshaw Card */}
          <div className="hero-rickshaw-card rounded-2xl bg-[#E9EBEF] border border-zinc-200/80 p-3 shadow-xs w-[290px] text-left relative z-25">
            <div className="relative w-full h-24 mb-1 flex items-center justify-center">
              <div className="absolute top-0 right-0 z-10">
                <span className="px-2 py-0.5 rounded-full text-[7.5px] font-bold font-mono tracking-wider bg-red-600/10 text-red-600 border border-red-500/20">
                  EV GRADE
                </span>
              </div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/erickshaw_red_theme.png"
                  alt="LievLyfe Powered Electric Rickshaw"
                  width={340}
                  height={220}
                  className="w-auto h-full max-h-[85px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                />
              </div>
            </div>
            <div className="flex items-end justify-between pt-0.5">
              <div>
                <h4 className="text-[10.5px] font-bold text-zinc-900 tracking-tight">51.2V E-Rickshaw Battery</h4>
                <p className="text-[8.5px] text-zinc-500 font-medium mt-0.5">105Ah • 5.376 kWh • EV Grade</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MOBILE ONLY (< md): Modern Interactive Segmented Showcase Card */}
        <div className="flex md:hidden flex-col items-center z-25 w-full max-w-full mx-auto">
          <div className="hero-rickshaw-card relative w-full rounded-2xl bg-white/95 border border-zinc-200/90 p-3 shadow-xs overflow-hidden">
            {/* Header: Segmented Switcher & Cycle Arrows */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100">
              {/* Tab Pills */}
              <div className="flex items-center p-0.5 rounded-full bg-zinc-100 border border-zinc-200/80">
                <button
                  type="button"
                  onClick={() => setMobileCardIndex("rickshaw")}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    mobileCardIndex === "rickshaw"
                      ? "bg-zinc-950 text-white shadow-2xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  EV Mobility
                </button>
                <button
                  type="button"
                  onClick={() => setMobileCardIndex("applications")}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    mobileCardIndex === "applications"
                      ? "bg-zinc-950 text-white shadow-2xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Applications
                </button>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMobileCardIndex(mobileCardIndex === "rickshaw" ? "applications" : "rickshaw")}
                  aria-label="Previous"
                  className="w-6 h-6 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-white text-zinc-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileCardIndex(mobileCardIndex === "rickshaw" ? "applications" : "rickshaw")}
                  aria-label="Next"
                  className="w-6 h-6 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-white text-zinc-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* View 1: EV Rickshaw Battery Showcase */}
            {mobileCardIndex === "rickshaw" && (
              <div className="flex items-center gap-3">
                <div className="relative w-28 h-20 bg-[#E9EBEF] rounded-xl flex items-center justify-center shrink-0 border border-zinc-200/80">
                  <div className="absolute top-1 right-1 z-10">
                    <span className="px-1.5 py-0.2 rounded-full text-[6.5px] font-bold font-mono bg-red-600/10 text-red-600 border border-red-500/20">
                      EV GRADE
                    </span>
                  </div>
                  <Image
                    src="/assets/erickshaw_red_theme.png"
                    alt="LievLyfe Powered Electric Rickshaw"
                    width={220}
                    height={140}
                    className="w-auto h-full max-h-[64px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-zinc-950 tracking-tight leading-snug">
                    51.2V E-Rickshaw Battery
                  </h4>
                  <p className="text-[10px] font-semibold text-red-600 mt-0.5">
                    105Ah • 5.376 kWh • EV Grade
                  </p>
                  <p className="text-[9px] text-zinc-500 mt-1 line-clamp-2">
                    Heavy-duty traction lithium power for commercial passenger & freight mobility.
                  </p>
                </div>
              </div>
            )}

            {/* View 2: Powering Tomorrow Applications Showcase */}
            {mobileCardIndex === "applications" && (
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-zinc-50 border border-zinc-100">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-zinc-700 mb-1">
                    <HomeAppIcon />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-900 uppercase block">Home</span>
                  <span className="text-[8px] text-zinc-500 font-medium block">Residential</span>
                </div>
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-zinc-50 border border-zinc-100">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-zinc-700 mb-1">
                    <BusinessAppIcon />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-900 uppercase block">Business</span>
                  <span className="text-[8px] text-zinc-500 font-medium block">Commercial</span>
                </div>
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-zinc-50 border border-zinc-100">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-zinc-700 mb-1">
                    <SolarSystemAppIcon />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-900 uppercase block">Solar</span>
                  <span className="text-[8px] text-zinc-500 font-medium block">Renewable</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* BOTTOM FOOTER RIBBON: Detailed Specs with Vector Icons     */}
      {/* Responsive layout across mobile, tablet, and desktop       */}
      {/* ========================================================== */}
      <footer className="hero-bottom-ribbon relative z-20 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 pt-2 sm:pt-3 pb-0.5 sm:pb-0 border-t border-zinc-200/90 text-[10px] sm:text-[11px] lg:text-xs font-medium text-zinc-700 w-full">
        
        {/* Core Specs with Dedicated Icons */}
        <div className="flex flex-nowrap items-center justify-center gap-1.5 min-[390px]:gap-2 sm:gap-3.5 lg:gap-3 xl:gap-5 shrink-0">
          
          {/* Spec 1: Voltage */}
          <div className="hero-spec-pill flex items-center gap-1 sm:gap-1.5">
            <VoltageIcon />
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="font-black text-zinc-950 text-[11px] sm:text-xs lg:text-[13px]">12.8V</span>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-zinc-500 uppercase">VOLTAGE</span>
            </div>
          </div>

          <span className="text-zinc-300">|</span>

          {/* Spec 2: Capacity */}
          <div className="hero-spec-pill flex items-center gap-1 sm:gap-1.5">
            <CellBatteryIcon />
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="font-black text-zinc-950 text-[11px] sm:text-xs lg:text-[13px]">200Ah</span>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-zinc-500 uppercase">CAPACITY</span>
            </div>
          </div>

          <span className="text-zinc-300">|</span>

          {/* Spec 3: Energy */}
          <div className="hero-spec-pill flex items-center gap-1 sm:gap-1.5">
            <CellBatteryIcon />
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="font-black text-zinc-950 text-[11px] sm:text-xs lg:text-[13px]">2,560Wh</span>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-zinc-500 uppercase">ENERGY</span>
            </div>
          </div>

        </div>

        {/* Quality Badges */}
        <div className="hero-spec-pill flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-zinc-600 text-[8.5px] sm:text-[9.5px] lg:text-[10.5px] font-semibold shrink-0">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3 h-3 text-red-600">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            36 Months Official Warranty
          </span>
          <span className="text-zinc-300 hidden md:inline">•</span>
          <span className="hidden md:inline text-zinc-500">
            Engineered in India • Grade A LiFePO4
          </span>
        </div>

      </footer>
    </div>
  );
}
