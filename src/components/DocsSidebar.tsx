"use client";

import Link from "next/link";
import { DOC_CATEGORIES } from "@/lib/docs-data";
import { Search, Book } from "lucide-react";
import { useState } from "react";

interface DocsSidebarProps {
  activeSlug: string;
}

export default function DocsSidebar({ activeSlug }: DocsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = DOC_CATEGORIES.map((cat) => {
    const items = cat.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, items };
  }).filter((cat) => cat.items.length > 0);

  return (
    <aside className="docs-sidebar">
      {/* Search box */}
      <div className="search-box">
        <Search size={15} className="search-icon" />
        <input
          type="text"
          placeholder="Search documentation..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredCategories.map((category) => (
        <div key={category.name} className="sidebar-group">
          <div className="sidebar-group-title">{category.name}</div>
          {category.items.map((item) => {
            const isActive = activeSlug === item.slug;
            return (
              <Link
                key={item.slug}
                href={`/docs/${item.slug}`}
                className={`sidebar-item ${isActive ? "active" : ""}`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      ))}

      {filteredCategories.length === 0 && (
        <div style={{ fontSize: "0.85rem", color: "var(--text-subtle)", padding: "1rem 0.5rem" }}>
          No docs found matching "{searchQuery}"
        </div>
      )}
    </aside>
  );
}
