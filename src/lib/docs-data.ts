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

## What Optivor Is

- **Runtime Engine**: Performs high-performance image transformations (resize, format conversion to WebP/AVIF, quality optimization) using \`libvips\`.
- **Bring-Your-Own-Storage (BYOS)**: Integrates directly with object storage you already own (AWS S3, MinIO, Cloudflare R2, Backblaze B2, Google Cloud Storage).
- **Extensible Framework**: Offers out-of-process driver conventions and deployment adapters.
- **Production-Grade Infrastructure**: Includes built-in rate limiting, LRU filesystem caching, OpenTelemetry tracing, and Prometheus metrics.

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

## Step 4: Request an Image Transformation

Transform an image on the fly:

\`\`\`bash
curl -i "http://localhost:8080/image/sample.jpg?w=400&h=300&fit=cover&format=webp"
\`\`\`

Response will include transformed WebP binary payload and \`X-Optivor-Cache: MISS\` header.
`
  },

  "configuration": {
    slug: "configuration",
    title: "Configuration Reference",
    category: "Getting Started",
    description: "Complete schema definition and environment overrides for optivor.yaml.",
    content: `# Configuration Reference

Optivor uses Viper for configuration parsing from \`optivor.yaml\` and environment variables.

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

auth:
  signed_urls:
    enabled: false            # Require HMAC signatures on request URLs
    secret: ""                # HMAC signing secret key
    max_age: 3600             # Default URL expiration age in seconds

image:
  contain_background_color: "#ffffff"  # Background color for fit=contain
  max_pixels: 25000000                 # Decompression-bomb pixel threshold (~5000x5000)
  max_decode_mb: 64                    # libvips startup memory ceiling
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

### \`optivor logs\`

Tails Optivor service logs via systemd journalctl integration.

\`\`\`bash
optivor logs [--lines 100] [--follow]
\`\`\`

### \`optivor metrics\`

Scrapes and prints runtime metrics from the \`/metrics\` endpoint.

\`\`\`bash
optivor metrics [--watch]
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

## Developer Guide Series

For a complete step-by-step guide to developing, testing, and contributing a custom provider driver:

1. [Architecture & Specification Overview](/docs/developer-driver-overview)
2. [Step-by-Step Implementation Guide](/docs/developer-driver-guide)
3. [Testing & Local Verification](/docs/developer-driver-testing)
4. [Submission & Registry Contribution](/docs/developer-driver-submission)
`
  },

  "developer-driver-overview": {
    slug: "developer-driver-overview",
    title: "Storage Driver Architecture Overview",
    category: "Storage & Drivers",
    description: "Architectural overview of out-of-process storage drivers per ADR-0010.",
    content: `# Developer Guide: Storage Driver Architecture & Specification

This document details the architectural specifications for building out-of-process storage drivers for Optivor.

## 1. Architectural Overview

Per **ADR-0010**, Optivor core maintains a provider-agnostic stance. The core runtime ships only with a universal S3-compatible driver. All provider-specific storage integrations (e.g., Cloudflare R2 native extensions, Backblaze B2, Google Cloud Storage, Azure Blob) are implemented as standalone external binaries following the \`optivor-driver-<name>\` naming convention.

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

---

## 2. Driver Contract & Handshake Protocol

Every driver executable MUST support the \`--optivor-handshake\` CLI flag.

### Handshake Invocation
\`\`\`bash
optivor-driver-custom --optivor-handshake
\`\`\`

### Handshake JSON Response Specification
The binary MUST write a valid JSON object to standard output (\`stdout\`) with an exit code of \`0\`:

\`\`\`json
{
  "name": "r2",
  "version": "1.0.0",
  "optivor_api": "v1",
  "capabilities": ["read", "write", "stat", "delete", "presign"],
  "author": "Optivor Community",
  "homepage": "https://github.com/optivor/optivor-driver-r2"
}
\`\`\`

#### Field Specifications:
| Field | Type | Required | Description |
|---|---|---|---|
| \`name\` | String | Yes | Lowercase unique provider identifier (alphanumeric and hyphens only). |
| \`version\` | String | Yes | Driver semantic version string (e.g., \`1.0.0\`). |
| \`optivor_api\` | String | Yes | Supported Optivor API protocol contract version (currently \`v1\`). |
| \`capabilities\` | Array[String] | Yes | List of supported operations: \`read\`, \`write\`, \`stat\`, \`delete\`, \`presign\`. |
| \`author\` | String | No | Driver author or organization name. |
| \`homepage\` | String | No | Repository URL or documentation link. |

---

## 3. Storage Operation Protocol (\`v1\`)

During execution, Optivor invokes the driver binary passing commands and parameters via command-line arguments or standard input JSON.

### Execution Context & Environment Variables
Optivor passes runtime configuration and credential secrets to the driver via environment variables:

- \`OPTIVOR_DRIVER_PROVIDER\`: Name of the targeted provider driver.
- \`OPTIVOR_STORAGE_ENDPOINT\`: Target storage service endpoint URL.
- \`OPTIVOR_STORAGE_BUCKET\`: Target bucket name.
- \`OPTIVOR_STORAGE_ACCESS_KEY\`: Storage access key / ID.
- \`OPTIVOR_STORAGE_SECRET_KEY\`: Storage secret key.
- \`OPTIVOR_STORAGE_REGION\`: Target storage region (if applicable).

### Standard Execution Command Interface
\`\`\`bash
optivor-driver-<provider> <command> <key> [flags]
\`\`\`

#### Supported Commands:
1. \`get <key>\`: Stream object payload to \`stdout\`.
2. \`put <key>\`: Read object payload from \`stdin\` and write to storage.
3. \`head <key>\`: Retrieve metadata (Content-Type, Content-Length, ETag) formatted as JSON to \`stdout\`.
4. \`delete <key>\`: Remove object from storage.

---

## 4. Exit Codes & Error Format

- Exit code \`0\`: Operation successful.
- Exit code \`1\`: Operational error (object not found, permission denied). Error message written to \`stderr\`.
- Exit code \`2\`: Invalid command arguments or invalid driver configuration.
`
  },

  "developer-driver-guide": {
    slug: "developer-driver-guide",
    title: "Step-by-Step Driver Implementation Guide",
    category: "Storage & Drivers",
    description: "Detailed step-by-step walkthrough to build a custom storage driver in Go or Python.",
    content: `# Developer Guide: Step-by-Step Driver Implementation Guide

This guide provides a practical, step-by-step walkthrough for building a custom storage driver for Optivor.

---

## Step 1: Project Setup & Repository Structure

Create a dedicated repository named \`optivor-driver-<provider>\` (e.g., \`optivor-driver-b2\`, \`optivor-driver-gcs\`).

### Recommended Project Layout (Go example)
\`\`\`
optivor-driver-b2/
├── .github/
│   └── workflows/
│       └── release.yml
├── cmd/
│   └── optivor-driver-b2/
│       └── main.go
├── internal/
│   └── b2/
│       ├── client.go
│       └── operations.go
├── LICENSE
├── README.md
└── go.mod
\`\`\`

---

## Step 2: Implement Handshake & CLI Command Parser

Your driver executable must parse the \`--optivor-handshake\` argument as well as operation commands (\`get\`, \`put\`, \`head\`, \`delete\`).

### Reference Go Implementation

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

	if len(os.Args) < 3 {
		fmt.Fprintln(os.Stderr, "Usage: optivor-driver-b2 <command> <key>")
		os.Exit(2)
	}

	command := os.Args[1]
	key := os.Args[2]

	switch command {
	case "get":
		handleGet(key)
	case "head":
		handleHead(key)
	default:
		fmt.Fprintf(os.Stderr, "Unsupported command: %s\\n", command)
		os.Exit(2)
	}
}

func handleGet(key string) {
	// Read credentials from environment variables
	// endpoint := os.Getenv("OPTIVOR_STORAGE_ENDPOINT")
	// accessKey := os.Getenv("OPTIVOR_STORAGE_ACCESS_KEY")
	
	// Implementation logic streaming object content to os.Stdout...
}

func handleHead(key string) {
	// Output metadata JSON to os.Stdout
}
\`\`\`

---

## Step 3: Reference Python Implementation

Drivers can be authored in scripting languages like Python (packaged into a single executable using \`PyInstaller\` or \`Nuitka\`).

\`\`\`python
#!/usr/bin/env python3
import sys
import json
import os

HANDSHAKE_RESPONSE = {
    "name": "gcs-custom",
    "version": "0.1.0",
    "optivor_api": "v1",
    "capabilities": ["read", "write", "stat", "delete"]
}

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--optivor-handshake":
        print(json.dumps(HANDSHAKE_RESPONSE, indent=2))
        sys.exit(0)

    if len(sys.argv) < 3:
        sys.stderr.write("Usage: optivor-driver-gcs <command> <key>\\n")
        sys.exit(2)

    command = sys.argv[1]
    key = sys.argv[2]

    if command == "get":
        # Stream content to stdout
        sys.stdout.buffer.write(b"sample image content")
        sys.exit(0)
    elif command == "head":
        meta = {"content_type": "image/jpeg", "content_length": 1024}
        print(json.dumps(meta))
        sys.exit(0)
    else:
        sys.stderr.write(f"Unknown command {command}\\n")
        sys.exit(2)

if __name__ == "__main__":
    main()
\`\`\`

---

## Step 4: Handling Environment Configuration & Credentials

Do not hardcode API keys or bucket names in driver binaries. Always consume standard configuration keys passed down from the Optivor host runtime:

- \`OPTIVOR_STORAGE_BUCKET\`
- \`OPTIVOR_STORAGE_ACCESS_KEY\`
- \`OPTIVOR_STORAGE_SECRET_KEY\`
- \`OPTIVOR_STORAGE_ENDPOINT\`
- \`OPTIVOR_STORAGE_REGION\`

Ensure sensible fallbacks or return descriptive error messages on \`stderr\` with exit code \`1\` when required credentials are absent.
`
  },

  "developer-driver-testing": {
    slug: "developer-driver-testing",
    title: "Driver Testing & Verification",
    category: "Storage & Drivers",
    description: "Instructions for testing and validating driver binaries before submission.",
    content: `# Developer Guide: Driver Testing & Verification

This guide explains how to test and validate your custom Optivor storage driver before submitting it to the community registry.

---

## 1. Handshake Verification Test

Verify that your binary returns valid JSON and exits with code \`0\` when called with \`--optivor-handshake\`.

\`\`\`bash
./optivor-driver-b2 --optivor-handshake
\`\`\`

### Expected Output
\`\`\`json
{
  "name": "b2",
  "version": "0.1.0",
  "optivor_api": "v1",
  "capabilities": ["read", "write", "stat", "delete"]
}
\`\`\`

### Verification Script
\`\`\`bash
# Verify exit code 0
./optivor-driver-b2 --optivor-handshake > /dev/null
if [ $? -ne 0 ]; then
  echo "FAIL: Handshake exit code must be 0"
  exit 1
fi

# Verify JSON schema validation
./optivor-driver-b2 --optivor-handshake | jq .optivor_api
\`\`\`

---

## 2. Local Registration Test

Use the Optivor CLI to register your binary locally and confirm driver discovery.

\`\`\`bash
# 1. Install driver binary
optivor driver install ./optivor-driver-b2

# 2. List installed drivers
optivor driver list
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

---

## Step 1: Submission Requirements & Guidelines

Before submitting your driver for inclusion, ensure it fulfills the following guidelines:

1. **Repository Naming**: Public GitHub repository named \`optivor-driver-<provider>\` (e.g., \`optivor-driver-r2\`).
2. **License**: Open-source license (MIT, Apache 2.0, or BSD-3-Clause).
3. **Cross-Platform Release**: Pre-compiled binary releases for \`linux/amd64\`, \`linux/arm64\`, \`darwin/amd64\`, \`darwin/arm64\`, and \`windows/amd64\` uploaded to GitHub Releases.
4. **Documentation**: Clear \`README.md\` explaining provider prerequisites, configuration variables, and version support.
5. **Handshake Compliant**: Implements \`--optivor-handshake\` returning protocol version \`v1\`.

---

## Step 2: Continuous Integration & Release Packaging

Configure GitHub Actions in your driver repository to build cross-compiled binaries on every tagged release.

### Sample \`.github/workflows/release.yml\`
\`\`\`yaml
name: Release Driver Binaries

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.24'
      - name: Build cross-platform binaries
        run: |
          GOOS=linux GOARCH=amd64 go build -o bin/optivor-driver-b2-linux-amd64 ./cmd/optivor-driver-b2
          GOOS=linux GOARCH=arm64 go build -o bin/optivor-driver-b2-linux-arm64 ./cmd/optivor-driver-b2
          GOOS=darwin GOARCH=arm64 go build -o bin/optivor-driver-b2-darwin-arm64 ./cmd/optivor-driver-b2
      - name: Upload Binaries to Release
        uses: softprops/action-gh-release@v1
        with:
          files: bin/*
\`\`\`
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

Optivor includes an in-memory & disk-backed LRU filesystem cache (\`internal/cache/fs\`). Transformed images are stored locally to serve repeat requests instantly (\`X-Optivor-Cache: HIT\`). Disk usage is managed automatically by \`max_size_mb\`.

### Does Optivor support Cloudflare R2 / Backblaze B2 / Google Cloud Storage?

Yes! Any S3-compatible object storage works out of the box with the default S3 driver. External custom drivers can also be managed using \`optivor driver install\`.
`
  }
};
