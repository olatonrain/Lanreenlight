
import React, { useState } from 'react';
import { FadeIn } from './FadeIn';

export const Contact: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [step, setStep] = useState<'email' | 'name'>('email');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 'email' && email) {
            setStep('name');
            return;
        }

        if (step === 'name' && name && email) {
            setIsLoading(true);
            try {
                // Send to n8n Webhook
                // REPLACE THIS URL with your actual n8n Production Webhook URL
                const WEBHOOK_URL = 'https://n8n.metrohyp.com/webhook/newsletter-signup';

                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name, source: 'website_footer' })
                }).catch(() => {
                    // Ignore CORS errors for fire-and-forget webhooks if needed
                    // or better: handle them
                });

                // Simulate delay if webhook is too fast or fails silently
                await new Promise(resolve => setTimeout(resolve, 800));

                setSubscribed(true);
                setEmail('');
                setName('');
            } catch (error) {
                console.error('Subscription failed:', error);
                // Fallback success for UX even if webhook fails (optional)
                setSubscribed(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <section className="py-16 md:py-24 bg-brand-secondary relative z-10">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FadeIn direction="up">
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-brand-black mb-10 tracking-tight">Affiliate Partnership Focus</h2>
                        <p className="text-gray-600 text-xl mb-12 font-light">
                            I aim to establish long-term partnerships with hosting and technology brands that value:
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 text-left">
                        {['Clear, educational content', 'High-quality leads', 'Brand consistency', 'Scalable strategies'].map((item, index) => (
                            <FadeIn key={item} delay={index * 100}>
                                <div className="flex items-center gap-4 text-gray-600 group">
                                    <i className="fa-solid fa-check-circle text-brand-accent group-hover:scale-110 transition-transform duration-300"></i> <span className="text-sm font-medium">{item}</span>
                                </div>
                            </FadeIn>
                        ))}
                        <FadeIn delay={400} className="md:col-span-2">
                            <div className="flex items-center gap-4 text-gray-600 group">
                                <i className="fa-solid fa-check-circle text-brand-accent group-hover:scale-110 transition-transform duration-300"></i> <span className="text-sm font-medium">Authentic product testing</span>
                            </div>
                        </FadeIn>
                    </div>

                    <FadeIn delay={500} direction="up">
                        <div className="bg-white p-8 rounded-2xl inline-block border border-brand-border max-w-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p className="text-brand-black font-serif italic text-lg leading-relaxed">
                                My goal is to drive steady, high-intent referrals, build strong awareness campaigns, and deliver long-lasting results through targeted, strategic promotion.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 md:py-20 bg-white border-t border-brand-border overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-brand-black rounded-[2.5rem] p-12 md:p-20 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="relative z-10 max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-serif mb-4">Scalability Weekly</h2>
                            <p className="text-gray-400 font-light text-lg">Get my latest technical breakdowns, hosting benchmarks, and node setups delivered directly to your inbox.</p>
                        </div>

                        <div className="relative z-10 w-full lg:w-auto">
                            {!subscribed ? (
                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
                                    {step === 'email' ? (
                                        <>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                required
                                                className="bg-zinc-800 border-zinc-700 text-white px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-brand-accent transition-all min-w-[300px] disabled:opacity-50"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="bg-brand-accent text-white font-bold px-8 py-4 rounded-full hover:bg-yellow-600 transition-colors shadow-lg active:scale-95 flex items-center justify-center min-w-[140px] disabled:opacity-70"
                                            >
                                                Next
                                                <i className="fa-solid fa-arrow-right ml-2"></i>
                                            </button>
                                        </>
                                    ) : (
                                        <div className="animate-fade-in flex flex-col sm:flex-row gap-3 w-full">
                                            <input
                                                type="text"
                                                placeholder="What's your name?"
                                                required
                                                autoFocus
                                                className="bg-zinc-800 border-zinc-700 text-white px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-brand-accent transition-all min-w-[300px] disabled:opacity-50"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="bg-brand-accent text-white font-bold px-8 py-4 rounded-full hover:bg-yellow-600 transition-colors shadow-lg active:scale-95 flex items-center justify-center min-w-[140px] disabled:opacity-70"
                                            >
                                                {isLoading ? (
                                                    <i className="fa-solid fa-circle-notch animate-spin text-xl"></i>
                                                ) : 'Complete'}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            ) : (
                                <div className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-8 py-4 rounded-full font-bold flex items-center gap-3 animate-fade-in">
                                    <i className="fa-solid fa-circle-check scale-125"></i>
                                    <span className="tracking-tight">Thanks {name}! You're on the list.</span>
                                </div>
                            )}
                        </div>

                        {/* Background Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-24 bg-white text-center relative z-10 border-t border-brand-border">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <FadeIn direction="down">
                        <h2 className="text-5xl md:text-6xl font-serif text-brand-black mb-8 tracking-tighter">Let’s Work Together</h2>
                    </FadeIn>

                    <FadeIn delay={200} direction="up">
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                            If your brand offers hosting services, cloud infrastructure, crypto node tooling, SaaS solutions, or any tech-focused platform, I can help amplify your visibility.
                        </p>
                    </FadeIn>

                    <FadeIn delay={400} direction="up">
                        <p className="text-2xl text-brand-accent font-serif italic mb-16 tracking-tight">
                            Precision, scalability, and results.
                        </p>
                    </FadeIn>

                    <FadeIn delay={600} direction="up">
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a href="mailto:contact@lanre.tech" className="px-12 py-5 bg-brand-black text-white font-bold text-lg rounded-full hover:bg-gray-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 ease-out">
                                Partner With Me
                            </a>
                            <a href="mailto:media@lanre.tech?subject=Media Kit Request" className="px-12 py-5 border border-brand-border text-brand-black font-bold text-lg rounded-full hover:bg-brand-black hover:text-white hover:border-brand-black shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 ease-out">
                                Request Media Kit
                            </a>
                        </div>
                    </FadeIn>

                    <div className="mt-20 border-t border-brand-border pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <div className="mb-8 md:mb-0">
                            &copy; 2025 Lanre. All Rights Reserved.
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            <a href="https://www.youtube.com/@lanreenlight_official" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-brand-accent transition-all duration-300 group">
                                <i className="fa-brands fa-youtube text-2xl group-hover:-translate-y-1 transition-transform"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">YouTube</span>
                            </a>
                            <a href="https://www.tiktok.com/@lanreenlight_official" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-brand-black transition-all duration-300 group">
                                <i className="fa-brands fa-tiktok text-2xl group-hover:-translate-y-1 transition-transform"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">TikTok</span>
                            </a>
                            <a href="https://github.com/olatonrain" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-brand-black transition-all duration-300 group">
                                <i className="fa-brands fa-github text-2xl group-hover:-translate-y-1 transition-transform"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/olatonrain" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-[#0077B5] transition-all duration-300 group">
                                <i className="fa-brands fa-linkedin text-2xl group-hover:-translate-y-1 transition-transform"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                            </a>
                            <a href="https://www.instagram.com/lanreenlight_official" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-[#E1306C] transition-all duration-300 group">
                                <i className="fa-brands fa-instagram text-2xl group-hover:-translate-y-1 transition-transform"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
                            </a>
                            <a href="https://www.facebook.com/lanreenlight_official" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-[#1877F2] transition-all duration-300 group">
                                <i className="fa-brands fa-facebook text-2xl group-hover:-translate-y-1 transition-transform"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
                            </a>
                            <a href="https://t.me/lanreenlight_official" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 hover:text-[#24A1DE] transition-all duration-300 group">
                                <i className="fa-brands fa-telegram text-2xl group-hover:-translate-y-1 transition-transform"></i>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Telegram</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
