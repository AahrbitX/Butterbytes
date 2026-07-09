"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, fadeRight, staggerContainer } from "@/lib/animations";
import OrderModal from "@/components/ui/OrderModal";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/Cake.jpg"
          alt="Hero background"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        {/* Cream gradient overlay — heavy on left, fades right */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, #F8F2EA 42%, #F8F2EAcc 58%, #F8F2EA55 72%, transparent 88%)",
          }}
        />
        {/* Subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, #F8F2EA, transparent)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — text */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show">

          <motion.span variants={fadeUp}
            className="inline-flex items-center gap-2 text-accent text-xs tracking-[0.25em] uppercase font-semibold mb-6">
            <span className="w-6 h-px bg-accent" />
            Handcrafted with Love
          </motion.span>

          <motion.h1 variants={fadeUp}
            className="font-display font-bold text-brown leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
            Sweet <br />
            Moments <br />
            <span className="text-accent italic">Start Here</span>
          </motion.h1>

          <motion.p variants={fadeUp}
            className="text-brown-mid text-base leading-relaxed mb-8 max-w-sm">
            Artisan bakery treats and savory snacks — baked fresh every day, delivered with love.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <OrderModal>
              {(open) => (
                <button onClick={open}
                  className="bg-brown text-cream text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-accent transition-all duration-300 shadow-lg shadow-brown/25">
                  Order Now
                </button>
              )}
            </OrderModal>
            <a href="/#menu"
              className="border border-brown/25 text-brown bg-cream/60 backdrop-blur-sm text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-cream hover:border-brown/40 transition-all duration-300">
              View Menu
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp}
            className="flex gap-10 pt-8 border-t border-brown/12">
            {[
              { value: "22+", label: "Products" },
              { value: "6",   label: "Categories" },
              { value: "100%", label: "Handcrafted" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-brown leading-none">{value}</p>
                <p className="text-brown-mid text-xs tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — floating cards only (image is the background) */}
        <motion.div
          variants={fadeRight} initial="hidden" animate="show"
          className="relative hidden lg:flex items-center justify-center h-[480px]">

          {/* Rating card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute top-12 left-0 bg-card-warm/90 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-xl shadow-brown/10 border border-cream-dark">
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-accent text-xs">★</span>
              ))}
            </div>
            <p className="text-brown font-semibold text-sm">4.8 Rating</p>
            <p className="text-brown-mid text-xs mt-0.5">By our customers</p>
          </motion.div>

          {/* Fresh badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-16 right-0 bg-brown rounded-2xl px-5 py-3.5 shadow-xl shadow-brown/30">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <p className="text-cream font-semibold text-sm">100% Fresh</p>
            </div>
            <p className="text-cream/60 text-xs">Baked daily</p>
          </motion.div>

          {/* Subtle location pill */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-cream/80 backdrop-blur-sm border border-cream-dark rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-brown-mid text-[10px] tracking-widest uppercase font-medium">Chennai, India</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
