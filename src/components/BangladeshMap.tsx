import React, { useState, useEffect, useRef } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// All 60 branches meticulously calibrated to the 0 0 400 500 viewBox
const ALL_BRANCHES: Branch[] = [
  // 8 Main Hubs (Large Red Pins)
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 210, cy: 260, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 320, cy: 390, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 340, cy: 150, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 140, cy: 350, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 60, cy: 210, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 200, cy: 380, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 140, cy: 95, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 220, cy: 140, isMain: true },
  
  // Sub-Branches (Glowing Cyan Nodes)
  { id: "narayanganj", name: "YRC Narayanganj", cx: 220, cy: 270 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 270, cy: 240 },
  { id: "naogaon", name: "YRC Naogaon", cx: 110, cy: 170 },
  { id: "bhairab", name: "YRC Bhairab", cx: 250, cy: 210 },
  { id: "charfesson", name: "YRC Charfesson", cx: 225, cy: 410 },
  { id: "nazipur", name: "YRC Nazipur", cx: 100, cy: 150 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 250, cy: 180 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 125, cy: 85 },
  { id: "dhunat", name: "YRC Dhunat", cx: 170, cy: 165 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 275, cy: 305 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 300, cy: 330 },
  { id: "chandpur", name: "YRC Chandpur", cx: 250, cy: 320 },
  { id: "muradpur", name: "YRC Muradpur", cx: 315, cy: 395 },
  { id: "mirpur", name: "Mirpur Branch", cx: 205, cy: 255 },
  { id: "rangamati", name: "YRC Rangamati", cx: 365, cy: 360 }, 
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 357, cy: 460 }, 
  { id: "chakaria", name: "YRC Chakaria", cx: 330, cy: 440 }, 
  { id: "paltan", name: "Paltan Branch", cx: 212, cy: 262 },
  { id: "madaripur", name: "YRC Madaripur", cx: 190, cy: 310 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 215, cy: 258 },
  { id: "jashore", name: "YRC Jashore", cx: 110, cy: 300 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 305, cy: 320 },
  { id: "singair", name: "YRC Singair", cx: 190, cy: 250 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 335, cy: 455 }, 
  { id: "laksham", name: "YRC Laksham", cx: 285, cy: 322 },
  { id: "shariatpur", name: "YRC Shariatpur", cx: 210, cy: 315 },
  { id: "patiya", name: "YRC Patiya", cx: 320, cy: 400 },
  { id: "domar", name: "YRC Domar", cx: 135, cy: 65 },
  { id: "natore", name: "YRC Natore", cx: 110, cy: 200 },
  { id: "anowara", name: "YRC Anowara", cx: 318, cy: 410 },
  { id: "debiganj", name: "YRC Debiganj", cx: 130, cy: 50 },
  { id: "saidpur", name: "YRC Saidpur", cx: 120, cy: 75 },
  { id: "kushtia", name: "YRC Kushtia", cx: 100, cy: 250 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 332, cy: 375 },
  { id: "sakhipur", name: "YRC Sakhipur", cx: 215, cy: 200 },
  { id: "bogura", name: "YRC Bogura", cx: 160, cy: 160 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 335, cy: 385 },
  { id: "barguna", name: "YRC Barguna", cx: 170, cy: 410 },
  { id: "satkhira", name: "YRC Satkhira", cx: 100, cy: 360 },
  { id: "dinajpur", name: "YRC Dinajpur", cx: 100, cy: 80 },
  { id: "badda", name: "Badda Branch", cx: 215, cy: 250 },
  { id: "faridpur", name: "YRC Faridpur", cx: 170, cy: 280 },
  { id: "keraniganj", name: "Keraniganj Branch", cx: 205, cy: 265 },
  { id: "gafargaon", name: "YRC Gafargaon", cx: 230, cy: 165 },
  { id: "pirganj", name: "YRC Pirganj", cx: 145, cy: 125 },
  { id: "manikganj", name: "YRC Manikganj", cx: 180, cy: 250 },
  { id: "jatrabari", name: "Jatrabari Branch", cx: 215, cy: 265 },
  { id: "kalkini", name: "Kalkini Branch", cx: 195, cy: 320 },
  { id: "gaibandha", name: "YRC Gaibandha", cx: 160, cy: 120 },
  { id: "jhalokati", name: "YRC Jhalokati", cx: 180, cy: 380 },
  { id: "pekua", name: "YRC Pekua", cx: 325, cy: 450 }, 
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 165, cy: 170 },
  { id: "birganj", name: "YRC Birganj", cx: 110, cy: 75 },
  { id: "tangail", name: "YRC Tangail", cx: 180, cy: 200 },
  { id: "shathibari", name: "YRC Shathibari", cx: 150, cy: 110 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 130, cy: 70 },
  { id: "pabna", name: "YRC Pabna", cx: 140, cy: 230 },
  { id: "hathazari", name: "YRC Hathazari", cx: 322, cy: 375 },
  { id: "gournadi", name: "YRC Gournadi", cx: 195, cy: 360 },
  { id: "tejgaon", name: "Tejgaon Branch", cx: 210, cy: 255 },
  { id: "gopalganj", name: "YRC Gopalganj", cx: 165, cy: 320 },
  { id: "uttara", name: "Uttara Branch", cx: 210, cy: 245 },
  { id: "dohar", name: "YRC Dohar", cx: 190, cy: 280 },
  { id: "sadarpur", name: "YRC Sadarpur", cx: 185, cy: 295 },
  { id: "nawabganj", name: "YRC Nawabganj", cx: 200, cy: 275 },
  { id: "panchagarh", name: "YRC Panchagarh", cx: 130, cy: 30 },
  { id: "purandhaka", name: "YRC Puran Dhaka", cx: 212, cy: 265 },
  { id: "jhenaidah", name: "YRC Jhenaidah", cx: 110, cy: 275 },
  { id: "habiganj", name: "YRC Habiganj", cx: 300, cy: 190 },
  { id: "pirojpur", name: "YRC Pirojpur", cx: 170, cy: 360 },
  { id: "bhaluka", name: "YRC Bhaluka", cx: 210, cy: 180 },
  { id: "katiadi", name: "YRC Katiadi", cx: 240, cy: 185 },
  { id: "ashulia", name: "YRC Ashulia", cx: 205, cy: 235 },
  { id: "ghatail", name: "YRC Ghatail", cx: 195, cy: 190 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 145, cy: 345 },
  { id: "meherpur", name: "YRC Meherpur", cx: 60, cy: 250 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 265, cy: 260 },
  { id: "savar", name: "Savar Branch", cx: 200, cy: 245 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 290, cy: 180 },
  { id: "joypurhat", name: "YRC Joypurhat", cx: 125, cy: 160 },
  { id: "boda", name: "YRC Boda", cx: 125, cy: 40 },
  { id: "kurigram", name: "YRC Kurigram", cx: 180, cy: 95 },
  { id: "phulpur", name: "YRC Phulpur", cx: 220, cy: 155 },
  { id: "sapahar", name: "YRC Sapahar", cx: 100, cy: 160 },
  { id: "babuganj", name: "YRC Babuganj", cx: 205, cy: 370 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 185, cy: 180 },
  { id: "manirampur", name: "YRC Manirampur", cx: 125, cy: 315 },
];

