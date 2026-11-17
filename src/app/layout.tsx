import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koelner / LievLyfe — Premium Design in Light Screen",
  description: "Specialist in Future Technology. Premium Light Screen Hero Section.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    if (registrations && registrations.length > 0) {
                      console.log('[LievLyfe] Found ' + registrations.length + ' active Service Worker(s) on localhost. Unregistering...');
                      var unregisterPromises = registrations.map(function(reg) {
                        return reg.unregister();
                      });
                      if ('caches' in window) {
                        caches.keys().then(function(names) {
                          names.forEach(function(name) {
                            caches.delete(name);
                          });
                        });
                      }
                      Promise.all(unregisterPromises).then(function() {
                        console.log('[LievLyfe] Successfully purged stale Service Workers and CacheStorage. Reloading clean page...');
                        window.location.reload();
                      });
                    }
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5F6F8] text-[#111113] font-sans">
        {children}
      </body>
    </html>
  );
}
