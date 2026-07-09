"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import OrderModal from "@/components/ui/OrderModal";
import { fadeLeft, fadeUp, staggerContainer, VIEWPORT } from "@/lib/animations";

const WHY = [
  { icon: "✦", text: "100% handcrafted with love" },
  { icon: "✦", text: "Premium quality ingredients" },
  { icon: "✦", text: "No preservatives added" },
  { icon: "✦", text: "Bulk order discounts available" },
] as const;

export default function AboutSection() {
  return (
    <section id="about" className="bg-cream py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left — image */}
        <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={VIEWPORT} className="relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-brown/10">
            <Image src="/assets/images/about.jpeg" alt="About ButterBytes" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/30 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT} transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-6 -right-6 bg-brown rounded-2xl px-6 py-5 shadow-2xl"
          >
            <p className="font-display text-3xl font-bold text-cream">22+</p>
            <p className="text-cream/70 text-xs font-semibold tracking-widest uppercase mt-1">Products</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT} transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-6 -left-6 bg-card border border-cream-dark rounded-2xl px-6 py-5 shadow-xl"
          >
            <p className="font-display text-3xl font-bold text-accent">6</p>
            <p className="text-brown-mid text-xs font-semibold tracking-widest uppercase mt-1">Categories</p>
          </motion.div>
        </motion.div>

        {/* Right — content */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT}>
          <motion.span variants={fadeUp} className="text-accent text-xs tracking-[0.25em] uppercase font-semibold">
            Our Story
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-brown mt-3 mb-6 leading-tight">
            Starting from Nano, <br />
            <span className="text-accent italic">now we&apos;re here</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-brown-mid text-sm leading-relaxed mb-8">
            ButterBytes began as a small home kitchen passion project and has grown
            into a beloved local brand. We craft every treat by hand — using only
            the finest ingredients and time-honored recipes.
          </motion.p>

          <motion.ul variants={staggerContainer} className="flex flex-col gap-3 mb-10">
            {WHY.map(({ icon, text }) => (
              <motion.li key={text} variants={fadeUp} className="flex items-center gap-3 text-brown-mid text-sm">
                <span className="text-accent text-xs">{icon}</span>
                {text}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp}>
            <OrderModal>
              {(open) => (
                <button onClick={open}
                  className="inline-block bg-brown text-cream text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-brown-mid transition-all duration-300 shadow-md shadow-brown/20">
                  Know More
                </button>
              )}
            </OrderModal>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
