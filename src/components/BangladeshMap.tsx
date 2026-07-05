import { useState } from "react";

// Geographically accurate, smooth, upright outline of Bangladesh
// constructed using absolute coordinates aligned with your silhouette image.
const BD_OUTLINE =
  "M 210 30 " +
  "C 195 40, 180 50, 175 60 " +
  "C 165 70, 155 85, 150 100 " +
  "C 135 125, 115 150, 100 180 " +
  "C 90 200, 80 215, 80 225 " + // Rajshahi westernmost bulge
  "C 82 235, 95 245, 110 255 " +
  "C 115 270, 120 285, 122 300 " +
  "C 125 320, 130 340, 135 360 " + // Southwest Satkhira border
  "C 150 365, 160 362, 170 365 " + // Sundarbans jagged delta coast
  "C 180 368, 190 360, 200 365 " +
  "C 210 368, 220 362, 230 365 " +
  "C 245 368, 255 362, 260 370 " + // Meghna river estuary
  "C 275 380, 290 395, 305 410 " + // Chittagong coastline sloping down
  "C 315 425, 320 440, 325 455 " + // Cox's Bazar beaches
  "C 328 462, 330 465, 330 465 " + // Southernmost Teknaf Peninsula tip
  "C 328 450, 325 430, 322 410 " +
  "C 320 390, 322 370, 325 350 " +
  "C 330 330, 335 310, 340 290 " + // Chittagong Hill Tracts east border
  "C 335 270, 320 255, 310 245 " +
  "C 305 235, 300 220, 298 210 " + // Indentation at Comilla
  "C 310 200, 325 190, 340 180 " +
  "C 350 175, 355 165, 350 155 " + // Sylhet easternmost bulge
  "C 340 145, 325 145, 310 145 " + // Flat Sylhet Northern Border
  "C 290 145, 270 145, 255 145 " + // Flat Mymensingh Northern Border
  "C 240 140, 225 135, 210 130 " +
  "C 195 110, 185 85, 175 70 " +
  "C 165 55, 160 45, 160 40 Z " + // Reconnect beautifully to Panchagarh
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

// Aligned branch pins perfectly with the new upright, unrotated map
const MAIN: MainBranch[] = [
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Managed by Aminul Islam", cx: 215, cy: 247 },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Led by Mohammad Sajid", cx: 305, cy: 370 },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", cx: 310, cy: 135 },
];

const DECOR = [
  { name: "Rajshahi", cx: 110, cy: 200, delay: 0 },
  { name: "Khulna", cx: 160, cy: 330, delay: 0.3 },
  { name: "Barisal", cx: 220, cy: 335, delay: 0.6 },
  { name: "Rangpur", cx: 155, cy: 90, delay: 0.9 },
  { name: "Mymensingh", cx: 220, cy: 125, delay: 1.2 },
  { name: "Comilla", cx: 275, cy: 250, delay: 1.5 },
  { name: "Cox's Bazar", cx: 320, cy: 420, delay: 1.8 },
  { name: "Jessore", cx: 135, cy: 290, delay: 0.15 },
];

// Aligned animated trail Dhaka → Chittagong → Sylhet → Dhaka
const BIKE_PATH =
  "M215,247 Q280,310 305,370 Q340,250 310,135 Q250,180 215,247";

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
        background: "transparent", // Completely borderless and transparent background
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

            {/* Smooth, accurate outline in authentic Yamaha Navy Blue */}
            <path
              className="yrc-bd-path"
              d={BD_OUTLINE}
              pathLength={1}
              fill="#003087" // Official Yamaha website theme color
              stroke="#0047cc" // Glowing Yamaha Accent Blue border
              strokeWidth={1.75}
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 8px rgba(0, 71, 204, 0.55))"
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
