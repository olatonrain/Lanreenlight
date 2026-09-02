import React from 'react';
import { Seo } from './Seo';

interface LegalLayoutProps {
    eyebrow: string;
    title: string;
    seoTitle: string;
    seoDescription: string;
    path: string;
    updated: string;
    children: React.ReactNode;
}

const Section = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
    <section className="mt-8 first-of-type:mt-0">
        <h2 className="text-2xl font-serif text-brand-black mb-3">{heading}</h2>
        <div className="text-gray-600 font-light leading-relaxed space-y-3">{children}</div>
    </section>
);

export const LegalLayout: React.FC<LegalLayoutProps> = ({ eyebrow, title, seoTitle, seoDescription, path, updated, children }) => {
    return (
        <div className="bg-brand-white min-h-screen pt-32 pb-20">
            <Seo
                title={`${seoTitle} | Lanre`}
                description={seoDescription}
                path={path}
                jsonLd={[]}
            />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent text-sm font-medium mb-6">
                    {eyebrow}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-4 tracking-tight">{title}</h1>
                <p className="text-sm text-gray-500 mb-10">Last updated: {updated}</p>
                <article className="bg-white rounded-3xl border border-brand-border p-8 md:p-12">
                    {children}
                </article>
            </div>
        </div>
    );
};

export { Section };
