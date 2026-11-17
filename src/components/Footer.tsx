"use client";

import React from "react";

export interface FooterProps {
  onNavigate?: (target: string | number) => void;
}

const FOOTER_LINKS: { label: string; href: string; target?: number | string; active?: boolean }[] = [
  { label: "Home", href: "#overview", target: 0, active: true },
  { label: "Technology", href: "#technology", target: "#technology" },
  { label: "Products", href: "#products", target: "#products" },
  { label: "Gallery", href: "#gallery", target: "#gallery" },
  { label: "FAQ", href: "#faq", target: "#faq" },
  { label: "Contact", href: "#contact", target: "#contact" },
];

export default function Footer({ onNavigate }: FooterProps = {}) {
  const handleNav = (e: React.MouseEvent, target: string | number) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
      return;
    }
    // If we're not on the home page, redirect to home with anchor
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      if (typeof target === "number" && target === 0) {
        window.location.href = "/";
        return;
      }
      if (typeof target === "string" && target.startsWith("#")) {
        window.location.href = `/${target}`;
        return;
      }
    }
    if (typeof target === "number" && target === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (typeof target === "string" && target.startsWith("#")) {
      document.getElementById(target.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      role="contentinfo"
      className="relative z-20 w-full bg-[#0E0E11] text-white border-t border-zinc-800/80 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-14 sm:pt-18 lg:pt-20 pb-4 sm:pb-6 lg:pb-8">
        {/* ================================================================ */}
        {/* TOP 3-COLUMN DIRECTORY & CONTACT BLOCK                           */}
        {/* ================================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 items-start">
          {/* LEFT: All Website Navigation & Catalogue Links */}
          <nav aria-label="Footer navigation" className="col-span-1 text-left">
            <ul className="space-y-2 text-xs sm:text-[13px] font-medium">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNav(e, item.target ?? item.href)}
                    className={`transition-colors inline-block ${
                      item.active ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CENTER: Direct Support Contact + 4 Square Action Tiles */}
          <div className="col-span-2 md:col-span-1 order-last md:order-none text-center flex flex-col items-center">
            <p className="text-xs font-medium text-zinc-400">Customer Care</p>

            <div className="mt-3 space-y-1 text-xs sm:text-[13px] font-medium text-zinc-200">
              <div>
                <a
                  href="mailto:support@lievlyfe.com"
                  className="hover:text-white transition-colors"
                >
                  support@lievlyfe.com
                </a>
              </div>
              <div>
                <a href="tel:18001022139" className="hover:text-white transition-colors">
                  1800 102 2139
                </a>
              </div>
            </div>

            {/* 4 Rounded-Square Quick Action Buttons (Matching Reference Grid) */}
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <a
                href="mailto:support@lievlyfe.com"
                aria-label="Email support@lievlyfe.com"
                title="Email Support"
                className="w-9 h-9 rounded-lg bg-[#1A1A1F] border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 text-zinc-200 hover:text-white flex items-center justify-center transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>

              <a
                href="tel:18001022139"
                aria-label="Call Toll-Free 1800 102 2139"
                title="Call 1800 102 2139"
                className="w-9 h-9 rounded-lg bg-[#1A1A1F] border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 text-zinc-200 hover:text-white flex items-center justify-center transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNav(e, "#contact")}
                aria-label="Direct OEM Inquiry Desk"
                title="Direct OEM Inquiry Desk"
                className="w-9 h-9 rounded-lg bg-[#1A1A1F] border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 text-zinc-200 hover:text-white flex items-center justify-center transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </a>

              <button
                type="button"
                onClick={(e) => handleNav(e, 0)}
                aria-label="Back to top"
                title="Back to top"
                className="w-9 h-9 rounded-lg bg-[#1A1A1F] border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 text-zinc-200 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT: Company & Product Lineup Details */}
          <div className="col-span-1 text-right flex flex-col items-end">
            <p className="text-xs font-medium text-zinc-400">LievLyfe Energy</p>

            <div className="mt-3 space-y-1 text-xs sm:text-[13px] text-zinc-200 leading-snug">
              <p>12.8V 200Ah · 2,560 Wh</p>
              <p>51.2V 105Ah · 5.376 kWh</p>
              <p>36 Months Warranty*</p>
              <p className="text-zinc-400">Manufactured in India</p>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* MIDDLE UTILITY & COPYRIGHT ROW                                   */}
        {/* ================================================================ */}
        <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-2.5 text-[11.5px] sm:text-xs text-zinc-400">
          <p className="text-center md:text-left">
            © 2026 LievLyfe Energy Pvt. Ltd. All rights reserved.
          </p>

          <p className="text-center text-zinc-500">
            *Warranty subject to official policy &amp; invoice
          </p>

          <div className="flex items-center justify-center md:justify-end gap-5">
            <a
              href="#products"
              onClick={(e) => handleNav(e, "#products")}
              className="hover:text-white transition-colors"
            >
              Our Products
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="hover:text-white transition-colors"
            >
              Inquiry Desk
            </a>
          </div>
        </div>

        {/* ================================================================ */}
        {/* FULL-WIDTH ARCHITECTURAL BOTTOM WORDMARK (White + Brand Red)      */}
        {/* ================================================================ */}
        <div className="mt-10 sm:mt-14 lg:mt-16 w-full select-none">
          <svg
            viewBox="0 0 712 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="LievLyfe Energy"
            className="w-full h-auto block"
          >
            <path
              d="M112.5 54.6626C112.5 54.6626 95.5 69.6626 86 80.6626C138.041 50.6345 191 39.6626 231.5 48.1626C192 30.1626 130.5 37.6626 84 51.1626C93.5 51.1626 100.715 51.8337 112.5 54.6626Z"
              fill="#FFFFFF"
            />
            <path
              d="M59 38.139L57 40.6626L81 24.8929L59 38.139Z"
              fill="#F8F8F8"
              fillOpacity="0.63"
            />
            <path
              d="M83.8739 23.1626L81 24.8929L57 40.6626L59 38.139L0 73.6626L44.5 69.1626L32 94.6626L91 58.1626H64L95.5 16.1626L91 18.872L90.5 19.6626L83.8739 23.1626Z"
              fill="url(#footerLogoBoltGrad)"
            />
            <path
              d="M91 18.872L83.8739 23.1626L90.5 19.6626L91 18.872Z"
              fill="#F8F8F8"
              fillOpacity="0.63"
            />
            <path
              d="M3.5 71.6626L0 73.6626L44.5 69.1626L32 94.6626L46.5 68.1626L3.5 71.6626Z"
              fill="#09090B"
            />
            <path
              d="M91 58.1626L32 94.6626L32.5 93.1626L88 58.1626H91Z"
              fill="#09090B"
            />
            <path
              d="M265.469 1.07064C265.031 2.26564 262.055 15.9846 250.549 69.8526C248.023 81.6776 245.244 94.3646 244.373 98.0466C243.503 101.728 243.084 105.216 243.443 105.797C243.879 106.502 254.381 106.853 275.018 106.853H305.94L306.434 104.603C306.706 103.365 307.774 98.6496 308.807 94.1236C309.841 89.5976 310.452 85.6596 310.165 85.3736C309.879 85.0866 301.17 84.8526 290.811 84.8526C280.453 84.8526 271.982 84.5146 271.986 84.1026C271.991 83.6906 273.797 75.7026 276 66.3526C282.318 39.5446 289.317 6.63765 289.401 3.35265L289.478 0.352639L277.709 0.0706349C268.842 -0.141365 265.824 0.104641 265.469 1.07064ZM326.468 34.0307C326.192 34.7577 322.65 51.1026 318.598 70.3526C313.521 94.4656 311.54 105.742 312.226 106.603C313.362 108.027 332.514 108.413 333.369 107.03C333.649 106.577 334.545 103.089 335.361 99.2796C341.675 69.7956 343.405 61.6296 346.009 48.9996C347.637 41.1056 348.784 34.3487 348.558 33.9827C348.332 33.6177 343.383 33.1807 337.559 33.0127C329.479 32.7797 326.852 33.0207 326.468 34.0307ZM374.478 34.6547C365.008 37.9447 355.702 46.4456 350.677 56.3966C345.813 66.0296 344.534 82.9166 347.972 92.1056C353.003 105.555 368.551 112.38 385.237 108.464C392.839 106.68 401.793 102.499 402.618 100.348C403.272 98.6446 399.177 85.8526 397.979 85.8526C397.519 85.8526 394.743 87.0606 391.81 88.5366C378.837 95.0666 366.978 90.9876 366.978 79.9966V77.0406L388.843 77.5946L410.708 78.1486L412.081 72.7506C412.836 69.7816 413.435 63.7526 413.412 59.3526C413.377 52.7256 412.919 50.4816 410.744 46.2756C407.907 40.7866 402.773 36.2627 397.068 34.2237C391.908 32.3797 380.396 32.5987 374.478 34.6547ZM415.975 37.1027C415.972 39.0947 420.936 76.6996 424.258 99.8526L425.478 108.353L436.652 108.635L447.825 108.917L454.753 96.6346C468.174 72.8406 486.978 37.9777 486.978 36.8887C486.978 36.1357 483.45 35.8767 475.817 36.0697L464.657 36.3527L453.349 58.8526C447.129 71.2276 442.026 80.9026 442.008 80.3526C441.886 76.5296 437.872 37.1007 437.503 36.1027C437.173 35.2107 434.021 34.8527 426.509 34.8527C416.256 34.8527 415.978 34.9117 415.975 37.1027ZM391.728 52.4826C393.262 54.1746 393.978 56.2196 393.978 58.9086V62.8526H381.978C374.266 62.8526 369.978 62.4776 369.978 61.8026C369.978 59.9576 372.709 55.4266 375.252 53.0506C380.281 48.3546 387.751 48.0966 391.728 52.4826Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#FFFFFF"
            />
            <path
              d="M639.21 5.71372C630.865 8.66772 624.198 17.5447 620.26 30.9467C618.496 36.9487 618.409 37.0467 614.874 37.0487L611.281 37.0497L609.124 44.9197C607.938 49.2487 606.967 53.0737 606.967 53.4197C606.967 53.7667 609.022 54.0497 611.534 54.0497C615.411 54.0497 616.025 54.3147 615.594 55.7997C614.837 58.4077 609.034 81.8677 607.865 87.0497C607.306 89.5247 606.449 93.1247 605.96 95.0497C605.471 96.9747 604.764 100.913 604.39 103.8L603.709 109.05H614.338H624.967V105.416C624.967 103.417 625.401 100.155 625.931 98.1657C628.903 87.0147 632.532 71.3447 634.063 63.0497C635.827 53.4927 635.251 54.0497 643.385 54.0497H650.668L652.444 46.5097C653.421 42.3627 654.05 38.8047 653.843 38.6037C653.636 38.4027 650.542 38.0647 646.967 37.8517C641.106 37.5027 640.435 37.2407 640.139 35.1897C639.667 31.9257 643.334 24.7267 646.266 23.1567C648.51 21.9567 651.545 21.9697 658.33 23.2097C659.842 23.4857 660.454 22.5097 661.568 18.0497C662.324 15.0247 663.398 11.7687 663.955 10.8137C665.442 8.26172 665.35 8.12572 660.717 6.02272C655.539 3.67272 645.391 3.52672 639.21 5.71372ZM500.473 9.43872C500.218 10.5997 499.13 15.5997 498.054 20.5497C496.979 25.4997 494.952 34.7247 493.55 41.0497C492.149 47.3747 489.822 58.3997 488.38 65.5497C486.937 72.6997 485.379 80.4037 484.917 82.6697C484.454 84.9357 483.151 90.4107 482.022 94.8367C478.63 108.12 477.423 107.036 495.717 107.134C504.38 107.18 516.775 107.292 523.262 107.384L535.057 107.55L536.427 102.55C537.181 99.7997 538.077 95.1867 538.417 92.2997L539.036 87.0497H522.97C510.252 87.0497 506.794 86.7627 506.376 85.6727C505.889 84.4037 507.821 73.3627 509.985 65.0497C510.487 63.1247 511.525 58.6247 512.294 55.0497C513.062 51.4747 514.254 46.5247 514.942 44.0497C518.247 32.1577 522.591 8.84772 521.561 8.53272C520.959 8.34872 516.072 8.00271 510.701 7.76271C501.402 7.34771 500.913 7.42772 500.473 9.43872ZM540.63 35.7857C539.979 36.8397 541.569 49.1337 542.928 53.5497C543.435 55.1997 544.389 60.1497 545.046 64.5497C545.703 68.9497 547.122 76.8247 548.2 82.0497C549.278 87.2747 550.398 93.7997 550.69 96.5497C550.981 99.2997 551.623 102.059 552.116 102.68C553.412 104.313 545.62 113.489 537.075 120.393C529.68 126.368 529.449 126.684 530.852 128.898C532.324 131.221 550.239 130.065 556.978 127.213C562.371 124.93 562.62 124.641 568.617 113.715C571.988 107.574 575.058 101.514 575.441 100.247C575.823 98.9807 577.672 95.2247 579.551 91.9007C581.43 88.5767 582.967 85.6827 582.967 85.4687C582.967 85.2547 584.257 82.9357 585.834 80.3147C587.411 77.6937 591.157 70.8247 594.159 65.0497C600.382 53.0767 602.225 49.7587 603.046 49.0497C604.135 48.1087 609.291 38.0407 608.879 37.6607C608.652 37.4517 603.831 37.1167 598.164 36.9157C586.354 36.4967 587.667 35.5667 581.952 48.3947C575.67 62.4977 567.78 78.0497 566.908 78.0497C565.641 78.0497 565.292 75.8477 563.416 56.0497C562.504 46.4247 561.595 37.9877 561.394 37.2997C561.143 36.4397 558.603 36.0457 553.248 36.0357C548.969 36.0287 544.505 35.7647 543.33 35.4487C542.154 35.1337 540.94 35.2847 540.63 35.7857ZM676.407 37.9287C665.248 40.8127 655.145 50.2797 649.95 62.7197C645.52 73.3277 644.704 85.7547 647.886 94.1657C652.44 106.206 662.214 111.799 676.935 110.79C685.031 110.235 689.705 108.68 696.405 104.315L700.61 101.576L698.738 95.5627C697.709 92.2557 696.533 89.2157 696.125 88.8077C695.716 88.3987 692.787 89.4117 689.615 91.0577C683.297 94.3357 675.328 95.0827 670.439 92.8547C667.297 91.4237 664.967 87.2777 664.967 83.1197V80.0897L686.217 79.8197L707.467 79.5497L708.748 73.5497C710.294 66.3117 709.71 54.3597 707.618 50.4167C705.554 46.5247 701.876 42.7747 697.425 40.0237C693.395 37.5327 682.239 36.4207 676.407 37.9287ZM687.283 54.2127C690.636 55.9987 691.9 58.1977 691.935 62.2997L691.967 66.0497H680.467C670.605 66.0497 668.967 65.8227 668.967 64.4537C668.967 61.3927 672.431 57.0287 676.434 55.0477C681.025 52.7747 684.134 52.5357 687.283 54.2127Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="url(#footerLogoRedGrad)"
            />
            <circle cx="340" cy="13.1626" r="13" fill="url(#footerLogoDotGrad)" />
            <path
              d="M327.5 9.66257C330.556 3.82987 333.406 2.03997 339.5 0.162567C335.5 0.162567 330 2.66257 328 8.16257L327.5 9.66257Z"
              fill="#FFFFFF"
            />
            <defs>
              <linearGradient
                id="footerLogoBoltGrad"
                x1="115.75"
                y1="16.1626"
                x2="115.75"
                y2="94.6626"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EF4444" />
                <stop offset="1" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient
                id="footerLogoRedGrad"
                x1="594.811"
                y1="4.16257"
                x2="594.811"
                y2="108.663"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EF4444" />
                <stop offset="1" stopColor="#B91C1C" />
              </linearGradient>
              <linearGradient
                id="footerLogoDotGrad"
                x1="340"
                y1="0.162567"
                x2="340"
                y2="26.1626"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#EF4444" />
                <stop offset="1" stopColor="#B91C1C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </footer>
  );
}

