import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const CanonicalLink: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (link?.hasAttribute('data-page')) return;
        const canonicalUrl = `https://lanreenlight.com${location.pathname}`;

        if (link) {
            link.href = canonicalUrl;
        } else {
            link = document.createElement('link');
            link.rel = 'canonical';
            link.href = canonicalUrl;
            document.head.appendChild(link);
        }
    }, [location.pathname]);

    return null;
};

export default CanonicalLink;