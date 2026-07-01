export function AppBadges() {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <a
        href="https://play.google.com/store/apps/details?id=com.ridersclubyrcbd.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-black px-3 text-white transition-transform hover:scale-[1.03]"
        style={{ height: 40 }}
        aria-label="Get it on Google Play"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3.6 1.7c-.3.3-.5.8-.5 1.4v17.8c0 .6.2 1.1.5 1.4l.1.1L13.5 12 3.7 1.6l-.1.1zm11.3 11.1l-2.6-2.6-8.4 8.9c.3.1.7 0 1.1-.2l9.9-6.1zm3.6-4.4l-3-1.7-2.9 2.9 2.9 2.9 3-1.7c1.1-.7 1.1-2.7 0-3.4zM4.7 1.6l8.4 8.9 2.6-2.6L5.8 1.8c-.4-.2-.8-.3-1.1-.2z" />
        </svg>
        <span className="flex flex-col leading-none">
          <span style={{ fontSize: 8, opacity: 0.8 }}>GET IT ON</span>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Google Play</span>
        </span>
      </a>
      <a
        href="https://apps.apple.com/app/yrc-bd/id6739000543"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-black px-3 text-white transition-transform hover:scale-[1.03]"
        style={{ height: 40 }}
        aria-label="Download on the App Store"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.2.9-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-3.8zM14 4.8c.7-.8 1.1-1.9 1-3-1 0-2.2.6-2.9 1.4-.6.7-1.2 1.9-1 3 1.1.1 2.2-.5 2.9-1.4z" />
        </svg>
        <span className="flex flex-col leading-none">
          <span style={{ fontSize: 8, opacity: 0.8 }}>Download on the</span>
          <span style={{ fontSize: 12, fontWeight: 600 }}>App Store</span>
        </span>
      </a>
    </div>
  );
}