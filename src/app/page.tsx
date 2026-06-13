'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import FeaturedCourses from './components/FeaturedCourses';
import Pillars from './components/Pillars';
import QuoteSection from './components/QuoteSection';
import Stats from './components/Stats';
import Authors from './components/Authors';
import CTACover from './components/CTACover';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#0a0a0a' }}>
      <Navbar />
      <Hero />
      <Marquee />
      <Manifesto />
      <FeaturedCourses />
      <Pillars />
      <QuoteSection />
      <Stats />
      <Authors />
      <CTACover />
      <Footer />
    </div>
  );
}