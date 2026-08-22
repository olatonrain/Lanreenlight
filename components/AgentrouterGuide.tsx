import React from 'react';
import { GuidesLayout } from './GuidesLayout';

export const AgentrouterGuide: React.FC = () => {
    return (
        <GuidesLayout
            eyebrow="AI Coding Agents Guide"
            path="/guides/agentrouter-setup"
            seoTitle="AgentRouter Setup: Free Claude Code Credit (5 Methods)"
            seoDescription="Set up AgentRouter — a free OpenAI/Anthropic-compatible API gateway — with OpenCode, Claude CLI, Claude App, Google Antigravity, or OmniRoute on a VPS. One key routes to Claude, GPT & DeepSeek."
            title="AgentRouter Setup: Get Claude Code Working for Free (5 Methods)"
            subtitle="Learn how to set up AgentRouter — a free, OpenAI- and Anthropic-compatible API gateway — with OpenCode, Claude CLI, Claude App, Google Antigravity, and OmniRoute on a cheap VPS. One API key routes to Claude, GPT, DeepSeek, and more."
            intro="AgentRouter is a unified API gateway that sits between your coding agents and dozens of AI model providers. Instead of configuring Claude, GPT, and DeepSeek separately, you point every tool at AgentRouter with one API key — and it routes each request to the best available model. This guide walks through the five setup methods I show in the video: OpenCode, Claude CLI, Claude App, Google Antigravity, and OmniRoute on a cheap VPS. Get your free $200 Claude Code credit when you register."
            sections={[
                {
                    title: "What Is AgentRouter and How Does It Work?",
                    content: [
                        "AgentRouter is a third-party API gateway compatible with both the Anthropic and OpenAI API formats. It exposes a single endpoint and one API key, then routes your requests to many models — Claude Opus/Sonnet, GPT variants, DeepSeek, GLM, Gemini, and more — depending on what your coding agent requests.",
                        "The practical win: you stop juggling multiple providers, API keys, and billing dashboards. You configure your coding tool once, point it at AgentRouter, and the gateway handles model selection and routing underneath.",
                        "Because it speaks the Anthropic Messages API, tools like Claude Code work against it natively — no local translation proxy required. Register once to get your free credit and a key."
                    ]
                },
                {
                    title: "Method 1: AgentRouter with OpenCode",
                    content: [
                        "OpenCode is my daily driver — the terminal coding agent that powers much of this site. It reads your files, edits code, and runs commands autonomously. To point it at AgentRouter, create an opencode.json in your project directory and define AgentRouter as a provider.",
                        "For Anthropic models (claude-opus series), add a provider using @ai-sdk/anthropic with baseURL https://agentrouter.org. For OpenAI-compatible models (gpt-5.5, glm-5.2), use @ai-sdk/openai-compatible with baseURL https://agentrouter.org/v1. Choose the model line that fits your work and set it as your default.",
                        "Then log in with your AgentRouter key: opencode providers login --provider agentrouter. Launch opencode and test with a simple prompt to confirm routing works. Full config snippets are in the video description."
                    ]
                },
                {
                    title: "Method 2: AgentRouter with Claude CLI",
                    content: [
                        "Claude Code (the CLI) talks natively to Anthropic by default. To route it through AgentRouter instead, set three environment variables before launching: ANTHROPIC_BASE_URL=https://agentrouter.org, ANTHROPIC_AUTH_TOKEN=sk-YOUR_AGENTROUTER_KEY, and ANTHROPIC_MODEL to your preferred model.",
                        "Install the CLI first: npm install -g @anthropic-ai/claude-code. Then export the variables (or set them permanently in your shell profile on macOS/Linux, or with setx on Windows) and run claude.",
                        "Verify the switch with the /status command inside Claude Code — it should show the AgentRouter base URL and your auth token. If it does, every request from that session flows through AgentRouter."
                    ]
                },
                {
                    title: "Method 3: AgentRouter with the Claude App / Claude Code Desktop",
                    content: [
                        "The Claude desktop app gives you a graphical interface over Claude Code — handy for those who prefer a window over a terminal. The routing principle is the same: the app is configured to talk to Anthropic, and you override its base URL and auth token to point at AgentRouter.",
                        "Configure your AgentRouter key in the app's settings and set the base URL to https://agentrouter.org. Once saved, the desktop agent runs against the models AgentRouter routes for you — including cheaper or free-tier options when available.",
                        "Because every method is just 'point the tool at AgentRouter', the desktop setup takes under five minutes once you have a key."
                    ]
                },
                {
                    title: "Method 4: AgentRouter with Google Antigravity",
                    content: [
                        "Google's Antigravity is a browser-based agent that builds and runs apps for you — it's the kind of tool that turns a prompt into a working web app. Like other coding agents, Antigravity can be pointed at a custom gateway so it uses your AgentRouter key instead of its default provider.",
                        "The setup mirrors the others: add your AgentRouter API key in Antigravity's provider settings and set the base URL to https://agentrouter.org/v1. Then models available through AgentRouter (Claude, Gemini, GPT) become selectable in your Antigravity sessions.",
                        "This is a great combo: Antigravity for building the UI and prototyping, AgentRouter deciding which model handles each step — all billed through one key."
                    ]
                },
                {
                    title: "Method 5: AgentRouter + OmniRoute on a Cheap VPS",
                    content: [
                        "OmniRoute is a free, open-source local gateway that automatically falls back between 200+ providers when one hits a rate limit — so your coding session never dies mid-task. When you pair OmniRoute with AgentRouter, you get the best of both: one AgentRouter key plus automatic provider fallback.",
                        "Install OmniRoute globally (npm install -g omniroute), start it, and it exposes a local endpoint at http://localhost:20128/v1. Use its setup-claude command to point Claude Code at the gateway, then let it load-balance across providers.",
                        "To run this 24/7 — not just while your laptop is on — deploy the stack on a cheap VPS. A $3-10/month VPS runs OmniRoute, AgentRouter config, and your coding agents around the clock. Check the Cheapest VPS Guide for provider comparisons; for agent work prioritize uptime and low latency over raw specs."
                    ]
                },
                {
                    title: "Which Method Should You Choose?",
                    content: [
                        "New to agents and want the fastest start: Claude CLI (Method 2) — two environment variables and you're coding. Prefer a terminal agent you fully control: OpenCode (Method 1). Want a graphical window over the same power: the Claude App (Method 3).",
                        "Building apps visually in the browser: Google Antigravity (Method 4). Running agents as a background service that never stops: OmniRoute on a VPS (Method 5) — the setup that unlocks always-on automation.",
                        "You don't have to pick one. I run OpenCode locally and OmniRoute on a VPS for the always-on workflows — the same infrastructure that powers this site's automation."
                    ]
                },
                {
                    title: "Security and Cost Reality Check",
                    content: [
                        "Free tiers and third-party routers are great for learning and side projects, but be deliberate about what you route through them. If you're working on proprietary or sensitive code, prefer your own paid key through the same gateway — or run the gateway yourself on a VPS you control.",
                        "Routing through any third-party gateway means your requests transit that provider's infrastructure. Read which provider a given request lands on, and never paste secrets, credentials, or client data into a free tier you haven't vetted.",
                        "The economics still favor AgentRouter for most solo work: one key, aggregated credits, and no per-provider signup dance. But production and client work deserve the paid-key-on-your-own-VPS posture."
                    ]
                }
            ]}
            faqs={[
                {
                    question: "Is AgentRouter really free?",
                    answer: "AgentRouter has a 100% free forever tier — you register once and get free credits to start, including up to $200 toward Claude Code. Advanced usage can be topped up, but the core gateway routing is free."
                },
                {
                    question: "Which coding agents work with AgentRouter?",
                    answer: "Any tool that speaks the OpenAI or Anthropic API format: Claude Code, OpenCode, Codex, Cline, Roo Code, Kilo Code, Trae, and more. Each is just pointed at AgentRouter's base URL with your key."
                },
                {
                    question: "Do I need a VPS to use AgentRouter?",
                    answer: "No — you can run it locally on your laptop. A cheap VPS is only needed when you want your agents and gateways running 24/7 (always-on automation, background workflows, or team access)."
                },
                {
                    question: "Is it safe to route my code through AgentRouter?",
                    answer: "For personal and learning projects it's fine. For proprietary or client code, use your own paid key through the same gateway or self-host the routing on a VPS you control, and never send secrets through an unvetted free tier."
                },
                {
                    question: "What models can I use through AgentRouter?",
                    answer: "Claude Opus and Sonnet series, GPT variants, DeepSeek, GLM, Gemini, and other models supported by the gateway. Model availability is set per-provider in your config."
                }
            ]}
            ctaTitle="Get Your Free $200 Claude Code Credit"
            ctaText="Register for AgentRouter with my link and start routing Claude Code, OpenCode, and Antigravity through one free API key. 100% free forever."
            ctaLink="https://agentrouter.org/register?aff=2CTV"
            ctaLabel="Claim Free Credit"
            relatedGuides={[
                {
                    title: "AI Automation Guide",
                    link: "/guides/n8n-automation",
                    description: "Automate agents and workflows"
                },
                {
                    title: "Cheapest VPS Guide",
                    link: "/guides/vps-hosting-guide",
                    description: "Run agents 24/7 on a VPS"
                },
                {
                    title: "Web Development Guide",
                    link: "/guides/web-development",
                    description: "Build apps with coding agents"
                },
                {
                    title: "App Development Guide",
                    link: "/guides/app-development",
                    description: "Ship mobile apps faster"
                },
            ]}
        />
    );
};

export default AgentrouterGuide;