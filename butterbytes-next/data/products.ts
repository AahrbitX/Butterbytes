import { ProductInsert } from "@/types";

/** Seed data — run this through the Supabase SQL editor or use the admin dashboard to import */
export const PRODUCTS: ProductInsert[] = [
  {
    name: "Classic Vanilla Muffin",
    description:
      "Vanilla muffins are soft, fluffy, and aromatic baked goods that showcase the classic flavor of vanilla.",
    price: "₹24/per",
    discountedPrice: "₹12/per",
    rating: 4.7,
    imageUrl: "/assets/images/vennila-murffin.jpg",
    category: "muffins",
    discount: 50,
  },
  {
    name: "Rich Chocolate Muffin",
    description:
      "Rich chocolate muffins are decadent treats packed with intense chocolate flavor and a moist, fudgy texture.",
    price: "₹20/per",
    discountedPrice: "₹30/per",
    rating: 4.7,
    imageUrl: "/assets/images/chocolate-cupcake.jpg",
    category: "muffins",
    discount: 20,
  },
  {
    name: "Almond Joy Muffin",
    description:
      "Almond muffins are light and flavorful treats that showcase the rich, nutty essence of almonds.",
    price: "₹25/per",
    discountedPrice: "₹35/per",
    rating: 4.7,
    imageUrl: "/assets/images/almondjoymuffin.jpg",
    category: "muffins",
    discount: 20,
  },
  {
    name: "Nutty Fusion Muffin",
    description:
      "Almond, cashew, and raisin muffins — a deliciously nutty and sweet treat that combines rich nuts with the natural sweetness of plump raisins.",
    price: "₹50/per",
    discountedPrice: "₹25/per",
    rating: 4.7,
    imageUrl: "/assets/images/nuttyfusionmuffin.jpg",
    category: "muffins",
    discount: 50,
  },
  {
    name: "Vanilla Bliss Cupcake",
    description:
      "Classic, fluffy treats topped with a rich and creamy vanilla buttercream frosting.",
    price: "₹40/per",
    discountedPrice: "₹30/per",
    rating: 4.7,
    imageUrl: "/assets/images/venilacupcake.jpg",
    category: "cupcakes",
    discount: 5,
  },
  {
    name: "Cocoa Delight Cupcake",
    description:
      "Rich, moist chocolate cupcakes topped with a smooth and creamy chocolate buttercream.",
    price: "₹40/per",
    discountedPrice: "₹35/per",
    rating: 4.7,
    imageUrl: "/assets/images/cococupcake.jpg",
    category: "cupcakes",
    discount: 5,
  },
  {
    name: "Pineapple Paradise Cupcake",
    description:
      "Moist, tropical-flavored treats made with pineapple and topped with a smooth, creamy pineapple-infused buttercream frosting.",
    price: "₹40/per",
    discountedPrice: "₹35/per",
    rating: 4.7,
    imageUrl: "/assets/images/pineapplecupcake.jpg",
    category: "cupcakes",
    discount: 5,
  },
  {
    name: "Nutty Wonderland Cupcake",
    description:
      "Moist, nutty treats packed with mixed nuts and topped with smooth, creamy buttercream.",
    price: "₹50/per",
    discountedPrice: "₹40/per",
    rating: 4.5,
    imageUrl: "/assets/images/nuttywonderlandcupcake.jpg",
    category: "cupcakes",
    discount: 10,
  },
  {
    name: "Coconut Crunchies Cookies",
    description:
      "Light, crisp treats with a delicate tropical flavor, made from shredded coconut and ghee for a sweet and satisfying bite.",
    price: "₹100/100g",
    discountedPrice: "₹80/100g",
    rating: 4.8,
    imageUrl: "/assets/images/cocnutcookies.jpg",
    category: "cookies",
    discount: 25,
  },
  {
    name: "Meltaway Butter Cookies",
    description:
      "Rich, tender treats with a smooth, buttery flavor and a crisp, melt-in-your-mouth texture.",
    price: "₹100/100g",
    discountedPrice: "₹90/100g",
    rating: 4.8,
    imageUrl: "/assets/images/buttercookies.jpg",
    category: "cookies",
    discount: 10,
  },
  {
    name: "Rustic Ragi Butter Cookies",
    description:
      "Nutritious, fiber-rich treats made from wholesome finger millet, offering a delicious and healthy snack option.",
    price: "₹100/100g",
    discountedPrice: "₹80/100g",
    rating: 4.8,
    imageUrl: "/assets/images/ragicookies.jpg",
    category: "cookies",
    discount: 10,
  },
  {
    name: "Mini Milk Cookies",
    description:
      "Soft, bite-sized treats with a creamy, milky flavor.",
    price: "₹100/100g",
    discountedPrice: "₹75/100g",
    rating: 4.8,
    imageUrl: "/assets/images/minicookies.jpg",
    category: "cookies",
    discount: 25,
  },
  {
    name: "Choco Chip Cookies",
    description:
      "Soft, buttery delights filled with rich, melty chocolate chips.",
    price: "₹100/100g",
    discountedPrice: "₹90/100g",
    rating: 4.8,
    imageUrl: "/assets/images/chococookies.jpg",
    category: "cookies",
    discount: 10,
  },
  {
    name: "Fudgy Dark Chocolate Brownie",
    description:
      "One bite of this brownie, and chocolate heaven is just a taste away.",
    price: "₹100/per",
    discountedPrice: "₹70/per",
    rating: 4.7,
    imageUrl: "/assets/images/cho-cookiie.png",
    category: "brownies",
    discount: 30,
  },
  {
    name: "Silky White Chocolate Brownies",
    description:
      "A creamy, decadent twist on a classic — white chocolate perfection in every bite.",
    price: "₹100/per",
    discountedPrice: "₹75/per",
    rating: 4.7,
    imageUrl: "/assets/images/chocolate-brownies-white-plate.jpg",
    category: "brownies",
    discount: 25,
  },
  {
    name: "Nuts Overloaded Brownies",
    description:
      "A rich, fudgy brownie packed with a crunchy overload of nuts in every bite.",
    price: "₹100/per",
    discountedPrice: "₹90/per",
    rating: 4.7,
    imageUrl: "/assets/images/p1.jpg",
    category: "brownies",
    discount: 10,
  },
  {
    name: "Murukku",
    description:
      "Crispy, crunchy, unforgettable. One of our best selling savouries that spirals your heart.",
    price: "₹100/250g",
    discountedPrice: "₹90/250g",
    rating: 4.5,
    imageUrl: "/assets/images/murukku.jpg",
    category: "ourspecials",
    discount: 10,
  },
  {
    name: "Somas",
    description:
      "Crispy delights wrapped in sweetness. Enjoy our signature somas with a nuts filling.",
    price: "₹20/per",
    discountedPrice: "₹15/per",
    rating: 4.5,
    imageUrl: "/assets/images/smaos.jpeg",
    category: "ourspecials",
    discount: 10,
  },
  {
    name: "Thattai",
    description:
      "Our thattai recipe is melt-in-mouth crunchy. Perfectly puffed! Perfectly spiced!",
    price: "₹100/250g",
    discountedPrice: "₹90/250g",
    rating: 4.8,
    imageUrl: "/assets/images/thattai.jpeg",
    category: "ourspecials",
    discount: 25,
  },
  {
    name: "Mixed Fruit Jam",
    description: "Wholesome fruits, one delightful spread!",
    price: "",
    discountedPrice: "",
    rating: 4.5,
    imageUrl: "/assets/images/Fjam.jpg",
    category: "spreads",
    discount: 10,
  },
  {
    name: "Tomato Ketchup",
    description: "Pure, simple, and delicious — just like it should be!",
    price: "",
    discountedPrice: "",
    rating: 4.5,
    imageUrl: "/assets/images/tomo.jpg",
    category: "spreads",
    discount: 10,
  },
  {
    name: "Peanut Butter",
    description: "Spread the joy — pure peanut perfection in every bite!",
    price: "",
    discountedPrice: "",
    rating: 4.5,
    imageUrl: "/assets/images/pnut.jpg",
    category: "spreads",
    discount: 10,
  },
];

export const CATEGORIES = [
  "all",
  "muffins",
  "cupcakes",
  "cookies",
  "brownies",
  "ourspecials",
  "spreads",
] as const;

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 5);
