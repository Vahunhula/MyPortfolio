"use client";
import { motion, AnimatePresence } from "framer-motion";

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 30,
      stiffness: 200
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 30,
      stiffness: 200
    }
  })
};

const fadeVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

export default function PageTransition({ children, mode = "fade" }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={window.location.pathname}
        variants={mode === "slide" ? slideVariants : fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={1}
        className="min-h-screen will-change-transform hardware-accelerated"
        style={{
          willChange: 'transform, opacity',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(15, 240, 252, 0.05) 0%, transparent 70%)',
            mixBlendMode: 'plus-lighter'
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}