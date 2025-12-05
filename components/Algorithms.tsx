import React from 'react';
import { ExpertAdvisor } from '../types';

const EAS: ExpertAdvisor[] = [
    {
        id: 1,
        name: 'Flux Scalper Pro',
        description: 'High-frequency scalp EA designed for low-spread pairs (EURUSD, USDJPY) during London session.',
        type: 'ACTIVE',
        typeColorClass: 'text-brand-accent',
        typeBgClass: 'bg-brand-accent/10 border-brand-accent/20',
        iconClass: 'fa-bolt',
        iconColorClass: 'text-brand-accent',
        borderColorHover: 'hover:border-brand-accent',
        price: '199',
        stats: [
            { label: 'Monthly ROI', value: '8-12%', valueColor: 'text-system-success' },
            { label: 'Max Drawdown', value: '< 4.5%', valueColor: 'text-brand-black' },
            { label: 'Min Deposit', value: '$500', valueColor: 'text-brand-black' },
        ]
    },
    {
        id: 2,
        name: 'Orbit Swing',
        description: 'Multi-day trend follower. Captures large movements in Gold (XAUUSD) and Indices.',
        type: 'TREND',
        typeColorClass: 'text-brand-black',
        typeBgClass: 'bg-brand-black/5 border-brand-black/10',
        iconClass: 'fa-wave-square',
        iconColorClass: 'text-brand-black',
        borderColorHover: 'hover:border-brand-black',
        price: '299',
        stats: [
            { label: 'Monthly ROI', value: '15-25%', valueColor: 'text-system-success' },
            { label: 'Max Drawdown', value: '< 12%', valueColor: 'text-brand-black' },
            { label: 'Min Deposit', value: '$1,000', valueColor: 'text-brand-black' },
        ]
    },
    {
        id: 3,
        name: 'Prop Guard v2',
        description: 'Strict risk management EA specifically configured to pass prop firm challenges.',
        type: 'PROP',
        typeColorClass: 'text-gray-500',
        typeBgClass: 'bg-gray-100 border-gray-200',
        iconClass: 'fa-shield-halved',
        iconColorClass: 'text-gray-500',
        borderColorHover: 'hover:border-gray-500',
        price: '249',
        stats: [
            { label: 'Success Rate', value: '92%', valueColor: 'text-system-success' },
            { label: 'DD Protection', value: 'Hard Stop', valueColor: 'text-brand-black' },
            { label: 'Compatibility', value: 'FTMO/MFF', valueColor: 'text-brand-black' },
        ]
    }
];

export const Algorithms: React.FC = () => {
    return (
        <section id="algorithms" className="py-24 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-black mb-3 tracking-tight">Expert Advisors</h2>
                        <p className="text-gray-600 font-light text-lg">Algorithmic trading systems built for specific market conditions.</p>
                    </div>
                    <div className="hidden md:block">
                        <a href="#" className="text-brand-black text-sm font-semibold hover:text-brand-accent transition-colors">
                            View Verified Myfxbook <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {EAS.map((ea) => (
                        <div key={ea.id} className={`group relative bg-white border border-brand-border rounded-2xl p-8 transition-all duration-300 ${ea.borderColorHover} hover:shadow-xl`}>
                            <div className={`absolute top-6 right-6 text-[10px] font-mono px-2 py-1 rounded border ${ea.typeBgClass} ${ea.typeColorClass}`}>
                                {ea.type}
                            </div>
                            <div className={`w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center border border-brand-border mb-8 ${ea.borderColorHover} transition-colors`}>
                                <i className={`fa-solid ${ea.iconClass} ${ea.iconColorClass} text-lg`}></i>
                            </div>
                            <h3 className="text-2xl font-serif text-brand-black mb-2">{ea.name}</h3>
                            <p className="text-gray-600 text-sm mb-8 h-10 leading-relaxed">{ea.description}</p>
                            
                            <div className="space-y-4 mb-8 border-t border-brand-border pt-6">
                                {ea.stats.map((stat) => (
                                    <div key={stat.label} className="flex justify-between text-sm">
                                        <span className="text-gray-500">{stat.label}</span>
                                        <span className={`font-mono font-bold ${stat.valueColor}`}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-brand-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors text-sm shadow-md">Buy ${ea.price}</button>
                                <button className="px-4 border border-brand-border rounded-xl hover:bg-brand-secondary text-gray-400 hover:text-brand-black transition-colors">
                                    <i className="fa-solid fa-chart-line"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};