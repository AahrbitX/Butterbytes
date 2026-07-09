"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, scaleIn, fadeUp, VIEWPORT } from "@/lib/animations";

const GALLERY = [
  { src: "/assets/images/vennila-murffin.jpg", alt: "Vanilla Muffin", span: "col-span-1 row-span-2" },
  { src: "/assets/images/venilacupcake.jpg", alt: "Vanilla Cupcake", span: "col-span-1 row-span-1" },
  { src: "/assets/images/buttercookies.jpg", alt: "Butter Cookies", span: "col-span-1 row-span-1" },
  { src: "/assets/images/cho-cookiie.png", alt: "Chocolate Brownie", span: "col-span-1 row-span-1" },
  { src: "/assets/images/murukku.jpg", alt: "Murukku", span: "col-span-1 row-span-1" },
  { src: "/assets/images/pnut.jpg", alt: "Peanut Butter", span: "col-span-1 row-span-1" },
] as const;

export default function WorksGallery() {
  return (
    <section id="works" className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT} className="text-center mb-14">
          <motion.span variants={fadeUp} className="text-accent text-xs tracking-[0.25em] uppercase font-semibold">
            Gallery
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-brown mt-3">
            Our Delicious <span className="text-accent italic">Works</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT}
          className="grid grid-cols-3 grid-rows-2 gap-4 h-[480px]"
        >
          {GALLERY.map(({ src, alt, span }) => (
            <motion.div
              key={src} variants={scaleIn} whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`relative overflow-hidden rounded-2xl group shadow-md shadow-brown/10 ${span}`}
            >
              <Image
                src={src} alt={alt} fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-brown/10 group-hover:bg-brown/5 transition-colors duration-300" />
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 bg-cream/90 backdrop-blur-sm rounded-xl px-3 py-2"
              >
                <p className="text-brown text-xs font-medium">{alt}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
