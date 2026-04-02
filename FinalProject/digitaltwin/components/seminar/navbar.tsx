const links = [
  { label: "About", href: "#about" },
  { label: "Team Projects", href: "#projects" },
  { label: "Digital Twin", href: "#digital-twin" },
];

export function Navbar() {
  return (
    <header className="section-shell pt-5 sm:pt-6">
      <div className="flex items-center justify-between gap-4">
        <a
          href="#top"
          className="text-xs font-bold tracking-[0.22em] text-white uppercase sm:text-sm"
        >
          SEMINAR
        </a>

        <nav className="hidden items-center gap-7 text-[0.7rem] font-medium tracking-[0.16em] text-white/65 uppercase md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="outline-pill px-4 py-2 text-[0.66rem]">
          Contact
        </a>
      </div>
    </header>
  );
}
