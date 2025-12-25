
import React from 'react';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid-bg border-b border-brand-border">
            {/* Background Portrait Image - Full Opacity */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <FadeIn delay={200} direction="none" className="w-full h-full flex items-center justify-center">
                    <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" 
                        alt="Lanre - Digital Strategist"
                        className="h-full w-full object-cover md:object-contain opacity-100 transition-opacity duration-1000"
                    />
                </FadeIn>
            </div>

            {/* Subtle Gradient Overlays to ensure text contrast without muddying the image */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="flex flex-col items-center text-center">
                    <FadeIn delay={0} direction="down">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-border bg-white/90 backdrop-blur-md text-brand-accent text-xs font-semibold uppercase tracking-wider mb-8 hover:bg-brand-accent/5 transition-colors duration-300 cursor-default shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-accent mr-2 animate-pulse"></span>
                            Available for Partnerships
                        </div>
                    </FadeIn>
                    
                    <FadeIn delay={200} direction="up">
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium text-brand-black tracking-tight leading-[1.1] mb-8 max-w-5xl mx-auto drop-shadow-sm">
                            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-yellow-600 to-brand-black italic">Infrastructure</span> <br />
                            & Market Growth.
                        </h1>
                    </FadeIn>
                    
                    <FadeIn delay={400} direction="up">
                        <p className="mt-2 text-lg md:text-2xl text-gray-900 max-w-2xl leading-relaxed font-medium mx-auto bg-white/10 backdrop-blur-[2px] rounded-lg px-4 py-2">
                            I’m Lanre, a digital strategist with a strong focus on technology, hosting infrastructure, crypto nodes, and performance-driven marketing systems.
                        </p>
                    </FadeIn>

                    <FadeIn delay={600} direction="up">
                        <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
                            <a href="#contact" className="px-10 py-4 bg-brand-black text-white rounded-full font-bold text-lg hover:bg-gray-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 ease-out text-center min-w-[220px]">
                                Partner With Me
                            </a>
                            <a href="mailto:contact@lanre.tech?subject=Requesting Media Kit" className="px-10 py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full text-brand-black font-semibold text-lg hover:border-brand-black hover:bg-brand-black hover:text-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out text-center min-w-[220px]">
                                Request Media Kit
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </div>
            
            {/* Minimalist Ambient Lights to emphasize the subject */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-black/5 rounded-full blur-[100px] pointer-events-none"></div>
        </section>
    );
};
