import React from 'react';
import { ServiceItem } from '../types';
import { FadeIn } from './FadeIn';
import { Link } from 'react-router-dom';

const SERVICES: ServiceItem[] = [
    {
        iconClass: 'fa-diagram-project',
        iconColorClass: 'text-brand-accent',
        description: 'n8n workflow automation for business: self-hosted n8n on VPS, AI agents, webhooks, and API integrations. 3+ years building systems that handle 1,000+ daily WhatsApp messages and automated email campaigns.'
    },
    {
        iconClass: 'fa-brain',
        iconColorClass: 'text-brand-black',
        description: 'AI integration with LLM APIs — Groq, OpenRouter, OpenAI — for automated content generation, AI chatbots, and intelligent business systems that produce 50-100 videos monthly.'
    },
    {
        iconClass: 'fa-code',
        iconColorClass: 'text-gray-500',
        description: 'Full-stack web development in JavaScript, Python, PHP, Firebase, and Supabase. 30+ production applications deployed serving 100,000+ monthly active users.'
    },
    {
        iconClass: 'fa-server',
        iconColorClass: 'text-gray-400',
        description: 'VPS hosting setup and Linux server administration — HestiaCP, Docker, Dokploy, Coolify. From choosing the cheapest VPS to deploying production-grade infrastructure.'
    },
    {
        iconClass: 'fa-chart-line',
        iconColorClass: 'text-brand-accent',
        description: 'Forex trading bots and algorithmic trading systems — MT5 Expert Advisors (EAs), crypto trading bots, and prop firm challenge automation for consistent returns.'
    }
];

export const Expertise: React.FC = () => {
    return (
        <section id="expertise" className="py-24 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-20">
                    <FadeIn direction="up">
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-8 tracking-tight">What I Do</h2>
                    </FadeIn>
                    <FadeIn delay={200} direction="up">
                        <p className="text-gray-600 text-xl max-w-3xl font-light">
                            n8n automation, AI integration, VPS infrastructure, trading bots, and crypto node operations — I design seamless systems that transform how businesses operate.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, index) => (
                        <FadeIn key={index} delay={index * 100}>
                            <div className="bg-white p-10 rounded-3xl hover:-translate-y-1 transition-transform duration-300 border border-brand-border hover:shadow-lg group h-full">
                                <i className={`fa-solid ${service.iconClass} text-2xl ${service.iconColorClass} mb-6 group-hover:text-brand-accent transition-colors`}></i>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}

                    <FadeIn delay={SERVICES.length * 100}>
                        <div className="bg-brand-secondary p-10 rounded-3xl border border-brand-border flex items-center h-full">
                            <p className="text-brand-black font-serif italic text-xl leading-relaxed">
                                "My combination of clean architecture and API-first design reduces client development costs by 40-60% while improving system reliability."
                            </p>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link to="/guides/n8n-automation" className="block p-6 rounded-2xl border border-brand-border hover:border-brand-accent/50 hover:shadow-lg transition-all group">
                            <i className="fa-solid fa-diagram-project text-brand-accent text-xl mb-3"></i>
                            <h3 className="font-serif text-brand-black font-medium">n8n Automation Guide</h3>
                            <p className="text-sm text-gray-500">Complete workflow automation guide</p>
                        </Link>
                        <Link to="/guides/vps-hosting-guide" className="block p-6 rounded-2xl border border-brand-border hover:border-brand-accent/50 hover:shadow-lg transition-all group">
                            <i className="fa-solid fa-server text-brand-accent text-xl mb-3"></i>
                            <h3 className="font-serif text-brand-black font-medium">Cheapest VPS Guide</h3>
                            <p className="text-sm text-gray-500">Best VPS hosting 2026</p>
                        </Link>
                        <Link to="/guides/algorithmic-trading" className="block p-6 rounded-2xl border border-brand-border hover:border-brand-accent/50 hover:shadow-lg transition-all group">
                            <i className="fa-solid fa-chart-line text-brand-accent text-xl mb-3"></i>
                            <h3 className="font-serif text-brand-black font-medium">Forex Trading Bots</h3>
                            <p className="text-sm text-gray-500">MT5 Expert Advisors</p>
                        </Link>
                        <Link to="/guides/crypto-node-ops" className="block p-6 rounded-2xl border border-brand-border hover:border-brand-accent/50 hover:shadow-lg transition-all group">
                            <i className="fa-solid fa-coins text-brand-accent text-xl mb-3"></i>
                            <h3 className="font-serif text-brand-black font-medium">Crypto Node Guide</h3>
                            <p className="text-sm text-gray-500">DePIN passive income</p>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};