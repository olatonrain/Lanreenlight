import React from 'react';
import { FadeIn } from './FadeIn';

export const Stats: React.FC = () => {
    return (
        <section id="stats" className="py-24 bg-white border-y border-brand-border relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <FadeIn direction="up">
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-brand-black mb-6 tracking-tight">Audience & Reach</h2>
                    </FadeIn>
                    <FadeIn delay={100} direction="up">
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl font-light">
                            My platforms attract a highly targeted tech audience that actively seeks tools to build, scale, and automate their online operations.
                        </p>
                    </FadeIn>
                </div>

                <FadeIn delay={200} direction="up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200 bg-brand-secondary p-10 rounded-3xl border border-brand-border">
                        <div className="p-4">
                            <div className="text-5xl font-serif text-brand-accent mb-3">~500</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Active Telegram Users</div>
                        </div>
                        <div className="p-4">
                            <div className="text-5xl font-serif text-brand-black mb-3">200k</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Combined Followers</div>
                        </div>
                        <div className="p-4">
                            <div className="text-5xl font-serif text-gray-700 mb-3">~2%</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Engagement Rate</div>
                        </div>
                        <div className="p-4">
                            <div className="text-5xl font-serif text-brand-black mb-3">10k</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Avg Post Reach</div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={400} direction="up">
                    <div className="mt-12 bg-white rounded-3xl p-10 md:p-14 border border-brand-border shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h3 className="text-2xl font-serif text-brand-black mb-8">Demographics</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between border-b border-brand-border pb-4">
                                        <span className="text-gray-500">Age Range</span>
                                        <span className="text-brand-black font-serif text-lg">25–45</span>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                                <span>Nigeria (Primary)</span>
                                                <span className="text-brand-black">65%</span>
                                            </div>
                                            <div className="w-full bg-brand-secondary rounded-full h-1">
                                                <div className="bg-brand-accent h-1 rounded-full" style={{ width: '65%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                                <span>Pan-Africa</span>
                                                <span className="text-brand-black">20%</span>
                                            </div>
                                            <div className="w-full bg-brand-secondary rounded-full h-1">
                                                <div className="bg-gray-400 h-1 rounded-full" style={{ width: '20%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                                <span>Global Tech Communities</span>
                                                <span className="text-brand-black">15%</span>
                                            </div>
                                            <div className="w-full bg-brand-secondary rounded-full h-1">
                                                <div className="bg-gray-200 h-1 rounded-full" style={{ width: '15%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif text-brand-black mb-8">Primary Interest Areas</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['Technology', 'Web hosting', 'Online business', 'Automation', 'Crypto & trading'].map((tag, i) => (
                                         <span key={i} className={`px-5 py-2.5 bg-brand-secondary rounded-full border border-brand-border text-sm font-medium hover:bg-brand-black hover:text-white transition-colors cursor-default ${tag === 'Technology' ? 'text-brand-accent' : 'text-gray-600'}`}>{tag}</span>
                                    ))}
                                </div>
                                <div className="pt-10">
                                    <p className="text-gray-500 font-serif italic font-light border-l-2 border-brand-accent pl-6">
                                        "This makes my channels ideal for hosting providers, cloud platforms, SaaS companies, node services, and other digital infrastructure brands."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Stats Ticker */}
            <div className="mt-24 border-y border-brand-border bg-brand-secondary overflow-x-auto relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between gap-12 min-w-max">
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Total Volume</div>
                        <div className="text-xl font-serif font-medium text-brand-black">$4.2M+</div>
                    </div>
                    <div className="w-px bg-brand-border h-10"></div>
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Avg Win Rate</div>
                        <div className="text-xl font-serif font-medium text-system-success">68.4%</div>
                    </div>
                    <div className="w-px bg-brand-border h-10"></div>
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Uptime</div>
                        <div className="text-xl font-serif font-medium text-brand-accent">99.99%</div>
                    </div>
                    <div className="w-px bg-brand-border h-10"></div>
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Active Users</div>
                        <div className="text-xl font-serif font-medium text-brand-black">450+</div>
                    </div>
                </div>
            </div>
        </section>
    );
};