import React, { useEffect } from 'react';
import { FadeIn } from './FadeIn';
import { Link } from 'react-router-dom';
import { Seo } from './Seo';
import { articleSchema, breadcrumbSchema, faqSchema } from '../data/schema';

interface GuideSection {
    title: string;
    content: string[];
}

interface GuidesLayoutProps {
    eyebrow: string;
    title: string;
    subtitle: string;
    intro: string;
    sections: GuideSection[];
    faqs: { question: string; answer: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaLink: string;
    ctaLabel: string;
    relatedGuides: { title: string; link: string; description: string }[];
    path: string;
    seoTitle?: string;
    seoDescription?: string;
}

export const GuidesLayout: React.FC<GuidesLayoutProps> = ({
    eyebrow,
    title,
    subtitle,
    intro,
    sections,
    faqs,
    ctaTitle,
    ctaText,
    ctaLink,
    ctaLabel,
    relatedGuides,
    path,
    seoTitle,
    seoDescription,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-brand-white min-h-screen pt-32 pb-20">
            <Seo
                title={seoTitle ? `${seoTitle} | Lanre` : `${title} | Lanre`}
                description={seoDescription || subtitle}
                path={path}
                ogType="article"
                jsonLd={[
                    articleSchema(seoTitle || title, seoDescription || subtitle, `https://lanreenlight.com${path}`),
                    faqSchema(faqs),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: title, path },
                    ]),
                ]}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent text-sm font-medium mb-6">
                        {eyebrow}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-medium text-brand-black mb-6 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-600 font-light mb-4 max-w-3xl">{subtitle}</p>
                    <p className="text-gray-600 font-light leading-relaxed max-w-3xl mb-12">{intro}</p>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {sections.map((section, index) => (
                            <FadeIn key={index} delay={index * 50}>
                                <section className="bg-white rounded-3xl border border-brand-border p-8 md:p-12">
                                    <h2 className="text-2xl md:text-3xl font-serif text-brand-black mb-6">{section.title}</h2>
                                    <div className="space-y-4">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-gray-600 leading-relaxed font-light">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            </FadeIn>
                        ))}
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <FadeIn>
                            <div className="bg-brand-secondary rounded-3xl border border-brand-border p-8 sticky top-28">
                                <h3 className="font-serif text-brand-black text-xl mb-6">Related Guides</h3>
                                <div className="space-y-4">
                                    {relatedGuides.map((guide) => (
                                        <Link key={guide.link} to={guide.link} className="block p-4 bg-white rounded-2xl border border-brand-border hover:border-brand-accent/50 hover:shadow-md transition-all group">
                                            <h4 className="font-serif text-brand-black group-hover:text-brand-accent transition-colors mb-1">{guide.title}</h4>
                                            <p className="text-xs text-gray-500">{guide.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                <FadeIn>
                    <section className="mt-16 bg-brand-black rounded-[2.5rem] p-10 md:p-16 text-white">
                        <h2 className="text-3xl md:text-4xl font-serif mb-6">FAQ</h2>
                        <div className="space-y-8">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-brand-accent mb-2">{faq.question}</h3>
                                    <p className="text-gray-300 font-light leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </FadeIn>

                <FadeIn>
                    <section className="mt-16 text-center bg-brand-secondary rounded-[2.5rem] p-12 md:p-20 border border-brand-border">
                        <h2 className="text-3xl md:text-4xl font-serif text-brand-black mb-4">{ctaTitle}</h2>
                        <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto mb-8">{ctaText}</p>
                        {ctaLink.startsWith('http') ? (
                            <a
                                href={ctaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-10 py-4 bg-brand-black text-white rounded-full font-bold hover:bg-gray-800 shadow-xl transition-all hover:scale-105"
                            >
                                {ctaLabel}
                            </a>
                        ) : (
                            <Link to={ctaLink} className="inline-flex items-center px-10 py-4 bg-brand-black text-white rounded-full font-bold hover:bg-gray-800 shadow-xl transition-all hover:scale-105">
                                {ctaLabel}
                            </Link>
                        )}
                    </section>
                </FadeIn>
            </div>
        </div>
    );
};
