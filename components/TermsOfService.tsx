import React from 'react';
import { LegalLayout, Section } from './LegalLayout';

export const TermsOfService: React.FC = () => {
    return (
        <LegalLayout
            eyebrow="Legal"
            title="Terms of Service"
            seoTitle="Terms of Service"
            seoDescription="Terms for using lanreenlight.com — educational content only, no financial advice, affiliate relationships, intellectual property, and limitation of liability."
            path="/terms"
            updated="September 1, 2026"
        >
            <Section heading="1. Acceptance of These Terms">
                <p>By accessing lanreenlight.com ("the Site"), you agree to these Terms of Service. If you do not agree, please stop using the Site.</p>
            </Section>

            <Section heading="2. Educational Content Only — Not Financial or Professional Advice">
                <p>
                    All content on this Site — guides, blog posts, videos, tutorials, and comments about trading,
                    forex, synthetic indices, or bots — is provided for <strong>educational purposes only</strong> and
                    does not constitute financial, investment, trading, or professional advice. Trading involves
                    substantial risk of loss. Past performance of any strategy, bot, or market is not indicative of
                    future results. Never trade with money you cannot afford to lose, and consult a licensed
                    professional before making financial decisions.
                </p>
            </Section>

            <Section heading="3. No Guarantee of Results">
                <p>
                    Tutorials describe setups that worked for us at the time of recording. Software, pricing, free
                    tiers, market conditions, and platform terms change constantly. We make no guarantee that any
                    setup, model, bot, or workflow will produce the same results for you, produce income, or remain
                    functional. You are responsible for testing everything in your own environment.
                </p>
            </Section>

            <Section heading="4. Affiliate Relationships">
                <p>
                    The Site contains affiliate links, including Contabo (via CJ Affiliate), AgentRouter, and Deriv.
                    If you click these links and sign up or purchase, we may earn a commission at no additional cost
                    to you. This never changes the price you pay and does not influence our tutorials: we only cover
                    tools we use ourselves. Every page or video with affiliate links carries a disclosure.
                </p>
            </Section>

            <Section heading="5. Acceptable Use">
                <ul className="list-disc ml-5 space-y-1">
                    <li>Do not scrape, mirror, or bulk-republish the Site's content without written permission</li>
                    <li>Do not attempt to disrupt, overload, or gain unauthorized access to the Site or its hosting</li>
                    <li>Comments sent to us must be lawful and respectful; we may refuse to publish or may remove submissions</li>
                    <li>You may link to any page freely and quote short excerpts with attribution and a link back</li>
                </ul>
            </Section>

            <Section heading="6. Intellectual Property">
                <p>
                    The Site's original text, layout, and branding are © Lanre Enlight. All rights reserved.
                    Third-party trademarks (including n8n, Contabo, OpenClaw, OmniRoute, AgentRouter, Deriv, and
                    others named in tutorials) belong to their respective owners; their mention does not imply
                    endorsement or partnership except where an affiliate relationship is disclosed.
                </p>
            </Section>

            <Section heading="7. Third-Party Links and Embeds">
                <p>The Site links to and embeds third-party services (YouTube, external documentation, affiliate destinations). We are not responsible for their content, availability, or practices. Use third-party services at your own risk and review their terms.</p>
            </Section>

            <Section heading="8. Limitation of Liability">
                <p>
                    To the maximum extent permitted by law, the Site and its owner are not liable for any direct,
                    indirect, incidental, or consequential damages arising from your use of the Site, its content, or
                    any linked service — including trading losses, data loss, or server misconfiguration. The Site is
                    provided "as is" without warranties of any kind.
                </p>
            </Section>

            <Section heading="9. Changes to These Terms">
                <p>We may update these Terms as the Site evolves. The "Last updated" date above reflects the current version. Continued use of the Site after changes means you accept the updated Terms.</p>
            </Section>

            <Section heading="10. Contact and Governing Law">
                <p>
                    These Terms are governed by the laws of the Federal Republic of Nigeria. Questions about these
                    Terms can be sent through the <a href="/#contact" className="text-brand-accent underline">Contact section</a> of this Site.
                </p>
            </Section>
        </LegalLayout>
    );
};

export default TermsOfService;
