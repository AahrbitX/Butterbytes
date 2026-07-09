"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiPlus, FiLogOut } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types";
import ProductForm from "@/app/admin/_components/ProductForm";

interface AdminDashboardProps {
  initialProducts: Product[];
}

export default function AdminDashboard({ initialProducts }: AdminDashboardProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: true });
    if (data) {
      setProducts(data.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        discountedPrice: row.discounted_price,
        rating: row.rating,
        imageUrl: row.image_url,
        category: row.category,
        discount: row.discount,
      })));
    }
  }, []);

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    setDeletingId(null);
    await refresh();
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function openAdd() {
    setEditingProduct(undefined);
    setFormOpen(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  async function handleFormSuccess() {
    setFormOpen(false);
    setEditingProduct(undefined);
    await refresh();
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-cream-dark px-6 py-4 flex items-center justify-between shadow-sm shadow-brown/5">
        <h1 className="font-display font-bold text-lg text-brown">
          Butter<span className="text-accent">Bytes</span> <span className="text-brown-mid font-sans font-normal text-sm">Admin</span>
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-brown text-cream text-xs font-semibold px-4 py-2 rounded-full hover:bg-brown-mid transition-all duration-300"
          >
            <FiPlus size={14} />
            Add Product
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-cream-dark text-brown-mid text-xs px-4 py-2 rounded-full hover:border-brown/40 hover:text-brown transition-all duration-300"
          >
            <FiLogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-brown-mid text-xs mb-6">{products.length} products</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-card border border-cream-dark rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:shadow-brown/5 transition-all duration-300">
              <div className="relative h-40">
                <Image src={product.imageUrl} alt={product.name} fill
                  className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                {product.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-accent text-brown text-xs font-bold px-2 py-0.5 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-brown font-semibold text-sm leading-tight">{product.name}</h3>
                  <span className="flex items-center gap-1 text-accent text-xs shrink-0">
                    <FaStar size={10} />
                    {product.rating}
                  </span>
                </div>
                <span className="text-brown-mid text-xs capitalize mb-3">{product.category}</span>
                {product.discountedPrice && (
                  <p className="text-accent text-xs font-bold mb-3">{product.discountedPrice}</p>
                )}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1 border border-cream-dark text-brown-mid text-xs py-2 rounded-full hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    <FiEdit2 size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingId(product.id)}
                    className="flex-1 flex items-center justify-center gap-1 border border-cream-dark text-brown-mid text-xs py-2 rounded-full hover:border-red-400 hover:text-red-500 transition-all duration-300"
                  >
                    <FiTrash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {formOpen && (
        <ProductForm
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => { setFormOpen(false); setEditingProduct(undefined); }}
        />
      )}

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown/40 backdrop-blur-sm px-4">
          <div className="bg-card border border-cream-dark rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <p className="text-brown font-semibold mb-2">Delete product?</p>
            <p className="text-brown-mid text-xs mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 border border-cream-dark text-brown-mid text-sm py-2.5 rounded-full hover:border-brown/40 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="flex-1 bg-red-500 text-white font-semibold text-sm py-2.5 rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
