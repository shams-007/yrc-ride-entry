import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// ==========================================
// THE MASTER SWITCH
// Change to `false` to hide the shop from the website
export const SHOW_SHOP = true;
// ==========================================

const PRODUCTS = [
  {
    id: 1,
    name: "YRC Official Rider T-Shirt",
    price: "৳ 650",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    hasSizes: true,
  },
  {
    id: 2,
    name: "YRC Premium Edition Helmet",
    price: "৳ 4,500",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80",
    hasSizes: true, // e.g., M, L, XL
  },
  {
    id: 3,
    name: "YRC Reflective Safety Jacket",
    price: "৳ 1,200",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80",
    hasSizes: true,
  },
];

export function Merch() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".yrc-merch-card"));
    
    let done = false;
    const io = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.2 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  const openOrderModal = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can later connect a service like Web3Forms or EmailJS to email you the order.
    // For now, it just shows the success screen.
    setIsSubmitted(true);
  };

  if (!SHOW_SHOP) return null;

  return (
    <section ref={sectionRef} id="shop" className="w-full bg-[#fbfbfd] px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto max-w-7xl text-center">
        <p className="yrc-reveal font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
          Official Gear
        </p>
        <h2 className="yrc-heading yrc-reveal mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 1.05 }}>
          YRC RIDER SHOP
        </h2>
        <p className="yrc-reveal mx-auto mt-4 max-w-2xl font-sans" style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
          Wear your pride. Grab the official Yamaha Riders Club merchandise. Limited stock available.
        </p>
      </div>

      <div ref={gridRef} className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="yrc-merch-card group flex flex-col overflow-hidden rounded-2xl bg-white"
            style={{ boxShadow: "0 4px 20px rgba(0,48,135,0.08)", opacity: 0 }}
          >
            <div className="relative flex items-center justify-center overflow-hidden bg-[#f0f4ff]" style={{ height: 280 }}>
              <img 
                src={p.image} 
                alt={p.name} 
                className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            
            <div className="flex flex-1 flex-col justify-between p-6 text-center">
              <div>
                <h3 className="font-display" style={{ color: "#003087", fontSize: 24, lineHeight: 1.1 }}>
                  {p.name}
                </h3>
                <div className="mt-2 font-display" style={{ color: "#e60012", fontSize: 28 }}>
                  {p.price}
                </div>
              </div>
              
              <button
                onClick={() => openOrderModal(p)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#003087] py-3 font-sans text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-[#002070] cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-2xl border-0">
          {isSubmitted ? (
            // SUCCESS SCREEN
            <div className="flex flex-col items-center justify-center p-10 text-center bg-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="font-display text-[#003087] text-3xl">ORDER RECEIVED!</h3>
              <p className="mt-3 font-sans text-[#666] text-sm leading-relaxed">
                Thank you for your order. Our team will contact you shortly at your provided phone number to confirm delivery details.
              </p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full rounded-full bg-[#003087] py-3 font-sans text-sm font-semibold text-white hover:bg-[#002070] cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          ) : (
            // ORDER FORM
            <div className="bg-white">
              <div className="bg-[#f8f9ff] p-6 border-b border-[rgba(0,48,135,0.1)] flex items-center gap-4">
                <img src={selectedProduct?.image} alt={selectedProduct?.name} className="h-16 w-16 rounded-md object-cover mix-blend-multiply" />
                <div>
                  <DialogTitle className="font-display text-[#003087] text-2xl leading-none">{selectedProduct?.name}</DialogTitle>
                  <DialogDescription className="font-display text-[#e60012] text-xl mt-1">{selectedProduct?.price}</DialogDescription>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 font-sans">
                <div>
                  <label className="block text-xs font-semibold text-[#003087] uppercase tracking-wider mb-1">Full Name</label>
                  <input required type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#003087] focus:outline-none" placeholder="e.g. Aminul Islam" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#003087] uppercase tracking-wider mb-1">Phone Number</label>
                  <input required type="tel" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#003087] focus:outline-none" placeholder="01XXX-XXXXXX" />
                </div>
                {selectedProduct?.hasSizes && (
                  <div>
                    <label className="block text-xs font-semibold text-[#003087] uppercase tracking-wider mb-1">Size</label>
                    <select required className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#003087] focus:outline-none">
                      <option value="">Select Size</option>
                      <option value="M">Medium (M)</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-[#003087] uppercase tracking-wider mb-1">Delivery Address</label>
                  <textarea required className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-[#003087] focus:outline-none" rows={2} placeholder="Full address for Cash on Delivery"></textarea>
                </div>
                <button type="submit" className="mt-2 w-full rounded-full bg-[#e60012] py-3.5 font-sans text-sm font-semibold text-white transition-transform hover:scale-[1.02] cursor-pointer shadow-lg shadow-red-500/30">
                  PLACE ORDER (CASH ON DELIVERY)
                </button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
