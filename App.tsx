import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { Partnership } from './components/Partnership';
import { Stats } from './components/Stats';
import { Algorithms } from './components/Algorithms';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Background Noise Layer */}
      <div className="bg-noise"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Expertise />
        <Partnership />
        <Stats />
        <Algorithms />
        <Contact />
      </main>
    </div>
  );
}

export default App;