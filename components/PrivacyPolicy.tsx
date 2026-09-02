import React from 'react';
import { LegalLayout, Section } from './LegalLayout';

export const PrivacyPolicy: React.FC = () => {
    return (
        <LegalLayout
            eyebrow="Legal"
            title="Privacy Policy"
            seoTitle="Privacy Policy"
            seoDescription="How Lanre Enlight (lanreenlight.com) collects, uses, and protects your data — analytics, cookies, affiliate links, comments, and your rights under NDPR and GDPR."
            path="/privacy-policy"
            updated="September 1, 2026"
        >
            <Section heading="1. Who We Are">
                <p>
                    This Privacy Policy applies to lanreenlight.com ("the Site"), the personal website of Lanre
                    ("Lanre Enlight", "we", "us"), an AI Automation &amp; Systems Engineer based in Nigeria. You can
                    reach me at the contact details on the <a href="/#contact" className="text-brand-accent underline">Contact section</a> of
                    this site for any privacy question or request.
                </p>
            </Section>

            <Section heading="2. Information We Collect">
                <p><strong>Information you give us:</strong> your name and email if you contact us through the contact form, or if you comment on YouTube videos embedded on this Site (those interactions are governed by YouTube/Google's own privacy policy).</p>
                <p><strong>Automatically collected information:</strong> when you browse the Site, we collect standard analytics data through Google Analytics 4 — pages visited, approximate location (country/city), device and browser type, referral source, and time on page. This data is aggregated and does not identify you personally.</p>
                <p><strong>Cookies:</strong> the Site uses cookies for analytics (GA4) and basic functionality. You can block or delete cookies in your browser settings; the Site will continue to work, though analytics for your visit will not be recorded.</p>
            </Section>

            <Section heading="3. How We Use Your Information">
                <ul className="list-disc ml-5 space-y-1">
                    <li>To operate, maintain, and improve the Site and its content</li>
                    <li>To understand which guides and tutorials are useful (via aggregate analytics)</li>
                    <li>To respond to messages you send us</li>
                    <li>To measure traffic sources so we know which platforms to publish on</li>
                </ul>
                <p>We do not sell your personal information. We do not send marketing emails unless you explicitly ask us to.</p>
            </Section>

            <Section heading="4. Analytics and Third-Party Services">
                <p>We use the following third-party services, each of which processes data under its own privacy policy:</p>
                <ul className="list-disc ml-5 space-y-1">
                    <li><strong>Google Analytics 4</strong> — site analytics. Google's policy: policies.google.com/privacy</li>
                    <li><strong>YouTube</strong> — video embeds. Playing an embedded video may set YouTube/Google cookies.</li>
                    <li><strong>Hosting (Contabo)</strong> — server logs (IP address, requested URL, timestamp) are kept by our hosting provider for security and troubleshooting.</li>
                </ul>
            </Section>

            <Section heading="5. Affiliate Links">
                <p>
                    Some links on this Site are affiliate links — including Contabo (CJ Affiliate), AgentRouter, and
                    Deriv. If you click one and make a purchase or sign up, we may earn a commission at no extra cost
                    to you. Affiliate clicks are tracked by those third-party networks when you click through; we do
                    not receive your account details or payment information from them. Every page or video containing
                    affiliate links carries a disclosure.
                </p>
            </Section>

            <Section heading="6. Data Retention">
                <p>Analytics data is retained by Google Analytics for the standard GA4 retention period (14 months). Contact-form messages are kept only as long as needed to handle your request. Server logs are retained per our host's standard rotation.</p>
            </Section>

            <Section heading="7. Your Rights">
                <p>
                    Depending on where you live, you have rights under the Nigeria Data Protection Regulation (NDPR),
                    the EU General Data Protection Regulation (GDPR), or similar laws: to access the personal data we
                    hold about you, to request correction or deletion, to object to processing, and to lodge a
                    complaint with your data protection authority. To exercise any of these rights, contact us through
                    the Contact section — we respond to verified requests within 30 days.
                </p>
            </Section>

            <Section heading="8. Children's Privacy">
                <p>The Site is not directed at children under 13, and we do not knowingly collect their personal information.</p>
            </Section>

            <Section heading="9. Changes to This Policy">
                <p>We may update this policy as the Site evolves. The "Last updated" date at the top reflects the current version. Material changes will be noted on this page.</p>
            </Section>
        </LegalLayout>
    );
};

export default PrivacyPolicy;
