import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/ping
 * Runs once daily via Vercel Cron (see vercel.json).
 * Keeps the Supabase free-tier project active by making a lightweight query.
 */
export async function GET() {
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .select("id")
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, pingedAt: new Date().toISOString() });
}
