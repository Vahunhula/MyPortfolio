"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Loading from "./Loading";
import PageTransition from "./PageTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    const smoothScroll = (target) => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power3.inOut"
      });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) smoothScroll(target);
      });
    });

    const ctx = gsap.context(() => {
      // Initialize parallax effects for sections
      gsap.utils.toArray('section').forEach((section) => {
        gsap.to(section, {
          yPercent: 30,
          opacity: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="font-sans antialiased min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
        <div className="relative z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-grid" />
          <PageTransition>
            <main className="relative">
              {children}
            </main>
          </PageTransition>
        </div>
      </div>
    </ThemeProvider>
  );
}