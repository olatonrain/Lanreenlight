import React, { useEffect } from 'react';
import { SITE_URL } from '../data/schema';

interface SeoProps {
    title: string;
    description: string;
    path: string;
    ogType?: string;
    ogImage?: string;
    jsonLd?: Record<string, unknown>[];
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

export const Seo: React.FC<SeoProps> = ({
    title,
    description,
    path,
    ogType = 'website',
    ogImage = `${SITE_URL}/lanre.jpg`,
    jsonLd = [],
}) => {
    const jsonLdKey = JSON.stringify(jsonLd);

    useEffect(() => {
        const url = `${SITE_URL}${path}`;
        document.title = title;
        setMeta('name', 'description', description);
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', url);
        setMeta('property', 'og:type', ogType);
        setMeta('property', 'og:image', ogImage);
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:url', url);

        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = url;

        document.querySelectorAll('script[data-page-jsonld]').forEach(script => script.remove());
        jsonLd.forEach(block => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-page-jsonld', 'true');
            script.textContent = JSON.stringify(block);
            document.head.appendChild(script);
        });
    }, [title, description, path, ogType, ogImage, jsonLdKey]);

    return null;
};
