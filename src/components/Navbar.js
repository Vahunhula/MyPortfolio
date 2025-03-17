"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false); // Close menu after click
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-lg text-white shadow-md z-50 px-6 py-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">Vakhtangi Sheklashvili</h1>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-12">
          {["home", "about", "projects", "skills", "contact"].map((section, index) => (
            <li key={index} className="relative group">
              {section === "Skills" ? (
                <Link href="/Skills" passHref>
                  <span className="text-lg font-medium tracking-wide hover:text-gray-300 transition duration-300 cursor-pointer">
                    Skills
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(section)}
                  className="text-lg font-medium tracking-wide hover:text-gray-300 transition duration-300"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )}
              {/* Underline Animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-black/90 text-white text-center py-6 lg:hidden"
          >
            <ul className="space-y-6">
              {["home", "about", "projects", "skills", "contact"].map((section, index) => (
                <li key={index}>
                  {section === "Skills" ? (
                    <Link href="/Skills" passHref>
                      <span
                        className="text-xl font-medium hover:text-gray-400 transition duration-300 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        Skills
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(section)}
                      className="text-xl font-medium hover:text-gray-400 transition duration-300"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
