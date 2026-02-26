# Security Policy

## Overview

ElasticSentinel is a security-focused project designed to help SOC teams investigate and correlate threats. We take security seriously and appreciate the community's help in identifying and responsibly disclosing vulnerabilities.

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in ElasticSentinel, please report it responsibly:

### Preferred Method

Email: **security@yourdomain.com** (or create a private security advisory on GitHub)

### What to Include

Please include the following information in your report:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Potential impact** of the vulnerability
4. **Suggested fix** (if you have one)
5. **Your contact information** for follow-up questions

### Response Timeline

- **Initial Response**: Within 48 hours of report submission
- **Status Update**: Within 7 days with assessment and planned actions
- **Resolution**: Security fixes are prioritized and typically released within 30 days

### Disclosure Policy

- We follow **coordinated disclosure** principles
- We will work with you to understand and resolve the issue
- We ask that you do not publicly disclose the vulnerability until we have released a fix
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

### For Users

When deploying ElasticSentinel:

1. **Environment Variables**: Never commit `.env` files or expose API keys
2. **Access Control**: Restrict Elasticsearch API keys to minimum required permissions
3. **Network Security**: Use HTTPS for all communications
4. **Updates**: Keep dependencies updated regularly
5. **Monitoring**: Monitor agent activity and API usage

### For Contributors

When contributing to ElasticSentinel:

1. **Code Review**: All PRs undergo security review
2. **Dependencies**: Avoid introducing unnecessary dependencies
3. **Secrets**: Never commit credentials, tokens, or API keys
4. **Input Validation**: Always validate and sanitize user inputs
5. **Error Handling**: Avoid exposing sensitive information in error messages

## Known Security Considerations

### Demo Data Only

- This project uses **synthetic data only** for demonstration
- No real production security logs should be used
- All demo data is clearly marked and documented

### API Key Permissions

The Elasticsearch API keys used should have **minimal permissions**:

- Read access to specific indices only
- No cluster admin privileges
- No delete or destructive operations
- Limited to ES|QL, Search, and Workflow execution

### Rate Limiting

- Implement rate limiting on the `/api/investigate` endpoint
- Monitor for unusual API usage patterns
- Set appropriate timeouts for agent execution

## Security Features

ElasticSentinel includes several security features:

1. **Input Validation**: All alert inputs are validated before processing
2. **Sanitization**: User inputs are sanitized to prevent injection attacks
3. **Least Privilege**: API keys use minimum required permissions
4. **Audit Trail**: All investigations are logged with timestamps
5. **Transparent Execution**: Tool execution traces are visible to users

## Dependencies

We regularly audit and update dependencies:

- **Automated Scanning**: GitHub Dependabot alerts enabled
- **Manual Review**: Security-critical dependencies reviewed quarterly
- **Update Policy**: Security patches applied within 7 days of disclosure

## Compliance

ElasticSentinel is designed with security best practices in mind:

- **OWASP Top 10**: Protection against common web vulnerabilities
- **Data Privacy**: No PII storage without explicit consent
- **Logging**: Comprehensive audit logging for security events
- **Access Control**: Role-based access control where applicable

## Security Acknowledgments

We appreciate the following individuals for responsibly disclosing security issues:

- *None reported yet*

## Contact

For non-security questions, please open a GitHub issue.

For security concerns only: **security@yourdomain.com**

---

**Last Updated**: 2024-01-15
