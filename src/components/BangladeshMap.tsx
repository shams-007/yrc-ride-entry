import React, { useState, useEffect, useRef, useMemo } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// All 60+ branches have been tightly grouped towards the center of the landmass
// No branches will render in the ocean
const ALL_BRANCHES: Branch[] = [
  // 8 Main Hubs (Large Red Pins)
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 200, cy: 230, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 275, cy: 350, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 290, cy: 140, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 150, cy: 330, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 100, cy: 190, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 195, cy: 340, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 125, cy: 95, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 200, cy: 150, isMain: true },
  
  // Sub-Branches (Glowing Cyan Nodes)
  { id: "narayanganj", name: "YRC Narayanganj", cx: 205, cy: 245 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 240, cy: 220 },
  { id: "naogaon", name: "YRC Naogaon", cx: 110, cy: 175 },
  { id: "bhairab", name: "YRC Bhairab", cx: 225, cy: 205 },
  { id: "charfesson", name: "YRC Charfesson", cx: 205, cy: 370 },
  { id: "nazipur", name: "YRC Nazipur", cx: 105, cy: 165 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 230, cy: 165 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 115, cy: 80 },
  { id: "dhunat", name: "YRC Dhunat", cx: 155, cy: 165 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 250, cy: 275 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 265, cy: 300 },
  { id: "chandpur", name: "YRC Chandpur", cx: 225, cy: 290 },
  { id: "muradpur", name: "YRC Muradpur", cx: 270, cy: 345 },
  { id: "mirpur", name: "Mirpur Branch", cx: 195, cy: 235 },
  { id: "rangamati", name: "YRC Rangamati", cx: 295, cy: 335 },
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 285, cy: 420 },
  { id: "chakaria", name: "YRC Chakaria", cx: 280, cy: 395 },
  { id: "paltan", name: "Paltan Branch", cx: 200, cy: 242 },
  { id: "madaripur", name: "YRC Madaripur", cx: 185, cy: 295 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 202, cy: 238 },
  { id: "jashore", name: "YRC Jashore", cx: 125, cy: 300 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 265, cy: 295 },
  { id: "singair", name: "YRC Singair", cx: 185, cy: 240 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 285, cy: 410 },
  { id: "laksham", name: "YRC Laksham", cx: 255, cy: 285 },
  { id: "shariatpur", name: "YRC Shariatpur", cx: 195, cy: 300 },
  { id: "patiya", name: "YRC Patiya", cx: 280, cy: 360 },
  { id: "domar", name: "YRC Domar", cx: 115, cy: 65 },
  { id: "natore", name: "YRC Natore", cx: 130, cy: 195 },
  { id: "anowara", name: "YRC Anowara", cx: 280, cy: 370 },
  { id: "debiganj", name: "YRC Debiganj", cx: 105, cy: 55 },
  { id: "saidpur", name: "YRC Saidpur", cx: 115, cy: 85 },
  { id: "kushtia", name: "YRC Kushtia", cx: 125, cy: 245 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 285, cy: 330 },
  { id: "sakhipur", name: "YRC Sakhipur", cx: 185, cy: 195 },
  { id: "bogura", name: "YRC Bogura", cx: 155, cy: 160 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 285, cy: 355 },
  { id: "barguna", name: "YRC Barguna", cx: 175, cy: 375 },
  { id: "satkhira", name: "YRC Satkhira", cx: 125, cy: 340 },
  { id: "dinajpur", name: "YRC Dinajpur", cx: 100, cy: 85 },
  { id: "badda", name: "Badda Branch", cx: 205, cy: 235 },
  { id: "faridpur", name: "YRC Faridpur", cx: 170, cy: 265 },
  { id: "keraniganj", name: "Keraniganj Branch", cx: 198, cy: 245 },
  { id: "gafargaon", name: "YRC Gafargaon", cx: 210, cy: 175 },
  { id: "pirganj", name: "YRC Pirganj", cx: 130, cy: 115 },
  { id: "manikganj", name: "YRC Manikganj", cx: 175, cy: 235 },
  { id: "jatrabari", name: "Jatrabari Branch", cx: 202, cy: 245 },
  { id: "kalkini", name: "Kalkini Branch", cx: 190, cy: 305 },
  { id: "gaibandha", name: "YRC Gaibandha", cx: 145, cy: 125 },
  { id: "jhalokati", name: "YRC Jhalokati", cx: 185, cy: 345 },
  { id: "pekua", name: "YRC Pekua", cx: 285, cy: 405 },
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 155, cy: 170 },
  { id: "birganj", name: "YRC Birganj", cx: 105, cy: 75 },
  { id: "tangail", name: "YRC Tangail", cx: 175, cy: 195 },
  { id: "shathibari", name: "YRC Shathibari", cx: 130, cy: 105 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 115, cy: 70 },
  { id: "pabna", name: "YRC Pabna", cx: 140, cy: 220 },
  { id: "hathazari", name: "YRC Hathazari", cx: 280, cy: 345 },
  { id: "gournadi", name: "YRC Gournadi", cx: 190, cy: 325 },
  { id: "tejgaon", name: "Tejgaon Branch", cx: 200, cy: 237 },
  { id: "gopalganj", name: "YRC Gopalganj", cx: 165, cy: 310 },
  { id: "uttara", name: "Uttara Branch", cx: 198, cy: 230 },
  { id: "dohar", name: "YRC Dohar", cx: 185, cy: 265 },
  { id: "sadarpur", name: "YRC Sadarpur", cx: 175, cy: 275 },
  { id: "nawabganj", name: "YRC Nawabganj", cx: 190, cy: 255 },
  { id: "panchagarh", name: "YRC Panchagarh", cx: 95, cy: 40 },
  { id: "purandhaka", name: "YRC Puran Dhaka", cx: 198, cy: 243 },
  { id: "jhenaidah", name: "YRC Jhenaidah", cx: 125, cy: 275 },
  { id: "habiganj", name: "YRC Habiganj", cx: 265, cy: 170 },
  { id: "pirojpur", name: "YRC Pirojpur", cx: 170, cy: 350 },
  { id: "bhaluka", name: "YRC Bhaluka", cx: 200, cy: 185 },
  { id: "katiadi", name: "YRC Katiadi", cx: 230, cy: 180 },
  { id: "ashulia", name: "YRC Ashulia", cx: 192, cy: 228 },
  { id: "ghatail", name: "YRC Ghatail", cx: 180, cy: 185 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 145, cy: 335 },
  { id: "meherpur", name: "YRC Meherpur", cx: 115, cy: 250 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 245, cy: 250 },
  { id: "savar", name: "Savar Branch", cx: 188, cy: 232 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 265, cy: 165 },
  { id: "joypurhat", name: "YRC Joypurhat", cx: 120, cy: 155 },
  { id: "boda", name: "YRC Boda", cx: 100, cy: 50 },
  { id: "kurigram", name: "YRC Kurigram", cx: 155, cy: 95 },
  { id: "phulpur", name: "YRC Phulpur", cx: 210, cy: 140 },
  { id: "sapahar", name: "YRC Sapahar", cx: 100, cy: 160 },
  { id: "babuganj", name: "YRC Babuganj", cx: 190, cy: 335 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 175, cy: 175 },
  { id: "manirampur", name: "YRC Manirampur", cx: 130, cy: 305 },
];

