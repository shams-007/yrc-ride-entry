import { useState } from "react";

// Geographically precise, smooth organic outline of Bangladesh (no tilt, no blocky lines)
const BD_OUTLINE =
  "M 390 390 " +
  "c -15 -45, -35 -90, -56.25 -126.25 " +
  "c -5 1, -13 0, -18.75 1.25 " +
  "c 5 15, -5 35, -2.5 50 " +
  "c -15 -10, -30 -30, -43.75 -41.25 " +
  "c 5 -15, 10 -30, 13.75 -45 " +
  "c 10 -2, 20 -3, 30 -5 " +
  "c 5 -20, 15 -45, 20 -66.25 " +
  "c -15 -5, -30 -8, -42.5 -13.75 " +
  "c -20 0, -40 1, -62.5 1.25 " +
  "c -20 -5, -45 -6, -67.5 -11.25 " +
  "c -5 -20, -10 -40, -15 -55 " +
  "c -10 -2, -20 -3, -33.75 -5 " +
  "c -20 -10, -40 -20, -60 -33.75 " +
  "c -5 20, -10 40, -15 53.75 " +
  "c 20 15, 40 30, 57.5 42.5 " +
  "c -15 10, -30 20, -38.75 30 " +
  "c -3 10, -7 20, -10 28.75 " +
  "c 15 7, 30 14, 46.25 21.25 " +
  "c -2 15, -3 30, -5 47.5 " +
  "c 10 20, 20 40, 32.5 60 " +
  "c 5 20, 15 45, 20 65 " +
  "c 10 2, 20 5, 27.5 7.5 " +
  "c 7 3, 14 6, 21.25 8.75 " +
  "c 2 -5, 5 -10, 7.5 -15 " +
  "c 10 5, 20 11, 31.25 16.25 " +
  "c 5 -15, 11 -30, 16.25 -43.75 " +
  "c -4 -10, -8 -22, -11.25 -32.5 " +
  "c 20 1, 40 2, 63.75 2.5 " +
  "c 10 15, 25 30, 35 46.25 " +
  "c 6 12, 12 25, 18.75 38.75 " +
  "c 3 13, 7 26, 10 40 " +
  "c 8 13, 16 27, 25 41.25 " +
  "c -4 -20, -9 -43, -13.75 -63.75 " +
  "c 8 4, 17 8, 26.25 12.5 " +
  "c -2 -19, -4 -38, -6.25 -57.5 Z " +
  // Smooth Hatiya Island
  "M 265 375 C 270 380, 268 390, 262 390 C 258 385, 260 378, 265 375 Z " +
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
      className="relative w-full h-full overflow-visible animate-fade-in"
      style={{
        background: "transparent", // Background completely transparent
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
