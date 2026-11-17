"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ManufacturerBanner() {
  return (
    <section
      id="manufacturer-banner"
      aria-label="LievLyfe Lithium Battery Manufacturer"
      className="relative z-20 w-full bg-[#F7F8FA] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <Link
          href="/products"
          aria-label="LievLyfe Lithium Battery Manufacturer"
          className="group block relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-[#0B0B10] shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.16)] hover:border-red-500/40 transition-all duration-300 transform-gpu"
        >
          {/* Responsive 2:1 Container Ensuring Zero Cropping on Mobile, Tablet & Desktop */}
          <div className="relative w-full aspect-[2/1] flex items-center justify-center bg-[#0B0B10]">
            <Image
              src="/assets/lievlyfe_manufacturer_banner_v2.jpg"
              alt="LievLyfe Energy - Lithium Battery Manufacturer - Clean Energy, Sustainable Future, Endless Possibilities"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1440px"
              className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
