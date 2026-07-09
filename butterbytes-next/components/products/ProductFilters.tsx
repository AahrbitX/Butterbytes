"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { MdSearch, MdKeyboardArrowDown, MdCheck } from "react-icons/md";
import { CATEGORIES } from "@/data/products";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Category, Product } from "@/types";
import ProductGrid from "@/components/products/ProductGrid";

interface ProductFiltersProps {
  initialProducts: Product[];
}

export default function ProductFilters({ initialProducts }: ProductFiltersProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, search, activeCategory]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectCategory = (cat: Category) => {
    setActiveCategory(cat);
    setDropdownOpen(false);
  };

  return (
    <div>
      <div className="sticky top-16 z-40 bg-cream/90 backdrop-blur-md border-b border-cream-dark">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-mid" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card text-brown text-sm placeholder-brown-mid/50 pl-10 pr-4 py-3 rounded-full outline-none border border-cream-dark focus:border-accent transition-colors duration-300"
          />
        </div>

        {/* Custom dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-3 bg-card text-brown text-sm px-5 py-3 rounded-full border transition-all duration-300 cursor-pointer min-w-[160px] justify-between ${
              dropdownOpen ? "border-accent" : "border-cream-dark hover:border-accent/50"
            }`}
          >
            <span className="font-medium">{CATEGORY_LABELS[activeCategory]}</span>
            <MdKeyboardArrowDown
              size={18}
              className={`text-brown-mid transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown panel */}
          {dropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-card-warm border border-cream-dark rounded-2xl shadow-xl shadow-brown/10 overflow-hidden z-50">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-all duration-150 ${
                    activeCategory === cat
                      ? "bg-accent/10 text-brown font-semibold"
                      : "text-brown-mid hover:bg-cream hover:text-brown"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                  {activeCategory === cat && (
                    <MdCheck size={16} className="text-accent" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
