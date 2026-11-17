"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

// ============================================================================
// TYPES & CURATED LIEVLFE FAQ DATA
// ============================================================================

export interface FaqContactPrefill {
  inquiryType:
    | "Home & Solar"
    | "EV / E-Rickshaw"
    | "Dealership & Bulk"
    | "Technical & Warranty";
  topicNote?: string;
}

export interface FaqSectionProps {
  onAskQuestion?: (prefill: FaqContactPrefill) => void;
}

type FaqFilter = "All" | "Batteries" | "Safety & BMS" | "Warranty";

interface FaqItem {
  num: string;
  filter: Exclude<FaqFilter, "All">;
  question: string;
  answer: string;
  prefill: FaqContactPrefill;
}

const FAQ_FILTERS: FaqFilter[] = ["All", "Batteries", "Safety & BMS", "Warranty"];

const FAQ_ITEMS: FaqItem[] = [
  {
    num: "01",
    filter: "Batteries",
    question: "Why does LievLyfe use LiFePO4 instead of lead-acid or standard lithium?",
    answer:
      "Lithium Iron Phosphate (LiFePO4) offers superior thermal stability, zero acid fumes, and maintenance-free daily cycling. Each pack delivers over 3,500 deep lifecycles with more than 98% round-trip energy yield—giving you a longer working life and lower lifetime cost than tubular lead-acid batteries.",
    prefill: {
      inquiryType: "Home & Solar",
      topicNote: "Comparing 12.8V 200Ah LiFePO4 performance and lifecycle for our setup.",
    },
  },
  {
    num: "02",
    filter: "Safety & BMS",
    question: "What electrical protections are built into the Smart BMS?",
    answer:
      "Every module includes an integrated Smart Battery Management System with active cell voltage balancing. It automatically guards against over-charging, deep over-discharge, short circuits, over-current surges, and unsafe operating temperatures.",
    prefill: {
      inquiryType: "Technical & Warranty",
      topicNote: "Question about Smart BMS protection limits and inverter cut-offs.",
    },
  },
  {
    num: "03",
    filter: "Batteries",
    question: "What are the key specifications of the flagship 12.8V battery?",
    answer:
      "Our flagship unit operates at 12.8V nominal voltage with 200Ah rated capacity (2,560Wh stored energy), housed in an IP65 waterproof-grade industrial enclosure built with Grade-A prismatic cells for home backup, commercial UPS, and solar systems.",
    prefill: {
      inquiryType: "Home & Solar",
      topicNote: "Requesting availability and pricing for the 12.8V 200Ah (2,560Wh) pack.",
    },
  },
  {
    num: "04",
    filter: "Batteries",
    question: "Do you offer dedicated batteries for Electric Rickshaws and EV fleets?",
    answer:
      "Yes. Our EV-Grade 51.2V 105Ah battery pack provides 5.376 kWh of high-discharge traction power engineered for passenger e-rickshaws and urban commercial three-wheelers, supporting heavy daily mileage and fast depot turnaround charging.",
    prefill: {
      inquiryType: "EV / E-Rickshaw",
      topicNote: "Interested in 51.2V 105Ah EV-Grade packs for e-rickshaw / fleet use.",
    },
  },
  {
    num: "05",
    filter: "Safety & BMS",
    question: "Will LievLyfe batteries work with existing solar inverters and UPS units?",
    answer:
      "Yes. Both our 12.8V and 51.2V packs work cleanly with lithium-compatible solar hybrid inverters, MPPT charge controllers, and pure sine-wave home UPS systems. Share your inverter model with our team if you want us to verify exact charge settings.",
    prefill: {
      inquiryType: "Technical & Warranty",
      topicNote: "Checking compatibility with our existing inverter / solar controller.",
    },
  },
  {
    num: "06",
    filter: "Warranty",
    question: "How do the 3-Year Official Warranty and bulk pallet orders work?",
    answer:
      "All LievLyfe batteries carry a 36-month (3 Years*) official warranty backed by batch QC records, original invoice, and warranty card terms. We also supply shrink-wrapped, cycle-tested pallet lots directly to distributors, EV fleet operators, and solar EPCs across India.",
    prefill: {
      inquiryType: "Dealership & Bulk",
      topicNote: "Inquiry regarding bulk pallet dispatch or warranty policy terms.",
    },
  },
];

