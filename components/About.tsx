import React from 'react';
import { FadeIn } from './FadeIn';

const AREAS = [
    { title: 'n8n Workflows', icon: 'fa-diagram-project', color: 'text-brand-accent' },
    { title: 'AI Integration', icon: 'fa-brain', color: 'text-brand-black' },
    { title: 'VPS DevOps', icon: 'fa-server', color: 'text-gray-600' },
    { title: 'Web Development', icon: 'fa-code', color: 'text-gray-400' },
];

export const About: React.FC = () => {
    return (
        <section id="about" className="py-24 bg-white border-y border-brand-border relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                    <div className="lg:col-span-7">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-10 tracking-tight">About Me</h2>
                        </FadeIn>
                        <div className="prose prose-lg text-gray-600 space-y-8 leading-loose font-light">
                            <FadeIn delay={100}>
                                <p>
                                    I'm Akeem (Lanre), an AI Automation Engineer and Full-Stack Developer dedicated to creating efficient, high-impact solutions that drive growth. I'm the founder of <span className="text-brand-accent font-medium">MetroHyp Digital</span>, where I architect advanced workflows, AI-powered systems, and scalable web applications.
                                </p>
                            </FadeIn>
                            <FadeIn delay={200}>
                                <p>
                                    With over 3 years of specialized experience in <span className="text-brand-accent font-medium">n8n workflow automation</span>, I've built systems that produce 50-100 videos monthly, handle 1,000+ WhatsApp messages daily, and manage infrastructure serving 100,000+ monthly active users. My work combines AI API integration (Groq, OpenRouter, OpenAI), cloud infrastructure (Docker, VPS), and full-stack development.
                                </p>
                            </FadeIn>
                            <FadeIn delay={300}>
                                <p>
                                    My approach prioritizes <span className="text-brand-accent font-medium">clean architecture</span> and <span className="text-brand-accent font-medium">API-first design</span>, enabling me to deploy 30+ production applications and reduce client development costs by 40-60% through efficient system design.
                                </p>
                            </FadeIn>
                        </div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-2 gap-5">
                        {AREAS.map((area, index) => (
                            <FadeIn key={area.title} delay={400 + (index * 100)}>
                                <div className="bg-white p-8 rounded-2xl border border-brand-border hover:border-brand-accent/50 hover:shadow-lg transition-all group h-full">
                                    <i className={`fa-solid ${area.icon} text-3xl ${area.color} mb-6 group-hover:scale-110 transition-transform`}></i>
                                    <h3 className="font-serif text-brand-black text-xl italic">{area.title}</h3>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};