import React, { useState, useEffect, useRef, useMemo } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// All Branches flawlessly locked and shifted inland to fit the precise map grid
const ALL_BRANCHES: Branch[] = [
  // 8 Main Hubs (Large Red Pins)
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 220, cy: 255, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 310, cy: 365, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 320, cy: 155, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 160, cy: 345, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 115, cy: 210, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 205, cy: 350, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 140, cy: 110, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 220, cy: 170, isMain: true },
  
  // 40+ Sub-Branches (Glowing Cyan Nodes) - Safely shifted out of the ocean!
  { id: "narayanganj", name: "YRC Narayanganj", cx: 225, cy: 260 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 260, cy: 230 },
  { id: "naogaon", name: "YRC Naogaon", cx: 130, cy: 185 },
  { id: "bhairab", name: "YRC Bhairab", cx: 245, cy: 215 },
  { id: "charfesson", name: "YRC Charfesson", cx: 215, cy: 380 },
  { id: "nazipur", name: "YRC Nazipur", cx: 120, cy: 180 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 245, cy: 180 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 110, cy: 95 },
  { id: "dhunat", name: "YRC Dhunat", cx: 170, cy: 180 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 265, cy: 290 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 285, cy: 310 },
  { id: "chandpur", name: "YRC Chandpur", cx: 240, cy: 300 },
  { id: "muradpur", name: "YRC Muradpur", cx: 305, cy: 370 },
  { id: "mirpur", name: "Mirpur Branch", cx: 215, cy: 251 },
  { id: "rangamati", name: "YRC Rangamati", cx: 335, cy: 355 },
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 335, cy: 435 },
  { id: "chakaria", name: "YRC Chakaria", cx: 325, cy: 410 },
  { id: "paltan", name: "Paltan Branch", cx: 220, cy: 257 },
  { id: "madaripur", name: "YRC Madaripur", cx: 200, cy: 310 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 223, cy: 255 },
  { id: "jashore", name: "YRC Jashore", cx: 135, cy: 315 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 290, cy: 305 },
  { id: "singair", name: "YRC Singair", cx: 200, cy: 255 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 333, cy: 425 },
  { id: "laksham", name: "YRC Laksham", cx: 275, cy: 295 },
  { id: "shariatpur", name: "YRC Shariatpur", cx: 215, cy: 305 },
  { id: "patiya", name: "YRC Patiya", cx: 310, cy: 375 },
  { id: "domar", name: "YRC Domar", cx: 120, cy: 80 },
  { id: "natore", name: "YRC Natore", cx: 145, cy: 210 },
  { id: "anowara", name: "YRC Anowara", cx: 310, cy: 380 },
  { id: "debiganj", name: "YRC Debiganj", cx: 115, cy: 65 },
  { id: "saidpur", name: "YRC Saidpur", cx: 120, cy: 95 },
  { id: "kushtia", name: "YRC Kushtia", cx: 135, cy: 260 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 310, cy: 345 },
  { id: "sakhipur", name: "YRC Sakhipur", cx: 205, cy: 205 },
  { id: "bogura", name: "YRC Bogura", cx: 170, cy: 170 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 315, cy: 370 },
  { id: "barguna", name: "YRC Barguna", cx: 185, cy: 380 },
  { id: "satkhira", name: "YRC Satkhira", cx: 140, cy: 350 },
  { id: "dinajpur", name: "YRC Dinajpur", cx: 110, cy: 90 },
  { id: "badda", name: "Badda Branch", cx: 222, cy: 253 },
  { id: "faridpur", name: "YRC Faridpur", cx: 180, cy: 280 },
  { id: "keraniganj", name: "Keraniganj Branch", cx: 218, cy: 261 },
  { id: "gafargaon", name: "YRC Gafargaon", cx: 225, cy: 180 },
  { id: "pirganj", name: "YRC Pirganj", cx: 145, cy: 130 },
  { id: "manikganj", name: "YRC Manikganj", cx: 190, cy: 250 },
  { id: "jatrabari", name: "Jatrabari Branch", cx: 221, cy: 260 },
  { id: "kalkini", name: "Kalkini Branch", cx: 200, cy: 320 },
  { id: "gaibandha", name: "YRC Gaibandha", cx: 160, cy: 140 },
  { id: "jhalokati", name: "YRC Jhalokati", cx: 195, cy: 350 },
  { id: "pekua", name: "YRC Pekua", cx: 330, cy: 420 },
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 170, cy: 180 },
  { id: "birganj", name: "YRC Birganj", cx: 110, cy: 85 },
  { id: "tangail", name: "YRC Tangail", cx: 190, cy: 210 },
  { id: "shathibari", name: "YRC Shathibari", cx: 145, cy: 120 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 125, cy: 85 },
  { id: "pabna", name: "YRC Pabna", cx: 155, cy: 235 },
  { id: "hathazari", name: "YRC Hathazari", cx: 310, cy: 360 },
  { id: "gournadi", name: "YRC Gournadi", cx: 210, cy: 335 },
  { id: "tejgaon", name: "Tejgaon Branch", cx: 219, cy: 254 },
  { id: "gopalganj", name: "YRC Gopalganj", cx: 175, cy: 320 },
  { id: "uttara", name: "Uttara Branch", cx: 219, cy: 247 },
  { id: "dohar", name: "YRC Dohar", cx: 200, cy: 275 },
  { id: "sadarpur", name: "YRC Sadarpur", cx: 190, cy: 290 },
  { id: "nawabganj", name: "YRC Nawabganj", cx: 205, cy: 265 },
  { id: "panchagarh", name: "YRC Panchagarh", cx: 110, cy: 50 },
  { id: "purandhaka", name: "YRC Puran Dhaka", cx: 219, cy: 258 },
  { id: "jhenaidah", name: "YRC Jhenaidah", cx: 135, cy: 290 },
  { id: "habiganj", name: "YRC Habiganj", cx: 285, cy: 175 },
  { id: "pirojpur", name: "YRC Pirojpur", cx: 180, cy: 350 },
  { id: "bhaluka", name: "YRC Bhaluka", cx: 215, cy: 190 },
  { id: "katiadi", name: "YRC Katiadi", cx: 250, cy: 190 },
  { id: "ashulia", name: "YRC Ashulia", cx: 213, cy: 243 },
  { id: "ghatail", name: "YRC Ghatail", cx: 195, cy: 195 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 160, cy: 350 },
  { id: "meherpur", name: "YRC Meherpur", cx: 105, cy: 270 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 275, cy: 260 },
  { id: "savar", name: "Savar Branch", cx: 210, cy: 245 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 280, cy: 180 },
  { id: "joypurhat", name: "YRC Joypurhat", cx: 130, cy: 155 },
  { id: "boda", name: "YRC Boda", cx: 110, cy: 60 },
  { id: "kurigram", name: "YRC Kurigram", cx: 170, cy: 110 },
  { id: "phulpur", name: "YRC Phulpur", cx: 220, cy: 145 },
  { id: "sapahar", name: "YRC Sapahar", cx: 110, cy: 165 },
  { id: "babuganj", name: "YRC Babuganj", cx: 210, cy: 350 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 190, cy: 185 },
  { id: "manirampur", name: "YRC Manirampur", cx: 140, cy: 310 },
];

