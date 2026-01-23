
import React from 'react';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-white">
            {/* Immersive Background Layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 tech-grid-bg opacity-30"></div>

                {/* Cinematic Ambient Lights */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-black/5 rounded-full blur-[100px]"></div>

                {/* Main Subject Image Container */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <FadeIn delay={400} direction="none" className="h-full w-full flex items-center justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop"
                            alt="Lanre - Digital Strategist"
                            className="h-full w-full object-cover md:object-contain opacity-80 mix-blend-multiply grayscale-[20%] transition-transform duration-[3000ms] scale-105 hover:scale-100"
                        />
                    </FadeIn>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="flex flex-col items-center text-center">
                    <FadeIn delay={600} direction="down">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-accent/20 bg-white/40 backdrop-blur-xl text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-10 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-3 animate-ping"></span>
                            Live Infrastructure & Growth Strategy
                        </div>
                    </FadeIn>

                    <FadeIn delay={800} direction="up">
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-medium text-brand-black tracking-tighter leading-[0.9] mb-10 letter-spacing-cinematic">
                            Bridging <span className="italic text-brand-accent text-glow">Code</span> <br />
                            & <span className="relative">
                                Capital.
                                <svg className="absolute -bottom-2 left-0 w-full h-2 text-brand-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={1000} direction="up">
                        <p className="max-w-xl text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-12">
                            A technical strategist orchestrating high-performance <span className="text-brand-black font-medium">blockchain nodes</span>, AI systems, and aggressive growth frameworks.
                        </p>
                    </FadeIn>

                    <FadeIn delay={1200} direction="up">
                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                            <a href="#contact" className="group relative px-10 py-4 bg-brand-black text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                <span className="relative z-10 uppercase tracking-widest text-xs">Start Collaboration</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </a>
                            <a href="#media-kit" className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-brand-accent transition-colors duration-300">
                                View Portfolio
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Bottom Section Divider - Cinematic Mask */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-white to-transparent z-10"></div>
        </section>
    );
};
