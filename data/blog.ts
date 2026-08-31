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
import post6 from './posts/n8n-cloud-vs-self-hosted-cost.json';
import post7 from './posts/n8n-production-failures-that-cost-money.json';
import post8 from './posts/best-vps-for-n8n-depin-trading-bots.json';
import post9 from './posts/n8n-retainer-playbook-500-to-3k.json';
import post10 from './posts/claude-code-vs-n8n-vs-agentrouter.json';
import post11 from './posts/depin-node-evaluation-checklist.json';
import post12 from './posts/self-hosted-coding-agents-mainstream-2026.json';
import post13 from './posts/self-host-n8n-and-omniroute-on-a-vps.json';
import post14 from './posts/n8n-ai-assistant-builds-workflows-vps.json';

export const BLOG_POSTS: BlogPost[] = [
    {
        id: post14.id,
        title: post14.title,
        date: post14.date,
        category: post14.category || 'Automation',
        excerpt: post14.excerpt,
        imageUrl: post14.imageUrl,
        youtubeId: post14.youtubeId || 'dQw4w9WgXcQ',
        content: post14.content,
    },
    {
        id: post13.id,
        title: post13.title,
        date: post13.date,
        category: post13.category || 'Automation',
        excerpt: post13.excerpt,
        imageUrl: post13.imageUrl,
        youtubeId: post13.youtubeId || 'dQw4w9WgXcQ',
        content: post13.content,
    },
    {
        id: post12.id,
        title: post12.title,
        date: post12.date,
        category: post12.category || 'Automation',
        excerpt: post12.excerpt,
        imageUrl: post12.imageUrl,
        youtubeId: post12.youtubeId || 'dQw4w9WgXcQ',
        content: post12.content,
    },
    {
        id: post9.id,
        title: post9.title,
        date: post9.date,
        category: post9.category || 'Automation',
        excerpt: post9.excerpt,
        imageUrl: post9.imageUrl,
        youtubeId: post9.youtubeId || 'dQw4w9WgXcQ',
        content: post9.content,
    },
    {
        id: post10.id,
        title: post10.title,
        date: post10.date,
        category: post10.category || 'Automation',
        excerpt: post10.excerpt,
        imageUrl: post10.imageUrl,
        youtubeId: post10.youtubeId || 'dQw4w9WgXcQ',
        content: post10.content,
    },
    {
        id: post11.id,
        title: post11.title,
        date: post11.date,
        category: post11.category || 'Automation',
        excerpt: post11.excerpt,
        imageUrl: post11.imageUrl,
        youtubeId: post11.youtubeId || 'dQw4w9WgXcQ',
        content: post11.content,
    },
    {
        id: post7.id,
        title: post7.title,
        date: post7.date,
        category: post7.category || 'Automation',
        excerpt: post7.excerpt,
        imageUrl: post7.imageUrl,
        youtubeId: post7.youtubeId || 'dQw4w9WgXcQ',
        content: post7.content,
    },
    {
        id: post8.id,
        title: post8.title,
        date: post8.date,
        category: post8.category || 'Automation',
        excerpt: post8.excerpt,
        imageUrl: post8.imageUrl,
        youtubeId: post8.youtubeId || 'dQw4w9WgXcQ',
        content: post8.content,
    },
    {
        id: post6.id,
        title: post6.title,
        date: post6.date,
        category: post6.category || 'Automation',
        excerpt: post6.excerpt,
        imageUrl: post6.imageUrl,
        youtubeId: post6.youtubeId || 'dQw4w9WgXcQ',
        content: post6.content,
    },
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
