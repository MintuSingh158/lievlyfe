"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import LightHeroDesign from "./LightHeroDesign";
import TechnologySection from "./TechnologySection";
import ManufacturerBanner from "./ManufacturerBanner";
import ProductsSection from "./ProductsSection";
import GallerySection from "./GallerySection";
import FaqSection, { type FaqContactPrefill } from "./FaqSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractiveScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopAnchorRef = useRef<HTMLDivElement>(null);
  const mobileAnchorRef = useRef<HTMLDivElement>(null);
  const dockTargetRef = useRef<HTMLDivElement>(null);
  const batteryEntranceRef = useRef<HTMLDivElement>(null);
  const batteryMotionRef = useRef<HTMLDivElement>(null);

  // Discrete state gates (only trigger React re-renders when booleans change)
  const [isLoading, setIsLoading] = useState(true);
  const [isEntranceDone, setIsEntranceDone] = useState(false);
  const [isStationaryHero, setIsStationaryHero] = useState(true);
  const [isBatteryCentered, setIsBatteryCentered] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<
    (FaqContactPrefill & { timestamp: number }) | null
  >(null);

  // High-performance refs for motion variables (bypasses React VDOM on 60/120fps scroll)
  const heroCenterOffsetRef = useRef<number>(-100);
  const dockTargetOffsetRef = useRef<number>(70);
  const dockScrollYRef = useRef<number>(900);
  const horizontalOffsetRef = useRef<number>(0);
  const isStationaryHeroRef = useRef<boolean>(true);
  const isBatteryCenteredRef = useRef<boolean>(false);

  // Section transition refs
  const isTransitioningRef = useRef<boolean>(false);

  // ==========================================================================
  // DIRECT DOM HARDWARE-ACCELERATED TRANSFORM UPDATE (60/120 FPS FLUIDITY)
  // Bypasses React Virtual DOM reconciliation on every scroll frame!
  // ==========================================================================
  const updateBatteryPosition = useCallback((scroll: number) => {
    if (!batteryMotionRef.current) return;

    const dockScroll = dockScrollYRef.current || 900;
    const heroOffset = heroCenterOffsetRef.current;
    const dockOffset = dockTargetOffsetRef.current;
    const horizOffset = horizontalOffsetRef.current;

    const progress = Math.min(1, Math.max(0, scroll / dockScroll));
    // Smooth cubic ease-in-out for fluid kinetic sensation
    const easeProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    let currentOffsetY = 0;
    if (scroll <= 0) {
      // Top bounce / rubber banding
      currentOffsetY = heroOffset - scroll;
    } else if (scroll <= dockScroll) {
      // Interpolate smoothly from Hero pedestal position to Section 2 docking position
      currentOffsetY = heroOffset + (dockOffset - heroOffset) * easeProgress;
    } else {
      // Scrolled past Section 2: locks with Section 2 so it scrolls up naturally
      currentOffsetY = dockOffset - (scroll - dockScroll);
    }

    // Dynamic viewport-aware scale expansion
    const isDesk = typeof window !== "undefined" && window.innerWidth >= 1024;
    const maxScaleDelta = isDesk
      ? typeof window !== "undefined" && window.innerWidth < 1280
        ? 0.06
        : 0.12
      : 0.05;
    const currentScale = 1.0 + maxScaleDelta * easeProgress;

    batteryMotionRef.current.style.transform = `translate3d(${horizOffset}px, ${currentOffsetY}px, 0) scale(${currentScale})`;
  }, []);

  // Measure positions dynamically
  const measurePositions = useCallback(() => {
    if (typeof window === "undefined") return;

    const isDesk = window.innerWidth >= 1024;
    const activeHeroAnchor = isDesk ? desktopAnchorRef.current : mobileAnchorRef.current;
    const dockTarget = dockTargetRef.current;
    const sec2 = document.getElementById("technology");

    const currentScroll = window.scrollY;
    const viewportHalfH = window.innerHeight / 2;
    const viewportHalfW = window.innerWidth / 2;

    // 1. Hero Anchor measurement
    if (activeHeroAnchor) {
      const heroRect = activeHeroAnchor.getBoundingClientRect();
      const heroAbsY = heroRect.top + currentScroll + heroRect.height / 2;
      const initialHeroOffset = heroAbsY - viewportHalfH;
      heroCenterOffsetRef.current = initialHeroOffset;

      const heroAbsX = heroRect.left + heroRect.width / 2;
      horizontalOffsetRef.current = heroAbsX - viewportHalfW;
    } else {
      heroCenterOffsetRef.current = isDesk ? -100 : 70;
      horizontalOffsetRef.current = 0;
    }

    // 2. Section 2 Target measurement
    if (dockTarget && sec2) {
      const sec2Rect = sec2.getBoundingClientRect();
      const sec2AbsTop = sec2Rect.top + currentScroll;
      const dockRect = dockTarget.getBoundingClientRect();
      const dockAbsY = dockRect.top + currentScroll + dockRect.height / 2;

      // targetScroll is when Section 2 aligns in viewport
      const targetScroll = Math.max(100, sec2AbsTop);
      dockScrollYRef.current = targetScroll;

      // Offset from viewport center when Section 2 is at targetScroll
      const dockCenterInSec2 = dockAbsY - sec2AbsTop;
      const targetOffset = dockCenterInSec2 - viewportHalfH;
      dockTargetOffsetRef.current = targetOffset;
    } else {
      dockScrollYRef.current = window.innerHeight;
      dockTargetOffsetRef.current = 70;
    }

    // Update battery transform immediately with measured coordinates
    updateBatteryPosition(window.scrollY);
  }, [updateBatteryPosition]);

  // Cinematic initial entrance reveal: Battery enters with a gentle drop from slightly above
  // ("little bit from top with opacity") down to meet the rising pedestal pillar in its exact resting place
  useEffect(() => {
    if (!batteryEntranceRef.current) return;

    // Measure initial layout before entrance animation begins
    measurePositions();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        batteryEntranceRef.current,
        {
          opacity: 0,
          scale: 0.96,
          y: -65, // Graceful subtle drop from slightly above
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.25,
          delay: 0.1, // Synchronized with the rising pillar
          ease: "power3.out",
          onComplete: () => {
            setIsEntranceDone(true);
            if (batteryEntranceRef.current) {
              gsap.set(batteryEntranceRef.current, { clearProps: "transform" });
            }
            // Re-verify exact alignment once entrance settles
            measurePositions();
          },
        }
      );
    });

    return () => ctx.revert();
  }, [measurePositions]);

  // Section-to-section navigation: moves to the section and stops cleanly without passing it
  const scrollToSection = useCallback((targetIndex: number) => {
    const lenis = (window as any).__lenis;
    if (!lenis) return;

    const clampedIndex = Math.max(0, Math.min(5, targetIndex));
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    // Determine target scroll position
    let targetY = 0;
    if (clampedIndex === 0) {
      targetY = 0;
    } else if (clampedIndex === 1) {
      const sec2 = document.getElementById("technology");
      targetY = sec2 ? sec2.offsetTop : (dockScrollYRef.current || 900);
    } else if (clampedIndex === 2) {
      const secProducts = document.getElementById("products");
      targetY = secProducts ? Math.min(secProducts.offsetTop, maxScroll) : maxScroll;
    } else if (clampedIndex === 3) {
      const sec3 = document.getElementById("gallery");
      targetY = sec3 ? Math.min(sec3.offsetTop, maxScroll) : maxScroll;
    } else if (clampedIndex === 4) {
      const sec4 = document.getElementById("faq");
      targetY = sec4 ? Math.min(sec4.offsetTop, maxScroll) : maxScroll;
    } else if (clampedIndex === 5) {
      const sec5 = document.getElementById("contact");
      targetY = sec5 ? Math.min(sec5.offsetTop, maxScroll) : maxScroll;
    }

    // If already right at the target (within 4px) and not transitioning, return
    if (Math.abs(window.scrollY - targetY) < 4 && !isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;

    // Reset Section 2 animations immediately if navigating away from Section 1
    if (clampedIndex !== 1) {
      if (isBatteryCenteredRef.current) {
        isBatteryCenteredRef.current = false;
        setIsBatteryCentered(false);
      }
    }

    // Smoothly scroll to the target section and stop cleanly in that section (no passing)
    lenis.start();
    lenis.scrollTo(targetY, {
      duration: 0.95,
      lock: true,
      force: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => {
        isTransitioningRef.current = false;

        // When arrived at Section 1 (center of technology section), mount animations!
        if (clampedIndex === 1) {
          isBatteryCenteredRef.current = true;
          setIsBatteryCentered(true);
        }
      },
    });
  }, []);

  // Universal navigation handler for navbar and CTA buttons
  const navigateTo = useCallback(
    (target: string | number) => {
      let targetIndex = 0;
      if (typeof target === "number") {
        targetIndex = target;
      } else if (target === "#technology") {
        targetIndex = 1;
      } else if (target === "#products") {
        targetIndex = 2;
      } else if (target === "#gallery") {
        targetIndex = 3;
      } else if (target === "#faq") {
        targetIndex = 4;
      } else if (target === "#contact" || target === "#footer") {
        targetIndex = 5;
      } else {
        targetIndex = 0;
      }

      scrollToSection(targetIndex);
    },
    [scrollToSection]
  );

  // Seamless FAQ -> Contact handoff with pre-populated spec & topic
  const handleFaqAsk = useCallback(
    (prefill: FaqContactPrefill) => {
      setContactPrefill({ ...prefill, timestamp: Date.now() });
      navigateTo("#contact");
    },
    [navigateTo]
  );

  useEffect(() => {
    // 1. Initialize Lenis for buttery-smooth kinetic scrolling with natural mobile touch
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0, // Natural 1:1 mobile touch tracking without jitter
    });

    (window as any).__lenis = lenis;

    // 2. Synchronize Lenis scroll directly to DOM transform (0 React re-renders on scroll!)
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      updateBatteryPosition(e.scroll);

      // Discrete threshold toggles (only fire setState when value flips)
      const stationary = e.scroll < 8;
      if (stationary !== isStationaryHeroRef.current) {
        isStationaryHeroRef.current = stationary;
        setIsStationaryHero(stationary);
      }

      const target = dockScrollYRef.current || 900;
      const centered = e.scroll >= target * 0.88;
      if (centered !== isBatteryCenteredRef.current) {
        isBatteryCenteredRef.current = centered;
        setIsBatteryCentered(centered);
      }
    });

    // 3. Drive Lenis with GSAP's ticker for ultra-smooth 60/120fps sync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const animId = window.requestAnimationFrame(() => {
      measurePositions();
    });

    const t1 = setTimeout(() => {
      measurePositions();
      lenis.resize();
    }, 120);
    const t2 = setTimeout(() => {
      measurePositions();
      lenis.resize();
    }, 450);

    const handleResize = () => {
      measurePositions();
      lenis.resize();
    };

    // =======================================================================
    // SCROLL INTERCEPTION: Only snaps when scrolling from first to second section.
    // All other sections use natural, smooth Lenis scrolling.
    // =======================================================================
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const sec2 = document.getElementById("technology");
      const sec2Top = sec2 ? sec2.offsetTop : (dockScrollYRef.current || 900);
      const isAtFirstSection = window.scrollY < sec2Top - 60;

      if (isAtFirstSection && e.deltaY > 16) {
        e.preventDefault();
        scrollToSection(1);
        return;
      }
    };

    // Touch handling for mobile swipe
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioningRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const sec2 = document.getElementById("technology");
      const sec2Top = sec2 ? sec2.offsetTop : (dockScrollYRef.current || 900);
      const isAtFirstSection = window.scrollY < sec2Top - 60;
      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY; // positive = swipe up = scroll down

      // Only snap from first section down to second section
      if (isAtFirstSection && diff > 35) {
        if (e.cancelable) e.preventDefault();
        scrollToSection(1);
        return;
      }
    };

    // Keyboard navigation (arrows, space, page up/down)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningRef.current) {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(e.key)) {
          e.preventDefault();
        }
        return;
      }

      const sec2 = document.getElementById("technology");
      const sec2Top = sec2 ? sec2.offsetTop : (dockScrollYRef.current || 900);
      const isAtFirstSection = window.scrollY < sec2Top - 60;

      if (isAtFirstSection && ["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        scrollToSection(1);
        return;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.cancelAnimationFrame(animId);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, [measurePositions, scrollToSection, updateBatteryPosition]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F7F8FA] overflow-x-hidden">
      {/* ============================================================== */}
      {/* FULLSCREEN LOADING SCREEN (ANIMATED EMBLEM FILL & DRAW)         */}
      {/* ============================================================== */}
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            setIsLoading(false);
            measurePositions();
            ScrollTrigger.refresh();
          }}
        />
      )}
      
      {/* ============================================================== */}
      {/* FLOATING BATTERY: MOVES WITH SCROLL & SETS IN CENTER OF SEC 2  */}
      {/* Hardware-accelerated directly on batteryMotionRef without      */}
      {/* triggering React re-renders on every scroll tick               */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible">
        <div
          ref={batteryMotionRef}
          className="relative flex items-center justify-center will-change-transform transform-gpu pointer-events-none"
        >
          {/* Dedicated Entrance Wrapper: GSAP animates battery from slightly above down to original place */}
          <div
            ref={batteryEntranceRef}
            className={`relative flex items-center justify-center will-change-transform transform-gpu ${
              isEntranceDone ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Inner Floating Battery: Bobbing Animation only activates once entrance is settled */}
            <div
              className={`relative w-[280px] min-[390px]:w-[310px] sm:w-[380px] md:w-[420px] lg:w-[420px] xl:w-[490px] 2xl:w-[550px] aspect-[1024/729] flex items-center justify-center ${
                isStationaryHero && isEntranceDone ? "animate-hero-float" : ""
              }`}
            >
              <Image
                src="/assets/lievlyfe_hero_battery_v5.png"
                alt="LievLyfe LiFePO4 Premium Lithium Battery"
                fill
                sizes="(max-width: 640px) 305px, (max-width: 1024px) 390px, (max-width: 1440px) 520px, 600px"
                priority
                className="object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.22)] select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: HERO SECTION                                        */}
      {/* ============================================================== */}
      <section id="overview" className="relative w-full min-h-screen">
        <LightHeroDesign
          desktopAnchorRef={desktopAnchorRef}
          mobileAnchorRef={mobileAnchorRef}
          hideBatteryImage={true}
          onNavigate={navigateTo}
        />
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: TECHNOLOGY & CELL ARCHITECTURE                      */}
      {/* Battery sets exactly in the center of this section             */}
      {/* ============================================================== */}
      <TechnologySection dockTargetRef={dockTargetRef} isBatteryCentered={isBatteryCentered} />

      {/* ============================================================== */}
      {/* BRAND BANNER: LITHIUM BATTERY MANUFACTURER SHOWCASE            */}
      {/* ============================================================== */}
      <ManufacturerBanner />

      {/* ============================================================== */}
      {/* SECTION 3: OUR PRODUCTS SHOWCASE                               */}
      {/* ============================================================== */}
      <ProductsSection />

      {/* ============================================================== */}
      {/* SECTION 4: DOCUMENTARY PHOTOGRAPHY GALLERY                     */}
      {/* ============================================================== */}
      <GallerySection />

      {/* ============================================================== */}
      {/* SECTION 4: TECHNICAL KNOWLEDGE BASE (FAQ)                      */}
      {/* ============================================================== */}
      <FaqSection onAskQuestion={handleFaqAsk} />

      {/* ============================================================== */}
      {/* SECTION 5: LIGHT EDITORIAL CONTACT FORM                        */}
      {/* ============================================================== */}
      <ContactSection prefill={contactPrefill} />

      {/* ============================================================== */}
      {/* ARCHITECTURAL SITE FOOTER (Links, Support, Specs & Full Logo)  */}
      {/* ============================================================== */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}
