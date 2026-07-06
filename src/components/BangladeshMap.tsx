import { useState } from "react";

type MainBranch = {
  id: "dhaka" | "chittagong" | "sylhet";
  name: string;
  coord: string;
  cx: number;
  cy: number;
};

// Coordinates aligned to the 2400x2400 grid of your SVG file
const MAIN: MainBranch[] = [
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Managed by Aminul Islam", cx: 1450, cy: 1650 },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Led by Mohammad Sajid", cx: 1850, cy: 1920 },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", cx: 1720, cy: 1250 },
];

const DECOR = [
  { name: "Rajshahi", cx: 1000, cy: 1530, delay: 0 },
  { name: "Khulna", cx: 1100, cy: 1850, delay: 0.3 },
  { name: "Barisal", cx: 1350, cy: 1900, delay: 0.6 },
  { name: "Rangpur", cx: 1050, cy: 1100, delay: 0.9 },
  { name: "Mymensingh", cx: 1400, cy: 1350, delay: 1.2 },
  { name: "Comilla", cx: 1650, cy: 1700, delay: 1.5 },
  { name: "Cox's Bazar", cx: 1880, cy: 2150, delay: 1.8 },
  { name: "Jessore", cx: 1000, cy: 1730, delay: 0.15 },
];

// Trail aligned to your 2400x2400 grid
const BIKE_PATH =
  "M1450,1650 Q1650,1800 1850,1920 Q1800,1600 1720,1250 Q1350,1400 1450,1650";

export function BangladeshMap({
  height = 500,
  label = "47 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<MainBranch["id"] | null>(null);

  return (
    <div className="relative w-full h-full overflow-visible" style={{ background: "transparent", height: height }}>
      
      {/* 1. PASTE THE STYLE HERE */}
      <style>{`
        @keyframes drawMap {
          0% { stroke-dashoffset: 1; fill-opacity: 0; }
          70% { stroke-dashoffset: 0; fill-opacity: 0; }
          100% { stroke-dashoffset: 0; fill-opacity: 1; }
        }
        .animate-map {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawMap 3s ease-in-out forwards;
        }
      `}</style>

      <div className="relative flex h-full w-full flex-col">
        {/* ... your svg tag ... */}
      <style>{`
        @keyframes yrcDotEnter {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes yrcDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
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

      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          {/* BACKGROUND MAP IMAGE - Loads the file you saved in public folder */}
          <img 
            src="/bangladesh.svg" 
            alt="Map of Bangladesh" 
            className="absolute inset-0 w-full h-full object-contain opacity-90 drop-shadow-xl"
          />

          {/* OVERLAY SVG - Same viewBox as your map (2400x2400) to perfectly align animations */}
          <svg
            viewBox="0 0 2400 2400"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Trail connecting three main cities */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#0047cc"
              strokeOpacity={0.6}
              strokeWidth={8}
              strokeDasharray="20 20"
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
                  r={15}
                  fill="#0047cc"
                  style={{ filter: "drop-shadow(0 0 10px rgba(0,71,204,0.7))" }}
                />
              </g>
            ))}

            {/* Motorcycle traveling the trail */}
            <g className="yrc-bd-bike" style={{ opacity: 0.9 }}>
              <g transform="translate(-40,-40)">
                <svg x="0" y="0" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ background: "white", borderRadius: "50%" }}>
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
                  r={25}
                  fill="#e60012"
                  stroke="#ffffff"
                  strokeWidth={8}
                  style={{ filter: "drop-shadow(0 0 20px rgba(230,0,18,0.9))" }}
                />
                {/* Larger invisible hit area */}
                <circle cx={m.cx} cy={m.cy} r={80} fill="transparent" />
              </g>
            ))}
          </svg>

          {/* Tooltips */}
          {MAIN.map((m) => {
            const active = hover === m.id;
            return (
              <div
                key={m.id}
                aria-hidden={!active}
                className="pointer-events-none absolute"
                style={{
                  left: `${(m.cx / 2400) * 100}%`,
                  top: `${(m.cy / 2400) * 100}%`,
                  transform: `translate(-50%, calc(-100% - 24px)) translateY(${active ? 0 : 5}px)`,
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
                    className="mt-1 inline-block font-semibold pointer-events-auto"
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
          <div className="mt-6 flex flex-col items-center">
            <span
              className="font-display tracking-wider"
              style={{ color: "#003087", fontSize: 16, lineHeight: 1 }}
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
