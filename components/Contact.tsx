import React from 'react';

export const Contact: React.FC = () => {
    return (
        <>
            <section className="py-24 bg-brand-secondary relative z-10">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-brand-black mb-10 tracking-tight">Affiliate Partnership Focus</h2>
                    <p className="text-gray-600 text-xl mb-12 font-light">
                        I aim to establish long-term partnerships with hosting and technology brands that value:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 text-left">
                        {['Clear, educational content', 'High-quality leads', 'Brand consistency', 'Scalable strategies'].map((item) => (
                            <div key={item} className="flex items-center gap-4 text-gray-600">
                                <i className="fa-solid fa-check-circle text-brand-accent"></i> <span className="text-sm font-medium">{item}</span>
                            </div>
                        ))}
                         <div className="flex items-center gap-4 text-gray-600 md:col-span-2">
                            <i className="fa-solid fa-check-circle text-brand-accent"></i> <span className="text-sm font-medium">Authentic product testing</span>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl inline-block border border-brand-border max-w-2xl shadow-sm">
                        <p className="text-brand-black font-serif italic text-lg leading-relaxed">
                            My goal is to drive steady, high-intent referrals, build strong awareness campaigns, and deliver long-lasting results through targeted, strategic promotion.
                        </p>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-24 bg-white text-center relative z-10 border-t border-brand-border">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-5xl md:text-6xl font-serif text-brand-black mb-8 tracking-tighter">Let’s Work Together</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                        If your brand offers hosting services, cloud infrastructure, crypto node tooling, SaaS solutions, or any tech-focused platform, I can help amplify your visibility.
                    </p>
                    <p className="text-2xl text-brand-accent font-serif italic mb-16 tracking-tight">
                        Precision, scalability, and results.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a href="mailto:contact@lanre.tech" className="px-12 py-5 bg-brand-black text-white font-bold text-lg rounded-full hover:bg-gray-800 hover:scale-105 transition-all shadow-xl">
                            Partner With Me
                        </a>
                        <a href="mailto:media@lanre.tech?subject=Media Kit Request" className="px-12 py-5 border border-brand-border text-brand-black font-bold text-lg rounded-full hover:bg-brand-secondary transition-all">
                            Request Media Kit
                        </a>
                    </div>

                    <div className="mt-20 border-t border-brand-border pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <div className="mb-4 md:mb-0">
                            &copy; 2025 Lanre. All Rights Reserved.
                        </div>
                        <div className="flex space-x-8">
                            <a href="#" className="hover:text-brand-black transition-colors"><i className="fa-brands fa-telegram text-xl"></i></a>
                            <a href="#" className="hover:text-brand-black transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
                            <a href="#" className="hover:text-brand-black transition-colors"><i className="fa-brands fa-linkedin text-xl"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};