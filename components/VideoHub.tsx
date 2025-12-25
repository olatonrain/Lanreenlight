
import React, { useState, useMemo } from 'react';
import { VIDEOS } from '../data/videos';
import { FadeIn } from './FadeIn';
import { Video } from '../types';

const CATEGORIES = ['All', 'Crypto', 'Node Ops', 'AI Automation', 'Forex'] as const;

export const VideoHub: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

    const filteredVideos = useMemo(() => {
        return VIDEOS.filter(video => {
            const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    const toggleResources = (id: string) => {
        setExpandedVideo(expandedVideo === id ? null : id);
    };

    return (
        <section id="knowledge-hub" className="py-24 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <FadeIn direction="right">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-3 tracking-tight">Knowledge Hub</h2>
                            <p className="text-gray-600 font-light text-lg">In-depth technical guides, market analysis, and node operations.</p>
                        </div>
                    </FadeIn>
                    
                    <FadeIn direction="left" className="w-full md:w-auto">
                        <div className="relative group">
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors"></i>
                            <input 
                                type="text"
                                placeholder="Search videos or resources..."
                                className="w-full md:w-80 pl-12 pr-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all text-sm font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </FadeIn>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 ${
                                selectedCategory === cat 
                                ? 'bg-brand-black text-white shadow-lg' 
                                : 'bg-brand-secondary text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVideos.map((video, index) => (
                        <FadeIn key={video.id} delay={index * 100}>
                            <div className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img 
                                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <a 
                                            href={`https://youtube.com/watch?v=${video.youtubeId}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-16 h-16 bg-brand-accent text-white rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 active:scale-90 transition-transform"
                                        >
                                            <i className="fa-solid fa-play ml-1"></i>
                                        </a>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-brand-black border border-brand-border uppercase tracking-widest shadow-sm">
                                            {video.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-[11px] font-medium text-gray-400 mb-2">{video.date}</div>
                                    <h3 className="text-xl font-serif text-brand-black mb-6 line-clamp-2 leading-snug group-hover:text-brand-accent transition-colors">
                                        {video.title}
                                    </h3>

                                    <div className="mt-auto space-y-2">
                                        <button 
                                            onClick={() => toggleResources(video.id)}
                                            className="w-full flex items-center justify-between p-3 rounded-lg bg-brand-secondary text-brand-black text-sm font-semibold hover:bg-gray-200 transition-colors"
                                        >
                                            <span>Resources & Links</span>
                                            <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${expandedVideo === video.id ? 'rotate-180' : ''}`}></i>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedVideo === video.id ? 'max-h-60' : 'max-h-0'}`}>
                                            <div className="py-3 px-1 flex flex-wrap gap-2">
                                                {video.resources.map((link, idx) => (
                                                    <a 
                                                        key={idx}
                                                        href={link.url}
                                                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-brand-border text-xs font-bold text-gray-600 hover:border-brand-accent hover:text-brand-black hover:shadow-sm transition-all"
                                                    >
                                                        <i className={`fa-solid ${link.type === 'affiliate' ? 'fa-cart-shopping' : link.type === 'source' ? 'fa-code' : 'fa-link'} text-[10px] text-brand-accent`}></i>
                                                        {link.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {filteredVideos.length === 0 && (
                    <div className="text-center py-20">
                        <i className="fa-solid fa-video-slash text-4xl text-gray-200 mb-4"></i>
                        <p className="text-gray-500 font-light">No videos found matching your search.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
