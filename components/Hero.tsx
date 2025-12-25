import React from 'react';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
    return (
        <section className="relative pt-36 pb-24 lg:pt-52 lg:pb-40 overflow-hidden tech-grid-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:w-3/4">
                    <FadeIn delay={0} direction="down">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-border bg-brand-secondary text-brand-accent text-xs font-semibold uppercase tracking-wider mb-8 hover:bg-brand-accent/10 transition-colors duration-300 cursor-default">
                            <span className="w-2 h-2 rounded-full bg-brand-accent mr-2 animate-pulse"></span>
                            Available for Partnerships
                        </div>
                    </FadeIn>
                    
                    <FadeIn delay={200} direction="up">
                        <h1 className="text-6xl md:text-8xl font-serif font-medium text-brand-black tracking-tight leading-[1.1] mb-8">
                            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-yellow-600 to-brand-black italic">Infrastructure</span> <br />
                            & Market Growth.
                        </h1>
                    </FadeIn>
                    
                    <FadeIn delay={400} direction="up">
                        <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-light">
                            I’m Lanre, a digital strategist with a strong focus on technology, hosting infrastructure, crypto nodes, and performance-driven marketing systems.
                        </p>
                    </FadeIn>

                    <FadeIn delay={600} direction="up">
                        <div className="mt-12 flex flex-col sm:flex-row gap-5">
                            <a href="#contact" className="px-10 py-4 bg-brand-black text-white rounded-full font-bold text-lg hover:bg-gray-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 ease-out text-center">
                                Partner With Me
                            </a>
                            <a href="mailto:contact@lanre.tech?subject=Requesting Media Kit" className="px-10 py-4 bg-transparent border border-gray-300 rounded-full text-brand-black font-semibold text-lg hover:border-brand-black hover:bg-brand-black hover:text-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out text-center">
                                Request Media Kit
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </div>
            
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gray-200/50 rounded-full blur-[100px] pointer-events-none animate-float-delayed"></div>
        </section>
    );
};