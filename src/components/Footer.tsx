const QUICK = ["Home", "About", "Events", "Gallery", "Road Safety", "Membership"];
const COMMUNITY = ["Blog", "Branches", "Road Safety", "YRC App", "Annual Conclave"];

function Social({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center rounded-full bg-white transition-transform hover:scale-110"
      style={{ width: 36, height: 36, color: "#003087" }}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="w-full px-6 lg:px-10" style={{ backgroundColor: "#003087", paddingTop: 80, paddingBottom: 32 }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-white" style={{ fontSize: 32, lineHeight: 1 }}>YRC.BD</div>
          <p className="mt-3 font-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
            Connection. Passion. Pride.
          </p>
          <div className="mt-5 flex gap-3">
            <Social label="Facebook" href="https://www.facebook.com/YamahaRidersClubBD">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-2 2-2h2V2.2C16.6 2.1 15.4 2 14 2c-3 0-5 1.8-5 5.2V10H6v4h3v8h4z"/></svg>
            </Social>
            <Social label="Instagram" href="https://www.instagram.com/yrc.bd">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </Social>
            <Social label="YouTube" href="https://www.youtube.com/@YamahaRidersClubBD">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7.2c-.2-1.4-.8-2.4-2.3-2.6C17.3 4.2 12 4.2 12 4.2s-5.3 0-7.7.4C2.8 4.8 2.2 5.8 2 7.2 1.8 8.6 1.8 12 1.8 12s0 3.4.2 4.8c.2 1.4.8 2.4 2.3 2.6 2.4.4 7.7.4 7.7.4s5.3 0 7.7-.4c1.5-.2 2.1-1.2 2.3-2.6.2-1.4.2-4.8.2-4.8s0-3.4-.2-4.8zM10 15V9l5.2 3L10 15z"/></svg>
            </Social>
          </div>
        </div>

        <div>
          <div className="font-display text-white" style={{ fontSize: 18 }}>QUICK LINKS</div>
          <ul className="mt-4 space-y-2">
            {QUICK.map((l) => (
              <li key={l}>
                <a href="#link" className="yrc-footer-link font-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-white" style={{ fontSize: 18 }}>COMMUNITY</div>
          <ul className="mt-4 space-y-2">
            {COMMUNITY.map((l) => (
              <li key={l}>
                <a href="#link" className="yrc-footer-link font-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-white" style={{ fontSize: 18 }}>CONTACT</div>
          <ul className="mt-4 space-y-2 font-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
            <li>Email: info@yrc.bd</li>
            <li>ACI Motors Dhaka</li>
            <li>Facebook: YamahaRidersClubBD</li>
          </ul>
        </div>
      </div>

      <div
        className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 pt-6 sm:flex-row"
        style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
      >
        <p className="font-sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
          © 2025 Yamaha Riders Club Bangladesh. All rights reserved.
        </p>
        <p className="font-sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
          Bangladesh's Biggest Riding Community 🏍
        </p>
      </div>
    </footer>
  );
}