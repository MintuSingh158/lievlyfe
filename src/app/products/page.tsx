"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from "@/data/products";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProductCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter products by category and search term
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.chemistryTag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#111113] flex flex-col justify-between selection:bg-red-600 selection:text-white">
      {/* ============================================================== */}
      {/* 1. TOP GLOBAL NAVIGATION HEADER                                */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-3.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Brand Logo leading to Home */}
          <Link href="/" className="flex items-center group cursor-pointer" aria-label="LievLyfe Home">
            <Image
              src="/LOGO.svg"
              alt="LievLyfe Logo"
              width={150}
              height={28}
              style={{ width: "auto" }}
              className="h-6 sm:h-7 w-auto object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

          {/* Desktop Capsule Navigation */}
          <nav
            aria-label="Product page navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 px-6 py-2 rounded-full bg-[#F7F8FA] border border-zinc-200/80 shadow-2xs text-xs lg:text-[13px] font-semibold"
          >
            <Link href="/" className="text-zinc-600 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-zinc-950 font-bold text-red-600">
              Products
            </Link>
            <Link href="/#technology" className="text-zinc-600 hover:text-red-600 transition-colors">
              Technology
            </Link>
            <Link href="/#gallery" className="text-zinc-600 hover:text-red-600 transition-colors">
              Gallery
            </Link>
            <Link href="/#faq" className="text-zinc-600 hover:text-red-600 transition-colors">
              FAQ
            </Link>
            <Link href="/#contact" className="text-zinc-600 hover:text-red-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Header CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:18001022139"
              className="text-xs font-semibold text-zinc-600 hover:text-[#111113] transition-colors"
            >
              1800 102 2139
            </a>
            <Link
              href="/#contact"
              className="px-4 py-2 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              Inquire
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[#F7F8FA] border border-zinc-200 flex items-center justify-center text-zinc-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-zinc-200/80 flex flex-col gap-2 text-sm font-semibold">
            <Link href="/" className="px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100">
              Home
            </Link>
            <Link href="/products" className="px-3 py-2 rounded-xl text-red-600 bg-red-50/50 font-bold">
              Products
            </Link>
            <Link href="/#technology" className="px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100">
              Technology
            </Link>
            <Link href="/#gallery" className="px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100">
              Gallery
            </Link>
            <Link href="/#faq" className="px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100">
              FAQ
            </Link>
            <Link href="/#contact" className="px-3 py-2 rounded-xl text-zinc-700 hover:bg-zinc-100">
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* 2. PAGE HERO BANNER & SEARCH                                   */}
      {/* ============================================================== */}
      <section className="w-full bg-white border-b border-zinc-200/80 pt-10 sm:pt-14 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb strip */}
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-4">
            <Link href="/" className="hover:text-zinc-800 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111113]">Products</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-red-600 inline-block" />
                <span>Complete Lineup &amp; Application Models</span>
              </div>

              <h1 className="mt-3 text-[32px] min-[390px]:text-[38px] sm:text-[46px] lg:text-[52px] font-bold tracking-[-0.03em] leading-[1.06] text-[#111113]">
                Advanced Lithium{" "}
                <span className="text-zinc-400 font-semibold">Battery Solutions.</span>
              </h1>

              <p className="mt-3.5 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
                Certified traction and industrial battery architectures engineered with Grade-A prismatic cells, AIS 156 Phase 2 approved multi-layer safety, and active Smart BMS telemetry.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="w-full lg:w-72 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by voltage, category..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-[#F7F8FA] border border-zinc-200 focus:border-zinc-900 focus:bg-white text-xs sm:text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all shadow-2xs"
                />
                <svg
                  className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CATEGORY FILTER PILLS (EXACT REPLICATION FROM IMAGE 1)        */}
          {/* ============================================================ */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-100">
            <div className="text-[11px] sm:text-xs font-semibold text-zinc-500 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>Filter by Application Category</span>
              <span className="text-zinc-400 font-medium shrink-0">Showing {filteredProducts.length} of {PRODUCTS.length} categories</span>
            </div>

            <div
              role="tablist"
              aria-label="Filter products by application"
              className="flex flex-wrap items-center gap-1.5 sm:gap-2.5"
            >
              {PRODUCT_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-[#111113] text-white shadow-xs"
                        : "bg-[#F7F8FA] text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:text-black hover:bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. PRODUCT CARDS GRID                                          */}
      {/* ============================================================== */}
      <main className="w-full flex-1 py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="max-w-[1440px] mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200/80 p-8 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#111113]">No matching products found</h3>
              <p className="text-xs text-zinc-500 mt-1">Try resetting your search query or choosing another application category.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div id="catalog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col rounded-[24px] bg-white border border-zinc-200/80 hover:border-zinc-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
                >
                  {/* Image showcase container */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden cursor-pointer"
                  >
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/15 shadow-sm z-10">
                      {product.bannerTag}
                    </span>

                    <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-zinc-300 text-[10px] font-mono font-bold tracking-wider border border-white/10 z-10">
                      {product.ipRating.split(" ")[0]}
                    </span>

                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-red-600 uppercase tracking-wider">
                        <span>{product.chemistryTag}</span>
                        <span className="text-zinc-400 font-mono font-medium">{product.cycleLife.split(" ")[0]} Cycles</span>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight text-[#111113] group-hover:text-red-600 transition-colors mt-1.5 leading-snug">
                        <Link href={`/products/${product.slug}`}>
                          {product.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-zinc-500 line-clamp-2 mt-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Technical Specs Metric Strip */}
                      <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-2xl bg-[#F7F8FA] border border-zinc-200/70 text-left">
                        <div>
                          <span className="block text-[10px] font-medium text-zinc-400 uppercase">Voltage</span>
                          <span className="block text-xs font-bold text-[#111113] leading-snug break-words">{product.voltageSummary}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-medium text-zinc-400 uppercase">Capacity</span>
                          <span className="block text-xs font-bold text-[#111113] leading-snug break-words">{product.capacitySummary}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-medium text-zinc-400 uppercase">Energy</span>
                          <span className="block text-xs font-bold text-[#111113] leading-snug break-words">{product.energySummary}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] sm:text-xs font-medium text-zinc-500 whitespace-nowrap">
                        {product.aisModels.length} Configurations
                      </span>

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111113] group-hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span className="hidden sm:inline">View Details &amp; AIS Models</span>
                        <span className="sm:hidden">View Details</span>
                        <span className="w-5 h-5 rounded-full bg-[#111113] group-hover:bg-red-600 text-white flex items-center justify-center text-[10px] transition-colors shrink-0">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Quick Technical Help & Bulk Supply Banner */}
          <div className="mt-14 rounded-3xl bg-white border border-zinc-200/80 p-6 sm:p-8 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-[2px] bg-red-600" />
                <span>OEM &amp; Fleet Engineering Desk</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111113]">
                Need custom battery pack dimensions, voltages, or pallet supply?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
                Our battery systems engineering team customizes form factors, CANbus communication protocols, and high-voltage string configurations for equipment OEMs across India.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:18001022139"
                className="px-5 py-2.5 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-semibold transition-colors"
              >
                1800 102 2139
              </a>
              <Link
                href="/#contact"
                className="px-5 py-2.5 rounded-full bg-[#F7F8FA] border border-zinc-200/90 hover:border-zinc-300 text-zinc-800 text-xs font-semibold transition-colors"
              >
                Direct Inquiry Form
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
