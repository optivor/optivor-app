import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://optivor-app.pages.dev"),
  title: {
    default: "Optivor - Ultra-Fast Open Source Image Infrastructure",
    template: "%s | Optivor Docs",
  },
  description:
    "High-performance open-source image transformation engine powered by libvips and out-of-process cloud storage drivers (S3, Cloudflare R2, Backblaze B2, GCS).",
  keywords: [
    "Optivor",
    "image infrastructure",
    "libvips image transformation",
    "open source image optimizer",
    "S3 image optimizer",
    "Cloudflare R2 image processing",
    "BYOS image host",
    "image microservice",
  ],
  authors: [{ name: "Optivor Core Team" }],
  openGraph: {
    title: "Optivor - Open Source Image Infrastructure",
    description: "Sub-10ms image transformations with libvips and bring-your-own-storage.",
    type: "website",
    url: "https://optivor-app.pages.dev",
    siteName: "Optivor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Optivor - Open Source Image Infrastructure",
    description: "Sub-10ms image transformations with libvips and bring-your-own-storage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Optivor",
    "operatingSystem": "Linux, macOS, Docker",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Open-source image transformation and optimization framework powered by libvips and bring-your-own-storage drivers.",
    "url": "https://optivor-app.pages.dev"
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
