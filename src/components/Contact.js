"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const inputRefs = useRef([]);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });

    // Form entrance animation
    if (formRef.current) {
      timeline.fromTo(formRef.current,
        {
          opacity: 0,
          x: -50,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }
      );
    }

    // Contact info cards animation
    if (contactInfoRef.current) {
      timeline.fromTo(contactInfoRef.current.children,
        {
          opacity: 0,
          x: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        },
        "-=0.5" // Start slightly before the previous animation ends
      );
    }

    // Input field animations
    inputRefs.current.forEach(input => {
      if (input) {
        // Label float animation
        const label = input.previousElementSibling;
        if (label) {
          input.addEventListener('focus', () => {
            gsap.to(label, {
              y: -20,
              scale: 0.9,
              color: "#0ff0fc",
              duration: 0.3,
              ease: "power2.out"
            });
          });

          input.addEventListener('blur', () => {
            if (!input.value) {
              gsap.to(label, {
                y: 0,
                scale: 1,
                color: "inherit",
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
        }

        // Input field glow effect
        input.addEventListener('focus', () => {
          gsap.to(input, {
            boxShadow: "0 0 20px rgba(15, 240, 252, 0.2)",
            duration: 0.3
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            boxShadow: "none",
            duration: 0.3
          });
        });
      }
    });

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // Button loading animation
    if (submitButtonRef.current) {
      gsap.to(submitButtonRef.current, {
        scale: 0.95,
        duration: 0.2
      });
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
        
        // Success animation
        gsap.fromTo(".success-message",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
      
      // Error animation
      gsap.fromTo(".error-message",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    } finally {
      setIsSubmitting(false);
      
      // Reset button animation
      if (submitButtonRef.current) {
        gsap.to(submitButtonRef.current, {
          scale: 1,
          duration: 0.2
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    { icon: FiMail, text: "vahoberkaci@gmail.com", href: "mailto:vahoberkaci@gmail.com" },
    { icon: FiPhone, text: "+995 598 123 456", href: "tel:+995598123456" },
    { icon: FiMapPin, text: "Georgia", href: "https://maps.google.com" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 neon-text">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email"].map((field, index) => (
                <div key={field} className="relative">
                  <label 
                    htmlFor={field}
                    className="absolute left-4 top-3 transition-all duration-300 pointer-events-none text-gray-400"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    ref={el => inputRefs.current[index] = el}
                    className="w-full px-4 pt-6 pb-2 rounded-lg bg-white/5 backdrop-blur-lg 
                      border border-gray-200/10 dark:border-gray-700/50 focus:border-primary 
                      focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              ))}
              
              <div className="relative">
                <label 
                  htmlFor="message"
                  className="absolute left-4 top-3 transition-all duration-300 pointer-events-none text-gray-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  ref={el => inputRefs.current[2] = el}
                  className="w-full px-4 pt-6 pb-2 rounded-lg bg-white/5 backdrop-blur-lg 
                    border border-gray-200/10 dark:border-gray-700/50 focus:border-primary 
                    focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>

              <motion.button
                ref={submitButtonRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 
                  text-white font-medium hover:opacity-90 transition-all duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg 
                  hover:shadow-primary/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend className="w-4 h-4" />
                    </>
                  )}
                </span>
              </motion.button>

              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-lg flex items-center gap-2 ${
                      status.type === "success" 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-red-500/10 text-red-500"
                    } ${status.type === "success" ? "success-message" : "error-message"}`}
                  >
                    {status.type === "success" ? (
                      <FiCheckCircle className="w-5 h-5" />
                    ) : (
                      <FiAlertCircle className="w-5 h-5" />
                    )}
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-200/10 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-200/10 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-400">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}