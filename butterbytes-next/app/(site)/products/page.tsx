import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { mapProductRow, ProductRow } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductFilters from "@/components/products/ProductFilters";

export const metadata: Metadata = {
  title: "Products – ButterBytes",
  description:
    "Browse all ButterBytes handcrafted products — muffins, cookies, cupcakes, brownies, savory snacks, and spreads.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  const products = (data as ProductRow[] ?? []).map(mapProductRow);

  return (
    <div className="bg-cream min-h-screen">
      <div className="pt-20 pb-8 px-6 max-w-6xl mx-auto">
        <SectionHeading
          title="Our Products"
          subtitle="Fresh, handcrafted, and made with love"
        />
      </div>
      <ProductFilters initialProducts={products} />
    </div>
  );
}
