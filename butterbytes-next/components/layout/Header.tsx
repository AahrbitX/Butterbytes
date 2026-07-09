"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import OrderModal from "@/components/ui/OrderModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-sm shadow-brown/5" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/assets/images/ButterBytes.png" alt="ButterBytes" width={36} height={36} className="rounded-full" />
          <span className="font-display font-bold text-xl text-brown">
            Butter<span className="text-accent">Bytes</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="px-4 py-2 text-sm text-brown-mid font-medium rounded-full hover:text-brown hover:bg-cream-dark transition-all duration-200">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <OrderModal>
            {(open) => (
              <button onClick={open} className="hidden md:inline-flex items-center bg-brown text-cream text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brown-mid transition-all duration-300">
                Order Now
              </button>
            )}
          </OrderModal>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full hover:bg-cream-dark transition-all duration-300"
          >
            <span className={`block w-5 h-[1.5px] bg-brown transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-brown transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-brown transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="bg-cream border-t border-cream-dark px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm text-brown-mid font-medium rounded-xl hover:text-brown hover:bg-cream-dark transition-all duration-200">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <OrderModal>
              {(open) => (
                <button onClick={() => { open(); setMenuOpen(false); }}
                  className="w-full text-center bg-brown text-cream text-sm font-semibold px-5 py-3 rounded-full hover:bg-brown-mid transition-all duration-300">
                  Order Now
                </button>
              )}
            </OrderModal>
          </li>
        </ul>
      </div>
    </header>
  );
}
