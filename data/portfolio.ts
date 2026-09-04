export interface CertificateEntry {
    name: string;
    issuer?: string;
    url?: string;
}

export interface ProjectEntry {
    name: string;
    url?: string;
    image?: string;
    problem: string;
    outcome: string;
    tags: string[];
}

export interface PortfolioEntry {
    name: string;
    shortName: string;
    roles: string[];
    videoUrl: string;
    stats: { value: string; label: string }[];
    bio: string[];
    skills: { label: string; icon: string }[];
    certificates: CertificateEntry[];
    certificateYears: string;
    certificateNote: string;
    press: { publications: string[]; line: string };
    projects: ProjectEntry[];
}

export const PORTFOLIO: PortfolioEntry = {
    name: 'Aro-Lambo Akeem Olanrewaju',
    shortName: 'Lanre',
    roles: ['AI Automation & Systems Engineer', 'SEO Specialist'],
    videoUrl: 'https://drive.google.com/file/d/1ZgzXH2qEdrgrWLuBr1mdvoTYhnLTPRZs/view',
    stats: [
        { value: '5+', label: 'Years in digital' },
        { value: '17', label: 'Verified certifications' },
        { value: '3', label: 'National publications' },
        { value: '10', label: 'Case studies' },
    ],
    bio: [
        'I\'m Aro-Lambo Akeem Olanrewaju — Lanre for short. I came to tech through science fiction and an electrical engineering degree at LASUSTECH, and paid my way through school working as a digital marketer for brands and companies.',
        'That path never split. Five-plus years later, I understand both sides of a website: how it earns attention (SEO, content, digital campaigns) and how to build the systems that do the work automatically — n8n workflows, Python, VPS infrastructure.',
        'I run everything from a dedicated studio with a fast connection and 24/7 solar power, so the systems I build and manage don\'t sleep.',
    ],
    skills: [
        { label: 'AI Automation', icon: 'fa-diagram-project' },
        { label: 'Digital Marketing', icon: 'fa-bullhorn' },
        { label: 'Data Analysis', icon: 'fa-chart-simple' },
        { label: 'Web Design', icon: 'fa-pen-ruler' },
        { label: 'Cybersecurity', icon: 'fa-shield-halved' },
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
    },
    projects: [
        {
            name: 'Metrohyp.com',
            url: 'https://metrohyp.com',
            image: '/lanre.jpg',
            problem: 'The site was ranking the wrong pages for the right keywords — visibility existed, but it pointed at the wrong URLs.',
            outcome: 'Pages re-mapped to their target keywords. Clicks, impressions, and average position all recovered to where they should be.',
            tags: ['SEO', 'Keyword Mapping', 'Site Architecture'],
        },
        {
            name: 'Fastryders',
            image: '/lanre.jpg',
            problem: 'Google was surfacing the site for very few keywords — high impressions, low clicks.',
            outcome: 'Keyword coverage rebuilt and rankings fixed, so the impressions finally convert into clicks.',
            tags: ['SEO', 'Keyword Strategy'],
        },
        {
            name: 'Footcity',
            url: 'https://footcity.com',
            image: '/lanre.jpg',
            problem: 'Competitive product keywords like “Crocs Nigeria” were buried beyond page one.',
            outcome: 'Now ranks on the first page for multiple high-intent keywords, including “Crocs Nigeria”.',
            tags: ['E-commerce SEO', 'Product Keywords', 'First Page'],
        },
        {
            name: 'Metrohyp Digital',
            url: 'https://metrohyp.com.ng',
            image: '/lanre.jpg',
            problem: 'Transactional keywords with clear buying intent were not converting into visibility.',
            outcome: 'Site now ranks #2 on Google for multiple transactional keywords.',
            tags: ['SEO', 'Transactional Keywords', 'Top 2'],
        },
        {
            name: 'DivAi',
            image: '/lanre.jpg',
            problem: 'A brand-new domain needed to compete for a competitive keyword from scratch.',
            outcome: 'Hit first-page ranking at position 3 in under two months after launch.',
            tags: ['SEO', 'New Domain', 'Top 3 in 2 Months'],
        },
        {
            name: 'SEOSOLUTION.NG',
            url: 'https://seosolution.ng',
            image: '/lanre.jpg',
            problem: 'A digital marketing agency needed its own SEO to match the service it sells — improving online presence and visibility for clients.',
            outcome: 'Agency site positioned to rank for SEO service terms and generate inbound agency leads.',
            tags: ['Agency SEO', 'Lead Generation', 'Digital Marketing'],
        },
        {
            name: 'EMERGINGWELLSPRINGS.COM',
            url: 'https://emergingwellsprings.com',
            image: '/lanre.jpg',
            problem: 'A JAPA-focused travel e-commerce brand needed to reach Nigerians planning moves to Canada, UK and beyond via consultations and ebooks.',
            outcome: 'E-commerce and content structure optimised for JAPA search intent, consultations and ebook sales.',
            tags: ['E-commerce', 'Travel', 'Content SEO'],
        },
        {
            name: 'METROHYP.COM.NG',
            url: 'https://metrohyp.com.ng',
            image: '/lanre.jpg',
            problem: 'A social-media services agency struggled to translate its service quality into search visibility.',
            outcome: 'Site now surfaces for social media service terms, improving brand and social presence for clients searching for help.',
            tags: ['Social Media', 'Agency SEO', 'Visibility'],
        },
        {
            name: 'ZEELUXWEARS.COM.NG',
            url: 'https://zeeluxwears.com.ng',
            image: '/lanre.jpg',
            problem: 'A fashion e-commerce store needed to stand out for “fashion wears” across individual and brand buyers.',
            outcome: 'Store optimised for fashion e-commerce discovery, connecting products with shoppers searching by style and category.',
            tags: ['E-commerce', 'Fashion', 'Product SEO'],
        },
        {
            name: 'Telychat.com',
            url: 'https://telychat.com',
            image: '/lanre.jpg',
            problem: 'An AI-powered customer engagement SaaS for social commerce (formerly Repsolute AI) needed to explain a complex product simply and rank for it.',
            outcome: 'Positioned as an AI customer engagement platform for businesses and social commerce entrepreneurs, with clear messaging and search-ready pages.',
            tags: ['SaaS', 'AI', 'Customer Engagement'],
        },
    ],
};
