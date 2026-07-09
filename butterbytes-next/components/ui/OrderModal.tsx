"use client";

import { useState, useEffect } from "react";
import { MdClose, MdContentCopy, MdCheck } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { PHONE, WHATSAPP_URL } from "@/lib/constants";

interface OrderModalProps {
  children: (open: () => void) => React.ReactNode;
}

export default function OrderModal({ children }: OrderModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(PHONE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const close = () => setIsOpen(false);

  return (
    <>
      {children(() => setIsOpen(true))}

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brown/40 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <div className="relative bg-card-warm rounded-3xl p-8 w-full max-w-sm shadow-2xl shadow-brown/20 border border-cream-dark z-10">
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-dark text-brown-mid hover:text-brown transition-all duration-200"
            >
              <MdClose size={18} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold text-brown">Place Your Order</h3>
              <p className="text-brown-mid text-sm mt-1">Call or WhatsApp us to order</p>
            </div>

            {/* Phone number — click to copy */}
            <button
              onClick={handleCopy}
              className="w-full bg-cream border border-cream-dark rounded-2xl px-5 py-4 flex items-center justify-between mb-5 hover:border-accent/40 transition-all duration-200 group"
            >
              <div className="text-left">
                <p className="text-brown-mid text-xs tracking-widest uppercase font-medium mb-0.5">Phone</p>
                <p className="font-display text-xl font-bold text-brown tracking-wide">{PHONE}</p>
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-cream-dark group-hover:bg-accent/20 text-brown-mid group-hover:text-accent transition-all duration-200">
                {copied ? <MdCheck size={16} className="text-accent" /> : <MdContentCopy size={16} />}
              </div>
            </button>

            {copied && (
              <p className="text-accent text-xs text-center -mt-3 mb-4 font-medium">Number copied!</p>
            )}

            {/* WhatsApp only — no tel: link to avoid browser dialog */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center justify-center gap-2.5 bg-green-500 text-white font-semibold text-sm py-3.5 rounded-full hover:bg-green-600 transition-all duration-300 w-full"
            >
              <FaWhatsapp size={18} />
              WhatsApp Us
            </a>

            <p className="text-brown-mid/50 text-[11px] text-center mt-5">
              Bulk order discounts available ✦ Tap phone to copy number
            </p>
          </div>
        </div>
      )}
    </>
  );
}