// Beautifully curved, logical nationwide bike loop
const BIKE_PATH =
  "M 210,260 Q 250,150 340,150 Q 300,300 310,390 L 340,470 Q 200,420 140,350 Q 60,280 60,210 Q 100,100 140,95 Q 180,180 210,260";

export function BangladeshMap({
  height = 500,
  label = "47+ BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [mapPaths, setMapPaths] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Extract the map path natively from your local SVG so it never crashes React
  useEffect(() => {
    fetch("/bangladesh.svg")
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const paths = Array.from(doc.querySelectorAll("path"))
          .map((p) => p.getAttribute("d"))
          .filter(Boolean) as string[];
        setMapPaths(paths);
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
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "transparent", height: height }}
    >
      <style>{`
        /* Map drawing animation running natively in CSS */
        .yrc-animate-map {
          fill: #003087;
          stroke: #0047cc;
          stroke-width: 1.5px;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: yrcDrawMap 3s ease-in-out forwards;
          filter: drop-shadow(0 0 12px rgba(0, 71, 204, 0.6));
        }
        @keyframes yrcDrawMap {
          0% { stroke-dashoffset: 1; fill-opacity: 0; }
          70% { stroke-dashoffset: 0; fill-opacity: 0; }
          100% { stroke-dashoffset: 0; fill-opacity: 1; }
        }

        /* Pulsing dot animations */
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

      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Safely mapped, native React SVG path. Does not restart on hover! */}
            {mapPaths.map((d, idx) => (
              <path
                key={idx}
                d={d}
                className="yrc-animate-map"
                pathLength="1"
              />
            ))}

            {/* Glowing, curved, semi-transparent white Nationwide Bike Lane */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#00e5ff"
              strokeOpacity={0.75}
              strokeWidth={2}
              strokeDasharray="6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(0, 229, 255, 0.8))" }}
            />

            {/* Render all Branches natively onto the exact same grid */}
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

            {/* Big, bold motorcycle icon tracing the nationwide lane */}
            <g className="yrc-bd-bike" style={{ opacity: 1 }}>
              <g transform="translate(-10,-10)">
                <svg x="0" y="0" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#e60012" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%", filter: "drop-shadow(0 0 6px rgba(255,255,255,0.7))" }}>
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
