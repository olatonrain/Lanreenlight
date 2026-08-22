import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from './FadeIn';
import { Seo } from './Seo';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center px-4 pt-20">
            <Seo
                title="Page Not Found | Lanre"
                description="The page you're looking for doesn't exist. Explore AI automation guides, VPS hosting, trading bots, and crypto node tutorials."
                path="/404"
                noindex
            />
            <FadeIn className="text-center max-w-2xl">
                <div className="text-8xl font-serif text-brand-accent mb-6">404</div>
                <h1 className="text-4xl md:text-5xl font-serif text-brand-black mb-6">This page drifted off the grid</h1>
                <p className="text-gray-600 font-light text-lg mb-10">
                    The URL doesn't exist (or moved). Jump back to the guides below — everything worth reading is one click away.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-4 bg-brand-black text-white rounded-full font-bold hover:bg-gray-800 shadow-xl transition-all hover:scale-105"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/guides/n8n-automation"
                        className="inline-flex items-center px-8 py-4 border border-brand-border text-brand-black rounded-full font-bold hover:border-brand-accent/50 hover:bg-brand-secondary transition-all"
                    >
                        Browse Guides
                    </Link>
                </div>
            </FadeIn>
        </div>
    );
};
