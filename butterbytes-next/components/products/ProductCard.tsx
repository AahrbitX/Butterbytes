"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MdPhone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Product } from "@/types";
import OrderModal from "@/components/ui/OrderModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group bg-card border border-cream-dark rounded-2xl overflow-hidden flex flex-col hover:border-accent/30 hover:shadow-xl hover:shadow-brown/10 transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.imageUrl} alt={product.name} fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-cream/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <FaStar size={10} className="text-accent" />
          <span className="text-brown text-xs font-medium">{product.rating}</span>
        </div>
        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-brown text-xs font-bold px-2.5 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-accent text-[10px] tracking-widest uppercase font-semibold mb-1 capitalize">
          {product.category}
        </span>
        <h3 className="text-brown font-semibold text-sm mb-2 leading-snug">{product.name}</h3>
        <p className="text-brown-mid text-xs leading-relaxed flex-1 mb-4 line-clamp-2">
          {product.description}
        </p>

        {product.price && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-brown-mid/50 text-xs line-through">{product.price}</span>
            <span className="text-accent font-bold text-sm">{product.discountedPrice}</span>
          </div>
        )}

        <OrderModal>
          {(open) => (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={open}
              className="flex items-center justify-center gap-2 bg-brown text-cream text-xs font-semibold py-2.5 rounded-full hover:bg-brown-mid transition-all duration-300 w-full"
            >
              <MdPhone size={14} />
              Call to Order
            </motion.button>
          )}
        </OrderModal>
      </div>
    </motion.div>
  );
}