// Re-routed to be a perfectly curved loop crossing the whole country inland
const BIKE_PATH =
  "M 200,230 Q 200,150 290,140 Q 300,250 275,350 Q 200,360 190,340 Q 130,340 150,330 Q 80,250 100,190 Q 100,100 125,95 Q 150,150 200,230";

// Moving global CSS outside to ensure it only loads once
const STYLES = `
  .yrc-inlined-svg svg {
    width: 100%;
    height: 100%;
    display: block;
    filter: drop-shadow(0 0 12px rgba(0, 71, 204, 0.6));
  }
  .animate-map {
    fill: #003087 !important;
    stroke: #0047cc !important;
    stroke-width: 1.5px !important;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: yrcDrawMap 3s ease-in-out forwards;
  }
  @keyframes yrcDrawMap {
    0% { stroke-dashoffset: 1; fill-opacity: 0; }
    70% { stroke-dashoffset: 0; fill-opacity: 0; }
    100% { stroke-dashoffset: 0; fill-opacity: 1; }
  }
  @keyframes yrcDotEnter {
    from { opacity: 0; transform: scale(0); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes yrcDotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.8; }
  }
  .yrc-bd-dot {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation:
      yrcDotEnter 400ms ease forwards var(--enter-delay, 2s),
      yrcDotPulse 2s ease-in-out infinite var(--pulse-delay, 2.4s);
  }
  .yrc-bd-bike {
    opacity: 0;
    animation: yrcDotEnter 400ms ease forwards 2.2s;
  }
`;

