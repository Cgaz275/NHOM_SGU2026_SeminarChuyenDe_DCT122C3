const stats = [
  { label: "Launch speed", value: "Fast" },
  { label: "Visual polish", value: "High" },
  { label: "Maintenance", value: "Simple" },
];

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_58%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.28),transparent_55%)] blur-3xl" />

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="rounded-[1.5rem] border border-white/10 bg-[#111111] p-5">
          <div className="flex items-center justify-between text-xs text-white/45">
            <span>Preview</span>
            <span>Live composition</span>
          </div>

          <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] text-white/45 uppercase">
                  Featured launch
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Visual storytelling for your product.
                </h2>
              </div>
              <div className="size-14 rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0.18)_42%,rgba(255,255,255,0.02)_72%)] shadow-[0_0_60px_rgba(255,255,255,0.12)]" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <div className="text-sm font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-white/45">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between text-sm text-white/50">
                <span>Momentum</span>
                <span>+28%</span>
              </div>
              <div className="mt-4 h-28 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))] p-3">
                <div className="flex h-full items-end gap-2">
                  <span className="h-[38%] w-full rounded-t-full bg-white/20" />
                  <span className="h-[58%] w-full rounded-t-full bg-white/30" />
                  <span className="h-[52%] w-full rounded-t-full bg-white/25" />
                  <span className="h-[78%] w-full rounded-t-full bg-white/45" />
                  <span className="h-[64%] w-full rounded-t-full bg-white/30" />
                </div>
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-xs tracking-[0.2em] text-white/45 uppercase">
                Flow
              </p>
              <div className="mt-4 space-y-3">
                {[
                  "Define the message",
                  "Highlight the value",
                  "Guide the conversion",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
