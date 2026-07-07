import React, { useState, useEffect, useRef, useMemo } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// Carefully merged list incorporating your EXACT manual coordinates. 
// Cumilla is now a Main Red Hub!
const ALL_BRANCHES: Branch[] = [
  // --- 9 Main Hubs (Large Red Pins) ---
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 195, cy: 265, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 255, cy: 355, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 285, cy: 158, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 148, cy: 340, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 105, cy: 225, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 195, cy: 355, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 135, cy: 105, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 205, cy: 185, isMain: true },
  { id: "comilla", name: "🏍 COMILLA WING", coord: "Comilla Lead", cx: 248, cy: 278, isMain: true }, // Upgraded to Main
  
  // --- Your 2 precise Decor Sub-Branches ---
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 262, cy: 408 }, 
  { id: "jashore", name: "YRC Jashore", cx: 130, cy: 305 },

  // --- 40+ Sub-Branches (Glowing Cyan Nodes) calibrated around your new points ---
  { id: "narayanganj", name: "YRC Narayanganj", cx: 200, cy: 270 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 245, cy: 250 },
  { id: "naogaon", name: "YRC Naogaon", cx: 115, cy: 205 },
  { id: "bhairab", name: "YRC Bhairab", cx: 225, cy: 225 },
  { id: "charfesson", name: "YRC Charfesson", cx: 200, cy: 385 },
  { id: "nazipur", name: "YRC Nazipur", cx: 105, cy: 195 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 235, cy: 185 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 115, cy: 95 },
  { id: "dhunat", name: "YRC Dhunat", cx: 155, cy: 175 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 250, cy: 285 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 265, cy: 305 },
  { id: "chandpur", name: "YRC Chandpur", cx: 225, cy: 300 },
  { id: "muradpur", name: "YRC Muradpur", cx: 255, cy: 360 },
  { id: "mirpur", name: "Mirpur Branch", cx: 190, cy: 260 },
  { id: "rangamati", name: "YRC Rangamati", cx: 275, cy: 340 },
  { id: "chakaria", name: "YRC Chakaria", cx: 258, cy: 390 },
  { id: "paltan", name: "Paltan Branch", cx: 197, cy: 265 },
  { id: "madaripur", name: "YRC Madaripur", cx: 185, cy: 310 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 200, cy: 262 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 265, cy: 300 },
  { id: "singair", name: "YRC Singair", cx: 180, cy: 260 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 260, cy: 400 },
  { id: "laksham", name: "YRC Laksham", cx: 252, cy: 290 },
  { id: "shariatpur", name: "YRC Shariatpur", cx: 195, cy: 305 },
  { id: "patiya", name: "YRC Patiya", cx: 260, cy: 365 },
  { id: "domar", name: "YRC Domar", cx: 120, cy: 75 },
  { id: "natore", name: "YRC Natore", cx: 125, cy: 215 },
  { id: "anowara", name: "YRC Anowara", cx: 258, cy: 370 },
  { id: "debiganj", name: "YRC Debiganj", cx: 125, cy: 65 },
  { id: "saidpur", name: "YRC Saidpur", cx: 125, cy: 90 },
  { id: "kushtia", name: "YRC Kushtia", cx: 120, cy: 260 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 255, cy: 335 },
  { id: "sakhipur", name: "YRC Sakhipur", cx: 195, cy: 210 },
  { id: "bogura", name: "YRC Bogura", cx: 155, cy: 185 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 260, cy: 355 },
  { id: "barguna", name: "YRC Barguna", cx: 180, cy: 380 },
  { id: "satkhira", name: "YRC Satkhira", cx: 135, cy: 360 },
  { id: "dinajpur", name: "YRC Dinajpur", cx: 110, cy: 100 },
  { id: "badda", name: "Badda Branch", cx: 200, cy: 258 },
  { id: "faridpur", name: "YRC Faridpur", cx: 165, cy: 275 },
  { id: "keraniganj", name: "Keraniganj Branch", cx: 195, cy: 270 },
  { id: "gafargaon", name: "YRC Gafargaon", cx: 215, cy: 175 },
  { id: "pirganj", name: "YRC Pirganj", cx: 130, cy: 130 },
  { id: "manikganj", name: "YRC Manikganj", cx: 175, cy: 255 },
  { id: "jatrabari", name: "Jatrabari Branch", cx: 200, cy: 270 },
  { id: "kalkini", name: "Kalkini Branch", cx: 185, cy: 320 },
  { id: "gaibandha", name: "YRC Gaibandha", cx: 150, cy: 135 },
  { id: "jhalokati", name: "YRC Jhalokati", cx: 185, cy: 360 },
  { id: "pekua", name: "YRC Pekua", cx: 258, cy: 395 },
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 160, cy: 175 },
  { id: "birganj", name: "YRC Birganj", cx: 115, cy: 85 },
  { id: "tangail", name: "YRC Tangail", cx: 180, cy: 205 },
  { id: "shathibari", name: "YRC Shathibari", cx: 140, cy: 120 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 125, cy: 80 },
  { id: "pabna", name: "YRC Pabna", cx: 145, cy: 235 },
  { id: "hathazari", name: "YRC Hathazari", cx: 255, cy: 345 },
  { id: "gournadi", name: "YRC Gournadi", cx: 190, cy: 335 },
  { id: "tejgaon", name: "Tejgaon Branch", cx: 195, cy: 260 },
  { id: "gopalganj", name: "YRC Gopalganj", cx: 160, cy: 320 },
  { id: "uttara", name: "Uttara Branch", cx: 195, cy: 250 },
  { id: "dohar", name: "YRC Dohar", cx: 185, cy: 280 },
  { id: "sadarpur", name: "YRC Sadarpur", cx: 175, cy: 285 },
  { id: "nawabganj", name: "YRC Nawabganj", cx: 190, cy: 270 },
  { id: "panchagarh", name: "YRC Panchagarh", cx: 115, cy: 45 },
  { id: "purandhaka", name: "YRC Puran Dhaka", cx: 195, cy: 268 },
  { id: "jhenaidah", name: "YRC Jhenaidah", cx: 125, cy: 280 },
  { id: "habiganj", name: "YRC Habiganj", cx: 270, cy: 190 },
  { id: "pirojpur", name: "YRC Pirojpur", cx: 170, cy: 360 },
  { id: "bhaluka", name: "YRC Bhaluka", cx: 205, cy: 175 },
  { id: "katiadi", name: "YRC Katiadi", cx: 235, cy: 180 },
  { id: "ashulia", name: "YRC Ashulia", cx: 190, cy: 245 },
  { id: "ghatail", name: "YRC Ghatail", cx: 185, cy: 195 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 145, cy: 335 },
  { id: "meherpur", name: "YRC Meherpur", cx: 100, cy: 255 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 245, cy: 265 },
  { id: "savar", name: "Savar Branch", cx: 185, cy: 250 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 265, cy: 185 },
  { id: "joypurhat", name: "YRC Joypurhat", cx: 135, cy: 170 },
  { id: "boda", name: "YRC Boda", cx: 120, cy: 55 },
  { id: "kurigram", name: "YRC Kurigram", cx: 160, cy: 110 },
  { id: "phulpur", name: "YRC Phulpur", cx: 215, cy: 155 },
  { id: "sapahar", name: "YRC Sapahar", cx: 110, cy: 180 },
  { id: "babuganj", name: "YRC Babuganj", cx: 195, cy: 350 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 185, cy: 185 },
  { id: "manirampur", name: "YRC Manirampur", cx: 135, cy: 315 },
];

