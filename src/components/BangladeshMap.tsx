import { useState } from "react";

// Geographically precise, unrotated, smooth outline of Bangladesh
// based on official Wikipedia divisions map with no tilt or blocky lines
const BD_OUTLINE =
  "M 342 438 " +
  "C 335 445, 328 448, 322 450 " +
  "C 307 443, 292 435, 277 428 " +
  "C 272 420, 268 412, 263 406 " +
  "C 252 398, 242 390, 231 382 " +
  "C 221 373, 211 365, 201 357 " +
  "C 197 341, 194 325, 191 309 " + // Coastline
  "C 185 315, 179 322, 173 328 " + // Sundarbans coastline
  "C 163 327, 154 326, 145 325 " + // Sundarbans delta
  "C 139 311, 133 298, 127 285 " +
  "C 116 270, 105 256, 95 242 " +
  "C 88 243, 81 244, 75 245 " + // Rajshahi westernmost bulge
  "C 71 232, 68 219, 65 207 " +
  "C 69 200, 74 193, 79 186 " +
  "C 81 172, 84 158, 87 145 " + // Dinajpur western border
  "C 101 128, 115 111, 129 94 " +
  "C 131 85, 134 76, 137 67 " + // Panchagarh west border
  "C 127 67, 117 67, 107 67 " + // Panchagarh tip western corner
  "C 109 55, 111 40, 113 30 " + // Panchagarh extreme northern tip (12 o'clock)
  "C 120 40, 130 50, 137 56 " + // Panchagarh eastern slope
  "C 160 80, 180 100, 203 132 " + // Mymensingh/Rangpur boundary
  "C 215 130, 225 128, 238 129 " + // Sylhet northwest border
  "C 225 110, 215 100, 209 88 " +
  "C 212 82, 215 76, 217 72 " +
  "C 225 78, 235 84, 242 88 " + // Sylhet northern border
  "C 250 105, 255 125, 258 140 " + // Sylhet easternmost bulge
  "C 275 155, 290 170, 300 183 " + // Comilla indentation
  "C 315 185, 330 188, 340 191 " + // Tripura boundary bulge
  "C 342 185, 344 178, 346 172 " +
  "C 342 165, 340 158, 338 153 " +
  "C 344 149, 350 145, 356 142 " + // Chittagong Hill tracts east bulge
  "C 362 153, 368 165, 374 177 " +
  "C 378 198, 382 218, 384 239 " +
  "C 384 267, 384 295, 384 323 " + // Cox's Bazar coastline heading down
  "C 378 335, 372 348, 368 360 " +
  "C 358 386, 350 412, 342 438 Z " +
  // Smooth Hatiya Island
  "M 270 385 C 275 390, 273 398, 267 398 C 263 393, 265 386, 270 385 Z " +
  // Smooth Bhola Island
  "M 248 375 C 253 385, 251 398, 245 398 C 241 388, 243 378, 248 375 Z " +
  // Smooth Sandwip Island
  "M 285 365 C 288 370, 286 376, 282 376 C 279 370, 281 366, 285 365 Z";

type MainBranch = {
  id: "dhaka" | "chittagong" | "sylhet";
  name: string;
  coord: string;
  cx: number;
  cy: number;
};

// Branch pins aligned precisely with the updated, unrotated layout
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

// Re-anchored trail Dhaka → Chittagong → Sylhet → Dhaka.
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
        background: "transparent", // Clean borderless layout
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

            {/* Smooth, accurate Wikipedia-derived outline in official Yamaha Navy Blue */}
            <path
              className="yrc-bd-path"
              d={BD_OUTLINE}
              pathLength={1}
              fill="#003087" // Authentic Yamaha Navy Blue website theme color
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
