import { useState } from "react";

// Geographically corrected, upright, high-fidelity outline of Bangladesh
// based on your silhouette with the northern borders horizontally aligned (no tilt)
const BD_OUTLINE = 
  "M 175 40 " + // Panchagarh (Northern Tip)
  "C 165 45, 150 55, 140 65 " + // Dinajpur western curve
  "C 120 70, 110 80, 105 100 " + // Dinajpur westernmost block
  "C 107 120, 110 135, 112 150 " + 
  "C 100 170, 85 190, 80 210 " + // Rajshahi western bulge
  "C 82 225, 90 235, 100 245 " + 
  "C 105 260, 110 275, 112 290 " + // Kushtia / Jessore border
  "C 115 310, 120 325, 125 340 " + // Satkhira border
  "C 130 355, 135 365, 140 370 " + // Sundarbans coast start
  "C 150 372, 160 370, 170 370 " + // Sundarbans channels (horizontal)
  "C 180 370, 190 372, 200 370 " +
  "C 210 368, 220 365, 230 360 " + // Patuakhali / Barisal coast
  "C 240 358, 250 355, 260 365 " + // Meghna Estuary mouth
  "C 270 370, 280 380, 290 395 " + // Chittagong coastline heading southeast
  "C 300 410, 310 425, 320 445 " + // Cox's Bazar coastline
  "C 325 452, 328 455, 330 455 " + // Southern Teknaf Peninsula tip
  "C 328 440, 325 420, 322 400 " + 
  "C 320 380, 322 360, 325 340 " + // Chittagong coastal range
  "C 330 320, 335 300, 340 280 " + // Chittagong Hill Tracts east bulge
  "C 345 260, 342 240, 338 220 " + 
  "C 325 210, 310 200, 298 190 " + // Tripura/Comilla indentation
  "C 295 175, 295 160, 298 145 " + 
  "C 310 135, 325 125, 340 115 " + // Sylhet southern corner
  "C 350 110, 355 100, 350 90 " + // Sylhet easternmost bulge
  "C 340 85, 325 85, 310 85 " + // Flat Sylhet Northern Border (realigned to fix tilt)
  "C 290 85, 270 85, 255 85 " + // Flat Mymensingh Northern Border
  "C 240 80, 225 75, 210 70 " + // Kurigram border corner
  "C 195 60, 185 50, 175 40 Z " + // Reconnect beautifully to Panchagarh
  // Hatiya Island
  "M 270 385 C 275 390, 273 398, 267 398 C 263 393, 265 386, 270 385 Z " +
  // Bhola Island
  "M 248 375 C 253 385, 251 398, 245 398 C 241 388, 243 378, 248 375 Z " +
  // Sandwip Island
  "M 285 365 C 288 370, 286 376, 282 376 C 279 370, 281 366, 285 365 Z";

type MainBranch = {
  id: "dhaka" | "chittagong" | "sylhet";
  name: string;
  coord: string;
  cx: number;
  cy: number;
};

const MAIN: MainBranch[] = [
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Managed by Aminul Islam", cx: 194, cy: 228 },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Led by Mohammad Sajid", cx: 282, cy: 330 },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", cx: 288, cy: 152 },
];

const DECOR = [
  { name: "Rajshahi", cx: 100, cy: 210, delay: 0 },
  { name: "Khulna", cx: 150, cy: 330, delay: 0.3 },
  { name: "Barisal", cx: 210, cy: 340, delay: 0.6 },
  { name: "Rangpur", cx: 150, cy: 100, delay: 0.9 },
  { name: "Mymensingh", cx: 200, cy: 150, delay: 1.2 },
  { name: "Comilla", cx: 250, cy: 250, delay: 1.5 },
  { name: "Cox's Bazar", cx: 305, cy: 400, delay: 1.8 },
  { name: "Jessore", cx: 120, cy: 300, delay: 0.15 },
];

// Curved trail Dhaka → Chittagong → Sylhet → Dhaka
const BIKE_PATH =
  "M194,228 Q260,280 282,330 Q340,240 288,152 Q230,190 194,228";

