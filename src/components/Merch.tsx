// src/components/Merch.tsx
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { motion } from "framer-motion";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useTilt } from "@/hooks/useTilt";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

// ==========================================
// 1. MASTER SWITCH
// Change to `false` to hide the shop from the website
export const SHOW_SHOP = true;

// 2. ORDER DELIVERY SETTINGS (Set at least one so you actually receive orders!)
// Option A: Paste a Formspree / Web3Forms / Google Apps Script / API endpoint URL:
const ORDER_WEBHOOK_URL = "";
// Option B: Or paste your WhatsApp number with country code (no "+" or spaces), e.g. "8801712345678":
const WHATSAPP_NUMBER = "";
// ==========================================

export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  hasSizes: boolean;
};

// Edit product names, prices, and DIRECT image URLs here:
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "YRC Official Rider T-Shirt",
    price: "৳ 650",
    // TODO: Replace with ImgBB "Direct link" (starts with https://i.ibb.co/...) or "/images/shirt.jpg"
    image: "https://i.imgur.com/Z0qzkTY.png",
    hasSizes: true,
  },
  {
    id: 2,
    name: "YRC Premium Edition Helmet",
    price: "৳ 4,500",
    // TODO: Replace with ImgBB "Direct link" (starts with https://i.ibb.co/...) or "/images/helmet.jpg"
    image: "https://i.imgur.com/U29l1ic.png",
    hasSizes: true,
  },
  {
    id: 3,
    name: "YRC Reflective Safety Jacket",
    price: "৳ 1,200",
    // TODO: Replace with ImgBB "Direct link" (starts with https://i.ibb.co/...) or "/images/jacket.jpg"
    image: "https://i.imgur.com/HdMAl5k.png",
    hasSizes: true,
  },
];

type OrderFormData = {
  fullName: string;
  phone: string;
  size: string;
  address: string;
};

const EMPTY_FORM: OrderFormData = {
  fullName: "",
  phone: "",
  size: "",
  address: "",
};

// 3D Tilt Wrapper for Merch Cards
function TiltCard({ children }: { children: React.ReactNode }) {
  const { ref, innerRef, tiltProps } = useTilt(12);
  return (
    <div
      ref={ref}
      {...tiltProps}
      className="yrc-merch-card"
      style={{ transformStyle: "preserve-3d", opacity: 0 }}
    >
      <div ref={innerRef} className="h-full">
        {children}
      </div>
    </div>
  );
}

