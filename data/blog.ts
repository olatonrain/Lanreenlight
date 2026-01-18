export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    imageUrl: string;
    youtubeId: string;
    content?: string; // Full HTML content from n8n
    category?: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'How to Charge $500 Setup Fees for N8N Automation',
        excerpt: 'A complete breakdown of the business model behind selling n8n automation services, including VPS setup and client acquisition.',
        date: 'Feb 14, 2025',
        imageUrl: 'https://img.youtube.com/vi/dbrjeJRxSco/maxresdefault.jpg',
        youtubeId: 'dbrjeJRxSco'
    },
    {
        id: '2',
        title: 'Self-Hosting N8N: The Ultimate Guide for 2025',
        excerpt: 'avoiding the common pitfalls of self-hosting. Why Hostinger might be your best bet and how to configure it correctly.',
        date: 'Feb 04, 2025',
        imageUrl: 'https://img.youtube.com/vi/RPPJkD452iU/maxresdefault.jpg',
        youtubeId: 'RPPJkD452iU'
    },
    {
        id: '3',
        title: 'Trading Bots & Forex: Real Results',
        excerpt: 'Analyzing a month of automated trading performance. Can an AI bot really generate over $1000/month in profit?',
        date: 'Jan 15, 2025',
        imageUrl: 'https://img.youtube.com/vi/ZNUfwpIVpPE/maxresdefault.jpg',
        youtubeId: 'ZNUfwpIVpPE'
    }
];
