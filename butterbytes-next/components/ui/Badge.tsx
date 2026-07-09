interface BadgeProps {
  children: React.ReactNode;
  variant?: "rating" | "discount";
}

export default function Badge({ children, variant = "rating" }: BadgeProps) {
  const variants = {
    rating: "bg-cream text-brown border border-cream-dark",
    discount: "bg-accent text-brown",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${variants[variant]}`}>
      {children}
    </span>
  );
}
