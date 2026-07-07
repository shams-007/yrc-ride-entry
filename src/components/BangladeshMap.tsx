import React, { useState, useEffect } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// All 60 branches meticulously recalibrated to sit perfectly inland
const ALL_BRANCHES: Branch[] = [
  // 8 Main Hubs (Large Red Pins)
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 215, cy: 220, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 300, cy: 375, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 325, cy: 155, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 150, cy: 315, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 95, cy: 200, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 205, cy: 345, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 140, cy: 100, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 210, cy: 150, isMain: true },
  
  // Sub-Branches (Glowing Cyan Nodes)
  { id: "narayanganj", name: "YRC Narayanganj", cx: 220, cy: 230 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 260, cy: 205 },
  { id: "naogaon", name: "YRC Naogaon", cx: 120, cy: 185 },
  { id: "bhairab", name: "YRC Bhairab", cx: 240, cy: 195 },
  { id: "charfesson", name: "YRC Charfesson", cx: 215, cy: 385 },
  { id: "nazipur", name: "YRC Nazipur", cx: 110, cy: 175 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 240, cy: 170 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 110, cy: 85 },
  { id: "dhunat", name: "YRC Dhunat", cx: 165, cy: 170 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 280, cy: 255 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 305, cy: 290 },
  { id: "chandpur", name: "YRC Chandpur", cx: 235, cy: 280 },
  { id: "muradpur", name: "YRC Muradpur", cx: 295, cy: 380 },
  { id: "mirpur", name: "Mirpur Branch", cx: 210, cy: 215 },
  { id: "rangamati", name: "YRC Rangamati", cx: 330, cy: 345 }, // Safely inland
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 320, cy: 445 }, // Adjusted securely onto the peninsula
  { id: "chakaria", name: "YRC Chakaria", cx: 315, cy: 415 }, // Shifted inland
  { id: "paltan", name: "Paltan Branch", cx: 215, cy: 222 },
  { id: "madaripur", name: "YRC Madaripur", cx: 195, cy: 290 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 218, cy: 220 },
  { id: "jashore", name: "YRC Jashore", cx: 130, cy: 295 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 305, cy: 280 },
  { id: "singair", name: "YRC Singair", cx: 200, cy: 220 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 318, cy: 430 }, // Inland
  { id: "laksham", name: "YRC Laksham", cx: 285, cy: 265 },
  { id: "shariatpur", name: "YRC Shariatpur", cx: 205, cy: 290 },
  { id: "patiya", name: "YRC Patiya", cx: 305, cy: 385 },
  { id: "domar", name: "YRC Domar", cx: 120, cy: 65 },
  { id: "natore", name: "YRC Natore", cx: 130, cy: 205 },
  { id: "anowara", name: "YRC Anowara", cx: 300, cy: 385 },
  { id: "debiganj", name: "YRC Debiganj", cx: 115, cy: 55 },
  { id: "saidpur", name: "YRC Saidpur", cx: 130, cy: 90 },
  { id: "kushtia", name: "YRC Kushtia", cx: 115, cy: 245 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 310, cy: 355 },
  { id: "sakhipur", name: "YRC Sakhipur", cx: 200, cy: 185 },
  { id: "bogura", name: "YRC Bogura", cx: 165, cy: 160 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 305, cy: 375 },
  { id: "barguna", name: "YRC Barguna", cx: 185, cy: 370 },
  { id: "satkhira", name: "YRC Satkhira", cx: 135, cy: 335 },
  { id: "dinajpur", name: "YRC Dinajpur", cx: 95, cy: 90 },
  { id: "badda", name: "Badda Branch", cx: 218, cy: 212 },
  { id: "faridpur", name: "YRC Faridpur", cx: 180, cy: 255 },
  { id: "keraniganj", name: "Keraniganj Branch", cx: 215, cy: 226 },
  { id: "gafargaon", name: "YRC Gafargaon", cx: 220, cy: 160 },
  { id: "pirganj", name: "YRC Pirganj", cx: 135, cy: 120 },
  { id: "manikganj", name: "YRC Manikganj", cx: 190, cy: 225 },
  { id: "jatrabari", name: "Jatrabari Branch", cx: 217, cy: 225 },
  { id: "kalkini", name: "Kalkini Branch", cx: 198, cy: 295 },
  { id: "gaibandha", name: "YRC Gaibandha", cx: 155, cy: 120 },
  { id: "jhalokati", name: "YRC Jhalokati", cx: 195, cy: 340 },
  { id: "pekua", name: "YRC Pekua", cx: 310, cy: 410 }, // Inland
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 165, cy: 165 },
  { id: "birganj", name: "YRC Birganj", cx: 105, cy: 80 },
  { id: "tangail", name: "YRC Tangail", cx: 190, cy: 185 },
  { id: "shathibari", name: "YRC Shathibari", cx: 140, cy: 110 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 125, cy: 75 },
  { id: "pabna", name: "YRC Pabna", cx: 140, cy: 220 },
  { id: "hathazari", name: "YRC Hathazari", cx: 300, cy: 370 },
  { id: "gournadi", name: "YRC Gournadi", cx: 205, cy: 325 },
  { id: "tejgaon", name: "Tejgaon Branch", cx: 214, cy: 218 },
  { id: "gopalganj", name: "YRC Gopalganj", cx: 165, cy: 305 },
  { id: "uttara", name: "Uttara Branch", cx: 215, cy: 205 },
  { id: "dohar", name: "YRC Dohar", cx: 195, cy: 245 },
  { id: "sadarpur", name: "YRC Sadarpur", cx: 185, cy: 265 },
  { id: "nawabganj", name: "YRC Nawabganj", cx: 200, cy: 240 },
  { id: "panchagarh", name: "YRC Panchagarh", cx: 115, cy: 45 },
  { id: "purandhaka", name: "YRC Puran Dhaka", cx: 215, cy: 224 },
  { id: "jhenaidah", name: "YRC Jhenaidah", cx: 125, cy: 265 },
  { id: "habiganj", name: "YRC Habiganj", cx: 295, cy: 185 },
  { id: "pirojpur", name: "YRC Pirojpur", cx: 175, cy: 340 },
  { id: "bhaluka", name: "YRC Bhaluka", cx: 205, cy: 170 },
  { id: "katiadi", name: "YRC Katiadi", cx: 235, cy: 175 },
  { id: "ashulia", name: "YRC Ashulia", cx: 205, cy: 210 },
  { id: "ghatail", name: "YRC Ghatail", cx: 190, cy: 175 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 150, cy: 320 },
  { id: "meherpur", name: "YRC Meherpur", cx: 80, cy: 235 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 275, cy: 235 },
  { id: "savar", name: "Savar Branch", cx: 205, cy: 215 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 285, cy: 175 },
  { id: "joypurhat", name: "YRC Joypurhat", cx: 125, cy: 160 },
  { id: "boda", name: "YRC Boda", cx: 115, cy: 50 },
  { id: "kurigram", name: "YRC Kurigram", cx: 165, cy: 100 },
  { id: "phulpur", name: "YRC Phulpur", cx: 215, cy: 145 },
  { id: "sapahar", name: "YRC Sapahar", cx: 105, cy: 165 },
  { id: "babuganj", name: "YRC Babuganj", cx: 205, cy: 335 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 185, cy: 170 },
  { id: "manirampur", name: "YRC Manirampur", cx: 135, cy: 305 },
];

