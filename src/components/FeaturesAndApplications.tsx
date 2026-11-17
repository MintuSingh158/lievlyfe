"use client";

import React from "react";

// ============================================================================
// HIGH-FIDELITY VECTOR ICONS MATCHING USER'S BRAND SPECIFICATION
// ============================================================================

// 1. Red Hexagon Badge Frame with Neon Glow
function HexagonBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-12 h-14 sm:w-14 sm:h-16 lg:w-16 lg:h-[72px] flex items-center justify-center shrink-0">
      <svg
        viewBox="0 0 60 68"
        className="absolute inset-0 w-full h-full text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.55)]"
      >
        {/* Outer Hexagon */}
        <polygon
          points="30,2 58,18 58,50 30,66 2,50 2,18"
          fill="#0B0B0E"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        {/* Inner Accent Inset */}
        <polygon
          points="30,6 54,20 54,48 30,62 6,48 6,20"
          fill="none"
          stroke="rgba(239,68,68,0.25)"
          strokeWidth="1"
        />
      </svg>
      <div className="relative z-10 text-white flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// 2. Battery with Bolt (DEEP CYCLE)
function DeepCycleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <line x1="6" y1="4" x2="6" y2="7" strokeWidth="2.5" />
      <line x1="18" y1="4" x2="18" y2="7" strokeWidth="2.5" />
      <path d="M13 10.5L9.5 14.5h4L11 18" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// 3. Lightning Bolt (BMS PROTECTION)
function BmsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
      <path d="M13.5 1.5L4 13.5h6.5l-2 9 11.5-12.5h-6.5l2-8.5z" />
    </svg>
  );
}

// 4. Shield with Lightning Bolt (HIGH EFFICIENCY)
function HighEfficiencyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M13 7.5L9.5 11.5h3.5L11 15.5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// 5. Shield with Checkmark (SMART & SAFE TECHNOLOGY)
function SmartSafeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2.2 2.2 4.5-4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 6. Home Icon (Clean minimal outline)
function HomeAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-zinc-200 group-hover:text-red-400 group-hover:scale-110 transition-all">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M10 21v-6h4v6" />
      <path d="M18 6.5V4h-2" />
    </svg>
  );
}

// 7. Business / Buildings Icon
function BusinessAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-zinc-200 group-hover:text-red-400 group-hover:scale-110 transition-all">
      {/* Tall tower */}
      <rect x="4" y="3" width="9" height="18" rx="0.5" />
      {/* Short tower */}
      <rect x="13" y="8" width="7" height="13" rx="0.5" />
      {/* Tower windows */}
      <line x1="7" y1="6" x2="7.01" y2="6" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="6" x2="10.01" y2="6" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="9" x2="7.01" y2="9" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="9" x2="10.01" y2="9" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="12" x2="7.01" y2="12" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="12" x2="10.01" y2="12" strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="15" x2="7.01" y2="15" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="15" x2="10.01" y2="15" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="11" x2="16.01" y2="11" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="14" x2="16.01" y2="14" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="17" x2="16.01" y2="17" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 8. Solar System Panel with Sun Icon
function SolarSystemAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-zinc-200 group-hover:text-red-400 group-hover:scale-110 transition-all">
      {/* Sun rays above */}
      <path d="M12 2v2" />
      <path d="M6 4.5l1.5 1.5" />
      <path d="M18 4.5l-1.5 1.5" />
      <path d="M8 7.5a4 4 0 0 1 8 0" />
      {/* Tilted Solar panel */}
      <polygon points="3,17 6,9 18,9 21,17" />
      {/* Solar panel grid lines */}
      <line x1="12" y1="9" x2="12" y2="17" />
      <line x1="4.5" y1="13" x2="19.5" y2="13" />
      {/* Support stands */}
      <line x1="9" y1="17" x2="7" y2="21" />
      <line x1="15" y1="17" x2="17" y2="21" />
      <line x1="6" y1="21" x2="18" y2="21" />
    </svg>
  );
}

