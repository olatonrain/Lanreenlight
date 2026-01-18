// Deployment Trigger: 2026-01-18 16:28
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { Partnership } from './components/Partnership';
import { Stats } from './components/Stats';
import { Algorithms } from './components/Algorithms';
import { VideoHub } from './components/VideoHub';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';

const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Expertise />
    <VideoHub />
    <Partnership />
    <Stats />
    <Algorithms />
    <Contact />
  </main>
);

function App() {
  return (
    <Router>
      <div className="bg-brand-white min-h-screen">
        {/* Background Noise Layer */}
        <div className="bg-noise"></div>

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
