"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product, type AISModel } from "@/data/products";
import { ProductFeatureIcon } from "./ProductIcons";
import Footer from "./Footer";

export interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedChemistry, setSelectedChemistry] = useState<"All" | "LFP" | "NMC">("All");
  const [selectedModel, setSelectedModel] = useState<AISModel | null>(
    product.aisModels[0] ?? null
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryNote, setInquiryNote] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  // Filtered AIS Models
  const visibleModels = product.aisModels.filter((m) => {
    if (selectedChemistry === "All") return true;
    return m.chemistry === selectedChemistry;
  });

  const handleCopy = async (text: string, label: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleSelectModel = (model: AISModel) => {
    setSelectedModel(model);
    setInquiryNote(
      `Interested in model: ${model.voltage} ${model.capacity} (${model.chemistry}) - ${model.energy} for ${model.application || product.title}.`
    );
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) {
      setInquiryError("Please enter your name and contact phone number.");
      return;
    }
    setInquiryError(null);
    setInquirySubmitted(true);
  };

  const mailtoHref = `mailto:support@lievlyfe.com?subject=${encodeURIComponent(
    `[Inquiry: ${product.title}] ${selectedModel ? `${selectedModel.voltage} ${selectedModel.capacity}` : ""}`
  )}&body=${encodeURIComponent(
    `Product: ${product.title}
