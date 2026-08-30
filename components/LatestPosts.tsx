import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';
import { FadeIn } from './FadeIn';

export const LatestPosts: React.FC = () => {
    const latest = BLOG_POSTS.slice(0, 3);

    return (
        <section id="latest-posts" className="py-24 bg-brand-secondary relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <FadeIn direction="right">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-3 tracking-tight">Latest from the Blog</h2>
                            <p className="text-gray-600 font-light text-lg">Field notes from running automation, nodes, and bots on cheap hardware.</p>
                        </div>
                    </FadeIn>
                    <FadeIn direction="left" className="w-full md:w-auto">
                        <Link to="/blog/" className="inline-flex items-center gap-2 text-brand-black font-semibold hover:text-brand-accent transition-colors border border-brand-border px-6 py-3 rounded-full hover:bg-white whitespace-nowrap">
                            All Posts <i className="fa-solid fa-arrow-right text-sm"></i>
                        </Link>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latest.map((post, index) => (
                        <FadeIn key={post.id} delay={index * 100}>
                            <Link to={`/blog/${post.id}`} className="group block bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-brand-accent text-brand-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-[11px] font-medium text-gray-400 mb-2">{post.date}</div>
                                    <h3 className="text-xl font-serif text-brand-black mb-3 line-clamp-2 leading-snug group-hover:text-brand-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light line-clamp-2 mb-4">{post.excerpt}</p>
                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-black group-hover:text-brand-accent transition-colors">
                                        Read Article <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                    </span>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};
