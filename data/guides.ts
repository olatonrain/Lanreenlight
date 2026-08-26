export interface GuideEntry {
    path: string;
    title: string;
    description: string;
    eyebrow: string;
    icon: string;
    color: string;
    topics: string[];
    readTime: string;
}

export const GUIDES: GuideEntry[] = [
    {
        path: '/guides/n8n-automation',
        title: 'AI Automation Guide',
        description: 'n8n workflow automation, Docker self-hosting on a cheap VPS, AI agent integration (OpenAI, Groq, OpenRouter), and n8n vs Zapier vs Make.',
        eyebrow: 'AI Workflow Automation Guide',
        icon: 'fa-diagram-project',
        color: '#c5a028',
        topics: ['n8n', 'Docker', 'AI Agents', 'Webhooks', 'Self-Hosting'],
        readTime: '15 min',
    },
    {
        path: '/guides/vps-hosting-guide',
        title: 'Cheapest VPS Guide',
        description: 'VPS pricing and spec comparison for n8n, trading bots, crypto nodes, and web apps. Step-by-step setup and security hardening checklists.',
        eyebrow: 'VPS Hosting Guide',
        icon: 'fa-server',
        color: '#2563eb',
        topics: ['VPS', 'Docker', 'Security', 'HestiaCP', 'Budget'],
        readTime: '12 min',
    },
    {
        path: '/guides/algorithmic-trading',
        title: 'Forex Trading Bots Guide',
        description: 'How Expert Advisors work, choosing EAs without getting scammed, passing prop firm challenges, and running bots 24/7 on a cheap VPS.',
        eyebrow: 'Forex Trading Bot Guide',
        icon: 'fa-chart-line',
        color: '#16a34a',
        topics: ['MT5', 'Expert Advisors', 'Prop Firms', 'Backtesting', 'Risk'],
        readTime: '14 min',
    },
    {
        path: '/guides/crypto-node-ops',
        title: 'Crypto Node Operations Guide',
        description: 'Running DePIN and validator nodes for passive income on cheap VPS hardware. From an operator running nodes since 2020 — project evaluation, setup, earnings.',
        eyebrow: 'Crypto Node Operations Guide',
        icon: 'fa-coins',
        color: '#9333ea',
        topics: ['DePIN', 'Nodes', 'Passive Income', 'Validators', 'Staking'],
        readTime: '13 min',
    },
    {
        path: '/guides/web-development',
        title: 'Full-Stack Web Development Guide',
        description: 'Stack selection (React, Next.js, Vite), backend architecture, database design, VPS deployment with Docker, Core Web Vitals, and OWASP security.',
        eyebrow: 'Web Development Guide',
        icon: 'fa-code',
        color: '#ea580c',
        topics: ['React', 'TypeScript', 'Vite', 'Docker', 'OWASP'],
        readTime: '16 min',
    },
    {
        path: '/guides/app-development',
        title: 'App Development Guide',
        description: 'PWA vs native, React Native vs Flutter, app store optimization, monetization strategies, and launch playbook from idea to production.',
        eyebrow: 'App Development Guide',
        icon: 'fa-mobile-screen',
        color: '#0d9488',
        topics: ['PWA', 'React Native', 'ASO', 'Monetization', 'Launch'],
        readTime: '12 min',
    },
    {
        path: '/guides/agentrouter-setup',
        title: 'AgentRouter Setup Guide',
        description: 'Setting up the AgentRouter API gateway with OpenCode, Claude CLI, Claude App, Google Antigravity, and OmniRoute on a cheap VPS for free Claude Code credit.',
        eyebrow: 'AI Coding Agents Guide',
        icon: 'fa-route',
        color: '#0891b2',
        topics: ['AI Agents', 'Claude Code', 'API Gateway', 'LLM Routing', 'Free Credit'],
        readTime: '10 min',
    },
];