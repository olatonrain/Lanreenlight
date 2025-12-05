import React from 'react';

const AREAS = [
    { title: 'Crypto Nodes', icon: 'fa-network-wired', color: 'text-brand-accent' },
    { title: 'VPS & Cloud', icon: 'fa-server', color: 'text-brand-black' },
    { title: 'Automation', icon: 'fa-robot', color: 'text-gray-600' },
    { title: 'Performance', icon: 'fa-bullhorn', color: 'text-gray-400' },
];

export const About: React.FC = () => {
    return (
        <section id="about" className="py-24 bg-white border-y border-brand-border relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                    <div className="lg:col-span-7">
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-10 tracking-tight">About Me</h2>
                        <div className="prose prose-lg text-gray-600 space-y-8 leading-loose font-light">
                            <p>
                                I’m Lanre, a digital strategist with a strong focus on technology, hosting infrastructure, crypto nodes, and performance-driven marketing systems. My work sits at the intersection of trading, automation, cloud computing, and online business growth—giving me a unique vantage point for promoting technical products to highly engaged audiences.
                            </p>
                            <p>
                                Over the years, I’ve built a reputation for turning complex technical concepts into clear, actionable insights, enabling developers, entrepreneurs, and digital creators to make informed decisions about the tools and platforms they use.
                            </p>
                            <p>
                                My marketing approach blends data-driven execution, hands-on server experience, and deep understanding of what modern online builders actually need.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-2 gap-5">
                        {AREAS.map((area) => (
                            <div key={area.title} className="bg-white p-8 rounded-2xl border border-brand-border hover:border-brand-accent/50 hover:shadow-lg transition-all group">
                                <i className={`fa-solid ${area.icon} text-3xl ${area.color} mb-6 group-hover:scale-110 transition-transform`}></i>
                                <h3 className="font-serif text-brand-black text-xl italic">{area.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};