"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  autoActivateAudio,
  playWaterFillSound,
  playBoltLockSound,
  playLaserTraceSound,
  playMetallicFillSound,
  playCurtainWhooshSound,
  stopAllSounds,
} from "@/utils/soundEffects";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const emblemBoxRef = useRef<HTMLDivElement>(null);
  const liquidRiseRef = useRef<SVGGElement>(null);
  const solidBoltRef = useRef<SVGPathElement>(null);
  const boltFacetsRef = useRef<SVGGElement>(null);
  const wingOutlineRef = useRef<SVGPathElement>(null);
  const wingSolidFillRef = useRef<SVGPathElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const [isDone, setIsDone] = useState(false);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Prevent scrolling while loader curtain is active
    document.body.style.overflow = "hidden";

    // 1. Auto-play: initialize and pre-warm audio immediately on mount
    autoActivateAudio();

    // Unlock listener: ensures audio stream is unblocked if browser demanded gesture
    const unlockAudio = () => {
      autoActivateAudio();
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    // Track real website load readiness
    let isSiteLoaded = typeof document !== "undefined" && document.readyState !== "loading";
    if (!isSiteLoaded && typeof window !== "undefined") {
      const markLoaded = () => {
        isSiteLoaded = true;
      };
      window.addEventListener("DOMContentLoaded", markLoaded, { once: true });
      window.addEventListener("load", markLoaded, { once: true });
      if (document.fonts) {
        document.fonts.ready.then(() => {
          isSiteLoaded = true;
        });
      }
    }

    // Fallback safety: ensures curtain opens even on slow networks after 7 seconds
    const fallbackTimer = setTimeout(() => {
      isSiteLoaded = true;
    }, 7000);

    const gsapCtx = gsap.context(() => {
      const mainTl = gsap.timeline();

      // ======================================================================
      // ACTION 1: Red liquid wave fill sound & animation inside Left Bolt
      // Starts automatically at t=0, in 100% lockstep with the 1.6s water rise
      // ======================================================================
      mainTl.call(() => {
        playWaterFillSound(1.6);
      }, [], 0);

      mainTl.to(liquidRiseRef.current, {
        attr: { transform: "translate(0, 10)" },
        duration: 1.6,
        ease: "power2.out",
      });

      // ======================================================================
      // ACTION 2: Bolt reaches 100% capacity -> Tactile power lock sound & solidify
      // Triggers at t=1.6s EXACTLY as the liquid completes its fill
      // ======================================================================
      mainTl.call(() => {
        playBoltLockSound();
      });

      mainTl
        .to(solidBoltRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          boltFacetsRef.current,
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          ambientGlowRef.current,
          {
            opacity: 1,
            scale: 1.25,
            duration: 0.25,
            ease: "power2.out",
          },
          "<"
        );

      // Brief breathing gap (0.12s) before second part begins
      mainTl.to({}, { duration: 0.12 });

      // ======================================================================
      // ACTION 3 & 4: Second Part (Right Wing) Laser Trace & Metallic Fill
      // - Action 3: Laser trace sound starts in exact sync with outline draw
      // - Action 4: Metallic chime starts in exact sync when outline completes and fill blooms
      // - Loops synchronously if site is slow
      // ======================================================================
      function animateSecondPart() {
        const wingTl = gsap.timeline();

        // 1. Reset outline stroke to initial offset (370)
        wingTl
          .set(wingOutlineRef.current, { opacity: 1, strokeDashoffset: 370 })
          .set(wingSolidFillRef.current, { opacity: 0 })

          // 2. Action 3: Laser outline trace sound and stroke draw (0.75s)
          .call(() => {
            playLaserTraceSound(0.75);
          })
          .to(wingOutlineRef.current, {
            strokeDashoffset: 0,
            duration: 0.75,
            ease: "power2.inOut",
          })

          // 3. Action 4: Outline has completed! Trigger metallic chime & bloom metallic fill
          .call(() => {
            playMetallicFillSound();
          })
          .to(wingSolidFillRef.current, {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          })
          .to(
            ambientGlowRef.current,
            {
              scale: 1.35,
              opacity: 0.9,
              duration: 0.35,
              ease: "power2.out",
            },
            "<"
          )

          // 4. Evaluate site load state upon completing full animation cycle
          .call(() => {
            if (isSiteLoaded) {
              // Website is ready: Hold 0.15s to admire the emblem, then uplift the curtain!
              gsap.delayedCall(0.15, upliftCurtain);
            } else {
              // Website is slow: Fade out second part and loop again!
              gsap.timeline().to([wingSolidFillRef.current, wingOutlineRef.current], {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                  animateSecondPart(); // Loop until site loads
                },
              });
            }
          });
      }

      // Start the second part sequence once left bolt has locked
      mainTl.call(() => {
        animateSecondPart();
      });

      // ======================================================================
      // ACTION 5: Theatrical Curtain Uplift Whoosh Sound & Lift
      // Plays air whoosh sound at the EXACT frame the curtain glides upward
      // ======================================================================
      function upliftCurtain() {
        playCurtainWhooshSound(1.15);

        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.15,
          ease: "expo.inOut",
          // Zero delay: movement starts simultaneously with the whoosh sound!
          onComplete: () => {
            stopAllSounds();
            document.body.style.overflow = "";
            setIsDone(true);
            onCompleteRef.current?.();
          },
        });
      }
    });

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      stopAllSounds();
      document.body.style.overflow = "";
      gsapCtx.revert();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#000000] flex items-center justify-center select-none overflow-hidden will-change-transform shadow-[0_30px_70px_rgba(0,0,0,0.85)]"
      style={{ touchAction: "none" }}
    >
      <style jsx>{`
        @keyframes waveDriftFront {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-160px);
          }
        }
        @keyframes waveDriftBack {
          0% {
            transform: translateX(-80px);
          }
          100% {
            transform: translateX(80px);
          }
        }
        .wave-layer-front {
          animation: waveDriftFront 1.8s linear infinite;
        }
        .wave-layer-back {
          animation: waveDriftBack 2.6s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Center Emblem Container — Pure, Perfectly Centered */}
      <div
        ref={emblemBoxRef}
        className="relative w-[280px] sm:w-[340px] md:w-[400px] h-[130px] sm:h-[150px] md:h-[170px] flex items-center justify-center pointer-events-none"
      >
        {/* Soft Ambient Glow */}
        <div
          ref={ambientGlowRef}
          className="absolute w-[280px] sm:w-[340px] h-[120px] sm:h-[140px] rounded-full pointer-events-none opacity-40 transition-all duration-500"
          style={{
            background:
              "radial-gradient(ellipse at 40% 50%, rgba(239, 68, 68, 0.38) 0%, rgba(220, 38, 38, 0.12) 45%, transparent 75%)",
            filter: "blur(36px)",
          }}
        />

        <svg
          viewBox="0 0 240 110"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Front Wave Red Gradient */}
            <linearGradient id="waveGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF3A44" />
              <stop offset="35%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            {/* Back Wave Deep Red Gradient */}
            <linearGradient id="waveGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            {/* Authentic Red Bolt Gradient (Matches LOGO.svg paint0_linear_4_24) */}
            <linearGradient
              id="solidBoltGrad"
              x1="115.75"
              y1="16.16"
              x2="115.75"
              y2="94.66"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ED0000" />
              <stop offset="1" stopColor="#870000" />
            </linearGradient>

            {/* Premium Metallic Titanium Wing Gradient */}
            <linearGradient
              id="metallicWingGrad"
              x1="84"
              y1="30"
              x2="232"
              y2="80"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F1F5F9" />
              <stop offset="65%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Left Bolt Clip Path */}
            <clipPath id="leftBoltClip">
              <path d="M83.8739 23.1626L81 24.8929L57 40.6626L59 38.139L0 73.6626L44.5 69.1626L32 94.6626L91 58.1626H64L95.5 16.1626L91 18.872L90.5 19.6626L83.8739 23.1626Z" />
            </clipPath>
          </defs>

          {/* ============================================================== */}
          {/* 1. LEFT ICON PART (RED LIGHTNING BOLT)                         */}
          {/* ============================================================== */}
          {/* Vessel Silhouette / Initial boundary */}
          <path
            d="M83.8739 23.1626L81 24.8929L57 40.6626L59 38.139L0 73.6626L44.5 69.1626L32 94.6626L91 58.1626H64L95.5 16.1626L91 18.872L90.5 19.6626L83.8739 23.1626Z"
            fill="rgba(239, 68, 68, 0.04)"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1.2"
          />

          {/* Water Wave Fill (Clipped inside Left Bolt) */}
          <g clipPath="url(#leftBoltClip)">
            {/* Rising Water Level Group */}
            <g ref={liquidRiseRef} transform="translate(0, 108)">
              {/* Back Wave Layer */}
              <g className="wave-layer-back" opacity="0.6">
                <path
                  d="M -160 0 C -120 -9, -80 9, -40 0 C 0 -9, 40 9, 80 0 C 120 -9, 160 9, 200 0 C 240 -9, 280 9, 320 0 L 320 120 L -160 120 Z"
                  fill="url(#waveGradBack)"
                />
              </g>

              {/* Front Wave Layer */}
              <g className="wave-layer-front" opacity="0.95">
                <path
                  d="M -160 0 C -120 8, -80 -8, -40 0 C 0 8, 40 -8, 80 0 C 120 8, 160 -8, 200 0 C 240 8, 280 -8, 320 0 L 320 120 L -160 120 Z"
                  fill="url(#waveGradFront)"
                />
              </g>

              {/* Liquid Surface Foam / Specular Highlight Crest */}
              <g className="wave-layer-front" opacity="0.9">
                <path
                  d="M -160 0 C -120 8, -80 -8, -40 0 C 0 8, 40 -8, 80 0 C 120 8, 160 -8, 200 0 C 240 8, 280 -8, 320 0"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  fill="none"
                />
              </g>
            </g>

            {/* Solid Finished Bolt Overlay (Fades in seamlessly once full) */}
            <path
              ref={solidBoltRef}
              d="M83.8739 23.1626L81 24.8929L57 40.6626L59 38.139L0 73.6626L44.5 69.1626L32 94.6626L91 58.1626H64L95.5 16.1626L91 18.872L90.5 19.6626L83.8739 23.1626Z"
              fill="url(#solidBoltGrad)"
              opacity="0"
            />

            {/* Authentic Bevel Highlight Facets from Logo */}
            <g ref={boltFacetsRef} opacity="0">
              <path
                d="M59 38.139L57 40.6626L81 24.8929L59 38.139Z"
                fill="#F8F8F8"
                fillOpacity="0.63"
              />
              <path
                d="M91 18.872L83.8739 23.1626L90.5 19.6626L91 18.872Z"
                fill="#F8F8F8"
                fillOpacity="0.63"
              />
              <path
                d="M3.5 71.6626L0 73.6626L44.5 69.1626L32 94.6626L46.5 68.1626L3.5 71.6626Z"
                fill="#000000"
                fillOpacity="0.45"
              />
              <path
                d="M91 58.1626L32 94.6626L32.5 93.1626L88 58.1626H91Z"
                fill="#000000"
                fillOpacity="0.45"
              />
            </g>
          </g>

          {/* ============================================================== */}
          {/* 2. SECOND ICON PART (RIGHT SWOOP WING)                         */}
          {/* ============================================================== */}
          {/* Wing Outline (Draws First with Laser Energy Stroke) */}
          <path
            ref={wingOutlineRef}
            d="M112.5 54.6626C112.5 54.6626 95.5 69.6626 86 80.6626C138.041 50.6345 191 39.6626 231.5 48.1626C192 30.1626 130.5 37.6626 84 51.1626C93.5 51.1626 100.715 51.8337 112.5 54.6626Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="370"
            strokeDashoffset="370"
            opacity="0"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.85))",
            }}
          />

          {/* Wing Solid Fill (Normally Fills After Outline Draw) */}
          <path
            ref={wingSolidFillRef}
            d="M112.5 54.6626C112.5 54.6626 95.5 69.6626 86 80.6626C138.041 50.6345 191 39.6626 231.5 48.1626C192 30.1626 130.5 37.6626 84 51.1626C93.5 51.1626 100.715 51.8337 112.5 54.6626Z"
            fill="url(#metallicWingGrad)"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            opacity="0"
          />
        </svg>
      </div>
    </div>
  );
}