export function BangladeshMap({
  height,
  label = "47 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<MainBranch["id"] | null>(null);

  return (
    <div
      className="relative w-full h-full overflow-visible"
      style={{
        background: "transparent", // No background, completely transparent
        height: height,
      }}
    >
      <style>{`
        @keyframes yrcMapDraw {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes yrcDotEnter {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes yrcDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
        .yrc-bd-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: yrcMapDraw 2s ease-in-out forwards;
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
          stroke-dasharray: 4 4;
          opacity: 0;
          animation: yrcDotEnter 400ms ease forwards 2s;
        }
        .yrc-bd-bike {
          opacity: 0;
          animation: yrcDotEnter 400ms ease forwards 2.2s;
        }
      `}</style>

      <div className="relative flex h-full w-full flex-col">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 450 480"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: "block", maxHeight: "100%", overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
              <filter id="yrc-blue-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Geographically accurate, unrotated map shape using official Yamaha Navy Blue */}
            <path
              className="yrc-bd-path"
              d={BD_OUTLINE}
              pathLength={1}
              fill="#003087" // Authentic Yamaha Blue
              stroke="#0047cc" // Glowing Yamaha Accent Blue
              strokeWidth={1.75}
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 8px rgba(0, 71, 204, 0.75))"
              }}
            />

            {/* Trail connecting three main cities */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#0047cc"
              strokeOpacity={0.5}
              strokeWidth={1.5}
            />

            {/* Decorative blue dots */}
            {DECOR.map((d, i) => (
              <g
                key={d.name}
                className="yrc-bd-dot"
                style={
                  {
                    ["--enter-delay" as string]: `${2 + (i + 3) * 0.1}s`,
                    ["--pulse-delay" as string]: `${2.4 + d.delay}s`,
                  } as React.CSSProperties
                }
              >
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={3.5}
                  fill="#0047cc"
                  style={{ filter: "drop-shadow(0 0 5px rgba(0,71,204,0.7))" }}
                />
              </g>
            ))}

            {/* Motorcycle traveling the trail */}
            <g className="yrc-bd-bike" style={{ opacity: 0.75 }}>
              <g transform="translate(-7,-7)">
                <svg x="0" y="0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                </svg>
                <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#yrc-bike-motion-path" />
                </animateMotion>
              </g>
            </g>

            {/* Main red branch dots (rendered last so on top) */}
            {MAIN.map((m, i) => (
              <g
                key={m.id}
                className="yrc-bd-dot"
                style={
                  {
                    ["--enter-delay" as string]: `${2 + i * 0.1}s`,
                    ["--pulse-delay" as string]: `${2.4 + i * 0.3}s`,
                    cursor: "pointer",
                  } as React.CSSProperties
                }
                onMouseEnter={() => setHover(m.id)}
                onMouseLeave={() => setHover((h) => (h === m.id ? null : h))}
              >
                <circle
                  cx={m.cx}
                  cy={m.cy}
                  r={5.5}
                  fill="#e60012"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  style={{ filter: "drop-shadow(0 0 8px rgba(230,0,18,0.9))" }}
                />
                {/* Larger invisible hit area */}
                <circle cx={m.cx} cy={m.cy} r={14} fill="transparent" />
              </g>
            ))}
          </svg>

          {/* Tooltips — positioned in map percentage space */}
          {MAIN.map((m) => {
            const active = hover === m.id;
            return (
              <div
                key={m.id}
                aria-hidden={!active}
                className="pointer-events-none absolute"
                style={{
                  left: `${(m.cx / 400) * 100}%`,
                  top: `${(m.cy / 500) * 100}%`,
                  transform: `translate(-50%, calc(-100% - 14px)) translateY(${active ? 0 : 5}px)`,
                  opacity: active ? 1 : 0,
                  transition: "opacity 200ms ease, transform 200ms ease",
                  zIndex: 50,
                }}
              >
                <div
                  className="rounded-lg bg-white font-sans"
                  style={{
                    padding: "8px 12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    color: "#003087",
                    whiteSpace: "nowrap",
                    fontSize: 12,
                    lineHeight: 1.35,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{m.coord}</div>
                  <a
                    href="/branches"
                    className="mt-1 inline-block font-semibold"
                    style={{ color: "#0047cc", fontSize: 11 }}
                  >
                    Visit Branch →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {label ? (
          <div className="mt-3 flex flex-col items-center">
            <span
              className="font-display tracking-wider text-white/80"
              style={{ fontSize: 16, lineHeight: 1 }}
            >
              {label}
            </span>
            <span
              aria-hidden
              className="mt-2 block"
              style={{ width: 40, height: 2, backgroundColor: "#0047cc" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
