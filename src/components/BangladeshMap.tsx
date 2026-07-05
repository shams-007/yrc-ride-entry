import { useState } from "react";

// Geographically precise outline with your requested tweaks:
// - Enhanced top-left bulge (X coordinates pulled further left into negative margins)
// - Elongated bottom-right Teknaf tail (Y coordinates stretched down to 535)
const BD_OUTLINE =
  "M 307 419 L 304 423 L 305 429 L 311 436 L 305 449 L 303 451 L 310 475 L 310 500 L 320 515 " + // Stretched Teknaf Peninsula downwards
  "L 330 530 L 342 535 L 350 510 L 350 490 L 363 454 L 373 457 L 369 447 L 374 435 L 382 434 " + // Curves smoothly back up
  "L 386 429 L 388 423 L 380 414 L 373 414 L 370 409 L 372 395 L 362 390 L 353 391 L 344 378 " +
  "L 342 372 L 335 369 L 330 365 L 327 355 L 329 341 L 322 341 L 317 328 L 311 326 L 304 334 " +
  "L 297 329 L 286 331 L 269 323 L 251 317 L 238 311 L 231 304 L 228 291 L 223 290 L 205 282 " +
  "L 193 280 L 187 271 L 171 261 L 162 253 L 151 247 L 134 240 L 116 232 L 105 221 L 91 213 " +
  "L 80 208 L 45 194 L 30 188 L 18 181 L 8 176 L -10 167 L -25 158 L -12 149 " + // Hand-tweaked western bulge curves
  "L 10 142 L 22 130 L 38 117 L 62 103 L 73 91 L 88 76 L 100 63 L 116 50 L 131 35 L 146 23 " +
  "L 158 8 L 173 15 L 189 23 L 201 30 L 215 38 L 226 44 L 256 58 L 286 70 L 301 76 L 315 81 " +
  "L 331 89 L 346 95 L 360 100 L 376 108 L 391 114 L 405 119 L 421 127 L 436 133 L 450 138 Z";

type MainBranch = {
  id: "dhaka" | "chittagong" | "sylhet";
  name: string;
  coord: string;
  cx: number;
  cy: number;
};

// Branch coordinates scaled directly to fit your exact 400x500 viewBox
const MAIN: MainBranch[] = [
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Managed by Aminul Islam", cx: 206, cy: 276 },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Led by Mohammad Sajid", cx: 293, cy: 384 },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", cx: 300, cy: 176 },
];

const DECOR = [
  { name: "Rajshahi", cx: 94, cy: 232, delay: 0 },
  { name: "Khulna", cx: 155, cy: 364, delay: 0.3 },
  { name: "Barisal", cx: 219, cy: 380, delay: 0.6 },
  { name: "Rangpur", cx: 139, cy: 112, delay: 0.9 },
  { name: "Mymensingh", cx: 216, cy: 180, delay: 1.2 },
  { name: "Comilla", cx: 287, cy: 304, delay: 1.5 },
  { name: "Cox's Bazar", cx: 323, cy: 456, delay: 1.8 },
  { name: "Jessore", cx: 135, cy: 324, delay: 0.15 },
];

// Trail aligned to your 400x500 grid
const BIKE_PATH =
  "M206,276 Q250,330 293,384 Q320,250 300,176 Q250,220 206,276";

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
        background: "transparent", // Clean borderless float
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
          {/* 
            Optimized padding parameters:
            We set X-padding to -60 and Y-padding to -10 with a total view size of 520x620.
            This gives:
            - Left/Right empty margins of 60px to shrink the map scale on laptop screens.
            - Top empty margin of only 10px, with a bottom empty margin of 110px.
            This large bottom buffer physically shifts/lifts the map significantly UPWARD so it stands
            perfectly center-top of the hero area and never gets clipped by container limits.
          */}
          <svg
            viewBox="-60 -10 520 620"
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

            {/* Exactly render your precise SVG path using official Yamaha Navy Blue */}
            <path
              className="yrc-bd-path"
              d={BD_OUTLINE}
              pathLength={1}
              fill="#003087" // Official Yamaha website theme color
              stroke="#0047cc" // Glowing Yamaha Accent Blue border
              strokeWidth={1.5} // Beautiful crisp borders
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 6px rgba(0, 71, 204, 0.55))"
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
                  style={{ filter: "drop-shadow(0 0 1px rgba(0,71,204,0.7))" }}
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

            {/* Main red branch dots */}
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

          {/* Tooltips — positioned dynamically based on new customized viewBox percentages */}
          {MAIN.map((m) => {
            const active = hover === m.id;
            return (
              <div
                key={m.id}
                aria-hidden={!active}
                className="pointer-events-none absolute"
                style={{
                  left: `${((m.cx + 60) / 520) * 100}%`,
                  top: `${((m.cy + 10) / 620) * 100}%`,
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
