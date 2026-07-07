import { useState, useRef } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// All 50+ Branches carefully adjusted to be securely inland
const ALL_BRANCHES: Branch[] = [
  // 8 Main Hubs (Large Red Pins)
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 195, cy: 240, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 270, cy: 365, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 290, cy: 145, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 135, cy: 340, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 90, cy: 195, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 190, cy: 345, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 115, cy: 95, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 195, cy: 145, isMain: true },
  
  // 40+ Sub-Branches (Glowing Cyan Nodes)
  { id: "narayanganj", name: "YRC Narayanganj", cx: 202, cy: 248 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 240, cy: 220 },
  { id: "naogaon", name: "YRC Naogaon", cx: 105, cy: 170 },
  { id: "bhairab", name: "YRC Bhairab", cx: 225, cy: 205 },
  { id: "charfesson", name: "YRC Charfesson", cx: 195, cy: 370 }, // Pulled up from 385
  { id: "nazipur", name: "YRC Nazipur", cx: 95, cy: 165 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 225, cy: 165 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 85, cy: 80 },
  { id: "dhunat", name: "YRC Dhunat", cx: 145, cy: 165 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 245, cy: 280 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 260, cy: 300 }, // Pulled left
  { id: "chandpur", name: "YRC Chandpur", cx: 225, cy: 285 },
  { id: "muradpur", name: "YRC Muradpur", cx: 268, cy: 360 }, // Pulled left
  { id: "mirpur", name: "Mirpur Branch", cx: 190, cy: 236 },
  { id: "rangamati", name: "YRC Rangamati", cx: 285, cy: 345 }, // Pulled left
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 280, cy: 420 }, // Pulled left
  { id: "chakaria", name: "YRC Chakaria", cx: 275, cy: 395 }, // Pulled left
  { id: "paltan", name: "Paltan Branch", cx: 195, cy: 242 },
  { id: "madaripur", name: "YRC Madaripur", cx: 175, cy: 295 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 198, cy: 240 },
  { id: "jashore", name: "YRC Jashore", cx: 110, cy: 300 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 265, cy: 305 }, // Pulled left
  { id: "singair", name: "YRC Singair", cx: 175, cy: 240 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 280, cy: 410 }, // Pulled left
  { id: "laksham", name: "YRC Laksham", cx: 250, cy: 280 }, // Pulled left
  { id: "shariatpur", name: "YRC Shariatpur", cx: 195, cy: 295 },
  { id: "patiya", name: "YRC Patiya", cx: 275, cy: 375 }, // Pulled left
  { id: "domar", name: "YRC Domar", cx: 95, cy: 65 },
  { id: "natore", name: "YRC Natore", cx: 120, cy: 195 },
  { id: "anowara", name: "YRC Anowara", cx: 270, cy: 375 }, // Pulled left
  { id: "debiganj", name: "YRC Debiganj", cx: 90, cy: 50 },
  { id: "saidpur", name: "YRC Saidpur", cx: 95, cy: 80 },
  { id: "kushtia", name: "YRC Kushtia", cx: 110, cy: 245 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 275, cy: 345 }, // Pulled left
  { id: "sakhipur", name: "YRC Sakhipur", cx: 180, cy: 190 },
  { id: "bogura", name: "YRC Bogura", cx: 145, cy: 155 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 275, cy: 365 }, // Pulled left
  { id: "barguna", name: "YRC Barguna", cx: 165, cy: 365 }, // Pulled up
  { id: "satkhira", name: "YRC Satkhira", cx: 105, cy: 335 }, // Pulled up/right
  { id: "dinajpur", name: "YRC Dinajpur", cx: 85, cy: 75 },
  { id: "badda", name: "Badda Branch", cx: 197, cy: 238 },
  { id: "faridpur", name: "YRC Faridpur", cx: 155, cy: 265 },
  { id: "keraniganj", name: "Keraniganj Branch", cx: 193, cy: 246 },
  { id: "gafargaon", name: "YRC Gafargaon", cx: 200, cy: 165 },
  { id: "pirganj", name: "YRC Pirganj", cx: 120, cy: 115 },
  { id: "manikganj", name: "YRC Manikganj", cx: 165, cy: 235 },
  { id: "jatrabari", name: "Jatrabari Branch", cx: 196, cy: 245 },
  { id: "kalkini", name: "Kalkini Branch", cx: 175, cy: 305 },
  { id: "gaibandha", name: "YRC Gaibandha", cx: 135, cy: 125 },
  { id: "jhalokati", name: "YRC Jhalokati", cx: 170, cy: 340 }, // Pulled up
  { id: "pekua", name: "YRC Pekua", cx: 275, cy: 405 }, // Pulled left
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 145, cy: 165 },
  { id: "birganj", name: "YRC Birganj", cx: 85, cy: 70 },
  { id: "tangail", name: "YRC Tangail", cx: 165, cy: 195 },
  { id: "shathibari", name: "YRC Shathibari", cx: 120, cy: 105 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 100, cy: 70 },
  { id: "pabna", name: "YRC Pabna", cx: 130, cy: 220 },
  { id: "hathazari", name: "YRC Hathazari", cx: 272, cy: 355 }, // Pulled left
  { id: "gournadi", name: "YRC Gournadi", cx: 185, cy: 320 },
  { id: "tejgaon", name: "Tejgaon Branch", cx: 194, cy: 239 },
  { id: "gopalganj", name: "YRC Gopalganj", cx: 150, cy: 305 },
  { id: "uttara", name: "Uttara Branch", cx: 194, cy: 232 },
  { id: "dohar", name: "YRC Dohar", cx: 175, cy: 260 },
  { id: "sadarpur", name: "YRC Sadarpur", cx: 165, cy: 275 },
  { id: "nawabganj", name: "YRC Nawabganj", cx: 180, cy: 250 },
  { id: "panchagarh", name: "YRC Panchagarh", cx: 85, cy: 35 },
  { id: "purandhaka", name: "YRC Puran Dhaka", cx: 194, cy: 243 },
  { id: "jhenaidah", name: "YRC Jhenaidah", cx: 110, cy: 275 },
  { id: "habiganj", name: "YRC Habiganj", cx: 260, cy: 160 }, // Pulled left
  { id: "pirojpur", name: "YRC Pirojpur", cx: 155, cy: 345 }, // Pulled up
  { id: "bhaluka", name: "YRC Bhaluka", cx: 190, cy: 175 },
  { id: "katiadi", name: "YRC Katiadi", cx: 225, cy: 175 },
  { id: "ashulia", name: "YRC Ashulia", cx: 188, cy: 228 },
  { id: "ghatail", name: "YRC Ghatail", cx: 170, cy: 180 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 135, cy: 335 },
  { id: "meherpur", name: "YRC Meherpur", cx: 80, cy: 255 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 250, cy: 245 },
  { id: "savar", name: "Savar Branch", cx: 185, cy: 230 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 255, cy: 165 }, // Pulled left
  { id: "joypurhat", name: "YRC Joypurhat", cx: 105, cy: 140 },
  { id: "boda", name: "YRC Boda", cx: 85, cy: 45 },
  { id: "kurigram", name: "YRC Kurigram", cx: 145, cy: 95 },
  { id: "phulpur", name: "YRC Phulpur", cx: 195, cy: 130 },
  { id: "sapahar", name: "YRC Sapahar", cx: 85, cy: 150 },
  { id: "babuganj", name: "YRC Babuganj", cx: 185, cy: 335 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 165, cy: 170 },
  { id: "manirampur", name: "YRC Manirampur", cx: 115, cy: 305 },
];

