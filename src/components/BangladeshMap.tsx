import { useState, useEffect } from "react";

type MainBranch = {
  id: string;
  name: string;
  coord: string;
  cx: number;
  cy: number;
};

// The 8 Major Regional Hubs (Large Red Pins with Hover Tooltips)
const MAIN: MainBranch[] = [
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Aminul Islam", cx: 1610, cy: 1668 },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Mohammad Sajid", cx: 1850, cy: 1920 },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Farhana Akter", cx: 1880, cy: 1375 },
  { id: "khulna", name: "🏍 KHULNA WING", coord: "Khulna Lead", cx: 1480, cy: 1830 },
  { id: "rajshahi", name: "🏍 RAJSHAHI WING", coord: "Rajshahi Lead", cx: 1320, cy: 1530 },
  { id: "barishal", name: "🏍 BARISHAL WING", coord: "Barishal Lead", cx: 1710, cy: 1850 },
  { id: "rangpur", name: "🏍 RANGPUR WING", coord: "Rangpur Lead", cx: 1500, cy: 1300 },
  { id: "mymensingh", name: "🏍 MYMENSINGH", coord: "Mymensingh Lead", cx: 1720, cy: 1450 },
];

// The 40+ Sub-Branches mapped from your exact list (Glowing Blue Network Dots)
const NETWORK_NODES = [
  { name: "Narayanganj", cx: 1630, cy: 1690 },
  { name: "Brahmanbaria", cx: 1780, cy: 1610 },
  { name: "Naogaon", cx: 1330, cy: 1450 },
  { name: "Bhairab", cx: 1730, cy: 1580 },
  { name: "Charfesson", cx: 1740, cy: 1950 },
  { name: "Kishoreganj", cx: 1730, cy: 1520 },
  { name: "Chirirbondor", cx: 1400, cy: 1220 },
  { name: "Dhunat", cx: 1500, cy: 1450 },
  { name: "Chhagalnaiya", cx: 1870, cy: 1780 },
  { name: "Chandpur", cx: 1750, cy: 1750 },
  { name: "Cox's Bazar", cx: 1910, cy: 2020 },
  { name: "Chakaria", cx: 1930, cy: 1980 },
  { name: "Madaripur", cx: 1600, cy: 1780 },
  { name: "Jashore", cx: 1430, cy: 1730 },
  { name: "Singair", cx: 1580, cy: 1660 },
  { name: "Laksham", cx: 1830, cy: 1740 },
  { name: "Shariatpur", cx: 1650, cy: 1780 },
  { name: "Patiya", cx: 1870, cy: 1940 },
  { name: "Domar", cx: 1400, cy: 1150 },
  { name: "Natore", cx: 1380, cy: 1480 },
  { name: "Saidpur", cx: 1420, cy: 1180 },
  { name: "Kushtia", cx: 1350, cy: 1620 },
  { name: "Fatikchari", cx: 1870, cy: 1850 },
  { name: "Bogura", cx: 1460, cy: 1420 },
  { name: "Barguna", cx: 1650, cy: 1920 },
  { name: "Satkhira", cx: 1400, cy: 1850 },
  { name: "Dinajpur", cx: 1350, cy: 1200 },
  { name: "Faridpur", cx: 1530, cy: 1710 },
  { name: "Manikganj", cx: 1550, cy: 1650 },
  { name: "Gaibandha", cx: 1520, cy: 1350 },
  { name: "Jhalokati", cx: 1650, cy: 1850 },
  { name: "Tangail", cx: 1580, cy: 1550 },
  { name: "Pabna", cx: 1400, cy: 1550 },
  { name: "Gopalganj", cx: 1530, cy: 1800 },
  { name: "Panchagarh", cx: 1350, cy: 1050 },
  { name: "Jhenaidah", cx: 1380, cy: 1680 },
  { name: "Habiganj", cx: 1820, cy: 1480 },
  { name: "Pirojpur", cx: 1550, cy: 1860 },
  { name: "Bhaluka", cx: 1680, cy: 1500 },
  { name: "Katiadi", cx: 1720, cy: 1540 },
  { name: "Ashulia", cx: 1590, cy: 1650 },
  { name: "Meherpur", cx: 1320, cy: 1650 },
  { name: "Joypurhat", cx: 1380, cy: 1400 },
  { name: "Kurigram", cx: 1530, cy: 1200 },
  { name: "Phulpur", cx: 1680, cy: 1400 },
  { name: "Sapahar", cx: 1300, cy: 1420 },
  { name: "Babuganj", cx: 1710, cy: 1820 },
  { name: "Dhanbari", cx: 1620, cy: 1480 },
  { name: "Manirampur", cx: 1430, cy: 1780 },
];

// Expanded trail to traverse the entire country
const BIKE_PATH =
  "M1610,1668 Q1750,1800 1850,1920 Q1900,1600 1880,1375 Q1600,1400 1320,1530 Q1300,1700 1480,1830 Q1550,1750 1610,1668";

