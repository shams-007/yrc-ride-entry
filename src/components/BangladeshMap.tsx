import { useState } from "react";

type MainBranch = {
  id: "dhaka" | "chittagong" | "sylhet";
  name: string;
  coord: string;
  cx: number;
  cy: number;
};

// Branch coordinates scaled directly to fit the new 2400x2400 artwork space
const MAIN: MainBranch[] = [
  { id: "dhaka", name: "🏍 DHAKA CENTRAL", coord: "Managed by Aminul Islam", cx: 1745, cy: 1620 },
  { id: "chittagong", name: "🏍 CHITTAGONG HUB", coord: "Led by Mohammad Sajid", cx: 2017, cy: 1918 },
  { id: "sylhet", name: "🏍 SYLHET REGIONAL", coord: "Coordinated by Farhana Akter", cx: 2042, cy: 1375 },
];

const DECOR = [
  { name: "Rajshahi", cx: 1280, cy: 1530, delay: 0 },
  { name: "Khulna", cx: 1480, cy: 1830, delay: 0.3 },
  { name: "Barisal", cx: 1700, cy: 1850, delay: 0.6 },
  { name: "Rangpur", cx: 1500, cy: 1300, delay: 0.9 },
  { name: "Mymensingh", cx: 1750, cy: 1450, delay: 1.2 },
  { name: "Comilla", cx: 1950, cy: 1700, delay: 1.5 },
  { name: "Cox's Bazar", cx: 2050, cy: 2000, delay: 1.8 },
  { name: "Jessore", cx: 1420, cy: 1730, delay: 0.15 },
];

