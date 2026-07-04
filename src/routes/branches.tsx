import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BangladeshMap } from "@/components/BangladeshMap";
import { useTilt } from "@/hooks/useTilt";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "All Branches Nationwide — YRC.BD" },
      { name: "description", content: "Every YRC branch across Bangladesh, connected by #Yes_Yamaha." },
      { property: "og:title", content: "All Branches Nationwide — YRC.BD" },
      { property: "og:description", content: "Every YRC branch across Bangladesh, connected by #Yes_Yamaha." },
    ],
  }),
  component: BranchesPage,
});

const FB_URL = "https://www.facebook.com/groups/YamahaRidersClubBD";

const ALL_BRANCHES = [
  { name: "DHAKA CENTRAL", coord: "Managed by Aminul Islam", desc: "The flagship hub for capital riders, weekly meets and city tours." },
  { name: "CHITTAGONG HUB", coord: "Led by Mohammad Sajid", desc: "Coastal cruises, hill rides, and the largest port-city chapter." },
  { name: "SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", desc: "Tea-country trails and monsoon expeditions across the northeast." },
  { name: "RAJSHAHI", coord: "Managed by Tanvir Hossain", desc: "Northwest riders exploring silk city and Padma riverside routes." },
  { name: "KHULNA", coord: "Led by Rakibul Karim", desc: "Sundarbans gateway rides and southwest coastal expeditions." },
  { name: "BARISAL", coord: "Coordinated by Shahriar Alam", desc: "River-delta rides and southern belt community meets." },
  { name: "RANGPUR", coord: "Managed by Nazmul Haque", desc: "Northernmost chapter, Tista bridge runs and border rides." },
  { name: "MYMENSINGH", coord: "Led by Sadia Rahman", desc: "Brahmaputra riverside meets and central-north group rides." },
  { name: "COMILLA", coord: "Coordinated by Rezaul Bhuiyan", desc: "Historic city rides and eastern-central weekend expeditions." },
  { name: "COX'S BAZAR", coord: "Managed by Imran Khaled", desc: "World's longest beach cruises and southeast coastal tours." },
  { name: "JESSORE", coord: "Led by Habibur Rahman", desc: "Western-belt community rides and cross-district meetups." },
];

function BranchCard({ b }: { b: (typeof ALL_BRANCHES)[number] }) {
  const { ref, innerRef, tiltProps } = useTilt(15);
  return (
    <div
      ref={ref}
      {...tiltProps}
      className="yrc-branch-card-full rounded-xl bg-white"
      style={{
        padding: 32,
        boxShadow: "0 4px 20px rgba(0,48,135,0.1)",
        borderLeft: "4px solid #003087",
        transformStyle: "preserve-3d",
        opacity: 0,
      }}
    >
      <div ref={innerRef}>
        <div style={{ fontSize: 32, color: "#003087", lineHeight: 1 }}>📍</div>
        <h3 className="mt-4 font-display" style={{ color: "#003087", fontSize: 32, lineHeight: 1.05 }}>
          {b.name}
        </h3>
        <p className="mt-2 font-sans" style={{ fontSize: 13, color: "#0047cc" }}>
          {b.coord}
        </p>
        <p className="mt-3 font-sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
          {b.desc}
        </p>
        <a
          href={FB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block font-sans text-sm font-semibold text-[#003087] hover:underline"
        >
          Visit Facebook →
        </a>
      </div>
    </div>
  );
}

function BranchesPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".yrc-branch-card-full"));
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
              delay: anime.stagger(120),
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f8f9ff", color: "#0d0d0d" }}>
      <Navbar />

      <section
        className="relative w-full overflow-hidden px-6 lg:px-10"
        style={{
          backgroundColor: "#003087",
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 96,
          paddingBottom: 64,
        }}
      >
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="font-sans"
            style={{
              fontSize: 13,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            YRC.BD Network
          </p>
          <h1
            className="mt-4 font-display text-white"
            style={{ fontSize: "clamp(48px, 9vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            ALL BRANCHES NATIONWIDE
          </h1>
          <div className="mx-auto mt-6" style={{ width: 64, height: 3, backgroundColor: "#e60012" }} />
          <p
            className="mx-auto mt-6 max-w-2xl font-sans"
            style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}
          >
            Every YRC branch, connected by #Yes_Yamaha.
          </p>
        </div>
      </section>

      <section className="w-full px-6 py-16 lg:px-10" style={{ backgroundColor: "#f8f9ff" }}>
        <div className="mx-auto max-w-7xl">
          <BangladeshMap height={500} />
        </div>
      </section>

      <section className="w-full bg-white px-6 py-16 lg:px-10">
        <div ref={gridRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ALL_BRANCHES.map((b) => (
            <BranchCard key={b.name} b={b} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}