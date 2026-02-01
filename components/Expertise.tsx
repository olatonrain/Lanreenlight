import React from 'react';
import { ServiceItem } from '../types';
import { FadeIn } from './FadeIn';

const SERVICES: ServiceItem[] = [
    {
        iconClass: 'fa-diagram-project',
        iconColorClass: 'text-brand-accent',
        description: 'Expert in n8n workflow automation with 3+ years experience building systems that handle 1,000+ daily WhatsApp messages and automated email campaigns.'
    },
    {
        iconClass: 'fa-brain',
        iconColorClass: 'text-brand-black',
        description: 'Integrating LLM APIs (Groq, OpenRouter, OpenAI) for AI-powered content generation, automation, and intelligent systems that produce 50-100 videos monthly.'
    },
    {
        iconClass: 'fa-code',
        iconColorClass: 'text-gray-500',
        description: 'Deployed 30+ production web applications serving 100,000+ monthly active users using JavaScript, Python, PHP, Firebase, and Supabase.'
    },
    {
        iconClass: 'fa-server',
        iconColorClass: 'text-gray-400',
        description: 'Managing cloud infrastructure with Docker, VPS administration (HestiaCP, Dokploy, Coolify), and Ubuntu/Linux server optimization.'
    },
    {
        iconClass: 'fa-chart-line',
        iconColorClass: 'text-brand-accent',
        description: 'Creating revenue-generating systems including trading bots (MT5/crypto/forex), automated content engines, and business process automation platforms.'
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
                            I build automation workflows, AI-powered systems, and scalable web applications that generate revenue and eliminate manual work.
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
                                "My ability to combine clean architecture with API-first design enables me to reduce client development costs by 40-60%."
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};