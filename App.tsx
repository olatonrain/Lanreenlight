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
import { BlogPostPage } from './components/BlogPostPage';
import { N8nGuide } from './components/N8nGuide';
import { VpsGuide } from './components/VpsGuide';
import { TradingGuide } from './components/TradingGuide';
import { CryptoNodeGuide } from './components/CryptoNodeGuide';
import { WebDevelopmentGuide } from './components/WebDevelopmentGuide';
import { AppDevelopmentGuide } from './components/AppDevelopmentGuide';
import { AgentrouterGuide } from './components/AgentrouterGuide';
import { CanonicalLink } from './components/CanonicalLink';

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
      <CanonicalLink />
      <div className="bg-brand-white min-h-screen">
        {/* Background Noise Layer */}
        <div className="bg-noise"></div>

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/guides/n8n-automation" element={<N8nGuide />} />
          <Route path="/guides/vps-hosting-guide" element={<VpsGuide />} />
          <Route path="/guides/algorithmic-trading" element={<TradingGuide />} />
          <Route path="/guides/crypto-node-ops" element={<CryptoNodeGuide />} />
          <Route path="/guides/web-development" element={<WebDevelopmentGuide />} />
          <Route path="/guides/app-development" element={<AppDevelopmentGuide />} />
          <Route path="/guides/agentrouter-setup" element={<AgentrouterGuide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
