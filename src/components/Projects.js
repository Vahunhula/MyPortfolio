"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, and payment processing.",
    image: "/projects/ecommerce.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates. Built using React, Firebase, and Material-UI.",
    image: "/projects/taskapp.png",
    tags: ["React", "Firebase", "Material-UI"],
    github: "https://github.com/yourusername/taskapp",
    demo: "https://taskapp-demo.com",
  },
  {
    title: "AI Image Generator",
    description: "An AI-powered image generation tool that creates unique artwork based on text descriptions using OpenAI's DALL-E API.",
    image: "/projects/aigen.png",
    tags: ["Python", "Flask", "OpenAI API", "React"],
    github: "https://github.com/yourusername/ai-gen",
    demo: "https://ai-gen-demo.com",
  },
];

export default function Projects() {
  const projectsRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (projectsRef.current && cardRefs.current.length > 0) {
      // Create a parallax effect for project cards
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            rotateY: 15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center",
              scrub: 1
            }
          }
        );

        // Add hover effect animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "none"
          });
        });
      });

      // Animate project images
      cardRefs.current.forEach(card => {
        const image = card.querySelector('.project-image');
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-20 px-6" ref={projectsRef}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 neon-text">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => cardRefs.current[index] = el}
              className="group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden 
                border border-gray-200/10 dark:border-gray-700/50 hover:border-primary/50
                transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">No image</span>
                  </div>
                )}
              </div>

              <div className="p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiGithub className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
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