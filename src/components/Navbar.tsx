import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Road Safety", href: "#road-safety" },
  { label: "Membership", href: "#membership" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const smoothScrollTo = (href: string) => {
    if (!href.startsWith("#")) return;
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href);
    history.replaceState(null, "", href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white transition-all duration-300 ${
        scrolled ? "backdrop-blur-sm shadow-sm bg-white/90" : ""
      }`}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 lg:px-10">
        <a
          href="#home"
          className="font-display text-[28px] leading-none tracking-wide"
          style={{ color: "#003087" }}
        >
          YRC.BD
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="group relative font-sans text-[14px] tracking-[0.12em] uppercase text-[#0d0d0d]"
            >
              {l.label}
              <span
                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#e60012] transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        <a
          href="#join"
          className="hidden lg:inline-flex items-center justify-center rounded-full bg-[#e60012] px-6 py-2 text-sm font-semibold tracking-wide text-white transition-transform hover:scale-105"
        >
          JOIN YRC
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-[#003087]"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden w-full overflow-hidden"
            style={{ background: "linear-gradient(180deg, #003087 0%, #002070 100%)" }}
          >
            <nav className="flex flex-col items-stretch gap-0 px-6 py-6">
              {links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="yrc-mobile-link font-display text-[28px] tracking-wide text-white"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#e60012] px-10 py-4 text-base font-semibold tracking-wide text-white"
              >
                JOIN YRC
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}