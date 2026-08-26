
import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { useLocation, Link } from 'react-router-dom';

const NAV_ITEMS: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'What I Do', href: '#expertise' },
    { label: 'Why Partner', href: '#why-partner' },
    { label: 'Knowledge Hub', href: '#knowledge-hub' },
    { label: 'Blog', href: '/blog' }
];

const GUIDE_HREF = '/guides/';

const CTA_PHRASES = ['Partner With Me', 'Work With Me', "Let's Solve It"];

export const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [ctaIndex, setCtaIndex] = useState(0);
    const [ctaVisible, setCtaVisible] = useState(true);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Rotate CTA phrases every 4s with a crossfade (fade out, swap, fade in)
    useEffect(() => {
        const interval = setInterval(() => {
            setCtaVisible(false);
            setTimeout(() => {
                setCtaIndex(prev => (prev + 1) % CTA_PHRASES.length);
                setCtaVisible(true);
            }, 300);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const getHref = (href: string) => {
        if (href.startsWith('/')) return href; // Internal route like /blog
        return isHome ? href : `/${href}`; // Helper for hash links
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ease-cinematic ${isScrolled ? 'h-16 glass-nav shadow-lg py-2' : 'h-24 bg-transparent py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between h-full items-center">
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
                        <i className="fa-solid fa-server text-brand-accent text-lg group-hover:rotate-12 transition-transform duration-300"></i>
                        <span className={`font-bold text-xl tracking-tight transition-colors duration-500 ${isScrolled ? 'text-brand-black' : 'text-white'}`}>
                            LANRE<span className="text-brand-accent">.Enlight</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-10">
                        <Link
                            to={GUIDE_HREF}
                            className={`transition-colors duration-500 text-sm font-medium flex items-center gap-1 hover:underline hover:decoration-brand-accent hover:underline-offset-4 decoration-2 ${isScrolled ? 'text-gray-600 hover:text-brand-black' : 'text-white hover:text-brand-accent'}`}
                        >
                            Guides
                            <i className="fa-solid fa-book-open text-[10px]"></i>
                        </Link>
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={getHref(item.href)}
                                className={`transition-colors duration-500 text-sm font-medium hover:underline hover:decoration-brand-accent hover:underline-offset-4 decoration-2 ${isScrolled
                                        ? 'text-gray-600 hover:text-brand-black'
                                        : 'text-white hover:text-brand-accent'
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={isHome ? "#contact" : "/#contact"}
                            className="bg-brand-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 border border-transparent shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out inline-flex items-center justify-center min-w-[150px]"
                        >
                            <span
                                className={`transition-opacity duration-300 ${ctaVisible ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {CTA_PHRASES[ctaIndex]}
                            </span>
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className={`hover:text-brand-accent focus:outline-none transform active:scale-90 transition-all duration-500 ${isScrolled ? 'text-brand-black' : 'text-white'
                                }`}
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-brand-border absolute w-full shadow-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={getHref(item.href)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-black hover:bg-brand-secondary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <Link
                            to={GUIDE_HREF}
                            className="block px-3 py-2 rounded-md text-base font-medium text-brand-accent hover:text-brand-black hover:bg-brand-secondary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Guides
                        </Link>
                        <a
                            href={isHome ? "#contact" : "/#contact"}
                            className="block px-3 py-2 mt-4 text-center rounded-md text-base font-bold bg-brand-black text-white hover:bg-gray-800 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {CTA_PHRASES[ctaIndex]}
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};
