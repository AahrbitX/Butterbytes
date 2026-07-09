"use client";

import { motion } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { staggerContainer, fadeUp, scaleIn, VIEWPORT } from "@/lib/animations";
import { WHATSAPP_URL } from "@/lib/constants";
import OrderModal from "@/components/ui/OrderModal";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-cream py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">

        <div className="relative bg-brown rounded-3xl p-12 md:p-20 text-center overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT} className="relative">
            <motion.span variants={fadeUp} className="text-accent text-xs tracking-[0.25em] uppercase font-semibold">
              Get in Touch
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl font-bold text-cream mt-4 mb-4 leading-tight">
              Ready to <span className="text-accent italic">Order?</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-cream/60 text-sm md:text-base mb-3 max-w-lg mx-auto">
              Call us directly or reach out on WhatsApp. Discounts available for bulk orders!
            </motion.p>

            <motion.p variants={fadeUp} className="text-accent text-sm font-semibold mb-10">
              ✦ Bulk Order Discounts Available ✦
            </motion.p>

            <motion.div variants={staggerContainer} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <OrderModal>
                {(open) => (
                  <motion.button
                    variants={scaleIn} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={open}
                    className="flex items-center gap-3 bg-accent text-brown font-semibold px-8 py-4 rounded-full hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    <MdPhone size={20} />
                    Call Us Now
                  </motion.button>
                )}
              </OrderModal>

              <motion.a
                variants={scaleIn} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <FaWhatsapp size={20} />
                WhatsApp Us
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
