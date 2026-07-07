import { useState, useEffect, useRef } from "react";

type Branch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
  isMain?: boolean;
};

// All Branches flawlessly locked to the 0 0 400 500 viewBox
const ALL_BRANCHES: Branch[] = [
  // 8 Main Hubs (Large Red Pins)
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 195, cy: 240, isMain: true },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 285, cy: 350, isMain: true },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 295, cy: 140, isMain: true },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 135, cy: 330, isMain: true },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 90, cy: 195, isMain: true },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 180, cy: 335, isMain: true },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 115, cy: 95, isMain: true },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 195, cy: 155, isMain: true },
  
  // Sub-Branches (Glowing Cyan Nodes) - Pulled safely inland!
  { id: "narayanganj", name: "YRC Narayanganj", cx: 200, cy: 245 },
  { id: "brahmanbaria", name: "YRC Brahmanbaria", cx: 235, cy: 215 },
  { id: "naogaon", name: "YRC Naogaon", cx: 105, cy: 170 },
  { id: "bhairab", name: "YRC Bhairab", cx: 220, cy: 200 },
  { id: "charfesson", name: "YRC Charfesson", cx: 190, cy: 365 },
  { id: "nazipur", name: "YRC Nazipur", cx: 95, cy: 165 },
  { id: "kishoreganj", name: "YRC Kishoreganj", cx: 220, cy: 165 },
  { id: "chirirbondor", name: "YRC Chirirbondor", cx: 85, cy: 80 },
  { id: "dhunat", name: "YRC Dhunat", cx: 145, cy: 165 },
  { id: "sadardakshin", name: "YRC Sadar Dakshin", cx: 240, cy: 275 },
  { id: "chhagalnaiya", name: "YRC Chhagalnaiya", cx: 260, cy: 295 },
  { id: "chandpur", name: "YRC Chandpur", cx: 215, cy: 285 },
  { id: "muradpur", name: "YRC Muradpur", cx: 280, cy: 355 },
  { id: "mirpur", name: "Mirpur Branch", cx: 190, cy: 236 },
  { id: "rangamati", name: "YRC Rangamati", cx: 310, cy: 340 },
  { id: "coxsbazar", name: "YRC Cox's Bazar", cx: 310, cy: 420 },
  { id: "chakaria", name: "YRC Chakaria", cx: 300, cy: 395 },
  { id: "paltan", name: "Paltan Branch", cx: 195, cy: 242 },
  { id: "madaripur", name: "YRC Madaripur", cx: 175, cy: 295 },
  { id: "khilgaon", name: "Khilgaon Branch", cx: 198, cy: 240 },
  { id: "jashore", name: "YRC Jashore", cx: 110, cy: 300 },
  { id: "fulgazi", name: "YRC Fulgazi", cx: 265, cy: 290 },
  { id: "singair", name: "YRC Singair", cx: 175, cy: 240 },
  { id: "eidgaon", name: "YRC Eidgaon", cx: 308, cy: 410 },
  { id: "laksham", name: "YRC Laksham", cx: 250, cy: 280 },
  { id: "shariatpur", name: "YRC Shariatpur", cx: 190, cy: 290 },
  { id: "patiya", name: "YRC Patiya", cx: 285, cy: 360 },
  { id: "domar", name: "YRC Domar", cx: 95, cy: 65 },
  { id: "natore", name: "YRC Natore", cx: 120, cy: 195 },
  { id: "anowara", name: "YRC Anowara", cx: 285, cy: 365 },
  { id: "debiganj", name: "YRC Debiganj", cx: 90, cy: 50 },
  { id: "saidpur", name: "YRC Saidpur", cx: 95, cy: 80 },
  { id: "kushtia", name: "YRC Kushtia", cx: 110, cy: 245 },
  { id: "fatikchari", name: "YRC Fatikchari", cx: 285, cy: 330 },
  { id: "sakhipur", name: "YRC Sakhipur", cx: 180, cy: 190 },
  { id: "bogura", name: "YRC Bogura", cx: 145, cy: 155 },
  { id: "boalkhali", name: "YRC Boalkhali", cx: 290, cy: 355 },
  { id: "barguna", name: "YRC Barguna", cx: 160, cy: 365 },
  { id: "satkhira", name: "YRC Satkhira", cx: 115, cy: 335 },
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
  { id: "jhalokati", name: "YRC Jhalokati", cx: 170, cy: 335 },
  { id: "pekua", name: "YRC Pekua", cx: 305, cy: 405 },
  { id: "sherpurbogura", name: "YRC Sherpur Bogura", cx: 145, cy: 165 },
  { id: "birganj", name: "YRC Birganj", cx: 85, cy: 70 },
  { id: "tangail", name: "YRC Tangail", cx: 165, cy: 195 },
  { id: "shathibari", name: "YRC Shathibari", cx: 120, cy: 105 },
  { id: "nilphamari", name: "YRC Nilphamari", cx: 100, cy: 70 },
  { id: "pabna", name: "YRC Pabna", cx: 130, cy: 220 },
  { id: "hathazari", name: "YRC Hathazari", cx: 285, cy: 345 },
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
  { id: "habiganj", name: "YRC Habiganj", cx: 260, cy: 160 },
  { id: "pirojpur", name: "YRC Pirojpur", cx: 155, cy: 335 },
  { id: "bhaluka", name: "YRC Bhaluka", cx: 190, cy: 175 },
  { id: "katiadi", name: "YRC Katiadi", cx: 225, cy: 175 },
  { id: "ashulia", name: "YRC Ashulia", cx: 188, cy: 228 },
  { id: "ghatail", name: "YRC Ghatail", cx: 170, cy: 180 },
  { id: "daulatpur", name: "Khulna - Daulatpur", cx: 135, cy: 335 },
  { id: "meherpur", name: "YRC Meherpur", cx: 80, cy: 255 },
  { id: "muradnagar", name: "YRC Muradnagar", cx: 250, cy: 245 },
  { id: "savar", name: "Savar Branch", cx: 185, cy: 230 },
  { id: "baniyachong", name: "Baniyachong Wing", cx: 255, cy: 165 },
  { id: "joypurhat", name: "YRC Joypurhat", cx: 105, cy: 140 },
  { id: "boda", name: "YRC Boda", cx: 85, cy: 45 },
  { id: "kurigram", name: "YRC Kurigram", cx: 145, cy: 95 },
  { id: "phulpur", name: "YRC Phulpur", cx: 195, cy: 130 },
  { id: "sapahar", name: "YRC Sapahar", cx: 85, cy: 150 },
  { id: "babuganj", name: "YRC Babuganj", cx: 185, cy: 335 },
  { id: "dhanbari", name: "YRC Dhanbari", cx: 165, cy: 170 },
  { id: "manirampur", name: "YRC Manirampur", cx: 115, cy: 305 },
];