export function BangladeshMap({
  height = 500,
  label = "OVER 60 BRANCHES NATIONWIDE",
}: {
  height?: number | string;
  label?: string;
}) {
  const [hover, setHover] = useState<MainBranch["id"] | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch("/bangladesh.svg")
      .then((res) => res.text())
      .then((text) => setSvgContent(text))
      .catch((err) => console.error("Failed to load map SVG:", err));
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "transparent",
        height: height,
      }}
    >
      <style>{`
        .yrc-inlined-svg svg {
          width: 100%;
          height: 100%;
          display: block;
          filter: drop-shadow(0 0 12px rgba(0, 71, 204, 0.6));
        }
        .yrc-inlined-svg svg path {
          fill: #003087 !important;
          stroke: #0047cc !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: 15000;
          stroke-dashoffset: 15000;
          animation: yrcDrawMap 3s ease-in-out forwards;
        }
        
        @keyframes yrcDrawMap {
          0% { stroke-dashoffset: 15000; fill-opacity: 0; }
          70% { stroke-dashoffset: 0; fill-opacity: 0; }
          100% { stroke-dashoffset: 0; fill-opacity: 1; }
        }

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
          
          {/* THE MAP: Injected directly into the DOM so it glows and animates! */}
          {/* ViewBox matches exactly to crop out empty space (Width: 1300, Height: 1350) */}
          <div 
            className="absolute inset-0 w-full h-full opacity-90 yrc-inlined-svg"
            dangerouslySetInnerHTML={{ __html: svgContent.replace('viewBox="0.22 -0.456 400 500"', 'viewBox="750 950 1300 1350"') }}
          />

          {/* THE OVERLAY: Dots, Trails, and Motorcycles */}
          <svg
            viewBox="750 950 1300 1350"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
            </defs>

            {/* Trail connecting main cities */}
            <path
              className="yrc-bd-trail"
              d={BIKE_PATH}
              fill="none"
              stroke="#0047cc"
              strokeOpacity={0.6}
              strokeWidth={4}
              strokeDasharray="15 15"
            />

            {/* The 50+ Blue Network Sub-Branches */}
            {NETWORK_NODES.map((d, i) => (
              <g
                key={d.name}
                className="yrc-bd-dot"
                style={
                  {
                    ["--enter-delay" as string]: `${2 + (i % 5) * 0.2}s`,
                    ["--pulse-delay" as string]: `${2.4 + (i % 3) * 0.4}s`,
                  } as React.CSSProperties
                }
              >
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={7}
                  fill="#0047cc"
                  style={{ filter: "drop-shadow(0 0 6px rgba(0,71,204,0.9))" }}
                />
              </g>
            ))}

            {/* Motorcycle traveling the trail */}
            <g className="yrc-bd-bike" style={{ opacity: 0.9 }}>
              <g transform="translate(-20,-20)">
                <svg x="0" y="0" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ background: "white", borderRadius: "50%" }}>
                  <circle cx="5.5" cy="16.5" r="3.5" />
                  <circle cx="18.5" cy="16.5" r="3.5" />
                  <path d="M5.5 16.5h6l3-6h-4" />
                  <path d="M14.5 10.5l4 6" />
                </svg>
                <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#yrc-bike-motion-path" />
                </animateMotion>
              </g>
            </g>

            {/* The 8 Main Hubs (rendered last so on top) */}
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
                  r={15}
                  fill="#e60012"
                  stroke="#ffffff"
                  strokeWidth={4}
                  style={{ filter: "drop-shadow(0 0 15px rgba(230,0,18,0.9))" }}
                />
                {/* Larger invisible hit area */}
                <circle cx={m.cx} cy={m.cy} r={50} fill="transparent" />
              </g>
            ))}
          </svg>

          {/* Dynamic Tooltips (Math perfectly accounts for the viewBox 750/950 offset and 1300/1350 scale) */}
          {MAIN.map((m) => {
            const active = hover === m.id;
            return (
              <div
                key={m.id}
                aria-hidden={!active}
                className="pointer-events-none absolute"
                style={{
                  left: `${((m.cx - 750) / 1300) * 100}%`,
                  top: `${((m.cy - 950) / 1350) * 100}%`,
                  transform: `translate(-50%, calc(-100% - 16px)) translateY(${active ? 0 : 5}px)`,
                  opacity: active ? 1 : 0,
                  transition: "opacity 200ms ease, transform 200ms ease",
                  zIndex: 50,
                }}
              >
                <div
                  className="rounded-lg bg-white font-sans"
                  style={{
                    padding: "10px 16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    color: "#003087",
                    whiteSpace: "nowrap",
                    fontSize: 13,
                    lineHeight: 1.35,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{m.coord}</div>
                  <a
                    href="/branches"
                    className="mt-1 inline-block font-semibold pointer-events-auto"
                    style={{ color: "#0047cc", fontSize: 12 }}
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
