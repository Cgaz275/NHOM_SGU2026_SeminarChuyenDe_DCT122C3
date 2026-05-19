const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm4.25 3.5A4.75 4.75 0 1 1 7.25 11.75 4.76 4.76 0 0 1 12 7Zm0 1.5a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 8.5Zm5.5-1.95a1.05 1.05 0 1 0 1.05 1.05 1.05 1.05 0 0 0-1.05-1.05Z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M19.95 7.26c.01.17.01.35.01.53C19.96 13.2 15.95 19 8.62 19c-2.1 0-4.06-.61-5.71-1.65.29.03.58.04.89.04 1.75 0 3.35-.59 4.63-1.59a3.22 3.22 0 0 1-3-2.23c.2.03.4.05.61.05.29 0 .59-.04.86-.11a3.21 3.21 0 0 1-2.58-3.15v-.04c.45.25.97.4 1.53.42a3.2 3.2 0 0 1-.99-4.28 9.1 9.1 0 0 0 6.61 3.35 3.22 3.22 0 0 1 5.48-2.93 6.28 6.28 0 0 0 2.04-.78 3.25 3.25 0 0 1-1.41 1.78c.65-.08 1.28-.25 1.86-.5a6.96 6.96 0 0 1-1.6 1.66Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M13.5 22v-8h2.72l.41-3.12H13.5V8.9c0-.9.26-1.51 1.57-1.51h1.68V4.61A22.44 22.44 0 0 0 14.32 4c-2.57 0-4.32 1.57-4.32 4.45v2.43H7.25V14h2.75v8h3.5Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="footer-section bg-[var(--seminar-blue)] pb-8">
      <div className="section-shell footer-content">
        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="text-xs font-bold tracking-[0.22em] uppercase">
            SEMINAR
          </a>

          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <p className="text-[0.68rem] text-white/70">
            © 2026 Seminar. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