export function Merch() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<OrderFormData>(EMPTY_FORM);

  useEffect(() => {
    if (!SHOW_SHOP) return;
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".yrc-merch-card"));

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done) {
            done = true;
            anime({
              targets: cards,
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 700,
              easing: "easeOutQuart",
              delay: anime.stagger(150),
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.05 },
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  const openOrderModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData(EMPTY_FORM);
    setSubmitError(null);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct || isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const payload = {
      product: selectedProduct.name,
      price: selectedProduct.price,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      size: selectedProduct.hasSizes ? formData.size : "N/A",
      address: formData.address.trim(),
    };

    try {
      if (ORDER_WEBHOOK_URL) {
        const res = await fetch(ORDER_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Could not submit your order. Please try again.");
        }
      } else if (WHATSAPP_NUMBER) {
        const message = [
          "*New YRC Shop Order*",
          `Item: ${payload.product} (${payload.price})`,
          payload.size !== "N/A" ? `Size: ${payload.size}` : null,
          `Name: ${payload.fullName}`,
          `Phone: ${payload.phone}`,
          `Address: ${payload.address}`,
        ]
          .filter(Boolean)
          .join("\n");

        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener,noreferrer",
        );
      } else {
        console.warn(
          "Merch order submitted locally only. Set ORDER_WEBHOOK_URL or WHATSAPP_NUMBER in src/components/Merch.tsx to receive orders.",
          payload,
        );
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!SHOW_SHOP) return null;

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="w-full bg-[#fbfbfd] px-6 lg:px-10"
      style={{ paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="mx-auto max-w-7xl text-center">
        <p
          className="yrc-reveal font-sans"
          style={{
            fontSize: 13,
            letterSpacing: "0.15em",
            color: "#0047cc",
            textTransform: "uppercase",
          }}
        >
          Official Gear
        </p>
        <h2
          className="yrc-heading yrc-reveal mt-3 font-display"
          style={{ color: "#003087", fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1.05 }}
        >
          YRC RIDER SHOP
        </h2>
        <p
          className="yrc-reveal mx-auto mt-4 max-w-2xl font-sans"
          style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}
        >
          Wear your pride. Grab the official Yamaha Riders Club merchandise. Limited stock
          available.
        </p>
      </div>

      <div ref={gridRef} className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {PRODUCTS.map((p) => (
          <TiltCard key={p.id}>
            <div
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 hover:shadow-2xl"
              style={{ boxShadow: "0 4px 20px rgba(0,48,135,0.08)" }}
            >
              <div
                className="relative flex items-center justify-center overflow-hidden bg-[#f0f4ff]"
                style={{ height: 280 }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003087]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 text-center">
                <div>
                  <h3
                    className="font-display"
                    style={{ color: "#003087", fontSize: 24, lineHeight: 1.1 }}
                  >
                    {p.name}
                  </h3>
                  <div className="mt-2 font-display" style={{ color: "#e60012", fontSize: 28 }}>
                    {p.price}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openOrderModal(p)}
                  className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#003087] py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#0047cc] hover:shadow-[0_8px_20px_rgba(0,48,135,0.3)]"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* ORDER MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="overflow-hidden rounded-2xl border-0 p-0 sm:max-w-[425px]">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center bg-white p-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>

              <DialogTitle asChild>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-3xl text-[#003087]"
                >
                  ORDER RECEIVED!
                </motion.h3>
              </DialogTitle>

              <DialogDescription asChild>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 font-sans text-sm leading-relaxed text-[#666]"
                >
                  Thank you, <span className="font-semibold text-[#003087]">{formData.fullName}</span>
                  . Your order for{" "}
                  <span className="font-semibold text-[#003087]">{selectedProduct?.name}</span> has
                  been received. Our team will contact you at{" "}
                  <span className="font-semibold text-[#003087]">{formData.phone}</span> to confirm
                  delivery details.
                </motion.p>
              </DialogDescription>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full cursor-pointer rounded-full bg-[#003087] py-3 font-sans text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-[#002070]"
              >
                CLOSE
              </motion.button>
            </div>
          ) : (
            <div className="bg-white">
              <div className="flex items-center gap-4 border-b border-[rgba(0,48,135,0.1)] bg-[#f8f9ff] p-6">
                {selectedProduct && (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-16 w-16 rounded-md object-cover shadow-sm"
                  />
                )}
                <div>
                  <DialogTitle className="font-display text-2xl leading-none text-[#003087]">
                    {selectedProduct?.name}
                  </DialogTitle>
                  <DialogDescription className="mt-1 font-display text-xl text-[#e60012]">
                    {selectedProduct?.price}
                  </DialogDescription>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 font-sans">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#003087]">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData((f) => ({ ...f, fullName: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:border-[#003087] focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
                    placeholder="e.g. Aminul Islam"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#003087]">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:border-[#003087] focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
                    placeholder="01XXX-XXXXXX"
                  />
                </div>

                {selectedProduct?.hasSizes && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#003087]">
                      Size
                    </label>
                    <select
                      required
                      value={formData.size}
                      onChange={(e) => setFormData((f) => ({ ...f, size: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:border-[#003087] focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
                    >
                      <option value="">Select Size</option>
                      <option value="M">Medium (M)</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#003087]">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData((f) => ({ ...f, address: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-all focus:border-[#003087] focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
                    placeholder="Full address for Cash on Delivery"
                  />
                </div>

                {submitError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-[#e60012]">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full cursor-pointer rounded-full bg-[#e60012] py-3.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(230,0,18,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "SUBMITTING..." : "PLACE ORDER (CASH ON DELIVERY)"}
                </button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
