import React from 'react';
import { GuidesLayout } from './GuidesLayout';
import { Link } from 'react-router-dom';

export const N8nGuide: React.FC = () => {
    return (
        <GuidesLayout
            eyebrow="AI Workflow Automation Guide"
            title="AI Automation Guide: From Zero to Production Workflows"
            subtitle="Learn how to build n8n workflows, self-host n8n on your own VPS, integrate AI agents (LangChain, OpenRouter, Groq), and automate your business processes — no code required."
            intro="n8n is the most popular open-source workflow automation platform for technical teams, with 400+ integrations and full AI support. This guide covers everything from your first n8n tutorial to production-grade self-hosted automation running 24/7 on your own infrastructure."
            sections={[
                {
                    title: "What Is n8n and Why Use It?",
                    content: [
                        "n8n is a fair-code workflow automation tool that lets you connect apps, APIs, and AI services visually. Unlike Zapier or Make, n8n is open source — you can self-host it on your own VPS, own your data, and run unlimited workflows without per-task pricing.",
                        "Each workflow is built from nodes: triggers (webhooks, schedules, email), actions (API calls, database writes), and logic (IF conditions, loops). Data flows left to right through the canvas, giving you full visibility into every step.",
                        "For businesses, n8n replaces expensive SaaS automation subscriptions. A self-hosted n8n instance on a $5-10 VPS can handle what would cost $100+/month on Zapier, with no execution limits."
                    ]
                },
                {
                    title: "n8n Self-Hosted vs n8n Cloud: Which Should You Choose?",
                    content: [
                        "n8n Cloud: setup in minutes, automatic updates, managed hosting. Best for beginners and small teams who want to start building immediately without infrastructure work.",
                        "n8n Self-Hosted: full control over your data, unlimited executions, no per-task pricing, custom nodes supported. Requires a VPS (see our cheapest VPS guide) and 30-90 minutes of setup time. The standard choice for production workloads and regulated industries (GDPR, HIPAA).",
                        "Rule of thumb: start with the free tier to learn, then self-host when you need unlimited executions, data residency, or lower cost at scale. A well-configured self-hosted instance on 4 CPU / 8 GB RAM can handle 200+ active workflows."
                    ]
                },
                {
                    title: "How to Self-Host n8n on a VPS (Docker Setup)",
                    content: [
                        "The production-recommended way to run n8n is Docker Compose with a PostgreSQL database. This gives you persistent storage, easy upgrades, and reliable backups.",
                        "Step 1 — Provision a VPS with at least 2 GB RAM. Step 2 — Install Docker and Docker Compose. Step 3 — Create a docker-compose.yml with the n8n image, PostgreSQL service, persistent volumes, and your N8N_ENCRYPTION_KEY. Step 4 — Set up a reverse proxy (Caddy or Nginx) with HTTPS. Step 5 — Configure N8N_HOST and WEBHOOK_URL environment variables.",
                        "Critical production settings: pin a specific n8n version instead of 'latest', set an explicit encryption key (losing it means losing access to all stored credentials), enable EXECUTIONS_DATA_MAX_AGE to prune old execution data, and set execution timeouts to prevent runaway workflows.",
                        "Our full breakdown lives in the n8n VPS setup video — the same blueprint I use to charge clients $500 per setup."
                    ]
                },
                {
                    title: "Building Your First n8n Workflow: Trigger → Logic → Action",
                    content: [
                        "Every workflow starts with a trigger. Common examples: a webhook URL another system calls, a Gmail label trigger, a schedule (Cron), or a Telegram message. Without a trigger, the workflow never runs.",
                        "Add logic with the IF node to route data based on conditions, and use expressions (JavaScript inside {{ }}) to transform data. For example, extract the subject from an email and use it as a task title in Notion or ClickUp.",
                        "A classic first workflow: Gmail trigger → IF subject contains 'task' → create task in project management tool → notify team on Slack. Build it, activate it, and verify with the execution log — your source of truth for debugging."
                    ]
                },
                {
                    title: "n8n AI Agents: Automating Work with LLMs",
                    content: [
                        "n8n's AI Agent node is where automation meets artificial intelligence. Connect LLMs (OpenAI, Groq, OpenRouter, Anthropic) to build chatbots, content generators, email classifiers, and document summarizers inside your workflows.",
                        "I use n8n + AI agents to produce 50-100 videos monthly: a workflow ingests a topic, generates scripts via LLM APIs, assembles assets, and publishes across platforms. Similar systems handle 1,000+ WhatsApp messages daily for client businesses.",
                        "AI reliability tip: LLM outputs are probabilistic — always validate with IF nodes, add error triggers, and set timeouts. A common production pitfall is the AI Agent node timing out on large contexts; reduce context by summarizing input before the LLM call."
                    ]
                },
                {
                    title: "n8n vs Zapier vs Make: Which Automation Tool Wins?",
                    content: [
                        "Zapier is the easiest to start with but the most expensive at scale — per-task pricing adds up fast. Make (Integromat) offers better visual operators but similar pricing limits. n8n wins on cost, flexibility, and data ownership: open source, unlimited executions when self-hosted, and the ability to write custom JavaScript or connect any REST API.",
                        "For teams that need enterprise-grade scalability, n8n queue mode with Redis workers handles thousands of executions per hour. That's why n8n is now the default recommendation for technical teams."
                    ]
                }
            ]}
            faqs={[
                {
                    question: "Is n8n free?",
                    answer: "Yes — n8n is open source and free to self-host. You only pay for the VPS you run it on (from ~$3-10/month). The cloud version has a free tier and paid plans."
                },
                {
                    question: "What are the system requirements for self-hosted n8n?",
                    answer: "A VPS with 2 GB RAM runs n8n comfortably for most workloads. 4 GB or more is recommended for production with multiple workflows, AI agents, and PostgreSQL."
                },
                {
                    question: "Can n8n integrate with AI?",
                    answer: "Yes, n8n has native AI Agent nodes and integrates with OpenAI, Groq, OpenRouter, Anthropic, and hundreds of other services. You can build AI chatbots, content pipelines, and intelligent document processing."
                },
                {
                    question: "How many workflows can n8n handle?",
                    answer: "There's no hard limit. A well-configured self-hosted instance with 4 CPU cores and 8 GB RAM can run 200+ active workflows processing thousands of executions daily. Queue mode scales beyond that."
                }
            ]}
            ctaTitle="Want a Done-for-You n8n Setup?"
            ctaText="I build production n8n automation systems for businesses — from AI content engines to lead processing pipelines. Same blueprint used to charge clients $500+ per setup."
            ctaLink="/#contact"
            ctaLabel="Get My n8n Services"
            relatedGuides={[
                {
                    title: "Cheapest VPS Guide",
                    link: "/guides/vps-hosting-guide",
                    description: "Best VPS hosting for self-hosted n8n"
                },
                {
                    title: "Forex Trading Bots",
                    link: "/guides/algorithmic-trading",
                    description: "MT5 Expert Advisors that automate trades"
                },
                {
                    title: "Crypto Node Guide",
                    link: "/guides/crypto-node-ops",
                    description: "Run nodes on your VPS for passive income"
                },
                {
                    title: "Web Development Guide",
                    link: "/guides/web-development",
                    description: "Build full-stack web applications"
                },
                {
                    title: "App Development Guide",
                    link: "/guides/app-development",
                    description: "Launch cross-platform mobile apps"
                },
                {
                    title: "AgentRouter Setup",
                    link: "/guides/agentrouter-setup",
                    description: "Free Claude Code credit + AI gateway"
                },
            ]}
        />
    );
};

export default N8nGuide;
