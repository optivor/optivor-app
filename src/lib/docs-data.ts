export interface DocItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
}

export interface DocCategory {
  name: string;
  items: { slug: string; title: string }[];
}

export const DOC_CATEGORIES: DocCategory[] = [
  {
    name: "Getting Started",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "quick-start", title: "Quick Start" },
      { slug: "configuration", title: "Configuration Reference" },
    ],
  },
  {
    name: "CLI & Tooling",
    items: [
      { slug: "cli-reference", title: "CLI Reference" },
    ],
  },
  {
    name: "Storage & Drivers",
    items: [
      { slug: "storage-drivers", title: "Storage Driver Spec" },
      { slug: "developer-driver-overview", title: "Driver Architecture Overview" },
      { slug: "developer-driver-guide", title: "Step-by-Step Driver Guide" },
      { slug: "developer-driver-testing", title: "Driver Testing & Verification" },
      { slug: "developer-driver-submission", title: "Driver Submission & Registry" },
    ],
  },
  {
    name: "Resources",
    items: [
      { slug: "faq", title: "Frequently Asked Questions" },
    ],
  },
];

export const DOCS_DATA: Record<string, DocItem> = {
  "introduction": {
    slug: "introduction",
    title: "Introduction to Optivor",
    category: "Getting Started",
    description: "Learn what Optivor is, its core philosophy, bring-your-own-storage model, and key architectural boundaries.",
    content: `# Introduction to Optivor

Optivor is an **open-source image infrastructure framework**.

<Callout type="tip" title="Self-Hosted Open Source">
Optivor runs entirely on your infrastructure with zero per-transform or per-image SaaS billing. Transform unlimited images for the cost of standard compute.
</Callout>

## What Optivor Is

- **Runtime Engine**: Performs high-performance image transformations (resize, format conversion to WebP/AVIF, quality optimization) using \`libvips\`.
- **Bring-Your-Own-Storage (BYOS)**: Integrates directly with object storage you already own (AWS S3, MinIO, Cloudflare R2, Backblaze B2, Google Cloud Storage).
- **Extensible Framework**: Offers out-of-process driver conventions and deployment adapters.
- **Production-Grade Infrastructure**: Includes built-in rate limiting, LRU filesystem caching, OpenTelemetry tracing, and Prometheus metrics.

<Callout type="note" title="Architectural Boundary">
Optivor runs as an origin microservice behind your CDN (Cloudflare, Fastly, AWS CloudFront). It transforms assets on demand and streams responses with cache headers.
</Callout>

## What Optivor Is NOT

- **Not an Image Host**: Optivor does not store your original images.
- **Not a CDN**: Optivor runs behind your CDN or directly as an origin microservice.
- **Not SaaS/Open-Core**: There are no paid tiers or enterprise-only binary blobs.

## Target Audience

Engineering teams building scalable web applications who want full control over their image pipelines without vendor lock-in or recurring SaaS per-image transformation costs.
`
  },

  "quick-start": {
    slug: "quick-start",
    title: "Quick Start Guide",
    category: "Getting Started",
    description: "Get up and running with Optivor in under 5 minutes using Docker or Docker Compose.",
    content: `# Quick Start Guide

Get up and running with Optivor in under 5 minutes using Docker.

<Callout type="tip" title="Docker First Deployment">
Optivor containers ship with pre-compiled libvips native bindings ready for instant deployment.
</Callout>

## Step 1: Clone and Prepare Config

Clone the repository and copy the example configuration:

\`\`\`bash
git clone https://github.com/optivor/optivor.git
cd optivor
cp optivor.yaml.example optivor.yaml
\`\`\`

Update \`optivor.yaml\` with your storage credentials (e.g. S3 endpoint, bucket, access keys).

## Step 2: Run with Docker Compose

Start Optivor alongside a local MinIO service for testing:

\`\`\`bash
docker-compose up -d
\`\`\`

## Step 3: Run standalone with Docker

Or run the container with a volume-mounted configuration:

\`\`\`bash
docker run -d \\
  --name optivor \\
  -p 8080:8080 \\
  -v $(pwd)/optivor.yaml:/etc/optivor/optivor.yaml:ro \\
  optivor:latest
\`\`\`

## Step 4: Try the Interactive Request Builder

Use the interactive request playground below to experiment with image parameters:

<InteractiveCurl />

Response will include transformed WebP/AVIF binary payload and \`X-Optivor-Cache: MISS\` or \`HIT\` header.
`
  },

  "configuration": {
    slug: "configuration",
    title: "Configuration Reference",
    category: "Getting Started",
    description: "Complete schema definition and environment overrides for optivor.yaml.",
    content: `# Configuration Reference

Optivor uses Viper for configuration parsing from \`optivor.yaml\` and environment variables.

<Callout type="note" title="Interactive YAML Builder">
Use the interactive builder below to customize your optivor.yaml configuration for S3, Cloudflare R2, or Backblaze B2:
</Callout>

<ConfigGenerator />

## Full \`optivor.yaml\` Schema

\`\`\`yaml
server:
  port: 8080                  # HTTP server port
  read_timeout: 30s           # Max duration for reading request
  write_timeout: 30s          # Max duration for writing response
  request_timeout: 30s        # Total request timeout context
  log_level: "info"           # debug | info | warn | error
  log_format: "text"          # text | json
  rate_limit:
    enabled: true             # Enable per-IP token bucket rate limiter
    rps: 10                   # Requests per second per IP
    burst: 20                 # Token bucket burst capacity
  image:
    max_width: 5000           # Maximum allowed transform width (px)
    max_height: 5000          # Maximum allowed transform height (px)

storage:
  driver: "s3"                # Storage driver selection (s3, minio, r2)
  s3:
    endpoint: "https://..."   # S3 endpoint URL
    bucket: "my-bucket"       # S3 bucket name
    region: "us-east-1"       # S3 region
    access_key_id: "..."      # S3 Access Key ID
    secret_access_key: "..."  # S3 Secret Access Key

cache:
  fs:
    dir: "/tmp/optivor-cache" # Cache directory path
    max_size_mb: 1024         # LRU eviction limit in megabytes

telemetry:
  enabled: true               # Enable OpenTelemetry tracing
  otlp_endpoint: ""           # OTLP/gRPC collector target URL
  service_name: "optivor"     # Service identifier in traces
  sampling_ratio: 1.0         # Trace sampling probability (0.0 to 1.0)
\`\`\`

## Environment Overrides

Any configuration field can be overridden using \`OPTIVOR_\` environment variables with underscore delimiters:

- \`OPTIVOR_STORAGE_S3_SECRET_ACCESS_KEY\` → \`storage.s3.secret_access_key\`
- \`OPTIVOR_AUTH_SIGNED_URLS_SECRET\` → \`auth.signed_urls.secret\`
- \`OPTIVOR_SERVER_PORT\` → \`server.port\`
`
  },

  "cli-reference": {
    slug: "cli-reference",
    title: "CLI Reference",
    category: "CLI & Tooling",
    description: "Command-line tools for scaffolding, deployment, diagnostics, and storage driver management.",
    content: `# CLI Reference

The \`optivor\` CLI provides commands for scaffolding, deployment, diagnostics, and storage driver management.

<Callout type="tip" title="Diagnostics & Health">
Run \`optivor doctor\` to instantly verify your libvips installation, S3 credentials, and network connectivity.
</Callout>

## Root Command

\`\`\`bash
optivor [--version] [--help]
\`\`\`

## Subcommands

### \`optivor init\`

Scaffolds a new \`optivor.yaml\` configuration file in the working directory.

\`\`\`bash
optivor init [--force]
\`\`\`

### \`optivor deploy\`

Deploys Optivor using a specified deployment adapter.

\`\`\`bash
optivor deploy [--adapter systemd] [--config optivor.yaml] [--dry-run]
\`\`\`

### \`optivor doctor\`

Performs health and diagnostic checks on system dependencies, configuration, S3 connectivity, and libvips runtime.

\`\`\`bash
optivor doctor [--config optivor.yaml]
\`\`\`

### \`optivor driver\`

Manages external storage provider driver binaries.

\`\`\`bash
optivor driver install <path>
optivor driver list
optivor driver info <name>
optivor driver remove <name>
\`\`\`
`
  },

  "storage-drivers": {
    slug: "storage-drivers",
    title: "Storage Driver Specification",
    category: "Storage & Drivers",
    description: "Out-of-process storage driver protocol specification and registration process.",
    content: `# Storage Driver Development Guide

Optivor enforces a provider-agnostic core architecture (ADR-0002, ADR-0010). Storage drivers for cloud providers live outside the core repository as standalone binaries following the \`optivor-driver-<name>\` naming convention.

<Callout type="important" title="Handshake Protocol v1">
All storage driver executables MUST support the \`--optivor-handshake\` flag and return a valid JSON specification to stdout with exit code 0.
</Callout>

<DriverPlayground />

## Driver Specification

An Optivor storage driver is an executable binary that satisfies the out-of-process protocol interface.

### 1. Handshake Protocol (\`--optivor-handshake\`)

When invoked with \`--optivor-handshake\`, the binary must print a JSON object to standard output and exit with code 0:

\`\`\`json
{
  "name": "r2",
  "version": "0.1.0",
  "optivor_api": "v1"
}
\`\`\`

Fields:
- \`name\`: Unique provider driver identifier (lowercase, e.g. \`r2\`, \`b2\`, \`gcs\`).
- \`version\`: Driver binary version string.
- \`optivor_api\`: Target Optivor API contract version (currently \`v1\`).

### 2. Installing Drivers

Register a custom driver binary using the CLI:

\`\`\`bash
optivor driver install /path/to/optivor-driver-r2
\`\`\`

The CLI executes \`--optivor-handshake\`, validates the JSON response, and registers the driver in \`~/.config/optivor/drivers.json\`.
`
  },

  "developer-driver-overview": {
    slug: "developer-driver-overview",
    title: "Storage Driver Architecture Overview",
    category: "Storage & Drivers",
    description: "Architectural overview of out-of-process storage drivers per ADR-0010.",
    content: `# Developer Guide: Storage Driver Architecture & Specification

This document details the architectural specifications for building out-of-process storage drivers for Optivor.

<Callout type="note" title="ADR-0010 Compliance">
Optivor core ships only with a universal S3 driver. External providers (R2, B2, GCS) are decoupled as out-of-process binaries.
</Callout>

\`\`\`
+-------------------------------------------------------------+
|                      Optivor Core                           |
|  +--------------------+    +----------------------------+   |
|  |  Internal Storage  | -> | Out-of-Process Controller  |   |
|  +--------------------+    +----------------------------+   |
+------------------------------------------|------------------+
                                           | (exec / IPC)
                                           v
+-------------------------------------------------------------+
|             Standalone Provider Driver Executable           |
|                optivor-driver-<provider>                    |
+-------------------------------------------------------------+
\`\`\`

### Key Benefits
- **Language Agnostic**: Drivers can be written in Go, Rust, Python, Node.js, C++, or any executable compiled language.
- **Isolation**: Crashes or resource spikes in third-party provider SDKs do not impair core Optivor runtime stability.
- **Independent Release Lifecycle**: Providers update independently of Optivor core versions.
`
  },

  "developer-driver-guide": {
    slug: "developer-driver-guide",
    title: "Step-by-Step Driver Implementation Guide",
    category: "Storage & Drivers",
    description: "Detailed step-by-step walkthrough to build a custom storage driver in Go or Python.",
    content: `# Developer Guide: Step-by-Step Driver Implementation Guide

This guide provides a practical, step-by-step walkthrough for building a custom storage driver for Optivor.

<Callout type="warning" title="Security Requirement">
Do not hardcode API keys or secret tokens in driver binaries. Always consume configuration keys passed via environment variables (OPTIVOR_STORAGE_ACCESS_KEY, OPTIVOR_STORAGE_SECRET_KEY).
</Callout>

## Step 1: Project Setup & Repository Structure

Create a dedicated repository named \`optivor-driver-<provider>\` (e.g., \`optivor-driver-b2\`, \`optivor-driver-gcs\`).

\`\`\`
optivor-driver-b2/
├── .github/workflows/release.yml
├── cmd/optivor-driver-b2/main.go
├── internal/b2/client.go
├── LICENSE
└── README.md
\`\`\`

## Step 2: Reference Go Implementation

\`\`\`go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type HandshakeInfo struct {
	Name         string   \`json:"name"\`
	Version      string   \`json:"version"\`
	OptivorAPI   string   \`json:"optivor_api"\`
	Capabilities []string \`json:"capabilities"\`
}

func main() {
	if len(os.Args) > 1 && os.Args[1] == "--optivor-handshake" {
		info := HandshakeInfo{
			Name:         "b2",
			Version:      "0.1.0",
			OptivorAPI:   "v1",
			Capabilities: []string{"read", "write", "stat", "delete"},
		}
		output, _ := json.MarshalIndent(info, "", "  ")
		fmt.Println(string(output))
		os.Exit(0)
	}
}
\`\`\`
`
  },

  "developer-driver-testing": {
    slug: "developer-driver-testing",
    title: "Driver Testing & Verification",
    category: "Storage & Drivers",
    description: "Instructions for testing and validating driver binaries before submission.",
    content: `# Developer Guide: Driver Testing & Verification

This guide explains how to test and validate your custom Optivor storage driver before submitting it to the community registry.

<Callout type="tip" title="Interactive Verification">
Test your driver handshake logic right here in the documentation:
</Callout>

<DriverPlayground />

## Handshake Verification Test

Verify that your binary returns valid JSON and exits with code \`0\` when called with \`--optivor-handshake\`.

\`\`\`bash
./optivor-driver-b2 --optivor-handshake
\`\`\`
`
  },

  "developer-driver-submission": {
    slug: "developer-driver-submission",
    title: "Driver Submission & Registry",
    category: "Storage & Drivers",
    description: "Guidelines and GitHub Actions workflows for submitting drivers to the official Optivor registry.",
    content: `# Developer Guide: Driver Submission & Registry Contribution

This document outlines the step-by-step process for submitting your completed custom storage driver to the official Optivor Provider Registry.

<Callout type="tip" title="Community Registry">
Official drivers are listed in the Optivor CLI registry for easy installation via \`optivor driver install\`.
</Callout>

## Submission Requirements

1. **Repository Naming**: Public GitHub repository named \`optivor-driver-<provider>\`.
2. **License**: Open-source license (MIT, Apache 2.0, or BSD-3-Clause).
3. **Cross-Platform Release**: Pre-compiled binary releases uploaded to GitHub Releases.
4. **Handshake Compliant**: Implements \`--optivor-handshake\` returning protocol version \`v1\`.
`
  },

  "faq": {
    slug: "faq",
    title: "Frequently Asked Questions (FAQ)",
    category: "Resources",
    description: "Common questions about Optivor features, performance, caching, and storage drivers.",
    content: `# Frequently Asked Questions (FAQ)

### Why use Optivor instead of cloud image services (Imgix, Cloudinary)?

Cloud image transformation services bill per image or per transform operation, which rapidly scales up costs. Optivor is open-source software you run on your own infrastructure, allowing unlimited image transformations for the cost of standard compute.

### What image formats are supported?

Optivor supports JPEG, PNG, WebP, AVIF, GIF, TIFF, and SVG input formats. Transformed output formats include WebP and AVIF.

### How does caching work?

Optivor includes an in-memory & disk-backed LRU filesystem cache. Transformed images are stored locally to serve repeat requests instantly (\`X-Optivor-Cache: HIT\`).
`
  }
};
