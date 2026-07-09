"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp, scaleIn, VIEWPORT } from "@/lib/animations";

const CATEGORIES = [
  { label: "Muffins",     image: "/assets/images/vennila-murffin.jpg", desc: "Soft & fluffy bakes"   },
  { label: "Cookies",     image: "/assets/images/buttercookies.jpg",   desc: "Crisp & buttery bites" },
  { label: "Cup Cakes",   image: "/assets/images/venilacupcake.jpg",   desc: "Frosted perfection"    },
  { label: "Brownies",    image: "/assets/images/cho-cookiie.png",     desc: "Fudgy & rich"          },
  { label: "Our Specials",image: "/assets/images/murukku.jpg",         desc: "Savory classics"       },
] as const;

export default function CategorySection() {
  return (
    <section id="menu" className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mb-14">
          <motion.span variants={fadeUp} className="text-accent text-xs tracking-[0.2em] uppercase font-semibold">
            What We Offer
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-brown mt-3">
            Our <span className="italic text-accent">Categories</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {CATEGORIES.map(({ label, image, desc }) => (
            <motion.a
              key={label}
              href="/products"
              variants={scaleIn}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group flex flex-col rounded-3xl overflow-hidden bg-card-warm border border-cream-dark hover:border-accent/30 hover:shadow-xl hover:shadow-brown/10 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={image} alt={label} fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>

              {/* Label */}
              <div className="p-4">
                <p className="text-brown font-semibold text-sm">{label}</p>
                <p className="text-brown-mid text-xs mt-0.5">{desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
