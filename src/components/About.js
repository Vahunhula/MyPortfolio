"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiDownload, FiCode, FiCoffee, FiBook } from "react-icons/fi";

export default function About() {
  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Technologies", value: "15+" },
    { label: "Satisfied Clients", value: "10+" },
  ];

  const qualities = [
    {
      icon: FiCode,
      title: "Problem Solver",
      description: "I enjoy tackling complex problems and turning them into simple and beautiful solutions.",
    },
    {
      icon: FiCoffee,
      title: "Team Player",
      description: "Collaborative mindset with excellent communication skills for effective teamwork.",
    },
    {
      icon: FiBook,
      title: "Continuous Learner",
      description: "Always eager to learn new technologies and stay up-to-date with industry trends.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 blur-2xl opacity-20 rounded-xl" />
              <div className="relative rounded-xl overflow-hidden gradient-border aspect-[4/3]">
                <Image
                  src="/Profile.png"
                  alt="About Me"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-xl gradient-border text-center"
                >
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground mb-6">
                Hi! I&apos;m a passionate Full Stack Developer based in Georgia with a strong 
                foundation in web development. I specialize in building exceptional digital 
                experiences that combine beautiful design with efficient functionality.
              </p>
              <p className="text-muted-foreground mb-6">
                With expertise in both front-end and back-end development, I create 
                scalable solutions that help businesses grow and succeed in the digital world.
              </p>
            </div>

            <div className="space-y-6">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <quality.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{quality.title}</h3>
                    <p className="text-muted-foreground">{quality.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium 
                hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload className="w-4 h-4" />
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
