"use client";

import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MDX_COMPONENTS } from "./mdx";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    let isMounted = true;
    serialize(content, { parseFrontmatter: true }).then((res) => {
      if (isMounted) setMdxSource(res);
    });
    return () => {
      isMounted = false;
    };
  }, [content]);

  if (!mdxSource) {
    return (
      <div className="prose" style={{ minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-subtle)" }}>
        Loading interactive doc components...
      </div>
    );
  }

  return (
    <div className="prose">
      <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
    </div>
  );
}
