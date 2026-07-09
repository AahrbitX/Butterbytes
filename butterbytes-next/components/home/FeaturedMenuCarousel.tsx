"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Product } from "@/types";
import { scaleIn, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function FeaturedMenuCarousel({ products }: { products: Product[] }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT}
      className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-5">
        {products.map((product) => (
          <motion.div key={product.id} variants={scaleIn} whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-none w-52 bg-card rounded-2xl overflow-hidden border border-cream-dark hover:border-accent/30 hover:shadow-xl hover:shadow-brown/10 transition-all duration-300 group">
            <div className="h-44 overflow-hidden">
              <Image src={product.imageUrl} alt={product.name} width={208} height={176}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <p className="text-brown font-semibold text-sm truncate">{product.name}</p>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center gap-1">
                  <FaStar size={10} className="text-accent" />
                  <span className="text-brown-mid text-xs">{product.rating}</span>
                </div>
                {product.discountedPrice && (
                  <span className="text-accent text-xs font-bold">{product.discountedPrice}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
