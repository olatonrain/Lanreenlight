# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Yes |

## Reporting a Vulnerability

This is a static portfolio site with no user authentication, database, or sensitive data processing. However, if you discover a security issue:

1. **Do not** open a public GitHub issue
2. Email the details to the repository owner
3. Include a description of the vulnerability and steps to reproduce

## Scope

The following are in scope for security review:

- XSS / injection vulnerabilities in blog content rendering
- Exposed API keys or secrets in client-side code
- `.htaccess` or server misconfiguration
- Dependency vulnerabilities with known CVEs

## Out of Scope

- DDoS / rate limiting attacks
- Social engineering of the owner
- Physical security of the hosting server

## Responsible Disclosure

We aim to acknowledge reports within 48 hours and address confirmed vulnerabilities within 14 days.
