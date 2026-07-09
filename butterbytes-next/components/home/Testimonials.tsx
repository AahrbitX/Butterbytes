"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/animations";

const TESTIMONIALS = [
  { name: "Priya S.", text: "The vanilla muffins are absolutely divine! Soft, fluffy, and full of flavor. My whole family loves them." },
  { name: "Rahul M.", text: "Best cookies I've ever had. The ragi butter cookies are a healthy yet delicious treat. Highly recommended!" },
  { name: "Anitha K.", text: "Ordered cupcakes for my daughter's birthday and everyone was amazed. Will definitely order again!" },
  { name: "Suresh P.", text: "The thattai is perfectly crunchy and spiced just right. Reminds me of my grandmother's recipe." },
  { name: "Meena R.", text: "Brownies are fudgy and rich. The white chocolate ones are my personal favorite!" },
  { name: "Karthik V.", text: "Amazing quality and great packaging. The bulk order discount is a real bonus for our office events." },
  { name: "Divya N.", text: "The murukku is irresistibly crunchy. Once you start, you cannot stop! Great snack for the whole family." },
] as const;

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);

  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={VIEWPORT} className="text-center mb-14">
          <motion.span variants={fadeUp} className="text-accent text-xs tracking-[0.25em] uppercase font-semibold">
            Testimonials
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-brown mt-3">
            Happy <span className="text-accent italic">Clients</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={VIEWPORT} transition={{ duration: 0.6 }}
          className="overflow-hidden" ref={emblaRef}
        >
          <div className="flex gap-6">
            {TESTIMONIALS.map(({ name, text }) => (
              <div key={name} className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] px-1">
                <div className="bg-card border border-cream-dark rounded-3xl p-8 h-full flex flex-col hover:border-accent/30 hover:shadow-lg hover:shadow-brown/5 transition-all duration-300">
                  <FaQuoteLeft className="text-accent/40 text-2xl mb-5" />
                  <p className="text-brown-mid text-sm leading-relaxed flex-1 mb-6">{text}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-brown font-semibold text-sm">{name}</p>
                      <p className="text-brown-mid/60 text-xs mt-0.5">Verified Customer</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={10} className="text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
