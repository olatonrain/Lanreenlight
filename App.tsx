import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { Partnership } from './components/Partnership';
import { Stats } from './components/Stats';
import { Algorithms } from './components/Algorithms';
import { VideoHub } from './components/VideoHub';
import { LatestPosts } from './components/LatestPosts';
import { Contact } from './components/Contact';
import { Seo } from './components/Seo';
import { personSchema, websiteSchema } from './data/schema';
import { CanonicalLink } from './components/CanonicalLink';

const GuidesIndex = lazy(() => import('./components/GuidesIndex').then(m => ({ default: m.GuidesIndex })));
const Blog = lazy(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const BlogPostPage = lazy(() => import('./components/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const N8nGuide = lazy(() => import('./components/N8nGuide').then(m => ({ default: m.N8nGuide })));
const VpsGuide = lazy(() => import('./components/VpsGuide').then(m => ({ default: m.VpsGuide })));
const TradingGuide = lazy(() => import('./components/TradingGuide').then(m => ({ default: m.TradingGuide })));
const CryptoNodeGuide = lazy(() => import('./components/CryptoNodeGuide').then(m => ({ default: m.CryptoNodeGuide })));
const WebDevelopmentGuide = lazy(() => import('./components/WebDevelopmentGuide').then(m => ({ default: m.WebDevelopmentGuide })));
const AppDevelopmentGuide = lazy(() => import('./components/AppDevelopmentGuide').then(m => ({ default: m.AppDevelopmentGuide })));
const AgentrouterGuide = lazy(() => import('./components/AgentrouterGuide').then(m => ({ default: m.AgentrouterGuide })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/TermsOfService').then(m => ({ default: m.TermsOfService })));
const PortfolioPage = lazy(() => import('./components/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));

const RouteFallback = () => (
  <div className="min-h-screen bg-brand-white flex items-center justify-center pt-32">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
  </div>
);

const HomePage = () => (
  <main>
    <Seo
      title="Lanre | AI Automation & Systems Engineer"
      description="AI Automation Engineer specializing in building scalable revenue-generating systems using n8n, Python, and cloud infrastructure. Founder of MetroHyp Digital."
      path="/"
      jsonLd={[personSchema, websiteSchema]}
    />
    <Hero />
    <About />
    <Expertise />
    <VideoHub />
    <LatestPosts />
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

        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/guides" element={<GuidesIndex />} />
            <Route path="/guides/n8n-automation" element={<N8nGuide />} />
            <Route path="/guides/vps-hosting-guide" element={<VpsGuide />} />
            <Route path="/guides/algorithmic-trading" element={<TradingGuide />} />
            <Route path="/guides/crypto-node-ops" element={<CryptoNodeGuide />} />
            <Route path="/guides/web-development" element={<WebDevelopmentGuide />} />
            <Route path="/guides/app-development" element={<AppDevelopmentGuide />} />
            <Route path="/guides/agentrouter-setup" element={<AgentrouterGuide />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
