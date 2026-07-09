-- ============================================================
-- ButterBytes – Supabase Schema
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- 1. Products table
CREATE TABLE IF NOT EXISTS products (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  price            TEXT NOT NULL DEFAULT '',
  discounted_price TEXT NOT NULL DEFAULT '',
  rating           NUMERIC(2,1) NOT NULL DEFAULT 4.5,
  image_url        TEXT NOT NULL DEFAULT '',
  category         TEXT NOT NULL,
  discount         INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can read products (public site)
CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (true);

-- Only signed-in admin can insert/update/delete
CREATE POLICY "Admin insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- 3. Supabase Storage bucket for product images
-- Run this separately in Supabase → Storage → New Bucket
-- Bucket name: product-images | Public: true

-- ============================================================
-- Seed data – paste below to pre-populate all 22 products
-- ============================================================

INSERT INTO products (name, description, price, discounted_price, rating, image_url, category, discount) VALUES
('Classic Vanilla Muffin', 'Vanilla muffins are soft, fluffy, and aromatic baked goods that showcase the classic flavor of vanilla.', '₹24/per', '₹12/per', 4.7, '/assets/images/vennila-murffin.jpg', 'muffins', 50),
('Rich Chocolate Muffin', 'Rich chocolate muffins are decadent treats packed with intense chocolate flavor and a moist, fudgy texture.', '₹20/per', '₹30/per', 4.7, '/assets/images/chocolate-cupcake.jpg', 'muffins', 20),
('Almond Joy Muffin', 'Almond muffins are light and flavorful treats that showcase the rich, nutty essence of almonds.', '₹25/per', '₹35/per', 4.7, '/assets/images/almondjoymuffin.jpg', 'muffins', 20),
('Nutty Fusion Muffin', 'Almond, cashew, and raisin muffins — a deliciously nutty and sweet treat.', '₹50/per', '₹25/per', 4.7, '/assets/images/nuttyfusionmuffin.jpg', 'muffins', 50),
('Vanilla Bliss Cupcake', 'Classic, fluffy treats topped with a rich and creamy vanilla buttercream frosting.', '₹40/per', '₹30/per', 4.7, '/assets/images/venilacupcake.jpg', 'cupcakes', 5),
('Cocoa Delight Cupcake', 'Rich, moist chocolate cupcakes topped with smooth and creamy chocolate buttercream.', '₹40/per', '₹35/per', 4.7, '/assets/images/cococupcake.jpg', 'cupcakes', 5),
('Pineapple Paradise Cupcake', 'Moist, tropical-flavored treats made with pineapple and topped with pineapple-infused buttercream.', '₹40/per', '₹35/per', 4.7, '/assets/images/pineapplecupcake.jpg', 'cupcakes', 5),
('Nutty Wonderland Cupcake', 'Moist, nutty treats packed with mixed nuts and topped with smooth, creamy buttercream.', '₹50/per', '₹40/per', 4.5, '/assets/images/nuttywonderlandcupcake.jpg', 'cupcakes', 10),
('Coconut Crunchies Cookies', 'Light, crisp treats with a delicate tropical flavor, made from shredded coconut and ghee.', '₹100/100g', '₹80/100g', 4.8, '/assets/images/cocnutcookies.jpg', 'cookies', 25),
('Meltaway Butter Cookies', 'Rich, tender treats with a smooth, buttery flavor and a crisp, melt-in-your-mouth texture.', '₹100/100g', '₹90/100g', 4.8, '/assets/images/buttercookies.jpg', 'cookies', 10),
('Rustic Ragi Butter Cookies', 'Nutritious, fiber-rich treats made from wholesome finger millet.', '₹100/100g', '₹80/100g', 4.8, '/assets/images/ragicookies.jpg', 'cookies', 10),
('Mini Milk Cookies', 'Soft, bite-sized treats with a creamy, milky flavor.', '₹100/100g', '₹75/100g', 4.8, '/assets/images/minicookies.jpg', 'cookies', 25),
('Choco Chip Cookies', 'Soft, buttery delights filled with rich, melty chocolate chips.', '₹100/100g', '₹90/100g', 4.8, '/assets/images/chococookies.jpg', 'cookies', 10),
('Fudgy Dark Chocolate Brownie', 'One bite of this brownie, and chocolate heaven is just a taste away.', '₹100/per', '₹70/per', 4.7, '/assets/images/cho-cookiie.png', 'brownies', 30),
('Silky White Chocolate Brownies', 'A creamy, decadent twist on a classic — white chocolate perfection in every bite.', '₹100/per', '₹75/per', 4.7, '/assets/images/chocolate-brownies-white-plate.jpg', 'brownies', 25),
('Nuts Overloaded Brownies', 'A rich, fudgy brownie packed with a crunchy overload of nuts in every bite.', '₹100/per', '₹90/per', 4.7, '/assets/images/p1.jpg', 'brownies', 10),
('Murukku', 'Crispy, crunchy, unforgettable. One of our best selling savouries that spirals your heart.', '₹100/250g', '₹90/250g', 4.5, '/assets/images/murukku.jpg', 'ourspecials', 10),
('Somas', 'Crispy delights wrapped in sweetness. Enjoy our signature somas with a nuts filling.', '₹20/per', '₹15/per', 4.5, '/assets/images/smaos.jpeg', 'ourspecials', 10),
('Thattai', 'Our thattai recipe is melt-in-mouth crunchy. Perfectly puffed! Perfectly spiced!', '₹100/250g', '₹90/250g', 4.8, '/assets/images/thattai.jpeg', 'ourspecials', 25),
('Mixed Fruit Jam', 'Wholesome fruits, one delightful spread!', '', '', 4.5, '/assets/images/Fjam.jpg', 'spreads', 10),
('Tomato Ketchup', 'Pure, simple, and delicious — just like it should be!', '', '', 4.5, '/assets/images/tomo.jpg', 'spreads', 10),
('Peanut Butter', 'Spread the joy — pure peanut perfection in every bite!', '', '', 4.5, '/assets/images/pnut.jpg', 'spreads', 10);
