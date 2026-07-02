import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import anime from "animejs";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const ITEMS = [
  { q: "How do I join YRC?", a: "Visit any authorized ACI Motors Yamaha showroom or download the YRC BD App to register as a member." },
  { q: "Do I need to own a Yamaha to join?", a: "Yes, membership is currently exclusive to Yamaha motorcycle owners through our official showroom network." },
  { q: "Is there a membership fee?", a: "Membership is free with your Yamaha purchase through an authorized showroom." },
  { q: "How often do branches organize rides?", a: "Most branches organize rides and meetups monthly, with major national events like the Annual Conclave happening yearly." },
  { q: "Can I become a branch coordinator?", a: "Active members with strong community involvement can apply to become coordinators through their regional branch." },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const chevRef = useRef<SVGSVGElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const body = bodyRef.current;
    const chev = chevRef.current;
    if (!body || !chev) return;
    if (first.current) {
      first.current = false;
      body.style.height = isOpen ? "auto" : "0px";
      body.style.overflow = "hidden";
      chev.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
      return;
    }
    anime.remove(body);
    anime.remove(chev);
    const target = isOpen ? body.scrollHeight : 0;
    if (isOpen) body.style.height = "0px";
    anime({
      targets: body,
      height: target,
      duration: 350,
      easing: "easeOutCubic",
      complete: () => {
        if (isOpen) body.style.height = "auto";
      },
    });
    anime({
      targets: chev,
      rotate: isOpen ? 180 : 0,
      duration: 350,
      easing: "easeOutCubic",
    });
  }, [isOpen]);

  return (
    <div style={{ borderBottom: "1px solid rgba(0,48,135,0.1)" }}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <span className="font-display" style={{ color: "#003087", fontSize: 20, lineHeight: 1.2 }}>
          {q}
        </span>
        <ChevronDown ref={chevRef} style={{ color: "#003087", flexShrink: 0, marginLeft: 16 }} />
      </button>
      <div ref={bodyRef} style={{ overflow: "hidden", height: 0 }}>
        <p className="font-sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.7, paddingBottom: 24 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number>(0);
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section ref={ref} id="faq" className="w-full bg-[#fbfbfd] px-6 lg:px-10" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto max-w-[800px]">
        <div className="relative inline-block pl-6 text-left">
          <span
            aria-hidden
            className="absolute left-0"
            style={{ top: 8, width: 3, height: 60, backgroundColor: "#e60012" }}
          />
          <p className="yrc-reveal font-sans" style={{ fontSize: 13, letterSpacing: "0.15em", color: "#0047cc", textTransform: "uppercase" }}>
            Got Questions
          </p>
          <h2 className="yrc-heading yrc-reveal mt-3 font-display" style={{ color: "#003087", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05 }}>
            FREQUENTLY ASKED
          </h2>
        </div>

        <div className="mt-12">
          {ITEMS.map((it, i) => (
            <FAQItem
              key={it.q}
              q={it.q}
              a={it.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}