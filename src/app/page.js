"use client";
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading';

const Navbar = lazy(() => import('@/components/Navbar'));
const Hero = lazy(() => import('@/components/Hero'));
const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>

      <main className="flex min-h-screen flex-col">
        <Suspense fallback={<Loading />}>
          <section id="home" className="animate-gpu">
            <Hero />
          </section>
        </Suspense>
        
        <Suspense fallback={<Loading />}>
          <section id="about" className="animate-gpu">
            <About />
          </section>
        </Suspense>
        
        <Suspense fallback={<Loading />}>
          <section id="skills" className="animate-gpu">
            <Skills />
          </section>
        </Suspense>
        
        <Suspense fallback={<Loading />}>
          <section id="projects" className="animate-gpu">
            <Projects />
          </section>
        </Suspense>
        
        <Suspense fallback={<Loading />}>
          <section id="contact" className="animate-gpu">
            <Contact />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
}