// Completely upgraded nationwide trail covering almost all main branches
const BIKE_PATH =
  "M 195,240 " + // Dhaka
  "L 115,95 " +  // Rangpur
  "L 90,195 " +  // Rajshahi
  "L 135,340 " + // Khulna
  "L 190,345 " + // Barishal
  "L 270,365 " + // Chittagong
  "L 280,420 " + // Cox's Bazar
  "L 250,270 " + // Comilla
  "L 290,145 " + // Sylhet
  "L 195,145 " + // Mymensingh
  "Z";           // Back to Dhaka

export function BangladeshMap({
  height = 500,
  label = "OVER 60 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

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
      style={{
        backgroundColor: "transparent",
        height: height,
      }}
    >
      <style>{`
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
          
          <img 
            src="/bangladesh.svg" 
            alt="Map of Bangladesh" 
            className="absolute inset-0 w-full h-full object-contain opacity-90 drop-shadow-xl"
          />

          <svg
            viewBox="5 5 390 490"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Nationwide Connecting Trail - Upgraded to Bright Neon Cyan and thicker */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#00e5ff" // Bright Neon Cyan for better visibility
              strokeOpacity={0.8}
              strokeWidth={2.5} // Increased thickness
              strokeLinejoin="round" // Smooth out the corners of the path
              style={{ filter: "drop-shadow(0 0 4px rgba(0, 229, 255, 0.8))" }}
            />

            {/* Render all 60+ Branches */}
            {ALL_BRANCHES.map((branch, i) => (
              <g
                key={branch.id}
                className="yrc-bd-dot"
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

            {/* Motorcycle traveling the trail */}
            <g className="yrc-bd-bike" style={{ opacity: 0.9 }}>
              <g transform="translate(-5,-5)">
                <svg x="0" y="0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ background: "white", borderRadius: "50%" }}>
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
