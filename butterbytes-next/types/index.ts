export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  discountedPrice: string;
  rating: number;
  imageUrl: string;
  category: Category;
  discount: number;
}

export type Category =
  | "muffins"
  | "cupcakes"
  | "cookies"
  | "brownies"
  | "ourspecials"
  | "spreads"
  | "all";

/** Used for inserting new products (no id — Supabase generates it) */
export type ProductInsert = Omit<Product, "id">;

/** Raw row shape returned by Supabase (snake_case) */
export interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  rating: number;
  image_url: string;
  category: Category;
  discount: number;
  created_at: string;
}

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    discountedPrice: row.discounted_price,
    rating: row.rating,
    imageUrl: row.image_url,
    category: row.category,
    discount: row.discount,
  };
}
