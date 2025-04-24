"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(options = {}) {
  const elementRef = useRef(null);
  const {
    animation = 'fadeIn', // fadeIn, slideUp, scale
    threshold = 0.2,
    duration = 1,
    delay = 0,
    distance = 50,
    scale = 0.95,
    ease = "power3.out",
    stagger = 0,
    markers = false,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${(1 - threshold) * 100}%`,
        end: `bottom ${threshold * 100}%`,
        markers,
        toggleActions: "play none none reverse"
      }
    });

    const children = stagger ? element.children : [element];
    const baseConfig = {
      duration,
      ease,
      delay: Array.isArray(children) ? gsap.utils.distribute({
        base: delay,
        amount: 0.5,
        from: "start"
      }) : delay
    };

    switch (animation) {
      case 'fadeIn':
        tl.from(children, {
          ...baseConfig,
          opacity: 0,
          y: distance
        });
        break;

      case 'slideUp':
        tl.from(children, {
          ...baseConfig,
          opacity: 0,
          y: distance,
          stagger: stagger ? 0.2 : 0
        });
        break;

      case 'scale':
        tl.from(children, {
          ...baseConfig,
          opacity: 0,
          scale,
          stagger: stagger ? 0.1 : 0
        });
        break;

      case 'custom':
        // For custom animations defined by the component
        break;

      default:
        tl.from(children, {
          ...baseConfig,
          opacity: 0,
          y: 20
        });
    }

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animation, threshold, duration, delay, distance, scale, ease, stagger, markers]);

  return elementRef;
}

// Helper hook for parallax effects
export function useParallax(options = {}) {
  const elementRef = useRef(null);
  const {
    speed = 0.5,
    direction = 'vertical',
    ease = "none",
    markers = false
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const movement = direction === 'vertical' ? 
      { y: `${speed * 100}%` } : 
      { x: `${speed * 100}%` };

    gsap.to(element, {
      ...movement,
      ease,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [speed, direction, ease, markers]);

  return elementRef;
}