Model: ${selectedModel ? `${selectedModel.voltage} ${selectedModel.capacity} (${selectedModel.chemistry})` : "General Configuration"}
Name: ${inquiryName}
Phone: ${inquiryPhone}
Email: ${inquiryEmail}
Notes: ${inquiryNote || "Please send pricing, delivery timelines, and full CAD/technical drawings."}`
  )}`;

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#111113] flex flex-col justify-between selection:bg-red-600 selection:text-white">
      {/* ============================================================== */}
      {/* 1. TOP GLOBAL NAVIGATION HEADER                                */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-3.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
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

          <nav
            aria-label="Detail page navigation"
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

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:18001022139"
              className="text-xs font-semibold text-zinc-600 hover:text-[#111113] transition-colors"
            >
              1800 102 2139
            </a>
            <a
              href="#enquire-section"
              className="px-4 py-2 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              Enquire
            </a>
          </div>

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
      {/* 2. BREADCRUMBS & PRODUCT OVERVIEW HERO                         */}
      {/* ============================================================== */}
      <section className="w-full bg-white border-b border-zinc-200/80 py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb line */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-zinc-400 mb-3 sm:mb-4 flex-wrap">
            <Link href="/" className="hover:text-zinc-800 transition-colors shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link href="/products" className="hover:text-zinc-800 transition-colors shrink-0">Products</Link>
            <span className="shrink-0">/</span>
            <span className="text-[#111113] truncate max-w-[200px] sm:max-w-none">{product.title}</span>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-zinc-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-red-600 inline-block shrink-0" />
              <span className="truncate">{product.category}</span>
            </div>

            <h1 className="mt-2.5 sm:mt-3 text-[26px] min-[390px]:text-[30px] sm:text-[40px] lg:text-[48px] font-bold tracking-tight leading-[1.12] text-[#111113]">
              {product.title}
            </h1>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-zinc-600 font-medium leading-relaxed">
              {product.subtitle}
            </p>

            {/* Tag Pills */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-red-50 text-red-700 text-[10.5px] sm:text-xs font-bold border border-red-200/80 whitespace-nowrap">
                {product.bannerTag}
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[10.5px] sm:text-xs font-semibold border border-zinc-200 whitespace-nowrap">
                {product.chemistryTag}
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[10.5px] sm:text-xs font-semibold border border-zinc-200 whitespace-nowrap">
                {product.ipRating}
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[10.5px] sm:text-xs font-semibold border border-zinc-200 whitespace-nowrap">
                {product.cycleLife}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. MAIN SPLIT STAGE: PRODUCT VISUAL (LEFT) & FEATURES (RIGHT)  */}
      {/* Adapt all details from Image 2 into LievLyfe's theme           */}
      {/* ============================================================== */}
      <main className="w-full flex-1 py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
            
            {/* ---------------------------------------------------------- */}
            {/* LEFT COLUMN: LARGE PRODUCT VISUAL SHOWCASE & CORE SPECS    */}
            {/* ---------------------------------------------------------- */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
              {/* Main Product Showcase Box */}
              <div className="relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-white via-[#F7F8FA] to-zinc-100 border border-zinc-200/80 p-4 sm:p-7 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)] flex flex-col items-center overflow-hidden">
                <div className="w-full flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-400 tracking-wider whitespace-nowrap">
                    ID // {product.sku || product.id.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200/80 whitespace-nowrap shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    AIS 156 In Production
                  </span>
                </div>

                {/* Big Image Stage */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 flex items-center justify-center my-2 shadow-sm border border-zinc-200/80">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    priority
                    className="object-cover"
                  />
                </div>

                <div className="w-full text-center mt-4 pt-4 border-t border-zinc-200/70">
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mx-auto">
                    {product.fullDescription}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Summary Card */}
              <div className="rounded-[24px] bg-white border border-zinc-200/80 p-4 sm:p-6 shadow-2xs">
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between border-b border-zinc-100 pb-3 mb-3.5 sm:mb-4 gap-1.5 sm:gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Technical Specifications
                  </h3>
                  <span className="text-[11px] font-semibold text-red-600 self-start min-[420px]:self-auto">
                    {product.warranty}
                  </span>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                  {product.keySpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3 sm:p-3.5 rounded-xl bg-[#F7F8FA] border border-zinc-200/60 text-left flex flex-col justify-center"
                    >
                      <dt className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
                        {spec.label}
                      </dt>
                      <dd className="font-bold text-[#111113] mt-1 text-xs sm:text-[13px] leading-snug break-words">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Applications List */}
              <div className="rounded-[24px] bg-white border border-zinc-200/80 p-6 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-3">
                  Target Applications &amp; Vehicles
                </h3>
                <ul className="space-y-2 text-xs text-zinc-600">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* RIGHT COLUMN: 10 TECHNICAL FEATURES & AIS APPROVED MODELS  */}
            {/* ---------------------------------------------------------- */}
            <div className="lg:col-span-7 flex flex-col gap-10">
              
              {/* ======================================================== */}
              {/* 10 TECHNICAL FEATURES (FAITHFUL TO REFERENCE IMAGE 2)     */}
              {/* ======================================================== */}
              <div id="features">
                <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                  <span className="w-1.5 h-1.5 rounded-[2px] bg-red-600 inline-block" />
                  <span>Engineering Highlights</span>
                </div>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#111113]">
                  Key Technology Safeguards
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 leading-relaxed">
                  Architected with multi-tiered protections, high thermal dissipation, and real-time cloud telematics.
                </p>

                {/* 10 Feature Tiles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {product.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="p-5 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.04)] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0 mb-3">
                          <ProductFeatureIcon name={feature.iconName} className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-[#111113] tracking-tight">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ======================================================== */}
              {/* AIS 156 APPROVED MODELS MATRIX (EXACT 18 CONFIGURATIONS)  */}
              {/* ======================================================== */}
              <div id="ais-models" className="rounded-[24px] sm:rounded-[28px] bg-white border border-zinc-200/80 p-4 sm:p-8 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-zinc-200/80">
                  <div>
                    <span className="text-[10px] font-bold text-red-600 tracking-wider uppercase block">
                      Certified Technical Matrix
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#111113] mt-0.5">
                      AIS 156 Approved Models
                    </h3>
                  </div>

                  {/* Chemistry Filter Tabs */}
                  <div className="flex items-center gap-1 p-1 rounded-full bg-[#F7F8FA] border border-zinc-200/80 self-start sm:self-auto shrink-0">
                    {(["All", "LFP", "NMC"] as const).map((chem) => (
                      <button
                        key={chem}
                        type="button"
                        onClick={() => setSelectedChemistry(chem)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                          selectedChemistry === chem
                            ? "bg-[#111113] text-white shadow-2xs"
                            : "text-zinc-600 hover:text-black"
                        }`}
                      >
                        {chem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Models Interactive Grid */}
                <div className="mt-4 sm:mt-5 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-zinc-200/80 text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">
                        <th className="pb-2.5 pl-1.5 sm:pl-2 whitespace-nowrap">Voltage</th>
                        <th className="pb-2.5 whitespace-nowrap">Capacity</th>
                        <th className="pb-2.5 whitespace-nowrap">Chemistry</th>
                        <th className="pb-2.5 hidden sm:table-cell whitespace-nowrap">Energy</th>
                        <th className="pb-2.5 hidden md:table-cell whitespace-nowrap">Application</th>
                        <th className="pb-2.5 pr-1.5 sm:pr-2 text-right whitespace-nowrap">Select</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {visibleModels.map((model, idx) => {
                        const isSelected =
                          selectedModel?.voltage === model.voltage &&
                          selectedModel?.capacity === model.capacity &&
                          selectedModel?.chemistry === model.chemistry;

                        return (
                          <tr
                            key={`${model.voltage}-${model.capacity}-${idx}`}
                            onClick={() => handleSelectModel(model)}
                            className={`group cursor-pointer transition-colors ${
                              isSelected ? "bg-red-50/60 font-semibold" : "hover:bg-[#F7F8FA]"
                            }`}
                          >
                            <td className="py-2.5 pl-1.5 sm:pl-2 font-mono font-bold text-[#111113] whitespace-nowrap text-xs">
                              {model.voltage}
                            </td>
                            <td className="py-2.5 text-zinc-800 font-bold whitespace-nowrap text-xs">{model.capacity}</td>
                            <td className="py-2.5 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  model.chemistry === "LFP"
                                    ? "bg-red-100/70 text-red-700"
                                    : "bg-blue-100/70 text-blue-700"
                                }`}
                              >
                                {model.chemistry}
                              </span>
                            </td>
                            <td className="py-2.5 hidden sm:table-cell font-mono text-zinc-600 whitespace-nowrap text-xs">
                              {model.energy}
                            </td>
                            <td className="py-2.5 hidden md:table-cell text-zinc-500 whitespace-nowrap text-xs">
                              {model.application}
                            </td>
                            <td className="py-2.5 pr-1.5 sm:pr-2 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectModel(model);
                                }}
                                className={`px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-semibold transition-all whitespace-nowrap ${
                                  isSelected
                                    ? "bg-red-600 text-white"
                                    : "bg-white border border-zinc-200 text-zinc-700 group-hover:border-zinc-400"
                                }`}
                              >
                                {isSelected ? "Selected" : "Choose"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3.5 pt-3 border-t border-zinc-100 text-[10.5px] sm:text-[11px] text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>*All listed voltage and capacity configurations carry AIS 156 Phase 2 certification.</span>
                  <span className="font-medium text-zinc-600 shrink-0 whitespace-nowrap">{visibleModels.length} models displayed</span>
                </div>
              </div>

              {/* ======================================================== */}
              {/* 4. DEDICATED INQUIRY SECTION (THEMED ADAPTATION)         */}
              {/* ======================================================== */}
              <div
                id="enquire-section"
                className="rounded-[28px] bg-[#F7F8FA] border border-zinc-200/80 p-2 sm:p-2.5 scroll-mt-28"
              >
                <div className="rounded-[22px] bg-white border border-zinc-200/75 p-6 sm:p-8 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)]">
                  {inquirySubmitted ? (
                    <div className="py-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-[#111113]">Inquiry Prepared Successfully</h4>
                      <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-md mx-auto">
                        Thank you, <span className="font-semibold text-black">{inquiryName}</span>. Your specification request for{" "}
                        <span className="font-semibold text-black">
                          {product.title} {selectedModel ? `(${selectedModel.voltage} ${selectedModel.capacity})` : ""}
                        </span>{" "}
                        is ready to dispatch.
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={mailtoHref}
                          className="px-6 py-2.5 rounded-full bg-[#111113] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-colors"
                        >
                          Send via Email App →
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            handleCopy(
                              `${product.title} - ${selectedModel?.voltage || ""} ${selectedModel?.capacity || ""} | ${inquiryName} (${inquiryPhone})`,
                              "summary"
                            );
                          }}
                          className="px-4 py-2.5 rounded-full bg-[#F7F8FA] border border-zinc-200 text-xs font-semibold text-zinc-700"
                        >
                          {copiedField === "summary" ? "Copied" : "Copy Spec Details"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setInquirySubmitted(false)}
                          className="px-3 py-2 text-xs font-medium text-zinc-500 hover:text-black cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} noValidate className="space-y-4">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <span className="text-[10.5px] sm:text-xs font-bold text-red-600 uppercase tracking-wider block">
                              Direct OEM Quotation
                            </span>
                            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#111113] mt-0.5">
                              Enquire for {product.title}
                            </h3>
                          </div>
                          {selectedModel && (
                            <span className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-full self-start sm:self-auto whitespace-nowrap shrink-0 border border-zinc-200/70">
                              Model: {selectedModel.voltage} {selectedModel.capacity} ({selectedModel.chemistry})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                          Share your vehicle or fleet requirements and our battery engineering desk will contact you within 4 hours.
                        </p>
                      </div>

                      {inquiryError && (
                        <p role="alert" className="text-xs text-red-600 font-semibold">
                          {inquiryError}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="inquiry-name" className="block text-xs font-semibold text-zinc-700 mb-1">
                            Full Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="inquiry-name"
                            type="text"
                            required
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border border-zinc-200 focus:border-zinc-900 text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-zinc-700 mb-1">
                            Phone / WhatsApp <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="inquiry-phone"
                            type="tel"
                            required
                            value={inquiryPhone}
                            onChange={(e) => setInquiryPhone(e.target.value)}
                            placeholder="+91 98XXX XXXXX"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border border-zinc-200 focus:border-zinc-900 text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="inquiry-email" className="block text-xs font-semibold text-zinc-700 mb-1">
                            Email Address
                          </label>
                          <input
                            id="inquiry-email"
                            type="email"
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border border-zinc-200 focus:border-zinc-900 text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Quantity / Fleet Size
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 50 packs / OEM prototype"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border border-zinc-200 focus:border-zinc-900 text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                          Specifications / Project Notes
                        </label>
                        <textarea
                          rows={3}
                          value={inquiryNote}
                          onChange={(e) => setInquiryNote(e.target.value)}
                          placeholder="Mention your motor power, top speed, target range, or custom dimensions required..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border border-zinc-200 focus:border-zinc-900 text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                        <div className="text-[11px] sm:text-[11.5px] text-zinc-500 whitespace-nowrap">
                          36-Month Official Warranty • Pan-India Logistics
                        </div>

                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#111113] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group whitespace-nowrap w-full sm:w-auto"
                        >
                          <span>Submit Inquiry</span>
                          <span className="w-4.5 h-4.5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform shrink-0">
                            →
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