// A deeply curved nationwide route traveling to major regions
const BIKE_PATH =
  "M215,220 Q140,100 95,200 Q150,315 205,345 Q300,375 320,445 Q330,250 325,155 Q210,150 215,220";

// --- GLITCH FIX PART 1: STYLES ARE NOW OUTSIDE THE COMPONENT ---
// This ensures that React NEVER re-evaluates the keyframes on hover
const GlobalStyles = React.memo(() => (
  <style>{`
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
      animation: yrcDrawMap 2.5s ease-in-out forwards;
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
  `}</style>
));

// --- GLITCH FIX PART 2: THE MAP BACKGROUND IS NOW ITS OWN COMPONENT ---
// This guarantees the map HTML string is only injected once.
const MapBackground = React.memo(({ content }: { content: string }) => {
  if (!content) return null;
  return (
    <div
      className="absolute inset-0 w-full h-full opacity-90 yrc-inlined-svg"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
});

export function BangladeshMap({
  height = 500,
  label = "OVER 60 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const timerRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetch("/bangladesh.svg")
      .then((res) => res.text())
      .then((text) => {
        // Enforce the viewBox, inject the animation class so it draws itself
        let fixedSVG = text.replace(/viewBox="[^"]+"/, 'viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet"');
        fixedSVG = fixedSVG.replace('id="path4968"', 'id="path4968" class="animate-map" pathLength="1"');
        setSvgContent(fixedSVG);
      })
      .catch((err) => console.error("Failed to load map SVG:", err));
  }, []);

  const handleMouseEnter = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHover(id);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setHover(null);
    }, 250); 
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: "transparent", height }}>
      {/* Renders global animation definitions once */}
      <GlobalStyles />

      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          {/* Renders the map drawing exactly once so it never restarts on hover */}
          <MapBackground content={svgContent} />

          {/* OVERLAY SVG - Perfectly matches 0 0 400 500 */}
          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* A beautiful curved, highly visible cyan bike lane */}
            <path
              d={BIKE_PATH}
              fill="none"
              stroke="#00e5ff" 
              strokeOpacity={0.7}
              strokeWidth={2}
              strokeDasharray="6 6"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(0, 229, 255, 0.8))" }}
            />

            {/* Render all 60 Branches securely inside the borders */}
            {ALL_BRANCHES.map((branch, i) => (
              <g
                key={branch.id}
                className="yrc-bd-dot pointer-events-auto"
                style={
                  {
                    ["--enter-delay" as string]: `${2 + (i % 8) * 0.15}s`,
                    ["--pulse-delay" as string]: `${2.4 + (i % 4) * 0.3}s`,
                    cursor: "pointer",
                  } as React.CSSProperties
                }
                onMouseEnter={() => handleMouseEnter(branch.id)}
                onMouseLeave={handleMouseLeave}
              >
                <circle
                  cx={branch.cx}
                  cy={branch.cy}
                  r={branch.isMain ? 3 : 1.5}
                  fill={branch.isMain ? "#e60012" : "#00e5ff"}
                  stroke="#ffffff"
                  strokeWidth={branch.isMain ? 1 : 0.5}
                  style={{
                    filter: branch.isMain
                      ? "drop-shadow(0 0 4px rgba(230,0,18,0.9))"
                      : "drop-shadow(0 0 4px rgba(0,229,255,1))",
                  }}
                />
                <circle cx={branch.cx} cy={branch.cy} r={branch.isMain ? 12 : 8} fill="transparent" />
              </g>
            ))}

            {/* BIGGER, highly visible white and red motorcycle */}
            <g style={{ opacity: 1 }}>
              <g transform="translate(-10,-10)">
                <svg x="0" y="0" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#e60012" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ background: "white", borderRadius: "50%", filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}>
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                </svg>
                {/* 15 second continuous loop across the curved path */}
                <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#yrc-bike-motion-path" />
                </animateMotion>
              </g>
            </g>
          </svg>

          {/* Dynamic Tooltips */}
          {ALL_BRANCHES.map((m) => {
            const active = hover === m.id;
            return (
              <div
                key={m.id}
                aria-hidden={!active}
                className="absolute"
                style={{
                  left: `${(m.cx / 400) * 100}%`,
                  top: `${(m.cy / 500) * 100}%`,
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