export function BangladeshMap({
  height = 500,
  label = "OVER 60 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetch("/bangladesh.svg")
      .then((res) => res.text())
      .then((text) => {
        let fixedSVG = text.replace(/viewBox="[^"]+"/, 'viewBox="5 5 390 490" preserveAspectRatio="xMidYMid meet"');
        fixedSVG = fixedSVG.replace('id="path4968"', 'id="path4968" class="animate-map" pathLength="1"');
        setSvgContent(fixedSVG);
      })
      .catch((err) => console.error("Failed to load map SVG:", err));
  }, []);

  // Use refs/callbacks to manage hover without unmounting the SVG
  const handleMouseEnter = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHover(id);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setHover(null);
    }, 250); 
  };

  // 1. By memoizing this block, hovering will NEVER restart the CSS animation loop!
  const DotsOverlay = useMemo(() => {
    return (
      <svg
        viewBox="5 5 390 490"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <defs>
          <path id="yrc-bike-motion-path" d={BIKE_PATH} />
        </defs>

        {/* 2. Bike Lane: Now subtle, transparent white so it's less obtrusive */}
        <path
          d={BIKE_PATH}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.25}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Render all Branches */}
        {ALL_BRANCHES.map((branch, i) => (
          <g
            key={branch.id}
            className="yrc-bd-dot pointer-events-auto"
            style={{
              ["--enter-delay" as string]: `${2 + (i % 8) * 0.15}s`,
              ["--pulse-delay" as string]: `${2.4 + (i % 4) * 0.3}s`,
              cursor: "pointer",
            } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(branch.id)}
            onMouseLeave={handleMouseLeave}
          >
            <circle
              cx={branch.cx}
              cy={branch.cy}
              r={branch.isMain ? 2.5 : 1.5}
              fill={branch.isMain ? "#e60012" : "#00e5ff"}
              stroke="#ffffff"
              strokeWidth={branch.isMain ? 0.8 : 0.4}
              style={{
                filter: branch.isMain
                  ? "drop-shadow(0 0 4px rgba(230,0,18,0.9))"
                  : "drop-shadow(0 0 4px rgba(0,229,255,1))",
              }}
            />
            {/* Invisible hover zone */}
            <circle cx={branch.cx} cy={branch.cy} r={branch.isMain ? 10 : 8} fill="transparent" />
          </g>
        ))}

        {/* 3. Bolder, More Visible Motorcycle */}
        <g className="yrc-bd-bike" style={{ opacity: 1 }}>
          <g transform="translate(-12,-12)">
            <svg x="0" y="0" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%", filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))" }}>
              <circle cx="5.5" cy="16.5" r="3.5" />
              <circle cx="18.5" cy="16.5" r="3.5" />
              <path d="M5.5 16.5h6l3-6h-4" />
              <path d="M14.5 10.5l4 6" />
            </svg>
            <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
              <mpath href="#yrc-bike-motion-path" />
            </animateMotion>
          </g>
        </g>
      </svg>
    );
  }, []); // Empty dependency array prevents re-rendering!

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: "transparent", height }}>
      <style>{STYLES}</style>

      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          {/* THE MAP: Injected directly with animation logic */}
          <div 
            className="absolute inset-0 w-full h-full opacity-90 yrc-inlined-svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />

          {/* Render the frozen overlay so hover doesn't restart animations */}
          {DotsOverlay}

          {/* Dynamic Tooltips */}
          {ALL_BRANCHES.map((m) => {
            const active = hover === m.id;
            return (
              <div
                key={m.id}
                aria-hidden={!active}
                className="absolute"
                style={{
                  left: `${((m.cx - 5) / 390) * 100}%`,
                  top: `${((m.cy - 5) / 490) * 100}%`,
                  transform: `translate(-50%, calc(-100% - 10px)) translateY(${active ? 0 : 5}px)`,
                  opacity: active ? 1 : 0,
                  transition: "opacity 200ms ease, transform 200ms ease",
                  zIndex: active ? 100 : -1, 
                  pointerEvents: active ? "auto" : "none", 
                }}
                onMouseEnter={() => handleMouseEnter(m.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="rounded-lg bg-white font-sans pointer-events-auto"
                  style={{
                    padding: "8px 12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    color: "#003087",
                    whiteSpace: "nowrap",
                    fontSize: 12,
                    lineHeight: 1.35,
                    border: m.isMain ? "2px solid #e60012" : "1.5px solid #00e5ff",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{m.name}</div>
                  {m.coord && <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{m.coord}</div>}
                  
                  <a
                    href="https://www.facebook.com/groups/YamahaRidersClubBD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 font-bold transition-transform hover:scale-105"
                    style={{ color: "#0047cc", fontSize: 11 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-2 2-2h2V2.2C16.6 2.1 15.4 2 14 2c-3 0-5 1.8-5 5.2V10H6v4h3v8h4z"/></svg>
                    Join Facebook Group
                  </a>
                </div>
                <div style={{ height: "16px", width: "100%", background: "transparent" }} />
              </div>
            );
          })}
        </div>

        {label ? (
          <div className="mt-6 flex flex-col items-center">
            <span
              className="font-display tracking-wider"
              style={{ color: "#003087", fontSize: 18, lineHeight: 1 }}
            >
              {label}
            </span>
            <span
              aria-hidden
              className="mt-3 block"
              style={{ width: 60, height: 3, backgroundColor: "#e60012" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
