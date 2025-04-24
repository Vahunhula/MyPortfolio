"use client";
import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';

export default function Footer() {
  const footerRef = useRef(null);
  const yearRef = useRef(new Date().getFullYear());

  useEffect(() => {
    if (footerRef.current) {
      // Animate footer elements on scroll
      gsap.fromTo(footerRef.current.children,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const socialLinks = [
    { href: "https://github.com/Vahunhula", icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/vakhtangi-sheklashvili-3606a12b8/", icon: FaLinkedin, label: "LinkedIn" },
    { href: "mailto:vahoberkaci@gmail.com", icon: FaEnvelope, label: "Email" }
  ];

  return (
    <footer ref={footerRef} className="py-8 px-6 bg-black/20 backdrop-blur-lg border-t border-gray-200/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Vakhtangi Sheklashvili
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Full Stack Developer
            </p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                onMouseEnter={(e) => {
                  gsap.to(e.target, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200/10 text-center text-sm text-gray-400">
          <p>© {yearRef.current} Vakhtangi Sheklashvili. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
