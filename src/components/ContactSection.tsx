"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { FaqContactPrefill } from "./FaqSection";

// ============================================================================
// TYPES & OPTIONS
// ============================================================================

type InquiryTopic = FaqContactPrefill["inquiryType"];

const INQUIRY_TOPICS: { id: InquiryTopic; label: string; specHint: string }[] = [
  { id: "Home & Solar", label: "Home & Solar", specHint: "12.8V 200Ah · 2,560 Wh" },
  { id: "EV / E-Rickshaw", label: "EV / E-Rickshaw", specHint: "51.2V 105Ah · 5.376 kWh" },
  { id: "Dealership & Bulk", label: "Dealership & Bulk", specHint: "Palletized Dispatch" },
  { id: "Technical & Warranty", label: "Technical & Warranty", specHint: "36 Months Warranty*" },
];

interface SubmittedSummary {
  ticketId: string;
  inquiryType: InquiryTopic;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  message: string;
}

export interface ContactSectionProps {
  prefill?: (FaqContactPrefill & { timestamp: number }) | null;
}

export default function ContactSection({ prefill }: ContactSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  const [inquiryType, setInquiryType] = useState<InquiryTopic>("Home & Solar");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState<SubmittedSummary | null>(null);
  const [copiedField, setCopiedField] = useState<"phone" | "email" | "summary" | null>(null);
  const [appliedPrefillTs, setAppliedPrefillTs] = useState<number | null>(null);

  if (prefill && prefill.timestamp !== appliedPrefillTs) {
    setAppliedPrefillTs(prefill.timestamp);
    setInquiryType(prefill.inquiryType);
    if (prefill.topicNote) {
      setMessage(prefill.topicNote);
    }
    setSubmitted(null);
  }

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const revealElements = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      gsap.fromTo(
        sectionEl.querySelectorAll(".contact-reveal"),
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

  const handleCopy = async (text: string, field: "phone" | "email" | "summary") => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => {
          setCopiedField((prev) => (prev === field ? null : prev));
        }, 2000);
      }
    } catch {
      // Ignore clipboard restrictions in headless contexts
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { fullName?: string; phone?: string; email?: string } = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Please enter your name.";
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const ticketNum = Math.floor(1000 + Math.random() * 9000);
    setSubmitted({
      ticketId: `LL-${ticketNum}`,
      inquiryType,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      message: message.trim(),
    });
  };

  const buildMailtoHref = (summary: SubmittedSummary) => {
    const subject = `[LievLyfe Inquiry ${summary.ticketId}] ${summary.inquiryType}`;
    const body = [
      `Reference: ${summary.ticketId}`,
      `Topic: ${summary.inquiryType}`,
      `Name: ${summary.fullName}`,
      `Phone: ${summary.phone}`,
      summary.email ? `Email: ${summary.email}` : null,
      summary.city ? `City / Business: ${summary.city}` : null,
      "",
      "Message:",
      summary.message || "Please share pricing, availability, and specifications.",
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    return `mailto:support@lievlyfe.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
  };

  const activeSpecHint =
    INQUIRY_TOPICS.find((t) => t.id === inquiryType)?.specHint ?? "12.8V & 51.2V LiFePO4";

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-20 w-full bg-white text-[#111113] border-t border-zinc-200/80 py-16 sm:py-22 lg:py-26 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14"
    >
      <div className="max-w-[1320px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: MODERN TACTILE LIGHT CONTACT CARDS                */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="contact-reveal flex items-center gap-2 text-[10.5px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-[2px] bg-red-600 inline-block" />
              <span>Contact</span>
            </div>

            <h2
              id="contact-heading"
              className="contact-reveal mt-3 text-[32px] min-[390px]:text-[36px] sm:text-[42px] lg:text-[44px] xl:text-[48px] font-bold tracking-[-0.03em] leading-[1.08] text-[#111113]"
            >
              Get in{" "}
              <span className="text-zinc-400 font-semibold">Touch.</span>
            </h2>

            <p className="contact-reveal mt-3.5 text-sm xl:text-[15px] leading-relaxed text-zinc-500 max-w-md">
              Connect with our team for residential 12.8V sizing, 51.2V e-rickshaw fleet supply, dealership inquiries, or service support.
            </p>

            {/* Clean Hardware-Inspired Contact Cards */}
            <div className="contact-reveal mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 w-full lg:max-w-md">
              {/* Toll-Free Card */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#F7F8FA] border border-zinc-200/80 hover:border-zinc-300/90 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-medium text-zinc-500">
                      Toll-Free Helpline
                    </span>
                    <a
                      href="tel:18001022139"
                      className="text-sm sm:text-base font-bold tracking-tight text-[#111113] hover:text-red-600 transition-colors block truncate"
                    >
                      1800 102 2139
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("1800 102 2139", "phone")}
                  className="px-3 py-1 rounded-full bg-white border border-zinc-200/90 hover:border-zinc-300 text-[11px] font-semibold text-zinc-700 shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  {copiedField === "phone" ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Email Support Card */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#F7F8FA] border border-zinc-200/80 hover:border-zinc-300/90 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/90 text-zinc-800 shadow-2xs flex items-center justify-center shrink-0">
                    <svg
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-medium text-zinc-500">
                      Email Support
                    </span>
                    <a
                      href="mailto:support@lievlyfe.com"
                      className="text-sm sm:text-base font-bold tracking-tight text-[#111113] hover:text-red-600 transition-colors block truncate"
                    >
                      support@lievlyfe.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("support@lievlyfe.com", "email")}
                  className="px-3 py-1 rounded-full bg-white border border-zinc-200/90 hover:border-zinc-300 text-[11px] font-semibold text-zinc-700 shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  {copiedField === "email" ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Compact Operating Hours & Support Status */}
              <div className="md:col-span-2 lg:col-span-1 flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-[#F7F8FA] border border-zinc-200/80">
                <div className="text-xs text-zinc-600">
                  <span className="font-semibold text-[#111113]">Operating Hours</span> · Mon – Sat, 9:30 AM – 6:30 PM IST
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Support Desk Active
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: LAYERED LIGHT ARCHITECTURAL INQUIRY FORM         */}
          {/* Soft #F7F8FA cradle framing a crisp elevated #FFFFFF card     */}
          {/* ============================================================== */}
          <div className="lg:col-span-7">
            <div className="contact-reveal rounded-[28px] bg-[#F7F8FA] border border-zinc-200/80 p-2 sm:p-2.5">
              <div className="rounded-[22px] bg-white border border-zinc-200/75 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06)] p-5 sm:p-8">
                {submitted ? (
                  <div className="py-4 sm:py-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <p className="text-[11px] font-semibold text-zinc-500">
                      Inquiry Ready • Ref {submitted.ticketId}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111113] mt-1">
                      Thank you, {submitted.fullName}.
                    </h3>
                    <p className="text-sm text-zinc-600 mt-2 leading-relaxed max-w-lg">
                      Your <span className="font-semibold text-[#111113]">{submitted.inquiryType}</span>{" "}
                      inquiry is formatted and ready. Launch your email client below or copy the reference summary.
                    </p>

                    <div className="mt-5 rounded-2xl bg-[#F7F8FA] border border-zinc-200/80 p-4 text-xs text-zinc-600 space-y-1.5">
                      <div>
                        <span className="text-zinc-500">Phone:</span>{" "}
                        <span className="font-medium text-[#111113]">{submitted.phone}</span>
                      </div>
                      {submitted.email && (
                        <div>
                          <span className="text-zinc-500">Email:</span>{" "}
                          <span className="font-medium text-[#111113]">{submitted.email}</span>
                        </div>
                      )}
                      {submitted.city && (
                        <div>
                          <span className="text-zinc-500">City / Business:</span>{" "}
                          <span className="font-medium text-[#111113]">{submitted.city}</span>
                        </div>
                      )}
                      {submitted.message && (
                        <div>
                          <span className="text-zinc-500">Note:</span>{" "}
                          <span className="text-zinc-700">{submitted.message}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={buildMailtoHref(submitted)}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#111113] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-colors"
                      >
                        <span>Send via Email App</span>
                        <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[11px]">
                          →
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `${submitted.ticketId} | ${submitted.inquiryType} | ${submitted.fullName} (${submitted.phone})`,
                            "summary"
                          )
                        }
                        className="px-4 py-2.5 rounded-full bg-[#F7F8FA] border border-zinc-200 hover:border-zinc-300 text-xs font-semibold text-zinc-700 transition-colors cursor-pointer"
                      >
                        {copiedField === "summary" ? "Copied" : "Copy Reference"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmitted(null)}
                        className="px-2 py-2 text-xs font-medium text-zinc-500 hover:text-[#111113] cursor-pointer"
                      >
                        Edit details
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                    {/* Interactive Light Segmented Topic Pills */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-semibold text-zinc-700">
                          What can we help you with?
                        </span>
                        <span className="text-[11px] font-medium text-zinc-500">
                          {activeSpecHint}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {INQUIRY_TOPICS.map((topic) => {
                          const isSelected = inquiryType === topic.id;
                          return (
                            <button
                              key={topic.id}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => setInquiryType(topic.id)}
                              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#111113] text-white shadow-xs"
                                  : "bg-[#F7F8FA] text-zinc-600 border border-zinc-200/80 hover:border-zinc-300 hover:text-[#111113]"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                              )}
                              <span>{topic.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-zinc-700 mb-1.5"
                        >
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                          }}
                          placeholder="Your name"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                              : "border-zinc-200/90 focus:border-zinc-900 focus:ring-zinc-900/10"
                          }`}
                        />
                        {errors.fullName && (
                          <p role="alert" className="text-[11px] text-red-600 mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold text-zinc-700 mb-1.5"
                        >
                          Phone / WhatsApp <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                          }}
                          placeholder="+91 98XXX XXXXX"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.phone
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                              : "border-zinc-200/90 focus:border-zinc-900 focus:ring-zinc-900/10"
                          }`}
                        />
                        {errors.phone && (
                          <p role="alert" className="text-[11px] text-red-600 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-zinc-700 mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                          }}
                          placeholder="you@company.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                              : "border-zinc-200/90 focus:border-zinc-900 focus:ring-zinc-900/10"
                          }`}
                        />
                        {errors.email && (
                          <p role="alert" className="text-[11px] text-red-600 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-city"
                          className="block text-xs font-semibold text-zinc-700 mb-1.5"
                        >
                          City / Business
                        </label>
                        <input
                          id="contact-city"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Ahmedabad / Solar EPC"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border border-zinc-200/90 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-zinc-700 mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share inverter capacity, quantity needed, or e-rickshaw fleet details..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FA] focus:bg-white border border-zinc-200/90 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <p className="text-[11.5px] text-zinc-500">
                        36-Month official warranty • Pan-India dispatch
                      </p>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-between sm:justify-center gap-3 px-6 py-2.5 rounded-full bg-[#111113] hover:bg-black active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer group shrink-0"
                      >
                        <span>Send Inquiry</span>
                        <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
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
    </section>
  );
}
