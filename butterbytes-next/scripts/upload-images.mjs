import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { extname, join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "product-images";
const IMAGES_DIR = join(__dirname, "../public/assets/images");

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};
// ────────────────────────────────────────────────────────────

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  console.error("    Add SUPABASE_SERVICE_ROLE_KEY to your .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function uploadImages() {
  const files = readdirSync(IMAGES_DIR).filter((f) => MIME[extname(f).toLowerCase()]);

  console.log(`\n📦  Found ${files.length} images — uploading to bucket "${BUCKET}"...\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = join(IMAGES_DIR, file);
    const fileBuffer = readFileSync(filePath);
    const contentType = MIME[extname(file).toLowerCase()];

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.error(`  ✗  ${file}  →  ${error.message}`);
      failed++;
    } else {
      console.log(`  ✓  ${file}`);
      success++;
    }
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`  ✅  Uploaded : ${success}`);
  if (skipped) console.log(`  ⏭️   Skipped  : ${skipped}`);
  if (failed)  console.log(`  ❌  Failed   : ${failed}`);
  console.log(`─────────────────────────────────\n`);

  if (success > 0) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl("ButterBytes.png");
    const base = data.publicUrl.replace("ButterBytes.png", "");
    console.log(`🔗  Public URL base: ${base}`);
    console.log(`    Example: ${base}vennila-murffin.jpg\n`);
  }
}

uploadImages();
