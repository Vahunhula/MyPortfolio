"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  SiReact, 
  SiNextdotjs, 
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiAmazonaws,
  SiPostgresql
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", icon: SiReact, level: "Advanced", color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, level: "Advanced", color: "#000000" },
  { name: "JavaScript", icon: SiJavascript, level: "Advanced", color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, level: "Advanced", color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, level: "Advanced", color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, level: "Intermediate", color: "#47A248" },
  { name: "Python", icon: SiPython, level: "Intermediate", color: "#3776AB" },
  { name: "Docker", icon: SiDocker, level: "Intermediate", color: "#2496ED" },
  { name: "Git", icon: SiGit, level: "Advanced", color: "#F05032" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: "Advanced", color: "#06B6D4" },
  { name: "AWS", icon: SiAmazonaws, level: "Intermediate", color: "#232F3E" },
  { name: "PostgreSQL", icon: SiPostgresql, level: "Intermediate", color: "#4169E1" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96]
    }
  }
};

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      gsap.to(cardRef.current.querySelector('.progress-bar'), {
        width: getProgressWidth(skill.level),
        duration: 1,
        ease: "power2.out"
      });
    }
  }, [isInView, skill.level]);

  const getProgressWidth = (level) => {
    switch (level) {
      case "Advanced": return "90%";
      case "Intermediate": return "75%";
      case "Beginner": return "60%";
      default: return "70%";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      className="glass-morphism p-6 rounded-xl relative group hardware-accelerated skill-card"
      style={{
        willChange: 'transform',
        transform: 'translate3d(0,0,0)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start gap-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${skill.color}20` }}
        >
          <skill.icon 
            className="w-8 h-8"
            style={{ color: skill.color }}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <div 
              className="progress-bar h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">{skill.level}</p>
        </div>
      </div>
      
      <div 
        className="absolute inset-0 rounded-xl border border-gray-200/10 pointer-events-none"
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
        }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const skillsRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      gsap.timeline()
        .from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .from(skillsRef.current.querySelectorAll('.skill-card'), {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.4");
    }
  }, [isInView]);

  return (
    <section className="py-20 px-6" ref={skillsRef}>
      <div className="container mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are the technologies I work with and my proficiency levels in each.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
