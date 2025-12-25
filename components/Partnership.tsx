import React from 'react';
import { PartnerReason } from '../types';
import { FadeIn } from './FadeIn';

const REASONS: PartnerReason[] = [
    {
        iconClass: 'fa-microchip',
        iconColorClass: 'text-brand-accent',
        iconWrapperHoverBorder: 'group-hover:border-brand-accent',
        title: 'Technical Understanding',
        description: 'I don’t just promote servers—I use them every day to run crypto nodes, EAs, automated processes, and backend tools. I understand uptime, processor allocation, RAM usage, network performance, and what buyers look for.'
    },
    {
        iconClass: 'fa-chart-line',
        iconColorClass: 'text-brand-black',
        iconWrapperHoverBorder: 'group-hover:border-brand-black',
        title: 'Proven Marketing Expertise',
        description: 'I’ve built and managed campaigns across multiple platforms, consistently driving high-quality traffic that converts.'
    },
    {
        iconClass: 'fa-users-viewfinder',
        iconColorClass: 'text-gray-600',
        iconWrapperHoverBorder: 'group-hover:border-gray-600',
        title: 'Content That Resonates',
        description: 'My audience trusts my recommendations because they come from real-world testing and hands-on experience, not just surface-level promotion.'
    },
    {
        iconClass: 'fa-cogs',
        iconColorClass: 'text-gray-400',
        iconWrapperHoverBorder: 'group-hover:border-gray-400',
        title: 'Automation & Scalability',
        description: 'Every system I build is designed for long-term growth: automated, clean, optimized, and scalable.'
    }
];

export const Partnership: React.FC = () => {
    return (
        <section id="why-partner" className="py-24 relative overflow-hidden border-t border-brand-border bg-brand-secondary z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn direction="down">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-16 text-center tracking-tight">Why Brands Partner With Me</h2>
                </FadeIn>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
                    {REASONS.map((reason, index) => (
                        <FadeIn key={reason.title} delay={index * 150} direction="up">
                            <div className="flex gap-8 group">
                                <div className="flex-shrink-0">
                                    <div className={`w-14 h-14 rounded-full bg-white border border-brand-border flex items-center justify-center ${reason.iconWrapperHoverBorder} transition-colors shadow-sm`}>
                                        <i className={`fa-solid ${reason.iconClass} ${reason.iconColorClass} text-xl`}></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif text-brand-black mb-4">{reason.title}</h3>
                                    <p className="text-gray-600 leading-loose font-light">
                                        {reason.description}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};