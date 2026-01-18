import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from '../data/blog';
import { FadeIn } from './FadeIn';

const loadPost = async (id: string): Promise<BlogPost | null> => {
    // 1. Try loading from JSON files
    try {
        const modules = import.meta.glob('../data/posts/*.json');
        for (const path in modules) {
            // Check if filename matches ID (e.g. "my-post.json" -> "my-post")
            if (path.includes(`/${id}.json`)) {
                const mod = await modules[path]() as any;
                const data = mod.default || mod;
                return {
                    id: id,
                    title: data.title,
                    date: data.date,
                    category: data.category || 'Opinion',
                    excerpt: data.excerpt,
                    content: data.content, // This will be the HTML/Markdown from n8n
                    imageUrl: data.imageUrl,
                    youtubeId: data.youtubeId,
                    youtube_url: data.youtube_url
                };
            }
        }
    } catch (e) {
        console.error("Error finding post:", e);
    }
    return null;
};

export const BlogPostPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        loadPost(id).then(data => {
            setPost(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-serif text-brand-black mb-4">Post not found</h2>
                <Link to="/blog" className="text-brand-accent hover:underline">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-brand-white pt-32 pb-20">
            {/* Hero Image */}
            <div className="w-full h-[40vh] md:h-[50vh] relative mb-16 overflow-hidden">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto">
                    <FadeIn delay={0.2} direction="up">
                        <div className="flex items-center gap-4 text-white/80 mb-4 text-sm font-medium">
                            <span className="bg-brand-accent text-brand-black px-3 py-1 rounded-full">{post.category}</span>
                            <span>{post.date}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white max-w-4xl leading-tight">
                            {post.title}
                        </h1>
                    </FadeIn>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Content */}
                <FadeIn delay={0.4} direction="up">
                    <div className="article-content bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-border">
                        {/* If we have a YouTube video, show it first */}
                        {post.youtubeId && post.youtubeId !== 'dQw4w9WgXcQ' && (
                            <div className="aspect-video w-full mb-8 rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${post.youtubeId}`}
                                    title={post.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        <div dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }} />
                    </div>
                </FadeIn>

                {/* Footer Navigation */}
                <div className="mt-16 text-center">
                    <Link to="/blog" className="inline-flex items-center text-brand-black font-semibold hover:text-brand-accent transition-colors border border-brand-border px-8 py-3 rounded-full hover:bg-brand-secondary">
                        ← Back to Knowledge Hub
                    </Link>
                </div>
            </div>
        </article>
    );
};
