export const PHONE = "+917867987871";
export const PHONE_HREF = `tel:${PHONE}`;
export const WHATSAPP_URL = "https://alvo.chat/4XA1";
export const EMAIL = "butterbytesb2@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const ADDRESS = "Tambaram, Chennai";

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/#menu" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/#about" },
  { label: "Works", href: "/#works" },
  { label: "Contact", href: "/#contact" },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  muffins: "Muffins",
  cupcakes: "Cup Cakes",
  cookies: "Cookies",
  brownies: "Brownies",
  ourspecials: "Our Specials",
  spreads: "Spreads",
};
