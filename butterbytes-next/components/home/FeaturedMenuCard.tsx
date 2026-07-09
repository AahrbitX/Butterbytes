"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Product } from "@/types";
import OrderModal from "@/components/ui/OrderModal";

export default function FeaturedMenuCard({ product }: { product: Product }) {
  return (
    <OrderModal>
      {(open) => (
        <button
          onClick={open}
          className="group bg-card-warm rounded-2xl overflow-hidden border border-cream-dark hover:border-accent/40 hover:shadow-2xl hover:shadow-brown/10 hover:-translate-y-1 transition-all duration-300 text-left w-full"
        >
          <div className="relative h-44 bg-cream overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            {product.discount > 0 && (
              <span className="absolute top-2.5 left-2.5 bg-accent text-brown text-[9px] font-bold px-2 py-1 rounded-full tracking-wide">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="p-3.5">
            <p className="text-brown font-semibold text-sm leading-snug mb-2.5 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </p>
            <div className="flex items-center justify-between border-t border-cream-dark pt-2.5">
              <div className="flex items-center gap-1">
                <FaStar size={9} className="text-accent" />
                <span className="text-brown-mid text-xs font-medium">{product.rating}</span>
              </div>
              {product.discountedPrice ? (
                <span className="text-accent text-xs font-bold">{product.discountedPrice}</span>
              ) : product.price ? (
                <span className="text-brown-mid text-xs">{product.price}</span>
              ) : null}
            </div>
          </div>
        </button>
      )}
    </OrderModal>
  );
}
