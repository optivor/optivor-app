import { DOCS_DATA, DOC_CATEGORIES } from "@/lib/docs-data";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Search } from "lucide-react";
import DocsSidebar from "@/components/DocsSidebar";

export function generateStaticParams() {
  return Object.keys(DOCS_DATA).map((slug) => ({
    slug: slug,
  }));
}

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = DOCS_DATA[slug];
  if (!doc) return { title: "Doc Not Found - Optivor" };

  return {
    title: `${doc.title} - Optivor Documentation`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = DOCS_DATA[slug];

  if (!doc) {
    notFound();
  }

  // Find previous and next docs for pagination footer
  const allSlugs = Object.keys(DOCS_DATA);
  const currentIndex = allSlugs.indexOf(slug);
  const prevDoc = currentIndex > 0 ? DOCS_DATA[allSlugs[currentIndex - 1]] : null;
  const nextDoc = currentIndex < allSlugs.length - 1 ? DOCS_DATA[allSlugs[currentIndex + 1]] : null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div className="docs-container">
        <DocsSidebar activeSlug={slug} />

        <main className="docs-content">
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem",
              color: "var(--text-subtle)",
              marginBottom: "1.5rem",
            }}
          >
            <Link href="/docs/introduction" style={{ color: "var(--text-muted)" }}>
              Docs
            </Link>
            <span>/</span>
            <span>{doc.category}</span>
            <span>/</span>
            <span style={{ color: "var(--accent-cyan)", fontWeight: 500 }}>{doc.title}</span>
          </div>

          {/* Render Markdown content */}
          <MarkdownRenderer content={doc.content} />

          {/* Prev / Next Pagination */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {prevDoc ? (
              <Link
                href={`/docs/${prevDoc.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-color)",
                  maxWidth: "48%",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.25rem" }}>
                  <ArrowLeft size={12} /> Previous
                </span>
                <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "#ffffff" }}>{prevDoc.title}</span>
              </Link>
            ) : <div />}

            {nextDoc ? (
              <Link
                href={`/docs/${nextDoc.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  padding: "0.85rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-color)",
                  maxWidth: "48%",
                  marginLeft: "auto",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.25rem" }}>
                  Next <ArrowRight size={12} />
                </span>
                <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "#ffffff" }}>{nextDoc.title}</span>
              </Link>
            ) : null}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
