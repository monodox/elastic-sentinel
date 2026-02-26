# 🔐 ElasticSentinel

**A Multi-Step AI Threat Correlation & SOC Triage Agent**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Elastic](https://img.shields.io/badge/Built%20with-Elastic-005571)](https://www.elastic.co/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## Overview

ElasticSentinel is a context-driven, multi-step AI security agent built using **Elastic Agent Builder** and **Elasticsearch Serverless**. It automates Security Operations Center (SOC) investigations by correlating fragmented security signals across authentication logs, endpoint events, and privilege changes to detect coordinated threats in real time.

Modern security teams face alert fatigue caused by disconnected signals such as login spikes, suspicious IP access, privilege escalations, and geo anomalies. Investigating each alert requires manual log pivots, cross-dashboard analysis, and contextual reasoning across multiple systems. This process is slow, error-prone, and difficult to scale.

ElasticSentinel addresses this problem by combining reasoning capabilities with Elasticsearch tools (Search, ES|QL, and Workflows) to perform structured, explainable investigations.

## What It Does

When a suspicious alert is triggered, ElasticSentinel:

1. ✅ Runs **ES|QL queries** to detect time-series anomalies
2. 🔗 Correlates related entities (users, IPs, hosts, geo locations)
3. 🔍 Searches for historical incidents with similar attack patterns
4. 🌍 Evaluates insider risk and impossible travel scenarios
5. 🎯 Deduplicates related alerts into a single incident
6. 🤖 Automatically triggers a workflow to create an incident record
7. 📊 Generates a structured explanation with a confidence score

The agent does not simply answer questions — it **performs a multi-step investigative workflow and takes reliable action**.

## Key Features

- 🧠 **Multi-step reasoning** with tool orchestration
- 📈 **ES|QL-based anomaly detection**
- 🔗 **Cross-system entity correlation**
- 🌍 **Geo-behavior analysis**
- 🎯 **Vector similarity search** for past attacks
- 🤖 **Automated incident creation** via Elastic Workflows
- 📋 **Transparent tool execution trace**
- 🧪 **Synthetic demo data** for safe testing

## Measurable Impact

ElasticSentinel reduces manual investigation effort by:

- ⚡ Consolidating **5+ manual log pivots** into a single automated workflow
- ⏱️ Reducing triage time from **~30–45 minutes to under 10 minutes**
- 🎯 Deduplicating multiple alerts into **one correlated incident**

## Why It Matters

Security investigations should not rely on manual pattern recognition across fragmented systems. ElasticSentinel demonstrates how context-aware AI agents, when tightly integrated with Elasticsearch's analytics and workflow capabilities, can transform reactive alert handling into **proactive, automated threat correlation**.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Frontend                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Alert Input  │  │   Results    │  │   Trace      │      │
│  │  Component   │  │    Panel     │  │   Timeline   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 API Route (/api/investigate)                 │
│              Validates & Routes Investigation                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Elastic Agent Builder                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   ES|QL      │  │    Search    │  │   Workflow   │      │
│  │   Queries    │  │     API      │  │   Trigger    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Elasticsearch Serverless Cluster                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Auth Logs   │  │  Endpoint    │  │  Incidents   │      │
│  │    Index     │  │    Events    │  │   Index      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
elasticsentinel/
├── apps/web/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/                 # App router pages & API routes
│   │   │   ├── page.tsx         # Main investigation UI
│   │   │   ├── layout.tsx       # Root layout
│   │   │   └── api/investigate/ # Investigation endpoint
│   │   ├── components/          # React UI components
│   │   ├── lib/                 # Elastic integration & utilities
│   │   └── hooks/               # Custom React hooks
│   ├── public/                  # Static assets
│   └── package.json
│
├── elastic/                     # Elasticsearch configuration
│   ├── agent/                   # Agent Builder instructions
│   │   ├── instructions.md
│   │   └── tool_config.json
│   ├── queries/                 # ES|QL queries
│   │   ├── anomaly_detection.esql
│   │   ├── entity_correlation.esql
│   │   └── geo_impossible_travel.esql
│   ├── workflows/               # Elastic Workflows
│   │   └── create_incident.json
│   └── demo-data/               # Synthetic security logs
│       ├── auth_logs.ndjson
│       ├── endpoint_events.ndjson
│       ├── priv_events.ndjson
│       └── incidents.ndjson
│
├── scripts/                     # Setup & data loading scripts
│   ├── create-indexes.ts
│   └── load-demo-data.ts
│
├── README.md
├── LICENSE
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── ROADMAP.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Elasticsearch Serverless account
- Elastic Agent Builder access
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/elasticsentinel.git
cd elasticsentinel
```

2. **Install dependencies**

```bash
cd apps/web
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your Elasticsearch credentials:

```env
ELASTIC_CLOUD_ID=your_cloud_id
ELASTIC_API_KEY=your_api_key
ELASTIC_AGENT_BUILDER_URL=your_agent_url
```

4. **Create Elasticsearch indices**

```bash
npm run setup:indices
```

5. **Load demo data**

```bash
npm run setup:demo-data
```

6. **Start the development server**

```bash
npm run dev
```

7. **Open the application**

Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Running an Investigation

1. **Select or paste a security alert** in JSON format
2. Click **"Investigate"** to trigger the agent
3. Watch the **tool execution trace** in real-time
4. Review **correlated evidence**, entities, and confidence score
5. View the **automated incident** created in Elasticsearch

### Sample Alert Format

```json
{
  "alert_id": "alert_001",
  "timestamp": "2024-01-15T14:23:00Z",
  "severity": "high",
  "type": "authentication_anomaly",
  "description": "Unusual login spike detected",
  "user": "john.doe",
  "source_ip": "203.0.113.45",
  "host": "workstation-042"
}
```

## Demo Data

All security logs in this project are **synthetic and generated specifically for demonstration purposes**. No real production data is used or exposed.

The demo dataset includes:
- 1,000+ synthetic authentication events
- 500+ endpoint security events
- 200+ privilege escalation logs
- 50+ historical incident records

## Technical Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Node.js
- **Search & Analytics**: Elasticsearch Serverless, ES|QL
- **AI Agent**: Elastic Agent Builder
- **Automation**: Elastic Workflows
- **Deployment**: Vercel (frontend), Elastic Cloud (backend)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

For security concerns, please see [SECURITY.md](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and improvements.

## Acknowledgments

- Powered by Elasticsearch Serverless and Agent Builder
- UI components from shadcn/ui
- Open-source community contributors

## Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Project Link: [https://github.com/yourusername/elasticsentinel](https://github.com/yourusername/elasticsentinel)

---

**Built with ❤️ using Elastic Agent Builder**
