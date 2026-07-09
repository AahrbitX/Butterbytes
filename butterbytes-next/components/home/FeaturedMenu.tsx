import { createClient } from "@/lib/supabase/server";
import { mapProductRow, ProductRow } from "@/types";
import Link from "next/link";
import FeaturedMenuCard from "@/components/home/FeaturedMenuCard";

export default async function FeaturedMenu() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(10);

  const products = (data as ProductRow[] ?? []).map(mapProductRow);

  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-accent text-xs tracking-[0.25em] uppercase font-semibold">
            Our Most Loved Picks
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brown mt-3">
            Featured <span className="italic text-accent">Menu</span>
          </h2>
        </div>

        {/* 2-row grid — 5 per row on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <FeaturedMenuCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="bg-brown text-cream text-sm font-semibold px-10 py-3.5 rounded-full hover:bg-accent transition-all duration-300 shadow-md shadow-brown/15"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