// Expanded trail covering major hubs nationwide
const BIKE_PATH =
  "M 195,240 L 115,95 L 90,195 L 135,330 L 180,335 L 285,350 L 310,420 L 250,280 L 295,140 L 195,155 Z";

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
        // Force the fetched SVG to use our exact 0 0 400 500 coordinate space
        let fixedSVG = text.replace(/viewBox="[^"]+"/, 'viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet"');
        
        // Inject the animation class and pathLength=1 so it draws itself
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
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "transparent", height: height }}
    >
      <style>{`
        /* Map Glow and Animation */
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

        /* Dots and Lines Animation */
        @keyframes yrcDotEnter {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes yrcDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
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
          
          {/* THE MAP: Injected directly with animation logic */}
          <div 
            className="absolute inset-0 w-full h-full opacity-90 yrc-inlined-svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />

          {/* THE OVERLAY: Uses the exact same 0 0 400 500 viewBox! */}
          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Trail connecting main branches - Changed to Yamaha Blue */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#0047cc" // Original Yamaha Accent Blue
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />

            {/* Render all Branches */}
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
                  r={branch.isMain ? 2.5 : 1.2}
                  fill={branch.isMain ? "#e60012" : "#00e5ff"}
                  stroke={branch.isMain ? "#ffffff" : "#ffffff"}
                  strokeWidth={branch.isMain ? 0.8 : 0.3}
                  style={{
                    filter: branch.isMain
                      ? "drop-shadow(0 0 4px rgba(230,0,18,0.9))"
                      : "drop-shadow(0 0 4px rgba(0,229,255,1))",
                  }}
                />
                <circle cx={branch.cx} cy={branch.cy} r={branch.isMain ? 10 : 7} fill="transparent" />
              </g>
            ))}

            {/* BIGGER, MORE VISIBLE MOTORCYCLE */}
            <g className="yrc-bd-bike" style={{ opacity: 1 }}>
              {/* Translate exactly half of width/height to center it on the line */}
              <g transform="translate(-12,-12)">
                <svg x="0" y="0" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="#e60012" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%", filter: "drop-shadow(0 0 4px rgba(230,0,18,0.6))" }}>
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
