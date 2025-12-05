import React, { useState } from 'react';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'What I Do', href: '#expertise' },
    { label: 'Why Partner', href: '#why-partner' },
];

export const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <i className="fa-solid fa-server text-brand-accent text-lg"></i>
                        <span className="font-bold text-xl tracking-tight text-brand-black">
                            LANRE<span className="text-brand-accent">.TECH</span>
                        </span>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-10">
                        {NAV_ITEMS.map((item) => (
                            <a 
                                key={item.label}
                                href={item.href} 
                                className="text-gray-600 hover:text-brand-black transition-colors text-sm font-medium"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a 
                            href="#contact" 
                            className="bg-brand-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-all border border-transparent shadow-lg hover:shadow-xl"
                        >
                            Partner With Me
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-brand-black hover:text-brand-accent focus:outline-none"
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
                                href={item.href} 
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-black hover:bg-brand-secondary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a 
                            href="#contact" 
                            className="block px-3 py-2 mt-4 text-center rounded-md text-base font-bold bg-brand-black text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Partner With Me
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};