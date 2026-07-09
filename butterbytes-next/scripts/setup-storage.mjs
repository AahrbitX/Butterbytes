import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { extname, join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET            = "product-images";
const IMAGES_DIR        = join(__dirname, "../public/assets/images");
const BUCKET_BASE_URL   = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

const MIME = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".webp": "image/webp",
  ".gif":  "image/gif",
  ".svg":  "image/svg+xml",
};

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌  Missing env vars. Check your .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ── Step 1: Upload all images to bucket ─────────────────────
async function uploadImages() {
  console.log("\n📦  Step 1: Uploading images to Supabase Storage...\n");

  const files = readdirSync(IMAGES_DIR).filter(
    (f) => MIME[extname(f).toLowerCase()]
  );

  let success = 0;
  let failed  = 0;

  for (const file of files) {
    const buffer      = readFileSync(join(IMAGES_DIR, file));
    const contentType = MIME[extname(file).toLowerCase()];

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, buffer, { contentType, upsert: true });

    if (error) {
      console.error(`  ✗  ${file}  →  ${error.message}`);
      failed++;
    } else {
      console.log(`  ✓  ${file}`);
      success++;
    }
  }

  console.log(`\n  Uploaded: ${success}  |  Failed: ${failed}\n`);
  return success > 0;
}

// ── Step 2: Update all image_url values in products table ───
async function updateImageUrls() {
  console.log("🔗  Step 2: Updating image URLs in the database...\n");

  const { data: products, error: fetchError } = await supabase
    .from("products")
    .select("id, image_url");

  if (fetchError) {
    console.error("❌  Could not fetch products:", fetchError.message);
    return;
  }

  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    const currentUrl = product.image_url;

    // Already pointing to the bucket — skip
    if (currentUrl.startsWith(BUCKET_BASE_URL)) {
      skipped++;
      continue;
    }

    // Extract just the filename from any path format
    const filename    = currentUrl.split("/").pop();
    const newUrl      = `${BUCKET_BASE_URL}/${filename}`;

    const { error: updateError } = await supabase
      .from("products")
      .update({ image_url: newUrl })
      .eq("id", product.id);

    if (updateError) {
      console.error(`  ✗  ${filename}  →  ${updateError.message}`);
    } else {
      console.log(`  ✓  ${filename}`);
      console.log(`     ${currentUrl}`);
      console.log(`     → ${newUrl}\n`);
      updated++;
    }
  }

  console.log(`─────────────────────────────────────────`);
  console.log(`  ✅  Updated : ${updated} products`);
  if (skipped) console.log(`  ⏭️   Skipped : ${skipped} (already on bucket)`);
  console.log(`─────────────────────────────────────────\n`);
}

// ── Run both steps ───────────────────────────────────────────
await uploadImages();
await updateImageUrls();
