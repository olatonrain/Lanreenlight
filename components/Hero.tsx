
import React from 'react';
import { FadeIn } from './FadeIn';

export const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-white">
            {/* Immersive Background Layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 tech-grid-bg opacity-25"></div>

                {/* Cinematic Ambient Lights */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-accent/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-black/5 rounded-full blur-[100px]"></div>

                {/* Main Subject Image Container */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <FadeIn delay={400} direction="none" className="h-full w-full flex items-center justify-center">
                        <img
                            src="/data/lanre.jpg"
                            alt="Lanre - AI Automation Engineer"
                            className="h-full w-full object-cover opacity-80 mix-blend-multiply grayscale-[20%] transition-transform duration-[3000ms] scale-105 hover:scale-100 will-change-transform"
                        />
                    </FadeIn>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="flex flex-col items-center text-center">
                    <FadeIn delay={600} direction="down">
                        <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-accent bg-brand-black/90 backdrop-blur-xl text-brand-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-10 shadow-2xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-3 animate-ping"></span>
                            AI Automation Engineering | Systems Builder
                        </div>
                    </FadeIn>

                    <FadeIn delay={800} direction="up">
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-medium text-brand-black tracking-tighter leading-[0.9] mb-10 letter-spacing-cinematic">
                            Architecting <span className="italic text-brand-accent text-glow">Systems</span> <br />
                            That <span className="relative">
                                Scale.
                                <svg className="absolute -bottom-2 left-0 w-full h-2 text-brand-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={1000} direction="up">
                        <p className="max-w-xl text-lg md:text-xl font-light leading-relaxed mb-12" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
                            <span className="text-white">Building AI automation systems with</span> <span className="text-brand-accent font-medium">n8n, APIs, and cloud infrastructure</span><span className="text-white"> eliminating manual work and scaling businesses without adding headcount.</span>
                        </p>
                    </FadeIn>

                    <FadeIn delay={1200} direction="up">
                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                            <a href="#contact" className="group relative px-10 py-4 bg-brand-black text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                <span className="relative z-10 uppercase tracking-widest text-xs">Start Collaboration</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </a>
                            <a href="#media-kit" className="text-xs uppercase tracking-[0.3em] font-bold border-2 border-white/70 px-6 py-3 rounded-full text-white hover:bg-white hover:text-brand-black transition-all duration-300 shadow-lg">
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
