import React, { useState, useEffect, useRef, useMemo } from "react";

type MainBranch = {
  id: string;
  name: string;
  coord?: string;
  cx: number;
  cy: number;
};

// Your perfectly corrected coordinates
const MAIN: MainBranch[] = [
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Managed by Aminul Islam", cx: 195, cy: 265 },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Led by Mohammad Sajid", cx: 255, cy: 355 },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", cx: 285, cy: 158 },
];

const DECOR = [
  { name: "Rajshahi", cx: 105, cy: 225, delay: 0 },
  { name: "Khulna", cx: 148, cy: 340, delay: 0.3 },
  { name: "Barisal", cx: 195, cy: 355, delay: 0.6 },
  { name: "Rangpur", cx: 135, cy: 105, delay: 0.9 },
  { name: "Mymensingh", cx: 205, cy: 185, delay: 1.2 },
  { name: "Comilla", cx: 248, cy: 278, delay: 1.5 },
  { name: "Cox's Bazar", cx: 262, cy: 408, delay: 1.8 },
  { name: "Jessore", cx: 130, cy: 305, delay: 0.15 },
];

const BIKE_PATH = "M195,265 Q230,310 255,355 Q290,255 285,158 Q238,205 195,265";

// --- Glitch-Free Styles ---
const GlobalStyles = React.memo(() => (
  <style>{`
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
      animation: yrcDrawMap 2.5s ease-in-out forwards;
    }
    @keyframes yrcDrawMap {
      0% { stroke-dashoffset: 1; fill-opacity: 0; }
      70% { stroke-dashoffset: 0; fill-opacity: 0; }
      100% { stroke-dashoffset: 0; fill-opacity: 1; }
    }
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
));

// --- Glitch-Free Map Background ---
const MapBackground = React.memo(({ content }: { content: string }) => {
  if (!content) return null;
  return (
    <div
      className="absolute inset-0 w-full h-full opacity-90 yrc-inlined-svg"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
});

export function BangladeshMap({
  height = 500,
  label = "47 BRANCHES NATIONWIDE",
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
        let fixedSVG = text.replace(/viewBox="[^"]+"/, 'viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet"');
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
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: "transparent", height }}>
      <GlobalStyles />

      <div className="relative flex h-full w-full flex-col items-center">
        <div className="relative w-full flex-1 max-w-[800px] flex items-center justify-center">
          
          <MapBackground content={svgContent} />

          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Glowing, curved, semi-transparent white Nationwide Bike Lane */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#00e5ff"
              strokeOpacity={0.75}
              strokeWidth={2}
              strokeDasharray="6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(0, 229, 255, 0.8))" }}
            />

            {/* Decorative Cyan Nodes */}
            {DECOR.map((d, i) => (
              <g
                key={d.name}
                className="yrc-bd-dot pointer-events-none"
                style={
                  {
                    ["--enter-delay" as string]: `${2 + (i % 8) * 0.15}s`,
                    ["--pulse-delay" as string]: `${2.4 + (i % 4) * 0.3}s`,
                  } as React.CSSProperties
                }
              >
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={1.5}
                  fill="#00e5ff"
                  stroke="#ffffff"
                  strokeWidth={0.4}
                  style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,1))" }}
                />
              </g>
            ))}

            {/* Main Hubs (Red Pins with Hover) */}
            {MAIN.map((m, i) => (
              <g
                key={m.id}
                className="yrc-bd-dot pointer-events-auto"
                style={
                  {
                    ["--enter-delay" as string]: `${2 + i * 0.1}s`,
                    ["--pulse-delay" as string]: `${2.4 + i * 0.3}s`,
                    cursor: "pointer",
                  } as React.CSSProperties
                }
                onMouseEnter={() => handleMouseEnter(m.id)}
                onMouseLeave={handleMouseLeave}
              >
                <circle
                  cx={m.cx}
                  cy={m.cy}
                  r={3}
                  fill="#e60012"
                  stroke="#ffffff"
                  strokeWidth={1}
                  style={{ filter: "drop-shadow(0 0 4px rgba(230,0,18,0.9))" }}
                />
                <circle cx={m.cx} cy={m.cy} r={12} fill="transparent" />
              </g>
            ))}

            {/* BIGGER, highly visible white and red motorcycle */}
            <g className="yrc-bd-bike" style={{ opacity: 1 }}>
              <g transform="translate(-10,-10)">
                <svg x="0" y="0" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#e60012" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ borderRadius: "50%", filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}>
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                </svg>
                {/* 15 second continuous loop across the curved path */}
                <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#yrc-bike-motion-path" />
                </animateMotion>
              </g>
            </g>
          </svg>

          {/* Dynamic Tooltips for MAIN Hubs */}
          {MAIN.map((m) => {
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
                    border: "2px solid #e60012",
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
