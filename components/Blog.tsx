import React from 'react';
import { FadeIn } from './FadeIn';
import { BLOG_POSTS } from '../data/blog';

export const Blog = () => {
    return (
        <div className="py-24 bg-brand-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <FadeIn delay={0} direction="down">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent text-sm font-medium mb-6">
                            Verified Insights
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-6">
                            The <span className="italic text-brand-accent">Digital Laboratory</span> Log
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Deep dives into automation, node infrastructure, and market mechanics.
                            Converted directly from my technical video breakdowns.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post, index) => (
                        <FadeIn key={post.id} delay={index * 100}>
                            <article className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-brand-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Video Essay
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-sm text-brand-accent font-medium mb-3">{post.date}</div>
                                    <h3 className="text-2xl font-serif text-brand-black mb-4 group-hover:text-brand-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <a href={`https://youtube.com/watch?v=${post.youtubeId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-brand-black font-semibold hover:text-brand-accent transition-colors group/link">
                                            Watch Video
                                            <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                        <span className="text-xs font-medium text-gray-400">5 min read</span>
                                    </div>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    );
};
