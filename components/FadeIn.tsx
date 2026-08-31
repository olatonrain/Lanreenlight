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
        const currentElement = domRef.current;
        if (!currentElement) return;

        // Reveal immediately if the element already intersects the viewport at mount.
        // threshold 0.1 can never fire for elements taller than ~10x the viewport
        // (e.g. long blog posts), which left them permanently invisible.
        const rect = currentElement.getBoundingClientRect();
        const intersectsAtMount =
            rect.top < window.innerHeight && rect.bottom > 0;

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

        if (intersectsAtMount) {
            setIsVisible(true);
        } else {
            observer.observe(currentElement);
        }

        return () => {
            observer.unobserve(currentElement);
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
            className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${fullWidth ? 'w-full' : ''} ${className} ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClasses()}`
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};