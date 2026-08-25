export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    imageUrl: string;
    youtubeId: string;
    content?: string; // Full HTML content from n8n
    category?: string;
    youtube_url?: string;
}

import post1 from './posts/the-shift-why-i-left-traditional-marketing.json';
import post2 from './posts/from-digital-marketer-to-ai-architect.json';
import post3 from './posts/self-host-ai-agents-on-a-vps.json';

export const BLOG_POSTS: BlogPost[] = [
    {
        id: post3.id,
        title: post3.title,
        date: post3.date,
        category: post3.category || 'Automation',
        excerpt: post3.excerpt,
        imageUrl: post3.imageUrl,
        youtubeId: post3.youtubeId || 'dQw4w9WgXcQ',
        content: post3.content,
    },
    {
        id: post1.id,
        title: post1.title,
        date: post1.date,
        category: post1.category || 'Automation',
        excerpt: post1.excerpt,
        imageUrl: post1.imageUrl,
        youtubeId: post1.youtubeId || 'dQw4w9WgXcQ',
        content: post1.content,
    },
    {
        id: post2.id,
        title: post2.title,
        date: post2.date,
        category: post2.category || 'Automation',
        excerpt: post2.excerpt,
        imageUrl: post2.imageUrl,
        youtubeId: post2.youtubeId || 'dQw4w9WgXcQ',
        content: post2.content,
    },
];
