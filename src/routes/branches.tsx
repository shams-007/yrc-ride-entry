// src/routes/branches.tsx
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

// Easily add new branches here. The grid will automatically adjust.
const ALL_BRANCHES = [
  { 
    name: "DHAKA CENTRAL", 
    coord: "Managed by Aminul Islam", 
    desc: "The flagship hub for capital riders, weekly meets and city tours.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "CHITTAGONG HUB", 
    coord: "Led by Mohammad Sajid", 
    desc: "Coastal cruises, hill rides, and the largest port-city chapter.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "SYLHET REGIONAL", 
    coord: "Coordinated by Farhana Akter", 
    desc: "Tea-country trails and monsoon expeditions across the northeast.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "RAJSHAHI", 
    coord: "Managed by Tanvir Hossain", 
    desc: "Northwest riders exploring silk city and Padma riverside routes.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "KHULNA", 
    coord: "Led by Rakibul Karim", 
    desc: "Sundarbans gateway rides and southwest coastal expeditions.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "BARISAL", 
    coord: "Coordinated by Shahriar Alam", 
    desc: "River-delta rides and southern belt community meets.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "RANGPUR", 
    coord: "Managed by Nazmul Haque", 
    desc: "Northernmost chapter, Tista bridge runs and border rides.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "MYMENSINGH", 
    coord: "Led by Sadia Rahman", 
    desc: "Brahmaputra riverside meets and central-north group rides.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "COMILLA", 
    coord: "Coordinated by Rezaul Bhuiyan", 
    desc: "Historic city rides and eastern-central weekend expeditions.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "COX'S BAZAR", 
    coord: "Managed by Imran Khaled", 
    desc: "World's longest beach cruises and southeast coastal tours.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
  { 
    name: "JESSORE", 
    coord: "Led by Habibur Rahman", 
    desc: "Western-belt community rides and cross-district meetups.",
    fbLink: "https://www.facebook.com/groups/YamahaRidersClubBD"
  },
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
          href={b.fbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block font-sans text-sm font-semibold text-[#003087] hover:underline"
        >
          Visit Facebook Page →
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

      {/* Map Section with Legend & Quick Stats */}
      <section className="w-full px-6 py-12 lg:px-10" style={{ backgroundColor: "#f8f9ff" }}>
        <div className="mx-auto max-w-7xl flex flex-col items-center">
          
          <BangladeshMap height={500} />

          {/* Legend & Stats Bar to fill empty space */}
          <div 
            className="mt-8 flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-white rounded-2xl md:rounded-full px-8 py-5 gap-6 md:gap-0"
            style={{ 
              boxShadow: "0 8px 30px rgba(0,48,135,0.06)", 
              border: "1px solid rgba(0,48,135,0.1)" 
            }}
          >
            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="font-display text-[#003087] text-xl leading-none">MAP KEY:</span>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#e60012]" style={{ boxShadow: "0 0 8px rgba(230,0,18,0.8)" }}></span>
                <span className="font-sans text-sm font-semibold text-[#0d0d0d]">Main Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" style={{ boxShadow: "0 0 8px rgba(0,229,255,0.8)" }}></span>
                <span className="font-sans text-sm font-medium text-[#666]">Sub-Branch</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 bg-[rgba(0,48,135,0.1)]"></div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8">
               <div className="text-center">
                 <div className="font-display text-[#003087] text-3xl leading-none">64</div>
                 <div className="font-sans text-[10px] font-bold text-[#666] tracking-wider uppercase mt-1">Districts</div>
               </div>
               <div className="text-center">
                 <div className="font-display text-[#003087] text-3xl leading-none">472K+</div>
                 <div className="font-sans text-[10px] font-bold text-[#666] tracking-wider uppercase mt-1">Members</div>
               </div>
            </div>
          </div>

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
