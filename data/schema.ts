export const SITE_URL = 'https://lanreenlight.com';
export const SITE_NAME = 'Lanreenlight';

const sameAs = [
    'https://www.youtube.com/@lanreenlight_official',
    'https://www.tiktok.com/@lanreenlight_official',
    'https://github.com/olatonrain',
    'https://www.linkedin.com/in/olatonrain',
    'https://www.instagram.com/lanreenlight_official',
    'https://www.facebook.com/lanreenlight_official',
    'https://t.me/lanreenlight_official',
];

export const authorPerson = {
    '@type': 'Person',
    name: 'Lanre',
    url: SITE_URL,
    image: `${SITE_URL}/lanre.jpg`,
    jobTitle: 'AI Automation & Systems Engineer',
    sameAs,
    worksFor: { '@type': 'Organization', name: 'MetroHyp Digital' },
};

export const personSchema = {
    '@context': 'https://schema.org',
    ...authorPerson,
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
};

export const articleSchema = (
    headline: string,
    description: string,
    url: string,
    datePublished?: string
) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/lanre.jpg`,
    datePublished,
    author: { '@type': 'Person', name: 'Lanre', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'MetroHyp Digital' },
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
    })),
});

export const profilePageSchema = (
    url: string,
    name: string,
    description: string,
    certifications: string[],
    person: typeof authorPerson
) => ({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    mainEntityOfPage: url,
    name,
    description,
    mainEntity: person,
    hasPart: certifications.map(name => ({
        '@type': 'CreativeWork',
        name,
    })),
});

export const collectionSchema = (
    name: string,
    description: string,
    url: string,
    items: { name: string; path: string }[]
) => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntityOfPage: url,
    hasPart: items.map(item => ({
        '@type': 'BlogPosting',
        headline: item.name,
        url: `${SITE_URL}${item.path}`,
    })),
});