export default function FaqSection({ onAskQuestion }: FaqSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  const [activeFilter, setActiveFilter] = useState<FaqFilter>("All");
  const [openNum, setOpenNum] = useState<string | null>("01");

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.filter === activeFilter);
  }, [activeFilter]);

  const resolvedOpenNum = useMemo(() => {
    if (openNum === null) return null;
    if (visibleItems.some((item) => item.num === openNum)) return openNum;
    return visibleItems[0]?.num ?? null;
  }, [visibleItems, openNum]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const revealElements = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      gsap.fromTo(
        sectionEl.querySelectorAll(".faq-reveal"),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
    };

    const rect = sectionEl.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (num: string) => {
    setOpenNum((prev) => (prev === num ? null : num));
  };

  const handleAsk = (prefill: FaqContactPrefill) => {
    if (onAskQuestion) {
      onAskQuestion(prefill);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-20 w-full bg-[#F7F8FA] text-[#111113] border-t border-zinc-200/80 py-16 sm:py-22 lg:py-26 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14"
    >
      <div className="max-w-[1320px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* ============================================================== */}
          {/* LEFT RAIL: MODERN EDITORIAL HEADER + CLEAN FILTER + HELP CARD  */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col">
            <div className="faq-reveal flex items-center gap-2 text-[10.5px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-red-600 inline-block" />
              <span>Support &amp; Specs</span>
            </div>

            <h2
              id="faq-heading"
              className="faq-reveal mt-3 text-[32px] min-[390px]:text-[36px] sm:text-[42px] lg:text-[44px] xl:text-[48px] font-bold tracking-[-0.03em] leading-[1.08] text-[#111113]"
            >
              Common{" "}
              <span className="text-zinc-400 font-semibold">Questions.</span>
            </h2>

            <p className="faq-reveal mt-3.5 text-sm xl:text-[15px] leading-relaxed text-zinc-500 max-w-md">
              Everything you need to know about LiFePO4 chemistry, Smart BMS safeguards, solar sizing, and official warranty coverage.
            </p>

            {/* Clean Category Filter Strip */}
            <div
              role="tablist"
              aria-label="Filter questions by topic"
              className="faq-reveal mt-6 flex flex-wrap items-center gap-1.5 max-w-md"
            >
              {FAQ_FILTERS.map((filter) => {
                const isSelected = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#111113] text-white shadow-xs"
                        : "bg-white text-zinc-600 border border-zinc-200/90 hover:border-zinc-300 hover:text-[#111113]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Clean White Studio Sizing Help Card */}
            <div className="faq-reveal mt-7 w-full lg:max-w-md rounded-2xl bg-white border border-zinc-200/85 p-5 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#111113] tracking-tight">
                      Need custom battery sizing?
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      Share your inverter load or EV fleet details and our team will suggest the right pack.
                    </p>
                  </div>
                </div>

                <div className="md:pl-0 pl-12.5 lg:pl-12.5 flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleAsk({
                        inquiryType: "Technical & Warranty",
                        topicNote: "Need help choosing the right LiFePO4 battery model for my setup.",
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111113] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer group"
                  >
                    <span>Ask an Engineer</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </button>

                  <a
                    href="tel:18001022139"
                    className="text-xs font-semibold text-zinc-600 hover:text-[#111113] transition-colors"
                  >
                    1800 102 2139
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT STAGE: MODERN ELEVATED ACCORDION CARDS                   */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {visibleItems.map((item) => {
              const isOpen = resolvedOpenNum === item.num;
              const panelId = `faq-panel-${item.num}`;
              const btnId = `faq-btn-${item.num}`;

              return (
                <article
                  key={item.num}
                  className={`faq-reveal rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 ${
                    isOpen
                      ? "bg-white border-zinc-300/90 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.07)]"
                      : "bg-white/80 hover:bg-white border-zinc-200/80 hover:border-zinc-300/80 shadow-[0_2px_10px_rgba(0,0,0,0.015)]"
                  }`}
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => handleToggle(item.num)}
                      className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4.5 sm:py-5 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-2xl"
                    >
                      <div className="flex items-baseline gap-3.5 sm:gap-4.5 min-w-0">
                        <span
                          className={`font-mono text-xs font-bold shrink-0 tabular-nums transition-colors ${
                            isOpen ? "text-red-600" : "text-zinc-400 group-hover:text-zinc-700"
                          }`}
                        >
                          {item.num}
                        </span>
                        <span
                          className={`text-sm sm:text-[15.5px] lg:text-base font-semibold tracking-[-0.01em] leading-snug transition-colors ${
                            isOpen ? "text-[#111113]" : "text-zinc-800 group-hover:text-[#111113]"
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>

                      {/* Sleek Circular Toggle Button */}
                      <span
                        aria-hidden="true"
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-250 ${
                          isOpen
                            ? "bg-[#111113] text-white rotate-45"
                            : "bg-[#F7F8FA] border border-zinc-200/80 text-zinc-600 group-hover:bg-zinc-200/70 group-hover:text-[#111113] rotate-0"
                        }`}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          className="w-3.5 h-3.5"
                        >
                          <line x1="8" y1="3" x2="8" y2="13" />
                          <line x1="3" y1="8" x2="13" y2="8" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 pl-12.5 sm:pl-14.5">
                        <div className="border-t border-zinc-100 pt-3.5">
                          <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 max-w-2xl">
                            {item.answer}
                          </p>
                          <div className="mt-3 flex items-center justify-between gap-4">
                            <span className="text-[11px] font-medium text-zinc-500">
                              {item.filter}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAsk(item.prefill)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                            >
                              <span>Ask about this</span>
                              <span aria-hidden="true">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
