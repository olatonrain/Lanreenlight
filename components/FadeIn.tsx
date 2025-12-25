import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
    className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
    children, 
    delay = 0, 
    direction = 'up', 
    fullWidth = false,
    className = '' 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const currentElement = domRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    const getDirectionClasses = () => {
        switch (direction) {
            case 'up': return 'translate-y-8';
            case 'down': return '-translate-y-8';
            case 'left': return 'translate-x-8';
            case 'right': return '-translate-x-8';
            case 'none': return '';
            default: return 'translate-y-8';
        }
    };

    return (
        <div
            ref={domRef}
            className={`transition-all duration-700 ease-out ${fullWidth ? 'w-full' : ''} ${className} ${
                isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClasses()}`
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};