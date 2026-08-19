import React from 'react';
import { GuidesLayout } from './GuidesLayout';

export const WebDevelopmentGuide: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <GuidesLayout
            eyebrow="Web Development Guide"
            title={`Full-Stack Web Development Guide: Build, Launch, and Scale`}
            subtitle="Learn how to build production web applications in ${currentYear} — choosing the right stack (React, Next.js, Vite), backend architecture (Node, Python, PHP), database design, deployment, and performance optimization."
            intro={`A production web application is a complete system: frontend, backend, database, hosting, and monitoring. This guide covers the full lifecycle — from picking a stack that matches your business, to deploying on a VPS and scaling past 100,000 monthly users. I've built 30+ production applications with this exact blueprint, serving 100K+ MAU.`}
            sections={[
                {
                    title: "Choosing the Right Web Development Stack",
                    content: [
                        "The best stack is the one your team can maintain — not the trendiest one. For most businesses, React + a type-safe backend (Node/TypeScript or Python) + PostgreSQL covers 90% of use cases. For content-heavy or SEO-critical sites, add server-side rendering (Next.js or Astro).",
                        "React 19 with Vite is my default frontend — instant builds, excellent DX, and full TypeScript support. For lightweight marketing sites, static generation with Vite + Tailwind is simpler and faster than a heavy framework.",
                        `For ${currentYear}, evaluate the full picture: hosting cost, team skills, deployment complexity, and SEO needs. A $10/month VPS can serve a React SPA with an API backend that scales to 100K monthly users when configured properly.`
                    ]
                },
                {
                    title: "Frontend Development: React, TypeScript, and Tailwind",
                    content: [
                        "Modern frontend development means component-based architecture. React 19 with TypeScript gives you type safety at every boundary — props, API responses, and state transitions — catching bugs before users do. I structure components for reusability and testability, not just visual output.",
                        "Styling with Tailwind CSS keeps design systems consistent without CSS-module sprawl. The key is establishing a design token system early: colors, spacing, and typography scale — so every developer and AI agent working on the codebase follows the same language.",
                        "Performance is a feature: code-split routes, lazy-load below-the-fold components, preload critical assets, and keep your main bundle lean. A sub-2-second load time on mobile is table stakes for retention and Core Web Vitals."
                    ]
                },
                {
                    title: "Backend Development: APIs, Authentication, and Databases",
                    content: [
                        "A clean, API-first backend separates concerns: authentication, business logic, and data access. REST remains the most compatible choice; GraphQL or tRPC add value when your data graph is complex. Document with OpenAPI so clients and AI agents can integrate reliably.",
                        "Authentication is non-negotiable: use battle-tested solutions (Supabase Auth, Clerk, or JWT with proper refresh rotation) rather than rolling your own. Never store passwords as plain text — always hash with bcrypt/argon2.",
                        "Database choice matters: PostgreSQL for relational data and transactions, MongoDB for flexible document schemas, Redis for caching and queues. Design your schema around query patterns, add indexes to match your hot paths, and always set up automated backups."
                    ]
                },
                {
                    title: "Deployment and Server Management",
                    content: [
                        "Deployment is where most projects break. Use containerization (Docker) for consistency, a reverse proxy (Nginx or Caddy) with automatic HTTPS, and a process manager to keep services alive. My production stack: VPS + Docker + Nginx + PostgreSQL — the same setup I document in the Cheapest VPS Guide.",
                        "Set up CI/CD from day one: every push to main triggers a build, runs checks, and deploys automatically. This removes the 'works on my machine' class of bugs and makes rollbacks trivial.",
                        "Monitoring is the difference between a hobby project and a business system: uptime checks, error tracking, and server metrics (CPU, RAM, disk). Configure log rotation and alerting before you need them — you'll always need them."
                    ]
                },
                {
                    title: "Performance, SEO, and Core Web Vitals",
                    content: [
                        "Google ranks pages that load fast. Focus on Core Web Vitals: LCP under 2.5s, INP under 200ms, CLS under 0.1. Practical wins: optimize images (WebP, lazy loading), minify and cache static assets, and use a CDN for global audiences.",
                        "For SEO in an SPA, you must make content crawlable: server-side rendering or static generation for content routes, per-page meta tags and canonical URLs, a sitemap, and structured data. I implement dynamic canonical tags so every route declares its own identity.",
                        "Measure everything: GA4 for traffic, Search Console for rankings, and real-user monitoring for performance. Data tells you what to optimize — opinions don't."
                    ]
                },
                {
                    title: "Security: OWASP Top 10 in Practice",
                    content: [
                        "Every public web app gets attacked. Harden the basics: TLS everywhere, input validation and parameterized queries (SQL injection), escaping output (XSS), CSRF tokens on state-changing requests, and rate limiting on authentication endpoints.",
                        "Apply least-privilege everywhere: database users with scoped grants, secrets in environment variables (never in code), and rotated keys. Run dependency audits in CI to catch known CVEs before they ship.",
                        "Backup and restore drills: test that you can actually recover from your backups. A backup you can't restore is just stored hope."
                    ]
                },
                {
                    title: "App Development: From Web App to Mobile",
                    content: [
                        "When your web app needs a mobile presence, you have three paths: responsive web (fastest, works everywhere), PWA (installable, offline-capable), or native/React Native (store presence, hardware APIs). Most businesses should start with a PWA and graduate to React Native when native features are required.",
                        "React Native shares your React knowledge and lets you ship to iOS and Android from one codebase. Expo simplifies the build pipeline — over-the-air updates, easy device testing, and native module access when you need it.",
                        "Full mobile development strategy — from store listings to push notifications to monetization — lives in the App Development Guide."
                    ]
                }
            ]}
            faqs={[
                {
                    question: "What is the best tech stack for web development?",
                    answer: "React + TypeScript + PostgreSQL covers most production needs, with Next.js for SEO-heavy sites. The best stack is the one your team can maintain and deploy reliably — not the trendiest."
                },
                {
                    question: "How much does it cost to build a website?",
                    answer: "A marketing site costs $500-3,000; a custom web application with backend and database ranges $5,000-25,000+. Hosting runs $10-60/month on a VPS. Building on a VPS instead of expensive PaaS cuts ongoing costs significantly."
                },
                {
                    question: "Do I need a developer for a website or can I use a website builder?",
                    answer: "Website builders (WordPress, Wix) are fine for simple brochure sites. For custom functionality, integrations, or scale past basic templates, a developer building with a proper stack is more cost-effective long-term."
                },
                {
                    question: "How long does it take to build a web application?",
                    answer: "A production MVP typically takes 4-8 weeks: architecture and setup (1 week), core features (2-4 weeks), polish and testing (1-2 weeks), and deployment hardening (1 week). Scope control is the biggest lever on timeline."
                },
                {
                    question: "What makes a website rank on Google?",
                    answer: "Fast load times (Core Web Vitals), crawlable content (SSR/SSG or proper SPA handling), per-page meta and canonical tags, a sitemap, structured data, authoritative content, and quality backlinks. Technical SEO is necessary but not sufficient — content and authority win."
                }
            ]}
            ctaTitle="Need a Web Application Built Right?"
            ctaText="I architect and build production web applications — React frontends, clean APIs, and VPS deployment that scales. The same 30+ apps serving 100K+ monthly users."
            ctaLink="/#contact"
            ctaLabel="Get a Web App Built"
            relatedGuides={[
                {
                    title: "Cheapest VPS Guide",
                    link: "/guides/vps-hosting-guide",
                    description: "Host your web app on a VPS"
                },
                {
                    title: "AI Automation Guide",
                    link: "/guides/n8n-automation",
                    description: "Automate your app workflows"
                },
                {
                    title: "App Development Guide",
                    link: "/guides/app-development",
                    description: "Take your app to mobile"
                },
                {
                    title: "Crypto Node Guide",
                    link: "/guides/crypto-node-ops",
                    description: "Web3 and blockchain services"
                },
            ]}
        />
    );
};

export default WebDevelopmentGuide;