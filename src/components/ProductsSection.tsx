"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { getFeaturedProducts } from "@/data/products";

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);
  const products = getFeaturedProducts();

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const revealElements = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      gsap.fromTo(
        sectionEl.querySelectorAll(".products-reveal"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
    };

    const rect = sectionEl.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      revealElements();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          revealElements();
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      aria-labelledby="products-heading"
      className="relative z-20 w-full bg-white text-[#111113] border-t border-zinc-200/80 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* ============================================================== */}
        {/* HEADER BLOCK: EDITORIAL TITLE & "VIEW ALL PRODUCTS" ACTION     */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 sm:pb-12 border-b border-zinc-200/70">
          <div className="max-w-2xl">
            <div className="products-reveal flex items-center gap-2 text-[10.5px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-red-600 inline-block" />
              <span>Our Products</span>
            </div>

            <h2
              id="products-heading"
              className="products-reveal mt-3 text-[30px] min-[390px]:text-[34px] sm:text-[40px] lg:text-[46px] font-bold tracking-[-0.03em] leading-[1.08] text-[#111113]"
            >
              Engineered for{" "}
              <span className="text-zinc-400 font-semibold">Mobility &amp; Industry.</span>
            </h2>

            <p className="products-reveal mt-3 text-sm sm:text-[15px] leading-relaxed text-zinc-600">
              High-cycle lithium battery systems &amp; intelligent chargers built with AIS 156 Phase 2 approved Grade-A cells, multi-point thermal safeguards, and active Smart BMS telemetry.
            </p>
          </div>

          <div className="products-reveal shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111113] hover:bg-black active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group"
            >
              <span>View All Products</span>
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4 FEATURED PRODUCT CARDS GRID                                  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-10">
          {products.map((product, idx) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="products-reveal group flex flex-col rounded-[22px] bg-[#F7F8FA] border border-zinc-200/80 hover:border-zinc-300 hover:bg-white hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              {/* Product Visual Showcase Frame */}
              <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[9.5px] sm:text-[10px] font-bold text-white tracking-wider uppercase border border-white/15 shadow-sm z-10 whitespace-nowrap">
                  {product.bannerTag}
                </span>

                <span className="absolute top-3 right-3 text-[11px] font-mono font-bold text-zinc-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10 group-hover:text-red-500 transition-colors z-10">
                  0{idx + 1}
                </span>

                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Product Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-red-600 tracking-wide uppercase">
                    {product.chemistryTag}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#111113] group-hover:text-red-600 transition-colors mt-1 leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-xs text-zinc-500 line-clamp-2 mt-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="mt-5 pt-4 border-t border-zinc-200/70">
                  <div className="grid grid-cols-2 gap-2 text-left mb-4">
                    <div className="bg-white/80 group-hover:bg-zinc-50 rounded-xl p-2 border border-zinc-200/70">
                      <span className="block text-[10px] font-medium text-zinc-400 uppercase">Voltage</span>
                      <span className="block text-xs font-bold text-[#111113] leading-snug break-words">{product.voltageSummary}</span>
                    </div>
                    <div className="bg-white/80 group-hover:bg-zinc-50 rounded-xl p-2 border border-zinc-200/70">
                      <span className="block text-[10px] font-medium text-zinc-400 uppercase">Capacity</span>
                      <span className="block text-xs font-bold text-[#111113] leading-snug break-words">{product.capacitySummary}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#111113] group-hover:text-red-600 transition-colors">
                    <span className="whitespace-nowrap">View Specifications</span>
                    <span className="w-6 h-6 rounded-full bg-white border border-zinc-200 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-all shrink-0">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM QUICK SPECS STRIP & CALL TO ACTION                      */}
        {/* ============================================================== */}
        <div className="products-reveal mt-10 rounded-2xl bg-[#F7F8FA] border border-zinc-200/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111113]">Looking for custom voltage, form factors, or fleet sizing?</h4>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">Explore our complete lineup or speak directly with our engineering desk.</p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <Link
              href="/products"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-800 transition-colors whitespace-nowrap flex-1 sm:flex-initial text-center"
            >
              Browse All Products
            </Link>
            <a
              href="tel:18001022139"
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#111113] hover:bg-black text-white transition-colors whitespace-nowrap flex-1 sm:flex-initial text-center"
            >
              1800 102 2139
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

