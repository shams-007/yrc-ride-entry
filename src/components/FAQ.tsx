import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  { q: "How do I join YRC?", a: "Visit any authorized ACI Motors Yamaha showroom or download the YRC BD App to register as a member." },
  { q: "Do I need to own a Yamaha to join?", a: "Yes, membership is currently exclusive to Yamaha motorcycle owners through our official showroom network." },
  { q: "Is there a membership fee?", a: "Membership is free with your Yamaha purchase through an authorized showroom." },
  { q: "How often do branches organize rides?", a: "Most branches organize rides and meetups monthly, with major national events like the Annual Conclave happening yearly." },
  { q: "Can I become a branch coordinator?", a: "Active members with strong community involvement can apply to become coordinators through their regional branch." },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="w-full bg-[#fbfbfd] px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto max-w-[800px]">
        <div className="relative inline-block pl-6 text-left">
          <span
            aria-hidden
            className="absolute left-0"
            style={{ top: 8, width: 3, height: 60, backgroundColor: "#e60012" }}
          />
          <p className="font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
            Got Questions
          </p>
          <h2 className="yrc-heading mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05 }}>
            FREQUENTLY ASKED
          </h2>
        </div>

        <div className="mt-12">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} style={{ borderBottom: "1px solid rgba(0,48,135,0.1)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between text-left"
                  style={{ paddingTop: 24, paddingBottom: 24 }}
                >
                  <span className="font-display" style={{ color: "#003087", fontSize: 20, lineHeight: 1.2 }}>
                    {it.q}
                  </span>
                  <ChevronDown
                    style={{
                      color: "#003087",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 300ms ease",
                      flexShrink: 0,
                      marginLeft: 16,
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="font-sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.7, paddingBottom: 24 }}>
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}