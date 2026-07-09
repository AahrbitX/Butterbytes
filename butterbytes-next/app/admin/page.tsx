import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapProductRow, ProductRow } from "@/types";
import AdminDashboard from "@/app/admin/_components/AdminDashboard";

export const metadata = { title: "Admin – ButterBytes" };

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  const products = error ? [] : (data as ProductRow[]).map(mapProductRow);

  return <AdminDashboard initialProducts={products} />;
}
