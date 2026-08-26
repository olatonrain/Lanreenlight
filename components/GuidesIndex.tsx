import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from './FadeIn';
import { Seo } from './Seo';
import { collectionSchema } from '../data/schema';
import { GUIDES } from '../data/guides';

export const GuidesIndex: React.FC = () => {
    const featured = GUIDES[0];
    const rest = GUIDES.slice(1);

    return (
        <div className="min-h-screen bg-brand-white">
            <Seo
                title="Guides — AI Automation, VPS, Trading & Dev Playbooks | Lanre"
                description="Seven in-depth field guides from an AI Automation & Systems Engineer: n8n automation, cheapest VPS hosting, trading bots, crypto nodes, web and app development, and AgentRouter setup."
                path="/guides/"
                jsonLd={[
                    collectionSchema(
                        'Lanre Guides',
                        'In-depth field guides on AI automation, VPS infrastructure, trading bots, crypto nodes, and development.',
                        'https://lanreenlight.com/guides/',
                        GUIDES.map(g => ({ name: g.title, path: g.path }))
                    ),
                ]}
            />

            {/* Hero — dark band, the "command center" of the playbooks */}
            <section className="relative bg-brand-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/10 rounded-full blur-[120px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-8">
                            <i className="fa-solid fa-book-open"></i>
                            Field Guides
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 max-w-3xl tracking-tight">
                            The <span className="text-brand-accent italic">Playbooks</span> Behind the Systems
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mb-10 leading-relaxed">
                            Seven in-depth, no-fluff guides covering the exact stacks I run in production — automation, infrastructure, trading, and crypto.
                        </p>
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <div className="text-3xl font-bold text-brand-accent">7</div>
                                <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Field guides</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-brand-accent">6</div>
                                <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Topic clusters</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-brand-accent">30+</div>
                                <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Tools covered</div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Featured guide — the flagship, wider card */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <FadeIn>
                    <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-brand-border bg-brand-black text-white shadow-2xl">
                        <div className="p-10 md:p-14 flex flex-col justify-center">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                                style={{ backgroundColor: `${featured.color}22`, color: featured.color }}
                            >
                                <i className={`fa-solid ${featured.icon}`}></i>
                            </div>
                            <div className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold mb-3">{featured.eyebrow}</div>
                            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">{featured.title}</h2>
                            <p className="text-gray-300 font-light leading-relaxed mb-6">{featured.description}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {featured.topics.map(topic => (
                                    <span key={topic} className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-medium">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                            <div>
                                <Link
                                    to={featured.path}
                                    className="inline-flex items-center px-8 py-4 bg-brand-accent text-brand-black rounded-full font-bold hover:bg-white transition-colors duration-300 group"
                                >
                                    Read the Guide
                                    <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                                <span className="ml-4 text-sm text-gray-400"><i className="fa-regular fa-clock mr-1"></i>{featured.readTime}</span>
                            </div>
                        </div>
                        <div className="relative min-h-[280px] bg-gradient-to-br from-brand-accent/20 via-transparent to-transparent border-t lg:border-t-0 lg:border-l border-white/10">
                            <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
                            <div className="absolute bottom-0 right-0 p-10 md:p-14">
                                <i className="fa-solid fa-diagram-project text-[9rem] text-white/10"></i>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* Guide grid — color-coded knowledge cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((guide, index) => (
                        <FadeIn key={guide.path} delay={index * 80}>
                            <Link
                                to={guide.path}
                                className="group block h-full bg-white border border-brand-border rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 left-0 w-full h-1"
                                    style={{ backgroundColor: guide.color }}
                                ></div>
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${guide.color}1a`, color: guide.color }}
                                >
                                    <i className={`fa-solid ${guide.icon}`}></i>
                                </div>
                                <div className="text-xs uppercase tracking-[0.18em] font-bold mb-2" style={{ color: guide.color }}>
                                    {guide.eyebrow}
                                </div>
                                <h3 className="text-xl font-serif font-medium text-brand-black mb-3 group-hover:text-brand-accent transition-colors">
                                    {guide.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">{guide.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {guide.topics.slice(0, 3).map(topic => (
                                        <span key={topic} className="px-2.5 py-1 rounded-full bg-brand-secondary text-gray-600 text-xs">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                    <span className="text-sm font-semibold text-brand-black group-hover:text-brand-accent transition-colors inline-flex items-center">
                                        Read the Guide
                                        <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                    </span>
                                    <span className="text-xs text-gray-400"><i className="fa-regular fa-clock mr-1"></i>{guide.readTime}</span>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* CTA — convert readers */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <FadeIn>
                    <div className="bg-brand-secondary rounded-[2.5rem] p-12 md:p-16 border border-brand-border text-center relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-serif text-brand-black mb-4">Building something with these stacks?</h2>
                            <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto mb-8">
                                I design and deploy production systems for businesses — n8n automation, VPS infrastructure, and trading infrastructure. If a guide gets you 80% of the way, I handle the rest.
                            </p>
                            <a href="/#contact" className="inline-flex items-center px-10 py-4 bg-brand-black text-white rounded-full font-bold hover:bg-gray-800 shadow-xl transition-all hover:scale-105">
                                Work With Me
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
};