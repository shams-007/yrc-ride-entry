import { useState } from "react";

// A high-fidelity, curved outline of Bangladesh including sub-paths for major delta islands
const BD_OUTLINE =
  "M 150 35 C 135 45, 125 55, 115 75 C 105 95, 95 105, 80 115 C 65 125, 55 140, 60 160 C 65 180, 50 190, 55 210 C 60 230, 45 250, 45 270 C 45 290, 55 310, 50 330 C 45 350, 35 370, 50 385 C 65 400, 75 390, 85 395 C 90 400, 95 410, 105 405 C 115 400, 120 415, 130 410 C 140 405, 145 420, 155 415 C 165 410, 175 425, 185 415 C 190 405, 195 425, 205 420 C 208 418, 212 422, 218 415 C 224 408, 222 398, 225 390 C 228 380, 235 375, 240 370 C 248 375, 255 385, 258 395 C 262 405, 268 412, 275 418 C 280 422, 285 425, 290 420 C 295 415, 292 405, 288 398 C 285 392, 288 385, 292 380 C 298 375, 305 385, 310 395 C 315 405, 320 420, 325 435 C 335 450, 345 465, 340 475 C 338 480, 332 485, 325 480 C 318 475, 315 460, 312 445 C 310 430, 315 410, 310 395 C 305 380, 325 365, 330 340 C 335 315, 330 295, 340 280 C 350 265, 335 245, 335 230 C 335 215, 320 200, 315 185 C 310 170, 300 155, 305 140 C 310 125, 325 115, 330 100 C 335 85, 330 70, 320 60 C 310 50, 295 65, 280 60 C 265 55, 250 70, 235 65 C 220 60, 205 50, 190 55 C 175 60, 160 50, 150 35 Z M 215 370 C 218 370, 222 380, 222 390 C 222 400, 218 410, 215 410 C 212 410, 210 400, 210 390 C 210 380, 212 370, 215 370 Z M 235 385 C 238 385, 240 395, 238 405 C 236 415, 232 415, 230 405 C 228 395, 232 385, 235 385 Z M 262 375 C 265 375, 266 380, 264 388 C 262 393, 259 393, 258 388 C 257 383, 259 375, 262 375 Z M 318 415 C 321 415, 322 422, 320 430 C 318 435, 314 435, 313 428 C 312 420, 315 415, 318 415 Z";

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
  { name: "Rajshahi", cx: 78, cy: 189, delay: 0 },
  { name: "Khulna", cx: 139, cy: 296, delay: 0.3 },
  { name: "Barisal", cx: 191, cy: 306, delay: 0.6 },
  { name: "Rangpur", cx: 120, cy: 93, delay: 0.9 },
  { name: "Mymensingh", cx: 194, cy: 163, delay: 1.2 },
  { name: "Comilla", cx: 244, cy: 253, delay: 1.5 },
  { name: "Cox's Bazar", cx: 296, cy: 395, delay: 1.8 },
  { name: "Jessore", cx: 117, cy: 273, delay: 0.15 },
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
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        backgroundColor: "#020b18",
        padding: 24,
        boxShadow: "0 0 60px rgba(0,48,135,0.3)",
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
            style={{ display: "block", maxHeight: "100%" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
              <filter id="yrc-red-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Country outline with updated detailed path and premium glowing border style */}
            <path
              className="yrc-bd-path"
              d={BD_OUTLINE}
              pathLength={1}
              fill="#250508" // Deep crimson silhouette background
              stroke="#e60012" // Glowing YRC Crimson Red border line
              strokeWidth={1.5}
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 6px rgba(230, 0, 18, 0.45))"
              }}
            />

            {/* Trail connecting three main cities */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#0047cc"
              strokeOpacity={0.4}
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
                  r={3}
                  fill="#0047cc"
                  style={{ filter: "drop-shadow(0 0 5px rgba(0,71,204,0.7))" }}
                />
              </g>
            ))}

            {/* Motorcycle traveling the trail */}
            <g className="yrc-bd-bike" style={{ opacity: 0.5 }}>
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
                  r={5}
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
              className="font-display tracking-wider text-white"
              style={{ fontSize: 16, lineHeight: 1 }}
            >
              {label}
            </span>
            <span
              aria-hidden
              className="mt-2 block"
              style={{ width: 40, height: 2, backgroundColor: "#e60012" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
