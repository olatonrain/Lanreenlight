import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from './FadeIn';
import { Seo } from './Seo';
import { personSchema, profilePageSchema, breadcrumbSchema, SITE_URL } from '../data/schema';
import { PORTFOLIO } from '../data/portfolio';

export const PortfolioPage: React.FC = () => {
    const p = PORTFOLIO;

    return (
        <div className="min-h-screen bg-brand-white">
            <Seo
                title="Portfolio — SEO Case Studies & Verified Credentials | Lanre"
                description="19 projects with receipts: 9 SEO case studies, 8 websites, AI automation systems, 17 verified certifications, and press features from Lanre — AI Automation & Systems Engineer."
                path="/portfolio"
                jsonLd={[
                    profilePageSchema(
                        `${SITE_URL}/portfolio`,
                        'Lanre — Portfolio',
                        'SEO case studies, verified certifications, and press features from an AI Automation & Systems Engineer.',
                        p.certificates.map(c => c.name),
                        personSchema
                    ),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Portfolio', path: '/portfolio' },
                    ]),
                ]}
            />

            {/* Hero — H1 paints with the first render, never behind FadeIn */}
            <section className="relative bg-brand-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/10 rounded-full blur-[120px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-8">
                        <i className="fa-solid fa-id-badge"></i>
                        Portfolio
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-medium mb-5 max-w-4xl tracking-tight">
                        {p.name.split(' ').slice(0, -1).join(' ')} <span className="text-brand-accent italic">{p.name.split(' ').slice(-1).join(' ')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-brand-accent font-medium mb-4">
                        {p.roles.join(' · ')}
                    </p>
                    <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mb-10 leading-relaxed">
                        Over five years of making websites rank — and building the automation systems that run them. The work, the credentials, and the results, all verified.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mb-12">
                        <a
                            href="/#contact"
                            className="inline-flex items-center px-8 py-4 bg-brand-accent text-brand-black rounded-full font-bold hover:bg-white transition-colors duration-300"
                        >
                            Work With Me
                            <i className="fa-solid fa-arrow-right ml-2"></i>
                        </a>
                        <a
                            href={p.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 border border-white/20 bg-white/5 text-white rounded-full font-bold hover:bg-white/10 transition-colors duration-300"
                        >
                            <i className="fa-solid fa-play mr-2 text-brand-accent"></i>
                            Watch the Video Portfolio
                        </a>
                    </div>
                    <div className="flex flex-wrap gap-8 md:gap-12">
                        {p.stats.map(stat => (
                            <div key={stat.label}>
                                <div className="text-3xl font-bold text-brand-accent">{stat.value}</div>
                                <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About + skills */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <div className="lg:col-span-2">
                        <FadeIn>
                            <div className="bg-white border border-brand-border rounded-3xl p-3 shadow-sm">
                                <img
                                    src={p.portrait}
                                    alt={`${p.name} — portrait`}
                                    className="w-full h-auto rounded-2xl"
                                    loading="lazy"
                                />
                            </div>
                        </FadeIn>
                    </div>
                    <div className="lg:col-span-3">
                        <FadeIn delay={120}>
                            <div className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold mb-3">About Me</div>
                            <h2 className="text-3xl md:text-4xl font-serif font-medium text-brand-black mb-8">From Marketing to Systems</h2>
                            {p.bio.map((paragraph, i) => (
                                <p key={i} className="text-gray-600 font-light text-lg leading-relaxed mb-5">{paragraph}</p>
                            ))}
                            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm mt-8">
                                <div className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold mb-6">Skills & Interests</div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {p.skills.map(skill => (
                                        <div key={skill.label} className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-brand-secondary border border-brand-border">
                                            <span className="w-9 h-9 rounded-xl bg-brand-black text-brand-accent flex items-center justify-center text-sm">
                                                <i className={`fa-solid ${skill.icon}`}></i>
                                            </span>
                                            <span className="font-medium text-brand-black">{skill.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Certificates — the verified wall */}
            <section className="relative bg-brand-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                    <FadeIn>
                        <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
                            <div>
                                <div className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold mb-3">Credentials</div>
                                <h2 className="text-3xl md:text-4xl font-serif font-medium">{p.certificates.length} Certifications, Every One Verifiable</h2>
                            </div>
                            <div className="text-sm text-gray-400 font-medium">{p.certificateYears}</div>
                        </div>
                        <p className="text-gray-300 font-light max-w-2xl mb-10 leading-relaxed">{p.certificateNote}</p>
                    </FadeIn>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {p.certificates.map((cert, index) => (
                            <FadeIn key={cert.name} delay={Math.min(index, 6) * 60}>
                                <div className="h-full flex flex-col justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/40 transition-colors duration-300">
                                    <div>
                                        {cert.issuer && (
                                            <div className="text-[10px] uppercase tracking-[0.18em] text-brand-accent font-bold mb-2">{cert.issuer}</div>
                                        )}
                                        <div className="font-medium leading-snug">{cert.name}</div>
                                    </div>
                                    {cert.url ? (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-semibold text-gray-300 hover:text-brand-accent transition-colors inline-flex items-center gap-1.5"
                                        >
                                            Verify credential
                                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                                        </a>
                                    ) : (
                                        <span className="text-xs text-gray-500 inline-flex items-center gap-1.5">
                                            <i className="fa-solid fa-certificate text-[10px]"></i>
                                            Certificate on file
                                        </span>
                                    )}
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Press */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-accent font-bold mb-8">
                            <i className="fa-regular fa-newspaper"></i>
                            In the Press
                        </div>
                        <div className="flex flex-wrap justify-center items-baseline gap-x-8 gap-y-3 mb-6">
                            {p.press.publications.map(name => (
                                <span key={name} className="text-3xl md:text-5xl font-serif font-medium text-brand-black">{name}</span>
                            ))}
                        </div>
                        <p className="text-gray-600 font-light text-lg mb-8">{p.press.line}</p>
                        {p.press.evidenceImage && (
                            <img
                                src={p.press.evidenceImage}
                                alt="Google search results showing press coverage in Blueprint, The Guardian, and Vanguard"
                                className="w-full rounded-3xl border border-brand-border shadow-lg"
                                loading="lazy"
                            />
                        )}
                    </div>
                </FadeIn>
            </section>

            {/* Projects — grouped by category */}
            {p.categories.map((category) => {
                const group = p.projects.filter(pr => pr.category === category);
                if (!group.length) return null;
                const isDark = category === 'SEO Case Studies';
                return (
                    <section
                        key={category}
                        id={category.toLowerCase().replace(/[^a-z]+/g, '-')}
                        className={`${isDark ? 'relative bg-brand-black text-white overflow-hidden' : ''} ${category === 'Websites Built & Grown' ? 'bg-brand-secondary/40' : ''}`}
                    >
                        {isDark && <div className="absolute inset-0 bg-tech-grid opacity-10"></div>}
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                            <FadeIn>
                                <div className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold mb-3">Selected Work</div>
                                <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3">{category}</h2>
                                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-light max-w-2xl mb-10 leading-relaxed`}>
                                    {category === 'SEO Case Studies' && 'Nine engagements with the receipts — Search Console, Analytics, and SERP screenshots from the actual accounts.'}
                                    {category === 'Websites Built & Grown' && 'Eight sites I designed, built, or grew — agency, e-commerce, SaaS, real estate, and the infrastructure behind it.'}
                                    {category === 'AI & Automation Systems' && 'Three production systems that run without manual effort — routing, qualification, and content pipelines.'}
                                </p>
                            </FadeIn>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.map((project, index) => (
                                    <FadeIn key={project.name} delay={Math.min(index, 6) * 80}>
                                        <div className={`h-full flex flex-col rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative ${isDark ? 'bg-white/5 border-white/10 hover:border-brand-accent/40' : 'bg-white border-brand-border'}`}>
                                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent z-10"></div>
                                            {project.image && (
                                                <div className="h-44 bg-brand-secondary border-b border-brand-border overflow-hidden">
                                                    <img
                                                        src={project.image}
                                                        alt={project.imageAlt || `${project.name} — result screenshot`}
                                                        className="w-full h-full object-cover object-top"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                            <div className={`p-6 md:p-7 flex flex-col flex-1 ${isDark ? 'text-white' : ''}`}>
                                                <div className="flex items-start justify-between gap-3 mb-4">
                                                    <h3 className={`text-xl font-serif font-medium leading-snug ${isDark ? 'text-white' : 'text-brand-black'}`}>{project.name}</h3>
                                                    {project.url ? (
                                                        <a
                                                            href={project.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`Visit ${project.name}`}
                                                            className="shrink-0 w-8 h-8 rounded-full bg-brand-black text-brand-accent flex items-center justify-center text-xs hover:bg-brand-accent hover:text-brand-black transition-colors"
                                                        >
                                                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                                        </a>
                                                    ) : (
                                                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs ${isDark ? 'bg-white/10 text-gray-300' : 'bg-brand-secondary text-gray-400'}`}>
                                                            <i className="fa-solid fa-lock"></i>
                                                        </span>
                                                    )}
                                                </div>
                                                {project.problem && (
                                                    <p className={`text-sm leading-relaxed mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{project.problem}</p>
                                                )}
                                                {project.description && (
                                                    <p className={`text-sm leading-relaxed mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                                                )}
                                                {project.outcome && (
                                                    <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-brand-accent' : 'text-brand-black'}`}>{project.outcome}</p>
                                                )}
                                                <div className="flex flex-wrap gap-1.5 mt-auto pt-5">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className={`px-2.5 py-1 rounded-full text-xs ${isDark ? 'bg-white/10 text-gray-300' : 'bg-brand-secondary text-gray-600'}`}>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Get in touch */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
                <FadeIn>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {p.contact.linkedins.map((li, i) => (
                            <div key={li.handle} className="bg-white border border-brand-border rounded-3xl p-6 text-center">
                                <div className="w-10 h-10 mx-auto rounded-xl bg-brand-black text-brand-accent flex items-center justify-center mb-4">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </div>
                                <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400 mb-1">LinkedIn {i + 1}</div>
                                <a href={li.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors">{li.handle}</a>
                            </div>
                        ))}
                        <div className="bg-white border border-brand-border rounded-3xl p-6 text-center">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-black text-brand-accent flex items-center justify-center mb-4">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400 mb-1">Email</div>
                            <a href={`mailto:${p.contact.email}`} className="text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors break-all">{p.contact.email}</a>
                        </div>
                        <div className="bg-white border border-brand-border rounded-3xl p-6 text-center">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-black text-brand-accent flex items-center justify-center mb-4">
                                <i className="fa-brands fa-instagram"></i>
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400 mb-1">Instagram</div>
                            <a href="https://www.instagram.com/olatonrain" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors">{p.contact.instagram}</a>
                        </div>
                        <div className="bg-white border border-brand-border rounded-3xl p-6 text-center">
                            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-black text-brand-accent flex items-center justify-center mb-4">
                                <i className="fa-brands fa-github"></i>
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400 mb-1">GitHub</div>
                            <a href="https://github.com/olatonrain" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors">{p.contact.github}</a>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <FadeIn>
                    <div className="bg-brand-secondary rounded-[2.5rem] p-12 md:p-16 border border-brand-border text-center relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-serif text-brand-black mb-4">Let's Work Together</h2>
                            <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto mb-8">
                                Your project could be the next one on this page. The case studies are the proof; the guides show the thinking.
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                <a href="/#contact" className="inline-flex items-center px-10 py-4 bg-brand-black text-white rounded-full font-bold hover:bg-gray-800 shadow-xl transition-all hover:scale-105">
                                    Get in Touch
                                </a>
                                <Link to="/guides/" className="inline-flex items-center px-8 py-4 border border-brand-border bg-white text-brand-black rounded-full font-bold hover:border-brand-accent transition-colors">
                                    Browse the Guides
                                    <i className="fa-solid fa-arrow-right ml-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
};
