import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { NAV_LINKS, PHONE, EMAIL, ADDRESS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-cream-dark border-t border-cream-dark pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/assets/images/ButterBytes.png" alt="ButterBytes logo" width={40} height={40} className="rounded-full" />
            <span className="font-display font-bold text-xl text-brown">
              Butter<span className="text-accent">Bytes</span>
            </span>
          </Link>
          <ul className="flex flex-col gap-2 mt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}
                  className="text-brown-mid text-sm hover:text-brown transition-colors duration-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-brown font-semibold text-base mb-4">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm text-brown-mid">
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-accent shrink-0" />
              {ADDRESS}
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-accent shrink-0" />
              <a href={`tel:${PHONE}`} className="hover:text-brown transition-colors duration-300">{PHONE}</a>
            </li>
            <li className="flex items-center gap-2">
              <MdEmail className="text-accent shrink-0" />
              <a href={`mailto:${EMAIL}`} className="hover:text-brown transition-colors duration-300">{EMAIL}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brown font-semibold text-base mb-4">About Us</h4>
          <p className="text-brown-mid text-sm leading-relaxed mb-5">
            ButterBytes crafts handmade bakery treats and savory snacks with
            love, using quality ingredients — every bite tells our story.
          </p>
          <div className="flex gap-3">
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
              className="w-9 h-9 rounded-full border border-cream-dark bg-card flex items-center justify-center text-brown-mid hover:border-accent hover:text-accent transition-all duration-300">
              <FaTwitter size={14} />
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-cream-dark bg-card flex items-center justify-center text-brown-mid hover:border-accent hover:text-accent transition-all duration-300">
              <FaFacebookF size={14} />
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-cream-dark bg-card flex items-center justify-center text-brown-mid hover:border-accent hover:text-accent transition-all duration-300">
              <FaInstagram size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-cream-dark flex flex-col md:flex-row items-center justify-between gap-2 text-brown-mid/60 text-xs">
        <p>© 2024 ButterBytes. All rights reserved.</p>
        <p>Developed & Designed by AahrbitX Solutions</p>
      </div>
    </footer>
  );
}