// 9. Voltage Badge: Red circular arrow with lightning bolt
function VoltageCircularIcon() {
  return (
    <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 36 36" className="w-full h-full text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]" fill="none">
        <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="2" strokeDasharray="80 20" />
        {/* Arrow tip on circle */}
        <polygon points="18,3 22,0 22,6" fill="currentColor" />
        {/* Center Lightning bolt */}
        <path d="M19 9L13 18h4l-2 8 8-10h-4l2-7z" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

// 10. Vertical Battery Cell with Red Lightning Bolt (for Capacity & Energy)
function CellWithBoltIcon() {
  return (
    <div className="relative w-7 h-10 sm:w-8 sm:h-11 rounded-md border-2 border-red-500 flex items-center justify-center shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.65)] bg-red-950/30">
      {/* Terminal post */}
      <div className="absolute -top-1.5 w-3 h-1 bg-red-500 rounded-t-sm" />
      {/* Centered lightning bolt */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-500">
        <path d="M13 2L6 13h4l-2 9 10-12h-4l2-8z" />
      </svg>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: Powering a Better Tomorrow (Features, Applications, Specs)
// ============================================================================
export default function FeaturesAndApplications() {
  return (
    <section id="features" className="w-full bg-[#09090C] text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 xl:px-20 border-t border-zinc-900 relative overflow-hidden scroll-mt-4 select-none">
      {/* Cinematic Top Red Spotlights */}
      <div className="absolute -top-12 left-10 w-96 h-48 bg-red-600/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -top-12 right-10 w-96 h-48 bg-red-600/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-64 bg-red-700/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1360px] mx-auto flex flex-col gap-10 sm:gap-14 relative z-10">
        
        {/* ================================================================ */}
        {/* ROW 1: FOUR HEXAGONAL FEATURE BADGES                             */}
        {/* ================================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center justify-between">
          
          {/* Badge 1: DEEP CYCLE */}
          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 group">
            <HexagonBadge>
              <DeepCycleIcon />
            </HexagonBadge>
            <div className="leading-tight">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-wider text-white uppercase block">
                DEEP
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-bold tracking-wider text-zinc-300 uppercase block">
                CYCLE
              </span>
            </div>
          </div>

          {/* Badge 2: BMS PROTECTION */}
          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 group">
            <HexagonBadge>
              <BmsIcon />
            </HexagonBadge>
            <div className="leading-tight">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-wider text-white uppercase block">
                BMS
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-bold tracking-wider text-zinc-300 uppercase block">
                PROTECTION
              </span>
            </div>
          </div>

          {/* Badge 3: HIGH EFFICIENCY */}
          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 group">
            <HexagonBadge>
              <HighEfficiencyIcon />
            </HexagonBadge>
            <div className="leading-tight">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-wider text-white uppercase block">
                HIGH
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-bold tracking-wider text-zinc-300 uppercase block">
                EFFICIENCY
              </span>
            </div>
          </div>

          {/* Badge 4: SMART & SAFE TECHNOLOGY */}
          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 group">
            <HexagonBadge>
              <SmartSafeIcon />
            </HexagonBadge>
            <div className="leading-tight">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-wider text-white uppercase block">
                SMART & SAFE
              </span>
              <span className="text-[11px] sm:text-xs lg:text-sm font-bold tracking-wider text-zinc-300 uppercase block">
                TECHNOLOGY
              </span>
            </div>
          </div>

        </div>

        {/* ================================================================ */}
        {/* ROW 2: "POWERING A BETTER TOMORROW" & THREE APPLICATION ICONS     */}
        {/* ================================================================ */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#111116] to-[#0A0A0E] border border-red-600/60 p-6 sm:p-8 lg:p-10 shadow-[0_0_35px_rgba(220,38,38,0.18)]">
          
          {/* Subtle Chamfered Accent Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500 rounded-br-sm pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs sm:text-sm lg:text-base font-bold tracking-widest text-zinc-300 uppercase block">
                POWERING A
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-red-600 my-1 drop-shadow-[0_0_20px_rgba(220,38,38,0.45)]">
                BETTER TOMORROW
              </h2>
              <p className="text-xs sm:text-sm font-bold tracking-wider text-zinc-300 uppercase mt-1">
                FOR HOME. FOR BUSINESS. FOR THE FUTURE.
              </p>
            </div>

            {/* Middle Diagonal Divider (visible on desktop) */}
            <div className="hidden lg:flex lg:col-span-1 justify-center items-center">
              <div className="w-[1.5px] h-24 bg-gradient-to-b from-transparent via-red-600/70 to-transparent transform rotate-12" />
            </div>

            {/* Right: Three Application Cards with Vertical Red Dividers */}
            <div className="lg:col-span-5 flex items-center justify-between sm:justify-around lg:justify-end lg:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800/80">
              
              {/* Home */}
              <div className="flex-1 flex flex-col items-center justify-center text-center group cursor-pointer transition-transform hover:-translate-y-1">
                <div className="mb-2">
                  <HomeAppIcon />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                  HOME
                </span>
              </div>

              {/* Red Divider */}
              <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-red-600/70 to-transparent shrink-0 mx-2 sm:mx-4" />

              {/* Business */}
              <div className="flex-1 flex flex-col items-center justify-center text-center group cursor-pointer transition-transform hover:-translate-y-1">
                <div className="mb-2">
                  <BusinessAppIcon />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                  BUSINESS
                </span>
              </div>

              {/* Red Divider */}
              <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-red-600/70 to-transparent shrink-0 mx-2 sm:mx-4" />

              {/* Solar System */}
              <div className="flex-1 flex flex-col items-center justify-center text-center group cursor-pointer transition-transform hover:-translate-y-1">
                <div className="mb-2">
                  <SolarSystemAppIcon />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                  SOLAR SYSTEM
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* ================================================================ */}
        {/* ROW 3: THREE CORE SPECIFICATION BADGES (12.8V, 200Ah, 2560Wh)    */}
        {/* ================================================================ */}
        <div className="relative rounded-2xl bg-[#0C0C10] border border-red-600/60 p-4 sm:p-6 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
          
          {/* Subtle Chamfered Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500 rounded-br-sm pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            
            {/* Spec 1: Voltage */}
            <div className="flex items-center justify-center gap-3.5 py-2">
              <VoltageCircularIcon />
              <div className="leading-tight">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block">
                  12.8V
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-red-500 uppercase block">
                  VOLTAGE
                </span>
              </div>
            </div>

            {/* Spec 2: Capacity */}
            <div className="flex items-center justify-center gap-3.5 py-2 border-t sm:border-t-0 sm:border-l sm:border-r border-red-900/50">
              <CellWithBoltIcon />
              <div className="leading-tight">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block">
                  200Ah
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-red-500 uppercase block">
                  CAPACITY
                </span>
              </div>
            </div>

            {/* Spec 3: Energy */}
            <div className="flex items-center justify-center gap-3.5 py-2 border-t sm:border-t-0 border-red-900/50">
              <CellWithBoltIcon />
              <div className="leading-tight">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block">
                  2560Wh
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-red-500 uppercase block">
                  ENERGY
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