// Re-aligned Bike Path matching the shifted hubs perfectly
const BIKE_PATH =
  "M220,255 Q285,315 310,365 Q335,255 320,155 Q250,175 220,255";

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
        // Enforce the viewBox, inject the animation class so it draws itself
        let fixedSVG = text.replace(/viewBox="[^"]+"/, 'viewBox="5 5 390 490" preserveAspectRatio="xMidYMid meet"');
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

  // MEMOIZING THE MAP AND STYLES PREVENTS THE RESTART GLITCH ON HOVER
  const MapBackground = useMemo(() => {
    if (!svgContent) return null;
    return (
      <>
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
          .yrc-bd-trail {
            stroke-dasharray: 6 6;
            opacity: 0;
            animation: yrcDotEnter 400ms ease forwards 2s;
          }
          .yrc-bd-bike {
            opacity: 0;
            animation: yrcDotEnter 400ms ease forwards 2.2s;
          }
        `}</style>
        <div 
          className="absolute inset-0 w-full h-full opacity-90 yrc-inlined-svg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </>
    );
  }, [svgContent]);

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: "transparent", height }}>
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          {/* STATIC BACKGROUND (Only renders once, so no more restart glitch) */}
          {MapBackground}

          {/* DYNAMIC OVERLAY: Dots and tooltips */}
          <svg
            viewBox="5 5 390 490"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Bright Neon Cyan Bike Trail */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#00e5ff" // Back to bright cyan
              strokeOpacity={0.8}
              strokeWidth={2.5}
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(0, 229, 255, 0.8))" }}
            />

            {/* Render all Branches */}
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
                  r={branch.isMain ? 2.5 : 1.5}
                  fill={branch.isMain ? "#e60012" : "#00e5ff"}
                  stroke={branch.isMain ? "#ffffff" : "#ffffff"}
                  strokeWidth={branch.isMain ? 0.8 : 0.4}
                  style={{
                    filter: branch.isMain
                      ? "drop-shadow(0 0 4px rgba(230,0,18,0.9))"
                      : "drop-shadow(0 0 4px rgba(0,229,255,1))",
                  }}
                />
                <circle cx={branch.cx} cy={branch.cy} r={branch.isMain ? 10 : 7} fill="transparent" />
              </g>
            ))}

            {/* BIGGER, BOLDER MOTORCYCLE */}
            <g className="yrc-bd-bike" style={{ opacity: 1 }}>
              <g transform="translate(-10,-10)">
                <svg x="0" y="0" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#e60012" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%", filter: "drop-shadow(0 0 4px rgba(230,0,18,0.8))" }}>
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                </svg>
                <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
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
