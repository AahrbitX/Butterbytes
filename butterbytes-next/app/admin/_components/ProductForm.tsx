"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";
import { createClient } from "@/lib/supabase/client";
import { Product, ProductInsert, Category } from "@/types";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "muffins", label: "Muffins" },
  { value: "cupcakes", label: "Cup Cakes" },
  { value: "cookies", label: "Cookies" },
  { value: "brownies", label: "Brownies" },
  { value: "ourspecials", label: "Our Specials" },
  { value: "spreads", label: "Spreads" },
];

const EMPTY_FORM: ProductInsert = {
  name: "",
  description: "",
  price: "",
  discountedPrice: "",
  rating: 4.5,
  imageUrl: "",
  category: "muffins",
  discount: 0,
};

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const isEdit = !!product;
  const [form, setForm] = useState<ProductInsert>(
    product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          discountedPrice: product.discountedPrice,
          rating: product.rating,
          imageUrl: product.imageUrl,
          category: product.category,
          discount: product.discount,
        }
      : EMPTY_FORM
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof ProductInsert>(key: K, value: ProductInsert[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadImage(file: File): Promise<string> {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(filename, file, { upsert: true });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from("product-images").getPublicUrl(filename);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      let imageUrl = form.imageUrl;
      if (imageFile) imageUrl = await uploadImage(imageFile);

      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        discounted_price: form.discountedPrice,
        rating: form.rating,
        image_url: imageUrl,
        category: form.category,
        discount: form.discount,
      };

      if (isEdit) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(44, 26, 14, 0.45)", backdropFilter: "blur(6px)" }}>

      <div className="bg-card-warm w-full max-w-lg rounded-3xl shadow-2xl shadow-brown/20 border border-cream-dark overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-cream-dark">
          <div>
            <h2 className="font-display text-xl font-bold text-brown">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <p className="text-brown-mid text-xs mt-0.5">
              {isEdit ? "Update the product details below" : "Fill in the details for a new product"}
            </p>
          </div>
          <button onClick={onCancel}
            className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-brown-mid hover:text-brown hover:bg-cream transition-all duration-200">
            <MdClose size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-7 py-5 overflow-y-auto scrollbar-hide" style={{ maxHeight: "70vh" }}>
          <form onSubmit={handleSubmit} id="product-form" className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-brown text-xs font-semibold tracking-wide">Name <span className="text-accent">*</span></label>
              <input
                value={form.name} onChange={(e) => set("name", e.target.value)}
                required placeholder="e.g. Vanilla Muffin"
                className="bg-cream text-brown text-sm px-4 py-3 rounded-xl border border-cream-dark focus:border-accent focus:outline-none transition-colors placeholder-brown-mid/40"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-brown text-xs font-semibold tracking-wide">Description <span className="text-accent">*</span></label>
              <textarea
                value={form.description} onChange={(e) => set("description", e.target.value)}
                required placeholder="Short product description..."
                rows={3}
                className="bg-cream text-brown text-sm px-4 py-3 rounded-xl border border-cream-dark focus:border-accent focus:outline-none transition-colors resize-none placeholder-brown-mid/40"
              />
            </div>

            {/* Price row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-brown text-xs font-semibold tracking-wide">Original Price</label>
                <input
                  value={form.price} onChange={(e) => set("price", e.target.value)}
                  placeholder="₹100/per"
                  className="bg-cream text-brown text-sm px-4 py-3 rounded-xl border border-cream-dark focus:border-accent focus:outline-none transition-colors placeholder-brown-mid/40"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-brown text-xs font-semibold tracking-wide">Discounted Price</label>
                <input
                  value={form.discountedPrice} onChange={(e) => set("discountedPrice", e.target.value)}
                  placeholder="₹80/per"
                  className="bg-cream text-brown text-sm px-4 py-3 rounded-xl border border-cream-dark focus:border-accent focus:outline-none transition-colors placeholder-brown-mid/40"
                />
              </div>
            </div>

            {/* Rating + Discount row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-brown text-xs font-semibold tracking-wide">Rating (0–5)</label>
                <input
                  type="number" min={0} max={5} step={0.1}
                  value={form.rating} onChange={(e) => set("rating", parseFloat(e.target.value))}
                  className="bg-cream text-brown text-sm px-4 py-3 rounded-xl border border-cream-dark focus:border-accent focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-brown text-xs font-semibold tracking-wide">Discount %</label>
                <input
                  type="number" min={0} max={100}
                  value={form.discount} onChange={(e) => set("discount", parseInt(e.target.value))}
                  className="bg-cream text-brown text-sm px-4 py-3 rounded-xl border border-cream-dark focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-brown text-xs font-semibold tracking-wide">Category <span className="text-accent">*</span></label>
              <select
                value={form.category} onChange={(e) => set("category", e.target.value as Category)}
                className="bg-cream text-brown text-sm px-4 py-3 rounded-xl border border-cream-dark focus:border-accent focus:outline-none transition-colors cursor-pointer"
              >
                {CATEGORIES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div className="flex flex-col gap-1.5">
              <label className="text-brown text-xs font-semibold tracking-wide">Product Image</label>
              <div className="bg-cream rounded-xl border border-cream-dark border-dashed p-4 flex flex-col gap-3">
                <input
                  type="file" accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="text-brown-mid text-xs file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:bg-cream-dark file:text-brown file:text-xs file:font-medium file:cursor-pointer hover:file:bg-accent/10 transition-all"
                />
                {!imageFile && (
                  <input
                    value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)}
                    placeholder="Or paste image URL"
                    className="bg-card-warm text-brown text-xs px-3 py-2.5 rounded-lg border border-cream-dark focus:border-accent focus:outline-none transition-colors placeholder-brown-mid/40"
                  />
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center bg-red-50 border border-red-100 rounded-xl py-2.5">
                {error}
              </p>
            )}
          </form>
        </div>

        {/* Footer actions */}
        <div className="px-7 py-5 border-t border-cream-dark flex gap-3">
          <button type="button" onClick={onCancel}
            className="flex-1 border border-cream-dark text-brown-mid text-sm font-medium py-3 rounded-full hover:border-brown/30 hover:text-brown transition-all duration-200">
            Cancel
          </button>
          <button type="submit" form="product-form" disabled={loading}
            className="flex-1 bg-brown text-cream font-semibold text-sm py-3 rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
