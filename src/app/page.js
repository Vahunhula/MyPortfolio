import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioGrid from "@/components/PortfolioGrid";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills"; // Import Skills
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="projects"><Projects /></section>
      <section id="skills"><Skills /></section> {/* Added Skills Section */}
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}
