"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

if (typeof window !== "undefined") {
  const ScrollTrigger = require("gsap/dist/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioGrid() {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  const projects = [
    { 
      title: "Project 1",
      description: "A cutting-edge web application",
      image: "/projects/project1.png",
      link: "#"
    },
    { 
      title: "Project 2",
      description: "Mobile-first responsive design",
      image: "/projects/project2.png",
      link: "#"
    },
    { 
      title: "Project 3",
      description: "Interactive user experience",
      image: "/projects/project3.png",
      link: "#"
    }
  ];

  useEffect(() => {
    if (gridRef.current && cardsRef.current.length) {
      // Create stagger effect for cards
      gsap.fromTo(cardsRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: -15,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add hover animations for each card
      cardsRef.current.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-10 neon-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          PORTFOLIO
        </motion.h2>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden 
                border border-gray-200/10 dark:border-gray-700/50 hover:border-primary/50
                transition-all duration-300"
            >
              {project.image && (
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}

              <div className="p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="inline-flex items-center text-primary hover:text-blue-500 transition-colors"
                >
                  Learn More →
                </a>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
