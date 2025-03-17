"use client";
import { motion } from "framer-motion";

export default function PortfolioGrid() {
  const projects = [
    { title: "Project 1" },
    { title: "Project 2" },
    { title: "Project 3" },
  ];

  return (
    <section id="portfolio" className="py-20 px-6 bg-gray-900 text-white">
      <motion.h2 
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        PORTFOLIO
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg transition transform hover:scale-105"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">{project.title}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
