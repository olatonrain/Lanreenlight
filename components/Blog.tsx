import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from './FadeIn';
import { Seo } from './Seo';
import { collectionSchema } from '../data/schema';
import { BLOG_POSTS as STATIC_POSTS, BlogPost } from '../data/blog';

// Helper to load dynamic posts
const loadDynamicPosts = async (): Promise<BlogPost[]> => {
    const modules = import.meta.glob('../data/posts/*.json');
    const posts: BlogPost[] = [];

    for (const path in modules) {
        try {
            const mod = await modules[path]() as any;
            const postData = mod.default || mod;

            if (postData.title) {
                let youtubeId = postData.youtubeId || 'dQw4w9WgXcQ';
                if (postData.youtube_url) {
                    const urlParams = new URLSearchParams(new URL(postData.youtube_url).search);
                    youtubeId = urlParams.get('v') || youtubeId;
                }

                posts.push({
                    id: postData.id || path,
                    title: postData.title,
                    date: postData.date || new Date().toISOString().split('T')[0],
                    category: postData.category || 'Automation',
                    excerpt: postData.excerpt || 'No description available.',
                    imageUrl: postData.imageUrl || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
                    youtubeId: youtubeId
                });
            }
        } catch (e) {
            console.error("Error loading blog post:", path, e);
        }
    }
    return posts;
};

const CATEGORY_COLORS: Record<string, string> = {
    'Automation': '#c5a028',
    'Crypto': '#9333ea',
    'Philosophy': '#2563eb',
    'n8n': '#c5a028',
    'VPS': '#2563eb',
    'Trading': '#16a34a',
};

const formatDate = (date: string) => {
    try {
        return new Date(date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
        return date;
    }
};

export const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>(STATIC_POSTS);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchPosts = async () => {
            const dynamicPosts = await loadDynamicPosts();
            // Combine dynamic posts with static ones, dedupe by id, new ones first
            const existingIds = new Set(STATIC_POSTS.map(p => p.id));
            setPosts([...dynamicPosts.filter(dp => !existingIds.has(dp.id)), ...STATIC_POSTS]);
        };
        fetchPosts();
    }, []);

    const categories = ['All', ...Array.from(new Set(posts.map(p => p.category || 'Automation')))];
    const visiblePosts = activeCategory === 'All' ? posts : posts.filter(p => (p.category || 'Automation') === activeCategory);
    const featured = visiblePosts[0];
    const gridPosts = visiblePosts.slice(1);

    return (
        <div className="min-h-screen bg-brand-white">
            <Seo
                title="Blog — AI Automation, VPS & Trading Deep Dives | Lanre"
                description="Deep dives into AI automation with n8n, VPS infrastructure, crypto nodes, and algorithmic trading — converted directly from technical video breakdowns."
                path="/blog/"
                jsonLd={[
                    collectionSchema(
                        'The Digital Laboratory Log',
                        'Deep dives into automation, node infrastructure, and market mechanics.',
                        'https://lanreenlight.com/blog/',
                        posts.map(post => ({ name: post.title, path: `/blog/${post.id}` }))
                    ),
                ]}
            />

            {/* Hero */}
            <section className="relative bg-brand-black text-white overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
                <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
                <div className="absolute top-[-20%] left-[-10%] w-[45%] h-[45%] bg-brand-accent/10 rounded-full blur-[120px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            <i className="fa-solid fa-flask"></i>
                            The Digital Laboratory Log
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 max-w-3xl tracking-tight">
                            Experiments, <span className="text-brand-accent italic">Published</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
                            Deep dives into automation, node infrastructure, and market mechanics — converted directly from my technical video breakdowns.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Category filter */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-brand-black text-white shadow-lg'
                                    : 'bg-brand-secondary text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {visiblePosts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No posts in this category yet — the lab is still running experiments.</p>
                    </div>
                )}

                {/* Featured post */}
                {featured && (
                    <FadeIn>
                        <Link
                            to={`/blog/${featured.id}`}
                            className="group block rounded-3xl overflow-hidden border border-brand-border hover:shadow-2xl transition-all duration-500 mb-12 bg-white"
                        >
                            <div className="grid lg:grid-cols-2">
                                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                                    <img
                                        src={featured.imageUrl}
                                        alt={featured.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-brand-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Latest Entry
                                        </span>
                                        <span
                                            className="text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                                            style={{ backgroundColor: CATEGORY_COLORS[featured.category || 'Automation'] || '#18181b' }}
                                        >
                                            {featured.category || 'Automation'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="text-sm text-brand-accent font-medium mb-3">{formatDate(featured.date)}</div>
                                    <h2 className="text-2xl md:text-4xl font-serif text-brand-black mb-4 group-hover:text-brand-accent transition-colors leading-tight">
                                        {featured.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-8">{featured.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center text-brand-black font-semibold group-hover:text-brand-accent transition-colors">
                                            Read Article
                                            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                        </span>
                                        <span className="text-xs text-gray-400"><i className="fa-regular fa-clock mr-1"></i>5 min read</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </FadeIn>
                )}

                {/* Post grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridPosts.map((post, index) => (
                        <FadeIn key={post.id} delay={index * 80}>
                            <Link
                                to={`/blog/${post.id}`}
                                className="group block bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span
                                            className="text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                                            style={{ backgroundColor: CATEGORY_COLORS[post.category || 'Automation'] || '#18181b' }}
                                        >
                                            {post.category || 'Automation'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-sm text-brand-accent font-medium mb-3">{formatDate(post.date)}</div>
                                    <h3 className="text-xl font-serif text-brand-black mb-4 group-hover:text-brand-accent transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">{post.excerpt}</p>
                                    <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                                        <span className="inline-flex items-center text-brand-black text-sm font-semibold group-hover:text-brand-accent transition-colors">
                                            Read Article
                                            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                        </span>
                                        <span className="text-xs text-gray-400"><i className="fa-regular fa-clock mr-1"></i>5 min read</span>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <FadeIn>
                    <div className="mt-20 bg-brand-black text-white rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-[-30%] right-[-10%] w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-serif mb-4">Get the Lab Notes in Your Inbox</h2>
                            <p className="text-gray-300 font-light text-lg max-w-xl mx-auto mb-8">
                                New experiments, guides, and breakdowns — once a week, no noise. Join the Scalability Weekly list.
                            </p>
                            <a href="/#contact" className="inline-flex items-center px-10 py-4 bg-brand-accent text-brand-black rounded-full font-bold hover:bg-white transition-colors duration-300 shadow-xl">
                                Join the Newsletter
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};