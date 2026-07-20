import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Optivor - Ultra-Fast Open Source Image Infrastructure",
  description:
    "Open-source image transformation and optimization framework powered by libvips and out-of-process cloud storage drivers (S3, Cloudflare R2, Backblaze B2, GCS).",
  keywords: [
    "Optivor",
    "image transformation",
    "libvips",
    "open source image engine",
    "S3 image optimizer",
    "Cloudflare R2 image processing",
    "BYOS image host",
  ],
  authors: [{ name: "Optivor Community" }],
  openGraph: {
    title: "Optivor - Open Source Image Infrastructure",
    description: "Sub-10ms image transformations with libvips and bring-your-own-storage.",
    type: "website",
    url: "https://optivor.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