// Trail aligned to your 2400x2400 artwork
const BIKE_PATH =
  "M1745,1620 Q1900,1800 2017,1918 Q2050,1600 2042,1375 Q1900,1500 1745,1620";

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
          {/* Exactly render your 2400x2400 artwork view bounds */}
          <svg
            viewBox="0 0 2400 2400"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: "block", maxHeight: "100%", overflow: "visible" }}
          >
            <defs>
              <clipPath id="clip-0" />
              <linearGradient id="linear-pattern-0" gradientUnits="userSpaceOnUse" x1="0.0740725" y1="0" x2="0.895127" y2="0" gradientTransform="matrix(39.9373, 2923.34, -2923.34, 39.9373, 67.6219, -216.66)">
                <stop offset="0" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5625" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.59375" stopColor="rgb(98.376465%, 98.376465%, 98.376465%)" stopOpacity="1"/>
                <stop offset="0.625" stopColor="rgb(98.179626%, 98.179626%, 98.179626%)" stopOpacity="1"/>
                <stop offset="0.75" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
                <stop offset="1" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
              </linearGradient>
              <clipPath id="clip-1">
                <path clipRule="nonzero" d="M 167.796875 0 L 216.816406 0 L 216.816406 2400 L 167.796875 2400 Z M 167.796875 0 "/>
              </clipPath>
              <linearGradient id="linear-pattern-1" gradientUnits="userSpaceOnUse" x1="0.0740725" y1="0" x2="0.895127" y2="0" gradientTransform="matrix(39.9373, 2923.34, -2923.34, 39.9373, 173.695, -216.66)">
                <stop offset="0" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5625" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.59375" stopColor="rgb(98.376465%, 98.376465%, 98.376465%)" stopOpacity="1"/>
                <stop offset="0.625" stopColor="rgb(98.179626%, 98.179626%, 98.179626%)" stopOpacity="1"/>
                <stop offset="0.75" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
                <stop offset="1" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
              </linearGradient>
              <clipPath id="clip-2">
                <path clipRule="nonzero" d="M 273.871094 0 L 322.890625 0 L 322.890625 2400 L 273.871094 2400 Z M 273.871094 0 "/>
              </clipPath>
              <linearGradient id="linear-pattern-2" gradientUnits="userSpaceOnUse" x1="0.0740725" y1="0" x2="0.895127" y2="0" gradientTransform="matrix(39.9373, 2923.34, -2923.34, 39.9373, 279.768, -216.66)">
                <stop offset="0" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5625" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.59375" stopColor="rgb(98.376465%, 98.376465%, 98.376465%)" stopOpacity="1"/>
                <stop offset="0.625" stopColor="rgb(98.179626%, 98.179626%, 98.179626%)" stopOpacity="1"/>
                <stop offset="0.75" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
                <stop offset="1" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
              </linearGradient>
              <clipPath id="clip-3">
                <path clipRule="nonzero" d="M 379.945312 0 L 428.960938 0 L 428.960938 2400 L 379.945312 2400 Z M 379.945312 0 "/>
              </clipPath>
              <linearGradient id="linear-pattern-3" gradientUnits="userSpaceOnUse" x1="0.0740725" y1="0" x2="0.895127" y2="0" gradientTransform="matrix(39.9373, 2923.34, -2923.34, 39.9373, 385.841, -216.66)">
                <stop offset="0" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stop-opacity="1"/>
                <stop offset="0.5625" stop-color="rgb(98.429871%, 98.429871%, 98.429871%)" stop-opacity="1"/>
                <stop offset="0.59375" stop-color="rgb(98.376465%, 98.376465%, 98.376465%)" stop-opacity="1"/>
                <stop offset="0.625" stop-color="rgb(98.179626%, 98.179626%, 98.179626%)" stop-opacity="1"/>
                <stop offset="0.75" stop-color="rgb(98.03772%, 98.03772%, 98.03772%)" stop-opacity="1"/>
                <stop offset="1" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
              </linearGradient>
              <clipPath id="clip-4">
                <path clipRule="nonzero" d="M 486.015625 0 L 535.035156 0 L 535.035156 2400 L 486.015625 2400 Z M 486.015625 0 "/>
              </clipPath>
              <linearGradient id="linear-pattern-4" gradientUnits="userSpaceOnUse" x1="0.0740725" y1="0" x2="0.895127" y2="0" gradientTransform="matrix(39.9373, 2923.34, -2923.34, 39.9373, 491.914, -216.66)">
                <stop offset="0" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5625" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.59375" stopColor="rgb(98.376465%, 98.376465%, 98.376465%)" stopOpacity="1"/>
                <stop offset="0.625" stopColor="rgb(98.179626%, 98.179626%, 98.179626%)" stopOpacity="1"/>
                <stop offset="0.75" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
                <stop offset="1" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
              </linearGradient>
              <clipPath id="clip-5">
                <path clipRule="nonzero" d="M 592.511719 0 L 641.53125 0 L 641.53125 2400 L 592.511719 2400 Z M 592.511719 0 "/>
              </clipPath>
              <linearGradient id="linear-pattern-5" gradientUnits="userSpaceOnUse" x1="0.0740725" y1="0" x2="0.895127" y2="0" gradientTransform="matrix(39.9373, 2923.34, -2923.34, 39.9373, 598.019, -216.66)">
                <stop offset="0" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.5625" stopColor="rgb(98.429871%, 98.429871%, 98.429871%)" stopOpacity="1"/>
                <stop offset="0.59375" stopColor="rgb(98.376465%, 98.376465%, 98.376465%)" stopOpacity="1"/>
                <stop offset="0.625" stopColor="rgb(98.179626%, 98.179626%, 98.179626%)" stopOpacity="1"/>
                <stop offset="0.75" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
                <stop offset="1" stopColor="rgb(98.03772%, 98.03772%, 98.03772%)" stopOpacity="1"/>
              </linearGradient>
              <path id="yrc-bike-motion-path" d={BIKE_PATH} />
              <filter id="yrc-blue-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background design patterns exactly as provided */}
            <g clipPath="url(#clip-0)">
              <path fillRule="nonzero" fill="url(#linear-pattern-0)" d="M 110.734375 -0.667969 L 28.945312 0.449219 L 61.734375 2400.667969 L 143.523438 2399.550781 Z M 110.734375 -0.667969 "/>
            </g>
            <g clipPath="url(#clip-1)">
              <path fillRule="nonzero" fill="url(#linear-pattern-1)" d="M 216.808594 -0.667969 L 135.015625 0.449219 L 167.808594 2400.667969 L 249.597656 2399.550781 Z M 216.808594 -0.667969 "/>
            </g>
            <g clipPath="url(#clip-2)">
              <path fillRule="nonzero" fill="url(#linear-pattern-2)" d="M 322.878906 -0.667969 L 241.089844 0.449219 L 273.878906 2400.667969 L 355.671875 2399.550781 Z M 322.878906 -0.667969 "/>
            </g>
            <g clipPath="url(#clip-3)">
              <path fillRule="nonzero" fill="url(#linear-pattern-3)" d="M 428.953125 -0.667969 L 347.164062 0.449219 L 379.953125 2400.667969 L 461.742188 2399.550781 Z M 428.953125 -0.667969 "/>
            </g>
            <g clipPath="url(#clip-4)">
              <path fillRule="nonzero" fill="url(#linear-pattern-4)" d="M 535.027344 -0.667969 L 453.234375 0.449219 L 486.027344 2400.667969 L 567.816406 2399.550781 Z M 535.027344 -0.667969 "/>
            </g>
            <g clipPath="url(#clip-5)">
              <path fillRule="nonzero" fill="url(#linear-pattern-5)" d="M 641.097656 -0.667969 L 559.308594 0.449219 L 592.097656 2400.667969 L 673.890625 2399.550781 Z M 641.097656 -0.667969 "/>
            </g>

            {/* Exactly render your beautiful un-skewed original SVG map data with active Yamaha styling */}
            <g>
              {/* Detailed offshore islands exactly as pasted */}
              <path fillRule="nonzero" fill="#003087" stroke="#0047cc" strokeWidth={5} d="M 1357.921875 1859.761719 L 1357.078125 1859.019531 L 1356.308594 1859.019531 C 1355.320312 1859.03125 1354.359375 1859.140625 1353.441406 1859.238281 C 1352.570312 1859.339844 1351.75 1859.429688 1350.949219 1859.441406 L 1349.730469 1859.449219 L 1342.308594 1874.339844 L 1352.550781 1874.25 L 1352.558594 1872.269531 C 1352.558594 1871.671875 1352.511719 1871.128906 1352.449219 1870.640625 L 1357.140625 1870.589844 L 1357.71875 1870 C 1358.191406 1869.519531 1358.679688 1869.109375 1359.199219 1868.671875 C 1359.769531 1868.191406 1360.351562 1867.699219 1360.949219 1867.089844 L 1361.589844 1866.441406 L 1361.519531 1865.53125 C 1361.300781 1862.679688 1359.351562 1860.988281 1357.921875 1859.761719 "/>
              <path fillRule="nonzero" fill="#003087" stroke="#0047cc" strokeWidth={5} d="M 1305.210938 1701.859375 L 1305.179688 1698.140625 L 1302.089844 1700.21875 C 1301.820312 1700.398438 1301.570312 1700.570312 1301.328125 1700.710938 C 1300.621094 1701.171875 1299.949219 1701.601562 1299.269531 1702.289062 L 1298.78125 1702.789062 L 1298.699219 1703.488281 C 1298.269531 1707.640625 1296.699219 1711.191406 1295.050781 1714.941406 C 1292.941406 1719.730469 1290.761719 1724.679688 1291.089844 1730.921875 L 1291.28125 1734.398438 L 1294.191406 1732.480469 C 1295.441406 1731.660156 1296.671875 1730.230469 1297.988281 1728.710938 C 1299.578125 1726.878906 1302.25 1723.800781 1303.488281 1724.308594 L 1307.488281 1725.898438 L 1306.128906 1721.820312 C 1304.578125 1717.179688 1304.800781 1712.648438 1305.039062 1707.859375 C 1305.128906 1705.921875 1305.230469 1703.921875 1305.210938 1701.859375 "/>
              <path fillRule="nonzero" fill="#003087" stroke="#0047cc" strokeWidth={5} d="M 1342.109375 1860.800781 C 1341.730469 1859.828125 1341.261719 1858.871094 1340.808594 1857.949219 C 1340.371094 1857.070312 1339.960938 1856.230469 1339.640625 1855.410156 L 1339.289062 1854.539062 L 1334.21875 1852.871094 L 1333.398438 1853.460938 C 1324.988281 1859.46875 1321.941406 1869.480469 1325.019531 1880.929688 L 1325.53125 1882.851562 L 1327.449219 1882.351562 C 1328.039062 1882.199219 1328.75 1882.109375 1329.511719 1882.019531 C 1330.371094 1881.921875 1331.25 1881.808594 1332.101562 1881.589844 L 1333.011719 1881.351562 L 1333.410156 1880.5 C 1334.859375 1877.398438 1336.308594 1874.390625 1337.769531 1871.371094 C 1339.199219 1868.410156 1340.628906 1865.441406 1342.058594 1862.378906 L 1342.429688 1861.601562 L 1342.109375 1860.800781 "/>
              <path fillRule="nonzero" fill="#003087" stroke="#0047cc" strokeWidth={5} d="M 1316.671875 1836.640625 C 1312.75 1836.269531 1308.699219 1835.878906 1304.21875 1836.738281 L 1303.398438 1836.890625 L 1302.929688 1837.589844 C 1297.308594 1846 1291.210938 1856.320312 1288.601562 1869.078125 L 1288.019531 1871.898438 L 1292.160156 1871.25 C 1295.789062 1871.25 1299.21875 1870.121094 1302.800781 1869.960938 L 1303.671875 1869.921875 L 1304.230469 1869.261719 C 1311.421875 1860.871094 1318.71875 1851.671875 1322.25 1839.511719 L 1322.949219 1837.121094 L 1320.460938 1836.960938 C 1319.171875 1836.878906 1317.910156 1836.761719 1316.671875 1836.640625 "/>
              <path fill-rule="nonzero" fill="#003087" stroke="#0047cc" strokeWidth={1.5} d="M 1240.390625 1879.808594 L 1240.398438 1876.160156 L 1237.320312 1878.121094 C 1235.871094 1879.039062 1234.488281 1879.96875 1233.171875 1880.859375 C 1231.859375 1881.75 1230.511719 1882.660156 1229.101562 1883.550781 L 1228.421875 1883.980469 L 1228.230469 1884.761719 C 1228.019531 1885.609375 1227.921875 1886.5 1227.828125 1887.371094 C 1227.738281 1888.140625 1227.660156 1888.859375 1227.511719 1889.460938 L 1226.730469 1892.601562 L 1241.328125 1889.289062 L 1241.078125 1887.46875 C 1240.738281 1885.039062 1240.390625 1882.21875 1240.390625 1879.808594 "/>

              {/* Smooth, accurate, detailed outline in official Yamaha Navy Blue with border glow */}
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
            </g>

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
