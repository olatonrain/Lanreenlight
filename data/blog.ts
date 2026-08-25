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
import post4 from './posts/how-i-made-bless-network-pay-1000.json';
import post5 from './posts/n8n-vps-blueprint-charge-clients-500.json';

export const BLOG_POSTS: BlogPost[] = [
    {
        id: post4.id,
        title: post4.title,
        date: post4.date,
        category: post4.category || 'Automation',
        excerpt: post4.excerpt,
        imageUrl: post4.imageUrl,
        youtubeId: post4.youtubeId || 'dQw4w9WgXcQ',
        content: post4.content,
    },
    {
        id: post5.id,
        title: post5.title,
        date: post5.date,
        category: post5.category || 'Automation',
        excerpt: post5.excerpt,
        imageUrl: post5.imageUrl,
        youtubeId: post5.youtubeId || 'dQw4w9WgXcQ',
        content: post5.content,
    },
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
