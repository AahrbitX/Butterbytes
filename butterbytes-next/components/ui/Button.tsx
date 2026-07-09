interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

export default function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base = "inline-block px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer";
  const variants = {
    primary: "bg-brown text-cream hover:bg-brown-mid shadow-md shadow-brown/20",
    outline: "border-2 border-brown text-brown hover:bg-brown hover:text-cream",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
