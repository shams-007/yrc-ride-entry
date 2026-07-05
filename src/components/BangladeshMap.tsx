import { useState } from "react";

const BD_OUTLINE =
  "M100,55 L180,45 L220,55 L260,80 L290,70 L340,85 L330,120 L300,140 L315,180 L340,210 L320,240 L340,280 L335,320 L320,340 L335,380 L320,420 L305,460 L285,470 L240,445 L200,455 L160,435 L120,425 L90,405 L55,380 L40,340 L55,300 L45,255 L60,220 L45,185 L65,150 L55,120 L80,90 Z";

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

            {/* Country outline */}
            <path
              className="yrc-bd-path"
              d={BD_OUTLINE}
              pathLength={1}
              fill="#041225"
              stroke="#003087"
              strokeWidth={2}
              strokeLinejoin="round"
            />

            {/* Trail connecting three main cities */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#003087"
              strokeOpacity={0.2}
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
