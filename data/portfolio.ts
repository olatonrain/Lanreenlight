export type ProjectCategory = 'SEO Case Studies' | 'Websites Built & Grown' | 'AI & Automation Systems';

export interface CertificateEntry {
    name: string;
    issuer?: string;
    url?: string;
}

export interface ProjectEntry {
    name: string;
    url?: string;
    image?: string;
    imageAlt?: string;
    category: ProjectCategory;
    problem?: string;
    outcome?: string;
    description?: string;
    tags: string[];
}

export interface PortfolioEntry {
    name: string;
    shortName: string;
    roles: string[];
    videoUrl: string;
    portrait: string;
    stats: { value: string; label: string }[];
    bio: string[];
    skills: { label: string; icon: string }[];
    certificates: CertificateEntry[];
    certificateYears: string;
    certificateNote: string;
    press: { publications: string[]; line: string; evidenceImage?: string };
    categories: ProjectCategory[];
    projects: ProjectEntry[];
    contact: {
        linkedins: { handle: string; url: string }[];
        github: string;
        instagram: string;
        email: string;
    };
}

export const PORTFOLIO: PortfolioEntry = {
    name: 'Aro-Lambo Akeem O.',
    shortName: 'Lanre',
    roles: ['AI Automation & Systems Engineer', 'SEO Specialist'],
    videoUrl: 'https://drive.google.com/file/d/1ZgzXH2qEdrgrWLuBr1mdvoTYhnLTPRZs/view',
    portrait: '/portfolio-media/lanre-portrait.png',
    stats: [
        { value: '5+', label: 'Years in digital' },
        { value: '17', label: 'Verified certifications' },
        { value: '3', label: 'National publications' },
        { value: '19', label: 'Projects delivered' },
    ],
    bio: [
        'I\'m Aro-Lambo Akeem O. — Lanre for short. I came to tech through science fiction and an electrical engineering degree at LASUSTECH, and paid my way through school working as a digital marketer for brands and companies.',
        'That path never split. Over five years later, I understand both sides of a website: how it earns attention (SEO, content, digital campaigns) and how to build the systems that do the work automatically — n8n workflows, Python, VPS infrastructure.',
        'I run everything from a dedicated studio with a fast connection and 24/7 solar power, so the systems I build and manage don\'t sleep.',
    ],
    skills: [
        { label: 'AI Automation', icon: 'fa-diagram-project' },
        { label: 'Digital Marketing', icon: 'fa-bullhorn' },
        { label: 'SEO/AEO/GEO expert', icon: 'fa-magnifying-glass' },
        { label: 'Web Design', icon: 'fa-pen-ruler' },
        { label: 'Cybersecurity basics', icon: 'fa-shield-halved' },
        { label: 'Leadership', icon: 'fa-people-group' },
    ],
    certificates: [
        { name: 'Google AI Professional Certificate', issuer: 'Credly', url: 'https://www.credly.com/badges/d88ba142-d8ca-414a-a4eb-22dc6cfad7fe/linked_in_profile' },
        { name: 'AI Agents, AI Automations & AI Voice Agents', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-56f3630b-0d7c-43c3-9545-26112d5931e9/' },
        { name: 'Building with the Claude API', issuer: 'Skilljar', url: 'https://verify.skilljar.com/c/e49jcd3c3i6w' },
        { name: 'AI Fluency Framework & Foundations', issuer: 'Skilljar', url: 'https://verify.skilljar.com/c/m3v9n6omqvw5' },
        { name: 'AI Capabilities and Limitations', issuer: 'Skilljar', url: 'https://verify.skilljar.com/c/8ckdgcun276m' },
        { name: 'AI for Research and Insights', issuer: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/LV9I5MO62R40' },
        { name: 'Advance Digital Marketing Specialist', issuer: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/certificates/d8378570e8f17788f41b9a695e4284616a9b108d6644006eff436307e6e3da46' },
        { name: 'Advance Google Analytics', issuer: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/certificates/3e377c4fe7355165171d472c69cc9640cea6ce3b0a0a36cdabcdda1a34d5d44b' },
        { name: 'Google Ads Certificate: Drive Sales with PPC', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-e682027c-9b8f-4f3f-92b4-a4fd454fe2cc/' },
        { name: 'SEO: Competitive Analysis', issuer: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/certificates/c26d7510d3c6fdb04dad9d6ca3db67886c8ed7e6ee393b66e38b98bc2f26b14e' },
        { name: 'Advanced SEO Masterclass', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-97ac2b8d-922d-4de7-8217-3251fcf67f97/' },
        { name: 'Optimization SEO: Keyword Strategy' },
        { name: 'Optimizing a Website for Google Search', issuer: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/W9RZ2CCRFFLD' },
        { name: 'Cybersecurity Essentials', issuer: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/73MQKSZL75E6' },
        { name: 'Social Media Marketing: Strategy', issuer: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/certificates/c5510f9f1d4060b0145f3cf235f5857ce2baa7deb9efa5e524a11e9947d24bc2' },
        { name: 'Advertising with Meta', issuer: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/EC1YGMAEDSY2' },
        { name: 'Malware Removal & Hacked Website Recovery', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-a774f660-c3a6-4912-9c44-c0c95963d438/' },
    ],
    certificateYears: '2022 – 2026',
    certificateNote: 'Earned across Google, Meta, Anthropic, Coursera, Udemy, and LinkedIn Learning — each one links to its verification page.',
    press: {
        publications: ['The Guardian', 'Vanguard', 'Blueprint'],
        line: 'Recognised as a digital expert in national publications.',
        evidenceImage: '/portfolio-media/press-serp.jpg',
    },
    categories: ['SEO Case Studies', 'Websites Built & Grown', 'AI & Automation Systems'],
    projects: [
        // ── SEO Case Studies ──
        {
            name: 'Metrohyp.com',
            url: 'https://metrohyp.com',
            image: '/portfolio-media/metrohyp-com-gsc.png',
            imageAlt: 'Google Search Console for metrohyp.com: 135 clicks, 10.2K impressions over the last 3 months',
            category: 'SEO Case Studies',
            problem: 'The site was ranking the wrong pages for the right keywords — visibility existed, but it pointed at the wrong URLs.',
            outcome: 'Pages re-mapped to their target keywords. Clicks, impressions, and average position all recovered to where they should be — 10.2K impressions in the last 3 months.',
            tags: ['SEO', 'Keyword Mapping', 'Site Architecture'],
        },
        {
            name: 'Fastryders',
            image: '/portfolio-media/fastryders-gsc.png',
            imageAlt: 'Google Search Console for fastryders: 117 clicks and 3.62K impressions over 12 months',
            category: 'SEO Case Studies',
            problem: 'Google was surfacing the site for very few keywords — high impressions, low clicks.',
            outcome: 'Keyword coverage rebuilt and rankings fixed, so the impressions finally convert into clicks.',
            tags: ['SEO', 'Keyword Strategy'],
        },
        {
            name: 'Homecraft Gutter Protection',
            url: 'https://homecraftgutterprotection.com',
            image: '/portfolio-media/homecraft-gsc.png',
            imageAlt: 'Google Search Console for homecraftgutterprotection.com: 66.9K clicks and 8.39M impressions in 16 months',
            category: 'SEO Case Studies',
            problem: 'A gutter-protection site needed the right keywords pulling the right kind of traffic.',
            outcome: 'Now ranks for the terms its buyers actually search — 66.9K clicks and 8.39M impressions over 16 months.',
            tags: ['SEO', 'Keyword Targeting', 'Local Services'],
        },
        {
            name: 'Metrohyp.com.ng',
            url: 'https://metrohyp.com.ng',
            image: '/portfolio-media/metrohyp-com-ng-gsc.png',
            imageAlt: 'Google Search Console for metrohyp.com.ng: 1.59K clicks and 68.9K impressions over 12 months',
            category: 'SEO Case Studies',
            problem: 'On-page SEO, link building, and domain authority all needed work; the site also had to stand apart from the usual SMM-agency template.',
            outcome: 'Rebuilt for better search experience — 1.59K clicks and 68.9K impressions over 12 months, plus a restructure that makes it look nothing like the standard social-media-marketing site.',
            tags: ['On-Page SEO', 'Link Building', 'Domain Authority', 'SXO'],
        },
        {
            name: 'My LibriBooks',
            image: '/portfolio-media/mylibribooks-ga4.png',
            imageAlt: 'Google Analytics 4 report snapshot for My LibriBooks showing 18K active users',
            category: 'SEO Case Studies',
            problem: 'A reading app needed real growth in active users — and the analytics to prove where every user came from.',
            outcome: 'Scaled to 18K active users in 90 days, with acquisition tracked across Direct, Organic Social, and Search in Google Analytics 4.',
            tags: ['GA4', 'Growth', 'App Analytics'],
        },
        {
            name: 'My LibriBooks — Meta Ads',
            image: '/portfolio-media/mylibribooks-meta.png',
            imageAlt: 'Meta Ads manager results: 953,101 accounts reached with £168.31 total spend',
            category: 'SEO Case Studies',
            problem: 'Paid social had to stretch a small budget across multiple campaigns without wasting spend.',
            outcome: 'Reached 953K+ accounts across 7 Meta campaigns with £168.31 total spend — averaging £0.01 per link click.',
            tags: ['Meta Ads', 'Paid Social', '£0.01 CPC'],
        },
        {
            name: 'Footcity',
            image: '/portfolio-media/footcity-serp.png',
            imageAlt: 'Google search results for "crocs nigeria" showing Footcity at the top',
            category: 'SEO Case Studies',
            problem: 'Competitive product keywords like "Crocs Nigeria" were buried beyond page one.',
            outcome: 'Ranks on the first page of Google for "Crocs Nigeria" and other high-intent product keywords.',
            tags: ['E-commerce SEO', 'First Page'],
        },
        {
            name: 'Metrohyp Digital',
            url: 'https://metrohyp.com.ng',
            image: '/portfolio-media/metrohyp-digital-serp.png',
            imageAlt: 'Google search results for "buy nigerian instagram followers" showing Metrohyp Digital at position two',
            category: 'SEO Case Studies',
            problem: 'Transactional keywords with clear buying intent were not converting into visibility.',
            outcome: 'Ranks #2 on Google for "buy Nigerian Instagram followers" and other transactional terms.',
            tags: ['Transactional Keywords', 'Top 2'],
        },
        {
            name: 'DivAi',
            url: 'https://div.ai',
            image: '/portfolio-media/divai-serp.png',
            imageAlt: 'Google search results for "div ai" showing div.ai as the top result',
            category: 'SEO Case Studies',
            problem: 'A brand-new domain needed to compete for a competitive keyword from scratch.',
            outcome: 'Hit the #1 result for "div ai" — first page at position 3 within two months of launch.',
            tags: ['New Domain', 'Top 3 in 2 Months'],
        },

        // ── Websites Built & Grown ──
        {
            name: 'SEOSOLUTION.NG',
            url: 'https://seosolution.ng',
            image: '/portfolio-media/seosolution-ng.jpg',
            imageAlt: 'SEOSolution website homepage — SEO company in Lagos',
            category: 'Websites Built & Grown',
            description: 'A digital marketing agency website offering SEO services that help businesses improve their online presence and visibility.',
            tags: ['Agency Website', 'Lagos'],
        },
        {
            name: 'Emerging Wellsprings',
            url: 'https://emergingwellsprings.com',
            image: '/portfolio-media/emergingwellsprings.jpg',
            imageAlt: 'Emerging Wellsprings website homepage — move to your dream country',
            category: 'Websites Built & Grown',
            description: 'A travel e-commerce company helping people planning to JAPA to countries like Canada and the UK — via consultation or ebooks.',
            tags: ['E-commerce', 'Travel', 'Consultations & Ebooks'],
        },
        {
            name: 'ZEELUXWEARS.COM.NG',
            url: 'https://zeeluxwears.com.ng',
            image: '/portfolio-media/zeeluxwears.jpg',
            imageAlt: 'Zeelux Wears website homepage — fashion designer in Lagos',
            category: 'Websites Built & Grown',
            description: 'An e-commerce fashion company selling various fashion wears to individuals and brands.',
            tags: ['E-commerce', 'Fashion'],
        },
        {
            name: 'Metrohyp.com.ng',
            url: 'https://metrohyp.com.ng',
            image: '/portfolio-media/metrohyp-com-ng-site.jpg',
            imageAlt: 'Metrohyp.com.ng website homepage — Buy Nigerian Follower services',
            category: 'Websites Built & Grown',
            description: 'A social-media services agency website helping businesses and brands improve their social presence and visibility.',
            tags: ['Agency Website', 'Social Media'],
        },
        {
            name: 'Metrohyp.com — Digital Infrastructure',
            url: 'https://metrohyp.com',
            image: '/portfolio-media/metrohyp-com-site.png',
            imageAlt: 'Metrohyp.com website homepage — systems, automation, and growth execution',
            category: 'Websites Built & Grown',
            description: 'MetroHyp Digital builds the end-to-end digital infrastructure that makes businesses grow, automate, and earn — everything connected, everything lean, and everything designed to compound over time.',
            tags: ['Infrastructure', 'Systems'],
        },
        {
            name: 'DivAi (div.ai)',
            url: 'https://div.ai',
            image: '/portfolio-media/divai-pro.jpg',
            imageAlt: 'DivAi website — AI chat bots, contents, images, voiceovers',
            category: 'Websites Built & Grown',
            description: 'A SaaS AI website offering all ChatGPT-class services at more affordable prices, used by businesses and individuals.',
            tags: ['SaaS', 'AI Tools'],
        },
        {
            name: 'MetroHyp Properties',
            url: 'https://metrohypproperties.com.ng',
            image: '/portfolio-media/metrohyp-properties.jpg',
            imageAlt: 'MetroHyp Properties website — property listings for sale and rent',
            category: 'Websites Built & Grown',
            description: 'A real estate company website selling properties — land, houses, and rentals.',
            tags: ['Real Estate', 'Listings'],
        },
        {
            name: 'Holis Botanicals',
            url: 'https://holisbotanicals.com',
            image: '/portfolio-media/holis-botanicals.png',
            imageAlt: 'Holis Botanicals website — NAFDAC-certified herbal supplements',
            category: 'Websites Built & Grown',
            description: 'A NAFDAC-certified herbal supplement company built for Nigerian men taking their health seriously, starting with prostate health — diagnosis awareness and natural solutions first, backed by regulatory approval.',
            tags: ['E-commerce', 'Health', 'NAFDAC'],
        },

        // ── AI & Automation Systems ──
        {
            name: 'Telychat.com',
            url: 'https://telychat.com',
            image: '/portfolio-media/telychat.png',
            imageAlt: 'Telychat website homepage — AI-powered customer engagement platform',
            category: 'AI & Automation Systems',
            description: 'An AI-powered customer engagement SaaS platform built for businesses and social commerce entrepreneurs (formerly Repsolute AI).',
            tags: ['SaaS', 'AI', 'Customer Engagement'],
        },
        {
            name: 'Intelligent Daily Media Automation Flow',
            image: '/portfolio-media/media-automation.png',
            imageAlt: 'Automation pipeline diagram — AI images, voice narration, structured assets compiled into video',
            category: 'AI & Automation Systems',
            description: 'A fully automated daily pipeline that generates AI images, voice narration, and structured assets — then compiles everything into a polished, ready-to-publish video. Handled end to end, every day, without manual effort.',
            tags: ['n8n', 'AI Content', 'Video Pipeline'],
        },
        {
            name: 'Repsolute Controller Brain',
            image: '/portfolio-media/repsolute-brain.png',
            imageAlt: 'Architecture diagram — Controller Brain routing conversations through specialised AI agents',
            category: 'AI & Automation Systems',
            description: 'Omnichannel AI routing and agent orchestration: the Controller Brain pulls conversation state from Redis, classifies intent with Gemini, and routes to the right agent — Reception, Sales, Support, Customer Service, Lead Capture, or Human Handoff. Every reply is checked for a lead-capture flag, formatted into natural chat segments with typing delays, and sent via Chatwoot; state and follow-up eligibility are written back to Redis after every reply.',
            tags: ['AI Agents', 'Gemini', 'Redis', 'Chatwoot'],
        },
        {
            name: 'AI Lead Qualification & Multi-Channel Automation',
            image: '/portfolio-media/lead-qualification.png',
            imageAlt: 'Lead qualification flow — AI parsing, property valuation, routing across Telegram and webhooks',
            category: 'AI & Automation Systems',
            description: 'An end-to-end lead qualification system on n8n — AI parsing, real-time property valuation, multi-tier routing, and automated responses across Telegram and webhooks. Zero manual steps.',
            tags: ['n8n', 'Lead Qualification', 'Telegram'],
        },
    ],
    contact: {
        linkedins: [
            { handle: '@olatonrain', url: 'https://www.linkedin.com/in/olatonrain' },
            { handle: '@lanreenlight', url: 'https://www.linkedin.com/in/lanreenlight' },
        ],
        github: '@olatonrain',
        instagram: '@olatonrain',
        email: 'olatonrain@gmail.com',
    },
};
