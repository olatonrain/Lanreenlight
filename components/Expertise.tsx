import React from 'react';
import { ServiceItem } from '../types';
import { FadeIn } from './FadeIn';

const SERVICES: ServiceItem[] = [
    {
        iconClass: 'fa-file-code',
        iconColorClass: 'text-brand-accent',
        description: 'Creating content that explains hosting features, performance benchmarks, pricing advantages, and real-world use cases.'
    },
    {
        iconClass: 'fa-bullseye',
        iconColorClass: 'text-brand-black',
        description: 'Running campaigns targeted at developers, crypto enthusiasts, and tech entrepreneurs.'
    },
    {
        iconClass: 'fa-filter',
        iconColorClass: 'text-gray-500',
        description: 'Building automated funnels that convert technical audiences at scale.'
    },
    {
        iconClass: 'fa-chalkboard-user',
        iconColorClass: 'text-gray-400',
        description: 'Educating users on VPS performance, node hosting, cloud reliability, and server optimization.'
    },
    {
        iconClass: 'fa-lightbulb',
        iconColorClass: 'text-brand-accent',
        description: 'Offering practical insights drawn from my own experience running crypto nodes, trading systems, and VPS-powered automation.'
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
                            I specialize in promoting hosting services, cloud infrastructure, and online business tools through targeted, high-conversion digital marketing channels.
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
                                "My ability to combine real server usage with digital marketing execution sets me apart from traditional affiliates."
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};