// Custom curved route intersecting your EXACT requested cities using your precise coordinates:
// Chittagong(255,355) -> Cumilla(248,278) -> Dhaka(195,265) -> Sylhet(285,158) -> Mymensingh(205,185) -> Rajshahi(105,225) -> Khulna(148,340) -> Chittagong(255,355)
const BIKE_PATH =
  "M 255,355 Q 260,315 248,278 Q 220,280 195,265 Q 240,200 285,158 Q 245,160 205,185 Q 155,190 105,225 Q 110,280 148,340 Q 200,360 255,355";

// Extracted Styles to prevent any re-renders
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
  label = "47 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/bangladesh.svg")
      .then((res) => res.text())
      .then((text) => {
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
      <GlobalStyles />

      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          <MapBackground content={svgContent} />

          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Decreased visibility of the bike lane - subtle white stroke */}
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

            {/* Decorative Cyan Nodes */}
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
                  r={branch.isMain ? 2.5 : 1.2}
                  fill={branch.isMain ? "#e60012" : "#00e5ff"}
                  stroke="#ffffff"
                  strokeWidth={branch.isMain ? 0.8 : 0.3}
                  style={{
                    filter: branch.isMain
                      ? "drop-shadow(0 0 4px rgba(230,0,18,0.9))"
                      : "drop-shadow(0 0 3px rgba(0,229,255,1))",
                  }}
                />
                <circle cx={branch.cx} cy={branch.cy} r={branch.isMain ? 10 : 7} fill="transparent" />
              </g>
            ))}

            {/* BIGGER, highly visible white and red motorcycle */}
            <g style={{ opacity: 1 }}>
              <g transform="translate(-10,-10)">
                <svg x="0" y="0" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#e60012" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%", filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))" }}>
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                </svg>
                {/* 18 second continuous loop tracking the precise order you requested */}
                <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#yrc-bike-motion-path" />
                </animateMotion>
              </g>
            </g>
          </svg>

          {/* Dynamic Tooltips safely layered on top */}
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
